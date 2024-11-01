import React, { useState } from 'react';

const secretKey = process.env.REACT_APP_SECRET_KEY;
const MEMBER_URL = "https://arkad-server.onrender.com/users/member";

const Join = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate phone number format (should start with 07 or 01 and be 10 digits long)
  const validatePhoneNumber = (phone) => {
    const phonePattern = /^(07|01)[0-9]{8}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secretKey) return;
    setLoading(true);

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("Phone number must start with '07' or '01' and be 10 digits.");
      setTimeout(() => setError(""), 5000);
      setLoading(false);
      return;
    }

    // Modify the phone number to the format +2547xxxxxxx or +2541xxxxxxx
    const modifiedPhoneNumber = `254${formData.phoneNumber.slice(1)}`;

    const data = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: modifiedPhoneNumber,
    };
    Object.entries(data).forEach(([key, value]) => console.log(`${key} : ${value}`))

    try {
      

      const response = await fetch(MEMBER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => setSuccess(""), 5000);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: ''
        });
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      setError('Failed to send your message. Please try again.');
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-[#006D5B]">Join Us</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <label className="block text-black font-medium mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Email Field */}
        <label className="block text-black font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Phone Number Field */}
        <label className="block text-black font-medium mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number (07 or 01, 10 digits)"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Success and Error Messages */}
        {success && <div className="text-green-600 mt-2 text-sm text-center">{success}</div>}
        {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#006D5B] text-white px-4 py-2 rounded-md transform transition-transform hover:scale-105"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Join;
