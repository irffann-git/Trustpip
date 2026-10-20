"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCheck, Send, X } from "lucide-react";

// Country code + number. No "+", spaces or dashes.
const WHATSAPP_NUMBER = "919633053999";

const DEFAULT_DRAFT = "Hi 👋 I'd like to know more about TRUSTPIP.";

const QUICK_REPLIES = [
  "Hi 👋 I'd like to know more about TRUSTPIP.",
  "What are your pricing plans?",
  "I need help with my account.",
];

const timeNow = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

let seq = 0;
const nextId = () => `m-${++seq}`;

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(DEFAULT_DRAFT);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "greeting",
      text: "Hello! 👋 How can we help you today?",
      sender: "agent",
      time: "",
    },
  ]);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timersRef = useRef([]);

  // Clean up timers on unmount.
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Keep the conversation pinned to the newest message.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Focus the input + allow Esc to close.
  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 180);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleSend = (event) => {
    event.preventDefault();

    const text = draft.trim();
    if (!text) return;

    // Open WhatsApp inside the user gesture so popup blockers don't block it.
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setMessages((prev) => [
      ...prev,
      { id: nextId(), text, sender: "visitor", time: timeNow() },
    ]);
    setDraft("");
    setIsTyping(true);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          text: "WhatsApp is open on your screen ✅ Just press send there and our team will reply right away.",
          sender: "agent",
          time: timeNow(),
        },
      ]);
    }, 1300);

    timersRef.current.push(timer);
  };

  return (
    <>
      {/* Local keyframes — keeps the animation self-contained */}
      <style>{`
        @keyframes wp-pop { from { opacity: 0; transform: translateY(14px) scale(.96); } to { opacity: 1; transform: none; } }
        .wp-pop { animation: wp-pop .22s cubic-bezier(.22, 1, .36, 1); }
        @keyframes wp-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }
        .wp-dot { animation: wp-dot 1.1s infinite ease-in-out; }
      `}</style>

      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {isOpen && (
          <div className="wp-pop flex h-[540px] max-h-[calc(100dvh-7rem)] w-[370px] max-w-[calc(100vw-2.5rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
            {/* ── Header ───────────────────────────────── */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#075e54] to-[#128c7e] px-4 py-3 text-white">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                <WhatsAppIcon className="h-6 w-6" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b7a6f] bg-emerald-400" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold leading-tight">
                  TRUSTPIP Support
                </h3>
                <p className="mt-0.5 text-[11px] text-emerald-100/80">
                  Typically replies in a few minutes
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Messages ─────────────────────────────── */}
            <div
              ref={listRef}
              aria-live="polite"
              className="flex-1 space-y-2 overflow-y-auto px-3 py-4"
              style={{
                backgroundColor: "#efeae2",
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              <div className="flex justify-center pb-1">
                <span className="rounded-md bg-white/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-500 shadow-sm backdrop-blur">
                  Today
                </span>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "visitor"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13.5px] leading-relaxed shadow-sm ${
                      message.sender === "visitor"
                        ? "rounded-tr-md bg-[#d9fdd3] text-gray-800"
                        : "rounded-tl-md bg-white text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.text}
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1">
                      <span className="text-[10px] text-gray-400">
                        {message.time}
                      </span>
                      {message.sender === "visitor" && (
                        <CheckCheck size={13} className="text-sky-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-sm">
                    <span className="wp-dot h-1.5 w-1.5 rounded-full bg-gray-400" />
                    <span
                      className="wp-dot h-1.5 w-1.5 rounded-full bg-gray-400"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="wp-dot h-1.5 w-1.5 rounded-full bg-gray-400"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── Quick replies ────────────────────────── */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 border-t border-black/5 bg-[#f0f2f5] px-3 pt-2.5">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => {
                      setDraft(reply);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11.5px] text-gray-700 transition hover:border-emerald-400 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* ── Composer ─────────────────────────────── */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 bg-[#f0f2f5] p-2.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type your message..."
                aria-label="Your message"
                className="min-w-0 flex-1 rounded-full border border-transparent bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />

              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message on WhatsApp"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:bg-[#1eb958] active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="bg-[#f0f2f5] pb-2 text-center text-[10px] text-gray-400">
              Chat continues on WhatsApp
            </div>
          </div>
        )}

        {/* ── Floating button ────────────────────────── */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={isOpen}
          className="relative ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-600/25 transition hover:scale-105 hover:bg-[#1eb958] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
        >
          {!isOpen && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
          )}
          {isOpen ? <X size={26} /> : <WhatsAppIcon className="h-7 w-7" />}
        </button>
      </div>
    </>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.04 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.71 6.42L3.2 28.8l6.55-1.72a12.77 12.77 0 0 0 6.28 1.6h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.68-12.8-12.68Zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.57 10.57 0 0 1-1.62-5.64c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.63-10.63 10.63Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82.96-1 1.16-.18.21-.37.23-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}