import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const TextScrollSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const elements = sectionRef.current.querySelectorAll('.textoAnimado');
        const splitInstances: SplitType[] = [];
        const anims: gsap.core.Tween[] = [];

        elements.forEach((char) => {
            const text = new SplitType(char as HTMLElement, { types: 'chars' });
            splitInstances.push(text);

            if (text.chars) {
                const anim = gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: char,
                        start: 'top 90%',
                        end: 'top 60%',
                        scrub: 1,
                    },
                    y: -40,
                    opacity: 0,
                    stagger: 0.1,
                });
                anims.push(anim);
            }
        });

        return () => {
            anims.forEach(a => a.kill());
            splitInstances.forEach(i => i.revert());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="flex flex-col items-center justify-center text-center bg-[#050505] px-6 py-24 md:py-32"
        >
            <h2 className="textoAnimado text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-4 leading-tight">
                O Próximo Nível
            </h2>
            <p className="textoAnimado text-lg md:text-xl font-body text-[#a1a1aa] max-w-xl">
                A jornada para uma presença digital premium e focada em conversão começou.
            </p>
        </section>
    );
};

export default TextScrollSection;
