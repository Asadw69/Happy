import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import {
  Menu,
  Share2,
  MapPin,
  Globe,
  BadgeCheck,
  LinkIcon,
  Grid3X3,
  Bookmark,
  Tag,
  Home,
  MessageSquare,
  Plus,
  Bell,
  User as UserIcon,
  Heart,
  X,
  Send,
} from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  likes?: number;
  comments?: { id: string; text: string }[];
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts",
  );

  const posts = useMemo<MediaItem[]>(
    () => [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&h=600&fit=crop",
        alt: "Coffee and laptop",
        caption: "Perfect morning coffee and deep focus ☕💻",
        likes: 12,
        comments: [{ id: "c1", text: "Love this setup!" }],
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=600&fit=crop",
        alt: "Happy dog",
        caption: "This good boy just made my day 🐶",
        likes: 34,
        comments: [{ id: "c1", text: "Adorable!" }],
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=600&h=600&fit=crop",
        alt: "City at night",
        caption: "City lights and late night walks ✨",
        likes: 18,
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
        alt: "Sports car",
        caption: "Dream machine in matte black 🏎️",
        likes: 52,
      },
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=600&fit=crop",
        alt: "Sunset",
        caption: "Chasing sunsets never gets old 🌅",
        likes: 27,
      },
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop",
        alt: "Cat",
        caption: "New coworker joined the desk 🐾",
        likes: 19,
      },
      {
        id: "7",
        url: "https://images.unsplash.com/photo-1520975922533-0f5f4190841a?w=600&h=600&fit=crop",
        alt: "Beach",
        caption: "Salt in the air, peace in my mind",
        likes: 21,
      },
      {
        id: "8",
        url: "https://images.unsplash.com/photo-1520975611572-50b8b31f6a5a?w=600&h=600&fit=crop",
        alt: "Mountains",
        caption: "Where the Wi‑Fi is weak and views are strong ⛰️",
        likes: 44,
      },
      {
        id: "9",
        url: "https://images.unsplash.com/photo-1614853317868-91aa0c91a3cf?w=600&h=600&fit=crop",
        alt: "Workspace",
        caption: "Clean desk, clear mind.",
        likes: 13,
      },
    ],
    [],
  );

  const saved = useMemo<MediaItem[]>(
    () => [
      { id: "s1", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=600&fit=crop", alt: "Forest road" },
      { id: "s2", url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop", alt: "Car" },
      { id: "s3", url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop", alt: "Camera" },
    ],
    [],
  );

  const tagged = useMemo<MediaItem[]>(
    () => [
      { id: "t1", url: "https://images.unsplash.com/photo-1492447216082-4726bf04d1f4?w=600&h=600&fit=crop", alt: "Friends" },
      { id: "t2", url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=600&fit=crop", alt: "Brunch" },
      { id: "t3", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop", alt: "Hiking" },
    ],
    [],
  );

  const gridForTab = activeTab === "posts" ? posts : activeTab === "saved" ? saved : tagged;

  const [openId, setOpenId] = useState<string | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() =>
    posts.reduce((acc, p) => {
      acc[p.id] = p.likes ?? 0;
      return acc;
    }, {} as Record<string, number>),
  );
  const [commentsMap, setCommentsMap] = useState<Record<string, string[]>>(() =>
    posts.reduce((acc, p) => {
      acc[p.id] = (p.comments?.map((c) => c.text)) ?? [];
      return acc;
    }, {} as Record<string, string[]>),
  );
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = useMemo(() => posts.find((p) => p.id === openId) || null, [openId, posts]);
  const toggleLike = () => {
    if (!openId) return;
    setLiked((s) => {
      const next = !s[openId];
      setLikesMap((m) => ({ ...m, [openId]: (m[openId] ?? 0) + (next ? 1 : -1) }));
      return { ...s, [openId]: next };
    });
  };

  const focusComment = () => {
    const el = document.getElementById("snubo-comment-input");
    if (el) (el as HTMLInputElement).focus();
  };

  const addComment = () => {
    if (!openId) return;
    const text = commentText.trim();
    if (!text) return;
    setCommentsMap((m) => ({ ...m, [openId]: [ ...(m[openId] ?? []), text ] }));
    setCommentText("");
  };

  const shareCurrent = async () => {
    if (!openId) return;
    const url = `${window.location.origin}/profile?post=${openId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Snubo Post", text: current?.caption || "Check out this Snubo post", url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    alert("Post link copied to clipboard");
  };

  const onShare = async () => {
    const profileUrl = window.location.origin + "/profile";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Snubo Profile", text: "Check out this profile on Snubo", url: profileUrl });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(profileUrl);
    alert("Profile link copied to clipboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <h1 className="font-inknut font-semibold text-2xl text-snubo-red">Snubo</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Menu className="text-gray-600" size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full pb-20">
        {/* Cover */}
        <div className="w-full h-36 sm:h-44 bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=400&fit=crop"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Avatar & Actions */}
        <div className="px-4 relative flex flex-col items-center">
          <div className="-mt-10 flex items-end justify-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=asad"
              alt="Asad Siddiqui"
              className="w-20 h-20 rounded-full ring-4 ring-white bg-gray-100"
            />
          </div>
          <div className="mt-3 flex gap-2 justify-center w-full">
            <button className="py-2 px-4 rounded-full border border-gray-300 text-sm font-istok font-medium hover:bg-gray-50">Edit Profile</button>
            <button onClick={onShare} className="py-2 px-4 rounded-full border border-gray-300 text-sm font-istok font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Share2 size={16} /> Share Profile
            </button>
          </div>
        </div>

        {/* Name & Bio */}
        <section className="px-4 mt-4 space-y-1 text-center">
          <div className="flex items-center gap-1 justify-center">
            <h2 className="font-inknut font-semibold text-xl">Asad Siddiqui</h2>
            <BadgeCheck size={18} className="text-snubo-red" />
          </div>
          <p className="text-gray-600 font-istok text-sm">@asad_w69</p>
          <div className="flex items-center flex-wrap gap-3 text-gray-700 font-istok text-sm mt-1 justify-center">
            <span className="flex items-center gap-1"><MapPin size={16} /> India</span>
            <a href="https://asadsiddiqui.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><Globe size={16} /> asadsiddiqui.com</a>
            <span className="flex items-center gap-1"><LinkIcon size={16} /> Content Creator</span>
          </div>
          <p className="font-istok text-[15px] text-gray-800 mt-2">
            "Life is what happens when you're busy making other plans. ✨ Creating moments that matter."
          </p>
        </section>

        {/* Stats */}
        <section className="px-4 mt-3 flex items-center gap-6 justify-center">
          <div className="text-center">
            <p className="font-istok font-semibold text-base">20</p>
            <p className="font-istok text-xs text-gray-600">posts</p>
          </div>
          <div className="text-center">
            <p className="font-istok font-semibold text-base">252</p>
            <p className="font-istok text-xs text-gray-600">followers</p>
          </div>
          <div className="text-center">
            <p className="font-istok font-semibold text-base">315</p>
            <p className="font-istok text-xs text-gray-600">following</p>
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-4 border-t border-b border-gray-200 bg-white">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 py-3 px-2 text-sm font-istok font-medium ${activeTab === "posts" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
            >
              <Grid3X3 size={18} /> Posts
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 py-3 px-2 text-sm font-istok font-medium ${activeTab === "saved" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
            >
              <Bookmark size={18} /> Saved
            </button>
            <button
              onClick={() => setActiveTab("tagged")}
              className={`flex items-center gap-2 py-3 px-2 text-sm font-istok font-medium ${activeTab === "tagged" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
            >
              <Tag size={18} /> Tagged
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1">
          {gridForTab.map((item) => (
            <button
              key={item.id}
              onClick={() => activeTab === "posts" && setOpenId(item.id)}
              className={`aspect-square bg-gray-100 ${activeTab === "posts" ? "cursor-pointer" : "cursor-default"}`}
            >
              <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {openId && current && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setOpenId(null)}>
            <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <img src={current.url} alt={current.alt} className="w-full h-auto rounded-md" />
              <button className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow" onClick={() => setOpenId(null)} aria-label="Close">
                <X size={18} className="text-gray-800" />
              </button>

              <div className="bg-white rounded-b-md px-4 py-3">
                {/* Caption */}
                {current.caption && (
                  <p className="text-sm font-istok text-gray-800 mb-3">{current.caption}</p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <button onClick={toggleLike} className="p-2 rounded-full hover:bg-gray-100" aria-label="Like">
                      <Heart size={22} className={`${liked[openId] ? "text-snubo-red fill-current" : "text-gray-700"}`} />
                    </button>
                    <button onClick={focusComment} className="p-2 rounded-full hover:bg-gray-100" aria-label="Comment">
                      <MessageSquare size={22} className="text-gray-700" />
                    </button>
                    <button onClick={shareCurrent} className="p-2 rounded-full hover:bg-gray-100" aria-label="Share">
                      <Share2 size={22} className="text-gray-700" />
                    </button>
                  </div>
                  <p className="text-sm font-istok text-gray-700">{likesMap[openId] ?? 0} likes</p>
                </div>

                {/* Comments */}
                <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                  {(commentsMap[openId] ?? []).map((c, i) => (
                    <p key={`${openId}-c-${i}`} className="text-sm font-istok text-gray-700">{c}</p>
                  ))}
                  {(!commentsMap[openId] || commentsMap[openId].length === 0) && (
                    <p className="text-xs font-istok text-gray-500">Be the first to comment</p>
                  )}
                </div>

                {/* Add Comment */}
                <div className="flex items-center gap-2">
                  <input
                    id="snubo-comment-input"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-snubo-red/40"
                    placeholder="Add a comment..."
                  />
                  <button onClick={addComment} className="px-3 py-2 bg-snubo-red hover:bg-red-600 text-white rounded-md flex items-center gap-1 text-sm">
                    <Send size={16} /> Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
