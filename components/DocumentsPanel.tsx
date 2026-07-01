"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Document = {
  id: number;
  filename: string;
  content: string;
  created_at: string;
};

export default function DocumentsPanel() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selected, setSelected] = useState<Document | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      const res = await axios.get("/api/documents");
      setDocuments(res.data);
    }

    loadDocuments();
  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Uploaded Documents
      </h1>

      {documents.length === 0 ? (
        <p className="text-zinc-400">
          No documents uploaded yet.
        </p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
        <div
          key={doc.id}
          onClick={() => setSelected(doc)}
         className="rounded-xl bg-zinc-800 p-4 cursor-pointer hover:bg-zinc-700 transition"
           >
              <p className="font-semibold">
                📄 {doc.filename}
              </p>

              <p className="text-sm text-zinc-400">
                {doc.created_at}
              </p>
            </div>
          ))}
        </div>
      )}
     {selected && (
  <div className="mt-6 rounded-xl bg-zinc-800 p-6">
    <h2 className="text-xl font-bold mb-3">
      {selected.filename}
    </h2>

    <pre className="whitespace-pre-wrap text-zinc-300">
      {selected.content}
    </pre>
  </div>
)}

    </div>
  );
}