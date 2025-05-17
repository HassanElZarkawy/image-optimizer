import Script from 'next/script';

export const Analytics = () => {
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <>
      {/* Google Analytics with proper loading strategy */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
              'anonymize_ip': true
            });
          `,
        }}
      />
    </>
  );
};
