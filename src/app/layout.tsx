import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import NavBar from './NavBar';
import HelloBar from './components/HelloBar';
import Script from 'next/script';


const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// UPGRADED SEO METADATA
export const metadata: Metadata = {
  title: 'ConvertIno | Free Unlimited Image Converter',
  description: 'Fast, secure, and 100% free online image converter. Convert WebP, PNG, JPEG, AVIF, and SVG instantly with no registration, no email, and no limits.',
  keywords: [
    'image converter',
    'free image converter',
    'convert png to webp',
    'convert jpeg to avif',
    'bulk image compression',
    'no registration image converter',
    'client side image converter',
    'webp', 'png', 'jpeg', 'avif', 'svg'
  ].join(', '),
  openGraph: {
    title: 'ConvertIno | Free Unlimited Image Converter',
    description: 'Convert WebP, PNG, JPEG, AVIF, and SVG instantly with no registration, no email, and no limits.',
    url: 'https://convertino.xyz', 
    siteName: 'ConvertIno',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConvertIno | Free Unlimited Image Converter',
    description: 'Fast, secure, and 100% free online image converter. No registration required.',
  },
  verification: {
    google: '94wezaCKdI7AeRjZ7aVJT7x6UPfGQg5toFkbRHky3kY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-900 text-gray-100 min-h-screen transition-colors antialiased flex flex-col"
            suppressHydrationWarning>
        
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=G-MS3WQ12X24`} 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MS3WQ12X24', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* TOP ANNOUNCEMENT BAR */}
        <HelloBar />

        <header className="w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-30">
          <NavBar />
        </header>
        
        <main className="flex flex-col items-center flex-grow w-full bg-transparent">
          {children}
        </main>
        
        <footer className="w-full border-t border-zinc-800 bg-zinc-900/80 text-center py-4 text-xs text-gray-400 mt-8">
          Made with ❤️ by <a href="https://www.linkedin.com/in/billal-chami/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition">Billal Chami</a>
        </footer>
        
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </body>
    </html>
  );
}