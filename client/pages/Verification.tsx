import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface VerificationState {
  isVerified: boolean;
  otpSent: boolean;
  otp: string;
  isVerifying: boolean;
  step: 'select' | 'details' | 'otp' | 'verified' | 'skipped';
}

export default function Verification() {
  const navigate = useNavigate();
  
  const [selectedIdType, setSelectedIdType] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [verification, setVerification] = useState<VerificationState>({
    isVerified: false,
    otpSent: false,
    otp: "",
    isVerifying: false,
    step: 'select'
  });

  const idOptions = [
    {
      id: "aadhar",
      title: "Aadhar Card",
      description: "12-digit unique identity number",
      placeholder: "Enter your 12-digit Aadhar number",
      maxLength: 12,
      pattern: /^\d{12}$/
    },
    {
      id: "driving_license",
      title: "Driving License",
      description: "Valid Indian driving license",
      placeholder: "Enter your driving license number",
      maxLength: 20,
      pattern: /^[A-Z]{2}\d{2}\d{4}\d{7}$|^[A-Z]{2}-\d{13}$/
    },
    {
      id: "voter_id",
      title: "Voter ID",
      description: "Election Commission issued ID",
      placeholder: "Enter your Voter ID number",
      maxLength: 10,
      pattern: /^[A-Z]{3}\d{7}$/
    },
    {
      id: "passport",
      title: "Passport",
      description: "Indian passport",
      placeholder: "Enter your passport number",
      maxLength: 8,
      pattern: /^[A-Z]\d{7}$/
    }
  ];

  const selectedOption = idOptions.find(option => option.id === selectedIdType);

  const handleIdTypeSelect = (idType: string) => {
    setSelectedIdType(idType);
    setIdNumber("");
    setVerification(prev => ({ ...prev, step: 'details' }));
  };

  const handleIdNumberChange = (value: string) => {
    // Format input based on ID type
    if (selectedIdType === "aadhar") {
      // Only allow digits for Aadhar
      const formatted = value.replace(/\D/g, "").slice(0, 12);
      setIdNumber(formatted);
    } else if (selectedIdType === "driving_license") {
      // Allow alphanumeric for DL
      const formatted = value.toUpperCase().slice(0, 20);
      setIdNumber(formatted);
    } else if (selectedIdType === "voter_id") {
      // Format as ABC1234567
      const formatted = value.toUpperCase().slice(0, 10);
      setIdNumber(formatted);
    } else if (selectedIdType === "passport") {
      // Format as A1234567
      const formatted = value.toUpperCase().slice(0, 8);
      setIdNumber(formatted);
    }
  };

  const isValidIdNumber = () => {
    if (!selectedOption || !idNumber) return false;
    return selectedOption.pattern.test(idNumber);
  };

  const sendOtp = async () => {
    if (!isValidIdNumber()) return;

    setVerification(prev => ({ ...prev, isVerifying: true }));

    try {
      // Simulate OTP sending API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setVerification(prev => ({
        ...prev,
        otpSent: true,
        isVerifying: false,
        step: 'otp'
      }));

      console.log(`OTP sent for ${selectedIdType}: ${idNumber}`);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setVerification(prev => ({ ...prev, isVerifying: false }));
    }
  };

  const verifyOtp = async () => {
    if (!verification.otp || verification.otp.length !== 6) return;

    setVerification(prev => ({ ...prev, isVerifying: true }));

    try {
      // Simulate OTP verification API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setVerification(prev => ({
        ...prev,
        isVerified: true,
        isVerifying: false,
        step: 'verified'
      }));

      console.log("Government ID verified successfully");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerification(prev => ({ ...prev, isVerifying: false }));
    }
  };

  const handleSkip = () => {
    setVerification(prev => ({ ...prev, step: 'skipped' }));
  };

  const handleContinue = () => {
    if (verification.isVerified) {
      console.log("Proceeding with verified account");
      // Navigate to next step with full verification
      navigate("/dashboard"); // Replace with your next route
    } else {
      console.log("Proceeding without verification");
      // Navigate with limited features
      navigate("/dashboard?verified=false"); // Replace with your next route
    }
  };

  const handleBackToSelect = () => {
    setSelectedIdType("");
    setIdNumber("");
    setVerification({
      isVerified: false,
      otpSent: false,
      otp: "",
      isVerifying: false,
      step: 'select'
    });
  };

  // Skip confirmation modal content
  const SkipConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="font-inknut font-semibold text-xl text-black">
          Skip Verification?
        </h3>
        <div className="space-y-3">
          <p className="font-istok text-sm text-gray-600">
            Without verification, you won't be able to:
          </p>
          <div className="bg-red-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center text-red-600 text-sm font-istok">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Send messages to other users
            </div>
            <div className="flex items-center text-red-600 text-sm font-istok">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Comment on posts
            </div>
            <div className="flex items-center text-red-600 text-sm font-istok">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Create group chats
            </div>
            <div className="flex items-center text-red-600 text-sm font-istok">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Access premium features
            </div>
            <div className="flex items-center text-red-600 text-sm font-istok">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Report inappropriate content
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => setVerification(prev => ({ ...prev, step: 'select' }))}
          className="w-full bg-snubo-red text-white font-inknut font-semibold text-sm py-3 px-6 rounded-full hover:bg-red-600 transition-colors"
        >
          Complete Verification
        </button>
        <button
          onClick={handleContinue}
          className="w-full border border-gray-300 text-gray-700 font-inknut font-medium text-sm py-3 px-6 rounded-full hover:bg-gray-50 transition-colors"
        >
          Continue Without Verification
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        {/* Logo */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-inknut font-semibold text-4xl sm:text-5xl lg:text-6xl text-snubo-red drop-shadow-lg">
            Snubo
          </h1>
          <p className="font-istok text-sm sm:text-base lg:text-lg text-black">
            Designed for good.
          </p>
        </div>

        {/* Content based on verification step */}
        {verification.step === 'select' && (
          <>
            {/* Title */}
            <div className="space-y-2 sm:space-y-4 mt-4">
              <h2 className="font-inknut font-semibold text-2xl sm:text-3xl lg:text-4xl text-black leading-tight">
                Verify your Identity
              </h2>
              <p className="font-istok text-sm sm:text-base text-gray-600">
                Choose your government issued ID for verification
              </p>
            </div>

            {/* ID Type Options */}
            <div className="w-full space-y-3 mt-8">
              {idOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleIdTypeSelect(option.id)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-snubo-red hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-inknut font-medium text-base text-black">
                        {option.title}
                      </h3>
                      <p className="font-istok text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {verification.step === 'details' && selectedOption && (
          <>
            {/* Title */}
            <div className="space-y-2 sm:space-y-4 mt-4">
              <h2 className="font-inknut font-semibold text-2xl sm:text-3xl text-black leading-tight">
                Enter {selectedOption.title}
              </h2>
              <p className="font-istok text-sm sm:text-base text-gray-600">
                {selectedOption.description}
              </p>
            </div>

            {/* ID Number Input */}
            <div className="w-full space-y-4 mt-8">
              <input
                type="text"
                placeholder={selectedOption.placeholder}
                value={idNumber}
                onChange={(e) => handleIdNumberChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-istok text-base focus:border-snubo-red focus:outline-none"
                maxLength={selectedOption.maxLength}
              />
              
              {idNumber && !isValidIdNumber() && (
                <p className="text-red-500 font-istok text-sm text-left">
                  Please enter a valid {selectedOption.title.toLowerCase()} number
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-4 mt-8">
              <button
                onClick={sendOtp}
                disabled={!isValidIdNumber() || verification.isVerifying}
                className={`w-full font-inknut font-semibold text-sm py-3 px-6 rounded-full shadow-lg transition-colors ${
                  isValidIdNumber() && !verification.isVerifying
                    ? "bg-snubo-red text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {verification.isVerifying ? "Sending OTP..." : "Send OTP"}
              </button>

              <button
                onClick={handleBackToSelect}
                className="w-full font-inknut font-medium text-sm py-3 px-6 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to ID Selection
              </button>
            </div>
          </>
        )}

        {verification.step === 'otp' && (
          <>
            {/* Title */}
            <div className="space-y-2 sm:space-y-4 mt-4">
              <h2 className="font-inknut font-semibold text-2xl sm:text-3xl text-black leading-tight">
                Enter Verification Code
              </h2>
              <p className="font-istok text-sm sm:text-base text-gray-600">
                We've sent a 6-digit code for verification
              </p>
            </div>

            {/* OTP Input */}
            <div className="w-full space-y-4 mt-8">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={verification.otp}
                onChange={(e) => setVerification(prev => ({ 
                  ...prev, 
                  otp: e.target.value.replace(/\D/g, "").slice(0, 6) 
                }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-istok text-base text-center focus:border-snubo-red focus:outline-none tracking-wider"
                maxLength={6}
              />

              <button
                onClick={sendOtp}
                disabled={verification.isVerifying}
                className="w-full bg-gray-100 text-gray-700 font-istok text-sm py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {verification.isVerifying ? "Resending..." : "Resend OTP"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-4 mt-8">
              <button
                onClick={verifyOtp}
                disabled={verification.otp.length !== 6 || verification.isVerifying}
                className={`w-full font-inknut font-semibold text-sm py-3 px-6 rounded-full shadow-lg transition-colors ${
                  verification.otp.length === 6 && !verification.isVerifying
                    ? "bg-snubo-red text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {verification.isVerifying ? "Verifying..." : "Verify"}
              </button>

              <button
                onClick={handleBackToSelect}
                className="w-full font-inknut font-medium text-sm py-3 px-6 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to ID Selection
              </button>
            </div>
          </>
        )}

        {verification.step === 'verified' && (
          <>
            {/* Success State */}
            <div className="space-y-6 mt-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h2 className="font-inknut font-semibold text-2xl text-black">
                  Verification Complete!
                </h2>
                <p className="font-istok text-sm text-gray-600">
                  Your identity has been successfully verified
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-istok text-sm text-green-700">
                  You now have access to all Snubo features including messaging, commenting, and premium content.
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-snubo-red text-white font-inknut font-semibold text-sm py-3 px-6 rounded-full hover:bg-red-600 transition-colors mt-8"
            >
              Continue to Snubo
            </button>
          </>
        )}

        {verification.step === 'skipped' && <SkipConfirmation />}

        {/* Skip Button - Show on select and details steps */}
        {(verification.step === 'select' || verification.step === 'details') && (
          <button
            onClick={handleSkip}
            className="font-inknut font-medium text-sm text-gray-500 hover:text-gray-700 transition-colors mt-4"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}