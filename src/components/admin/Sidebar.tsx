"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Info,
  Lightbulb,
  History,
  Briefcase,
  Users,
  FileText,
  Users2,
  Mail,
  Settings,
  Cpu,
  X,
  LogOut,
  Target,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Home", href: "/admin/home", icon: Home },
  { name: "About", href: "/admin/about", icon: Info },
  { name: "Expertise", href: "/admin/expertise", icon: Lightbulb },
  { name: "Legacy", href: "/admin/legacy", icon: History },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "News", href: "/admin/news", icon: FileText },
  { name: "Team", href: "/admin/team", icon: Users2 },
  { name: "Focus Areas", href: "/admin/focus", icon: Target },
  { name: "Contact", href: "/admin/contact", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ isOpen = false, onClose = () => {} }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[var(--color-navy)] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 h-[100dvh] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="p-8 flex items-center justify-between gap-3 shrink-0">
          <Image
            src="/images/general/logo.png"
            alt="Smith Tait"
            width={120}
            height={30}
            className="opacity-90"
          />
          <button 
            className="md:hidden text-[var(--color-grey)] hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="px-4 py-2 space-y-1 overflow-y-auto flex-1 pb-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-display uppercase tracking-widest text-xs ${
                  isActive
                    ? "bg-[var(--color-ink-dark)] text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]"
                    : "text-[var(--color-grey)] hover:bg-white/5 hover:text-[var(--color-white)] border-l-2 border-transparent"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[var(--color-accent)]" : "opacity-70"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 flex flex-col gap-4">
        <Link 
          href="/admin/login" 
          className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-display uppercase tracking-widest text-xs text-red-500 hover:bg-red-500/10 hover:text-red-400 group"
        >
          <span>Log Out</span>
          <LogOut size={16} className="opacity-70 group-hover:opacity-100" />
        </Link>
      </div>
    </aside>
  );
}
