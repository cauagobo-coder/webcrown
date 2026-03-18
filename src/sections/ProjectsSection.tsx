import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../ui/Container';

interface FolderItem {
    name: string;
    logoImage: string;
    previewImage: string;
    link?: string;
}

interface FolderProject {
    label: string;
    items: FolderItem[];
}

const folders: FolderProject[] = [
    {
        label: 'Landing Pages',
        items: [
            { name: 'Lúmine Dental', logoImage: '/portfolio/paginas/lumine-thumb.webp', previewImage: '/portfolio/paginas/lumine-thumb.webp', link: '/portfolio/lumine' },
            { name: 'Fitnez (Academia)', logoImage: '/portfolio/paginas/fitnez-thumb.webp', previewImage: '/portfolio/paginas/fitnez-thumb.webp', link: '/portfolio/fitnez' },
            { name: 'Royal Pet', logoImage: '/portfolio/paginas/royal-thumb.webp', previewImage: '/portfolio/paginas/royal-thumb.webp', link: '/portfolio/royal' },
        ],
    },
    {
        label: 'Social Media',
        items: [
            { name: 'Barbearia', logoImage: '/portfolio/barbearia/1.png', previewImage: '/portfolio/barbearia/2.png', link: '/portfolio/barbearia' },
            { name: 'Odontologia', logoImage: '/portfolio/dentista/1.png', previewImage: '/portfolio/dentista/2.png', link: '/portfolio/dentista' },
            { name: 'Personal Trainer', logoImage: '/portfolio/personal/1.png', previewImage: '/portfolio/personal/2.png', link: '/portfolio/personal' },
        ],
    },
];

// Componente da Pasta Individual
const Folder = ({ folder, index }: { folder: FolderProject; index: number }) => {
    const [isActive, setIsActive] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<{ name: string, image: string } | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && isActive) {
            setIsActive(false);
        }
    }, [isActive]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]);

    const handleFolderClick = () => {
        setIsActive(!isActive);
        if (!hasInteracted) setHasInteracted(true);
        // Refresh GSAP/ScrollTrigger heights for ProcessSection after folder animation
        setTimeout(() => ScrollTrigger.refresh(), 300);
        setTimeout(() => ScrollTrigger.refresh(), 600);
    };

    return (
        <div className={`folder-stage ${hoveredItem ? 'z-50' : 'z-10'} w-full md:w-auto flex flex-col items-center justify-center`}>
            {/* Monitor Preview Small (Formato 16:9 posicionado SOBRE as pastas) */}
            <AnimatePresence>
                {hoveredItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-8 md:mb-12 w-48 sm:w-64 md:w-72 aspect-[4/5] rounded-xl overflow-hidden border border-brand-gold/30 shadow-[0_10px_40px_-10px_rgba(245,138,7,0.4)] z-[100] bg-[#080808] pointer-events-none"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent z-10" />
                        <span className="absolute bottom-3 left-4 z-20 text-[11px] font-bold tracking-widest uppercase text-white drop-shadow-md">
                            Projeto: {hoveredItem.name}
                        </span>
                        <img src={hoveredItem.image} alt={hoveredItem.name} loading="lazy" decoding="async" className={`w-full h-full ${folder.label === 'Landing Pages' ? 'object-cover object-top' : 'object-cover'}`} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                ref={wrapperRef}
                className={`folder-wrapper cursor-pointer relative ${isActive ? 'active' : ''}`}
                onClick={handleFolderClick}
            >
                {index === 0 && !hasInteracted && !isActive && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none animate-bounce">
                        <span className="bg-brand-gold text-[#080808] text-[10px] font-bold px-2 py-1 rounded-full mb-1 uppercase tracking-wider shadow-lg whitespace-nowrap">
                            Clique na Pasta
                        </span>
                        <MousePointer2 className="w-5 h-5 text-brand-gold drop-shadow-[0_0_8px_rgba(245,138,7,0.8)]" />
                    </div>
                )}

                {folder.items.map((item, i) => (
                    <div
                        key={i}
                        className="nav-item group cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (item.link && item.link !== '#') {
                                navigate(item.link);
                            } else {
                                setTimeout(() => {
                                    setIsActive(false);
                                    setTimeout(() => ScrollTrigger.refresh(), 300);
                                }, 500);
                            }
                        }}
                        onMouseEnter={() => setHoveredItem({ name: item.name, image: item.previewImage })}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <img
                            src={item.logoImage}
                            alt={`${item.name} Logo`}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full rounded-sm border border-white/5 ${folder.label === 'Landing Pages' ? 'object-cover object-top' : 'object-cover'}`}
                        />
                        {item.link && item.link !== '#' && (
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/60 px-2 py-1 rounded-md z-30 pointer-events-none">
                                Ver Portfólio
                            </span>
                        )}
                    </div>
                ))}

                <div className="folder-back"></div>
                <div className="paper"></div>
                <div className="folder-front"></div>
            </div>

            <p className="text-center mt-6 text-sm font-bold text-white uppercase tracking-widest leading-relaxed px-2 bg-white/5 py-2 rounded-xl backdrop-blur-md border border-white/10 w-full max-w-[180px]">
                {folder.label}
            </p>
        </div>
    );
};

const ProjectsSection = () => {
    return (
        <section id="projetos" className="py-32 relative bg-black/95">
            <Container className="relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-24"
                >
                    <span className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-4 block">
                        Portfólio Selecionado
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                        Design Visual <span className="text-brand-gold">de Alto Padrão</span>
                    </h2>
                    <p className="text-base md:text-lg max-w-2xl mx-auto text-neutral-400 font-body">
                        Explore o nível dos nossos materiais. Clique sobre as pastas para inspecionar cada apresentação.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 mt-12 max-w-4xl mx-auto"
                >
                    {folders.map((folder, index) => (
                        <Folder key={index} folder={folder} index={index} />
                    ))}
                </motion.div>

            </Container>
        </section>
    );
};

export default ProjectsSection;
