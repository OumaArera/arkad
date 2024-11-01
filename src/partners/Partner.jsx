import React, { useState } from 'react';

const PARTNER_URL = "https://arkad-server.onrender.com/users/partner";

const Partner = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    website: '',
    contact: '',
    location: '',
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

  // Ensure the Partnership Details field contains at least 100 words
  const validatePartnershipDetails = (text) => {
    const wordCount = text.split(' ').filter(word => word !== "").length;
    return wordCount >= 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate Partnership Details
    if (!validatePartnershipDetails(formData.partnershipDetails)) {
      setError("Partnership details should contain at least 100 words.");
      setTimeout(() => setError(""), 5000);
      setLoading(false);
      return;
    }

    const data = { 
      organizationName: formData.organizationName, 
      email: formData.email, 
      contactNumber: formData.contact, 
      website: formData.website || null, 
      location: formData.location, 
      reasonForPartnership: formData.partnershipDetails
    };

    try {
      const response = await fetch(PARTNER_URL, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          organizationName: '',
          email: '',
          website: '',
          contact: '',
          location: '',
          partnershipDetails: '',
        });
        setSuccess(result.message);
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }

    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        setError("A similar request already exists for your organization");
        setTimeout(() => setError(""), 5000);
        return;
      }
      setError('Failed to send your message. Please try again.');
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-[#006D5B]">Partner with Us</h2>
      <form onSubmit={handleSubmit}>
        {/* Organization Name */}
        <label className="block text-black font-medium mb-2">
          Organization Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder="Organization Name"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Email */}
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

        {/* Website (Optional) */}
        <label className="block text-black font-medium mb-2">
          Website (Optional)
        </label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
        />

        {/* Contact Number */}
        <label className="block text-black font-medium mb-2">
          Contact Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number (10 digits)"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          pattern="[0-9]{10}"
          required
        />

        {/* Location */}
        <label className="block text-black font-medium mb-2">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Partnership Details */}
        <label className="block text-black font-medium mb-2">
          Partnership Details <span className="text-red-500">*</span> (At least 100 words)
        </label>
        <textarea
          name="partnershipDetails"
          value={formData.partnershipDetails}
          onChange={handleChange}
          placeholder="Briefly describe the partnership details (minimum 100 words)"
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          rows="4"
          required
        ></textarea>

        {/* Success and Error Messages */}
        {success && <div className="text-green-600 mt-2 text-sm text-center">{success}</div>}
        {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#006D5B] text-white px-4 py-2 rounded-md transform transition-transform hover:scale-105"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Partner;
