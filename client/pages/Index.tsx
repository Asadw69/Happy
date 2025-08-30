import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6">
        {/* Logo */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-inknut font-semibold text-4xl sm:text-5xl lg:text-6xl text-snubo-red drop-shadow-lg">
            Snubo
          </h1>
          <p className="font-istok text-sm sm:text-base lg:text-lg text-black">
            Designed for good.
          </p>
        </div>

        {/* Character Illustration */}
        <div className="w-72 sm:w-80 lg:w-96 h-80 sm:h-96 lg:h-[28rem] my-6 sm:my-8 flex items-center justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/fa48382180a4ef2cc32d644a14605280ec9b0944?width=680"
            alt="Snubo character sitting cross-legged with phone"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Legal Text */}
        <p className="font-inclusive text-xs sm:text-sm text-black leading-tight max-w-64 sm:max-w-72 lg:max-w-80 px-2">
          By tapping Sign in or Create account, you agree to our Terms of
          Service. Learn how we process your data in our Privacy Policy and
          Cookies Policy.
        </p>

        {/* Create Account Button */}
        <Link
          to="/signup"
          className="w-56 sm:w-60 lg:w-64 bg-snubo-red text-white font-inknut font-semibold text-sm lg:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:bg-red-600 transition-colors inline-flex items-center justify-center"
        >
          Create Account
        </Link>

        {/* Sign In Link */}
        <Link
          to="/signin"
          className="font-inknut font-semibold text-sm lg:text-base text-black hover:text-snubo-red transition-colors mt-2 sm:mt-4"
        >
          Sign in
        </Link>

        {/* Browse without signup */}
        <Link
          to="/homee"
          className="font-istok text-sm text-gray-600 hover:text-snubo-red transition-colors mt-4"
        >
          Browse as guest
        </Link>
      </div>
    </div>
  );
}
