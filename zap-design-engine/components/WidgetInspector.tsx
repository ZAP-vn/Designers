import React from 'react';
import { ProjectConfig, ThemeState } from '../types';
import { InspectorHeader } from './InspectorHeader';
import { InspectorAccordion, ControlDevWrapper } from './InspectorCommon';
import { ToggleGroup } from './atoms/SelectionControls';
import { StandardInput } from './atoms/StandardInput';

interface WidgetInspectorProps {
    config: ProjectConfig;
    onUpdateConfig: (config: ProjectConfig) => void;
    themeState: ThemeState;
    showClassNames?: boolean;
    setShowClassNames?: (show: boolean) => void;
}

export const WidgetInspector: React.FC<WidgetInspectorProps> = ({
    config,
    onUpdateConfig,
    themeState,
    showClassNames,
    setShowClassNames
}) => {

    // Helper to safely update nested widget config
    const updateWidgetConfig = (section: 'userSession' | 'slider' | 'stats', key: string, value: any) => {
        const currentWidgets = config.generatedContent?.widgets || {};
        const currentSection = currentWidgets[section] || {};

        onUpdateConfig({
            ...config,
            generatedContent: {
                ...config.generatedContent!,
                widgets: {
                    ...currentWidgets,
                    [section]: {
                        ...currentSection,
                        [key]: value
                    }
                }
            }
        });
    };

    const userSession = config.generatedContent?.widgets?.userSession || { enabled: true, showProfileSwitcher: true };
    const sliderConfig = config.generatedContent?.widgets?.slider || { showTicks: true, min: 0, max: 100 };

    return (
        <div className="flex flex-col h-full bg-white">
            <InspectorHeader
                title="Widget Settings"
                badge="Config"
                showClassNames={!!showClassNames}
                setShowClassNames={setShowClassNames}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

                {/* User Session Config */}
                <InspectorAccordion title="User Session" defaultOpen={true}>
                    <ControlDevWrapper
                        tokenKey="widgets.userSession"
                        active={showClassNames}
                    >
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-600">Enable Widget</label>
                                <ToggleGroup
                                    themeState={themeState}
                                    options={['Off', 'On']}
                                    defaultValue={userSession.enabled ? 'On' : 'Off'}
                                    onChange={(val) => updateWidgetConfig('userSession', 'enabled', val === 'On')}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-600">Profile Switcher</label>
                                <ToggleGroup
                                    themeState={themeState}
                                    options={['Hide', 'Show']}
                                    defaultValue={userSession.showProfileSwitcher ? 'Show' : 'Hide'}
                                    onChange={(val) => updateWidgetConfig('userSession', 'showProfileSwitcher', val === 'Show')}
                                />
                            </div>
                        </div>
                    </ControlDevWrapper>
                </InspectorAccordion>

                {/* Slider Config */}
                <InspectorAccordion title="Sliders" defaultOpen={true}>
                    <ControlDevWrapper
                        tokenKey="widgets.slider"
                        active={showClassNames}
                    >
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-600">Show Ticks</label>
                                <ToggleGroup
                                    themeState={themeState}
                                    options={['No', 'Yes']}
                                    defaultValue={sliderConfig.showTicks ? 'Yes' : 'No'}
                                    onChange={(val) => updateWidgetConfig('slider', 'showTicks', val === 'Yes')}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <StandardInput
                                    themeState={themeState}
                                    label="Min Value"
                                    type="number"
                                    value={sliderConfig.min.toString()}
                                    onChange={(e) => updateWidgetConfig('slider', 'min', parseInt(e.target.value) || 0)}
                                />
                                <StandardInput
                                    themeState={themeState}
                                    label="Max Value"
                                    type="number"
                                    value={sliderConfig.max.toString()}
                                    onChange={(e) => updateWidgetConfig('slider', 'max', parseInt(e.target.value) || 100)}
                                />
                            </div>
                        </div>
                    </ControlDevWrapper>
                </InspectorAccordion>

            </div>
        </div>
    );
};
