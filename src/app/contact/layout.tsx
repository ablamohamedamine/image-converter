import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | ConvertIno Support & Feedback',
  description: 'Have a question, feature request, or feedback about ConvertIno? Get in touch with us. We would love to hear from you to improve our free image converter.',
  keywords: [
    'contact ConvertIno',
    'ConvertIno support',
    'image converter feedback',
    'web developer contact',
    'Billal Chami contact',
    'Mohamed Amine Abla contact'
  ].join(', '),
  openGraph: {
    title: 'Contact ConvertIno',
    description: 'Have a question or suggestion? Get in touch with the creator of ConvertIno.',
    url: 'https://convertino.xyz/contact',
    siteName: 'ConvertIno',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact ConvertIno',
    description: 'Have a question or suggestion? Get in touch with the creator of ConvertIno.',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}