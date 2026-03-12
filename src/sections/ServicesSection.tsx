import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, Zap, Palette, TrendingUp, ArrowRight } from 'lucide-react';
import { CyberButton } from '../ui/GoldButton';
// Three.js is loaded dynamically (only on desktop) to save ~600KB on mobile bundle
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../ui/Container';

gsap.registerPlugin(ScrollTrigger);

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
                                {/* Background Blur */}
                                <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollWrapperRef = useRef<any>(null);
    const lanternModelRef = useRef<any>(null);
    const sceneRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);

    // Desktop-only refs

    const cardsContainerDesktopRef = useRef<HTMLDivElement>(null);
    const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const ctxRef = useRef<gsap.Context | null>(null);

    // --- 3D INITIALIZATION (DESKTOP ONLY, >= 1024px) ---
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current || !enable3D) return;

        // Skip 3D entirely on mobile/tablet — saves ~3.5MB download + GPU
        const isDesktop = () => window.innerWidth >= 1024;
        if (!isDesktop()) return;

        let cancelled = false;
        let soulLight: any;

        const init3D = async () => {
            if (!canvasRef.current || cancelled) return;

            // Dynamic import — Three.js only downloads on desktop
            const [THREE, { GLTFLoader }, { DRACOLoader }] = await Promise.all([
                import('three'),
                // @ts-ignore
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                // @ts-ignore
                import('three/examples/jsm/loaders/DRACOLoader.js'),
            ]);

            if (cancelled || !canvasRef.current) return;

            const scene = new THREE.Scene();
            sceneRef.current = scene;

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            cameraRef.current = camera;

            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: canvasRef.current,
                powerPreference: "high-performance"
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;
            rendererRef.current = renderer;

            const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 3.5);
            dirLight.position.set(5, 10, 5);
            scene.add(dirLight);

            const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
            fillLight.position.set(-5, 5, -5);
            scene.add(fillLight);

            soulLight = new THREE.PointLight(0xF58A07, 5.0, 20);
            soulLight.position.set(0, 0, 0);
            scene.add(soulLight);

            const scrollWrapper = new THREE.Group();
            scene.add(scrollWrapper);
            scrollWrapperRef.current = scrollWrapper;

            loadModel(scrollWrapper, soulLight, GLTFLoader, DRACOLoader, THREE);
        };

        const loadModel = async (scrollWrapper: any, light: any, GLTFLoader: any, DRACOLoader: any, THREE: any) => {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
            loader.setDRACOLoader(dracoLoader);

            try {
                const gltf = await loader.loadAsync('/models/coroa3D.glb');
                if (cancelled) return;
                const lanternModel = gltf.scene;

                if (lanternModelRef.current) {
                    scrollWrapper.remove(lanternModelRef.current);
                }

                lanternModelRef.current = lanternModel;
                scrollWrapper.add(lanternModel);
                lanternModel.add(light);

                lanternModel.scale.set(3.5, 3.5, 3.5);

                refreshAnimations();

            } catch (error) {
                if (cancelled) return;
                console.warn('Modelo coroa3D.glb não encontrado. Usando cubo placeholder.', error);

                const geometry = new THREE.BoxGeometry(1, 1.5, 1);
                const material = new THREE.MeshStandardMaterial({ color: 0xF58A07, metalness: 0.8, roughness: 0.2 });
                const cube = new THREE.Mesh(geometry, material);

                if (lanternModelRef.current) scrollWrapper.remove(lanternModelRef.current);
                lanternModelRef.current = cube as any;
                scrollWrapper.add(cube);
                cube.add(light);
                refreshAnimations();
            }
        };

        const refreshAnimations = () => {
            const currentModel = lanternModelRef.current;
            const currentWrapper = scrollWrapperRef.current;

            if (ctxRef.current) {
                ctxRef.current.revert();
            }

            ctxRef.current = gsap.context(() => {
                const mm = gsap.matchMedia();

                // --- DESKTOP ANIMATION (3D + Scroll) ---
                mm.add("(min-width: 1024px)", () => {
                    if (!currentModel || !currentWrapper) return;
                    if (!cardsContainerDesktopRef.current) return;

                    const posX = {
                        right: 2.2,
                        left: -2.2
                    };
                    const baseY = -0.5;

                    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
                    idleTl.to(currentModel.position, {
                        y: 0.15,
                        duration: 2.5,
                        ease: "sine.inOut"
                    });

                    // --- Mouse Interaction ---
                    const handleMouseMove = (e: MouseEvent) => {
                        const x = (e.clientX / window.innerWidth - 0.5) * 2;
                        const y = (e.clientY / window.innerHeight - 0.5) * 2;

                        // Faz o modelo inclinar conforme o mouse se move
                        gsap.to(currentModel.rotation, {
                            x: y * 0.4,
                            y: x * 0.4,
                            z: -x * 0.1,
                            duration: 2.5,
                            ease: "power3.out" // Suave e contínuo
                        });
                    };
                    window.addEventListener("mousemove", handleMouseMove);

                    const baseScale = 3.2;

                    currentWrapper.position.set(posX.right, baseY, 0);
                    currentWrapper.rotation.set(0, Math.PI * 2, 0.2);
                    currentModel.scale.set(baseScale, baseScale, baseScale);
                    currentWrapper.visible = true;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: cardsContainerDesktopRef.current,
                            start: "top top", // Back to "top top" for exact sync
                            end: "bottom bottom",
                            scrub: true,
                            invalidateOnRefresh: true,
                        }
                    });

                    // Cada card tem 100vh de scroll e a margem inferior é de aprox 20vh (total de scroll útil 320)
                    // Configurando o tempo total para 320 garante mapeamento 1:1, permitindo pausas perfeitas.
                    tl.to({}, { duration: 320 });

                    // Scroll 0-20: Parado (Texto 1 focado)
                    // Scroll 20-80: Card 1 -> Card 2 (Model vai para a esquerda)
                    tl.to(currentWrapper.position, {
                        x: posX.left,
                        ease: "power1.inOut",
                        duration: 60
                    }, 20)
                        .to(currentWrapper.rotation, {
                            // Parada 2: Gira 180 graus (Math.PI) mostrando a parte de trás completamente
                            y: Math.PI * 1.0,
                            x: 0.1,
                            z: 0.05,
                            ease: "power2.inOut",
                            duration: 60
                        }, 20)
                        .to(currentModel.scale, {
                            x: 2.7, y: 2.7, z: 2.7, // Dá uma leve afastada
                            ease: "power2.inOut",
                            duration: 60
                        }, 20);

                    // Scroll 80-120: Parado (Texto 2 focado)
                    // Scroll 120-180: Card 2 -> Card 3 (Model volta para a direita)
                    tl.to(currentWrapper.position, {
                        x: posX.right,
                        ease: "power1.inOut",
                        duration: 60
                    }, 120)
                        .to(currentWrapper.rotation, {
                            // Parada 3: Volta a mostrar a FRENTE (Math.PI * 2), mas inclinada diferente
                            y: Math.PI * 2.1,
                            x: -0.15,
                            z: -0.05,
                            ease: "power2.inOut",
                            duration: 60
                        }, 120)
                        .to(currentModel.scale, {
                            x: 3.6, y: 3.6, z: 3.6, // Aproxima o modelo ficando grandioso
                            ease: "power2.inOut",
                            duration: 60
                        }, 120);

                    // Scroll 180-220: Parado (Texto 3 focado)
                    // Scroll 220-280: Card 3 -> Card 4 (Model vai para a esquerda, reta final)
                    tl.to(currentWrapper.position, {
                        x: posX.left,
                        ease: "power1.inOut",
                        duration: 60
                    }, 220)
                        .to(currentWrapper.rotation, {
                            // Parada 4: Gira 180 graus de novo (Math.PI * 3) mostrando as COSTAS pela 2ª vez
                            y: Math.PI * 3.1,
                            x: 0.2,
                            z: 0.1,
                            ease: "power2.inOut",
                            duration: 60
                        }, 220)
                        .to(currentModel.scale, {
                            x: 3.0, y: 3.0, z: 3.0, // Retorna a um tamanho um pouco abaixo do original
                            ease: "power2.inOut",
                            duration: 60
                        }, 220);

                    return () => {
                        window.removeEventListener("mousemove", handleMouseMove);
                    };
                });

            }, containerRef);
        };

        // Initialize 3D scene
        init3D();

        // --- Visibility-based render pause ---
        let isVisible = true;
        let observer: IntersectionObserver | null = null;

        if (containerRef.current) {
            observer = new IntersectionObserver(
                ([entry]) => { isVisible = entry.isIntersecting; },
                { rootMargin: '200px' } // Start rendering 200px before entering viewport
            );
            observer.observe(containerRef.current);
        }

        const animate = () => {
            if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
            // Skip rendering when section is off-screen — saves GPU
            if (!isVisible) return;

            if (soulLight) {
                const t = Date.now() * 0.002;
                soulLight.intensity = 2.5 + Math.sin(t) * 0.5;
                soulLight.distance = 15 + Math.sin(t * 1.5) * 3;
            }

            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        gsap.ticker.add(animate);
        gsap.ticker.lagSmoothing(0);

        const dispose3D = () => {
            gsap.ticker.remove(animate);
            if (observer) { observer.disconnect(); observer = null; }
            if (ctxRef.current) ctxRef.current.revert();
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            sceneRef.current = null;
            cameraRef.current = null;
            lanternModelRef.current = null;
            scrollWrapperRef.current = null;
        };

        const handleResize = () => {
            if (!isDesktop()) {
                dispose3D();
                return;
            }

            if (rendererRef.current && cameraRef.current) {
                const width = window.innerWidth;
                const height = window.innerHeight;
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(width, height);
                refreshAnimations();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelled = true;
            window.removeEventListener('resize', handleResize);
            dispose3D();
        };
    }, [enable3D]);

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
                    <canvas ref={canvasRef} className="w-full h-full block" />
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
