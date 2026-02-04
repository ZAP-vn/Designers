
export interface IconPreset {
    id: string;
    name: string;
    iconName: string;
    category: string;
    tags: string[];
}

export const ICON_PRESETS: IconPreset[] = [
    // Navigation & UI
    { id: 'menu', name: 'Menu', iconName: 'Menu', category: 'Navigation', tags: ['hamburger', 'list', 'nav'] },
    { id: 'home', name: 'Home', iconName: 'Home', category: 'Navigation', tags: ['house', 'dashboard'] },
    { id: 'search', name: 'Search', iconName: 'Search', category: 'Navigation', tags: ['find', 'magnifier'] },
    { id: 'user', name: 'User', iconName: 'User', category: 'Navigation', tags: ['profile', 'account', 'person'] },
    { id: 'settings', name: 'Settings', iconName: 'Settings', category: 'Navigation', tags: ['gear', 'config', 'preferences'] },
    { id: 'chevron-down', name: 'Chevron Down', iconName: 'ChevronDown', category: 'Arrows', tags: ['arrow', 'drop'] },
    { id: 'chevron-right', name: 'Chevron Right', iconName: 'ChevronRight', category: 'Arrows', tags: ['arrow', 'next'] },
    { id: 'chevron-left', name: 'Chevron Left', iconName: 'ChevronLeft', category: 'Arrows', tags: ['arrow', 'back'] },
    { id: 'chevron-up', name: 'Chevron Up', iconName: 'ChevronUp', category: 'Arrows', tags: ['arrow', 'top'] },
    { id: 'arrow-right', name: 'Arrow Right', iconName: 'ArrowRight', category: 'Arrows', tags: ['direction', 'next'] },
    { id: 'arrow-left', name: 'Arrow Left', iconName: 'ArrowLeft', category: 'Arrows', tags: ['direction', 'back'] },
    { id: 'x', name: 'Close', iconName: 'X', category: 'UI Actions', tags: ['cancel', 'remove', 'delete'] },
    { id: 'check', name: 'Check', iconName: 'Check', category: 'UI Actions', tags: ['success', 'done', 'tick'] },
    { id: 'plus', name: 'Plus', iconName: 'Plus', category: 'UI Actions', tags: ['add', 'create', 'new'] },
    { id: 'trash-2', name: 'Trash', iconName: 'Trash2', category: 'UI Actions', tags: ['delete', 'remove', 'bin'] },
    { id: 'edit-2', name: 'Edit', iconName: 'Edit2', category: 'UI Actions', tags: ['pencil', 'change', 'modify'] },
    { id: 'more-vertical', name: 'More', iconName: 'MoreVertical', category: 'UI Actions', tags: ['dots', 'menu', 'options'] },
    { id: 'filter', name: 'Filter', iconName: 'Filter', category: 'UI Actions', tags: ['sort', 'refine'] },
    { id: 'download', name: 'Download', iconName: 'Download', category: 'UI Actions', tags: ['save', 'export'] },
    { id: 'upload', name: 'Upload', iconName: 'Upload', category: 'UI Actions', tags: ['import', 'cloud'] },
    { id: 'share-2', name: 'Share', iconName: 'Share2', category: 'UI Actions', tags: ['social', 'send'] },
    { id: 'external-link', name: 'External Link', iconName: 'ExternalLink', category: 'UI Actions', tags: ['open', 'new tab'] },
    
    // Commerce & Finance
    { id: 'shopping-cart', name: 'Cart', iconName: 'ShoppingCart', category: 'Commerce', tags: ['buy', 'store'] },
    { id: 'credit-card', name: 'Credit Card', iconName: 'CreditCard', category: 'Commerce', tags: ['payment', 'money'] },
    { id: 'dollar-sign', name: 'Dollar', iconName: 'DollarSign', category: 'Commerce', tags: ['price', 'money', 'cost'] },
    { id: 'shopping-bag', name: 'Bag', iconName: 'ShoppingBag', category: 'Commerce', tags: ['store', 'purchase'] },
    { id: 'tag', name: 'Tag', iconName: 'Tag', category: 'Commerce', tags: ['label', 'category', 'price'] },
    { id: 'percent', name: 'Percent', iconName: 'Percent', category: 'Commerce', tags: ['discount', 'sale'] },
    { id: 'gift', name: 'Gift', iconName: 'Gift', category: 'Commerce', tags: ['present', 'reward'] },
    { id: 'package', name: 'Package', iconName: 'Package', category: 'Commerce', tags: ['box', 'shipping'] },
    { id: 'truck', name: 'Truck', iconName: 'Truck', category: 'Commerce', tags: ['shipping', 'delivery'] },
    
    // Communication
    { id: 'mail', name: 'Mail', iconName: 'Mail', category: 'Communication', tags: ['email', 'inbox', 'message'] },
    { id: 'message-square', name: 'Message', iconName: 'MessageSquare', category: 'Communication', tags: ['chat', 'comment'] },
    { id: 'phone', name: 'Phone', iconName: 'Phone', category: 'Communication', tags: ['call', 'contact'] },
    { id: 'bell', name: 'Bell', iconName: 'Bell', category: 'Communication', tags: ['notification', 'alert'] },
    { id: 'calendar', name: 'Calendar', iconName: 'Calendar', category: 'Communication', tags: ['date', 'schedule'] },
    { id: 'clock', name: 'Clock', iconName: 'Clock', category: 'Communication', tags: ['time', 'schedule'] },
    
    // Analytics & Data
    { id: 'bar-chart-2', name: 'Bar Chart', iconName: 'BarChart2', category: 'Data', tags: ['stats', 'analytics'] },
    { id: 'pie-chart', name: 'Pie Chart', iconName: 'PieChart', category: 'Data', tags: ['stats', 'analytics'] },
    { id: 'trending-up', name: 'Trending Up', iconName: 'TrendingUp', category: 'Data', tags: ['growth', 'increase'] },
    { id: 'activity', name: 'Activity', iconName: 'Activity', category: 'Data', tags: ['pulse', 'health'] },
    { id: 'database', name: 'Database', iconName: 'Database', category: 'Data', tags: ['storage', 'server'] },
    { id: 'file-text', name: 'File', iconName: 'FileText', category: 'Data', tags: ['document', 'page'] },
    { id: 'folder', name: 'Folder', iconName: 'Folder', category: 'Data', tags: ['directory', 'group'] },
    
    // Media & Devices
    { id: 'image', name: 'Image', iconName: 'Image', category: 'Media', tags: ['photo', 'picture'] },
    { id: 'camera', name: 'Camera', iconName: 'Camera', category: 'Media', tags: ['photo', 'video'] },
    { id: 'video', name: 'Video', iconName: 'Video', category: 'Media', tags: ['movie', 'film'] },
    { id: 'music', name: 'Music', iconName: 'Music', category: 'Media', tags: ['audio', 'sound'] },
    { id: 'play-circle', name: 'Play', iconName: 'PlayCircle', category: 'Media', tags: ['start', 'video'] },
    { id: 'smartphone', name: 'Smartphone', iconName: 'Smartphone', category: 'Devices', tags: ['mobile', 'phone'] },
    { id: 'monitor', name: 'Monitor', iconName: 'Monitor', category: 'Devices', tags: ['screen', 'desktop'] },
    
    // Security & System
    { id: 'lock', name: 'Lock', iconName: 'Lock', category: 'Security', tags: ['secure', 'password'] },
    { id: 'unlock', name: 'Unlock', iconName: 'Unlock', category: 'Security', tags: ['open', 'access'] },
    { id: 'shield', name: 'Shield', iconName: 'Shield', category: 'Security', tags: ['protect', 'safety'] },
    { id: 'key', name: 'Key', iconName: 'Key', category: 'Security', tags: ['access', 'password'] },
    { id: 'eye', name: 'Eye', iconName: 'Eye', category: 'Security', tags: ['view', 'visible'] },
    { id: 'eye-off', name: 'Eye Off', iconName: 'EyeOff', category: 'Security', tags: ['hide', 'invisible'] },
    { id: 'alert-circle', name: 'Alert', iconName: 'AlertCircle', category: 'System', tags: ['warning', 'error'] },
    { id: 'info', name: 'Info', iconName: 'Info', category: 'System', tags: ['help', 'details'] },
    { id: 'help-circle', name: 'Help', iconName: 'HelpCircle', category: 'System', tags: ['question', 'support'] },
    { id: 'log-out', name: 'Log Out', iconName: 'LogOut', category: 'System', tags: ['exit', 'sign out'] },
    
    // Misc
    { id: 'map-pin', name: 'Map Pin', iconName: 'MapPin', category: 'Misc', tags: ['location', 'address'] },
    { id: 'globe', name: 'Globe', iconName: 'Globe', category: 'Misc', tags: ['world', 'internet'] },
    { id: 'flag', name: 'Flag', iconName: 'Flag', category: 'Misc', tags: ['report', 'country'] },
    { id: 'bookmark', name: 'Bookmark', iconName: 'Bookmark', category: 'Misc', tags: ['save', 'favorite'] },
    { id: 'heart', name: 'Heart', iconName: 'Heart', category: 'Misc', tags: ['like', 'love'] },
    { id: 'star', name: 'Star', iconName: 'Star', category: 'Misc', tags: ['favorite', 'rating'] },
    { id: 'thumbs-up', name: 'Thumbs Up', iconName: 'ThumbsUp', category: 'Misc', tags: ['like', 'approve'] },
    { id: 'zap', name: 'Zap', iconName: 'Zap', category: 'Misc', tags: ['flash', 'energy'] },
    { id: 'layers', name: 'Layers', iconName: 'Layers', category: 'Misc', tags: ['stack', 'design'] },
    { id: 'layout', name: 'Layout', iconName: 'Layout', category: 'Misc', tags: ['design', 'grid'] },
    { id: 'grid', name: 'Grid', iconName: 'Grid', category: 'Misc', tags: ['layout', 'view'] },
    { id: 'list', name: 'List', iconName: 'List', category: 'Misc', tags: ['view', 'menu'] }
];
