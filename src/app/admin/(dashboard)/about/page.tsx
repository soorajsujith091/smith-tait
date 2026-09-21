"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, AlertCircle, Upload } from "lucide-react";

export default function AdminAbout() {
  const [aboutData, setAboutData] = useState<any>({ heroHeading: "", storyHeading: "", storyParagraph1: "", storyParagraph2: "", storyImage: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/data/aboutData?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to connect to the backend.");
      
      const data = await res.json();
      if (data.success) {
        setAboutData(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch about data");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load about data from JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveAboutData = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await fetch(`/api/data/aboutData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aboutData)
    });
    alert("About page content saved!");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
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
        setAboutData({ ...aboutData, [fieldName]: data.url });
      } else {
        alert("Upload failed: " + data.error);
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
                Studio Operations // About
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              About Page Content
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Manage the story, philosophy, and messaging of the About page.
            </p>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[var(--color-grey)]" size={32}/></div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col items-center text-center">
          <AlertCircle size={32} className="text-red-500 mb-4" />
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button onClick={fetchAboutData} className="px-4 py-2 bg-white/5 text-white text-xs uppercase rounded">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Image Editors */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 h-fit space-y-6">
            <h2 className="text-lg font-display text-white mb-4">Media Settings</h2>
            
            <div>
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">
                Hero Background Image
              </label>
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 group bg-black mb-2">
                {aboutData.heroImage && (
                  <img src={aboutData.heroImage} alt="Hero Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] text-[10px] font-display uppercase tracking-widest rounded shadow-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer">
                    <Upload size={14} /> Change Image
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'heroImage')} />
                  </label>
                </div>
              </div>
              <input 
                type="text" value={aboutData.heroImage || ""} onChange={e => setAboutData({...aboutData, heroImage: e.target.value})}
                className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">
                Story Image (Right Column)
              </label>
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 group bg-black mb-2">
                {aboutData.storyImage && (
                  <img src={aboutData.storyImage} alt="Story Image" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] text-[10px] font-display uppercase tracking-widest rounded shadow-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer">
                    <Upload size={14} /> Change Image
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'storyImage')} />
                  </label>
                </div>
              </div>
              <input 
                type="text" value={aboutData.storyImage || ""} onChange={e => setAboutData({...aboutData, storyImage: e.target.value})}
                className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-2 text-white text-xs"
              />
            </div>

            <button onClick={saveAboutData} className="w-full py-3 mt-4 bg-white/5 border border-white/10 text-white font-display text-[10px] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors">
              Save All Changes
            </button>
          </div>

          {/* Right Column: Content Form */}
          <div className="lg:col-span-2 bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display text-white">Text Content</h2>
            </div>
            
            <form onSubmit={saveAboutData} className="space-y-6">
              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Hero Heading</label>
                <input 
                  type="text" required
                  value={aboutData.heroHeading || ""} onChange={e => setAboutData({...aboutData, heroHeading: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Story Section Heading</label>
                <input 
                  type="text" required
                  value={aboutData.storyHeading || ""} onChange={e => setAboutData({...aboutData, storyHeading: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Story Paragraph 1</label>
                <textarea 
                  required
                  value={aboutData.storyParagraph1 || ""} onChange={e => setAboutData({...aboutData, storyParagraph1: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[120px]"
                />
              </div>

              <div>
                <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">Story Paragraph 2</label>
                <textarea 
                  required
                  value={aboutData.storyParagraph2 || ""} onChange={e => setAboutData({...aboutData, storyParagraph2: e.target.value})}
                  className="w-full bg-[var(--color-ink-dark)] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-accent)]/50 min-h-[120px]"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors">
                  Save Content Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
