import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, MousePointerClick, Check, Copy, Code2 } from 'lucide-react';
import { ThemeState, IconEntry } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';
import { InspectorHeader } from '../InspectorHeader';

interface IconsGridViewProps {
    icons: IconEntry[];
    themeState: ThemeState;
    onSelectIcon?: (icon: IconEntry) => void;
    showClassNames?: boolean;
}

// Reusing DevWrapper inline for simplicity in view components
const IconGridDevWrapper = ({ children, showClassNames, componentName, stateVar }: any) => {
    const [copied, setCopied] = useState(false);
    if (!showClassNames) return <>{children}</>;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        const snippet = `"displayName": "${componentName}", "filePath": "components/views/IconsGridView.tsx", "parentComponent": "IconsGridView" I want to ....`;
        navigator.clipboard.writeText(snippet);
        setCopied(true); setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group p-2 border border-dashed border-pink-400 bg-pink-50/10 rounded-xl">
            <div
                className="absolute -top-3 left-3 px-2 py-0.5 bg-pink-100 border border-pink-300 text-pink-700 text-[10px] font-mono font-bold rounded shadow-sm z-20 flex items-center gap-2 cursor-pointer hover:bg-pink-200 transition-colors"
                onClick={handleCopy}
            >
                <MousePointerClick size={10} className="opacity-50" />
                <span className="opacity-90">{componentName}</span>
                <span className="opacity-40">|</span>
                <span>{stateVar}</span>
                {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} className="opacity-50" />}
            </div>
            {children}
        </div>
    );
};

export const IconsGridView: React.FC<IconsGridViewProps> = ({ icons, themeState, onSelectIcon, showClassNames }) => {
    const [search, setSearch] = useState('');

    const filteredIcons = icons.filter(icon =>
        icon.name.toLowerCase().includes(search.toLowerCase()) ||
        icon.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col">
            <InspectorHeader
                title="Icon Library"
                badge="Asset System"
                showClassNames={!!showClassNames}
            >
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search icons..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none transition-all focus:border-purple-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </InspectorHeader>

            <div className="pt-6 px-6">
                <div className="mb-6">
                    <p className="text-gray-500">System icons available for use in your project.</p>
                </div>
            </div>

            <div className="pt-6">
                <ContainerDevWrapper
                    showClassNames={showClassNames}
                    identity={{ displayName: "IconsGrid", type: "Card/Container", value: "Icon Matrix", filePath: "components/views/IconsGridView.tsx" }}
                >
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 pb-20">
                        {filteredIcons.map((icon) => {
                            const IconComp = (LucideIcons as any)[icon.iconName] || LucideIcons.HelpCircle;

                            return (
                                <button
                                    key={icon.id}
                                    onClick={() => onSelectIcon?.(icon)}
                                    className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group aspect-square hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    {icon.type === 'custom' && icon.svgContent ? (
                                        <div
                                            className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full text-gray-500 group-hover:text-gray-900 transition-colors"
                                            dangerouslySetInnerHTML={{ __html: icon.svgContent }}
                                        />
                                    ) : (
                                        <IconComp size={24} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                                    )}
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 truncate w-full text-center">
                                        {icon.name}
                                    </span>
                                </button>
                            );
                        })}

                        {filteredIcons.length === 0 && (
                            <div className="col-span-full py-20 text-center text-gray-400">
                                No icons found matching "{search}"
                            </div>
                        )}
                    </div>
                </ContainerDevWrapper>
            </div>
        </div>
    );
};