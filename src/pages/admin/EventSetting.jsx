// EventSetting.jsx
import React, { useState } from 'react';
import EventCard from '../../components/EventCard';
import CreateEventModal from './CreateEventModal'; // New import

// Dummy event data for admin view
const adminEventsData = [
  {
    image: "/assets/DSC_1730.jpg",
    title: "Youth Meeting",
    date: "Every Saturday",
    time: "5:00 PM",
    venue: "Main Hall"
  },
  {
    image: "/assets/DSC_1785.jpg",
    title: "Prayer Vigil",
    date: "Monthly",
    time: "8:00 PM",
    venue: "Chapel"
  },
  {
    image: "/assets/DSC_1869.jpg",
    title: "Bible Study",
    date: "Wednesdays",
    time: "7:00 PM",
    venue: "Classroom 2"
  }
];

const EventSetting = () => {
  const [events, setEvents] = useState(adminEventsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateEvent = (newEvent) => {
    // In a real app, you'd send this to your backend
    const eventWithId = {
      ...newEvent,
      id: events.length + 1,
      // You might want to handle image upload differently in production
      image: newEvent.image ? URL.createObjectURL(newEvent.image) : "/assets/default-event.jpg"
    };
    setEvents([...events, eventWithId]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Event Settings</h1>
      <p className="text-gray-300 mb-6">Configure events, schedules, and details here.</p>
      
      {/* Event Cards Grid for Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <EventCard
            key={index}
            image={event.image}
            title={event.title}
            date={event.date}
            time={event.time}
            venue={event.venue}
          />
        ))}
      </div>
      
      <button 
        onClick={openModal}
        className="mt-8 bg-gradient-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Create New Event
      </button>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleCreateEvent}
      />
    </div>
  );
};

export default EventSetting;