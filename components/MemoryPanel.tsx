"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MemoryPanel() {
  const [profile, setProfile] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    async function loadProfile() {
      const res = await axios.get("/api/profile");
      setProfile(res.data.profile);
    }

    loadProfile();
  }, []);

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-5">
        Memory Dashboard
      </h2>

      <div className="space-y-3">
        {profile.map((item) => (
          <div
            key={item.key}
            className="bg-zinc-800 rounded-lg p-4"
          >
            <p className="text-zinc-400">{item.key}</p>

            <p className="text-xl font-semibold">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}