import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar, User, MapPin, Phone, Mail, Clock } from "lucide-react";

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  socialProvider?: string;
}

export function ProfileCompletionModal({ isOpen, onClose, onComplete, socialProvider }: ProfileCompletionModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalHistory: "",
    currentMedications: "",
    therapyGoals: "",
    preferredSessionTime: "",
    insuranceProvider: "",
    insurancePolicyNumber: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = "Emergency contact phone is required";
    } else if (step === 3) {
      if (!formData.therapyGoals.trim()) newErrors.therapyGoals = "Therapy goals are required";
      if (!formData.preferredSessionTime) newErrors.preferredSessionTime = "Preferred session time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete profile
        console.log("Profile completed:", formData);
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <User className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide your basic information to complete your profile</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter first name"
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter last name"
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className={errors.dateOfBirth ? 'border-red-500' : ''}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender *</Label>
        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
          <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            placeholder="Enter phone number"
            className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address & Emergency Contact</h3>
        <p className="text-gray-600">Your address information and emergency contact details</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter your address"
          className={errors.address ? 'border-red-500' : ''}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter city"
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Enter state"
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip Code *</Label>
        <Input
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => handleInputChange("zipCode", e.target.value)}
          placeholder="Enter zip code"
          className={errors.zipCode ? 'border-red-500' : ''}
        />
        {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-3">Emergency Contact</h4>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
              placeholder="Enter emergency contact name"
              className={errors.emergencyContactName ? 'border-red-500' : ''}
            />
            {errors.emergencyContactName && <p className="text-red-500 text-sm">{errors.emergencyContactName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
            <Input
              id="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
              placeholder="Enter emergency contact phone"
              className={errors.emergencyContactPhone ? 'border-red-500' : ''}
            />
            {errors.emergencyContactPhone && <p className="text-red-500 text-sm">{errors.emergencyContactPhone}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Clock className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Therapy Information</h3>
        <p className="text-gray-600">Help us understand your therapy needs and preferences</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="therapyGoals">What are your therapy goals? *</Label>
        <Textarea
          id="therapyGoals"
          value={formData.therapyGoals}
          onChange={(e) => handleInputChange("therapyGoals", e.target.value)}
          placeholder="Describe what you hope to achieve through therapy..."
          rows={4}
          className={errors.therapyGoals ? 'border-red-500' : ''}
        />
        {errors.therapyGoals && <p className="text-red-500 text-sm">{errors.therapyGoals}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredSessionTime">Preferred Session Time *</Label>
        <Select value={formData.preferredSessionTime} onValueChange={(value) => handleInputChange("preferredSessionTime", value)}>
          <SelectTrigger className={errors.preferredSessionTime ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select preferred time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
            <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferredSessionTime && <p className="text-red-500 text-sm">{errors.preferredSessionTime}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
        <Textarea
          id="medicalHistory"
          value={formData.medicalHistory}
          onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
          placeholder="Any relevant medical history or conditions..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications (Optional)</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={(e) => handleInputChange("currentMedications", e.target.value)}
          placeholder="List any current medications..."
          rows={3}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-3">Insurance Information (Optional)</h4>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Input
              id="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
              placeholder="Enter insurance provider name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
            <Input
              id="insurancePolicyNumber"
              value={formData.insurancePolicyNumber}
              onChange={(e) => handleInputChange("insurancePolicyNumber", e.target.value)}
              placeholder="Enter policy number"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Complete Your Profile</span>
            {socialProvider && (
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Logged in with {socialProvider}
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            Please complete your profile to unlock all features and book therapy sessions.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentStep === totalSteps ? "Complete Profile" : "Next"}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Your information is secure and will only be shared with your assigned therapist.
        </p>
      </DialogContent>
    </Dialog>
  );
}