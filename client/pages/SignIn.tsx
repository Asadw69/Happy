import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ValidatedInput } from "@/components/ValidatedInput";
import { Check } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { isValid: false, message: "Email is required" };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }
    return { isValid: true, message: "Valid email address" };
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return { isValid: false, message: "Password is required" };
    }
    return { isValid: true, message: "Password entered" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials
    if (formData.email === "test123@gmail.com" && formData.password === "123456") {
      setIsLoading(true);
      
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setShowSuccess(true);
      
      // Show success animation then navigate
      setTimeout(() => {
        navigate("/homee");
      }, 2500);
    } else {
      alert("Invalid credentials. Please use:\nEmail: test123@gmail.com\nPassword: 123456");
    }
  };

  const isFormValid = () => {
    return validateEmail(formData.email).isValid && 
           validatePassword(formData.password).isValid;
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Success Animation */}
        <div className="relative z-10 text-center">
          {/* Animated 3D Tick */}
          <div className="relative mx-auto mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <div className="w-28 h-28 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <Check size={48} className="text-green-600 animate-pulse" strokeWidth={3} />
                </div>
              </div>
            </div>
            {/* 3D Shadow */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-green-200 rounded-full blur-md opacity-60"></div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="font-inknut font-bold text-3xl sm:text-4xl text-snubo-red">
              Welcome Back!
            </h1>
            <p className="font-istok text-lg sm:text-xl text-gray-700 max-w-sm mx-auto leading-relaxed">
              to the social world
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="w-2 h-2 bg-snubo-red rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-snubo-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-snubo-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </div>
    );
  }

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

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 mt-8">
          <h2 className="font-inknut font-semibold text-xl sm:text-2xl text-black mb-6">
            Sign In
          </h2>
          
          <div className="space-y-4">
            <ValidatedInput
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              validation={validateEmail}
            />
            
            <ValidatedInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              validation={validatePassword}
              showPasswordToggle
            />
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="font-inclusive text-xs text-blue-800 text-center">
              <strong>Demo Credentials:</strong><br/>
              Email: test123@gmail.com<br/>
              Password: 123456
            </p>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full font-inknut font-semibold text-sm lg:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-colors mt-6 ${
              isFormValid() && !isLoading
                ? 'bg-snubo-red text-white hover:bg-red-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Create Account Link */}
          <div className="text-center mt-4">
            <span className="font-inclusive text-sm text-black">Don't have an account? </span>
            <Link 
              to="/signup" 
              className="font-inknut font-semibold text-sm text-snubo-red hover:text-red-600 transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Back to Welcome */}
          <div className="text-center mt-2">
            <Link 
              to="/"
              className="font-inclusive text-sm text-gray-600 hover:text-snubo-red transition-colors"
            >
              ← Back to Welcome
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
