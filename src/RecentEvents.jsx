import React, { useState, useEffect } from 'react';
import './Events.css';

const RECENT_EVENTS_URL = "https://arkad-server.onrender.com/users/achievement";

const RecentEvents = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 2 : 1;

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch(RECENT_EVENTS_URL);
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setRecentEvents(result.data);
        } else {
          setRecentEvents([]);
        }
      } catch (error) {
        console.error("Error fetching recent events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentEvents();
  }, []);

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalPages = Math.ceil(recentEvents.length / itemsPerPage);
  const displayedEvents = recentEvents.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Recent Activities</h2>

      {loading ? (
        <div className="loading-bubble-wrapper">
          <div className="loading-bubble"></div>
          <p className="loading-text">Fetching recent events for you...</p>
        </div>
      ) : recentEvents.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-xl font-semibold">No recent events available</p>
          <p>Stay tuned! We’re working on bringing new and exciting events your way.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
              />
              
              <h3 className="text-2xl font-semibold text-[#006D5B] mb-2">{event.title}</h3>
              <p className="text-gray-500 mb-4">{formatEventDate(event.date)}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Location:</strong> {event.location || 'Online'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
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
