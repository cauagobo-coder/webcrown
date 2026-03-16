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
    // Mantemos `spring` para reagir super rápido mas de forma fluída ("snappy")
    const cursorVariants = {
        default: {
            x: mousePosition.x - 12, // Subtrai a metade da largura (24px)
            y: mousePosition.y - 12, // Subtrai a metade da altura
            scale: 1,
            opacity: isVisible ? 1 : 0
        },
        hover: {
            x: mousePosition.x - 24, // Tamanho final do hover é 48px, então subtrai 24px
            y: mousePosition.y - 24,
            scale: 1, // Não usar scale direto aqui se estamos mudando Width, senão distorce
            opacity: isVisible ? 1 : 0
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[999999]"
            variants={cursorVariants}
            animate={isHovering ? "hover" : "default"}
            initial="default"
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 40,
                mass: 0.1
            }}
            style={{
                width: isHovering ? 48 : 24,
                height: isHovering ? 48 : 24,
                backgroundColor: isHovering ? 'rgba(245, 138, 7, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                border: isHovering ? '1px solid rgba(245, 138, 7, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                boxShadow: isHovering ? '0 0 20px rgba(245, 138, 7, 0.2)' : 'none',
                // A transição no style complementa as físicas do spring nas coordenadas
                transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out'
            }}
        />
    );
};

export default CustomCursor;
