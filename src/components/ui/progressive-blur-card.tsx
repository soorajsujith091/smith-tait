import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProgressiveBlurProps {
  className?: string;
  blurIntensity?: number;
}

function ProgressiveBlur({ 
  className = '', 
  blurIntensity = 10 
}: ProgressiveBlurProps) {
  return (
    <div 
      className={cn(className)}
      style={{
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
        mask: 'linear-gradient(to top, black 0%, black 60%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.1) 95%, transparent 100%)',
        WebkitMask: 'linear-gradient(to top, black 0%, black 60%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.1) 95%, transparent 100%)',
      }}
    />
  );
}

export interface ProgressiveBlurCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export function ProgressiveBlurCard({ title, description, image, href }: ProgressiveBlurCardProps) {
  return (
    <Link href={href} className="block w-full">
      <div className='relative aspect-square w-full rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] border-8 border-[var(--color-white)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:-translate-y-2 overflow-hidden group'>
        <Image
          src={image}
          alt={title}
          fill
          className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/90 via-[var(--color-navy)]/40 to-transparent transition-all duration-300 group-hover:from-[var(--color-navy)] opacity-80 group-hover:opacity-100'></div>
        <div className='absolute bottom-0 left-0 right-0 z-10'>
          <div className='flex items-end justify-between px-6 py-6'>
            <div className='flex flex-col transform transition-all duration-300 group-hover:translate-y-[-2px]'>
              <h3 className='text-lg md:text-xl font-display font-medium text-[var(--color-white)] transition-all duration-300'>
                {title}
              </h3>
              <p className='text-sm font-body text-[var(--color-white)]/80 mt-1 transition-all duration-300 group-hover:text-[var(--color-white)]'>
                {description}
              </p>
            </div>
            
            <button className="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--color-white)] shadow-lg ring-1 ring-black/5 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:shadow-xl group-hover:scale-110">
              <ArrowRight className="w-5 h-5 text-[var(--color-navy)] transition-all duration-300 group-hover:text-[var(--color-white)] group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
