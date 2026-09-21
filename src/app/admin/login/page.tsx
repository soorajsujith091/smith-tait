"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AtSign, Lock, Eye, ArrowRight, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/home");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          <Image
            src="/images/general/ST_Logo_White_RGB.webp"
            alt="Smith Tait"
            width={180}
            height={60}
            className="mb-4"
            priority
          />
          <p className="text-[10px] font-display uppercase tracking-widest text-[var(--color-grey)] text-center max-w-[250px] leading-relaxed">
            Admin CMS Portal
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Email */}
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent border-none py-3 px-3 text-sm text-white placeholder-white/20 focus:outline-none tracking-widest"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="pr-4 text-[var(--color-grey)] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-[var(--color-accent)] text-[var(--color-ink-dark)] font-display text-sm uppercase tracking-widest font-semibold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Login"}
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          </button>
        </form>

      </motion.div>


    </div>
  );
}
