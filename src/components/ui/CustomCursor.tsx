import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Apenas roda se tiver ponteiro fino (mouse/trackpad), ignora mobile totalmente
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!hasFinePointer) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false); // Oculta o cursor quando sai da janela do navegador
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Detectar se está sobre algo clicável para expandir o cursor
        const handleInteractionStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Verifica se o alvo ou pai é um elemento interativo
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousemove', handleInteractionStart);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousemove', handleInteractionStart);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    // Ocultar em dispositivos touch
    if (!window.matchMedia('(pointer: fine)').matches) {
        return null;
    }

    // Variantes de tamanho e estado pro Framer Motion
    const cursorVariants = {
        default: {
            x: mousePosition.x - 12, // Centraliza no mouse (24/2)
            y: mousePosition.y - 12,
            scale: 1,
            opacity: isVisible ? 1 : 0
        },
        hover: {
            x: mousePosition.x - 24, // Centraliza no mouse (48/2)
            y: mousePosition.y - 24,
            scale: 1,
            opacity: isVisible ? 1 : 0
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[999999]"
            variants={cursorVariants}
            animate={isHovering ? "hover" : "default"}
            initial="default"
            // Transição instantânea nas coordenadas X e Y para remover o "lag"
            transition={{
                x: { type: "spring", stiffness: 2000, damping: 100, mass: 0.05 },
                y: { type: "spring", stiffness: 2000, damping: 100, mass: 0.05 },
                opacity: { duration: 0.2 }
            }}
            style={{
                width: isHovering ? 48 : 24,
                height: isHovering ? 48 : 24,
                // Cores bem mais visíveis e vibrantes
                backgroundColor: isHovering ? 'rgba(245, 138, 7, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: isHovering ? '2px solid rgba(245, 138, 7, 0.8)' : '1px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '50%',
                boxShadow: isHovering ? '0 0 30px rgba(245, 138, 7, 0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
                // Transição suave apenas para tamanho e cor, não para a posição
                transition: 'width 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
            }}
        />
    );
};

export default CustomCursor;
