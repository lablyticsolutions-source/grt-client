import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { MessageSquare, User, Mail, Phone, Flag, CheckCircle, Clock } from "lucide-react";
import { validateField, commonValidationRules, ValidationRule } from "./ui/form-validation";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  urgencyLevel: string;
  subject: string;
  message: string;
  preferredLanguage: string;
  preferredTime: string;
  consent: boolean;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [formData, setFormData] = useState<ChatFormData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    urgencyLevel: "",
    subject: "",
    message: "",
    preferredLanguage: "English",
    preferredTime: "",
    consent: false,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Custom validation rules for chat form
  const customValidationRules: Record<string, ValidationRule> = {
    name: commonValidationRules.fullName,
    email: commonValidationRules.email,
    phone: {
      required: true,
      ...commonValidationRules.phone,
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    consent: {
      required: true,
    },
  };

  const countryCodes = [
    { id: "us", code: "+1", country: "United States", flag: "🇺🇸" },
    { id: "ca", code: "+1", country: "Canada", flag: "🇨🇦" },
    { id: "gb", code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { id: "fr", code: "+33", country: "France", flag: "🇫🇷" },
    { id: "de", code: "+49", country: "Germany", flag: "🇩🇪" },
    { id: "it", code: "+39", country: "Italy", flag: "🇮🇹" },
    { id: "es", code: "+34", country: "Spain", flag: "🇪🇸" },
    { id: "in", code: "+91", country: "India", flag: "🇮🇳" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - General inquiry" },
    { value: "medium", label: "Medium - Need assistance soon" },
    { value: "high", label: "High - Urgent support needed" },
    { value: "crisis", label: "Crisis - Immediate help required" },
  ];

  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM", 
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
    "Anytime"
  ];

  const handleInputChange = (field: keyof ChatFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (typeof value === 'string' || typeof value === 'boolean') {
      const error = validateField(field, value, customValidationRules[field]);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate all fields using the validation utility
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof ChatFormData], customValidationRules[field]);
      if (error) newErrors[field] = error;
    });

    // Validate required selections
    if (!formData.countryCode) {
      newErrors.countryCode = "Country code is required";
    }
    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = "Please select urgency level";
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Chat request submitted:", formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto close after 4 seconds
      setTimeout(() => {
        resetForm();
        onClose();
      }, 4000);
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
      name: "",
      email: "",
      phone: "",
      countryCode: "",
      urgencyLevel: "",
      subject: "",
      message: "",
      preferredLanguage: "English",
      preferredTime: "",
      consent: false,
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  // Success Screen Component
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Chat Request Sent Successfully!
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        Thank you for reaching out. Our support team will respond to your message shortly.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md">
        <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-800 space-y-1 text-left">
          <li>• Our team will review your message</li>
          <li>• You'll receive a response within 1-2 hours</li>
          <li>• Check your email for updates</li>
          {formData.urgencyLevel === 'crisis' && (
            <li className="text-red-600 font-medium">• Crisis support will contact you immediately</li>
          )}
        </ul>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4 animate-pulse" />
        <span>This window will close automatically</span>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden p-0 gap-0 bg-white border-0 shadow-2xl rounded-2xl">
        {showSuccess ? (
          <SuccessScreen />
        ) : (
          <>
            <DialogHeader className="p-6 pb-4 border-b border-gray-100">
              <DialogTitle className="flex items-center gap-2 text-2xl text-gray-900">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                Start a Chat
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Get immediate support from our mental health professionals
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                    <User className="h-5 w-5 text-blue-600" />
                    Contact Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.name ? 'border-red-500' : ''}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
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
                              <SelectItem key={`chat-country-${country.id}`} value={country.code}>
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
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Chat Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Chat Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="urgencyLevel">Urgency Level *</Label>
                    <Select onValueChange={(value) => handleInputChange("urgencyLevel", value)}>
                      <SelectTrigger className={errors.urgencyLevel ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{level.label.split(' - ')[0]}</span>
                              <span className="text-sm text-gray-500">{level.label.split(' - ')[1]}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.urgencyLevel && <p className="text-red-500 text-xs mt-1">{errors.urgencyLevel}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your concern"
                      className={errors.subject ? 'border-red-500' : ''}
                      required
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe what you'd like to discuss..."
                      rows={4}
                      className={errors.message ? 'border-red-500' : ''}
                      required
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    <p className="text-xs text-gray-500">{formData.message.length}/1000 characters</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLanguage">Preferred Language</Label>
                      <Select 
                        defaultValue="English"
                        onValueChange={(value) => handleInputChange("preferredLanguage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Italian">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Best Time to Chat</Label>
                      <Select onValueChange={(value) => handleInputChange("preferredTime", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => handleInputChange("consent", e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I consent to sharing this information with qualified mental health professionals for the purpose of providing support. I understand that this is not a substitute for emergency services. *
                    </Label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                </div>

                {/* Crisis Warning */}
                {formData.urgencyLevel === 'crisis' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800">
                      <strong>Crisis Support:</strong> If you're in immediate danger, please call emergency services (911) or a crisis hotline immediately. Our chat support is not a substitute for emergency care.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-6">
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
                        Sending...
                      </div>
                    ) : (
                      'Start Chat Session'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}