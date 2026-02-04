
import React, { useState, useRef, useEffect } from 'react';
import {
    X, GripHorizontal, ArrowUpFromLine, ArrowDownToLine,
    AlignVerticalSpaceAround, MoveVertical, Check, Settings2,
    Menu, ArrowRight, Play, Star, Shield, Zap, Globe, BarChart,
    CheckCircle, Users, LayoutTemplate, Palette, Sliders, Tag,
    Eye, MonitorPlay, PencilRuler, Layers, Type, AlignLeft, AlignCenter, AlignRight,
    ArrowUp, ArrowDown, Ban, AlignJustify, MousePointer2, GripVertical, ChevronDown, MoreHorizontal,
    Bold, Italic, Underline, StretchHorizontal, AlignStartVertical, AlignCenterVertical, AlignEndVertical, Ruler,
    ArrowUpToLine, ArrowDownToLineIcon, Columns, Rows, Image as ImageIcon, EyeOff,
    Smartphone, Tablet, Monitor, Tv, Laptop, MousePointerClick, Sparkles, Quote, Copy
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ProjectConfig, ThemeState, TypographyItem, IconEntry } from '../types';
import Header from './Header';
import { StyleGuideView } from './views/StyleGuideView';
import { DevWrapper } from './InspectorCommon';

interface LivePreviewProps {
    initialData: {
        projectConfig: ProjectConfig;
        themeState: ThemeState;
    };
    onExit?: () => void;
    isEmbedded?: boolean;
}

// --- VIEWPORT CONFIGURATION ---
const VIEWPORTS = [
    { id: 'mobile', label: 'Mobile', width: '375px', height: '812px', display: '375 x 812', icon: Smartphone },
    { id: 'tablet', label: 'Tablet', width: '768px', height: '1024px', display: '768 x 1024', icon: Tablet },
    { id: 'desktop', label: 'Desktop', width: '100%', height: '100%', display: 'Responsive', icon: Laptop },
    { id: 'kiosk', label: 'Kiosk Mode', width: '1920px', height: '1080px', display: '1920 x 1080', icon: Tv },
];

// --- TYPOGRAPHY HELPERS ---
const fallbackItems: TypographyItem[] = [
    { name: 'Heading 1', token: 'text-5xl', size: '48px', weight: 'font-extrabold', sample: '', usage: 'Hero' },
    { name: 'Heading 2', token: 'text-4xl', size: '36px', weight: 'font-bold', sample: '', usage: 'Section' },
    { name: 'Heading 3', token: 'text-2xl', size: '24px', weight: 'font-bold', sample: '', usage: 'Subsection' },
    { name: 'Heading 4', token: 'text-xl', size: '20px', weight: 'font-semibold', sample: '', usage: 'Title' },
    { name: 'Body', token: 'text-base', size: '16px', weight: 'font-normal', sample: '', usage: 'Body' },
    { name: 'Caption', token: 'text-sm', size: '14px', weight: 'font-medium', sample: '', usage: 'Caption' },
    { name: 'Label', token: 'text-xs', size: '12px', weight: 'font-bold', sample: '', usage: 'Label' },
];

const getTypographyItem = (items: TypographyItem[], role: string): TypographyItem => {
    const roleMap: Record<string, string[]> = {
        'h1': ['h1', 'hero'],
        'h2': ['h2', 'section'],
        'h3': ['h3', 'subsection'],
        'h4': ['h4', 'title'],
        'body': ['paragraph', 'body', 'content'],
        'caption': ['caption', 'metadata', 'small'],
        'label': ['label', 'utility'],
        'button': ['label', 'button', 'action']
    };

    const keywords = roleMap[role] || [role];
    const found = items.find(item =>
        keywords.some(k =>
            item.name.toLowerCase().includes(k) ||
            item.usage.toLowerCase().includes(k)
        )
    );

    if (found) return found;
    if (role === 'body') return items.find(i => i.name.toLowerCase().includes('body')) || items[0];
    return items[0];
};

const getFlexStyles = (align: string, justify: string) => {
    let alignItems = 'flex-start';
    let textAlign: any = 'left';

    if (align === 'left') { alignItems = 'flex-start'; textAlign = 'left'; }
    if (align === 'center') { alignItems = 'center'; textAlign = 'center'; }
    if (align === 'right') { alignItems = 'flex-end'; textAlign = 'right'; }
    if (align === 'stretch') { alignItems = 'stretch'; textAlign = 'left'; }

    let justifyContent = 'flex-start';
    if (justify === 'start') justifyContent = 'flex-start';
    if (justify === 'center') justifyContent = 'center';
    if (justify === 'end') justifyContent = 'flex-end';
    if (justify === 'space-between') justifyContent = 'space-between';

    return { alignItems, justifyContent, textAlign };
};

// --- ANNOTATION COMPONENTS ---

const AnnotationMarker = ({
    label,
    info,
    visible,
    color = "indigo"
}: {
    label: string,
    info?: string,
    visible: boolean,
    color?: "indigo" | "fuchsia" | "blue" | "emerald"
}) => {
    if (!visible) return null;

    const colors = {
        indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', line: 'bg-indigo-300' },
        fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700', line: 'bg-fuchsia-300' },
        blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', line: 'bg-blue-300' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', line: 'bg-emerald-300' },
    };

    const theme = colors[color];

    return (
        <div className="absolute top-1/2 -translate-y-1/2 right-full mr-3 hidden xl:flex items-center whitespace-nowrap z-30 pointer-events-none group-hover:opacity-100 transition-opacity">
            <div className={`px-2 py-1 ${theme.bg} border ${theme.border} ${theme.text} text-[10px] font-mono rounded flex items-center gap-2 shadow-sm`}>
                <span className="font-bold">{label}</span>
                {info && (
                    <>
                        <span className={`w-px h-3 ${theme.line} opacity-40`}></span>
                        <span className="opacity-80">{info}</span>
                    </>
                )}
            </div>
            <div className={`w-3 h-px ${theme.line} opacity-50`}></div>
            <div className={`w-1 h-1 rounded-full ${theme.line}`}></div>
        </div>
    );
};

const LivePreview: React.FC<LivePreviewProps> = ({ initialData, onExit, isEmbedded = false }) => {
    const { projectConfig, themeState: initialThemeState } = initialData;
    const [themeState, setThemeState] = useState(initialThemeState);

    const typographyItems = projectConfig.generatedContent?.typography?.items || fallbackItems;

    const [activeView, setActiveView] = useState<'landing' | 'styleguide'>('landing');
    const [viewMode, setViewMode] = useState<'design' | 'preview'>('design');

    // Viewport State
    const [activeViewportId, setActiveViewportId] = useState('desktop');
    const [isViewportMenuOpen, setIsViewportMenuOpen] = useState(false);
    const activeViewport = VIEWPORTS.find(v => v.id === activeViewportId) || VIEWPORTS[2];

    const [showLayoutSettings, setShowLayoutSettings] = useState(false);
    const [showAnnotations, setShowAnnotations] = useState(true);
    const [editingLabel, setEditingLabel] = useState<string | null>(null);

    const [freeMode, setFreeMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [contentOrder, setContentOrder] = useState<Record<string, string[]>>({
        hero: ['badge', 'title', 'body', 'actions'],
        features: ['header', 'grid'],
        footer: ['brand', 'product', 'company', 'connect']
    });
    const [dragOverItem, setDragOverItem] = useState<string | null>(null);
    const draggingItem = useRef<string | null>(null);

    const [panelPosition, setPanelPosition] = useState({ x: 24, y: 120 });
    const [activeTarget, setActiveTarget] = useState<string>('Hero');
    const [customLabels, setCustomLabels] = useState<Record<string, string>>({});

    const viewportMenuRef = useRef<HTMLDivElement>(null);

    // Close viewport menu on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (viewportMenuRef.current && !viewportMenuRef.current.contains(event.target as Node)) {
                setIsViewportMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Layout Settings
    const [layoutSettings, setLayoutSettings] = useState({
        heroPaddingTop: 96,
        heroPaddingBottom: 96,
        heroGap: 32,
        heroMinHeight: 600,
        heroAlign: 'center', // 'left', 'center', 'right', 'stretch'
        heroJustify: 'center', // 'start', 'center', 'end', 'space-between'
        heroBold: false,
        heroItalic: false,
        heroUnderline: false,
        heroContainerWidth: 'max-w-7xl',
        heroBgType: 'color', // 'color' | 'image'
        heroBgColor: themeState.background,
        heroBgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
        heroOverlay: 0,

        featuresPaddingTop: 80,
        featuresPaddingBottom: 80,
        featuresGap: 48,
        featuresMinHeight: 0,
        featuresAlign: 'center',
        featuresJustify: 'start',
        featuresBold: false,
        featuresItalic: false,
        featuresUnderline: false,
        featuresContainerWidth: 'max-w-7xl',
        featuresBgType: 'color',
        featuresBgColor: '#f9fafb',
        featuresBgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
        featuresOverlay: 0,

        footerPaddingTop: 64,
        footerPaddingBottom: 48,
        footerGap: 32,
        footerMinHeight: 0,
        footerAlign: 'left',
        footerJustify: 'start',
        footerBold: false,
        footerItalic: false,
        footerUnderline: false,
        footerContainerWidth: 'max-w-7xl',
        footerBgType: 'color',
        footerBgColor: '#ffffff',
        footerBgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
        footerOverlay: 0,
    });

    const isDesign = viewMode === 'design';

    // React to prop changes if theme changes in parent
    useEffect(() => {
        setThemeState(initialThemeState);
    }, [initialThemeState]);

    useEffect(() => {
        setPanelPosition({ x: 24, y: 100 });
    }, []);

    // --- HELPER WRAPPERS ---
    const AnnotatedText: React.FC<{
        role: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
        children: React.ReactNode;
        className?: string;
        as?: React.ElementType;
        color?: string;
        style?: React.CSSProperties;
    }> = ({ role, children, className = "", as: Tag = "p", color, style = {} }) => {
        const item = getTypographyItem(typographyItems, role);
        return (
            <div className={`relative group inline-block max-w-full ${className}`}>
                <Tag
                    className={`${item.token} ${item.weight}`}
                    style={{
                        fontFamily: themeState.fontFamily,
                        color: color || 'inherit',
                        fontSize: item.size,
                        lineHeight: role.startsWith('h') ? 1.1 : 1.5,
                        ...style
                    }}
                >
                    {children}
                </Tag>
                {!freeMode && (
                    <AnnotationMarker
                        label={item.name}
                        info={item.size}
                        visible={showAnnotations && isDesign}
                        color="indigo"
                    />
                )}
            </div>
        );
    };

    const AnnotatedButton = ({ label, type = 'primary', children, style, className = "" }: any) => {
        const getButtonStateStyle = (type: 'primary' | 'secondary' | 'tertiary') => {
            const base = {
                borderRadius: `${themeState.borderRadius}px`,
                padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`,
                fontFamily: themeState.fontFamily,
                fontWeight: 600,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                cursor: 'pointer',
                border: '1px solid transparent'
            };
            let s: any = { ...base };
            let shadowColor = type === 'secondary' ? themeState.secondary : themeState.primary;

            if (type === 'primary') {
                if (themeState.fillMode === 'gradient') {
                    s.background = `linear-gradient(${themeState.gradientAngle || 135}deg, ${themeState.primary} 0%, ${themeState.secondary} 100%)`;
                } else {
                    s.backgroundColor = themeState.primary;
                }
                s.color = themeState.primaryBtnText;
            } else if (type === 'secondary') {
                s.backgroundColor = themeState.secondary;
                s.color = themeState.secondaryBtnText;
            } else {
                s.backgroundColor = 'transparent';
                s.color = themeState.tertiaryBtnText;
                s.border = `1px solid ${themeState.tertiaryBtnText}`;
            }

            switch (themeState.buttonStyle) {
                case 'soft': s.boxShadow = `0 5px 15px -3px ${shadowColor}50`; break;
                case 'neo': s.boxShadow = `3px 3px 0px ${type === 'secondary' ? `${shadowColor}FF` : `${shadowColor}99`}`; break;
                case 'glow': if (type !== 'secondary') s.boxShadow = `0 0 12px 2px ${shadowColor}70`; break;
            }
            return s;
        };
        const computedStyle = style || getButtonStateStyle(type);
        return (
            <div className="relative group inline-block">
                <button style={computedStyle} className={className}>{children}</button>
                {!freeMode && (
                    <AnnotationMarker label={`${type.charAt(0).toUpperCase() + type.slice(1)} Button`} info={themeState.buttonStyle} visible={showAnnotations && isDesign} color="fuchsia" />
                )}
            </div>
        );
    };

    const DraggableBlock: React.FC<{ id: string; section: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; }> = ({ id, section, children, className = "", style = {} }) => {
        const isSelected = selectedItems.has(id);
        const isDragging = draggingItem.current === id;
        const isOver = dragOverItem === id;
        const handleMouseDown = (e: React.MouseEvent) => {
            if (!freeMode || !isDesign) return;
            e.stopPropagation();
            const newSet = new Set(e.shiftKey ? selectedItems : []);
            if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
            setSelectedItems(newSet);
        };
        const onDragStart = (e: React.DragEvent) => {
            if (!freeMode || !isDesign) { e.preventDefault(); return; }
            draggingItem.current = id;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', id);
            e.stopPropagation();
        };
        const onDragOver = (e: React.DragEvent) => {
            if (!freeMode || !isDesign) return;
            e.preventDefault(); e.stopPropagation();
            if (dragOverItem !== id) setDragOverItem(id);
        };
        const onDrop = (e: React.DragEvent) => {
            if (!freeMode || !isDesign) return;
            e.preventDefault(); e.stopPropagation();
            const dragged = draggingItem.current;
            if (dragged && dragged !== id) {
                setContentOrder(prev => {
                    const list = [...(prev[section] || [])];
                    const fromIndex = list.indexOf(dragged);
                    const toIndex = list.indexOf(id);
                    if (fromIndex !== -1 && toIndex !== -1) {
                        list.splice(fromIndex, 1);
                        list.splice(toIndex, 0, dragged);
                        return { ...prev, [section]: list };
                    }
                    return prev;
                });
            }
            setDragOverItem(null); draggingItem.current = null;
        };
        return (
            <div draggable={freeMode && isDesign} onMouseDown={handleMouseDown} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} className={`transition-all duration-200 relative ${className} ${freeMode && isDesign ? 'cursor-grab hover:ring-2 hover:ring-indigo-300/50' : ''} ${isSelected && freeMode && isDesign ? 'ring-2 ring-indigo-600 z-20' : ''}`} style={{ ...style, opacity: isDragging ? 0.5 : 1, transform: isOver ? 'translateY(4px)' : 'none' }}>
                {isOver && <div className="absolute -top-1 left-0 w-full h-0.5 bg-indigo-500 pointer-events-none" />}
                {children}
            </div>
        );
    };

    const AnnotatedSection = ({ name, children, className = "", style, ...props }: any) => {
        const isActive = activeTarget === name;
        const displayName = customLabels[name] || name;
        const handleSectionClick = (e: React.MouseEvent) => {
            if (freeMode) return;
            e.stopPropagation();
            setActiveTarget(name);
            if (!showLayoutSettings) { setShowLayoutSettings(true); setPanelPosition({ x: 24, y: 100 }); }
        };
        return (
            <section className={`relative group/section transition-all duration-300 ease-out ${className}`} onClick={isDesign ? handleSectionClick : undefined} style={{ ...style, cursor: isDesign && showLayoutSettings && !freeMode ? 'pointer' : undefined }} {...props}>
                {isDesign && !freeMode && (<div className={`absolute inset-x-6 top-0 bottom-0 pointer-events-none z-0 border-x border-dashed transition-colors duration-300 ${isActive ? 'border-indigo-300' : 'border-gray-200/50'}`}></div>)}
                {isDesign && showLayoutSettings && !freeMode && isActive && (
                    <>{style?.paddingTop && (<div className="absolute top-0 left-0 w-full pointer-events-none z-0 border-b border-indigo-300/30" style={{ height: style.paddingTop, backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '8px 8px', opacity: 0.8 }}><div className="absolute top-1/2 left-4 -translate-y-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-600 text-white shadow-sm">Top: {style.paddingTop}</div></div>)}
                        {style?.paddingBottom && (<div className="absolute bottom-0 left-0 w-full pointer-events-none z-0 border-t border-indigo-300/30" style={{ height: style.paddingBottom, backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '8px 8px', opacity: 0.8 }}><div className="absolute top-1/2 left-4 -translate-y-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-600 text-white shadow-sm">Btm: {style.paddingBottom}</div></div>)}</>
                )}
                {isDesign && showAnnotations && !freeMode && (
                    <div className={`absolute inset-0 border-2 pointer-events-none z-0 transition-all duration-200 ${isActive ? 'border-indigo-500 border-solid bg-indigo-50/5' : 'border-blue-400/30 border-dashed group-hover/section:border-blue-400/60'}`}><div onClick={(e) => { e.stopPropagation(); if (isActive) setEditingLabel(name); else handleSectionClick(e); }} className={`absolute -top-3 left-4 px-2 py-0.5 text-[10px] font-bold font-mono rounded flex items-center gap-2 shadow-sm z-10 transition-colors pointer-events-auto cursor-pointer ${isActive ? 'bg-indigo-600 text-white border border-indigo-600' : 'bg-blue-50 border border-blue-200 text-blue-700'}`}><Layers size={10} />{editingLabel === name ? (<input type="text" autoFocus value={displayName} onChange={(e) => setCustomLabels(prev => ({ ...prev, [name]: e.target.value }))} onBlur={() => setEditingLabel(null)} onKeyDown={(e) => e.key === 'Enter' && setEditingLabel(null)} className="bg-transparent border-none outline-none text-white w-20 p-0" />) : (<span>{displayName} {isActive && '(Active)'}</span>)}</div></div>
                )}
                <div className="relative z-10 h-full flex flex-col w-full"><div className={`${isDesign && !freeMode ? 'border-2 border-dashed border-gray-200/50 rounded-lg' : ''} h-full flex flex-col w-full`}>{children}</div></div>
            </section>
        );
    };

    // --- TOOLBAR ---
    const LayoutToolbar = () => {
        const [dragging, setDragging] = useState(false);
        const [relPos, setRelPos] = useState({ x: 0, y: 0 });
        const panelRef = useRef<HTMLDivElement>(null);
        const [activePopover, setActivePopover] = useState<'target' | 'alignment' | 'distribution' | 'dimensions' | 'background' | null>(null);

        type LayoutKey = keyof typeof layoutSettings;
        const getValue = (suffix: string) => (layoutSettings[`${activeTarget.toLowerCase()}${suffix}` as LayoutKey] as any);
        const updateValue = (suffix: string, value: any) => setLayoutSettings(prev => ({ ...prev, [`${activeTarget.toLowerCase()}${suffix}` as LayoutKey]: value }));

        const handleMouseDown = (e: React.MouseEvent) => {
            if (panelRef.current && (e.target as HTMLElement).closest('.drag-handle')) {
                const rect = panelRef.current.getBoundingClientRect();
                setRelPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                setDragging(true);
                e.stopPropagation(); e.preventDefault();
            }
        };
        useEffect(() => {
            if (dragging) {
                const onMove = (e: MouseEvent) => setPanelPosition({ x: e.clientX - relPos.x, y: e.clientY - relPos.y });
                const onUp = () => setDragging(false);
                window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
                return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
            }
        }, [dragging, relPos]);
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => { if (panelRef.current && !panelRef.current.contains(e.target as Node)) setActivePopover(null); };
            window.addEventListener('mousedown', handleClickOutside); return () => window.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const ToolbarButton = ({ onClick, active, icon: Icon, title }: any) => (
            <button onClick={onClick} className={`p-2 rounded-lg transition-colors ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`} title={title}><Icon size={18} /></button>
        );
        const PopoverOption = ({ onClick, active, icon: Icon, label }: any) => (
            <button onClick={onClick} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50'}`}><div className="flex items-center gap-2"><Icon size={14} /><span>{label}</span></div>{active && <Check size={12} />}</button>
        );

        return (
            <div ref={panelRef} onMouseDown={handleMouseDown} className="fixed bg-white rounded-2xl shadow-2xl border border-gray-200 z-[100] animate-in fade-in zoom-in-95 duration-200 flex items-center select-none" style={{ left: panelPosition.x, top: panelPosition.y }}>
                <div className="flex items-center h-14 px-2">
                    <div className="relative">
                        <button onClick={() => setActivePopover(activePopover === 'target' ? null : 'target')} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors drag-handle cursor-grab active:cursor-grabbing text-gray-700">
                            <GripVertical size={16} className="text-gray-400" />
                            <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Edit</span>
                            <span className="text-sm font-bold min-w-[60px] text-left">{customLabels[activeTarget] || activeTarget}</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {activePopover === 'target' && (
                            <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                                {['Hero', 'Features', 'Footer'].map(t => (
                                    <button key={t} onClick={() => { setActiveTarget(t); setActivePopover(null); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 font-medium flex items-center justify-between" style={{ color: activeTarget === t ? themeState.primary : '#374151' }}>{customLabels[t] || t}{activeTarget === t && <Check size={14} />}</button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-px h-6 bg-gray-200 mx-2"></div>
                    <div><ToolbarButton onClick={() => setFreeMode(!freeMode)} active={freeMode} icon={MousePointer2} title="Free Design Mode" /></div>
                    <div className="w-4"></div>
                    <button
                        onClick={() => setShowLayoutSettings(false)}
                        className="px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                        style={{
                            backgroundColor: themeState.primary,
                            color: themeState.primaryBtnText
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    };

    const Navbar = ({ children }: { children?: React.ReactNode }) => {
        const navConfig = projectConfig.templateConfig?.navbar;
        return (
            <AnnotatedSection name="Navbar" className="relative flex flex-col">
                <div className="sticky top-0 z-50 bg-white border-b border-gray-100 w-full">
                    <Header
                        title={navConfig?.title || projectConfig.projectName || 'ZAP'}
                        layout={navConfig?.layout || 'minimal'}
                        showSearch={navConfig?.showSearch}
                        showNotifications={navConfig?.showNotifications}
                        showLanguage={navConfig?.showLanguage}
                        showUser={navConfig?.showUser}
                        showLogin={navConfig?.showLogin}
                        theme={themeState}
                        rightAction={navConfig?.showAction ? (
                            <AnnotatedButton label={navConfig.actionLabel || "Action"} type="primary" className="px-5 py-2 text-sm shadow-sm">
                                {navConfig.actionLabel || "Action"}
                            </AnnotatedButton>
                        ) : undefined}
                        disableSticky={true}
                    />
                </div>
                {children}
            </AnnotatedSection>
        );
    };

    const Hero = () => {
        const { alignItems, justifyContent, textAlign } = getFlexStyles(layoutSettings.heroAlign, layoutSettings.heroJustify);
        const blocks: Record<string, React.ReactNode> = {
            badge: <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-2 w-max"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-xs font-bold text-gray-600 uppercase tracking-wide">v2.0 Now Available</span></div>,
            title: <AnnotatedText role="h1" className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl" style={{ fontWeight: layoutSettings.heroBold ? '900' : undefined, fontStyle: layoutSettings.heroItalic ? 'italic' : undefined, textDecoration: layoutSettings.heroUnderline ? 'underline' : undefined }} color={layoutSettings.heroBgType === 'image' && layoutSettings.heroOverlay < 30 ? 'white' : undefined}>Build faster with your <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${themeState.primary}, ${themeState.secondary})` }}>Design System</span></AnnotatedText>,
            body: <AnnotatedText role="body" className={`text-xl md:text-2xl max-w-2xl leading-relaxed ${layoutSettings.heroBgType === 'image' && layoutSettings.heroOverlay < 30 ? 'text-white/80' : 'text-gray-500'}`}>{projectConfig.businessType ? `The ultimate solution for ${projectConfig.businessType} businesses.` : 'Scale your product development with a unified language.'}</AnnotatedText>,
            actions: (
                <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 ${layoutSettings.heroAlign === 'center' ? 'justify-center' : ''}`}>
                    <AnnotatedButton type="primary" label="CTA" className="px-8 py-4 text-base font-bold shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">Start Building <ArrowRight size={20} /></AnnotatedButton>
                    <button className="px-8 py-4 text-base font-bold bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2" style={{ color: themeState.darkText, borderRadius: `${themeState.borderRadius}px` }}><Play size={20} fill="currentColor" className="text-gray-400" /> Watch Demo</button>
                </div>
            )
        };

        return (
            <DevWrapper
                active={isDesign}
                identity={{
                    displayName: "HeroSection",
                    filePath: "components/LivePreview.tsx",
                    parentComponent: "LivePreview"
                }}
            >
                <AnnotatedSection name="Hero" className="relative overflow-hidden"
                    style={{
                        backgroundColor: layoutSettings.heroBgType === 'color' ? layoutSettings.heroBgColor : undefined,
                        backgroundImage: layoutSettings.heroBgType === 'image' ? `url(${layoutSettings.heroBgImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: `${layoutSettings.heroMinHeight}px`,
                        paddingTop: `${layoutSettings.heroPaddingTop}px`,
                        paddingBottom: `${layoutSettings.heroPaddingBottom}px`
                    }}
                >
                    {layoutSettings.heroBgType === 'image' && <div className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none" style={{ opacity: layoutSettings.heroOverlay / 100 }}></div>}
                    <div className={`${layoutSettings.heroContainerWidth} mx-auto px-6 relative z-10 flex flex-col h-full`} style={{ gap: `${layoutSettings.heroGap}px`, alignItems, justifyContent, textAlign }}>
                        {contentOrder.hero.map(key => <DraggableBlock key={key} id={key} section="hero" className={layoutSettings.heroAlign === 'center' ? 'mx-auto' : ''}>{blocks[key]}</DraggableBlock>)}
                    </div>
                    {layoutSettings.heroBgType === 'color' && (
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40"><div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full mix-blend-multiply filter blur-[80px]" style={{ backgroundColor: `${themeState.secondary}` }}></div><div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full mix-blend-multiply filter blur-[80px]" style={{ backgroundColor: '#E0E7FF' }}></div></div>
                    )}
                </AnnotatedSection>
            </DevWrapper>
        );
    };

    const Features = () => {
        const { alignItems, justifyContent, textAlign } = getFlexStyles(layoutSettings.featuresAlign, layoutSettings.featuresJustify);
        const features = [
            { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance out of the box." },
            { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security features built-in." },
            { icon: Star, title: "Premium Design", desc: "World-class visual hierarchy and typography." },
            { icon: Globe, title: "Global Ready", desc: "Localized for multiple languages and regions." },
            { icon: BarChart, title: "Analytics", desc: "Deep insights into user behavior and metrics." },
            { icon: Users, title: "Team Friendly", desc: "Built for collaboration and easy handoffs." },
        ];
        const blocks: Record<string, React.ReactNode> = {
            header: <div className={`max-w-3xl mb-16 ${layoutSettings.featuresAlign === 'center' ? 'mx-auto' : layoutSettings.featuresAlign === 'right' ? 'ml-auto' : 'mr-auto'}`}><AnnotatedText role="h2" className="text-3xl font-bold mb-4" color={layoutSettings.featuresBgType === 'image' && layoutSettings.featuresOverlay < 30 ? 'white' : undefined} style={{ fontWeight: layoutSettings.featuresBold ? '900' : undefined, fontStyle: layoutSettings.featuresItalic ? 'italic' : undefined, textDecoration: layoutSettings.featuresUnderline ? 'underline' : undefined }}>Everything you need</AnnotatedText><AnnotatedText role="body" className={`text-lg ${layoutSettings.featuresBgType === 'image' && layoutSettings.featuresOverlay < 30 ? 'text-white/80' : 'text-gray-500'}`}>A complete toolkit designed to help you launch your {projectConfig.businessType || 'product'} faster and better.</AnnotatedText></div>,
            grid: <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: `${layoutSettings.featuresGap}px` }}>{features.map((f, i) => <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"><div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${themeState.primary}15`, color: themeState.primary, margin: '0 0 1.5rem 0' }}><f.icon size={24} /></div><AnnotatedText role="h3" className="text-xl font-bold mb-3">{f.title}</AnnotatedText><AnnotatedText role="body" className="text-gray-500 leading-relaxed">{f.desc}</AnnotatedText></div>)}</div>
        };
        return (
            <DevWrapper
                active={isDesign}
                identity={{
                    displayName: "FeaturesSection",
                    filePath: "components/LivePreview.tsx",
                    parentComponent: "LivePreview"
                }}
            >
                <AnnotatedSection name="Features" className="border-y border-gray-100 relative"
                    style={{
                        backgroundColor: layoutSettings.featuresBgType === 'color' ? layoutSettings.featuresBgColor : undefined,
                        backgroundImage: layoutSettings.featuresBgType === 'image' ? `url(${layoutSettings.featuresBgImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: `${layoutSettings.featuresMinHeight}px`,
                        paddingTop: `${layoutSettings.featuresPaddingTop}px`,
                        paddingBottom: `${layoutSettings.featuresPaddingBottom}px`
                    }}
                >
                    {layoutSettings.featuresBgType === 'image' && <div className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none" style={{ opacity: layoutSettings.featuresOverlay / 100 }}></div>}
                    <div className={`${layoutSettings.featuresContainerWidth} mx-auto px-6 flex flex-col h-full relative z-10`} style={{ textAlign, justifyContent, alignItems }}>{contentOrder.features.map(key => <DraggableBlock key={key} id={key} section="features" className="w-full">{blocks[key]}</DraggableBlock>)}</div>
                </AnnotatedSection>
            </DevWrapper>
        );
    };

    const Footer = () => {
        const { alignItems, justifyContent, textAlign } = getFlexStyles(layoutSettings.footerAlign, layoutSettings.footerJustify);
        const isDark = layoutSettings.footerBgType === 'image' && layoutSettings.footerOverlay < 30; // Heuristic
        const blocks: Record<string, React.ReactNode> = {
            brand: <div className="col-span-1 md:col-span-1"><AnnotatedText role="h4" className="font-black text-2xl tracking-tight mb-4" color={isDark ? 'white' : undefined} style={{ fontWeight: layoutSettings.footerBold ? '900' : undefined, fontStyle: layoutSettings.footerItalic ? 'italic' : undefined, textDecoration: layoutSettings.footerUnderline ? 'underline' : undefined }}>{projectConfig.projectName || 'ZAP'}</AnnotatedText><AnnotatedText role="caption" className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>© 2024 {projectConfig.projectName || 'ZAP'}. All rights reserved.</AnnotatedText></div>,
            product: <div><AnnotatedText role="label" className={`font-bold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white/80' : ''}`}>Product</AnnotatedText><ul className={`space-y-3 text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}><li><a href="#" className="hover:text-gray-900">Features</a></li><li><a href="#" className="hover:text-gray-900">Pricing</a></li><li><a href="#" className="hover:text-gray-900">Enterprise</a></li></ul></div>,
            company: <div><AnnotatedText role="label" className={`font-bold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white/80' : ''}`}>Company</AnnotatedText><ul className={`space-y-3 text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}><li><a href="#" className="hover:text-gray-900">About</a></li><li><a href="#" className="hover:text-gray-900">Careers</a></li><li><a href="#" className="hover:text-gray-900">Blog</a></li></ul></div>,
            connect: <div><AnnotatedText role="label" className={`font-bold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white/80' : ''}`}>Connect</AnnotatedText><ul className={`space-y-3 text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}><li><a href="#" className="hover:text-gray-900">Twitter</a></li><li><a href="#" className="hover:text-gray-900">LinkedIn</a></li><li><a href="#" className="hover:text-gray-900">GitHub</a></li></ul></div>
        };
        return (
            <DevWrapper
                active={isDesign}
                identity={{
                    displayName: "FooterSection",
                    filePath: "components/LivePreview.tsx",
                    parentComponent: "LivePreview"
                }}
            >
                <AnnotatedSection name="Footer" className="border-t border-gray-100 relative"
                    style={{
                        backgroundColor: layoutSettings.footerBgType === 'color' ? layoutSettings.footerBgColor : undefined,
                        backgroundImage: layoutSettings.footerBgType === 'image' ? `url(${layoutSettings.footerBgImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: `${layoutSettings.footerMinHeight}px`,
                        paddingTop: `${layoutSettings.footerPaddingTop}px`,
                        paddingBottom: `${layoutSettings.footerPaddingBottom}px`
                    }}
                >
                    {layoutSettings.footerBgType === 'image' && <div className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none" style={{ opacity: layoutSettings.footerOverlay / 100 }}></div>}
                    <div className={`${layoutSettings.footerContainerWidth} mx-auto px-6 flex flex-col h-full relative z-10`} style={{ textAlign, justifyContent }}>
                        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: `${layoutSettings.footerGap}px` }}>{contentOrder.footer.map(key => <DraggableBlock key={key} id={key} section="footer">{blocks[key]}</DraggableBlock>)}</div>
                    </div>
                </AnnotatedSection>
            </DevWrapper>
        );
    };

    const Pricing = () => {
        const pricing = projectConfig.generatedContent?.pricing || [];
        return (
            <DevWrapper
                active={isDesign}
                identity={{
                    displayName: "PricingSection",
                    filePath: "components/LivePreview.tsx",
                    parentComponent: "LivePreview"
                }}
            >
                <AnnotatedSection name="Pricing" className="bg-white py-24">
                    <div className={`${layoutSettings.heroContainerWidth} mx-auto px-6`}>
                        <div className="text-center mb-16">
                            <AnnotatedText role="h2" className="text-4xl font-bold mb-4">Simple, Transparent Pricing</AnnotatedText>
                            <AnnotatedText role="body" className="text-gray-500 max-w-2xl mx-auto">Choose the plan that's right for your business.</AnnotatedText>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {pricing.map((plan, i) => (
                                <div key={i} className={`p-8 border rounded-3xl transition-all hover:shadow-xl ${plan.isPopular ? 'border-purple-200 bg-purple-50/5' : 'border-gray-100'}`} style={{ borderRadius: `${themeState.borderRadius * 2}px` }}>
                                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-black">{plan.price}</span>
                                        <span className="text-gray-400 text-sm">/{plan.period}</span>
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${themeState.primary}15`, color: themeState.primary }}><Check size={12} strokeWidth={3} /></div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <AnnotatedButton type={plan.isPopular ? 'primary' : 'tertiary'} className="w-full py-4 font-bold">{plan.buttonLabel}</AnnotatedButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnnotatedSection>
            </DevWrapper>
        );
    };

    const Testimonials = () => {
        const testimonials = projectConfig.generatedContent?.testimonials || [];
        return (
            <DevWrapper
                active={isDesign}
                identity={{
                    displayName: "TestimonialsSection",
                    filePath: "components/LivePreview.tsx",
                    parentComponent: "LivePreview"
                }}
            >
                <AnnotatedSection name="Testimonials" className="bg-gray-50 py-24">
                    <div className={`${layoutSettings.heroContainerWidth} mx-auto px-6`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {testimonials.map((t, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="mb-6"><Quote className="text-gray-200" size={48} fill="currentColor" /></div>
                                    <p className="text-xl italic mb-8" style={{ color: themeState.darkText }}>"{t.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-400">{t.author[0]}</div>
                                        <div>
                                            <h4 className="font-bold text-sm">{t.author}</h4>
                                            <p className="text-xs text-gray-400">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnnotatedSection>
            </DevWrapper>
        );
    };

    if (isEmbedded) {
        return (
            <div className="w-full h-full bg-white transition-all duration-300" style={{ color: themeState.darkText }}>
                {activeView === 'landing' ? (
                    <>
                        <Navbar>
                            <Hero />
                        </Navbar>
                        <Features />
                        <Pricing />
                        <Testimonials />
                        <Footer />
                    </>
                ) : (
                    <>
                        <Navbar />
                        <StyleGuideView projectConfig={projectConfig} themeState={themeState} />
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={`${isEmbedded ? 'h-full' : 'min-h-screen'} bg-white relative flex flex-col`} style={{ fontFamily: themeState.fontFamily }}>
            {/* Browser Frame */}
            <div className={`flex-1 bg-white flex flex-col max-w-full mx-auto w-full ${isEmbedded ? '' : 'shadow-2xl'}`}>
                {/* Browser Header */}
                <div className="bg-gray-900 px-4 py-3 flex items-center justify-between text-gray-400 text-xs font-mono border-b border-gray-800 shrink-0 relative z-20">
                    <div className="flex gap-2 w-32">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>

                    {/* Centered Viewport Selector */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" ref={viewportMenuRef}>
                        <button
                            onClick={() => setIsViewportMenuOpen(!isViewportMenuOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-700 text-gray-200 transition-colors"
                        >
                            <activeViewport.icon size={14} />
                            <span className="font-bold">{activeViewport.label} ({activeViewport.display})</span>
                            <ChevronDown size={12} className="opacity-50" />
                        </button>

                        {isViewportMenuOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                                {VIEWPORTS.map(vp => (
                                    <button
                                        key={vp.id}
                                        onClick={() => { setActiveViewportId(vp.id); setIsViewportMenuOpen(false); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${activeViewportId === vp.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`}
                                    >
                                        <vp.icon size={16} />
                                        <div>
                                            <div className="text-xs font-bold">{vp.label}</div>
                                            <div className="text-[10px] opacity-60">{vp.display}</div>
                                        </div>
                                        {activeViewportId === vp.id && <Check size={14} className="ml-auto text-green-400" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 w-32 justify-end">
                        <button
                            onClick={() => setViewMode('preview')}
                            className={`p-1.5 rounded hover:bg-gray-800 transition-colors ${viewMode === 'preview' ? 'text-white' : 'text-gray-500'}`}
                            title="Preview Mode"
                        >
                            <Eye size={14} />
                        </button>
                        <button
                            onClick={() => setViewMode('design')}
                            className={`p-1.5 rounded hover:bg-gray-800 transition-colors ${viewMode === 'design' ? 'text-white' : 'text-gray-500'}`}
                            title="Design Mode"
                        >
                            <PencilRuler size={14} />
                        </button>
                    </div>
                </div>

                {/* Simulated Viewport Stage */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-gray-900/5 p-8" style={{ scrollBehavior: 'smooth' }}>
                    <div
                        className={`relative transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${activeViewportId === 'desktop' ? 'w-full h-full' : 'shadow-2xl my-8 mx-auto'}`}
                        style={{
                            width: activeViewport.width,
                            minHeight: activeViewport.height !== '100%' ? activeViewport.height : '100%',
                            backgroundColor: themeState.background,
                            color: themeState.darkText,
                            // Ensure border radius for non-desktop views to look like devices
                            borderRadius: activeViewportId === 'desktop' ? '0' : '20px',
                            overflow: 'hidden',
                            border: activeViewportId === 'desktop' ? 'none' : '1px solid rgba(0,0,0,0.1)'
                        }}
                    >
                        {isDesign && showLayoutSettings && <LayoutToolbar />}
                        <div className={`w-full ${isEmbedded ? '' : 'pb-0'}`}>
                            {activeView === 'landing' ? (
                                <>
                                    <Navbar>
                                        <Hero />
                                    </Navbar>
                                    <Features />
                                    <Pricing />
                                    <Testimonials />
                                    <Footer />
                                </>
                            ) : (
                                <>
                                    <Navbar />
                                    <StyleGuideView projectConfig={projectConfig} themeState={themeState} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${isEmbedded ? 'absolute' : ''}`}>
                <div
                    className="p-1.5 backdrop-blur-md border border-white/10 shadow-2xl rounded-full flex gap-1"
                    style={{ backgroundColor: themeState.darkText }}
                >
                    <button
                        onClick={() => setActiveView('landing')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all`}
                        style={{
                            backgroundColor: activeView === 'landing' ? themeState.background : 'transparent',
                            color: activeView === 'landing' ? themeState.darkText : themeState.grayText,
                            boxShadow: activeView === 'landing' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        <LayoutTemplate size={16} /><span>Landing</span>
                    </button>
                    <button
                        onClick={() => setActiveView('styleguide')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all`}
                        style={{
                            backgroundColor: activeView === 'styleguide' ? themeState.background : 'transparent',
                            color: activeView === 'styleguide' ? themeState.darkText : themeState.grayText,
                            boxShadow: activeView === 'styleguide' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        <Palette size={16} /><span>Style Guide</span>
                    </button>
                </div>
            </div>

            {/* Right Bottom Control: Design / Exit Preview */}
            <div className={`fixed bottom-6 right-6 z-50 ${isEmbedded ? 'absolute' : ''}`}>
                <div className="flex items-center gap-1 bg-white p-1.5 rounded-full shadow-2xl border border-gray-200">
                    {isDesign && activeView === 'landing' && (
                        <div className="flex items-center gap-1 pl-1 pr-2 mr-1 border-r border-gray-200">
                            <button
                                onClick={() => { setShowLayoutSettings(!showLayoutSettings); if (!showLayoutSettings) setPanelPosition({ x: 24, y: 100 }); }}
                                className={`p-2 rounded-full transition-all`}
                                style={{
                                    backgroundColor: showLayoutSettings ? `${themeState.primary}20` : 'transparent',
                                    color: showLayoutSettings ? themeState.primary : themeState.grayText
                                }}
                                title="Adjust Layout & Spacing"
                            >
                                <Sliders size={16} />
                            </button>
                            <button
                                onClick={() => setShowAnnotations(!showAnnotations)}
                                className={`p-2 rounded-full transition-all`}
                                style={{
                                    backgroundColor: showAnnotations ? `${themeState.primary}20` : 'transparent',
                                    color: showAnnotations ? themeState.primary : themeState.grayText
                                }}
                                title="Toggle Annotations"
                            >
                                <Tag size={16} />
                            </button>
                        </div>
                    )}

                    {/* Hide Exit Preview if Embedded */}
                    {!isEmbedded && (
                        <button
                            onClick={onExit}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all"
                            style={{
                                backgroundColor: themeState.darkText,
                                color: themeState.lightText,
                            }}
                        >
                            <EyeOff size={14} /> Exit Preview
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
};

export default LivePreview;
