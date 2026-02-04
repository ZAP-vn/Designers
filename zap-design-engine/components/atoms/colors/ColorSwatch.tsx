
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface ColorSwatchProps {
    hex: string;
    name: string;
    usage?: string;
    variable?: string;
    showDevMode?: boolean;
    themeState?: any;
}

/**
 * ATOM: ColorSwatch
 * The fundamental unit of the Color System.
 * Responsible for displaying a single color and its metadata.
 */
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
    hex,
    name,
    usage,
    variable,
    showDevMode = false,
    themeState
}) => {
    const [copied, setCopied] = useState(false);

    const radius = themeState?.borderRadius ?? 16;
    const padding = (themeState?.layoutGap ?? 32) * 0.625;
    const shadowDepth = themeState?.depth ?? 1;

    const handleCopy = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to determine text contrast color based on background brightness
    const getContrastText = (color: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color || '#000000');
        if (!result) return 'text-gray-900';
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155 ? 'text-gray-900' : 'text-white';
    };

    // Helper to convert hex to RGB
    const hexToRgb = (color: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color || '#000000');
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
    };

    const textColorClass = getContrastText(hex);

    return (
        <div className="flex flex-col group animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* The Colorful Block */}
            <div
                onClick={handleCopy}
                className={`
                    aspect-square relative cursor-pointer
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 active:scale-95 border border-black/5 flex flex-col justify-between overflow-hidden
                `}
                style={{
                    backgroundColor: hex,
                    boxShadow: copied
                        ? `0 0 0 4px ${hex}40`
                        : `0 ${4 * shadowDepth}px ${8 * shadowDepth}px ${hex === '#FFFFFF' ? '#00000010' : hex + '30'}`,
                    borderRadius: `${radius}px`,
                    padding: `${padding}px`,
                    marginBottom: `${(themeState?.layoutGap ?? 32) * 0.5}px`
                }}
            >
                {/* Subtle Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`flex flex-col ${textColorClass} relative z-10 space-y-0.5`}>
                    <span className="text-sm font-bold tracking-tight leading-none w-min">
                        {name}
                    </span>
                </div>

                <div className="flex items-center justify-between relative z-10 mt-auto">
                    {variable && showDevMode && (
                        <div className="bg-black/20 backdrop-blur-md rounded-md px-2 py-1 text-[9px] font-mono text-white/90 border border-white/10">
                            var(--{variable})
                        </div>
                    )}
                    <div className={`${textColorClass} opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 ml-auto`}>
                        {copied ? <Check size={16} /> : <Copy size={16} className="opacity-70" />}
                    </div>
                </div>
            </div>

            {/* Metadata Footer */}
            <div className="px-1 space-y-1.5 transition-colors group-hover:text-gray-900">
                {usage && (
                    <div className="mb-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block leading-tight">
                            {usage}
                        </span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 tracking-wider uppercase tabular-nums">
                        {hex}
                    </span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        RGB: {hexToRgb(hex)}
                    </span>
                    {showDevMode && (
                        <span className="text-[9px] font-medium text-gray-300 font-mono tracking-tight underline decoration-gray-200/50 underline-offset-4">
                            ATOM // COLOR_PRIMITIVE
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
