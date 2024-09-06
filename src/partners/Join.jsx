import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const secretKey = process.env.REACT_APP_SECRET_KEY;
const MEMBER_URL ="https://arkad-server.onrender.com/users/member";

const Join = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    location: '',
    age: '',
    nationality: "",
    reasonForJoining: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!secretKey) return;
    setLoading(true);

    const data ={
      firstName: formData.firstName,
      middleName: formData.middleName || null,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      location: formData.location,
      age: formData.age,
      nationality: formData.nationality,
      reasonForJoining: formData.reasonForJoining
    }

    try {
      const dataStr = JSON.stringify(data);
      const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
      const encryptedData = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Hex.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }).toString();

      const payload = { iv, ciphertext: encryptedData };

      const response = await axios.post(MEMBER_URL, payload);

      if(response.data.statusCode === 201){
        setSuccess(response.data.message);
        setTimeout(() => setSuccess(""), 5000);
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          gender: '',
          location: '',
          age: '',
          nationality: "",
          reasonForJoining: ""
        });
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
      <h2 className="text-2xl font-bold mb-4 text-[#006D5B]">Join Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Middle Name (Optional)"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
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
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          pattern="[0-9]{10}"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer not to say">Prefer not to say</option>
          <option value="other">Other</option>
        </select>
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
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          min="5"
          max="99"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          placeholder="Nationality e.g. Kenyan"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          type="text"
          name="reasonForJoining"
          value={formData.reasonForJoining}
          onChange={handleChange}
          placeholder="Why you want to join us?"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          rows="4"
          required
        />
        {success && (<div className="text-green-600 mt-2 text-sm text-center">{success}</div>)}
        {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-[#006D5B] text-black px-4 py-2 rounded-md transform transition-transform hover:scale-105">
          {loading? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Join;
