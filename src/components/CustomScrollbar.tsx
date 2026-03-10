import { useEffect, useRef, useState, useCallback } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

export const CustomScrollbar = () => {
    const thumbRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const lenisRef = useRef<any>(null);

    // Function to calculate and update scrollbar (called from Lenis callback only)
    const updateScrollbar = useCallback(() => {
        if (!thumbRef.current || !trackRef.current || isDragging || !lenisRef.current) return;

        const lenis = lenisRef.current;
        const scroll = lenis.scroll; // Smooth scroll position

        // Use real DOM values for height to ensure accuracy even if Lenis is stale
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const realLimit = docHeight - windowHeight;

        // Prevent division by zero
        if (realLimit <= 0) {
            thumbRef.current.style.height = '0px';
            thumbRef.current.style.transform = 'translate3d(0, 0, 0)';
            return;
        }

        // Calculate Thumb Height
        const ratio = windowHeight / docHeight;
        const thumbHeight = Math.max(50, windowHeight * ratio);

        // Calculate Position
        const trackHeight = windowHeight - 16; // 8px top + 8px bottom margin
        const availableMovement = trackHeight - thumbHeight;

        // Progress based on Real DOM limit
        const progress = Math.min(Math.max(scroll / realLimit, 0), 1);
        const y = progress * availableMovement;

        // Apply Styles
        thumbRef.current.style.height = `${thumbHeight}px`;
        thumbRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
    }, [isDragging]);

    // One-time recalculation after layout changes (like zoom finishing)
    useEffect(() => {
        const timer = setTimeout(updateScrollbar, 600);
        return () => clearTimeout(timer);
    }, [updateScrollbar]);

    // Lenis Scroll Hook
    useLenis((lenis) => {
        lenisRef.current = lenis;
        updateScrollbar();
    }, [updateScrollbar]);

    // Drag Logic
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);

        const startY = e.clientY;
        const thumb = thumbRef.current;
        if (!thumb) return;

        // Get current transform Y
        const transform = window.getComputedStyle(thumb).transform;
        const matrix = new DOMMatrix(transform);
        const startThumbY = matrix.m42;

        // Recalculate context for drag
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const ratio = windowHeight / docHeight;
        const thumbHeight = Math.max(50, windowHeight * ratio);
        const trackHeight = windowHeight - 16;
        const availableMovement = trackHeight - thumbHeight;

        const handlePointerMove = (e: PointerEvent) => {
            e.preventDefault();
            const deltaY = e.clientY - startY;
            let newY = startThumbY + deltaY;

            // Clamp
            newY = Math.max(0, Math.min(newY, availableMovement));

            // Visual Update
            thumb.style.transform = `translate3d(0, ${newY}px, 0)`;

            // Scroll Lenis
            if (lenisRef.current) {
                const progress = newY / availableMovement;
                const realLimit = docHeight - windowHeight;
                lenisRef.current.scrollTo(progress * realLimit, { immediate: true });
            }
        };

        const handlePointerUp = () => {
            setIsDragging(false);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    }, []);

    return (
        <div ref={trackRef} className="fixed top-2 right-1 w-2 bottom-2 z-[99999] pointer-events-none">
            <div
                ref={thumbRef}
                onPointerDown={handlePointerDown}
                className={`w-full bg-brand-gold rounded-full cursor-grab active:cursor-grabbing pointer-events-auto transition-colors duration-300 hover:bg-brand-gold/80 ${isDragging ? 'bg-brand-gold/80' : ''}`}
                style={{
                    willChange: 'transform, height',
                    touchAction: 'none'
                }}
            />
        </div>
    );
};
