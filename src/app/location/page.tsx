import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

const LocationPage: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Miller’s Farm Island Weddings",
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
      "latitude": "48.8100",
      "longitude": "-122.6600"
    },
    "url": "https://millersfarmislandweddings.com/location",
    "telephone": "+1-123-456-7890"
  };

  return (
    <>
      <Head>
        <title>Our Location - Miller’s Farm Island Weddings</title>
        <meta
          name="description"
          content="Visit Miller’s Farm Island Weddings on Lummi Island, WA. Find our address, directions, and contact information for your next wedding or event."
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

      <main className="flex justify-center items-center min-h-screen bg-base-200 p-4 pt-24">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header Card */}
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
            <h1 className="text-4xl font-bold text-center text-gray-900 font-mono">Our Location</h1>
            <br></br>
            <p className="text-lg text-center text-gray-900 font-mono">
              Welcome to Miller’s Farm Island Weddings! Our beautiful venue is located on Lummi Island, Washington.
              Below you’ll find our address, directions, and a map to help you plan your visit.
            </p>
          </div>

          {/* Address Card */}
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 font-mono">Address</h2>
            <address className="text-center text-2xl text-gray-900 font-mono">
              <br></br>
              2206 Tuttle Lane<br />
              Lummi Island, WA 98248<br />
              USA
            </address>
          </div>

          {/* Directions Card */}
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 font-mono">Directions</h2>
            <br></br>
            <p className="text-center text-gray-900 font-mono">
              We are easily accessible via local roads. Please refer to the map below for detailed directions.
            </p>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps?q=2206+Tuttle+Lane,+Lummi+Island,+WA+98248&output=embed"
                className="w-full h-64 md:h-96 rounded-md shadow-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Miller's Farm Location Map"
              ></iframe>
            </div>
          </div>


        </div>
      </main>
    </>
  );
};

export default LocationPage;
