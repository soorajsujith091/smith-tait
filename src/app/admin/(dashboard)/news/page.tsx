"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminNews() {
  const [articles, setArticles] = useState<any[]>([]);
  const [newsPageData, setNewsPageData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState<any>({ title: "", slug: "", category: "Insights", date: "", coverImage: "", excerpt: "", body: "" });
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  useEffect(() => {
    fetchArticles();
    fetchNewsPageData();
  }, []);

  const fetchNewsPageData = async () => {
    try {
      const res = await fetch(`/api/data/newsPageData?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setNewsPageData(data.data);
      }
    } catch (err) {
      console.error("Failed to load news page data");
    }
  };

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/news?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch news");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load news from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    const updatedArticles = articles.filter(a => a.slug !== slug);
    setArticles(updatedArticles); // Optimistic UI update
    
    await fetch(`/api/data/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArticles)
    });
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.slug) return;
    
    const articleToAdd = {
      ...newArticle
    };
    
    const updatedArticles = [articleToAdd, ...articles];
    setArticles(updatedArticles);
    setIsModalOpen(false);
    setNewArticle({ title: "", slug: "", category: "Insights", date: "", coverImage: "", excerpt: "", body: "" });
    
    await fetch(`/api/data/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArticles)
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

  const saveNewsPageData = async (updatedData: any) => {
    await fetch(`/api/data/newsPageData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
  };

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, async (url) => {
      const updatedData = { ...newsPageData, heroImage: url };
      setNewsPageData(updatedData);
      await saveNewsPageData(updatedData);
    });
  };

  const handleEditArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title || !editingArticle.slug) return;
    
    const updatedArticles = articles.map(a => a.slug === editingArticle.originalSlug ? { ...editingArticle } : a);
    updatedArticles.forEach(a => delete a.originalSlug);
    
    setArticles(updatedArticles);
    setIsEditModalOpen(false);
    setEditingArticle(null);
    
    await fetch(`/api/data/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArticles)
    });
  };

  const openEditModal = (article: any) => {
    setEditingArticle({ ...article, originalSlug: article.slug });
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
                Studio Operations // News & Insights
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Content Publishing
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Publish and manage studio news, insights, and press releases.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Plus size={14} />
              New Article
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
            {newsPageData.heroImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden relative group">
                <img src={newsPageData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
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
                  value={newsPageData.heroImage || ""} 
                  onChange={e => {
                    const updatedData = {...newsPageData, heroImage: e.target.value};
                    setNewsPageData(updatedData);
                    saveNewsPageData(updatedData);
                  }}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors" 
                  placeholder="/images/backgrounds/..."
                />
              </div>
              {!newsPageData.heroImage && (
                <label className="cursor-pointer h-[46px] px-6 bg-[var(--color-accent)] text-[var(--color-ink-dark)] rounded-lg text-xs font-display uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Upload size={14} /> Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handlePageHeroImageUpload} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-display text-white mb-6">Published Articles</h2>
        
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
            <button onClick={fetchArticles} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-display rounded transition-colors">
              Try Again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-[var(--color-grey)] text-sm">No articles found in the database. Add your first one above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, i) => (
              <div key={article.slug || i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-white/10 rounded overflow-hidden relative shrink-0">
                      {article.coverImage && <img src={article.coverImage} alt="thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
                    </div>
                    <div>
                      <h3 className="font-display text-white text-sm">{article.title}</h3>
                      <p className="font-body text-[10px] text-[var(--color-grey)] uppercase tracking-wider mt-1">{article.category} • {article.date}</p>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(article)}
                    className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" 
                    title="Edit"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(article.slug)}
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

      {/* Add Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Add New Article</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddArticle} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                {newArticle.coverImage && (
                  <img src={newArticle.coverImage} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newArticle.coverImage || ''} 
                    onChange={e => setNewArticle({...newArticle, coverImage: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/general/..."
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setNewArticle({...newArticle, coverImage: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">URL Slug</label>
                <input 
                  type="text" required
                  value={newArticle.slug} onChange={e => setNewArticle({...newArticle, slug: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Category</label>
                  <select 
                    value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  >
                    <option>Insights</option>
                    <option>Awards</option>
                    <option>Events</option>
                    <option>Project News</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Date (YYYY-MM-DD)</label>
                  <input 
                    type="text" required
                    value={newArticle.date} onChange={e => setNewArticle({...newArticle, date: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Excerpt</label>
                <textarea 
                  required
                  value={newArticle.excerpt} onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[60px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Full Content / Body</label>
                <textarea 
                  required
                  value={newArticle.body} onChange={e => setNewArticle({...newArticle, body: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[120px]"
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                Save Article
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {isEditModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-navy)] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-[var(--color-navy)] z-10">
              <h3 className="font-display text-white text-lg">Edit Article</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[var(--color-grey)] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditArticle} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Cover Image</label>
                {editingArticle.coverImage && (
                  <img src={editingArticle.coverImage} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingArticle.coverImage || ''} 
                    onChange={e => setEditingArticle({...editingArticle, coverImage: e.target.value})}
                    className="flex-1 bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                    placeholder="/images/general/..."
                  />
                  <label className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                    <Upload size={14} className="mr-2" /> Upload
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingArticle({...editingArticle, coverImage: url}))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Title</label>
                <input 
                  type="text" required
                  value={editingArticle.title} onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">URL Slug</label>
                <input 
                  type="text" required
                  value={editingArticle.slug} onChange={e => setEditingArticle({...editingArticle, slug: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Category</label>
                  <select 
                    value={editingArticle.category} onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  >
                    <option>Insights</option>
                    <option>Awards</option>
                    <option>Events</option>
                    <option>Project News</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Date</label>
                  <input 
                    type="text" required
                    value={editingArticle.date} onChange={e => setEditingArticle({...editingArticle, date: e.target.value})}
                    className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Excerpt</label>
                <textarea 
                  required
                  value={editingArticle.excerpt || ""} onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[60px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Full Content / Body</label>
                <textarea 
                  required
                  value={editingArticle.body || ""} onChange={e => setEditingArticle({...editingArticle, body: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[120px]"
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
