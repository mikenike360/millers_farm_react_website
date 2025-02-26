// src/app/page.tsx

import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Full-screen Spline Scene as the Background */}
      <Spline scene="https://prod.spline.design/pVvp5htjUsrjo6Ar/scene.splinecode" />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-12">
        <br></br>
        <br></br>
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Welcome to Miller&apos;s Farm Island Weddings
        </h1>
        <p className="mt-4 text-xl text-white drop-shadow-lg">
          Experience the rustic charm and natural beauty of our venue.
        </p>
        <a
          href="/home"
          className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Enter Site
        </a>
      </div>
    </main>
  );
}
