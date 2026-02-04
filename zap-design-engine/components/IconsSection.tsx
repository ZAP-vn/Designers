import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import {
    Download, Copy, Check, Sparkles, Minus, Plus, Edit3, ChevronDown, Trash2, Code, Sun, Moon, AlertTriangle, Search, Upload, Info, X, AlertCircle, Code2, SlidersHorizontal, FileJson, MousePointerClick
} from 'lucide-react';
import { ThemeState, ProjectConfig, IconEntry } from '../types';
import { ICON_PRESETS } from './iconPresets';
import { DevDocBanner, DevContext } from './DevDocBanner';
import { InspectorAccordion } from './InspectorCommon';
import { InspectorHeader } from './InspectorHeader';
import { SliderWidget } from './atoms/SliderWidget';

interface IconsSectionProps {
    config: ProjectConfig;
    themeState: ThemeState;
    icons: IconEntry[];
    onUpdate: (icons: IconEntry[]) => void;
    selectedIcon: IconEntry | null;
    showClassNames?: boolean;
    setShowClassNames?: (show: boolean) => void;
    isDarkMode?: boolean;
}

// DevBadge Helper (Duplicated from UiKitSection for self-containment or could be exported shared)
const DevBadge = ({ label, type = 'element', className = '' }: { label: string; type?: 'layer' | 'element' | 'data'; className?: string }) => {
    const colors = {
        layer: 'bg-blue-600 text-white',
        element: 'bg-pink-600 text-white',
        data: 'bg-green-600 text-white'
    };
    return (
        <div className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded shadow-md font-mono inline-block ${colors[type]} ${className}`}>
            {label}
        </div>
    );
};

// --- Helper: Icon Dev Wrapper ---
interface IconDevWrapperProps {
    children: React.ReactNode;
    showClassNames?: boolean;
    componentName: string;
    stateVar: string;
    filePath?: string;
    className?: string;
}

const IconDevWrapper: React.FC<IconDevWrapperProps> = ({
    children,
    showClassNames,
    componentName,
    stateVar,
    filePath = 'components/IconsSection.tsx',
    className = ''
}) => {
    const [copied, setCopied] = useState(false);

    if (!showClassNames) return <div className={className}>{children}</div>;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const snippet = `"displayName": "${componentName}", "filePath": "${filePath}", "parentComponent": "IconsSection" I want to ....`;
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative group ${className} ${showClassNames ? 'pt-2' : ''}`}>
            <div className={`relative transition-all duration-200 border border-dashed border-pink-400 bg-pink-50/10 rounded-xl p-2`}>
                {/* Info Pill (Top Left) */}
                <div
                    className="absolute -top-3 left-3 px-2 py-0.5 bg-pink-100 border border-pink-300 text-pink-700 text-[10px] font-mono font-bold rounded shadow-sm z-20 flex items-center gap-2 cursor-pointer hover:bg-pink-200 transition-colors"
                    onClick={handleCopy}
                    title="Click to copy AI Prompt"
                >
                    <MousePointerClick size={10} className="opacity-50" />
                    <span className="opacity-90">{componentName}</span>
                    <span className="opacity-40">|</span>
                    <span>{stateVar}</span>
                    <span className="opacity-40">|</span>
                    <span className="opacity-70">Atom/Token</span>
                    {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} className="opacity-50" />}
                </div>
                {children}
            </div>
        </div>
    );
};

// --- Helper Modal Component ---
const IconPickerModal = ({
    isOpen,
    onClose,
    onAdd,
    existingIconIds,
    themeState
}: {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (icon: any) => void;
    existingIconIds: string[];
    themeState: ThemeState;
}) => {
    const [activeTab, setActiveTab] = useState<'library' | 'custom'>('library');
    const [search, setSearch] = useState('');
    const [svgCode, setSvgCode] = useState('');
    const [customName, setCustomName] = useState('');
    const [customCategory, setCustomCategory] = useState('General');
    const [svgError, setSvgError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setSearch(''); setSvgCode(''); setCustomName(''); setCustomCategory('General'); setSvgError(null); setActiveTab('library');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredCloudIcons = ICON_PRESETS.filter(icon =>
        (icon.name.toLowerCase().includes(search.toLowerCase()) ||
            icon.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))) &&
        !existingIconIds.includes(icon.id)
    );

    const handleUseSample = () => {
        const sample = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        setSvgCode(sample); setCustomName('Layer Stack'); setSvgError(null);
    };

    const handleSaveCustom = () => {
        if (!svgCode.trim()) { setSvgError('Please enter SVG code.'); return; }
        if (!svgCode.includes('<svg')) { setSvgError('Invalid SVG code. Must contain <svg> tag.'); return; }
        if (!customName.trim()) { setSvgError('Please enter a display name.'); return; }
        onAdd({ id: `custom-${Date.now()}`, name: customName, iconName: 'CustomIcon', category: customCategory, type: 'custom', svgContent: svgCode });
        onClose();
    };

    const categories = ['General', 'Navigation', 'Communication', 'UI Actions', 'Commerce', 'Social', 'Brand'];

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[700px]" style={{ fontFamily: themeState.fontFamily }}>
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0"><div><h3 className="text-xl font-extrabold text-gray-900">Select Icon</h3><p className="text-sm text-gray-500 mt-1">Choose from library or add custom SVG.</p></div><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"><X size={24} /></button></div>
                <div className="flex border-b border-gray-100 px-8 shrink-0"><button onClick={() => setActiveTab('library')} className={`py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 mr-8 ${activeTab === 'library' ? 'text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} style={{ borderColor: activeTab === 'library' ? themeState.primary : 'transparent', color: activeTab === 'library' ? themeState.primary : undefined }}><Search size={16} /> Library</button><button onClick={() => setActiveTab('custom')} className={`py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'custom' ? 'text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} style={{ borderColor: activeTab === 'custom' ? themeState.primary : 'transparent', color: activeTab === 'custom' ? themeState.primary : undefined }}><Upload size={16} /> Custom SVG</button></div>
                <div className="flex-1 overflow-hidden bg-gray-50/50 relative">
                    {activeTab === 'library' ? (
                        <div className="flex flex-col h-full"><div className="p-4 border-b border-gray-100 bg-white"><div className="relative max-w-md mx-auto"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" placeholder="Search 1000+ icons..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all focus:border-purple-500" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus /></div></div><div className="flex-1 overflow-y-auto p-8 custom-scrollbar"><div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">{filteredCloudIcons.map(icon => { const IconComp = (LucideIcons as any)[icon.iconName] || LucideIcons.HelpCircle; return (<button key={icon.id} onClick={() => { onAdd(icon); onClose(); }} className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group text-center aspect-square hover:border-purple-500"><IconComp size={24} className="text-gray-500 group-hover:text-gray-900 transition-colors" /><span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 truncate w-full">{icon.name}</span></button>); })}{filteredCloudIcons.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <Search size={24} />
                                </div>
                                <p className="text-gray-500 font-medium mb-4">No icons found matching "{search}"</p>
                                <button
                                    onClick={() => setActiveTab('custom')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-purple-600 hover:bg-purple-50 transition-colors shadow-sm"
                                >
                                    <Plus size={14} /> Add Custom SVG instead
                                </button>
                            </div>
                        )}</div></div></div>
                    ) : (
                        <div className="flex h-full p-8 gap-8"><div className="flex-1 flex flex-col gap-6 min-w-0 h-full"><div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start"><Info size={20} className="text-blue-600 shrink-0 mt-0.5" /><div><h4 className="text-sm font-bold text-blue-900">Paste SVG Code</h4><p className="text-xs text-blue-700 mt-1 leading-relaxed">Copy the code from your vector tool (Figma, Illustrator) and paste it below. Ensure the SVG has a <code className="bg-blue-100 px-1 py-0.5 rounded">viewBox</code> attribute for best scaling.</p><button onClick={handleUseSample} className="mt-3 text-xs font-bold text-blue-600 bg-white border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">Use Sample Data</button></div></div><div className="flex-1 flex flex-col relative min-h-0"><textarea value={svgCode} onChange={(e) => { setSvgCode(e.target.value); setSvgError(null); }} placeholder={`<svg viewBox="0 0 24 24" ...>\n  <path d="..." />\n</svg>`} className="flex-1 w-full bg-white border border-gray-200 rounded-xl p-4 font-mono text-xs text-gray-600 outline-none focus:ring-1 transition-all resize-none focus:border-purple-500 focus:ring-purple-500" />{svgError && (<div className="absolute bottom-4 left-4 right-4 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"><AlertCircle size={14} /> {svgError}</div>)}</div></div><div className="w-80 flex flex-col gap-6 shrink-0 h-full overflow-y-auto custom-scrollbar"><div className="aspect-square bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 relative overflow-hidden shrink-0"><div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>{svgCode && svgCode.includes('<svg') ? (<div className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full text-gray-900 transition-all duration-300 animate-in zoom-in-50" dangerouslySetInnerHTML={{ __html: svgCode }} />) : (<div className="text-center text-gray-300"><Code2 size={48} className="mx-auto mb-2 opacity-50" /><span className="text-xs font-bold uppercase tracking-wider">Paste SVG Code</span></div>)}</div><div className="space-y-4"><div className="space-y-1.5"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</label><div className="relative"><select value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 outline-none appearance-none cursor-pointer hover:border-gray-300 transition-colors focus:border-purple-500">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select><ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /></div></div><div className="space-y-1.5"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Display Name</label><input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g. My Icon" className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors focus:border-purple-500" /></div></div><div className="mt-auto"><button onClick={handleSaveCustom} className="w-full py-3 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2" style={{ backgroundColor: themeState.primary, borderRadius: `${themeState.borderRadius}px` }}>Save Icon</button></div></div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

const IconsSection: React.FC<IconsSectionProps> = ({ config, themeState, icons, onUpdate, selectedIcon, showClassNames, setShowClassNames, isDarkMode = false }) => {
    const [copied, setCopied] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Preview State
    const [iconSize, setIconSize] = useState(24);
    const [strokeWidth, setStrokeWidth] = useState(2);

    // Edit State
    const [editName, setEditName] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editSvg, setEditSvg] = useState('');
    const [editIconName, setEditIconName] = useState('');

    // View State
    const [inspectorView, setInspectorView] = useState<'controls' | 'code'>('controls');
    const [jsonCopied, setJsonCopied] = useState(false);

    // Reset state when selection changes
    useEffect(() => {
        if (selectedIcon) {
            setIconSize(32);
            setStrokeWidth(2); // Default lucide stroke
            setEditName(selectedIcon.name);
            setEditCategory(selectedIcon.category || 'General');
            setEditSvg(selectedIcon.svgContent || '');
            setEditIconName(selectedIcon.iconName);
        }
    }, [selectedIcon]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyJson = () => {
        if (selectedIcon) {
            navigator.clipboard.writeText(JSON.stringify(selectedIcon, null, 2));
            setJsonCopied(true);
            setTimeout(() => setJsonCopied(false), 2000);
        }
    };

    const handleUpdateIcon = (field: keyof IconEntry, value: string) => {
        if (!selectedIcon) return;

        const updatedIcons = icons.map(icon =>
            icon.id === selectedIcon.id
                ? { ...icon, [field]: value }
                : icon
        );

        onUpdate(updatedIcons);

        if (field === 'name') setEditName(value);
        if (field === 'category') setEditCategory(value);
        if (field === 'svgContent') setEditSvg(value);
        if (field === 'iconName') setEditIconName(value);
    };

    const handleAddIcon = (newIcon: IconEntry) => {
        const updatedIcons = [...icons, newIcon];
        onUpdate(updatedIcons);
        setIsAddModalOpen(false);
    };

    const handleDeleteIcon = () => {
        if (!selectedIcon) return;
        if (window.confirm('Are you sure you want to delete this icon?')) {
            const updatedIcons = icons.filter(i => i.id !== selectedIcon.id);
            onUpdate(updatedIcons);
        }
    };

    const categories = ['General', 'Navigation', 'Communication', 'UI Actions', 'Commerce', 'Social', 'Brand'];

    const devContext: DevContext = {
        identity: {
            displayName: "IconsInspector",
            filePath: "components/IconsSection.tsx",
            parentComponent: "IconsSection",
            type: "Region/Zone" // Level 4: Zone
        },
        state: {
            sourceVar: "selectedIcon",
            dataType: "IconEntry | null",
            handlerProp: "onUpdate",
            currentValuePreview: selectedIcon ? selectedIcon.name : "null"
        },
        styling: {
            themeTokens: ["primary", "borderRadius"]
        }
    };

    if (!selectedIcon) {
        return (
            <>
                <div className="flex flex-col h-full bg-white transition-colors duration-300">
                    <InspectorHeader
                        title="Icons"
                        badge="Controller"
                        showClassNames={!!showClassNames}
                        setShowClassNames={setShowClassNames}
                    />
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
                        <DevDocBanner visible={!!showClassNames} devContext={devContext} context="controller" />
                        <IconDevWrapper showClassNames={showClassNames} componentName="IconPlaceholder" stateVar="empty" className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Sparkles size={24} className="opacity-50" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">No Icon Selected</p>
                            <p className="text-xs mt-2 mb-6 max-w-[200px]">Select an icon from the grid to view properties or create new.</p>

                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-purple-700 transition-colors"
                                style={{ backgroundColor: themeState.primary, color: themeState.primaryBtnText }}
                            >
                                <Plus size={14} /> Add New Icon
                            </button>
                        </IconDevWrapper>
                    </div>
                </div>
                <IconPickerModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddIcon}
                    existingIconIds={icons.map(i => i.id)}
                    themeState={themeState}
                />
            </>
        );
    }

    // Dynamic Icon Rendering
    const IconComp = (LucideIcons as any)[editIconName] || (LucideIcons as any)[selectedIcon.iconName] || LucideIcons.HelpCircle;

    return (
        <>
            <div className="flex flex-col h-full transition-colors duration-300 bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
                {/* Header */}
                <InspectorHeader
                    title="Icons"
                    badge="Controller"
                    showClassNames={!!showClassNames}
                    setShowClassNames={setShowClassNames}
                    showInspectorToggle={false}
                    viewMode={inspectorView}
                    setViewMode={setInspectorView}
                />

                {/* Content Area */}
                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
                    <div className="p-6 space-y-8">
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
                                            {JSON.stringify(selectedIcon, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <DevDocBanner visible={!!showClassNames} devContext={devContext} context="controller" />

                                {/* Preview Area */}
                                <IconDevWrapper showClassNames={showClassNames} componentName="IconPreview" stateVar="selectedIcon" className="w-full">
                                    <div className="rounded-2xl border flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors duration-300 bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                                        {/* Grid Background */}
                                        <div className={`absolute inset-0 opacity-10`} style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#FFF' : '#000'} 1px, transparent 1px)`, backgroundSize: '8px 8px' }}></div>

                                        <div className="relative z-10 transition-all duration-200 text-gray-800 dark:text-white">
                                            {selectedIcon.type === 'custom' && selectedIcon.svgContent ? (
                                                <div
                                                    style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                                                    className="[&>svg]:w-full [&>svg]:h-full"
                                                    dangerouslySetInnerHTML={{ __html: selectedIcon.svgContent }}
                                                />
                                            ) : (
                                                IconComp && <IconComp size={iconSize} strokeWidth={strokeWidth} />
                                            )}
                                        </div>

                                        <div className="absolute bottom-3 right-3 text-[10px] font-mono opacity-50 text-black dark:text-white">
                                            {iconSize}px
                                        </div>
                                    </div>

                                </IconDevWrapper>
                                <div className="mb-4"></div>

                                {/* Sliders & Appearance */}
                                <InspectorAccordion title="Appearance & Content" icon={SlidersHorizontal} defaultOpen={true} showClassNames={showClassNames} devLabel="Visuals">
                                    <IconDevWrapper showClassNames={showClassNames} componentName="IconControls" stateVar="iconSize/strokeWidth">
                                        <div className="space-y-6 mb-4">

                                            <div className="space-y-3">
                                                <SliderWidget
                                                    themeState={themeState}
                                                    label="Preview Size"
                                                    value={iconSize}
                                                    min={12}
                                                    max={64}
                                                    step={4}
                                                    onChange={(v) => setIconSize(v)}
                                                    unit="px"
                                                />
                                            </div>

                                            {selectedIcon.type === 'lucide' && (
                                                <div className="space-y-3">
                                                    <SliderWidget
                                                        themeState={themeState}
                                                        label="Stroke Width"
                                                        value={strokeWidth}
                                                        min={0.5}
                                                        max={3}
                                                        step={0.25}
                                                        onChange={(v) => setStrokeWidth(v)}
                                                        unit="px"
                                                    />
                                                </div>
                                            )}

                                            {selectedIcon.type === 'custom' && (
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 text-gray-400 dark:text-slate-400">
                                                        <Code size={12} /> SVG Code (What's Inside)
                                                    </label>
                                                    <textarea
                                                        value={editSvg}
                                                        onChange={(e) => handleUpdateIcon('svgContent', e.target.value)}
                                                        className="w-full h-32 border rounded-lg p-3 text-xs font-mono outline-none focus:border-purple-500 resize-y bg-gray-50 border-gray-200 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                                                        spellCheck={false}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </IconDevWrapper>
                                </InspectorAccordion>

                                {/* Metadata Fields & Naming */}
                                <InspectorAccordion title="Identity & Naming" icon={FileJson} defaultOpen={true} showClassNames={showClassNames} devLabel="Metadata">
                                    <IconDevWrapper showClassNames={showClassNames} componentName="IconMetadata" stateVar="selectedIcon">
                                        <div className="space-y-4 mb-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">Display Name</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => handleUpdateIcon('name', e.target.value)}
                                                        className="w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-purple-500 transition-colors bg-white border-gray-200 text-gray-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                    />
                                                    <Edit3 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">Category</label>
                                                <div className="relative">
                                                    <select
                                                        value={editCategory}
                                                        onChange={(e) => handleUpdateIcon('category', e.target.value)}
                                                        className="w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-purple-500 appearance-none cursor-pointer bg-white border-gray-200 text-gray-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                    >
                                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">Source</label>
                                                {selectedIcon.type === 'lucide' ? (
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={editIconName}
                                                            onChange={(e) => handleUpdateIcon('iconName', e.target.value)}
                                                            placeholder="Lucide Icon Name"
                                                            className="w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-purple-500 transition-colors bg-white border-gray-200 text-gray-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                        />
                                                        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                                    </div>
                                                ) : (
                                                    <div className="w-full border rounded-lg px-3 py-2 text-sm italic flex items-center gap-2 bg-gray-50 border-gray-200 text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                                                        <Code size={14} /> Custom SVG
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Code Snippets moved here as per 'Naming' group logic often includes code reference */}
                                        <div className="space-y-4 mb-2">
                                            {selectedIcon.type === 'lucide' && (
                                                <div className="group relative">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">Import</span>
                                                        {copied && <span className="text-[10px] text-green-500 font-bold animate-in fade-in">Copied!</span>}
                                                    </div>
                                                    <div
                                                        onClick={() => handleCopy(`import { ${editIconName || selectedIcon.iconName} } from 'lucide-react';`)}
                                                        className="rounded-lg p-3 border cursor-pointer transition-colors relative bg-slate-900 border-slate-800 group-hover:border-slate-600 dark:bg-black dark:border-slate-700 dark:group-hover:border-slate-500"
                                                    >
                                                        <code className="text-xs font-mono text-purple-300 block break-all">
                                                            import &#123; {editIconName || selectedIcon.iconName} &#125; from 'lucide-react';
                                                        </code>
                                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Copy size={14} className="text-slate-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>



                                        <div className="group relative">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
                                                    {selectedIcon.type === 'lucide' ? 'Usage' : 'SVG Context'}
                                                </span>
                                                {selectedIcon.type === 'custom' && copied && <span className="text-[10px] text-green-500 font-bold animate-in fade-in">Copied!</span>}
                                            </div>
                                            {selectedIcon.type === 'lucide' ? (
                                                <div
                                                    onClick={() => handleCopy(`<${editIconName || selectedIcon.iconName} size={${iconSize}} />`)}
                                                    className="rounded-lg p-3 border cursor-pointer transition-colors relative bg-slate-900 border-slate-800 group-hover:border-slate-600 dark:bg-black dark:border-slate-700 dark:group-hover:border-slate-500"
                                                >
                                                    <code className="text-xs font-mono text-blue-300 block break-all">
                                                        &lt;{editIconName || selectedIcon.iconName} size={'{'}{iconSize}{'}'} /&gt;
                                                    </code>
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Copy size={14} className="text-slate-400" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => handleCopy(editSvg || selectedIcon.svgContent || '')}
                                                    className="rounded-lg p-3 border cursor-pointer transition-colors relative bg-slate-900 border-slate-800 group-hover:border-slate-600 dark:bg-black dark:border-slate-700 dark:group-hover:border-slate-500"
                                                >
                                                    <div className="flex items-center gap-2 mb-2 text-[10px] text-yellow-500 font-bold uppercase tracking-wide">
                                                        <AlertTriangle size={10} />
                                                        dangerouslySetInnerHTML
                                                    </div>
                                                    <code className="text-xs font-mono text-slate-400 block break-all line-clamp-3">
                                                        {editSvg || selectedIcon.svgContent}
                                                    </code>
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Copy size={14} className="text-slate-400" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    </IconDevWrapper>
                                </InspectorAccordion>

                                <hr className="border-gray-100 dark:border-slate-800" />

                                {/* Actions (Add / Delete) */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setIsAddModalOpen(true)}
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-bold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity`}
                                        style={{ backgroundColor: themeState.primary, color: themeState.primaryBtnText }}
                                    >
                                        <Plus size={14} /> Add New
                                    </button>
                                    <button
                                        onClick={handleDeleteIcon}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 font-bold text-xs rounded-xl transition-colors bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div >
                </div >
            </div >
            <IconPickerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddIcon}
                existingIconIds={icons.map(i => i.id)}
                themeState={themeState}
            />
        </>
    );
};

export default IconsSection;