
import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { ThemeState } from '../types';

interface CreditCardInputProps {
    label?: string;
    value?: string;
    onChange?: (val: string) => void;
    themeState: ThemeState;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export const CreditCardInput: React.FC<CreditCardInputProps> = ({
    label,
    value = '',
    onChange,
    themeState,
    placeholder = '0000 0000 0000 0000',
    error,
    disabled = false
}) => {
    const [isFocused, setIsFocused] = useState(false);
    // Detect brand based on value (Derived state)
    const brand = React.useMemo((): CardBrand => {
        const clean = (value || '').replace(/\D/g, '');
        if (clean.match(/^4/)) return 'visa';
        if (clean.match(/^5[1-5]/)) return 'mastercard';
        if (clean.match(/^3[47]/)) return 'amex';
        if (clean.match(/^6/)) return 'discover';
        return 'unknown';
    }, [value]);

    const formatCardNumber = (val: string) => {
        const clean = val.replace(/\D/g, '');

        // Amex formatting (4-6-5)
        if (clean.match(/^3[47]/)) {
            let formatted = clean.substring(0, 4);
            if (clean.length > 4) formatted += ' ' + clean.substring(4, 10);
            if (clean.length > 10) formatted += ' ' + clean.substring(10, 15);
            return formatted;
        }

        // Standard formatting (4-4-4-4)
        return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Prevent typing non-digits (allow spaces for deletion handling, but strip them for re-format)
        if (!/^[0-9 ]*$/.test(raw)) return;

        const formatted = formatCardNumber(raw);
        // Limit length (19 chars for standard 16 digit + 3 spaces, or 17 for amex)
        if (formatted.length > 19) return;

        onChange?.(formatted);
    };

    const getBrandBadge = () => {
        const style = {
            fontFamily: themeState.fontFamily,
            fontWeight: 800,
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            transition: 'all 0.2s'
        };

        switch (brand) {
            case 'visa':
                return <div style={{ ...style, backgroundColor: '#1d4ed8', color: 'white' }}>VISA</div>;
            case 'mastercard':
                return <div style={{ ...style, backgroundColor: '#ea580c', color: 'white' }}>MC</div>;
            case 'amex':
                return <div style={{ ...style, backgroundColor: '#059669', color: 'white' }}>AMEX</div>;
            case 'discover':
                return <div style={{ ...style, backgroundColor: '#7e22ce', color: 'white' }}>DISC</div>;
            default:
                return null;
        }
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
                {/* Prefix Icon */}
                <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                    style={{ color: isFocused ? (themeState.activeColor || themeState.primary) : (themeState.formPlaceholderColor || '#9CA3AF') }}
                >
                    <CreditCard size={18} />
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 w-full bg-transparent py-3 pl-11 pr-14 text-sm outline-none font-mono"
                    style={{
                        color: themeState.formTextColor || themeState.darkText,
                        fontFamily: `monospace, ${themeState.fontFamily}` // Fallback to monospace for alignment
                    }}
                />

                {/* Brand Badge (Right) */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {getBrandBadge() || (
                        <div className="w-8 h-5 rounded bg-gray-100 border border-gray-200" />
                    )}
                </div>
            </div>

            {error && (
                <p className="mt-1.5 text-xs font-bold animate-in fade-in slide-in-from-top-1" style={{ color: themeState.formErrorColor || '#EF4444', fontFamily: themeState.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
