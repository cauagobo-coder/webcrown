import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, Zap, Palette, Video, ArrowRight } from 'lucide-react';
import { CyberButton } from './GoldButton';
// Three.js is loaded dynamically (only on desktop) to save ~600KB on mobile bundle
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

// --- DADOS ---
const services = [
    {
        id: 'service-1',
        icon: Share2,
        titlePrefix: 'Social Media e',
        titleHighlight: 'Gestão de Redes',
        description: 'Planejamento de conteúdo, criação de artes e posicionamento estratégico para fortalecer sua marca no Instagram, LinkedIn e além.',
        features: ['Planejamento de conteúdo', 'Criação de artes', 'Posicionamento estratégico'],
        message: 'Olá! Tenho interesse em Gestão de Redes Sociais.',
        position: 'left',
    },
    {
        id: 'service-2',
        icon: Zap,
        titlePrefix: 'Landing Pages de',
        titleHighlight: 'Alta Conversão',
        description: 'Páginas focadas em captar leads e gerar vendas, com estrutura, copy e design otimizados para converter visitantes em clientes.',
        features: ['Foco em conversão', 'Copy persuasiva', 'Velocidade máxima'],
        message: 'Olá! Tenho interesse em uma Landing Page de Alta Conversão.',
        position: 'right',
    },
    {
        id: 'service-3',
        icon: Palette,
        titlePrefix: 'Identidade Visual',
        titleHighlight: 'Profissional',
        description: 'Do logotipo ao manual de marca completo: criamos a identidade visual que representa quem você é e diferencia sua empresa no mercado.',
        features: ['Logotipo e variações', 'Manual de marca', 'Materiais gráficos'],
        message: 'Olá! Tenho interesse em Identidade Visual Profissional.',
        position: 'left',
    },
    {
        id: 'service-4',
        icon: Video,
        titlePrefix: 'Vídeo e',
        titleHighlight: 'Motion Design',
        description: 'Animações e vídeos estratégicos que comunicam sua marca com impacto, para redes sociais, apresentações e campanhas digitais.',
        features: ['Motion graphics', 'Vídeos institucionais', 'Conteúdo para redes'],
        message: 'Olá! Tenho interesse em Vídeo e Motion Design.',
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
                const gltf = await loader.loadAsync('/models/lantern-model.glb');
                if (cancelled) return;
                const lanternModel = gltf.scene;

                if (lanternModelRef.current) {
                    scrollWrapper.remove(lanternModelRef.current);
                }

                lanternModelRef.current = lanternModel;
                scrollWrapper.add(lanternModel);
                lanternModel.add(light);

                lanternModel.scale.set(2.5, 2.5, 2.5);

                refreshAnimations();

            } catch (error) {
                if (cancelled) return;
                console.warn('Modelo lantern-model.glb não encontrado. Usando cubo placeholder.', error);

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
                        right: 3.5,
                        left: -3.5
                    };
                    const baseY = -1.5;

                    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
                    idleTl.to(currentModel.position, {
                        y: 0.15,
                        duration: 2.5,
                        ease: "sine.inOut"
                    });

                    const baseScale = 2.2;

                    currentWrapper.position.set(posX.right, baseY, 0);
                    currentWrapper.rotation.set(0, Math.PI * 2, 0.2);
                    currentModel.scale.set(baseScale, baseScale, baseScale);
                    currentWrapper.visible = true;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: cardsContainerDesktopRef.current,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                            invalidateOnRefresh: true,
                        }
                    });

                    // Margem inicial
                    tl.to({}, { duration: 0.05 });

                    // Card 1 (left) → Card 2 (right): mover para esquerda
                    tl.to(currentWrapper.position, {
                        x: posX.left,
                        ease: "power1.inOut",
                        duration: 0.6
                    }, "move1")
                        .to(currentModel.scale, {
                            x: 2.6, y: 2.6, z: 2.6,
                            ease: "power1.inOut",
                            duration: 0.6
                        }, "move1")
                        .to(currentWrapper.rotation, {
                            y: Math.PI * 1.5, x: 0.15,
                            ease: "power1.inOut",
                            duration: 0.6
                        }, "move1");

                    tl.to({}, { duration: 0.15 });

                    // Card 2 (right) → Card 3 (left): mover para direita
                    tl.to(currentWrapper.position, {
                        x: posX.right,
                        ease: "power1.inOut",
                        duration: 0.6
                    }, "move2")
                        .to(currentModel.scale, {
                            x: 2.8, y: 2.8, z: 2.8,
                            ease: "power1.inOut",
                            duration: 0.6
                        }, "move2")
                        .to(currentWrapper.rotation, {
                            y: Math.PI * 2, x: -0.1,
                            ease: "power1.inOut",
                            duration: 0.6
                        }, "move2");

                    tl.to({}, { duration: 0.15 });

                    // Card 3 (left) → Card 4 (right): mover para esquerda
                    tl.to(currentWrapper.position, {
                        x: posX.left,
                        ease: "power1.inOut",
                        duration: 0.6
                    }, "move3")
                        .to(currentModel.scale, {
                            x: 3.0, y: 3.0, z: 3.0,
                            ease: "power1.inOut",
                            duration: 0.6
                        }, "move3")
                        .to(currentWrapper.rotation, {
                            y: Math.PI * 2.5, x: 0.2,
                            ease: "power1.inOut",
                            duration: 0.6
                        }, "move3");

                    tl.to({}, { duration: 0.3 });
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
                        className="max-w-2xl text-left"
                    >
                        <span className="text-sm font-medium tracking-wider uppercase mb-4 block font-body text-brand-gold">
                            Nossos Serviços
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 leading-tight text-white">
                            Serviços de <span className="text-brand-gold">Design Digital e Marketing</span>
                        </h1>
                        <p className="text-lg max-w-lg leading-relaxed font-body text-brand-gray/80">
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
