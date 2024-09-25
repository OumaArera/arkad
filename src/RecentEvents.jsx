import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';

const RECENT_EVENTS_URL = "https://arkad-server.onrender.com/users/recent-events";

const RecentEvents = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 2 : 1; // Adjust based on screen size

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await axios.get(RECENT_EVENTS_URL);
        if (response.data.success) {
          setRecentEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching recent events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const totalPages = Math.ceil(recentEvents.length / itemsPerPage);
  const displayedEvents = recentEvents.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Recent Events</h2>

      {loading ? (
        <div className="loading-bubble-wrapper">
          <div className="loading-bubble"></div>
          <p className="loading-text">Fetching recent events for you...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-contain rounded-lg mb-4 transform transition-transform hover:scale-105"
              />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-md ${index === currentPage ? 'bg-[#006D5B] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentEvents;
