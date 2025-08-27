import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ValidatedInput } from "@/components/ValidatedInput";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import {
  validateEmailOrPhone,
  validateName,
  checkPasswordStrength,
  validatePasswordMatch,
} from "@/lib/validation";

// localStorage keys
const FORM_DATA_KEY = "snubo-signup-form";
const VERIFICATION_DATA_KEY = "snubo-signup-verification";

export default function SignUp() {
  const navigate = useNavigate();

  // Load saved data from localStorage or use defaults
  const loadSavedFormData = () => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          };
    } catch {
      return {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    }
  };

  const loadSavedVerificationData = () => {
    try {
      const saved = localStorage.getItem(VERIFICATION_DATA_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            isVerified: false,
            otpSent: false,
            otp: "",
            isVerifying: false,
          };
    } catch {
      return {
        isVerified: false,
        otpSent: false,
        otp: "",
        isVerifying: false,
      };
    }
  };

  const [formData, setFormData] = useState(loadSavedFormData);
  const [verification, setVerification] = useState(loadSavedVerificationData);

  const passwordStrength = checkPasswordStrength(formData.password);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
  }, [formData]);

  // Save verification data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(VERIFICATION_DATA_KEY, JSON.stringify(verification));
  }, [verification]);

  // Clear stored data (call this when signup process is complete)
  const clearStoredData = () => {
    localStorage.removeItem(FORM_DATA_KEY);
    localStorage.removeItem(VERIFICATION_DATA_KEY);
  };

  // Clear form and start fresh
  const clearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setVerification({
      isVerified: false,
      otpSent: false,
      otp: "",
      isVerifying: false,
    });
    clearStoredData();
  };

  const sendOtp = async () => {
    const emailOrPhoneValidation = validateEmailOrPhone(formData.email);
    if (!emailOrPhoneValidation.isValid) {
      return;
    }

    setVerification((prev) => ({ ...prev, isVerifying: true }));

    try {
      // Simulate OTP sending API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setVerification((prev) => ({
        ...prev,
        otpSent: true,
        isVerifying: false,
      }));

      console.log("OTP sent to:", formData.email);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setVerification((prev) => ({ ...prev, isVerifying: false }));
    }
  };

  const verifyOtp = async () => {
    if (!verification.otp || verification.otp.length !== 6) {
      return;
    }

    setVerification((prev) => ({ ...prev, isVerifying: true }));

    try {
      // Simulate OTP verification API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any 6-digit code
      setVerification((prev) => ({
        ...prev,
        isVerified: true,
        isVerifying: false,
      }));

      console.log("OTP verified successfully");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerification((prev) => ({ ...prev, isVerifying: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameValidation = validateName(formData.fullName);
    const emailValidation = validateEmailOrPhone(formData.email);
    const passwordMatchValidation = validatePasswordMatch(
      formData.password,
      formData.confirmPassword,
    );

    if (
      nameValidation.isValid &&
      emailValidation.isValid &&
      verification.isVerified &&
      passwordStrength.score >= 3 &&
      passwordMatchValidation.isValid
    ) {
      // Form is valid, proceed with signup
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
      // Navigate to gender selection page
      navigate("/gender");
    } else {
      console.log("Form has validation errors");
    }
  };

  const isFormValid = () => {
    return (
      validateName(formData.fullName).isValid &&
      validateEmailOrPhone(formData.email).isValid &&
      verification.isVerified &&
      passwordStrength.score >= 3 &&
      validatePasswordMatch(formData.password, formData.confirmPassword).isValid
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6">
        {/* Logo */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-inknut font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-snubo-red drop-shadow-lg">
            Snubo
          </h1>
          <p className="font-istok text-xs sm:text-sm md:text-base lg:text-lg text-black">
            Designed for good.
          </p>
        </div>

        {/* Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-3 sm:space-y-4 mt-6 sm:mt-8"
        >
          <h2 className="font-inknut font-semibold text-lg sm:text-xl md:text-2xl text-black mb-4 sm:mb-6">
            Create Account
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <ValidatedInput
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, fullName: value }))
              }
              validation={validateName}
            />

            <div className="space-y-2 sm:space-y-3">
              <ValidatedInput
                type="text"
                placeholder="Email or Phone number"
                value={formData.email}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, email: value }));
                  // Reset verification when email/phone changes
                  setVerification({
                    isVerified: false,
                    otpSent: false,
                    otp: "",
                    isVerifying: false,
                  });
                }}
                validation={validateEmailOrPhone}
              />

              {/* Verification Button */}
              {validateEmailOrPhone(formData.email).isValid &&
                !verification.isVerified && (
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={verification.isVerifying}
                    className="w-full bg-gray-100 text-gray-700 font-inclusive text-sm py-3 sm:py-4 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 min-h-[44px] touch-manipulation"
                  >
                    {verification.isVerifying
                      ? "Sending..."
                      : verification.otpSent
                        ? "Resend OTP"
                        : "Send Verification Code"}
                  </button>
                )}

              {/* OTP Input */}
              {verification.otpSent && !verification.isVerified && (
                <div className="space-y-2 sm:space-y-3">
                  <ValidatedInput
                    type="text"
                    placeholder="Enter 6-digit verification code"
                    value={verification.otp}
                    onChange={(value) =>
                      setVerification((prev) => ({
                        ...prev,
                        otp: value.replace(/\D/g, "").slice(0, 6),
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={
                      verification.otp.length !== 6 || verification.isVerifying
                    }
                    className="w-full bg-snubo-red text-white font-inclusive text-sm py-3 sm:py-4 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:bg-gray-300 min-h-[44px] touch-manipulation"
                  >
                    {verification.isVerifying ? "Verifying..." : "Verify Code"}
                  </button>
                </div>
              )}

              {/* Verified Status */}
              {verification.isVerified && (
                <div className="flex items-center justify-center text-green-600 font-inclusive text-sm py-2">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified successfully
                </div>
              )}
            </div>

            <div>
              <ValidatedInput
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, password: value }))
                }
                showPasswordToggle
              />
              <PasswordStrengthIndicator
                strength={passwordStrength}
                password={formData.password}
              />
            </div>

            <ValidatedInput
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, confirmPassword: value }))
              }
              validation={(value) =>
                validatePasswordMatch(formData.password, value)
              }
              showPasswordToggle
            />
          </div>

          {/* Legal Text */}
          <p className="font-inclusive text-xs text-black leading-relaxed text-center mt-4 sm:mt-6 px-2">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full font-inknut font-semibold text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-colors mt-4 sm:mt-6 min-h-[44px] sm:min-h-[48px] touch-manipulation ${
              isFormValid()
                ? "bg-snubo-red text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <div className="text-center mt-4 sm:mt-6">
            <span className="font-inclusive text-xs sm:text-sm text-black">
              Already have an account?{" "}
            </span>
            <Link
              to="/"
              className="font-inknut font-semibold text-xs sm:text-sm text-snubo-red hover:text-red-600 transition-colors py-2 px-2 min-h-[44px] touch-manipulation inline-flex items-center"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
