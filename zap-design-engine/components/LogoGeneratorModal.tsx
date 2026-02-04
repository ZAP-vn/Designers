
import React, { useState, useEffect } from 'react';
import { X, Wand2, RefreshCw, Image as ImageIcon, Zap, Check, AlertTriangle, ChevronDown, Settings2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ThemeState, ProjectConfig } from '../types';

interface LogoGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (logoUrl: string) => void;
    projectConfig: ProjectConfig;
    themeState: ThemeState;
    initialPrompt?: string;
}

const MODELS = [
    { id: 'gemini-2.5-flash-image', name: 'Gemini 2.5 Flash (Fast)', type: 'gemini' },
    { id: 'gemini-3-pro-image-preview', name: 'Gemini 3 Pro (High Quality)', type: 'gemini' },
    { id: 'imagen-4.0-generate-001', name: 'Imagen 4 (Photorealistic)', type: 'imagen' },
];

export const LogoGeneratorModal: React.FC<LogoGeneratorModalProps> = ({
    isOpen,
    onClose,
    onSave,
    projectConfig,
    themeState,
    initialPrompt
}) => {
    const [prompt, setPrompt] = useState('');
    const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [tokenUsage, setTokenUsage] = useState<{ prompt: number, completion: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingStage, setLoadingStage] = useState(0); // 0-100

    useEffect(() => {
        if (isOpen) {
            // Context-aware default prompt generation
            const projectName = projectConfig.projectName || 'My Brand';
            const industry = projectConfig.businessType || 'General';
            const country = projectConfig.country ? ` based in ${projectConfig.country}` : '';
            
            const defaultPrompt = `Design a professional logo for "${projectName}", a company in the ${industry} industry${country}. ` +
                `The design should reflect modern aesthetics suitable for this sector. ` +
                `Primary brand color: ${themeState.primary}, Secondary accent: ${themeState.secondary}. ` +
                `Style: Minimalist, clean geometric shapes, high contrast, vector style icon, white background.`;

            setPrompt(initialPrompt || defaultPrompt);
            
            // Pre-load existing logo if available so "Regenerate" context is clear
            setGeneratedImage(projectConfig.logo?.url || null);
            setTokenUsage(null);
            setError(null);
            setLoadingStage(0);
        }
    }, [isOpen, initialPrompt, projectConfig, themeState]);

    // Simulated progress for UX
    useEffect(() => {
        if (!isGenerating) return;
        const interval = setInterval(() => {
            setLoadingStage(prev => {
                if (prev >= 90) return prev;
                return prev + Math.floor(Math.random() * 10);
            });
        }, 500);
        return () => clearInterval(interval);
    }, [isGenerating]);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        setTokenUsage(null);
        setGeneratedImage(null);
        setLoadingStage(10);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const currentModelConfig = MODELS.find(m => m.id === selectedModel);
            
            let base64Image: string | null = null;
            let mimeType = 'image/png';

            if (currentModelConfig?.type === 'imagen') {
                // IMAGEN API CALL (generateImages)
                const response = await ai.models.generateImages({
                    model: selectedModel,
                    prompt: prompt,
                    config: {
                        numberOfImages: 1,
                        outputMimeType: 'image/jpeg',
                        aspectRatio: '1:1',
                    },
                });
                
                if (response.generatedImages?.[0]?.image?.imageBytes) {
                    base64Image = response.generatedImages[0].image.imageBytes;
                    mimeType = 'image/jpeg';
                }

            } else {
                // GEMINI API CALL (generateContent)
                const response = await ai.models.generateContent({
                    model: selectedModel,
                    contents: {
                        parts: [{ text: `Generate a square logo image: ${prompt}` }]
                    }
                });

                // Extract Image from Gemini Response
                if (response.candidates && response.candidates[0].content.parts) {
                    for (const part of response.candidates[0].content.parts) {
                        if (part.inlineData) {
                            base64Image = part.inlineData.data;
                            mimeType = part.inlineData.mimeType || 'image/png';
                            break;
                        }
                    }
                }

                // Capture usage for Gemini
                if (response.usageMetadata) {
                    setTokenUsage({
                        prompt: response.usageMetadata.promptTokenCount || 0,
                        completion: response.usageMetadata.candidatesTokenCount || 0
                    });
                }
            }

            setLoadingStage(100);

            if (base64Image) {
                setGeneratedImage(`data:${mimeType};base64,${base64Image}`);
            } else {
                console.warn("No image data found in response.");
                setError("The model returned text instead of an image or failed to generate. Please try refining the prompt.");
            }

        } catch (err: any) {
            console.error("Generation failed", err);
            setError(err.message || "Failed to generate logo. Please check API quota.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                            <Wand2 size={18} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">AI Logo Studio</h3>
                            <p className="text-xs text-gray-500">Design assets with Google AI</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    
                    {/* Model Selector */}
                    <div className="mb-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-1">
                            <Settings2 size={12} /> AI Model
                        </label>
                        <div className="relative">
                            <select 
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium outline-none focus:border-purple-500 appearance-none cursor-pointer hover:border-gray-300 transition-colors"
                            >
                                {MODELS.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Prompt Input */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Prompt Description</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none h-32 leading-relaxed text-gray-700 placeholder:text-gray-400"
                            placeholder="Describe your logo..."
                        />
                    </div>

                    {/* Preview Area */}
                    <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group">
                        {isGenerating ? (
                            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10">
                                <div className="w-16 h-16 relative mb-4">
                                    <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                                    <div 
                                        className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"
                                    ></div>
                                </div>
                                <div className="text-sm font-bold text-gray-900 animate-pulse">Generating Assets...</div>
                                <div className="w-48 h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                                    <div 
                                        className="h-full bg-purple-500 transition-all duration-300 ease-out" 
                                        style={{ width: `${loadingStage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : generatedImage ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-white">
                                <img src={generatedImage} alt="Generated Logo" className="max-w-full max-h-full object-contain p-8" />
                                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono">
                                    {MODELS.find(m => m.id === selectedModel)?.name.split('(')[0].trim()}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 p-8">
                                <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
                                <p className="text-sm font-medium">Ready to generate</p>
                            </div>
                        )}
                        
                        {/* Token Usage Overlay (Gemini Only) */}
                        {tokenUsage && !isGenerating && (
                            <div className="absolute top-4 right-4 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                <Zap size={12} fill="currentColor" />
                                <span>{tokenUsage.prompt + tokenUsage.completion} Tokens</span>
                            </div>
                        )}

                        {error && (
                            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center text-center p-6 z-20">
                                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-3">
                                    <AlertTriangle size={24} />
                                </div>
                                <p className="text-sm font-bold text-red-900 mb-1">Generation Error</p>
                                <p className="text-xs text-red-600 mb-4">{error}</p>
                                <button 
                                    onClick={() => setError(null)}
                                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center gap-4">
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isGenerating ? 'Designing...' : (generatedImage ? 'Regenerate' : 'Generate Logo')}
                        {!isGenerating && <RefreshCw size={16} />}
                    </button>
                    
                    {generatedImage && (
                        <button 
                            onClick={() => { onSave(generatedImage); onClose(); }}
                            className="flex-1 py-3 bg-purple-600 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-purple-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Use Logo <Check size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
