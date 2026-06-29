export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-cyan-400">
        MemoryPilot AI
      </h1>

      <div className="mt-10 space-y-4">
        <button className="w-full rounded-lg bg-cyan-600 py-3">
          New Chat
        </button>

        <button className="w-full rounded-lg bg-zinc-800 py-3">
          Memory
        </button>

        <button className="w-full rounded-lg bg-zinc-800 py-3">
          Knowledge Graph
        </button>

        <button className="w-full rounded-lg bg-zinc-800 py-3">
          Documents
        </button>
      </div>
    </aside>
  );
}