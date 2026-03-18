import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    // Valores numéricos limpos (não engatilham re-render do React no movimento)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Mola ultrarrápida: alta tração, baixa massa = 0 latência, mas ainda fluido
    const springConfig = { damping: 40, stiffness: 3000, mass: 0.02 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
        setIsDesktop(hasFinePointer);
        if (!hasFinePointer) return;

        const handleMouseMove = (e: MouseEvent) => {
            // A Div original tem 48px fixos absolutos.
            // Para o centro bater exatamente na ponta do mouse, subtraímos a metade (24px).
            cursorX.set(e.clientX - 24);
            cursorY.set(e.clientY - 24);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleInteractionStart = (e: MouseEvent) => {
            let target = e.target as HTMLElement | null;

            // Recurse up the DOM to find any clickable element
            let isClickable = false;
            while (target && target !== document.body) {
                if (
                    ['a', 'button', 'input', 'select', 'textarea'].includes(target.tagName.toLowerCase()) ||
                    target.classList.contains('cursor-pointer') ||
                    target.hasAttribute('onclick') ||
                    window.getComputedStyle(target).cursor === 'pointer'
                ) {
                    isClickable = true;
                    break;
                }
                target = target.parentElement;
            }

            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleInteractionStart, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Forçar cursor na primeira entrada
        setIsVisible(true);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleInteractionStart);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, cursorX, cursorY]);

    if (!isDesktop) return null;

    // Apenas animamos escala e opacidade via React (são processadas na Placa de Vídeo - GPU)
    // O eixo X e Y é injetado diretamente pelo hook "x" e "y" para bypassar o React e o CPU
    const variants = {
        default: {
            scale: 0.5,
            opacity: isVisible ? 1 : 0
        },
        hover: {
            scale: 1,
            opacity: isVisible ? 1 : 0
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[999999]"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            initial="default"
            // Ligamos o Style diretamente aos MotionValues (isso ignora os Re-renders de react pro mouse)
            style={{
                x, 
                y,
                width: 48,
                height: 48,
                backgroundColor: isHovering ? 'rgba(245, 138, 7, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: isHovering ? '2px solid rgba(245, 138, 7, 0.8)' : '1px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '50%',
                boxShadow: isHovering ? '0 0 30px rgba(245, 138, 7, 0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            transition={{
                scale: { type: "spring", stiffness: 400, damping: 25 },
                opacity: { duration: 0.2 }
            }}
        />
    );
};

export default CustomCursor;
