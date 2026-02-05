import { CustomerListEntry, PaginatedResponse } from '../../types';

export const MOCK_CUSTOMERS: CustomerListEntry[] = [
    {
        _id: 'Customer/1',
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john.doe@example.com',
        Phone: '+84 901 234 567',
        CustomerStatusId: 1, // Active
        InterestGrade: 'A',
        CreateDate: '2024-01-15T08:30:00Z',
        CustomerCode: 'CUS-001'
    },
    {
        _id: 'Customer/2',
        FirstName: 'Jane',
        LastName: 'Smith',
        Email: 'jane.smith@example.com',
        Phone: '+84 902 345 678',
        CustomerStatusId: 1,
        InterestGrade: 'B',
        CreateDate: '2024-01-20T10:15:00Z',
        CustomerCode: 'CUS-002'
    },
    {
        _id: 'Customer/3',
        FirstName: 'Michael',
        LastName: 'Brown',
        Email: 'm.brown@business.vn',
        Phone: '+84 903 456 789',
        CustomerStatusId: 2, // Inactive
        InterestGrade: 'C',
        CreateDate: '2023-12-05T14:20:00Z',
        CustomerCode: 'CUS-003'
    },
    {
        _id: 'Customer/4',
        FirstName: 'Elena',
        LastName: 'Rodriguez',
        Email: 'elena.r@lifestyle.com',
        Phone: '+84 904 567 890',
        CustomerStatusId: 1,
        InterestGrade: 'A',
        CreateDate: '2024-02-01T09:00:00Z',
        CustomerCode: 'CUS-004'
    },
    {
        _id: 'Customer/5',
        FirstName: 'Tanaka',
        LastName: 'Kenji',
        Email: 'kenji.t@tech.jp',
        Phone: '+84 905 678 901',
        CustomerStatusId: 3, // Pending
        InterestGrade: 'B',
        CreateDate: '2024-01-28T16:45:00Z',
        CustomerCode: 'CUS-005'
    }
];

export const getMockCustomerList = (page = 1, pageSize = 10, search = ''): PaginatedResponse<CustomerListEntry> => {
    let filtered = [...MOCK_CUSTOMERS];

    if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(c =>
            c.FirstName.toLowerCase().includes(s) ||
            c.LastName.toLowerCase().includes(s) ||
            c.Email.toLowerCase().includes(s) ||
            c.CustomerCode.toLowerCase().includes(s)
        );
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return {
        data,
        total,
        page,
        pageSize,
        totalPages
    };
};
