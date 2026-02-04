import { vi, describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserPreview } from '../BrowserPreview';
import { ThemeState } from '../../../types';


// Mock theme data
const mockTheme: ThemeState = {
    primary: '#4f46e5',
    secondary: '#7c3aed',
    lightText: '#ffffff',
    darkText: '#0f172a',
    grayText: '#64748b',
    background: '#ffffff',
    background2: '#f8fafc',
    background3: '#f1f5f9',
    primaryBtnText: '#ffffff',
    secondaryBtnText: '#ffffff',
    tertiaryBtnText: '#4f46e5',
    fontFamily: 'Inter',
    borderRadius: 8,
    btnPaddingX: 16,
    btnPaddingY: 8,
    buttonStyle: 'flat',
    fillMode: 'solid',
};

describe('BrowserPreview', () => {
    it('renders with default props', () => {
        render(
            <BrowserPreview themeState={mockTheme}>
                <div>Test Content</div>
            </BrowserPreview>
        );

        expect(screen.getByText('https://orbit-financial.zap')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders custom URL', () => {
        const customUrl = 'https://custom-site.zap';
        render(
            <BrowserPreview themeState={mockTheme} url={customUrl}>
                <div>Content</div>
            </BrowserPreview>
        );

        expect(screen.getByDisplayValue(customUrl)).toBeInTheDocument();
    });

    it('switches viewports when buttons are clicked', () => {
        const onViewportChange = vi.fn();
        render(
            <BrowserPreview
                themeState={mockTheme}
                onViewportChange={onViewportChange}
            >
                <div>Content</div>
            </BrowserPreview>
        );

        // Click Tablet toggle
        const tabletBtn = screen.getByText('Tablet');
        fireEvent.click(tabletBtn);

        expect(onViewportChange).toHaveBeenCalledWith('tablet');

        // Click Mobile toggle
        const mobileBtn = screen.getByText('Mobile');
        fireEvent.click(mobileBtn);

        expect(onViewportChange).toHaveBeenCalledWith('mobile');
    });

    it('hides controls when showControls is false', () => {
        render(
            <BrowserPreview themeState={mockTheme} showControls={false}>
                <div>Content</div>
            </BrowserPreview>
        );

        expect(screen.queryByText('https://orbit-financial.zap')).not.toBeInTheDocument();
    });
});
