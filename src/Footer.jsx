import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhone, FaTwitter, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import logo from './images/AfyaLink.png';
import logo2 from "./images/old.png";

const Footer = () => {
  const partners = [
    { img: logo, url: logo },
    { img: logo2, url: logo2 },
    { img: logo, url: logo },
  ];

  const events = [
    { name: 'Event 1', date: '2024-09-15', venue: 'Venue 1' },
    { name: 'Event 2', date: '2024-10-20', venue: 'Venue 2' },
    { name: 'Event 3', date: '2024-11-05', venue: 'Venue 3' },
  ];

  const [currentPartner, setCurrentPartner] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    participation: '',
    phoneNumber: '',
    location: '',
    mpesaCode: '',
  });

  useEffect(() => {
    const partnerInterval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 20000);

    const eventInterval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 20000);

    return () => {
      clearInterval(partnerInterval);
      clearInterval(eventInterval);
    };
  }, [partners.length, events.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-[#006D5B] text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Partners Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Our Partners</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={partners[currentPartner].url} target="_blank" rel="noopener noreferrer">
              <img
                src={partners[currentPartner].img}
                alt="Partner logo"
                className="w-32 h-32 object-contain rounded-lg shadow-md"
              />
            </a>
          </div>
        </div>

        {/* Events and Activities Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Events & Activities</h3>
          <div className="mb-4">
            <h4 className="text-md font-semibold">{events[currentEvent].name}</h4>
            <p className="text-sm">{events[currentEvent].date}</p>
            <p className="text-sm">{events[currentEvent].venue}</p>
            <button
              onClick={() => setFormData({ ...formData, eventName: events[currentEvent].name })}
              className="mt-2 bg-[#FFD700] text-black px-4 py-2 rounded-md"
            >
              Participate
            </button>
          </div>

          {/* Form for Event Participation */}
          {formData.eventName && (
            <form onSubmit={handleSubmit} className="text-black">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="block w-full mb-2 p-2"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="block w-full mb-2 p-2"
                required
              />
              <select
                name="participation"
                value={formData.participation}
                onChange={handleInputChange}
                className="block w-full mb-2 p-2"
                required
              >
                <option value="">Select Participation</option>
                <option value="volunteer">Volunteer</option>
                <option value="donate">Donate</option>
              </select>

              {formData.participation === 'donate' && (
                <>
                  <p className="text-lg font-semibold text-black">
                    Mpesa: <span className="text-black">+254 791 693 221</span>
                  </p>
                  <input
                    type="text"
                    name="mpesaCode"
                    value={formData.mpesaCode}
                    onChange={handleInputChange}
                    placeholder="Mpesa Code"
                    className="block w-full mb-2 p-2"
                    required
                  />
                </>
              )}
              {formData.participation === 'volunteer' && (
                <>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="block w-full mb-2 p-2"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="block w-full mb-2 p-2"
                    required
                  />
                </>
              )}
              <button type="submit" className="bg-[#FFD700] text-black px-4 py-2 rounded-md">
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <div className="flex flex-col items-center md:items-start mb-4">
            <a href="https://wa.me/254791693221" target="_blank" rel="noopener noreferrer" className="flex items-center mb-2">
              <FaWhatsapp className="mr-2 text-[#FFD700]" />+254 791 693 221
            </a>
            <a href="tel:+254791693221" className="flex items-center mb-2">
              <FaPhone className="mr-2 text-[#FFD700]" />+254 791 693 221
            </a>
          </div>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700]">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700]">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700]">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700]">
              <FaTiktok className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-4">
        © {getCurrentYear()} Arkad Family. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
