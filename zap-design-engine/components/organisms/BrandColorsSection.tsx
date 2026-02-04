
import React from 'react';
import { ThemeState } from '../../types';
import { ColorPaletteGrid } from '../molecules/colors/ColorPaletteGrid';
import { ContainerDevWrapper } from '../DevDocBanner';

interface BrandColorsSectionProps {
    themeState: ThemeState;
    showDevMode?: boolean;
}

/**
 * ORGANISM: BrandColorsSection
 * A complex section formed by molecules and atoms.
 * Responsible for managing the color data and providing section context.
 */
export const BrandColorsSection: React.FC<BrandColorsSectionProps> = ({
    themeState,
    showDevMode = false
}) => {
    // Map Full Color System with separated Name and Usage
    // Logic extracted from the original monolithic view
    const colors = [
        // Brand Identity
        { name: 'Primary', usage: 'Brand Identity', hex: themeState.primary, category: 'Brand Identity', var: 'primary' },
        { name: 'Secondary', usage: 'Brand Identity', hex: themeState.secondary, category: 'Brand Identity', var: 'secondary' },

        // Surfaces
        { name: 'Background', usage: 'Page (L1)', hex: themeState.background, category: 'Surfaces', var: 'background' },
        { name: 'Surface', usage: 'Card (L2)', hex: themeState.background2, category: 'Surfaces', var: 'surface-2' },
        { name: 'Surface', usage: 'Input (L3)', hex: themeState.background3, category: 'Surfaces', var: 'surface-3' },

        // Typography
        { name: 'Dark Text', usage: 'Headings', hex: themeState.darkText, category: 'Typography', var: 'text-dark' },
        { name: 'Gray Text', usage: 'Body', hex: themeState.grayText, category: 'Typography', var: 'text-gray' },
        { name: 'Light Text', usage: 'Inverse', hex: themeState.lightText, category: 'Typography', var: 'text-light' },

        // Interactive & Status
        { name: 'Active', usage: 'Focus Ring', hex: themeState.activeColor || themeState.primary, category: 'Interactive', var: 'active-color' },
        { name: 'Error', usage: 'Destructive', hex: themeState.formErrorColor || '#EF4444', category: 'Interactive', var: 'status-error' },
        { name: 'Border', usage: 'UI Elements', hex: themeState.inputBorder || '#E5E7EB', category: 'Interactive', var: 'ui-border' },

        // Button Specifics
        { name: 'Primary Text', usage: 'Button', hex: themeState.primaryBtnText, category: 'Component Specific', var: 'btn-text-primary' },
        { name: 'Secondary Text', usage: 'Button', hex: themeState.secondaryBtnText, category: 'Component Specific', var: 'btn-text-secondary' },
        { name: 'Tertiary', usage: 'Icon / Link', hex: themeState.tertiaryBtnText, category: 'Component Specific', var: 'btn-text-tertiary' },
    ];

    return (
        <ContainerDevWrapper
            showClassNames={showDevMode}
            className="mb-24"
            atomic="Organism"
            identity={{
                displayName: "BrandColorsSection",
                filePath: "components/organisms/BrandColorsSection.tsx",
                parentComponent: "BrandColorsPage",
                type: "Organism/Block", // Level 5: Block
                architecture: "SYSTEMS // PALETTE"
            }}
        >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 relative">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: themeState.fontFamily }}>
                        01 // Color System
                    </h3>
                    <p className="text-[10px] text-gray-300 font-medium">DEFINING THE VISUAL SPECTRUM AND SURFACE HIERARCHY</p>
                </div>
                {showDevMode && (
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-tighter bg-gray-50 px-2 py-0.5 rounded border border-gray-100 italic">
                            Organism Layer
                        </span>
                        <span className="text-[9px] font-mono text-gray-200 mt-1">{colors.length} ACTIVE_SWATCHES</span>
                    </div>
                )}
            </div>

            <ColorPaletteGrid colors={colors} showDevMode={showDevMode} themeState={themeState} />
        </ContainerDevWrapper>
    );
};
