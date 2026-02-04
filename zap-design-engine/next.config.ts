import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Bỏ output: 'export' vì rewrites yêu cầu Next.js server mode
    async rewrites() {
        return [
            {
                source: '/api-proxy/:path*',
                destination: 'https://dev-crm-merchant-api.diadiem.vn/:path*',
            },
        ];
    },
    images: {
        unoptimized: true
    }
};

export default nextConfig;
