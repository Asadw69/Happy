import { Link } from "react-router-dom";

export default function Index() {
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

        {/* Character Illustration */}
        <div className="w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-80 md:h-96 lg:h-[28rem] my-4 sm:my-6 md:my-8 flex items-center justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/fa48382180a4ef2cc32d644a14605280ec9b0944?width=680"
            alt="Snubo character sitting cross-legged with phone"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Legal Text */}
        <p className="font-inclusive text-xs sm:text-sm text-black leading-relaxed max-w-56 sm:max-w-64 md:max-w-72 lg:max-w-80 px-2 sm:px-3">
          By tapping Sign in or Create account, you agree to our Terms of
          Service. Learn how we process your data in our Privacy Policy and
          Cookies Policy.
        </p>

        {/* Create Account Button */}
        <Link
          to="/signup"
          className="w-48 sm:w-56 md:w-60 lg:w-64 bg-snubo-red text-white font-inknut font-semibold text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:bg-red-600 transition-colors inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] touch-manipulation"
        >
          Create Account
        </Link>

        {/* Sign In Link */}
        <button className="font-inknut font-semibold text-sm sm:text-base lg:text-lg text-black hover:text-snubo-red transition-colors mt-2 sm:mt-4 py-2 px-4 min-h-[44px] touch-manipulation">
          Sign in
        </button>
      </div>
    </div>
  );
}
