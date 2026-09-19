"use client";

import React from "react";
import Link from "next/link";
import { FolderGit2, Users, Newspaper, MessageSquare, Info, Star, Home, Award, Settings, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const quickLinks = [
    { title: "Contact Leads", href: "/admin/contact", icon: MessageSquare, desc: "Manage client inquiries and form submissions." },
    { title: "Projects", href: "/admin/projects", icon: FolderGit2, desc: "Manage portfolio and architectural projects." },
    { title: "Clients", href: "/admin/clients", icon: Users, desc: "Manage client logos and lists." },
    { title: "News & Insights", href: "/admin/news", icon: Newspaper, desc: "Manage articles and press releases." },
    { title: "Home Page", href: "/admin/home", icon: Home, desc: "Manage home page hero and content." },
    { title: "Team", href: "/admin/team", icon: Users, desc: "Manage studio team members." },
    { title: "Expertise", href: "/admin/expertise", icon: Star, desc: "Manage studio expertise and services." },
    { title: "Legacy", href: "/admin/legacy", icon: Award, desc: "Manage studio history and awards." },
    { title: "About", href: "/admin/about", icon: Info, desc: "Manage about page content." },
    { title: "Settings", href: "/admin/settings", icon: Settings, desc: "Manage admin settings." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-grey)]">
              Admin Dashboard // CMS
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display text-white mb-2">
            Content & Leads Management
          </h1>
          <p className="text-sm font-body text-[var(--color-grey)] max-w-2xl">
            Select a section below to manage your website content, upload images, or review client contact submissions.
          </p>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link, i) => (
          <Link key={i} href={link.href}>
            <div className="bg-[var(--color-navy)] rounded-2xl p-6 border border-white/5 hover:border-[var(--color-accent)]/30 hover:bg-white/5 transition-all group h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-grey)] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/30 transition-colors mb-4">
                  <link.icon size={20} />
                </div>
                <h3 className="text-lg font-display text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">{link.title}</h3>
                <p className="text-xs font-body text-[var(--color-grey)] line-clamp-2">
                  {link.desc}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] group-hover:text-[var(--color-accent)] transition-colors">
                <span>Manage</span>
                <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
