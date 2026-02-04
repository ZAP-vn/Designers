
import { UiKitData } from '../types';
import { ICON_PRESETS } from './iconPresets';

// Initialize with all available icons from presets for the merchant library
const initialIcons = ICON_PRESETS.map(preset => ({
  ...preset,
  type: 'lucide' as const
}));

export const standardUiKitData: UiKitData = {
  colors: {
    primary: '#7E22CE',
    primaryName: 'Purple',
    secondary: '#F3E8FF',
    secondaryName: 'Light Purple',
    text: '#111827',
    background: '#FFFFFF',
  },
  buttons: {
    primaryLabel: 'Get Started',
    secondaryLabel: 'Learn More',
    neutralLabel: 'Cancel',
  },
  card: {
    title: 'Standard Plan',
    subtitle: 'For small teams and startups.',
    priceLabel: 'Price',
    priceValue: 49,
    details: 'Access to all core features, standard support, and up to 10 users.',
    actionPrimary: 'Choose Plan',
    actionSecondary: 'Compare',
    tag: 'Popular',
  },
  chat: {
    userMessage: 'Hi, I have a question about my account.',
    agentMessage: 'Hello! I\'d be happy to help. What can I assist you with today?',
    inputPlaceholder: 'Type your message...',
  },
  faqs: [
    {
      question: 'What is the refund policy?',
      answer: 'You can request a full refund within 14 days of your purchase, no questions asked.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team 24/7 via email at support@example.com or through our live chat.',
    },
  ],
  services: [
    'Web Development',
    'Mobile App Design',
    'Cloud Hosting',
    'Digital Marketing',
  ],
  categories: [
    'Technology',
    'Business',
    'Creative',
    'Marketing',
  ],
  notifications: {
    success: 'Your changes have been saved successfully.',
    error: 'An error occurred. Please try again later.',
  },
  typography: {
    fontFamily: 'Inter',
    items: [
      { name: "Heading H1", token: "text-5xl", size: "48px", weight: "font-extrabold", sample: "Standard Design System", usage: "Hero Headers" },
      { name: "Heading H2", token: "text-4xl", size: "36px", weight: "font-bold", sample: "Section Titles", usage: "Section Headers" },
      { name: "Heading H3", token: "text-2xl", size: "24px", weight: "font-bold", sample: "Component Headers", usage: "Subsection Headers" },
      { name: "Heading H4", token: "text-xl", size: "20px", weight: "font-semibold", sample: "Card Titles", usage: "Card Titles" },
      { name: "Heading H5", token: "text-lg", size: "18px", weight: "font-semibold", sample: "Sub-section headings", usage: "Sub-headers" },
      { name: "Heading H6", token: "text-base", size: "16px", weight: "font-semibold", sample: "Group labels or tertiary titles", usage: "Tertiary Headers" },
      { name: "Paragraph", token: "text-base", size: "16px", weight: "font-normal", sample: "This is the standard body text for paragraphs and descriptions.", usage: "Body Text" },
      { name: "Caption", token: "text-sm", size: "14px", weight: "font-medium", sample: "Metadata and small print", usage: "Metadata & Labels" },
      { name: "Label", token: "text-xs", size: "12px", weight: "font-bold", sample: "FORM LABEL", usage: "Form Labels" }
    ],
  },
  icons: initialIcons,
  pricing: [
    {
      title: 'Basic',
      price: '$19',
      period: 'month',
      features: ['5 Projects', 'Basic Support', 'Community Access'],
      buttonLabel: 'Start Basic',
      isPopular: false
    },
    {
      title: 'Pro',
      price: '$49',
      period: 'month',
      features: ['Unlimited Projects', 'Priority Support', 'Advanced Analytics', 'Custom Domains'],
      buttonLabel: 'Go Pro',
      isPopular: true
    }
  ],
  stats: [
    { label: 'Active Users', value: '10K+' },
    { label: 'Total Projects', value: '250+' },
    { label: 'Uptime', value: '99.9%' }
  ],
  testimonials: [
    {
      quote: "The ZAP Design Engine has completely transformed how we build and iterate on our brand identities. It's incredibly fast and intuitive.",
      author: "Sarah J.",
      role: "Product Designer @ TechFlow"
    },
    {
      quote: "Layered state management makes complex customization a breeze. This is exactly what we needed for our multi-tenant platform.",
      author: "Marcus V.",
      role: "CTO @ Nexus"
    }
  ]
};
