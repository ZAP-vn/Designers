
import React, { useEffect } from 'react';
import { MousePointerClick, Zap, ArrowRight } from 'lucide-react';
import { ThemeState } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';

interface ButtonRegistryProps {
    themeState: ThemeState;
    showClassNames?: boolean;
}

export const ButtonRegistry: React.FC<ButtonRegistryProps> = ({ themeState, showClassNames }) => {
    // Default fallback if themeState is missing (defensive)
    const baseTheme = themeState || {
        primary: '#7E22CE',
        secondary: '#F3E8FF',
        primaryBtnText: '#FFFFFF',
        secondaryBtnText: '#1C1C1E',
        tertiaryBtnText: '#7E22CE',
        borderRadius: 12,
        btnPaddingX: 24,
        btnPaddingY: 12,
        fontFamily: 'Inter',
        fillMode: 'solid',
        iconGap: 8,
        buttonHoverOpacity: 90
    };

    // Inject dynamic styles for hover state
    useEffect(() => {
        const styleId = 'button-registry-hover-styles';
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }

        const opacity = (baseTheme.buttonHoverOpacity !== undefined ? baseTheme.buttonHoverOpacity : 90) / 100;

        styleTag.innerHTML = `
            .btn-registry-hover:hover {
                opacity: ${opacity} !important;
            }
        `;
    }, [baseTheme.buttonHoverOpacity]);

    const styles = ['flat', 'soft', 'neo', 'glow'] as const;

    const getButtonStyle = (style: typeof styles[number], type: 'primary' | 'secondary' | 'tertiary') => {
        const isPrimary = type === 'primary';
        const isSecondary = type === 'secondary';

        let bg = isPrimary ? baseTheme.primary : isSecondary ? baseTheme.secondary : 'transparent';
        let color = isPrimary ? baseTheme.primaryBtnText : isSecondary ? baseTheme.secondaryBtnText : baseTheme.tertiaryBtnText;
        let border = type === 'tertiary' ? `1px solid ${baseTheme.tertiaryBtnText}` : '1px solid transparent';
        let shadow = 'none';

        if (style === 'soft') shadow = `0 4px 12px -2px ${bg}66`;
        if (style === 'neo') shadow = `3px 3px 0px ${type === 'secondary' ? baseTheme.primary + '99' : baseTheme.primary + '66'}`;
        if (style === 'glow') shadow = `0 0 12px 2px ${bg}80`;

        // Gradient logic matching the inspector
        if (baseTheme.fillMode === 'gradient' && isPrimary) {
            bg = `linear-gradient(${baseTheme.gradientAngle || 135}deg, ${baseTheme.primary} 0%, ${baseTheme.secondary} 100%)`;
        }

        return {
            background: bg,
            color: color,
            border,
            boxShadow: shadow,
            borderRadius: `${baseTheme.borderRadius}px`,
            padding: `${baseTheme.btnPaddingY}px ${baseTheme.btnPaddingX}px`,
            fontFamily: baseTheme.fontFamily,
            fontWeight: 600,
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: `${baseTheme.iconGap || 8}px`,
            cursor: 'pointer',
            transition: 'all 0.2s'
        };
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MousePointerClick size={20} className="text-purple-600" />
                    Button Standards
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">Available visual styles and states.</p>
            </div>

            <div className="space-y-12">
                {styles.map((style) => (
                    <ContainerDevWrapper
                        key={style}
                        showClassNames={showClassNames}
                        identity={{ displayName: `ButtonStyle_${style}`, type: "Variant Group", value: style, filePath: "components/views/ButtonRegistry.tsx" }}
                    >
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold uppercase tracking-wider text-gray-900">{style} Style</span>
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-mono">mode="{style}"</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 items-center">
                                {/* Primary */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Primary</span>
                                    <button className="btn-registry-hover" style={getButtonStyle(style, 'primary')}>
                                        Primary Action
                                    </button>
                                </div>

                                {/* Secondary */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Secondary</span>
                                    <button className="btn-registry-hover" style={getButtonStyle(style, 'secondary')}>
                                        Secondary
                                    </button>
                                </div>

                                {/* Tertiary */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Tertiary</span>
                                    <button className="btn-registry-hover" style={getButtonStyle(style, 'tertiary')}>
                                        Tertiary Link
                                    </button>
                                </div>

                                {/* With Icon */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">With Icon</span>
                                    <button className="btn-registry-hover" style={getButtonStyle(style, 'primary')}>
                                        <Zap size={16} fill="currentColor" />
                                        <span>Action</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ContainerDevWrapper>
                ))}
            </div>
        </div>
    );
};
