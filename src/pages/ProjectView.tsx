import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { ReactLenis } from '@studio-freight/react-lenis';
import PortfolioNextTarget from '../ui/PortfolioNextTarget';

const ProjectView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // Lightbox State
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Reset scroll to top when changing projects
    useEffect(() => {
        // Use a small timeout to let React Router and Lenis finish rendering the new route
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 50);
        return () => clearTimeout(timer);
    }, [id]);

    // Bloquear scroll do body quando o lightbox estiver aberto
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImage]);

    // Validation to ensure we only load standard projects
    const validProjects = ['barbearia', 'dentista', 'personal'];
    if (!id || !validProjects.includes(id)) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center flex-col gap-4 text-white p-4 text-center">
                <h1 className="text-3xl font-display font-bold">Projeto não encontrado</h1>
                <button
                    onClick={() => navigate('/#projetos')}
                    className="px-6 py-3 rounded-full bg-brand-gold text-black font-semibold font-body uppercase text-sm"
                >
                    Voltar aos projetos
                </button>
            </div>
        );
    }

    // Number of images per project
    const imageCount = 6;
    const images = Array.from({ length: imageCount }).map((_, i) => `/portfolio/${id}/${i + 1}.png`);

    return (
        <ReactLenis root key={id}>
            <div className="min-h-screen bg-[#050505] flex flex-col items-center">
                {/* Fixed Top Header */}
                <header className="fixed top-0 left-0 w-full z-40 p-4 md:p-6 pointer-events-none flex justify-start">
                    <button
                        onClick={() => navigate('/#projetos', { replace: true })}
                        className="pointer-events-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white font-body text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)] group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Voltar</span>
                    </button>
                </header>

                {/* Grid Images - Instagram Feed Style */}
                <main className="w-full max-w-[1200px] mx-auto mt-24 md:mt-28 lg:mt-32 mb-20 px-2 sm:px-4 md:px-8">
                    <div className="mb-10 lg:mb-16 text-center md:text-left md:px-4">
                        <span className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-3 block">
                            Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-white capitalize">
                            Mídias - {id === 'personal' ? 'Personal Trainer' : id}
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-6">
                        {images.map((src, index) => (
                            <div 
                                key={index} 
                                className="relative aspect-[4/5] overflow-hidden rounded-sm sm:rounded-md md:rounded-xl group border border-white/5 bg-[#0a0a0a] shadow-lg cursor-pointer"
                                onClick={() => setSelectedImage(src)}
                            >
                                <img
                                    src={src}
                                    alt={`Projeto ${id} - Apresentação ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading={index < 6 ? "eager" : "lazy"}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-body text-xs md:text-sm tracking-widest uppercase drop-shadow-lg">Ver Maior</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Next Project Component inside Footer Area */}
                <footer className="w-full pb-20">
                    <PortfolioNextTarget currentId={id} />
                </footer>

                {/* Lightbox Overlay */}
                <div 
                    className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-opacity duration-300 ${selectedImage ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Botão Fechar */}
                    <button 
                        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-gold hover:text-black transition-all duration-300 backdrop-blur-md z-[110]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Imagem Ampliada */}
                    {selectedImage && (
                        <div 
                            className="relative w-full h-full p-4 md:p-12 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o overlay
                        >
                            <img 
                                src={selectedImage} 
                                alt="Visualização Ampliada" 
                                className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-fade-in-up"
                                style={{
                                    animation: 'lightbox-enter 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards'
                                }}
                            />
                        </div>
                    )}
                </div>

                <style>{`
                    @keyframes lightbox-enter {
                        from {
                            opacity: 0;
                            transform: scale(0.95) translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1) translateY(0);
                        }
                    }
                `}</style>
            </div>
        </ReactLenis>
    );
};

export default ProjectView;
