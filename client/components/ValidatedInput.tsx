import { useState, useEffect } from "react";

interface ValidationResult {
  isValid: boolean;
  message: string;
}

interface ValidatedInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  validation?: (value: string) => ValidationResult;
  showPasswordToggle?: boolean;
  className?: string;
}

// Simple SVG icons to replace lucide-react
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export function ValidatedInput({
  type,
  placeholder,
  value,
  onChange,
  validation,
  showPasswordToggle = false,
  className = "",
}: ValidatedInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (validation && touched) {
      setValidationResult(validation(value));
    }
  }, [value, validation, touched]);

  const inputType = showPasswordToggle && showPassword ? "text" : type;

  const getInputBorderClass = () => {
    if (!touched || !validationResult) {
      return "border-gray-300 focus:border-snubo-red focus:ring-snubo-red";
    }

    if (validationResult.isValid) {
      return "border-green-500 focus:border-green-500 focus:ring-green-500";
    } else {
      return "border-red-500 focus:border-red-500 focus:ring-red-500";
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 border rounded-lg font-inclusive text-sm sm:text-base focus:outline-none focus:ring-1 transition-colors min-h-[44px] sm:min-h-[48px] touch-manipulation ${getInputBorderClass()} ${className}`}
        />

        {/* Validation icon */}
        {touched && validationResult && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPasswordToggle ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 p-2 min-h-[32px] min-w-[32px] touch-manipulation flex items-center justify-center"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            ) : validationResult.isValid ? (
              <CheckIcon />
            ) : (
              <XIcon />
            )}
          </div>
        )}

        {/* Password toggle for password fields */}
        {showPasswordToggle && (!touched || !validationResult) && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-2 min-h-[32px] min-w-[32px] touch-manipulation flex items-center justify-center"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {/* Validation message */}
      {touched && validationResult && !validationResult.isValid && (
        <p className="text-xs sm:text-sm text-red-500 flex items-center">
          <XIcon />
          <span className="ml-1">{validationResult.message}</span>
        </p>
      )}

      {touched && validationResult && validationResult.isValid && (
        <p className="text-xs sm:text-sm text-green-600 flex items-center">
          <CheckIcon />
          <span className="ml-1">{validationResult.message}</span>
        </p>
      )}
    </div>
  );
}
