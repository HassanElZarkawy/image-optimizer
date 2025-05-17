"use client";

import { useEffect, useState } from 'react';
import { ImageProcessor } from '@/components/image-processor/processor';
import FAQSection from '@/components/faq';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Image Processor
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Optimize your images with privacy in mind - strip metadata, resize, and convert to WebP.
          </p>
        </div>

        {/* Main processor component */}
        {mounted && <ImageProcessor />}

        {/* Feature highlights */}
        <div className="mb-4 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Enhanced Privacy</h3>
            <p className="mt-2 text-gray-500">
              Strip metadata from your images including GPS location, device info, and other personal data.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">WebP Conversion</h3>
            <p className="mt-2 text-gray-500">
              Convert images to the modern WebP format, reducing file size by up to 30% while maintaining quality.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Smart Resizing</h3>
            <p className="mt-2 text-gray-500">
              Resize images with precision, maintaining aspect ratio or custom dimensions for your specific needs.
            </p>
          </div>
        </div>

        <FAQSection />

        {/* Trust and security section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Privacy is Our Priority
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                All image processing happens right in your browser. Your images are never uploaded to any server unless you explicitly choose to process them via our API.
              </p>
              <p className="text-gray-600">
                We built this tool with privacy and security in mind, ensuring your sensitive images and their embedded data remain under your control.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Why strip metadata?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Protect your privacy by removing geolocation data
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Remove device and software identifiers
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Eliminate hidden personally identifiable information
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
