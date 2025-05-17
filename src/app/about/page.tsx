import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Image Processor | Free WebP Conversion & Metadata Removal',
  description: 'Learn how our privacy-focused image processing tool helps you optimize images, remove metadata, and convert to WebP format securely in your browser.',
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
          About Image Processor
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          The secure, privacy-focused way to optimize your images
        </p>
      </div>

      <div className="prose prose-lg mx-auto">
        <h2>Our Mission</h2>
        <p>
          Image Processor was created with a simple mission: to provide a free, secure, and privacy-focused tool for anyone to optimize their images without compromising their data or privacy.
        </p>

        <h2>Privacy First</h2>
        <p>
          Unlike many online image tools that process your images on their servers, Image Processor performs all operations directly in your browser. This means your images never leave your device, ensuring complete privacy and security of your data.
        </p>

        <h2>Why Remove Metadata?</h2>
        <p>
          When you take a photo with your smartphone or digital camera, the image file contains hidden metadata such as the exact location where the photo was taken, the device used, and sometimes even identifying information. By stripping this metadata before sharing your images online, you protect your privacy and reduce the risk of exposing sensitive information.
        </p>

        <h2>The Benefits of WebP</h2>
        <p>
          WebP is a modern image format developed by Google that provides superior compression compared to formats like JPEG and PNG. By converting your images to WebP, you can reduce file sizes by up to 30% while maintaining similar visual quality. This leads to faster website loading times, reduced bandwidth usage, and improved SEO rankings.
        </p>

        <h2>Smart Resizing</h2>
        <p>
          Oversized images are one of the most common causes of slow websites. Our smart resizing tool helps you optimize your images for the web by reducing their dimensions while preserving aspect ratio and quality. This is essential for creating responsive websites that load quickly on all devices.
        </p>

        <h2>Why Choose Our Image Processor?</h2>
        <ul>
          <li><strong>100% Free:</strong> No hidden fees, subscriptions, or limits</li>
          <li><strong>Privacy-Focused:</strong> All processing happens in your browser</li>
          <li><strong>No Account Required:</strong> Start optimizing immediately</li>
          <li><strong>Fast Processing:</strong> Advanced algorithms for quick results</li>
          <li><strong>Modern Technology:</strong> Built with Next.js and React for optimal performance</li>
          <li><strong>Open Source:</strong> Transparent code you can trust</li>
        </ul>
      </div>
    </div>
  );
}
