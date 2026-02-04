
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ProjectConfig, ThemeState, FontFamilyEntry, FontSource, TypographyItem, IconEntry } from '../types';
import * as LucideIcons from 'lucide-react';
import {
    Palette, Box, Sliders, Check, Monitor, Laptop, Zap, Bell, Shield, CreditCard, BarChart, Sparkles, GripVertical, MousePointer2, ArrowRight, Type,
    Square, Droplet, Layers, Copy, LayoutTemplate, MousePointerClick, LayoutDashboard, Search, Code2, Wand2, X, Pipette, Hash, Cloud, FileUp, Trash2, ChevronLeft, ChevronRight, ArrowUpRight, Plus, Upload, FileText, Info, Filter, Minus, AlignLeft, AlignCenter, AlignRight,
    Download, AlertCircle, ChevronDown, Circle, PlusCircle, Lock, ArrowUpLeft, ExternalLink, ArrowUp, ArrowLeft, EyeOff, Sun, Moon,
    SlidersHorizontal, FileJson,
    Layout, Move, Maximize, Scissors
} from 'lucide-react';
import { useStore } from '../store';
import { COLOR_PRESETS } from './colorPresets';
import { FONT_PRESETS } from './fontPresets';
import { THEME_PRESETS, ThemePreset } from './themePresets';
import ColorPicker from './ColorPicker';
import TypographySection from './TypographySection';
import { ButtonShowcase } from './views/ButtonShowcase';
import { BrandColorsView } from './views/BrandColorsView';
import { IconsGridView } from './views/IconsGridView';
import { DevDocBanner, DevContext, EnhancedDevContext, ContainerDevWrapper } from './DevDocBanner';
import { DevBadge, ControlDevWrapper, InspectorAccordion, StyleCardOption } from './InspectorCommon';
import { ButtonInspector } from './ButtonInspector';

import { UiKitInspector } from './UiKitInspector';
import { WidgetShowcase } from './views/WidgetShowcase';
import { FeedbackShowcase } from './views/FeedbackShowcase';
import { WidgetInspector } from './WidgetInspector';
import { FeedbackInspector } from './FeedbackInspector';

// --- Types ---
interface UiKitSectionProps {
    config: ProjectConfig;
    themeState: ThemeState;
    showClassNames?: boolean;
    setThemeState: (theme: ThemeState) => void;
    setShowClassNames?: (show: boolean) => void;
    onUpdateConfig: (config: ProjectConfig) => void;
    activeCategory: string;
    onCategoryChange?: (category: string) => void;
    onSelectIcon?: (icon: IconEntry) => void;
    selectedIcon?: IconEntry | null;
    isDarkMode?: boolean;
    // Added fontEditorMode
    fontEditorMode?: 'primary' | 'secondary';
    setFontEditorMode?: (mode: 'primary' | 'secondary') => void;
}

const UiKitSection: React.FC<UiKitSectionProps> = ({
    config,
    themeState,
    activeCategory,
    showClassNames,
    onSelectIcon,
    isDarkMode,
    fontEditorMode,
    setFontEditorMode,
    onUpdateConfig
}) => {

    const handleTypographyUpdate = (newItems: TypographyItem[]) => {
        onUpdateConfig({
            ...config,
            generatedContent: {
                ...config.generatedContent!,
                typography: {
                    ...config.generatedContent!.typography,
                    items: newItems
                }
            }
        });
    };

    return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar bg-white">
            <ContainerDevWrapper
                showClassNames={showClassNames}
                className={`w-full max-w-[1600px] mx-auto p-6 md:p-8 pb-32 transition-all duration-300 ${showClassNames ? 'border-2 border-dashed border-indigo-200 rounded-[2.5rem] bg-indigo-50/10 mt-14' : ''}`}
                identity={{
                    displayName: "PreviewZone",
                    filePath: "components/UiKitSection.tsx",
                    parentComponent: "App",
                    type: "Region/Zone" // Level 4: Zone
                }}
                atomic="Organism"
            >
                {activeCategory === 'Brand Colors' && <BrandColorsView themeState={themeState} config={config} showClassNames={showClassNames} />}
                {activeCategory === 'Typography' && (
                    <TypographySection
                        config={config}
                        themeState={themeState}
                        showClassNames={showClassNames}
                        activeMode={fontEditorMode}
                        onUpdate={handleTypographyUpdate}
                        onModeChange={(mode) => setFontEditorMode && setFontEditorMode(mode)}
                    />
                )}
                {activeCategory === 'Buttons' && <ButtonShowcase themeState={themeState} showClassNames={showClassNames} />}
                {activeCategory === 'Inputs' && <div className="text-gray-400 italic">Inputs Showcase moved to separate tab</div>}
                {activeCategory === 'Widgets' && <WidgetShowcase themeState={themeState} showClassNames={showClassNames} />}
                {activeCategory === 'Feedback' && <FeedbackShowcase themeState={themeState} showClassNames={showClassNames} />}
                {activeCategory === 'Icons' && <IconsGridView icons={config.generatedContent?.icons || []} themeState={themeState} onSelectIcon={onSelectIcon} showClassNames={showClassNames} />}
            </ContainerDevWrapper>
        </div>
    );
};

export default UiKitSection;
export { UiKitInspector };
