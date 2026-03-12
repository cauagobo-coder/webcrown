import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
