"use client";

import React from "react";
import { Download, Plus, Settings2, ShieldCheck, Zap, Activity, RefreshCw, ArrowDownRight } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { ProjectListCard } from "@/components/admin/ProjectListCard";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-grey)]">
                Studio Operations // Overview
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
              <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded border border-[var(--color-accent)]/20">
                Spring Commission Cycle • Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
              Project Portfolio & Lighting <br className="hidden md:block" /> Specifications
            </h1>
            <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
              Orchestrating luminaire photometry, daylight autonomy models, and spatial lighting schedules across 42 active architectural commissions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button className="px-5 py-2.5 bg-transparent border border-white/10 hover:border-white/30 text-white rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
              <Download size={14} />
              Export Tender Docs
            </button>
            <button className="px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-semibold rounded-lg text-[10px] font-display uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
              <Plus size={14} />
              New Lighting Spec
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Projects"
          value="42"
          subtitle="Active Specs"
          badge={{ text: "+14% Q/Q", trend: "up" }}
        >
          <div className="text-xs text-[var(--color-grey)] space-y-1">
            <p>18 Concept • 16 In Procurement • 8 Commissioning</p>
            {/* Mock Sparkline */}
            <div className="h-10 mt-4 w-full flex items-end gap-1 opacity-50">
              {[30, 40, 35, 50, 45, 60, 55, 70, 85].map((h, i) => (
                <div key={i} className="w-full bg-[var(--color-accent)] rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </StatCard>

        <StatCard
          title="Active Clients"
          value="28"
          subtitle="Studio Accounts"
          badge={{ text: "96.4% Retention", trend: "neutral" }}
        >
          <div className="text-xs text-[var(--color-grey)] space-y-1">
            <p>Aman Resorts, Kengo Kuma, Foster+Partners, Snøhetta</p>
            <div className="h-10 mt-4 w-full flex items-end gap-2 opacity-70">
               <div className="w-1/4 h-full bg-white/10 rounded-sm"></div>
               <div className="w-1/4 h-[70%] bg-white/20 rounded-sm"></div>
               <div className="w-1/4 h-[85%] bg-[var(--color-accent)]/50 rounded-sm"></div>
               <div className="w-1/4 h-[60%] bg-[var(--color-accent)] rounded-sm"></div>
            </div>
          </div>
        </StatCard>

        <StatCard
          title="Recent Inquiries"
          value="17"
          subtitle="Lighting RFPs"
          badge={{ text: "$4.2M Pipeline", trend: "up" }}
        >
          <div className="flex justify-between items-center text-xs font-display tracking-wide mt-2">
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                  9 Pending Review
                </div>
                <div className="flex items-center gap-2 text-[var(--color-grey)]">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]/50"></div>
                  5 Feasibility
                </div>
                <div className="flex items-center gap-2 text-[var(--color-grey)]">
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  3 Signed
                </div>
             </div>
             <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[var(--color-accent)] border-r-[var(--color-accent)] flex items-center justify-center">
                <span className="text-[10px] text-[var(--color-accent)]">53%</span>
             </div>
          </div>
        </StatCard>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Lists & Charts) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Commissions */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-1">
                  Spatial Portfolios
                </h3>
                <h2 className="text-xl font-display text-white">Active Architectural Commissions</h2>
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] font-display uppercase tracking-wider px-3 py-1 bg-white/10 text-white rounded">All (42)</button>
                <button className="text-[10px] font-display uppercase tracking-wider px-3 py-1 bg-transparent border border-white/10 text-[var(--color-grey)] rounded hover:text-white">Cultural</button>
                <button className="text-[10px] font-display uppercase tracking-wider px-3 py-1 bg-transparent border border-white/10 text-[var(--color-grey)] rounded hover:text-white">Hospitality</button>
              </div>
            </div>

            <div className="space-y-4">
              <ProjectListCard 
                title="The Obsidian Pavilion"
                location="KYOTO, JP"
                subtitle="Brutalist concrete gallery with integrated daylight harvesting..."
                status="Audit Pending"
                imageUrl="/images/general/about-01.jpg"
                fixtures={220}
                tags={["180-240 Lux", "DALI-2 / Casambi"]}
              />
              <ProjectListCard 
                title="Nordic Light Sanctuary"
                location="OSLO, NO"
                subtitle="Museum wing daylight harvesting with automated shading systems..."
                status="Procurement"
                imageUrl="/images/general/legacy-01.jpg"
                fixtures={480}
                tags={["120-350 Lux", "KNX + DMX512"]}
              />
              <ProjectListCard 
                title="Atelier Cévennes"
                location="PARIS, FR"
                subtitle="High-end subterranean wine cellar and salon focusing on low glare..."
                status="Final Tuning"
                imageUrl="/images/general/view-light-lamp-with-futuristic-design.jpg"
                fixtures={145}
                tags={["40-90 Lux Warm", "0-10V Dim"]}
              />
            </div>
          </div>

          {/* Lux Heatmap */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-1">
                  Dynamic Daylight Simulation
                </h3>
                <h2 className="text-xl font-display text-white">Luminance & Energy Lux Heatmap</h2>
              </div>
              <div className="flex gap-4 text-[10px] font-display uppercase tracking-wider text-[var(--color-grey)]">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>Daylight Influx</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-white/20 rounded-full"></div>LED Auxiliary</div>
              </div>
            </div>
            
            {/* Chart Area Mockup */}
            <div className="h-48 w-full border-b border-white/10 flex items-end gap-2 sm:gap-4 justify-between pb-2">
              {[20, 30, 45, 80, 100, 75, 60, 40, 25, 15].map((val, i) => (
                <div key={i} className="w-full flex flex-col justify-end gap-1 h-full">
                  <div className="w-full bg-[var(--color-accent)] rounded-sm" style={{ height: `${val * 0.6}%` }}></div>
                  <div className="w-full bg-white/10 rounded-sm" style={{ height: `${(100 - val) * 0.3}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-display uppercase tracking-widest text-[var(--color-grey)]">
              <span>06:00 (Dawn)</span>
              <span>12:00 (Peak Lux)</span>
              <span>18:00 (Golden Hour)</span>
              <span>21:00 (Dusk)</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-white/5">
              {[
                { l: "Spatial Autonomy", v: "78.2%" },
                { l: "Peak Glare Index", v: "UGR < 14" },
                { l: "Lighting Power Density", v: "3.8 W/m²" },
                { l: "LEED Daylight Credits", v: "3/3 Opt." },
              ].map(stat => (
                <div key={stat.l} className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="text-[9px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-1">{stat.l}</div>
                  <div className="text-sm font-display text-white">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Alerts & Tools) */}
        <div className="space-y-6">
          {/* Live Stream */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display text-white">Spec Alerts & Telemetry</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)]">Live Stream</span>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: "Lux calculation verified", desc: "Zenith Atrium passes 300lx requirement on mezzanine surfaces.", time: "20m ago - Photometrics Dept." },
                { icon: Activity, title: "Brass extrusion arrived", desc: "Custom 2400K linear sample checked into Zurich atelier workshop.", time: "1h ago - Spec Engineering" },
                { icon: RefreshCw, title: "BIM Revit Rev. 4.2 Synced", desc: "Foster + Partners updated RCP coordinates for levels 02-04.", time: "3h ago - Cloud Integration" },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-accent)]/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-ink-dark)] flex items-center justify-center shrink-0 border border-white/10 text-[var(--color-accent)]">
                    <alert.icon size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-display text-white mb-1">{alert.title}</h4>
                    <p className="text-xs font-body text-[var(--color-grey)] mb-2 line-clamp-2">{alert.desc}</p>
                    <p className="text-[9px] font-display uppercase tracking-wider text-[var(--color-grey)]/60">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5">
             <h3 className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] mb-1">
                Tooling Suite
             </h3>
             <h2 className="text-lg font-display text-white mb-6">Architectural Controls</h2>

             <div className="space-y-2">
                {[
                  { label: "Run IES Photometric Batch", icon: Zap },
                  { label: "Dark-Sky Compliance Audit", icon: ShieldCheck },
                  { label: "Generate DALI-2 Schedule", icon: Settings2 },
                  { label: "Kelvin Color-Temp Matrix", icon: Activity },
                ].map((tool, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-ink-dark)] border border-white/5 hover:border-[var(--color-accent)]/50 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <tool.icon size={16} className="text-[var(--color-grey)] group-hover:text-[var(--color-accent)] transition-colors" />
                      <span className="text-xs font-display uppercase tracking-widest text-[var(--color-white)] group-hover:text-[var(--color-accent)] transition-colors">{tool.label}</span>
                    </div>
                    <ArrowDownRight size={14} className="text-[var(--color-grey)] -rotate-90 group-hover:text-[var(--color-accent)] transition-colors" />
                  </button>
                ))}
             </div>

             <div className="mt-6 p-4 rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                    <Settings2 size={12} />
                  </div>
                  <span className="text-[10px] font-display uppercase tracking-widest text-white">Active DALI Controller</span>
                </div>
                <div className="text-[9px] font-display uppercase tracking-widest text-[var(--color-accent)] text-right">
                  Online • 48V<br/>DC
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
