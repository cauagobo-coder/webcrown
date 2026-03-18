import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Cog, HelpCircle, LucideIcon } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';
import { useNavigate, useLocation } from 'react-router-dom';

// 1. Definição da Interface para os itens de navegação
interface NavItem {
    name: string;
    url: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { name: 'Início', url: '#hero', icon: Home },
    { name: 'Sobre', url: '#sobre', icon: User },
    { name: 'Serviços', url: '#servicos', icon: Briefcase },
    { name: 'Projetos', url: '#projetos', icon: FolderOpen },
    { name: 'Processo', url: '#processo', icon: Cog },
    { name: 'FAQ', url: '#faq', icon: HelpCircle },
];

const GlassNavbar: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
    const [activeTab, setActiveTab] = useState<string>(''); // Começa vazio para não animar no load

    const sectionsRef = useRef<(HTMLElement | null)[]>([]);

    // Helper para tentar recarregar itens nulos do DOM
    const tryRecacheSections = (): boolean => {
        let hasChanges = false;
        
        // Inicializa o array se for a primeira vez
        if (sectionsRef.current.length !== navItems.length) {
            sectionsRef.current = new Array(navItems.length).fill(null);
            hasChanges = true;
        }

        // Tenta preencher os buracos (itens que ainda não carregaram pelo Lazy)
        navItems.forEach((item, index) => {
            if (!sectionsRef.current[index]) {
                const el = document.querySelector(item.url) as HTMLElement | null;
                if (el) {
                    sectionsRef.current[index] = el;
                    hasChanges = true;
                }
            }
        });
        
        return hasChanges;
    };

    // Função lógica otimizada para definir a seção ativa (Universal)
    const calculateActiveSection = () => {
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.3;

        tryRecacheSections();

        let currentSection = null;

        // Corre de trás pra frente para pegar fisicamente a seção atual sendo lida
        for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
            const section = sectionsRef.current[i];
            if (section) {
                const rect = section.getBoundingClientRect();
                // A seção engolfa o ponto de trigger?
                if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                    currentSection = navItems[i].name;
                    break;
                }
            }
        }

        // Se encontrou uma seção atual e ela é diferente da ativa, muda o estado.
        // Se ainda não tiver tab ativa (load), obriga a ligar na primeira se não achar nada
        if (currentSection) {
            setActiveTab(prev => prev !== currentSection ? currentSection : prev);
        } else {
            setActiveTab(prev => prev === '' ? navItems[0].name : prev);
        }
    };

    const lastCalcRef = useRef<number>(0);

    // Desktop: Lenis callback (this is a no-op when Lenis is disabled/mobile)
    useLenis(() => {
        const now = Date.now();
        if (now - lastCalcRef.current < 100) return;
        lastCalcRef.current = now;
        calculateActiveSection();
    }, []);

    // Mobile fallback: native scroll listener para quando o Lenis estiver desligado
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    calculateActiveSection();
                    ticking = false;
                });
            }
        };

        // Roda a checagem no mount imediatamente apenas para garantir
        calculateActiveSection();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoaded]);

    // Lida apenas com recarregamentos pesados de estrutura (Resize de Tela)
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Força um rescan destrutivo
                sectionsRef.current = [];
                tryRecacheSections();
                calculateActiveSection();
            }, 300);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, [isLoaded]);

    // Instância do Lenis para rolagem sincronizada com a engine
    const lenis = useLenis(() => {}, []);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
        e.preventDefault();
        setActiveTab(name);

        // Se não estamos na Home, precisamos navegar para a Home e passar o Hash desejado
        if (location.pathname !== '/') {
            navigate('/' + url);
            return;
        }

        // Home.tsx NÃO monta o ReactLenis no Mobile.
        // Se voltarmos do ProjectView (que monta Lenis no mobile), o useLenis pode retornar uma instância morta pendente.
        // Para segurança absoluta: no mobile, SEMPRE ignoramos o lenis e usamos o scroll nativo.
        const isLenisActive = window.innerWidth >= 1024 && lenis;

        // Fluxo normal estando na Home:
        // "Início" deve levar ao topo absoluto da página (a Hero fica dentro de um wrapper de 300vh)
        if (url === '#hero') {
            if (isLenisActive) {
                lenis.scrollTo(0, { duration: 1.2 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        const element = document.querySelector(url);
        if (element) {
            if (isLenisActive) {
                lenis.scrollTo(element, { duration: 1.2 });
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav
            className={`fixed top-6 left-0 right-0 z-[99999] flex justify-center px-4 pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ isolation: 'isolate' }}
        >
            <div className="flex items-center gap-0.5 md:gap-1 p-1 md:p-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg pointer-events-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;

                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={(e) => handleNavClick(e, item.url, item.name)}
                            className={`
                relative cursor-pointer text-sm font-medium px-3 py-2 md:px-4 md:py-2.5 rounded-full 
                transition-colors duration-300 ease-in-out select-none flex items-center gap-2
                outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50
                ${isActive ? 'text-brand-gold' : 'text-white/60 hover:text-white/90'}
              `}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Icon size={18} />
                                <span className="hidden md:block">{item.name}</span>
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-brand-gold/10 rounded-full -z-0"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-gold rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-brand-gold/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-brand-gold/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-brand-gold/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
};

export default GlassNavbar;
