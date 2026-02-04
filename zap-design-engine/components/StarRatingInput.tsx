
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { ThemeState } from '../types';

interface StarRatingInputProps {
    label?: string;
    value?: number;
    max?: number;
    onChange?: (value: number) => void;
    themeState: ThemeState;
    readOnly?: boolean;
    size?: number;
    showValueLabel?: boolean;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
    label,
    value = 0,
    max = 5,
    onChange,
    themeState,
    readOnly = false,
    size = 20,
    showValueLabel = false
}) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    // If interactable and hovering, show hoverValue, else show actual value
    const displayValue = (hoverValue !== null && !readOnly) ? hoverValue : value;

    const handleStarClick = (rating: number) => {
        if (!readOnly && onChange) {
            onChange(rating);
        }
    };

    return (
        <div className="flex flex-col">
            {label && (
                <div className="flex justify-between items-end mb-1.5">
                    <label style={{
                        color: themeState.formLabelColor || themeState.darkText,
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'block',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: themeState.fontFamily
                    }}>
                        {label}
                    </label>
                    {showValueLabel && (
                        <span className="text-xs font-bold" style={{ color: themeState.primary }}>
                            {displayValue} / {max}
                        </span>
                    )}
                </div>
            )}

            <div 
                className="flex items-center gap-1"
                onMouseLeave={() => !readOnly && setHoverValue(null)}
            >
                {[...Array(max)].map((_, index) => {
                    const rating = index + 1;
                    const isFilled = rating <= displayValue;
                    
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleStarClick(rating)}
                            onMouseEnter={() => !readOnly && setHoverValue(rating)}
                            disabled={readOnly}
                            className={`transition-transform duration-200 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
                            style={{ outline: 'none' }}
                            aria-label={`Rate ${rating} stars`}
                        >
                            <Star
                                size={size}
                                fill={isFilled ? (themeState.activeColor || themeState.primary) : 'transparent'}
                                color={isFilled ? (themeState.activeColor || themeState.primary) : (themeState.inputBorder || '#D1D5DB')}
                                strokeWidth={isFilled ? 0 : 2}
                                className="transition-colors duration-200"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
