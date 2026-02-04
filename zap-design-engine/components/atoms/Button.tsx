import React from 'react';
import { ThemeState } from '../../types';
import { DevWrapper } from './DevWrapper';
import { Zap, ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    themeState: ThemeState;
    showClassNames?: boolean;
    iconLeading?: React.ElementType;
    iconTrailing?: React.ElementType;
    fillMode?: 'solid' | 'gradient'; // Optional override
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    themeState,
    showClassNames,
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    disabled,
    className,
    style,
    ...props
}) => {
    // Safety check
    if (!themeState) return null;

    const getStyle = () => {
        const isPrimary = variant === 'primary';
        const isSecondary = variant === 'secondary';

        let bg = isPrimary ? themeState.primary : isSecondary ? themeState.secondary : 'transparent';
        let color = isPrimary ? themeState.primaryBtnText : isSecondary ? themeState.secondaryBtnText : themeState.tertiaryBtnText;
        let border = variant === 'tertiary' ? `1px solid ${themeState.tertiaryBtnText}` : '1px solid transparent';
        let shadow = 'none';
        let opacity = 1;

        // Base Physics
        if (!disabled) {
            if (themeState.buttonStyle === 'soft') shadow = `0 4px 12px -2px ${bg}66`;
            if (themeState.buttonStyle === 'neo') shadow = `3px 3px 0px ${variant === 'secondary' ? themeState.primary + '99' : themeState.primary + '66'}`;
            if (themeState.buttonStyle === 'glow') shadow = `0 0 10px ${bg}80`;
        } else {
            bg = '#F3F4F6';
            color = '#9CA3AF';
            border = '1px solid transparent';
            shadow = 'none';
        }

        // Gradient Override
        if (themeState.fillMode === 'gradient' && isPrimary && !disabled) {
            bg = `linear-gradient(${themeState.gradientAngle || 135}deg, ${themeState.primary} 0%, ${themeState.secondary} 100%)`;
        }

        return {
            background: bg,
            color: color,
            border,
            borderRadius: `${themeState.borderRadius}px`,
            paddingTop: `${themeState.btnPaddingY}px`,
            paddingBottom: `${themeState.btnPaddingY}px`,
            paddingLeft: `${themeState.btnPaddingX}px`,
            paddingRight: `${themeState.btnPaddingX}px`,
            boxShadow: shadow,
            fontFamily: themeState.fontFamily,
            fontSize: '14px',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            gap: `${themeState.iconGap || 8}px`,
            // Merge custom styles
            ...style
        };
    };

    const buttonContent = (
        <button
            disabled={disabled}
            className={`
                inline-flex items-center justify-center transition-all duration-200 
                active:scale-95 disabled:active:scale-100 disabled:opacity-70
                ${className || ''}
            `}
            style={getStyle()}
            {...props}
        >
            {IconLeading && <IconLeading size={16} fill={variant === 'primary' ? 'currentColor' : 'none'} />}
            {label && <span>{label}</span>}
            {props.children}
            {IconTrailing && <IconTrailing size={16} />}
        </button>
    );

    return (
        <DevWrapper
            showClassNames={showClassNames}
            identity={{
                displayName: "Button",
                filePath: "components/atoms/Button.tsx",
                parentComponent: "UserInterface",
                type: "Atom/Token", // Level 7: Token
                description: `${variant} button`
            }}
        >
            {buttonContent}
        </DevWrapper>
    );
};
