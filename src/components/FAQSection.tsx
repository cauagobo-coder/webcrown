import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import GlassCard from './GlassCard';

const faqs = [
    {
        question: 'Quais serviços a WebCrown oferece?',
        answer: 'Trabalhamos com gestão de redes sociais, criação de landing pages, identidade visual e produção de vídeos e motion design para empresas de diferentes segmentos.',
    },
    {
        question: 'Quanto tempo leva para entregar um projeto?',
        answer: 'O prazo varia conforme o escopo. Projetos de identidade visual levam de 1 a 3 semanas; landing pages entre 5 e 10 dias úteis. Alinhamos tudo no briefing inicial.',
    },
    {
        question: 'Atendem empresas de qualquer nicho ou segmento?',
        answer: 'Sim. Adaptamos estratégia, linguagem e design ao perfil específico de cada negócio, de e-commerce a prestadores de serviços.',
    },
    {
        question: 'O trabalho inclui apenas design ou também estratégia?',
        answer: 'Nosso trabalho une design visual e posicionamento estratégico. Não entregamos apenas artes, entregamos comunicação que funciona.',
    },
    {
        question: 'Posso contratar apenas um serviço específico?',
        answer: 'Sim. Cada serviço pode ser contratado de forma isolada ou em conjunto, dependendo da necessidade do seu negócio.',
    },
    {
        question: 'Atendem empresas de outros estados ou cidades?',
        answer: 'Sim. Todos os projetos são realizados 100% online, atendendo clientes em todo o Brasil.',
    },
];

import Container from './Container';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 relative bg-black">
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '200px' }}
                            transition={{ duration: 0.4 }}
                            className="text-center mb-16"
                        >
                            <span className="text-sm font-bold tracking-widest uppercase mb-4 block font-body text-brand-gold">
                                Dúvidas Comuns
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-white">
                                Perguntas <span className="text-brand-gold">Frequentes</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <GlassCard
                                    key={index}
                                    className={`transition-colors duration-300 ${openIndex === index ? 'border-brand-gold/30 bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between text-left p-2 focus:outline-none"
                                    >
                                        <span className={`text-lg font-bold pr-8 transition-colors font-display ${openIndex === index ? 'text-brand-gold' : 'text-white'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`shrink-0 p-1 rounded-full border transition-all ${openIndex === index ? 'bg-brand-gold border-brand-gold rotate-180' : 'border-white/20 text-white'}`}>
                                            {openIndex === index ? <Minus className="w-5 h-5 text-black" /> : <Plus className="w-5 h-5" />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 pr-12 leading-relaxed font-body text-brand-gray/80">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>
                            ))}
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQSection;
