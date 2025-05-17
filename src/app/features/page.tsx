import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Processor Features | Metadata Removal, WebP Conversion & More',
  description: 'Explore all features of our free image processor: metadata stripping, WebP conversion, smart resizing, batch processing, and more.',
};

export default function FeaturesPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
          Image Processor Features
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Powerful tools to optimize your images for the web
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Metadata Removal</h2>
          <p className="text-gray-600 mb-4">
            Strip all personal and sensitive metadata from your images, including GPS location, device information, and timestamps.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Removes EXIF data</li>
            <li>• Strips GPS coordinates</li>
            <li>• Eliminates device information</li>
            <li>• Removes creation timestamps</li>
          </ul>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">WebP Conversion</h2>
          <p className="text-gray-600 mb-4">
            Convert your images to the modern WebP format for superior compression and quality. Reduce file size by up to 30%.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Better compression than JPEG/PNG</li>
            <li>• Supports transparency</li>
            <li>• Adjustable quality settings</li>
            <li>• Widely supported in modern browsers</li>
          </ul>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Smart Resizing</h2>
          <p className="text-gray-600 mb-4">
            Resize your images with precision while maintaining aspect ratio or adjusting to custom dimensions.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Preserves aspect ratio</li>
            <li>• Custom width and height</li>
            <li>• Percentage-based scaling</li>
            <li>• Multiple fit modes: contain, cover, fill</li>
          </ul>
        </div>

        {/* More features... */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Browser-Based Processing</h2>
          <p className="text-gray-600 mb-4">
            All processing happens directly in your browser, ensuring your images never leave your device.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Enhanced privacy</li>
            <li>• No server uploads required</li>
            <li>• Works offline</li>
            <li>• Fast processing speeds</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quality Control</h2>
          <p className="text-gray-600 mb-4">
            Fine-tune the compression level to balance between image quality and file size.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Adjustable WebP quality</li>
            <li>• Visual quality preview</li>
            <li>• Compression statistics</li>
            <li>• Size reduction metrics</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">User-Friendly Interface</h2>
          <p className="text-gray-600 mb-4">
            Intuitive design makes image processing accessible to everyone, regardless of technical expertise.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Drag-and-drop upload</li>
            <li>• Real-time preview</li>
            <li>• Simple control options</li>
            <li>• Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
