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
    
    // Identifica se a URL contém um "#" apontando ativamente para uma seção
    const hasHashTarget = Boolean(location.hash);

    // O preloader deve ser pulado SE for uma navegação direta de seção (#) OU se ele já visitou o site na sessão
    const skipPreloader = hasHashTarget || Boolean(hasVisited);

    const [isLoaded, setIsLoaded] = useState<boolean>(skipPreloader);
    const [animationsDone, setAnimationsDone] = useState<boolean>(skipPreloader);
    const [isMobile, setIsMobile] = useState(isMobileOrTablet);

    useEffect(() => {
        if (!hasVisited && typeof window !== 'undefined') {
            // Marca a sessão para que retornos (botão Back) de projetos ou links não re-ativem os timers visuais
            sessionStorage.setItem('webcrown_visited', 'true');
        }
    }, [hasVisited]);

    useEffect(() => {
        // Prevent browser from trying to guess the scroll position before GSAP pins are ready
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        
        // APENAS rola pro topo (0,0) se NÃO houver um HASH direcionador na URL.
        // O F5 (reload) na Home roda sem HASH, então cairá aqui e voltará ao Topo.
        if (!hasHashTarget) {
            window.scrollTo(0, 0);
        }
        
        const onResize = () => setIsMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [hasHashTarget]);

    useEffect(() => {
        if (skipPreloader) {
            document.body.classList.remove('loading-locked');
            setTimeout(() => { ScrollTrigger.refresh(); }, 150);
            return;
        }

        document.body.classList.add('loading-locked');
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => { document.body.classList.remove('loading-locked'); }, 2500);
        }, 3400);

        const cleanupTimer = setTimeout(() => {
            setAnimationsDone(true);
            setTimeout(() => { ScrollTrigger.refresh(); }, 100);
        }, 8800);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(cleanupTimer);
            document.body.classList.remove('loading-locked');
        };
    }, [skipPreloader]);

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
        <div className={`app-container ${isLoaded ? 'loaded' : ''} ${animationsDone ? 'effects-cleared' : ''}`}>
            <Preloader />
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
                    <ServicesSection enable3D={animationsDone} />
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
