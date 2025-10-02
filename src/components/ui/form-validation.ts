import { useState } from 'react';

/**
 * Universal Form Validation Utilities
 * Provides comprehensive validation functions for all forms in the application
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule;
}

/**
 * Common validation patterns
 */
export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^[0-9\s\-\(\)]+$/,
  lettersOnly: /^[A-Za-z\s]+$/,
  alphanumeric: /^[A-Za-z0-9_]+$/,
  name: /^[A-Za-z\s'-]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
};

/**
 * Predefined validation rules for common fields
 */
export const commonValidationRules: ValidationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: patterns.name,
  },
  middleName: {
    required: false,
    minLength: 1,
    maxLength: 50,
    pattern: patterns.name,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: patterns.name,
  },
  email: {
    required: true,
    pattern: patterns.email,
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: patterns.alphanumeric,
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 128,
  },
  phone: {
    required: false,
    pattern: patterns.phone,
    custom: (value: string) => {
      if (value.trim() && value.replace(/[^0-9]/g, '').length < 7) {
        return 'Phone number must be at least 7 digits';
      }
      return null;
    },
  },
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: patterns.name,
  },
  message: {
    required: false,
    maxLength: 500,
  },
  reason: {
    required: false,
    maxLength: 500,
  },
  specialRequests: {
    required: false,
    maxLength: 300,
  },
};

/**
 * Validates a date to ensure it's not in the past
 */
export const validateFutureDate = (dateString: string): string | null => {
  if (!dateString.trim()) return null; // Optional field
  
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return 'Past dates are not allowed. Please select a future date';
  }
  
  return null;
};

/**
 * Validates password strength and returns a score (0-100)
 */
export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;
  return Math.min(100, strength);
};

/**
 * Returns password strength description
 */
export const getPasswordStrengthText = (strength: number): string => {
  if (strength < 20) return "Very Weak";
  if (strength < 40) return "Weak";
  if (strength < 60) return "Fair";
  if (strength < 80) return "Good";
  return "Strong";
};

/**
 * Returns password strength color class
 */
export const getPasswordStrengthColor = (strength: number): string => {
  if (strength < 20) return "bg-red-500";
  if (strength < 40) return "bg-orange-500";
  if (strength < 60) return "bg-yellow-500";
  if (strength < 80) return "bg-blue-500";
  return "bg-green-500";
};

/**
 * Main validation function
 */
export const validateField = (
  fieldName: string, 
  value: string | boolean, 
  customRules?: ValidationRule
): string => {
  // Handle boolean fields (checkboxes, switches)
  if (typeof value === 'boolean') {
    if (customRules?.required && !value) {
      return getFieldDisplayName(fieldName) + ' is required';
    }
    return '';
  }

  const stringValue = String(value || '');
  const rules = customRules || commonValidationRules[fieldName];
  
  if (!rules) {
    console.warn(`No validation rules found for field: ${fieldName}`);
    return '';
  }

  // Required validation
  if (rules.required && !stringValue.trim()) {
    return getFieldDisplayName(fieldName) + ' is required';
  }

  // Skip other validations if field is empty and not required
  if (!stringValue.trim() && !rules.required) {
    return '';
  }

  // Minimum length validation
  if (rules.minLength && stringValue.trim().length < rules.minLength) {
    return `${getFieldDisplayName(fieldName)} must be at least ${rules.minLength} characters long`;
  }

  // Maximum length validation
  if (rules.maxLength && stringValue.trim().length > rules.maxLength) {
    return `${getFieldDisplayName(fieldName)} should not exceed ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue.trim())) {
    return getPatternErrorMessage(fieldName, rules.pattern);
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(stringValue);
    if (customError) return customError;
  }

  // Special case for dates
  if (fieldName.includes('Date') || fieldName.includes('date')) {
    const dateError = validateFutureDate(stringValue);
    if (dateError) return dateError;
  }

  return '';
};

/**
 * Validates multiple fields at once
 */
export const validateFields = (
  formData: Record<string, any>,
  fieldRules?: Record<string, ValidationRule>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(formData).forEach(fieldName => {
    const customRule = fieldRules?.[fieldName];
    const error = validateField(fieldName, formData[fieldName], customRule);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Converts field names to user-friendly display names
 */
const getFieldDisplayName = (fieldName: string): string => {
  const fieldDisplayNames: Record<string, string> = {
    firstName: 'First name',
    middleName: 'Middle name',
    lastName: 'Last name',
    fullName: 'Full name',
    email: 'Email address',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm password',
    phone: 'Phone number',
    appointmentDate: 'Appointment date',
    appointmentTime: 'Appointment time',
    preferredDate: 'Preferred date',
    birthDate: 'Date of birth',
    sessionType: 'Session type',
    countryCode: 'Country code',
    languagePreference: 'Language preference',
    timeZone: 'Time zone',
    message: 'Message',
    reason: 'Reason for therapy',
    specialRequests: 'Special requests',
    consent: 'Consent',
    acceptTerms: 'Terms and conditions',
    acceptPrivacy: 'Privacy policy',
  };
  
  return fieldDisplayNames[fieldName] || fieldName.replace(/([A-Z])/g, ' $1').toLowerCase();
};

/**
 * Returns appropriate error message for pattern validation
 */
const getPatternErrorMessage = (fieldName: string, pattern: RegExp): string => {
  const fieldDisplay = getFieldDisplayName(fieldName);
  
  if (pattern === patterns.email) {
    return 'Please enter a valid email address';
  }
  if (pattern === patterns.phone) {
    return 'Phone number should contain only numbers and phone symbols';
  }
  if (pattern === patterns.lettersOnly || pattern === patterns.name) {
    return `${fieldDisplay} should contain only letters`;
  }
  if (pattern === patterns.alphanumeric) {
    return `${fieldDisplay} should contain only letters, numbers, and underscores`;
  }
  
  return `Please enter a valid ${fieldDisplay.toLowerCase()}`;
};

/**
 * Validates age based on birth date
 */
export const validateAge = (birthMonth: string, birthDay: string, birthYear: string, minAge: number = 13): string => {
  if (!birthMonth || !birthDay || !birthYear) return 'Please complete your date of birth';
  
  const today = new Date();
  const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < minAge) {
    return `You must be at least ${minAge} years old`;
  }
  
  return '';
};

/**
 * Real-time validation hook for forms
 */
export const useFormValidation = (initialData: Record<string, any>, customRules?: Record<string, ValidationRule>) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSetField = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    const error = validateField(fieldName, value, customRules?.[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const validateAllFields = () => {
    const allErrors = validateFields(formData, customRules);
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    formData,
    errors,
    setFormData,
    setErrors,
    validateAndSetField,
    validateAllFields,
    resetForm,
  };
};