import React from 'react';
import { ThemeState } from '../../types';
import {
    StandardInput
} from '../atoms/StandardInput';
import { CheckboxGroup, RadioGroup, ToggleGroup, SegmentControl } from '../atoms/SelectionControls';
import { QuantityStepper } from '../atoms/Steppers';
import { SliderWidget } from '../atoms/SliderWidget';
import { PhoneNumberInput } from '../PhoneNumberInput';
import { CurrencyInput } from '../CurrencyInput';
import { Mail, Lock, Eye } from 'lucide-react';

interface FormShowcaseProps {
    themeState: ThemeState;
    componentType: string;
}

export const FormShowcase: React.FC<FormShowcaseProps> = ({ themeState, componentType }) => {
    switch (componentType) {
        case 'text-input':
            return <StandardInput themeState={themeState} label="Standard Input" placeholder="Type here..." />;
        case 'email-input':
            return <StandardInput themeState={themeState} label="Email Address" type="email" icon={Mail} placeholder="john@example.com" />;
        case 'password-input':
            return <StandardInput themeState={themeState} label="Password" type="password" icon={Lock} rightIcon={Eye} placeholder="••••••••" />;
        case 'phone-input':
            return <PhoneNumberInput themeState={themeState} label="Phone Number" />;
        case 'currency-input':
            return <CurrencyInput themeState={themeState} label="Amount" />;
        case 'checkbox':
            return <CheckboxGroup themeState={themeState} />;
        case 'radio':
            return <RadioGroup themeState={themeState} />;
        case 'toggle':
            return <ToggleGroup themeState={themeState} />;
        case 'stepper':
            return <QuantityStepper themeState={themeState} label="Quantity" />;
        case 'segment':
            return <SegmentControl themeState={themeState} label="View" options={['Daily', 'Weekly']} />;
        case 'slider':
            return <SliderWidget themeState={themeState} label="Range" />;
        default:
            return (
                <div className="p-4 text-gray-400 italic text-sm border border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                    Unknown form element: <span className="font-mono ml-1 text-gray-600">{componentType}</span>
                </div>
            );
    }
};