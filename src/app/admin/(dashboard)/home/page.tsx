"use client";

import React from "react";
import { Upload, Edit3, Trash2 } from "lucide-react";

export default function AdminHomeSettings() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hero Video/Image Editor */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 h-fit">
          <h2 className="text-lg font-display text-white mb-4">Page Hero Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">
                Current Background Video
              </label>
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 group bg-black">
                {/* Fallback image for video representation */}
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-grey)]/30">
                  <span className="font-display text-sm tracking-widest uppercase">Video Active</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                  <button className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] text-[10px] font-display uppercase tracking-widest rounded shadow-lg hover:bg-white transition-colors flex items-center gap-2">
                    <Upload size={14} /> Change Video
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">
                Overlay Opacity
              </label>
              <input type="range" min="0" max="100" defaultValue="0" className="w-full accent-[var(--color-accent)]" />
            </div>
            <button className="w-full py-3 mt-2 bg-white/5 border border-white/10 text-white font-display text-[10px] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors">
              Save Hero Settings
            </button>
          </div>
        </div>

        {/* Right Column: Content Grids */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Featured Projects Section */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display text-white">Featured Projects</h2>
              <button className="px-3 py-1.5 bg-transparent border border-white/10 text-white rounded text-[10px] font-display uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors">
                + Add Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Marina Bay Sands", "Louvre Abu Dhabi", "Burj Al Arab"].map((project, i) => (
                <div key={i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <div>
                       <h3 className="font-display text-white text-sm">{project}</h3>
                       <p className="font-body text-[10px] text-[var(--color-grey)] mt-1 uppercase tracking-widest">Visibility: Homepage</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit"><Edit3 size={14} /></button>
                    <button className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Focus Section */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display text-white">Our Focus (Expertise)</h2>
              <button className="px-3 py-1.5 bg-transparent border border-white/10 text-white rounded text-[10px] font-display uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors">
                + Add Focus Area
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Hospitality", "Public Realm", "Residential"].map((focus, i) => (
                <div key={i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <div>
                       <h3 className="font-display text-white text-sm">{focus}</h3>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit"><Edit3 size={14} /></button>
                    <button className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Clients Section */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display text-white">Selected Clients</h2>
              <button className="px-3 py-1.5 bg-transparent border border-white/10 text-white rounded text-[10px] font-display uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors">
                + Add Client
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Aman", "Emaar", "Aldar", "Damac"].map((client, i) => (
                <div key={i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--color-accent)]/30 transition-colors py-6">
                   <h3 className="font-display text-white/50 text-sm">{client}</h3>
                   <div className="mt-4 flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit"><Edit3 size={14} /></button>
                    <button className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
