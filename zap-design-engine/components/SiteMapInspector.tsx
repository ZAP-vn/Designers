import React, { useState, useMemo } from 'react';
import {
    SlidersHorizontal, Code2, Map, FileText, Component, Database, Layout,
    Check, Copy, Hash, Tag, FileCode
} from 'lucide-react';
import { ThemeState, ProjectConfig, DocPage } from '../types';
import { DevBadge, InspectorAccordion, ControlDevWrapper } from './InspectorCommon';
import { DevDocBanner, EnhancedDevContext, ContainerDevWrapper } from './DevDocBanner';
import { InspectorHeader } from './InspectorHeader';
import { STATIC_SITE_NODES, SiteNode } from './appRegistry';

interface SiteMapInspectorProps {
    config: ProjectConfig;
    themeState: ThemeState;
    docPages: DocPage[];
    selectedNode: SiteNode | null;
    showClassNames: boolean;
    setShowClassNames: (show: boolean) => void;
}

const SiteMapInspector: React.FC<SiteMapInspectorProps> = ({
    config,
    themeState,
    docPages,
    selectedNode,
    showClassNames,
    setShowClassNames
}) => {
    const [inspectorView, setInspectorView] = useState<'controls' | 'code'>('controls');
    const [jsonCopied, setJsonCopied] = useState(false);

    // Compute all nodes (same logic as SiteMapSection for consistency)
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

    const stats = useMemo(() => ({
        pages: allNodes.filter(n => n.type === 'Page').length,
        components: allNodes.filter(n => n.type === 'Component').length,
        templates: allNodes.filter(n => n.type === 'Template').length,
        data: allNodes.filter(n => n.type === 'Data').length,
        total: allNodes.length
    }), [allNodes]);

    const handleCopyJson = () => {
        const dataToCopy = selectedNode ? selectedNode : allNodes;
        navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
        setJsonCopied(true);
        setTimeout(() => setJsonCopied(false), 2000);
    };

    const devContext: EnhancedDevContext = {
        identity: {
            displayName: "SiteMapInspector",
            filePath: "components/SiteMapInspector.tsx",
            parentComponent: "App",
            type: "Region/Zone", // Level 4: Zone
            htmlTag: "aside"
        },
        state: {
            sourceVar: selectedNode ? "selectedNode" : "allNodes",
            dataType: selectedNode ? "SiteNode" : "SiteNode[]",
            handlerProp: "onSelectNode",
            currentValuePreview: selectedNode ? selectedNode.id : `${stats.total} nodes`
        },
        styling: {
            tailwindClasses: "p-6",
            themeTokens: ["primary", "darkText"]
        },
        structure: {
            architecture: "PROTOCOL // PROJECT GRAPH",
            structuralRole: "ORGANISM // CONTROLLER",
            codeAudit: "STRICT // ANALYTICAL"
        }
    };

    const inspectorIdentity = {
        displayName: "SiteMapInspector",
        filePath: "components/SiteMapInspector.tsx",
        parentComponent: "App",
        type: "Info/Legend",
        architecture: "PROTOCOL // PROJECT GRAPH"
    };

    return (
        <ContainerDevWrapper
            showClassNames={showClassNames}
            atomic="Organism"
            identity={inspectorIdentity}
        >
            <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors duration-300">
                {/* Standard Inspector Header */}
                <InspectorHeader
                    title="Site Map"
                    badge="Controller"
                    showClassNames={showClassNames}
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
                                        {JSON.stringify(selectedNode || allNodes, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            <DevDocBanner visible={showClassNames} devContext={devContext} context="controller" />

                            {selectedNode ? (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <div className="mb-4 flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedNode.type === 'Page' ? 'bg-purple-100 text-purple-700' :
                                            selectedNode.type === 'Component' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-200 text-gray-700'
                                            }`}>
                                            {selectedNode.icon ? <selectedNode.icon size={20} /> : <FileText size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{selectedNode.name}</h4>
                                            <div className="text-[10px] font-mono text-gray-500">{selectedNode.id}</div>
                                        </div>
                                    </div>

                                    <InspectorAccordion title="Metadata" defaultOpen showClassNames={showClassNames} devLabel="Node Data">
                                        <ControlDevWrapper active={showClassNames} tokenKey="node.type">
                                            <div className="flex items-center justify-between text-xs py-1">
                                                <span className="text-gray-500 font-medium">Type</span>
                                                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{selectedNode.type}</span>
                                            </div>
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="node.path">
                                            <div className="space-y-1 py-1">
                                                <span className="text-gray-500 font-medium text-xs">File Path</span>
                                                <div className="font-mono text-[10px] bg-gray-100 p-2 rounded break-all text-gray-700">
                                                    {selectedNode.path}
                                                </div>
                                            </div>
                                        </ControlDevWrapper>
                                    </InspectorAccordion>

                                    <InspectorAccordion title="Connections" defaultOpen showClassNames={showClassNames} devLabel="Graph Edges">
                                        <div className="space-y-2">
                                            {selectedNode.connections.map(connId => {
                                                const target = allNodes.find(n => n.id === connId);
                                                return (
                                                    <div key={connId} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 bg-white">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                        <span className="text-xs font-medium text-gray-700">{target ? target.name : connId}</span>
                                                    </div>
                                                );
                                            })}
                                            {selectedNode.connections.length === 0 && (
                                                <div className="text-xs text-gray-400 italic">No outgoing connections</div>
                                            )}
                                        </div>
                                    </InspectorAccordion>
                                </div>
                            ) : (
                                <div className="animate-in fade-in duration-300">
                                    <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl">
                                        <h3 className="text-sm font-bold text-purple-900 mb-1">Architecture Overview</h3>
                                        <p className="text-xs text-purple-700/70">Global statistics for {config.projectName}</p>
                                    </div>

                                    <InspectorAccordion title="Statistics" defaultOpen showClassNames={showClassNames} devLabel="Global Stats">
                                        <div className="grid grid-cols-2 gap-3">
                                            <StatCard label="Total Nodes" value={stats.total} icon={Map} />
                                            <StatCard label="Pages" value={stats.pages} icon={FileText} color="text-purple-600" />
                                            <StatCard label="Components" value={stats.components} icon={Component} color="text-blue-600" />
                                            <StatCard label="Templates" value={stats.templates} icon={Layout} color="text-pink-600" />
                                            <StatCard label="Data Sources" value={stats.data} icon={Database} color="text-yellow-600" />
                                        </div>
                                    </InspectorAccordion>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </ContainerDevWrapper>
    );
};

const StatCard = ({ label, value, icon: Icon, color = "text-gray-600" }: { label: string, value: number, icon: any, color?: string }) => (
    <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center justify-center text-center">
        <Icon size={16} className={`mb-2 ${color}`} />
        <span className="text-lg font-bold text-gray-900">{value}</span>
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label}</span>
    </div>
);

export default SiteMapInspector;