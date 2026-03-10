import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import HeroSection from './HeroSection';

gsap.registerPlugin(ScrollTrigger);

const HeroTransitionWrapper: React.FC = () => {
    const outerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!outerRef.current || !stickyRef.current || !containerRef.current || !textRef.current || !heroContentRef.current) return;

        // ── Animação de entrada (scale + brightness) na hero interna ──
        gsap.set(heroContentRef.current, { scale: 1.3, filter: 'brightness(0)' });
        gsap.to(heroContentRef.current, {
            scale: 1,
            filter: 'brightness(1)',
            duration: 1.8,
            delay: 1.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.set(heroContentRef.current, { clearProps: 'transform,filter' });
            }
        });

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

                {/* Texto centralizado */}
                <div
                    ref={textRef}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
                >
                    <h2 className="reveal-title text-4xl md:text-5xl lg:text-7xl font-display font-black text-white text-center mb-4 leading-tight">
                        O Próximo Nível
                    </h2>
                    <p className="reveal-sub text-lg md:text-xl font-body text-[#a1a1aa] text-center max-w-xl">
                        A jornada para uma presença digital premium e focada em conversão começou.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroTransitionWrapper;
