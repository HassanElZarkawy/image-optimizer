// Add this component to your homepage
const FAQSection = () => {
  const faqItems = [
    {
      question: "Is Image Processor free to use?",
      answer: "Yes, Image Processor is completely free to use with no hidden fees or limitations."
    },
    {
      question: "Are my images uploaded to your servers?",
      answer: "No. All image processing happens directly in your browser. Your images never leave your device, ensuring complete privacy and security."
    },
    {
      question: "What image formats can I convert to WebP?",
      answer: "You can convert JPEG, PNG, GIF, BMP, TIFF, and SVG images to WebP format."
    },
    {
      question: "What is metadata and why should I remove it?",
      answer: "Image metadata includes information like GPS location, device details, and timestamps that can compromise your privacy when sharing images online. Removing it protects your personal information."
    },
    {
      question: "How much can WebP reduce my image file size?",
      answer: "WebP typically reduces file sizes by 25-35% compared to JPEG at equivalent visual quality, helping your website load faster."
    },
    {
      question: "Do all browsers support WebP images?",
      answer: "Yes, as of 2025, all modern browsers including Chrome, Firefox, Safari, Edge, and Opera support WebP images."
    },
    {
      question: "Can I resize multiple images at once?",
      answer: "Currently, our tool processes one image at a time to ensure optimal performance directly in your browser."
    },
    {
      question: "Will converting to WebP affect image quality?",
      answer: "WebP uses advanced compression algorithms that maintain visual quality while reducing file size. You can adjust the quality setting to balance size and appearance."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white shadow overflow-hidden rounded-lg">
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer">
                  <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-0">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Add FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQSection;
