
import React, { useRef, useEffect } from 'react';
import { ThemeState } from '../types';

interface OTPInputProps {
    length?: number;
    value?: string;
    onChange?: (val: string) => void;
    themeState: ThemeState;
    error?: string;
    disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    value = "",
    onChange,
    themeState,
    error,
    disabled = false
}) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current = inputsRef.current.slice(0, length);
    }, [length]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        if (disabled) return;
        
        const val = e.target.value;
        
        // Handle mostly for the last digit or overwrite
        const lastChar = val.slice(-1); 
        
        if (!/^\d*$/.test(lastChar)) return;

        const newValueArr = value.split('');
        // Ensure array is correct length
        while (newValueArr.length < length) newValueArr.push('');
        
        newValueArr[idx] = lastChar;
        
        const newValueString = newValueArr.join('').slice(0, length);
        onChange?.(newValueString);

        // Move to next input if we typed a digit
        if (lastChar && idx < length - 1) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (disabled) return;

        if (e.key === 'Backspace') {
            if (!value[idx] && idx > 0) {
                // If empty and backspace, delete previous and move focus
                const newValueArr = value.split('');
                newValueArr[idx - 1] = '';
                onChange?.(newValueArr.join(''));
                inputsRef.current[idx - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && idx > 0) {
            e.preventDefault();
            inputsRef.current[idx - 1]?.focus();
        } else if (e.key === 'ArrowRight' && idx < length - 1) {
            e.preventDefault();
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length).replace(/\D/g, '');
        if (pastedData) {
            onChange?.(pastedData);
            // Focus the last input filled or the next empty one
            const nextFocusIndex = Math.min(pastedData.length, length - 1);
            inputsRef.current[nextFocusIndex]?.focus();
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    // Style Logic
    const variant = themeState.formVariant || 'outlined';
    const ringColor = error ? (themeState.formErrorColor || '#EF4444') : (themeState.activeColor || themeState.primary);
    const borderColor = error ? ringColor : (variant === 'underlined' ? 'transparent' : (themeState.inputBorder || '#E5E7EB'));

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex gap-2">
                {[...Array(length)].map((_, idx) => (
                    <input
                        key={idx}
                        ref={(el) => { inputsRef.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value[idx] || ''}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        onPaste={handlePaste}
                        onFocus={handleFocus}
                        disabled={disabled}
                        className={`
                            w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border outline-none transition-all
                            focus:ring-4
                        `}
                        style={{
                            backgroundColor: disabled ? '#F3F4F6' : (variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF')),
                            borderColor: borderColor,
                            borderBottomColor: variant === 'underlined' 
                                ? (themeState.inputBorder || '#E5E7EB')
                                : borderColor,
                            borderWidth: variant === 'underlined' ? '0 0 2px 0' : '1px',
                            borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`,
                            color: themeState.formTextColor || themeState.darkText,
                            fontFamily: themeState.fontFamily,
                            boxShadow: 'none' // Reset
                        }}
                    />
                ))}
            </div>
            
            {/* Inject dynamic focus styles for this component instance */}
            <style>{`
                input:focus {
                    ${variant === 'underlined' 
                        ? `border-bottom-color: ${ringColor} !important;` 
                        : `border-color: ${ringColor} !important; box-shadow: 0 0 0 ${themeState.formRingWidth || 4}px ${ringColor}20 !important;`
                    }
                    z-index: 10;
                }
            `}</style>

            {error && (
                <p className="mt-1.5 text-xs font-bold animate-in fade-in slide-in-from-top-1" style={{ color: themeState.formErrorColor || '#EF4444', fontFamily: themeState.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
