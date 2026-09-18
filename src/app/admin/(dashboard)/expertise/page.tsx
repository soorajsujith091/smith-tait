"use client";

import React from "react";
import { Upload, Edit3, Trash2 } from "lucide-react";

export default function AdminExpertise() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
                  src="/images/general/texture-perspective-transport-motion-roadside-travel.jpg" 
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
            <button className="w-full py-3 mt-2 bg-white/5 border border-white/10 text-white font-display text-[10px] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors">
              Save Hero Settings
            </button>
          </div>
        </div>

        {/* Right Column: Content Grid */}
        <div className="lg:col-span-2 bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display text-white">Expertise Areas</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Hospitality", "Residential", "Commercial", "Landscape"].map((area, i) => (
              <div key={i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-[var(--color-accent)]/30 transition-colors">
                <div className="flex items-center gap-4">
                   <div>
                     <h3 className="font-display text-white text-sm">{area}</h3>
                   </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit">
                    <Edit3 size={14} />
                  </button>
                  <button className="p-2 bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
