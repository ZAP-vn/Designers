import React from 'react';
import { ContainerDevWrapper } from '../DevDocBanner';

interface TypographyColumnProps {
    title: string;
    description: string;
    fontFamily: string;
    children: React.ReactNode;
    showDevMode?: boolean;
    className?: string;
}

/**
 * MOLECULE: TypographyColumn
 * Groups a set of specimens and provides higher-level context
 * about a specific font family used in the system.
 */
export const TypographyColumn: React.FC<TypographyColumnProps> = ({
    title,
    description,
    fontFamily,
    children,
    showDevMode = false,
    className = ""
}) => {
    return (
        <ContainerDevWrapper
            showClassNames={showDevMode}
            identity={{
                displayName: title.replace(/\s+/g, ''),
                type: "Molecule/Part", // Level 6: Part
                filePath: "components/molecules/TypographyColumn.tsx",
                architecture: "SYSTEMS // FONT FAMILY"
            }}
            atomic="Molecule"
            className={`flex-1 ${className}`}
        >
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4" style={{ fontFamily }}>
                {title}
            </div>
            <div className="text-6xl text-[#0F172A] mb-6" style={{ fontFamily }}>
                {fontFamily}
            </div>
            <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-md" style={{ fontFamily: 'inherit' }}>
                {description}
            </p>

            <div className="space-y-8">
                {children}
            </div>
        </ContainerDevWrapper>
    );
};
