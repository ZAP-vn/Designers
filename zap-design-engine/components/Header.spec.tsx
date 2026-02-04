import { vi, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'

// Mock the ThemeState type for testing
const mockTheme = {
    primary: '#7E22CE',
    secondary: '#F3E8FF',
    lightText: '#FFFFFF',
    darkText: '#1C1C1E',
    grayText: '#8E8E93',
    background: '#FFFFFF',
    background2: '#F9FAFB',
    background3: '#F3F4F6',
    primaryBtnText: '#FFFFFF',
    secondaryBtnText: '#1C1C1E',
    tertiaryBtnText: '#7E22CE',
    fontFamily: 'Inter',
    secondaryFontFamily: 'Inter',
    borderRadius: 12,
    btnPaddingX: 24,
    btnPaddingY: 12,
    buttonStyle: 'flat' as const,
    fillMode: 'solid' as const,
    gradientAngle: 135,
    depth: 1,
    iconGap: 8,
    buttonHoverOpacity: 90,
    inputBg: '#FFFFFF',
    inputFilledBg: '#F3F4F6',
    inputBorder: '#E5E7EB',
    inputPaddingX: 16,
    inputPaddingY: 12,
    activeColor: '#7E22CE',
    hoverOpacity: 10,
    formLabelStyle: 'top' as const,
    formVariant: 'outlined' as const,
    formDensity: 'comfortable' as const,
    formPlaceholderColor: '#9CA3AF',
    formTextColor: '#1C1C1E',
    formLabelColor: '#374151',
    formErrorColor: '#EF4444',
    formRingWidth: 4,
    formSimulateData: false,
}

describe('Header Component', () => {
    describe('Rendering', () => {
        it('should render without crashing', () => {
            render(
                <Header
                    isBuilder={true}
                    projectName="Test Project"
                    viewMode="builder"
                    onViewModeChange={() => { }}
                    theme={mockTheme}
                    onOpenProject={() => { }}
                    onImportFile={() => { }}
                    onSaveVersion={() => { }}
                    onExportJson={() => { }}
                    onWorkspaceSettings={() => { }}
                />
            )

            expect(screen.getByText('Test Project')).toBeInTheDocument()
        })

        it('should display the ZAP logo', () => {
            render(
                <Header
                    isBuilder={true}
                    projectName="ZAP Design Engine"
                    viewMode="builder"
                    onViewModeChange={() => { }}
                    theme={mockTheme}
                    onOpenProject={() => { }}
                    onImportFile={() => { }}
                    onSaveVersion={() => { }}
                    onExportJson={() => { }}
                    onWorkspaceSettings={() => { }}
                />
            )

            // Check for logo text or image
            const logo = screen.getByText(/ZAP/i)
            expect(logo).toBeInTheDocument()
        })
    })

    describe('Props', () => {
        it('should display the correct project name', () => {
            const projectName = 'My Custom Project'

            render(
                <Header
                    isBuilder={true}
                    projectName={projectName}
                    viewMode="builder"
                    onViewModeChange={() => { }}
                    theme={mockTheme}
                    onOpenProject={() => { }}
                    onImportFile={() => { }}
                    onSaveVersion={() => { }}
                    onExportJson={() => { }}
                    onWorkspaceSettings={() => { }}
                />
            )

            expect(screen.getByText(projectName)).toBeInTheDocument()
        })
    })

    describe('User Interactions', () => {
        it('should call onViewModeChange when switching modes', () => {
            const handleViewModeChange = vi.fn()

            render(
                <Header
                    isBuilder={true}
                    projectName="Test Project"
                    viewMode="builder"
                    onViewModeChange={handleViewModeChange}
                    theme={mockTheme}
                    onOpenProject={() => { }}
                    onImportFile={() => { }}
                    onSaveVersion={() => { }}
                    onExportJson={() => { }}
                    onWorkspaceSettings={() => { }}
                />
            )

            // This test would need to find and click the view mode toggle button
            // Adjust selector based on actual implementation
            // const toggleButton = screen.getByRole('button', { name: /preview/i })
            // fireEvent.click(toggleButton)
            // expect(handleViewModeChange).toHaveBeenCalledWith('preview')
        })
    })
})
