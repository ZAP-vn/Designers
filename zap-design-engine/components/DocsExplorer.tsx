
import React, { useState } from 'react';
import { Plus, ChevronDown, Folder, FileText, Trash2, RefreshCw, HardDrive, Layers, Box, Layout, Database } from 'lucide-react';
import { DocPage, ThemeState } from '../types';
import { STATIC_SITE_NODES } from './appRegistry';

interface DocsExplorerProps {
    pages: DocPage[];
    activePageId: string | null;
    onSelectPage: (id: string) => void;
    onCreatePage: () => void;
    onDeletePage: (id: string, e: React.MouseEvent) => void;
    onRegenerateOverview: () => void;
    themeState: ThemeState;
}

const DocsExplorer: React.FC<DocsExplorerProps> = ({ 
    pages, 
    activePageId, 
    onSelectPage, 
    onCreatePage, 
    onDeletePage, 
    onRegenerateOverview,
    themeState 
}) => {
    const [isPagesFolderOpen, setIsPagesFolderOpen] = useState(true);
    const [isAppStructureOpen, setIsAppStructureOpen] = useState(false);

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Explorer</span>
                    <button 
                        onClick={onCreatePage}
                        className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                        title="New Page"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                
                {/* Collapsible Folder Structure: Pages */}
                <div className="mb-2">
                    <button 
                        onClick={() => setIsPagesFolderOpen(!isPagesFolderOpen)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isPagesFolderOpen ? '' : '-rotate-90'}`} />
                        <div className="text-yellow-500">
                            <Folder size={16} fill="currentColor" className="text-yellow-400" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Pages</span>
                    </button>
                    
                    {/* Pages List */}
                    {isPagesFolderOpen && (
                        <div className="ml-6 pl-2 border-l border-gray-200 mt-1 space-y-0.5 animate-in slide-in-from-left-2 duration-200">
                            {pages.map(page => (
                                <div 
                                    key={page.id}
                                    onClick={() => onSelectPage(page.id)}
                                    className={`group flex items-center justify-between px-2.5 py-2 rounded-md text-sm cursor-pointer transition-colors relative ${page.id === activePageId ? 'bg-purple-50 text-purple-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                    style={page.id === activePageId ? { backgroundColor: `${themeState.primary}10`, color: themeState.primary } : {}}
                                >
                                    <div className="flex items-center gap-2 truncate min-w-0">
                                        <FileText size={14} className={page.id === activePageId ? 'opacity-100' : 'text-gray-400'} />
                                        <span className="truncate">{page.title}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => onDeletePage(page.id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded transition-all absolute right-1 hover:bg-white"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Collapsible Folder Structure: App Structure (Sitemap) */}
                <div className="mb-1">
                    <button 
                        onClick={() => setIsAppStructureOpen(!isAppStructureOpen)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isAppStructureOpen ? '' : '-rotate-90'}`} />
                        <div className="text-blue-500">
                            <Layers size={16} fill="currentColor" className="text-blue-100" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">App Structure</span>
                    </button>
                    
                    {/* Sitemap Nodes List */}
                    {isAppStructureOpen && (
                        <div className="ml-6 pl-2 border-l border-gray-200 mt-1 space-y-0.5 animate-in slide-in-from-left-2 duration-200">
                            {STATIC_SITE_NODES.map(node => {
                                const Icon = node.icon || FileText;
                                return (
                                    <div 
                                        key={node.id}
                                        className="flex items-center justify-between px-2.5 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 cursor-default transition-colors group"
                                        title={node.description}
                                    >
                                        <div className="flex items-center gap-2 truncate min-w-0">
                                            <Icon size={14} className="text-gray-400 group-hover:text-gray-600" />
                                            <span className="truncate">{node.name}</span>
                                        </div>
                                        <span className="text-[9px] font-mono text-gray-300 border border-gray-100 px-1 rounded uppercase group-hover:border-gray-200">
                                            {node.type === 'Page' ? 'PG' : node.type === 'Component' ? 'CP' : 'UT'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-auto p-4 border-t border-gray-100 space-y-3 bg-gray-50/30">
                 <button 
                    onClick={onRegenerateOverview}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
                 >
                    <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Refresh Overview</span>
                 </button>
                 <div className="flex items-center gap-2 text-xs text-gray-400">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     Live Sync Active
                 </div>
                 <div className="flex items-center gap-2 text-xs text-gray-400" title="Data is stored in browser LocalStorage">
                     <HardDrive size={12} />
                     Database: Local
                 </div>
            </div>
        </div>
    );
};

export default DocsExplorer;
