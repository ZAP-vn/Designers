
import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ThemeState } from '../types';

interface DateRangePickerProps {
    label?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    onChange?: (start: Date | null, end: Date | null) => void;
    themeState: ThemeState;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    label,
    startDate,
    endDate,
    onChange,
    themeState,
    placeholder = 'Select date range',
    error,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync view date if start date changes and is valid
    useEffect(() => {
        if (startDate && !isOpen) {
            setViewDate(new Date(startDate));
        }
    }, [startDate, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleDayClick = (day: number) => {
        const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        
        if (!startDate || (startDate && endDate)) {
            // Start new selection
            onChange?.(clickedDate, null);
        } else {
            // Complete selection
            if (clickedDate < startDate) {
                // Clicked before start, make it new start
                onChange?.(clickedDate, null);
            } else {
                onChange?.(startDate, clickedDate);
                setIsOpen(false);
            }
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(null, null);
    };

    // Calendar logic
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate);
        newDate.setMonth(viewDate.getMonth() + offset);
        setViewDate(newDate);
    };

    const isInRange = (day: number) => {
        if (!startDate || !endDate) return false;
        const d = new Date(currentYear, currentMonth, day);
        return d > startDate && d < endDate;
    };

    const isPreviewRange = (day: number) => {
        if (!startDate || endDate || !hoverDate) return false;
        const d = new Date(currentYear, currentMonth, day);
        return (d > startDate && d <= hoverDate) || (d < startDate && d >= hoverDate);
    };

    const getDayStyle = (day: number) => {
        const d = new Date(currentYear, currentMonth, day);
        
        // Normalize time for comparison
        d.setHours(0,0,0,0);
        const start = startDate ? new Date(startDate) : null;
        if(start) start.setHours(0,0,0,0);
        const end = endDate ? new Date(endDate) : null;
        if(end) end.setHours(0,0,0,0);

        const isStart = start && d.getTime() === start.getTime();
        const isEnd = end && d.getTime() === end.getTime();
        
        if (isStart || isEnd) {
            return {
                backgroundColor: themeState.primary,
                color: themeState.primaryBtnText,
                borderRadius: `${themeState.borderRadius}px` // Or '50%' for purely round
            };
        }

        // Ranges
        if (isInRange(day)) {
            return {
                backgroundColor: `${themeState.primary}20`, // 20% opacity
                color: themeState.darkText,
                borderRadius: '0'
            };
        }

        // Preview hover range
        if (isPreviewRange(day)) {
             return {
                backgroundColor: `${themeState.primary}10`, // 10% opacity
                color: themeState.darkText,
                borderRadius: '0',
                border: `1px dashed ${themeState.primary}40`
            };
        }

        return {};
    };

    // Style Logic
    const variant = themeState.formVariant || 'outlined';
    const isActive = isOpen;
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
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className="flex items-center transition-all duration-200 cursor-pointer"
                style={{
                    backgroundColor: disabled ? '#F3F4F6' : (variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF')),
                    borderColor: borderColor,
                    borderBottomColor: variant === 'underlined' 
                        ? (isActive || error ? ringColor : (themeState.inputBorder || '#E5E7EB'))
                        : borderColor,
                    borderWidth: variant === 'underlined' ? '0 0 2px 0' : '1px',
                    borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`,
                    boxShadow: (isActive) && variant !== 'underlined' 
                        ? `0 0 0 ${themeState.formRingWidth || 4}px ${ringColor}20` 
                        : 'none',
                    opacity: disabled ? 0.7 : 1,
                    paddingTop: `${themeState.inputPaddingY || 12}px`,
                    paddingBottom: `${themeState.inputPaddingY || 12}px`,
                    paddingLeft: '44px', // Space for icon
                    paddingRight: (startDate || endDate) ? '40px' : `${themeState.inputPaddingX || 16}px`
                }}
            >
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${isOpen ? 'text-indigo-500' : 'text-gray-400'}`} style={{ color: isOpen ? (themeState.activeColor || themeState.primary) : undefined }}>
                    <CalendarIcon size={18} />
                </div>

                <div className="flex-1 text-sm truncate select-none" style={{ fontFamily: themeState.fontFamily, color: (startDate || endDate) ? (themeState.formTextColor || themeState.darkText) : (themeState.formPlaceholderColor || '#9CA3AF') }}>
                    {startDate ? formatDate(startDate) : placeholder}
                    {startDate && ' - '}
                    {endDate ? formatDate(endDate) : (startDate ? '...' : '')}
                </div>

                {(startDate || endDate) && !disabled && (
                    <button 
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Dropdown Calendar */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full min-w-[280px] mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={(e) => { e.stopPropagation(); changeMonth(-1); }} className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><ChevronLeft size={16}/></button>
                        <span className="font-bold text-sm text-gray-900">{monthNames[currentMonth]} {currentYear}</span>
                        <button onClick={(e) => { e.stopPropagation(); changeMonth(1); }} className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><ChevronRight size={16}/></button>
                    </div>
                    
                    <div className="grid grid-cols-7 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1" onMouseLeave={() => setHoverDate(null)}>
                        {[...Array(firstDayOfWeek)].map((_, i) => <div key={`empty-${i}`} />)}
                        {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const style = getDayStyle(day);
                            return (
                                <button 
                                    key={day} 
                                    onClick={(e) => { e.stopPropagation(); handleDayClick(day); }}
                                    onMouseEnter={() => setHoverDate(new Date(currentYear, currentMonth, day))}
                                    className={`h-8 w-full flex items-center justify-center text-xs transition-all hover:bg-gray-100 rounded-md`}
                                    style={style}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-[10px] text-gray-400">
                            {startDate ? (endDate ? `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days` : 'Select end date') : 'Select start date'}
                        </span>
                        {(startDate || endDate) && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); onChange?.(null, null); }}
                                className="text-[10px] font-bold text-red-500 hover:text-red-600"
                            >
                                Reset
                            </button>
                        )}
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
