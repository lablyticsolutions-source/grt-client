import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Shield, CheckCircle, Flag } from "lucide-react";
import Lottie from "lottie-react";
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./TermsAndConditionsPage";
import { OnlineTherapyComparisonModal } from "./OnlineTherapyComparisonModal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSessionType?: string;
  onNavigateToPayment?: (details: {
    therapistName?: string;
    sessionType?: string;
    date?: string;
    time?: string;
    amount?: string;
  }) => void;
}

export function BookingModal({ isOpen, onClose, defaultSessionType, onNavigateToPayment }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "",
    appointmentDate: "",
    appointmentTime: "",
    sessionType: "",
    therapyArea: "",
    counselorId: "",
    reason: "",
    specialRequests: "",
    consent: false,
    isRecurring: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isScrolling, setIsScrolling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  // Lottie animation URL for success celebration
  const animationUrl = "https://lottie.host/dc45f6a0-3b46-4222-9b86-35917981dad4/V9Guk0ORvY.json";

  // Country codes data with unique values to prevent duplicate keys
  const countryCodes = [
    {
      id: "us",
      code: "+1",
      country: "United States",
      flag: "🇺🇸",
      uniqueValue: "us-1"
    },
    { 
      id: "ca", 
      code: "+1", 
      country: "Canada", 
      flag: "🇨🇦",
      uniqueValue: "ca-1"
    },
    {
      id: "gb",
      code: "+44",
      country: "United Kingdom",
      flag: "🇬🇧",
      uniqueValue: "gb-44"
    },
    { 
      id: "fr", 
      code: "+33", 
      country: "France", 
      flag: "🇫🇷",
      uniqueValue: "fr-33"
    },
    { 
      id: "de", 
      code: "+49", 
      country: "Germany", 
      flag: "🇩🇪",
      uniqueValue: "de-49"
    },
    { 
      id: "it", 
      code: "+39", 
      country: "Italy", 
      flag: "🇮🇹",
      uniqueValue: "it-39"
    },
    { 
      id: "es", 
      code: "+34", 
      country: "Spain", 
      flag: "🇪🇸",
      uniqueValue: "es-34"
    },
    { 
      id: "in", 
      code: "+91", 
      country: "India", 
      flag: "🇮🇳",
      uniqueValue: "in-91"
    },
    { 
      id: "cn", 
      code: "+86", 
      country: "China", 
      flag: "🇨🇳",
      uniqueValue: "cn-86"
    },
    { 
      id: "jp", 
      code: "+81", 
      country: "Japan", 
      flag: "🇯🇵",
      uniqueValue: "jp-81"
    },
    {
      id: "kr",
      code: "+82",
      country: "South Korea",
      flag: "🇰🇷",
      uniqueValue: "kr-82"
    },
    { 
      id: "au", 
      code: "+61", 
      country: "Australia", 
      flag: "🇦🇺",
      uniqueValue: "au-61"
    },
    { 
      id: "br", 
      code: "+55", 
      country: "Brazil", 
      flag: "🇧🇷",
      uniqueValue: "br-55"
    },
    { 
      id: "mx", 
      code: "+52", 
      country: "Mexico", 
      flag: "🇲🇽",
      uniqueValue: "mx-52"
    },
    { 
      id: "ru", 
      code: "+7", 
      country: "Russia", 
      flag: "🇷🇺",
      uniqueValue: "ru-7"
    },
  ];

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get max date (3 months from today) in YYYY-MM-DD format
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  // Scroll detection for custom scrollbar
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    const scrollContainer = document.querySelector('.booking-form-content');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, []);

  const validateField = (field: string, value: string | boolean): string => {
    switch (field) {
      case 'fullName':
        if (!value || typeof value !== 'string') return 'Full name is required';
        if (!value.trim()) return 'Full name is required';
        if (!/^[A-Za-z\s]+$/.test(value.trim())) return 'Full name should only contain letters and spaces';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters long';
        return '';
      case 'email':
        if (!value || typeof value !== 'string') return 'Email address is required';
        if (!value.trim()) return 'Email address is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value || typeof value !== 'string') return 'Phone number is required';
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9\+\-\s\(\)]+$/.test(value.trim())) return 'Phone number should contain only numbers, spaces, and phone symbols';
        if (value.replace(/[^0-9]/g, '').length < 7) return 'Phone number must be at least 7 digits';
        return '';
      case 'appointmentDate':
        if (!value || typeof value !== 'string') return 'Preferred date is required';
        if (!value.trim()) return 'Preferred date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Past dates are not allowed. Please select a future date';
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        if (selectedDate > maxDate) return 'Date cannot be more than 3 months in the future';
        return '';
      case 'reason':
        if (value && typeof value === 'string' && value.trim().length > 500) {
          return 'Reason for therapy should not exceed 500 characters';
        }
        return '';
      case 'specialRequests':
        if (value && typeof value === 'string' && value.trim().length > 300) {
          return 'Special requests should not exceed 300 characters';
        }
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate all form fields
    const fieldsToValidate = ['fullName', 'email', 'phone', 'appointmentDate', 'reason', 'specialRequests'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    // Validate required selections
    if (!formData.countryCode) {
      newErrors.countryCode = "Country code is required";
    }
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Preferred time is required";
    }
    if (!formData.sessionType) {
      newErrors.sessionType = "Session type is required";
    }
    if (!formData.consent) {
      newErrors.consent = "You must agree to the Privacy Policy and Terms and Conditions";
    }
    
    return newErrors;
  };

  // Form submission handler that navigates to payment page
  const handleFormSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    setIsSubmitting(true);
    
    // Validate form
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Prepare session details for payment page
    const sessionDetails = {
      therapistName: formData.counselorId || "Dr. Sarah Johnson",
      sessionType: formData.sessionType,
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      amount: "$75.00"
    };

    // Navigate to payment page using the prop - SAME PAGE NAVIGATION
    if (onNavigateToPayment) {
      onNavigateToPayment(sessionDetails);
      onClose(); // Close the booking modal
    } else {
      // Fallback: show success message if navigation is not available
      setShowSuccess(true);
    }
    
    setIsSubmitting(false);
  };

  // Clean submit handler that only uses same-page navigation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle form submission here
      console.log("Booking submitted:", formData);
      
      // Prepare session details for payment page
      const sessionDetails = {
        therapistName: counselors.find(c => c.id === formData.counselorId)?.name || "Available Therapist",
        sessionType: formData.sessionType,
        date: formData.appointmentDate,
        time: formData.appointmentTime,
        amount: "$75.00"
      };
      
      // Use same-page navigation instead of new window
      if (onNavigateToPayment) {
        onNavigateToPayment(sessionDetails);
        onClose(); // Close the booking modal
      } else {
        // Fallback: show success message if navigation is not available
        setShowSuccess(true);
        
        // Auto close after 4 seconds
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 4000);
      }
      
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !showSuccess) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      countryCode: "",
      appointmentDate: "",
      appointmentTime: "",
      sessionType: defaultSessionType || "",
      therapyArea: "",
      counselorId: "",
      reason: "",
      specialRequests: "",
      consent: false,
      isRecurring: false
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation for text fields
    if (typeof value === 'string' && field !== 'consent' && field !== 'isRecurring') {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    } else if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCountryChange = (uniqueValue: string) => {
    // Extract the country code from the unique value
    const selectedCountry = countryCodes.find(c => c.uniqueValue === uniqueValue);
    if (selectedCountry) {
      handleInputChange("countryCode", selectedCountry.code);
    }
  };

  const counselors = [
    { id: "dr-smith", name: "Dr. Sarah Smith - Anxiety & Depression Specialist" },
    { id: "dr-johnson", name: "Dr. Michael Johnson - Couples & Family Therapist" },
    { id: "dr-williams", name: "Dr. Emily Williams - Trauma & PTSD Specialist" },
    { id: "dr-brown", name: "Dr. David Brown - Addiction Counselor" },
    { id: "dr-davis", name: "Dr. Lisa Davis - Child & Adolescent Therapist" },
    { id: "any", name: "No preference - Match me with any available counselor" }
  ];

  // CSS-based Success Animation Component
  const CSSSuccessAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main success circle with checkmark */}
      <div className="relative">
        {/* Animated background circle with pulse */}
        <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-successPulse opacity-20"></div>
        
        {/* Success circle with checkmark */}
        <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-2xl animate-successBounce">
          {/* Checkmark SVG with drawing animation */}
          <svg 
            className="w-16 h-16 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
              className="animate-drawCheck"
              style={{
                strokeDasharray: 20,
                strokeDashoffset: 20
              }}
            />
          </svg>
        </div>
        
        {/* Celebratory floating particles with enhanced animations */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-particleFloat opacity-80"></div>
        <div className="absolute -top-4 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-particleFloat opacity-70" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-2 -left-4 w-3 h-3 bg-pink-400 rounded-full animate-particleFloat opacity-75" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-particleFloat opacity-70" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-2 -right-6 w-2 h-2 bg-orange-400 rounded-full animate-particleFloat opacity-65" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -top-6 left-2 w-2 h-2 bg-indigo-400 rounded-full animate-particleFloat opacity-60" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Success ripple rings */}
        <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-green-300 animate-ping opacity-30"></div>
        <div className="absolute inset-0 w-40 h-40 -m-4 rounded-full border-2 border-green-200 animate-ping opacity-20" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute inset-0 w-48 h-48 -m-8 rounded-full border border-green-100 animate-ping opacity-10" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );

  // Success Screen Component with Lottie Animation
  const SuccessScreen = () => {
    const [animationData, setAnimationData] = useState(null);
    const [useCSS, setUseCSS] = useState(false);

    useEffect(() => {
      // Start with a timeout to fall back to CSS animation if Lottie takes too long
      const fallbackTimeout = setTimeout(() => {
        setUseCSS(true);
      }, 3000); // 3 second timeout for fallback

      // Try to fetch the Lottie animation data
      const controller = new AbortController();
      
      fetch(animationUrl, { signal: controller.signal })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
          }
          return response.json();
        })
        .then(data => {
          clearTimeout(fallbackTimeout);
          if (data && typeof data === 'object' && data.v && data.layers) {
            setAnimationData(data);
          } else {
            throw new Error('Invalid Lottie animation data');
          }
        })
        .catch(error => {
          clearTimeout(fallbackTimeout);
          console.log('Using CSS animation fallback due to:', error.message);
          setUseCSS(true);
        });

      return () => {
        clearTimeout(fallbackTimeout);
        controller.abort();
      };
    }, []);

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[450px]">
        <div className="w-64 h-64 mb-6 relative">
          {useCSS ? (
            <CSSSuccessAnimation />
          ) : animationData ? (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            // Loading state
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-spin shadow-2xl">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 animate-pulse" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Booking Successfully
            </h2>
          </div>
          
          <p className="text-xl text-gray-700 mb-4 max-w-lg leading-relaxed">
            Your therapy session has been booked successfully! You will now be redirected to complete your payment.
          </p>
          
          {/* Information section */}
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-4">
              Next steps:
            </p>
            <ul className="text-sm text-gray-600 space-y-3 text-left">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Complete payment on the next page</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Receive confirmation email with therapist details</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Get preparation guidelines for your first session</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 animate-pulse" />
          <span>This window will close automatically in a few seconds</span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`max-w-2xl overflow-hidden rounded-2xl ${showSuccess ? 'max-h-[80vh]' : 'max-h-[90vh]'}`}>
        {showSuccess ? (
          <SuccessScreen />
        ) : (
          <>
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="h-6 w-6 text-primary" />
                Book Your Therapy Session
              </DialogTitle>
              <DialogDescription>
                Take the first step towards better mental health. Fill out this form and we'll match you with the right therapist.
              </DialogDescription>
            </DialogHeader>

        <div 
          className={`booking-form-content px-6 pb-6 overflow-y-auto custom-scrollbar ${isScrolling ? 'scrolling' : ''}`}
          style={{ maxHeight: 'calc(90vh - 120px)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 mt-4" noValidate>
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.fullName ? "border-red-500 focus:border-red-500" : ""}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countryCode">Country Code <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Select onValueChange={handleCountryChange}>
                        <SelectTrigger className={`pl-10 ${errors.countryCode ? "border-red-500 focus:border-red-500" : ""}`}>
                          <SelectValue placeholder="Select country code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem
                              key={country.id}
                              value={country.uniqueValue}
                            >
                              <div className="flex items-center space-x-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                                <span className="text-gray-500">
                                  ({country.country})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.countryCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.countryCode}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className={errors.phone ? "border-red-500 focus:border-red-500" : ""}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Preferred Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Preferred Date for the First Session <span className="text-red-500">*</span></Label>
                  <Input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => handleInputChange("appointmentDate", e.target.value)}
                    className={errors.appointmentDate ? "border-red-500 focus:border-red-500" : ""}
                    min={getTodayDate()}
                    max={getMaxDate()}
                    required
                  />
                  {errors.appointmentDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentTime">Preferred Time <span className="text-red-500">*</span></Label>
                  <Select onValueChange={(value) => handleInputChange("appointmentTime", value)}>
                    <SelectTrigger className={errors.appointmentTime ? "border-red-500 focus:border-red-500" : ""}>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="time-08" value="8:00">8:00 AM</SelectItem>
                      <SelectItem key="time-09" value="9:00">9:00 AM</SelectItem>
                      <SelectItem key="time-10" value="10:00">10:00 AM</SelectItem>
                      <SelectItem key="time-11" value="11:00">11:00 AM</SelectItem>
                      <SelectItem key="time-12" value="12:00">12:00 PM</SelectItem>
                      <SelectItem key="time-13" value="13:00">1:00 PM</SelectItem>
                      <SelectItem key="time-14" value="14:00">2:00 PM</SelectItem>
                      <SelectItem key="time-15" value="15:00">3:00 PM</SelectItem>
                      <SelectItem key="time-16" value="16:00">4:00 PM</SelectItem>
                      <SelectItem key="time-17" value="17:00">5:00 PM</SelectItem>
                      <SelectItem key="time-18" value="18:00">6:00 PM</SelectItem>
                      <SelectItem key="time-19" value="19:00">7:00 PM</SelectItem>
                      <SelectItem key="time-20" value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.appointmentTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.appointmentTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Session Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Session Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionType">Session Type <span className="text-red-500">*</span></Label>
                    <Select 
                      onValueChange={(value) => handleInputChange("sessionType", value)}
                      value={formData.sessionType}
                    >
                      <SelectTrigger className={errors.sessionType ? "border-red-500 focus:border-red-500" : ""}>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="session-chat" value="chat">Chat</SelectItem>
                        <SelectItem key="session-audio" value="audio">Audio</SelectItem>
                        <SelectItem key="session-video" value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.sessionType && (
                      <p className="text-red-500 text-xs mt-1">{errors.sessionType}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="therapyArea">Session Therapy Areas <span className="text-red-500">*</span></Label>
                    <Select onValueChange={(value) => handleInputChange("therapyArea", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select therapy area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="therapy-anxiety" value="anxiety">Anxiety & Stress</SelectItem>
                        <SelectItem key="therapy-depression" value="depression">Depression</SelectItem>
                        <SelectItem key="therapy-relationships" value="relationships">Relationships</SelectItem>
                        <SelectItem key="therapy-trauma" value="trauma">Trauma & PTSD</SelectItem>
                        <SelectItem key="therapy-grief" value="grief">Grief & Loss</SelectItem>
                        <SelectItem key="therapy-addiction" value="addiction">Addiction Recovery</SelectItem>
                        <SelectItem key="therapy-family" value="family">Family Issues</SelectItem>
                        <SelectItem key="therapy-couples" value="couples">Couples Therapy</SelectItem>
                        <SelectItem key="therapy-teen" value="teen">Teen Counseling</SelectItem>
                        <SelectItem key="therapy-anger" value="anger">Anger Management</SelectItem>
                        <SelectItem key="therapy-eating" value="eating">Eating Disorders</SelectItem>
                        <SelectItem key="therapy-other" value="other">Other/Multiple Areas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                     <Label htmlFor="counselorType">Counselor Type</Label>
                       <Select onValueChange={(value) => handleInputChange("counselorType", value)}>
                          <SelectTrigger>
                      <SelectValue placeholder="Select a counselor type (optional)" />
                         </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="therapist">Find a Therapist (psychologists, counselors, psychotherapists, etc.)</SelectItem>
                         <SelectItem value="psychiatrist">Find a Psychiatrist (for medication management)</SelectItem>
                         <SelectItem value="coach">Find a Coach (life coaches, peer supporters)</SelectItem>
                         <SelectItem value="creative">Find a Creative Therapist (art/music)</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Therapy</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="(optional) Please describe what you'd like to work on in therapy..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    placeholder="Any additional notes or special accommodations needed..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

           <div className="flex justify-center">
             <button 
                type="button"
                   className="text-blue-600 hover:text-blue-700 underline text-sm font-medium"
                   onClick={() => setShowComparisonModal(true)}
                  >
                    Why Choose Online Therapy over In-office Therapy?
                  </button>
              </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Payment Method
              </h3>
              <div className="grid grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedPaymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Card</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('bank')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 cursor-pointer transition-all hover:shadow-md relative ${
                    selectedPaymentMethod === 'bank' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Bank</span>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Get US$5</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('amazon-pay')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedPaymentMethod === 'amazon-pay' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">pay</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Amazon Pay</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('cash-app')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedPaymentMethod === 'cash-app' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center">
                    <span className="text-sm font-bold">$</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Cash App Pay</span>
                </button>
              </div>

              {/* Amazon Pay Details Section */}
              {selectedPaymentMethod === 'amazon-pay' && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="text-lg font-bold text-orange-600">pay</span>
                    </div>
                    <span className="text-lg text-gray-800">Amazon Pay selected.</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM7 8a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">After submission, you will be redirected to securely complete next steps.</span>
                  </div>

                  <div className="mt-6 text-sm text-gray-600">
                    <p>By confirming your payment with AmazonPay, you allow Gentle Rise Therapy to charge your AmazonPay account for future payments in accordance with their terms.</p>
                  </div>
                </div>
              )}

              {/* Bank Details Section */}
              {selectedPaymentMethod === 'bank' && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    <span className="text-lg text-gray-800">Bank transfer selected.</span>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <p className="text-sm text-green-800">💰 <strong>Special Offer:</strong> Get US$5 discount when you pay for the first time with your bank account.</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>By connecting your bank account, you allow Gentle Rise Therapy to charge your account for future payments in accordance with their terms.</p>
                  </div>
                </div>
              )}

              {/* Cash App Details Section */}
              {selectedPaymentMethod === 'cash-app' && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center">
                      <span className="text-sm font-bold">$</span>
                    </div>
                    <span className="text-lg text-gray-800">Cash App Pay selected.</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM7 8a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">After submission, you will be redirected to securely complete next steps.</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>By using Cash App Pay, you allow Gentle Rise Therapy to charge your Cash App account for future payments in accordance with their terms.</p>
                  </div>
                </div>
              )}

              {/* Card Details Section */}
              {selectedPaymentMethod === 'card' && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <span className="text-lg text-gray-800">Card payment selected.</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>By providing your card information, you allow Gentle Rise Therapy to charge your card for future payments in accordance with their terms.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Agreements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Agreements
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm leading-none peer-disabled:cursor-not-allowed flex items-center gap-1 whitespace-nowrap peer-disabled:opacity-70">
                    I agree to the{" "}
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-700 underline"
                      onClick={() => setShowPrivacyPolicy(true)}
                    >
                      Privacy Policy
                    </button>{" "}
                    and{" "}
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-700 underline"
                      onClick={() => setShowTermsAndConditions(true)}
                    >
                      Terms and Conditions
                    </button>{" "}*
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-red-500 text-xs">{errors.consent}</p>
                )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 font-bold"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-black text-white hover:bg-gray-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Booking Request'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Next Steps:</strong> After submitting this form, our team will review your request and match you with an appropriate therapist. You'll receive a confirmation email within 24 hours with your therapist's information and available appointment times.
            </p>
          </div>
        </div>

        {/* Privacy Policy Modal */}
        <PrivacyPolicyPage 
          isOpen={showPrivacyPolicy} 
          onClose={() => setShowPrivacyPolicy(false)}
        />

        {/* Terms and Conditions Modal */}
        <TermsAndConditionsPage 
          isOpen={showTermsAndConditions} 
          onClose={() => setShowTermsAndConditions(false)}
        />

        {/* Online Therapy Comparison Modal */}
        <OnlineTherapyComparisonModal 
          isOpen={showComparisonModal} 
          onClose={() => setShowComparisonModal(false)}
        />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}