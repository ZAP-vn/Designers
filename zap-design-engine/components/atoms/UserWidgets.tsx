import React, { useState, useRef, useEffect } from 'react';
import { ThemeState } from '../../types';
import { Loader2, LogOut, LogIn, User, ChevronDown, Check } from 'lucide-react';
import { Avatar } from '../Avatar';

export const UserSessionSelector = ({ themeState }: { themeState: ThemeState }) => {
    const [userState, setUserState] = useState<'logged-in' | 'logged-out'>('logged-in');
    const [isLoading, setIsLoading] = useState(false);
    const variant = themeState.formVariant || 'outlined';

    const handleToggle = () => {
        setIsLoading(true);
        // Simulate network request duration
        setTimeout(() => {
            setUserState(prev => prev === 'logged-in' ? 'logged-out' : 'logged-in');
            setIsLoading(false);
        }, 800);
    };

    return (
        <div>
            <label style={{ color: themeState.formLabelColor || themeState.darkText, fontSize: '12px', fontWeight: 700, marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: themeState.fontFamily }}>User Session</label>
            <div style={{ backgroundColor: variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF'), border: variant === 'underlined' ? `0px solid transparent` : `1px solid ${themeState.inputBorder || '#E5E7EB'}`, borderBottom: variant === 'underlined' ? `2px solid ${themeState.inputBorder || '#E5E7EB'}` : `1px solid ${themeState.inputBorder || '#E5E7EB'}`, borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`, overflow: 'hidden' }}>

                {isLoading ? (
                    <div className="flex items-center justify-center p-6 h-[72px] bg-white/50">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={20} className="animate-spin text-gray-400" style={{ color: themeState.primary }} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{userState === 'logged-in' ? 'Signing Out...' : 'Authenticating...'}</span>
                        </div>
                    </div>
                ) : userState === 'logged-in' ? (
                    <div className="flex items-center justify-between p-3 border-b border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-3">
                            <Avatar
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Alex"
                                size="md"
                                status="online"
                                themeState={themeState}
                            />
                            <div>
                                <div className="text-sm font-bold leading-tight" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>Alex Designer</div>
                                <div className="text-[11px] font-medium text-gray-400">Design • Admin</div>
                            </div>
                        </div>
                        <button
                            onClick={handleToggle}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors group"
                            title="Logout"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50/50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-3 opacity-70">
                            <Avatar
                                icon={User}
                                size="md"
                                status="offline"
                                themeState={themeState}
                            />
                            <div>
                                <div className="text-sm font-bold leading-tight" style={{ color: themeState.grayText, fontFamily: themeState.fontFamily }}>Guest User</div>
                                <div className="text-[11px] font-medium text-gray-400">Not logged in</div>
                            </div>
                        </div>
                        <button
                            onClick={handleToggle}
                            className="px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-95"
                            style={{ backgroundColor: themeState.primary, color: themeState.primaryBtnText }}
                        >
                            <LogIn size={14} /> Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export const ProfileSwitcher = ({ themeState }: { themeState: ThemeState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('1');
    const containerRef = useRef<HTMLDivElement>(null);
    const profiles = [
        { id: '1', name: 'Alicia Keys', email: 'alicia.keys@music.com', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: '2', name: 'Bryan Adams', email: 'bryan.adams@music.com', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: '3', name: 'Charlie Puth', email: 'charlie.puth@music.com', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: '4', name: 'Diana Ross', email: 'diana.ross@music.com', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ];
    const selectedProfile = profiles.find(p => p.id === selectedId) || profiles[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const variant = themeState.formVariant || 'outlined';
    const isActive = isOpen;
    const ringColor = (themeState.activeColor || themeState.primary);
    const borderColor = isActive ? ringColor : (variant === 'underlined' ? 'transparent' : (themeState.inputBorder || '#E5E7EB'));

    return (
        <div className="relative" ref={containerRef}>
            <label style={{ color: themeState.formLabelColor || themeState.darkText, fontSize: '12px', fontWeight: 700, marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: themeState.fontFamily }}>Profile Switcher</label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 border transition-all text-left"
                style={{
                    backgroundColor: variant === 'filled' ? (themeState.inputFilledBg || '#F3F4F6') : (themeState.inputBg || '#FFFFFF'),
                    borderColor: borderColor,
                    borderBottomColor: variant === 'underlined' ? (isActive ? ringColor : (themeState.inputBorder || '#E5E7EB')) : borderColor,
                    borderWidth: variant === 'underlined' ? '0 0 2px 0' : '1px',
                    borderRadius: variant === 'underlined' ? '0' : `${themeState.borderRadius}px`,
                    boxShadow: (isOpen && variant !== 'underlined') ? `0 0 0 ${themeState.formRingWidth || 4}px ${themeState.activeColor || themeState.primary}20` : 'none'
                }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={selectedProfile.img} alt={selectedProfile.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>{selectedProfile.name}</div>
                        <div className="text-xs text-gray-500 truncate">{selectedProfile.email}</div>
                    </div>
                </div>
                <div style={{ color: themeState.grayText }}>
                    <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={20} />
                </div>
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ borderRadius: `${themeState.borderRadius}px` }}>
                    {profiles.map(profile => (
                        <button key={profile.id} onClick={() => { setSelectedId(profile.id); setIsOpen(false); }} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors text-left group">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                                    <img src={profile.img} alt={profile.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold group-hover:text-purple-600 transition-colors truncate" style={{ color: themeState.darkText, fontFamily: themeState.fontFamily }}>{profile.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{profile.email}</div>
                                </div>
                            </div>
                            {selectedId === profile.id && (<Check size={18} style={{ color: themeState.primary }} />)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export const AvatarWidget = ({ themeState }: { themeState: ThemeState }) => {
    // Demo Interactive State
    const [status, setStatus] = useState<'online' | 'busy' | 'offline'>('online');

    const toggleStatus = () => {
        const next = status === 'online' ? 'busy' : status === 'busy' ? 'offline' : 'online';
        setStatus(next);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label style={{ color: themeState.formLabelColor || themeState.darkText, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: themeState.fontFamily }}>Avatar Group</label>
                <span className="text-[10px] text-gray-400">Interactive</span>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                {/* Standard Image Avatar */}
                <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    size="lg"
                    status={status}
                    onClick={toggleStatus}
                    themeState={themeState}
                    interactive
                />

                {/* Initials Avatar */}
                <Avatar
                    label="JD"
                    size="lg"
                    themeState={themeState}
                    interactive
                />

                {/* Icon Avatar */}
                <Avatar
                    icon={User}
                    size="lg"
                    status="busy"
                    themeState={themeState}
                    interactive
                />

                {/* Group Overlap */}
                <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                    <Avatar size="md" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" themeState={themeState} className="ring-2 ring-white" />
                    <Avatar size="md" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" themeState={themeState} className="ring-2 ring-white" />
                    <Avatar size="md" label="+3" themeState={themeState} className="ring-2 ring-white bg-gray-50" />
                </div>
            </div>
        </div>
    );
};
