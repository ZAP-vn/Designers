import React from 'react';
import { Check, Star, Quote } from 'lucide-react';
import { ThemeState, ProjectConfig } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';

interface BlocksShowcaseProps {
    themeState: ThemeState;
    config: ProjectConfig;
    blockType: 'pricing' | 'stats' | 'testimonial';
}

export const BlocksShowcase: React.FC<BlocksShowcaseProps> = ({ themeState, config, blockType }) => {
    const data = config.generatedContent;

    if (blockType === 'pricing') {
        const pricing = data?.pricing || [];
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                {pricing.map((plan, i) => (
                    <ContainerDevWrapper
                        key={i}
                        identity={{ displayName: `PricingCard-${plan.title}`, type: "Card", value: plan.title, filePath: "components/views/BlocksShowcase.tsx" }}
                        className={`relative p-8 border rounded-3xl transition-all hover:shadow-xl ${plan.isPopular ? 'border-purple-200 bg-purple-50/10' : 'border-gray-100 bg-white'}`}
                        style={{ borderRadius: `${themeState.borderRadius * 2}px` }}
                    >
                        {plan.isPopular && (
                            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                                style={{ backgroundColor: themeState.primary }}>
                                Popular
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-2" style={{ color: themeState.darkText }}>{plan.title}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black" style={{ color: themeState.darkText }}>{plan.price}</span>
                            <span className="text-gray-400 text-sm">/{plan.period}</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {plan.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${themeState.primary}15`, color: themeState.primary }}>
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-4 text-sm font-bold shadow-lg transition-transform hover:-translate-y-1"
                            style={{
                                backgroundColor: plan.isPopular ? themeState.primary : 'white',
                                color: plan.isPopular ? themeState.primaryBtnText : themeState.darkText,
                                border: plan.isPopular ? 'none' : `1px solid ${themeState.primary}40`,
                                borderRadius: `${themeState.borderRadius}px`
                            }}>
                            {plan.buttonLabel}
                        </button>
                    </ContainerDevWrapper>
                ))}
            </div>
        );
    }

    if (blockType === 'stats') {
        const stats = data?.stats || [];
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                {stats.map((stat, i) => (
                    <ContainerDevWrapper
                        key={i}
                        identity={{ displayName: `StatCard-${stat.label}`, type: "Stat", value: stat.label, filePath: "components/views/BlocksShowcase.tsx" }}
                        className="p-8 bg-white border border-gray-100 rounded-3xl text-center shadow-sm"
                        style={{ borderRadius: `${themeState.borderRadius * 2}px` }}
                    >
                        <div className="text-4xl font-black mb-2" style={{ color: themeState.primary }}>
                            {stat.value}
                        </div>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            {stat.label}
                        </div>
                    </ContainerDevWrapper>
                ))}
            </div>
        );
    }

    if (blockType === 'testimonial') {
        const testimonials = data?.testimonials || [];
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                {testimonials.map((t, i) => (
                    <ContainerDevWrapper
                        key={i}
                        identity={{ displayName: `Testimonial-${t.author}`, type: "Testimonial", value: t.author, filePath: "components/views/BlocksShowcase.tsx" }}
                        className="p-8 bg-white border border-gray-100 rounded-3xl relative shadow-soft"
                        style={{ borderRadius: `${themeState.borderRadius * 2}px` }}
                    >
                        <div className="absolute top-8 left-8 text-gray-100 -z-0">
                            <Quote size={48} fill="currentColor" />
                        </div>
                        <p className="text-lg italic leading-relaxed mb-8 relative z-10" style={{ color: themeState.darkText }}>
                            "{t.quote}"
                        </p>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-400">
                                {t.author[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm" style={{ color: themeState.darkText }}>{t.author}</h4>
                                <p className="text-xs text-gray-400">{t.role}</p>
                            </div>
                        </div>
                    </ContainerDevWrapper>
                ))}
            </div>
        );
    }

    return null;
};
