import type { NextConfig } from "next";

const nextConfig = {
    output: 'export',
    // Ensure critical environment variables are available during build/runtime
    env: {
        GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY || '',
    },
    images: {
        unoptimized: true
    },
    // Required for GitHub Pages project site deployment
    basePath: '/Designers',
    assetPrefix: '/Designers',
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
