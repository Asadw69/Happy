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
      content: "Perfect morning coffee ☕ Nothing beats this view!",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=500&fit=crop",
      likes: 24,
      isLiked: false,
    },
    {
      id: "2",
      username: "sarah_creates",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      timeAgo: "4h",
      content:
        "Working on some new art pieces today! Love the creative process 🎨✨",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
      likes: 42,
      isLiked: true,
    },
    {
      id: "3",
      username: "travel_mike",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      timeAgo: "6h",
      content:
        "Just discovered this amazing hidden gem in the city. Sometimes the best places are right under our noses! 🏛️",
      likes: 18,
      isLiked: false,
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

  // --- Render Helper for Tabs ---
  const TabButton = ({
    tabName,
    children,
  }: {
    tabName: string;
    children: React.ReactNode;
  }) => (
    <button
      className={`py-2 px-3 text-sm font-semibold transition-colors duration-300 relative ${activeTab === tabName ? "text-black" : "text-gray-500 hover:text-black"}`}
      onClick={() => setActiveTab(tabName)}
    >
      {children}
      {activeTab === tabName && (
        <span className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-black"></span>
      )}
    </button>
  );

  // --- JSX ---
  return (
    <>
      <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .hide-scrollbar-x::-webkit-scrollbar { display: none; }
                .hide-scrollbar-x { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

      <div className="flex flex-col h-screen bg-white">
        {/* Header with Tabs */}
        <header className="flex-shrink-0 sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <h1 className="font-inknut font-semibold text-2xl text-snubo-red">
              Snubo
            </h1>
            <div className="flex items-center space-x-4">
              <TabButton tabName="follow">Follow</TabButton>
              <TabButton tabName="search">
                <Search size={18} />
              </TabButton>
              <TabButton tabName="snip">Snip</TabButton>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full pb-20 hide-scrollbar">
          {/* Follow Tab Content */}
          {activeTab === "follow" && (
            <div className="space-y-0">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border-b border-gray-100"
                >
                  <div className="flex items-center p-4">
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div className="ml-3 flex-1">
                      <h3 className="font-istok font-medium text-sm text-black">
                        {post.username}
                      </h3>
                      <p className="font-istok text-xs text-gray-500">
                        {post.timeAgo}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <p className="font-istok text-sm text-gray-800 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                  {post.image && (
                    <div className="w-full">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  )}
                  <div className="px-4 pt-2 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Heart
                            size={22}
                            className={
                              post.isLiked
                                ? "text-snubo-red fill-current"
                                : "text-gray-600"
                            }
                          />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <MessageCircle size={22} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <Share size={22} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="font-istok font-semibold text-sm text-black">
                        {post.likes} likes
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Search Tab Content */}
          {activeTab === "search" && (
            <div className="space-y-4 pt-4">
              <div className="px-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-snubo-red/50"
                  placeholder="Search interests..."
                />
              </div>

              {/*--- Interest Categories ---*/}
              <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar-x pl-4">
                {interests.map((interest) => {
                  const interestKey = interest.toLowerCase().replace(" ", "");
                  return (
                    <button
                      key={interest}
                      onClick={() => setSelectedInterest(interestKey)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex-shrink-0 ${
                        selectedInterest === interestKey
                          ? "bg-snubo-red text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              {/*--- Content Grid ---*/}
              <div className="grid grid-cols-3 gap-1">
                {discoveryContent[
                  selectedInterest as keyof typeof discoveryContent
                ].map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square relative cursor-pointer group"
                  >
                    <img
                      src={item.imageUrl}
                      alt="Discovery content"
                      className="w-full h-full object-cover"
                    />
                    {item.type === "video" && (
                      <Video
                        size={18}
                        className="absolute top-2 right-2 text-white drop-shadow-lg"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                  icon: <Smile size={16} />,
                  title: "Daily Motivation",
                  desc: "Quick inspirational quotes to kickstart your day.",
                  tags: ["motivation", "wellness"],
                },
                {
                  icon: <Calendar size={16} />,
                  title: "Weekend Plans",
                  desc: "Ideas for making the most of your weekend.",
                  tags: ["weekend", "activities", "fun"],
                },
                {
                  icon: <Star size={16} />,
                  title: "Creative Spark",
                  desc: "Art tips and creative challenges to fuel your journey.",
                  tags: ["art", "creativity", "inspiration"],
                },
                {
                  icon: <Box size={16} />,
                  title: "Tech Updates",
                  desc: "Latest trends, gadget reviews, and digital tips.",
                  tags: ["technology", "gadgets"],
                },
                {
                  icon: <ShoppingBag size={16} />,
                  title: "Food Adventures",
                  desc: "Delicious recipes and restaurant recommendations.",
                  tags: ["food", "recipes", "cooking"],
                },
                {
                  icon: <Briefcase size={16} />,
                  title: "Self Care",
                  desc: "Mental health tips and wellness routines for balance.",
                  tags: ["wellness", "self-care"],
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-lg hover:border-snubo-red/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-snubo-red text-white rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <h3 className="font-inknut font-semibold text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-istok text-sm text-gray-600 mb-3">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
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

        {/* Bottom Navigation */}
        <nav className="flex-shrink-0 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <Home size={24} className="text-snubo-red" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <MessageSquare size={24} className="text-gray-600" />
            </button>
            <button className="p-3 bg-snubo-red hover:bg-red-600 rounded-full transition-colors">
              <Plus size={24} className="text-white" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={24} className="text-gray-600" />
            </button>
            <Link
              to="/profile"
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User size={24} className="text-gray-600" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
