"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import MemoryPanel from "../components/MemoryPanel";
import KnowledgeGraph from "../components/KnowledgeGraph";
import DocumentsPanel from "../components/DocumentsPanel";

export default function Home() {
  const [page, setPage] = useState("chat");
  const [selectedChatId, setSelectedChatId] = useState("");

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar
  setPage={setPage}
  selectedChatId={selectedChatId}
  setSelectedChatId={setSelectedChatId}
/>

      <main className="flex-1 p-8">
        {page === "chat" && (
  <Chat chatId={selectedChatId} />
)}

        {page === "memory" && <MemoryPanel />}

        {page === "graph" && <KnowledgeGraph />}

        {page === "documents" && (
            <DocumentsPanel />
        )}
      </main>
    </div>
  );
}