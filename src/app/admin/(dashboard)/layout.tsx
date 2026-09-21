"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Search, Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({ name: "Admin User", role: "Lead Architect", image: "/images/general/Nour2.webp" });
  const [leadsCount, setLeadsCount] = useState(0);
  
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/data/profile?t=${new Date().getTime()}`);
        const data = await res.json();
        if (data.success && data.data) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };
    
    const fetchLeadsCount = async () => {
      try {
        const res = await fetch(`/api/data/leads?t=${new Date().getTime()}`);
        const data = await res.json();
        if (data.success && data.data) {
          setLeadsCount(data.data.length);
        }
      } catch (err) {
        console.error("Failed to fetch leads");
      }
    };

    fetchProfile();
    fetchLeadsCount();
  }, []);

  return (
    <div className="flex h-screen bg-[var(--color-ink-dark)] overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Topbar */}
        <header className="h-20 border-b border-white/5 bg-[var(--color-navy)] flex items-center justify-between px-4 md:px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="md:hidden text-[var(--color-grey)] hover:text-white p-2 -ml-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center bg-[var(--color-ink-dark)] px-4 py-2 rounded-xl border border-white/5 w-64 md:w-96 max-w-md focus-within:border-[var(--color-accent)]/50 transition-colors">
              <Search size={18} className="text-[var(--color-grey)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search luminaire specs, plans, entries..."
                className="bg-transparent border-none outline-none text-sm font-body text-[var(--color-white)] w-full ml-3 placeholder-[var(--color-grey)]/60"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/admin/contact" className="relative text-[var(--color-grey)] hover:text-[var(--color-accent)] transition-colors" title="Contact Leads">
              <Bell size={20} />
              {leadsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-bold text-[9px] flex items-center justify-center rounded-full">
                  {leadsCount > 9 ? '9+' : leadsCount}
                </span>
              )}
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 pl-6 border-l border-white/5 hover:opacity-80 transition-opacity cursor-pointer" title="Go to Settings">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 relative">
                <Image src={profile.image} alt={profile.name} fill className="object-cover" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-display text-[var(--color-white)]">{profile.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-grey)]">{profile.role}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-ink-dark)] p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
