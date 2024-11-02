import React, { useState } from 'react';


const VOLUNTEER_URL = "https://arkad-server.onrender.com/users/volunteer";

const Volunteer = ({ activityId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(07|01)\d{8}$/; // Regex to check if phone number starts with 07 or 01 and is 10 digits long
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityId) return;

    const { fullName, phoneNumber, email } = formData;

    // Validate the phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must start with 07 or 01 and be 10 digits long.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    // Format phone number
    const formattedPhoneNumber = phoneNumber.replace(/^0/, '254'); // Replace leading zero with 254

    setLoading(true);

    const data = {
      fullName,
      phoneNumber: formattedPhoneNumber,
      email,
      activityId
    };

    try {
      const response = await fetch(VOLUNTEER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
        });
        setMessage(result.message);
        setTimeout(() => setMessage(""), 5000);
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      setError(`There was an error: ${error}`);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Volunteer Information</h2>
      
      {/* Full Name Input */}
      <label className="mb-2">
        Full Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="p-2 mb-4 border border-gray-300 rounded"
        required
      />

      {/* Phone Number Input */}
      <label className="mb-2">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="p-2 mb-4 border border-gray-300 rounded"
        required
      />

      {/* Email Input */}
      <label className="mb-2">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 mb-4 border border-gray-300 rounded"
      />
      
      {/* Messages */}
      {message && <div className="text-green-600 mt-2 text-sm text-center">{message}</div>}
      {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}
      
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-[#006D5B] text-white px-4 py-2 rounded-md"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default Volunteer;
