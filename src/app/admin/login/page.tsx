"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldHalf } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh(); 
    } else {
      setError("Unauthorized access attempt");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative z-10">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-900/20 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="glass-card p-10 max-w-sm w-full flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white/60">
           <ShieldHalf size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-8 tracking-wide">System Access</h2>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Security Key"
            className="w-full glass-input px-4 py-4 text-center tracking-[0.2em] font-mono text-lg"
            required
          />
          {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}
          <button
            type="submit"
            className="w-full glow-button py-4 mt-2 uppercase tracking-widest text-sm"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
