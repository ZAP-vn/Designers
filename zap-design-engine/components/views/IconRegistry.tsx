
import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ICON_PRESETS } from '../iconPresets';
import { ContainerDevWrapper } from '../DevDocBanner';

interface IconRegistryProps {
    showClassNames?: boolean;
}

export const IconRegistry: React.FC<IconRegistryProps> = ({ showClassNames }) => (
    <div className="p-8 h-full overflow-y-auto">
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" />
                Icon Registry
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1">export const ICON_PRESETS = [...] (Top 100 Lucide)</p>
        </div>

        <ContainerDevWrapper
            showClassNames={showClassNames}
            identity={{ displayName: "IconPresetsGrid", type: "Grid", value: "Lucide Icons", filePath: "components/iconPresets.ts" }}
        >
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {ICON_PRESETS.map((icon) => {
                    const IconComp = (LucideIcons as any)[icon.iconName] || HelpCircle;
                    return (
                        <div key={icon.id} className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group aspect-square relative" title={icon.name}>
                            <IconComp size={20} className="text-gray-400 group-hover:text-purple-600 mb-2" />
                            <span className="text-[9px] font-medium text-gray-500 group-hover:text-purple-900 truncate w-full text-center">{icon.name}</span>
                            {showClassNames && (
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/70 text-white text-[8px] px-1 rounded font-mono">
                                    {icon.iconName}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </ContainerDevWrapper>
    </div>
);
