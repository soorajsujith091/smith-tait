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
            Admin CMS Portal
          </p>
        </div>

        <form className="space-y-6">
          {/* Studio ID */}
          <div className="space-y-2">
            <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] flex items-center justify-between">
              Email Address
            </label>
            <div className="relative flex items-center bg-[var(--color-ink-dark)]/50 border border-white/10 rounded-lg focus-within:border-[var(--color-accent)]/50 transition-colors">
              <div className="pl-4 text-[var(--color-grey)]">
                <AtSign size={16} />
              </div>
              <input
                type="email"
                placeholder="admin@smithtait.com"
                className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] flex items-center justify-between">
              <span>Password</span>
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
              Remember me
            </label>
            <Link href="#" className="hover:text-[var(--color-accent)] transition-colors">
              Forgot password?
            </Link>
          </div>

          <Link href="/admin">
            <button
              type="button"
              className="w-full py-4 mt-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-sm uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Login
              <ArrowRight size={16} />
            </button>
          </Link>
        </form>


      </motion.div>


    </div>
  );
}
