
import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import {
    Plus, GripVertical, Trash2, Zap, ArrowRight, Layout, Hash, Tag, Code2
} from 'lucide-react';
import { ProjectConfig, ThemeState, DocPage, DocBlock, DocBlockType } from '../types';
import { ButtonShowcase } from './views/ButtonShowcase';
import { FormShowcase } from './views/FormShowcase';
import { BrandColorsView } from './views/BrandColorsView';
import { IconsGridView } from './views/IconsGridView';
import TypographySection from './TypographySection';
import { BlocksShowcase } from './views/BlocksShowcase';
import { LiveOverview } from './views/LiveOverview';
import { DevDocBanner, EnhancedDevContext, ContainerDevWrapper } from './DevDocBanner';

interface DocsSectionProps {
    activePage: DocPage | undefined;
    updatePage: (id: string, updates: Partial<DocPage>) => void;
    themeState: ThemeState;
    config: ProjectConfig;
    showClassNames?: boolean;
}

const BlockRenderer = ({ block, themeState, config, updateBlock, removeBlock, isActive, showClassNames }: { block: DocBlock; themeState: ThemeState; config: ProjectConfig; updateBlock: (content: string) => void; removeBlock: () => void; isActive: boolean; showClassNames?: boolean; }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const safeTheme = themeState;
    useEffect(() => { if (textareaRef.current) { textareaRef.current.style.height = 'auto'; textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; } }, [block.content]);
    useEffect(() => { if (isActive && textareaRef.current) { textareaRef.current.focus(); } }, [isActive]);

    switch (block.type) {
        case 'h1': return (<textarea ref={textareaRef} value={block.content} onChange={(e) => updateBlock(e.target.value)} placeholder="Heading 1" className="w-full bg-transparent outline-none text-4xl font-black resize-none overflow-hidden placeholder:text-gray-200" rows={1} style={{ color: safeTheme.darkText }} />);
        case 'h2': return (<textarea ref={textareaRef} value={block.content} onChange={(e) => updateBlock(e.target.value)} placeholder="Heading 2" className="w-full bg-transparent outline-none text-2xl font-bold resize-none overflow-hidden placeholder:text-gray-200 mt-4" rows={1} style={{ color: safeTheme.darkText }} />);
        case 'paragraph': return (<textarea ref={textareaRef} value={block.content} onChange={(e) => updateBlock(e.target.value)} placeholder="Type '/' for commands" className="w-full bg-transparent outline-none text-base resize-none overflow-hidden placeholder:text-gray-200" rows={1} style={{ color: safeTheme.darkText, lineHeight: '1.6' }} />);
        case 'divider': return <hr className="border-gray-100 my-4" />;
        case 'color': const colorRole = block.metadata?.role || 'primary'; const colorValue = (safeTheme as any)[colorRole] || safeTheme.primary; return (<div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white my-2 group select-none"><div className="w-16 h-16 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: colorValue }} /><div className="flex-1"><p className="font-bold text-sm capitalize" style={{ color: safeTheme.darkText }}>{colorRole.replace(/([A-Z])/g, ' $1').replace('Btn', ' Button').trim()}</p><p className="font-mono text-xs text-gray-400 uppercase">{colorValue}</p></div><div className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-gray-100 rounded text-[10px] font-mono text-gray-500">Live Sync</div></div>);
        case 'typography': return (<div className="p-6 rounded-xl border border-gray-100 bg-white my-2 group select-none overflow-hidden"><p className={`${block.metadata?.token} ${block.metadata?.weight}`} style={{ fontFamily: safeTheme.fontFamily, color: safeTheme.darkText, fontSize: block.metadata?.size }}>{block.metadata?.sample || "The quick brown fox jumps over the lazy dog."}</p><div className="mt-4 flex items-center gap-2 pt-4 border-t border-gray-50"><span className="text-xs font-bold text-gray-400 uppercase">{block.metadata?.name}</span><span className="text-xs font-mono text-gray-300">{block.metadata?.size} • {block.metadata?.weight}</span></div></div>);
        case 'button': return (<div className="p-8 rounded-xl border border-gray-100 bg-gray-50/50 my-2 flex items-center justify-center select-none border-dashed"><button className="font-semibold text-sm transition-all" style={{ backgroundColor: block.metadata?.type === 'primary' ? safeTheme.primary : (block.metadata?.type === 'secondary' ? safeTheme.secondary : 'transparent'), color: block.metadata?.type === 'primary' ? safeTheme.primaryBtnText : (block.metadata?.type === 'secondary' ? safeTheme.secondaryBtnText : safeTheme.tertiaryBtnText), padding: `${safeTheme.btnPaddingY}px ${safeTheme.btnPaddingX}px`, borderRadius: `${safeTheme.borderRadius}px`, border: block.metadata?.type === 'tertiary' ? `1px solid ${safeTheme.tertiaryBtnText}` : 'none' }}>{block.metadata?.label || "Button Label"}</button></div>);
        case 'component':
            // HIGH-FIDELITY VIEWS
            if (block.metadata?.subtype === 'brand-colors') {
                return (
                    <div className="my-8">
                        <BrandColorsView themeState={themeState} config={config} showClassNames={showClassNames} />
                    </div>
                );
            }
            if (block.metadata?.subtype === 'typography-system') {
                return (
                    <div className="my-8">
                        <TypographySection config={config} themeState={themeState} showClassNames={showClassNames} readOnly />
                    </div>
                );
            }
            if (block.metadata?.subtype === 'icons-library') {
                // Use passed icons or fallback to generated content
                const iconsToUse = block.metadata.icons || config.generatedContent?.icons || [];
                return (
                    <div className="my-8">
                        <IconsGridView icons={iconsToUse} themeState={themeState} showClassNames={showClassNames} />
                    </div>
                );
            }
            if (block.metadata?.subtype === 'buttons-system' || block.metadata?.subtype === 'button-showcase') {
                return (
                    <div className="my-8">
                        <ButtonShowcase themeState={themeState} showClassNames={showClassNames} />
                    </div>
                );
            }

            if (block.metadata?.subtype === 'block') {
                return (
                    <div className="my-8">
                        <BlocksShowcase
                            themeState={themeState}
                            config={config}
                            blockType={block.metadata.blockType as any}
                        />
                    </div>
                );
            }
            if (block.metadata?.subtype === 'live-overview') {
                return (
                    <div className="my-8">
                        <LiveOverview config={config} themeState={themeState} />
                    </div>
                );
            }

            // LEGACY / UTILITY
            if (block.metadata?.subtype === 'form-element') { return <div className="p-6 rounded-xl border border-gray-100 bg-white my-2"><FormShowcase themeState={safeTheme} componentType={block.metadata?.elementType || 'text-input'} /></div>; }
            if (block.metadata?.subtype === 'icon-grid') { const gridIcons = block.metadata.icons || []; return (<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">{gridIcons.map((icon: any) => { const IconComp = (LucideIcons as any)[icon.iconName] || LucideIcons.HelpCircle; return (<div key={icon.id} className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-lg"><IconComp size={20} className="text-gray-500 mb-2" /><span className="text-[10px] text-gray-400 truncate w-full text-center">{icon.name}</span></div>) })}</div>); }

            return <div className="p-4 border border-dashed border-gray-200 rounded-lg text-gray-400 text-sm text-center">Unknown Component</div>;
        case 'icon': const IconComp = (LucideIcons as any)[block.metadata?.iconName] || LucideIcons.Star; return (<div className="inline-flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-xl bg-white">{block.metadata?.type === 'custom' && block.metadata.svgContent ? (<div className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full text-gray-800" dangerouslySetInnerHTML={{ __html: block.metadata.svgContent }} />) : (<IconComp size={32} style={{ color: safeTheme.darkText }} />)}<span className="text-xs font-medium text-gray-500">{block.metadata?.name}</span></div>);
        default: return null;
    }
};

const DocsSection: React.FC<DocsSectionProps> = ({ activePage, updatePage, themeState, config, showClassNames }) => {
    const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

    const handleUpdateBlock = (blockId: string, content: string) => {
        if (!activePage) return;
        const newBlocks = activePage.blocks.map(b =>
            b.id === blockId ? { ...b, content } : b
        );
        updatePage(activePage.id, { blocks: newBlocks });
    };

    const handleRemoveBlock = (blockId: string) => {
        if (!activePage) return;
        const newBlocks = activePage.blocks.filter(b => b.id !== blockId);
        updatePage(activePage.id, { blocks: newBlocks });
    };

    const handleAddBlock = (type: DocBlockType) => {
        if (!activePage) return;
        const newBlock: DocBlock = {
            id: Date.now().toString(),
            type,
            content: ''
        };
        updatePage(activePage.id, { blocks: [...activePage.blocks, newBlock] });
        setActiveBlockId(newBlock.id);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const json = e.dataTransfer.getData('application/json');
        if (json && activePage) {
            try {
                const { type, data } = JSON.parse(json);
                const newBlock: DocBlock = {
                    id: Date.now().toString(),
                    type,
                    content: '',
                    metadata: data
                };
                updatePage(activePage.id, { blocks: [...activePage.blocks, newBlock] });
            } catch (err) {
                console.error("Failed to parse drop data", err);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    if (!activePage) {
        return (
            <div className="flex-1 h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Layout size={24} className="opacity-50" />
                </div>
                <p className="font-medium text-gray-900">No Page Selected</p>
                <p className="text-sm mt-1 max-w-xs">Select a page from the explorer or create a new one to start writing documentation.</p>
            </div>
        );
    }

    return (
        <div
            className="flex-1 h-full overflow-y-auto custom-scrollbar bg-white"
            onClick={() => setActiveBlockId(null)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="max-w-5xl mx-auto px-8 py-12 min-h-full">

                <DevDocBanner
                    visible={showClassNames}
                    devContext={{
                        identity: {
                            displayName: "Documentation Editor",
                            filePath: "components/DocsSection.tsx",
                            parentComponent: "DocsSection",
                            htmlTag: "div",
                            type: "Organism/Docs"
                        },
                        state: {
                            sourceVar: "activePage",
                            dataType: "DocPage",
                            handlerProp: "updatePage",
                            currentValuePreview: activePage ? activePage.title : "undefined"
                        },
                        styling: {
                            tailwindClasses: "max-w-5xl mx-auto px-8 py-12",
                            themeTokens: ["fontFamily", "darkText"]
                        }
                    }}
                    context="canvas"
                />

                <ContainerDevWrapper
                    showClassNames={showClassNames}
                    identity={{ displayName: "DocsEditorCanvas", type: "Card/Container", value: "Page Editor", filePath: "components/DocsSection.tsx" }}
                    className="h-full"
                >
                    <div className="mb-8">
                        <input
                            type="text"
                            value={activePage.title}
                            onChange={(e) => updatePage(activePage.id, { title: e.target.value })}
                            className="text-4xl font-extrabold w-full outline-none placeholder:text-gray-300"
                            placeholder="Page Title"
                            style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}
                        />
                        <div className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                            <span>Last modified: {new Date(activePage.lastModified).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {activePage.blocks.map(block => (
                            <div
                                key={block.id}
                                className="group relative -ml-10 pl-10"
                                onClick={(e) => { e.stopPropagation(); setActiveBlockId(block.id); }}
                            >
                                {/* Dev Mode Overlay */}
                                {showClassNames && (
                                    <div className="absolute top-0 right-0 transform -translate-y-full mb-1 flex items-center gap-2 pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <div className="px-1.5 py-0.5 bg-pink-50 border border-pink-200 text-pink-700 text-[9px] font-mono rounded shadow-sm flex items-center gap-1">
                                            <span className="font-bold">ID:</span> {block.id}
                                        </div>
                                        <div className="px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-[9px] font-mono rounded shadow-sm flex items-center gap-1">
                                            <span className="font-bold">Type:</span> "{block.type}"
                                            {block.metadata?.subtype && (
                                                <>
                                                    <span className="text-gray-300 mx-1">|</span>
                                                    <span className="text-indigo-600">Subtype: "{block.metadata.subtype}"</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Block Controls */}
                                <div className={`absolute left-0 top-1.5 flex items-center gap-1 opacity-0 transition-opacity ${activeBlockId === block.id ? 'opacity-100' : 'group-hover:opacity-50'}`}>
                                    <div className="cursor-grab p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100">
                                        <GripVertical size={16} />
                                    </div>
                                    <button
                                        onClick={() => handleRemoveBlock(block.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <BlockRenderer
                                    block={block}
                                    themeState={themeState}
                                    config={config}
                                    updateBlock={(content) => handleUpdateBlock(block.id, content)}
                                    removeBlock={() => handleRemoveBlock(block.id)}
                                    isActive={activeBlockId === block.id}
                                    showClassNames={showClassNames}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Add Block Placeholder */}
                    <div className="mt-8 group cursor-pointer" onClick={() => handleAddBlock('paragraph')}>
                        <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-500 transition-colors">
                            <Plus size={20} />
                            <span className="text-sm font-medium">Type '/' to insert block or drop component here</span>
                        </div>
                    </div>
                </ContainerDevWrapper>

                <div className="h-32" /> {/* Bottom Spacer */}
            </div>
        </div>
    );
};

export default DocsSection;
