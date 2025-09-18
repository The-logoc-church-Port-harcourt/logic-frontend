import React from 'react';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';

const EventCard = ({ image, title, date, time, venue }) => {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 animate__animated animate__fadeInUp">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-6 group-hover:bg-gradient-red group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>

        {/* Event Details */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <CalendarToday className="text-red-400 text-lg" />
            </div>
            <span className="text-sm font-medium">{date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <AccessTime className="text-blue-400 text-lg" />
            </div>
            <span className="text-sm font-medium">{time}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <LocationOn className="text-green-400 text-lg" />
            </div>
            <span className="text-sm font-medium">{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;