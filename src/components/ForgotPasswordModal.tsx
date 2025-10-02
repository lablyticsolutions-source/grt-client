import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }: ForgotPasswordModalProps) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())) return 'Please enter a valid email address';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Password reset requested for:", formData.email);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto close after 4 seconds and switch to login
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 4000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleClose = () => {
    if (!isSubmitting && !showSuccess) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({ email: "" });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  const handleBackToLogin = () => {
    resetForm();
    onClose();
    onSwitchToLogin?.();
  };

  // Success Screen Component
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Reset Link Sent!
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        We've sent a password reset link to <strong>{formData.email}</strong>. 
        Please check your email and follow the instructions to reset your password.
      </p>
      
      <div className="space-y-3 text-sm text-gray-500">
        <p>• Check your spam folder if you don't see the email</p>
        <p>• The reset link will expire in 1 hour</p>
        <p>• Contact support if you need further assistance</p>
      </div>
      
      <Button
        onClick={handleBackToLogin}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
      >
        Back to Sign In
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address to receive a password reset link.
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <SuccessScreen />
        ) : (
          <>
            {/* Header */}
            <div className="p-8 pb-6 text-center bg-white">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <h1 className="text-2xl font-bold text-gray mb-8">
                Reset Password
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
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
                    className={`pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Reset Password Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white
 py-3 rounded-lg font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>

              {/* Back to Login */}
              <p className="text-sm text-center text-gray-500 leading-relaxed">
                Already have an account?{" "}
                <button 
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={handleBackToLogin}
                >
                  Sign In
                </button>
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}