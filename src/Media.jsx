import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';  
import "./Events.css";     

const MEDIA_URL = "https://arkad-server.onrender.com/users/media";
const secretKey = process.env.REACT_APP_SECRET_KEY; 

const Media = () => {
  const [mediaData, setMediaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 3 : 1; 
  const totalPages = Math.ceil(mediaData.length / itemsPerPage);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    getMedia();
  }, []);

  const getMedia = async () => {
    if (!secretKey) return;
    setLoading(true);

    try {
      const response = await fetch(MEDIA_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      if (result.success) {
        const { iv, ciphertext } = result.data;
        const decryptedData = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(secretKey), {
          iv: CryptoJS.enc.Hex.parse(iv),
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC,
        }).toString(CryptoJS.enc.Utf8);

        const parsedData = JSON.parse(decryptedData);
        setMediaData(parsedData);
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }
      
    } catch (error) {
      setError('Error fetching media data: ', error);  
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const currentItems = mediaData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <div className="loading-bubble-wrapper">
        <div className="loading-bubble"></div>
        <p className="loading-text">Getting media data...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="p-6">
      <br />
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Media Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              {item.media.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Media ${index + 1}`}
                  className="w-40 h-60 object-cover transform transition-transform hover:scale-105 mb-2"
                />
              ))}
              <div
                className="bg-white text-[#006D5B] px-4 py-2 rounded-t-lg"
                style={{
                  width: '100%',
                }}
              >
                <p className="text-center text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => goToPage(pageIndex)}
            className={`mx-2 px-4 py-2 rounded-full ${currentPage === pageIndex ? 'bg-[#FFD700] text-white' : 'bg-gray-300 text-gray-700'} transition-colors`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Media;
