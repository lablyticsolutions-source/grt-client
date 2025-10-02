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
  const [currentSection, setCurrentSection] = useState(0);

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
      'firstName', 'lastName', 'email', 'username', 'phone', 'password', 'confirmPassword'
    ];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Validate required selections
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
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
      setIsSubmitting(false);
      setShowSuccess(true);
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
    setCurrentSection(0);
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
      } else {
        const newOtpValues = [...phoneOtpValues];
        newOtpValues[index] = value;
        setPhoneOtpValues(newOtpValues);
        
        // Auto-focus next input
        if (value && index < 5) {
          const nextInput = document.getElementById(`phone-otp-input-${index + 1}`);
          nextInput?.focus();
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
      console.log(`${type} OTP Verified:`, otpCode);
      // Handle OTP verification logic here
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

  // Success Screen Component showing all form data
  const SuccessScreen = () => {
    const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);
    const selectedMonth = months.find(m => m.value === formData.birthMonth);
    const selectedLanguage = formData.languagePreference;
    const selectedTimeZone = timeZones.find(tz => tz.value === formData.timeZone);
    
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
            Welcome to Gentle Rise Therapy. Here's your comprehensive account information:
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Account Details</h3>
          
          {/* Personal Information */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-800 mb-3">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                <p className="text-gray-900 font-medium">
                  {formData.firstName} {formData.middleName && `${formData.middleName} `}{formData.lastName}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Username</Label>
                <p className="text-gray-900 font-medium">@{formData.username}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                <p className="text-gray-900 font-medium break-all">{formData.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Phone Number</Label>
                <p className="text-gray-900 font-medium">
                  {formData.countryCode} {formData.phone}
                  {selectedCountry && <span className="text-gray-500 ml-2">({selectedCountry.country})</span>}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Date of Birth</Label>
                <p className="text-gray-900 font-medium">
                  {selectedMonth?.label} {formData.birthDay}, {formData.birthYear}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Gender</Label>
                <p className="text-gray-900 font-medium">
                  {formData.gender === 'Other' ? formData.customGender : formData.gender}
                </p>
              </div>
              {formData.residentialAddress && (
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-600">Residential Address</Label>
                  <p className="text-gray-900 font-medium">{formData.residentialAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-800 mb-3">Preferences & Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Language</Label>
                <p className="text-gray-900 font-medium">{selectedLanguage}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Time Zone</Label>
                <p className="text-gray-900 font-medium text-sm">{selectedTimeZone?.label}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Privacy Level</Label>
                <p className="text-gray-900 font-medium">{formData.privacyLevel}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Profile Anonymization</Label>
                <p className="text-gray-900 font-medium">
                  {formData.anonymizeProfile ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-800 mb-3">Notification Preferences</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                {formData.emailNotifications ? '✓' : '✗'} Email Notifications: {formData.emailNotifications ? 'Enabled' : 'Disabled'}
              </p>
              <p className="text-gray-700">
                {formData.smsNotifications ? '✓' : '✗'} SMS Notifications: {formData.smsNotifications ? 'Enabled' : 'Disabled'}
              </p>
              <p className="text-gray-700">
                {formData.pushNotifications ? '✓' : '✗'} Push Notifications: {formData.pushNotifications ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>

          {/* Legal & Marketing */}
          <div className="pb-4">
            <h4 className="font-medium text-gray-800 mb-3">Legal & Marketing</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">✓ Terms & Conditions: Accepted</p>
              <p className="text-gray-700">✓ Privacy Policy: Accepted</p>
              <p className="text-gray-700">✓ CAPTCHA: Verified</p>
              <p className="text-gray-700">
                {formData.marketingOptIn ? '✓' : '✗'} Marketing Communications: {formData.marketingOptIn ? 'Opted In' : 'Opted Out'}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          {formData.includePayment && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-800 mb-3">Payment Information</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  Card ending in ****{formData.cardNumber.slice(-4)} (Expires {formData.expiryMonth}/{formData.expiryYear})
                </p>
                <p className="text-gray-700">
                  Save for future payments: {formData.saveForFuture ? 'Yes' : 'One-time use only'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your email for account verification</li>
            <li>• Verify your phone number with the OTP we sent</li>
            <li>• Complete your therapy preferences profile</li>
            <li>• Browse our therapist directory</li>
            <li>• Schedule your first consultation</li>
          </ul>
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
                profileCompleted: true // Sign up users don't need profile completion
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
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className={errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        value={formData.middleName}
                        onChange={(e) => handleInputChange("middleName", e.target.value)}
                        placeholder="Enter middle name"
                        className={errors.middleName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.middleName && <p className="text-red-500 text-sm mt-1">{errors.middleName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        className={errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                          className={`pl-10 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {formData.emailOtpSent ? (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        ) : formData.email && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendOtp('email')}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 text-xs"
                          >
                            Send OTP
                          </Button>
                        )}
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      <p className="text-xs text-gray-500">Will be verified with OTP</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange("username", e.target.value)}
                          placeholder="Choose username"
                          className={`pl-10 ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                      <p className="text-xs text-gray-500">Unique, alphanumeric characters only</p>
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Create password"
                          className={`pl-10 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Strength:</span>
                            <span className={`text-xs font-medium ${
                              passwordStrength < 40 ? 'text-red-600' : 
                              passwordStrength < 80 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {getPasswordStrengthText(passwordStrength)}
                            </span>
                          </div>
                          <Progress 
                            value={passwordStrength} 
                            className={`h-2 ${getPasswordStrengthColor(passwordStrength)}`}
                          />
                        </div>
                      )}
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="Confirm password"
                          className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Select onValueChange={(value) => handleInputChange("birthMonth", value)}>
                          <SelectTrigger className={errors.birthMonth ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={`signup-birth-month-${month.value}`} value={month.value}>
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Select onValueChange={(value) => handleInputChange("birthDay", value)}>
                          <SelectTrigger className={errors.birthDay ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem key={`signup-birth-day-${day.value}`} value={day.value}>
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Select onValueChange={(value) => handleInputChange("birthYear", value)}>
                          <SelectTrigger className={errors.birthYear ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={`signup-birth-year-${year.value}`} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {(errors.birthMonth || errors.birthDay || errors.birthYear || errors.age) && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.age || "Please complete your date of birth"}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <div className="space-y-3">
                      <Select onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((option) => (
                            <SelectItem key={`signup-gender-${option}`} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {formData.gender === 'Other' && (
                        <div>
                          <Input
                            placeholder="Please specify"
                            value={formData.customGender}
                            onChange={(e) => handleInputChange("customGender", e.target.value)}
                            className={errors.customGender ? 'border-red-500' : ''}
                          />
                          {errors.customGender && <p className="text-red-500 text-xs mt-1">{errors.customGender}</p>}
                        </div>
                      )}
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>

                  {/* Residential Address */}
                  <div className="space-y-2">
                    <Label htmlFor="residentialAddress">Residential Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="residentialAddress"
                        value={formData.residentialAddress}
                        onChange={(e) => handleInputChange("residentialAddress", e.target.value)}
                        placeholder="Enter your residential address"
                        className={`pl-10 min-h-[80px] ${errors.residentialAddress ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    {errors.residentialAddress && <p className="text-red-500 text-xs mt-1">{errors.residentialAddress}</p>}
                    <p className="text-xs text-gray-500">
                      This information helps us provide location-specific services
                    </p>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="countryCode">Country *</Label>
                      <div className="relative">
                        <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Select onValueChange={(value) => handleInputChange("countryCode", value)}>
                          <SelectTrigger className={`pl-10 ${errors.countryCode ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={`signup-country-${country.id}`} value={country.code}>
                                <div className="flex items-center space-x-2">
                                  <span>{country.flag}</span>
                                  <span>{country.code}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.countryCode && <p className="text-red-500 text-xs mt-1">{errors.countryCode}</p>}
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter phone number"
                          className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          required
                        />
                        {formData.phoneOtpSent ? (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        ) : formData.phone && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendOtp('phone')}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 text-xs"
                          >
                            Send OTP
                          </Button>
                        )}
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      <p className="text-xs text-gray-500">Will be verified with OTP</p>
                    </div>
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Preferences & Settings</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="languagePreference">Language Preference *</Label>
                      <Select 
                        defaultValue="English"
                        onValueChange={(value) => handleInputChange("languagePreference", value)}
                      >
                        <SelectTrigger className={errors.languagePreference ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((language) => (
                            <SelectItem key={`signup-language-${language}`} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.languagePreference && <p className="text-red-500 text-xs mt-1">{errors.languagePreference}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeZone">Time Zone / Locale *</Label>
                      <Select onValueChange={(value) => handleInputChange("timeZone", value)}>
                        <SelectTrigger className={errors.timeZone ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((tz) => (
                            <SelectItem key={`signup-timezone-${tz.value}`} value={tz.value}>
                              <span className="text-sm">{tz.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.timeZone && <p className="text-red-500 text-xs mt-1">{errors.timeZone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="privacyLevel">Privacy Level</Label>
                      <Select 
                        defaultValue="Medium"
                        onValueChange={(value) => handleInputChange("privacyLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select privacy level" />
                        </SelectTrigger>
                        <SelectContent>
                          {privacyLevelOptions.map((option) => (
                            <SelectItem key={`signup-privacy-${option.value}`} value={option.value}>
                              <div>
                                <div className="font-medium">{option.value}</div>
                                <div className="text-xs text-gray-500">{option.label.split(' - ')[1]}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="anonymizeProfile">Anonymize Profile</Label>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="anonymizeProfile"
                          checked={formData.anonymizeProfile}
                          onCheckedChange={(checked) => handleInputChange("anonymizeProfile", checked)}
                        />
                        <span className="text-sm text-gray-700">
                          {formData.anonymizeProfile ? 'Profile is anonymized' : 'Profile is public'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        When enabled, your name will be hidden from other users
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates and reminders via email</p>
                      </div>
                      <Switch
                        checked={formData.emailNotifications}
                        onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive urgent notifications via text message</p>
                      </div>
                      <Switch
                        checked={formData.smsNotifications}
                        onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch
                        checked={formData.pushNotifications}
                        onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information Section (Optional) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Payment Preference (Optional)</h3>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <Switch
                      id="includePayment"
                      checked={formData.includePayment}
                      onCheckedChange={(checked) => handleInputChange("includePayment", checked)}
                    />
                    <Label htmlFor="includePayment">Add payment method now</Label>
                  </div>

                  {formData.includePayment && (
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className={errors.cardNumber ? 'border-red-500' : ''}
                          maxLength={19}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryMonth">Month *</Label>
                          <Select onValueChange={(value) => handleInputChange("expiryMonth", value)}>
                            <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem key={`signup-expiry-month-${month.value}`} value={month.value}>
                                  {month.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.expiryMonth && <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expiryYear">Year *</Label>
                          <Select onValueChange={(value) => handleInputChange("expiryYear", value)}>
                            <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                              <SelectValue placeholder="YYYY" />
                            </SelectTrigger>
                            <SelectContent>
                              {expiryYears.map((year) => (
                                <SelectItem key={`signup-expiry-year-${year.value}`} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.expiryYear && <p className="text-red-500 text-xs mt-1">{errors.expiryYear}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              type={showCvv ? "text" : "password"}
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              placeholder="123"
                              className={`pr-10 ${errors.cvv ? 'border-red-500' : ''}`}
                              maxLength={4}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCvv(!showCvv)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Switch
                          id="saveForFuture"
                          checked={formData.saveForFuture}
                          onCheckedChange={(checked) => handleInputChange("saveForFuture", checked)}
                        />
                        <Label htmlFor="saveForFuture" className="text-sm">
                          Save for future payments
                        </Label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label>CAPTCHA Verification *</Label>
                        {formData.captchaVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      {!formData.captchaVerified ? (
                        <div className="space-y-3">
                          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-8 text-center">
                            <p className="text-gray-600 mb-4">Click to verify you're human</p>
                            <Button
                              type="button"
                              onClick={handleCaptchaVerify}
                              variant="outline"
                            >
                              I'm not a robot
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-green-600 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          CAPTCHA verified successfully
                        </div>
                      )}
                      {errors.captcha && <p className="text-red-500 text-xs mt-2">{errors.captcha}</p>}
                    </div>
                  </div>
                </div>

                {/* Legal Agreements Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Legal Agreements</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                        I accept the{" "}
                        <button 
                          type="button"
                          className="text-blue-600 hover:text-blue-700 underline"
                          onClick={() => setShowTermsAndConditions(true)}
                        >
                          Terms and Conditions
                        </button>{" "}*
                      </Label>
                    </div>
                    {errors.acceptTerms && <p className="text-red-500 text-xs ml-6">{errors.acceptTerms}</p>}

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptPrivacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
                        I accept the{" "}
                        <button 
                          type="button"
                          className="text-blue-600 hover:text-blue-700 underline"
                          onClick={() => setShowPrivacyPolicy(true)}
                        >
                          Privacy Policy
                        </button>{" "}*
                      </Label>
                    </div>
                    {errors.acceptPrivacy && <p className="text-red-500 text-xs ml-6">{errors.acceptPrivacy}</p>}

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="marketingOptIn"
                        checked={formData.marketingOptIn}
                        onCheckedChange={(checked) => handleInputChange("marketingOptIn", checked)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="marketingOptIn" className="text-sm leading-relaxed">
                        Send me updates, wellness tips, and marketing communications
                      </Label>
                    </div>
                  </div>
                </div>
          
                {/* Submit Button */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Therapy Account'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
       
        
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
      </DialogContent>
    </Dialog>
  );
}