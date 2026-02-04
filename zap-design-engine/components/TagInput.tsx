
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { ThemeState } from '../types';

interface TagInputProps {
    label?: string;
    tags?: string[];
    onChange?: (tags: string[]) => void;
    themeState: ThemeState;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

export const TagInput: React.FC<TagInputProps> = ({
    label,
    tags = [],
    onChange,
    themeState,
    placeholder = 'Add tag...',
    error,
    disabled = false
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange?.([...tags, trimmed]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        if (disabled) return;
        const newTags = [...tags];
        newTags.splice(index, 1);
        onChange?.(newTags);
    };

    const handleContainerClick = () => {
        if (!disabled) {
            inputRef.current?.focus();
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
                onClick={handleContainerClick}
                className="flex flex-wrap items-center gap-2 p-2 transition-all duration-200 min-h-[46px]"
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
                    opacity: disabled ? 0.7 : 1,
                    cursor: disabled ? 'not-allowed' : 'text'
                }}
            >
                {tags.map((tag, index) => (
                    <div 
                        key={`${tag}-${index}`}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold animate-in zoom-in-95 duration-200"
                        style={{
                            backgroundColor: `${themeState.activeColor || themeState.primary}15`,
                            color: themeState.activeColor || themeState.primary,
                            fontFamily: themeState.fontFamily
                        }}
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeTag(index); }}
                            className="p-0.5 hover:bg-black/5 rounded-full transition-colors focus:outline-none"
                            disabled={disabled}
                        >
                            <X size={12} strokeWidth={3} />
                        </button>
                    </div>
                ))}

                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => { setIsFocused(false); addTag(); }} // Add on blur as well
                    placeholder={tags.length === 0 ? placeholder : ''}
                    disabled={disabled}
                    className="flex-1 min-w-[80px] bg-transparent text-sm outline-none p-1"
                    style={{
                        color: themeState.formTextColor || themeState.darkText,
                        fontFamily: themeState.fontFamily
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
