
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ProjectConfig, TypographyItem, ThemeState } from '../types';
import { Copy, Check, MousePointerClick, Minus, Plus, Save, RotateCcw, Type, Pencil, Info } from 'lucide-react';
import { ContainerDevWrapper } from './DevDocBanner';
import { InfoCard } from './atoms/InfoCard';
import { InspectorHeader } from './InspectorHeader';

interface TypographySectionProps {
    config: ProjectConfig;
    themeState: ThemeState;
    onUpdate?: (items: TypographyItem[]) => void;
    showClassNames?: boolean;
    activeMode?: 'primary' | 'secondary';
    onModeChange?: (mode: 'primary' | 'secondary') => void;
    readOnly?: boolean;
}

const TypographyDevWrapper = ({ children, showClassNames, componentName, stateVar, className }: any) => {
    const [copied, setCopied] = useState(false);

    if (!showClassNames) return <>{children}</>;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const snippet = `"displayName": "${componentName}", "filePath": "components/TypographySection.tsx", "parentComponent": "TypographySection" I want to ....`;
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative group ${className || ''} pt-2`}>
            <div className={`relative transition-all duration-200 border border-dashed border-pink-400 bg-pink-50/10 rounded-xl p-2`}>
                <div
                    className="absolute -top-3 left-3 px-2 py-0.5 bg-pink-100 border border-pink-300 text-pink-700 text-[10px] font-mono font-bold rounded shadow-sm z-20 flex items-center gap-2 cursor-pointer hover:bg-pink-200 transition-colors"
                    onClick={handleCopy}
                    title="Click to copy AI Prompt"
                >
                    <MousePointerClick size={10} className="opacity-50" />
                    <span className="opacity-90">{componentName}</span>
                    <span className="opacity-40">|</span>
                    <span>{stateVar}</span>
                    {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} className="opacity-50" />}
                </div>
                {children}
            </div>
        </div>
    );
};

const CodeCopyBadge: React.FC<{ label: string }> = ({ label }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(label);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="group flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 transition-colors px-2 py-1 rounded text-xs font-bold font-mono text-gray-600"
            title="Copy class name"
        >
            <span>{label}</span>
            {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />}
        </button>
    );
};

const TypeRow: React.FC<TypographyItem & {
    themeState: ThemeState,
    showClassNames?: boolean,
    activeMode?: 'primary' | 'secondary',
    isEditing?: boolean,
    onUpdate?: (item: TypographyItem) => void
}> = ({ name, token, size, weight, usage, sample, themeState, showClassNames, activeMode, isEditing, onUpdate }) => {
    const className = `.${name.toLowerCase().replace(/\s+/g, '-')}`;
    const isHeading = name.toLowerCase().includes('heading');
    const fontFamily = isHeading ? themeState.fontFamily : (themeState.secondaryFontFamily || themeState.fontFamily);
    const isActive = activeMode ? (activeMode === 'primary' ? isHeading : !isHeading) : true;
    const numericSize = parseInt(size);

    const updateSize = (delta: number) => {
        if (!onUpdate) return;
        const newSize = `${Math.max(8, numericSize + delta)}px`;
        onUpdate({ name, token, size: newSize, weight, usage, sample });
    };

    // Show controls if specifically editing this section OR if we are in general edit mode and this row corresponds to the active font mode
    const showControls = isEditing && isActive && onUpdate;

    return (
        <TypographyDevWrapper showClassNames={showClassNames} componentName={`TypeRow(${name})`} stateVar="item">
            <div
                className={`flex flex-col md:flex-row gap-4 md:gap-16 py-10 border-b border-gray-100 last:border-0 items-start md:items-baseline group px-4 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}
            >
                <div className="w-full md:w-24 shrink-0 md:text-right flex flex-row md:flex-col gap-3 md:gap-1 items-baseline md:items-end relative">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">{size}</span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{weight.replace('font-', '')}</span>

                    {showControls && (
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-100 rounded-lg p-1 flex items-center z-10 animate-in fade-in slide-in-from-right-2 duration-200">
                            <button onClick={(e) => { e.stopPropagation(); updateSize(-1); }} className="p-1.5 hover:bg-gray-50 rounded text-gray-500 hover:text-red-500 transition-colors">
                                <Minus size={12} />
                            </button>
                            <span className="text-[10px] font-mono font-bold w-6 text-center text-gray-600 select-none">{numericSize}</span>
                            <button onClick={(e) => { e.stopPropagation(); updateSize(1); }} className="p-1.5 hover:bg-gray-50 rounded text-gray-500 hover:text-green-500 transition-colors">
                                <Plus size={12} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3
                        className={`${token} ${weight} transition-colors duration-200 break-words leading-tight`}
                        style={{ fontFamily: fontFamily, color: isActive ? themeState.primary : '#9ca3af', fontSize: size }}
                    >
                        {name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <CodeCopyBadge label={className} />
                        <span className="text-sm text-gray-400 italic font-medium">— {usage}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isActive ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-300 border-gray-100'}`}>
                            {isHeading ? 'Primary' : 'Secondary'} Font
                        </span>
                    </div>
                </div>
            </div>
        </TypographyDevWrapper>
    );
};

const TypographySection: React.FC<TypographySectionProps> = ({ config, themeState, showClassNames, activeMode = 'primary', onUpdate, onModeChange, readOnly = false }) => {
    const fallbackItems = useMemo(() => [
        { name: "Heading H1", token: "text-5xl", size: "48px", weight: "font-extrabold", sample: "Standard Design System", usage: "Hero Headers" },
        { name: "Heading H2", token: "text-4xl", size: "36px", weight: "font-bold", sample: "Section Titles", usage: "Section Headers" },
        { name: "Heading H3", token: "text-2xl", size: "24px", weight: "font-bold", sample: "Component Headers", usage: "Subsection Headers" },
        { name: "Heading H4", token: "text-xl", size: "20px", weight: "font-semibold", sample: "Card Titles", usage: "Card Titles" },
        { name: "Heading H5", token: "text-lg", size: "18px", weight: "font-semibold", sample: "Sub-section headings", usage: "Sub-headers" },
        { name: "Heading H6", token: "text-base", size: "16px", weight: "font-semibold", sample: "Group labels or tertiary titles", usage: "Tertiary Headers" },
        { name: "Paragraph", token: "text-base", size: "16px", weight: "font-normal", sample: "Body text", usage: "Body Text" },
        { name: "Caption", token: "text-sm", size: "14px", weight: "font-medium", sample: "Metadata", usage: "Metadata & Labels" },
    ], []);

    const effectiveItems = config.generatedContent?.typography?.items || fallbackItems;
    const [items, setItems] = useState<TypographyItem[]>(effectiveItems);
    const [isDirty, setIsDirty] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Sync with external config changes unless we have unsaved local changes
        if (!isDirty) {
            setItems(effectiveItems);
        }
    }, [effectiveItems, isDirty]);

    const secondaryFont = themeState.secondaryFontFamily || themeState.fontFamily;

    const handleRowUpdate = (newItem: TypographyItem, index: number) => {
        const newItems = [...items];
        newItems[index] = newItem;
        setItems(newItems);
        setIsDirty(true);
    };

    const handleSave = () => {
        if (!onUpdate) return;
        onUpdate(items);
        setIsDirty(false);
        setIsEditing(false); // Exit edit mode on save
    };

    const handleReset = () => {
        setItems(effectiveItems);
        setIsDirty(false);
    };

    const handleCardClick = (mode: 'primary' | 'secondary') => {
        if (readOnly) return;
        if (onModeChange) onModeChange(mode);
        // Auto-enable edit mode when clicking a specific card
        if (!isEditing) setIsEditing(true);

        // Scroll to top of section to ensure context is visible (Inspector is sticky at top)
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div ref={sectionRef} className="animate-in fade-in duration-500">

            {/* Standardized Header */}
            <InspectorHeader
                title="Typography"
                badge="Controller"
                showClassNames={!!showClassNames}
            >
                {/* Toolbar Actions */}
                {!readOnly && (
                    <div className="flex items-center gap-2">
                        {isDirty && (
                            <button
                                onClick={handleReset}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 bg-white border border-gray-200 shadow-sm"
                            >
                                <RotateCcw size={12} />
                                Reset
                            </button>
                        )}

                        {isDirty ? (
                            <button
                                onClick={handleSave}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white shadow-md hover:opacity-90 transition-all flex items-center gap-2 animate-in zoom-in-95"
                                style={{ backgroundColor: themeState.primary }}
                            >
                                <Save size={12} />
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-3 py-1.5 text-[10px] font-bold shadow-sm hover:shadow-md hover:opacity-90 transition-all flex items-center gap-2 transform active:scale-95"
                                style={{
                                    backgroundColor: themeState.secondary,
                                    color: themeState.secondaryBtnText,
                                    borderRadius: `${themeState.borderRadius}px`
                                }}
                            >
                                <span>{isEditing ? 'Done' : 'Edit'}</span>
                                {isEditing ? <Check size={12} /> : <Pencil size={12} />}
                            </button>
                        )}
                    </div>
                )}
            </InspectorHeader>

            {/* Header Card - Simplified (Just Title/Desc if needed, or removed) */}
            {/* Keeping the container wrapper for internal structure if needed, but removing duplicate header */}
            <ContainerDevWrapper
                showClassNames={showClassNames}
                className="mb-8 p-6" // Added padding since we removed the header card wrapper
                identity={{ displayName: "TypographyHeader", type: "Card/Container", filePath: "components/TypographySection.tsx", parentComponent: "TypographySection" }}
            >
                <div className="flex flex-col gap-6">

                    {/* Intro Text (Preserved but simplified) */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-1">Typography System</h2>
                        <p className="text-gray-500 text-sm">Manage your font families and scale.</p>
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            onClick={() => handleCardClick('primary')}
                            className={`rounded-[2rem] p-8 shadow-sm border flex flex-col h-full relative overflow-hidden group transition-all duration-300 ${!readOnly && activeMode === 'primary' ? 'bg-white border-purple-200 ring-4 ring-purple-50 scale-[1.02] z-10' : 'bg-gray-50 border-gray-200 opacity-60 grayscale'} ${readOnly ? 'cursor-default opacity-100 bg-white grayscale-0' : 'cursor-pointer hover:border-purple-300'}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-9xl font-bold" style={{ fontFamily: themeState.fontFamily }}>Aa</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Primary Font</h2>
                                    {!readOnly && activeMode === 'primary' && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Editing</span>}
                                </div>
                                <div className="text-3xl font-bold text-gray-900 truncate" style={{ fontFamily: themeState.fontFamily }}>{themeState.fontFamily}</div>
                            </div>
                            <div className="mt-auto pt-8 relative z-10">
                                <InfoCard
                                    variant="neutral"
                                    identity={{ displayName: "PrimaryFontInfo", parentComponent: "TypographySection" }}
                                >
                                    The primary font is your default typeface & should be used within headers & titles.
                                </InfoCard>
                            </div>
                            {/* Always show overlay if NOT active to encourage clicking. Added z-50 to ensure top layer. */}
                            {!readOnly && activeMode !== 'primary' && (
                                <div className="absolute inset-0 z-50 bg-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                    <span className="bg-white shadow-lg border border-gray-100 px-4 py-2 rounded-full text-xs font-bold text-purple-600 animate-in zoom-in-95 pointer-events-none">Select to Edit</span>
                                </div>
                            )}
                        </div>

                        <div
                            onClick={() => handleCardClick('secondary')}
                            className={`rounded-[2rem] p-8 shadow-sm border flex flex-col h-full relative overflow-hidden group transition-all duration-300 ${!readOnly && activeMode === 'secondary' ? 'bg-white border-purple-200 ring-4 ring-purple-50 scale-[1.02] z-10' : 'bg-gray-50 border-gray-200 opacity-60 grayscale'} ${readOnly ? 'cursor-default opacity-100 bg-white grayscale-0' : 'cursor-pointer hover:border-purple-300'}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-9xl font-bold" style={{ fontFamily: secondaryFont }}>Aa</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Secondary Font</h2>
                                    {!readOnly && activeMode === 'secondary' && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Editing</span>}
                                </div>
                                <div className="text-3xl font-bold text-gray-900 truncate" style={{ fontFamily: secondaryFont }}>{secondaryFont}</div>
                            </div>
                            <div className="mt-auto pt-8 relative z-10">
                                <InfoCard
                                    variant="neutral"
                                    identity={{ displayName: "SecondaryFontInfo", parentComponent: "TypographySection" }}
                                >
                                    The secondary font compliments your primary font. This will be used on subheadings and UI elements.
                                </InfoCard>
                            </div>
                            {/* Always show overlay if NOT active to encourage clicking. Added z-50 to ensure top layer. */}
                            {!readOnly && activeMode !== 'secondary' && (
                                <div className="absolute inset-0 z-50 bg-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                    <span className="bg-white shadow-lg border border-gray-100 px-4 py-2 rounded-full text-xs font-bold text-purple-600 animate-in zoom-in-95 pointer-events-none">Select to Edit</span>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </ContainerDevWrapper>

            {/* List Section */}
            <ContainerDevWrapper
                showClassNames={showClassNames}
                className="mt-4"
                identity={{ displayName: "TypographyList", type: "Card/Container", filePath: "components/TypographySection.tsx", parentComponent: "TypographySection" }}
            >
                <section className="bg-white rounded-[2rem] shadow-sm border border-gray-100">
                    {/* Header for Title only */}
                    <div className="px-8 md:px-12 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                <Type size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Type Scale</h3>
                                <p className="text-xs text-gray-500">Base font sizes and line heights.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {items.map((item, idx) => (
                            <TypeRow
                                key={idx}
                                {...item}
                                themeState={themeState}
                                showClassNames={showClassNames}
                                activeMode={readOnly ? undefined : activeMode}
                                isEditing={!readOnly && (isEditing || isDirty)} // Allow editing if specifically in edit mode OR if we already have unsaved changes
                                onUpdate={readOnly ? undefined : (updatedItem) => handleRowUpdate(updatedItem, idx)}
                            />
                        ))}
                    </div>
                </section>
            </ContainerDevWrapper>
        </div>
    );
};

export default TypographySection;
