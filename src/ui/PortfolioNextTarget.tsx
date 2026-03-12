import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from './Container';

// All available projects
const projectsData = [
    { id: 'barbearia', title: 'Barbearia', thumb: '/portfolio/barbearia/1.png' },
    { id: 'dentista', title: 'Clínica Odontológica', thumb: '/portfolio/dentista/1.png' },
    { id: 'personal', title: 'Personal Trainer', thumb: '/portfolio/personal/1.png' }
];

const PortfolioNextTarget = ({ currentId }: { currentId: string }) => {
    const navigate = useNavigate();

    // Filter out the current project to show the remaining as "Next"
    const nextProjects = projectsData.filter(p => p.id !== currentId);

    return (
        <section className="pt-24 pb-12 bg-[#050505]">
            <Container>
                <div className="flex flex-col items-center mb-12">
                    <h3 className="text-sm tracking-[0.2em] font-bold text-brand-gold uppercase font-body mb-2">Continue Explorando</h3>
                    <h2 className="text-3xl md:text-5xl font-display font-semibold text-white">Mais Projetos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {nextProjects.map(project => (
                        <div
                            key={project.id}
                            onClick={() => navigate(`/portfolio/${project.id}`)}
                            className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer block"
                        >
                            {/* Overlay focus shadow */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                            <img
                                src={project.thumb}
                                alt={project.title}
                                className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />

                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <div>
                                    <span className="text-brand-gold font-body text-xs md:text-sm tracking-wider uppercase block mb-1">
                                        Social Media
                                    </span>
                                    <h3 className="text-white font-display text-2xl md:text-3xl font-semibold">
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-black transition-all">
                                    <ArrowRight className="w-5 h-5 text-current group-hover:-rotate-45 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default PortfolioNextTarget;
