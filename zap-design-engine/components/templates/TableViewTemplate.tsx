import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ThemeState, TemplateConfig } from '../../types';
import { Pagination } from '../atoms/Pagination';
import {
    ChevronLeft, ChevronRight, Check, CheckCircle, Edit, Trash2, X, SlidersHorizontal, MoreVertical, Calendar, Clock, Eye, Pencil, Ban, GripVertical, Search, Download, ChevronDown
} from 'lucide-react';

interface TableViewTemplateProps {
    config: TemplateConfig['tableView'];
    themeState: ThemeState;
    dateFormat: string;
}

const formatDate = (date: Date, format: string): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
    }

    const d = date;
    const map: { [key: string]: string } = {
        M: String(d.getMonth() + 1),
        MM: String(d.getMonth() + 1).padStart(2, '0'),
        D: String(d.getDate()),
        DD: String(d.getDate()).padStart(2, '0'),
        YYYY: String(d.getFullYear()),
        YY: String(d.getFullYear()).slice(-2)
    };

    // Replace longer tokens first to avoid conflicts (e.g., YYYY before YY)
    return format.replace(/YYYY|YY|MM|M|DD|D/g, (match) => map[match]);
};

// --- MOCK DATA ---
const generateMockPromotions = (count: number) => {
    const samples = [
        { avatar: 'S', avatarColor: 'bg-green-100 text-green-600', name: 'Summer Blowout', type: 'Shipping', channel: 'POS', location: 'All Locations', value: 'Free', status: 'Scheduled', category: 'Seasonal' },
        { avatar: 'M', avatarColor: 'bg-blue-100 text-blue-600', name: 'Member Deal', type: 'Discount', channel: 'App', location: 'Westside Mall', value: '15%', status: 'Active', category: 'Membership' },
        { avatar: 'W', avatarColor: 'bg-purple-100 text-purple-600', name: 'Winter Event', type: 'Coupon', channel: 'Web', location: 'North Station', value: '$10.00', status: 'Inactive', category: 'Seasonal' },
        { avatar: 'F', avatarColor: 'bg-red-100 text-red-600', name: 'Flash Sale', type: 'Discount', channel: 'All', location: 'All Locations', value: '50%', status: 'Active', category: 'Flash Sale' },
    ];
    const newPromotions = [];
    for (let i = 1; i <= count; i++) {
        const sample = samples[i % samples.length];
        const statusCycle = ['Active', 'Scheduled', 'Inactive'];

        let schedule;
        const scheduleType = i % 4;
        switch (scheduleType) {
            case 0: // Date range with time
                schedule = {
                    startDate: new Date(2024, 0, Math.min(i, 27) + 1),
                    endDate: new Date(2024, 11, Math.min(i, 27) + 1),
                    startTime: '9:00 AM',
                    endTime: '5:00 PM',
                };
                break;
            case 1: // Date range only
                schedule = {
                    startDate: new Date(2024, 0, Math.min(i, 27) + 1),
                    endDate: new Date(2024, 11, Math.min(i, 27) + 1),
                };
                break;
            case 2: // No time limit
                schedule = { noLimit: true };
                break;
            case 3: // Ongoing (no end date)
            default:
                schedule = {
                    startDate: new Date(2024, 0, Math.min(i, 27) + 1),
                };
                break;
        }

        newPromotions.push({
            ...sample,
            id: `PR-${880 + i}`,
            name: `${sample.name} #${i}`,
            status: statusCycle[i % statusCycle.length],
            schedule,
            category: sample.category
        });
    }
    return newPromotions;
};

const promotions = generateMockPromotions(125);

const staffList = [
    { id: '32432b', avatar: 'https://i.pravatar.cc/40?u=staff1', name: 'Tom Tran', role: 'Cashier', roleDetail: 'Primary', contactEmail: 'tom@two.vn', contactPhone: '(657) 363-9270', status: 'Active', lastActive: '2 mins ago' },
    { id: '98123a', avatar: 'https://i.pravatar.cc/40?u=staff2', name: 'Jessica Smith', role: 'Manager', roleDetail: 'Full-time', contactEmail: 'jessica.s@zap.com', contactPhone: '(555) 123-4567', status: 'Active', lastActive: '1 hour ago' },
    { id: '45678c', avatar: 'https://i.pravatar.cc/40?u=staff3', name: 'David Chen', role: 'Kitchen Staff', roleDetail: 'Part-time', contactEmail: 'david.c@zap.com', contactPhone: '-', status: 'On Leave', lastActive: '3 days ago' },
    { id: '77219d', avatar: 'https://i.pravatar.cc/40?u=staff4', name: 'Maria Rodriguez', role: 'Server', roleDetail: 'Hourly', contactEmail: 'maria.r@zap.com', contactPhone: '(555) 234-5678', status: 'Active', lastActive: 'Today' },
    { id: '22341e', avatar: 'https://i.pravatar.cc/40?u=staff5', name: 'Robert Fox', role: 'Chef', roleDetail: 'Part-time', contactEmail: 'robert.f@zap.com', contactPhone: '(555) 345-6789', status: 'Inactive', lastActive: '2 weeks ago' },
    { id: '88981f', avatar: 'https://i.pravatar.cc/40?u=staff6', name: 'Emily White', role: 'Barista', roleDetail: 'Part-time', contactEmail: 'emily.w@zap.com', contactPhone: '(555) 456-7890', status: 'Active', lastActive: '5 mins ago' },
    { id: '12398z', avatar: 'https://i.pravatar.cc/40?u=staff7', name: 'Michael Brown', role: 'Manager', roleDetail: 'Shift Lead', contactEmail: 'mike.b@zap.com', contactPhone: '(555) 567-8901', status: 'Active', lastActive: '10 mins ago' },
];
// --- END MOCK DATA ---

// Fix: Moved dataMapping outside the component to prevent re-creation on re-renders and help with type inference.
const dataMapping = {
    'Promotions': {
        headers: ['Promotion Name', 'Type', 'Location', 'Value', 'Schedule', 'Status', ''],
        rows: promotions,
        alignments: {
            'Value': 'right',
        }
    },
    'Staff List': {
        headers: ['Name', 'Role', 'Contact', 'Activity', ''],
        rows: staffList,
        alignments: {}
    },
};

const StatusPill = ({ text }: { text: string }) => {
    const styles: { [key: string]: string } = {
        'Scheduled': 'bg-yellow-100 text-yellow-800',
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-gray-100 text-gray-700',
        'On Leave': 'bg-blue-100 text-blue-800',
    };
    const dotStyles: { [key: string]: string } = {
        'Scheduled': 'bg-yellow-500',
        'Active': 'bg-green-500',
        'Inactive': 'bg-gray-400',
        'On Leave': 'bg-blue-500',
    };
    const style = styles[text] || styles['Inactive'];
    const dotStyle = dotStyles[text] || dotStyles['Inactive'];

    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${style}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
            {text}
        </span>
    );
};

const TypePill = ({ text }: { text: string }) => {
    const styles: { [key: string]: string } = {
        'Shipping': 'bg-green-100 text-green-800',
        'Discount': 'bg-blue-100 text-blue-800',
        'Coupon': 'bg-purple-100 text-purple-800',
    };
    const style = styles[text] || 'bg-gray-100 text-gray-700';
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${style}`}>{text}</span>;
};

// Action Menu Component
const ActionMenu = ({ itemId }: { itemId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAction = (action: string) => {
        console.log(`${action} item ${itemId}`); // For demo purposes
        setIsOpen(false);
    };

    return (
        <div className="relative flex justify-end" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
                <MoreVertical size={18} />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
                    <ul>
                        <li><button onClick={() => handleAction('View')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors"><Eye size={14} /> View</button></li>
                        <li><button onClick={() => handleAction('Edit')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors"><Pencil size={14} /> Edit</button></li>
                        <li><button onClick={() => handleAction('Delete')} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2.5 transition-colors"><Trash2 size={14} /> Delete</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

// Tooltip Button for Bulk Actions
const TooltipButton = ({ tooltip, children, className }: { tooltip: string; children?: React.ReactNode; className?: string }) => (
    <div className="relative group">
        <button className={`p-2 rounded-full transition-colors ${className}`}>
            {children}
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/80 text-white text-[10px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
            {tooltip}
        </div>
    </div>
);

// usePaginationRange removed (using atom)

// Helper component for field customizer toggle
const FieldToggle = ({ checked, onChange, themeState }: { checked: boolean; onChange: () => void; themeState: ThemeState }) => (
    <div
        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${!checked && 'bg-gray-200'}`}
        style={{ backgroundColor: checked ? themeState.primary : undefined }}
        onClick={onChange}
    >
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
);

// Generic Filter Dropdown Component
const FilterDropdown = ({ label, value, options, onChange, themeState }: { label: string, value: string | number, options: (string | number)[], onChange: (value: any) => void, themeState: ThemeState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border rounded-md text-sm transition-all"
                style={{
                    borderColor: isOpen || isHovered ? themeState.primary : '#e5e7eb',
                    boxShadow: isOpen || isHovered ? `0 0 0 1px ${themeState.primary}` : 'none'
                }}
            >
                <span className="text-gray-500">{label}:</span>
                <span className="font-semibold text-gray-800">{value}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-20 animate-in fade-in zoom-in-95 duration-200">
                    <ul className="py-1">
                        {options.map(option => (
                            <li key={option}>
                                <button
                                    onClick={() => { onChange(option); setIsOpen(false); }}
                                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${value === option ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    style={{
                                        backgroundColor: value === option ? `${themeState.primary}1A` : 'transparent',
                                        color: value === option ? themeState.tertiaryBtnText : 'inherit'
                                    }}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TableViewTemplate: React.FC<TableViewTemplateProps> = ({ config, themeState, dateFormat }) => {
    const {
        dataSource = 'Promotions',
        showCheckboxes = true,
        showHeader = true,
        showPagination = true,
    } = config || {};

    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);

    // State for field customizer
    const [columns, setColumns] = useState<Record<string, { label: string, visible: boolean }[]>>({});
    const [isFieldsModalOpen, setIsFieldsModalOpen] = useState(false);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const fieldsModalRef = useRef<HTMLDivElement>(null);

    // State for new toolbar
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const initialColumns: Record<string, { label: string, visible: boolean }[]> = {};
        (Object.keys(dataMapping) as Array<keyof typeof dataMapping>).forEach(key => {
            initialColumns[key as keyof typeof dataMapping] = dataMapping[key as keyof typeof dataMapping].headers.map(h => ({ label: h, visible: true }));
        });
        setColumns(initialColumns);
    }, []);

    const currentData = dataMapping[dataSource as keyof typeof dataMapping];
    const { rows } = currentData;
    const alignments: Record<string, string> = currentData.alignments || {};

    // Dynamic options for filters
    const promotionStatuses = useMemo(() => ['All', ...Array.from(new Set(promotions.map(p => p.status)))], []);
    const promotionCategories = useMemo(() => ['All', ...Array.from(new Set(promotions.map(p => p.category)))], []);
    const staffStatuses = useMemo(() => ['All', ...Array.from(new Set(staffList.map(s => s.status)))], []);

    const filteredRows = useMemo(() => {
        let filtered = rows;

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(row =>
                row.name?.toLowerCase().includes(lowercasedQuery) ||
                row.id?.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (statusFilter !== 'All') {
            filtered = filtered.filter(row => row.status === statusFilter);
        }

        if (dataSource === 'Promotions' && categoryFilter !== 'All') {
            filtered = filtered.filter(row => (row as any).category === categoryFilter);
        }

        return filtered;
    }, [rows, searchQuery, statusFilter, categoryFilter, dataSource]);


    const totalItems = filteredRows.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const displayedRows = useMemo(() => {
        return filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    }, [filteredRows, currentPage, rowsPerPage]);

    // Pagination logic moved to atom

    useEffect(() => {
        setCurrentPage(1);
        setStatusFilter('All');
        setCategoryFilter('All');
    }, [dataSource]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, categoryFilter, rowsPerPage]);

    // Close modal on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (fieldsModalRef.current && !fieldsModalRef.current.contains(event.target as Node)) {
                setIsFieldsModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentColumns = columns[dataSource] || [];
    const visibleHeaders = useMemo(() => currentColumns.filter(c => c.visible), [currentColumns]);
    const isAllSelected = selectedRows.size === displayedRows.length && displayedRows.length > 0;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRows(new Set(displayedRows.map(r => r.id)));
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleSelectRow = (id: string) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedRows(newSelection);
    };

    // --- Field Customizer Handlers ---
    const handleToggleVisibility = (index: number) => {
        const newColumnsForSource = [...currentColumns];
        newColumnsForSource[index].visible = !newColumnsForSource[index].visible;
        setColumns(prev => ({ ...prev, [dataSource]: newColumnsForSource }));
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => setDraggedItemIndex(index), 0);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.preventDefault();
        if (index !== draggedItemIndex) {
            setDragOverIndex(index);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
        e.preventDefault();
        const draggedIndexStr = e.dataTransfer.getData('text/plain');
        if (draggedIndexStr === '') return;
        const draggedIndex = parseInt(draggedIndexStr, 10);

        const newColumnOrder = [...currentColumns];
        const [draggedItem] = newColumnOrder.splice(draggedIndex, 1);
        newColumnOrder.splice(dropIndex, 0, draggedItem);

        setColumns(prev => ({ ...prev, [dataSource]: newColumnOrder }));
        setDraggedItemIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedItemIndex(null);
        setDragOverIndex(null);
    };
    // --- End Handlers ---

    const CustomCheckbox = ({ id, checked, onChange }: { id: string, checked: boolean, onChange: (id: string) => void }) => (
        <div className="w-5 h-5 flex items-center justify-center">
            <input
                id={`check-${id}`}
                type="checkbox"
                checked={checked}
                onChange={() => onChange(id)}
                className="hidden"
            />
            <label
                htmlFor={`check-${id}`}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${!checked && 'bg-white border-gray-300 hover:border-gray-400'}`}
                style={{
                    backgroundColor: checked ? themeState.primary : undefined,
                    borderColor: checked ? themeState.primary : undefined,
                }}
            >
                {checked && <Check size={12} style={{ color: themeState.primaryBtnText }} />}
            </label>
        </div>
    );

    const renderCell = (item: any, header: string) => {
        switch (dataSource) {
            case 'Promotions':
                if (header === 'Promotion Name') return (
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${item.avatarColor}`}>{item.avatar}</div>
                        <div>
                            <div className="font-semibold text-gray-800">{item.name}</div>
                            <div className="font-mono text-xs text-gray-500">{item.id}</div>
                        </div>
                    </div>
                );
                if (header === 'Type') return <TypePill text={item.type} />;
                if (header === 'Location') return <div><div className="font-medium text-gray-800">{item.location}</div><div className="text-xs text-gray-500">{item.channel}</div></div>;
                if (header === 'Value') return <span className="font-semibold text-gray-800">{item.value}</span>;
                if (header === 'Schedule') {
                    const schedule = item.schedule;
                    if (!schedule) return <span className="text-gray-500">-</span>;
                    if (schedule.noLimit) return <div><div className="font-medium text-gray-800">No time limit</div></div>;

                    const startDateStr = schedule.startDate ? formatDate(schedule.startDate, dateFormat) : null;
                    const endDateStr = schedule.endDate ? formatDate(schedule.endDate, dateFormat) : null;

                    let dateDisplay;
                    if (startDateStr && endDateStr) {
                        dateDisplay = `${startDateStr} - ${endDateStr}`;
                    } else if (startDateStr) {
                        dateDisplay = `Starts ${startDateStr}`;
                    } else {
                        return <span className="text-gray-500">-</span>;
                    }

                    let timeDisplay;
                    if (schedule.startTime && schedule.endTime) {
                        timeDisplay = `${schedule.startTime} - ${schedule.endTime}`;
                    } else if (schedule.startTime) {
                        timeDisplay = `from ${schedule.startTime}`;
                    }

                    return (
                        <div>
                            <div className="font-medium text-gray-800 whitespace-nowrap">{dateDisplay}</div>
                            {timeDisplay && <div className="text-xs text-gray-500">{timeDisplay}</div>}
                        </div>
                    );
                }
                if (header === 'Status') return <StatusPill text={item.status} />;
                if (header === '') return <ActionMenu itemId={item.id} />;
                break;
            case 'Staff List':
                if (header === 'Name') return <div className="flex items-center gap-3"><img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full" /><div><div className="font-semibold text-gray-800">{item.name}</div><div className="text-xs text-gray-500 font-mono">ID: {item.id}</div></div></div>;
                if (header === 'Role') return <div><div className="font-medium text-gray-800">{item.role}</div><div className="text-xs text-gray-500">{item.roleDetail}</div></div>;
                if (header === 'Contact') return <div><div className="font-medium text-gray-800">{item.contactEmail}</div><div className="text-xs text-gray-500">{item.contactPhone}</div></div>;
                if (header === 'Activity') return <div><StatusPill text={item.status} /><div className="text-xs text-gray-500 mt-1">{item.lastActive}</div></div>;
                if (header === '') return <ActionMenu itemId={item.id} />;
                break;
        }
        return null;
    };

    return (
        <div className="p-4 bg-gray-50/50 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4 px-2">
                <div className="relative w-full md:max-w-xs">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Search items, ID, or SKU..."
                        className="w-full bg-white pl-10 pr-4 py-1.5 border rounded-md text-sm outline-none transition-all"
                        style={{
                            borderColor: isSearchFocused ? themeState.primary : '#e5e7eb',
                            boxShadow: isSearchFocused ? `0 0 0 1px ${themeState.primary}` : 'none'
                        }}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    <FilterDropdown label="Status" value={statusFilter} options={dataSource === 'Promotions' ? promotionStatuses : staffStatuses} onChange={setStatusFilter} themeState={themeState} />
                    {dataSource === 'Promotions' && (
                        <FilterDropdown label="Category" value={categoryFilter} options={promotionCategories} onChange={setCategoryFilter} themeState={themeState} />
                    )}
                    <FilterDropdown label="Rows" value={rowsPerPage} options={[10, 25, 50]} onChange={setRowsPerPage} themeState={themeState} />
                    <button onClick={() => console.log('Exporting data...')} className="flex items-center justify-center w-9 h-9 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                        <Download size={16} />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setIsFieldsModalOpen(prev => !prev)}
                            className="flex items-center justify-center w-9 h-9 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                            <SlidersHorizontal size={16} />
                        </button>
                        {isFieldsModalOpen && (
                            <div
                                ref={fieldsModalRef}
                                className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 animate-in fade-in zoom-in-95 duration-200"
                            >
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-800">Customize Fields</h3>
                                    <p className="text-xs text-gray-500">Drag to reorder, toggle to show/hide.</p>
                                </div>
                                <ul onDragOver={(e) => e.preventDefault()} className="p-2 max-h-96 overflow-y-auto">
                                    {currentColumns.map((col, index) => (
                                        <li
                                            key={col.label}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDragLeave={() => setDragOverIndex(null)}
                                            className={`flex items-center justify-between p-2 rounded-lg transition-all text-sm group ${draggedItemIndex === index ? 'opacity-40' : ''} ${dragOverIndex === index && draggedItemIndex !== null && dragOverIndex !== draggedItemIndex ? 'bg-purple-50' : ''}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-gray-300 cursor-grab group-hover:text-gray-500"><GripVertical size={16} /></div>
                                                <span className="font-medium text-gray-700">{col.label || 'Actions'}</span>
                                            </div>
                                            <FieldToggle checked={col.visible} onChange={() => handleToggleVisibility(index)} themeState={themeState} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="w-full text-sm text-gray-600">
                    {showHeader && (
                        <thead className="text-xs text-gray-400 uppercase bg-white">
                            <tr>
                                {showCheckboxes && (
                                    <th scope="col" className="px-6 py-4">
                                        <CustomCheckbox id="select-all" checked={isAllSelected} onChange={() => handleSelectAll({ target: { checked: !isAllSelected } } as any)} />
                                    </th>
                                )}
                                {visibleHeaders.map(c => (
                                    <th key={c.label} scope="col" className={`px-6 py-4 font-semibold tracking-wider ${alignments[c.label] === 'right' ? 'text-right' : 'text-left'}`}>{c.label}</th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {displayedRows.map((item) => (
                            <tr key={item.id} className={`bg-white border-t border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedRows.has(item.id) ? 'bg-purple-50/50' : ''}`}>
                                {showCheckboxes && (
                                    <td className="px-6 py-4">
                                        <CustomCheckbox id={item.id} checked={selectedRows.has(item.id)} onChange={handleSelectRow} />
                                    </td>
                                )}
                                {visibleHeaders.map(c => (
                                    <td key={`${item.id}-${c.label}`} className={`px-6 py-4 whitespace-nowrap ${alignments[c.label] === 'right' ? 'text-right' : 'text-left'}`}>
                                        {renderCell(item, c.label)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPagination && totalPages > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalItems}
                    pageSize={rowsPerPage}
                    onPageChange={setCurrentPage}
                    themeState={themeState}
                    showSummary={true}
                />
            )}

            {/* Bulk Actions Toolbar */}
            {selectedRows.size > 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="flex items-center gap-2 rounded-full shadow-2xl shadow-black/30 p-2" style={{ backgroundColor: themeState.darkText, color: themeState.lightText }}>
                        <span className="text-sm font-semibold px-4">
                            <span className="font-extrabold mr-1.5">{selectedRows.size}</span>
                            Selected
                        </span>
                        <div className="w-px h-6 bg-gray-500/50"></div>
                        <TooltipButton tooltip="Approve" className="hover:bg-white/10">
                            <CheckCircle size={20} className="text-green-500" />
                        </TooltipButton>
                        <TooltipButton tooltip="Decline" className="hover:bg-white/10">
                            <Ban size={20} className="text-gray-400" />
                        </TooltipButton>
                        <TooltipButton tooltip="Edit" className="hover:bg-white/10">
                            <Edit size={18} className="text-blue-500" />
                        </TooltipButton>
                        <div className="w-px h-6 bg-gray-500/50"></div>
                        <TooltipButton tooltip="Delete" className="hover:bg-red-500/20">
                            <Trash2 size={18} className="text-red-500" />
                        </TooltipButton>
                        <button
                            onClick={() => setSelectedRows(new Set())}
                            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="Deselect All"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableViewTemplate;