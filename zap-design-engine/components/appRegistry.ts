
import { FileText, Layout, Database, Component, Settings, Map, Activity, Shield, Box, FileJson, Table, Palette, Code, Folder, MousePointer2, Type, MousePointerClick } from 'lucide-react';

export interface SiteNode {
  id: string;
  name: string;
  type: 'Page' | 'Component' | 'Data' | 'Utility' | 'Template';
  path: string;
  description: string;
  laymanDescription: string;
  connections: string[];
  icon?: any;
  previewImage?: string;
}

export const STATIC_SITE_NODES: SiteNode[] = [
  // --- CORE ORCHESTRATION ---
  {
    id: 'app',
    name: 'App Orchestrator',
    type: 'Page',
    path: 'App.tsx',
    description: 'The root component. Manages global state (theme, project config), navigation tabs, and history (save/undo). Acts as the central router.',
    laymanDescription: 'The "Brain" of the application. It decides which screen to show you (Builder, Preview, etc.) and remembers your changes so you can save them.',
    connections: ['setup', 'login', 'header', 'uikit', 'templates', 'docs', 'forms', 'preview', 'sitemap', 'types'],
    icon: Settings,
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'login',
    name: 'Login Screen',
    type: 'Page',
    path: 'components/LoginScreen.tsx',
    description: 'Authentication entry point. Simulates login delay and handles initial user session state.',
    laymanDescription: 'The "Front Door". A security checkpoint that simulates logging in before you can access the main builder tools.',
    connections: ['app'],
    icon: Shield,
    previewImage: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'setup',
    name: 'Setup Wizard',
    type: 'Page',
    path: 'components/SetupPage.tsx',
    description: 'Initial onboarding flow. Collects project details (Name, Industry, Country) and triggers AI generation for the initial theme.',
    laymanDescription: 'The "Welcome Screen". It asks you what kind of business you are building for and automatically picks standard colors and settings for you.',
    connections: ['app', 'standard-data'],
    icon: Activity,
    previewImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'header',
    name: 'Global Header',
    type: 'Component',
    path: 'components/Header.tsx',
    description: 'The persistent top navigation bar. Handles view mode switching (Builder/Preview), project menu actions (Save/Export), and responsiveness.',
    laymanDescription: 'The "Top Bar". It stays at the top of the screen and lets you switch modes, save your work, or export your code.',
    connections: ['app', 'uikit', 'templates'],
    icon: Layout,
    previewImage: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=800&q=80'
  },

  // --- BUILDER TOOLS ---
  {
    id: 'uikit',
    name: 'UI Kit Builder',
    type: 'Page',
    path: 'components/UiKitSection.tsx',
    description: 'Visual editor for core design tokens. Includes the Inspector panel for Colors, Typography, Buttons, and Inputs.',
    laymanDescription: 'The "Design Studio". This is where you pick your brand colors, fonts, and button shapes. It has sliders and color pickers to tweak the look and feel.',
    connections: ['icons', 'preview', 'app', 'color-presets', 'font-presets', 'theme-presets', 'button-standards'],
    icon: Box,
    previewImage: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'forms',
    name: 'Form System',
    type: 'Page',
    path: 'components/FormsSection.tsx',
    description: 'Showcase and configuration for input fields, checkboxes, dropdowns, and complex form patterns.',
    laymanDescription: 'The "Input Gallery". Shows all the different ways users can type in data (text boxes, dropdowns, date pickers) and lets you style them.',
    connections: ['app', 'uikit'],
    icon: FileText,
    previewImage: 'https://images.unsplash.com/photo-1555421689-492638eca8c3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'icons',
    name: 'Icon Library',
    type: 'Component',
    path: 'components/IconsSection.tsx',
    description: 'Manager for project icons. Supports searching the Lucide library and uploading custom SVGs.',
    laymanDescription: 'The "Sticker Book". Lets you search for little symbols (like a trash can or a user face) or upload your own to use in the buttons and menus.',
    connections: ['uikit', 'docs', 'icon-presets'],
    icon: Component,
    previewImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'templates',
    name: 'Template Builder',
    type: 'Page',
    path: 'components/TemplateSection.tsx',
    description: 'Configurator for high-level layouts. Manages specific sub-templates like "Review Page" and "Table View".',
    laymanDescription: 'The "Layout Maker". Lets you configure standard screens like "User Lists" or "Dashboards" without building them from scratch.',
    connections: ['app', 'template-review', 'template-table'],
    icon: Layout,
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'docs',
    name: 'Documentation CMS',
    type: 'Page',
    path: 'components/DocsSection.tsx',
    description: 'A block-based editor for creating style guides. Supports drag-and-drop of live components from the inspector.',
    laymanDescription: 'The "Manual Writer". A document editor where you can write guidelines and drag in "live" buttons to show developers how to use them.',
    connections: ['docs-explorer', 'docs-inspector'],
    icon: FileText,
    previewImage: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'docs-explorer',
    name: 'Docs Explorer',
    type: 'Component',
    path: 'components/DocsExplorer.tsx',
    description: 'Sidebar navigation for the documentation system. Manages the list of pages, app structure view, and "Create New Page" functionality.',
    laymanDescription: 'The "Table of Contents". It lists all your document pages, shows the app structure, and has the button to add new pages.',
    connections: ['docs'],
    icon: Folder,
    previewImage: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'docs-inspector',
    name: 'Docs Inspector',
    type: 'Component',
    path: 'components/DocsInspector.tsx',
    description: 'Draggable assets panel. Provides design tokens (colors, typography) and component showcases to be dropped into the docs editor.',
    laymanDescription: 'The "Toolbox". A side panel where you can grab colors, buttons, and icons to drop into your document.',
    connections: ['docs'],
    icon: MousePointer2,
    previewImage: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&w=800&q=80'
  },
  
  // --- SUB-TEMPLATES ---
  {
    id: 'template-review',
    name: 'Review Template',
    type: 'Template',
    path: 'components/templates/ReviewPageTemplate.tsx',
    description: 'A read-only template component displaying a multi-step review process summary.',
    laymanDescription: 'A pre-made "Summary Screen" design that shows a checklist of completed steps.',
    connections: ['templates'],
    icon: Layout,
    previewImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'template-table',
    name: 'Table Template',
    type: 'Template',
    path: 'components/templates/TableViewTemplate.tsx',
    description: 'A complex data grid component with filtering, pagination, and bulk actions.',
    laymanDescription: 'A pre-made "Spreadsheet View" for showing lists of users or products.',
    connections: ['templates'],
    icon: Table,
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },

  // --- OUTPUT & PREVIEW ---
  {
    id: 'preview',
    name: 'Live Preview Engine',
    type: 'Component',
    path: 'components/LivePreview.tsx',
    description: 'Renders the final "website" based on the current configuration state. Supports "Landing" and "Style Guide" modes.',
    laymanDescription: 'The "Simulator". It takes all your settings and builds a fake website so you can see exactly what the final result looks like.',
    connections: ['app'],
    icon: Activity,
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sitemap',
    name: 'Site Map',
    type: 'Utility',
    path: 'components/SiteMapSection.tsx',
    description: 'Visualizer for the application structure. Reads from the App Registry to display this list.',
    laymanDescription: 'The map you are looking at right now.',
    connections: ['app'],
    icon: Map,
    previewImage: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&w=800&q=80'
  },

  // --- DATA & UTILITIES ---
  {
    id: 'color-presets',
    name: 'Color Presets',
    type: 'Data',
    path: 'components/views/ColorRegistry.tsx',
    description: 'Shared dataset of brand, utility, and semantic color hex codes used by the Color Picker.',
    laymanDescription: 'The "Paint Palette". A collection of standard colors available in the color picker dropdown.',
    connections: ['uikit'],
    icon: Palette,
    previewImage: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'font-presets',
    name: 'Font Presets',
    type: 'Data',
    path: 'components/views/FontRegistry.tsx',
    description: 'Collection of popular Google Fonts used in the Typography Inspector.',
    laymanDescription: 'The "Font Book". A list of reliable fonts you can pick from quickly.',
    connections: ['uikit'],
    icon: Type,
    previewImage: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'button-standards',
    name: 'Button Standards',
    type: 'Data',
    path: 'components/views/ButtonRegistry.tsx',
    description: 'Visual registry of all supported button styles (Flat, Soft, Neo, Glow) and their states.',
    laymanDescription: 'The "Button Museum". Displays every type of button the system can create.',
    connections: ['uikit'],
    icon: MousePointerClick,
    previewImage: 'https://images.unsplash.com/photo-1616469829941-c7200ed5dabd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'icon-presets',
    name: 'Icon Presets',
    type: 'Data',
    path: 'components/views/IconRegistry.tsx',
    description: 'Curated list of top 100 Lucide icons for quick selection in the Icon Inspector.',
    laymanDescription: 'The "Icon Favorites". A list of the most common symbols like Home, User, and Search.',
    connections: ['icons'],
    icon: Component,
    previewImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'theme-presets',
    name: 'Theme Presets',
    type: 'Data',
    path: 'components/views/ThemeRegistry.tsx',
    description: 'Curated list of full color themes (brand, surface, text) for the UI Kit.',
    laymanDescription: 'The "Theme Gallery". A collection of complete look-and-feel packages.',
    connections: ['uikit'],
    icon: Palette,
    previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'standard-data',
    name: 'Standard UI Kit Data',
    type: 'Data',
    path: 'components/standardUiKit.ts',
    description: 'Static fallback dataset containing default values for the UI Kit (colors, fonts, text).',
    laymanDescription: 'The "Backup Plan". A file with default settings so the app never looks empty.',
    connections: ['setup', 'app'],
    icon: Database,
    previewImage: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'types',
    name: 'Type Definitions',
    type: 'Utility',
    path: 'types.ts',
    description: 'Central TypeScript interfaces and types shared across the entire application (ProjectConfig, ThemeState, etc).',
    laymanDescription: 'The "Dictionary". A list of all the different data shapes (like what a "User" or a "Project" looks like) so the code doesn\'t get confused.',
    connections: ['app', 'uikit', 'setup', 'templates', 'docs', 'sitemap'],
    icon: Code,
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
];
