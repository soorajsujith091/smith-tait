"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminLegacy() {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [legacyPageData, setLegacyPageData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ year: new Date().getFullYear(), era: "", title: "", description: "", image: "" });
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  useEffect(() => {
    fetchTimeline();
    fetchLegacyPageData();
  }, []);

  const fetchLegacyPageData = async () => {
    try {
      const res = await fetch(`/api/data/legacyPageData?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setLegacyPageData(data.data);
      }
    } catch (err) {
      console.error("Failed to load legacy page data");
    }
  };

  const fetchTimeline = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/timeline?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setTimeline(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch timeline");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load timeline from JSON.");
    } finally {
      setIsLoading(false);
    }
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

  const saveLegacyPageData = async (updatedData: any) => {
    await fetch(`/api/data/legacyPageData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...legacyPageData, heroImage: url };
      setLegacyPageData(updatedData);
      await saveLegacyPageData(updatedData);
    });
  };

  const handleFeatureImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...legacyPageData, featureImage: url };
      setLegacyPageData(updatedData);
      await saveLegacyPageData(updatedData);
    });
  };

  const handleDelete = async (title: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    
    const updatedTimeline = timeline.filter(e => e.title !== title);
    setTimeline(updatedTimeline); // Optimistic UI update
    
    await fetch(`/api/data/timeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTimeline)
    });
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.year) return;
    
    // Sort array by year automatically or keep it prepend/append? Timeline is usually chronological
    const updatedTimeline = [...timeline, { ...newEvent, year: parseInt(newEvent.year as any) }];
    updatedTimeline.sort((a, b) => a.year - b.year);

    setTimeline(updatedTimeline);
    setIsModalOpen(false);
    setNewEvent({ year: new Date().getFullYear(), era: "", title: "", description: "", image: "" });
    
    await fetch(`/api/data/timeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTimeline)
    });
  };

  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title) return;
    
    const eventToUpdate = { ...editingEvent, year: parseInt(editingEvent.year) };
    const updatedTimeline = timeline.map(ev => ev.originalTitle === editingEvent.originalTitle ? eventToUpdate : ev);
    updatedTimeline.forEach(ev => delete ev.originalTitle);
    updatedTimeline.sort((a, b) => a.year - b.year);
    
    setTimeline(updatedTimeline);
    setIsEditModalOpen(false);
    setEditingEvent(null);
    
    await fetch(`/api/data/timeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTimeline)
    });
  };

  const openEditModal = (event: any) => {
    setEditingEvent({ ...event, originalTitle: event.title });
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
                Studio Operations // Legacy
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Our Legacy Timeline
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage the timeline of historical events and milestones.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              Add Timeline Event
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
            {legacyPageData.heroImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden relative group">
                <img src={legacyPageData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm"><Upload size={20} /></div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageUpload} />
                </label>
              </div>
            )}
            
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image URL</label>
                <input 
                  type="text" 
                  value={legacyPageData.heroImage || ""} 
                  onChange={e => {
                    const updatedData = {...legacyPageData, heroImage: e.target.value};
                    setLegacyPageData(updatedData);
                    saveLegacyPageData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/backgrounds/..."
                />
              </div>
              {!legacyPageData.heroImage && (
                <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Upload size={14} /> Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Feature Image Section */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-display text-white mb-4">Legacy Feature Image</h2>
          <div className="flex flex-col gap-4">
            {legacyPageData.featureImage && (
              <div className="w-full max-w-sm h-64 rounded-xl overflow-hidden relative group border border-white/10">
                <img src={legacyPageData.featureImage} alt="Feature Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm"><Upload size={20} /></div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFeatureImageUpload} />
                </label>
              </div>
            )}
            
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Feature Image URL</label>
                <input 
                  type="text" 
                  value={legacyPageData.featureImage || ""} 
                  onChange={e => {
                    const updatedData = {...legacyPageData, featureImage: e.target.value};
                    setLegacyPageData(updatedData);
                    saveLegacyPageData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/general/legacy-01.jpg"
                />
              </div>
              {!legacyPageData.featureImage && (
                <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Upload size={14} /> Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleFeatureImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Timeline Events</h2>
          </div>
          
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
              <button onClick={fetchTimeline} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
                Try Again
              </button>
            </div>
          ) : timeline.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No timeline events found in the database. Add your first one above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {timeline.map((event, i) => (
                <div key={event.title || i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-4 py-2 rounded-lg font-display text-sm shrink-0 text-center w-20">
                        {event.year}
                     </div>
                     {event.image && (
                       <div className="w-12 h-12 rounded overflow-hidden border border-white/10 relative shrink-0">
                         <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                       </div>
                     )}
                     <div>
                       <h3 className="font-display text-white text-sm">{event.title}</h3>
                       <p className="font-body text-[10px] text-[var(--color-grey)] uppercase tracking-wider mt-1">{event.era}</p>
                     </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(event)} className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(event.title)} className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add Timeline Event</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Year</label>
                  <input 
                    type="number" required
                    value={newEvent.year} onChange={e => setNewEvent({...newEvent, year: parseInt(e.target.value) || 0})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Era (Optional)</label>
                  <input 
                    type="text"
                    value={newEvent.era} onChange={e => setNewEvent({...newEvent, era: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Description</label>
                <textarea 
                  required
                  value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image (Optional)</label>
                {newEvent.image && (
                  <img src={newEvent.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newEvent.image || ''} 
                    onChange={e => setNewEvent({...newEvent, image: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewEvent({...newEvent, image: url}))} />
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Timeline Event</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Year</label>
                  <input 
                    type="number" required
                    value={editingEvent.year} onChange={e => setEditingEvent({...editingEvent, year: parseInt(e.target.value) || 0})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Era</label>
                  <input 
                    type="text"
                    value={editingEvent.era || ''} onChange={e => setEditingEvent({...editingEvent, era: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={editingEvent.title} onChange={e => setEditingEvent({...editingEvent, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Description</label>
                <textarea 
                  required
                  value={editingEvent.description} onChange={e => setEditingEvent({...editingEvent, description: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image (Optional)</label>
                {editingEvent.image && (
                  <img src={editingEvent.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingEvent.image || ''} 
                    onChange={e => setEditingEvent({...editingEvent, image: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingEvent({...editingEvent, image: url}))} />
                  </label>
                </div>
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
