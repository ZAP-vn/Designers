
import React from 'react';
import { ThemeState } from '../types';
import { Square, Droplet, Layers, Zap, ExternalLink, Eye, Ruler, Type } from 'lucide-react';
import { InspectorAccordion, ControlDevWrapper, StyleCardOption } from './InspectorCommon';
import { SliderWidget } from './atoms/SliderWidget';
import { InspectorHeader } from './InspectorHeader';
import ColorPicker from './ColorPicker';
import { useStore } from '../store';
import { ContainerDevWrapper } from './DevDocBanner';

interface ButtonInspectorProps {
    themeState: ThemeState;
    setThemeState: (theme: ThemeState) => void;
    showClassNames: boolean;
    onCategoryChange?: (category: string) => void;
}

export const ButtonInspector: React.FC<ButtonInspectorProps> = ({
    themeState,
    setThemeState,
    showClassNames,
    onCategoryChange
}) => {
    const {
        userRole,
        setMasterConfig,
        setMerchantOverride
    } = useStore();

    const FILE_PATH = "components/ButtonInspector.tsx";

    const updateTheme = (update: Partial<ThemeState>) => {
        if (userRole === 'admin') {
            setMasterConfig(update);
            // ADMIN OVERRIDE RULE: When Admin sets a value, clear the Merchant override
            setMerchantOverride((prev) => {
                const next = { ...prev };
                Object.keys(update).forEach((key) => {
                    // @ts-ignore
                    next[key as keyof ThemeState] = undefined;
                });
                return next;
            });
        } else {
            setMerchantOverride(update);
        }
    };

    const inspectorIdentity = {
        displayName: "ButtonInspector",
        filePath: "components/ButtonInspector.tsx",
        parentComponent: "UiKitInspector",
        type: "Organism/Block", // Level 5: Block
        architecture: "SYSTEMS // CONTROLLER"
    };

    return (
        <ContainerDevWrapper
            showClassNames={showClassNames}
            atomic="Organism"
            identity={inspectorIdentity}
        >
            <div className="animate-in fade-in duration-300">
                <div className="space-y-2">
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{
                            displayName: "ButtonStyleControl",
                            type: "Molecule/Part",
                            architecture: "SYSTEMS // VISUALS",
                            filePath: "components/ButtonInspector.tsx"
                        }}
                        atomic="Molecule"
                    >
                        <InspectorAccordion title="Visual Style" icon={Eye} defaultOpen={true} showClassNames={showClassNames} devLabel="Button Variants">
                            <ControlDevWrapper active={showClassNames} tokenKey="buttonStyle" filePath={FILE_PATH}>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <StyleCardOption active={themeState.buttonStyle === 'flat'} label="Flat" icon={Square} onClick={() => updateTheme({ buttonStyle: 'flat' })} accentColor={themeState.primary} />
                                    <StyleCardOption active={themeState.buttonStyle === 'soft'} label="Soft" icon={Droplet} onClick={() => updateTheme({ buttonStyle: 'soft' })} accentColor={themeState.primary} />
                                    <StyleCardOption active={themeState.buttonStyle === 'neo'} label="Neo" icon={Layers} onClick={() => updateTheme({ buttonStyle: 'neo' })} accentColor={themeState.primary} />
                                    <StyleCardOption active={themeState.buttonStyle === 'glow'} label="Glow" icon={Zap} onClick={() => updateTheme({ buttonStyle: 'glow' })} accentColor={themeState.primary} />
                                </div>
                            </ControlDevWrapper>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fill Type</label>
                                    <ControlDevWrapper active={showClassNames} tokenKey="fillMode" filePath={FILE_PATH}>
                                        <div className="flex bg-gray-50 p-1 rounded-lg">
                                            <button onClick={() => updateTheme({ fillMode: 'solid' })} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${themeState.fillMode === 'solid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>Solid</button>
                                            <button onClick={() => updateTheme({ fillMode: 'gradient' })} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${themeState.fillMode === 'gradient' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>Gradient</button>
                                        </div>
                                    </ControlDevWrapper>
                                </div>
                                <ControlDevWrapper active={showClassNames} tokenKey="gradientAngle" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Gradient Angle" value={themeState.gradientAngle || 135} min={0} max={360} step={45} onChange={(v) => updateTheme({ gradientAngle: v })} unit="°" />
                                </ControlDevWrapper>
                                <ControlDevWrapper active={showClassNames} tokenKey="depth" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Shadow Depth" value={themeState.depth || 1} min={0} max={5} step={1} onChange={(v) => updateTheme({ depth: v })} />
                                </ControlDevWrapper>
                                <ControlDevWrapper active={showClassNames} tokenKey="buttonHoverOpacity" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Hover Opacity" value={themeState.buttonHoverOpacity !== undefined ? themeState.buttonHoverOpacity : 90} min={0} max={100} step={5} onChange={(v) => updateTheme({ buttonHoverOpacity: v })} unit="%" />
                                </ControlDevWrapper>
                            </div>
                        </InspectorAccordion>
                    </ContainerDevWrapper>

                    {userRole === 'admin' && (
                        <ContainerDevWrapper
                            showClassNames={showClassNames}
                            identity={{
                                displayName: "ButtonGeometryControl",
                                type: "Molecule/Part",
                                architecture: "SYSTEMS // GEOMETRY",
                                filePath: "components/ButtonInspector.tsx"
                            }}
                            atomic="Molecule"
                        >
                            <InspectorAccordion title="Shape & Size (Admin)" icon={Ruler} defaultOpen={true} showClassNames={showClassNames} devLabel="Geometry">
                                <ControlDevWrapper active={showClassNames} tokenKey="borderRadius" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Border Radius" value={themeState.borderRadius} min={0} max={24} step={2} onChange={(v) => updateTheme({ borderRadius: v })} unit="px" />
                                </ControlDevWrapper>
                                <ControlDevWrapper active={showClassNames} tokenKey="btnPaddingX" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Horizontal Padding" value={themeState.btnPaddingX} min={8} max={48} step={4} onChange={(v) => updateTheme({ btnPaddingX: v })} unit="px" />
                                </ControlDevWrapper>
                                <ControlDevWrapper active={showClassNames} tokenKey="btnPaddingY" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Vertical Padding" value={themeState.btnPaddingY} min={4} max={24} step={2} onChange={(v) => updateTheme({ btnPaddingY: v })} unit="px" />
                                </ControlDevWrapper>
                                <ControlDevWrapper active={showClassNames} tokenKey="iconGap" filePath={FILE_PATH}>
                                    <SliderWidget themeState={themeState} label="Icon Gap" value={themeState.iconGap || 8} min={4} max={20} step={2} onChange={(v) => updateTheme({ iconGap: v })} unit="px" />
                                </ControlDevWrapper>
                            </InspectorAccordion>
                        </ContainerDevWrapper>
                    )}
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{
                            displayName: "ButtonColorControl",
                            type: "Molecule/Part",
                            architecture: "SYSTEMS // TYPOGRAPHY",
                            filePath: "components/ButtonInspector.tsx"
                        }}
                        atomic="Molecule"
                    >
                        <InspectorAccordion title="Button Text Colors" icon={Type} showClassNames={showClassNames} devLabel="Text Colors">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-[10px] text-gray-400 font-medium">Overrides</span>
                                <button onClick={() => onCategoryChange && onCategoryChange('Brand Colors')} className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors">
                                    Manage Palette <ExternalLink size={10} />
                                </button>
                            </div>
                            <ControlDevWrapper active={showClassNames} tokenKey="primaryBtnText" filePath={FILE_PATH}>
                                <ColorPicker label="Primary Text" value={themeState.primaryBtnText} onChange={(v) => updateTheme({ primaryBtnText: v })} />
                            </ControlDevWrapper>
                            <ControlDevWrapper active={showClassNames} tokenKey="secondaryBtnText" filePath={FILE_PATH}>
                                <ColorPicker label="Secondary Text" value={themeState.secondaryBtnText} onChange={(v) => updateTheme({ secondaryBtnText: v })} />
                            </ControlDevWrapper>
                            <ControlDevWrapper active={showClassNames} tokenKey="tertiaryBtnText" filePath={FILE_PATH}>
                                <ColorPicker label="Tertiary Text" value={themeState.tertiaryBtnText} onChange={(v) => updateTheme({ tertiaryBtnText: v })} />
                            </ControlDevWrapper>
                        </InspectorAccordion>
                    </ContainerDevWrapper>
                </div>
            </div>
        </ContainerDevWrapper>
    );
};
