import { Link } from "react-router-dom";
import { Home, MessageSquare, Plus, Bell, User } from "lucide-react";

interface BottomNavProps {
  isHome?: boolean;
  isMessages?: boolean;
  isNotifications?: boolean;
  isProfile?: boolean;
}

export default function BottomNav({
  isHome,
  isMessages,
  isNotifications,
  isProfile,
}: BottomNavProps) {
  return (
    <nav
      className="flex-shrink-0 fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md border-t border-light z-50"
      style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto py-2 px-4">
        {/* Home */}
        <Link
          to="/homee"
          className={`p-2 rounded-xl transition-colors ${
            isHome ? "bg-red-50 text-red-600" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <Home size={24} />
        </Link>

        {/* Messages */}
        <Link
          to="/messages"
          className={`p-2 rounded-xl transition-colors ${
            isMessages ? "bg-red-50 text-red-600" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <MessageSquare size={24} />
        </Link>

        {/* Create Button */}
        <Link
          to="/add"
          aria-label="Add"
          className="relative p-3 text-white rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Plus size={24} />
        </Link>

        {/* Notifications */}
        <Link
          to="/notification"
          className={`p-2 rounded-xl transition-colors relative ${
            isNotifications ? "bg-red-50 text-red-600" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <Bell size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className={`p-2 rounded-xl transition-colors ${
            isProfile ? "bg-red-50 text-red-600" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
}
