import { useState } from 'react';

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface CustomRadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function CustomRadioGroup({ 
  name, 
  options, 
  selectedValue, 
  onChange, 
  className = "" 
}: CustomRadioGroupProps) {
  const [internalValue, setInternalValue] = useState<string>(selectedValue || '');

  const handleChange = (value: string) => {
    setInternalValue(value);
    onChange?.(value);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => {
        const isSelected = (selectedValue !== undefined ? selectedValue : internalValue) === option.value;
        
        return (
          <label 
            key={option.id}
            className="flex items-center cursor-pointer group"
            htmlFor={option.id}
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                id={option.id}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => handleChange(e.target.value)}
                className="sr-only"
              />
              
              {/* Custom radio button circle */}
              <div className={`
                relative w-5 h-5 rounded-full border-2 transition-all duration-200 ease-in-out
                ${isSelected 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
                }
                group-hover:scale-105
              `}>
                {/* Inner filled circle for selected state */}
                {isSelected && (
                  <div className="absolute inset-1 rounded-full bg-white"></div>
                )}
              </div>
            </div>
            
            {/* Label text aligned to the right */}
            <span className={`
              ml-3 text-base transition-colors duration-200
              ${isSelected 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-700 hover:text-gray-900'
              }
            `}>
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// Example usage component
export function CustomRadioExample() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const radioOptions: RadioOption[] = [
    { id: 'radio1', label: 'RadioButton 1', value: 'option1' },
    { id: 'radio2', label: 'RadioButton 2', value: 'option2' },
    { id: 'radio3', label: 'RadioButton 3', value: 'option3' },
  ];

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Custom Radio Button Example
      </h3>
      
      <CustomRadioGroup
        name="example-radio"
        options={radioOptions}
        selectedValue={selectedValue}
        onChange={setSelectedValue}
        className="mb-4"
      />
      
      {selectedValue && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {radioOptions.find(opt => opt.value === selectedValue)?.label}
          </p>
        </div>
      )}
    </div>
  );
}