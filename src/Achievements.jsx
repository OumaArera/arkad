import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';  
import "./Events.css";     

const ACHIEVEMENTS_URL = "https://arkad-server.onrender.com/users/achievement";
const secretKey = process.env.REACT_APP_SECRET_KEY; 

const Achievements = () => {
  const { id } = useParams(); 
  const [achievement, setAchievement] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    fetchAchievement(); 
  }, [id]);

  const fetchAchievement = async () => {
    if(!id) return;
    console.log("ID: ", id);
    setLoading(true);  
    try {
      const response = await fetch(`${ACHIEVEMENTS_URL}/${id}`); 
      const result = await response.json();

      if (result.success) {
        const { iv, ciphertext } = result.data;
        const decryptedData = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(secretKey), {
          iv: CryptoJS.enc.Hex.parse(iv),
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC,
        }).toString(CryptoJS.enc.Utf8);

        const parsedAchievement = JSON.parse(decryptedData);
        setAchievement(parsedAchievement);  
      } else {
        setError(result.message); 
        setTimeout(() => setError(""), 5000); 
      }
    } catch (err) {
      setError('Error fetching achievement data: ', err);  
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-bubble-wrapper">
        <div className="loading-bubble"></div>
        <p className="loading-text">Getting achievement...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }


  return (
    <section className="bg-white py-12 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-900 mb-6">Our Success Story</h2>
        {achievement ? (
          <div className="w-full md:w-1/2 p-4 bg-white text-black rounded-lg shadow-lg mx-4 my-4" style={{ minHeight: "400px" }}>
            <div className="flex flex-col items-center justify-center mb-4">
              <img
                src={achievement.image}
                alt="Achievement Activity"
                className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            </div>
            <p className="text-lg mb-2 font-semibold" style={{ fontSize: "1.125rem", color: "#333" }}>{achievement.description}</p>
            <p className="mb-2 text-sm font-medium" style={{ color: "#2D3748" }}><strong>Venue:</strong> {achievement.venue}</p>
            <p className="mb-2 text-sm font-light" style={{ color: "#4A5568" }}><strong>Date:</strong> {new Date(achievement.date).toLocaleDateString()}</p>
          </div>
        ) : (
          <p className="text-lg text-gray-500">Achievement not found</p>
        )}
      </div>
    </section>
  );
};

export default Achievements;
