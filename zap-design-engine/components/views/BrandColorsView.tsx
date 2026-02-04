
import React, { useState } from 'react';
import { ThemeState, ProjectConfig } from '../../types';
import { MousePointerClick, Check, Copy, Code2, AlertCircle } from 'lucide-react';
import { ContainerDevWrapper } from '../DevDocBanner';
import { BrandColorsSection } from '../organisms/BrandColorsSection';
import { ZAPDevHub } from '../organisms/ZAPDevHub';

import { TypographySection } from '../organisms/TypographySection';

interface BrandColorsViewProps {
    themeState: ThemeState;
    config: ProjectConfig;
    setThemeState?: (theme: ThemeState) => void;
    showClassNames?: boolean;
}

export const BrandColorsView: React.FC<BrandColorsViewProps> = ({ themeState, config, showClassNames }) => {

    const secondaryFont = themeState.secondaryFontFamily || themeState.fontFamily;

    return (
        <div className="relative w-full">
            <ZAPDevHub visible={showClassNames} />

            <ContainerDevWrapper
                showClassNames={showClassNames}
                className="w-full bg-white transition-all duration-300 shadow-sm border border-gray-100 max-w-[1400px] mx-auto animate-in fade-in duration-500 relative"
                style={{
                    padding: `${themeState.sectionPadding || 48}px`,
                    borderRadius: `calc(${themeState.borderRadius}px * 2.5)`
                }}
                identity={{
                    displayName: "BrandColorsPage",
                    filePath: "components/views/BrandColorsView.tsx",
                    parentComponent: "UiKitSection",
                    type: "Organism/Block",
                    architecture: "SYSTEMS // THEME ENGINE"
                }}
            >
                <div className="relative" style={{ display: 'flex', flexDirection: 'column', gap: `${themeState.sectionPadding || 48}px` }}>
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{
                            displayName: "BrandHeader",
                            filePath: "components/views/BrandColorsView.tsx",
                            parentComponent: "BrandColorsPage",
                            type: "Molecule/Part",
                            architecture: "ARCHITECTURE // SYSTEMS // PROTOCOL"
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative group/header border-b border-gray-100 pb-8"
                    >
                        <div>
                            <h1 className="text-6xl font-normal text-[#0F172A] leading-tight" style={{ fontFamily: themeState.fontFamily }}>
                                Brand<br />Guidelines
                            </h1>
                        </div>

                        <div className="flex flex-col md:items-end gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 w-fit">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live System</span>
                            </div>
                            <p className="text-xl text-gray-400 font-medium tracking-wide text-right" style={{ fontFamily: secondaryFont }}>
                                Version {config.version || '1.0'} — {config.projectName || 'Orbit Financial'}
                            </p>
                        </div>
                    </ContainerDevWrapper>

                    {/* Color System Organism */}
                    <BrandColorsSection themeState={themeState} showDevMode={showClassNames} />

                    {/* Typography System Organism */}
                    <TypographySection
                        themeState={themeState}
                        config={config}
                        showDevMode={showClassNames}
                    />
                </div>
            </ContainerDevWrapper>
        </div>
    );
};

