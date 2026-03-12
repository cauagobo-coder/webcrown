import { MessageCircle, Instagram, Linkedin, ArrowUp } from 'lucide-react';

import Container from '../ui/Container';

const FooterSection = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-12 border-t border-white/5 bg-black/95 relative z-10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                    {/* Brand */}
                    <div className="col-span-12 md:col-span-4 text-center md:text-left">
                        <span className="text-2xl font-display font-bold tracking-tighter text-white">WebCrown<span className="text-brand-gold">.</span></span>
                        <p className="text-sm mt-1 font-body text-brand-gray/80">
                            Agência de Design e Tecnologia de Elite
                        </p>
                    </div>

                    {/* Social */}
                    <div className="col-span-12 md:col-span-4 flex justify-center text-center">
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-brand-gold hover:border-brand-gold/50 hover:bg-brand-gold/10 transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Back to Top */}
                    <div className="col-span-12 md:col-span-4 flex justify-center md:justify-end">
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-brand-gold transition-colors"
                        >
                            Voltar ao topo
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                </div>

            </Container>

        </footer >
    );
};

export default FooterSection;
