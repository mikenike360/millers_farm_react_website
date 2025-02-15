import { MapPinIcon, CakeIcon, BriefcaseIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <div className="container mx-auto p-8 mt-24 bg-base-100 shadow-xl rounded-xl text-base-content">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-primary">
        About Miller’s Hill Farm
      </h1>

      {/* Owner and Island Section */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-14 gap-10">
        <div className="card w-96 bg-primary text-primary-content shadow-xl hover:shadow-2xl transition duration-300">
          <figure>
            <img
              src="/owner.jpg"
              alt="Owner Barbara Miller"
              className="w-56 h-56 object-cover rounded-full border-4 border-accent mt-4"
            />
          </figure>
          <div className="card-body">
            <p className="text-xl text-center">
              Miller’s Farm has been a cherished, family-owned venue on Lummi Island since the 1940s. Founded by Jack Miller and now lovingly managed by owner Barbara Miller, our historic property has evolved from a working farm with thriving cattle and one of the island’s finest gardens into a versatile event space. The original airstrip and hangar now serve as a unique gathering area for weddings, corporate events, family celebrations, and other special occasions.
            </p>
          </div>
        </div>

        <img
          src="/island.jpg"
          alt="Lummi Island, WA"
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Services & Location Section */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-10">
        {/* Services Card */}
        <div className="card w-full md:w-1/2 bg-secondary text-secondary-content shadow-xl hover:shadow-2xl transition duration-300">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Services Offered
            </h2>
            <ul className="list-none space-y-4">
              <li className="flex items-center text-lg">
                <CakeIcon className="w-8 h-8 text-accent mr-3" />
                <span className="flex-grow">Create unforgettable memories with a scenic backdrop and historic charm.</span>
              </li>
              <li className="flex items-center text-lg">
                <BriefcaseIcon className="w-8 h-8 text-accent mr-3" />
                <span className="flex-grow">Host team-building retreats, meetings, or product launches in a truly inspiring environment.</span>
              </li>
              <li className="flex items-center text-lg">
                <MapPinIcon className="w-8 h-8 text-accent mr-3" />
                <span className="flex-grow">Celebrate birthdays, anniversaries, reunions, and more in a warm, welcoming space.</span>
              </li>
              <li className="flex items-center text-lg">
                <SparklesIcon className="w-8 h-8 text-accent mr-3" />
                <span className="flex-grow">Enjoy our adaptable setting for any unique event you have in mind.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Location & Call-to-Action Card */}
      <div className="flex flex-col items-center justify-center mb-12 gap-10">
        <div className="card w-full md:w-1/2 bg-accent text-accent-content shadow-xl hover:shadow-2xl transition duration-300">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Conveniently Located in the San Juan Islands
            </h2>
            <p className="text-xl mb-4 text-center">
              Our venue combines island charm with easy accessibility. Lummi Island is just a 10-minute ferry ride from Bellingham, WA—making travel convenient for guests and ensuring a smooth experience for any event.
            </p>
            <p className="text-xl mb-6 text-center">
              Whether planning a destination wedding or a corporate retreat, Miller’s Farm offers the perfect balance of seclusion and accessibility.
            </p>
            <p className="text-xl text-center">
              To discover more about our family’s legacy, visit our
              <a href="/history" className="link link-primary mx-1">
                History Page
              </a>
              or contact us to reserve your date today!
            </p>
            <p className="text-xl mt-4 text-center">
              For additional information on wedding and event venues in the San Juan Islands, click
              <a href="#" className="link link-primary mx-1">
                here
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
