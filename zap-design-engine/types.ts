
export type Tab = 'project' | 'typography' | 'ui-kit' | 'forms' | 'templates' | 'icons' | 'docs' | 'sitemap' | 'browser';

export type FontSource = 'google' | 'custom';

export interface FontFamilyEntry {
    id: string;
    name: string;
    family: string;
    category: string;
    source: FontSource;
    googleFontString?: string;
    fileType?: string;
    variants?: {
        weight: string;
        style: string;
        src: string;
    }[];
}

export interface TypographyItem {
    name: string;
    token: string;
    size: string;
    weight: string;
    sample: string;
    usage: string;
}

export interface IconEntry {
    id: string;
    name: string;
    iconName: string;
    category: string;
    type: 'lucide' | 'custom';
    svgContent?: string;
}

export interface WidgetConfig {
    userSession?: {
        enabled: boolean;
        showProfileSwitcher: boolean;
    };
    slider?: {
        showTicks: boolean;
        min: number;
        max: number;
    };
    stats?: {
        style: 'simple' | 'card' | 'trend';
    };
}

export interface FeedbackConfig {
    toasts: {
        position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center';
        duration: number;
    };
    alerts: {
        style: 'standard' | 'callout' | 'banner';
    };
    modals: {
        overlayOpacity: number;
        blur: boolean;
    };
}

export interface UiKitData {
    colors: {
        primary: string;
        primaryName: string;
        secondary: string;
        secondaryName: string;
        text: string;
        background: string;
    };
    buttons: {
        primaryLabel: string;
        secondaryLabel: string;
        neutralLabel: string;
    };
    card: {
        title: string;
        subtitle: string;
        priceLabel: string;
        priceValue: number;
        details: string;
        actionPrimary: string;
        actionSecondary: string;
        tag: string;
    };
    chat: {
        userMessage: string;
        agentMessage: string;
        inputPlaceholder: string;
    };
    faqs: {
        question: string;
        answer: string;
    }[];
    services: string[];
    categories: string[];
    notifications: {
        success: string;
        error: string;
    };
    widgets?: WidgetConfig;
    feedback?: FeedbackConfig;
    typography: {
        fontFamily: string;
        items: TypographyItem[];
    };
    icons?: IconEntry[];
    pricing?: {
        title: string;
        price: string;
        period: string;
        features: string[];
        buttonLabel: string;
        isPopular: boolean;
    }[];
    stats?: {
        label: string;
        value: string;
    }[];
    testimonials?: {
        quote: string;
        author: string;
        role: string;
    }[];
}

export type HeaderLayout = 'minimal' | 'centered' | 'search' | 'user';

export interface ReviewStep {
    id: string;
    title: string;
    description: string;
}

export interface TemplateConfig {
    navbar?: {
        title?: string;
        actionLabel?: string;
        layout?: HeaderLayout;
        showSearch?: boolean;
        showNotifications?: boolean;
        showLanguage?: boolean;
        showLogin?: boolean;
        showUser?: boolean;
        showAction?: boolean;
        showBack?: boolean;
        showProgress?: boolean;
        processName?: string;
        currentStep?: number;
        totalSteps?: number;
    };
    sidebar?: {
        brand?: string;
    };
    pageHeader?: {
        align?: 'left' | 'center' | 'right';
        title?: string;
        subtitle?: string;
        titleSize?: string;
        subtitleSize?: string;
        showSearch?: boolean;
        showFilters?: boolean;
        showAction?: boolean;
    };
    reviewPage?: {
        title?: string;
        notificationText?: string;
        steps?: ReviewStep[];
    };
    tableView?: {
        dataSource?: 'Promotions' | 'Staff List' | 'Customers';
        showPagination?: boolean;
        showHeader?: boolean;
        showCheckboxes?: boolean;
    };
    footer?: {
        brand?: string;
        copyright?: string;
    };
}

export interface CustomerDetailResponse {
    MerchantName: string;
    BusinessName: string;
    BussinessTypeId: number;
    Country: number;
    CurrencyId: string;
    CurrencyNativeName: string;
    CurrencySymbol: string;
    CustomerCode: string;
    CustomerId: number;
    CustomerStatusId: number;
    Email: string;
    EmpGuid: string;
    FirstName: string;
    InterestGrade: string;
    LanguageId: string;
    LastName: string;
    NotificationId: number;
    PassCode: string;
    Password: string;
    Phone: string;
    Plural: string;
    Point: string;
    ReferenceId: string;
    Singular: string;
    StartedDate: string;
    TimeZoneDisplayName: string;
    TimeZoneId: string;
    Url: string;
    Visible: number;
    Websites: string;
    BatchCode: string;
    PublicKey: string;
    _id: string;
    _key: number;
    _rev: string;
    CreateDate: string;
    UpdateDate: string;
    Version: string;
}

export interface CustomerListEntry {
    _id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    CustomerStatusId: number;
    InterestGrade: string;
    CreateDate: string;
    CustomerCode: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ProjectConfig {
    merchantName: string;
    projectName: string;
    version?: string;
    businessType: string;
    timezone: string;
    language: string;
    country: string;
    dateFormat: string;
    timeFormat: string;
    assets?: {
        fonts: FontFamilyEntry[];
    };
    logo?: {
        url: string;
        description?: string;
    };
    generatedContent?: UiKitData;
    templateConfig?: TemplateConfig;
}

export interface ThemeState {
    primary: string;
    secondary: string;
    lightText: string;
    darkText: string;
    grayText: string;
    background: string;
    background2: string;
    background3: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    tertiaryBtnText: string;
    fontFamily: string;
    secondaryFontFamily?: string; // Added field
    borderRadius: number;
    btnPaddingX: number;
    btnPaddingY: number;
    buttonStyle: 'flat' | 'soft' | 'neo' | 'glow';
    fillMode: 'solid' | 'gradient';
    gradientAngle?: number;
    depth?: number;
    iconGap?: number;
    buttonHoverOpacity?: number;

    // Form System
    inputBg?: string;
    inputFilledBg?: string;
    inputBorder?: string;
    inputPaddingX?: number;
    inputPaddingY?: number;
    activeColor?: string;
    hoverOpacity?: number;

    formLabelStyle?: 'top' | 'left' | 'floating' | 'hidden';
    formVariant?: 'outlined' | 'filled' | 'underlined';
    formDensity?: 'comfortable' | 'compact' | 'spacious';
    formPlaceholderColor?: string;
    formTextColor?: string;
    formLabelColor?: string;
    formErrorColor?: string;
    formRingWidth?: number;
    formSimulateData?: boolean;

    // Layout Physics
    layoutGap?: number;
    sectionPadding?: number;
}

export type DocBlockType = 'h1' | 'h2' | 'paragraph' | 'divider' | 'color' | 'typography' | 'button' | 'component' | 'icon';

export interface DocBlock {
    id: string;
    type: DocBlockType;
    content: string;
    metadata?: any;
}

export interface DocPage {
    id: string;
    title: string;
    lastModified: number;
    blocks: DocBlock[];
}

export interface ProjectFile {
    id: string;
    name: string;
    timestamp: string;
    config: ProjectConfig;
    theme: ThemeState;
    docs?: DocPage[]; // Persist docs in history
    importedAt?: string;
}
