import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import GoldButton, { CyberButton } from '../ui/GoldButton';
import Container from '../ui/Container';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

const useVideoBase = () => {
    const [base, setBase] = useState('desktop');
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 768) setBase('mobile');
            else if (w < 1024) setBase('tablet');
            else setBase('desktop');
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return base;
};

const HeroSection = () => {
    const base = useVideoBase();
    const lenis = useLenis(() => {}, []);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sourceRef = useRef<HTMLSourceElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const play = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.play().catch(() => {/* silencioso */ });
    }, []);

    // Troca a source sem recriar o elemento <video>
    useEffect(() => {
        const v = videoRef.current;
        const src = sourceRef.current;
        if (!v || !src) return;
        src.src = `/videos/${base}.mp4`;
        v.load();
        play();
    }, [base, play]);

    // Força play na montagem e em qualquer toque (para garantir autoplay no iOS/Safari)
    useEffect(() => {
        play();
        const retry = () => play();
        const onVisibility = () => {
            if (document.visibilityState === 'visible') play();
        };
        const t1 = setTimeout(play, 300);
        const t2 = setTimeout(play, 4600);
        const t3 = setTimeout(play, 7000);
        document.addEventListener('touchstart', retry, { passive: true });
        document.addEventListener('touchend', retry, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
            document.removeEventListener('touchstart', retry);
            document.removeEventListener('touchend', retry);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [play, base]);

    useLayoutEffect(() => {
        // Checa se o preloader foi pulado olhando diretamente o DOM (imune ao StrictMode double-mount)
        const appContainer = document.querySelector('.app-container');
        const preloaderWasSkipped = appContainer?.classList.contains('loaded') && appContainer?.classList.contains('effects-cleared');

        const ctx = gsap.context(() => {
            if (preloaderWasSkipped) {
                // Sem animação: revela tudo instantaneamente e esconde a linha do scanner
                gsap.set('.gsap-scan-content', { clipPath: 'none', opacity: 1 });
                gsap.set('.gsap-scan-line', { opacity: 0, scaleX: 0 });
                return;
            }

            // ── Primeira visita: animação completa do Scanner sincronizada com o Preloader ──
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });

            // Set estados iniciais pelo GSAP pra garantir que esconda tudo AGORA na montagem
            gsap.set('.gsap-scan-content', {
                clipPath: "inset(0% 0% 100% 0%)",
                opacity: 0
            });
            gsap.set('.gsap-scan-line', {
                scaleX: 0,
                opacity: 0,
                top: "-10px"
            });

            // Seq: Aparece conteúdo subjacente invisivel primeiro
            tl.to('.gsap-scan-content', { opacity: 1, duration: 0.1 });

            // 1. A linha do scanner surge crescendo no eixo X (horizontalmente)
            tl.to(".gsap-scan-line", {
                duration: 0.5,
                scaleX: 1,
                opacity: 1
            })

                // 2. A linha desce até ao fundo revelando os elementos
                .to(".gsap-scan-line", {
                    duration: 2,
                    top: "calc(100% + 10px)",
                    ease: "power2.inOut"
                })

                // Animação do clip-path no bloco inteiro sincronizada (<) com a linha
                .to(".gsap-scan-content", {
                    duration: 2,
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "power2.inOut"
                }, "<")

                // 3. A linha do scanner encolhe e desaparece no final
                .to(".gsap-scan-line", {
                    duration: 0.4,
                    scaleX: 0,
                    opacity: 0,
                    ease: "power2.in"
                });

            // O GSAP subiu atrás do PRELOADER. Vamos checar até a classe .loaded existir
            const checkLoaded = setInterval(() => {
                const appContainer = document.querySelector('.app-container');
                if (appContainer && appContainer.classList.contains('loaded')) {
                    clearInterval(checkLoaded);
                    // A cortina preta cai em 2.5s (cubic-bezier). 
                    // No ms 2000 ela já revelou o topo, então a linha cresce (0.5s).
                    // No ms 2500 a cortina some e a linha começa a descer (2s),
                    // separando a queda do preloader do efeito visual de scan, para que o usuário possa apreciar.
                    setTimeout(() => {
                        tl.play();
                    }, 2000);
                }
            }, 50);

            // Cleanup do observador caso a page demonte
            return () => clearInterval(checkLoaded);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            className="hero-emergence-wrapper h-[100svh] flex flex-col justify-center items-center relative overflow-hidden py-4"
            ref={containerRef}
        >
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    {...({ fetchpriority: 'high' } as any)}
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    className="w-full h-full object-cover"
                    style={{ pointerEvents: 'none' }}
                >
                    <source ref={sourceRef} src={`/videos/${base}.mp4`} type="video/mp4" />
                </video>
            </div>

            {/* Fade para legibilidade do texto no mobile */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] z-[1] bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 gap-12">
                    <div className="col-span-1 flex flex-col items-center">

                        {/* Único container do Scanner para orquestrar tudo */}
                        <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative mb-[5px]">

                            {/* A linha que vai varrer toda a área de cima a baixo */}
                            <div className="gsap-scan-line absolute -left-[5%] w-[110%] h-[4px] bg-[#F58A07] rounded-[4px] z-10 pointer-events-none origin-center" style={{ boxShadow: '0 0 15px #F58A07, 0 0 30px rgba(245, 138, 7, 0.5)' }}></div>

                            {/* O conteúdo que será revelado gradualmente */}
                            <div className="gsap-scan-content w-full flex flex-col items-center">

                                {/* Badge */}
                                <div className="mb-4 md:mb-6">
                                    <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] font-body text-brand-gold border border-brand-gold/20 bg-brand-gold/5">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-brand-gold" />
                                        Agência de Design Digital
                                    </span>
                                </div>

                                {/* H1 */}
                                <h1 className="w-full mt-2 mb-4 md:mt-4 md:mb-8 text-center text-3xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.1] md:leading-[1.05] tracking-tight text-white px-2">
                                    Design Digital para Empresas que Querem{' '}
                                    <span className="text-brand-gold">
                                        Crescer Online
                                    </span>
                                </h1>

                                {/* H2 Subtitle */}
                                <p className="mt-2 mb-6 md:mt-6 md:mb-8 text-center text-sm md:text-lg font-body text-brand-gray leading-relaxed max-w-lg mx-auto px-4">
                                    Combinamos identidade visual, gestão de redes sociais, landing pages e motion design para construir marcas digitais que se destacam e convertem.
                                </p>

                                {/* Buttons */}
                                <div className="w-full max-w-[280px] sm:max-w-none flex justify-center mt-2 md:mt-10 px-4">
                                    <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 md:gap-5">
                                        <GoldButton className="w-full sm:w-auto text-[13px] md:text-base py-2.5 md:py-3" whatsappMessage="Olá! Vim pelo site da WebCrown e gostaria de solicitar um orçamento.">
                                            Solicitar Orçamento
                                        </GoldButton>
                                        <CyberButton className="w-full sm:w-auto text-[13px] md:text-base py-2.5 md:py-3" onClick={() => {
                                            const target = document.getElementById('projetos');
                                            if (lenis && target) {
                                                lenis.scrollTo(target, { duration: 1.2 });
                                            } else {
                                                target?.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}>
                                            Ver Portfólio
                                        </CyberButton>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </Container>

            {/* --- Marquee Overlay na Base da Hero --- */}
            <div className="marquee-container" aria-hidden="true">
                <div className="marquee-content">
                    {/* Metade 1 */}
                    <span>WEBCROWN</span><span>•</span>
                    <span>WEBCROWN</span><span>•</span>
                    <span>WEBCROWN</span><span>•</span>
                    <span>WEBCROWN</span><span>•</span>

                    {/* Metade 2 (Cópia exata da Metade 1 para loop perfeito) */}
                    <span>WEBCROWN</span><span>•</span>
                    <span>WEBCROWN</span><span>•</span>
                    <span>WEBCROWN</span><span>•</span>
                    <span>WEBCROWN</span><span>•</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
