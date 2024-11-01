import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import logo from './images/AfyaLink.png';
import logo2 from "./images/old.png";
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

const secretKey = process.env.REACT_APP_SECRET_KEY;
const MESSAGE_URL = "https://arkad-server.onrender.com/users/message";
const SUBSCRIPTION_URL = "https://arkad-server.onrender.com/users/subscribe";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formRef = useRef(null);

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
    if (!secretKey) return;
    setIsSubmitting(true);
    const dataToEncrypt = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      message: formData.message
    };

    try {
      const dataStr = JSON.stringify(dataToEncrypt);
      const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
      const encryptedData = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Hex.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }).toString();

      const payload = { iv, ciphertext: encryptedData };

      const response = await fetch(MESSAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.statusCode === 201) {
        setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
        setSuccess(result.message);
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }
      
    } catch (error) {
      setError('Failed to send your message. Please try again.');
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!secretKey) return;
    setIsSubmitting(true);

    const data = { email: newsletterEmail };

    try {
      const dataStr = JSON.stringify(data);
      const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
      const encryptedData = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Hex.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }).toString();

      const payload = { iv, ciphertext: encryptedData };

      const response = await fetch(SUBSCRIPTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setNewsletterEmail("");
        setTimeout(() => setSuccess(""), 5000);
        alert(result.message);
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
        alert(result.message);
      }
      
    } catch (error) {
      alert(`There was an error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9]{10,13}$/;
    return emailPattern.test(formData.email) && phonePattern.test(formData.phoneNumber);
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="relative bg-[#006D5B] text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Events & Activities Navigation Link */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <Link to="/events-activities" className="text-[#FFD700]">Events & Activities</Link>
          <Link to="/media" className="text-[#FFD700]">Media Gallery</Link>
          <Link to="/about-us" className="text-[#FFD700]">About Arkad CBO</Link>
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
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="https://linkedin.com/company/arkadsmp" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://x.com/ArkadSMP" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaXTwitter className='text-2xl' />
            </a>
            <a href="https://facebook.com/arkadsic" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://tiktok.com/@Arkad_SMP" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaTiktok className="text-2xl" />
            </a>
            <a href="https://instagram.com/arkad_sic" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transform transition-transform hover:scale-125">
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="mt-6 md:mt-0 md:col-span-3 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2 text-center md:text-left">Subscribe to our Newsletter</h3>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start">
            <input
              type="email"
              name="newsletterEmail"
              value={newsletterEmail}
              onChange={handleNewsletterChange}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black mb-2 md:mb-0 md:mr-2"
            />
            <button
              type="submit"
              className="bg-[#FFD700] text-black px-4 py-2 transform transition-transform hover:scale-105 rounded-md"
              disabled={isSubmitting}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-[#FFD700] pt-6">
        <div className="flex items-center justify-center mb-2">
          <img src={logo} alt="Arkad Logo" className="h-6" />
          <img src={logo2} alt="Old Logo" className="h-6 ml-2" />
        </div>
        <p className="text-sm">&copy; {getCurrentYear()} Arkad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
