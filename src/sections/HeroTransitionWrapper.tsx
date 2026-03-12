import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import HeroSection from './HeroSection';

gsap.registerPlugin(ScrollTrigger);

// Removendo Props de controle externo, voltando à independência
const HeroTransitionWrapper: React.FC = () => {
    const outerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    // ── 2. ScrollTrigger e Parallax (Independente do Loading inicial) ──
    useEffect(() => {
        if (!outerRef.current || !stickyRef.current || !containerRef.current || !textRef.current || !heroContentRef.current) return;

        // ── Setup dos painéis e split-type ──
        const panels = gsap.utils.toArray<HTMLElement>('.transition-panel', containerRef.current);
        const titleEl = textRef.current.querySelector<HTMLElement>('.reveal-title');
        const subEl = textRef.current.querySelector<HTMLElement>('.reveal-sub');
        const splitTitle = titleEl ? new SplitType(titleEl, { types: 'chars' }) : null;
        const splitSub = subEl ? new SplitType(subEl, { types: 'words' }) : null;

        gsap.set(panels, { yPercent: 100 });
        if (splitTitle?.chars) gsap.set(splitTitle.chars, { opacity: 0, y: -40 });
        if (splitSub?.words) gsap.set(splitSub.words, { opacity: 0, y: -40 });

        // ── ScrollTrigger SEM pin — o sticky faz o "pin" via CSS ──
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: outerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        });

        // Fase 1: barras sobem (zíper fecha)
        tl.to(panels, {
            yPercent: 0,
            ease: 'power2.inOut',
            stagger: 0.05,
            duration: 1,
        });

        // Fase 2: texto aparece caractere por caractere
        if (splitTitle?.chars) {
            tl.to(splitTitle.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.03,
                duration: 0.5,
                ease: 'power3.out',
            }, '>0.1');
        }
        if (splitSub?.words) {
            tl.to(splitSub.words, {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: 'power2.out',
            }, '<0.3');
        }

        // Fase 3: Indicador de scroll surge
        const scrollInd = textRef.current.querySelector<HTMLElement>('.scroll-indicator-wrap');
        if (scrollInd) {
            gsap.set(scrollInd, { opacity: 0, y: 20 });
            tl.to(scrollInd, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
            }, '<0.4');
        }

        return () => {
            tl.kill();
            splitTitle?.revert();
            splitSub?.revert();
        };
    }, []);

    const numPanels = 10;
    const panels = Array.from({ length: numPanels }).map((_, i) => (
        <div
            key={i}
            className="transition-panel absolute top-0 h-full"
            style={{
                backgroundColor: i % 2 === 0 ? '#050505' : '#000000',
                left: `${(i / numPanels) * 100}%`,
                width: `${(100 / numPanels) + 0.5}%`,
                willChange: 'transform',
            }}
        />
    ));

    return (
        // outerRef: container alto que cria o "espaço de scroll" para a animação
        <div ref={outerRef} style={{ height: '300vh', position: 'relative', pointerEvents: 'none' }}>
            {/* stickyRef: fica grudado no topo enquanto o scroll rola dentro do outerRef */}
            <div
                ref={stickyRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                }}
            >
                {/* HERO com animação de scale */}
                <div
                    ref={heroContentRef}
                    className="absolute inset-0 w-full h-full z-0"
                    style={{ transformOrigin: 'center center', pointerEvents: 'auto' }}
                >
                    <HeroSection />
                </div>

                {/* Painéis zíper */}
                <div ref={containerRef} className="absolute inset-0 z-10 w-full h-full" style={{ pointerEvents: 'none' }}>
                    {panels}
                </div>

                {/* Texto centralizado e Indicador de Scroll */}
                <div
                    ref={textRef}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
                >
                    <div className="flex flex-col items-center justify-center mb-16">
                        <h2 className="reveal-title text-4xl md:text-5xl lg:text-7xl font-display font-black text-white text-center mb-4 leading-tight">
                            O Próximo Nível
                        </h2>
                        <p className="reveal-sub text-lg md:text-xl font-body text-[#a1a1aa] text-center max-w-xl">
                            A jornada para uma presença digital premium e focada em conversão começou.
                        </p>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="scroll-indicator-wrap absolute bottom-12 flex flex-col items-center gap-3">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-body text-brand-gold/80">
                            Role para Descobrir
                        </span>
                        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-brand-gold animate-scroll-drop origin-top"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroTransitionWrapper;
