import React from 'react';
import { ThemeState, ProjectConfig } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';
import { TypographyColumn } from '../molecules/TypographyColumn';
import { TypeSpecimen } from '../atoms/TypeSpecimen';

interface TypographySectionProps {
    themeState: ThemeState;
    config: ProjectConfig;
    showDevMode?: boolean;
}

/**
 * ORGANISM: TypographySection
 * The complete Typography functional block. Managed high-level orchestrations,
 * data mapping from config, and theme-aware rendering.
 */
export const TypographySection: React.FC<TypographySectionProps> = ({
    themeState,
    config,
    showDevMode = false
}) => {
    const secondaryFont = themeState.secondaryFontFamily || themeState.fontFamily;

    // Helper to get dynamic font size from config
    const getFontSize = (namePart: string, fallback: string) => {
        const items = config.generatedContent?.typography?.items || [];
        const item = items.find(i => i.name.toLowerCase().includes(namePart.toLowerCase()));
        return item ? item.size : fallback;
    };

    return (
        <ContainerDevWrapper
            showClassNames={showDevMode}
            identity={{
                displayName: "TypographySection",
                filePath: "components/organisms/TypographySection.tsx",
                parentComponent: "BrandColorsPage",
                type: "Organism/Block", // Level 5: Block
                architecture: "SYSTEMS // TYPEFACE"
            }}
            atomic="Organism"
            className="relative"
        >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 relative">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em]" style={{ fontFamily: themeState.fontFamily }}>
                    Typography
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Primary Font Column */}
                <TypographyColumn
                    title="Primary Font"
                    description="The primary font is your default typeface & should be used within headers & titles."
                    fontFamily={themeState.fontFamily}
                    showDevMode={showDevMode}
                >
                    <TypeSpecimen
                        label="Heading H1"
                        variantName="H1"
                        fontSize={getFontSize('H1', '36px')}
                        fontFamily={themeState.fontFamily}
                        fontWeight="bold"
                        showDevMode={showDevMode}
                    />
                    <TypeSpecimen
                        label="Heading H2"
                        variantName="H2"
                        fontSize={getFontSize('H2', '30px')}
                        fontFamily={themeState.fontFamily}
                        fontWeight="bold"
                        showDevMode={showDevMode}
                    />
                    <TypeSpecimen
                        label="Heading H3"
                        variantName="H3"
                        fontSize={getFontSize('H3', '24px')}
                        fontFamily={themeState.fontFamily}
                        fontWeight="bold"
                        showDevMode={showDevMode}
                    />
                    <TypeSpecimen
                        label="Heading H4"
                        variantName="H4"
                        fontSize={getFontSize('H4', '20px')}
                        fontFamily={themeState.fontFamily}
                        fontWeight="semibold"
                        showDevMode={showDevMode}
                    />
                </TypographyColumn>

                {/* Secondary Font Column */}
                <TypographyColumn
                    title="Secondary Font"
                    description="The secondary font compliments your primary font. This will be used on subheadings and UI elements."
                    fontFamily={secondaryFont}
                    showDevMode={showDevMode}
                >
                    <TypeSpecimen
                        label="Paragraph"
                        variantName="Body Copy"
                        fontSize={getFontSize('Paragraph', '14px')}
                        fontFamily={secondaryFont}
                        text={`${secondaryFont} is used here for body copy, ensuring readability across various screen sizes.`}
                        showDevMode={showDevMode}
                    />
                    <TypeSpecimen
                        label="Caption"
                        variantName="Caption"
                        fontSize={getFontSize('Caption', '12px')}
                        fontFamily={secondaryFont}
                        text="IMAGE COURTESY OF BRAND STUDIO."
                        fontWeight="bold"
                        className="uppercase tracking-wide"
                        showDevMode={showDevMode}
                    />
                    <TypeSpecimen
                        label="Label"
                        variantName="UI Label"
                        fontSize={getFontSize('Label', '14px')}
                        fontFamily={secondaryFont}
                        text="Brand Colors"
                        fontWeight="bold"
                        showDevMode={showDevMode}
                    />
                </TypographyColumn>
            </div>
        </ContainerDevWrapper>
    );
};
