import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

const LocationPage: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Miller's Farm Island Weddings",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2206 Tuttle Lane",
      "addressLocality": "Lummi Island",
      "addressRegion": "WA",
      "postalCode": "98248",
      "addressCountry": "USA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      // Update these coordinates if you have precise ones
      "latitude": "48.8100",
      "longitude": "-122.6600"
    },
    "url": "https://millersfarmislandweddings.com/location",
    "telephone": "+1-123-456-7890"
  };

  return (
    <>
      <Head>
        <title>Our Location - Miller's Farm Island Weddings</title>
        <meta
          name="description"
          content="Visit Miller's Farm Island Weddings on Lummi Island, WA. Find our address, directions, and contact information for your next wedding or event."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://millersfarmislandweddings.com/location" />
      </Head>

      {/* JSON‑LD Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '8rem' }}>
        <h1>Our Location</h1>
        <p>
          Welcome to Miller's Farm Island Weddings! Our beautiful venue is located on Lummi Island, Washington.
          Below you'll find our address, directions, and a map to help you plan your visit.
        </p>

        <section>
          <h2>Address</h2>
          <address>
            2206 Tuttle Lane<br />
            Lummi Island, WA 98248<br />
            USA
          </address>
        </section>

        <section>
          <h2>Directions</h2>
          <p>
            We are easily accessible via local roads. Please refer to the map below for detailed directions.
          </p>
          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps?q=2206+Tuttle+Lane,+Lummi+Island,+WA+98248&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Miller's Farm Location Map"
          ></iframe>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or need further assistance, please call us at <a href="tel:+11234567890">+1-123-456-7890</a>.
          </p>
        </section>
      </main>
    </>
  );
};

export default LocationPage;
