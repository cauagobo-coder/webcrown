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
    const isDirectNavigation = Boolean(location.hash);

    // If navigating directly to a section (like returning from Project View), skip preloader
    const [isLoaded, setIsLoaded] = useState<boolean>(isDirectNavigation);
    const [animationsDone, setAnimationsDone] = useState<boolean>(isDirectNavigation);
    const [isMobile, setIsMobile] = useState(isMobileOrTablet);

    useEffect(() => {
        // Prevent browser from trying to guess the scroll position before GSAP pins are ready
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        
        // Only scroll to top if we aren't trying to go to a hash
        if (!isDirectNavigation) {
            window.scrollTo(0, 0);
        }
        
        const onResize = () => setIsMobile(isMobileOrTablet());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [isDirectNavigation]);

    useEffect(() => {
        if (isDirectNavigation) {
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
    }, [isDirectNavigation]);

    // Check for hash and scroll to it ONLY after all GSAP layouts and pins are fully refreshed
    useEffect(() => {
        if (animationsDone && location.hash) {
            const timeout = setTimeout(() => {
                const id = location.hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                    // Clean the URL immediately so that a subsequent F5 loads the clean Home page
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            }, 250); // Given ScrollTrigger.refresh is at 100ms after animationsDone, 250ms is safe
            return () => clearTimeout(timeout);
        }
    }, [location.hash, animationsDone]);

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
