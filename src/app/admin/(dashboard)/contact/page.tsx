"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Download, Upload } from "lucide-react";

export default function AdminContact() {
  const [contactData, setContactData] = useState<any>({ offices: [] });
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newOffice, setNewOffice] = useState({ city: "", address: "", phone: "", email: "", hours: "" });
  const [editingOffice, setEditingOffice] = useState<any | null>(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [res, leadsRes] = await Promise.all([
        fetch(`/api/data/contactData?t=${new Date().getTime()}`),
        fetch(`/api/data/leads?t=${new Date().getTime()}`)
      ]);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setContactData(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch contact data");
      }
      
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success) {
          setLeads(leadsData.data);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load contact data from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveContactData = async (updatedData: any) => {
    await fetch(`/api/data/contactData`, {
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

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...contactData, heroImage: url };
      setContactData(updatedData);
      await saveContactData(updatedData);
    });
  };

  const handleDelete = async (city: string) => {
    if (!confirm(`Are you sure you want to delete the ${city} office?`)) return;
    
    const updatedOffices = contactData.offices.filter((o: any) => o.city !== city);
    const updatedData = { ...contactData, offices: updatedOffices };
    setContactData(updatedData); 
    await saveContactData(updatedData);
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      const res = await fetch(`/api/data/leads`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete lead");
    }
  };

  const handleExportCSV = () => {
    if (!leads || leads.length === 0) return;
    
    const headers = ["Date", "Name", "Email", "Phone", "Company", "Project Type", "Message"];
    const csvContent = [
      headers.join(","),
      ...leads.map((l: any) => [
        `"${new Date(l.createdAt).toLocaleString().replace(/"/g, '""')}"`,
        `"${(l.name || "").replace(/"/g, '""')}"`,
        `"${(l.email || "").replace(/"/g, '""')}"`,
        `"${(l.phone || "").replace(/"/g, '""')}"`,
        `"${(l.company || "").replace(/"/g, '""')}"`,
        `"${(l.projectType || "").replace(/"/g, '""')}"`,
        `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `smith-tait-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddOffice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffice.city) return;
    
    const updatedOffices = [...(contactData.offices || []), newOffice];
    const updatedData = { ...contactData, offices: updatedOffices };
    
    setContactData(updatedData);
    setIsModalOpen(false);
    setNewOffice({ city: "", address: "", phone: "", email: "", hours: "" });
    
    await saveContactData(updatedData);
  };

  const handleEditOffice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffice || !editingOffice.city) return;
    
    const updatedOffices = contactData.offices.map((o: any) => o.originalCity === editingOffice.originalCity ? { ...editingOffice } : o);
    updatedOffices.forEach((o: any) => delete o.originalCity);
    
    const updatedData = { ...contactData, offices: updatedOffices };
    setContactData(updatedData);
    setIsEditModalOpen(false);
    setEditingOffice(null);
    
    await saveContactData(updatedData);
  };

  const openEditModal = (office: any) => {
    setEditingOffice({ ...office, originalCity: office.city });
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
                Studio Operations // Contact
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Contact & Offices
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage global office locations and contact details.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              Add Office Location
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
            {contactData.heroImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden relative group">
                <img src={contactData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
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
                  value={contactData.heroImage || ""} 
                  onChange={e => {
                    const updatedData = {...contactData, heroImage: e.target.value};
                    setContactData(updatedData);
                    saveContactData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/backgrounds/..."
                />
              </div>
              {!contactData.heroImage && (
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
            <h2 className="text-lg font-display text-white">Office Locations Database</h2>
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
              <button onClick={fetchContactData} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
                Try Again
              </button>
            </div>
          ) : (!contactData.offices || contactData.offices.length === 0) ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No office locations found. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contactData.offices.map((office: any, i: number) => (
                <div key={office.city || i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                     <div>
                       <h3 className="font-display text-white text-sm mb-2">{office.city}</h3>
                       <p className="font-body text-xs text-[var(--color-grey)] leading-relaxed whitespace-pre-wrap">{office.address}</p>
                     </div>
                     <div className="space-y-1">
                       <p className="font-body text-xs text-[var(--color-grey)]"><span className="text-white/40 uppercase tracking-widest text-[9px] font-display mr-2">Phone</span>{office.phone}</p>
                       <p className="font-body text-xs text-[var(--color-grey)]"><span className="text-white/40 uppercase tracking-widest text-[9px] font-display mr-2">Email</span>{office.email}</p>
                       <p className="font-body text-xs text-[var(--color-grey)]"><span className="text-white/40 uppercase tracking-widest text-[9px] font-display mr-2">Hours</span>{office.hours}</p>
                     </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEditModal(office)} className="p-2 h-fit bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(office.city)} className="p-2 h-fit bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leads Section */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Contact Leads</h2>
            <div className="flex gap-3">
              <button onClick={handleExportCSV} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-3 py-1 rounded-full text-xs font-display tracking-widest flex items-center gap-2 transition-colors">
                <Download size={12} /> Export CSV
              </button>
              <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1 rounded-full text-xs font-display tracking-widest">{leads.length} Leads</span>
            </div>
          </div>
          
          {(!leads || leads.length === 0) ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[var(--color-grey)] text-sm">No contact leads received yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead: any) => (
                <div key={lead.id} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-6 hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                    <div>
                      <h3 className="font-display text-white text-lg">{lead.name}</h3>
                      <p className="font-body text-xs text-[var(--color-grey)] uppercase tracking-widest mt-1">{lead.company} • {lead.projectType}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-[var(--color-grey)] font-body">
                        {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString()}
                      </span>
                      <button onClick={() => handleDeleteLead(lead.id)} className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--color-grey)] block mb-1">Email</span>
                      <a href={`mailto:${lead.email}`} className="text-sm text-white hover:text-[var(--color-accent)] transition-colors">{lead.email}</a>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--color-grey)] block mb-1">Phone</span>
                      <a href={`tel:${lead.phone}`} className="text-sm text-white hover:text-[var(--color-accent)] transition-colors">{lead.phone}</a>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--color-grey)] block mb-2">Project Details</span>
                    <p className="text-sm text-white/80 font-body leading-relaxed bg-black/20 p-4 rounded-lg">{lead.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Office Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add Office Location</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddOffice} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">City Name</label>
                <input 
                  type="text" required
                  value={newOffice.city} onChange={e => setNewOffice({...newOffice, city: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  placeholder="e.g. Dubai"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Address</label>
                <textarea 
                  required
                  value={newOffice.address} onChange={e => setNewOffice({...newOffice, address: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[80px]"
                  placeholder="Street\nBuilding\nCity, Country"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Phone</label>
                  <input 
                    type="text" required
                    value={newOffice.phone} onChange={e => setNewOffice({...newOffice, phone: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Email</label>
                  <input 
                    type="text" required
                    value={newOffice.email} onChange={e => setNewOffice({...newOffice, email: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Operating Hours</label>
                <input 
                  type="text" required
                  value={newOffice.hours} onChange={e => setNewOffice({...newOffice, hours: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  placeholder="Sun-Thu: 9:00 AM - 6:00 PM"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Office
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Office Modal */}
      {isEditModalOpen && editingOffice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Office Location</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditOffice} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">City Name</label>
                <input 
                  type="text" required
                  value={editingOffice.city} onChange={e => setEditingOffice({...editingOffice, city: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Address</label>
                <textarea 
                  required
                  value={editingOffice.address} onChange={e => setEditingOffice({...editingOffice, address: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Phone</label>
                  <input 
                    type="text" required
                    value={editingOffice.phone} onChange={e => setEditingOffice({...editingOffice, phone: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Email</label>
                  <input 
                    type="text" required
                    value={editingOffice.email} onChange={e => setEditingOffice({...editingOffice, email: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Operating Hours</label>
                <input 
                  type="text" required
                  value={editingOffice.hours} onChange={e => setEditingOffice({...editingOffice, hours: e.target.value})}
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

      {/* Leads Table Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 mt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-display text-white">Recent Contact Leads</h2>
            <p className="text-xs font-body text-[var(--color-grey)] mt-1">Review inquiries submitted via the contact form.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
             <p className="text-[var(--color-grey)] text-sm">No recent leads found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
