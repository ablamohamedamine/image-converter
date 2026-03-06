import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Convertino Support & Feedback',
  description: 'Have a question, feature request, or feedback about Convertino? Get in touch with us. We would love to hear from you to improve our free image converter.',
  keywords: [
    'contact Convertino',
    'Convertino support',
    'image converter feedback',
    'web developer contact',
    'Billal Chami contact',
    'Mohamed Amine Abla contact'
  ].join(', '),
  openGraph: {
    title: 'Contact Convertino',
    description: 'Have a question or suggestion? Get in touch with the creator of Convertino.',
    url: 'https://convertino.xyz/contact',
    siteName: 'Convertino',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Convertino',
    description: 'Have a question or suggestion? Get in touch with the creator of Convertino.',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}