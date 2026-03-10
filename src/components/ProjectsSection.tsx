import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Container from './Container';

interface FolderProject {
    label: string;
    items: {
        name: string;
        image: string;
    }[];
}

const folders: FolderProject[] = [
    {
        label: 'Identidades Visuais',
        items: [
            { name: 'Marca Premium', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop' },
            { name: 'Branding Tech', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop' },
            { name: 'Logo Design', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop' },
        ],
    },
    {
        label: 'Landing Pages',
        items: [
            { name: 'SaaS Page', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop' },
            { name: 'E-commerce', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop' },
            { name: 'Institucional', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
        ],
    },
];

// Componente da Pasta Individual
const Folder = ({ folder }: { folder: FolderProject }) => {
    const [isActive, setIsActive] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && isActive) {
            setIsActive(false);
        }
    }, [isActive]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div className="folder-stage">
            <div
                ref={wrapperRef}
                className={`folder-wrapper cursor-pointer ${isActive ? 'active' : ''}`}
                onClick={() => setIsActive(!isActive)}
            >
                {/* Imagens flutuantes */}
                {folder.items.map((item, i) => (
                    <a
                        key={i}
                        href="#"
                        className="nav-item group"
                        aria-label={item.name}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setTimeout(() => setIsActive(false), 500);
                        }}
                    >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="icon-label">{item.name}</span>
                    </a>
                ))}

                {/* Pasta back */}
                <div className="folder-back"></div>

                {/* Papel (recheio) */}
                <div className="paper"></div>

                {/* Pasta front (capa de vidro) */}
                <div className="folder-front"></div>
            </div>

            {/* Label da pasta */}
            <p className="text-center mt-6 text-sm font-medium text-zinc-400 uppercase tracking-widest">
                {folder.label}
            </p>
        </div>
    );
};

const ProjectsSection = () => {
    return (
        <section id="projetos" className="py-24 relative bg-black/95">
            <Container className="relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-4 block">
                        Portfólio Selecionado
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Projetos que <span className="text-brand-gold">geram impacto</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Explore nossos trabalhos. Clique nas pastas para descobrir.
                    </p>
                </motion.div>

                {/* 2 Pastas lado a lado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24"
                >
                    {folders.map((folder, index) => (
                        <Folder key={index} folder={folder} />
                    ))}
                </motion.div>

            </Container>
        </section>
    );
};

export default ProjectsSection;
