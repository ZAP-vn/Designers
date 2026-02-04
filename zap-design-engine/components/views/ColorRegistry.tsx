
import React, { useState } from 'react';
import { Palette, Pipette, Check, Copy } from 'lucide-react';
import ColorPicker from '../ColorPicker';
import { COLOR_PRESETS } from '../colorPresets';
import { ContainerDevWrapper } from '../DevDocBanner';

interface ColorRegistryProps {
    showClassNames?: boolean;
}

export const ColorRegistry: React.FC<ColorRegistryProps> = ({ showClassNames }) => {
    const [demoColor, setDemoColor] = useState('#7E22CE');
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const handleCopy = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <ContainerDevWrapper
                showClassNames={showClassNames}
                identity={{ displayName: "ColorPickerDemo", type: "Interactive Component", value: "Demo", filePath: "components/views/ColorRegistry.tsx" }}
                className="mb-8"
            >
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                            <Pipette size={16} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Interactive Picker</h4>
                            <p className="text-xs text-gray-500">Test the color picker component.</p>
                        </div>
                    </div>
                    <div className="max-w-xs">
                        <ColorPicker
                            label="Demo Input"
                            value={demoColor}
                            onChange={setDemoColor}
                        />
                    </div>
                </div>
            </ContainerDevWrapper>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Palette size={20} className="text-purple-600" />
                    Preset Library
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">export const COLOR_PRESETS = [...]</p>
            </div>

            <ContainerDevWrapper
                showClassNames={showClassNames}
                identity={{ displayName: "ColorPresetsGrid", type: "Data Grid", value: `${COLOR_PRESETS.length} items`, filePath: "components/colorPresets.ts" }}
            >
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {COLOR_PRESETS.map((color, idx) => (
                        <div key={idx} className="group flex flex-col gap-1.5">
                            <button
                                className="w-full aspect-square rounded-lg shadow-sm border border-gray-100 transition-transform group-hover:scale-105 cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                style={{ backgroundColor: color }}
                                onClick={() => { setDemoColor(color); handleCopy(color); }}
                                title="Click to copy & set demo"
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    {copiedColor === color ? (
                                        <Check size={20} className="text-white drop-shadow-md animate-in zoom-in" />
                                    ) : (
                                        <Copy size={20} className="text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            </button>
                            <span className="text-[10px] font-mono text-gray-400 text-center uppercase group-hover:text-gray-900 transition-colors select-all">
                                {color}
                            </span>
                        </div>
                    ))}
                </div>
            </ContainerDevWrapper>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
                Total items: {COLOR_PRESETS.length}
            </div>
        </div>
    );
};
