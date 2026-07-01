"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Brain, FileText, Network, Trash2 } from "lucide-react";

export default function Sidebar({
  setPage,
  selectedChatId,
  setSelectedChatId,
}: {
  setPage: (page: string) => void;
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
}) {
  const [chats, setChats] = useState<
  { id: string; title: string }[]
>([]);

  useEffect(() => {
  async function loadChats() {
    const res = await axios.get("/api/chats");

    setChats(res.data);

    if (res.data.length > 0) {
      setSelectedChatId(res.data[0].id);
    }
  }

  loadChats();
}, []);


  async function createChat() {
  try {
    const res = await axios.post("/api/chats");

    const chat = res.data;

    setChats((prev) => [chat, ...prev]);
    setSelectedChatId(chat.id);
    setPage("chat");
  } catch (error) {
    console.error(error);
  }
}

async function deleteChat(id: string) {
  await axios.delete(`/api/chats/${id}`);

  setChats((prev) => prev.filter((chat) => chat.id !== id));

  if (selectedChatId === id) {
  setSelectedChatId("");
}
}

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 min-h-screen p-5">

      <h1 className="text-3xl font-bold text-cyan-400">
        MemoryPilot AI
      </h1>

      <button
        onClick={createChat}
        className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 hover:bg-cyan-500"
      >
        <Plus size={18} />
        New Chat
      </button>

      <div className="mt-8">

        <h2 className="text-sm text-zinc-400 mb-3">
          Chats
        </h2>

        <div className="space-y-2">

          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setSelectedChatId(chat.id);
                setPage("chat");
                }}
              className={`w-full text-left rounded-lg px-3 py-3 ${
                selectedChatId === chat.id
                  ? "bg-cyan-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
  <span>{chat.title}</span>

  <Trash2
    size={16}
    className="text-red-400 hover:text-red-600"
    onClick={(e) => {
      e.stopPropagation();
      deleteChat(chat.id);
    }}
  />
</div>
            </button>
          ))}

        </div>

        <div className="mt-8 space-y-3">

          <button
            onClick={() => setPage("memory")}
            className="flex items-center gap-2 w-full rounded-lg bg-zinc-800 px-4 py-3 hover:bg-zinc-700"
          >
            <Brain size={18} />
            Memory
          </button>

          <button
            onClick={() => setPage("graph")}
            className="flex items-center gap-2 w-full rounded-lg bg-zinc-800 px-4 py-3 hover:bg-zinc-700"
          >
            <Network size={18} />
            Knowledge Graph
          </button>

          <button
            onClick={() => setPage("documents")}
            className="flex items-center gap-2 w-full rounded-lg bg-zinc-800 px-4 py-3 hover:bg-zinc-700"
          >
            <FileText size={18} />
            Documents
          </button>

        </div>

      </div>

    </aside>
  );
}