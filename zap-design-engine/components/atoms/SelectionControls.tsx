import React, { useState } from 'react';
import { ThemeState } from '../../types';
import { Check, Minus } from 'lucide-react';


export const SegmentControl = ({
    themeState,
    label,
    options,
    value,
    onChange
}: {
    themeState: ThemeState,
    label: string,
    options: string[],
    value?: string,
    onChange?: (val: string) => void
}) => {
    // Fallback to local state if uncontrolled
    const [localValue, setLocalValue] = useState(options[0]);
    const activeValue = value !== undefined ? value : localValue;

    const handleClick = (opt: string) => {
        if (value === undefined) setLocalValue(opt);
        onChange?.(opt);
    };

    return (
        <div>
            {label && <label style={{ color: themeState.formLabelColor || themeState.darkText, fontSize: '12px', fontWeight: 700, marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: themeState.fontFamily }}>{label}</label>}
            <div className="flex p-1 bg-gray-100 w-full" style={{ borderRadius: `${themeState.borderRadius}px` }}>
                {options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => handleClick(opt)}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase transition-all rounded-md`}
                        style={{
                            backgroundColor: activeValue === opt ? (themeState.inputBg || '#FFFFFF') : 'transparent',
                            color: activeValue === opt ? (themeState.activeColor || themeState.primary) : themeState.grayText,
                            boxShadow: activeValue === opt ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            fontFamily: themeState.fontFamily
                        }}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Generic Toggle (Replaces ToggleGroup)
export const ToggleGroup = ({
    themeState,
    options = ['Off', 'On'], // [FalseLabel, TrueLabel] 
    defaultValue,
    onChange
}: {
    themeState: ThemeState,
    options?: [string, string],
    defaultValue?: string, // 'Off' or 'On' (matches options)
    onChange?: (val: string) => void
}) => {
    const [localState, setLocalState] = useState(defaultValue || options[0]);

    const toggle = () => {
        const newValue = localState === options[0] ? options[1] : options[0];
        setLocalState(newValue);
        onChange?.(newValue);
    };

    const isOn = localState === options[1];

    return (
        <button
            onClick={toggle}
            className="w-11 h-6 rounded-full p-1 transition-colors relative focus:outline-none"
            style={{ backgroundColor: isOn ? themeState.primary : '#E5E7EB' }}
        >
            <div
                className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200"
                style={{ transform: isOn ? 'translateX(20px)' : 'translateX(0)' }}
            />
        </button>
    );
};

// Keep specific showcases if needed, otherwise this generic ToggleGroup handles the "Toggle" UI pattern.
export const CheckboxGroup = ({ themeState }: { themeState: ThemeState }) => {
    return (
        <div className="space-y-3">
            {/* ... preserved dummy for showcase ... */}
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white"></div>
                <span className="text-sm font-medium" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>Default</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: themeState.primary }}>
                    <Check size={12} color={themeState.primaryBtnText} strokeWidth={3} />
                </div>
                <span className="text-sm font-medium" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>Checked</span>
            </div>
        </div>
    );
};

export const RadioGroup = ({ themeState }: { themeState: ThemeState }) => {
    return (
        <div className="space-y-3">
            {/* ... preserved dummy for showcase ... */}
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: themeState.primary }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeState.primary }}></div>
                </div>
                <span className="text-sm font-bold" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>Option 1</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white"></div>
                <span className="text-sm font-medium" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>Option 2</span>
            </div>
        </div>
    );
};
