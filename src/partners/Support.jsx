import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import logo from '../images/logo.png'; // Import your logo image

const Support = () => {
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   phoneNumber: '',
  //   amount: '',
  // });
  // const [showDownloadButton, setShowDownloadButton] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // Handle phone number conversion
  //   if (name === 'phoneNumber') {
  //     let formattedNumber = value;

  //     // Ensure that the input starts with '0' and is 10 digits long
  //     if (formattedNumber.length === 10 && formattedNumber.startsWith('0')) {
  //       // Replace the first '0' with '254'
  //       formattedNumber = '254' + formattedNumber.slice(1);
  //     }

  //     setFormData({
  //       ...formData,
  //       [name]: formattedNumber,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  // const generatePDFReceipt = () => {
  //   const doc = new jsPDF();
    
  //   // Add the logo
  //   doc.addImage(logo, 'PNG', 10, 10, 50, 25); // Adjust image size and position as needed
    
  //   // Add the receipt details
  //   doc.setFontSize(16);
  //   doc.text(`Receipt for Donation`, 105, 50, { align: 'center' });
  //   doc.setFontSize(12);
  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 70);
    
  //   doc.setFontSize(14);
  //   doc.text(`Dear ${formData.fullName},`, 10, 120);
  //   doc.text(``, 10, 130);
  //   doc.text(`Arkad Family sincerely appreciates your generous contribution`, 10, 130);
  //   doc.text(`of KES ${formData.amount} through ${formData.phoneNumber}.`, 10, 140);
  //   doc.text(`Your kindness will greatly support those in need.`, 10, 150);
  //   doc.text(`We invite you to explore our events calendar and join us`, 10, 160);
  //   doc.text(`as we extend our love and care to the community.`, 10, 170);
  //   doc.text(``, 10, 180);
  //   doc.text(`With heartfelt gratitude,`, 10, 190);
  //   doc.text(`Arkad Family`, 10, 200);
    
  //   // Save the PDF
  //   doc.save('Donation_Receipt.pdf');
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Support Form Data:', formData);

  //   // Simulate payment processing here (e.g., STK push)

  //   // After successful payment, show the download button
  //   setShowDownloadButton(true);
  // };

  // const handleDownload = () => {
  //   generatePDFReceipt();
  // };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-[#006D5B]">Support Us</h2>
      
      {/* Commenting out the form */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number (e.g., 0748800714)"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount e.g. 500"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
          required
        />

        <button type="submit" className="bg-[#006D5B] text-black px-4 py-2 rounded-md transform transition-transform hover:scale-105">
          Submit
        </button>
      </form> */}

      {/* Paybill Details */}
      <div className="flex flex-col items-start mb-4">
        <p className="text-2xl  font-bold text-[#006D5B]">
          Business Number: <span className="text-black font-bold">522533</span>
        </p>
        <p className="text-2xl  font-bold text-[#006D5B]">
          Account Number: <span className="text-black font-bold">7853823</span>
        </p>
        <p className="text-1xl font-bold text-[#006D5B]">
          Account Name: <span className="text-black font-bold">Arkad Social Mentorship</span>
        </p>
      </div>

      {/* Commenting out the download button */}
      {/* {showDownloadButton && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-md transform transition-transform hover:scale-105"
        >
          Download Receipt
        </button>
      )} */}
    </div>
  );
};

export default Support;
