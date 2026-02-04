import React from 'react';
import {
    Cpu,
    GitBranch,
    History,
    ShieldCheck,
    Terminal,
    Layers,
    Zap,
    ChevronRight,
    ExternalLink,
    Box,
    Clock
} from 'lucide-react';
import pkg from '../../package.json';
import { ProjectConfig, ThemeState } from '../../types';

interface LiveOverviewProps {
    config: ProjectConfig;
    themeState: ThemeState;
}

export const LiveOverview: React.FC<LiveOverviewProps> = ({ config, themeState }) => {
    const techStack = [
        { name: 'Next.js', version: pkg.dependencies.next || 'Canary', icon: Zap, color: 'text-black' },
        { name: 'React', version: pkg.dependencies.react || '19.0.0', icon: Cpu, color: 'text-blue-500' },
        { name: 'Tailwind CSS', version: pkg.devDependencies.tailwindcss || '4.0.0', icon: Layers, color: 'text-cyan-400' },
        { name: 'TypeScript', version: pkg.devDependencies.typescript || '5.8.3', icon: Terminal, color: 'text-blue-600' },
        { name: 'Lucide Icons', version: pkg.dependencies['lucide-react'] || '0.474.0', icon: Box, color: 'text-pink-500' },
    ];

    const versionHistory = [
        { version: '1.0.3', date: 'Feb 03, 2026', status: 'Live', description: 'Linked UI versioning and tech stack overview.' },
        { version: '1.0.0', date: 'Feb 01, 2026', status: 'Stable', description: 'Master Theme Engine release.' },
        { version: '0.1.0', date: 'Jan 15, 2026', status: 'Beta', description: 'Initial Alpha release with core atoms.' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 1. Live Tech Stack */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Cpu size={18} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Live Tech Stack</h3>
                        <p className="text-xs text-gray-400 font-medium">Core dependencies pulled directly from package.json</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white transition-colors ${tech.color}`}>
                                    <tech.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tech.name}</p>
                                    <p className="text-lg font-black text-gray-900">{tech.version.replace('^', '')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Git & Version Context */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                            <GitBranch size={18} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Development Context</h3>
                            <p className="text-xs text-gray-400 font-medium">Current working branch and state</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-sm relative overflow-hidden shadow-xl border border-slate-800">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Terminal size={80} />
                        </div>
                        <div className="space-y-3 relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500 w-20">PROJECT:</span>
                                <span className="text-purple-400 font-bold">{pkg.name.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500 w-20">VERSION:</span>
                                <span className="text-green-400 font-bold">{pkg.version}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500 w-20">BRANCH:</span>
                                <span className="text-blue-400">main</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500 w-20">ENV:</span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                    LOCAL_DEV
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Release Protocol */}
                    <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
                        <div className="flex items-center gap-2 mb-4 text-orange-700">
                            <ShieldCheck size={20} />
                            <h4 className="font-bold">Release Protocol</h4>
                        </div>
                        <ol className="space-y-3">
                            {[
                                { step: '1', title: 'Stability Check', desc: 'Ensure all tests pass using `npm test`' },
                                { step: '2', title: 'Version Bump', desc: 'Run `npm version patch` (or minor/major)' },
                                { step: '3', title: 'Git Tagging', desc: 'Auto-tags the commit with the new version' },
                                { step: '4', title: 'Remote Push', desc: 'Push tags to GitLab to trigger CI/CD' }
                            ].map((item) => (
                                <li key={item.step} className="flex gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-orange-600 shadow-sm border border-orange-100">
                                        {item.step}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-orange-900">{item.title}</p>
                                        <p className="text-xs text-orange-700/70">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                            <History size={18} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Version History</h3>
                            <p className="text-xs text-gray-400 font-medium">Timeline of technical milestones</p>
                        </div>
                    </div>

                    <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                        {versionHistory.map((item, idx) => (
                            <div key={item.version} className="relative">
                                {/* Dot */}
                                <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${idx === 0 ? 'bg-green-500 text-green-500' : 'bg-gray-300'
                                    }`}>
                                    {idx === 0 && <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20" />}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-gray-900">v{item.version}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${item.status === 'Live' ? 'bg-green-100 text-green-700' :
                                                item.status === 'Stable' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-500'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                                        <Clock size={10} /> {item.date}
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
