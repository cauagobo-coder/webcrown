import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Smartphone, Zap, Search, MessageCircle, Rocket, Shield, Globe } from 'lucide-react';

const differentials = [
    { icon: Palette, label: 'Design Premium' },
    { icon: Smartphone, label: 'Mobile-first' },
    { icon: Zap, label: 'Alta Performance' },
    { icon: Search, label: 'SEO Otimizado' },
    { icon: MessageCircle, label: 'Suporte Direto' },
    { icon: Rocket, label: 'Conversão em Foco' },
    { icon: Shield, label: 'Segurança Total' },
    { icon: Globe, label: 'Domínio Grátis (1 ano)' },
];

// Split into two rows
const row1 = differentials.slice(0, 4);
const row2 = differentials.slice(4);

import Container from './Container';

// --- Pill Component ---
const Pill = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <div
        className="
            group flex items-center gap-3 px-6 py-3 rounded-full 
            bg-white/5 border border-white/10
            hover:bg-brand-gold/10 hover:border-brand-gold/30
            transition-all duration-300 cursor-default shrink-0 whitespace-nowrap
        "
    >
        <Icon className="w-5 h-5 transition-colors text-brand-gold/70 group-hover:text-brand-gold" />
        <span className="text-sm font-medium transition-colors font-body text-brand-gray group-hover:text-white">
            {label}
        </span>
    </div>
);

// --- Marquee Row ---
// Pauses CSS animation when off-screen to free GPU compositor on mobile
const MarqueeRow = ({ items, reverse = false, duration = 20 }: { items: typeof differentials; reverse?: boolean; duration?: number }) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: '100px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Duplicate items enough times for seamless loop
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div ref={rowRef} className="relative overflow-hidden w-full">
            <div
                className="flex gap-4 w-max"
                style={{
                    animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
                    animationPlayState: isVisible ? 'running' : 'paused',
                }}
            >
                {repeated.map((item, index) => (
                    <Pill key={`${item.label}-${index}`} icon={item.icon} label={item.label} />
                ))}
            </div>
        </div>
    );
};

const DifferentialsSection = () => {
    return (
        <section className="py-20 relative bg-black/95 border-y border-white/5 overflow-hidden">
            {/* Header */}
            <Container className="relative z-10 text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-white">
                        Por que <span className="text-brand-gold">me escolher?</span>
                    </h2>
                    <p className="text-zinc-400 font-body">
                        Mais do que sites, entrego soluções digitais completas.
                    </p>
                </motion.div>
            </Container>

            {/* Carousel Rows (Full Width, No Container) */}
            <div className="relative">
                {/* Row 1: Left to Right */}
                <div className="mb-4">
                    <MarqueeRow items={row1} duration={25} />
                </div>

                {/* Row 2: Right to Left */}
                <div>
                    <MarqueeRow items={row2} reverse duration={30} />
                </div>

                {/* Fade Left */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black/95 to-transparent z-10 pointer-events-none" />
                {/* Fade Right */}
                <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black/95 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Keyframe Styles */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default DifferentialsSection;
