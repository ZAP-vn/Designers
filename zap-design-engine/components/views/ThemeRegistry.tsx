
import React from 'react';
import { Palette } from 'lucide-react';
import { THEME_PRESETS } from '../themePresets';
import { ContainerDevWrapper } from '../DevDocBanner';

interface ThemeRegistryProps {
    showClassNames?: boolean;
}

export const ThemeRegistry: React.FC<ThemeRegistryProps> = ({ showClassNames }) => (
    <div className="p-8 h-full overflow-y-auto">
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Palette size={20} className="text-purple-600" />
                Theme Registry
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1">export const THEME_PRESETS = [...]</p>
        </div>

        <ContainerDevWrapper
            showClassNames={showClassNames}
            identity={{ displayName: "ThemePresetsList", type: "List", value: "Theme Objects", filePath: "components/themePresets.ts" }}
        >
            <div className="grid grid-cols-1 gap-4">
                {THEME_PRESETS.map((theme) => (
                    <div key={theme.id} className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-gray-900">{theme.name}</h4>
                            <div className="text-right">
                                <span className="text-[10px] font-mono text-gray-400 block">{theme.id}</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">{theme.description}</p>
                        <div className="flex gap-2 h-12 rounded-lg overflow-hidden border border-black/5">
                            <div className="flex-1 flex flex-col justify-end p-2 text-[10px] font-bold text-white/90" style={{ backgroundColor: theme.colors.primary }}>Primary</div>
                            <div className="flex-1 flex flex-col justify-end p-2 text-[10px] font-bold text-gray-900/50" style={{ backgroundColor: theme.colors.secondary }}>Secondary</div>
                            <div className="flex-1 flex flex-col justify-end p-2 text-[10px] font-bold text-gray-900/50" style={{ backgroundColor: theme.colors.background }}>Bg</div>
                            <div className="flex-1 flex flex-col justify-end p-2 text-[10px] font-bold text-gray-900/50" style={{ backgroundColor: theme.colors.background2 }}>Surface</div>
                        </div>
                        {showClassNames && (
                            <div className="mt-4 pt-3 border-t border-gray-50">
                                <code className="text-[9px] text-gray-400 font-mono break-all">
                                    {JSON.stringify(theme.colors).substring(0, 100)}...
                                </code>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ContainerDevWrapper>
    </div>
);
