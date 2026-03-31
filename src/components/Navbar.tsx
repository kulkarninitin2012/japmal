import Link from "next/link";
import { Home, PlusCircle, Trophy, ShieldHalf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 w-full glass-card !rounded-none !border-b-0 border-t border-white/10 py-3 px-6 pb-safe flex justify-around items-center z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
      <Link href="/" className="flex flex-col items-center gap-1 text-white/60 hover:text-saffron-500 hover:drop-shadow-[0_0_8px_rgba(255,153,51,0.8)] transition-all duration-300">
        <Home size={24} />
        <span className="text-sm font-bold">Home</span>
      </Link>
      <Link href="/add" className="flex flex-col items-center gap-1 text-white/60 hover:text-saffron-500 hover:drop-shadow-[0_0_8px_rgba(255,153,51,0.8)] transition-all duration-300">
        <PlusCircle size={24} />
        <span className="text-sm font-bold">Add</span>
      </Link>
      <Link href="/dashboard" className="flex flex-col items-center gap-1 text-white/60 hover:text-saffron-500 hover:drop-shadow-[0_0_8px_rgba(255,153,51,0.8)] transition-all duration-300">
        <Trophy size={24} />
        <span className="text-sm font-bold">Stats</span>
      </Link>
      <Link href="/admin" className="flex flex-col items-center gap-1 text-white/60 hover:text-saffron-500 hover:drop-shadow-[0_0_8px_rgba(255,153,51,0.8)] transition-all duration-300">
        <ShieldHalf size={24} />
        <span className="text-sm font-bold">Admin</span>
      </Link>
    </nav>
  );
}
