import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import "./Events.css";

const ACHIEVEMENTS_URL = "https://arkad-server.onrender.com/users/achievement";
const secretKey = process.env.REACT_APP_SECRET_KEY;

const AboutUs = () => {
  const [achievements, setAchievements] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 2 : 1;
  const totalPages = Math.ceil(achievements.length / itemsPerPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const currentItems = achievements.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    if(!secretKey) return;
    setLoading(true);
    try {
      const response = await fetch(ACHIEVEMENTS_URL);
      const result = await response.json();

      if(result.success){
          const { iv, ciphertext } = result.data;
          const decryptedData = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(secretKey), {
              iv: CryptoJS.enc.Hex.parse(iv),
              padding: CryptoJS.pad.Pkcs7,
              mode: CryptoJS.mode.CBC,
          }).toString(CryptoJS.enc.Utf8);

          const parsedEvents = JSON.parse(decryptedData);
          Object.entries(parsedEvents).forEach(([key, value]) => console.log(`${key} : ${JSON.stringify(value)}`));
          setAchievements(parsedEvents);
      }else{
          setError(result.message);
          setTimeout(() => setError(""), 5000);
      }
    } catch (err) {
        setError(err.message);
        setTimeout(() => setError(""), 5000);
    } finally {
        setLoading(false);
    }
  };

  const handleShare = async (id) => {
    const url = `${window.location.origin}/achievement/${id}`;
    const shareData = {
      title: 'Check out this achievement!',
      text: 'Check out this achievement on our website.',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url)
        .then(() => alert('URL copied to clipboard!'))
        .catch(err => console.error("Error copying URL", err));
    }
  };

  return (
    <section className="bg-white py-12 px-6">
      {/* About Us content */}
      <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8">About Us</h2>
        <h3 className="text-3xl font-bold text-green-900 mb-6">Our Core Values</h3>
          <div className="flex flex-wrap justify-center mb-12">
            {[
              { title: "Patience", description: "With the understanding that to create viable solutions, adequate time is needed to gather knowledge and experience of the problem at hand." },
              { title: "Opportunities", description: "We treat the society’s problems as our opportunities; our goal is to create viable solutions to our people’s financial problems." },
              { title: "Commitment", description: "We are committed towards the realization of our vision, which is leading the socio-economic transformation of Africa." },
              { title: "Empathy", description: "We are inspired by our great desire to impact the lives of our people. Our biggest concern is the socioeconomic wellbeing of the people of Africa." },
              { title: "Reputation", description: "Building a strong brand that places Arkad Family as a source of solutions to Africa’s socio-economic needs." }
            ].map((value, idx) => (
              <div key={idx} className="w-full md:w-1/5 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105" style={{ borderTop:" 5px solid #2F855A", minHeight: "200px" }}>
                  <h4 className="text-2xl font-semibold mb-2 text-green-700">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-900">Motto</h3>
            <p className="text-xl text-gray-800 font-light">Inclusive, sustainable development for a prosperous Africa</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-900">Vision</h3>
            <p className="text-xl text-gray-800 font-light">To be Africa’s leader towards socioeconomic independence</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-900">Mission</h3>
            <p className="text-xl text-gray-800 font-light">To provide a social infrastructure that leverages Human Potential (HP) to solve financial problems</p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-green-900">Tagline</h3>
            <p className="text-xl text-gray-900 font-light">Kataa ufukara</p>
          </div>
          <h2 className="text-4xl font-bold text-green-900 mb-6">Our Success Stories</h2>
          {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}
        {loading? (
          <div className="loading-bubble-wrapper">
            <div className="loading-bubble"></div>
            <p className="loading-text">Getting our success stories...</p>
          </div>
          
        ):(
          <div className="text-lg leading-relaxed mb-10">
        
        <div className="flex justify-center items-center flex-wrap">
          {currentItems.map((achievement) => (
            <div key={achievement.id} className="w-full md:w-1/3 p-4 bg-white text-black rounded-lg shadow-lg mx-4 my-4" style={{ minHeight: "400px" }}>
              <div className="flex flex-col items-center justify-center mb-4">
                <img
                  src={achievement.image}
                  alt="Activity"
                  className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
              </div>
              <p className="text-lg mb-2 font-semibold" style={{ fontSize: "1.125rem", color: "#333" }}>{achievement.description}</p>
              <p className="mb-2 text-sm font-medium" style={{ color: "#2D3748" }}><strong>Venue:</strong> {achievement.venue}</p>
              <p className="mb-2 text-sm font-light" style={{ color: "#4A5568" }}><strong>Date:</strong> {new Date(achievement.date).toLocaleDateString()}</p>
              {/* Share button */}
              <button
                onClick={() => handleShare(achievement.id)}
                className="mt-4 text-white bg-green-700 hover:bg-[#006D5B] px-4 py-2 rounded-lg transition-colors"
              >
                Share or Copy Link
              </button>
            </div>
          ))}
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
        )}
      
      </div>
    </section>
  );
};

export default AboutUs;