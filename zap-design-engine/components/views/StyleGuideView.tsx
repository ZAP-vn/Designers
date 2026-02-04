
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Type, Palette, MousePointerClick, Sparkles } from 'lucide-react';
import { ProjectConfig, ThemeState, TypographyItem } from '../../types';
import { ButtonShowcase } from './ButtonShowcase';

interface StyleGuideViewProps {
    projectConfig: ProjectConfig;
    themeState: ThemeState;
}

const fallbackItems: TypographyItem[] = [
    { name: 'Heading 1', token: 'text-5xl', size: '48px', weight: 'font-extrabold', sample: '', usage: 'Hero' },
    { name: 'Heading 2', token: 'text-4xl', size: '36px', weight: 'font-bold', sample: '', usage: 'Section' },
    { name: 'Heading 3', token: 'text-2xl', size: '24px', weight: 'font-bold', sample: '', usage: 'Subsection' },
    { name: 'Heading 4', token: 'text-xl', size: '20px', weight: 'font-semibold', sample: '', usage: 'Title' },
    { name: 'Body', token: 'text-base', size: '16px', weight: 'font-normal', sample: '', usage: 'Body' },
    { name: 'Caption', token: 'text-sm', size: '14px', weight: 'font-medium', sample: '', usage: 'Caption' },
    { name: 'Label', token: 'text-xs', size: '12px', weight: 'font-bold', sample: '', usage: 'Label' },
];

export const StyleGuideView: React.FC<StyleGuideViewProps> = ({ projectConfig, themeState }) => {
    const typographyItems = projectConfig.generatedContent?.typography?.items || fallbackItems;
    const projectIcons = projectConfig.generatedContent?.icons || [];

    const colorPalette = [
        { name: 'Primary', hex: themeState.primary, text: themeState.primaryBtnText },
        { name: 'Secondary', hex: themeState.secondary, text: themeState.secondaryBtnText },
        { name: 'Background 1', hex: themeState.background, text: themeState.darkText, border: true },
        { name: 'Background 2', hex: themeState.background2, text: themeState.darkText, border: true },
        { name: 'Background 3', hex: themeState.background3, text: themeState.darkText, border: true },
        { name: 'Dark Text', hex: themeState.darkText, text: themeState.lightText },
        { name: 'Gray Text', hex: themeState.grayText, text: themeState.lightText },
        { name: 'Light Text', hex: themeState.lightText, text: themeState.darkText, border: true },
        { name: 'Primary Btn Text', hex: themeState.primaryBtnText, text: themeState.primary, border: true },
        { name: 'Secondary Btn Text', hex: themeState.secondaryBtnText, text: themeState.secondary, border: true },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in duration-500">
            <div className="mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4" style={{ color: themeState.darkText }}>Design System</h1>
                <p className="text-lg opacity-60 max-w-2xl">
                    Standardized styles, components, and assets for <strong style={{color: themeState.primary}}>{projectConfig.projectName}</strong>.
                </p>
            </div>
            
            {/* 1. Typography */}
            <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Type className="text-gray-400" />
                    <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Typography</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                     <div>
                         <div className="p-12 border border-gray-200 rounded-xl mb-6 flex flex-col items-center justify-center text-center bg-white shadow-sm">
                             <span className="text-8xl font-medium mb-4" style={{ fontFamily: themeState.fontFamily }}>Aa</span>
                             <span className="text-xl font-bold">{themeState.fontFamily}</span>
                             <span className="text-gray-400 text-sm mt-1">Primary Font Family</span>
                         </div>
                         <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
                             <p className="font-semibold mb-1">Scale Ratio: Perfect Fourth (1.333)</p>
                             <p>The typography system is generated using a modular scale to ensure visual harmony.</p>
                         </div>
                     </div>
                     <div className="space-y-8">
                         {typographyItems.map((item, i) => (
                             <div key={i} className="flex items-baseline gap-6 group border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                 <div className="w-24 shrink-0 text-right pt-1">
                                     <div className="text-xs font-mono text-gray-400 font-medium mb-0.5">{item.size}</div>
                                     <div className="text-[10px] text-gray-300 font-mono">{item.weight.replace('font-', '')}</div>
                                 </div>
                                 <div className="flex-1">
                                    <div className={`${item.token} ${item.weight}`} style={{ fontFamily: themeState.fontFamily, color: themeState.darkText, fontSize: item.size }}>{item.name}</div>
                                    <div className="flex items-center gap-2 mt-2"><span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono uppercase tracking-wide">.{item.name.toLowerCase().replace(/\s+/g, '-')}</span><span className="text-xs text-gray-400 italic"> — {item.usage}</span></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </section>

            {/* 2. Color Palette */}
            <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Palette className="text-gray-400" />
                    <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Color Palette</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {colorPalette.map((color, i) => (
                        <div key={i} className="group">
                             <div className="h-28 rounded-xl shadow-sm mb-3 flex items-end p-4 transition-transform group-hover:scale-[1.02] relative overflow-hidden" style={{ backgroundColor: color.hex, border: color.border ? '1px solid #e5e7eb' : 'none' }}>
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                 <span className="font-mono text-xs font-bold relative z-10" style={{ color: color.text }}>{color.hex}</span>
                             </div>
                             <p className="font-bold text-sm truncate" style={{ color: themeState.darkText }}>{color.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Buttons */}
            <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <MousePointerClick className="text-gray-400" />
                    <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Buttons</h2>
                </div>
                <ButtonShowcase themeState={themeState} />
            </section>

            {/* 4. Icons */}
            <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Sparkles className="text-gray-400" />
                    <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Iconography</h2>
                </div>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                    {projectIcons.map((icon) => {
                         const IconComp = (LucideIcons as any)[icon.iconName] || LucideIcons.Circle;
                         return (
                             <div key={icon.id} className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-all group">
                                {icon.type === 'custom' && icon.svgContent ? (
                                    <div 
                                        className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full"
                                        style={{ color: themeState.darkText }}
                                        dangerouslySetInnerHTML={{ __html: icon.svgContent }}
                                    />
                                ) : (
                                    <IconComp size={24} style={{ color: themeState.darkText }} />
                                )}
                                <span className="text-[10px] text-gray-400 truncate w-full text-center group-hover:text-gray-900">{icon.name}</span>
                             </div>
                         )
                    })}
                    {projectIcons.length === 0 && (
                        <div className="col-span-full py-8 text-center text-gray-400 text-sm italic">
                            No icons added to project yet.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
