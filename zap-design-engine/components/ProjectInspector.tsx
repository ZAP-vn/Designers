import React, { useState, useRef } from 'react';
import {
    Briefcase, Globe, Calendar, Image as ImageIcon, UploadCloud,
    Sparkles, Wand2, Type, Palette, Layout, MousePointerClick,
    Check, ArrowRight, Loader2, AlertCircle, X
} from 'lucide-react';
import { ProjectConfig, ThemeState } from '../types';
import { InspectorAccordion, ControlDevWrapper } from './InspectorCommon';
import { DevDocBanner, EnhancedDevContext, ContainerDevWrapper } from './DevDocBanner';
import { InspectorHeader } from './InspectorHeader';
import { LogoGeneratorModal } from './LogoGeneratorModal';
import { GoogleGenAI } from "@google/genai";

interface ProjectInspectorProps {
    config: ProjectConfig;
    onUpdateConfig: (config: ProjectConfig) => void;
    themeState: ThemeState;
    setThemeState: (theme: ThemeState) => void;
    showClassNames: boolean;
    setShowClassNames: (show: boolean) => void;
}

const ProjectInspector: React.FC<ProjectInspectorProps> = ({
    config,
    onUpdateConfig,
    themeState,
    setThemeState,
    showClassNames,
    setShowClassNames
}) => {
    const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStatus, setAnalysisStatus] = useState('');
    const [logoError, setLogoError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        // Requirement: Allow multiple uploads but only accept the first one
        const file = fileList[0];

        // Requirement: Adhere to a 5MB size limit
        if (file.size > 5 * 1024 * 1024) {
            setLogoError("File size exceeds 5MB limit.");
            // Clear input so change event can fire again for same file if needed
            e.target.value = '';
            return;
        }

        if (!file.type.startsWith('image/')) {
            setLogoError("Please upload a valid image file.");
            e.target.value = '';
            return;
        }

        setLogoError(null);

        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            onUpdateConfig({
                ...config,
                logo: { ...config.logo, url: result }
            });
        };
        reader.readAsDataURL(file);
    };

    const handleReferenceDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;

        setIsAnalyzing(true);
        setAnalysisStatus('Reading image...');

        try {
            // 1. Convert to Base64
            const base64Data = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    // Remove data URL prefix for API
                    const base64 = result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            setAnalysisStatus('Extracting styles...');

            // 2. Call Gemini for Analysis
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Analyze this brand logo/image. Extract:
            1. The font category (Serif, Sans-Serif, Display, Monospace) - ONLY the type.
            2. The dominant brand color (hex) and a secondary color (hex).
            3. A short text description of the logo style.
            Return JSON: { "fontType": string, "colors": { "primary": string, "secondary": string }, "description": string }`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        { inlineData: { mimeType: file.type, data: base64Data } },
                        { text: prompt }
                    ]
                }
            });

            // 3. Parse and Apply
            const text = response.text || '';
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const data = JSON.parse(jsonMatch[0]);

                setAnalysisStatus('Applying theme...');

                // Update Theme
                setThemeState({
                    ...themeState,
                    primary: data.colors.primary || themeState.primary,
                    secondary: data.colors.secondary || themeState.secondary,
                    fontFamily: data.fontType === 'Serif' ? 'Merriweather' :
                        data.fontType === 'Monospace' ? 'Roboto Mono' :
                            data.fontType === 'Display' ? 'Oswald' : 'Inter'
                });

                // Update Config with extracted logo description for future generation
                onUpdateConfig({
                    ...config,
                    logo: {
                        url: config.logo?.url || '',
                        description: data.description
                    }
                });
            }

            setAnalysisStatus('Done!');
            setTimeout(() => setIsAnalyzing(false), 1500);

        } catch (err) {
            console.error("Analysis failed", err);
            setAnalysisStatus('Failed to analyze');
            setTimeout(() => setIsAnalyzing(false), 2000);
        }
    };

    const devContext: EnhancedDevContext = {
        identity: {
            displayName: "ProjectInspector",
            filePath: "components/ProjectInspector.tsx",
            parentComponent: "App",
            type: "Region/Zone", // Level 4: Zone
            htmlTag: "aside"
        },
        state: {
            sourceVar: "config",
            dataType: "ProjectConfig",
            handlerProp: "onUpdateConfig",
            currentValuePreview: config.projectName
        },
        styling: {
            tailwindClasses: "p-6",
            themeTokens: ["primary"]
        },
        structure: {
            architecture: "FOUNDATIONAL // SYSTEMS",
            structuralRole: "ORGANISM // CONTROLLER",
            codeAudit: "PROTOCOL :: OPERATIONAL"
        }
    };

    const inspectorIdentity = {
        displayName: "ProjectInspector",
        filePath: "components/ProjectInspector.tsx",
        parentComponent: "App",
        type: "Info/Legend",
        architecture: "FOUNDATIONAL // SYSTEMS"
    };

    return (
        <ContainerDevWrapper
            showClassNames={showClassNames}
            atomic="Organism"
            identity={inspectorIdentity}
        >
            <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors duration-300">
                {/* Header */}
                <InspectorHeader
                    title="Project Info"
                    badge="Controller"
                    showClassNames={showClassNames}
                    setShowClassNames={setShowClassNames}
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-2">
                    <DevDocBanner visible={showClassNames} devContext={devContext} context="controller" />

                    {/* 2. Logo & Assets */}
                    <InspectorAccordion title="Brand Assets" icon={ImageIcon} defaultOpen showClassNames={showClassNames} devLabel="Logo">

                        {/* Logo Preview Constraint 200x200 */}
                        <div className="flex justify-center mb-4 relative">
                            <div
                                className={`w-[200px] h-[200px] bg-white border-2 border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm transition-colors ${logoError ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                title="200x200 Logo Container"
                            >
                                {config.logo?.url ? (
                                    <img src={config.logo.url} alt="Project Logo" className="max-w-full max-h-full object-contain p-4" />
                                ) : (
                                    <div className="text-center text-gray-300">
                                        <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                                        <span className="text-xs font-medium">No Logo</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Exposed Actions (Moved outside of hover) */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-gray-200"
                            >
                                <UploadCloud size={14} /> Upload
                            </button>
                            {/* Multiple allowed, but logic takes first */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleLogoUpload}
                            />

                            <button
                                onClick={() => setIsLogoModalOpen(true)}
                                className="px-3 py-2.5 bg-purple-600 text-white hover:bg-purple-700 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                <Wand2 size={14} /> AI Generate
                            </button>
                        </div>

                        {logoError && (
                            <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-[10px] text-red-600 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle size={12} className="shrink-0" />
                                <span className="flex-1 font-medium">{logoError}</span>
                                <button onClick={() => setLogoError(null)} className="p-1 hover:bg-red-100 rounded"><X size={10} /></button>
                            </div>
                        )}

                        <div className="text-center text-[10px] text-gray-400 mb-4 font-mono">
                            Spec: 200x200px • Max 5MB
                        </div>

                        {/* AI Analysis Dropzone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onDrop={handleReferenceDrop}
                            className={`
                            border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-default
                            ${isAnalyzing ? 'border-purple-500 bg-purple-50' : 'border-blue-200 bg-blue-50/30 hover:border-blue-300 hover:bg-blue-50'}
                        `}
                        >
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center py-2">
                                    <Loader2 size={24} className="animate-spin text-purple-600 mb-2" />
                                    <span className="text-xs font-bold text-purple-700">{analysisStatus}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 py-2">
                                    <Sparkles size={20} className="text-blue-500" />
                                    <div>
                                        <p className="text-xs font-bold text-blue-900">Style Extraction</p>
                                        <p className="text-[10px] text-blue-600 leading-tight mt-1 px-4">
                                            Drag a reference image here to extract <span className="font-bold">Fonts</span> and <span className="font-bold">Colors</span> instantly.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Extraction Results Preview (if available) */}
                        {config.logo?.description && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Check size={12} className="text-green-500" />
                                    <span className="text-[10px] font-bold text-gray-600 uppercase">Extracted Context</span>
                                </div>
                                <p className="text-[10px] text-gray-500 line-clamp-3 leading-relaxed">
                                    {config.logo.description}
                                </p>
                            </div>
                        )}

                    </InspectorAccordion>

                    {/* 3. Localization */}
                    <InspectorAccordion title="Localization" icon={Globe} showClassNames={showClassNames} devLabel="L10n">
                        <ControlDevWrapper active={showClassNames} tokenKey="country">
                            <div className="space-y-1 mb-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Region</label>
                                <input
                                    type="text"
                                    value={config.country}
                                    onChange={(e) => onUpdateConfig({ ...config, country: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </ControlDevWrapper>
                        <ControlDevWrapper active={showClassNames} tokenKey="dateFormat">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date Format</label>
                                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700">
                                    <Calendar size={14} className="text-gray-400" />
                                    {config.dateFormat}
                                </div>
                            </div>
                        </ControlDevWrapper>
                    </InspectorAccordion>

                </div>

                <LogoGeneratorModal
                    isOpen={isLogoModalOpen}
                    onClose={() => setIsLogoModalOpen(false)}
                    onSave={(url) => onUpdateConfig({ ...config, logo: { ...config.logo, url } })}
                    projectConfig={config}
                    themeState={themeState}
                    initialPrompt={config.logo?.description}
                />
            </div>
        </ContainerDevWrapper>
    );
};

export default ProjectInspector;