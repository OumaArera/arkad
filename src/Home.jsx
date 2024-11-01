import React, { useState, useEffect } from 'react';
import Support from './partners/Support';
import Join from './partners/Join';
import Partner from './partners/Partner';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import background from './images/bg.jpg';
import Modal from './Modal'; 
import donate from "./images/donate.png";
import join from './images/join.png';
import partner from './images/partner.png';
import partner1 from './images/AfyaLink.png';
import partner2 from './images/old.png';

const partners = [partner1, partner2, partner1, partner1, partner2, partner1];

const Home = () => {
  const [formType, setFormType] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % partners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFormType = (type) => {
    setFormType(type);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % partners.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + partners.length) % partners.length);
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
      className="relative min-h-screen bg-cover bg-center bg-fixed text-black overflow-hidden"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      {/* Background overlay for opacity effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center">
        <motion.h1
          className="text-4xl font-extrabold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Leading Africa towards socio-economic independence through mentorship, collaboration, and sustainable innovation.
        </motion.h1>

        <motion.button
          onClick={() => navigate('/about-us')}
          className="mt-6 bg-white text-[#006D5B] px-8 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>

        {/* Donation, Join, and Partner Buttons */}
        <div className="mt-12 p-6 rounded-lg shadow-xl space-y-8 md:space-y-0 md:flex md:space-x-8 justify-center items-start">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="w-20 h-20 bg-[#006D5B] rounded-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={donate} alt="Donate Icon" className="w-12 h-12 rounded-full" />
            </motion.div>
            <p className="mt-4 font-bold text-white text-lg">Make a donation to our programs</p>
            <motion.button
              onClick={() => handleFormType('support')}
              className="mt-4 bg-[#006D5B] text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Support Us
            </motion.button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="w-20 h-20 bg-[#006D5B] rounded-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={join} alt="Join Icon" className="w-12 h-12 rounded-full" />
            </motion.div>
            <p className="mt-4 font-bold text-white text-lg">Join our cause today</p>
            <motion.button
              onClick={() => handleFormType('join')}
              className="mt-4 bg-[#006D5B] text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Us
            </motion.button>
          </div>

          <div className="flex flex-col items-center text-center">
            <motion.div
              className="w-20 h-20 bg-[#006D5B] rounded-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={partner} alt="Partner Icon" className="w-12 h-12 rounded-full" />
            </motion.div>
            <p className="mt-4 font-bold text-white text-lg">Become a partner with us</p>
            <motion.button
              onClick={() => handleFormType('partner')}
              className="mt-4 bg-[#006D5B] text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Partner with Us
            </motion.button>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-12 flex flex-col items-center space-y-4">
          <div className='mt-4 font-bold text-white text-2xl'>Our Partners</div>
          <div className="flex items-center space-x-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              &lt;
            </button>

            {/* Display Partners */}
            <div className="flex space-x-8">
              {partners.slice(currentIndex, currentIndex + 2).map((partnerImg, index) => (
                <motion.img
                  key={index}
                  src={partnerImg}
                  alt="Partner Logo"
                  className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex space-x-2 mt-4">
            {Array.from({ length: Math.ceil(partners.length / 2) }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex * 2)}
                className={`w-3 h-3 rounded-full ${currentIndex / 2 === dotIndex ? 'bg-green-500' : 'bg-gray-400'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Render the Modal */}
      <Modal isOpen={!!formType} onClose={() => setFormType(null)}>
        {renderForm()}
      </Modal>
    </div>
  );
};

export default Home;
