
import React, { useState, useEffect, useRef } from 'react';
import { ThemeState } from '../types';

interface CurrencyInputProps {
    label?: string;
    value?: string | number;
    onChange?: (val: string) => void;
    currencySymbol?: string;
    themeState: ThemeState;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
    label,
    value = '',
    onChange,
    currencySymbol = '$',
    themeState,
    placeholder = '0.00',
    error,
    disabled = false
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState('');

    // Update internal display value when prop value changes
    useEffect(() => {
        if (value === '' || value === undefined) {
            setDisplayValue('');
            return;
        }
        // If not focused, format it nicely
        if (!isFocused) {
            const num = parseFloat(String(value).replace(/,/g, ''));
            if (!isNaN(num)) {
                setDisplayValue(num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            } else {
                setDisplayValue(String(value));
            }
        } else {
            // If focused, keep it raw but maybe stringified
            setDisplayValue(String(value));
        }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        
        // Allow numbers, one decimal point, and commas (though we usually strip commas for raw storage)
        // Regex: allow digits, one dot
        if (!/^[0-9,]*\.?[0-9]*$/.test(raw)) return;

        setDisplayValue(raw);
        
        // Pass normalized value to parent (remove commas)
        const normalized = raw.replace(/,/g, '');
        onChange?.(normalized);
    };

    const handleBlur = () => {
        setIsFocused(false);
        const normalized = String(displayValue).replace(/,/g, '');
        const num = parseFloat(normalized);
        if (!isNaN(num)) {
            // Format with commas and 2 decimals
            const formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            setDisplayValue(formatted);
            // Optional: Parent might expect the formatted string or raw number. 
            // Usually inputs stick to raw value in onChange, but update visual here.
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        // Remove formatting for easier editing
        const raw = String(displayValue).replace(/,/g, '');
        setDisplayValue(raw);
    };

    // Style Logic
    const variant = themeState.formVariant || 'outlined';
    const isActive = isFocused;
    const ringColor = error ? (themeState.formErrorColor || '#EF4444') : (themeState.activeColor || themeState.primary);
    const borderColor = isActive || error
        ? ringColor
        : (variant === 'underlined' ? 'transparent' : (themeState.inputBorder || '#E5E7EB'));

    return (
        <div className="relative group">
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
                className="flex items-center transition-all duration-200 relative overflow-hidden"
                style={{
                    backgroundColor: disabled ? '#F3F4F6' : (variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF')),
                    borderColor: borderColor,
                    borderBottomColor: variant === 'underlined' 
                        ? (isActive || error ? ringColor : (themeState.inputBorder || '#E5E7EB'))
                        : borderColor,
                    borderWidth: variant === 'underlined' ? '0 0 2px 0' : '1px',
                    borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`,
                    boxShadow: (isActive && variant !== 'underlined') 
                        ? `0 0 0 ${themeState.formRingWidth || 4}px ${ringColor}20` 
                        : 'none',
                    opacity: disabled ? 0.7 : 1
                }}
            >
                {/* Prefix Symbol */}
                <div 
                    className="flex items-center justify-center pl-4 pr-2 select-none h-full"
                    style={{ color: themeState.grayText, fontFamily: themeState.fontFamily }}
                >
                    <span className="font-bold text-gray-400">{currencySymbol}</span>
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    inputMode="decimal"
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 w-full bg-transparent py-3 pr-4 text-right text-sm outline-none font-mono"
                    style={{
                        color: themeState.formTextColor || themeState.darkText,
                        fontFamily: themeState.fontFamily // Often monospace is better for numbers, but keeping theme consistency
                    }}
                />
            </div>

            {error && (
                <p className="mt-1.5 text-xs font-bold animate-in fade-in slide-in-from-top-1" style={{ color: themeState.formErrorColor || '#EF4444', fontFamily: themeState.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
