"use client";

import React from "react";
import { Plus, Download, Upload, Edit3, Trash2 } from "lucide-react";

export default function AdminClients() {
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
              Manage client relationships, studio accounts, and active RFPs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
              <Plus size={14} />
              New Client Account
            </button>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hero Image Editor */}
        <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 h-fit">
          <h2 className="text-lg font-display text-white mb-4">Page Hero Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">
                Current Background Image
              </label>
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 group">
                <img 
                  src="/images/general/vertical-distant-shot-singapore-marina-bay-sands-nighttime-singapore.jpg" 
                  alt="Current Hero" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] text-[10px] font-display uppercase tracking-widest rounded shadow-lg hover:bg-white transition-colors flex items-center gap-2">
                    <Upload size={14} /> Change Image
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-2 block">
                Overlay Opacity
              </label>
              <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-[var(--color-accent)]" />
              <div className="flex justify-between text-[10px] text-[var(--color-grey)] mt-1">
                <span>0%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            <button className="w-full py-3 mt-2 bg-white/5 border border-white/10 text-white font-display text-[10px] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors">
              Save Hero Settings
            </button>
          </div>
        </div>

        {/* Right Column: Content Grid */}
        <div className="lg:col-span-2 bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Client Logos Database</h2>
            <button className="px-3 py-1.5 bg-transparent border border-white/10 text-white rounded text-[10px] font-display uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors">
              <Upload size={14} /> Bulk Upload
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Mock Logo Cards */}
            {["Aman", "Emaar", "Aldar", "Damac", "Atlantis", "One&Only"].map((client, i) => (
              <div key={i} className="relative group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center h-32 hover:border-[var(--color-accent)]/30 transition-colors">
                <span className="font-display text-white/50 group-hover:text-white transition-colors">{client} Logo</span>
                
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors" title="Edit">
                    <Edit3 size={12} />
                  </button>
                  <button className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors" title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add New Placeholder */}
            <button className="bg-[var(--color-ink-dark)]/50 border border-white/5 border-dashed rounded-xl flex flex-col items-center justify-center h-32 hover:border-[var(--color-accent)]/50 hover:bg-white/5 transition-colors group text-[var(--color-grey)] hover:text-[var(--color-accent)]">
              <Plus size={24} className="mb-2" />
              <span className="text-[10px] font-display uppercase tracking-widest">Add Client Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
