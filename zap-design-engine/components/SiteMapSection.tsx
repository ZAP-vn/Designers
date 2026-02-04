
import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    Copy, FileText, Share2, Info, ChevronDown, Check, Layout,
    Database, Code, Eye, Map, Layers, Component, Settings,
    MousePointerClick, Clipboard, FilePlus, Filter, Network, List, X,
    Maximize2, Palette as PaletteIcon, Hash, Link as LinkIcon, Tag, Pipette,
    Type, Sparkles, Box, Code2
} from 'lucide-react';
import { ThemeState, DocPage, ProjectConfig } from '../types';
import { STATIC_SITE_NODES, SiteNode } from './appRegistry';
import { DevDocBanner, ContainerDevWrapper } from './DevDocBanner';
import * as LucideIcons from 'lucide-react';

// --- Import Components for Live Preview ---
import LoginScreen from './LoginScreen';
import SetupPage from './SetupPage';
import Header from './Header';
import UiKitSection from './UiKitSection';
import FormsSection from './FormsSection';
import IconsSection from './IconsSection';
import TemplateSection from './TemplateSection';
import DocsSection from './DocsSection';
import DocsExplorer from './DocsExplorer';
import DocsInspector from './DocsInspector';
import LivePreview from './LivePreview';
import ReviewPageTemplate from './templates/ReviewPageTemplate';
import TableViewTemplate from './templates/TableViewTemplate';
import { standardUiKitData } from './standardUiKit';

// --- Import Extracted Views ---
import { ColorRegistry } from './views/ColorRegistry';
import { FontRegistry } from './views/FontRegistry';
import { IconRegistry } from './views/IconRegistry';
import { ThemeRegistry } from './views/ThemeRegistry';
import { ButtonRegistry } from './views/ButtonRegistry';

interface SiteMapSectionProps {
    themeState: ThemeState;
    docPages?: DocPage[];
    projectConfig?: ProjectConfig;
    selectedNode?: SiteNode | null;
    onSelectNode?: (node: SiteNode | null) => void;
    showClassNames?: boolean;
}

const StandardDataNodeView = () => (
    <div className="p-8 h-full overflow-y-auto">
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Database size={20} className="text-purple-600" />
                Standard UI Kit Data
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1">export const standardUiKitData = ...</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="text-xs font-mono text-blue-300 leading-relaxed">
                {JSON.stringify(standardUiKitData, null, 2)}
            </pre>
        </div>
    </div>
);

// Helper to render content based on Node ID
const renderNodeContent = (nodeId: string, themeState: ThemeState, config: ProjectConfig, docPages: DocPage[], showClassNames?: boolean) => {
    switch (nodeId) {
        case 'login':
            return <LoginScreen onLogin={() => { }} themeState={themeState} />;
        case 'setup':
            return <SetupPage onComplete={() => { }} initialConfig={config} themeState={themeState} hideHeader={true} readOnly={true} showClassNames={showClassNames} />;
        case 'header':
            return (
                <div className="bg-gray-50 h-full flex flex-col">
                    <Header
                        isBuilder={false}
                        theme={themeState}
                        title={config.projectName}
                        layout={config.templateConfig?.navbar?.layout}
                        showSearch={config.templateConfig?.navbar?.showSearch}
                    />
                    <div className="p-8 text-center text-gray-400 text-sm flex-1 flex items-center justify-center bg-gray-50/50">Page Content area...</div>
                </div>
            );
        case 'uikit':
            return (
                <UiKitSection
                    config={config}
                    themeState={themeState}
                    activeCategory="Buttons"
                    setThemeState={() => { }}
                    onUpdateConfig={() => { }}
                    showClassNames={showClassNames || false}
                    setShowClassNames={() => { }}
                />
            );
        case 'forms':
            return <div className="p-8"><FormsSection themeState={themeState} showClassNames={showClassNames} /></div>;
        case 'icons':
            return <div className="p-8"><IconsSection config={config} themeState={themeState} icons={config.generatedContent?.icons || []} onUpdate={() => { }} selectedIcon={null} showClassNames={showClassNames} /></div>;
        case 'templates':
            return <TemplateSection config={config} themeState={themeState} showClassNames={showClassNames} activeSection="Global Navbar" onSectionChange={() => { }} />;
        case 'docs':
            // Show first doc page or dummy
            const page = docPages[0] || { id: 'dummy', title: 'Documentation', blocks: [], lastModified: 0 };
            return <DocsSection activePage={page} updatePage={() => { }} themeState={themeState} showClassNames={showClassNames} config={config} />;
        case 'docs-explorer':
            return (
                <div className="h-full border-r border-gray-200">
                    <DocsExplorer
                        pages={docPages}
                        activePageId={docPages[0]?.id || null}
                        onSelectPage={() => { }}
                        onCreatePage={() => { }}
                        onDeletePage={() => { }}
                        onRegenerateOverview={() => { }}
                        themeState={themeState}
                    />
                </div>
            );
        case 'docs-inspector':
            return (
                <div className="h-full border-l border-gray-200">
                    <DocsInspector
                        config={config}
                        themeState={themeState}
                        icons={config.generatedContent?.icons || []}
                        onRefreshAssets={() => { }}
                        showClassNames={showClassNames}
                    />
                </div>
            );
        case 'template-review':
            return <div className="p-8"><ReviewPageTemplate config={config.templateConfig?.reviewPage} themeState={themeState} /></div>;
        case 'template-table':
            return <div className="p-8"><TableViewTemplate config={config.templateConfig?.tableView} themeState={themeState} dateFormat={config.dateFormat} /></div>;
        case 'preview':
            return <LivePreview initialData={{ projectConfig: config, themeState }} isEmbedded={true} />;
        case 'app':
            return <LivePreview initialData={{ projectConfig: config, themeState }} isEmbedded={true} />;
        case 'color-presets':
            return <ColorRegistry showClassNames={showClassNames} />;
        case 'font-presets':
            return <FontRegistry showClassNames={showClassNames} />;
        case 'theme-presets':
            return <ThemeRegistry showClassNames={showClassNames} />;
        case 'icon-presets':
            return <IconRegistry showClassNames={showClassNames} />;
        case 'button-standards':
            return <ButtonRegistry themeState={themeState} showClassNames={showClassNames} />;
        case 'standard-data':
            return <StandardDataNodeView />;
        case 'types':
            return (
                <div className="p-8 h-full bg-gray-900 text-gray-300 font-mono text-xs overflow-y-auto">
                    <div className="mb-4 text-gray-500">// types.ts - Core Interfaces</div>
                    <pre className="whitespace-pre-wrap">
                        {`export interface ProjectConfig {
  projectName: string;
  businessType: string;
  timezone: string;
  // ...
}

export interface ThemeState {
  primary: string;
  secondary: string;
  // ...
}`}
                    </pre>
                    <div className="mt-4 text-gray-500">// ... (truncated for preview)</div>
                </div>
            );
        default:
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
                    <Eye size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">No live preview available for this node.</p>
                </div>
            );
    }
};

// --- Live Preview Component Wrapper ---
const ComponentPreview = ({ nodeId, themeState, config, docPages = [], onExpand, showClassNames }: { nodeId: string, themeState: ThemeState, config?: ProjectConfig, docPages?: DocPage[], onExpand?: () => void, showClassNames?: boolean }) => {
    // Default safe config if missing
    const safeConfig = config || {
        projectName: 'Preview',
        businessType: 'General',
        timezone: '',
        language: 'English',
        country: 'United States',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h'
    } as ProjectConfig;

    return (
        <div className="w-full h-80 rounded-xl border border-gray-200 overflow-hidden relative bg-white shadow-inner group">
            <div className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none select-none flex flex-col bg-white">
                {renderNodeContent(nodeId, themeState, safeConfig, docPages, showClassNames)}
            </div>
            {/* Overlay to prevent interaction and darken slightly on hover to indicate it's a preview */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors pointer-events-auto flex items-center justify-center">
                {onExpand && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onExpand(); }}
                        className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-bold text-xs opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2 hover:scale-105 hover:bg-gray-50"
                    >
                        <Maximize2 size={14} /> Full Screen
                    </button>
                )}
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                50% Scale
            </div>
        </div>
    );
};

// ... (NodeDetailContent and rest of file remains mostly unchanged except passing props down) ...

const NodeDetailContent = ({ node, themeState, config, docPages, onExpand, showClassNames }: { node: SiteNode; themeState: ThemeState; config?: ProjectConfig; docPages?: DocPage[]; onExpand?: (node: SiteNode) => void; showClassNames?: boolean }) => {
    const [snippetCopied, setSnippetCopied] = useState(false);

    const handleCopySnippet = () => {
        const snippet = `Context: ${node.name}\nID: ${node.id}\nType: ${node.type}\nPath: ${node.path}\nDescription: ${node.description}`;
        navigator.clipboard.writeText(snippet);
        setSnippetCopied(true);
        setTimeout(() => setSnippetCopied(false), 2000);
    };

    return (
        <div className="space-y-6">

            {/* Registry Metadata Card */}
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 grid grid-cols-2 md:grid-cols-4 gap-4 border border-slate-800 relative group/card">
                <div className="flex flex-col gap-1">
                    <span className="text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5"><Hash size={10} /> ID</span>
                    <span className="text-white font-semibold select-all">{node.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5"><Tag size={10} /> Type</span>
                    <span className={`font-semibold ${node.type === 'Page' ? 'text-purple-400' :
                        node.type === 'Component' ? 'text-blue-400' :
                            'text-yellow-400'
                        }`}>{node.type}</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5"><FileText size={10} /> File Path</span>
                    <span className="text-white break-all select-all">{node.path}</span>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopySnippet}
                    className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-all border border-slate-700 hover:border-slate-600 shadow-sm"
                    title="Copy Reference Snippet"
                >
                    {snippetCopied ? <Check size={14} className="text-green-400" /> : <Clipboard size={14} />}
                </button>
            </div>

            {/* Live Visual Preview */}
            <ComponentPreview
                nodeId={node.id}
                themeState={themeState}
                config={config}
                docPages={docPages}
                onExpand={onExpand ? () => onExpand(node) : undefined}
                showClassNames={showClassNames}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technical Description */}
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Code size={12} /> Technical Function
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded-lg border border-gray-200">
                        {node.description}
                    </p>
                </div>

                {/* Layman Description */}
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
                        <Info size={12} /> What is this? (Layman)
                    </h4>
                    <p className="text-sm text-gray-800 leading-relaxed font-medium bg-purple-50 p-3 rounded-lg border border-purple-100" style={{ borderLeft: `3px solid ${themeState.primary}` }}>
                        {node.laymanDescription}
                    </p>
                </div>
            </div>

            {/* Connections */}
            {node.connections.length > 0 && (
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Share2 size={12} /> Connected To ({node.connections.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {node.connections.map(connId => {
                            const connNode = STATIC_SITE_NODES.find(n => n.id === connId);
                            return connNode ? (
                                <span key={connId} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-600 font-mono hover:border-gray-400 transition-colors cursor-default">
                                    <LinkIcon size={10} className="text-gray-400" />
                                    {connNode.name}
                                </span>
                            ) : (
                                <span key={connId} className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-400 font-mono italic">
                                    {connId}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

interface NodeCardProps {
    node: SiteNode;
    themeState: ThemeState;
    isDynamic?: boolean;
    config?: ProjectConfig;
    docPages?: DocPage[];
    onExpand?: (node: SiteNode) => void;
    showClassNames?: boolean;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, themeState, isDynamic = false, config, docPages, onExpand, showClassNames }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(node.name);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyId = (e: React.MouseEvent) => {
        e.stopPropagation();
        const snippet = `"displayName": "${node.name}", "filePath": "${node.path}", "parentComponent": "SiteMapSection" I want to ....`;
        navigator.clipboard.writeText(snippet);
    };

    const Icon = node.icon || FileText;

    const getTypeColor = () => {
        switch (node.type) {
            case 'Page': return 'bg-purple-100 text-purple-700';
            case 'Component': return 'bg-blue-100 text-blue-700';
            case 'Data': return 'bg-yellow-100 text-yellow-700';
            case 'Template': return 'bg-pink-100 text-pink-700';
            case 'Utility': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className={`relative group/node ${showClassNames ? 'pt-2' : ''}`}>

            {/* Dev Mode Identity Pill */}
            {showClassNames && (
                <div
                    className="absolute -top-1 left-3 z-30 flex items-center gap-2 cursor-pointer"
                    onClick={handleCopyId}
                    title="Click to copy context snippet"
                >
                    <div className="px-2 py-0.5 bg-pink-100 border border-pink-300 text-pink-700 text-[10px] font-mono font-bold rounded shadow-sm flex items-center gap-2 hover:bg-pink-200 transition-colors">
                        <MousePointerClick size={10} className="opacity-50" />
                        <span className="opacity-90">{node.name}</span>
                        <span className="opacity-40">|</span>
                        <span>{node.id}</span>
                    </div>
                    <div className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-mono font-bold rounded shadow-lg flex items-center gap-1 border border-blue-500">
                        <Code2 size={10} /> PROPS
                    </div>
                </div>
            )}

            <div
                className={`border rounded-xl transition-all duration-300 overflow-hidden relative
                    ${isExpanded ? 'bg-white shadow-md ring-1 ring-offset-2' : 'bg-white hover:border-gray-300'} 
                    ${isDynamic ? 'border-dashed border-blue-300 bg-blue-50/10' : ''}
                    ${showClassNames ? 'border-dashed border-pink-400 bg-pink-50/10 p-1' : ''}
                `}
                style={{
                    borderColor: showClassNames ? undefined : (isExpanded ? themeState.primary : (isDynamic ? '#93C5FD' : '#E5E7EB')),
                    ['--tw-ring-color' as any]: themeState.primary
                }}
            >
                <div
                    className="p-4 flex items-center justify-between cursor-pointer bg-white rounded-lg"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor()}`}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900">{node.name}</h3>
                                {isDynamic && <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide">Live Data</span>}
                            </div>
                            <p className="text-xs text-gray-400 font-mono">{node.path}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Copy Page Name"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} text-gray-400`}>
                            <ChevronDown size={20} />
                        </div>
                    </div>
                </div>

                {/* Expanded Content */}
                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden bg-white rounded-b-lg">
                        <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50">
                            <div className="mt-4">
                                <NodeDetailContent node={node} themeState={themeState} config={config} docPages={docPages} onExpand={onExpand} showClassNames={showClassNames} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SiteGraphView = ({ nodes, themeState, onNodeClick }: { nodes: SiteNode[]; themeState: ThemeState; onNodeClick: (node: SiteNode) => void }) => {
    // Layout Constants
    const LAYER_WIDTH = 300;
    const NODE_HEIGHT = 60;
    const NODE_WIDTH = 220;
    const VERTICAL_GAP = 20;
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Calculate Positions
    const layout = useMemo(() => {
        // Group nodes by approximate architectural layer
        const layers: Record<number, SiteNode[]> = { 0: [], 1: [], 2: [], 3: [] };

        nodes.forEach(node => {
            if (node.id === 'app') layers[0].push(node);
            else if (node.type === 'Page') layers[1].push(node);
            else if (node.type === 'Template' || node.type === 'Component') layers[2].push(node);
            else layers[3].push(node); // Data, Utility
        });

        // Calculate X,Y for each node
        const positions: Record<string, { x: number; y: number; layer: number }> = {};
        let maxHeight = 0;

        Object.keys(layers).forEach((layerKey) => {
            const layerIndex = parseInt(layerKey);
            const layerNodes = layers[layerIndex];
            const layerHeight = layerNodes.length * (NODE_HEIGHT + VERTICAL_GAP);
            if (layerHeight > maxHeight) maxHeight = layerHeight;

            layerNodes.forEach((node, index) => {
                positions[node.id] = {
                    x: layerIndex * LAYER_WIDTH + 50,
                    y: index * (NODE_HEIGHT + VERTICAL_GAP) + 50,
                    layer: layerIndex
                };
            });
        });

        return { positions, width: 4 * LAYER_WIDTH, height: Math.max(600, maxHeight + 100) };
    }, [nodes]);

    const getStrokeColor = (sourceId: string, targetId: string) => {
        if (hoveredNode === sourceId) return themeState.primary;
        if (hoveredNode === targetId) return themeState.secondary;
        return '#E5E7EB'; // gray-200
    };

    const getStrokeWidth = (sourceId: string, targetId: string) => {
        if (hoveredNode === sourceId || hoveredNode === targetId) return 2.5;
        return 1.5;
    };

    return (
        <div className="w-full overflow-x-auto border border-gray-100 rounded-xl bg-gray-50 shadow-inner custom-scrollbar relative">
            <div className="min-w-[1000px] p-8" style={{ width: layout.width, height: layout.height }}>
                <svg width="100%" height="100%" className="overflow-visible">
                    {/* Connections */}
                    {nodes.map(sourceNode => {
                        const sourcePos = layout.positions[sourceNode.id];
                        if (!sourcePos) return null;

                        return sourceNode.connections.map(targetId => {
                            const targetPos = layout.positions[targetId];
                            if (!targetPos) return null;

                            // Bezier Curve
                            const startX = sourcePos.x + NODE_WIDTH;
                            const startY = sourcePos.y + NODE_HEIGHT / 2;
                            const endX = targetPos.x;
                            const endY = targetPos.y + NODE_HEIGHT / 2;

                            return (
                                <path
                                    key={`${sourceNode.id}-${targetId}`}
                                    d={`M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`}
                                    stroke={getStrokeColor(sourceNode.id, targetId)}
                                    strokeWidth={getStrokeWidth(sourceNode.id, targetId)}
                                    fill="none"
                                    className="transition-all duration-300"
                                />
                            );
                        });
                    })}
                </svg>

                {/* Nodes (rendered as HTML overlays) */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8">
                    {nodes.map(node => {
                        const pos = layout.positions[node.id];
                        if (!pos) return null;

                        const Icon = node.icon || FileText;
                        const isHovered = hoveredNode === node.id;

                        // Node Colors based on Type
                        let badgeClass = 'bg-gray-100 text-gray-600';
                        if (node.type === 'Page') badgeClass = 'bg-purple-100 text-purple-700';
                        if (node.type === 'Component') badgeClass = 'bg-blue-100 text-blue-700';
                        if (node.type === 'Data') badgeClass = 'bg-yellow-100 text-yellow-700';

                        return (
                            <button
                                key={node.id}
                                className={`absolute pointer-events-auto flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm transition-all duration-300 text-left ${isHovered ? 'scale-105 shadow-md ring-2 ring-opacity-50' : 'hover:border-gray-300'}`}
                                style={{
                                    left: pos.x,
                                    top: pos.y,
                                    width: NODE_WIDTH,
                                    height: NODE_HEIGHT,
                                    borderColor: isHovered ? themeState.primary : '#E5E7EB',
                                    ['--tw-ring-color' as any]: themeState.primary,
                                    zIndex: isHovered ? 10 : 1,
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => onNodeClick(node)}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${badgeClass}`}>
                                    <Icon size={16} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-xs text-gray-900 truncate">{node.name}</div>
                                    <div className="text-[10px] text-gray-400 font-mono truncate">{node.type}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const SiteMapSection: React.FC<SiteMapSectionProps> = ({ themeState, docPages = [], projectConfig, selectedNode, onSelectNode, showClassNames }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
    const [internalSelectedNode, setInternalSelectedNode] = useState<SiteNode | null>(null);
    const [fullScreenNode, setFullScreenNode] = useState<SiteNode | null>(null);

    const activeSelectedNode = selectedNode !== undefined ? selectedNode : internalSelectedNode;
    const handleNodeSelection = (node: SiteNode | null) => {
        if (onSelectNode) {
            onSelectNode(node);
        } else {
            setInternalSelectedNode(node);
        }
    };

    const allNodes = useMemo(() => {
        const nodes = [...STATIC_SITE_NODES];
        if (docPages.length > 0) {
            docPages.forEach(page => {
                nodes.push({
                    id: `doc-${page.id}`,
                    name: page.title || 'Untitled Doc',
                    type: 'Data',
                    path: `Dynamic Page ID: ${page.id}`,
                    description: `User-generated documentation page.`,
                    laymanDescription: 'Custom documentation page.',
                    connections: ['docs']
                });
            });
        }
        return nodes;
    }, [docPages]);

    const filterOptions = useMemo(() => {
        const types = new Set(allNodes.map(n => n.type));
        const options = ['All', ...Array.from(types).sort()];
        return options.map(type => ({
            label: type,
            count: type === 'All' ? allNodes.length : allNodes.filter(n => n.type === type).length
        }));
    }, [allNodes]);

    const filteredNodes = useMemo(() => {
        if (activeFilter === 'All') return allNodes;
        return allNodes.filter(n => n.type === activeFilter);
    }, [allNodes, activeFilter]);

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-500 pb-32">

            <DevDocBanner
                visible={!!showClassNames}
                devContext={{
                    identity: {
                        displayName: "Site Architecture",
                        filePath: "components/SiteMapSection.tsx",
                        parentComponent: "SiteMapSection",
                        htmlTag: "div"
                    },
                    state: {
                        sourceVar: "STATIC_SITE_NODES",
                        dataType: "SiteNode[]",
                        handlerProp: "onSelectNode",
                        currentValuePreview: `${allNodes.length} nodes`
                    },
                    styling: {
                        tailwindClasses: "max-w-6xl mx-auto p-8",
                        themeTokens: ["primary", "darkText"]
                    }
                }}
                context="canvas"
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: themeState.darkText }}>Site Map & Architecture</h2>
                    <p className="text-gray-500">Live view of application structure and user-generated pages.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="p-1 bg-gray-100 rounded-lg flex items-center">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="List View"
                        >
                            <List size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('graph')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'graph' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Graph View"
                        >
                            <Network size={20} />
                        </button>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-700 rounded-xl hidden md:block">
                        <Map size={24} />
                    </div>
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
                <div className="mr-2 text-gray-400 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                    <Filter size={14} /> Filter:
                </div>
                {filterOptions.map(opt => (
                    <button
                        key={opt.label}
                        onClick={() => setActiveFilter(opt.label)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${activeFilter === opt.label
                            ? 'shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        style={activeFilter === opt.label ? { backgroundColor: themeState.primary, borderColor: themeState.primary, color: themeState.primaryBtnText } : {}}
                    >
                        {opt.label} <span className="opacity-70 ml-1 font-medium">({opt.count})</span>
                    </button>
                ))}
            </div>

            {/* View Content */}
            {viewMode === 'list' ? (
                <ContainerDevWrapper
                    showClassNames={showClassNames}
                    identity={{ displayName: "SiteMapNodeList", type: "Card/Container", value: "Node Cards", filePath: "components/SiteMapSection.tsx" }}
                >
                    <div className="grid grid-cols-1 gap-4">
                        {filteredNodes.length > 0 ? (
                            filteredNodes.map(node => (
                                <NodeCard
                                    key={node.id}
                                    node={node}
                                    themeState={themeState}
                                    isDynamic={node.id.startsWith('doc-')}
                                    config={projectConfig}
                                    docPages={docPages}
                                    onExpand={setFullScreenNode}
                                    showClassNames={showClassNames}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-400">
                                No items found for this filter.
                            </div>
                        )}
                    </div>
                </ContainerDevWrapper>
            ) : (
                <ContainerDevWrapper
                    showClassNames={showClassNames}
                    identity={{ displayName: "SiteMapGraphCanvas", type: "Card/Container", value: "Interactive Graph", filePath: "components/SiteMapSection.tsx" }}
                >
                    <div className="relative">
                        {filteredNodes.length > 0 ? (
                            <SiteGraphView nodes={filteredNodes} themeState={themeState} onNodeClick={handleNodeSelection} />
                        ) : (
                            <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-400">
                                No items found for this filter.
                            </div>
                        )}
                    </div>
                </ContainerDevWrapper>
            )}

            <ContainerDevWrapper
                showClassNames={showClassNames}
                identity={{ displayName: "SiteMapProTip", type: "Card/Container", value: "Context Helper", filePath: "components/SiteMapSection.tsx" }}
            >
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex gap-4 items-start mt-8">
                    <Info className="text-blue-600 shrink-0 mt-1" size={20} />
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm mb-1">Pro Tip for AI Context</h4>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            When asking an AI to modify a specific part of this app, copy the <strong>Page Name</strong> from above.
                            For example: <em>"Add a new color slider to the <strong>UI Kit Builder</strong> page."</em>
                        </p>
                    </div>
                </div>
            </ContainerDevWrapper>

            {/* Graph Node Modal (Quick View) */}
            {activeSelectedNode && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${activeSelectedNode.type === 'Page' ? 'bg-purple-100 text-purple-700' :
                                    activeSelectedNode.type === 'Component' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                    {activeSelectedNode.icon ? <activeSelectedNode.icon size={24} /> : <FileText size={24} />}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{activeSelectedNode.name}</h3>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5">{activeSelectedNode.path}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleNodeSelection(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <NodeDetailContent node={activeSelectedNode} themeState={themeState} config={projectConfig} docPages={docPages} onExpand={setFullScreenNode} showClassNames={showClassNames} />
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Preview Overlay */}
            {fullScreenNode && (
                <div className="fixed inset-0 z-[110] bg-white flex flex-col animate-in fade-in duration-300">
                    {/* Full Screen Header */}
                    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
                                <Maximize2 size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{fullScreenNode.name}</h3>
                                <p className="text-xs text-gray-500 font-mono">{fullScreenNode.path} • Full Screen Preview</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFullScreenNode(null)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold transition-colors"
                        >
                            <X size={16} /> Close Preview
                        </button>
                    </div>

                    {/* Full Content Container */}
                    <div className="flex-1 overflow-y-auto bg-gray-100 relative">
                        <div className="min-h-full">
                            {/* We render the node content directly here, no scaling wrapper */}
                            {renderNodeContent(fullScreenNode.id, themeState, projectConfig || {} as any, docPages, showClassNames)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SiteMapSection;
