import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share,
  Search,
  Menu,
  Home,
  MessageSquare,
  Plus,
  Bell,
  User,
  Smile,
  Calendar,
  Star,
  Box,
  ShoppingBag,
  Briefcase,
  Video,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";

// --- Interfaces and Data ---
interface Post {
  id: string;
  username: string;
  userAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  isBookmarked: boolean;
}

// Data for the new Explore/Discovery page
const discoveryContent = {
  forYou: [
    {
      id: "fy1",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1574629810360-15b565251e39?w=400",
    },
    {
      id: "fy2",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1517488629431-1a8b16c5642b?w=400",
    },
    {
      id: "fy3",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1551024709-8f237c20454d?w=400",
    },
    {
      id: "fy4",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    },
    {
      id: "fy5",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1543353071-873f6b64b638?w=400",
    },
    {
      id: "fy6",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1529429617124-95b102e8675c?w=400",
    },
    {
      id: "fy7",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1626202157973-da3087289504?w=400",
    },
    {
      id: "fy8",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1587574933979-44b4c738c298?w=400",
    },
    {
      id: "fy9",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    },
  ],
  sports: [
    {
      id: "s1",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
    },
    {
      id: "s2",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    },
    {
      id: "s3",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=400",
    },
    {
      id: "s4",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400",
    },
    {
      id: "s5",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1543321269-9e42663e5222?w=400",
    },
  ],
  cooking: [
    {
      id: "c1",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17021?w=400",
    },
    {
      id: "c2",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    },
    {
      id: "c3",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    },
    {
      id: "c4",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1484723050470-b53b9f45c093?w=400",
    },
  ],
  memes: [
    {
      id: "m1",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400",
    },
    {
      id: "m2",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1593085512500-24127878a85a?w=400",
    },
    {
      id: "m3",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1589254065909-b7086229d08c?w=400",
    },
  ],
  travel: [
    {
      id: "t1",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400",
    },
    {
      id: "t2",
      type: "video",
      imageUrl:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400",
    },
    {
      id: "t3",
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
    },
  ],
};

const interests = ["For You", "Sports", "Cooking", "Memes", "Travel"];

// --- Component ---
export default function HomePage() {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState("follow");
  const [selectedInterest, setSelectedInterest] = useState("forYou");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "johndoe",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      timeAgo: "2h",
      content: "Perfect morning coffee ☕ Nothing beats this view! Just discovered this amazing little café downtown.",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=500&fit=crop",
      likes: 124,
      isLiked: false,
      comments: 23,
      isBookmarked: false,
    },
    {
      id: "2",
      username: "sarah_creates",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      timeAgo: "4h",
      content:
        "Working on some new art pieces today! Love the creative process 🎨✨ There's something magical about bringing ideas to life.",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
      likes: 287,
      isLiked: true,
      comments: 45,
      isBookmarked: true,
    },
    {
      id: "3",
      username: "travel_mike",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      timeAgo: "6h",
      content:
        "Just discovered this amazing hidden gem in the city. Sometimes the best places are right under our noses! 🏛️",
      likes: 89,
      isLiked: false,
      comments: 12,
      isBookmarked: false,
    },
    {
      id: "4",
      username: "foodie_alex",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      timeAgo: "8h",
      content:
        "Homemade pasta night! 🍝 There's nothing more satisfying than making everything from scratch. Recipe in my bio!",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500&h=500&fit=crop",
      likes: 156,
      isLiked: true,
      comments: 34,
      isBookmarked: false,
    },
  ]);

  // --- Functions ---
  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      ),
    );
  };

  // --- Render Helper for Tabs ---
  const TabButton = ({
    tabName,
    children,
    count,
  }: {
    tabName: string;
    children: React.ReactNode;
    count?: number;
  }) => (
    <button
      className={`relative px-4 py-3 font-medium text-sm transition-all duration-300 rounded-xl ${
        activeTab === tabName
          ? "text-red-600 bg-red-50"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab(tabName)}
    >
      <div className="flex items-center space-x-1">
        {children}
        {count && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">
            {count}
          </span>
        )}
      </div>
    </button>
  );

  // --- JSX ---
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-brand { font-family: 'Inknut Antiqua', serif; }
        .font-ui { font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar-x::-webkit-scrollbar { display: none; }
        .hide-scrollbar-x { -ms-overflow-style: none; scrollbar-width: none; }
        
        .snubo-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .snubo-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .snubo-button-primary {
          background: #dc2626;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          font-weight: 500;
          transition: all 0.2s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .snubo-button-primary:hover {
          background: #b91c1c;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: scale(0.98);
        }
        
        .snubo-button-ghost {
          color: #6b7280;
          padding: 0.5rem;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }
        
        .snubo-button-ghost:hover {
          background: #f3f4f6;
          color: #374151;
        }
        
        .snubo-input {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #374151;
          transition: all 0.2s;
        }
        
        .snubo-input:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        
        .snubo-input::placeholder {
          color: #9ca3af;
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .shadow-glow {
          box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.1), 0 0 20px rgba(220, 38, 38, 0.15);
        }
        
        .gradient-red {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }
        
        .bg-surface { background: #fafafa; }
        .text-primary { color: #1f2937; }
        .text-secondary { color: #6b7280; }
        .text-muted { color: #9ca3af; }
        .border-light { border-color: #e5e7eb; }
        .hover-bg { background: #f3f4f6; }
      `}</style>

      <div className="flex flex-col h-screen bg-surface font-ui">
        {/* Header with Enhanced Design */}
        <header className="flex-shrink-0 sticky top-0 bg-white bg-opacity-95 backdrop-blur-md border-b border-light px-4 py-4 z-50" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center">
              <h1 className="font-brand font-semibold text-2xl text-red-600">
                Snubo
              </h1>
            </div>
            
            <div className="flex items-center space-x-1">
              <TabButton tabName="follow">
                <span>Follow</span>
              </TabButton>
              <TabButton tabName="search">
                <Search size={18} />
              </TabButton>
              <TabButton tabName="snip" count={6}>
                <span>Snip</span>
              </TabButton>
            </div>
            
            <button className="snubo-button-ghost">
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full pb-20 hide-scrollbar">
          {/* Follow Tab Content */}
          {activeTab === "follow" && (
            <div className="space-y-6 pt-2">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`snubo-card mx-4 overflow-hidden ${
                    index === 0 ? "shadow-glow" : ""
                  }`}
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4 pb-3">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={post.userAvatar}
                          alt={post.username}
                          className="w-12 h-12 rounded-full bg-gray-100"
                          style={{ border: '2px solid #e5e7eb' }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-ui font-semibold text-sm text-primary">
                          {post.username}
                        </h3>
                        <p className="font-ui text-xs text-muted">
                          {post.timeAgo} • Following
                        </p>
                      </div>
                    </div>
                    <button className="snubo-button-ghost p-2">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="font-ui text-primary leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                            post.isLiked
                              ? "bg-red-50 text-red-600"
                              : "hover:bg-gray-100 text-secondary"
                          }`}
                        >
                          <Heart
                            size={20}
                            className={post.isLiked ? "fill-current" : ""}
                          />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-secondary transition-colors duration-200">
                          <MessageCircle size={20} />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        
                        <button className="snubo-button-ghost p-2">
                          <Share size={20} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          post.isBookmarked
                            ? "bg-red-50 text-red-600"
                            : "hover:bg-gray-100 text-secondary"
                        }`}
                      >
                        <Bookmark size={20} className={post.isBookmarked ? "fill-current" : ""} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Search Tab Content */}
          {activeTab === "search" && (
            <div className="space-y-6 pt-4">
              <div className="px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="text"
                    className="snubo-input w-full pl-10"
                    placeholder="Search interests, people, and more..."
                  />
                </div>
              </div>

              {/* Interest Categories */}
              <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar-x pl-4">
                {interests.map((interest) => {
                  const interestKey = interest.toLowerCase().replace(" ", "");
                  return (
                    <button
                      key={interest}
                      onClick={() => setSelectedInterest(interestKey)}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                        selectedInterest === interestKey
                          ? "bg-red-600 text-white"
                          : "bg-white text-secondary hover:text-primary border border-light"
                      }`}
                      style={{ 
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-3 gap-2 px-4">
                {discoveryContent[
                  selectedInterest as keyof typeof discoveryContent
                ].map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square relative cursor-pointer group rounded-xl overflow-hidden"
                    style={{ 
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s'
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt="Discovery content"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.type === "video" && (
                      <div className="absolute top-2 right-2 p-1 bg-black bg-opacity-60 rounded-lg backdrop-blur-sm">
                        <Video size={14} className="text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Snip Tab Content */}
          {activeTab === "snip" && (
            <div className="p-4 space-y-4">
              {[
                {
                  icon: <Smile size={18} />,
                  title: "Daily Motivation",
                  desc: "Quick inspirational quotes to kickstart your day and boost your mood.",
                  tags: ["motivation", "wellness", "daily"],
                  color: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                },
                {
                  icon: <Calendar size={18} />,
                  title: "Weekend Plans",
                  desc: "Curated ideas for making the most of your weekend adventures.",
                  tags: ["weekend", "activities", "fun"],
                  color: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                },
                {
                  icon: <Star size={18} />,
                  title: "Creative Spark",
                  desc: "Art tips and creative challenges to fuel your artistic journey.",
                  tags: ["art", "creativity", "inspiration"],
                  color: "linear-gradient(135deg, #eab308 0%, #f97316 100%)",
                },
                {
                  icon: <Box size={18} />,
                  title: "Tech Updates",
                  desc: "Latest trends, gadget reviews, and digital tips for tech enthusiasts.",
                  tags: ["technology", "gadgets", "innovation"],
                  color: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
                },
                {
                  icon: <ShoppingBag size={18} />,
                  title: "Food Adventures",
                  desc: "Delicious recipes and restaurant recommendations from around the world.",
                  tags: ["food", "recipes", "cooking"],
                  color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                },
                {
                  icon: <Briefcase size={18} />,
                  title: "Self Care",
                  desc: "Mental health tips and wellness routines for a balanced lifestyle.",
                  tags: ["wellness", "self-care", "mindfulness"],
                  color: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="snubo-card p-5 cursor-pointer group hover:scale-102 transition-all duration-300"
                  style={{ transform: 'scale(1)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 flex items-center justify-center text-white rounded-xl"
                      style={{ 
                        background: item.color,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-ui font-semibold text-lg text-primary">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-ui text-secondary mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-gray-100 text-muted px-3 py-1.5 rounded-full border border-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Enhanced Bottom Navigation */}
        <nav className="flex-shrink-0 fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md border-t border-light" style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-center justify-around max-w-md mx-auto py-3 px-4">
            <button className="flex flex-col items-center space-y-1 p-2 rounded-xl bg-red-50 text-red-600">
              <Home size={22} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 text-secondary transition-colors">
              <MessageSquare size={22} />
              <span className="text-xs font-medium">Messages</span>
            </button>
            
            <button 
              className="relative p-4 text-white rounded-2xl transition-all duration-300 active:scale-95"
              style={{ 
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Plus size={24} />
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 text-secondary transition-colors relative">
              <Bell size={22} />
              <span className="text-xs font-medium">Notifications</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
            </button>
            
            <Link
              to="/profile"
              className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 text-secondary transition-colors"
            >
              <User size={22} />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
