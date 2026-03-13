import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { CustomScrollbar } from '../ui/CustomScrollbar';
import Preloader from '../ui/Preloader';
import HeroTransitionWrapper from '../sections/HeroTransitionWrapper';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import GlassNavbar from '../layouts/GlassNavbar';

// Lazy-loaded: below-fold sections (not needed for initial render)
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const ProcessSection = lazy(() => import('../sections/ProcessSection'));
const DifferentialsSection = lazy(() => import('../sections/DifferentialsSection'));
const FAQSection = lazy(() => import('../sections/FAQSection'));
const FooterSection = lazy(() => import('../sections/FooterSection'));
const FinalCTASection = lazy(() => import('../sections/FinalCTASection'));

// Detect mobile/tablet
const isMobileOrTablet = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
    const [mobile, setMobile] = useState(isMobileOrTablet);

    useEffect(() => {
        const onResize = () => setMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    if (mobile) return <>{children}</>;
    return <ReactLenis root>{children}</ReactLenis>;
};

const LenisScrollSync = () => {
    useLenis(() => { ScrollTrigger.update(); });
    return null;
};

const Home = () => {
    const location = useLocation();
    
    // Checa se o usuário já passou pelo loading inicial nesta sessão para evitar quebras do React/GSAP ao usar o botão 'Voltar'
    const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem('webcrown_visited') : null;
    
    // Identifica se a URL contém um "#" apontando ativamente para uma seção (Navegação direta)
    const hasHashTarget = Boolean(location.hash);

    // Se estiver navegando via Hash, pulamos todas as animações imediatamente para o scroll acontecer.
    const skipAllAnimations = hasHashTarget;
    // Se ele já visitou, pulamos SÓ o preloader preto inicial, mas preservamos o Zoom e Scanner (isLoaded = true vai ocultar o <Preloader /> do CSS via fallback 'loaded')
    const isLoadedInitial = skipAllAnimations || Boolean(hasVisited);

    const [isLoaded, setIsLoaded] = useState<boolean>(skipAllAnimations);
    const [animationsDone, setAnimationsDone] = useState<boolean>(skipAllAnimations);
    const [isMobile, setIsMobile] = useState(isMobileOrTablet);

    // Ocultar o Preloader (SVG/Percent) fisicamente caso ele já tenha visitado.
    const showPreloader = !isLoadedInitial;

    useEffect(() => {
        if (!hasVisited && typeof window !== 'undefined') {
            // Marca a sessão para que retornos (botão Back) de projetos ou links não re-ativem os timers visuais do PRELOADER
            sessionStorage.setItem('webcrown_visited', 'true');
        }
    }, [hasVisited]);

    useEffect(() => {
        // Prevent browser from trying to guess the scroll position before GSAP pins are ready
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        
        // APENAS rola pro topo (0,0) se NÃO houver um HASH direcionador na URL.
        if (!hasHashTarget) {
            window.scrollTo(0, 0);
        }
        
        const onResize = () => setIsMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [hasHashTarget]);

    useEffect(() => {
        let loadTimer: ReturnType<typeof setTimeout>;
        let cleanupTimer: ReturnType<typeof setTimeout>;

        if (skipAllAnimations) {
            document.body.classList.remove('loading-locked');
            setTimeout(() => { ScrollTrigger.refresh(); }, 150);
            return;
        }

        if (isLoadedInitial) {
            // Ele já visitou o site. O <Preloader> (tela 0 a 100%) nem foi renderizado.
            // Aqui damos um pequeno delay de 50ms para que a tag `.loaded` seja inserida apenas *depois* do monte inicial.
            // Isso FORÇA o CSS a rodar a Transição de scale(1.1) para 1 e opacity 0 para 1, dando a animação de Zoom que o cliente ama.
            document.body.classList.remove('loading-locked');
            loadTimer = setTimeout(() => {
                setIsLoaded(true);
            }, 50);

            cleanupTimer = setTimeout(() => {
                setAnimationsDone(true);
                setTimeout(() => { ScrollTrigger.refresh(); }, 100);
            }, 3600);
        } else {
            // Primeira Visita: Roda os 3.4s do Preloader, e depois mais o longo tempo do Zoom e Scanner
            document.body.classList.add('loading-locked');
            loadTimer = setTimeout(() => {
                setIsLoaded(true);
                setTimeout(() => { document.body.classList.remove('loading-locked'); }, 2500);
            }, 3400);

            cleanupTimer = setTimeout(() => {
                setAnimationsDone(true);
                setTimeout(() => { ScrollTrigger.refresh(); }, 100);
            }, 8800);
        }

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(cleanupTimer);
            document.body.classList.remove('loading-locked');
        };
    }, [skipAllAnimations, isLoadedInitial]);

    // Check for hash and scroll to it ONLY after all GSAP layouts and pins are fully refreshed
    useEffect(() => {
        if (animationsDone && location.hash) {
            const timeout = setTimeout(() => {
                const id = location.hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                    // Clean the URL immediately without destroying React Router History State
                    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
                }
            }, 250); // Given ScrollTrigger.refresh is at 100ms after animationsDone, 250ms is safe
            return () => clearTimeout(timeout);
        }
    }, [location.hash, animationsDone]);

    // ── Prevenidor Universal de Bugs do GSAP ScrollTrigger ──
    // Observa o tamanho real do Body. Se botões exandirem divs ou abas abrirem, avisa o GSAP que a altura mudou!
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        const observer = new ResizeObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100); 
        });

        // Observa o container principal logo após todas as seções renderizarem
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            observer.observe(mainContent);
        } else {
            observer.observe(document.body);
        }

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={`app-container ${isLoaded ? 'loaded' : ''} ${animationsDone ? 'effects-cleared' : ''} ${!showPreloader ? 'fast-emergence' : ''}`}>
            {showPreloader && <Preloader />}
            <div id="canvas-portal-root" className="fixed inset-0 pointer-events-none z-[1]" />

            <ScrollWrapper>
                <LenisScrollSync />
                {!isMobile && (
                    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <CustomScrollbar />
                    </div>
                )}
                <GlassNavbar isLoaded={isLoaded} />
                <HeroTransitionWrapper />
                <div id="main-content" className="relative bg-black min-h-screen text-white font-sans">
                    <AboutSection />
                    <ServicesSection />
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                        <ProjectsSection />
                        <ProcessSection />
                        <DifferentialsSection />
                        <FAQSection />
                        <FinalCTASection />
                        <FooterSection />
                    </Suspense>
                </div>
            </ScrollWrapper>
        </div>
    );
};

export default Home;
