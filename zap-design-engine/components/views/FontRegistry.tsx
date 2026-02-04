
import React from 'react';
import { Type } from 'lucide-react';
import { FONT_PRESETS } from '../fontPresets';
import { ContainerDevWrapper } from '../DevDocBanner';

interface FontRegistryProps {
    showClassNames?: boolean;
}

export const FontRegistry: React.FC<FontRegistryProps> = ({ showClassNames }) => {
    // Load google fonts for preview
    React.useEffect(() => {
        FONT_PRESETS.forEach(font => {
            if (font.source === 'google') {
                const linkId = `font-preview-${font.id}`;
                if (!document.getElementById(linkId)) {
                    const link = document.createElement('link');
                    link.id = linkId;
                    link.rel = 'stylesheet';
                    link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
                    document.head.appendChild(link);
                }
            }
        });
    }, []);

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Type size={20} className="text-purple-600" />
                    Font Registry
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">export const FONT_PRESETS = [...]</p>
            </div>

            <ContainerDevWrapper
                showClassNames={showClassNames}
                identity={{ displayName: "FontList", type: "List", value: "Google Fonts", filePath: "components/fontPresets.ts" }}
            >
                <div className="space-y-4">
                    {FONT_PRESETS.map((font) => (
                        <div key={font.id} className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900" style={{ fontFamily: font.family }}>{font.name}</h4>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide">{font.category}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-mono text-gray-300">{font.source}</span>
                                    {showClassNames && (
                                        <span className="text-[9px] text-blue-500 font-mono mt-1 bg-blue-50 px-1 rounded">
                                            family: "{font.family}"
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-2xl text-gray-700 truncate" style={{ fontFamily: font.family }}>
                                The quick brown fox jumps over the lazy dog.
                            </p>
                        </div>
                    ))}
                </div>
            </ContainerDevWrapper>
        </div>
    );
};
