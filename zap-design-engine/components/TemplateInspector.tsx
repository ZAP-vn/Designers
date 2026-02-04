import React, { useState } from 'react';
import { ProjectConfig, TemplateConfig, ThemeState, HeaderLayout } from '../types';
import { InspectorAccordion, ControlDevWrapper, StyleCardOption, DevBadge } from './InspectorCommon';
import { DevDocBanner, EnhancedDevContext, ContainerDevWrapper } from './DevDocBanner';
import { InspectorHeader } from './InspectorHeader';
import {
    Layout, Sidebar, Type, FileText, Table, CreditCard,
    AlignLeft, AlignCenter, AlignRight, Check, EyeOff, Search,
    SlidersHorizontal, Code2, Copy
} from 'lucide-react';

interface TemplateInspectorProps {
    config: ProjectConfig;
    onUpdateConfig: (config: TemplateConfig) => void;
    themeState: ThemeState;
    showClassNames: boolean;
    setShowClassNames: (show: boolean) => void;
    activeSection: string;
}

const TemplateInspector: React.FC<TemplateInspectorProps> = ({
    config,
    onUpdateConfig,
    themeState,
    showClassNames,
    setShowClassNames,
    activeSection
}) => {
    const [inspectorView, setInspectorView] = useState<'controls' | 'code'>('controls');
    const [jsonCopied, setJsonCopied] = useState(false);

    const tc = config.templateConfig || {};
    const FILE_PATH = "components/TemplateInspector.tsx";

    // Helper to update specific sections deeply
    const updateSection = (section: keyof TemplateConfig, data: any) => {
        onUpdateConfig({
            ...tc,
            [section]: {
                ...(tc[section] as any),
                ...data
            }
        });
    };

    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(tc, null, 2));
        setJsonCopied(true);
        setTimeout(() => setJsonCopied(false), 2000);
    };

    const devContext: EnhancedDevContext = {
        identity: {
            displayName: "TemplateInspector",
            filePath: FILE_PATH,
            parentComponent: "TemplateSection",
            type: "Region/Zone", // Level 4: Zone
            htmlTag: "aside"
        },
        state: {
            sourceVar: "config.templateConfig",
            dataType: "TemplateConfig",
            handlerProp: "onUpdateConfig",
            currentValuePreview: "navbar, sidebar..."
        },
        styling: {
            tailwindClasses: "p-6 space-y-2",
            themeTokens: ["primary"]
        },
        structure: {
            architecture: "SYSTEMS // THEME ENGINE",
            structuralRole: "ORGANISM // CONTROLLER",
            codeAudit: "STRICT // OPERATIONAL"
        }
    };

    const inspectorIdentity = {
        displayName: "TemplateInspector",
        filePath: "components/TemplateInspector.tsx",
        parentComponent: "App",
        type: "Info/Legend",
        architecture: "SYSTEMS // THEME ENGINE"
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
                    title="Templates"
                    badge="Controller"
                    showClassNames={showClassNames}
                    setShowClassNames={setShowClassNames}
                    showInspectorToggle={false}
                    viewMode={inspectorView}
                    setViewMode={setInspectorView}
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-2">

                    {inspectorView === 'code' ? (
                        <div className="h-full flex flex-col animate-in fade-in duration-300">
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
                                        {JSON.stringify(tc, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <DevDocBanner
                                visible={showClassNames}
                                devContext={{
                                    ...devContext,
                                    identity: {
                                        ...devContext.identity,
                                        displayName: activeSection
                                    }
                                }}
                                context="controller"
                            />

                            {/* 1. Global Navbar */}
                            {activeSection === 'Global Navbar' && (
                                <InspectorAccordion title="Global Navbar" icon={Layout} defaultOpen={true} showClassNames={showClassNames} devLabel="Navbar">
                                    <ControlDevWrapper active={showClassNames} tokenKey="navbar.title" filePath={FILE_PATH}>
                                        <div className="mb-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Brand Name</label>
                                            <input
                                                type="text"
                                                value={tc.navbar?.title || 'ZAP'}
                                                onChange={(e) => updateSection('navbar', { title: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </ControlDevWrapper>

                                    <ControlDevWrapper active={showClassNames} tokenKey="navbar.layout" filePath={FILE_PATH}>
                                        <div className="mb-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Layout</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <StyleCardOption active={tc.navbar?.layout === 'minimal'} label="Minimal" icon={AlignLeft} onClick={() => updateSection('navbar', { layout: 'minimal' })} accentColor={themeState.primary} />
                                                <StyleCardOption active={tc.navbar?.layout === 'centered'} label="Centered" icon={AlignCenter} onClick={() => updateSection('navbar', { layout: 'centered' })} accentColor={themeState.primary} />
                                                <StyleCardOption active={tc.navbar?.layout === 'user'} label="User" icon={Layout} onClick={() => updateSection('navbar', { layout: 'user' })} accentColor={themeState.primary} />
                                                <StyleCardOption active={tc.navbar?.layout === 'search'} label="Search" icon={Search} onClick={() => updateSection('navbar', { layout: 'search' })} accentColor={themeState.primary} />
                                            </div>
                                        </div>
                                    </ControlDevWrapper>

                                    <div className="space-y-2 pt-2 border-t border-gray-100">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Features</label>
                                        <ControlDevWrapper active={showClassNames} tokenKey="navbar.toggles" filePath={FILE_PATH}>
                                            <div className="space-y-2">
                                                <ToggleRow label="Search" checked={tc.navbar?.showSearch} onChange={(v) => updateSection('navbar', { showSearch: v })} themeState={themeState} />
                                                <ToggleRow label="Notifications" checked={tc.navbar?.showNotifications} onChange={(v) => updateSection('navbar', { showNotifications: v })} themeState={themeState} />
                                                <ToggleRow label="User Avatar" checked={tc.navbar?.showUser} onChange={(v) => updateSection('navbar', { showUser: v })} themeState={themeState} />
                                                <ToggleRow label="Action Button" checked={tc.navbar?.showAction} onChange={(v) => updateSection('navbar', { showAction: v })} themeState={themeState} />
                                            </div>
                                        </ControlDevWrapper>
                                    </div>
                                </InspectorAccordion>
                            )}

                            {/* 2. Sidebar Navigation */}
                            {activeSection === 'Sidebar Navigation' && (
                                <InspectorAccordion title="Sidebar Navigation" icon={Sidebar} defaultOpen={true} showClassNames={showClassNames} devLabel="Sidebar">
                                    <ControlDevWrapper active={showClassNames} tokenKey="sidebar.brand" filePath={FILE_PATH}>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sidebar Brand</label>
                                            <input
                                                type="text"
                                                value={tc.sidebar?.brand || 'ZAP'}
                                                onChange={(e) => updateSection('sidebar', { brand: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </ControlDevWrapper>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-[10px] text-gray-400 italic">Navigation tree is managed via the Site Map controller.</p>
                                    </div>
                                </InspectorAccordion>
                            )}

                            {/* 3. Page Header */}
                            {activeSection === 'Page Header' && (
                                <InspectorAccordion title="Page Header" icon={Type} defaultOpen={true} showClassNames={showClassNames} devLabel="PageHeader">
                                    <ControlDevWrapper active={showClassNames} tokenKey="pageHeader.title" filePath={FILE_PATH}>
                                        <div className="mb-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                                            <input
                                                type="text"
                                                value={tc.pageHeader?.title || 'Items & menus'}
                                                onChange={(e) => updateSection('pageHeader', { title: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="pageHeader.align" filePath={FILE_PATH}>
                                        <div className="mb-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Alignment</label>
                                            <div className="flex bg-gray-50 p-1 rounded-lg">
                                                <AlignButton align="left" current={tc.pageHeader?.align || 'left'} onClick={() => updateSection('pageHeader', { align: 'left' })} />
                                                <AlignButton align="center" current={tc.pageHeader?.align || 'left'} onClick={() => updateSection('pageHeader', { align: 'center' })} />
                                                <AlignButton align="right" current={tc.pageHeader?.align || 'left'} onClick={() => updateSection('pageHeader', { align: 'right' })} />
                                            </div>
                                        </div>
                                    </ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="pageHeader.toggles" filePath={FILE_PATH}>
                                        <div className="space-y-2">
                                            <ToggleRow label="Show Search" checked={tc.pageHeader?.showSearch !== false} onChange={(v) => updateSection('pageHeader', { showSearch: v })} themeState={themeState} />
                                            <ToggleRow label="Show Filters" checked={tc.pageHeader?.showFilters !== false} onChange={(v) => updateSection('pageHeader', { showFilters: v })} themeState={themeState} />
                                            <ToggleRow label="Primary Action" checked={tc.pageHeader?.showAction !== false} onChange={(v) => updateSection('pageHeader', { showAction: v })} themeState={themeState} />
                                        </div>
                                    </ControlDevWrapper>
                                </InspectorAccordion>
                            )}

                            {/* 4. Data Lists & Tables */}
                            {activeSection === 'Data Lists & Tables' && (
                                <InspectorAccordion title="Data Lists & Tables" icon={Table} defaultOpen={true} showClassNames={showClassNames} devLabel="TableTemplate">
                                    <ControlDevWrapper active={showClassNames} tokenKey="tableView.dataSource" filePath={FILE_PATH}>
                                        <div className="mb-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Data Source</label>
                                            <select
                                                value={tc.tableView?.dataSource || 'Promotions'}
                                                onChange={(e) => updateSection('tableView', { dataSource: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                            >
                                                <option value="Promotions">Promotions</option>
                                                <option value="Staff List">Staff List</option>
                                            </select>
                                        </div>
                                    </ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="tableView.toggles" filePath={FILE_PATH}>
                                        <div className="space-y-2">
                                            <ToggleRow label="Show Header" checked={tc.tableView?.showHeader !== false} onChange={(v) => updateSection('tableView', { showHeader: v })} themeState={themeState} />
                                            <ToggleRow label="Pagination" checked={tc.tableView?.showPagination !== false} onChange={(v) => updateSection('tableView', { showPagination: v })} themeState={themeState} />
                                            <ToggleRow label="Checkboxes" checked={tc.tableView?.showCheckboxes !== false} onChange={(v) => updateSection('tableView', { showCheckboxes: v })} themeState={themeState} />
                                        </div>
                                    </ControlDevWrapper>
                                </InspectorAccordion>
                            )}

                            {/* 5. Global Footer */}
                            {activeSection === 'Global Footer' && (
                                <InspectorAccordion title="Global Footer" icon={CreditCard} defaultOpen={true} showClassNames={showClassNames} devLabel="Footer">
                                    <ControlDevWrapper active={showClassNames} tokenKey="footer.brand" filePath={FILE_PATH}>
                                        <div className="mb-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Footer Brand</label>
                                            <input
                                                type="text"
                                                value={tc.footer?.brand || 'ZAP'}
                                                onChange={(e) => updateSection('footer', { brand: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="footer.copyright" filePath={FILE_PATH}>
                                        <div className="mb-3 space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Copyright</label>
                                            <input
                                                type="text"
                                                value={tc.footer?.copyright || '© 2024 ZAP. All rights reserved.'}
                                                onChange={(e) => updateSection('footer', { copyright: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </ControlDevWrapper>
                                </InspectorAccordion>
                            )}
                        </>
                    )}
                </div>
            </div>
        </ContainerDevWrapper>
    );
};

// --- Local Components for Inspector ---

const ToggleRow = ({ label, checked, onChange, themeState }: { label: string, checked?: boolean, onChange: (v: boolean) => void, themeState: ThemeState }) => (
    <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <button
            onClick={() => onChange(!checked)}
            className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${checked ? '' : 'bg-gray-200'}`}
            style={{ backgroundColor: checked ? themeState.primary : undefined }}
        >
            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
        </button>
    </div>
);

const AlignButton = ({ align, current, onClick }: { align: 'left' | 'center' | 'right', current: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-1.5 flex items-center justify-center rounded-md transition-all ${current === align ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
    >
        {align === 'left' && <AlignLeft size={14} />}
        {align === 'center' && <AlignCenter size={14} />}
        {align === 'right' && <AlignRight size={14} />}
    </button>
);

export default TemplateInspector;