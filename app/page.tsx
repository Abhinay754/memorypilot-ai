import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center p-10">
        <Chat />
      </main>
    </div>
  );
}