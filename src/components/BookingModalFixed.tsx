import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Calendar, Clock, User, MessageSquare, Shield, CheckCircle } from "lucide-react";
import Lottie from "lottie-react";
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./TermsAndConditionsPage";
import { OnlineTherapyComparisonModal } from "./OnlineTherapyComparisonModal";

interface SessionDetails {
  therapistName?: string;
  sessionType?: string;
  date?: string;
  time?: string;
  amount?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSessionType?: string;
  onNavigateToPayment?: (details: SessionDetails) => void;
}

export function BookingModal({ isOpen, onClose, defaultSessionType, onNavigateToPayment }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "",
    appointmentDate: "",
    appointmentTime: "",
    sessionType: defaultSessionType || "",
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

  // Lottie animation URL for success celebration
  const animationUrl = "https://lottie.host/dc45f6a0-3b46-4222-9b86-35917981dad4/V9Guk0ORvY.json";

  // Country codes data with unique values to prevent duplicate keys
  const countryCodes = [
    { id: "us", code: "+1", country: "United States", flag: "🇺🇸", uniqueValue: "us-1" },
    { id: "ca", code: "+1", country: "Canada", flag: "🇨🇦", uniqueValue: "ca-1" },
    { id: "gb", code: "+44", country: "United Kingdom", flag: "🇬🇧", uniqueValue: "gb-44" },
    { id: "fr", code: "+33", country: "France", flag: "🇫🇷", uniqueValue: "fr-33" },
    { id: "de", code: "+49", country: "Germany", flag: "🇩🇪", uniqueValue: "de-49" },
    { id: "it", code: "+39", country: "Italy", flag: "🇮🇹", uniqueValue: "it-39" },
    { id: "es", code: "+34", country: "Spain", flag: "🇪🇸", uniqueValue: "es-34" },
    { id: "in", code: "+91", country: "India", flag: "🇮🇳", uniqueValue: "in-91" },
    { id: "au", code: "+61", country: "Australia", flag: "🇦🇺", uniqueValue: "au-61" },
  ];

  // Sample counselors data
  const counselors = [
    { id: "1", name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", rating: 4.9 },
    { id: "2", name: "Dr. Michael Chen", specialty: "Couples Therapy", rating: 4.8 },
    { id: "3", name: "Dr. Emily Rodriguez", specialty: "Family Therapy", rating: 4.9 },
    { id: "4", name: "Dr. David Thompson", specialty: "Child & Teen", rating: 4.7 },
    { id: "5", name: "Dr. Lisa Park", specialty: "Work & Career", rating: 4.8 },
    { id: "auto", name: "Auto-match with available therapist", specialty: "Best Match", rating: 4.8 }
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
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Navigate to payment page after showing success for 2 seconds
      setTimeout(() => {
        if (onNavigateToPayment) {
          onNavigateToPayment(sessionDetails);
          onClose(); // Close the booking modal
        } else {
          // Fallback to old method if navigation prop not provided
          alert("Please configure payment navigation!");
        }
      }, 2000);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  useEffect(() => {
    if (defaultSessionType && formData.sessionType === "") {
      setFormData(prev => ({ ...prev, sessionType: defaultSessionType }));
    }
  }, [defaultSessionType]);

  // Reset success state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        countryCode: "",
        appointmentDate: "",
        appointmentTime: "",
        sessionType: defaultSessionType || "",
        counselorId: "",
        reason: "",
        specialRequests: "",
        consent: false,
        isRecurring: false
      });
      setErrors({});
    }
  }, [isOpen, defaultSessionType]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        {showPrivacyPolicy && (
          <PrivacyPolicyPage onBack={() => setShowPrivacyPolicy(false)} />
        )}
        {showTermsAndConditions && (
          <TermsAndConditionsPage onBack={() => setShowTermsAndConditions(false)} />
        )}
        {showComparisonModal && (
          <OnlineTherapyComparisonModal 
            isOpen={showComparisonModal} 
            onClose={() => setShowComparisonModal(false)} 
          />
        )}
        
        {!showPrivacyPolicy && !showTermsAndConditions && (
          <>
            {!showSuccess ? (
              <>
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    Book Your Therapy Session
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    Take the first step towards better mental health. Fill out the form below to schedule your session.
                  </DialogDescription>
                </DialogHeader>

                <div 
                  className={`booking-form-content flex-1 overflow-y-auto p-6 custom-scrollbar ${isScrolling ? 'scrolling' : ''}`}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className={errors.fullName ? 'border-red-500' : ''}
                          />
                          {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="countryCode">Country Code *</Label>
                          <Select 
                            value={formData.countryCode} 
                            onValueChange={(value) => handleInputChange('countryCode', value)}
                          >
                            <SelectTrigger className={errors.countryCode ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem key={country.uniqueValue} value={country.uniqueValue}>
                                  {country.flag} {country.code} {country.country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.countryCode && <p className="text-sm text-red-600">{errors.countryCode}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                          />
                          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Session Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Session Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="appointmentDate">Preferred Date *</Label>
                          <Input
                            id="appointmentDate"
                            type="date"
                            min={getTodayDate()}
                            max={getMaxDate()}
                            value={formData.appointmentDate}
                            onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                            className={errors.appointmentDate ? 'border-red-500' : ''}
                          />
                          {errors.appointmentDate && <p className="text-sm text-red-600">{errors.appointmentDate}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="appointmentTime">Preferred Time *</Label>
                          <Select 
                            value={formData.appointmentTime} 
                            onValueChange={(value) => handleInputChange('appointmentTime', value)}
                          >
                            <SelectTrigger className={errors.appointmentTime ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="19:00">7:00 PM</SelectItem>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.appointmentTime && <p className="text-sm text-red-600">{errors.appointmentTime}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionType">Session Type *</Label>
                        <Select 
                          value={formData.sessionType} 
                          onValueChange={(value) => handleInputChange('sessionType', value)}
                        >
                          <SelectTrigger className={errors.sessionType ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select session type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual Therapy (50 min) - $75</SelectItem>
                            <SelectItem value="couples">Couples Therapy (60 min) - $95</SelectItem>
                            <SelectItem value="family">Family Therapy (60 min) - $105</SelectItem>
                            <SelectItem value="group">Group Therapy (90 min) - $45</SelectItem>
                            <SelectItem value="consultation">Initial Consultation (30 min) - $50</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sessionType && <p className="text-sm text-red-600">{errors.sessionType}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="counselorId">Preferred Therapist</Label>
                        <Select 
                          value={formData.counselorId} 
                          onValueChange={(value) => handleInputChange('counselorId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a therapist or auto-match" />
                          </SelectTrigger>
                          <SelectContent>
                            {counselors.map((counselor) => (
                              <SelectItem key={counselor.id} value={counselor.id}>
                                {counselor.name} - {counselor.specialty} ({counselor.rating}★)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Additional Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason for seeking therapy (Optional)</Label>
                        <Textarea
                          id="reason"
                          placeholder="Briefly describe what you'd like to work on in therapy..."
                          value={formData.reason}
                          onChange={(e) => handleInputChange('reason', e.target.value)}
                          className={`min-h-[100px] ${errors.reason ? 'border-red-500' : ''}`}
                        />
                        <div className="flex justify-between items-center">
                          {errors.reason && <p className="text-sm text-red-600">{errors.reason}</p>}
                          <p className="text-sm text-gray-500">{formData.reason.length}/500 characters</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <Textarea
                          id="specialRequests"
                          placeholder="Any specific preferences or accommodations needed..."
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          className={`min-h-[80px] ${errors.specialRequests ? 'border-red-500' : ''}`}
                        />
                        <div className="flex justify-between items-center">
                          {errors.specialRequests && <p className="text-sm text-red-600">{errors.specialRequests}</p>}
                          <p className="text-sm text-gray-500">{formData.specialRequests.length}/300 characters</p>
                        </div>
                      </div>
                    </div>

                    {/* Consent and Terms */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Consent & Terms
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consent"
                            checked={formData.consent}
                            onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                            className={errors.consent ? 'border-red-500' : ''}
                          />
                          <Label htmlFor="consent" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <button
                              type="button"
                              onClick={() => setShowPrivacyPolicy(true)}
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </button>{" "}
                            and{" "}
                            <button
                              type="button"
                              onClick={() => setShowTermsAndConditions(true)}
                              className="text-primary hover:underline"
                            >
                              Terms and Conditions
                            </button>
                          </Label>
                        </div>
                        {errors.consent && <p className="text-sm text-red-600 ml-6">{errors.consent}</p>}

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="isRecurring"
                            checked={formData.isRecurring}
                            onCheckedChange={(checked) => handleInputChange('isRecurring', checked as boolean)}
                          />
                          <Label htmlFor="isRecurring" className="text-sm leading-relaxed">
                            I would like to schedule regular sessions (Weekly/Bi-weekly)
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowComparisonModal(true)}
                        className="flex-1"
                      >
                        Compare Services
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      >
                        {isSubmitting ? "Processing..." : "Book Session"}
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              /* Success Screen */
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-6">
                  <Lottie
                    animationData={animationUrl}
                    loop={false}
                    style={{ width: 120, height: 120 }}
                  />
                </div>
                
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Confirmed!
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Your therapy session has been successfully scheduled. You'll be redirected to complete your payment.
                </p>
                
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-blue-600 rounded-full animate-pulse"></div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}