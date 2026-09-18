"use client";

import React from "react";
import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-grey)]">
                Studio Operations // System
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              System Settings
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Configure CMS parameters, API keys, and security gateways.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
              <Save size={14} />
              Save Configuration
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center min-h-[40vh] text-[var(--color-grey)]">
        <p className="font-display uppercase tracking-widest text-sm mb-2">System Configuration</p>
        <p className="font-body text-xs text-[var(--color-grey)]/60">Module pending integration.</p>
      </div>
    </div>
  );
}
