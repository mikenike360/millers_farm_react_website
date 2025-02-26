import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Miller’s Farm Island Weddings</title>
        <meta
          name="description"
          content="Get in touch with Miller’s Farm Island Weddings for more information about our venue and services."
        />
      </Head>

      <main className="flex justify-center items-start min-h-screen bg-base-200 p-4 pt-24">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header Card */}
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
            <h1 className="text-4xl font-bold text-center text-gray-900 font-mono">
              Contact Us
            </h1>
          </div>

          {/* Contact Information Card */}
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 font-mono">
              Contact Information
            </h2>
            <div className="mt-4 text-center text-gray-900 font-mono">
              <p>
                <span className="font-bold">Address:</span> 2206 Tuttle Lane, Lummi Island, Washington
              </p>
              <p>
                <span className="font-bold">Phone:</span> 1-360-739-9262
              </p>
              <p>
                <span className="font-bold">Email:</span>{' '}
                <a
                  href="mailto:info@millersfarmislandweddings.com"
                  className="text-blue-600 hover:underline"
                >
                  info@millersfarmislandweddings.com
                </a>
              </p>
              <p className="mt-2 font-bold">Business Hours:</p>
              <p>Mon–Fri: 8:30am – 5pm</p>
              <p>Sat: 9am – 12am</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900 font-mono">Send Us a Message</h2>
              <br></br>
              <p className="text-gray-900 font-mono mt-2">
                Please fill out the form below and we will get back to you shortly.
              </p>
            </div>
            <form
              action="https://formspree.io/f/xkgolerg"  // Replace with your actual Formspree endpoint
              method="POST"
              className="max-w-lg mx-auto space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
              <button
                type="submit"
                className="btn bg-gray-900 text-white w-full hover:bg-gray-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
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
}
