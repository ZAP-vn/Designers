import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    // Ensure critical environment variables are available during build/runtime
    env: {
        GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY || '',
    },
    images: {
        unoptimized: true
    }
};

export default nextConfig;
