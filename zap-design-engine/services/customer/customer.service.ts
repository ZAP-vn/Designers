import { authService } from '../authService';

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
    }
};
