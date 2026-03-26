import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FoundersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLHeadingElement>(null);

    // An array to keep refs of founder images and reveal text
    const founderImgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const revealTextRefs = useRef<(HTMLElement | null)[]>([]);

    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth < 1024
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {

        const section = sectionRef.current;
        const textContainer = textContainerRef.current;

        if (!section || !textContainer) return;

        const ctx = gsap.context(() => {

            // Fix the starting states for both components
            gsap.set(textContainer, { scale: 1 });
            gsap.set(cardsContainerRef.current, { opacity: 0, scale: 0.95 });
            gsap.set(founderImgRefs.current, {
                scale: 1.2,
                filter: "grayscale(100%) brightness(0.5)"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=600%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // O "D" principal fica matematicamente alinhado a 52% da largura total da palavra FUNDADORES.
            // Hardcodar "52% 50%" garante que damos zoom perfeitamente na haste branca sólida do D,
            // SEM usar <span> no HTML (o que causa uma fissura de subpixel/'corte' quando o WebGL dá extreme-scale).
            gsap.set(textContainer, { transformOrigin: "52% 50%" });

            // Cenario Inicial Perfeito: Sem linhas cortando o texto. Fundo unicolor limpo, Cartões Ocultos.
            gsap.set(contentRef.current, { backgroundColor: "#a1a1aa" }); // zinc-400
            gsap.set(cardsContainerRef.current, { opacity: 0, scale: 0.95 });
            gsap.set(founderImgRefs.current, {
                scale: 1.2,
                filter: "grayscale(100%) brightness(0.5)"
            });


            // Oculta indicador de scroll
            tl.to(scrollIndicatorRef.current, {
                opacity: 0,
                y: 10,
                duration: 1,
                ease: "power1.inOut"
            }, 0);

            // Zoom agressivo exigente pelo usuário (Agora seguro porque a fonte inicial é menor: 7.5vw*130=975vw <= 3800px, dentro do limite WebGL)
            tl.to(textContainer, {
                scale: window.innerWidth < 1024 ? 130 : 60,
                duration: 10,
                ease: "expo.in"
            }, 0);

            // A Mágica de "Transição de Textura": Conforme o texto cresce,
            // a cor sólida de fundo vai suavemente escurecer para o Preto absoluto (#000000),
            // fundindo com a máscara de texto preta!
            tl.to(contentRef.current, {
                backgroundColor: "#000000",
                duration: 5,
                ease: "power2.inOut"
            }, 0);

            // Desabrochando os cartões
            tl.to(cardsContainerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 5,
                ease: "power2.out"
            }, 2.5);

            // No Mobile, as imagens podem não estar em founderImgRefs diretos da mesma maneira, mas com a ref conjunta unificada fucionará
            tl.to(founderImgRefs.current, {
                scale: 1,
                filter: "grayscale(0%) brightness(1)",
                duration: 9,
                ease: "power2.out"
            }, 2);

            tl.to(".mask-overlay", {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            }, 9.2);

            // ANIMAÇÃO EXTRA PARA O MOBILE:
            // Como as duas cartas são posicionadas lado a lado em 200vw no mobile, 
            // no final das revelações o usuário desliza horizontalmente de forma cinematográfica até o segundo fundador.
            if (window.innerWidth < 1024) {
                // Ao escalar o contêiner de 200vw para a esquerda, revelamos a segunda metade (Cauã)
                tl.to(cardsContainerRef.current, {
                    x: "-50%", // moves the container left by exactly half of 200vw = 100vw!
                    duration: 6,
                    ease: "power2.inOut"
                }, 10);
            }

            return () => {
                // Limpeza unificada
            };
        }, section); // Escopo do contexto

        return () => ctx.revert();
    }, [isMobile]);

    // Copy Content
    const founders = [
        {
            name: "Juan",
            lastName: "Félix",  // You can adjust these
            role: "Estrategista de Marca & Social Media",
            imgSrc: "/felix.webp",
            desc: "Felix transforma posicionamento online em autoridade magnética. Através do design visual de alto nível e social media, ele garante que sua marca não apenas seja vista, mas intensamente desejada."
        },
        {
            name: "Cauã",
            lastName: "Gobo", // You can adjust these
            role: "Web Designer & Arquiteto de Conversões",
            imgSrc: "/caua.webp",
            desc: "Especialista em design estratégico focado em Performance ABSOLUTA. Cauã constrói sites e landing pages ultrarrápidas que transformam tráfego frio em clientes fiéis, unindo estética premium a engenharia de conversão."
        }
    ];

    return (
        <section id="founders" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white" style={{ isolation: 'isolate' }}>
            {/* O CONTEÚDO REAL (Cinematic Portraits - Sem Cartões Clunky, Apenas a Arte Purista) */}
            <div ref={contentRef} className="absolute inset-0 block w-full h-full z-0 pointer-events-none overflow-hidden bg-zinc-400">
                
                {/* Mobile: 200vw para alinhar horizontalmente e arrastar com GSAP (xPercent: -50). PC: width padrão. Sem pointer-events atrapalhando scroll. */}
                <div ref={cardsContainerRef} className="relative min-w-[200%] md:min-w-0 md:w-full max-w-none md:max-w-[1300px] h-full flex flex-row items-center justify-start md:justify-center gap-0 md:gap-10 lg:gap-24 opacity-0 pointer-events-none pt-24 md:pt-0 pb-0 md:pb-0 mx-auto px-0 md:px-12">
                    {founders.map((f, index) => [
                        <div key={`card-${index}`} className="relative w-[100vw] md:w-1/2 shrink-0 flex flex-col items-center justify-start h-[95%] md:h-full max-h-[85vh] px-4 md:px-0">
                            
                            {/* Imagem Pessoal (Altura FIXA garante que o texto abaixo inicie na MESMA coordenada Y em todas as cartas) */}
                            <div className="relative w-full max-w-[320px] md:max-w-[500px] h-[45vh] md:h-[55vh] flex justify-center items-end overflow-hidden mb-4 shrink-0 mt-auto">
                                <img
                                    ref={el => founderImgRefs.current[index] = el}
                                    src={f.imgSrc}
                                    className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                                    style={{ filter: "grayscale(100%) brightness(0.5)" }}
                                    alt={f.name}
                                />
                                {/* Suave gradiente para fundir a base do pescoço ou roupa com o preto absoluto do fundo (bg-black do contentRef final) */}
                                <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 lg:h-56 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Textos Sincronizados Flutuantes e Elegantes */}
                            <div className="w-full flex shrink-0 flex-col items-center justify-start text-center relative z-10 -mt-6 md:-mt-10 lg:-mt-16 h-[220px] sm:h-[240px] md:h-[280px]">
                                <div className="overflow-hidden w-full mb-1 md:mb-2 lg:mb-3 pt-2 -mt-2 h-[3rem] md:h-[3.5rem] flex items-end justify-center">
                                    <p
                                        ref={el => revealTextRefs.current[index * 3] = el}
                                        className="text-brand-gold uppercase tracking-[0.25em] text-[10px] md:text-sm font-bold"
                                    >
                                        {f.role}
                                    </p>
                                </div>
                                <div className="overflow-hidden w-full mb-2 md:mb-4 pt-4 -mt-4 h-[3rem] sm:h-[4.5rem] md:h-[5rem] flex items-end justify-center">
                                    <h3
                                        ref={el => revealTextRefs.current[index * 3 + 1] = el}
                                        className="text-3xl sm:text-4xl lg:text-6xl max-w-full font-black uppercase leading-tight"
                                    >
                                        {f.name} {f.lastName}
                                    </h3>
                                </div>
                                <div className="overflow-hidden w-full pt-2 -mt-2 pb-2 -mb-2 px-2 h-[100px] md:h-[120px] flex items-start justify-center">
                                    <p
                                        ref={el => revealTextRefs.current[index * 3 + 2] = el}
                                        className="text-zinc-400 font-light text-xs sm:text-sm max-w-[340px] mx-auto leading-relaxed"
                                    >
                                        {f.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile: Indicador de Deslize removido daqui e colocado globalmente abaixo do map */}
                        </div>,
                        index === 0 && (
                            <div key="indicator" className="md:hidden relative w-0 h-full flex items-center justify-center shrink-0 z-50 pointer-events-none">
                                <div className="absolute top-[45%] -translate-y-[50%] flex flex-col items-center opacity-80 animate-bounce">
                                    <div className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                        <span>Deslize</span>
                                        <svg className="w-3 h-3 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )
                    ])}
                </div>
            </div>

            {/* Indicador Geral de Role para Baixo (Apenas Desktop) */}
            <div ref={scrollIndicatorRef} className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center pointer-events-none">
                <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold">Scroll para descobrir</span>
                <div className="w-5 h-8 border border-zinc-600 rounded-full flex justify-center p-[2px]">
                    <div className="w-1 h-2 bg-brand-gold rounded-full animate-bounce"></div>
                </div>
            </div>

            {/* A MÁSCARA GIGANTE */}
            <div
                className="mask-overlay absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                style={{
                    backgroundColor: 'black',
                    mixBlendMode: 'multiply',
                    willChange: 'opacity, transform',
                    transform: 'translateZ(0)'
                }}
            >
                <h2
                    ref={textContainerRef}
                    className="absolute text-[7.5vw] sm:text-[8vw] md:text-[6.5vw] xl:text-[6vw] font-black text-white whitespace-nowrap tracking-tighter leading-none"
                    style={{
                        fontFamily: '"Syne", sans-serif',
                        willChange: 'transform',
                        transform: 'translateZ(0)'
                    }}
                >
                    FUNDADORES
                </h2>
            </div>

            {/* Overlay Extra por Garantia para os itens não sumirem */}
            <div className="absolute inset-0 bg-transparent pointer-events-none z-30"></div>

        </section>
    );
};

export default FoundersSection;
