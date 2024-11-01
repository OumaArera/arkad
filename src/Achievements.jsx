import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Events.css";     

const ACHIEVEMENTS_URL = "https://arkad-server.onrender.com/users/achievement";

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
    setLoading(true);  
    try {
      const response = await fetch(`${ACHIEVEMENTS_URL}/${id}`); 
      const result = await response.json();

      if (result.success) {
        setAchievement(result.data);  
      } else {
        setError(result.message || "No achievements found.");
        setTimeout(() => setError(""), 5000); 
      }
    } catch (err) {
      setError('Error fetching achievement data.');
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-bubble-wrapper">
        <div className="loading-bubble"></div>
        <p className="loading-text">Retrieving your achievements...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Recent Activities</h2>
        
        {achievement && achievement.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievement.map((item, index) => (
              <div 
                key={index} 
                className="achievement-card p-4 bg-white text-black rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl" 
                style={{ minHeight: "450px" }}
              >
                <div className="flex flex-col items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt="Achievement Activity"
                    className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                    style={{ width: "220px", height: "220px", objectFit: "cover" }}
                  />
                </div>
                <p className="text-lg mb-2 font-semibold text-gray-800">{item.description}</p>
                <p className="mb-2 text-sm font-medium text-gray-700"><strong>Venue:</strong> {item.venue}</p>
                <p className="mb-2 text-sm font-light text-gray-600"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-achievement">
            <p className="text-lg text-gray-100 font-semibold">No achievements found for this user.</p>
            <p className="text-md text-gray-200 mt-2">
              Explore our upcoming events and make your mark!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
