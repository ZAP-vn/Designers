
import React, { useState } from 'react';
import {
    ChevronLeft, ChevronRight, RotateCcw,
    Home, Lock, Shield, Settings,
    Monitor, Tablet, Smartphone, Maximize,
    ExternalLink, Search
} from 'lucide-react';
import { ThemeState } from '../../types';

interface BrowserPreviewProps {
    url?: string;
    title?: string;
    children: React.ReactNode;
    themeState: ThemeState;
    viewport?: 'desktop' | 'tablet' | 'mobile';
    onViewportChange?: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
    showControls?: boolean;
}

/**
 * BrowserPreview Molecule
 * A premium, glassmorphic browser frame that "embeds" the previewed content.
 */
export const BrowserPreview: React.FC<BrowserPreviewProps> = ({
    url = "https://orbit-financial.zap",
    title = "Design Preview",
    children,
    themeState,
    viewport = 'desktop',
    onViewportChange,
    showControls = true
}) => {
    const [activeViewport, setActiveViewport] = useState(viewport);

    const handleViewportChange = (v: 'desktop' | 'tablet' | 'mobile') => {
        setActiveViewport(v);
        if (onViewportChange) onViewportChange(v);
    };

    const viewportDimensions = {
        desktop: 'w-full h-full',
        tablet: 'w-[768px] h-[1024px] rounded-[32px]',
        mobile: 'w-[375px] h-[812px] rounded-[48px]'
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 p-6 overflow-hidden">
            {/* Browser Controls / Chrome */}
            {showControls && (
                <div className="flex flex-col shrink-0 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.2)]" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.2)]" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
                            </div>

                            <div className="flex items-center gap-1">
                                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all">
                                    <ChevronLeft size={16} />
                                </button>
                                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all">
                                    <ChevronRight size={16} />
                                </button>
                                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all">
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Search / Address Bar */}
                        <div className="flex-1 max-w-2xl px-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock size={12} className="mr-2" />
                                    <Shield size={12} />
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    value={url}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-10 py-2.5 text-xs font-mono text-slate-600 dark:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <Search size={14} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-all">
                                <Settings size={18} />
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all active:scale-95">
                                <ExternalLink size={14} />
                                <span>Preview</span>
                            </button>
                        </div>
                    </div>

                    {/* Viewport Toggles */}
                    <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-2xl w-max mx-auto shadow-inner">
                        {[
                            { id: 'desktop', icon: Monitor, label: 'Desktop' },
                            { id: 'tablet', icon: Tablet, label: 'Tablet' },
                            { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                        ].map(({ id, icon: Icon, label }) => (
                            <button
                                key={id}
                                onClick={() => handleViewportChange(id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeViewport === id
                                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <Icon size={14} />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Viewport Stage */}
            <div className="flex-1 flex justify-center items-center overflow-auto custom-scrollbar perspective-1000 p-8">
                <div
                    className={`
                        bg-white dark:bg-slate-900 relative transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
                        shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                        overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800
                        ${viewportDimensions[activeViewport]}
                        ${activeViewport !== 'desktop' ? 'ring-[12px] ring-slate-900 dark:ring-slate-800' : ''}
                    `}
                >
                    {/* Device Notch for Mobile */}
                    {activeViewport === 'mobile' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 dark:bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
                            <div className="w-10 h-1 rounded-full bg-slate-800 dark:bg-slate-700" />
                            <div className="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-700" />
                        </div>
                    )}

                    <div className="flex-1 overflow-auto custom-scrollbar">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
