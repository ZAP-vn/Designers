
import React, { useState, useRef, useEffect } from 'react';
import { X, Pipette } from 'lucide-react';
import { COLOR_PRESETS } from './colorPresets';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLInputElement>(null);
    const rgb = React.useMemo(() => {
        const hex = (value || '#000000').replace('#', '');
        return {
            r: parseInt(hex.substring(0, 2), 16) || 0,
            g: parseInt(hex.substring(2, 4), 16) || 0,
            b: parseInt(hex.substring(4, 6), 16) || 0
        };
    }, [value]);

    const handleRgbChange = (key: keyof typeof rgb, val: string) => {
        let num = parseInt(val);
        if (isNaN(num)) num = 0;
        if (num > 255) num = 255;

        const newRgb = { ...rgb, [key]: num };
        const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
        onChange(`#${toHex(newRgb.r)}${toHex(newRgb.g)}${toHex(newRgb.b)}`);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const safeValue = value || '#000000';

    return (
        <div className="relative group">
            <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${isOpen ? 'bg-gray-50 border-gray-300 ring-1 ring-gray-200' : 'border-transparent hover:bg-gray-50 hover:border-gray-200'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-black/10 shadow-sm relative overflow-hidden" style={{ backgroundColor: safeValue }}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-black/5 pointer-events-none"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 uppercase">{safeValue}</span>
            </div>

            {isOpen && (
                <div ref={popoverRef} className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 w-64 p-4 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                    <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: safeValue }}></div>
                            <span className="text-xs font-bold text-gray-700">{label}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={14} />
                        </button>
                    </div>

                    {/* Picker Canvas */}
                    <div
                        className="w-full h-32 rounded-lg mb-4 cursor-crosshair relative shadow-inner overflow-hidden group/picker"
                        onClick={(e) => { e.stopPropagation(); pickerRef.current?.click(); }}
                        style={{ background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #FFF, ${safeValue})` }}
                    >
                        <input
                            ref={pickerRef}
                            type="color"
                            value={safeValue}
                            onChange={(e) => onChange(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/picker:opacity-100 transition-opacity bg-black/20 text-white text-xs font-bold backdrop-blur-sm">
                            <Pipette size={16} className="mr-1" /> Pick Custom Color
                        </div>
                    </div>

                    {/* Presets - Moved up */}
                    <div className="mb-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Presets</div>
                        <div className="grid grid-cols-8 gap-2">
                            {COLOR_PRESETS.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => onChange(color)}
                                    className={`w-6 h-6 rounded-md border border-gray-200 shadow-sm hover:scale-110 transition-transform ${safeValue.toLowerCase() === color.toLowerCase() ? 'ring-2 ring-purple-500 ring-offset-1' : ''}`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Inputs - Moved down with divider */}
                    <div className="pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                                <Pipette size={12} className="text-gray-400" />
                                <input
                                    type="text"
                                    value={safeValue}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="w-full bg-transparent text-xs font-mono text-gray-700 outline-none uppercase"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {['R', 'G', 'B'].map((c) => (
                                <div key={c} className="flex-1 text-center">
                                    <input
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={rgb[c.toLowerCase() as keyof typeof rgb]}
                                        onChange={(e) => handleRgbChange(c.toLowerCase() as keyof typeof rgb, e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-md py-1 text-center text-xs font-mono outline-none focus:border-purple-500 transition-colors"
                                    />
                                    <label className="text-[9px] font-bold text-gray-400 mt-1 block">{c}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
