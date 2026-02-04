import React, { useState, useMemo } from 'react';
import Header from './Header';
import ReviewPageTemplate from './templates/ReviewPageTemplate';
import TableViewTemplate from './templates/TableViewTemplate';
import { ProjectConfig, ThemeState, TemplateConfig } from '../types';
import {
    Home, Users, Tag, Megaphone, Receipt, Globe, Wand2, Store, BarChart3, Landmark, Settings,
    ChevronDown, Bell, LogOut, Facebook, Twitter, Instagram, Linkedin, ArrowRight,
    Search, Plus, Download, ChevronRight, Code2, Save, Check, MousePointerClick, Copy,
    Layout, Sidebar, Type, Table, CreditCard
} from 'lucide-react';
import { DevDocBanner, ContainerDevWrapper } from './DevDocBanner';
import { InspectorHeader } from './InspectorHeader';

interface TemplateSectionProps {
    config: ProjectConfig;
    themeState: ThemeState;
    activeSection: string;
    onSectionChange: (section: string) => void;
    showClassNames?: boolean;
}

interface NavItem {
    label: string;
    icon?: React.ElementType;
    active?: boolean;
    children?: NavItem[];
}

// --- Helper: Prop Injection Overlay ---
const TemplatePreview = ({
    name,
    data,
    showClassNames,
    children,
    className,
    stateVar = "config"
}: {
    name: string,
    data: any,
    showClassNames: boolean,
    children?: React.ReactNode,
    className?: string,
    stateVar?: string
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const snippet = `"displayName": "${name}", "filePath": "components/TemplateSection.tsx", "parentComponent": "TemplateSection" I want to ....`;
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative group/preview ${className || ''} ${showClassNames ? 'pt-2' : ''}`}>
            <div className={`relative transition-all duration-200 ${showClassNames ? 'border border-dashed border-pink-400 bg-pink-50/10 rounded-xl p-1' : ''}`}>
                {showClassNames && (
                    <div className="absolute -top-3 left-3 z-30 flex items-center gap-2">
                        {/* Identity Pill */}
                        <div
                            className="px-2 py-0.5 bg-pink-100 border border-pink-300 text-pink-700 text-[10px] font-mono font-bold rounded shadow-sm flex items-center gap-2 cursor-pointer hover:bg-pink-200 transition-colors"
                            onClick={handleCopy}
                            title="Click to copy AI Prompt"
                        >
                            <MousePointerClick size={10} className="opacity-50" />
                            <span className="opacity-90">{name}</span>
                            <span className="opacity-40">|</span>
                            <span>{stateVar}</span>
                            {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} className="opacity-50" />}
                        </div>

                        {/* Prop Injection Overlay */}
                        <div className="group/props relative">
                            <div className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-mono font-bold rounded shadow-lg flex items-center gap-1 cursor-help hover:bg-blue-700 transition-colors border border-blue-500">
                                <Code2 size={10} /> PROPS
                            </div>
                            <div className="absolute top-full left-0 mt-1 w-max max-w-[300px] bg-slate-900 text-slate-300 text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/props:opacity-100 transition-opacity pointer-events-none font-mono text-left z-50 border border-slate-700 block max-h-[400px] overflow-y-auto custom-scrollbar">
                                <div className="text-blue-300 font-bold mb-2 border-b border-slate-700 pb-1">Injected Props</div>
                                {Object.entries(data).map(([k, v]) => (
                                    <div key={k} className="mb-1 last:mb-0 flex gap-2 border-b border-slate-800/50 pb-1 last:border-0">
                                        <span className="text-blue-400 shrink-0">{k}=</span>
                                        <span className="text-green-300 break-all">{
                                            typeof v === 'object' ? (Array.isArray(v) ? `[Array(${v.length})]` : '{Object}')
                                                : String(v)
                                        }</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

const TemplateSection: React.FC<TemplateSectionProps> = ({
    config,
    themeState,
    activeSection,
    onSectionChange,
    showClassNames = false
}) => {
    // Access State Directly from Props
    const navbarConfig = config.templateConfig?.navbar || {};
    const sidebarConfig = config.templateConfig?.sidebar || {};
    const pageHeaderConfig = config.templateConfig?.pageHeader || {};
    const reviewPageConfig = config.templateConfig?.reviewPage || {};
    const tableViewConfig = config.templateConfig?.tableView || {};
    const footerConfig = config.templateConfig?.footer || {};

    // Mock State for interactivity within the *preview* (expanding sidebar items)
    const [expandedItems, setExpandedItems] = useState<string[]>(['Staff', 'Team']);

    const getButtonStyle = (style: ThemeState['buttonStyle'], color: string, type: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
        if (type === 'tertiary' && style !== 'glow') { return {}; }
        switch (style) {
            case 'soft': return { boxShadow: `0 5px 15px -3px ${color}50` };
            case 'neo': const neoColor = type === 'secondary' ? `${color}FF` : `${color}99`; return { boxShadow: `3px 3px 0px ${neoColor}` };
            case 'glow': return { boxShadow: `0 0 12px 2px ${color}70` };
            case 'flat': default: return {};
        }
    };

    const toggleExpand = (label: string, hasChildren: boolean) => {
        if (!hasChildren) return;
        setExpandedItems(prev => prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]);
    };

    const navItems: NavItem[] = [{ label: 'Home', icon: Home }, { label: 'Staff', icon: Users, children: [{ label: 'Team', children: [{ label: 'Team members', active: true }, { label: 'Permissions' }, { label: 'Onboarding' }] }, { label: 'Scheduling', children: [{ label: 'Shift planner' }, { label: 'Time off requests' }] }, { label: 'Time tracking', children: [{ label: 'Timesheets' }, { label: 'Approvals' }] }, { label: 'Payroll' }, { label: 'Announcements' }, { label: 'Settings', children: [{ label: 'General' }, { label: 'Roles' }] }] }, { label: 'Items & menus', icon: Tag }, { label: 'All Promotions', icon: Megaphone }, { label: 'Orders & payments', icon: Receipt }, { label: 'Online', icon: Globe }, { label: 'Design Extractor', icon: Wand2 }, { label: 'Customers', icon: Store }, { label: 'Reports', icon: BarChart3 }, { label: 'Banking', icon: Landmark }, { label: 'Settings', icon: Settings }];

    const renderNavItem = (item: NavItem, depth = 0) => {
        const isExpanded = expandedItems.includes(item.label);
        const hasChildren = !!item.children && item.children.length > 0;
        const isChildActive = (children?: NavItem[]): boolean => { if (!children) return false; return children.some(c => c.active || isChildActive(c.children)); };
        const hasActiveChild = isChildActive(item.children);
        const isActive = item.active || hasActiveChild;
        const isLevel1 = depth === 0;
        return (<div key={item.label} className="relative"> <button onClick={() => toggleExpand(item.label, hasChildren)} className={`w-full flex items-center justify-between py-2 rounded-lg transition-all duration-200 group ${isLevel1 ? 'px-3 mb-0.5' : 'px-2 mb-0'} ${isLevel1 && isActive ? 'bg-opacity-10 font-semibold' : ''} ${!isLevel1 && item.active ? 'font-semibold' : 'font-medium'} ${!item.active && !isActive ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' : ''}`} style={{ backgroundColor: isLevel1 && isActive ? `${themeState.primary}15` : 'transparent', color: isActive || item.active ? themeState.primary : undefined }}> <div className="flex items-center gap-3 min-w-0"> {item.icon && (<item.icon size={20} className={`shrink-0 transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />)} <span className={`truncate ${isLevel1 ? 'text-sm' : 'text-[13px]'}`}> {item.label} </span> </div> {hasChildren && (<div className={`transform transition-transform duration-200 text-gray-400 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}> <ChevronDown size={14} /> </div>)} </button> {hasChildren && isExpanded && (<div className="ml-[21px] pl-3 border-l border-gray-200 space-y-0.5 my-1 animate-in slide-in-from-left-1 duration-200"> {item.children!.map(child => renderNavItem(child, depth + 1))} </div>)} </div>);
    };

    const PreviewFilterButton: React.FC<{ themeState: ThemeState; children: React.ReactNode }> = ({ themeState, children }) => { const [isHovered, setIsHovered] = useState(false); return (<button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="px-4 py-2 bg-white text-gray-600 text-sm font-medium flex items-center gap-2 transition-all" style={{ borderRadius: `${themeState.borderRadius}px`, border: '1px solid', borderColor: isHovered ? themeState.primary : '#e5e7eb', }}> {children} </button>); };

    const templateSections = [
        { id: 'Global Navbar', role: 'Shell.TopNav', icon: Layout },
        { id: 'Sidebar Navigation', role: 'Shell.SideNav', icon: Sidebar },
        { id: 'Page Header', role: 'Section.Hero', icon: Type },
        { id: 'Data Lists & Tables', role: 'Organism.DataGrid', icon: Table },
        { id: 'Global Footer', role: 'Shell.Footer', icon: CreditCard },
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50/50" style={{ fontFamily: themeState.fontFamily }}>
            {/* Top Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
                <InspectorHeader
                    title="Template Builder"
                    badge="Canvas"
                    showClassNames={!!showClassNames}
                />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sub-Navigation Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/30">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">STRUCTURAL ZONES</h3>
                    </div>
                    <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
                        {templateSections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => onSectionChange(section.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white shadow-sm' : 'bg-gray-50 group-hover:bg-white'}`}>
                                        <Icon size={16} />
                                    </div>
                                    <div className="flex flex-col items-start overflow-hidden">
                                        <span className="truncate">{section.id}</span>
                                        <span className="text-[9px] font-mono opacity-50 uppercase tracking-tighter truncate">{section.role}</span>
                                    </div>
                                    {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content Area (Canvas) */}
                <main className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 p-8">
                    <DevDocBanner
                        visible={showClassNames}
                        devContext={{
                            identity: {
                                displayName: activeSection || "Templates",
                                filePath: "components/TemplateSection.tsx",
                                parentComponent: "TemplateSection",
                                htmlTag: "section"
                            },
                            state: {
                                sourceVar: `config.templateConfig.${(activeSection || 'navbar').toLowerCase().replace(/ & /g, '').replace(/ /g, '')}`,
                                dataType: "TemplateConfig",
                                handlerProp: "onUpdateConfig",
                                currentValuePreview: "Active Layout Node"
                            },
                            styling: {
                                tailwindClasses: "p-8 space-y-8",
                                themeTokens: ["fontFamily", "primary", "borderRadius"]
                            }
                        }}
                        context="canvas"
                    />

                    {/* Contextual Section Rendering */}
                    <div className="w-full">
                        {activeSection === 'Global Navbar' && (
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{ displayName: "Shell.TopNav", type: "Header", value: "Global Navbar", filePath: "components/TemplateSection.tsx" }}
                            >
                                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden h-[400px]">
                                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10 uppercase tracking-widest">Master Zone</div>
                                    <div className="mb-6 pb-2 border-b border-gray-100">
                                        <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Global Navbar</h2>
                                        <p className="text-sm" style={{ color: themeState.grayText }}>Configuration for the persistent top-level site navigation.</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 relative h-32">
                                        <div className="absolute inset-0 flex flex-col">
                                            <TemplatePreview
                                                name="Header"
                                                showClassNames={showClassNames ?? false}
                                                data={{ ...navbarConfig }}
                                                stateVar="navbarConfig"
                                            >
                                                <Header
                                                    title={navbarConfig.title || 'ZAP'}
                                                    layout={navbarConfig.layout || 'minimal'}
                                                    showSearch={navbarConfig.showSearch}
                                                    showNotifications={navbarConfig.showNotifications}
                                                    showLanguage={navbarConfig.showLanguage}
                                                    showLogin={navbarConfig.showLogin}
                                                    showUser={navbarConfig.showUser}
                                                    showProgress={navbarConfig.showProgress}
                                                    processName={navbarConfig.processName}
                                                    currentStep={navbarConfig.currentStep}
                                                    totalSteps={navbarConfig.totalSteps}
                                                    theme={themeState}
                                                    onBack={navbarConfig.showBack ? () => console.log('Back clicked') : undefined}
                                                    rightAction={navbarConfig.showAction ? (<button className="font-semibold shadow-sm text-sm" style={{ backgroundColor: themeState.primary, color: themeState.primaryBtnText, borderRadius: `${themeState.borderRadius}px`, padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`, ...getButtonStyle(themeState.buttonStyle, themeState.primary) }}> {navbarConfig.actionLabel || 'Action'} </button>) : null}
                                                    disableSticky={true}
                                                />
                                            </TemplatePreview>
                                            <div className="flex-1 p-4 text-center text-xs text-gray-400 border-t border-gray-200 flex items-center justify-center bg-gray-50/50">
                                                (Page Content Area)
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </ContainerDevWrapper>
                        )}

                        {activeSection === 'Sidebar Navigation' && (
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{ displayName: "Shell.SideNav", type: "Sidebar", value: "Sidebar Navigation", filePath: "components/TemplateSection.tsx" }}
                            >
                                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden h-[800px]">
                                    <div className="mb-6 pb-2 border-b border-gray-100">
                                        <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Sidebar Navigation</h2>
                                        <p className="text-sm" style={{ color: themeState.grayText }}>Vertical navigation system with a multi-level tree structure.</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 relative h-[600px] flex">
                                        <TemplatePreview
                                            name="SidebarLayout"
                                            showClassNames={showClassNames ?? false}
                                            data={{ brand: sidebarConfig.brand, items: navItems.length }}
                                            className="h-full flex flex-col shrink-0 font-[inherit]"
                                            stateVar="sidebarConfig"
                                        >
                                            <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shrink-0">
                                                <div className="p-6 pb-4">
                                                    <span className="font-black text-2xl tracking-tight text-gray-900">{sidebarConfig.brand || 'ZAP'}</span>
                                                </div>
                                                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
                                                    {navItems.map(item => renderNavItem(item))}
                                                </nav>
                                                <div className="p-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 overflow-hidden shrink-0">
                                                            <Users size={20} fill="currentColor" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 font-[inherit]">
                                                            <p className="text-sm font-bold text-gray-900 truncate">Alex Admin</p>
                                                            <p className="text-xs text-gray-500 truncate">Manager</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TemplatePreview>
                                        <div className="flex-1 p-8 bg-gray-50 flex flex-col overflow-hidden">
                                            <div className="mb-8">
                                                <h1 className="text-2xl font-bold text-gray-900">Dashboard Preview</h1>
                                                <p className="text-gray-500 text-sm">Main workspace area.</p>
                                            </div>
                                            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                                Canvas Area
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </ContainerDevWrapper>
                        )}

                        {activeSection === 'Page Header' && (
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{ displayName: "Section.Hero", type: "Header", value: "Page Header", filePath: "components/TemplateSection.tsx" }}
                            >
                                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div className="mb-6 pb-2 border-b border-gray-100">
                                        <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Page Header</h2>
                                        <p className="text-sm" style={{ color: themeState.grayText }}>Contextual breadcrumbs, title, and primary page actions.</p>
                                    </div>

                                    <div className={`border border-gray-200 rounded-xl p-6 bg-[#F9FAFB] flex flex-col gap-6`}>
                                        <TemplatePreview
                                            name="PageHeader"
                                            showClassNames={showClassNames ?? false}
                                            data={{ ...pageHeaderConfig }}
                                            className="flex flex-col gap-6"
                                            stateVar="pageHeaderConfig"
                                        >
                                            <div className={`flex flex-col md:flex-row gap-6 ${pageHeaderConfig.align === 'center' ? 'md:items-center text-center' : pageHeaderConfig.align === 'right' ? 'md:items-center md:flex-row-reverse text-right' : 'md:items-center justify-between text-left'}`}>
                                                <div className={`${pageHeaderConfig.align === 'center' ? 'mx-auto' : ''}`}>
                                                    <h1 className={`${pageHeaderConfig.titleSize || 'text-3xl'} font-extrabold tracking-tight mb-1 font-[inherit]`} style={{ color: themeState.darkText }}>
                                                        {pageHeaderConfig.title || 'Data Workspace'}
                                                    </h1>
                                                    <p className={`${pageHeaderConfig.subtitleSize || 'text-sm'} font-[inherit]`} style={{ color: themeState.grayText }}>
                                                        {pageHeaderConfig.subtitle || 'Configure and manage your template assets.'}
                                                    </p>
                                                </div>
                                                {pageHeaderConfig.showAction !== false && (
                                                    <button
                                                        className="shadow-sm hover:opacity-90 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                                                        style={{ backgroundColor: themeState.primary, color: themeState.primaryBtnText, borderRadius: `${themeState.borderRadius}px`, padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`, ...getButtonStyle(themeState.buttonStyle, themeState.primary) }}
                                                    >
                                                        <Plus size={18} />
                                                        <span>Add New</span>
                                                    </button>
                                                )}
                                            </div>
                                        </TemplatePreview>
                                    </div>
                                </section>
                            </ContainerDevWrapper>
                        )}

                        {activeSection === 'Data Lists & Tables' && (
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{ displayName: "Organism.DataGrid", type: "Container", value: "Data Grid", filePath: "components/TemplateSection.tsx" }}
                            >
                                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div className="mb-6 pb-2 border-b border-gray-100">
                                        <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Data Lists & Tables</h2>
                                        <p className="text-sm" style={{ color: themeState.grayText }}>The core content grid for displaying collections of records.</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                        <TemplatePreview
                                            name="TableViewTemplate"
                                            showClassNames={showClassNames ?? false}
                                            data={{ config: tableViewConfig }}
                                            stateVar="tableViewConfig"
                                        >
                                            <TableViewTemplate config={tableViewConfig} themeState={themeState} dateFormat={config.dateFormat} />
                                        </TemplatePreview>
                                    </div>
                                </section>
                            </ContainerDevWrapper>
                        )}

                        {activeSection === 'Global Footer' && (
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{ displayName: "Shell.Footer", type: "Footer", value: "Global Footer", filePath: "components/TemplateSection.tsx" }}
                            >
                                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div className="mb-6 pb-2 border-b border-gray-100">
                                        <h2 className="text-2xl font-bold" style={{ color: themeState.darkText }}>Global Footer</h2>
                                        <p className="text-sm" style={{ color: themeState.grayText }}>Legal information, sitemap, and utility footer links.</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                        <TemplatePreview
                                            name="Footer"
                                            showClassNames={showClassNames ?? false}
                                            data={{ ...footerConfig }}
                                            stateVar="footerConfig"
                                        >
                                            <footer className="bg-white pt-8 pb-6 px-6 font-[inherit]">
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                                                    <div className="col-span-1 md:col-span-1 pr-4">
                                                        <div className="font-black text-2xl tracking-tight text-gray-900 mb-4">{footerConfig.brand || 'ZAP'}</div>
                                                        <p className="text-sm text-gray-500 leading-relaxed mb-6 font-[inherit]">Empowering your business with the best design tools available.</p>
                                                    </div>
                                                    <div><h4 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">Product</h4><ul className="space-y-3 text-sm text-gray-500 font-[inherit]"><li>Features</li><li>Pricing</li></ul></div>
                                                    <div><h4 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">Company</h4><ul className="space-y-3 text-sm text-gray-500 font-[inherit]"><li>About</li><li>Blog</li></ul></div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">Legal</h4>
                                                        <p className="text-xs text-gray-500 mb-3 font-[inherit]">{footerConfig.copyright || '© 2024 ZAP. All rights reserved.'}</p>
                                                    </div>
                                                </div>
                                            </footer>
                                        </TemplatePreview>
                                    </div>
                                </section>
                            </ContainerDevWrapper>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TemplateSection;