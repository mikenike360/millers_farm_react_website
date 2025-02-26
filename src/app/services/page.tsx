import React from 'react';
import Head from 'next/head';
import { 
  HomeIcon, 
  FireIcon, 
  UsersIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  LightBulbIcon, 
  BriefcaseIcon, 
  StarIcon, 
  BuildingOffice2Icon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const servicesData = [
  {
    title: '10 Acres of Lawn & Garden',
    description: 'Enjoy open lawn and garden areas with beautiful views of the San Juan Islands.',
    icon: <HomeIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'Red Barn',
    description: 'A 24 x 30 barn featuring an indoor/outdoor bar area, refrigerator, woodstove, and sliding doors to the back field.',
    icon: <BriefcaseIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'Wedding Ceremony Platform',
    description: 'A dedicated platform with a pergola that is perfect for your wedding ceremony.',
    icon: <SparklesIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'Fire Pit & S’mores Station',
    description: 'Gather around our fire pit and enjoy a cozy s’mores station with your guests.',
    icon: <FireIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'Games & Amenities',
    description: 'Includes a horseshoe pit, yard games, portable toilets, banquet tables, punch bowls, water, and electricity.',
    icon: <CheckCircleIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'On-Site Assistance',
    description: 'Venue owner on site for help and questions, with an optional wedding day coordinator available for an additional fee.',
    icon: <UsersIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'Camping Option',
    description: 'Camping is available (extra charges apply and limited to 15-20 people).',
    icon: <LightBulbIcon className="w-10 h-10 text-primary" />
  },
  {
    title: 'Special Features',
    description: 'Our venue offers exclusive features such as customizable lighting, premium sound systems, and on-site catering coordination.',
    icon: <StarIcon className="w-10 h-10 text-primary" />
  },
];

const ServicesPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wedding & Event Services</title>
        <meta name="description" content="Discover the wedding and event services offered at our venue, including beautiful outdoor spaces, barns, ceremony platforms, and more." />
      </Head>

      <main className="container mx-auto px-8 py-16 mt-16">

        {/* Header Section as a Card */}
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 font-mono">Services Offered</h1>
            <p className="text-2xl max-w-3xl mx-auto text-gray-900 font-mono">
              We can accommodate up to 200 guests for your next wedding or event. Our venue features wide-open spaces perfect for food trucks, dance floors, lawn games, and dining.
            </p>
          </div>
        </section>


        {/* Dynamic Service Cards */}
        <section className="mb-12 text-center">
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service, index) => (
              <div key={index} className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6 flex flex-row items-start space-x-4 hover:shadow-2xl transition duration-300">
                {service.icon}
                <div>
                  <h3 className="text-xl text-gray-900 font-semibold">{service.title}</h3>
                  <p className="text-gray-900">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weddings Section */}
        <section className="mb-12 relative bg-gradient-to-r from-red-400 to-orange-200 p-10 rounded-xl shadow-lg text-gray-900 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Weddings</h2>
          <p>
            A deposit is required to hold your wedding date and the final payment is due 30 days prior to your wedding. This includes Friday set-up with a two-hour rehearsal, all day Saturday, and cleanup by noon on Sunday.
          </p>
          <p>
            We can coordinate any of your rental needs, such as tables, chairs, linens, or tents. Guests provide all food and beverages. We work with excellent caterers and can coordinate food and beverages if needed. Food trucks are also a popular choice.
          </p>
          <div className="mt-6 flex justify-center">
            <a href="/vendors">
              <button className="px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                View Recommended Vendors
              </button>
            </a>
          </div>
        </section>

        {/* Policies Section */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-2"><BuildingOffice2Icon className="w-8 h-8" /> Alcohol Policy</h2>
            <p className='text-gray-900'>
              Champagne, beer, and wine are permitted. We require a banquet permit from the Department of Licensing and a licensed bartender. You can purchase a permit{' '}
              <a href="https://lcb.wa.gov/licensing/order-banquet-permits-online" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                here
              </a>.
            </p>
          </div>

          <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-2"><ShieldCheckIcon className="w-8 h-8" /> Insurance</h2>
            <p className='text-gray-900'>
              Event insurance must also be provided and is easily obtained from your homeowners insurance provider or through{' '}
              <a href="https://www.wedsafe.com/Pages/home.aspx" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                Wedsafe
              </a>.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8 px-6 bg-gradient-to-r from-red-400 to-orange-200 rounded-xl text-gray-900 max-w-lg mx-auto">
          <p className="text-lg">Let us know if you have any other questions or would like to schedule a tour!</p>
          <a href="/contact">
            <button className="mt-4 px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
              Contact Us
            </button>
          </a>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
