import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        browser: {
            enabled: true,
            provider: playwright(),
            instances: [
                { browser: 'chromium' },
            ],
        },
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        alias: {
            '@': path.resolve(__dirname, './'),
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['components/**/*', 'app/**/*', 'store.ts'],
            exclude: ['**/*.d.ts', '**/node_modules/**', '**/.next/**'],
        },
    },
});
