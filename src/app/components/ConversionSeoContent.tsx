import React from 'react';

interface ConversionSeoContentProps {
  inputFormat: string;
  outputFormat: string;
}

export default function ConversionSeoContent({ inputFormat, outputFormat }: ConversionSeoContentProps) {
  const inFmt = inputFormat.toUpperCase();
  const outFmt = outputFormat.toUpperCase();

  return (
    <section className="w-full max-w-4xl mx-auto mt-24 mb-12 text-left scroll-animate opacity-0 translate-y-8 relative z-10 px-4 md:px-0">
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-8 md:p-10 shadow-xl">
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6">
          How to Convert {inFmt} to {outFmt} Free Online
        </h2>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Are you looking for a fast, reliable way to convert your <strong>{inFmt}</strong> images to <strong>{outFmt}</strong> format? 
            Our free online image converter makes it incredibly easy to transform your files with just a few clicks. 
            Whether you are a web developer optimizing a website, a designer preparing assets, or simply someone who needs 
            to reduce file sizes, converting your images to {outFmt} is the perfect solution.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">
            Why change {inFmt} to {outFmt}?
          </h3>
          <p>
            The <strong>{outFmt}</strong> image format is widely recognized for offering superior compression and quality characteristics. 
            By converting your standard {inFmt} files to {outFmt}, you can significantly reduce file sizes while maintaining excellent visual fidelity. 
            Smaller image files lead to faster page load times, lower bandwidth consumption, and improved overall website SEO scores. 
            It is highly recommended by modern web performance guidelines.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">
            Is it safe to convert my {inFmt} files here?
          </h3>
          <p>
            Yes, your privacy and security are completely guaranteed. Unlike many other online converters that force you to upload your files 
            to a remote server, our <strong>{inFmt} to {outFmt} converter</strong> runs entirely inside your web browser. 
            This means your personal images, graphics, and photos never leave your device. You get lightning-fast conversions 
            with absolutely zero risk of your data being stored, viewed, or shared by third parties.
          </p>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pro Tip
            </h4>
            <p className="text-sm text-gray-400">
              You can drag and drop multiple {inFmt} files at once into the upload area above to batch convert them to {outFmt}. 
              Adjust the compression slider to find your perfect balance between {outFmt} file size and image quality!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}