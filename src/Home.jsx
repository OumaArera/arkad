import React, { useState } from 'react';
import Support from './partners/Support';
import Join from './partners/Join';
import Partner from './partners/Partner';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import africa from './images/africa.jpg';
import Modal from './Modal'; // Import the Modal component

const Home = () => {
  const [formType, setFormType] = useState(null);
  const navigate = useNavigate(); // to handle navigation

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
      className="relative p-6 min-h-screen bg-cover bg-center text-black overflow-hidden"
      style={{ backgroundImage: `url(${africa})` }} 
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center">
        <motion.h1
          className="text-5xl font-extrabold text-white"
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

        <div className="mt-12 p-6 bg-white rounded-lg shadow-xl space-y-8 md:space-y-0 md:flex md:space-x-8 justify-center items-start">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="text-[#006D5B] text-4xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Add your icon here, e.g., <i className="fas fa-hands-helping"></i> */}
            </motion.div>
            <p className="mt-4 font-bold text-lg">Make a donation to our programs</p>
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
              className="text-[#006D5B] text-4xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Add your icon here, e.g., <i className="fas fa-users"></i> */}
            </motion.div>
            <p className="mt-4 font-bold text-lg">Join our cause today</p>
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
              className="text-[#006D5B] text-4xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Add your icon here, e.g., <i className="fas fa-handshake"></i> */}
            </motion.div>
            <p className="mt-4 font-bold text-lg">Become a partner with us</p>
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
      </div>

      {/* Render the Modal */}
      <Modal isOpen={!!formType} onClose={() => setFormType(null)}>
        {renderForm()}
      </Modal>
    </div>
  );
};

export default Home;
