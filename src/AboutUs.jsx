import React from 'react';
import "./Events.css";

const AboutUs = () => {
  const coreValues = [
    { title: "Patience", description: "With the understanding that to create viable solutions, adequate time is needed to gather knowledge and experience of the problem at hand." },
    { title: "Opportunities", description: "We treat the society’s problems as our opportunities; our goal is to create viable solutions to our people’s financial problems." },
    { title: "Commitment", description: "We are committed towards the realization of our vision, which is leading the socio-economic transformation of Africa." },
    { title: "Empathy", description: "We are inspired by our great desire to impact the lives of our people. Our biggest concern is the socioeconomic wellbeing of the people of Africa." },
    { title: "Reputation", description: "Building a strong brand that places Arkad Family as a source of solutions to Africa’s socio-economic needs." }
  ];

  const largestContent = coreValues.reduce(
    (maxLength, value) => (value.description.length > maxLength ? value.description.length : maxLength), 
    0
  );

  const standardCardHeight = Math.ceil(largestContent / 15) * 20 + 120; // Adjust card height based on content size

  return (
    <section className="bg-white py-12 px-6">
      <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8">About Us</h2>
        {/* Mission and Vision as cards */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105" style={{ borderTop: "5px solid #2F855A", minHeight: "200px" }}>
              <h3 className="text-3xl font-semibold text-green-900 mb-4">Vision</h3>
              <p className="text-gray-800 text-xl font-light">To be Africa’s leader towards socioeconomic independence.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105" style={{ borderTop: "5px solid #2F855A", minHeight: "200px" }}>
              <h3 className="text-3xl font-semibold text-green-900 mb-4">Mission</h3>
              <p className="text-gray-800 text-xl font-light">To provide a social infrastructure that leverages Human Potential (HP) to solve financial problems.</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <h3 className="text-3xl font-bold text-green-900 mb-6">Our Core Values</h3>
        <div className="flex flex-wrap justify-center">
          {coreValues.map((value, idx) => (
            <div key={idx} className="w-full md:w-1/5 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105" 
                style={{ borderTop: "5px solid #2F855A", minHeight: `${standardCardHeight}px` }}>
                <h4 className="text-2xl font-semibold mb-2 text-green-700">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
