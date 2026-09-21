"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload, Save } from "lucide-react";

export default function AdminFocusAreas() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [newItem, setNewItem] = useState<any>({ title: "", href: "", image: "" });
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/focusData?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to backend.");
      
      const json = await res.json();
      if (json.success && json.data.areasFocused) {
        setData(json.data);
      } else {
        throw new Error("Failed to fetch focus data");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load focus areas from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (updatedData: any) => {
    try {
      const res = await fetch(`/api/data/focusData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) throw new Error("Failed to save data");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
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

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...data, heroImage: url };
      setData(updatedData);
      await saveData(updatedData);
    });
  };

  const openEditModal = (categoryIndex: number, itemIndex: number, item: any) => {
    setActiveCategoryIndex(categoryIndex);
    setEditingItemIndex(itemIndex);
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const openAddModal = (categoryIndex: number) => {
    setActiveCategoryIndex(categoryIndex);
    setNewItem({ title: "", href: "", image: "" });
    setIsAddModalOpen(true);
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeCategoryIndex === null || editingItemIndex === null || !data) return;

    const updatedData = { ...data };
    updatedData.areasFocused[activeCategoryIndex].items[editingItemIndex] = editingItem;

    setData(updatedData);
    setIsEditModalOpen(false);
    await saveData(updatedData);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeCategoryIndex === null || !data) return;

    const updatedData = { ...data };
    updatedData.areasFocused[activeCategoryIndex].items.push(newItem);

    setData(updatedData);
    setIsAddModalOpen(false);
    await saveData(updatedData);
  };

  const handleDeleteItem = async (categoryIndex: number, itemIndex: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const updatedData = { ...data };
    updatedData.areasFocused[categoryIndex].items.splice(itemIndex, 1);

    setData(updatedData);
    await saveData(updatedData);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-[var(--color-grey)]">
        <Loader2 size={32} className="animate-spin mb-4" />
        <p className="text-sm font-display tracking-widest uppercase">Loading Data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col items-center text-center">
        <AlertCircle size={32} className="text-red-500 mb-4" />
        <h3 className="text-white font-display text-lg mb-2">Error Loading Focus Areas</h3>
        <p className="text-red-400 text-sm mb-6">{error}</p>
        <button onClick={fetchData} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded transition">Try Again</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-grey)] mb-4 block">
            Homepage Content
          </span>
          <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
            Focus Areas
          </h1>
          <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
            Manage the Specialist Areas, Project Types, and Design Services displayed on the homepage.
          </p>
        </div>
      </div>

      {/* Hero Background Image Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-display text-white mb-4">Hero Background Image</h2>
        <div className="flex flex-col gap-4">
          {data.heroImage && (
            <div className="w-full h-48 rounded-xl overflow-hidden relative group">
              <img src={data.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
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
                value={data.heroImage || ""} 
                onChange={e => {
                  const updatedData = {...data, heroImage: e.target.value};
                  setData(updatedData);
                  saveData(updatedData);
                }}
                className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                placeholder="/images/backgrounds/..."
              />
            </div>
            {!data.heroImage && (
              <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                <Upload size={14} /> Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {data.areasFocused.map((category: any, catIndex: number) => (
          <div key={category.category} className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-display text-white">
                {category.category}
              </h2>
              <button 
                onClick={() => openAddModal(catIndex)}
                className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-colors"
              >
                <Plus size={14} />
                Add Item
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="aspect-[4/3] w-full bg-white/10 rounded-lg overflow-hidden relative mb-4">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-grey)] text-xs font-display">No Image</div>
                    )}
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="overflow-hidden">
                      <h3 className="font-display text-white text-sm leading-tight truncate">{item.title}</h3>
                      <p className="text-[10px] text-[var(--color-grey)] mt-1 font-mono truncate">{item.href}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button 
                        onClick={() => openEditModal(catIndex, itemIndex, item)}
                        className="p-1.5 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(catIndex, itemIndex)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-500 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {category.items.length === 0 && (
                <div className="col-span-full text-center py-8 text-[var(--color-grey)] text-sm border border-dashed border-white/10 rounded-xl">
                  No items in this category. Click "Add Item" to add one.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="font-display text-white text-lg">Add New Item</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image</label>
                {newItem.image && (
                  <img src={newItem.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newItem.image || ''} 
                    onChange={e => setNewItem({...newItem, image: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/projects/..."
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewItem({...newItem, image: url}))} />
                  </label>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  placeholder="e.g. Master Planning"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Link (URL)</label>
                <input 
                  type="text" required
                  value={newItem.href} onChange={e => setNewItem({...newItem, href: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  placeholder="e.g. /expertise#master-planning"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="font-display text-white text-lg">Edit {editingItem.title}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditItem} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Image</label>
                {editingItem.image && (
                  <img src={editingItem.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingItem.image || ''} 
                    onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingItem({...editingItem, image: url}))} />
                  </label>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Link (URL)</label>
                <input 
                  type="text" required
                  value={editingItem.href} onChange={e => setEditingItem({...editingItem, href: e.target.value})}
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
