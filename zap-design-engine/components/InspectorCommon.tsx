import React, { useState } from 'react';
import { Check, Copy, ChevronDown, Sparkles } from 'lucide-react';

export const DevBadge = ({ label, type = 'element', className = '' }: { label: string; type?: 'layer' | 'element' | 'data'; className?: string }) => {
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

export const ControlDevWrapper = ({
    active,
    tokenKey,
    children,
    filePath = "components/UiKitSection.tsx"
}: {
    active?: boolean,
    tokenKey: string,
    children?: React.ReactNode,
    filePath?: string
}) => {
    if (!active) return <>{children}</>;

    const displayToken = `themeState.${tokenKey}`;

    return (
        <div className="relative group/control my-2">
            <div className="p-1.5 border border-dashed border-pink-300 rounded-lg bg-pink-50/20 hover:bg-pink-50/40 transition-colors">
                {children}
            </div>


            {/* Hover Tooltip */}
            <div className="absolute top-full right-0 mt-1 w-max max-w-[250px] bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl opacity-0 group-hover/control:opacity-100 transition-opacity pointer-events-none z-50 font-mono text-left border border-slate-700 block">
                <div className="text-purple-300 font-bold mb-1">State Binding</div>
                <div className="text-slate-300">value={'{'}{displayToken}{'}'}</div>
                <div className="text-slate-400">onChange={'{'}setThemeState{'}'}</div>
            </div>
        </div>
    );
};

export const DevWrapper = ({
    identity,
    children,
    active
}: {
    identity: { displayName: string, filePath: string, parentComponent?: string, htmlTag?: string },
    children: React.ReactNode,
    active?: boolean
}) => {
    const [copied, setCopied] = useState(false);

    if (!active) return <>{children}</>;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const snippet = JSON.stringify({
            ...identity,
            action: "I want to edit this component..."
        }, null, 2);
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group/dev-wrapper">
            <div className="outline outline-1 outline-dashed outline-indigo-200/50 hover:outline-indigo-400 transition-all rounded-lg overflow-hidden">
                {children}
            </div>

            {/* AI Context Badge */}
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold font-mono rounded-full shadow-lg z-50 flex items-center gap-2 opacity-0 group-hover/dev-wrapper:opacity-100 transition-all transform scale-90 group-hover/dev-wrapper:scale-100"
            >
                <Sparkles size={10} />
                <span>{identity.displayName}</span>
                {copied ? <Check size={8} /> : <Copy size={8} />}
            </button>

            {/* Path Tip */}
            <div className="absolute top-0 left-0 -translate-y-full px-2 py-1 text-[8px] font-mono text-indigo-400 opacity-0 group-hover/dev-wrapper:opacity-100 transition-opacity whitespace-nowrap">
                {identity.filePath}
            </div>
        </div>
    );
};

export const InspectorAccordion = ({
    title,
    children,
    defaultOpen = false,
    showClassNames,
    devLabel,
    icon: Icon
}: {
    title: string,
    children?: React.ReactNode,
    defaultOpen?: boolean,
    showClassNames?: boolean,
    devLabel?: string,
    icon?: React.ElementType
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (isOpen) {
            // We are closing
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }
        setIsOpen(!isOpen);
    };
    return (
        <div className="border-b border-gray-100 last:border-0 relative">
            <button onClick={handleToggle} className={`w-full flex items-center justify-between py-3 text-left group select-none hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors`}>
                <div className="flex items-center gap-2">
                    {Icon && (
                        <Icon
                            size={16}
                            className={`text-gray-400 transition-all duration-300 ${isAnimating ? 'rotate-[-10deg] scale-90 text-purple-500' : ''}`}
                        />
                    )}
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">{title}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (<div className="pb-4 pt-1 space-y-3 animate-in slide-in-from-top-1 duration-200">{children}</div>)}
        </div>
    );
};



export const StyleCardOption = ({ active, label, icon: Icon, onClick, accentColor }: { active: boolean, label: string, icon: any, onClick: () => void, accentColor: string }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${active ? 'bg-white shadow-sm ring-1 ring-offset-1' : 'bg-gray-50 border-transparent hover:bg-gray-100 hover:border-gray-200'}`}
        style={{ borderColor: active ? accentColor : 'transparent', ['--tw-ring-color' as any]: active ? accentColor : 'transparent' }}
    >
        <Icon size={20} style={{ color: active ? accentColor : '#9ca3af' }} />
        <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
    </button>
);