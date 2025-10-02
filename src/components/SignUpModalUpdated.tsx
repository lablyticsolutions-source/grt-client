import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Flag,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  CreditCard,
  Calendar,
  Bell,
  UserCheck,
  Info,
  MapPin,
} from "lucide-react";
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./TermsAndConditionsPage";
import exampleImage from 'figma:asset/90cdbba0bec7c3390ec1e92230d1e88a9fb0a2f1.png';

interface User {
  id: string;
  email: string;
  name?: string;
  loginMethod: 'email' | 'social';
  socialProvider?: 'google' | 'facebook' | 'twitter' | 'apple';
  profileCompleted?: boolean;
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  onLogin?: (userData: User) => void;
}

interface FormData {
  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  gender: string;
  customGender: string;
  residentialAddress: string;
  
  // Contact Information
  phone: string;
  countryCode: string;
  emergencyContactNumber: string;
  emergencyContactCountryCode: string;
  
  // Preferences
  languagePreference: string;
  anonymizeProfile: boolean;
  privacyLevel: string;
  
  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  
  // Location
  timeZone: string;
  
  // Payment (Optional)
  includePayment: boolean;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  saveForFuture: boolean;
  
  // Legal
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingOptIn: boolean;
  
  // Verification
  captchaVerified: boolean;
  emailOtpSent: boolean;
  phoneOtpSent: boolean;
}

export function SignUpModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onLogin,
}: SignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [isPhoneOtpVerified, setIsPhoneOtpVerified] = useState(false);
  const [emailOtpValues, setEmailOtpValues] = useState(["", "", "", "", "", ""]);
  const [phoneOtpValues, setPhoneOtpValues] = useState(["", "", "", "", "", ""]);
  const [emailOtpTimer, setEmailOtpTimer] = useState(23);
  const [phoneOtpTimer, setPhoneOtpTimer] = useState(23);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    gender: "",
    customGender: "",
    residentialAddress: "",
    phone: "",
    countryCode: "",
    emergencyContactNumber: "",
    emergencyContactCountryCode: "",
    languagePreference: "English",
    anonymizeProfile: false,
    privacyLevel: "Medium",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    timeZone: "",
    includePayment: false,
    cardNumber: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
    saveForFuture: false,
    acceptTerms: false,
    acceptPrivacy: false,
    marketingOptIn: false,
    captchaVerified: false,
    emailOtpSent: false,
    phoneOtpSent: false,
  });

  const genderOptions = [
    "Male",
    "Female", 
    "Prefer not to say",
    "Other",
  ];

  const languageOptions = [
    "English",
    "French",
    "Spanish",
    "Italian", 
    "German",
    "Hindi",
    "Gujarati",
    "Malayalam",
  ];

  const privacyLevelOptions = [
    { value: "High", label: "High - Maximum privacy protection" },
    { value: "Medium", label: "Medium - Balanced privacy & functionality" },
    { value: "Low", label: "Low - Full functionality" },
  ];

  const countryCodes = [
    { id: "us", code: "+1", country: "United States", flag: "🇺🇸", uniqueValue: "us-1" },
    { id: "ca", code: "+1", country: "Canada", flag: "🇨🇦", uniqueValue: "ca-1" },
    { id: "gb", code: "+44", country: "United Kingdom", flag: "🇬🇧", uniqueValue: "gb-44" },
    { id: "fr", code: "+33", country: "France", flag: "🇫🇷", uniqueValue: "fr-33" },
    { id: "de", code: "+49", country: "Germany", flag: "🇩🇪", uniqueValue: "de-49" },
    { id: "it", code: "+39", country: "Italy", flag: "🇮🇹", uniqueValue: "it-39" },
    { id: "es", code: "+34", country: "Spain", flag: "🇪🇸", uniqueValue: "es-34" },
    { id: "in", code: "+91", country: "India", flag: "🇮🇳", uniqueValue: "in-91" },
    { id: "cn", code: "+86", country: "China", flag: "🇨🇳", uniqueValue: "cn-86" },
    { id: "jp", code: "+81", country: "Japan", flag: "🇯🇵", uniqueValue: "jp-81" },
    { id: "kr", code: "+82", country: "South Korea", flag: "🇰🇷", uniqueValue: "kr-82" },
    { id: "au", code: "+61", country: "Australia", flag: "🇦🇺", uniqueValue: "au-61" },
    { id: "br", code: "+55", country: "Brazil", flag: "🇧🇷", uniqueValue: "br-55" },
    { id: "mx", code: "+52", country: "Mexico", flag: "🇲🇽", uniqueValue: "mx-52" },
    { id: "ru", code: "+7", country: "Russia", flag: "🇷🇺", uniqueValue: "ru-7" },
  ];

  const timeZones = [
    { value: "UTC-12:00", label: "(UTC-12:00) International Date Line West" },
    { value: "UTC-11:00", label: "(UTC-11:00) Midway Island, Samoa" },
    { value: "UTC-10:00", label: "(UTC-10:00) Hawaii" },
    { value: "UTC-09:00", label: "(UTC-09:00) Alaska" },
    { value: "UTC-08:00", label: "(UTC-08:00) Pacific Time (US & Canada)" },
    { value: "UTC-07:00", label: "(UTC-07:00) Mountain Time (US & Canada)" },
    { value: "UTC-06:00", label: "(UTC-06:00) Central Time (US & Canada)" },
    { value: "UTC-05:00", label: "(UTC-05:00) Eastern Time (US & Canada)" },
    { value: "UTC-04:00", label: "(UTC-04:00) Atlantic Time (Canada)" },
    { value: "UTC+00:00", label: "(UTC+00:00) Greenwich Mean Time" },
    { value: "UTC+01:00", label: "(UTC+01:00) Central European Time" },
    { value: "UTC+05:30", label: "(UTC+05:30) India Standard Time" },
    { value: "UTC+08:00", label: "(UTC+08:00) China Standard Time" },
    { value: "UTC+09:00", label: "(UTC+09:00) Japan Standard Time" },
  ];

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 13;
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
    value: String(maxYear - i),
    label: String(maxYear - i),
  }));

  const expiryYears = Array.from({ length: 20 }, (_, i) => ({
    value: String(currentYear + i),
    label: String(currentYear + i),
  }));

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(100, strength);
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength < 20) return "Very Weak";
    if (strength < 40) return "Weak";
    if (strength < 60) return "Fair";
    if (strength < 80) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 20) return "bg-red-500";
    if (strength < 40) return "bg-orange-500";
    if (strength < 60) return "bg-yellow-500";
    if (strength < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  const validateField = (field: keyof FormData, value: any): string => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (!/^[A-Za-z\s]+$/.test(value.trim())) return 'First name should contain only letters';
        return '';
      case 'middleName':
        if (value.trim() && !/^[A-Za-z\s]+$/.test(value.trim())) return 'Middle name should contain only letters';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (!/^[A-Za-z\s]+$/.test(value.trim())) return 'Last name should contain only letters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())) return 'Enter Valid Email';
        return '';
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (!/^[A-Za-z0-9_]+$/.test(value.trim())) return 'Username should contain only letters, numbers, and underscores';
        if (value.length < 3) return 'Username must be at least 3 characters long';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9\+\-\s\(\)]+$/.test(value.trim())) return 'Phone number should contain only numbers';
        return '';
      case 'emergencyContactNumber':
        if (!value.trim()) return 'Emergency contact number is required';
        if (!/^[0-9\+\-\s\(\)]+$/.test(value.trim())) return 'Emergency contact number should contain only numbers';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return '';
      case 'confirmPassword':
        if (!value.trim()) return 'Confirm password is required';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'cardNumber':
        if (formData.includePayment && !value.trim()) return 'Card number is required';
        if (formData.includePayment && !/^[0-9\s]+$/.test(value.trim())) return 'Card number should contain only numbers';
        return '';
      case 'cvv':
        if (formData.includePayment && !value.trim()) return 'CVV is required';
        if (formData.includePayment && !/^[0-9]{3,4}$/.test(value.trim())) return 'CVV should be 3-4 digits';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate all required fields
    const requiredFields: (keyof FormData)[] = [
      'firstName', 'lastName', 'email', 'username', 'phone', 'emergencyContactNumber', 'password', 'confirmPassword'
    ];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Validate required selections
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
    if (!formData.emergencyContactCountryCode) newErrors.emergencyContactCountryCode = 'Emergency contact country code is required';
    if (!formData.birthMonth) newErrors.birthMonth = 'Birth month is required';
    if (!formData.birthDay) newErrors.birthDay = 'Birth day is required';
    if (!formData.birthYear) newErrors.birthYear = 'Birth year is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.gender === 'Other' && !formData.customGender.trim()) {
      newErrors.customGender = 'Please specify your gender';
    }
    if (!formData.languagePreference) newErrors.languagePreference = 'Language preference is required';
    if (!formData.timeZone) newErrors.timeZone = 'Time zone is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy';
    if (!formData.captchaVerified) newErrors.captcha = 'Please verify CAPTCHA';
    
    // OTP verification validation
    if (formData.emailOtpSent && !isEmailOtpVerified) {
      newErrors.emailOtp = 'Please verify your email OTP';
    }
    if (formData.phoneOtpSent && !isPhoneOtpVerified) {
      newErrors.phoneOtp = 'Please verify your phone OTP';
    }

    // Payment validation if included
    if (formData.includePayment) {
      const cardError = validateField('cardNumber', formData.cardNumber);
      if (cardError) newErrors.cardNumber = cardError;
      
      const cvvError = validateField('cvv', formData.cvv);
      if (cvvError) newErrors.cvv = cvvError;
      
      if (!formData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!formData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    }

    // Age validation
    if (formData.birthMonth && formData.birthDay && formData.birthYear) {
      const age = calculateAge(formData.birthMonth, formData.birthDay, formData.birthYear);
      if (age < 13) {
        newErrors.age = 'You must be at least 13 years old to create an account';
      }
    }

    return newErrors;
  };

  const calculateAge = (month: string, day: string, year: string): number => {
    if (!month || !day || !year) return 0;
    const today = new Date();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Calculate password strength
    if (field === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Sign up submitted:", formData);
      
      // Create user data and automatically login
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        loginMethod: 'email',
        profileCompleted: true
      };
      
      setIsSubmitting(false);
      
      // Show brief success state and then login
      setShowSuccess(true);
      
      // Auto-redirect to dashboard after showing success for 1.5 seconds
      setTimeout(() => {
        onLogin?.(userData);
        resetForm();
        onClose();
      }, 1500);
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
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      gender: "",
      customGender: "",
      residentialAddress: "",
      phone: "",
      countryCode: "",
      emergencyContactNumber: "",
      emergencyContactCountryCode: "",
      languagePreference: "English",
      anonymizeProfile: false,
      privacyLevel: "Medium",
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      timeZone: "",
      includePayment: false,
      cardNumber: "",
      cvv: "",
      expiryMonth: "",
      expiryYear: "",
      saveForFuture: false,
      acceptTerms: false,
      acceptPrivacy: false,
      marketingOptIn: false,
      captchaVerified: false,
      emailOtpSent: false,
      phoneOtpSent: false,
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
    setPasswordStrength(0);
    setIsEmailOtpSent(false);
    setIsPhoneOtpSent(false);
    setIsEmailOtpVerified(false);
    setIsPhoneOtpVerified(false);
    setEmailOtpValues(["", "", "", "", "", ""]);
    setPhoneOtpValues(["", "", "", "", "", ""]);
  };

  const handleSendOtp = async (type: 'email' | 'phone') => {
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (type === 'email') {
      setFormData(prev => ({ ...prev, emailOtpSent: true }));
      setIsEmailOtpSent(true);
      setEmailOtpTimer(23);
      
      // Start countdown timer for email
      const countdown = setInterval(() => {
        setEmailOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setFormData(prev => ({ ...prev, phoneOtpSent: true }));
      setIsPhoneOtpSent(true);
      setPhoneOtpTimer(23);
      
      // Start countdown timer for phone
      const countdown = setInterval(() => {
        setPhoneOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string, type: 'email' | 'phone') => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      if (type === 'email') {
        const newOtpValues = [...emailOtpValues];
        newOtpValues[index] = value;
        setEmailOtpValues(newOtpValues);
        
        // Auto-focus next input
        if (value && index < 5) {
          const nextInput = document.getElementById(`email-otp-input-${index + 1}`);
          nextInput?.focus();
        }
        
        // Auto-verify when all 6 digits are entered
        if (newOtpValues.every(v => v !== '') && newOtpValues.join('').length === 6) {
          setTimeout(() => handleVerifyOtp('email'), 100);
        }
      } else {
        const newOtpValues = [...phoneOtpValues];
        newOtpValues[index] = value;
        setPhoneOtpValues(newOtpValues);
        
        // Auto-focus next input
        if (value && index < 5) {
          const nextInput = document.getElementById(`phone-otp-input-${index + 1}`);
          nextInput?.focus();
        }
        
        // Auto-verify when all 6 digits are entered
        if (newOtpValues.every(v => v !== '') && newOtpValues.join('').length === 6) {
          setTimeout(() => handleVerifyOtp('phone'), 100);
        }
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent, type: 'email' | 'phone') => {
    if (e.key === 'Backspace') {
      const currentValues = type === 'email' ? emailOtpValues : phoneOtpValues;
      if (!currentValues[index] && index > 0) {
        const prevInput = document.getElementById(`${type}-otp-input-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handleVerifyOtp = (type: 'email' | 'phone') => {
    const otpCode = type === 'email' ? emailOtpValues.join('') : phoneOtpValues.join('');
    if (otpCode.length === 6) {
      // Simulate OTP verification (in real app, this would call an API)
      console.log(`${type} OTP Verified:`, otpCode);
      
      if (type === 'email') {
        setIsEmailOtpVerified(true);
        setErrors(prev => ({ ...prev, emailOtp: "" }));
      } else {
        setIsPhoneOtpVerified(true);
        setErrors(prev => ({ ...prev, phoneOtp: "" }));
      }
    }
  };

  const handleResendOtp = (type: 'email' | 'phone') => {
    const timer = type === 'email' ? emailOtpTimer : phoneOtpTimer;
    if (timer === 0) {
      handleSendOtp(type);
    }
  };

  const handleCaptchaVerify = () => {
    // Simulate CAPTCHA verification
    setFormData(prev => ({ ...prev, captchaVerified: true }));
    setErrors(prev => ({ ...prev, captcha: "" }));
  };

  const handleCountryChange = (uniqueValue: string) => {
    // Extract the country code from the unique value
    const selectedCountry = countryCodes.find(c => c.uniqueValue === uniqueValue);
    if (selectedCountry) {
      handleInputChange("countryCode", selectedCountry.code);
    }
  };

  const handleEmergencyCountryChange = (uniqueValue: string) => {
    // Extract the country code from the unique value
    const selectedCountry = countryCodes.find(c => c.uniqueValue === uniqueValue);
    if (selectedCountry) {
      handleInputChange("emergencyContactCountryCode", selectedCountry.code);
    }
  };

  // Success Screen Component
  const SuccessScreen = () => {
    return (
      <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome to Gentle Rise Therapy.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => {
              // Create user data and login
              const userData: User = {
                id: Math.random().toString(36).substr(2, 9),
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                loginMethod: 'email',
                profileCompleted: true
              };
              
              onLogin?.(userData);
              resetForm();
              onClose();
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Continue to Dashboard
          </Button>
          <Button
            onClick={() => {
              resetForm();
              onClose();
              onSwitchToLogin?.();
            }}
            variant="outline"
            className="flex-1"
          >
            Sign In Now
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 gap-0 bg-white border-0 shadow-2xl rounded-2xl">
        {showSuccess ? (
          <SuccessScreen />
        ) : (
          <>
            <DialogHeader className="p-6 pb-4 border-b border-gray-100">
              <DialogTitle className="text-2xl text-center text-gray-900 mb-2">
                Join Gentle Rise Therapy
              </DialogTitle>
              <DialogDescription className="text-center text-xl text-blue-600 mb-4">
                Sign Up
              </DialogDescription>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => {
                    onClose();
                    onSwitchToLogin?.();
                  }}
                >
                  Log In
                </button>
              </p>
            </DialogHeader>

            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name<span className="text-red-500">*</span></Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        value={formData.middleName}
                        onChange={(e) => handleInputChange("middleName", e.target.value)}
                        placeholder="Michael"
                        className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.middleName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.middleName && (
                        <p className="text-red-500 text-sm mt-1">{errors.middleName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Verification */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder={isEmailOtpSent ? formData.email : "your.email@example.com"}
                          className={`pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleSendOtp('email')}
                        disabled={!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg disabled:opacity-50"
                      >
                        Verify
                      </Button>
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Email OTP Section - Only show after email is sent */}
                  {isEmailOtpSent && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="text-lg text-gray-800 mb-2">Enter Verification Code</h4>
                        <p className="text-gray-600 text-sm mb-4">
                          We sent a 6-digit code to your email address
                        </p>
                      </div>
                      
                      {/* 6 Email OTP Input Boxes */}
                      <div className="flex justify-center gap-3 mb-4">
                        {emailOtpValues.map((value, index) => (
                          <Input
                            key={index}
                            id={`email-otp-input-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleOtpChange(index, e.target.value, 'email')}
                            onKeyDown={(e) => handleOtpKeyDown(index, e, 'email')}
                            className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                            maxLength={1}
                          />
                        ))}
                      </div>

                      {/* Verification Status & Verify Code Button */}
                      {isEmailOtpVerified ? (
                        <div className="w-full py-3 bg-green-100 text-green-800 rounded-lg text-center flex items-center justify-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Email Verified Successfully!
                        </div>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => handleVerifyOtp('email')}
                          disabled={emailOtpValues.some(v => !v)}
                          className="w-full py-3 text-white rounded-lg"
                          style={{ backgroundColor: '#9ACD32' }}
                        >
                          Verify Code
                        </Button>
                      )}
                      
                      {errors.emailOtp && (
                        <p className="text-red-500 text-sm text-center">{errors.emailOtp}</p>
                      )}

                      {/* Resend Timer */}
                      <div className="text-center space-y-2">
                        <p className="text-gray-600 text-sm">
                          {emailOtpTimer > 0 ? (
                            `Resend code in ${emailOtpTimer}s`
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleResendOtp('email')}
                              className="text-blue-600 hover:text-blue-700 underline"
                            >
                              Resend code
                            </button>
                          )}
                        </p>
                        <p className="text-gray-500 text-xs">
                          For demo use any 6-digit code (e.g., 123456)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="johndoe123"
                      className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Enter password"
                          className={`pl-10 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Password Strength:</span>
                            <span className={`${
                              passwordStrength < 40 ? 'text-red-500' : 
                              passwordStrength < 80 ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              {getPasswordStrengthText(passwordStrength)}
                            </span>
                          </div>
                          <Progress value={passwordStrength} className="h-2" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="Confirm password"
                          className={`pl-10 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  </div>

                  {/* Phone Verification */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Select value={formData.countryCode} onValueChange={handleCountryChange}>
                        <SelectTrigger className={`w-32 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.countryCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem key={country.uniqueValue} value={country.uniqueValue}>
                              {country.flag} {country.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="relative flex-1">
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="123-456-7890"
                          className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      
                      <Button
                        type="button"
                        onClick={() => handleSendOtp('phone')}
                        disabled={!formData.phone || !formData.countryCode}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg disabled:opacity-50"
                      >
                        Verify
                      </Button>
                    </div>
                    {(errors.phone || errors.countryCode) && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone || errors.countryCode}</p>
                    )}
                  </div>

                  {/* Phone OTP Section - Only show after phone is sent */}
                  {isPhoneOtpSent && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="text-lg text-gray-800 mb-2">Enter Verification Code</h4>
                        <p className="text-gray-600 text-sm mb-4">
                          We sent a 6-digit code to your mobile number
                        </p>
                      </div>
                      
                      {/* 6 Phone OTP Input Boxes */}
                      <div className="flex justify-center gap-3 mb-4">
                        {phoneOtpValues.map((value, index) => (
                          <Input
                            key={index}
                            id={`phone-otp-input-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleOtpChange(index, e.target.value, 'phone')}
                            onKeyDown={(e) => handleOtpKeyDown(index, e, 'phone')}
                            className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                            maxLength={1}
                          />
                        ))}
                      </div>

                      {/* Verification Status & Verify Code Button */}
                      {isPhoneOtpVerified ? (
                        <div className="w-full py-3 bg-green-100 text-green-800 rounded-lg text-center flex items-center justify-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Phone Verified Successfully!
                        </div>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => handleVerifyOtp('phone')}
                          disabled={phoneOtpValues.some(v => !v)}
                          className="w-full py-3 text-white rounded-lg"
                          style={{ backgroundColor: '#9ACD32' }}
                        >
                          Verify Code
                        </Button>
                      )}
                      
                      {errors.phoneOtp && (
                        <p className="text-red-500 text-sm text-center">{errors.phoneOtp}</p>
                      )}

                      {/* Resend Timer */}
                      <div className="text-center space-y-2">
                        <p className="text-gray-600 text-sm">
                          {phoneOtpTimer > 0 ? (
                            `Resend code in ${phoneOtpTimer}s`
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleResendOtp('phone')}
                              className="text-blue-600 hover:text-blue-700 underline"
                            >
                              Resend code
                            </button>
                          )}
                        </p>
                        <p className="text-gray-500 text-xs">
                          For demo use any 6-digit code (e.g., 123456)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact Number */}
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactNumber" className="text-sm text-gray-700">
                      Emergency Contact Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Select value={formData.emergencyContactCountryCode} onValueChange={handleEmergencyCountryChange}>
                        <SelectTrigger className={`w-32 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.emergencyContactCountryCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem key={`emergency-${country.uniqueValue}`} value={country.uniqueValue}>
                              {country.flag} {country.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="emergencyContactNumber"
                          type="tel"
                          value={formData.emergencyContactNumber}
                          onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                          placeholder="Emergency contact number"
                          className={`pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.emergencyContactNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                    </div>
                    {(errors.emergencyContactNumber || errors.emergencyContactCountryCode) && (
                      <p className="text-red-500 text-sm mt-1">{errors.emergencyContactNumber || errors.emergencyContactCountryCode}</p>
                    )}
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="languagePreference">Language Preference <span className="text-red-500">*</span></Label>
                      <Select value={formData.languagePreference} onValueChange={(value) => handleInputChange("languagePreference", value)}>
                        <SelectTrigger className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.languagePreference ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.languagePreference && (
                        <p className="text-red-500 text-sm mt-1">{errors.languagePreference}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeZone">Time Zone <span className="text-red-500">*</span></Label>
                      <Select value={formData.timeZone} onValueChange={(value) => handleInputChange("timeZone", value)}>
                        <SelectTrigger className={`py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.timeZone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                          <SelectValue placeholder="Select timezone (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((zone) => (
                            <SelectItem key={zone.value} value={zone.value}>
                              {zone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.timeZone && (
                        <p className="text-red-500 text-sm mt-1">{errors.timeZone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      I accept the{" "}
                      <button 
                        type="button"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => setShowTermsAndConditions(true)}
                      >
                        Terms and Conditions
                      </button>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked)}
                    />
                    <Label htmlFor="acceptPrivacy" className="text-sm">
                      I accept the{" "}
                      <button 
                        type="button"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => setShowPrivacyPolicy(true)}
                      >
                        Privacy Policy
                      </button>
                    </Label>
                  </div>
                  {errors.acceptPrivacy && (
                    <p className="text-red-500 text-sm">{errors.acceptPrivacy}</p>
                  )}

                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={async (e) => {
                      e.preventDefault();
                      
                      // Check only essential fields
                      const hasBasicInfo = formData.firstName && formData.lastName && formData.email && formData.password;
                      
                      if (!hasBasicInfo) {
                        alert("Please fill in your basic information (name, email, password)");
                        return;
                      }
                      
                      setIsSubmitting(true);
                      
                      try {
                        // Show immediate success
                        setShowSuccess(true);
                        
                        // Simulate brief processing
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                        // Create user data
                        const userData: User = {
                          id: Math.random().toString(36).substr(2, 9),
                          email: formData.email || 'user@example.com',
                          name: `${formData.firstName || 'User'} ${formData.lastName || 'Name'}`,
                          loginMethod: 'email' as const,
                          profileCompleted: true
                        };
                        
                        console.log("Account created successfully:", userData);
                        
                        // Login and redirect
                        if (onLogin) {
                          onLogin(userData);
                        }
                        
                        // Clean up and close
                        setTimeout(() => {
                          resetForm();
                          onClose();
                        }, 500);
                        
                      } catch (error) {
                        console.error("Signup error:", error);
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white py-4 rounded-full font-medium text-base shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    {isSubmitting ? "Creating Account..." : "CREATE ACCOUNT"}
                  </Button>
                <div className="mt-2 text-sm text-gray-500 text-center">
                       Fields marked with <span className="text-red-500">*</span> are required
                </div>
                </div>
              </form>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}