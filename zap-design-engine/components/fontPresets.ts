
export interface FontPreset {
    id: string;
    name: string;
    family: string;
    category: string;
    source: 'google' | 'system';
}

export const FONT_PRESETS: FontPreset[] = [
    { id: 'inter', name: 'Inter', family: 'Inter', category: 'Sans Serif', source: 'google' },
    { id: 'roboto', name: 'Roboto', family: 'Roboto', category: 'Sans Serif', source: 'google' },
    { id: 'open-sans', name: 'Open Sans', family: 'Open Sans', category: 'Sans Serif', source: 'google' },
    { id: 'lato', name: 'Lato', family: 'Lato', category: 'Sans Serif', source: 'google' },
    { id: 'montserrat', name: 'Montserrat', family: 'Montserrat', category: 'Sans Serif', source: 'google' },
    { id: 'poppins', name: 'Poppins', family: 'Poppins', category: 'Sans Serif', source: 'google' },
    { id: 'oswald', name: 'Oswald', family: 'Oswald', category: 'Display', source: 'google' },
    { id: 'raleway', name: 'Raleway', family: 'Raleway', category: 'Sans Serif', source: 'google' },
    { id: 'merriweather', name: 'Merriweather', family: 'Merriweather', category: 'Serif', source: 'google' },
    { id: 'playfair', name: 'Playfair Display', family: 'Playfair Display', category: 'Serif', source: 'google' },
    { id: 'system', name: 'System UI', family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', category: 'System', source: 'system' }
];
