
import React from 'react';
import { Info, AlertCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { ContainerDevWrapper } from '../DevDocBanner';

export type InfoCardVariant = 'info' | 'warning' | 'error' | 'tip' | 'neutral';

interface InfoCardProps {
    children: React.ReactNode;
    variant?: InfoCardVariant;
    title?: string;
    className?: string;
    icon?: React.ReactNode;
    identity?: {
        displayName: string;
        parentComponent?: string;
        key?: string;
    }
}

/**
 * ATOM: InfoCard
 * Used to display contextual help, warnings, or descriptions within Inspectors.
 * Follows the "Crucial Information" design pattern: lighter background, colored border-left.
 */
export const InfoCard: React.FC<InfoCardProps> = ({
    children,
    variant = 'neutral',
    title,
    className = "",
    icon,
    identity
}) => {

    const getStyles = (v: InfoCardVariant) => {
        switch (v) {
            case 'info': return {
                bg: 'bg-blue-50',
                border: 'border-blue-300',
                text: 'text-blue-700',
                iconColor: 'text-blue-400',
                Icon: Info
            };
            case 'warning': return {
                bg: 'bg-amber-50',
                border: 'border-amber-300',
                text: 'text-amber-800',
                iconColor: 'text-amber-500',
                Icon: AlertTriangle
            };
            case 'error': return {
                bg: 'bg-red-50',
                border: 'border-red-300',
                text: 'text-red-800',
                iconColor: 'text-red-500',
                Icon: AlertCircle
            };
            case 'tip': return {
                bg: 'bg-emerald-50',
                border: 'border-emerald-300',
                text: 'text-emerald-800',
                iconColor: 'text-emerald-500',
                Icon: Lightbulb
            };
            case 'neutral': default: return {
                bg: 'bg-slate-50',
                border: 'border-slate-300',
                text: 'text-slate-600',
                iconColor: 'text-slate-400',
                Icon: Info
            };
        }
    };

    const styles = getStyles(variant);
    const IconComponent = icon ? () => <>{icon}</> : styles.Icon;

    return (
        <ContainerDevWrapper
            identity={{
                displayName: identity?.displayName || "InfoCard",
                type: "Atom",
                filePath: "components/atoms/InfoCard.tsx",
                parentComponent: identity?.parentComponent || "Unknown",
                value: variant
            }}
        >
            <div className={`${styles.bg} border-l-4 ${styles.border} p-4 rounded-r-xl flex items-start gap-3 ${className}`}>
                <div className={`shrink-0 ${styles.iconColor} mt-0.5`}>
                    <IconComponent size={16} />
                </div>
                <div className="flex-1 min-w-0">
                    {title && <h4 className={`text-xs font-bold ${styles.text} uppercase tracking-wider mb-1`}>{title}</h4>}
                    <div className={`text-xs ${styles.text} font-medium leading-relaxed`}>
                        {children}
                    </div>
                </div>
            </div>
        </ContainerDevWrapper>
    );
};
