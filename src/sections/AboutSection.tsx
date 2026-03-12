import { motion } from 'framer-motion';
import { Clock, Award, Target, Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Container from '../ui/Container';

const highlights = [
    { icon: Award, label: '7+ anos combinados', description: 'Experiência sólida em design e estratégia digital' },
    { icon: Target, label: '50+ projetos entregues', description: 'Marcas transformadas em referência no digital' },
    { icon: Clock, label: 'Design + Estratégia', description: 'Não entregamos artes. Entregamos resultado' },
];

const AboutSection = () => {
    return (
        <section id="sobre" className="py-32 relative bg-black overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 w-full">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '200px' }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-6 text-center lg:text-left mx-auto lg:mx-0 w-full max-w-2xl lg:self-center"
                    >
                        <span className="text-sm font-bold tracking-widest uppercase mb-4 block font-body text-brand-gold">
                            <Star className="w-4 h-4 inline-block mr-2 -mt-1 text-brand-gold fill-brand-gold" />
                            Sobre Nós
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            Quem está por trás{' '}
                            <br />
                            <span className="text-brand-gold">
                                da WebCrown
                            </span>
                        </h2>

                        <div className="space-y-6 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-body text-neutral-400">
                            <p>
                                A WebCrown é uma agência de design e marketing digital fundada por Felix e Cauã, dois especialistas em criação visual e estratégia digital com mais de 7 anos de experiência combinada no mercado.
                            </p>
                            <p>
                                Nossa missão é simples: transformar empresas comuns em marcas digitais reconhecidas, com design profissional, posicionamento estratégico e conteúdo que gera resultado.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Cards */}
                    <div className="lg:col-span-5 lg:col-start-8 space-y-4 flex flex-col items-center w-full lg:block lg:self-center">
                        {highlights.map((item, index) => (
                            <GlassCard key={item.label} delay={index * 0.15} className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-5 md:p-6 text-center md:text-left w-full max-w-[260px] md:max-w-none lg:mx-0">
                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.label}</h3>
                                    <p className="text-xs md:text-sm text-zinc-400">{item.description}</p>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default AboutSection;
