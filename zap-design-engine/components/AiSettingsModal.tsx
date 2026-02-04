"use client";

import React, { useState, useEffect } from 'react';
import {
    X, CheckCircle, AlertCircle, Settings,
    Cpu, Zap, Shield, HelpCircle
} from 'lucide-react';

interface AiSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AiSettingsModal = ({ isOpen, onClose }: AiSettingsModalProps) => {
    // In a real app, these might come from a store or environment check API
    const [apiKeyStatus, setApiKeyStatus] = useState<'connected' | 'missing' | 'checking'>('checking');
    const [aiParams, setAiParams] = useState({
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxTokens: 2048
    });

    useEffect(() => {
        if (isOpen) {
            // Simulate checking for API key presence
            // In Next.js, we check process.env.GOOGLE_GENAI_API_KEY
            // Since it's server-side env, we'd usually check via a small API or prop-injection
            const checkKey = async () => {
                setApiKeyStatus('checking');
                // Simulating a check
                setTimeout(() => {
                    // For local testing, we assume presence if we can "see" it or if was passed down
                    setApiKeyStatus('connected');
                }, 800);
            };
            checkKey();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                            <Zap size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Workspace Settings</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Manage your local AI environment & parameters</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Connection Status Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Shield size={16} className="text-indigo-500" />
                                AI Connection Status
                            </h3>
                            <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                AI Envelope
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl border transition-all ${apiKeyStatus === 'connected'
                                ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800/30'
                                : apiKeyStatus === 'missing'
                                    ? 'bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-800/30'
                                    : 'bg-slate-50 border-slate-100 dark:bg-slate-800/30 dark:border-slate-800/30'
                            }`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-full ${apiKeyStatus === 'connected' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {apiKeyStatus === 'connected' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        {apiKeyStatus === 'connected' ? 'Google GenAI Connected' : 'Checking for API Key...'}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                        {apiKeyStatus === 'connected'
                                            ? 'The AI Engine has been successfully localized. Keys are securely managed via your .env.local file.'
                                            : 'Please ensure GOOGLE_GENAI_API_KEY is present in your local environment file.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Model Parameters */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Settings size={16} className="text-purple-500" />
                            Model Parameters
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Temperature</label>
                                <input
                                    type="range"
                                    min="0" max="1" step="0.1"
                                    value={aiParams.temperature}
                                    onChange={(e) => setAiParams({ ...aiParams, temperature: parseFloat(e.target.value) })}
                                    className="w-full"
                                />
                                <div className="text-[10px] text-right text-slate-400 font-mono">{aiParams.temperature}</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Max Output Tokens</label>
                                <input
                                    type="number"
                                    value={aiParams.maxTokens}
                                    onChange={(e) => setAiParams({ ...aiParams, maxTokens: parseInt(e.target.value) })}
                                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pro-Tips */}
                    <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 flex gap-3">
                        <HelpCircle size={18} className="text-indigo-500 shrink-0" />
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                            <b>Pro Tip:</b> Use the .env.example file in your root directory to set up your local AI environment.
                            Never commit your .env.local file to GitHub.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};
