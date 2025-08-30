import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Search,
  Plus,
  MoreHorizontal,
  Phone,
  Video,
} from "lucide-react";

// --- Interfaces and Data ---
interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isRead: boolean;
}

// Sample data
const onlineUsers: User[] = [
  {
    id: "1",
    username: "mariii05",
    displayName: "Maria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    isOnline: true,
  },
  {
    id: "2",
    username: "lea.98",
    displayName: "Lea",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lea",
    isOnline: true,
  },
  {
    id: "3",
    username: "gabriel.g",
    displayName: "Gabriel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel",
    isOnline: false,
  },
  {
    id: "4",
    username: "sarah_creates",
    displayName: "Sarah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    isOnline: true,
  },
  {
    id: "5",
    username: "alex_dev",
    displayName: "Alex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    isOnline: true,
  },
  {
    id: "6",
    username: "mike_photo",
    displayName: "Mike",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    isOnline: false,
  },
];

const conversations: Message[] = [
  {
    id: "1",
    user: onlineUsers[0],
    lastMessage: "You owe me money! Respond!",
    timestamp: "Just now",
    unreadCount: 3,
    isRead: false,
  },
  {
    id: "2",
    user: onlineUsers[1],
    lastMessage: "You: I'm afraid he will sue me for that but wh...",
    timestamp: "12 min.",
    unreadCount: 0,
    isRead: true,
  },
  {
    id: "3",
    user: onlineUsers[2],
    lastMessage: "Hello, can you answer? What's wrong with",
    timestamp: "1h",
    unreadCount: 0,
    isRead: false,
  },
  {
    id: "4",
    user: onlineUsers[3],
    lastMessage: "Thanks for the art feedback! Really appreciate it",
    timestamp: "2h",
    unreadCount: 0,
    isRead: true,
  },
  {
    id: "5",
    user: {
      id: "johndoe",
      username: "johndoe",
      displayName: "John",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      isOnline: false,
    },
    lastMessage: "That coffee shop recommendation was perfect!",
    timestamp: "4h",
    unreadCount: 0,
    isRead: true,
  },
  {
    id: "6",
    user: {
      id: "mike_outdoors",
      username: "mike_outdoors",
      displayName: "Mike",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikeout",
      isOnline: true,
    },
    lastMessage: "The sunset hike was amazing yesterday",
    timestamp: "6h",
    unreadCount: 0,
    isRead: true,
  },
  {
    id: "7",
    user: {
      id: "alex_reads",
      username: "alex_reads",
      displayName: "Alex",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexread",
      isOnline: false,
    },
    lastMessage: "Any book recommendations for this weekend?",
    timestamp: "8h",
    unreadCount: 0,
    isRead: true,
  },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on active tab
  const filteredConversations = conversations.filter((conv) => {
    if (activeTab === "unread") return !conv.isRead || conv.unreadCount > 0;
    if (activeTab === "requests") return false; // Could add request logic
    return true;
  });

  // Filter by search query
  const searchedConversations = filteredConversations.filter(
    (conv) =>
      conv.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TabButton = ({
    tabName,
    label,
    badge,
  }: {
    tabName: string;
    label: string;
    badge?: number;
  }) => (
    <button
      className={`py-3 px-4 text-sm font-semibold transition-all duration-300 relative flex items-center gap-2 ${
        activeTab === tabName
          ? "text-[#e53e3e] border-b-2 border-[#e53e3e]"
          : "text-gray-500 hover:text-gray-800"
      }`}
      onClick={() => setActiveTab(tabName)}
    >
      {label}
      {badge && badge > 0 && (
        <span className="bg-[#e53e3e] text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Inline Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inknut+Antiqua:wght@400;500;600;700&display=swap');
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .glass-bg {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .message-hover:hover {
          background: rgba(229, 62, 62, 0.02);
          transform: translateY(-1px);
        }
        
        .online-indicator {
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          position: absolute;
          bottom: 1px;
          right: 1px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .avatar-ring {
          background: linear-gradient(135deg, #e53e3e, #ff6b6b);
          padding: 2px;
          border-radius: 50%;
        }
        
        .message-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .search-input {
          background: rgba(249, 250, 251, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          background: white;
          border-color: rgba(229, 62, 62, 0.3);
          box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
      `}</style>

      <div className="flex flex-col h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Header */}
        <header className="glass-bg sticky top-0 z-20 border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <Link 
                to="/homee"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </Link>
              <h1 
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: 'Inknut Antiqua, serif' }}
              >
                Messages
              </h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        <div className="flex-1 max-w-md mx-auto w-full">
          {/* Search Bar */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Online Users */}
          <div className="px-4 mb-4">
            <div className="flex items-center gap-4">
              {/* New Message Button */}
              <button className="flex-shrink-0 w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors group">
                <Plus size={20} className="text-gray-600 group-hover:text-gray-800" />
              </button>

              {/* Online Users Scroll */}
              <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                {onlineUsers.map((user) => (
                  <button
                    key={user.id}
                    className="flex-shrink-0 flex flex-col items-center gap-1 group"
                  >
                    <div className="relative">
                      <div className={user.isOnline ? "avatar-ring" : ""}>
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full bg-gray-200"
                        />
                      </div>
                      {user.isOnline && <div className="online-indicator" />}
                    </div>
                    <span className="text-xs text-gray-600 max-w-[50px] truncate">
                      {user.username}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center border-b border-gray-100 px-4">
            <TabButton 
              tabName="messages" 
              label="Messages" 
              badge={conversations.filter(c => !c.isRead || c.unreadCount > 0).length}
            />
            <TabButton 
              tabName="unread" 
              label="Unread" 
            />
            <TabButton 
              tabName="requests" 
              label="Requests" 
            />
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {searchedConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="message-card message-hover px-4 py-3 border-b border-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.displayName}
                      className="w-12 h-12 rounded-full bg-gray-200"
                    />
                    {conversation.user.isOnline && (
                      <div className="online-indicator" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {conversation.user.username}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {conversation.timestamp}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <div className="w-2 h-2 bg-[#e53e3e] rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className={`text-sm truncate ${
                      conversation.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {searchedConversations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Search size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-center">
                  {searchQuery ? 'No messages found' : 'No conversations yet'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#e53e3e] hover:bg-[#d53030] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-10">
          <Plus size={24} />
        </button>
      </div>
    </>
  );
}