"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chat({
  chatId,
}: {
  chatId: string;
}) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

useEffect(() => {
  async function loadMessages() {
    if (!chatId) return;

    const res = await axios.get(
      `/api/messages?chatId=${chatId}`
    );

    setMessages(
      res.data.map(
        (m: {
          role: "user" | "ai";
          message: string;
        }) => ({
          role: m.role,
          text: m.message,
        })
      )
    );
  }

  loadMessages();
}, [chatId]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message;
    await axios.post("/api/messages", {
  chatId,
  role: "user",
  message: userMessage,
});

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setLoading(true);

    setMessage("");

    try {
      const res = await axios.post("/api/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.reply,
        },
      ]);

      await axios.post("/api/messages", {
  chatId,
  role: "ai",
  message: res.data.reply,
});

      setLoading(false);

    } catch {
      setLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
        },
      ]);
    }
  }

  async function uploadPdf() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/upload", formData);

      alert("PDF uploaded successfully!");
    } catch {
      alert("Upload failed!");
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-zinc-900 rounded-2xl h-[600px] overflow-y-auto p-6 space-y-4 shadow-xl border border-zinc-800">
        {messages.map((msg, index) => (
          <div
  key={index}
  className={`max-w-[75%] px-5 py-3 rounded-2xl whitespace-pre-wrap ${
    msg.role === "user"
      ? "ml-auto bg-cyan-600 text-white"
      : "bg-zinc-800 text-zinc-100"
  }`}
>
  {msg.text}
</div>
        ))}

      {loading && (
  <div className="bg-zinc-800 text-zinc-300 px-5 py-3 rounded-2xl w-fit">
    AI is thinking...
  </div>
)}

<div ref={messagesEndRef} />

      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />

        <button
          onClick={uploadPdf}
          className="bg-green-600 px-4 rounded-xl"
        >
          Upload PDF
        </button>
      </div>

      <div className="flex mt-5 gap-3">
        <input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}
  placeholder="Ask anything..."
  className="flex-1 bg-zinc-800 rounded-xl p-4 outline-none"
/>

        <button
          onClick={sendMessage}
          className="bg-cyan-500 px-8 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}