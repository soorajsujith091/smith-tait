"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminExpertise() {
  const [expertiseData, setExpertiseData] = useState<any>({ services: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newService, setNewService] = useState({ title: "", subtitle: "", description: "", image: "", stats: "" });
  const [editingService, setEditingService] = useState<any | null>(null);

  useEffect(() => {
    fetchExpertiseData();
  }, []);

  const fetchExpertiseData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/expertiseData?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setExpertiseData(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch expertise data");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load expertise data from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveExpertiseData = async (updatedData: any) => {
    await fetch(`/api/data/expertiseData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
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

  const handleDelete = async (title: string) => {
    if (!confirm(`Are you sure you want to delete the ${title} expertise area?`)) return;
    
    const updatedServices = expertiseData.services.filter((s: any) => s.title !== title);
    const updatedData = { ...expertiseData, services: updatedServices };
    setExpertiseData(updatedData); 
    await saveExpertiseData(updatedData);
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...expertiseData, heroImage: url };
      setExpertiseData(updatedData);
      await saveExpertiseData(updatedData);
    });
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    
    const updatedServices = [...(expertiseData.services || []), newService];
    const updatedData = { ...expertiseData, services: updatedServices };
    
    setExpertiseData(updatedData);
    setIsModalOpen(false);
    setNewService({ title: "", subtitle: "", description: "", image: "", stats: "" });
    
    await saveExpertiseData(updatedData);
  };

  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    
    const updatedServices = expertiseData.services.map((s: any) => s.title === editingService.originalTitle ? { ...editingService } : s);
    updatedServices.forEach((s: any) => delete s.originalTitle);
    
    const updatedData = { ...expertiseData, services: updatedServices };
    setExpertiseData(updatedData);
    setIsEditModalOpen(false);
    setEditingService(null);
    
    await saveExpertiseData(updatedData);
  };

  const openEditModal = (service: any) => {
    setEditingService({ ...service, originalTitle: service.title });
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
                Studio Operations // Expertise
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Expertise & Services
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage the areas of expertise and service descriptions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              Add Expertise Area
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
            {expertiseData.heroImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden relative group">
                <img src={expertiseData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
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
                  value={expertiseData.heroImage || ""} 
                  onChange={e => {
                    const updatedData = {...expertiseData, heroImage: e.target.value};
                    setExpertiseData(updatedData);
                    saveExpertiseData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/backgrounds/..."
                />
              </div>
              {!expertiseData.heroImage && (
                <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Upload size={14} /> Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Expertise Database</h2>
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
              <button onClick={fetchExpertiseData} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
                Try Again
              </button>
            </div>
          ) : (!expertiseData.services || expertiseData.services.length === 0) ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No expertise areas found. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expertiseData.services.map((service: any, i: number) => (
                <div key={service.title || i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="w-full flex gap-4">
                     {service.image && (
                       <div className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                         <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                       </div>
                     )}
                     <div className="flex-1">
                       <h3 className="font-display text-white text-sm mb-1">{service.title}</h3>
                       <p className="font-display text-xs text-[var(--color-accent)] mb-2 tracking-widest uppercase">{service.subtitle}</p>
                       <p className="font-body text-xs text-[var(--color-grey)] leading-relaxed">{service.description}</p>
                       {service.stats && <p className="font-display text-[10px] text-white/50 mt-2 tracking-widest uppercase">STATS: {service.stats}</p>}
                     </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEditModal(service)} className="p-2 h-fit bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(service.title)} className="p-2 h-fit bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add Expertise Area</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddService} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Subtitle</label>
                <input 
                  type="text" required
                  value={newService.subtitle} onChange={e => setNewService({...newService, subtitle: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Description</label>
                <textarea 
                  required
                  value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Stats (e.g. 50+ projects)</label>
                <input 
                  type="text"
                  value={newService.stats} onChange={e => setNewService({...newService, stats: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newService.image} onChange={e => setNewService({...newService, image: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewService({...newService, image: url}))} />
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Area
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Expertise Area</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditService} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Subtitle</label>
                <input 
                  type="text" required
                  value={editingService.subtitle} onChange={e => setEditingService({...editingService, subtitle: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Description</label>
                <textarea 
                  required
                  value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Stats (e.g. 50+ projects)</label>
                <input 
                  type="text"
                  value={editingService.stats || ""} onChange={e => setEditingService({...editingService, stats: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingService.image || ""} onChange={e => setEditingService({...editingService, image: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingService({...editingService, image: url}))} />
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
