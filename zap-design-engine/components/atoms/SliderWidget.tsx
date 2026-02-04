import React, { useState, useEffect } from 'react';
import { ThemeState } from '../../types';
import { Sliders } from 'lucide-react';

interface SliderWidgetProps {
    themeState: ThemeState;
    label: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;           // Controlled value
    defaultValue?: number;    // Uncontrolled initial value
    onChange?: (value: number) => void;
    withMarkers?: boolean;
    note?: string;
    unit?: string;            // e.g., "px", "%", "°"
    className?: string;       // For extra spacing/layout if needed
}

export const SliderWidget: React.FC<SliderWidgetProps> = ({
    themeState,
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue = 50,
    onChange,
    withMarkers = false,
    note,
    unit = '',
    className = ''
}) => {
    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState(defaultValue);

    // Determine current value: if 'value' prop is present (not undefined), use it; otherwise use internal state
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);

        if (!isControlled) {
            setInternalValue(newValue);
        }

        if (onChange) {
            onChange(newValue);
        }
    };

    // Calculate percentage for the custom progress bar width
    const safeMin = min;
    const safeMax = max === min ? min + 1 : max; // Check div by zero
    const percentage = Math.min(100, Math.max(0, ((currentValue - safeMin) / (safeMax - safeMin)) * 100));

    return (
        <div className={`w-full ${className}`}>
            {/* Header: Label + Value Badge */}
            <div className="flex justify-between items-end mb-3">
                <label
                    style={{
                        color: themeState.formLabelColor || themeState.darkText || '#374151',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: themeState.fontFamily
                    }}
                >
                    {label}
                </label>
                <div
                    className="px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors"
                    style={{
                        backgroundColor: `${themeState.activeColor || themeState.primary}15`,
                        color: themeState.activeColor || themeState.primary
                    }}
                >
                    {currentValue}{unit}
                </div>
            </div>

            {/* Custom Slider Track */}
            <div className="relative h-6 flex items-center select-none group">
                {/* Background Track */}
                <div className="absolute w-full h-1.5 rounded-full bg-gray-200 overflow-hidden dark:bg-slate-700">
                    {/* Active Fill */}
                    <div
                        className="h-full transition-all duration-75 ease-out"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: themeState.activeColor || themeState.primary
                        }}
                    />
                </div>

                {/* Markers */}
                {withMarkers && (
                    <div className="absolute w-full flex justify-between px-0.5 pointer-events-none">
                        {[0, 25, 50, 75, 100].map((m) => {
                            // Calculate marker value to see if it's "active" (covered by fill)
                            const markerVal = ((m / 100) * (safeMax - safeMin)) + safeMin;
                            const isActive = currentValue >= markerVal;
                            return (
                                <div
                                    key={m}
                                    className={`w-1 h-1 rounded-full transition-colors ${isActive ? 'bg-white/50' : 'bg-gray-300 dark:bg-slate-600'}`}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Thumb */}
                <div
                    className="absolute h-4 w-4 rounded-full border-2 border-white shadow-md pointer-events-none transition-transform duration-150 group-active:scale-110 z-10"
                    style={{
                        left: `calc(${percentage}% - 8px)`,
                        backgroundColor: themeState.activeColor || themeState.primary
                    }}
                />

                {/* Invisible Native Input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={currentValue}
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
            </div>

            {/* Optional Footer Note */}
            {note && (
                <div
                    className="mt-3 p-2 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-500 leading-relaxed flex gap-2 items-start dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                    style={{ fontFamily: themeState.fontFamily }}
                >
                    <div className="mt-0.5 shrink-0 text-gray-400">
                        <Sliders size={12} />
                    </div>
                    <span>{note}</span>
                </div>
            )}
        </div>
    );
};
