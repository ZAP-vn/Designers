import React from 'react';
import { ProjectConfig, ThemeState } from '../types';
import { InspectorHeader } from './InspectorHeader';
import { InspectorAccordion, ControlDevWrapper } from './InspectorCommon';
import { ToggleGroup, SegmentControl } from './atoms/SelectionControls';
import { QuantityStepper } from './atoms/Steppers';

interface FeedbackInspectorProps {
    config: ProjectConfig;
    onUpdateConfig: (config: ProjectConfig) => void;
    themeState: ThemeState;
    showClassNames?: boolean;
    setShowClassNames?: (show: boolean) => void;
}

export const FeedbackInspector: React.FC<FeedbackInspectorProps> = ({
    config,
    onUpdateConfig,
    themeState,
    showClassNames,
    setShowClassNames
}) => {

    // Helper to safely update nested feedback config
    const updateFeedbackConfig = (section: 'toasts' | 'alerts' | 'modals', key: string, value: any) => {
        const currentFeedback: any = config.generatedContent?.feedback || {};
        const currentSection = currentFeedback[section] || {};

        onUpdateConfig({
            ...config,
            generatedContent: {
                ...config.generatedContent!,
                feedback: {
                    ...currentFeedback,
                    [section]: {
                        ...currentSection,
                        [key]: value
                    }
                }
            }
        });
    };

    const toastsConfig = config.generatedContent?.feedback?.toasts || { position: 'top-right', duration: 5000 };
    const alertsConfig = config.generatedContent?.feedback?.alerts || { style: 'standard' };

    return (
        <div className="flex flex-col h-full bg-white">
            <InspectorHeader
                title="Feedback Settings"
                badge="Config"
                showClassNames={!!showClassNames}
                setShowClassNames={setShowClassNames}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

                {/* Toasts Config */}
                <InspectorAccordion title="Toasts / Snackbars" defaultOpen={true}>
                    <ControlDevWrapper
                        tokenKey="feedback.toasts"
                        active={showClassNames}
                    >
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600">Position</label>
                                <SegmentControl
                                    themeState={themeState}
                                    label=""
                                    options={['Top Right', 'Top Center', 'Bottom Right', 'Bottom Center']}
                                    value={toastsConfig.position.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    onChange={(val) => updateFeedbackConfig('toasts', 'position', val.toLowerCase().replace(' ', '-'))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-600">Duration (ms)</label>
                                <QuantityStepper
                                    themeState={themeState}
                                    label=""
                                    min={1000}
                                    max={10000}
                                    step={1000}
                                    defaultValue={toastsConfig.duration}
                                    onChange={(val) => updateFeedbackConfig('toasts', 'duration', val)}
                                />
                            </div>
                        </div>
                    </ControlDevWrapper>
                </InspectorAccordion>

                {/* Alerts Config */}
                <InspectorAccordion title="Alert Banners" defaultOpen={true}>
                    <ControlDevWrapper
                        tokenKey="feedback.alerts"
                        active={showClassNames}
                    >
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600">Visual Style</label>
                                <SegmentControl
                                    label=""
                                    themeState={themeState}
                                    options={['Standard', 'Callout', 'Banner']}
                                    value={alertsConfig.style.charAt(0).toUpperCase() + alertsConfig.style.slice(1)}
                                    onChange={(val) => updateFeedbackConfig('alerts', 'style', val.toLowerCase())}
                                />
                            </div>
                        </div>
                    </ControlDevWrapper>
                </InspectorAccordion>

            </div>
        </div>
    );
};
