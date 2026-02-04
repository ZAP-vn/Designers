import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Zap, Eye, EyeOff, Building2 } from 'lucide-react';
import { ThemeState } from '../types';
import Header from './Header';
import { loginApi } from '../services/login/login.service';
import { useStore } from '../store';

interface LoginScreenProps {
    onLogin: () => void;
    themeState: ThemeState;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, themeState }) => {
    const [merchantName, setMerchantName] = useState('pho24');
    const [userName, setUserName] = useState('admin@pho24.vn');
    const [password, setPassword] = useState('backend3.0');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { setAuthData } = useStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await loginApi.loginV4({
                UserName: userName,
                Password: password,
                MerchantName: merchantName,
                IsRemember: true
            });
            setAuthData(response);
            onLogin();
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const getFocusStyle = (id: string) => {
        const style: React.CSSProperties = {
            borderColor: '#e5e7eb',
            fontFamily: themeState.fontFamily,
        };
        if (focusedField === id) {
            style.borderColor = themeState.primary;
            style.boxShadow = `0 0 0 4px ${themeState.primary}20`;
        }
        return style;
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#F9FAFB]" style={{ fontFamily: themeState.fontFamily }}>
            <Header
                title="ZAP"
                layout="minimal"
                theme={themeState}
                showLogin={false}
                showUser={false}
                disableSticky={true}
                className="bg-transparent border-transparent"
            />

            <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 pb-20">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse" style={{ backgroundColor: `${themeState.secondary}` }}></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse delay-700" style={{ backgroundColor: '#E0E7FF' }}></div>
                </div>

                <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 relative z-10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform -rotate-3">
                            <Zap size={32} className="text-white" fill="currentColor" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to manage your design system</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] ml-1">Merchant Name</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                                    <Building2 size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={merchantName}
                                    onChange={(e) => setMerchantName(e.target.value)}
                                    placeholder="e.g. pho24"
                                    onFocus={() => setFocusedField('merchant')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-white border outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                    style={{
                                        padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`,
                                        paddingLeft: '48px',
                                        borderRadius: `${themeState.borderRadius}px`,
                                        ...getFocusStyle('merchant')
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] ml-1">Account / Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="name@company.com"
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-white border outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                    style={{
                                        padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`,
                                        paddingLeft: '48px',
                                        borderRadius: `${themeState.borderRadius}px`,
                                        ...getFocusStyle('username')
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-white border outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 pr-12"
                                    style={{
                                        padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`,
                                        paddingLeft: '48px',
                                        borderRadius: `${themeState.borderRadius}px`,
                                        ...getFocusStyle('password')
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                            style={{
                                backgroundColor: themeState.primary,
                                color: themeState.primaryBtnText,
                                borderRadius: `${themeState.borderRadius}px`,
                                padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`
                            }}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2 animate-pulse">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            By signing in, you agree to our <a href="#" className="underline hover:text-gray-900 font-medium">Terms of Service</a>
                        </p>
                    </div>

                    <div className="absolute -bottom-16 left-0 w-full text-center">
                        <p className="text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">V4.0 Authentication System</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
