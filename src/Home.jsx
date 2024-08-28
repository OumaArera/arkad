import React, { useState } from 'react';
import Support from './partners/Support';
import Join from './partners/Join';
import Partner from './partners/Partner';
import background from "./images/test.jpg";

const Home = () => {
  const [formType, setFormType] = useState(null);

  const handleFormType = (type) => {
    setFormType(type);
  };

  const renderForm = () => {
    switch (formType) {
      case 'support':
        return <Support />;
      case 'join':
        return <Join />;
      case 'partner':
        return <Partner />;
      default:
        return null;
    }
  };

  return (
    <div
      className="p-6 min-h-screen bg-center bg-fixed"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#FFD700]/90 bg-[#006D5B]/70 p-4 rounded shadow-md">
          Welcome to Arkad Social Mentorship Program
        </h1>
        <p className="text-lg text-[#FFD700]/90 bg-[#006D5B]/70 p-4 rounded shadow-md">
          Leading Africa towards socio-economic independence through mentorship, collaboration, and sustainable innovation.
        </p>
      </header>

      <div className="text-center mb-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center">
        <button
          onClick={() => handleFormType('support')}
          className="bg-[#FFD700]/80 text-black px-4 py-2 rounded-md shadow hover:bg-[#FFD700]/90 w-full md:w-auto"
        >
          Support Us
        </button>
        <button
          onClick={() => handleFormType('join')}
          className="bg-[#FFD700]/80 text-black px-4 py-2 rounded-md shadow hover:bg-[#FFD700]/90 w-full md:w-auto"
        >
          Join Us
        </button>
        <button
          onClick={() => handleFormType('partner')}
          className="bg-[#FFD700]/80 text-black px-4 py-2 rounded-md shadow hover:bg-[#FFD700]/90 w-full md:w-auto"
        >
          Partner with Us
        </button>
      </div>

      {renderForm()}
    </div>
  );
};

export default Home;
