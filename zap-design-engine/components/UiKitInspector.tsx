import React, { useState, useEffect, useRef } from 'react';
import { ProjectConfig, ThemeState, IconEntry } from '../types';
import {
    Palette, Box, Sliders, Check, Monitor, Laptop, Zap, Bell, Shield, CreditCard, BarChart, Sparkles, GripVertical, MousePointer2, ArrowRight, Type,
    Square, Droplet, Layers, Copy, LayoutTemplate, MousePointerClick, LayoutDashboard, Search, Code2, Wand2, X, Pipette, Hash, Cloud, FileUp, Trash2, ChevronLeft, ChevronRight, ArrowUpRight, Plus, Upload, FileText, Info, Filter, Minus, AlignLeft, AlignCenter, AlignRight,
    Download, AlertCircle, ChevronDown, Circle, PlusCircle, Lock, ArrowUpLeft, ExternalLink, ArrowUp, ArrowLeft, EyeOff, Sun, Moon,
    Layout, Move, Maximize, Scissors, Library, BookOpen
} from 'lucide-react';
import { useStore } from '../store';
import { FONT_PRESETS } from './fontPresets';
import { THEME_PRESETS } from './themePresets';
import ColorPicker from './ColorPicker';
import { DevDocBanner, EnhancedDevContext, ContainerDevWrapper } from './DevDocBanner';
import { DevBadge, ControlDevWrapper, InspectorAccordion, StyleCardOption } from './InspectorCommon';
import { InspectorHeader } from './InspectorHeader';
import { SliderWidget } from './atoms/SliderWidget';
import { ButtonInspector } from './ButtonInspector';
import { WidgetInspector } from './WidgetInspector';
import { FeedbackInspector } from './FeedbackInspector';
import { InfoCard } from './atoms/InfoCard';

// Helper: Load Google Font
const loadGoogleFont = (fontFamily: string) => {
    if (!fontFamily || ['System', 'sans-serif', 'serif', 'monospace'].includes(fontFamily) || fontFamily.startsWith('-apple')) return;
    const fontName = fontFamily.split(',')[0].replace(/['"]/g, '').trim();
    const linkId = `font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
    if (!document.getElementById(linkId)) { const link = document.createElement('link'); link.id = linkId; link.rel = 'stylesheet'; link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800&display=swap`; document.head.appendChild(link); }
};

// Helper: Variant Dropdown
const VariantDropdown = ({ themeState, updateTheme }: { themeState: ThemeState, updateTheme: (u: Partial<ThemeState>) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const options = [{ value: 'outlined', label: 'Outlined', icon: Square, fill: false }, { value: 'filled', label: 'Filled', icon: Square, fill: true }, { value: 'underlined', label: 'Underlined', labelIcon: Minus, icon: Minus, fill: false }];
    const currentOption = options.find(o => o.value === themeState.formVariant) || options[0];
    const Icon = currentOption.icon;
    return (
        <div className="relative" ref={containerRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition-all hover:border-gray-300" style={{ borderColor: isOpen ? themeState.primary : undefined, boxShadow: isOpen ? `0 0 0 4px ${themeState.primary}20` : 'none' }}>
                <div className="flex items-center gap-3"><Icon size={18} className="text-gray-500" fill={currentOption.fill ? "currentColor" : "none"} /><span>{currentOption.label}</span></div><ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (<div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">{options.map((opt) => { const isSelected = themeState.formVariant === opt.value; const OptIcon = opt.icon; return (<button key={opt.value} onClick={() => { updateTheme({ formVariant: opt.value as any }); setIsOpen(false); }} className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-gray-50 transition-colors" style={{ backgroundColor: isSelected ? `${themeState.primary}10` : undefined, color: isSelected ? themeState.primary : '#374151' }}><div className="flex items-center gap-3"><OptIcon size={18} className={isSelected ? "" : "text-gray-400"} fill={opt.fill ? "currentColor" : "none"} /><span className={isSelected ? "font-bold" : "font-medium"}>{opt.label}</span></div>{isSelected && <Check size={14} />}</button>); })}</div>)}
        </div>
    );
};

interface UiKitInspectorProps {
    activeCategory: string;
    themeState: ThemeState;
    setThemeState: (theme: ThemeState) => void;
    showClassNames: boolean;
    setShowClassNames: (show: boolean) => void;
    config: ProjectConfig;
    onUpdateConfig: (config: ProjectConfig) => void;
    onCategoryChange?: (category: string) => void;
    isDarkMode?: boolean;
    fontEditorMode?: 'primary' | 'secondary';
    setFontEditorMode?: (mode: 'primary' | 'secondary') => void;
}

export const UiKitInspector: React.FC<UiKitInspectorProps> = ({
    activeCategory,
    themeState,
    setThemeState,
    showClassNames,
    setShowClassNames,
    config,
    onUpdateConfig,
    onCategoryChange,
    isDarkMode = false,
    fontEditorMode = 'primary',
    setFontEditorMode
}) => {
    const {
        userRole,
        setMasterConfig,
        setMerchantOverride,
        masterConfig
    } = useStore();

    const [customFontInput, setCustomFontInput] = useState('');

    // Typography Context Switcher
    const currentFontTarget = fontEditorMode;

    const updateTheme = (update: Partial<ThemeState>) => {
        if (userRole === 'admin') {
            setMasterConfig(update);
            // ADMIN OVERRIDE RULE: When Admin sets a value, clear the Merchant override 
            // to ensure the Admin's decision becomes the Effective Value.
            setMerchantOverride((prev) => {
                const next = { ...prev };
                Object.keys(update).forEach((key) => {
                    // Explicitly set to undefined so 'updateComputedTheme' knows to use Master value
                    // @ts-ignore
                    next[key as keyof ThemeState] = undefined;
                });
                return next;
            });
        } else {
            setMerchantOverride(update);
        }
    };

    const applyThemePreset = (preset: any) => { updateTheme(preset.colors); };
    const handlePrimaryChange = (newColor: string) => { updateTheme({ primary: newColor, activeColor: newColor, tertiaryBtnText: newColor }); };


    const handleFontChange = (fontFamily: string) => {
        if (currentFontTarget === 'primary') {
            updateTheme({ fontFamily: fontFamily });
        } else {
            updateTheme({ secondaryFontFamily: fontFamily });
        }
    };

    const activeFontFamily = currentFontTarget === 'primary' ? themeState.fontFamily : (themeState.secondaryFontFamily || themeState.fontFamily);

    const devContext: EnhancedDevContext = {
        identity: {
            displayName: activeCategory === 'Brand Colors' ? "ColorSystem" : (activeCategory === 'Typography' ? "FontSystem" : (activeCategory === 'Buttons' ? "ButtonLogic" : "UiKitInspector")),
            filePath: "components/UiKitInspector.tsx",
            parentComponent: "App",
            htmlTag: "aside",
            type: "Organism/Controller"
        },
        state: {
            sourceVar: "themeState",
            handlerProp: "setThemeState",
            dataType: "ThemeState",
            currentValuePreview: activeCategory === 'Brand Colors' ? themeState.primary : (activeCategory === 'Typography' ? activeFontFamily : `${themeState.borderRadius}px`)
        },
        styling: {
            tailwindClasses: "p-6 overflow-y-auto custom-scrollbar",
            themeTokens: [
                activeCategory === 'Brand Colors' ? "primary, secondary, background" :
                    activeCategory === 'Typography' ? "fontFamily" : "borderRadius, btnPaddingX"
            ]
        },
        structure: {
            architecture: activeCategory === 'Brand Colors' ? "ARCHITECTURE // SYSTEMS // PALETTE" :
                activeCategory === 'Typography' ? "ARCHITECTURE // SYSTEMS // TYPEFACE" :
                    activeCategory === 'Buttons' ? "ARCHITECTURE // SYSTEMS // LOGIC" : "ARCHITECTURE // SYSTEMS // PROTOCOL",
            structuralRole: "ORGANISM // CONTROLLER",
            codeAudit: "PROTOCOL :: OPERATIONAL"
        }
    };

    const inspectorIdentity = {
        displayName: activeCategory === 'Brand Colors' ? "ColorInspector" : (activeCategory === 'Typography' ? "TypeInspector" : "BrandInspector"),
        filePath: "components/UiKitInspector.tsx",
        parentComponent: "App",
        type: "Organism/Block" // Level 5: Block
    };

    return (
        <ContainerDevWrapper
            showClassNames={showClassNames}
            atomic="Organism"
            identity={{
                ...inspectorIdentity,
                architecture: activeCategory === 'Brand Colors' ? "SYSTEMS // PALETTE" :
                    activeCategory === 'Typography' ? "SYSTEMS // TYPOGRAPHY" :
                        activeCategory === 'Buttons' ? "SYSTEMS // ACTION" : "SYSTEMS // PROTOCOL"
            }}
            className="flex flex-col h-full transition-colors duration-300 bg-white text-gray-900 dark:bg-slate-900 dark:text-white"
        >
            {/* Sticky Inspector Header */}
            <InspectorHeader
                title={activeCategory === "Form Elements" ? "Forms" : activeCategory}
                badge="Controller"
                showClassNames={showClassNames}
                setShowClassNames={setShowClassNames}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <DevDocBanner
                    visible={showClassNames}
                    devContext={devContext}
                    context="controller"
                />

                {/* 1. GEOMETRY ENGINE (Physics) */}
                {userRole === 'admin' && activeCategory === 'Brand Colors' && (
                    <div className="mb-8 animate-in slide-in-from-top-2 duration-400">
                        <ContainerDevWrapper
                            showClassNames={showClassNames}
                            identity={{
                                displayName: "PhysicsEngine",
                                filePath: "components/UiKitInspector.tsx",
                                parentComponent: "UiKitInspector",
                                type: "Molecule/Part",
                                architecture: "SYSTEMS // PHYSICS"
                            }}
                            atomic="Molecule"
                        >
                            <InspectorAccordion title="Layout Physics" icon={Layout} defaultOpen={true} showClassNames={showClassNames} devLabel="AdminOnly">
                                <div className="space-y-4">
                                    <ControlDevWrapper active={showClassNames} tokenKey="borderRadius" filePath="components/UiKitInspector.tsx">
                                        <SliderWidget
                                            themeState={themeState}
                                            label="Global Radius"
                                            value={themeState.borderRadius || 12}
                                            min={0} max={32} step={1}
                                            onChange={(v) => {
                                                setMasterConfig({ borderRadius: v });
                                                setMerchantOverride((prev) => ({ ...prev, borderRadius: undefined }));
                                            }}
                                            unit="px"
                                        />
                                    </ControlDevWrapper>

                                    <ControlDevWrapper active={showClassNames} tokenKey="spacing" filePath="components/UiKitInspector.tsx">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            <span>Density Scale</span>
                                            <span className="text-purple-600">Admin</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <StyleCardOption
                                                active={themeState.layoutGap === 16}
                                                label="Tight"
                                                icon={Maximize}
                                                onClick={() => {
                                                    setMasterConfig({ depth: 0.5, btnPaddingX: 16, btnPaddingY: 8, layoutGap: 16, sectionPadding: 24 });
                                                    setMerchantOverride((prev) => ({ ...prev, depth: undefined, btnPaddingX: undefined, btnPaddingY: undefined, layoutGap: undefined, sectionPadding: undefined }));
                                                }}
                                                accentColor={themeState.primary}
                                            />
                                            <StyleCardOption
                                                active={themeState.layoutGap === 32}
                                                label="Default"
                                                icon={Move}
                                                onClick={() => {
                                                    setMasterConfig({ depth: 1, btnPaddingX: 24, btnPaddingY: 12, layoutGap: 32, sectionPadding: 48 });
                                                    setMerchantOverride((prev) => ({ ...prev, depth: undefined, btnPaddingX: undefined, btnPaddingY: undefined, layoutGap: undefined, sectionPadding: undefined }));
                                                }}
                                                accentColor={themeState.primary}
                                            />
                                            <StyleCardOption
                                                active={themeState.layoutGap === 48}
                                                label="Loose"
                                                icon={Maximize}
                                                onClick={() => {
                                                    setMasterConfig({ depth: 1.5, btnPaddingX: 32, btnPaddingY: 16, layoutGap: 48, sectionPadding: 80 });
                                                    setMerchantOverride((prev) => ({ ...prev, depth: undefined, btnPaddingX: undefined, btnPaddingY: undefined, layoutGap: undefined, sectionPadding: undefined }));
                                                }}
                                                accentColor={themeState.primary}
                                            />
                                        </div>
                                    </ControlDevWrapper>
                                </div>
                            </InspectorAccordion>
                        </ContainerDevWrapper>
                    </div>
                )}

                {/* 2. BRAND COLORS (Palette) */}
                {activeCategory === 'Brand Colors' && (
                    <div className="animate-in fade-in duration-300">
                        <div className="space-y-2">
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{
                                    displayName: "ThemeLibrary",
                                    filePath: "components/UiKitInspector.tsx",
                                    parentComponent: "UiKitInspector",
                                    type: "Molecule/Part",
                                    architecture: "SYSTEMS // LIBRARY"
                                }}
                                atomic="Molecule"
                            >
                                <InspectorAccordion title="Theme Library" icon={Library} defaultOpen={true} showClassNames={showClassNames} devLabel="Presets">
                                    <ControlDevWrapper active={showClassNames} tokenKey="preset">
                                        <div className="grid grid-cols-2 gap-2">
                                            {THEME_PRESETS.map((preset) => (
                                                <button key={preset.id} onClick={() => applyThemePreset(preset)} className="text-left p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all group bg-white relative overflow-hidden">
                                                    <div className="flex h-8 rounded-md overflow-hidden mb-2 ring-1 ring-black/5"><div className="w-1/3 h-full" style={{ backgroundColor: preset.colors.primary }}></div><div className="w-1/3 h-full" style={{ backgroundColor: preset.colors.secondary }}></div><div className="w-1/3 h-full" style={{ backgroundColor: preset.colors.background }}></div></div><div className="font-bold text-[10px] text-gray-900 truncate">{preset.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </ControlDevWrapper>
                                </InspectorAccordion>
                            </ContainerDevWrapper>
                            <InspectorAccordion title="Color System" icon={Palette} defaultOpen={true} showClassNames={showClassNames} devLabel="Color Tokens">
                                <div className="mb-4">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Brand Identity</label>
                                    <ControlDevWrapper active={showClassNames} tokenKey="primary">
                                        <ColorPicker label="Primary" value={themeState.primary} onChange={handlePrimaryChange} />
                                    </ControlDevWrapper>
                                    <div className="h-2" />
                                    <ControlDevWrapper active={showClassNames} tokenKey="secondary" filePath="components/UiKitInspector.tsx">
                                        <ColorPicker label="Secondary" value={themeState.secondary} onChange={(v) => updateTheme({ secondary: v })} />
                                    </ControlDevWrapper>
                                </div>
                                <div className="mb-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Surfaces</label>
                                    <div className="space-y-2">
                                        <ControlDevWrapper active={showClassNames} tokenKey="background" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Background" value={themeState.background} onChange={(v) => updateTheme({ background: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="background2" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Surface (Card)" value={themeState.background2} onChange={(v) => updateTheme({ background2: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="background3" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Surface (Input)" value={themeState.background3} onChange={(v) => updateTheme({ background3: v })} />
                                        </ControlDevWrapper>
                                    </div>
                                </div>
                                <div className="mb-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Typography</label>
                                    <div className="space-y-2">
                                        <ControlDevWrapper active={showClassNames} tokenKey="darkText" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Dark Text" value={themeState.darkText} onChange={(v) => updateTheme({ darkText: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="grayText" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Gray Text" value={themeState.grayText} onChange={(v) => updateTheme({ grayText: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="lightText" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Light Text" value={themeState.lightText} onChange={(v) => updateTheme({ lightText: v })} />
                                        </ControlDevWrapper>
                                    </div>
                                </div>
                                <div className="mb-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Interactive & Status</label>
                                    <div className="space-y-2">
                                        <ControlDevWrapper active={showClassNames} tokenKey="activeColor" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Active" value={themeState.activeColor || themeState.primary} onChange={(v) => updateTheme({ activeColor: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="formErrorColor" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Error" value={themeState.formErrorColor || '#EF4444'} onChange={(v) => updateTheme({ formErrorColor: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="inputBorder" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Border" value={themeState.inputBorder || '#E5E7EB'} onChange={(v) => updateTheme({ inputBorder: v })} />
                                        </ControlDevWrapper>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-50 dark:border-slate-800">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Component Specific</label>
                                    <div className="space-y-2">
                                        <ControlDevWrapper active={showClassNames} tokenKey="primaryBtnText" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Primary Text" value={themeState.primaryBtnText} onChange={(v) => updateTheme({ primaryBtnText: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="secondaryBtnText" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Secondary Text" value={themeState.secondaryBtnText} onChange={(v) => updateTheme({ secondaryBtnText: v })} />
                                        </ControlDevWrapper>
                                        <ControlDevWrapper active={showClassNames} tokenKey="tertiaryBtnText" filePath="components/UiKitInspector.tsx">
                                            <ColorPicker label="Tertiary" value={themeState.tertiaryBtnText} onChange={(v) => updateTheme({ tertiaryBtnText: v })} />
                                        </ControlDevWrapper>
                                    </div>
                                </div>
                            </InspectorAccordion>
                        </div>
                    </div>
                )}

                {/* 3. FONT SYSTEM (Typography) */}
                {activeCategory === 'Typography' && (
                    <div className="animate-in fade-in duration-300 space-y-2">
                        <div className="bg-gray-100 p-1 rounded-lg flex mb-4">
                            <button
                                onClick={() => setFontEditorMode && setFontEditorMode('primary')}
                                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${currentFontTarget === 'primary' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Primary (Headings)
                            </button>
                            <button
                                onClick={() => setFontEditorMode && setFontEditorMode('secondary')}
                                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${currentFontTarget === 'secondary' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Secondary (Body)
                            </button>
                        </div>

                        <InspectorAccordion title={`Active ${currentFontTarget === 'primary' ? 'Primary' : 'Secondary'} Font`} icon={Check} defaultOpen={true} showClassNames={showClassNames} devLabel="Font Family">
                            <ControlDevWrapper active={showClassNames} tokenKey={currentFontTarget === 'primary' ? "fontFamily" : "secondaryFontFamily"}>
                                <div className="relative overflow-hidden border rounded-2xl p-6 shadow-sm h-32 flex flex-col justify-center group cursor-default transition-colors duration-300 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-bold mb-1 truncate text-gray-900 dark:text-white" style={{ fontFamily: activeFontFamily }}>
                                            {activeFontFamily.split(',')[0].replace(/['"]/g, '')}
                                        </h2>
                                        <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
                                            {currentFontTarget === 'primary' ? 'Headings & Titles' : 'Body Copy & UI'}
                                        </p>
                                    </div>
                                    <div className="absolute -right-4 -bottom-8 font-serif text-[120px] leading-none pointer-events-none select-none opacity-50 transition-opacity group-hover:opacity-70 text-gray-100 dark:text-slate-700" style={{ fontFamily: activeFontFamily }}>Aa</div>
                                </div>
                            </ControlDevWrapper>
                        </InspectorAccordion>
                        <InspectorAccordion title="Preset Fonts" icon={Library} defaultOpen={true} showClassNames={showClassNames} devLabel="Library">
                            <ControlDevWrapper active={showClassNames} tokenKey="presetFonts">
                                <div className="space-y-3">
                                    {FONT_PRESETS.map((font) => {
                                        const isSelected = activeFontFamily === font.family;
                                        return (
                                            <button key={font.id} onClick={() => { loadGoogleFont(font.family); handleFontChange(font.family); }} className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group relative ${isSelected ? 'border-purple-500 shadow-sm ring-1 ring-purple-500 z-10 bg-white dark:bg-slate-800' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white dark:bg-slate-950 dark:border-slate-800 dark:hover:border-slate-700'}`}>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white" style={{ fontFamily: font.family }}>{font.name}</div>
                                                    <div className="text-[10px] font-medium mt-0.5 text-gray-400 dark:text-slate-500">{font.category}</div>
                                                </div>
                                                {isSelected && (<div className="w-2.5 h-2.5 rounded-full bg-purple-50 shadow-sm"></div>)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </ControlDevWrapper>
                        </InspectorAccordion>
                        <InspectorAccordion title="Custom Google Font" icon={Cloud} defaultOpen={true} showClassNames={showClassNames} devLabel="Load Resource">
                            <ControlDevWrapper active={showClassNames} tokenKey="customFont">
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={customFontInput} onChange={(e) => setCustomFontInput(e.target.value)} placeholder="e.g. Pacifico" className="flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500 transition-colors bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white" onKeyDown={(e) => { if (e.key === 'Enter') { loadGoogleFont(customFontInput); handleFontChange(customFontInput); } }} />
                                    <button onClick={() => { if (customFontInput) { loadGoogleFont(customFontInput); handleFontChange(customFontInput); } }} className="p-2.5 rounded-xl transition-colors bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300" title="Load Font"><Download size={18} /></button>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed">Enter the exact family name from Google Fonts.<br />Example: "Playfair Display" or "Roboto Condensed"</p>
                            </ControlDevWrapper>
                        </InspectorAccordion>
                    </div>
                )}

                {/* 4. BUTTON LOGIC (Logic) */}
                {activeCategory === 'Buttons' && (
                    <div className="animate-in fade-in duration-300">
                        <ButtonInspector
                            themeState={themeState}
                            setThemeState={setThemeState}
                            showClassNames={showClassNames}
                            onCategoryChange={onCategoryChange}
                        />
                    </div>
                )}

                {/* 5. WIDGETS (Interactive) */}
                {activeCategory === 'Widgets' && (
                    <div className="animate-in fade-in duration-300">
                        <WidgetInspector
                            config={config}
                            onUpdateConfig={onUpdateConfig}
                            themeState={themeState}
                            showClassNames={showClassNames}
                            setShowClassNames={setShowClassNames}
                        />
                    </div>
                )}

                {/* 6. FEEDBACK (System) */}
                {activeCategory === 'Feedback' && (
                    <div className="animate-in fade-in duration-300">
                        <FeedbackInspector
                            config={config}
                            onUpdateConfig={onUpdateConfig}
                            themeState={themeState}
                            showClassNames={showClassNames}
                            setShowClassNames={setShowClassNames}
                        />
                    </div>
                )}

                {/* 5. INPUT SYSTEM (Forms) */}
                {(activeCategory === 'Form Elements' || activeCategory === 'Forms') && (
                    <div className="animate-in fade-in duration-300">
                        <div className="space-y-2">
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{
                                    displayName: "InputStyleControl",
                                    type: "Molecule/Part",
                                    architecture: "SYSTEMS // INPUT STYLE",
                                    filePath: "components/UiKitInspector.tsx"
                                }}
                                atomic="Molecule"
                            >
                                <InspectorAccordion title="Input Style" icon={AlignLeft} defaultOpen={true} showClassNames={showClassNames} devLabel="Labeling">
                                    <div className="space-y-1.5 mb-4">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Label Position</label>
                                        <ControlDevWrapper active={showClassNames} tokenKey="formLabelStyle" filePath="components/UiKitInspector.tsx">
                                            <div className="grid grid-cols-2 gap-2"><StyleCardOption active={themeState.formLabelStyle === 'top'} label="Top" icon={ArrowUp} onClick={() => updateTheme({ formLabelStyle: 'top' })} accentColor={themeState.primary} /><StyleCardOption active={themeState.formLabelStyle === 'left'} label="Left" icon={ArrowLeft} onClick={() => updateTheme({ formLabelStyle: 'left' })} accentColor={themeState.primary} /><StyleCardOption active={themeState.formLabelStyle === 'floating'} label="Floating" icon={Type} onClick={() => updateTheme({ formLabelStyle: 'floating' })} accentColor={themeState.primary} /><StyleCardOption active={themeState.formLabelStyle === 'hidden'} label="Hidden" icon={EyeOff} onClick={() => updateTheme({ formLabelStyle: 'hidden' })} accentColor={themeState.primary} /></div>
                                        </ControlDevWrapper>
                                    </div>
                                </InspectorAccordion>
                            </ContainerDevWrapper>
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{
                                    displayName: "InputColorControl",
                                    type: "Molecule/Part",
                                    architecture: "SYSTEMS // INPUT COLOR",
                                    filePath: "components/UiKitInspector.tsx"
                                }}
                                atomic="Molecule"
                            >
                                <InspectorAccordion title="Form Specific Colors" icon={Palette} defaultOpen={true} showClassNames={showClassNames} devLabel="Input Colors">
                                    <ControlDevWrapper active={showClassNames} tokenKey="formLabelColor" filePath="components/UiKitInspector.tsx"><ColorPicker label="Label Text" value={themeState.formLabelColor || '#374151'} onChange={(v) => updateTheme({ formLabelColor: v })} /></ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="formTextColor" filePath="components/UiKitInspector.tsx"><ColorPicker label="Input Text" value={themeState.formTextColor || '#1C1C1E'} onChange={(v) => updateTheme({ formTextColor: v })} /></ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="formPlaceholderColor" filePath="components/UiKitInspector.tsx"><ColorPicker label="Placeholder Text" value={themeState.formPlaceholderColor || '#9CA3AF'} onChange={(v) => updateTheme({ formPlaceholderColor: v })} /></ControlDevWrapper>
                                </InspectorAccordion>
                            </ContainerDevWrapper>
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{
                                    displayName: "InputStateControl",
                                    type: "Molecule/Part",
                                    architecture: "SYSTEMS // ACTION",
                                    filePath: "components/UiKitInspector.tsx"
                                }}
                                atomic="Molecule"
                            >
                                <InspectorAccordion title="Focus & Active States" icon={Zap} defaultOpen={true} showClassNames={showClassNames} devLabel="States">
                                    <InfoCard
                                        variant="neutral"
                                        className="mb-4"
                                        identity={{ displayName: "FocusStateInfo", parentComponent: "UiKitInspector" }}
                                    >
                                        Configure the visual feedback when a user interacts with inputs.
                                    </InfoCard>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="relative group">
                                            <div className="h-3 w-full rounded-full shadow-sm ring-1 ring-black/5 cursor-pointer transition-transform group-hover:scale-105" style={{ backgroundColor: themeState.activeColor || themeState.primary }}></div>
                                            <input type="color" value={themeState.activeColor || themeState.primary} onChange={(e) => updateTheme({ activeColor: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                            <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Ring</div>
                                        </div>
                                        <div className="relative group">
                                            <div className="h-3 w-full rounded-full shadow-sm ring-1 ring-black/5 cursor-pointer transition-transform group-hover:scale-105" style={{ backgroundColor: themeState.formErrorColor || '#EF4444' }}></div>
                                            <input type="color" value={themeState.formErrorColor || '#EF4444'} onChange={(e) => updateTheme({ formErrorColor: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                            <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Error State</div>
                                        </div>
                                    </div>
                                    <ControlDevWrapper active={showClassNames} tokenKey="formRingWidth" filePath="components/UiKitInspector.tsx">
                                        <SliderWidget
                                            themeState={themeState}
                                            label="Focus Ring Width"
                                            value={themeState.formRingWidth || 4}
                                            min={0}
                                            max={8}
                                            step={1}
                                            onChange={(v) => updateTheme({ formRingWidth: v })}
                                            unit="px"
                                        />
                                    </ControlDevWrapper>
                                </InspectorAccordion>
                            </ContainerDevWrapper>
                            <ContainerDevWrapper
                                showClassNames={showClassNames}
                                identity={{
                                    displayName: "InputBoxControl",
                                    type: "Molecule/Part",
                                    architecture: "SYSTEMS // BOX MODEL",
                                    filePath: "components/UiKitInspector.tsx"
                                }}
                                atomic="Molecule"
                            >
                                <InspectorAccordion title="Input Container" icon={Box} showClassNames={showClassNames} devLabel="Box Model">
                                    <div className="space-y-1.5 mb-4"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Density</label><ControlDevWrapper active={showClassNames} tokenKey="formDensity" filePath="components/UiKitInspector.tsx"><div className="flex bg-gray-50 p-1 rounded-lg">{(['comfortable', 'compact', 'spacious'] as const).map((density) => (<button key={density} onClick={() => updateTheme({ formDensity: density })} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${themeState.formDensity === density ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>{density.charAt(0).toUpperCase() + density.slice(1)}</button>))}</div></ControlDevWrapper></div>
                                    <div className="space-y-1.5 mb-4"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Input Variant</label><ControlDevWrapper active={showClassNames} tokenKey="formVariant" filePath="components/UiKitInspector.tsx"><VariantDropdown themeState={themeState} updateTheme={updateTheme} /></ControlDevWrapper></div>
                                    <ControlDevWrapper active={showClassNames} tokenKey="inputBg" filePath="components/UiKitInspector.tsx"><ColorPicker label="Input Background" value={themeState.inputBg || '#FFFFFF'} onChange={(v) => updateTheme({ inputBg: v })} /></ControlDevWrapper>
                                    <ControlDevWrapper active={showClassNames} tokenKey="inputBorder" filePath="components/UiKitInspector.tsx"><ColorPicker label="Border Color" value={themeState.inputBorder || '#E5E7EB'} onChange={(v) => updateTheme({ inputBorder: v })} /></ControlDevWrapper>
                                </InspectorAccordion>
                            </ContainerDevWrapper>
                        </div>
                    </div>
                )}
            </div>
        </ContainerDevWrapper>
    );
};
