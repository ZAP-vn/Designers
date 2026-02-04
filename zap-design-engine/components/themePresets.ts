
import { ThemeState } from '../types';

export interface ThemePreset {
    id: string;
    name: string;
    description: string;
    colors: Partial<ThemeState>;
}

export const THEME_PRESETS: ThemePreset[] = [
    {
        id: 'orbit-default',
        name: 'Orbit Default',
        description: 'The standard violet and white brand identity.',
        colors: {
            primary: '#7E22CE',
            secondary: '#F3E8FF',
            background: '#FFFFFF',
            background2: '#F9FAFB',
            background3: '#F3F4F6',
            darkText: '#1C1C1E',
            grayText: '#8E8E93',
            lightText: '#FFFFFF',
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#1C1C1E',
            tertiaryBtnText: '#7E22CE',
            inputBg: '#FFFFFF',
            inputBorder: '#E5E7EB',
            activeColor: '#7E22CE',
            formErrorColor: '#EF4444'
        }
    },
    {
        id: 'midnight-pro',
        name: 'Midnight Pro',
        description: 'High contrast dark mode for professional tools.',
        colors: {
            primary: '#6366F1', // Indigo
            secondary: '#1E1B4B', // Deep Indigo
            background: '#0F172A', // Slate 900
            background2: '#1E293B', // Slate 800
            background3: '#334155', // Slate 700
            darkText: '#F8FAFC', // Slate 50
            grayText: '#94A3B8', // Slate 400
            lightText: '#0F172A', // Slate 900 (for inverse)
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#F8FAFC',
            tertiaryBtnText: '#818CF8',
            inputBg: '#1E293B',
            inputBorder: '#334155',
            activeColor: '#6366F1',
            formErrorColor: '#F87171'
        }
    },
    {
        id: 'emerald-city',
        name: 'Emerald City',
        description: 'Fresh, nature-inspired green tones.',
        colors: {
            primary: '#059669', // Emerald 600
            secondary: '#D1FAE5', // Emerald 100
            background: '#FFFFFF',
            background2: '#F0FDF4',
            background3: '#DCFCE7',
            darkText: '#064E3B',
            grayText: '#64748B',
            lightText: '#FFFFFF',
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#064E3B',
            tertiaryBtnText: '#059669',
            inputBg: '#FFFFFF',
            inputBorder: '#A7F3D0',
            activeColor: '#059669',
            formErrorColor: '#EF4444'
        }
    },
    {
        id: 'corporate-blue',
        name: 'Corporate Blue',
        description: 'Trustworthy and professional blue palette.',
        colors: {
            primary: '#2563EB', // Blue 600
            secondary: '#DBEAFE', // Blue 100
            background: '#FFFFFF',
            background2: '#F8FAFC',
            background3: '#F1F5F9',
            darkText: '#1E293B',
            grayText: '#64748B',
            lightText: '#FFFFFF',
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#1E293B',
            tertiaryBtnText: '#2563EB',
            inputBg: '#FFFFFF',
            inputBorder: '#CBD5E1',
            activeColor: '#2563EB',
            formErrorColor: '#EF4444'
        }
    },
    {
        id: 'sunset-orange',
        name: 'Sunset Orange',
        description: 'Warm, energetic gradient vibes.',
        colors: {
            primary: '#EA580C', // Orange 600
            secondary: '#FFEDD5', // Orange 100
            background: '#FFF7ED', // Orange 50
            background2: '#FFFFFF',
            background3: '#FDBA74',
            darkText: '#431407',
            grayText: '#9A3412',
            lightText: '#FFFFFF',
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#431407',
            tertiaryBtnText: '#EA580C',
            inputBg: '#FFFFFF',
            inputBorder: '#FED7AA',
            activeColor: '#EA580C',
            formErrorColor: '#EF4444'
        }
    },
    {
        id: 'slate-minimal',
        name: 'Slate Minimal',
        description: 'Clean monochrome for content-heavy apps.',
        colors: {
            primary: '#0F172A', // Slate 900
            secondary: '#F1F5F9', // Slate 100
            background: '#FFFFFF',
            background2: '#FAFAFA',
            background3: '#F4F4F5',
            darkText: '#18181B',
            grayText: '#71717A',
            lightText: '#FFFFFF',
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#18181B',
            tertiaryBtnText: '#52525B',
            inputBg: '#FFFFFF',
            inputBorder: '#E4E4E7',
            activeColor: '#0F172A',
            formErrorColor: '#EF4444'
        }
    },
    {
        id: 'rose-gold',
        name: 'Rose Gold',
        description: 'Elegant pinks and warm grays.',
        colors: {
            primary: '#BE185D', // Pink 700
            secondary: '#FCE7F3', // Pink 100
            background: '#FFF1F2', // Rose 50
            background2: '#FFFFFF',
            background3: '#FFE4E6',
            darkText: '#881337',
            grayText: '#9F1239',
            lightText: '#FFFFFF',
            primaryBtnText: '#FFFFFF',
            secondaryBtnText: '#881337',
            tertiaryBtnText: '#BE185D',
            inputBg: '#FFFFFF',
            inputBorder: '#FECDD3',
            activeColor: '#BE185D',
            formErrorColor: '#F43F5E'
        }
    },
    {
        id: 'cyber-neon',
        name: 'Cyber Neon',
        description: 'Electric colors on dark backgrounds.',
        colors: {
            primary: '#D946EF', // Fuchsia 500
            secondary: '#2E1065', // Violet 950
            background: '#020617', // Slate 950
            background2: '#1E1B4B', // Indigo 950
            background3: '#4C1D95', // Violet 900
            darkText: '#E879F9', // Fuchsia 400
            grayText: '#A78BFA', // Violet 400
            lightText: '#020617',
            primaryBtnText: '#020617',
            secondaryBtnText: '#E879F9',
            tertiaryBtnText: '#D946EF',
            inputBg: '#020617',
            inputBorder: '#D946EF',
            activeColor: '#D946EF',
            formErrorColor: '#FF0055'
        }
    }
];
