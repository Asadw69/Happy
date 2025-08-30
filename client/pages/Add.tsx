import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Type,
  X,
  Hash,
  Sparkles,
} from "lucide-react";

const CAPTION_LIMIT = 2200;
const SNIP_LIMIT = 280;

const snipBackgrounds: string[] = [];

const quickChips = ["✨", "🔥", "❤️", "#snubo", "#vibes", "#newpost"];

export default function Add() {
  const [mode, setMode] = useState<"photo" | "video" | "snip">("photo");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [snipText, setSnipText] = useState("");
  const [snipBgIdx] = useState<number | undefined>(undefined);
  const imgInput = useRef<HTMLInputElement>(null);
  const vidInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const resetAll = () => {
    setPreviewUrl(null);
    setCaption("");
    setSnipText("");
  };

  const onPickImage = () => imgInput.current?.click();
  const onPickVideo = () => vidInput.current?.click();

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  }, []);

  const canPost = () => {
    if (mode === "snip") return snipText.trim().length > 0 && snipText.length <= SNIP_LIMIT;
    return Boolean(previewUrl) && caption.length <= CAPTION_LIMIT;
  };

  const post = () => {
    if (!canPost()) return;
    if (mode === "snip") {
      localStorage.setItem(
        "snubo-draft-upload",
        JSON.stringify({ type: "snip", text: snipText.trim(), bg: snipBgIdx }),
      );
    } else if (mode === "photo" || mode === "video") {
      localStorage.setItem(
        "snubo-draft-upload",
        JSON.stringify({ type: mode, url: previewUrl, caption }),
      );
    }
    resetAll();
    navigate("/homee");
  };

  const addChip = (chip: string) => {
    const space = caption && !caption.endsWith(" ") ? " " : "";
    setCaption((c) => (c + space + chip).slice(0, CAPTION_LIMIT));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="px-3 py-1.5 rounded-full border border-gray-300 text-sm">Cancel</button>
          <h1 className="font-inknut font-semibold text-xl">Create</h1>
          <button
            onClick={post}
            disabled={!canPost()}
            className={`px-3 py-1.5 rounded-full text-sm ${canPost() ? "bg-snubo-red text-white hover:bg-red-600" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          >
            Post
          </button>
        </div>
        {/* Mode Tabs */}
        <div className="max-w-md mx-auto px-4 pb-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setMode("photo"); resetAll(); }}
              className={`py-2 rounded-xl border text-sm font-istok font-medium flex items-center justify-center gap-2 transition-colors ${mode === "photo" ? "bg-snubo-red text-white border-snubo-red" : "bg-gray-50 text-gray-700 border-gray-200"}`}
            >
              <ImageIcon size={16} /> Photo
            </button>
            <button
              onClick={() => { setMode("video"); resetAll(); }}
              className={`py-2 rounded-xl border text-sm font-istok font-medium flex items-center justify-center gap-2 transition-colors ${mode === "video" ? "bg-snubo-red text-white border-snubo-red" : "bg-gray-50 text-gray-700 border-gray-200"}`}
            >
              <VideoIcon size={16} /> Video
            </button>
            <button
              onClick={() => { setMode("snip"); resetAll(); }}
              className={`py-2 rounded-xl border text-sm font-istok font-medium flex items-center justify-center gap-2 transition-colors ${mode === "snip" ? "bg-snubo-red text-white border-snubo-red" : "bg-gray-50 text-gray-700 border-gray-200"}`}
            >
              <Type size={16} /> Snip
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 pb-28 space-y-4">
        {/* Media Zone or Snip Composer */}
        {mode !== "snip" ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={`rounded-2xl border-2 border-dashed ${previewUrl ? "border-gray-200" : "border-gray-300"} bg-gray-50 overflow-hidden`}
          >
            {previewUrl ? (
              <div className="relative">
                {mode === "photo" ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-80 object-cover" />
                ) : (
                  <video src={previewUrl || undefined} className="w-full h-80 object-cover" controls />
                )}
                <button onClick={() => setPreviewUrl(null)} className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 text-xs shadow">
                  Replace
                </button>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-gray-600">
                <p className="text-sm font-istok">Drag & drop your {mode} here</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={mode === "photo" ? onPickImage : onPickVideo} className="px-3 py-2 rounded-full bg-snubo-red text-white text-sm hover:bg-red-600">
                    Choose {mode === "photo" ? "Photo" : "Video"}
                  </button>
                  <button onClick={resetAll} className="px-3 py-2 rounded-full border border-gray-300 text-sm">Clear</button>
                </div>
              </div>
            )}
            <input ref={imgInput} type="file" accept="image/*" className="hidden" onChange={onFileSelected} />
            <input ref={vidInput} type="file" accept="video/*" className="hidden" onChange={onFileSelected} />
          </div>
        ) : (
          <div className="space-y-2">
            <textarea
              value={snipText}
              onChange={(e) => setSnipText(e.target.value.slice(0, SNIP_LIMIT))}
              rows={6}
              placeholder="What's happening?"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white text-base focus:outline-none focus:ring-2 focus:ring-snubo-red/30"
            />
            <div className="text-right text-xs text-gray-500">{snipText.length}/{SNIP_LIMIT}</div>
          </div>
        )}

        {/* Caption & Helpers */}
        {mode !== "snip" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-istok text-gray-700">Caption</p>
              <span className={`text-xs ${caption.length > CAPTION_LIMIT ? "text-red-600" : "text-gray-500"}`}>{caption.length}/{CAPTION_LIMIT}</span>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, CAPTION_LIMIT))}
              rows={4}
              placeholder="Write a caption..."
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-snubo-red/30"
            />
            <div className="flex flex-wrap gap-2">
              {quickChips.map((c) => (
                <button key={c} onClick={() => addChip(c)} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs flex items-center gap-1">
                  {c.startsWith("#") ? <Hash size={12} /> : <Sparkles size={12} />}
                  <span>{c.replace(/^#/, "#")}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>


      <BottomNav />
    </div>
  );
}
