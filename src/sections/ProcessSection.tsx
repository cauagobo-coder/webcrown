import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import {
    Search,
    Target,
    Code,
    CheckCircle2,
    Zap,
    ArrowDown,
    Sparkles
} from 'lucide-react';
import { GoldButton } from '../ui/GoldButton';
import Container from '../ui/Container';

// --- Interfaces ---
interface StepProps {
    id: number;
    year: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

interface ProgressNodeProps {
    nodeX: number;
    scrollYProgress: MotionValue<number>;
    index: number;
    threshold: number;
}

interface SpotlightCardProps {
    step: StepProps;
    scrollYProgress: MotionValue<number>;
    threshold: number;
    dynamicWidth?: number;
}

// --- Dados ---
const steps: StepProps[] = [
    { id: 1, year: "Fase 01", title: "Diagnóstico Estratégico", description: "Mapeamos seu negócio, público-alvo e concorrência para construir uma base sólida.", icon: Search },
    { id: 2, year: "Fase 02", title: "Direção Criativa", description: "Definimos identidade visual, linguagem e posicionamento único para sua marca.", icon: Target },
    { id: 3, year: "Fase 03", title: "Produção Visual", description: "Desenvolvemos todos os materiais gráficos e assets digitais com qualidade.", icon: Code },
    { id: 4, year: "Fase 04", title: "Implementação", description: "Entregamos o projeto aplicado nas plataformas certas: redes, landing pages ou campanhas.", icon: Sparkles },
    { id: 5, year: "Fase 05", title: "Evolução Contínua", description: "Monitoramos desempenho e aprimoramos sua presença digital com dados reais.", icon: CheckCircle2 },
];

// --- Constantes de Dimensão (Desktop) ---
const CARD_WIDTH = 450;
const GAP_WIDTH = 300;
const FINAL_CTA_WIDTH = 600;

// --- Componente: Header ---
const Header = ({ compact = false }: { compact?: boolean }) => {
    return (
        <section className={`relative ${compact ? 'py-20' : 'h-[90vh]'} flex flex-col justify-center bg-[#050505] z-10 border-b border-white/5`}>
            <Container>
                <div className="max-w-4xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                        Nosso <span className="text-brand-gold">Método</span>
                    </h2>

                    <p className="text-neutral-300 font-semibold text-lg md:text-2xl max-w-2xl leading-snug mb-6">
                        Do briefing ao resultado. Estratégia que pensa. Execução que impacta.
                    </p>

                    <div className="space-y-4 max-w-2xl border-l-0 lg:border-l-4 border-brand-gold pl-0 lg:pl-8">
                        <p className="text-neutral-400 font-medium text-base md:text-lg leading-relaxed">
                            Nada aqui é por acaso.<br />
                            Cada projeto nasce de uma arquitetura clara, construída para transformar visão criativa em presença digital que entrega estética, performance e posicionamento.
                        </p>
                        <p className="text-neutral-500 text-sm md:text-base italic">
                            Criar marca não é sobre design. É sobre direção.
                        </p>
                    </div>
                </div>
            </Container>

            {!compact && (
                <Container className="absolute bottom-12 left-0 right-0">
                    <div className="flex items-center gap-4 text-neutral-500 animate-bounce justify-center lg:justify-start">
                        <ArrowDown className="w-6 h-6 text-brand-gold" />
                        <span className="text-sm uppercase tracking-widest font-bold">Conheça a lógica por trás da estética</span>
                    </div>
                </Container>
            )}
        </section>
    );
};

// --- Componente: Nó (Bolinha) Desktop ---
const ProgressNode: React.FC<ProgressNodeProps> = ({
    nodeX,
    scrollYProgress,
    threshold,
    index
}) => {
    const activeState = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0] : [threshold - 0.005, threshold],
        index === 0 ? [1, 1] : [0, 1],
        { clamp: true }
    );

    const ringColor = useTransform(activeState, [0, 1], ["#262626", "#F58A07"]);
    const coreColor = useTransform(activeState, [0, 1], ["#171717", "#F58A07"]);
    const shadow = useTransform(activeState, [0, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 30px rgba(245,138,7,1)"]);
    const scale = useTransform(activeState, [0, 1], [0.8, 1.2]);

    return (
        <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
            style={{ left: `${nodeX}px` }}
        >
            <motion.div
                style={{ scale, borderColor: ringColor, boxShadow: shadow }}
                className="w-8 h-8 rounded-full border-[3px] bg-[#050505] flex items-center justify-center"
            >
                <motion.div
                    style={{ backgroundColor: coreColor }}
                    className="w-2.5 h-2.5 rounded-full"
                />
            </motion.div>
        </div>
    );
};

// --- Componente: Card Desktop (spotlight + spring) ---
const SpotlightCard: React.FC<SpotlightCardProps> = ({ step, scrollYProgress, threshold, dynamicWidth }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const isPassed = useTransform(
        scrollYProgress,
        [threshold - 0.005, threshold],
        [0, 1],
        { clamp: true }
    );

    const borderColor = useTransform(isPassed, [0, 1], ["rgba(255, 255, 255, 0.05)", "rgba(245, 138, 7, 1)"]);
    const glowShadow = useTransform(isPassed, [0, 1], ["0 0 0 rgba(0,0,0,0)", "0 0 60px rgba(245, 138, 7, 0.3)"]);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
        if (ref.current) {
            ref.current.style.setProperty("--x", `${clientX - left}px`);
            ref.current.style.setProperty("--y", `${clientY - top}px`);
        }
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                width: dynamicWidth || CARD_WIDTH,
                borderColor,
                boxShadow: glowShadow
            }}
            className="group relative h-[350px] md:h-[400px] lg:h-[450px] shrink-0 rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900/60 border p-5 md:p-7 lg:p-10 transition-colors"
        >
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                style={{ background: `radial-gradient(400px circle at var(--x) var(--y), rgba(245, 138, 7, 0.08), transparent 80%)` }} />

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6 md:mb-10">
                    <div className="px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
                        <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest">{step.year}</span>
                    </div>
                    <step.icon className="w-8 h-8 text-white/10 group-hover:text-brand-gold group-hover:drop-shadow-[0_0_12px_rgba(245,138,7,0.4)] transition-all duration-500" />
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-3 md:mb-4 tracking-tighter leading-none whitespace-nowrap">{step.title}</h3>
                <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors leading-relaxed text-xs md:text-sm">{step.description}</p>

                <div className="mt-auto pt-8">
                    <div className="h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            style={{
                                width: useTransform(scrollYProgress, [threshold, threshold + 0.1], ["0%", "100%"]),
                            }}
                            className="h-full bg-brand-gold shadow-[0_0_10px_rgba(245,138,7,0.8)]"
                        />
                    </div>
                </div>
            </div>

            <span className="absolute -bottom-8 -right-4 text-[160px] font-black text-white/[0.015] select-none pointer-events-none">0{step.id}</span>
        </motion.div>
    );
};

// ========================================
// MOBILE CARD — lightweight, no springs
// ========================================
const MobileProcessCard = ({ step, index }: { step: StepProps; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-full"
        >
            <div className="relative rounded-2xl bg-neutral-900/60 border border-white/5 p-6 overflow-hidden">
                <span className="absolute -bottom-4 -right-2 text-[100px] font-black text-white/[0.02] select-none pointer-events-none leading-none">
                    0{step.id}
                </span>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
                            <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest">{step.year}</span>
                        </div>
                        <step.icon className="w-6 h-6 text-brand-gold/40" />
                    </div>

                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>

                    <div className="mt-4 h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                            className="h-full bg-brand-gold shadow-[0_0_10px_rgba(245,138,7,0.8)]"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ========================================
// MOBILE LAYOUT — simple vertical stack
// ========================================
const ProcessSectionMobile = () => {
    return (
        <section id="processo" className="relative bg-[#050505]">
            <Header compact />

            <div className="px-5 pb-16 pt-4">
                <div className="relative max-w-md mx-auto">
                    {/* Vertical timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/5" />

                    <div className="flex flex-col gap-6 pl-10">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative">
                                {/* Dot */}
                                <div className="absolute -left-10 top-6 w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_12px_rgba(245,138,7,0.6)] border-2 border-[#050505]" />
                                <MobileProcessCard step={step} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center mt-12"
                >
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full" />
                        <div className="relative w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,138,7,0.4)]">
                            <Zap className="w-8 h-8 text-black fill-black" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-6">Vamos<br />Começar?</h3>
                    <GoldButton whatsappMessage="Olá! Vi sua Metodologia e quero iniciar um projeto.">
                        Solicitar Projeto
                    </GoldButton>
                </motion.div>
            </div>
        </section>
    );
};

// ========================================
// DESKTOP: Original Horizontal Timeline
// ========================================
const ProcessSectionDesktop: React.FC = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollY } = useScroll();
    const [elementTop, setElementTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);

    const [paddingStart, setPaddingStart] = useState(260);
    const [cardWidth, setCardWidth] = useState(CARD_WIDTH);
    const [gapWidth, setGapWidth] = useState(GAP_WIDTH);
    const [ctaWidth, setCtaWidth] = useState(FINAL_CTA_WIDTH);

    const updatePosition = () => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setElementTop(rect.top + scrollTop);
            setClientHeight(targetRef.current.offsetHeight);
        }
    };

    const updateDimensions = () => {
        const width = window.innerWidth;
        setViewportWidth(width);
        setPaddingStart(260);
        setCardWidth(450);
        setGapWidth(300);
        setCtaWidth(600);
        updatePosition();
    };

    useEffect(() => {
        updateDimensions();
        setTimeout(updateDimensions, 100);
        setTimeout(updateDimensions, 500);

        let resizeTimer: ReturnType<typeof setTimeout>;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateDimensions, 200);
        };
        window.addEventListener('resize', debouncedResize);

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    updatePosition();
                    ticking = false;
                });
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', debouncedResize);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(resizeTimer);
        };
    }, []);

    const scrollYProgress = useTransform(
        scrollY,
        [elementTop, elementTop + clientHeight - (typeof window !== 'undefined' ? window.innerHeight : 0)],
        [0, 1]
    );

    const currentBlockWidth = cardWidth + gapWidth;

    const { totalContentWidth, nodePositions, lineStartX, lineTotalLength } = useMemo(() => {
        const positions = [
            paddingStart,
            ...steps.map((_, i) => paddingStart + (i + 1) * currentBlockWidth)
        ];
        const endPadding = paddingStart / 4;
        const totalWidth = paddingStart + (steps.length * currentBlockWidth) + ctaWidth + endPadding;
        const lStart = positions[0];
        const lEnd = positions[positions.length - 1];

        return {
            totalContentWidth: totalWidth,
            nodePositions: positions,
            lineStartX: lStart,
            lineTotalLength: lEnd - lStart
        };
    }, [paddingStart, viewportWidth, cardWidth, gapWidth, ctaWidth]);

    const maxScroll = Math.max(0, totalContentWidth - viewportWidth);
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${maxScroll}px`]);
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="processo" className="relative bg-[#050505]">
            <Header />
            <section ref={targetRef} className="relative h-[600vh] bg-[#050505] overflow-visible">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    <motion.div style={{ x }} className="flex items-center relative h-full">

                        <div style={{ width: totalContentWidth, height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

                        <div className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                            style={{ left: `${lineStartX}px`, width: `${lineTotalLength}px`, height: '2px' }}>
                            <div className="absolute inset-0 bg-white/5" />
                            <motion.div
                                style={{ width: lineWidth }}
                                className="h-full bg-brand-gold shadow-[0_0_20px_rgba(245,138,7,0.9),0_0_5px_rgba(245,138,7,1)] origin-left"
                            />
                        </div>

                        {nodePositions.map((pos, idx) => {
                            const relativeThreshold = (pos - lineStartX) / lineTotalLength;
                            return (
                                <ProgressNode
                                    key={idx}
                                    index={idx}
                                    nodeX={pos}
                                    scrollYProgress={scrollYProgress}
                                    threshold={relativeThreshold}
                                />
                            );
                        })}

                        <div style={{ width: paddingStart }} className="shrink-0 transition-all duration-300" />

                        <div className="flex items-center relative z-20">
                            {steps.map((step, index) => {
                                const cardStartX = paddingStart + (index * currentBlockWidth) + (gapWidth / 2);
                                const relativeThreshold = (cardStartX - lineStartX) / lineTotalLength;

                                return (
                                    <div
                                        key={step.id}
                                        className="relative flex items-center justify-center shrink-0"
                                        style={{ width: currentBlockWidth }}
                                    >
                                        <div style={{ width: cardWidth }}>
                                            <SpotlightCard
                                                step={step}
                                                scrollYProgress={scrollYProgress}
                                                threshold={relativeThreshold}
                                                dynamicWidth={cardWidth}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ width: ctaWidth }} className="shrink-0 flex flex-col items-center justify-center text-center relative z-20">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full" />
                                <div className="relative w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,138,7,0.4)] mb-12">
                                    <Zap className="w-12 h-12 text-black fill-black" />
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6 md:mb-8">Vamos<br />Começar?</h3>
                            <GoldButton whatsappMessage="Olá! Vi sua Metodologia e quero iniciar um projeto.">
                                Solicitar Projeto
                            </GoldButton>
                        </div>

                        <div style={{ width: paddingStart / 4 }} className="shrink-0" />

                    </motion.div>
                </div>
            </section>
        </section>
    );
};

// ========================================
// MAIN EXPORT — routes to mobile/desktop
// ========================================
const ProcessSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 1024 : false
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return isMobile ? <ProcessSectionMobile /> : <ProcessSectionDesktop />;
};

export default ProcessSection;
