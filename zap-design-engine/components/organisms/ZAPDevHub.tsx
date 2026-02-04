
import React, { useState } from 'react';
import { AtomicBadge, ContainerDevWrapper } from '../DevDocBanner';
import {
    LayoutGrid, Layers, Hexagon, Code2, Database,
    Zap, Palette, Monitor, Box, Sliders, ChevronDown,
    Activity, Workflow, FileCode, Hash
} from 'lucide-react';

interface ZAPDevHubProps {
    visible?: boolean;
}

/**
 * ORGANISM: ZAPDevHub
 * The unified 'Developer Command Center' that explains all Dev Mode legends.
 */
export const ZAPDevHub: React.FC<ZAPDevHubProps> = ({ visible = false }) => {
    const [activeTab, setActiveTab] = useState<'architecture' | 'atomic' | 'audit'>('architecture');

    if (!visible) return null;

    const tabs = [
        { id: 'architecture', label: 'Design Architecture', icon: Layers },
        { id: 'atomic', label: 'Atomic Equivalent', icon: Hexagon },
        { id: 'audit', label: 'Code & Audit', icon: Database }
    ];

    return (
        <ContainerDevWrapper
            showClassNames={visible}
            identity={{
                displayName: "ZAPDevHub",
                type: "Info/Legend",
                filePath: "components/organisms/ZAPDevHub.tsx",
                architecture: "ARCHITECTURE // LEGEND"
            }}
            atomic="Organism"
            className="mb-16"
        >
            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-pink-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700 isolate">
                {/* Header */}
                <div className="p-8 border-b border-dashed border-pink-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-pink-50/30">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border border-pink-100 rounded-2xl shadow-sm">
                            <Zap className="text-pink-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">ZAP Developer Hub</h2>
                            <p className="text-xs text-pink-700/60 font-medium uppercase tracking-[0.2em]">Architecture // Systems // Protocol</p>
                        </div>
                    </div>

                    <div className="flex p-1 bg-white border border-pink-100 rounded-xl shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-pink-50 text-pink-700 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 bg-white">
                    {activeTab === 'architecture' && <ArchitectureTab />}
                    {activeTab === 'atomic' && <AtomicTab />}
                    {activeTab === 'audit' && <AuditTab />}
                </div>

                {/* Footer / Status */}
                <div className="px-8 py-4 bg-slate-50 border-t border-dashed border-pink-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Protocol :: Operational</span>
                    </div>
                    <div className="text-[10px] font-mono text-pink-400 font-bold italic">
                        DEV_MODE_ACTIVE // AI_CONTEXT_STREAMING
                    </div>
                </div>
            </div>
        </ContainerDevWrapper>
    );
};

const ArchitectureTab = () => {
    const levels = [
        { level: 1, zap: 'Shell', atomic: 'Environment', desc: 'The App Frame (Nav, Inspector, Stage).', icon: Monitor, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
        { level: 2, zap: 'Blueprint', atomic: 'Template', desc: 'The Vertical Logic (e.g., "F&B Master").', icon: FileCode, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        { level: 3, zap: 'Layout', atomic: 'Template', desc: 'The Grid Structure (e.g., "Sidebar Left").', icon: LayoutGrid, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
        { level: 4, zap: 'Zone', atomic: 'Region', desc: 'The semantic slots (e.g., "Hero Zone").', icon: Box, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        { level: 5, zap: 'Block', atomic: 'Organism', desc: 'Functional Widgets (e.g., "Menu Grid").', icon: Hexagon, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
        { level: 6, zap: 'Part', atomic: 'Molecule', desc: 'Composite Parts (e.g., "Menu Item").', icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        { level: 7, zap: 'Token', atomic: 'Atom', desc: 'Primitives (e.g., "Price Tag", "Button").', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levels.map((item) => (
                    <HierarchyCard key={item.level} {...item} />
                ))}
            </div>
            <p className="mt-6 text-[10px] text-pink-400 italic text-center">
                The "Grand Unified Hierarchy" merging Product Structure with Atomic Design.
            </p>
        </div>
    );
};

const HierarchyCard = ({ level, zap, atomic, desc, icon: Icon, color, bg, border }: any) => (
    <div className={`flex flex-col p-5 rounded-2xl border ${bg} ${border} hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-default group`}>
        <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 bg-white rounded-xl border ${border} shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon size={20} className={color} />
            </div>
            <div className="flex flex-col items-end">
                <span className={`text-[10px] font-black uppercase tracking-widest ${color} opacity-60`}>Level {level}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/60 border ${border} text-slate-500`}>{atomic}</span>
            </div>
        </div>

        <div>
            <h4 className="text-slate-900 font-bold text-lg tracking-tight mb-1">{zap}</h4>
            <p className="text-xs text-slate-500 leading-snug font-medium">{desc}</p>
        </div>
    </div>
);

const AtomicTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <AtomicCard
            label="Environment"
            icon={Monitor}
            desc="The global application frame (Shell)."
            example="Nav, Inspector, Stage"
            colorClass="text-slate-600"
            bgClass="bg-slate-50"
            borderClass="border-slate-200"
        />
        <AtomicCard
            label="Template"
            icon={FileCode}
            desc="Page-level structure and logic (Blueprint/Layout)."
            example="F&B Master, Sidebar Left"
            colorClass="text-indigo-600"
            bgClass="bg-indigo-50"
            borderClass="border-indigo-100"
        />
        <AtomicCard
            label="Region"
            icon={Box}
            desc="Semantic content slots (Zone)."
            example="Hero Zone, Footer Area"
            colorClass="text-blue-600"
            bgClass="bg-blue-50"
            borderClass="border-blue-100"
        />
        <AtomicCard
            label="Organism"
            icon={Hexagon}
            desc="Independent functional widgets (Block)."
            example="Menu Grid, Product List"
            colorClass="text-rose-600"
            bgClass="bg-rose-50"
            borderClass="border-rose-100"
        />
        <AtomicCard
            label="Molecule"
            icon={Layers}
            desc="Composite UI pieces (Part)."
            example="Menu Item, Search Bar"
            colorClass="text-amber-600"
            bgClass="bg-amber-50"
            borderClass="border-amber-100"
        />
        <AtomicCard
            label="Atom"
            icon={Zap}
            desc="Indivisible primitives (Token)."
            example="Button, Input, Icon"
            colorClass="text-emerald-600"
            bgClass="bg-emerald-50"
            borderClass="border-emerald-100"
        />
    </div>
);

const AtomicCard = ({ label, icon: Icon, desc, example, colorClass, bgClass, borderClass }: any) => (
    <div className={`flex items-start gap-4 p-5 rounded-2xl border ${bgClass} ${borderClass} hover:bg-white hover:shadow-sm transition-all cursor-default`}>
        <div className={`p-2.5 bg-white rounded-xl border ${borderClass} shadow-sm`}>
            <Icon size={18} className={colorClass} />
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1">
                <h4 className="text-slate-900 font-bold text-sm tracking-tight">{label}</h4>
                <div className={`px-1.5 py-0.5 rounded bg-white ${colorClass} text-[8px] font-black uppercase border ${borderClass}`}>Atomic</div>
            </div>
            <p className="text-xs text-slate-500 leading-snug mb-2">{desc}</p>
            <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Context:</span>
                <span className={`text-[10px] ${colorClass} font-mono italic opacity-80`}>{example}</span>
            </div>
        </div>
    </div>
);

const AuditTab = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100">
                        <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Context Key</th>
                        <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Purpose</th>
                        <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">AI Prompt Context</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <AuditRow label="Var" icon={Activity} desc="Variable name in TypeScript source" usage="Identifying data flow" />
                    <AuditRow label="Type" icon={Hash} desc="The TypeScript interface or type" usage="Predicting props/shape" />
                    <AuditRow label="Prop" icon={Workflow} desc="The function prop handling updates" usage="Modifying state logic" />
                    <AuditRow label="TW" icon={Palette} desc="Static Tailwind CSS classes" usage="Iterating on visuals" />
                    <AuditRow label="Token" icon={Zap} desc="Design tokens (variables) applied" usage="Theming & Inheritance" />
                    <AuditRow label="Arch" icon={Layers} desc="ZAP Hierarchy Level (e.g. Systems // Palette)" usage="Structural Verification" />
                    <AuditRow label="Role" icon={Box} desc="Atomic/ZAP Term (e.g. Organism/Block)" usage="Component Classification" />
                    <AuditRow label="Audit" icon={Database} desc="Code Quality Status (e.g. Strict TS)" usage="Health Check" />
                </tbody>
            </table>
        </div>
        <p className="mt-4 text-[10px] text-pink-400 italic text-center">
            Clicking any Pill in Dev Mode copies these technical associations to your clipboard.
        </p>
    </div>
);

const AuditRow = ({ label, icon: Icon, desc, usage }: any) => (
    <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-6 py-4">
            <div className="flex items-center gap-2">
                <Icon size={14} className="text-indigo-500" />
                <span className="font-bold text-slate-700 tracking-wider">{label}</span>
            </div>
        </td>
        <td className="px-6 py-4 text-slate-500">{desc}</td>
        <td className="px-6 py-4">
            <span className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-medium">
                {usage}
            </span>
        </td>
    </tr>
);
