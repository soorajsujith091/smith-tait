"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AtSign, Lock, Eye, ArrowRight, Fingerprint, Activity, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[var(--color-ink-dark)]">
      {/* Background */}
      <Image
        src="/images/general/vertical-distant-shot-singapore-marina-bay-sands-nighttime-singapore.jpg"
        alt="Login Background"
        fill
        className="object-cover opacity-30 img-cinematic"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink-dark)]/80 via-[var(--color-ink-dark)]/60 to-[var(--color-navy)]/90" />

      {/* Top Meta Info */}
      <div className="absolute top-8 w-full px-8 flex justify-between items-center text-[10px] font-display uppercase tracking-[0.2em] text-[var(--color-accent)]/70 z-10 hidden sm:flex">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"></div>
          SYS.08 // LUX GATEWAY
        </div>
        <div>CALIBRATED 3200K</div>
      </div>

      {/* Login Card */}
      <motion.div 
        className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-[var(--color-navy)]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-white/5 border border-[var(--color-accent)]/30 rounded-xl flex items-center justify-center mb-4 text-[var(--color-accent)]">
            <Activity size={24} />
          </div>
          <h1 className="text-2xl font-display tracking-widest text-white uppercase mb-2">
            Smith <span className="text-[var(--color-accent)]">Tait</span>
          </h1>
          <p className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] text-center max-w-[250px] leading-relaxed">
            Architectural Lighting Studio • Client & Studio Portal
          </p>
        </div>

        <form className="space-y-6">
          {/* Studio ID */}
          <div className="space-y-2">
            <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] flex items-center justify-between">
              Studio ID // Architectural License
            </label>
            <div className="relative flex items-center bg-[var(--color-ink-dark)]/50 border border-white/10 rounded-lg focus-within:border-[var(--color-accent)]/50 transition-colors">
              <div className="pl-4 text-[var(--color-grey)]">
                <AtSign size={16} />
              </div>
              <input
                type="email"
                placeholder="id@smithtait.com"
                className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Passcode */}
          <div className="space-y-2">
            <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] flex items-center justify-between">
              <span>Security Passcode</span>
              <span className="text-[8px] text-[var(--color-grey)]/50">Encrypted 256-bit</span>
            </label>
            <div className="relative flex items-center bg-[var(--color-ink-dark)]/50 border border-white/10 rounded-lg focus-within:border-[var(--color-accent)]/50 transition-colors">
              <div className="pl-4 text-[var(--color-grey)]">
                <Lock size={16} />
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 focus:outline-none tracking-widest"
              />
              <button type="button" className="pr-4 text-[var(--color-grey)] hover:text-white transition-colors">
                <Eye size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-body text-[var(--color-grey)]">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[var(--color-accent)] flex items-center justify-center transition-colors">
                {/* Custom checkbox styling can be added */}
              </div>
              Maintain active node
            </label>
            <Link href="#" className="hover:text-[var(--color-accent)] transition-colors">
              Passcode recovery
            </Link>
          </div>

          <Link href="/admin">
            <button
              type="button"
              className="w-full py-4 mt-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-sm uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Authenticate Session
              <ArrowRight size={16} />
            </button>
          </Link>
        </form>

        <div className="mt-8 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative bg-[var(--color-navy)] px-4 text-[10px] font-display uppercase tracking-[0.15em] text-[var(--color-grey)]">
            Alternative Credential
          </div>
        </div>

        <button className="w-full py-3 mt-6 bg-transparent border border-white/10 text-white font-display text-xs uppercase tracking-widest rounded-lg hover:border-white/30 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
          <Fingerprint size={16} className="text-[var(--color-grey)]" />
          Sign in with Hardware Key / Token
        </button>

        <div className="mt-8 p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between text-[10px] font-display uppercase tracking-widest">
          <div className="flex items-center gap-2 text-[var(--color-grey)]">
            <Activity size={12} /> Flux Regulation
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">98.4 CRI</span>
            <span className="text-white/20">|</span>
            <span className="text-[var(--color-accent)]">Pass // Nominal</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="absolute bottom-8 w-full px-4 flex flex-col items-center text-center z-10 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)]">
          <ShieldCheck size={12} className="text-[var(--color-accent)]" />
          Smith Tait Systems • Confidential Studio Access Only
        </div>
        <p className="text-[9px] font-body text-[var(--color-grey)]/60">
          Unauthorized access attempts logged under Photometric Asset Standard ISO-9002.
        </p>
      </div>
    </div>
  );
}
