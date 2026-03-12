import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services3DScene({
    containerRef,
    cardsContainerDesktopRef
}: {
    containerRef: React.RefObject<HTMLDivElement>;
    cardsContainerDesktopRef: React.RefObject<HTMLDivElement>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Refs internas apenas pro WebGL
    const scrollWrapperRef = useRef<any>(null);
    const lanternModelRef = useRef<any>(null);
    const sceneRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const ctxRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        let cancelled = false;
        let soulLight: any;

        const init3D = async () => {
            if (!canvasRef.current || cancelled) return;

            // Import assíncrono - o pacote grande!
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

                mm.add("(min-width: 1024px)", () => {
                    if (!currentModel || !currentWrapper) return;
                    if (!cardsContainerDesktopRef.current) return;

                    const posX = { right: 2.2, left: -2.2 };
                    const baseY = -0.5;

                    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
                    idleTl.to(currentModel.position, {
                        y: 0.15,
                        duration: 2.5,
                        ease: "sine.inOut"
                    });

                    const handleMouseMove = (e: MouseEvent) => {
                        const x = (e.clientX / window.innerWidth - 0.5) * 2;
                        const y = (e.clientY / window.innerHeight - 0.5) * 2;
                        gsap.to(currentModel.rotation, {
                            x: y * 0.4,
                            y: x * 0.4,
                            z: -x * 0.1,
                            duration: 2.5,
                            ease: "power3.out"
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
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                            invalidateOnRefresh: true,
                        }
                    });

                    tl.to({}, { duration: 320 });

                    // Scroll 0-20, Card 1 -> 2
                    tl.to(currentWrapper.position, { x: posX.left, ease: "power1.inOut", duration: 60 }, 20)
                      .to(currentWrapper.rotation, { y: Math.PI * 1.0, x: 0.1, z: 0.05, ease: "power2.inOut", duration: 60 }, 20)
                      .to(currentModel.scale, { x: 2.7, y: 2.7, z: 2.7, ease: "power2.inOut", duration: 60 }, 20);

                    // Scroll 120-180, Card 2 -> 3
                    tl.to(currentWrapper.position, { x: posX.right, ease: "power1.inOut", duration: 60 }, 120)
                      .to(currentWrapper.rotation, { y: Math.PI * 2.1, x: -0.15, z: -0.05, ease: "power2.inOut", duration: 60 }, 120)
                      .to(currentModel.scale, { x: 3.6, y: 3.6, z: 3.6, ease: "power2.inOut", duration: 60 }, 120);

                    // Scroll 220-280, Card 3 -> 4
                    tl.to(currentWrapper.position, { x: posX.left, ease: "power1.inOut", duration: 60 }, 220)
                      .to(currentWrapper.rotation, { y: Math.PI * 3.1, x: 0.2, z: 0.1, ease: "power2.inOut", duration: 60 }, 220)
                      .to(currentModel.scale, { x: 3.0, y: 3.0, z: 3.0, ease: "power2.inOut", duration: 60 }, 220);

                    return () => {
                        window.removeEventListener("mousemove", handleMouseMove);
                    };
                });

            }, containerRef);
        };

        init3D();

        let isVisible = true;
        let observer: IntersectionObserver | null = null;

        if (containerRef.current) {
            observer = new IntersectionObserver(
                ([entry]) => { isVisible = entry.isIntersecting; },
                { rootMargin: '200px' }
            );
            observer.observe(containerRef.current);
        }

        const animate = () => {
            if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !isVisible) return;
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
            const width = window.innerWidth;
            if (width < 1024) {
               dispose3D();
               return;
            }
            if (rendererRef.current && cameraRef.current) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
}
