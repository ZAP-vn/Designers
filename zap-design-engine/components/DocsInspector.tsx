import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import {
    Palette, Type, Box, Sparkles, Layout, RefreshCw, ChevronDown, GripVertical,
    SlidersHorizontal, Code2, Copy, Check
} from 'lucide-react';
import { ThemeState, ProjectConfig, IconEntry, DocBlockType } from '../types';
import { DevBadge } from './InspectorCommon';
import { DevDocBanner, EnhancedDevContext } from './DevDocBanner';
import { InspectorHeader } from './InspectorHeader';

interface DocsInspectorProps {
    config: ProjectConfig;
    themeState: ThemeState;
    icons: IconEntry[];
    onRefreshAssets: () => void;
    showClassNames?: boolean;
    setShowClassNames?: (show: boolean) => void;
}

// --- Local Helpers ---

interface DraggableRefProps {
    type: DocBlockType;
    data: any;
    children: React.ReactNode;
    label: string;
}

const DraggableRef: React.FC<DraggableRefProps> = ({
    type,
    data,
    children,
    label
}) => {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('application/json', JSON.stringify({ type, data }));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing border border-transparent hover:border-gray-200 transition-all"
        >
            <div className="text-gray-300 group-hover:text-gray-400">
                <GripVertical size={14} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{label}</p>
            </div>
            <div className="pointer-events-none opacity-80 scale-75 origin-right">
                {children}
            </div>
        </div>
    );
};

interface AccordionProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    icon: Icon,
    children,
    defaultOpen = false
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Icon size={16} className="text-gray-400" />
                    <span>{title}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="px-4 pb-4 space-y-1">{children}</div>}
        </div>
    );
};

const DocsInspector: React.FC<DocsInspectorProps> = ({ config, themeState, icons, onRefreshAssets, showClassNames, setShowClassNames }) => {
    const [inspectorView, setInspectorView] = useState<'controls' | 'code'>('controls');
    const [jsonCopied, setJsonCopied] = useState(false);

    // Defensive Default
    const safeTheme = themeState || {
        primary: '#7E22CE',
        secondary: '#F3E8FF',
        primaryBtnText: '#FFFFFF',
        secondaryBtnText: '#1C1C1E',
        tertiaryBtnText: '#7E22CE',
        background: '#FFFFFF',
        background2: '#F9FAFB',
        background3: '#F3F4F6',
        darkText: '#1C1C1E',
        grayText: '#8E8E93',
        lightText: '#FFFFFF',
        borderRadius: 16,
        fillMode: 'solid',
        gradientAngle: 135
    };

    const typographyList = config.generatedContent?.typography?.items || [];
    const colorKeys = [
        'primary', 'secondary',
        'background', 'background2', 'background3',
        'darkText', 'grayText', 'lightText',
        'primaryBtnText', 'secondaryBtnText', 'tertiaryBtnText'
    ] as const;

    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(safeTheme, null, 2));
        setJsonCopied(true);
        setTimeout(() => setJsonCopied(false), 2000);
    };

    const devContext: EnhancedDevContext = {
        identity: {
            displayName: "DocsInspector",
            filePath: "components/DocsInspector.tsx",
            parentComponent: "App",
            type: "Region/Zone", // Level 4: Zone
            htmlTag: "aside"
        },
        state: {
            sourceVar: "themeState",
            dataType: "ThemeState",
            handlerProp: "onRefreshAssets",
            currentValuePreview: "Assets Directory"
        },
        styling: {
            tailwindClasses: "p-6",
            themeTokens: ["primary"]
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors duration-300">
            {/* Standard Inspector Header */}
            <InspectorHeader
                title="Documentation"
                badge="Controller"
                showClassNames={showClassNames as boolean}
                setShowClassNames={setShowClassNames}
                showInspectorToggle={false}
                viewMode={inspectorView}
                setViewMode={setInspectorView}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar">

                {inspectorView === 'code' ? (
                    <div className="h-full flex flex-col animate-in fade-in duration-300 p-6">
                        <DevDocBanner
                            visible={true}
                            devContext={{ ...devContext, identity: { ...devContext.identity, displayName: "Source View" } }}
                            context="controller"
                        />
                        <div className="flex-1 relative rounded-xl border overflow-hidden group bg-gray-50 border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={handleCopyJson}
                                    className="p-2 rounded-lg transition-colors bg-white text-gray-500 hover:text-gray-700 shadow-sm border border-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:text-white"
                                >
                                    {jsonCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                </button>
                            </div>
                            <div className="absolute inset-0 overflow-auto p-4 custom-scrollbar">
                                <pre className="text-[10px] font-mono leading-relaxed text-gray-600 dark:text-blue-300">
                                    {JSON.stringify(safeTheme, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-6 pb-2">
                            <DevDocBanner visible={!!showClassNames} devContext={devContext} context="controller" />
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-bold text-gray-900">Draggable Assets</h3>
                                <button
                                    onClick={onRefreshAssets}
                                    className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
                                    title="Refresh Assets"
                                >
                                    <RefreshCw size={12} /> Sync
                                </button>
                            </div>
                        </div>

                        {/* Colors Accordion */}
                        <Accordion title="Colors" icon={Palette} defaultOpen>
                            {colorKeys.map(role => (
                                <DraggableRef key={role} type="color" data={{ role }} label={role.replace(/([A-Z])/g, ' $1').replace('Btn', ' Button').trim().replace(/^\w/, c => c.toUpperCase())}>
                                    <div className="w-6 h-6 rounded-md shadow-sm border border-black/5" style={{ backgroundColor: (safeTheme as any)[role] }} />
                                </DraggableRef>
                            ))}
                        </Accordion>

                        {/* Typography Accordion */}
                        <Accordion title="Typography" icon={Type}>
                            {typographyList.map((item, idx) => (
                                <DraggableRef key={idx} type="typography" data={item} label={item.name}>
                                    <div className="w-6 h-6 bg-gray-100 rounded text-[10px] flex items-center justify-center font-bold text-gray-500">Aa</div>
                                </DraggableRef>
                            ))}
                        </Accordion>

                        {/* Components Accordion */}
                        <Accordion title="Components" icon={Box} defaultOpen>
                            <DraggableRef type="button" data={{ type: 'primary', label: 'Primary Action' }} label="Primary Button">
                                <div className="w-8 h-5 rounded bg-gray-900" style={{ backgroundColor: safeTheme.primary }} />
                            </DraggableRef>
                            <DraggableRef type="button" data={{ type: 'secondary', label: 'Secondary Action' }} label="Secondary Button">
                                <div className="w-8 h-5 rounded bg-gray-200" style={{ backgroundColor: safeTheme.secondary }} />
                            </DraggableRef>
                            <DraggableRef type="button" data={{ type: 'tertiary', label: 'Tertiary Action' }} label="Tertiary Button">
                                <div className="w-8 h-5 rounded border border-gray-300" />
                            </DraggableRef>
                            <DraggableRef type="button" data={{ type: 'text', label: 'Text Link' }} label="Text Button">
                                <div className="w-8 h-5 rounded border border-dashed border-gray-300" />
                            </DraggableRef>
                            <DraggableRef type="divider" data={{}} label="Divider Line">
                                <div className="w-8 h-px bg-gray-300" />
                            </DraggableRef>
                            <div className="pt-2 px-2 pb-1 text-[10px] text-gray-400 font-medium">Showcases</div>
                            <DraggableRef type="component" data={{ subtype: 'button-showcase' }} label="Button Showcase">
                                <div className="w-8 h-5 rounded border border-dashed border-gray-300 bg-gray-50" />
                            </DraggableRef>
                            <DraggableRef type="component" data={{ subtype: 'icon-grid', icons }} label="Icon Grid">
                                <div className="w-8 h-5 rounded border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"><Layout size={10} className="text-gray-400" /></div>
                            </DraggableRef>
                        </Accordion>

                        {/* Icons Accordion */}
                        <Accordion title="Icons" icon={Sparkles}>
                            <div className="grid grid-cols-4 gap-2 px-2">
                                {icons.map((iconEntry, i) => {
                                    const IconComp = (LucideIcons as any)[iconEntry.iconName] || LucideIcons.Star;
                                    return (
                                        <div
                                            key={iconEntry.id}
                                            draggable
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData('application/json', JSON.stringify({
                                                    type: 'icon',
                                                    data: {
                                                        name: iconEntry.name,
                                                        iconName: iconEntry.iconName,
                                                        type: iconEntry.type,
                                                        svgContent: iconEntry.svgContent
                                                    }
                                                }));
                                                e.dataTransfer.effectAllowed = 'copy';
                                            }}
                                            className="aspect-square flex items-center justify-center bg-gray-50 rounded-md hover:bg-gray-100 cursor-grab border border-transparent hover:border-gray-200"
                                            title={iconEntry.name}
                                        >
                                            {iconEntry.type === 'custom' && iconEntry.svgContent ? (
                                                <div
                                                    className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full text-gray-600"
                                                    dangerouslySetInnerHTML={{ __html: iconEntry.svgContent }}
                                                />
                                            ) : (
                                                <IconComp size={20} className="text-gray-600" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </Accordion>
                    </>
                )}
            </div>

            {inspectorView === 'controls' && (
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center">
                    Drag items to the canvas to embed
                </div>
            )}
        </div>
    );
};

export default DocsInspector;