export default function Chat() {
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-zinc-900 rounded-xl p-6 h-[500px] overflow-y-auto">
        <p className="text-cyan-400 font-bold">MemoryPilot AI</p>

        <div className="mt-6">
          <div className="bg-zinc-800 rounded-xl p-4 w-fit">
            👋 Hello Abhinay! How can I help you today?
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <input
          className="flex-1 rounded-xl bg-zinc-900 p-4 outline-none"
          placeholder="Ask anything..."
        />

        <button className="bg-cyan-500 px-6 rounded-xl">
          Send
        </button>
      </div>
    </div>
  );
}