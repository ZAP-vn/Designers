import { authService } from '../authService';
import { CustomerDetailResponse, CustomerListEntry, PaginatedResponse } from '../../types';

/**
 * Customer API Service
 */
export const customerApi = {
    /**
     * Fetch customer details by ID
     * @param id The customer ID (e.g., 'Customer/1')
     */
    getCustomerDetail: async (id: string): Promise<CustomerDetailResponse> => {
        const endpoint = process.env.NEXT_PUBLIC_API_CUSTOMER_DETAIL || '/api/v2/customer/detail';

        // Construct URL with query parameters
        const queryPath = `${endpoint}?_id=${encodeURIComponent(id)}`;

        // Use core authService to fetch (automatically injects Token & Headers)
        return await authService.get<CustomerDetailResponse>(queryPath);
    },

    /**
     * Fetch paginated list of customers
     * @param params Query parameters for filtering and pagination
     */
    getCustomerList: async (params: {
        page?: number;
        pageSize?: number;
        search?: string;
        status?: number;
    }): Promise<PaginatedResponse<CustomerListEntry>> => {
        const endpoint = process.env.NEXT_PUBLIC_API_CUSTOMER_LIST || '/api/v2/customer/list';

        // Construct URL with query parameters
        const query = new URLSearchParams();
        if (params.page) query.append('page', params.page.toString());
        if (params.pageSize) query.append('pageSize', params.pageSize.toString());
        if (params.search) query.append('search', params.search);
        if (params.status) query.append('status', params.status.toString());

        const queryPath = `${endpoint}?${query.toString()}`;

        return await authService.get<PaginatedResponse<CustomerListEntry>>(queryPath);
    }
};
