"use client";

import { useState } from "react";
import { Trash2, Edit2, Check, X, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  totalCount: number;
};

export default function AdminClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCount, setEditCount] = useState<number>(0);
  const [newUserName, setNewUserName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name: newUserName })
      });
      const data = await res.json();
      
      if (!res.ok) {
         alert(data.error || "Failed to create user");
      } else {
         setNewUserName("");
         setUsers(prev => [data.user, ...prev]);
         router.refresh();
      }
    } catch (err) {
      alert("Error creating user");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await fetch("/api/admin/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, totalCount: editCount })
      });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, totalCount: editCount } : u));
      setEditingId(null);
      router.refresh();
    } catch (e) {
      alert("Failed to update");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user and all their entries?")) return;
    try {
      await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: 'user' })
      });
      setUsers(prev => prev.filter(u => u.id !== id));
      router.refresh();
    } catch (e) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full z-10 relative">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 blur-[150px] -z-10 pointer-events-none rounded-full" />

      <div className="glass-card p-8 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
         <div>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <UserPlus size={20} className="text-saffron-400" />
               Create Devotee Account
            </h2>
            <p className="text-white/50 text-sm">Add a new user to the global registry so they can log जपमाळ.</p>
         </div>
         <form onSubmit={handleCreateUser} className="flex w-full md:w-auto gap-3">
            <input 
               type="text" 
               placeholder="Full Name required"
               value={newUserName}
               onChange={(e) => setNewUserName(e.target.value)}
               required
               className="flex-1 md:w-64 px-4 py-3 glass-input"
            />
            <button 
               type="submit" 
               disabled={isCreating}
               className="glow-button px-6 py-3 disabled:opacity-50"
            >
               {isCreating ? "..." : "Create"}
            </button>
         </form>
      </div>

      <div className="glass-card p-8 mb-10 border-t border-white/20">
        <h2 className="text-2xl font-bold text-white mb-8">System Registry</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white/60 text-sm font-bold uppercase tracking-widest">
                <th className="p-4 rounded-tl-xl rounded-bl-xl">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">एकूण जपमाळ</th>
                <th className="p-4 text-right rounded-tr-xl rounded-br-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white/30 font-mono text-sm">#{u.id}</td>
                  <td className="p-4 font-semibold text-white/90">{u.name}</td>
                  <td className="p-4">
                    {editingId === u.id ? (
                      <input 
                        type="number" 
                        value={editCount}
                        onChange={(e) => setEditCount(Number(e.target.value))}
                        className="w-24 px-3 py-1 glass-input"
                      />
                    ) : (
                      <span className="font-medium text-saffron-400">{u.totalCount.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    {editingId === u.id ? (
                      <>
                        <button onClick={() => handleUpdate(u.id)} className="p-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/40 transition-colors border border-green-500/20">
                          <Check size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/40 transition-colors border border-red-500/20">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(u.id); setEditCount(u.totalCount); }} className="p-2 bg-white/5 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(u.id)} className="p-2 bg-white/5 text-red-400/70 hover:text-red-400 rounded-xl hover:bg-white/10 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="text-center p-8 text-white/30">Registry is empty.</div>}
        </div>
      </div>
    </div>
  );
}
