export interface PasswordStrength {
  score: number; // 0-4 (0 = very weak, 4 = very strong)
  label: string;
  color: string;
  suggestions: string[];
}

export function validateEmailOrPhone(input: string): {
  isValid: boolean;
  message: string;
} {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Basic international phone format

  if (!input.trim()) {
    return { isValid: false, message: "Email or phone number is required" };
  }

  // Check if it's an email
  if (emailRegex.test(input)) {
    return { isValid: true, message: "Valid email address" };
  }

  // Check if it's a phone number (remove spaces, hyphens, parentheses for validation)
  const cleanPhone = input.replace(/[\s\-\(\)]/g, "");
  if (phoneRegex.test(cleanPhone)) {
    return { isValid: true, message: "Valid phone number" };
  }

  return {
    isValid: false,
    message: "Please enter a valid email address or phone number",
  };
}

export function validateEmail(email: string): {
  isValid: boolean;
  message: string;
} {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, message: "Email is required" };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  return { isValid: true, message: "Valid email address" };
}

export function validateName(name: string): {
  isValid: boolean;
  message: string;
} {
  if (!name.trim()) {
    return { isValid: false, message: "Name is required" };
  }

  if (name.trim().length < 2) {
    return { isValid: false, message: "Name must be at least 2 characters" };
  }

  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return {
      isValid: false,
      message: "Name can only contain letters and spaces",
    };
  }

  return { isValid: true, message: "Valid name" };
}

export function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const suggestions: string[] = [];

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push("Use at least 8 characters");
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 0.5;
  } else {
    suggestions.push("Add lowercase letters");
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 0.5;
  } else {
    suggestions.push("Add uppercase letters");
  }

  // Numbers check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add numbers");
  }

  // Special characters check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add special characters (!@#$%^&*)");
  }

  // Round score to nearest integer, max 4
  const finalScore = Math.min(Math.round(score), 4);

  // Determine label and color based on score
  let label: string;
  let color: string;

  switch (finalScore) {
    case 0:
    case 1:
      label = "Very Weak";
      color = "text-red-600";
      break;
    case 2:
      label = "Weak";
      color = "text-orange-500";
      break;
    case 3:
      label = "Good";
      color = "text-yellow-500";
      break;
    case 4:
      label = "Strong";
      color = "text-green-600";
      break;
    default:
      label = "Very Weak";
      color = "text-red-600";
  }

  return {
    score: finalScore,
    label,
    color,
    suggestions: suggestions.slice(0, 3), // Limit to 3 suggestions
  };
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string,
): { isValid: boolean; message: string } {
  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  return { isValid: true, message: "Passwords match" };
}
