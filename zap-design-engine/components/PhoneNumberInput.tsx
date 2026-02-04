
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ThemeState } from '../types';

interface PhoneNumberInputProps {
    label?: string;
    value?: string;
    onChange?: (val: string) => void;
    defaultCountryCode?: string; // 'US', 'VN', etc.
    themeState: ThemeState;
    error?: string;
    placeholder?: string;
}

interface CountryData {
    code: string;
    name: string;
    flag: string;
    dial: string;
    format: string; // e.g., (###) ###-####
}

const COUNTRIES: CountryData[] = [
    { code: 'US', flag: '🇺🇸', dial: '+1', format: '(###) ###-####', name: 'United States' },
    { code: 'GB', flag: '🇬🇧', dial: '+44', format: '#### ######', name: 'United Kingdom' },
    { code: 'VN', flag: '🇻🇳', dial: '+84', format: '### #### ###', name: 'Vietnam' },
    { code: 'DE', flag: '🇩🇪', dial: '+49', format: '#### #######', name: 'Germany' },
    { code: 'FR', flag: '🇫🇷', dial: '+33', format: '# ## ## ## ##', name: 'France' },
    { code: 'JP', flag: '🇯🇵', dial: '+81', format: '##-####-####', name: 'Japan' },
    { code: 'AU', flag: '🇦🇺', dial: '+61', format: '#### ### ###', name: 'Australia' },
    { code: 'IN', flag: '🇮🇳', dial: '+91', format: '##### #####', name: 'India' },
];

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    label,
    value = '',
    onChange,
    defaultCountryCode = 'US',
    themeState,
    error,
    placeholder = 'Phone number'
}) => {
    const [selectedCountry, setSelectedCountry] = useState<CountryData>(
        COUNTRIES.find(c => c.code === defaultCountryCode) || COUNTRIES[0]
    );
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatNumber = (raw: string, format: string) => {
        let clean = raw.replace(/\D/g, '');
        let formatted = '';
        let cleanIdx = 0;

        for (let i = 0; i < format.length; i++) {
            if (cleanIdx >= clean.length) break;

            if (format[i] === '#') {
                formatted += clean[cleanIdx];
                cleanIdx++;
            } else {
                formatted += format[i];
            }
        }
        return formatted;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const rawNums = inputVal.replace(/\D/g, '');
        const formatted = formatNumber(rawNums, selectedCountry.format);
        onChange?.(formatted);
    };

    // Style Logic
    const variant = themeState.formVariant || 'outlined';
    const isActive = isFocused || isOpen;
    const ringColor = error ? (themeState.formErrorColor || '#EF4444') : (themeState.activeColor || themeState.primary);
    const borderColor = isActive || error
        ? ringColor
        : (variant === 'underlined' ? 'transparent' : (themeState.inputBorder || '#E5E7EB'));

    return (
        <div className="relative group" ref={containerRef}>
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
                className="flex items-center transition-all duration-200"
                style={{
                    backgroundColor: variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF'),
                    borderColor: borderColor,
                    borderBottomColor: variant === 'underlined' 
                        ? (isActive || error ? ringColor : (themeState.inputBorder || '#E5E7EB'))
                        : borderColor,
                    borderWidth: variant === 'underlined' ? '0 0 2px 0' : '1px',
                    borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`,
                    boxShadow: (isActive || error) && variant !== 'underlined' 
                        ? `0 0 0 ${themeState.formRingWidth || 4}px ${ringColor}20` 
                        : 'none',
                }}
            >
                {/* Country Selector */}
                <button
                    type="button"
                    onClick={() => { setIsOpen(!isOpen); setIsFocused(true); }}
                    className="flex items-center gap-2 pl-3 pr-2 py-3 border-r border-gray-100 hover:bg-gray-50 transition-colors rounded-l-md outline-none"
                    style={{ borderRightColor: themeState.inputBorder || '#E5E7EB' }}
                >
                    <span className="text-xl leading-none">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-600">{selectedCountry.dial}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Input Field */}
                <input
                    type="tel"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => !isOpen && setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 w-full bg-transparent px-3 py-3 text-sm outline-none"
                    style={{
                        color: themeState.formTextColor || themeState.darkText,
                        fontFamily: themeState.fontFamily
                    }}
                />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div 
                    className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto custom-scrollbar"
                    style={{ borderRadius: `${themeState.borderRadius}px` }}
                >
                    <div className="py-1">
                        {COUNTRIES.map((country) => (
                            <button
                                key={country.code}
                                onClick={() => {
                                    setSelectedCountry(country);
                                    setIsOpen(false);
                                    onChange?.(''); // Reset value on country change to prevent format conflicts
                                }}
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{country.flag}</span>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900 group-hover:text-gray-900">{country.name}</div>
                                        <div className="text-xs text-gray-500">{country.dial}</div>
                                    </div>
                                </div>
                                {selectedCountry.code === country.code && (
                                    <Check size={14} style={{ color: themeState.primary }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-1.5 text-xs font-bold animate-in fade-in slide-in-from-top-1" style={{ color: themeState.formErrorColor || '#EF4444', fontFamily: themeState.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
