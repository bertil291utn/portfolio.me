import Script from 'next/script';

// GA4 only loads when NEXT_PUBLIC_GA_ID (a G-XXXXXXX id) is set. The old
// Universal Analytics (UA-) fallback stopped processing data in 2023.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '1970842';
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SV || '6';

const ScriptComponent = () => {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <Script id="hotjar-analytics" strategy="lazyOnload">
        {`
          (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings = { hjid: ${HOTJAR_ID}, hjsv: ${HOTJAR_SV} };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script'); r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
          })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
        `}
      </Script>
    </>
  );
};

export default ScriptComponent;
