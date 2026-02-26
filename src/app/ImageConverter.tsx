"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { toast } from 'react-toastify';

/* eslint-disable @next/next/no-img-element */

interface PreviewFile {
  file: File;
  preview: string;
}

interface ConvertedFile {
  name: string;
  blob: Blob;
  url: string;
  originalSize: number;
  compressedSize: number;
}

interface ImageConverterProps {
  fixedInputFormat?: string; // e.g., 'png'
  fixedOutputFormat?: string; // e.g., 'webp'
}

const formatMime: Record<string, string> = {
  webp: "image/webp",
  jpeg: "image/jpeg",
  png: "image/png",
  avif: "image/avif",
  svg: "image/svg+xml",
};

const formatOptions = [
  { 
    value: "webp", 
    label: "WebP (Best for web)", 
    color: "green", 
    description: "Modern format with excellent compression and quality",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    value: "jpeg", 
    label: "JPEG", 
    color: "blue", 
    description: "Widely supported, good for photographs",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    value: "png", 
    label: "PNG", 
    color: "purple", 
    description: "Lossless format, perfect for graphics and transparency",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    value: "avif", 
    label: "AVIF", 
    color: "pink", 
    description: "Next-generation format with superior compression",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    value: "svg", 
    label: "SVG (no conversion, passthrough)", 
    color: "yellow", 
    description: "Vector format, no conversion applied",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  }
];

export default function ImageConverter({ fixedInputFormat, fixedOutputFormat }: ImageConverterProps = {}) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  // Use fixedOutputFormat if provided, otherwise default to "webp"
  const [outputFormat, setOutputFormat] = useState(fixedOutputFormat || "webp");
  const [compression, setCompression] = useState(80);
  const [converted, setConverted] = useState<ConvertedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Update output format if prop changes
  useEffect(() => {
    if (fixedOutputFormat) {
      setOutputFormat(fixedOutputFormat);
    }
  }, [fixedOutputFormat]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    const totalFiles = acceptedFiles.length;
    let processedFiles = 0;
    
    const processFiles = () => {
      const batch = acceptedFiles.slice(processedFiles, processedFiles + 1);
      
      batch.forEach((file) => {
        const mapped = {
          file,
          preview: URL.createObjectURL(file),
        };
        setFiles((curr) => [...curr, mapped]);
        processedFiles++;
        
        const progress = Math.round((processedFiles / totalFiles) * 100);
        setUploadProgress(progress);
        
        if (processedFiles < totalFiles) {
          setTimeout(processFiles, 100);
        } else {
          setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
            setConverted([]);
            setProgress([]);
            toast.success(`${totalFiles} image${totalFiles > 1 ? 's' : ''} uploaded successfully!`);
          }, 200);
        }
      });
    };
    
    processFiles();
  }, []);

  // Determine accept criteria based on fixedInputFormat
  const acceptCriteria = fixedInputFormat 
    ? { [formatMime[fixedInputFormat]]: [] }
    : { "image/*": [] };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptCriteria,
    multiple: true,
  });

  React.useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
  }, [files]);

  const handleFormatChange = (format: string) => {
    // Prevent changing format if fixedOutputFormat is set
    if (fixedOutputFormat) return;
    setOutputFormat(format);
    setConverted([]);
    setProgress([]);
    setIsDropdownOpen(false);
  };

  const handleCompressionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompression(Number(e.target.value));
    setConverted([]);
    setProgress([]);
  };

  const clearAll = () => {
    setFiles([]);
    setConverted([]);
    setProgress([]);
    toast.info('Cleared all images');
  };

  const convertAll = async () => {
    setProcessing(true);
    setProgress(Array(files.length).fill(0));
    const results: ConvertedFile[] = [];
    let errorOccurred = false;
    for (let i = 0; i < files.length; i++) {
      const { file } = files[i];
      let convertedBlob: Blob | null = null;
      const outName = file.name.replace(/\.[^.]+$/, "." + outputFormat);
      const originalSize = file.size;
      let compressedSize = 0;
      try {
        if (outputFormat === "svg") {
          convertedBlob = file;
        } else {
          const options = {
            maxSizeMB: 5,
            maxWidthOrHeight: 4096,
            initialQuality: compression / 100,
            fileType: formatMime[outputFormat],
            useWebWorker: true,
            onProgress: (p: number) => {
              setProgress((curr) => {
                const next = [...curr];
                next[i] = p;
                return next;
              });
            },
          };
          convertedBlob = await imageCompression(file, options);
        }
        if (!convertedBlob) throw new Error("Conversion failed");
        compressedSize = convertedBlob.size;
        results.push({
          name: outName,
          blob: convertedBlob,
          url: URL.createObjectURL(convertedBlob),
          originalSize,
          compressedSize,
        });
      } catch {
        errorOccurred = true;
        results.push({
          name: outName,
          blob: file,
          url: URL.createObjectURL(file),
          originalSize,
          compressedSize: originalSize,
        });
      }
    }
    setConverted(results);
    setProgress(Array(files.length).fill(100));
    setProcessing(false);
    if (errorOccurred) {
      toast.error('Some images failed to convert.');
    } else {
      toast.success('All images converted successfully!');
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    converted.forEach((f) => {
      zip.file(f.name, f.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-images.zip";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('ZIP downloaded!');
  };

  const selectedFormat = formatOptions.find(option => option.value === outputFormat);

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 hover:border-zinc-600 transition-all duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div {...getRootProps()} className={`relative cursor-pointer transition-all duration-300 ${isDragActive ? 'scale-105' : 'hover:scale-[1.02]'}`}>
          <input {...getInputProps()} />
          
          <div className="text-center">
            {/* Upload Icon */}
            <div className="mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              {uploading ? (
                <div className="w-10 h-10 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              {uploading 
                ? 'Uploading...' 
                : isDragActive 
                  ? 'Drop images here' 
                  : fixedInputFormat 
                    ? `Upload ${fixedInputFormat.toUpperCase()} Images` 
                    : 'Upload Images'}
            </h3>
            <p className="text-gray-400 mb-4">
              {uploading 
                ? 'Processing your images...' 
                : `Drag & drop ${fixedInputFormat?.toUpperCase() || ''} images here, or click to browse`}
            </p>
            
            {/* Upload Progress Bar */}
            {uploading && (
              <div className="mb-4">
                <div className="w-full h-3 bg-zinc-700 rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-300 font-bold px-1">
                    {uploadProgress}%
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Uploading {uploadProgress}% complete</p>
              </div>
            )}
            
            <button 
              className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Choose Files'}
            </button>
          </div>
        </div>
      </section>

      {/* Image Previews */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-200">Uploaded Images ({files.length})</h3>
            <button 
              onClick={clearAll} 
              className="text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400" 
              aria-label="Clear all images"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-3 hover:border-zinc-600 transition-all duration-300 transform hover:scale-105"
              >
                <button
                  className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/30 rounded-full p-1 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label={`Remove image ${f.file.name}`}
                  onClick={() => {
                    setFiles(files.filter((_, i) => i !== idx));
                    setProgress(progress.filter((_, i) => i !== idx));
                    toast.info('Image removed');
                  }}
                  tabIndex={0}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <img
                  src={f.preview}
                  alt={f.file.name}
                  className="w-full h-20 object-cover rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  tabIndex={0}
                />
                
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-300 truncate block" title={f.file.name}>
                    {f.file.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{(f.file.size/1024).toFixed(1)} KB</span>
                </div>
                
                {/* Progress bar for conversion */}
                {progress[idx] === 100 ? (
                  <div className="w-full flex justify-center items-center mt-2">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                ) : (processing || progress[idx] > 0) ? (
                  <div className="w-full h-3 bg-zinc-700 rounded-full mt-2 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress[idx] || 0}%` }}
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-bold px-1">
                      {progress[idx] ? `${Math.round(progress[idx])}%` : '0%'}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Format Selection - Hidden or Read-only if fixedOutputFormat is present */}
      {!fixedOutputFormat ? (
        <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300 overflow-visible z-10">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4 text-gray-200 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Select Output Format
            </h2>
            
            {/* Custom Dropdown */}
            <div className="relative overflow-visible">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-zinc-800 border border-zinc-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-zinc-750 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${selectedFormat?.color}-500/20 text-${selectedFormat?.color}-400`}>
                    {selectedFormat?.icon}
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold">{selectedFormat?.label}</span>
                    <span className="text-xs text-gray-400">{selectedFormat?.description}</span>
                  </div>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute w-full mt-2 bg-zinc-800 border border-zinc-600 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-down">
                  {formatOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFormatChange(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition-colors duration-200 ${
                        outputFormat === option.value ? 'bg-zinc-700/50' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-${option.color}-500/20 text-${option.color}-400`}>
                        {option.icon}
                      </div>
                      <div className="text-left">
                        <span className="block font-semibold text-gray-200">{option.label}</span>
                        <span className="text-xs text-gray-400">{option.description}</span>
                      </div>
                      {outputFormat === option.value && (
                        <svg className="w-5 h-5 text-green-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* Read-only Output Format Display for Slug Pages */
        <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-all duration-300">
           <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
             </div>
             <div>
                <h3 className="text-gray-200 font-semibold">Output Format</h3>
                <p className="text-sm text-gray-400">Converting all files to <span className="text-green-400 font-bold uppercase">{fixedOutputFormat}</span></p>
             </div>
           </div>
        </section>
      )}

      {/* Compression Slider */}
      <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Compression Level
            </h2>
            <span className="px-3 py-1 bg-zinc-800 rounded-lg text-blue-400 font-mono font-bold border border-zinc-600">
              {compression}%
            </span>
          </div>
          
          <div className="relative pt-6 pb-2">
            <input
              type="range"
              min="10"
              max="100"
              value={compression}
              onChange={handleCompressionChange}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
              <span>High Compression (Small Size)</span>
              <span>Best Quality (Large Size)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      {files.length > 0 && (
        <section className="flex justify-center gap-4">
          <button
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
            onClick={convertAll}
            disabled={processing}
          >
            <span className="relative z-10 flex items-center gap-2">
              {processing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Converting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Convert Images
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 transform origin-left"></div>
          </button>
        </section>
      )}

      {/* Download Section */}
      {converted.length > 0 && (
        <section className="flex justify-center">
          <button
            className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
            onClick={downloadZip}
            disabled={converted.length === 0}
            aria-label="Download all as ZIP"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download All (ZIP)
            </span>
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 transform origin-left"></div>
          </button>
        </section>
      )}
    </div>
  );
}