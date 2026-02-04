
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ThemeState } from '../types';

interface ImageUploadDropzoneProps {
    label?: string;
    files?: File[];
    onFilesChange?: (files: File[]) => void;
    multiple?: boolean;
    accept?: string;
    themeState: ThemeState;
    maxSizeInMB?: number;
    error?: string;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
    label,
    files = [],
    onFilesChange,
    multiple = true,
    accept = "image/*",
    themeState,
    maxSizeInMB = 5,
    error
}) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Create object URLs for previews
    useEffect(() => {
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);

        // Cleanup URLs to avoid memory leaks
        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
        // Reset input so selecting same file works again if needed
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleFiles = (newFiles: File[]) => {
        // Filter by accept type if needed (simple check)
        const validFiles = newFiles.filter(file => {
            // Check size
            if (file.size > maxSizeInMB * 1024 * 1024) return false;
            // Check type (rudimentary)
            if (accept !== '*' && !file.type.match(accept.replace('*', '.*'))) return false;
            return true;
        });

        if (multiple) {
            onFilesChange?.([...files, ...validFiles]);
        } else {
            onFilesChange?.([validFiles[0]]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        onFilesChange?.(newFiles);
    };

    const triggerInput = () => {
        inputRef.current?.click();
    };

    // Style Logic
    const variant = themeState.formVariant || 'outlined';
    // For dropzone, we mainly want to check filled background. Underlined doesn't map well to a box, so we default to standard border.
    
    return (
        <div className="w-full">
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
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerInput}
                className={`
                    relative w-full transition-all duration-200 cursor-pointer overflow-hidden
                    flex flex-col items-center justify-center text-center p-6
                    border-2 border-dashed
                `}
                style={{
                    backgroundColor: isDragActive 
                        ? `${themeState.primary}10` 
                        : (variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF')),
                    borderColor: isDragActive 
                        ? (themeState.activeColor || themeState.primary) 
                        : (error ? (themeState.formErrorColor || '#EF4444') : (themeState.inputBorder || '#E5E7EB')),
                    borderRadius: `${themeState.borderRadius}px`,
                    minHeight: files.length > 0 ? 'auto' : '160px'
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                />

                {files.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 pointer-events-none">
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ 
                                backgroundColor: isDragActive ? themeState.primary : '#F3F4F6',
                                color: isDragActive ? themeState.primaryBtnText : '#9CA3AF'
                            }}
                        >
                            <UploadCloud size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>
                                {isDragActive ? "Drop files here" : "Click to upload"}
                            </p>
                            <p className="text-xs mt-1" style={{ color: themeState.grayText, fontFamily: themeState.fontFamily }}>
                                or drag and drop SVG, PNG, JPG (max {maxSizeInMB}MB)
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        {/* Compact add button if files exist */}
                        <div className="flex items-center justify-between mb-4 pointer-events-none">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{files.length} file{files.length !== 1 ? 's' : ''} selected</span>
                            <button 
                                className="pointer-events-auto text-xs font-bold hover:underline"
                                style={{ color: themeState.primary }}
                            >
                                + Add more
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" onClick={(e) => e.stopPropagation()}>
                            {files.map((file, idx) => (
                                <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                    {file.type.startsWith('image/') ? (
                                        <img 
                                            src={previews[idx]} 
                                            alt={file.name} 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                                            <ImageIcon size={20} className="text-gray-400 mb-1" />
                                            <span className="text-[9px] text-gray-500 break-all line-clamp-2">{file.name}</span>
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => removeFile(idx)}
                                            className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                                            title="Remove file"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1.5 text-xs font-bold animate-in fade-in slide-in-from-top-1" style={{ color: themeState.formErrorColor || '#EF4444', fontFamily: themeState.fontFamily }}>
                    {error}
                </p>
            )}
        </div>
    );
};
