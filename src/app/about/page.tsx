import Image from "next/image";
import { MapPinIcon, CakeIcon, BriefcaseIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-base-200 p-4 pt-24">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header Card */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
          <h1 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
            About Miller’s Hill Farm
          </h1>
        </div>

        {/* Owner & Venue Section */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex flex-col items-center md:w-1/2">
              <Image
                src="/owner.jpg"
                alt="Owner Barbara Miller"
                width={224}
                height={224}
                className="w-56 h-56 object-cover rounded-full border-4 border-gray-900 mt-4"
              />
              <p className="text-xl text-center text-gray-900 mt-4">
                Miller’s Farm has been a cherished, family-owned venue on Lummi Island since the 1940s. Founded by Jack Miller and now lovingly managed by owner Barbara Miller, our historic property has evolved from a working farm with thriving cattle and one of the island’s finest gardens into a versatile event space. The original airstrip and hangar now serve as a unique gathering area for weddings, corporate events, family celebrations, and other special occasions.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/island.jpg"
                alt="Lummi Island, WA"
                width={800}
                height={500}
                className="w-full h-auto object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Services Offered
            </h2>
            <ul className="list-none space-y-4 text-gray-900">
              <li className="flex items-center text-lg">
                <CakeIcon className="w-8 h-8 text-gray-900 mr-3" />
                <span className="flex-grow">
                  Create unforgettable memories with a scenic backdrop and historic charm.
                </span>
              </li>
              <li className="flex items-center text-lg">
                <BriefcaseIcon className="w-8 h-8 text-gray-900 mr-3" />
                <span className="flex-grow">
                  Host team-building retreats, meetings, or product launches in a truly inspiring environment.
                </span>
              </li>
              <li className="flex items-center text-lg">
                <MapPinIcon className="w-8 h-8 text-gray-900 mr-3" />
                <span className="flex-grow">
                  Celebrate birthdays, anniversaries, reunions, and more in a warm, welcoming space.
                </span>
              </li>
              <li className="flex items-center text-lg">
                <SparklesIcon className="w-8 h-8 text-gray-900 mr-3" />
                <span className="flex-grow">
                  Enjoy our adaptable setting for any unique event you have in mind.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Location & Call-to-Action Section */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Conveniently Located in the San Juan Islands
            </h2>
            <p className="text-xl mb-4 text-center text-gray-900">
              Our venue combines island charm with easy accessibility. Lummi Island is just a 10-minute ferry ride from Bellingham, WA—making travel convenient for guests and ensuring a smooth experience for any event.
            </p>
            <p className="text-xl mb-6 text-center text-gray-900">
              Whether planning a destination wedding or a corporate retreat, Miller’s Farm offers the perfect balance of seclusion and accessibility.
            </p>
            <p className="text-xl text-center text-gray-900">
              To discover more about our family’s legacy, visit our{" "}
              <a href="/history" className="link link-primary mx-1">
                History Page
              </a>{" "}
              or contact us to reserve your date today!
            </p>
            <p className="text-xl mt-4 text-center text-gray-900">
              For additional information on wedding and event venues in the San Juan Islands, click{" "}
              <a href="#" className="link link-primary mx-1">
                here
              </a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
