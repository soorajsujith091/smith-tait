"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Shield, User, Upload, Edit3 } from "lucide-react";

export default function AdminSettings() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ email: "", password: "", name: "", role: "", image: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  
  const [profile, setProfile] = useState({ name: "", role: "", image: "" });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/data/profile?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setProfile(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/data/users?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.password) return;
    
    const updatedUsers = [...users, { id: new Date().getTime().toString(), ...newUser }];
    setUsers(updatedUsers);
    setNewUser({ email: "", password: "", name: "", role: "", image: "" });
    setIsAdding(false);
    
    await fetch('/api/data/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUsers)
    });
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to remove this admin user?")) return;
    
    const updatedUsers = users.filter((u: any) => u.id !== id);
    setUsers(updatedUsers);
    
    await fetch('/api/data/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUsers)
    });
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editingUser.email || !editingUser.password) return;
    
    const updatedUsers = users.map((u: any) => u.id === editingUser.id ? { ...editingUser } : u);
    setUsers(updatedUsers);
    setEditingUser(null);
    
    await fetch('/api/data/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUsers)
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/data/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      setIsEditingProfile(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProfile({ ...profile, image: data.url });
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-grey)]">
                Studio Operations // System
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              System Settings
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Configure CMS parameters and manage admin users.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button onClick={() => setIsAdding(!isAdding)} className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
              <Plus size={14} />
              Add Admin User
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Settings */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white flex items-center gap-2">
              <User size={18} className="text-[var(--color-accent)]" /> 
              Admin Profile
            </h2>
            {!isEditingProfile && (
              <button onClick={() => setIsEditingProfile(true)} className="text-xs uppercase tracking-widest font-display text-[var(--color-grey)] hover:text-white transition-colors">
                Edit Profile
              </button>
            )}
          </div>
          
          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Display Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Role / Title</label>
                  <input type="text" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Profile Image</label>
                  <div className="flex gap-3">
                    <input type="text" value={profile.image} onChange={e => setProfile({...profile, image: e.target.value})} className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" placeholder="/images/uploads/..." />
                    <label className="cursor-pointer px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs uppercase tracking-widest font-display transition-colors flex items-center gap-2 whitespace-nowrap">
                      <Upload size={14} /> Upload
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsEditingProfile(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded text-xs uppercase tracking-widest font-display transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] hover:bg-white rounded text-xs uppercase tracking-widest font-display transition-colors">Save Profile</button>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 relative shrink-0">
                <img src={profile.image || "/images/general/Nour2.webp"} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-1">{profile.name || "Admin User"}</h3>
                <p className="text-xs font-display uppercase tracking-widest text-[var(--color-grey)]">{profile.role || "Lead Architect"}</p>
              </div>
            </div>
          )}
        </div>

        {/* User Management Section */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white flex items-center gap-2">
              <Shield size={18} className="text-[var(--color-accent)]" /> 
              Admin Users
            </h2>
          </div>
          
          {isAdding && (
            <form onSubmit={handleAddUser} className="bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-6 mb-6">
              <h3 className="text-white font-display text-sm mb-4">Add New Admin User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Display Name</label>
                  <input type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Role / Title</label>
                  <input type="text" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Email Address *</label>
                  <input type="email" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Password *</label>
                  <input type="text" required value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Profile Image</label>
                  <div className="flex gap-3">
                    <input type="text" value={newUser.image} onChange={e => setNewUser({...newUser, image: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" placeholder="/images/uploads/..." />
                    <label className="cursor-pointer px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs uppercase tracking-widest font-display transition-colors flex items-center gap-2 whitespace-nowrap">
                      <Upload size={14} /> Upload
                      <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append("file", file);
                        try {
                          const res = await fetch("/api/upload", { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.success) setNewUser({ ...newUser, image: data.url });
                          else alert("Upload failed");
                        } catch (err) { alert("Upload failed"); }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded text-xs uppercase tracking-widest font-display transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] hover:bg-white rounded text-xs uppercase tracking-widest font-display transition-colors">Create User</button>
              </div>
            </form>
          )}

          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="animate-spin text-[var(--color-grey)]" /></div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No secondary admin users configured.</p>
              <p className="text-[var(--color-grey)]/60 text-xs mt-2">Only the primary superadmin from ENV variables can log in right now.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user: any) => (
                <div key={user.id} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 relative shrink-0">
                      <img src={user.image || "/images/general/Nour2.webp"} alt={user.name || "User"} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display text-white text-sm">{user.name || "Admin"}</h3>
                      <p className="font-body text-xs text-[var(--color-grey)] mt-1">{user.email} • {user.role || "Admin"}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingUser(user)} className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit User">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete User">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Edit User Modal */}
          {editingUser && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <form onSubmit={handleEditUser} className="bg-[var(--color-ink-dark)] border border-white/5 rounded-2xl p-8 max-w-2xl w-full">
                <h3 className="text-white font-display text-xl mb-6">Edit Admin User</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Display Name</label>
                    <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                  </div>
                  <div>
                    <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Role / Title</label>
                    <input type="text" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                  </div>
                  <div>
                    <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Email Address *</label>
                    <input type="email" required value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                  </div>
                  <div>
                    <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Password *</label>
                    <input type="text" required value={editingUser.password} onChange={e => setEditingUser({...editingUser, password: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Profile Image</label>
                    <div className="flex gap-3">
                      <input type="text" value={editingUser.image} onChange={e => setEditingUser({...editingUser, image: e.target.value})} className="w-full bg-[var(--color-navy)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50" placeholder="/images/uploads/..." />
                      <label className="cursor-pointer px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs uppercase tracking-widest font-display transition-colors flex items-center gap-2 whitespace-nowrap">
                        <Upload size={14} /> Upload
                        <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                            const data = await res.json();
                            if (data.success) setEditingUser({ ...editingUser, image: data.url });
                            else alert("Upload failed");
                          } catch (err) { alert("Upload failed"); }
                        }} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs uppercase tracking-widest font-display transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] hover:bg-white rounded-lg text-xs uppercase tracking-widest font-display transition-colors font-semibold">Save Changes</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
