import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';  
import "./Events.css";     

const LEADERSHIP_URL = "https://arkad-server.onrender.com/users/leaders";
const secretKey = process.env.REACT_APP_SECRET_KEY; 

const Leadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 3 : 1; 
  const totalPages = Math.ceil(leaders.length / itemsPerPage);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    if(!secretKey) return;
    setLoading(true);

    try {
      const response = await fetch(LEADERSHIP_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();

      if(result.success){
        const { iv, ciphertext } = result.data;
        const decryptedData = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(secretKey), {
          iv: CryptoJS.enc.Hex.parse(iv),
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC,
        }).toString(CryptoJS.enc.Utf8);

        const parsedData = JSON.parse(decryptedData);
        setLeaders(parsedData)
      }else{
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }
      
    } catch (error) {
      setError('Error fetching achievement data: ', error);  
      setTimeout(() => setError(""), 5000);
    } finally{
      setLoading(false);
    }
    
  };

  const currentLeaders = leaders.slice(
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
        <p className="loading-text">Getting our leaders...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="bg-white p-6">
      <h2 className="text-4xl flex justify-center font-bold text-[#006D5B] mb-8">
        Meet Our Team
      </h2>
      <div className="relative w-full max-w-screen-lg mx-auto gap-6"> 
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {currentLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex-col transform hover:scale-105 transition-transform duration-300"
                style={{ maxWidth: '300px' }} // Set a fixed max-width for the card
              >
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-contain rounded-lg mb-4" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#006D5B]">{leader.name}</h3>
                  <p className="text-md font-medium text-black break-words">{leader.role}</p> 
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
};

export default Leadership;
