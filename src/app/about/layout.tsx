import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ConvertIno | The Developer Behind the Tool',
  description: 'Learn more about ConvertIno and its creator, Billal Chami. Discover why we built a 100% free, secure, client-side image converter for developers and designers.',
  keywords: [
    'about ConvertIno',
    'Billal Chami',
    'free image converter creator',
    'client-side image processing',
    'web development tools',
    'privacy first image converter'
  ].join(', '),
  openGraph: {
    title: 'About ConvertIno | The Developer Behind the Tool',
    description: 'Discover why we built a 100% free, secure, client-side image converter.',
    url: 'https://convertino.xyz/about',
    siteName: 'ConvertIno',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ConvertIno',
    description: 'Discover the story behind the ultimate free image converter.',
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}