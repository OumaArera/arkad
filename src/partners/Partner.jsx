import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;
const PARTNER_URL ="https://arkad-server.onrender.com/users/partner";

const Partner = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    website: '',
    contact: '',
    location: '',
    organizationType: '',
    partnershipDetails: '',
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(secretKey) return;
    setLoading(true);

    try {
      const data = { 
        organizationName: formData.organizationName, 
        email: formData.email, 
        contactNumber: formData.contact, 
        organizationType: formData.organizationType, 
        website: formData.website || null, 
        location: formData.location, 
        reasonForPartnership: formData.partnershipDetails
      };

      const dataStr = JSON.stringify(data);
      const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
      const encryptedData = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Hex.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }).toString();

      const payload = { iv, ciphertext: encryptedData };
      const response = await axios.post(PARTNER_URL, payload);

      if(response.data.success){
        setSuccess(response.data.message);
        setTimeout(() => setSuccess(""), 5000);
      }else{
        setError(response.data.message);
        setTimeout(() => setError(""), 5000);
      }
      
    } catch (error) {
      setError('Failed to send your message. Please try again. ', error);
      setTimeout(() => setError(""), 5000);
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-[#006D5B]">Partner with Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder="Organization Name"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
        />
        <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website (Optional)"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            pattern="[0-9]{10}"
            required
        />
        <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
        />
        <input
            type="text"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            placeholder="Organization Type"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
        />
        <textarea
            name="partnershipDetails"
            value={formData.partnershipDetails}
            onChange={handleChange}
            placeholder="Partnership Details"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            rows="4"
            required
        ></textarea>
        {success && (<div className="text-green-600 mt-2 text-sm text-center">{success}</div>)}
        {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-[#006D5B] text-black px-4 py-2 rounded-md transform transition-transform hover:scale-105">
            {loading? "Sending" : "Submit"}
        </button>
        </form>
    </div>
); };

export default Partner;       
