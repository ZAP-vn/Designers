import React from 'react';
import { ThemeState } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';
import { UserSessionSelector, ProfileSwitcher, AvatarWidget } from '../atoms/UserWidgets';
import { SliderWidget } from '../atoms/SliderWidget';
import { FormElementPreview } from '../FormsSection'; // Reusing the preview wrapper for consistency

interface WidgetShowcaseProps {
    themeState: ThemeState;
    showClassNames?: boolean;
}

export const WidgetShowcase: React.FC<WidgetShowcaseProps> = ({ themeState, showClassNames }) => {
    return (
        <ContainerDevWrapper
            showClassNames={showClassNames}
            identity={{
                displayName: "WidgetShowcase",
                filePath: "components/views/WidgetShowcase.tsx",
                parentComponent: "UiKitSection",
                type: "Region/Section",
                architecture: "SYSTEMS // WIDGETS"
            }}
            className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300"
        >
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <div className="mb-8 pb-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold" style={{ color: themeState.darkText }}>Interactive Widgets</h3>
                    <div className="text-xs text-gray-400 font-mono">
                        Interactive • State-Driven
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">

                    {/* User Session */}
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{ displayName: "UserSession", filePath: "components/atoms/UserWidgets.tsx", type: "Organism/Widget" }}
                    >
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">User Session</label>
                            <UserSessionSelector themeState={themeState} />
                        </div>
                    </ContainerDevWrapper>

                    {/* Profile Switcher */}
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{ displayName: "ProfileSwitcher", filePath: "components/atoms/UserWidgets.tsx", type: "Organism/Widget" }}
                    >
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile Switcher</label>
                            <ProfileSwitcher themeState={themeState} />
                        </div>
                    </ContainerDevWrapper>

                    {/* Avatars */}
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{ displayName: "AvatarWidget", filePath: "components/atoms/UserWidgets.tsx", type: "Organism/Widget" }}
                    >
                        <div className="space-y-2">
                            {/* Label handled inside widget */}
                            <AvatarWidget themeState={themeState} />
                        </div>
                    </ContainerDevWrapper>

                    {/* Sliders */}
                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{ displayName: "SliderWidget", filePath: "components/atoms/SliderWidget.tsx", type: "Atom/Input" }}
                    >
                        <div className="space-y-2">
                            <SliderWidget themeState={themeState} label="Volume Control" defaultValue={45} />
                        </div>
                    </ContainerDevWrapper>

                    <ContainerDevWrapper
                        showClassNames={showClassNames}
                        identity={{ displayName: "SliderWidget", filePath: "components/atoms/SliderWidget.tsx", type: "Atom/Input" }}
                    >
                        <div className="space-y-2">
                            <SliderWidget
                                themeState={themeState}
                                label="Stepped Value"
                                defaultValue={50}
                                step={10}
                                withMarkers
                                note="Snaps to 10% increments"
                            />
                        </div>
                    </ContainerDevWrapper>

                </div>
            </section>
        </ContainerDevWrapper>
    );
};
