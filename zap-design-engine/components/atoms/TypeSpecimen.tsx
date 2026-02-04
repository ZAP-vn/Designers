import React from 'react';
import { ContainerDevWrapper } from '../DevDocBanner';

interface TypeSpecimenProps {
    label: string;
    variantName: string;
    fontSize: string;
    fontFamily: string;
    color?: string;
    fontWeight?: string | number;
    text?: string;
    className?: string;
    showDevMode?: boolean;
}

/**
 * ATOM: TypeSpecimen
 * Foundational unit for typography. Displays a single text variant
 * with its associated metadata and Dev Mode context.
 */
export const TypeSpecimen: React.FC<TypeSpecimenProps> = ({
    label,
    variantName,
    fontSize,
    fontFamily,
    color,
    fontWeight = 'normal',
    text = "The quick brown fox jumps over the lazy dog.",
    className = "",
    showDevMode = false
}) => {
    return (
        <ContainerDevWrapper
            showClassNames={showDevMode}
            identity={{
                displayName: label,
                type: "Atom/Token", // Level 7: Token
                filePath: "components/atoms/TypeSpecimen.tsx",
                architecture: "SYSTEMS // VARIANT"
            }}
            atomic="Atom"
            className={`group/specimen ${className}`}
        >
            <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                {showDevMode && (
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded opacity-0 group-hover/specimen:opacity-100 transition-opacity">
                        {fontSize} // {fontWeight}
                    </span>
                )}
            </div>

            <div
                style={{
                    fontFamily,
                    fontSize,
                    color,
                    fontWeight,
                    lineHeight: 1.2
                }}
                className="transition-all duration-300"
            >
                {variantName}: {text}
            </div>
        </ContainerDevWrapper>
    );
};
