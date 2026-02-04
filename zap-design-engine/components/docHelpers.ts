
import { DocBlock, ProjectConfig, ThemeState, IconEntry } from '../types';

// --- 1. OVERVIEW PAGE ---
export const getMerchantOverviewBlocks = (config: ProjectConfig, themeState: ThemeState, icons: IconEntry[]): DocBlock[] => {
    const safeTheme = themeState;

    return [
        { id: 'd1', type: 'h1', content: 'Merchant Overview' },
        { id: 'd2', type: 'paragraph', content: `Technical specification for ${config.projectName || 'the merchant application'}. Use the sidebar to navigate to specific asset registries.` },
        { id: 'div1', type: 'divider', content: '' },
        { id: 'd_live_overview', type: 'component', content: '', metadata: { subtype: 'live-overview' } },
        { id: 'div_live', type: 'divider', content: '' },
        { id: 'd3', type: 'h2', content: 'Quick Stats' },
        { id: 'p_stats', type: 'paragraph', content: `• Primary Color: ${safeTheme.primary}\n• Font Family: ${safeTheme.fontFamily}\n• Icon Count: ${icons.length}\n• Border Radius: ${safeTheme.borderRadius}px` },
        { id: 'div2', type: 'divider', content: '' },
        { id: 'd4', type: 'h2', content: 'Theme Physics' },
        { id: 'p_phys', type: 'paragraph', content: 'Global settings determining the shape and spacing of the UI.' },
        { id: 'p_phys_r', type: 'paragraph', content: `• Border Radius: ${safeTheme.borderRadius}px` },
        { id: 'p_phys_px', type: 'paragraph', content: `• Button Padding X: ${safeTheme.btnPaddingX}px` },
        { id: 'p_phys_py', type: 'paragraph', content: `• Button Padding Y: ${safeTheme.btnPaddingY}px` },
    ];
};

// --- 2. COLORS PAGE ---
export const getColorsPageBlocks = (themeState: ThemeState): DocBlock[] => [
    { id: 'c_h1', type: 'h1', content: 'Color Palette' },
    { id: 'c_p1', type: 'paragraph', content: 'The semantic color system defines the brand identity and UI state communication.' },
    { id: 'c_div1', type: 'divider', content: '' },

    // Use the full Brand Colors View component
    { id: 'c_brand_view', type: 'component', content: '', metadata: { subtype: 'brand-colors' } }
];

// --- 3. TYPOGRAPHY PAGE ---
export const getTypographyPageBlocks = (config: ProjectConfig, themeState: ThemeState): DocBlock[] => {
    return [
        { id: 't_h1', type: 'h1', content: 'Typography' },
        { id: 't_p1', type: 'paragraph', content: `Primary Typeface: ${themeState.fontFamily}` },
        { id: 't_div1', type: 'divider', content: '' },

        // Use the full Typography Section component (in read-only mode)
        { id: 't_system_view', type: 'component', content: '', metadata: { subtype: 'typography-system' } }
    ];
};

// --- 4. BUTTONS PAGE ---
export const getButtonsPageBlocks = (themeState: ThemeState): DocBlock[] => [
    { id: 'b_h1', type: 'h1', content: 'Buttons & Actions' },
    { id: 'b_p1', type: 'paragraph', content: `Standard button styles using the "${themeState.buttonStyle}" variant with ${themeState.fillMode} fill.` },
    { id: 'b_div1', type: 'divider', content: '' },

    // Use the comprehensive Button Showcase
    { id: 'b_system_view', type: 'component', content: '', metadata: { subtype: 'buttons-system' } }
];

// --- 5. ICONS PAGE ---
export const getIconsPageBlocks = (icons: IconEntry[]): DocBlock[] => [
    { id: 'i_h1', type: 'h1', content: 'Iconography' },
    { id: 'i_p1', type: 'paragraph', content: `System icons used for navigation and actions. Total count: ${icons.length}` },
    { id: 'i_div1', type: 'divider', content: '' },

    // Use the full Icons Grid View
    { id: 'i_library_view', type: 'component', content: '', metadata: { subtype: 'icons-library', icons } }
];

// --- 6. FORMS PAGE ---
export const getFormsPageBlocks = (themeState: ThemeState): DocBlock[] => [
    { id: 'f_h1', type: 'h1', content: 'Form Elements' },
    { id: 'f_p1', type: 'paragraph', content: `Standardized input components reflecting the current design tokens. Style: ${themeState.formVariant}, Label: ${themeState.formLabelStyle}` },
    { id: 'f_div1', type: 'divider', content: '' },

    { id: 'f_h2_text', type: 'h2', content: 'Text Inputs' },
    { id: 'f_std', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'text-input' } },
    { id: 'f_email', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'email-input' } },
    { id: 'f_pass', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'password-input' } },

    { id: 'f_h2_spec', type: 'h2', content: 'Specialized Inputs' },
    { id: 'f_phone', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'phone-input' } },
    { id: 'f_curr', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'currency-input' } },
    { id: 'f_step', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'stepper' } },

    { id: 'f_h2_sel', type: 'h2', content: 'Selection Controls' },
    { id: 'f_check', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'checkbox' } },
    { id: 'f_radio', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'radio' } },
    { id: 'f_toggle', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'toggle' } },
    { id: 'f_seg', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'segment' } },

    { id: 'f_h2_range', type: 'h2', content: 'Range' },
    { id: 'f_slider', type: 'component', content: '', metadata: { subtype: 'form-element', elementType: 'slider' } },
];

// --- 7. BLOCKS PAGE ---
export const getBlocksPageBlocks = (config: ProjectConfig): DocBlock[] => [
    { id: 'bl_h1', type: 'h1', content: 'Component Blocks' },
    { id: 'bl_p1', type: 'paragraph', content: 'Pre-designed high-level blocks for rapid page building.' },
    { id: 'bl_div1', type: 'divider', content: '' },

    { id: 'bl_h2_pricing', type: 'h2', content: 'Pricing Tables' },
    { id: 'bl_pricing', type: 'component', content: '', metadata: { subtype: 'block', blockType: 'pricing' } },

    { id: 'bl_div2', type: 'divider', content: '' },
    { id: 'bl_h2_stats', type: 'h2', content: 'Statistics & Metrics' },
    { id: 'bl_stats', type: 'component', content: '', metadata: { subtype: 'block', blockType: 'stats' } },

    { id: 'bl_div3', type: 'divider', content: '' },
    { id: 'bl_h2_test', type: 'h2', content: 'Testimonials' },
    { id: 'bl_testimonials', type: 'component', content: '', metadata: { subtype: 'block', blockType: 'testimonial' } },
];
