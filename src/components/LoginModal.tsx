import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    useUniqueId: false,
    otp: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(23);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())) return 'Enter Valid Email';
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
    
    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validateField('password', formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Create user data for email login
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.email.split('@')[0], // Use email prefix as name
        loginMethod: 'email',
        profileCompleted: true // Email login users don't need profile completion
      };
      
      console.log("Login submitted:", formData);
      onLogin?.(userData);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (typeof value === 'string' && field !== 'rememberMe' && field !== 'useUniqueId' && field !== 'otp') {
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
    if (formData.email) {
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
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otpValues.join('');
    if (otpCode.length === 6) {
      console.log('OTP Verified:', otpCode);
      // Handle OTP verification logic here
    }
  };

  const handleResendOtp = () => {
    if (otpTimer === 0) {
      handleSendOtp();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8 max-h-[95vh] gap-0 overflow-y-auto rounded-lg bg-white border-0 shadow-2xl custom-scrollbar mb-4">
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

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-700">
              Email*
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className={`pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-700">
              Password*
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
            <span className="bg-white px-3 text-sm text-gray-500 absolute">or</span>
          </div>

          {/* OTP Section */}
          <div className="space-y-6">
            {/* Email Verification */}
            <div className="space-y-2">
              <Label htmlFor="email-verify" className="text-sm text-gray-700">
                Email Address *
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email-verify"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={isOtpSent ? formData.email : "your.email@example.com"}
                    className="pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Verify
                </Button>
              </div>
            </div>

            {/* OTP Input Section - Only show after email is sent */}
            {isOtpSent && (
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="text-lg text-gray-800 mb-2">Enter Verification Code</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    We sent a 6-digit code to your email address
                  </p>
                </div>
                
                {/* 6 OTP Input Boxes */}
                <div className="flex justify-center gap-3 mb-4">
                  {otpValues.map((value, index) => (
                    <Input
                      key={index}
                      id={`otp-input-${index}`}
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
                  className="w-full py-3 text-white bg-blue rounded-lg"
                  style={{ backgroundColor: '#9ACD32' }}
                >
                  Verify Code
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
              </div>
            )}
          </div>

          {/* Social Login Buttons - Circular */}
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
          </div>
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

            

          {/* Terms and Privacy */}
          <p className="text-xs text-center text-gray-500 leading-relaxed">{/* Changed from mt-6 to ensure proper spacing */}By signing in, you agree to our{" "}
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
            // Modal will remain open since this is already the login modal
          }}
        />
      </DialogContent>
    </Dialog>
  );
}