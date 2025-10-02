import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ArrowLeft, Upload, User, Mail, Phone, GraduationCap, Clock, DollarSign, FileText, CheckCircle } from "lucide-react";
import logoImage from "figma:asset/7e093b597814e81e5f40b599b83e7a308d22d8d7.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TherapistRegistrationPageProps {
  onBack: () => void;
}

export function TherapistRegistrationPage({ onBack }: TherapistRegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    
    // Professional Information
    licenseNumber: "",
    credentials: [] as string[],
    specialties: [] as string[],
    yearsOfExperience: "",
    education: "",
    
    // Practice Information
    practiceType: "",
    sessionTypes: [] as string[],
    languages: [] as string[],
    hourlyRate: "",
    availability: "",
    
    // Personal Statement
    bio: "",
    approach: "",
    
    // Documents
    resumeUploaded: false,
    licenseUploaded: false,
    photoUploaded: false,
    
    // Terms
    agreeToTerms: false,
    agreeToBackground: false,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const specialtyOptions = [
    "Anxiety Disorders", "Depression", "Trauma & PTSD", "Relationship Counseling",
    "Family Therapy", "Addiction & Substance Abuse", "Eating Disorders", "Grief & Loss",
    "Stress Management", "Career Counseling", "Child & Adolescent Therapy", "Couples Therapy",
    "Cognitive Behavioral Therapy (CBT)", "Dialectical Behavior Therapy (DBT)", "EMDR",
    "Mindfulness-Based Therapy", "Group Therapy", "Crisis Intervention"
  ];

  const credentialOptions = [
    "Licensed Clinical Social Worker (LCSW)", "Licensed Professional Counselor (LPC)",
    "Licensed Marriage & Family Therapist (LMFT)", "Licensed Clinical Mental Health Counselor (LCMHC)",
    "Psychologist (PhD/PsyD)", "Psychiatrist (MD)", "Licensed Addiction Counselor (LAC)",
    "Art Therapist", "Music Therapist", "Play Therapist", "Other"
  ];

  const sessionTypeOptions = [
    "Individual Therapy", "Couples Therapy", "Family Therapy", "Group Therapy",
    "Online Therapy", "In-Person Therapy", "Phone Therapy", "Crisis Intervention"
  ];

  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese (Mandarin)",
    "Chinese (Cantonese)", "Japanese", "Korean", "Arabic", "Hindi", "Russian", "Other"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    }

    if (step === 2) {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
      if (formData.credentials.length === 0) newErrors.credentials = "At least one credential is required";
      if (formData.specialties.length === 0) newErrors.specialties = "At least one specialty is required";
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Years of experience is required";
      if (!formData.education.trim()) newErrors.education = "Education information is required";
    }

    if (step === 3) {
      if (!formData.practiceType) newErrors.practiceType = "Practice type is required";
      if (formData.sessionTypes.length === 0) newErrors.sessionTypes = "At least one session type is required";
      if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
      if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required";
      if (!formData.availability) newErrors.availability = "Availability is required";
    }

    if (step === 4) {
      if (!formData.bio.trim()) newErrors.bio = "Professional bio is required";
      if (formData.bio.length < 100) newErrors.bio = "Bio must be at least 100 characters";
      if (!formData.approach.trim()) newErrors.approach = "Therapeutic approach is required";
    }

    if (step === 5) {
      if (!formData.resumeUploaded) newErrors.resume = "Resume upload is required";
      if (!formData.licenseUploaded) newErrors.license = "License document upload is required";
      if (!formData.agreeToTerms) newErrors.terms = "You must agree to terms and conditions";
      if (!formData.agreeToBackground) newErrors.background = "You must agree to background check";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
            step <= currentStep 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-gray-400 border-gray-300'
          }`}>
            {step < currentStep ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          {step < 5 && (
            <div className={`w-16 h-0.5 mx-2 transition-all ${
              step < currentStep ? 'bg-black' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl mb-4">Application Submitted Successfully!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your interest in joining Gentle Rise Therapy. We have received your application 
              and will review it within 3-5 business days. You will receive an email confirmation shortly.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>• Background verification (2-3 days)</li>
                <li>• Credential verification (1-2 days)</li>
                <li>• Interview scheduling (within 1 week)</li>
                <li>• Platform onboarding (upon approval)</li>
              </ul>
            </div>
            <Button onClick={onBack} className="bg-black text-white hover:bg-gray-800">
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <ImageWithFallback src={logoImage} alt="Gentle Rise Therapy" className="h-8" />
            <div>
              <h1 className="font-semibold">Join Our Therapy Team</h1>
              <p className="text-sm text-gray-600">Step {currentStep} of 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderStepIndicator()}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <><User className="w-5 h-5" /> Personal Information</>}
              {currentStep === 2 && <><GraduationCap className="w-5 h-5" /> Professional Credentials</>}
              {currentStep === 3 && <><Clock className="w-5 h-5" /> Practice Details</>}
              {currentStep === 4 && <><FileText className="w-5 h-5" /> Professional Statement</>}
              {currentStep === 5 && <><Upload className="w-5 h-5" /> Documents & Verification</>}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your basic personal information"}
              {currentStep === 2 && "Tell us about your professional qualifications"}
              {currentStep === 3 && "Details about your practice and services"}
              {currentStep === 4 && "Share your professional approach and experience"}
              {currentStep === 5 && "Upload required documents and complete verification"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Professional Credentials */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => {
                       const value = e.target.value;
                       // Allow only alphanumeric and limit length to 7
                       if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 7) {
                       handleInputChange('licenseNumber', e.target.value);
                     }
                  }}              
                    className={errors.licenseNumber ? 'border-red-500' : ''}
                  />
                  {errors.licenseNumber && 
                <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
                </div>

                <div>
                  <Label>Professional Credentials * (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {credentialOptions.map((credential) => (
                      <div key={credential} className="flex items-center space-x-2">
                        <Checkbox
                          id={credential}
                          checked={formData.credentials.includes(credential)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleArrayToggle('credentials', credential);
                            } else {
                              handleArrayToggle('credentials', credential);
                            }
                          }}
                        />
                        <Label htmlFor={credential} className="text-sm">{credential}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.credentials && <p className="text-red-500 text-sm mt-1">{errors.credentials}</p>}
                </div>

                <div>
                  <Label>Areas of Expertise * (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleArrayToggle('specialties', specialty);
                            } else {
                              handleArrayToggle('specialties', specialty);
                            }
                          }}
                        />
                        <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                    <Select value={formData.yearsOfExperience} onValueChange={(value) => handleInputChange('yearsOfExperience', value)}>
                      <SelectTrigger className={errors.yearsOfExperience ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="education">Education & Training *</Label>
                  <Textarea
                    id="education"
                    placeholder="Please list your educational background, degrees, and relevant training..."
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className={errors.education ? 'border-red-500' : ''}
                    rows={4}
                  />
                  {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Practice Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Practice Type *</Label>
                  <Select value={formData.practiceType} onValueChange={(value) => handleInputChange('practiceType', value)}>
                    <SelectTrigger className={errors.practiceType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select practice type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private Practice</SelectItem>
                      <SelectItem value="group">Group Practice</SelectItem>
                      <SelectItem value="clinic">Mental Health Clinic</SelectItem>
                      <SelectItem value="hospital">Hospital-based</SelectItem>
                      <SelectItem value="online">Online Only</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Online + In-person)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.practiceType && <p className="text-red-500 text-sm mt-1">{errors.practiceType}</p>}
                </div>

                <div>
                  <Label>Session Types Offered * (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {sessionTypeOptions.map((sessionType) => (
                      <div key={sessionType} className="flex items-center space-x-2">
                        <Checkbox
                          id={sessionType}
                          checked={formData.sessionTypes.includes(sessionType)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleArrayToggle('sessionTypes', sessionType);
                            } else {
                              handleArrayToggle('sessionTypes', sessionType);
                            }
                          }}
                        />
                        <Label htmlFor={sessionType} className="text-sm">{sessionType}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.sessionTypes && <p className="text-red-500 text-sm mt-1">{errors.sessionTypes}</p>}
                </div>

                <div>
                  <Label>Languages Spoken * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {languageOptions.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={formData.languages.includes(language)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleArrayToggle('languages', language);
                            } else {
                              handleArrayToggle('languages', language);
                            }
                          }}
                        />
                        <Label htmlFor={language} className="text-sm">{language}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="hourlyRate">Preferred Hourly Rate (USD) *</Label>
                    <Select value={formData.hourlyRate} onValueChange={(value) => handleInputChange('hourlyRate', value)}>
                      <SelectTrigger className={errors.hourlyRate ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select hourly rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-75">$50 - $75</SelectItem>
                        <SelectItem value="76-100">$76 - $100</SelectItem>
                        <SelectItem value="101-125">$101 - $125</SelectItem>
                        <SelectItem value="126-150">$126 - $150</SelectItem>
                        <SelectItem value="151-200">$151 - $200</SelectItem>
                        <SelectItem value="200+">$200+</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                  </div>

                  <div>
                    <Label htmlFor="availability">General Availability *</Label>
                    <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                      <SelectTrigger className={errors.availability ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays Only</SelectItem>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                        <SelectItem value="flexible">Flexible Schedule</SelectItem>
                        <SelectItem value="mornings">Morning Hours</SelectItem>
                        <SelectItem value="evenings">Evening Hours</SelectItem>
                        <SelectItem value="full-time">Full Time (40+ hrs)</SelectItem>
                        <SelectItem value="part-time">Part Time (20-39 hrs)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Professional Statement */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="bio">Professional Bio * (Minimum 100 characters)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your background, and what drives your passion for therapy. This will be visible to potential clients."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className={errors.bio ? 'border-red-500' : ''}
                    rows={6}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                    <p className="text-gray-500 text-sm">{formData.bio.length} characters</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="approach">Therapeutic Approach & Philosophy *</Label>
                  <Textarea
                    id="approach"
                    placeholder="Describe your therapeutic approach, methodologies you use, and your philosophy on mental health treatment."
                    value={formData.approach}
                    onChange={(e) => handleInputChange('approach', e.target.value)}
                    className={errors.approach ? 'border-red-500' : ''}
                    rows={5}
                  />
                  {errors.approach && <p className="text-red-500 text-sm mt-1">{errors.approach}</p>}
                </div>
              </div>
            )}

            {/* Step 5: Documents & Verification */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium mb-2">Resume/CV *</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('resumeUploaded', true)}
                      className={formData.resumeUploaded ? 'bg-green-50 border-green-200' : ''}
                    >
                      {formData.resumeUploaded ? 'Uploaded ✓' : 'Upload File'}
                    </Button>
                    {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                  </Card>

                  <Card className="p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium mb-2">License Document *</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('licenseUploaded', true)}
                      className={formData.licenseUploaded ? 'bg-green-50 border-green-200' : ''}
                    >
                      {formData.licenseUploaded ? 'Uploaded ✓' : 'Upload File'}
                    </Button>
                    {errors.license && <p className="text-red-500 text-xs mt-1">{errors.license}</p>}
                  </Card>

                  <Card className="p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium mb-2">Professional Photo</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('photoUploaded', true)}
                      className={formData.photoUploaded ? 'bg-green-50 border-green-200' : ''}
                    >
                      {formData.photoUploaded ? 'Uploaded ✓' : 'Upload Photo'}
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">Optional</p>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Verification & Agreements</h4>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    />
                    <div>
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a> and 
                        <a href="#" className="text-blue-600 underline ml-1">Privacy Policy</a> *
                      </Label>
                      {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToBackground"
                      checked={formData.agreeToBackground}
                      onCheckedChange={(checked) => handleInputChange('agreeToBackground', checked)}
                    />
                    <div>
                      <Label htmlFor="agreeToBackground" className="text-sm">
                        I consent to background check and credential verification as required by law *
                      </Label>
                      {errors.background && <p className="text-red-500 text-xs mt-1">{errors.background}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What happens after submission?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• We'll verify your credentials and conduct a background check</li>
                    <li>• You'll receive an email within 24 hours confirming receipt</li>
                    <li>• Our team will review your application within 3-5 business days</li>
                    <li>• If approved, we'll schedule an interview and onboarding session</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button onClick={handleNext} className="bg-black text-white hover:bg-gray-800">
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}