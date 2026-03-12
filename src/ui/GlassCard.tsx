'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const GlassCard = ({ children, className = '', delay = 0 }: GlassCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Delay if specified, otherwise show immediately
                    if (delay > 0) {
                        setTimeout(() => setIsVisible(true), delay * 1000);
                    } else {
                        setIsVisible(true);
                    }
                    observer.unobserve(el);
                }
            },
            { rootMargin: '100px' } // trigger 100px before entering viewport — no flash
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`
                relative z-10 overflow-hidden group
                bg-white/[0.03] backdrop-blur-sm md:backdrop-blur-xl 
                border border-white/[0.05]
                rounded-2xl
                hover:bg-white/[0.05] hover:border-brand-gold/20 
                transition-colors duration-500
                shadow-2xl shadow-black/50
                p-6
                ${className}
            `}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                // Optimization: remove will-change after animation to free up GPU memory
                willChange: isVisible ? 'auto' : 'opacity, transform',
            }}
        >
            {/* Efeito de brilho suave no topo (Spotlight) */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Borda gradient no hover */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-brand-gold/10 transition-colors duration-500 pointer-events-none" />

            {/* Conteúdo */}
            {children}
        </div>
    );
};

export default GlassCard;
