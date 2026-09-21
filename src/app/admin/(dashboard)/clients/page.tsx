"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [clientsPageData, setClientsPageData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", logo: "" });
  const [editingClient, setEditingClient] = useState<any | null>(null);

  useEffect(() => {
    fetchClients();
    fetchClientsPageData();
  }, []);

  const fetchClientsPageData = async () => {
    try {
      const res = await fetch(`/api/data/clientsPageData?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setClientsPageData(data.data);
      }
    } catch (err) {
      console.error("Failed to load clients page data");
    }
  };

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/clients?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setClients(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch clients");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load clients from JSON.");
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

  const saveClientsPageData = async (updatedData: any) => {
    await fetch(`/api/data/clientsPageData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
  };

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...clientsPageData, heroImage: url };
      setClientsPageData(updatedData);
      await saveClientsPageData(updatedData);
    });
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    
    const updatedClients = clients.filter(c => c.name !== name);
    setClients(updatedClients); // Optimistic UI update
    
    await fetch(`/api/data/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClients)
    });
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;
    
    const updatedClients = [newClient, ...clients];
    setClients(updatedClients);
    setIsModalOpen(false);
    setNewClient({ name: "", logo: "" });
    
    await fetch(`/api/data/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClients)
    });
  };

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || !editingClient.name) return;
    
    const updatedClients = clients.map(c => c.originalName === editingClient.originalName ? { ...editingClient } : c);
    updatedClients.forEach(c => delete c.originalName);
    
    setClients(updatedClients);
    setIsEditModalOpen(false);
    setEditingClient(null);
    
    await fetch(`/api/data/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClients)
    });
  };

  const openEditModal = (client: any) => {
    setEditingClient({ ...client, originalName: client.name });
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
                Studio Operations // Clients
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Client Management
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage client relationships and studio accounts.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              New Client Account
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
            {clientsPageData.heroImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden relative group">
                <img src={clientsPageData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
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
                  value={clientsPageData.heroImage || ""} 
                  onChange={e => {
                    const updatedData = {...clientsPageData, heroImage: e.target.value};
                    setClientsPageData(updatedData);
                    saveClientsPageData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/backgrounds/..."
                />
              </div>
              {!clientsPageData.heroImage && (
                <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Upload size={14} /> Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Client Logos Database</h2>
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
              <button onClick={fetchClients} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
                Try Again
              </button>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No clients found in the database. Add your first one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {clients.map((client, i) => (
                <div key={client.name || i} className="relative group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center h-32 hover:border-[var(--color-accent)]/30 transition-colors">
                  {client.logo ? (
                     <img src={client.logo} alt={client.name} className="w-16 h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                  ) : (
                     <span className="font-display text-white/50 group-hover:text-white transition-colors">{client.name}</span>
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(client)} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors" title="Edit">
                      <Edit3 size={12} />
                    </button>
                    <button onClick={() => handleDelete(client.name)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors" title="Delete">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add New Placeholder */}
              <button onClick={() => setIsModalOpen(true)} className="bg-[var(--color-ink-dark)]/50 border border-white/5 border-dashed rounded-xl flex flex-col items-center justify-center h-32 hover:border-[var(--color-accent)]/50 hover:bg-white/5 transition-colors group text-[var(--color-grey)] hover:text-[var(--color-accent)]">
                <Plus size={24} className="mb-2" />
                <span className="text-[10px] font-display uppercase tracking-widest">Add Client</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add Client</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Client Logo</label>
                {newClient.logo && (
                  <img src={newClient.logo} alt="Preview" className="w-16 h-16 object-contain rounded mb-2 bg-white/10 p-2" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newClient.logo || ''} 
                    onChange={e => setNewClient({...newClient, logo: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/general/placeholder.webp"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewClient({...newClient, logo: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Client Name</label>
                <input 
                  type="text" required
                  value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Client
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {isEditModalOpen && editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Client</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditClient} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Client Logo</label>
                {editingClient.logo && (
                  <img src={editingClient.logo} alt="Preview" className="w-16 h-16 object-contain rounded mb-2 bg-white/10 p-2" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingClient.logo || ''} 
                    onChange={e => setEditingClient({...editingClient, logo: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingClient({...editingClient, logo: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Client Name</label>
                <input 
                  type="text" required
                  value={editingClient.name} onChange={e => setEditingClient({...editingClient, name: e.target.value})}
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
