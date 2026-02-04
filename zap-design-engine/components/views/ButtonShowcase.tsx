import React, { useState } from 'react';
import { Zap, ArrowRight, MousePointerClick, Check, Copy } from 'lucide-react';
import { ThemeState } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';
import { Button } from '../atoms/Button';

export const ButtonShowcase = ({ themeState, showClassNames }: { themeState: ThemeState, showClassNames?: boolean }) => {
    // Default safe theme if undefined (defensive programming)
    const safeTheme: ThemeState = themeState || {
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
        borderRadius: 16,
        btnPaddingX: 24,
        btnPaddingY: 16,
        buttonStyle: 'flat',
        fillMode: 'solid',
        gradientAngle: 135,
        fontFamily: 'Inter',
        depth: 1,
        iconGap: 8,
        inputBg: '#FFFFFF',
        inputBorder: '#E5E7EB',
        inputPaddingX: 16,
        inputPaddingY: 12,
        activeColor: '#7E22CE',
        buttonHoverOpacity: 90
    };

    return (
        <div className="w-full overflow-x-auto">
            <ContainerDevWrapper
                showClassNames={showClassNames}
                className="my-4"
                identity={{
                    displayName: "ButtonMatrix",
                    type: "Organism/Block", // Level 5: Block
                    architecture: "SYSTEMS // BUTTON GRID",
                    filePath: "components/views/ButtonShowcase.tsx"
                }}
            >
                <div className="min-w-[600px] p-6 rounded-xl border border-gray-100 bg-white">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs uppercase text-gray-400 tracking-wider">
                                <th className="pb-4 font-bold">Type</th>
                                <th className="pb-4 font-bold text-center">Enabled</th>
                                <th className="pb-4 font-bold text-center">Hover (Sim)</th>
                                <th className="pb-4 font-bold text-center">Focus (Sim)</th>
                                <th className="pb-4 font-bold text-center">Disabled</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {(['primary', 'secondary', 'tertiary'] as const).map(type => (
                                <tr key={type}>
                                    <td className="py-6 text-sm font-bold text-gray-600 capitalize pr-4">{type}</td>
                                    {/* Default State */}
                                    <td className="py-6 text-center px-2">
                                        <Button
                                            variant={type}
                                            label="Button"
                                            themeState={safeTheme}
                                            showClassNames={showClassNames}
                                        />
                                    </td>
                                    {/* Hover Simulation */}
                                    <td className="py-6 text-center px-2">
                                        <Button
                                            variant={type}
                                            label="Hover"
                                            themeState={safeTheme}
                                            showClassNames={showClassNames}
                                            style={{ opacity: (safeTheme.buttonHoverOpacity || 90) / 100 }}
                                        />
                                    </td>
                                    {/* Focus Simulation */}
                                    <td className="py-6 text-center px-2">
                                        <Button
                                            variant={type}
                                            label="Focus"
                                            themeState={safeTheme}
                                            showClassNames={showClassNames}
                                            style={{ boxShadow: `0 0 0 3px ${safeTheme.primary}33` }}
                                        />
                                    </td>
                                    {/* Disabled State */}
                                    <td className="py-6 text-center px-2">
                                        <Button
                                            variant={type}
                                            label="Disabled"
                                            themeState={safeTheme}
                                            showClassNames={showClassNames}
                                            disabled
                                        />
                                    </td>
                                </tr>
                            ))}
                            {/* Icon Variations Row */}
                            <tr>
                                <td className="py-6 text-sm font-bold text-gray-600 capitalize pr-4">With Icons</td>
                                <td className="py-6 text-center px-2">
                                    <Button
                                        variant="primary"
                                        label="Leading"
                                        iconLeading={Zap}
                                        themeState={safeTheme}
                                        showClassNames={showClassNames}
                                    />
                                </td>
                                <td className="py-6 text-center px-2">
                                    <Button
                                        variant="primary"
                                        label="Trailing"
                                        iconTrailing={ArrowRight}
                                        themeState={safeTheme}
                                        showClassNames={showClassNames}
                                    />
                                </td>
                                <td className="py-6 text-center px-2">
                                    <Button
                                        variant="primary"
                                        iconLeading={Zap}
                                        themeState={safeTheme}
                                        showClassNames={showClassNames}
                                        style={{ width: '45px', paddingLeft: 0, paddingRight: 0 }}
                                    />
                                </td>
                                <td className="py-6 text-center px-2 opacity-50 text-xs text-gray-400">
                                    (Icon Only)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ContainerDevWrapper>
        </div>
    );
};