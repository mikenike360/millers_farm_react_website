import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      {/* Spline Scene as Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wrapper with responsive scale transformation */}
        <div className="w-full h-full transform scale-90 sm:scale-100">
          <Spline
            scene="https://prod.spline.design/D1xXDdIRayLnvElx/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-12">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            Welcome to Miller&apos;s Hill Farm!
          </h1>
          <p className="mt-4 text-base md:text-xl text-white drop-shadow-lg">
            Experience the rustic charm and natural beauty of our venue.
          </p>
          <a
            href="/home"
            className="mt-8 inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Enter Site
          </a>
        </div>
      </div>
    </main>
  );
}
