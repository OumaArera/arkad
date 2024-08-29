import React, { useState } from 'react';
import Support from './partners/Support';
import Modal from './Modal';
import Volunteer from './Volunteer';
import children from './images/children.jpg';
import home from './images/home.jpg';
import { saveAs } from 'file-saver';
import { createEvent } from 'ics';

const EventsAndActivities = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionType, setActionType] = useState(null);

  const events = [
    {
      id: 1,
      image: children,
      description: 'Tree Planting Event at Karura Forest',
      venue: 'Karura Forest, Nairobi',
      date: 'September 15, 2024',
    },
    {
      id: 2,
      image: home,
      description: 'Children’s Home Visit and Donations',
      venue: 'New Life Home, Kiambu',
      date: 'October 10, 2024',
    },
    {
      id: 3,
      image: children,
      description: 'Youth Mentorship Retreat',
      venue: 'Naivasha, Kenya',
      date: 'November 20, 2024',
    },
  ];

  const handleParticipate = (event) => {
    setSelectedEvent(event);
  };

  const handleAction = (type) => {
    setActionType(type);
  };

  const renderActionComponent = () => {
    switch (actionType) {
      case 'donate':
        return <Support />;
      case 'volunteer':
        return <Volunteer />;
      default:
        return null;
    }
  };

  const handleAddToCalendar = (event) => {
    const { description, venue, date } = event;

    // Convert the date to the format expected by ics (YYYY, M, D)
    const [month, day, year] = new Date(date).toLocaleDateString('en-US').split('/');

    const eventDetails = {
      start: [parseInt(year), parseInt(month), parseInt(day)],
      duration: { hours: 2 }, // You can customize the duration
      title: description,
      location: venue,
      description: `Join us at ${venue} for the event: ${description}.`,
    };

    createEvent(eventDetails, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      saveAs(blob, `${description}.ics`);
    });
  };

  return (
    <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Upcoming Events and Activities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
        <div key={event.id} className="bg-white shadow-lg rounded-lg p-4 ">
            <img
            src={event.image}
            alt={event.description}
            className="w-full h-40 object-cover rounded-lg mb-4 transform transition-transform hover:scale-105"
            />
            <h3 className="text-xl font-semibold mb-2">{event.description}</h3>
            <p className="text-gray-600 mb-2">{event.venue}</p>
            <p className="text-gray-600 mb-4">{event.date}</p>
            <button
            onClick={() => handleParticipate(event)}
            className="bg-[#006D5B] text-white px-4 py-2 rounded-md mb-2 mr-2"  // Add margin-right
            >
            Participate
            </button>
            <button
            onClick={() => handleAddToCalendar(event)}
            className="bg-[#FFD700] text-black px-4 py-2 rounded-md"
            >
            Add to Calendar
            </button>
        </div>
        ))}
    </div>

    {/* Modal for Participation */}
    <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">How would you like to participate?</h3>
        <button
            onClick={() => handleAction('volunteer')}
            className="bg-[#006D5B] text-white px-6 py-3 rounded-md mb-4 mr-2"  // Add margin-right
        >
            Volunteer
        </button>
        <button
            onClick={() => handleAction('donate')}
            className="bg-[#FFD700] text-black px-6 py-3 rounded-md"
        >
            Donate
        </button>
        </div>
    </Modal>

    {/* Render the Action Component */}
    <Modal isOpen={!!actionType} onClose={() => setActionType(null)}>
        {renderActionComponent()}
    </Modal>
    </div>

  );
};

export default EventsAndActivities;
