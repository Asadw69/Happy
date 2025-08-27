import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Interest() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestOptions = [
    "Photography",
    "Travel",
    "Food & Cooking",
    "Fitness",
    "Music",
    "Fashion",
    "Art & Design",
    "Technology",
    "Gaming",
    "Books",
    "Movies & TV",
    "Pets",
    "Sports",
    "Nature",
    "Cars",
    "Business",
    "Comedy",
    "Lifestyle",
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 3) {
      console.log("Selected interests:", selectedInterests);
      // Here you would typically save the interests to your backend
      // Navigate to verification page
      navigate("/Verification");
    }
  };

  const isValidSelection = () => {
    return selectedInterests.length >= 3;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        {/* Logo */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-inknut font-semibold text-4xl sm:text-5xl lg:text-6xl text-snubo-red drop-shadow-lg">
            Snubo
          </h1>
          <p className="font-istok text-sm sm:text-base lg:text-lg text-black">
            Designed for good.
          </p>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-2 sm:space-y-4 mt-4">
          <h2 className="font-inknut font-semibold text-2xl sm:text-3xl lg:text-4xl text-black leading-tight">
            Select your Interests
          </h2>
          <p className="font-istok text-sm sm:text-base text-gray-600">
            Choose topics you'd like to see more of
          </p>
        </div>

        {/* Selection Counter */}
        <div className="space-y-2">
          <p className="font-inknut font-medium text-lg text-black">
            {selectedInterests.length} interests selected
          </p>
          <p className="font-istok text-sm text-gray-600">
            Select at least 3 interests to continue
          </p>
        </div>

        {/* Interest Options Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-inknut font-medium rounded-lg border-2 transition-all hover:border-snubo-red ${
                selectedInterests.includes(interest)
                  ? "border-snubo-red bg-red-50 text-snubo-red"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 mt-12">
          <button
            onClick={handleContinue}
            disabled={!isValidSelection()}
            className={`w-full font-inknut font-semibold text-sm lg:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-colors ${
              isValidSelection()
                ? "bg-snubo-red text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          <button
            onClick={() => navigate("/date-of-birth")}
            className="w-full font-inknut font-medium text-sm lg:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Age Selection
          </button>
        </div>
      </div>
    </div>
  );
}