import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Share2, Zap, Palette, TrendingUp, ArrowRight } from 'lucide-react';
import { CyberButton } from '../ui/GoldButton';
import Container from '../ui/Container';

// Lazy loading the 3D scene (Zero initial bundle cost)
const Services3DScene = lazy(() => import('./Services3DScene'));

// --- DADOS ---
const services = [
    {
        id: 'service-1',
        icon: Share2,
        titlePrefix: 'Estratégia e',
        titleHighlight: 'Posicionamento',
        description: 'Chega de postar para as traças. Transformamos seu perfil em um ativo irresistível que atrai a audiência certa, gera autoridade instantânea e faz o cliente implorar pelo seu serviço.',
        features: ['Visão Estratégica Focada em Lucro', 'Autoridade Magnética no Nicho', 'Linha Editorial Implacável'],
        message: 'Olá! Estou no site da WebCrown e me interessei muito pelo serviço de *Estratégia e Posicionamento*. Gostaria de saber como vocês podem transformar meu perfil em um ativo irresistível.',
        position: 'left',
    },
    {
        id: 'service-2',
        icon: Palette,
        titlePrefix: 'Design de',
        titleHighlight: 'Conteúdo Premium',
        description: 'O visual que separa o líder do amador. Criamos artes de luxo que prendem a atenção visceralmente em 3 segundos e obrigam o cérebro do cliente a valorizar sua marca.',
        features: ['Design de Alto Padrão (Luxo)', 'Identidade que Esmaga Objeções', 'Criativos Desenhados para Escala'],
        message: 'Olá! Estou no site da WebCrown e fiquei impressionado com o *Design de Conteúdo Premium*. Preciso muito elevar o nível visual da minha marca.',
        position: 'right',
    },
    {
        id: 'service-3',
        icon: Zap,
        titlePrefix: 'Landing Pages de',
        titleHighlight: 'Alta Conversão',
        description: 'Páginas não devem apenas informar, devem VENDER. Construímos maquinários de conversão velozes com Copy focada em transformar tráfego frio em lucro previsível.',
        features: ['Copy Direct-Response Implacável', 'Design e UX de Alta Performance', 'Tempo de Carregamento Ultra-rápido'],
        message: 'Olá! Vim pelo site da WebCrown e quero encomendar uma *Landing Page de Alta Conversão*. Quero transformar meu tráfego em lucro real.',
        position: 'left',
    },
    {
        id: 'service-4',
        icon: TrendingUp,
        titlePrefix: 'Ecossistema e',
        titleHighlight: 'Funil de Vendas',
        description: 'Integramos suas redes e páginas em um sistema blindado que converte visitantes 24 horas por dia. A verdadeira máquina de captação que seus concorrentes não vão entender.',
        features: ['Integração Estratégica de Canais', 'Automação de Captura de Leads', 'Crescimento Exponencial'],
        message: 'Olá! Vim pelo site da WebCrown e achei fantástico o serviço de *Ecossistema e Funil de Vendas*. Gostaria de construir essa máquina de captação para o meu negócio.',
        position: 'right',
    },
];

// --- COMPONENTES AUXILIARES ---

function ListItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 group/item justify-center lg:justify-start">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
            <span className="text-zinc-300 text-[15px] font-medium group-hover/item:text-white transition-colors">
                {text}
            </span>
        </div>
    );
};





const ServiceCardMobile = ({
    service,
    index,
}: {
    service: typeof services[0];
    index: number;
}) => {
    const handleWhatsAppClick = () => {
        const phone = '5511999999999';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(service.message || '')}`;
        window.open(url, '_blank');
    };

    return (
        <div className="w-full flex flex-col justify-center">
            <Container>
                <div className="relative w-full flex items-center justify-center h-full">
                    <div className="relative w-full flex flex-col items-center">
                        <div className="w-full relative rounded-[24px] p-[1px] bg-gradient-to-b from-brand-gold/40 via-brand-gold/5 to-transparent shadow-2xl shadow-black">
                            <div className="relative bg-[#080808] rounded-[23px] p-6 overflow-hidden flex flex-col justify-center h-[550px] w-full">
                                {/* Background Highlight reduzido pro Mobile - nada de Blur 3XL pesado */}
                                <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold/[0.03] rounded-full pointer-events-none"></div>

                                <div className="flex flex-col items-center gap-4 mb-6 relative z-10">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <service.icon className="w-7 h-7 text-brand-gold fill-brand-gold" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-center">
                                        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-1 font-body text-brand-gold opacity-80">
                                            Serviço {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h2 className="text-2xl font-display font-semibold leading-[1.1] tracking-tight text-white">
                                            {service.titlePrefix} <br />
                                            <span className="text-brand-gold">
                                                {service.titleHighlight}
                                            </span>
                                        </h2>
                                    </div>
                                </div>

                                <p className="text-zinc-400 text-xs leading-relaxed mb-6 relative z-10 text-center mx-auto max-w-[90%]">
                                    {service.description}
                                </p>

                                <div className="space-y-2 mb-8 relative z-10 flex flex-col items-center w-full">
                                    {service.features.map((feature, idx) => (
                                        <ListItem key={idx} text={feature} />
                                    ))}
                                </div>

                                <CyberButton
                                    onClick={handleWhatsAppClick}
                                    className="w-full group/btn flex items-center justify-center gap-2 mt-auto"
                                >
                                    Quero Esse
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </CyberButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

const ServiceCardDesktop = ({
    service,
    index,
    setRef
}: {
    service: typeof services[0];
    index: number;
    setRef: (el: HTMLDivElement | null) => void;
}) => {
    const isLeft = service.position === 'left';

    const handleWhatsAppClick = () => {
        const phone = '5511999999999';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(service.message || '')}`;
        window.open(url, '_blank');
    };

    return (
        <section
            ref={setRef}
            id={service.id}
            className={`
        min-h-screen flex flex-col justify-center relative z-10
        py-16 pointer-events-none
        lg:min-h-screen lg:py-16
        w-full hidden lg:flex
      `}
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '200px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`
                            pointer-events-auto group relative w-full
                            lg:col-span-5
                            ${isLeft ? 'lg:col-start-1' : 'lg:col-start-8'}
                        `}
                    >
                        <div className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-brand-gold/40 via-brand-gold/5 to-transparent transition-all duration-500 group-hover:from-brand-gold group-hover:via-brand-gold/20 group-hover:to-transparent shadow-2xl shadow-black">
                            <div className="relative h-full bg-[#080808] rounded-[31px] p-10 overflow-hidden">
                                <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-all duration-500 pointer-events-none"></div>

                                <div className="flex flex-col items-center lg:items-start gap-6 mb-8 relative z-10">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-gold/30 transition-colors duration-500">
                                            <service.icon className="w-8 h-8 text-brand-gold fill-brand-gold" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-center lg:text-left">
                                        <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-1 font-body text-brand-gold opacity-80">
                                            Serviço {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h2 className="text-4xl font-display font-semibold leading-[1.1] tracking-tight text-white">
                                            {service.titlePrefix} <br />
                                            <span className="text-brand-gold">
                                                {service.titleHighlight}
                                            </span>
                                        </h2>
                                    </div>
                                </div>

                                <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-[95%] relative z-10 text-center lg:text-left mx-auto lg:mx-0">
                                    {service.description}
                                </p>

                                <div className="space-y-4 mb-10 relative z-10 flex flex-col items-center lg:items-start">
                                    {service.features.map((feature, idx) => (
                                        <ListItem key={idx} text={feature} />
                                    ))}
                                </div>

                                <CyberButton
                                    onClick={handleWhatsAppClick}
                                    className="w-full group/btn flex items-center justify-center gap-2"
                                >
                                    Quero Esse
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </CyberButton>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

// --- COMPONENTE PRINCIPAL ---
const ServicesSection = ({ enable3D = true }: { enable3D?: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsContainerDesktopRef = useRef<HTMLDivElement>(null);
    const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop(); // exec initial
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    return (
        <div ref={containerRef} id="servicos" className="relative w-full bg-[#050505]">
            <section className="min-h-[40vh] flex flex-col justify-center pt-32 pb-0 relative z-10">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '200px' }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start"
                    >
                        <span className="text-sm font-bold tracking-widest uppercase mb-4 block font-body text-brand-gold">
                            Nossos Serviços
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            Serviços de <span className="text-brand-gold">Design Digital e Marketing</span>
                        </h2>
                        <p className="text-base md:text-lg max-w-lg leading-relaxed font-body text-neutral-400 text-center md:text-left">
                            Design, estratégia e conteúdo integrados. Tudo que sua empresa precisa para dominar o digital.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <div className="relative w-full">
                <div className="hidden lg:block sticky top-0 w-full h-screen pointer-events-none z-0">
                    {/* Renderiza o 3D *dinamicamente* apenas no Desktop. Isso arranca quase 1MB da rede Movel */}
                    {isDesktop && enable3D && (
                        <Suspense fallback={null}>
                            <Services3DScene 
                                containerRef={containerRef} 
                                cardsContainerDesktopRef={cardsContainerDesktopRef} 
                            />
                        </Suspense>
                    )}
                </div>

                {/* MOBILE LIST — Simple vertical stack, NO ScrollTrigger (performance) */}
                <div className="relative z-10 w-full lg:hidden py-12 px-4 flex flex-col items-center gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={`mobile-${service.id}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full max-w-md"
                        >
                            <ServiceCardMobile service={service} index={index} />
                        </motion.div>
                    ))}
                </div>

                {/* DESKTOP LIST (Hidden on mobile) */}
                <div ref={cardsContainerDesktopRef} className="relative z-10 w-full pointer-events-auto hidden lg:block lg:-mt-[100vh]">
                    {services.map((service, index) => (
                        <ServiceCardDesktop
                            key={`desktop-${service.id}`}
                            service={service}
                            index={index}
                            setRef={(el) => desktopCardsRef.current[index] = el}
                        />
                    ))}
                    <div className="h-[20vh]" />
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
