"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamPageData, setTeamPageData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", photo: "/images/general/placeholder.webp", bio: "" });
  const [editingMember, setEditingMember] = useState<any | null>(null);

  useEffect(() => {
    fetchTeam();
    fetchTeamPageData();
  }, []);

  const fetchTeamPageData = async () => {
    try {
      const res = await fetch(`/api/data/teamPageData?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setTeamPageData(data.data);
      }
    } catch (err) {
      console.error("Failed to load team page data");
    }
  };

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/team?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setTeamMembers(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch team");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load team from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    const updatedTeam = teamMembers.filter(m => m.name !== name);
    setTeamMembers(updatedTeam);
    
    await fetch(`/api/data/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeam)
    });
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;
    
    const updatedTeam = [newMember, ...teamMembers];
    setTeamMembers(updatedTeam);
    setIsModalOpen(false);
    setNewMember({ name: "", role: "", photo: "/images/general/placeholder.webp", bio: "" });
    
    await fetch(`/api/data/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeam)
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        callback(data.url);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const saveTeamPageData = async (updatedData: any) => {
    await fetch(`/api/data/teamPageData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
  };

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...teamPageData, heroImage: url };
      setTeamPageData(updatedData);
      await saveTeamPageData(updatedData);
    });
  };

  const handleEditMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name || !editingMember.role) return;
    
    const updatedTeam = teamMembers.map(m => m.originalName === editingMember.originalName ? { ...editingMember } : m);
    updatedTeam.forEach(m => delete m.originalName);
    
    setTeamMembers(updatedTeam);
    setIsEditModalOpen(false);
    setEditingMember(null);
    
    await fetch(`/api/data/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeam)
    });
  };

  const openEditModal = (member: any) => {
    setEditingMember({ ...member, originalName: member.name });
    setIsEditModalOpen(true);
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
                Studio Operations // Team
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Team Roster
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage studio personnel, architects, and roles.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              Add Team Member
            </button>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="grid grid-cols-1 gap-6">
        {/* Hero Background Image Section */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-display text-white mb-4">Hero Background Image</h2>
          <div className="flex flex-col gap-4">
            {teamPageData.heroImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden relative group">
                <img src={teamPageData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm"><Upload size={20} /></div>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
                </label>
              </div>
            )}
            
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image URL</label>
                <input 
                  type="text" 
                  value={teamPageData.heroImage || ""} 
                  onChange={e => {
                    const updatedData = {...teamPageData, heroImage: e.target.value};
                    setTeamPageData(updatedData);
                    saveTeamPageData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/backgrounds/..."
                />
              </div>
              {!teamPageData.heroImage && (
                <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Upload size={14} /> Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-display text-white mb-6">Team Roster Database</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-[var(--color-grey)]">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-display tracking-widest uppercase">Loading Database...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <AlertCircle size={32} className="text-red-500 mb-4" />
            <h3 className="text-white font-display text-lg mb-2">Connection Error</h3>
            <p className="text-red-400 text-sm max-w-md">{error}</p>
            <button onClick={fetchTeam} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
              Try Again
            </button>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-[var(--color-grey)] text-sm">No team members found in the database. Add your first one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, i) => (
              <div key={member.name || i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative shrink-0">
                      {member.photo && <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />}
                   </div>
                   <div>
                     <h3 className="font-display text-white text-sm">{member.name}</h3>
                     <p className="font-body text-[10px] text-[var(--color-accent)] uppercase tracking-wider mt-1">{member.role}</p>
                   </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(member)}
                    className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" 
                    title="Edit"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(member.name)}
                    className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" 
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add Team Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Photo Image</label>
                {newMember.photo && (
                  <img src={newMember.photo} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newMember.photo || ''} 
                    onChange={e => setNewMember({...newMember, photo: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/general/placeholder.webp"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewMember({...newMember, photo: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Name</label>
                <input 
                  type="text" required
                  value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Role</label>
                <input 
                  type="text" required
                  value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Member
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Team Member</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditMember} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Photo Image</label>
                {editingMember.photo && (
                  <img src={editingMember.photo} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingMember.photo || ''} 
                    onChange={e => setEditingMember({...editingMember, photo: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/general/placeholder.webp"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingMember({...editingMember, photo: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Name</label>
                <input 
                  type="text" required
                  value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Role</label>
                <input 
                  type="text" required
                  value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
