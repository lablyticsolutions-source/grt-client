import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Eye, EyeOff, Mail, Lock, Phone } from "lucide-react";
import loginImage from 'figma:asset/1fb743f1176eb86a05c06afa82bbb0b81af33c58.png';
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./TermsAndConditionsPage";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface User {
  id: string;
  email: string;
  name?: string;
  loginMethod: 'email' | 'social';
  socialProvider?: 'google' | 'facebook' | 'twitter' | 'apple';
  profileCompleted?: boolean;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
  onLogin?: (userData: User) => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToSignUp, onLogin }: LoginModalProps) {
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    rememberMe: false,
    useUniqueId: false,
    otp: "",
    countryCode: "+1"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(23);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'emailOrMobile':
        if (!value.trim()) return `${loginType === 'email' ? 'Email' : 'Mobile number'} is required`;
        if (loginType === 'email') {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())) return 'Enter Valid Email';
        } else {
          if (!/^[0-9\+\-\s\(\)]+$/.test(value.trim())) return 'Mobile number should contain only numbers';
        }
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    const emailOrMobileError = validateField('emailOrMobile', formData.emailOrMobile);
    if (emailOrMobileError) newErrors.emailOrMobile = emailOrMobileError;
    
    if (!isOtpSent) {
      const passwordError = validateField('password', formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      if (isOtpSent) {
        // Handle OTP verification login
        const otpCode = otpValues.join('');
        if (otpCode.length === 6) {
          const userData: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: loginType === 'email' ? formData.emailOrMobile : `${formData.emailOrMobile}@mobile.com`,
            name: loginType === 'email' ? formData.emailOrMobile.split('@')[0] : formData.emailOrMobile,
            loginMethod: 'email',
            profileCompleted: true
          };
          
          console.log("OTP Login successful:", otpCode);
          onLogin?.(userData);
          onClose();
        }
      } else {
        // Handle traditional email/password login
        const userData: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: loginType === 'email' ? formData.emailOrMobile : `${formData.emailOrMobile}@mobile.com`,
          name: loginType === 'email' ? formData.emailOrMobile.split('@')[0] : formData.emailOrMobile,
          loginMethod: 'email',
          profileCompleted: true
        };
        
        console.log("Traditional login submitted:", formData);
        onLogin?.(userData);
        onClose();
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (typeof value === 'string' && field !== 'rememberMe' && field !== 'useUniqueId' && field !== 'otp' && field !== 'countryCode') {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    } else if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple' | 'twitter') => {
    console.log(`Login with ${provider}`);
    
    // Create user data for social login
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: `user@${provider}.com`, // Mock email for social login
      name: `${provider} User`, // Mock name for social login
      loginMethod: 'social',
      socialProvider: provider,
      profileCompleted: false // Social login users need to complete profile
    };
    
    onLogin?.(userData);
    onClose();
  };

  const handleSendOtp = async () => {
    if (formData.emailOrMobile) {
      setIsOtpSent(true);
      setOtpTimer(23);
      
      // Start countdown timer
      const countdown = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`login-otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`login-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otpValues.join('');
    if (otpCode.length === 6) {
      console.log('OTP Verified:', otpCode);
      handleSubmit(new Event('submit') as any);
    }
  };

  const handleResendOtp = () => {
    if (otpTimer === 0) {
      handleSendOtp();
    }
  };

  const handleCountryChange = (uniqueValue: string) => {
    const selectedCountry = countryCodes.find(c => c.uniqueValue === uniqueValue);
    if (selectedCountry) {
      handleInputChange("countryCode", selectedCountry.code);
    }
  };

  const resetOtpState = () => {
    setIsOtpSent(false);
    setOtpValues(["", "", "", "", "", ""]);
    setOtpTimer(23);
  };

  const handleLoginTypeChange = (type: 'email' | 'mobile') => {
    setLoginType(type);
    setFormData(prev => ({ ...prev, emailOrMobile: "" }));
    setErrors({});
    resetOtpState();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="custom-center p-8 max-h-[95vh] gap-0 overflow-y-auto rounded-lg bg-white border-0 shadow-2xl custom-scrollbar mb-4">
        <DialogHeader className="sr-only">
          <DialogTitle>Login to Gentle Rise Therapy</DialogTitle>
          <DialogDescription>
            Sign in to your account to access professional therapy services and manage your sessions.
          </DialogDescription>
        </DialogHeader>
        
        {/* Header with Gentle Rise Therapy branding */}
        <div className="p-8 pb-6 text-center bg-white">
          <h1 className="text-2xl text-gray-900 mb-2">
            Gentle Rise Therapy
          </h1>
          <h2 className="text-lg text-gray-700 mb-6">
            Welcome Back
          </h2>
          
          <p className="text-sm text-gray-600 mb-2">
            Don't have an account?{" "}
            <button 
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => {
                onClose();
                onSwitchToSignUp?.();
              }}
            >
              Sign Up
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6" noValidate>
          {/* Login Type Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={() => handleLoginTypeChange('email')}
              className={`px-6 py-2 rounded-full border transition-all duration-200 ${
                loginType === 'email' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-600'
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => handleLoginTypeChange('mobile')}
              className={`px-6 py-2 rounded-full border transition-all duration-200 ${
                loginType === 'mobile' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-600'
              }`}
            >
              <Phone className="h-4 w-4 inline mr-2" />
              Mobile
            </button>
          </div>

          {/* Unique ID Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="uniqueId" className="text-sm text-gray-600">
              Switch to Login with 10 digit Unique ID
            </Label>
            <Switch
              id="uniqueId"
              checked={formData.useUniqueId}
              onCheckedChange={(checked) => handleInputChange("useUniqueId", checked)}
            />
          </div>

          {/* Email/Mobile Field */}
          <div className="space-y-2">
            <Label htmlFor="emailOrMobile" className="text-sm text-gray-700">
              {loginType === 'email' ? 'Email' : 'Mobile Number'}<span className="text-red-500">*</span>
            </Label>
            {loginType === 'email' ? (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="emailOrMobile"
                  type="email"
                  value={formData.emailOrMobile}
                  onChange={(e) => handleInputChange("emailOrMobile", e.target.value)}
                  placeholder="Enter your email"
                  className={`pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.emailOrMobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
            ) : (
              <div className="flex gap-2">
                <Select value={formData.countryCode} onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-32 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500">
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
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="emailOrMobile"
                    type="tel"
                    value={formData.emailOrMobile}
                    onChange={(e) => handleInputChange("emailOrMobile", e.target.value)}
                    placeholder="Enter your mobile number"
                    className={`pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.emailOrMobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
              </div>
            )}
            {errors.emailOrMobile && (
              <p className="text-red-500 text-sm mt-1">{errors.emailOrMobile}</p>
            )}
          </div>

          {/* OTP or Password Section */}
          {!isOtpSent ? (
            <>
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-gray-700">
                  Password<span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Remember Me?
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button with Gradient */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white py-4 rounded-full font-medium text-base shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                LOG IN
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-3 text-sm text-gray-500 absolute">or login with OTP</span>
              </div>

              {/* Send OTP Button */}
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={!formData.emailOrMobile || (loginType === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.emailOrMobile))}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Send OTP to {loginType === 'email' ? 'Email' : 'Mobile'}
              </Button>
            </>
          ) : (
            /* OTP Section */
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-lg text-gray-800 mb-2">Enter Verification Code</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We sent a 6-digit code to your {loginType === 'email' ? 'email address' : 'mobile number'}
                </p>
              </div>
              
              {/* 6 OTP Input Boxes */}
              <div className="flex justify-center gap-3 mb-4">
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    id={`login-otp-input-${index}`}
                    type="text"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    maxLength={1}
                  />
                ))}
              </div>

              {/* Verify Code Button */}
              <Button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpValues.some(v => !v)}
                className="w-full py-3 text-white rounded-lg"
                style={{ backgroundColor: '#9ACD32' }}
              >
                Verify Code & Login
              </Button>

              {/* Resend Timer */}
              <div className="text-center space-y-2">
                <p className="text-gray-600 text-sm">
                  {otpTimer > 0 ? (
                    `Resend code in ${otpTimer}s`
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
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

              {/* Back to Password Login */}
              <button
                type="button"
                onClick={resetOtpState}
                className="w-full text-center text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Back to password login
              </button>
            </div>
          )}

          {/* Social Login Section */}
          {!isOtpSent && (
            <>
              {/* Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-3 text-sm text-gray-500 absolute">or</span>
              </div>

              {/* Social Login Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-md"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors duration-200 shadow-md"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Terms and Privacy */}
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            By signing in, you agree to our{" "}
            <button 
              type="button"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => setShowPrivacyPolicy(true)}
            >
              Privacy Policy
            </button>{" "}
            and{" "}
            <button 
              type="button"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => setShowTermsAndConditions(true)}
            >
              Terms of Service
            </button>
             </p>
            <div className="mt-2 text-sm text-gray-500 text-center">
                  Fields marked with <span className="text-red-500">*</span> are required
         </div>
        </form>

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

        {/* Forgot Password Modal */}
        <ForgotPasswordModal 
          isOpen={showForgotPassword} 
          onClose={() => setShowForgotPassword(false)}
          onSwitchToLogin={() => {
            setShowForgotPassword(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
