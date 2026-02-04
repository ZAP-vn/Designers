import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './store';

describe('ZAP Store Logic', () => {

    // Reset store before each test
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
        const { result } = renderHook(() => useStore());
        act(() => {
            result.current.setMasterConfig({ primary: '#000000', borderRadius: 0 });
            result.current.setMerchantOverride((prev) => ({}));
            result.current.setUserRole('admin');
        });
    });

    it('should initialize with default master config', () => {
        const { result } = renderHook(() => useStore());
        expect(result.current.computedTheme.primary).toBe('#000000');
    });

    it('should allow merchant to override master config', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.setMerchantOverride({ primary: '#FF0000' });
        });

        expect(result.current.computedTheme.primary).toBe('#FF0000');
    });

    it('should allow master config updates to propagate if not overridden', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.setMasterConfig({ primary: '#00FF00' });
        });

        expect(result.current.computedTheme.primary).toBe('#00FF00');
    });

    it('should respect master config if merchant override is explicitly undefined (The Fix)', () => {
        const { result } = renderHook(() => useStore());

        // 1. Set Merchant Override
        act(() => {
            result.current.setMerchantOverride({ primary: '#FF0000' });
        });
        expect(result.current.computedTheme.primary).toBe('#FF0000');

        // 2. Set Master Config AND Unset Merchant Override (Simulate Admin Theme Switch)
        act(() => {
            result.current.setMasterConfig({ primary: '#0000FF' });
            result.current.setMerchantOverride((prev) => ({ ...prev, primary: undefined }));
        });

        // 3. Expect Master Value to shine through
        expect(result.current.computedTheme.primary).toBe('#0000FF');
    });

    it('should persist merchant overrides even when master changes', () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            result.current.setMerchantOverride({ borderRadius: 20 });
            result.current.setMasterConfig({ borderRadius: 10 });
        });

        expect(result.current.computedTheme.borderRadius).toBe(20);
    });
});
