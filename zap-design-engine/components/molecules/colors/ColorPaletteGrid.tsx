
import React from 'react';
import { ColorSwatch } from '../../atoms/colors/ColorSwatch';
import { ContainerDevWrapper } from '../../DevDocBanner';

interface ColorEntry {
    name: string;
    usage: string;
    hex: string;
    var: string;
    category: string;
}

interface ColorPaletteGridProps {
    colors: ColorEntry[];
    showDevMode?: boolean;
    themeState?: any;
}

/**
 * MOLECULE: ColorPaletteGrid
 * A group of ColorSwatch atoms working together.
 * Responsible for the layout and arrangement of colors.
 */
export const ColorPaletteGrid: React.FC<ColorPaletteGridProps> = ({
    colors,
    showDevMode = false,
    themeState
}) => {
    return (
        <ContainerDevWrapper
            showClassNames={showDevMode}
            className="w-full"
            atomic="Molecule"
            identity={{
                displayName: "ColorPaletteGrid",
                type: "Organism/System",
                filePath: "components/molecules/colors/ColorPaletteGrid.tsx",
            }}
        >
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                style={{ gap: `${themeState?.layoutGap || 32}px` }}
            >
                {colors.map((color, idx) => (
                    <ColorSwatch
                        key={`${color.name}-${idx}`}
                        hex={color.hex}
                        name={color.name}
                        usage={color.usage}
                        variable={color.var}
                        showDevMode={showDevMode}
                        themeState={themeState}
                    />
                ))}
            </div>
        </ContainerDevWrapper>
    );
};
