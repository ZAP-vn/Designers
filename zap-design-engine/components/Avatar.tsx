
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { ThemeState } from '../types';

export interface AvatarProps {
    src?: string;
    icon?: React.ElementType;
    label?: string; // Initials
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
    status?: 'online' | 'busy' | 'away' | 'offline' | null;
    themeState: ThemeState;
    className?: string;
    onClick?: () => void;
    interactive?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    icon: Icon = User,
    label,
    alt = 'Avatar',
    size = 'md',
    shape = 'circle',
    status = null,
    themeState,
    className = '',
    onClick,
    interactive = false
}) => {
    const [imgError, setImgError] = useState(false);

    // Size Mapping
    const sizeMap = {
        sm: { box: 'w-8 h-8', icon: 14, text: 'text-[10px]', status: 'w-2 h-2' },
        md: { box: 'w-10 h-10', icon: 18, text: 'text-xs', status: 'w-2.5 h-2.5' },
        lg: { box: 'w-12 h-12', icon: 20, text: 'text-sm', status: 'w-3 h-3' },
        xl: { box: 'w-16 h-16', icon: 28, text: 'text-base', status: 'w-4 h-4' },
    };

    // Status Colors
    const statusColorMap = {
        online: 'bg-green-500',
        busy: 'bg-red-500',
        away: 'bg-yellow-500',
        offline: 'bg-gray-400'
    };

    const currentSize = sizeMap[size];
    const borderRadius = shape === 'circle' ? '50%' : `${themeState.borderRadius}px`;
    
    // Interactive Styles
    const ringStyle = interactive ? `hover:ring-2 hover:ring-offset-1 cursor-pointer transition-all duration-200` : '';
    
    return (
        <div 
            className={`relative inline-block ${className}`} 
            onClick={onClick}
        >
            <div 
                className={`${currentSize.box} flex items-center justify-center overflow-hidden bg-gray-100 border border-gray-200 ${ringStyle}`}
                style={{ 
                    borderRadius,
                    // Use theme primary for the ring color if interactive
                    ['--tw-ring-color' as any]: themeState.activeColor || themeState.primary,
                    ['--tw-ring-offset-color' as any]: themeState.background
                }}
            >
                {src && !imgError ? (
                    <img 
                        src={src} 
                        alt={alt} 
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                    />
                ) : label ? (
                    <span 
                        className={`font-bold text-gray-600 ${currentSize.text}`}
                        style={{ fontFamily: themeState.fontFamily }}
                    >
                        {label.substring(0, 2).toUpperCase()}
                    </span>
                ) : (
                    <Icon 
                        size={currentSize.icon} 
                        className="text-gray-400" 
                    />
                )}
            </div>

            {/* Status Indicator */}
            {status && (
                <div 
                    className={`absolute bottom-0 right-0 ${currentSize.status} rounded-full border-2 ${statusColorMap[status]}`}
                    style={{ borderColor: themeState.background || '#FFFFFF' }}
                />
            )}
        </div>
    );
};
