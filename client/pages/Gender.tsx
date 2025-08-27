import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Gender() {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const navigate = useNavigate();

  const genderOptions = [
    {
      id: "male",
      title: "Male",
      description: "Masculine identity",
    },
    {
      id: "female",
      title: "Female",
      description: "Feminine identity",
    },
    {
      id: "other",
      title: "Other",
      description: "Non-binary or prefer not to say",
    },
  ];

  const handleContinue = () => {
    if (selectedGender) {
      // Here you would typically save the gender selection
      console.log("Selected gender:", selectedGender);

      // Navigate to date of birth page
      navigate("/date-of-birth");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8">
        {/* Logo */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-inknut font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-snubo-red drop-shadow-lg">
            Snubo
          </h1>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="font-inknut font-semibold text-lg sm:text-xl md:text-2xl text-black">
            Choose your Gender
          </h2>
          <p className="font-istok text-xs sm:text-sm md:text-base text-gray-600">
            This helps us personalize your experience
          </p>
        </div>

        {/* Gender Options */}
        <div className="w-full space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          {genderOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedGender(option.id)}
              className={`w-full p-3 sm:p-4 border-2 rounded-lg text-left transition-all hover:border-snubo-red min-h-[60px] sm:min-h-[70px] touch-manipulation ${
                selectedGender === option.id
                  ? "border-snubo-red bg-red-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-inknut font-medium text-sm sm:text-base text-black">
                    {option.title}
                  </h3>
                  <p className="font-inclusive text-xs sm:text-sm text-gray-600 mt-1">
                    {option.description}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-colors flex-shrink-0 ml-3 ${
                    selectedGender === option.id
                      ? "border-snubo-red bg-snubo-red"
                      : "border-gray-300"
                  }`}
                >
                  {selectedGender === option.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          <button
            onClick={handleContinue}
            disabled={!selectedGender}
            className={`w-full font-inknut font-semibold text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-colors min-h-[44px] sm:min-h-[48px] touch-manipulation ${
              selectedGender
                ? "bg-snubo-red text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full font-inknut font-medium text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px] sm:min-h-[48px] touch-manipulation"
          >
            Back to previous step
          </button>
        </div>
      </div>
    </div>
  );
}
