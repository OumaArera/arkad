import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaPhone, FaTwitter, FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from './images/AfyaLink.png';
import logo2 from "./images/old.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  const partners = [
    { img: logo, url: logo },
    { img: logo2, url: logo2 },
    { img: logo, url: logo },
  ];

  const [currentPartner, setCurrentPartner] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    const partnerInterval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 20000);

    return () => clearInterval(partnerInterval);
  }, [partners.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowContactForm(false);
      }
    };

    if (showContactForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContactForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      setSubmissionStatus('Success! Your message has been sent.');
      setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
    } catch (error) {
      setSubmissionStatus('Failed to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmissionStatus(''), 5000); // Clear status message after 5 seconds
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewsletterChange = (e) => {
    setNewsletterEmail(e.target.value);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter email:', newsletterEmail);
    // You can add further actions, like sending the email to an API
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9]{10,13}$/;
    return emailPattern.test(formData.email) && phonePattern.test(formData.phoneNumber);
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="relative bg-[#006D5B] text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Partners Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Our Partners</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={partners[currentPartner].url} target="_blank" rel="noopener noreferrer">
              <img
                src={partners[currentPartner].img}
                alt="Partner logo"
                className="w-32 h-32 object-contain rounded-lg shadow-md transform transition-transform hover:scale-110"
              />
            </a>
          </div>
        </div>

        {/* Events & Activities Navigation Link */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <Link to="/events-activities" className="text-[#FFD700]">Events & Activities</Link>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-[#FFD700] text-black px-4 py-2 transform transition-transform hover:scale-105 rounded-md mb-4"
          >
            Get in Touch
          </button>
          <div className="flex flex-col items-center md:items-start mb-4">
            <a href="https://wa.me/254791693221" target="_blank" rel="noopener noreferrer" className="flex items-center mb-2">
              <FaWhatsapp className="mr-2 text-[#FFD700]" />+254 791 693 221
            </a>
            <a href="tel:+254791693221" className="flex items-center mb-2">
              <FaPhone className="mr-2 text-[#FFD700]" />+254 791 693 221
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center  md:justify-start space-x-4 mt-4">
            <a href="https://linkedin.com/company/arkadsmp" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://facebook.com/arkadsic" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://instagram.com/arkad_sic" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://tiktok.com/@Arkad_SMP" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaTiktok className="text-2xl" />
            </a>
            <a href="https://x.com/ArkadSMP" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://youtube.com/@arkadsmp" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaYoutube className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row items-center">
            <input
              type="email"
              name="newsletterEmail"
              value={newsletterEmail}
              onChange={handleNewsletterChange}
              placeholder="Enter your email"
              className="p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto border border-gray-300 rounded bg-white text-black"
              required
            />
            <button
              type="submit"
              className="bg-[#FFD700] text-black px-4 transform transition-transform hover:scale-105 py-2 rounded-md"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>

      <div className="text-center text-sm mt-4">
        © {getCurrentYear()} Arkad Family. All rights reserved.
      </div>

      {showContactForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div ref={formRef} className="bg-white p-8 rounded-lg shadow-lg text-black w-96 relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message"
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-[#006D5B] text-white px-4 py-2 rounded-md"
                disabled={!validateForm() || isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submissionStatus && (
                <div className={`mt-2 text-sm ${submissionStatus.includes('Success') ? 'text-green-500' : 'text-red-500'}`}>
                  {submissionStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
