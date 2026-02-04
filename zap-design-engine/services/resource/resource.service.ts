import { authService } from '../authService';

export interface ResourceMapRequest {
    Data: {
        _id: string;
        Filter: any;
    }[];
}

/**
 * Resource Maps API Service
 */
export const resourceApi = {
    /**
     * Fetch resource mapping data
     * @param resourceIds Array of resource IDs to fetch (e.g. ['CRMResourceMaps/257'])
     */
    getMaps: async (resourceIds: string[]): Promise<any> => {
        const endpoint = process.env.NEXT_PUBLIC_API_RESOURCE_MAPS || '/api/v1/resourceMaps';

        const payload: ResourceMapRequest = {
            Data: resourceIds.map(id => ({
                _id: id,
                Filter: null
            }))
        };

        // Uses core authService.post (automatically handles Proxy, Headers, and Token)
        return await authService.post<any>(endpoint, payload);
    }
};
