import React, { useState } from 'react';
import { ThemeState } from '../../types';
import { ContainerDevWrapper } from '../DevDocBanner';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { FormElementPreview } from '../FormsSection'; // Reuse wrapper

interface FeedbackShowcaseProps {
    themeState: ThemeState;
    showClassNames?: boolean;
}

export const FeedbackShowcase: React.FC<FeedbackShowcaseProps> = ({ themeState, showClassNames }) => {
    // Local simulation state
    const [activeModal, setActiveModal] = useState(false);

    // Mock Banner Component
    const AlertBanner = ({ type, title, message }: { type: 'success' | 'error' | 'warning' | 'info', title: string, message: string }) => {
        let bg = 'bg-blue-50';
        let text = 'text-blue-800';
        let border = 'border-blue-100';
        let Icon = Info;

        if (type === 'success') { bg = 'bg-green-50'; text = 'text-green-800'; border = 'border-green-100'; Icon = CheckCircle; }
        if (type === 'error') { bg = 'bg-red-50'; text = 'text-red-800'; border = 'border-red-100'; Icon = XCircle; }
        if (type === 'warning') { bg = 'bg-yellow-50'; text = 'text-yellow-800'; border = 'border-yellow-100'; Icon = AlertTriangle; }

        return (
            <div className={`flex gap-3 p-4 rounded-xl border ${bg} ${border} ${text}`}>
                <Icon size={20} className="shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm mb-1">{title}</h4>
                    <p className="text-xs opacity-90 leading-relaxed">{message}</p>
                </div>
            </div>
        );
    };

    return (
        <ContainerDevWrapper
            showClassNames={showClassNames}
            identity={{
                displayName: "FeedbackShowcase",
                filePath: "components/views/FeedbackShowcase.tsx",
                parentComponent: "UiKitSection",
                type: "Region/Section",
                architecture: "SYSTEMS // FEEDBACK"
            }}
            className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300"
        >
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <div className="mb-8 pb-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold" style={{ color: themeState.darkText }}>System Feedback</h3>
                    <div className="text-xs text-gray-400 font-mono">
                        Alerts • Toasts • Modals
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Alerts Column */}
                    <div className="space-y-6">
                        <Label>Contextual Alerts</Label>
                        <ContainerDevWrapper
                            showClassNames={showClassNames}
                            identity={{ displayName: "AlertBanner", filePath: "components/views/FeedbackShowcase.tsx", type: "Molecule/Alert" }}
                        >
                            <div className="space-y-4">
                                <AlertBanner type="success" title="Payment Successful" message="Your transaction has been processed properly. Reference #12345." />
                                <AlertBanner type="warning" title="Subscription Expiring" message="Your pro plan expires in 3 days. Renew now to avoid interruption." />
                                <AlertBanner type="error" title="Connection Failed" message="Unstable network detected. Trying to reconnect..." />
                            </div>
                        </ContainerDevWrapper>
                    </div>

                    {/* Modals & Toasts Column */}
                    <div className="space-y-10">
                        {/* Simulation Triggers */}
                        <div>
                            <Label>Interactive Triggers</Label>
                            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-wrap gap-4">
                                <button
                                    onClick={() => setActiveModal(true)}
                                    className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-bold active:scale-95 transition-transform"
                                    style={{ color: themeState.darkText }}
                                >
                                    Login Modal
                                </button>
                                <button
                                    className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-bold active:scale-95 transition-transform opacity-50 cursor-not-allowed"
                                >
                                    Toast (Global)
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Modal Simulation Overlay */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setActiveModal(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 slide-in-from-bottom-5 duration-200">
                        <button
                            onClick={() => setActiveModal(false)}
                            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-400" />
                        </button>
                        <div className="text-center space-y-4 py-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold" style={{ color: themeState.darkText }}>Modal Title</h3>
                            <p className="text-gray-500 text-sm">This is a simulated modal window demonstrating the overlay and entry animation.</p>
                            <button
                                onClick={() => setActiveModal(false)}
                                className="w-full py-2.5 rounded-xl font-bold text-white mt-4"
                                style={{ backgroundColor: themeState.primary }}
                            >
                                Acknowledge
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ContainerDevWrapper>
    );
};

const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{children}</label>
);
