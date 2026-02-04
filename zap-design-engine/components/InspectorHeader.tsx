import React from 'react';
import { SlidersHorizontal, Code2 } from 'lucide-react';
import { DevBadge } from './InspectorCommon';

interface InspectorHeaderProps {
    /** Title of the inspector panel (e.g. "Project Info", "Inspector") */
    title: string;
    /** Optional badge text (e.g. "Controller") */
    badge?: string;
    /** Current state of the "Dev Mode" toggle */
    showClassNames: boolean;
    /** Setter for "Dev Mode" toggle */
    setShowClassNames?: (show: boolean) => void;
    /** If true, shows the "Visual vs Code" view toggle */
    showInspectorToggle?: boolean;
    /** Current view mode ('controls' or 'code') */
    viewMode?: 'controls' | 'code';
    /** Setter for view mode */
    setViewMode?: (mode: 'controls' | 'code') => void;
    /** Optional custom actions (buttons) to render before the toggles */
    children?: React.ReactNode;
}

/**
 * Standardized sticky header for all Inspector panels.
 * Includes title, optional role badge, view switcher, and dev mode toggle.
 */
export const InspectorHeader: React.FC<InspectorHeaderProps> = ({
    title,
    badge,
    showClassNames,
    setShowClassNames,
    showInspectorToggle = false,
    viewMode = 'controls',
    setViewMode,
    children
}) => {
    return (
        <div className="shrink-0 p-4 border-b flex flex-col gap-3 sticky top-0 z-20 transition-colors duration-300 border-gray-100 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
                {/* Left: Title & Badge */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                        {title}
                    </span>
                    {showClassNames && badge && <DevBadge label={badge} type="element" />}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Custom Actions (injected) */}
                    {children}

                    {/* Visual/Code View Toggle */}
                    {showInspectorToggle && setViewMode && (
                        <div className="flex p-0.5 rounded-lg border bg-gray-100 border-gray-200 dark:bg-slate-800 dark:border-slate-700 mr-1">
                            <button
                                onClick={() => setViewMode('controls')}
                                className={`p-1.5 rounded-md transition-all flex items-center justify-center ${viewMode === 'controls'
                                    ? 'bg-white shadow-sm text-purple-600 dark:bg-slate-700 dark:text-purple-400'
                                    : 'text-gray-400 hover:text-gray-500'
                                    }`}
                                title="Visual Controls"
                            >
                                <SlidersHorizontal size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('code')}
                                className={`p-1.5 rounded-md transition-all flex items-center justify-center ${viewMode === 'code'
                                    ? 'bg-white shadow-sm text-purple-600 dark:bg-slate-700 dark:text-purple-400'
                                    : 'text-gray-400 hover:text-gray-500'
                                    }`}
                                title="Source Code"
                            >
                                <Code2 size={14} />
                            </button>
                        </div>
                    )}

                    {/* Dev Mode Toggle */}
                    {setShowClassNames && (
                        <div className="flex items-center gap-2" title="Toggle Developer Mode">
                            <span className="text-[9px] font-bold uppercase text-gray-400 dark:text-slate-500 hidden sm:block">
                                Dev Mode
                            </span>
                            <button
                                onClick={() => setShowClassNames(!showClassNames)}
                                className={`relative w-8 h-4 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${showClassNames ? 'bg-pink-500' : 'bg-gray-200 dark:bg-slate-700'
                                    }`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full shadow-sm transition-transform duration-200 ${showClassNames ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white dark:bg-slate-400'
                                    }`} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
