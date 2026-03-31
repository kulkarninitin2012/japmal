"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type User = {
  id: number;
  name: string;
  totalCount: number;
};

type ChartData = {
  date: string;
  count: number;
};

export default function DashboardClient({ users, chartData }: { users: User[], chartData: ChartData[] }) {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full mb-10 z-10 relative">
      
      <div className="absolute top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-indigo-900/20 blur-[150px] -z-10 pointer-events-none rounded-full" />

      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-saffron-300 to-gold-400 mb-8 mt-4 text-center tracking-tight">Global Leaderboard</h2>

      {/* Chart Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 mb-8"
      >
        <h3 className="text-base font-bold tracking-widest uppercase text-white/70 mb-6 ml-2">अलीकडील जपमाळ</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={12} 
                tickMargin={10} 
                tickFormatter={(val) => val.split("-").slice(1).join("/")} 
              />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 10, 41, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                labelStyle={{ color: '#ffd700', fontWeight: 'bold' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#ff9933" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#ffd700', stroke: 'none' }} 
                activeDot={{ r: 8, fill: '#ffffff', stroke: '#ff9933', strokeWidth: 2 }} 
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,153,51,0.5))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-5 bg-white/5 border-b border-white/5 flex justify-between px-8 font-bold text-white/50 text-sm uppercase tracking-widest">
          <span>Devotee</span>
          <span>Contributions</span>
        </div>
        <div className="divide-y divide-white/5">
          {users.map((u, i) => (
            <motion.div 
              key={u.id} 
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.03)' }}
              className="p-5 px-6 flex justify-between items-center transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${
                  i === 0 ? 'bg-gradient-to-br from-gold-400 to-yellow-600 text-navy-900 shadow-[0_0_15px_rgba(255,215,0,0.5)]' : 
                  i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-navy-900' :
                  i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' :
                  'bg-white/10 text-white/60 group-hover:bg-white/20'
                }`}>
                  {i + 1}
                </div>
                <span className={`font-semibold ${i < 3 ? 'text-white text-lg' : 'text-white/80'}`}>{u.name}</span>
              </div>
              <span className={`font-black tracking-wider ${i < 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-saffron-300 to-gold-500' : 'text-saffron-500/80'}`}>
                {u.totalCount.toLocaleString('en-IN')}
              </span>
            </motion.div>
          ))}
          {users.length === 0 && (
             <div className="p-12 text-center text-white/30 font-medium">The universe is waiting for its first devotee.</div>
          )}
        </div>
      </motion.div>

    </div>
  );
}
