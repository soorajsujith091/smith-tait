"use client";

import React from "react";
import { Upload, Edit3, Trash2 } from "lucide-react";

export default function AdminContact() {
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
                  src="/images/general/view-light-lamp-with-futuristic-design.jpg" 
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
            <h2 className="text-lg font-display text-white">Office Locations Database</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                city: "Dubai",
                address1: "Dubai Design District",
                address2: "Building 4, Office 301",
                country: "Dubai, UAE",
                phone: "+971 4 585 0000",
                email: "dubai@smithtait.com",
                hours: "Sun–Thu: 9:00 AM – 6:00 PM"
              },
              {
                city: "London",
                address1: "175 Gray's Inn Road",
                address2: "WC1X 8UE",
                country: "London, UK",
                phone: "+44 20 7000 0000",
                email: "london@smithtait.com",
                hours: "Mon–Fri: 9:00 AM – 5:30 PM"
              }
            ].map((office, i) => (
              <div key={i} className="group bg-[var(--color-ink-dark)] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--color-accent)]/30 transition-colors">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                   <div>
                     <h3 className="font-display text-white text-sm mb-2">{office.city}</h3>
                     <p className="font-body text-xs text-[var(--color-grey)] leading-relaxed">{office.address1}<br/>{office.address2}<br/>{office.country}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="font-body text-xs text-[var(--color-grey)]"><span className="text-white/40 uppercase tracking-widest text-[9px] font-display mr-2">Phone</span>{office.phone}</p>
                     <p className="font-body text-xs text-[var(--color-grey)]"><span className="text-white/40 uppercase tracking-widest text-[9px] font-display mr-2">Email</span>{office.email}</p>
                     <p className="font-body text-xs text-[var(--color-grey)]"><span className="text-white/40 uppercase tracking-widest text-[9px] font-display mr-2">Hours</span>{office.hours}</p>
                   </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button className="p-2 h-fit bg-white/5 hover:bg-white/20 text-[var(--color-grey)] hover:text-white rounded transition-colors" title="Edit">
                    <Edit3 size={14} />
                  </button>
                  <button className="p-2 h-fit bg-red-500/5 hover:bg-red-500/20 text-[var(--color-grey)] hover:text-red-500 rounded transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 mt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-display text-white">Recent Contact Leads</h2>
            <p className="text-xs font-body text-[var(--color-grey)] mt-1">Review inquiries submitted via the contact form.</p>
          </div>
          <button className="text-[10px] font-display uppercase tracking-wider px-3 py-1.5 bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
            Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)]">
                <th className="py-4 font-normal">Date</th>
                <th className="py-4 font-normal">Name / Email</th>
                <th className="py-4 font-normal">Company</th>
                <th className="py-4 font-normal">Project Type</th>
                <th className="py-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-body text-white">
              <tr className="border-b border-white/5 hover:bg-[var(--color-ink-dark)] transition-colors">
                <td className="py-4 text-xs text-[var(--color-grey)]">Today, 10:42 AM</td>
                <td className="py-4">Jane Doe<br/><span className="text-xs text-[var(--color-grey)]">jane@example.com</span></td>
                <td className="py-4">Acme Corp</td>
                <td className="py-4">Commercial / Retail</td>
                <td className="py-4 text-right">
                  <button className="text-[10px] font-display uppercase tracking-wider text-[var(--color-accent)] hover:text-white transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-[var(--color-ink-dark)] transition-colors">
                <td className="py-4 text-xs text-[var(--color-grey)]">Yesterday, 14:15 PM</td>
                <td className="py-4">John Smith<br/><span className="text-xs text-[var(--color-grey)]">john@studio-arch.com</span></td>
                <td className="py-4">Studio Architecture</td>
                <td className="py-4">Hospitality</td>
                <td className="py-4 text-right">
                  <button className="text-[10px] font-display uppercase tracking-wider text-[var(--color-accent)] hover:text-white transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-[var(--color-ink-dark)] transition-colors">
                <td className="py-4 text-xs text-[var(--color-grey)]">Oct 12, 2026</td>
                <td className="py-4">Elena Rossi<br/><span className="text-xs text-[var(--color-grey)]">elena.r@luxury-hotels.it</span></td>
                <td className="py-4">Luxury Hotels Group</td>
                <td className="py-4">Residential</td>
                <td className="py-4 text-right">
                  <button className="text-[10px] font-display uppercase tracking-wider text-[var(--color-accent)] hover:text-white transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
