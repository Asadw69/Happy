import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { AtSign, BadgeCheck, Heart, MessageSquare, User } from "lucide-react";

type NotifType = "like" | "mention" | "follow" | "verified";

interface NotifItem {
  id: string;
  type: NotifType;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

export default function Notifications() {
  const [tab, setTab] = useState<"all" | "mentions" | "verified">("all");

  const notifications: NotifItem[] = useMemo(
    () => [
      {
        id: "n1",
        type: "like",
        user: "johndoe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        text: "liked your post",
        time: "1h",
      },
      {
        id: "n2",
        type: "mention",
        user: "sarah",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        text: "mentioned you in a comment",
        time: "2h",
      },
      {
        id: "n3",
        type: "follow",
        user: "mike",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        text: "started following you",
        time: "4h",
      },
      {
        id: "n4",
        type: "verified",
        user: "System",
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=snubo",
        text: "Your account was verified",
        time: "1d",
      },
    ],
    [],
  );

  const visible = notifications.filter((n) =>
    tab === "all" ? true : tab === "mentions" ? n.type === "mention" : n.type === "verified",
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <h1 className="font-inknut font-semibold text-2xl text-snubo-red">Snubo</h1>
        </div>
        {/* Tabs */}
        <div className="max-w-md mx-auto px-4 pb-3 pt-2 bg-white">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("all")}
              className={`flex-1 py-2 rounded-xl text-sm font-istok font-medium border transition-colors ${tab === "all" ? "bg-snubo-red text-white border-snubo-red" : "bg-gray-50 text-gray-700 border-gray-200"}`}
            >
              All
            </button>
            <button
              onClick={() => setTab("mentions")}
              className={`flex-1 py-2 rounded-xl text-sm font-istok font-medium border transition-colors ${tab === "mentions" ? "bg-snubo-red text-white border-snubo-red" : "bg-gray-50 text-gray-700 border-gray-200"}`}
            >
              Mentions
            </button>
            <button
              onClick={() => setTab("verified")}
              className={`flex-1 py-2 rounded-xl text-sm font-istok font-medium border transition-colors ${tab === "verified" ? "bg-snubo-red text-white border-snubo-red" : "bg-gray-50 text-gray-700 border-gray-200"}`}
            >
              Verified
            </button>
          </div>
        </div>
      </header>

      {/* List */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 pb-24 space-y-2">
        {visible.map((n) => (
          <article key={n.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow">
            <img src={n.avatar} alt={n.user} className="w-10 h-10 rounded-full bg-gray-100" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-istok text-gray-800 truncate">
                <span className="font-semibold">{n.user}</span> {n.text}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
            </div>
            <div className="text-gray-500">
              {n.type === "like" && <Heart size={18} />}
              {n.type === "mention" && <AtSign size={18} />}
              {n.type === "follow" && <User size={18} />}
              {n.type === "verified" && <BadgeCheck size={18} className="text-snubo-red" />}
            </div>
          </article>
        ))}

        {visible.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-6">No notifications here yet.</p>
        )}
      </main>

      <BottomNav isNotifications={true} />
    </div>
  );
}
