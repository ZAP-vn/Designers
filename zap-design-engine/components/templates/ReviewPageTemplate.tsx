import React from 'react';
import Header from '../Header';
import { ThemeState, TemplateConfig } from '../../types';
import { CheckCircle, ChevronRight } from 'lucide-react';

interface ReviewPageTemplateProps {
    config: TemplateConfig['reviewPage'];
    themeState: ThemeState;
}

const ReviewPageTemplate: React.FC<ReviewPageTemplateProps> = ({ config, themeState }) => {
    const { 
        title = 'Review',
        notificationText = "Everything looks good. We'll invite this team member to finish setting up their account.",
        steps = [
            { id: '1', title: 'Profile', description: "Manage this team member's basic info." },
            { id: '2', title: 'Jobs', description: "Manage this team member's role and compensation." },
            { id: '3', title: 'Access', description: "Manage what this team member can see and do across ZAP." }
        ]
    } = config || {};

    return (
        <div className="bg-[#F9FAFB] min-h-[600px] flex flex-col" style={{ fontFamily: themeState.fontFamily }}>
            <Header
                showProgress
                processName="Add Team Member"
                currentStep={4}
                totalSteps={4}
                theme={themeState}
                rightAction={
                    <button 
                        className="text-sm font-semibold"
                        style={{ 
                            backgroundColor: themeState.primary,
                            color: themeState.primaryBtnText,
                            borderRadius: `${themeState.borderRadius}px`,
                            padding: `${themeState.btnPaddingY}px ${themeState.btnPaddingX}px`,
                        }}
                    >
                        Done
                    </button>
                }
                disableSticky
            />
            <main className="flex-1 flex justify-center items-start py-12 px-4">
                <div className="w-full max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-6" style={{ color: themeState.darkText }}>
                        {title}
                    </h1>

                    <div 
                        className="flex items-start gap-4 p-4 mb-8"
                        style={{
                            backgroundColor: '#E6F9F0', // Light green
                            borderRadius: `${themeState.borderRadius}px`
                        }}
                    >
                        <CheckCircle size={20} className="text-[#059669] mt-0.5 shrink-0" />
                        <p className="text-sm text-[#047857] font-medium">
                            {notificationText}
                        </p>
                    </div>

                    <div 
                        className="bg-white border border-gray-200 divide-y divide-gray-200"
                        style={{ borderRadius: `${themeState.borderRadius}px` }}
                    >
                        {steps.map((step, index) => (
                            <button 
                                key={step.id} 
                                className="w-full flex items-center justify-between text-left p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#E6F9F0] flex items-center justify-center shrink-0">
                                        <CheckCircle size={16} className="text-[#059669]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: themeState.darkText }}>{step.title}</h3>
                                        <p className="text-sm text-gray-500">{step.description}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReviewPageTemplate;