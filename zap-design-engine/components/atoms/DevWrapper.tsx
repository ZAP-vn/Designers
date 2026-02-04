import React, { useState } from 'react';
import { Sparkles, Check, Copy } from 'lucide-react';
import { useStore } from '../../store';

export interface IdentityProps {
    displayName: string;
    name?: string; // Backwards compatibility
    filePath: string;
    parentComponent?: string;
    description?: string;
    type?: string;
}

export interface DevWrapperProps {
    children: React.ReactNode;
    showClassNames?: boolean;
    identity: IdentityProps;
    className?: string;
}

export const DevWrapper: React.FC<DevWrapperProps> = ({
    children,
    showClassNames,
    identity,
    className = ""
}) => {
    const [copied, setCopied] = useState(false);
    const { devTermMode } = useStore();

    if (!showClassNames) return <>{children}</>;

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const snippet = `"displayName": "${identity.displayName}", "filePath": "${identity.filePath}", "parentComponent": "${identity.parentComponent || ''}", "type": "${identity.type || 'Atom/Component'}"${identity.description ? `, "description": "${identity.description}"` : ''} I want to ....`;

        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative group/dev-wrapper ${className}`}>
            {/* The Component Itself */}
            <div className={`transition-all duration-200 ${showClassNames ? 'ring-1 ring-pink-300 ring-offset-2 rounded-lg' : ''}`}>
                {children}
            </div>

            {/* AI Context Badge / Hover Overlay */}
            <button
                onClick={handleCopy}
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-pink-100 border border-pink-300 text-pink-700 text-[9px] font-mono font-bold rounded-full shadow-sm z-50 flex items-center gap-1.5 opacity-0 group-hover/dev-wrapper:opacity-100 transition-all transform scale-90 group-hover/dev-wrapper:scale-100 whitespace-nowrap"
                title="Click to copy AI Prompt"
            >
                <Sparkles size={8} className="text-pink-500" />
                <span>{identity.displayName}</span>
                {identity.type && (
                    <span className="px-1 py-0 bg-pink-500 text-white rounded-[2px] text-[7px] uppercase tracking-wider">
                        {devTermMode === 'zap' ?
                            (identity.type.includes('/') ? identity.type.split('/')[1] : (identity.type === 'Atom' ? 'Token' : identity.type))
                            : identity.type.split('/')[0]
                        }
                    </span>
                )}
                <span className="opacity-30">|</span>
                {copied ? <Check size={8} className="text-green-600" /> : <Copy size={8} className="opacity-50" />}
            </button>
        </div>
    );
};
