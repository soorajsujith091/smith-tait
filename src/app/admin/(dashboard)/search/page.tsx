"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [projRes, teamRes, newsRes, clientsRes] = await Promise.all([
          fetch('/api/data/projects'),
          fetch('/api/data/team'),
          fetch('/api/data/news'),
          fetch('/api/data/clients')
        ]);
        
        const projData = await projRes.json();
        const teamData = await teamRes.json();
        const newsData = await newsRes.json();
        const clientsData = await clientsRes.json();

        let all: any[] = [];
        const q = query.toLowerCase();
        
        if (projData.success && projData.data) {
          all = [...all, ...projData.data.filter((p: any) => p.title?.toLowerCase().includes(q) || p.client?.toLowerCase().includes(q)).map((p:any) => ({...p, _type: 'Project', _link: '/admin/projects'}))];
        }
        if (teamData.success && teamData.data) {
          all = [...all, ...teamData.data.filter((t: any) => t.name?.toLowerCase().includes(q) || t.role?.toLowerCase().includes(q)).map((t:any) => ({...t, _type: 'Team', _link: '/admin/team'}))];
        }
        if (newsData.success && newsData.data) {
          all = [...all, ...newsData.data.filter((n: any) => n.title?.toLowerCase().includes(q) || n.excerpt?.toLowerCase().includes(q)).map((n:any) => ({...n, _type: 'News', _link: '/admin/news'}))];
        }
        if (clientsData.success && clientsData.data) {
          all = [...all, ...clientsData.data.filter((c: any) => c.name?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q)).map((c:any) => ({...c, _type: 'Client', _link: '/admin/clients'}))];
        }
        
        setResults(all);
      } catch(err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-[var(--color-navy)] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-display text-white mb-2">Search Results</h1>
          <p className="text-sm font-body text-[var(--color-grey)]">Showing results for: <span className="text-white font-medium">"{query}"</span></p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[var(--color-grey)]" /></div>
      ) : results.length === 0 ? (
        <div className="bg-[var(--color-navy)] rounded-2xl p-12 border border-white/5 text-center flex flex-col items-center justify-center min-h-[40vh]">
          <Search size={32} className="text-[var(--color-grey)]/50 mb-4" />
          <h2 className="text-lg font-display text-white mb-2">No results found</h2>
          <p className="text-sm font-body text-[var(--color-grey)] max-w-sm">We couldn't find anything matching "{query}". Try another search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res, i) => (
            <Link href={res._link} key={i} className="group bg-[var(--color-navy)] rounded-2xl p-4 border border-white/5 hover:border-[var(--color-accent)]/50 transition-all duration-300 flex gap-4 items-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/10">
              <div className="w-16 h-16 rounded-xl bg-[var(--color-ink-dark)] overflow-hidden shrink-0 relative">
                {res.image || res.coverImage || res.logo ? (
                  <Image src={res.image || res.coverImage || res.logo} alt={res.title || res.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-grey)]/30"><Search size={20} /></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-display uppercase tracking-widest text-[var(--color-accent)] block mb-1">{res._type}</span>
                <h3 className="text-white font-display text-sm truncate">{res.title || res.name}</h3>
                {res.role || res.category ? <p className="text-[10px] text-[var(--color-grey)] uppercase tracking-widest truncate mt-0.5">{res.role || res.category}</p> : null}
              </div>
              <ArrowRight size={16} className="text-[var(--color-grey)] group-hover:text-[var(--color-accent)] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="animate-spin text-[var(--color-grey)]" /></div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
