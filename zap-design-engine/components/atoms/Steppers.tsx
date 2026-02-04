import React, { useState } from 'react';
import { ThemeState } from '../../types';
import { Minus, Plus } from 'lucide-react';

export const QuantityStepper = ({
    themeState,
    label,
    defaultValue = 1,
    min = 0,
    max = 999,
    step = 1,
    onChange
}: {
    themeState: ThemeState,
    label: string,
    defaultValue?: number,
    min?: number,
    max?: number,
    step?: number,
    onChange?: (val: number) => void
}) => {
    const [localValue, setLocalValue] = useState(defaultValue);

    const update = (newVal: number) => {
        const clamped = Math.max(min, Math.min(max, newVal));
        setLocalValue(clamped);
        onChange?.(clamped);
    };

    return (
        <div>
            {label && <label style={{ color: themeState.formLabelColor || themeState.darkText, fontSize: '12px', fontWeight: 700, marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: themeState.fontFamily }}>{label}</label>}
            <div className="flex items-center w-full" style={{ backgroundColor: themeState.formVariant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF'), border: `1px solid ${themeState.inputBorder || '#E5E7EB'}`, borderRadius: `${themeState.borderRadius}px`, overflow: 'hidden' }}>
                <button onClick={() => update(localValue - step)} className="px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-center border-r border-gray-100" style={{ borderColor: themeState.inputBorder || '#E5E7EB' }}>
                    <Minus size={16} style={{ color: themeState.darkText }} />
                </button>
                <div className="flex-1 text-center font-semibold text-sm py-3" style={{ color: themeState.formTextColor || themeState.darkText, fontFamily: themeState.fontFamily }}>{localValue}</div>
                <button onClick={() => update(localValue + step)} className="px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-center border-l border-gray-100" style={{ borderColor: themeState.inputBorder || '#E5E7EB' }}>
                    <Plus size={16} style={{ color: themeState.darkText }} />
                </button>
            </div>
        </div>
    );
};

export const ModernStepper = ({ themeState, label }: { themeState: ThemeState, label?: string }) => {
    const [value, setValue] = useState(14); // Matches image "14"
    const [isPlusHovered, setIsPlusHovered] = useState(false);
    const activeColor = themeState.activeColor || themeState.primary;

    return (
        <div>
            {label && (
                <label style={{
                    color: themeState.formLabelColor || themeState.darkText,
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '6px',
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: themeState.fontFamily
                }}>
                    {label}
                </label>
            )}
            <div
                className="inline-flex items-center justify-between bg-white p-1.5 shadow-sm border border-gray-100 w-full max-w-[200px]"
                style={{ borderRadius: `${themeState.borderRadius}px` }}
            >
                <button
                    onClick={() => setValue(Math.max(0, value - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                    style={{ borderRadius: `${Math.max(4, themeState.borderRadius - 4)}px` }}
                >
                    <Minus size={20} strokeWidth={2.5} />
                </button>

                <span className="text-xl font-bold text-gray-700 min-w-[3ch] text-center select-none" style={{ fontFamily: themeState.fontFamily, color: themeState.darkText }}>
                    {value}
                </span>

                <button
                    onClick={() => setValue(value + 1)}
                    onMouseEnter={() => setIsPlusHovered(true)}
                    onMouseLeave={() => setIsPlusHovered(false)}
                    className="w-10 h-10 flex items-center justify-center transition-all active:scale-95 shadow-sm"
                    style={{
                        borderRadius: `${Math.max(4, themeState.borderRadius - 4)}px`,
                        backgroundColor: isPlusHovered ? `${activeColor}15` : '#F9FAFB',
                        color: isPlusHovered ? activeColor : themeState.grayText,
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Plus size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};
