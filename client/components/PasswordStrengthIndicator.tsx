import { PasswordStrength } from "@/lib/validation";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  password: string;
}

// Simple SVG icons to replace lucide-react
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export function PasswordStrengthIndicator({
  strength,
  password,
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const getStrengthBarColor = (index: number) => {
    if (index < strength.score) {
      switch (strength.score) {
        case 1:
          return "bg-red-500";
        case 2:
          return "bg-orange-500";
        case 3:
          return "bg-yellow-500";
        case 4:
          return "bg-green-500";
        default:
          return "bg-red-500";
      }
    }
    return "bg-gray-200";
  };

  return (
    <div className="mt-2 space-y-2 sm:space-y-3">
      {/* Strength bars */}
      <div className="flex space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1 sm:h-1.5 flex-1 rounded-full transition-colors duration-300 ${getStrengthBarColor(index)}`}
          />
        ))}
      </div>

      {/* Strength label */}
      <div className="flex items-center justify-between">
        <span className={`text-xs sm:text-sm font-medium ${strength.color}`}>
          Password strength: {strength.label}
        </span>
      </div>

      {/* Suggestions */}
      {strength.suggestions.length > 0 && (
        <div className="mt-2 sm:mt-3">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
            To improve your password:
          </p>
          <ul className="text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-1.5">
            {strength.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
