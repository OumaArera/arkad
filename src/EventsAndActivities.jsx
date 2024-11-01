import React, { useState, useEffect } from 'react';
import Support from './partners/Support';
import Modal from './Modal';
import Volunteer from './Volunteer';
import "./Events.css";
import RecentEvents from './RecentEvents';

const ACTIVITIES_URL = "https://arkad-server.onrender.com/users/activities";

const EventsAndActivities = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 2 : 1;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(ACTIVITIES_URL);
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setEvents(result.data);
        } else {
          setEvents([]);
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
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleParticipate = (event, actionType) => {
    setSelectedEvent(event);
    setActionType(actionType);
  };

  const renderActionComponent = () => {
    if (actionType === 'volunteer' && selectedEvent) {
      return <Volunteer activityId={selectedEvent.id} />;
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

  const handleShare = (event) => {
    const currentRootUrl = window.location.origin;
    const eventUrl = `${currentRootUrl}/events/${event.id}`;
    const shareMessage = `Check out this upcoming event: ${event.title}.\nLearn more at: ${eventUrl}`;
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareMessage,
        url: eventUrl,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareMessage)
        .then(() => alert('Share message copied to clipboard!'))
        .catch((error) => console.error('Error copying text:', error));
    }
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const displayedEvents = events.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Upcoming Events</h2>

      {loading ? (
        <div className="loading-bubble-wrapper">
          <div className="loading-bubble"></div>
          <p className="loading-text">Fetching events for you...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-xl font-semibold">No events currently available</p>
          <p>Stay tuned for upcoming activities and events!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
              <img
                src={event.image}
                alt={event.description}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.venue}</p>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-gray-500 mb-4"><strong>Date:</strong> {formatEventDate(event.date)}</p>
              <button
                onClick={() => handleParticipate(event, 'volunteer')}
                className="bg-[#006D5B] text-white px-4 py-2 rounded-md mb-2 mr-2 transition-transform transform hover:scale-105"
              >
                Volunteer
              </button>
              <button
                onClick={() => handleParticipate(event, 'donate')}
                className="bg-[#006D5B] text-white px-4 py-2 rounded-md mb-2 mr-2 transition-transform transform hover:scale-105"
              >
                Donate
              </button>
              <button
                onClick={() => handleSetReminder(event)}
                className="bg-[#FFD700] text-black px-4 py-2 rounded-md mb-2 mr-2 transition-transform transform hover:scale-105"
              >
                Set Reminder
              </button>
              <button
                onClick={() => handleShare(event)}
                className="bg-[#006D5B] text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
              >
                Share this event
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
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

      {/* Modal for Participation */}
      <Modal isOpen={!!actionType && !!selectedEvent} onClose={() => { setSelectedEvent(null); setActionType(null); }}>
        {renderActionComponent()}
      </Modal>

      {/* Render RecentEvents component */}
      <RecentEvents />
    </div>
  );
};

export default EventsAndActivities;
