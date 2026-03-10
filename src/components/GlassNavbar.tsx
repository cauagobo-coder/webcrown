import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Cog, HelpCircle, LucideIcon } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';

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
    const [activeTab, setActiveTab] = useState<string>(navItems[0].name);

    const sectionsRef = useRef<(HTMLElement | null)[]>([]);

    // Função lógica otimizada para definir a seção ativa
    const calculateActiveSection = () => {
        const viewportHeight = window.innerHeight;
        // Trigger mais cedo: topo 30% (0.3) da tela
        // Isso faz a troca acontecer assim que a nova seção ocupa o terço superior
        const triggerPoint = viewportHeight * 0.3;

        // Se não tivermos elementos cacheados ou se redimensionou, recarrega
        if (sectionsRef.current.length === 0 || sectionsRef.current.length !== navItems.length) {
            sectionsRef.current = navItems.map(item => document.querySelector(item.url) as HTMLElement | null);
        }

        // Inicia como null para manter o estado anterior se nada for encontrado
        let currentSection = null;

        sectionsRef.current.forEach((section, index) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                // Verifica se a seção cruza a linha de 30% do topo
                if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                    currentSection = navItems[index].name;
                }
            }
        });

        // Só atualiza se encontrar uma seção válida
        if (currentSection) {
            setActiveTab(currentSection);
        }
    };

    // Scroll Spy Logic — uses Lenis callback on desktop, native scroll listener on mobile
    const lastCalcRef = useRef<number>(0);

    // Desktop: Lenis callback (this is a no-op when Lenis is not mounted)
    useLenis(() => {
        const now = Date.now();
        if (now - lastCalcRef.current < 100) return;
        lastCalcRef.current = now;
        calculateActiveSection();
    }, []);

    // Mobile fallback: native scroll listener (when Lenis is disabled)
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

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Executa verificação inicial ao montar e recarrega cache no resize
    useEffect(() => {
        // Popula cache inicial
        sectionsRef.current = navItems.map(item => document.querySelector(item.url) as HTMLElement | null);

        calculateActiveSection();

        // Debounced resize — batches rapid resize events
        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Recache sections (layout may have changed)
                sectionsRef.current = navItems.map(item => document.querySelector(item.url) as HTMLElement | null);
                calculateActiveSection();
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, [isLoaded]); // Dependência de isLoaded ajuda a recalcular se o layout mudar pós-load

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
        e.preventDefault();
        setActiveTab(name);
        const element = document.querySelector(url);
        if (element) {
            // Smooth scroll via Lenis
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4"
        >
            <div className="flex items-center gap-0.5 md:gap-1 p-1 md:p-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
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
