import React from 'react';
import GoldButton from '../ui/GoldButton';
import { motion } from 'framer-motion';

const FinalCTASection: React.FC = () => {
    const handleContactClick = () => {
        const link = "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20queria%20levar%20meu%20site%20para%20o%20pr%C3%B3ximo%20n%C3%ADvel!";
        window.open(link, '_blank');
    };

    return (
        <section className="py-32 relative bg-black overflow-hidden flex items-center justify-center">
            {/* Background Glow */}


            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '200px' }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                        Pronto para transformar sua marca em uma <span className="text-brand-gold">presença digital de impacto?</span>
                    </h2>

                    <p className="text-base md:text-lg max-w-2xl mx-auto mb-12 font-body text-neutral-400">
                        Se você quer design profissional, estratégia visual e conteúdo que converte, a WebCrown é o parceiro certo para o seu negócio.
                    </p>

                    <GoldButton
                        onClick={handleContactClick}
                        className="mx-auto"
                        data-tracking="cta-final-whatsapp"
                    >
                        Solicitar Orçamento Gratuito
                    </GoldButton>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTASection;
