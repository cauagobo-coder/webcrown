import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    whatsappMessage?: string;
}

export const GoldButton: React.FC<ButtonProps> = ({ children, className = '', whatsappMessage, onClick, ...props }) => {
    const isWhatsApp = !!whatsappMessage;
    const link = whatsappMessage
        ? `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`
        : undefined;

    if (isWhatsApp) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-gold inline-flex items-center justify-center text-center ${className}`}
                {...(props as any)}
            >
                <span className="relative z-10 pointer-events-none">{children}</span>
            </a>
        )
    }

    return (
        <button
            className={`btn-gold inline-flex items-center justify-center text-center ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 pointer-events-none">{children}</span>
        </button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ children, className = '', onClick, ...props }) => {
    return (
        <button
            className={`btn-secondary inline-flex items-center justify-center text-center gap-2 ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 inline-flex items-center gap-2 pointer-events-none">{children}</span>
        </button>
    );
};

// Alias para compatibilidade
export const CyberButton = SecondaryButton;

export default GoldButton;
