import React, { useState, useEffect, useMemo } from 'react';
import Support from './partners/Support';
import Modal from './Modal';
import Volunteer from './Volunteer';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import "./Events.css"

const secretKey = process.env.REACT_APP_SECRET_KEY;
const ACTIVITIES_URL = "https://arkad-server.onrender.com/users/activities";

const EventsAndActivities = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionType, setActionType] = useState(null);  // Holds action type like 'volunteer' or 'donate'
  const [loading, setLoading] = useState(true);

  // Fetch events when the app loads
  useEffect(() => {
    const fetchEvents = async () => {
      if (!secretKey) return;

      try {
        const response = await axios.get(ACTIVITIES_URL);

        if (response.data.success) {
          const { iv, ciphertext } = response.data.data;
          const decryptedData = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(secretKey), {
            iv: CryptoJS.enc.Hex.parse(iv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
          }).toString(CryptoJS.enc.Utf8);

          const parsedEvents = JSON.parse(decryptedData);
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    return formattedDate;
  };

  const handleParticipate = (event, actionType) => {
    setSelectedEvent(event); // Set selected event when user clicks participate
    setActionType(actionType); // Set the action type (volunteer or donate)
  };

  const renderActionComponent = () => {
    if (actionType === 'volunteer' && selectedEvent) {
      return <Volunteer activityId={selectedEvent.id} />;  // Pass selected event's id to Volunteer component
    } else if (actionType === 'donate') {
      return <Support />;
    }
    return null;
  };

  const handleSetReminder = (event) => {
    const { description, venue, date } = event;
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2); 

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      description
    )}&dates=${startDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate
      .toISOString()
      .replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(
      `Join us at ${venue} for the event: ${description}.`
    )}&location=${encodeURIComponent(venue)}&trp=true&reminder=%7B"method"%3A"popup"%2C"minutes"%3A10080%7D`;

    window.open(googleCalendarUrl, '_blank');
  };

  const memoizedEvents = useMemo(() => events, [events]);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Upcoming Events and Activities</h2>

      {loading ? (
        <div className="loading-bubble-wrapper">
          <div className="loading-bubble"></div>
          <p className="loading-text">Fetching events for you...</p>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memoizedEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={event.image}
                alt={event.description}
                className="w-full h-40 object-cover rounded-lg mb-4 transform transition-transform hover:scale-105"
              />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">{event.venue}</p>
              <p className="text-gray-600 mb-4">{formatEventDate(event.date)}</p>
              <button
                onClick={() => handleParticipate(event, 'volunteer')}
                className="bg-[#006D5B] text-white px-4 py-2 rounded-md mb-2 mr-2 transform transition-transform hover:scale-105"
              >
                Volunteer
              </button>
              <button
                onClick={() => handleParticipate(event, 'donate')}
                className="bg-[#006D5B] text-white px-4 py-2 rounded-md mb-2 mr-2 transform transition-transform hover:scale-105"
              >
                Donate
              </button>
              <button
                onClick={() => handleSetReminder(event)}
                className="bg-[#FFD700] text-black px-4 py-2 rounded-md transform transition-transform hover:scale-105"
              >
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Participation */}
      <Modal isOpen={!!actionType && !!selectedEvent} onClose={() => { setSelectedEvent(null); setActionType(null); }}>
        {renderActionComponent()}
      </Modal>
    </div>
  );
};

export default EventsAndActivities;
