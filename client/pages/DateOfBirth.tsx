import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function DateOfBirth() {
  const navigate = useNavigate();

  // State for each digit of the date (DD MM YYYY)
  const [dateInputs, setDateInputs] = useState({
    day1: "",
    day2: "",
    month1: "",
    month2: "",
    year1: "",
    year2: "",
    year3: "",
    year4: "",
  });

  // Refs for each input to handle focus management
  const inputRefs = {
    day1: useRef<HTMLInputElement>(null),
    day2: useRef<HTMLInputElement>(null),
    month1: useRef<HTMLInputElement>(null),
    month2: useRef<HTMLInputElement>(null),
    year1: useRef<HTMLInputElement>(null),
    year2: useRef<HTMLInputElement>(null),
    year3: useRef<HTMLInputElement>(null),
    year4: useRef<HTMLInputElement>(null),
  };

  const handleInputChange = (field: keyof typeof dateInputs, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    // Only allow single digit
    if (value.length > 1) return;

    setDateInputs((prev) => ({ ...prev, [field]: value }));

    // Auto-focus next input
    if (value.length === 1) {
      const fieldOrder = [
        "day1",
        "day2",
        "month1",
        "month2",
        "year1",
        "year2",
        "year3",
        "year4",
      ];
      const currentIndex = fieldOrder.indexOf(field);
      const nextField = fieldOrder[currentIndex + 1];

      if (
        nextField &&
        inputRefs[nextField as keyof typeof inputRefs]?.current
      ) {
        inputRefs[nextField as keyof typeof inputRefs].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    field: keyof typeof dateInputs,
    e: React.KeyboardEvent,
  ) => {
    if (e.key === "Backspace" && dateInputs[field] === "") {
      // Focus previous input on backspace
      const fieldOrder = [
        "day1",
        "day2",
        "month1",
        "month2",
        "year1",
        "year2",
        "year3",
        "year4",
      ];
      const currentIndex = fieldOrder.indexOf(field);
      const prevField = fieldOrder[currentIndex - 1];

      if (
        prevField &&
        inputRefs[prevField as keyof typeof inputRefs]?.current
      ) {
        inputRefs[prevField as keyof typeof inputRefs].current?.focus();
      }
    }
  };

  const isDateComplete = () => {
    return Object.values(dateInputs).every((value) => value !== "");
  };

  const isValidDate = () => {
    if (!isDateComplete()) return false;

    const day = parseInt(dateInputs.day1 + dateInputs.day2);
    const month = parseInt(dateInputs.month1 + dateInputs.month2);
    const year = parseInt(
      dateInputs.year1 + dateInputs.year2 + dateInputs.year3 + dateInputs.year4,
    );

    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    return true;
  };

  const handleContinue = () => {
    if (isValidDate()) {
      const birthDate = `${dateInputs.day1}${dateInputs.day2}/${dateInputs.month1}${dateInputs.month2}/${dateInputs.year1}${dateInputs.year2}${dateInputs.year3}${dateInputs.year4}`;
      console.log("Date of birth:", birthDate);

      // Navigate to Interest page
      navigate("/interest");
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
          <p className="font-istok text-xs sm:text-sm md:text-base lg:text-lg text-black">
            Designed for good.
          </p>
        </div>

        {/* Title */}
        <div className="space-y-3 sm:space-y-4 mt-4">
          <h2 className="font-inknut font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black leading-tight">
            What's your date of birth?
          </h2>
        </div>

        {/* Date Input Fields */}
        <div className="space-y-6 sm:space-y-8">
          {/* Day Month Year Labels and Inputs */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8">
            {/* Day Inputs */}
            <div className="flex space-x-1 sm:space-x-2">
              <input
                ref={inputRefs.day1}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.day1}
                onChange={(e) => handleInputChange("day1", e.target.value)}
                onKeyDown={(e) => handleKeyDown("day1", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="D"
              />
              <input
                ref={inputRefs.day2}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.day2}
                onChange={(e) => handleInputChange("day2", e.target.value)}
                onKeyDown={(e) => handleKeyDown("day2", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="D"
              />
            </div>

            {/* Month Inputs */}
            <div className="flex space-x-1 sm:space-x-2">
              <input
                ref={inputRefs.month1}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.month1}
                onChange={(e) => handleInputChange("month1", e.target.value)}
                onKeyDown={(e) => handleKeyDown("month1", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="M"
              />
              <input
                ref={inputRefs.month2}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.month2}
                onChange={(e) => handleInputChange("month2", e.target.value)}
                onKeyDown={(e) => handleKeyDown("month2", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="M"
              />
            </div>

            {/* Year Inputs */}
            <div className="flex space-x-1 sm:space-x-2">
              <input
                ref={inputRefs.year1}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.year1}
                onChange={(e) => handleInputChange("year1", e.target.value)}
                onKeyDown={(e) => handleKeyDown("year1", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="Y"
              />
              <input
                ref={inputRefs.year2}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.year2}
                onChange={(e) => handleInputChange("year2", e.target.value)}
                onKeyDown={(e) => handleKeyDown("year2", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="Y"
              />
              <input
                ref={inputRefs.year3}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.year3}
                onChange={(e) => handleInputChange("year3", e.target.value)}
                onKeyDown={(e) => handleKeyDown("year3", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="Y"
              />
              <input
                ref={inputRefs.year4}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={dateInputs.year4}
                onChange={(e) => handleInputChange("year4", e.target.value)}
                onKeyDown={(e) => handleKeyDown("year4", e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl md:text-3xl font-bold border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent touch-manipulation"
                placeholder="Y"
              />
            </div>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <p className="font-istok text-xs sm:text-sm md:text-base text-gray-600 max-w-xs sm:max-w-sm">
            We use this to calculate the age on your profile.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 sm:space-y-4 mt-8 sm:mt-12">
          <button
            onClick={handleContinue}
            disabled={!isValidDate()}
            className={`w-full font-inknut font-semibold text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-colors min-h-[44px] sm:min-h-[48px] touch-manipulation ${
              isValidDate()
                ? "bg-snubo-red text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          <button
            onClick={() => navigate("/gender")}
            className="w-full font-inknut font-medium text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px] sm:min-h-[48px] touch-manipulation"
          >
            Back to previous step
          </button>
        </div>
      </div>
    </div>
  );
}
