import { notFound } from 'next/navigation';
import { Metadata } from 'next'; 
import ConversionClient from './ConversionClient'; 
import { conversionPages } from '@/app/constants';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Generate Highly Specific SEO Metadata (Server-side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; 
  const pageData = conversionPages.find(p => p.slug === slug);

  if (!pageData) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  // Extract formats to generate hyper-specific keywords
  const [inputFormat, outputFormat] = slug.split('-to-');

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: [
      `convert ${inputFormat} to ${outputFormat}`,
      `${inputFormat} to ${outputFormat}`,
      `${inputFormat} to ${outputFormat} converter`,
      `free ${inputFormat} to ${outputFormat} online`,
      'image converter',
      'no registration',
      inputFormat,
      outputFormat
    ].join(', '),
    alternates: {
      canonical: `https://convertino.xyz/convert/${slug}`, 
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `https://convertino.xyz/convert/${slug}`,
      siteName: 'ConvertIno',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
    }
  };
}

// 2. Render Page (Server-side)
export default async function ConversionPage({ params }: Props) {
  const { slug } = await params;
  const pageData = conversionPages.find(p => p.slug === slug);

  if (!pageData) {
    notFound();
  }

  // Pass down to the Client Component
  return <ConversionClient slug={slug} pageData={pageData} />;
}