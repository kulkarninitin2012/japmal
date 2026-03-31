"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MinimalUser = {
  id: number;
  name: string;
};

export default function AddClient({ initialUsers }: { initialUsers: MinimalUser[] }) {
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [count, setCount] = useState<number | "">("");
  // Get local date YYYY-MM-DD
  const today = new Date().toLocaleDateString('en-CA'); 
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId === "" || !count || count <= 0 || !selectedDate) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/add-count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           userId: Number(selectedUserId), 
           count: Number(count),
           // send date appending common time or as pure ISO
           date: new Date(selectedDate).toISOString() 
        })
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }

      setStatus("success");
      setCount("");
      setSelectedUserId(""); 
      setSelectedDate(today);
      
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setErrorMsg("Something went wrong");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 mt-8 relative overflow-hidden z-10">
      
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 blur-[150px] -z-10 pointer-events-none rounded-full" />

      <AnimatePresence>
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
             <motion.div
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: [1, 3, 5], opacity: [0.8, 0.4, 0] }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="w-40 h-40 bg-white rounded-full blur-3xl shadow-[0_0_100px_rgba(255,215,0,1)]"
             />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-saffron-300 to-gold-400">जप नोंदणी करा</h2>

        {status === "success" ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-10 text-center border-gold-500/30 shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay"></div>
            <motion.div 
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-5xl mb-6 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              🌸
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Accepted!</h3>
            <p className="text-white/60 font-medium text-sm">Your devotion has been added to the universe.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-6 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div>
              <label className="block text-white/60 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">Select Devotee</label>
              <select 
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : "")}
                required
                className="w-full glass-input px-4 py-4 text-white appearance-none text-lg"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
              >
                <option value="" disabled className="bg-navy-900 text-white/50">-- Choose your name --</option>
                {initialUsers.map((u) => (
                  <option key={u.id} value={u.id} className="bg-navy-900 text-white">
                    {u.name}
                  </option>
                ))}
              </select>
              {initialUsers.length === 0 && (
                <p className="mt-3 text-sm text-saffron-400 font-medium ml-1">Admin must create users first.</p>
              )}
            </div>
            
            <div>
              <label className="block text-white/60 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">जपमाळ</label>
              <input 
                type="number" 
                value={count}
                onChange={(e) => setCount(Number(e.target.value) || "")}
                placeholder="e.g. 5"
                required
                min={1}
                max={1000000}
                className="w-full glass-input px-4 py-4 text-xl tracking-wider font-bold"
              />
            </div>

            <div>
              <label className="block text-white/60 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">Select Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={today}
                required
                className="w-full glass-input px-4 py-4 text-white appearance-none"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-2 rounded-xl border border-red-500/20">{errorMsg}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "loading" || initialUsers.length === 0}
              type="submit"
              className="mt-4 w-full glow-button py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <span className="animate-pulse">Offering...</span>
              ) : (
                <>Submit with Devotion <span className="text-lg">✨</span></>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
