import React, { useState } from 'react';
import { Code2, Copy, Check, Database, Activity, FileCode, Workflow, Layers, Palette, Hash, MapPin, Layout, Sliders, Box, Repeat, Pin } from 'lucide-react';
import { useStore } from '../store';

export const DevWrapperContext = React.createContext<{ isHovered: boolean, isLocked: boolean }>({ isHovered: false, isLocked: false });

export interface EnhancedDevContext {
    // THE WHERE (Identity)
    identity: {
        displayName?: string;     // e.g., "StandardInput"
        name?: string;            // Backwards compatibility
        filePath: string;         // e.g., "components/FormsSection.tsx"
        parentComponent?: string; // e.g., "FormsSection"
        htmlTag?: string;         // e.g., "input", "div", "button"
        type: string;
        architecture?: string;
    };

    // THE WHY (Data & State)
    state: {
        sourceVar: string;        // The variable name in code (e.g., "phoneValue")
        handlerProp: string;      // The function prop (e.g., "onChange", "setThemeState")
        dataType: string;         // e.g., "string", "ThemeState", "ProjectConfig"
        currentValuePreview?: string; // Short snippet of current data (e.g., "#7E22CE")
    };

    // THE VISUAL (Tokens & Classes)
    styling: {
        tailwindClasses?: string; // Static classes (e.g., "p-4 rounded-xl")
        themeTokens?: string[];   // Dynamic tokens used (e.g., ["themeState.primary", "themeState.borderRadius"])
        computedStyle?: string;   // Helpful for dynamic heights/widths
    };

    // STRUCTURAL AUDIT (ZAP Standards)
    structure?: {
        architecture?: string;    // e.g., "Foundational // Systems"
        structuralRole?: string;  // e.g., "Organism"
        codeAudit?: string;       // e.g., "Operational // Strict TS"
    };
}

export type DevContext = EnhancedDevContext;

interface DevDocBannerProps {
    visible?: boolean;
    className?: string;
    context?: 'canvas' | 'controller';
    devContext: EnhancedDevContext;
}

const ContextItem = ({ label, value, icon: Icon, color = "blue", fullWidth = false }: { label: string, value: string, icon?: any, color?: string, fullWidth?: boolean }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!value) return null;

    return (
        <div
            className={`flex items-center gap-2 text-[10px] font-mono cursor-pointer group/item hover:bg-white/50 p-1 rounded transition-colors ${fullWidth ? 'w-full' : ''}`}
            onClick={handleCopy}
            title="Click to copy"
        >
            {Icon && <Icon size={12} className={`text-${color}-500 shrink-0`} />}
            <span className="font-bold text-gray-500 uppercase tracking-wider shrink-0">{label}:</span>
            <span className={`text-${color}-700 truncate select-all ${fullWidth ? 'flex-1' : 'max-w-[150px]'}`}>{value}</span>
            {copied && <Check size={10} className="text-green-500 shrink-0" />}
        </div>
    );
};

export const DevDocBanner: React.FC<DevDocBannerProps> = ({
    visible = false,
    className = "",
    context,
    devContext
}) => {
    const [copied, setCopied] = useState(false);
    const { devTermMode, setDevTermMode } = useStore();
    const { isHovered, isLocked } = React.useContext(DevWrapperContext);

    const isActuallyVisible = visible && (isHovered || isLocked);

    if (!isActuallyVisible && visible) {
        return null;
    }

    if (!visible) return null;

    const handleCopy = () => {
        const { displayName, name, filePath, parentComponent } = devContext.identity;
        const actualName = displayName || name || 'UnknownComponent';
        const snippet = `"displayName": "${actualName}", "filePath": "${filePath}", "parentComponent": "${parentComponent || ''}" I want to ....`;

        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const displayTitle = devContext.identity.displayName || devContext.identity.name || 'Unknown';

    return (
        <div className={`mb-6 p-4 rounded-xl border-2 border-dashed border-pink-300 bg-pink-50/40 animate-in fade-in slide-in-from-top-2 text-left relative z-30 ${className}`}>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-pink-200/60">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-lg border border-pink-200 shadow-sm">
                        <Code2 size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-pink-900 flex items-center gap-2">
                            {displayTitle}
                            {devContext.identity.htmlTag && (
                                <span className="px-1.5 py-0.5 rounded-md bg-pink-100 text-pink-700 text-[9px] font-mono border border-pink-200">
                                    &lt;{devContext.identity.htmlTag}&gt;
                                </span>
                            )}
                        </h4>
                        <p className="text-[10px] text-pink-800/70 font-mono flex items-center gap-1">
                            <FileCode size={10} />
                            {devContext.identity.filePath}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDevTermMode(devTermMode === 'atomic' ? 'zap' : 'atomic')}
                        className="px-2 py-1 bg-white hover:bg-pink-100 text-[10px] font-bold text-pink-500 hover:text-pink-700 rounded-lg transition-colors border border-pink-100 shadow-sm flex items-center gap-1 uppercase tracking-wider"
                    >
                        <Repeat size={10} />
                        {devTermMode === 'atomic' ? 'Atomic' : 'ZAP'}
                    </button>

                    <button
                        onClick={handleCopy}
                        className="p-1.5 bg-white hover:bg-pink-100 text-pink-400 hover:text-pink-600 rounded-lg transition-colors border border-pink-100 shadow-sm"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-1">
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Database size={10} /> Data & State
                    </div>
                    <ContextItem label="Var" value={devContext.state.sourceVar} icon={Activity} color="blue" fullWidth />
                    <ContextItem label="Type" value={devContext.state.dataType} icon={Hash} color="purple" fullWidth />
                    <ContextItem label="Prop" value={devContext.state.handlerProp} icon={Workflow} color="orange" fullWidth />
                    {devContext.state.currentValuePreview && (
                        <div className="mt-1 pl-1">
                            <code className="text-[9px] bg-white/60 px-1 py-0.5 rounded border border-pink-100 text-pink-800 font-mono block truncate">
                                {devContext.state.currentValuePreview}
                            </code>
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Palette size={10} /> Styling
                    </div>
                    {devContext.styling.tailwindClasses && (
                        <ContextItem label="TW" value={devContext.styling.tailwindClasses} icon={Layers} color="slate" fullWidth />
                    )}
                    {devContext.styling.themeTokens && devContext.styling.themeTokens.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                            {devContext.styling.themeTokens.map((token, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-white/60 border border-pink-100 rounded text-[9px] font-mono text-pink-700 whitespace-nowrap">
                                    {token}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {devContext.structure && (
                <div className="mt-4 pt-3 border-t border-pink-200/60 grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                        <div className="text-[8px] font-black text-pink-400 uppercase tracking-tighter">Architecture</div>
                        <div className="text-[9px] font-bold text-pink-900 group-hover:text-pink-600 transition-colors uppercase leading-tight">
                            {devContext.structure.architecture || "Protocol"}
                        </div>
                    </div>
                    <div className="space-y-1 border-x border-pink-200/40 px-2">
                        <div className="text-[8px] font-black text-pink-400 uppercase tracking-tighter">Structural Role</div>
                        <div className="text-[9px] font-bold text-pink-900 uppercase leading-tight">
                            {devContext.structure.structuralRole || "Atom"}
                        </div>
                    </div>
                    <div className="space-y-1 pl-1">
                        <div className="text-[8px] font-black text-pink-400 uppercase tracking-tighter">Code Audit</div>
                        <div className="text-[9px] font-bold text-emerald-600 uppercase leading-tight font-mono">
                            {devContext.structure.codeAudit || "Operational"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

interface ContainerDevWrapperProps {
    children?: React.ReactNode;
    showClassNames?: boolean;
    className?: string;
    identity: {
        displayName?: string;
        name?: string;
        filePath: string;
        parentComponent?: string;
        type: string;
        value?: string;
        architecture?: string;
    };
    atomic?: 'Atom' | 'Molecule' | 'Organism';
    style?: React.CSSProperties;
}

export const AtomicBadge: React.FC<{ type: 'Atom' | 'Molecule' | 'Organism', className?: string }> = ({ type, className = "" }) => {
    const { devTermMode } = useStore();

    const label = devTermMode === 'zap' ? (
        type === 'Atom' ? 'Token' :
            type === 'Molecule' ? 'Part' :
                type === 'Organism' ? 'Block' : type
    ) : type;

    const colors = {
        Atom: 'bg-emerald-100 border-emerald-200 text-emerald-700',
        Molecule: 'bg-amber-100 border-amber-200 text-amber-700',
        Organism: 'bg-rose-100 border-rose-200 text-rose-700'
    };

    return (
        <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${colors[type]} ${className}`}>
            {label}
        </div>
    );
};

export const ContainerDevWrapper: React.FC<ContainerDevWrapperProps> = ({
    children,
    showClassNames,
    className = "",
    identity,
    atomic,
    style
}) => {
    const [copied, setCopied] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const { devTermMode, activeHoverId, setActiveHoverId } = useStore();

    // FIXED: Respect style prop even when dev mode is off
    if (!showClassNames) return (
        <div className={className} style={style} data-identity={identity.displayName || identity.name}>
            {children}
        </div>
    );

    const identityName = identity.displayName || identity.name || 'Unknown';
    const myId = `${identityName}-${identity.filePath}-${identity.type}-${identity.parentComponent || ''}-${identity.value || ''}`;
    const isHovered = activeHoverId === myId;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const { displayName, name, filePath, parentComponent, type, value } = identity;
        const actualName = displayName || name || 'Unknown';
        const snippet = `"displayName": "${actualName}", "filePath": "${filePath}", "parentComponent": "${parentComponent || ''}", "type": "${type}", "value": "${value || ''}"`;
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setIsLocked(!isLocked);
        setTimeout(() => setCopied(false), 2000);
    };

    const getTypeIcon = (type: string) => {
        if (type.includes('Controller')) return <Sliders size={10} />;
        if (type.includes('Section') || type.includes('Organism')) return <Layers size={10} />;
        if (type.includes('Page')) return <FileCode size={10} />;
        return <Box size={10} />;
    };

    const getRoleColors = (type: string) => {
        if (type.includes('Page')) return { text: 'text-fuchsia-700', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', hoverBorder: 'hover:border-fuchsia-400', icon: 'text-fuchsia-500' };
        if (type.includes('Controller')) return { text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', hoverBorder: 'hover:border-indigo-400', icon: 'text-indigo-500' };
        if (type.includes('Container') || type.includes('Section')) return { text: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200', hoverBorder: 'hover:border-cyan-400', icon: 'text-cyan-500' };
        if (type.includes('Info') || type.includes('Legend')) return { text: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-300', hoverBorder: 'hover:border-pink-400', icon: 'text-pink-500' };
        return { text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', hoverBorder: 'hover:border-slate-400', icon: 'text-slate-400' };
    };

    const roleColors = getRoleColors(identity.type);

    return (
        <div
            className={`relative ${className}`}
            style={style}
            data-identity={identity.displayName || identity.name}
            onMouseEnter={(e) => {
                e.stopPropagation();
                setActiveHoverId(myId);
            }}
            onMouseLeave={(e) => {
                e.stopPropagation();
                if (activeHoverId === myId) setActiveHoverId(null);
            }}
        >
            <div className="relative z-10 h-full">
                <DevWrapperContext.Provider value={{ isHovered, isLocked }}>
                    {children}
                </DevWrapperContext.Provider>
            </div>

            <div className={`absolute inset-0 border border-dashed rounded-[inherit] pointer-events-none z-40 transition-all duration-300 ${isLocked ? 'border-indigo-400/60 bg-indigo-50/[0.05]' : (isHovered ? 'border-cyan-400 bg-cyan-50/[0.05]' : 'border-cyan-400/10 bg-transparent')}`} />

            <div
                className={`absolute ${(identityName === 'ColorInspector' || identity.type.includes('Legend')) ? 'right-4 top-0 -translate-y-1/2' : 'left-4 top-0 -translate-y-1/2'} z-[9999] flex items-center cursor-pointer select-none transition-all duration-300 ${(isLocked || isHovered) ? 'opacity-100 scale-100 translate-y-[-50%]' : 'opacity-0 scale-95 translate-y-[-40%]'} ${(isLocked || isHovered) ? 'pointer-events-auto' : 'pointer-events-none'}`}
                onClick={handleCopy}
            >
                <div className={`flex items-center backdrop-blur-md bg-white/90 border ${isLocked ? 'border-indigo-400 ring-2 ring-indigo-50' : roleColors.border} rounded-lg shadow-sm overflow-hidden group/pill ${roleColors.hoverBorder} transition-all`}>
                    {isLocked && (
                        <div className="pl-2 pr-1 border-r border-slate-200 bg-indigo-50 text-indigo-500 animate-in fade-in zoom-in-50 duration-200">
                            <Pin size={10} className="rotate-45" />
                        </div>
                    )}
                    <div className="px-2 py-1 flex items-center bg-white border-r border-slate-200 min-w-[65px] justify-center">
                        <AtomicBadge type={atomic || 'Atom'} className="border-none bg-transparent p-0 !text-[9px] !tracking-tighter" />
                    </div>
                    {identity.architecture && (
                        <div className="px-2 py-1 flex items-center bg-slate-50 border-r border-slate-200">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter truncate max-w-[80px]">
                                {identity.architecture}
                            </span>
                        </div>
                    )}
                    <div className={`px-2 py-1 flex items-center gap-2 ${roleColors.bg} border-r ${roleColors.border} group-hover/pill:bg-white transition-colors`}>
                        <div className={`${roleColors.icon} group-hover/pill:scale-110 transition-transform`}>
                            {getTypeIcon(identity.type)}
                        </div>
                        <span className={`text-[9px] font-bold text-slate-400 uppercase tracking-widest`}>
                            {devTermMode === 'zap' ? (identity.type.includes('/') ? identity.type.split('/')[1] : identity.type) : identity.type.split('/')[0]}
                        </span>
                    </div>
                    <div className="px-2 py-1 flex items-center gap-2 bg-white/50 group-hover/pill:bg-indigo-50/30 transition-colors">
                        <span className={`text-[10px] font-black ${roleColors.text} tracking-tight whitespace-nowrap`}>
                            {identityName}
                        </span>
                        <div className="ml-1 opacity-30 group-hover/pill:opacity-100 transition-opacity">
                            {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} className="text-slate-400" />}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
