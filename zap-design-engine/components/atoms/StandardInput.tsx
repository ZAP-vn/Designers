import React, { useState, useEffect } from 'react';
import { ThemeState } from '../../types';
import { AlertCircle } from 'lucide-react';

interface StandardInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    themeState: ThemeState;
    label: string;
    icon?: React.ElementType;
    rightIcon?: React.ElementType;
    active?: boolean;
    multiline?: boolean;
    hasError?: boolean;
    errorText?: string;
    maxLength?: number;
}

export const StandardInput: React.FC<StandardInputProps> = ({ 
    themeState, 
    label, 
    icon: Icon, 
    rightIcon: RightIcon, 
    active, 
    multiline, 
    hasError, 
    errorText, 
    maxLength, 
    ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
    const effectiveValue = themeState.formSimulateData && !props.value && !props.defaultValue
        ? (props.type === 'email' ? 'john@example.com' : 'John Doe')
        : props.value;
    const [currentLength, setCurrentLength] = useState(0);
    
    useEffect(() => { 
        const val = effectiveValue || props.defaultValue || ''; 
        setHasValue(!!val); 
        setCurrentLength(String(val).length); 
    }, [effectiveValue, props.defaultValue]);
    
    const isActive = isFocused || active;
    const variant = themeState.formVariant || 'outlined';
    const labelStyle = themeState.formLabelStyle || 'top';
    const density = themeState.formDensity || 'comfortable';
    
    let paddingY = themeState.inputPaddingY || 12;
    if (density === 'compact') paddingY = 8; 
    if (density === 'spacious') paddingY = 16;
    if (labelStyle === 'floating') paddingY = Math.max(paddingY, 16);
    
    const ringColor = hasError ? (themeState.formErrorColor || '#EF4444') : (themeState.activeColor || themeState.primary);
    const borderColor = isActive || hasError ? ringColor : (variant === 'underlined' ? 'transparent' : (themeState.inputBorder || '#E5E7EB'));
    
    const baseStyle: React.CSSProperties = { 
        backgroundColor: variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF'), 
        borderColor: borderColor, 
        borderBottomColor: variant === 'underlined' ? (isActive || hasError ? ringColor : (themeState.inputBorder || '#E5E7EB')) : (isActive || hasError ? ringColor : (themeState.inputBorder || '#E5E7EB')), 
        borderWidth: variant === 'underlined' ? '0 0 2px 0' : '1px', 
        borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`, 
        paddingTop: `${paddingY}px`, 
        paddingBottom: multiline && maxLength ? `${paddingY + 20}px` : `${paddingY}px`, 
        paddingLeft: Icon ? '44px' : `${themeState.inputPaddingX || 16}px`, 
        paddingRight: RightIcon || hasError ? '44px' : `${themeState.inputPaddingX || 16}px`, 
        color: themeState.formTextColor || themeState.darkText, 
        fontSize: '14px', 
        width: '100%', 
        outline: 'none', 
        boxShadow: (isActive || hasError) && variant !== 'underlined' ? `0 0 0 ${themeState.formRingWidth || 4}px ${ringColor}20` : 'none', 
        transition: 'all 0.2s ease-in-out', 
        fontFamily: themeState.fontFamily, 
        cursor: props.readOnly ? 'pointer' : 'text', 
        minHeight: multiline ? '100px' : undefined, 
        resize: multiline ? 'vertical' : 'none' 
    };
    
    const handleChange = (e: any) => { 
        setHasValue(!!e.target.value); 
        setCurrentLength(e.target.value.length); 
        props.onChange?.(e); 
    };
    
    const renderLabel = () => { 
        if (labelStyle === 'hidden') return null; 
        
        const commonLabelStyle = { 
            color: hasError ? (themeState.formErrorColor || '#EF4444') : (themeState.formLabelColor || themeState.darkText), 
            fontSize: '12px', 
            fontWeight: 700, 
            marginBottom: '6px', 
            display: 'block', 
            textTransform: 'uppercase' as const, 
            letterSpacing: '0.05em', 
            fontFamily: themeState.fontFamily 
        }; 
        
        if (labelStyle === 'top') return <label style={commonLabelStyle}>{label}</label>; 
        
        if (labelStyle === 'left') return <label style={{ ...commonLabelStyle, marginBottom: 0, marginRight: '16px', width: '30%', textAlign: 'right', alignSelf: 'center' }}>{label}</label>; 
        
        if (labelStyle === 'floating') { 
            const isFloating = isActive || hasValue || themeState.formSimulateData; 
            return <label style={{ 
                position: 'absolute', 
                left: Icon ? '44px' : `${themeState.inputPaddingX || 16}px`, 
                top: isFloating ? '6px' : (multiline ? '16px' : '50%'), 
                transform: isFloating ? 'none' : 'translateY(-50%)', 
                fontSize: isFloating ? '10px' : '14px', 
                color: hasError ? (themeState.formErrorColor || '#EF4444') : (isFloating ? (themeState.activeColor || themeState.primary) : (themeState.formPlaceholderColor || '#9CA3AF')), 
                fontWeight: isFloating ? 700 : 400, 
                pointerEvents: 'none', 
                transition: 'all 0.2s ease-out', 
                backgroundColor: variant === 'outlined' && isFloating ? themeState.inputBg : 'transparent', 
                padding: variant === 'outlined' && isFloating ? '0 4px' : '0', 
                fontFamily: themeState.fontFamily, 
                textTransform: 'none', 
                letterSpacing: 'normal' 
            }}>{label}</label>; 
        } 
        return null; 
    };
    
    const containerStyle = labelStyle === 'left' ? { display: 'flex', alignItems: multiline ? 'flex-start' : 'center' } : { position: 'relative' as const };
    
    return (
        <div style={containerStyle}>
            {labelStyle !== 'floating' && renderLabel()}
            <div className="relative w-full">
                {Icon && (
                    <div className={`absolute left-4 pointer-events-none transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-400'} ${multiline ? 'top-4' : 'top-1/2 -translate-y-1/2'} ${hasError ? 'text-red-500' : ''}`}>
                        <Icon size={18} />
                    </div>
                )}
                
                {multiline ? (
                    <textarea 
                        {...props} 
                        value={effectiveValue} 
                        maxLength={maxLength} 
                        placeholder={labelStyle === 'floating' ? ' ' : props.placeholder} 
                        onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }} 
                        onBlur={(e) => { setIsFocused(false); setHasValue(!!e.target.value); props.onBlur?.(e); }} 
                        onChange={handleChange} 
                        style={baseStyle} 
                        className={`custom-placeholder ${labelStyle === 'floating' ? 'peer' : ''}`} 
                    />
                ) : (
                    <input 
                        {...props} 
                        value={effectiveValue} 
                        maxLength={maxLength} 
                        placeholder={labelStyle === 'floating' ? ' ' : props.placeholder} 
                        onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }} 
                        onBlur={(e) => { setIsFocused(false); setHasValue(!!e.target.value); props.onBlur?.(e); }} 
                        onChange={handleChange} 
                        style={baseStyle} 
                        className={`custom-placeholder ${labelStyle === 'floating' ? 'peer' : ''}`} 
                    />
                )}
                
                {labelStyle === 'floating' && renderLabel()}
                
                {multiline && maxLength && (
                    <div className="absolute bottom-2 right-3 text-[10px] font-medium text-gray-400 pointer-events-none bg-white/80 backdrop-blur-sm px-1 rounded">
                        {currentLength} / {maxLength}
                    </div>
                )}
                
                {hasError && !RightIcon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                        <AlertCircle size={18} />
                    </div>
                )}
                
                {RightIcon && (
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer pointer-events-none transition-colors ${hasError ? 'text-red-500' : 'text-gray-400'}`}>
                        <RightIcon size={18} />
                    </div>
                )}
            </div>
            {hasError && errorText && (
                <p className="mt-1.5 text-xs font-bold animate-in fade-in slide-in-from-top-1" style={{ color: themeState.formErrorColor || '#EF4444', fontFamily: themeState.fontFamily }}>
                    {errorText}
                </p>
            )}
        </div>
    );
};
