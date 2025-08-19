import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users,
  Bell,
  Share2,
  Edit3,
  Trash2,
  X,
  Save,
  Camera,
  Gift,
  Heart,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { Event, FamilyMember } from '../../types';

const EventCenter: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'calendar' | 'timeline'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'upcoming' | 'past' | 'mine'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'other' as Event['type']
  });

  // Mock data
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Grandma\'s 85th Birthday Party',
        description: 'Join us in celebrating Grandma\'s milestone birthday with cake, stories, and lots of love!',
        date: new Date('2024-02-15T14:00:00'),
        location: 'Family Home - 123 Oak Street, Springfield',
        type: 'birthday',
        attendees: ['1', '2', '3', '4', '5'],
        treeId: '1',
        createdBy: 'user1',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: '2',
        title: 'Annual Family Reunion 2024',
        description: 'Our biggest family gathering of the year! Bring your appetite and your cameras. We\'ll have games, food, and plenty of catching up to do.',
        date: new Date('2024-07-20T11:00:00'),
        location: 'Riverside Park Pavilion, Central City',
        type: 'reunion',
        attendees: ['1', '2', '3', '4', '5', '6', '7'],
        treeId: '1',
        createdBy: 'user2',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        id: '3',
        title: 'Mike & Sarah\'s Anniversary Dinner',
        description: 'Celebrating 20 years of marriage with an intimate family dinner.',
        date: new Date('2024-03-12T18:30:00'),
        location: 'Giovanni\'s Italian Restaurant',
        type: 'anniversary',
        attendees: ['3', '4', '5'],
        treeId: '1',
        createdBy: 'user3',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08')
      },
      {
        id: '4',
        title: 'Emma\'s Graduation Ceremony',
        description: 'Emma is graduating from high school! Come celebrate this important milestone.',
        date: new Date('2024-06-15T10:00:00'),
        location: 'Springfield High School Auditorium',
        type: 'other',
        attendees: ['1', '2', '3', '4', '5'],
        treeId: '1',
        createdBy: 'user1',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12')
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    switch (filterBy) {
      case 'upcoming':
        return matchesSearch && event.date > now;
      case 'past':
        return matchesSearch && event.date <= now;
      case 'mine':
        return matchesSearch && event.createdBy === 'user1'; // Current user
      default:
        return matchesSearch;
    }
  });

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'birthday': return <Gift className="h-5 w-5" />;
      case 'anniversary': return <Heart className="h-5 w-5" />;
      case 'wedding': return <Heart className="h-5 w-5" />;
      case 'reunion': return <Users className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'birthday': return 'from-pink-500 to-rose-500';
      case 'anniversary': return 'from-red-500 to-pink-500';
      case 'wedding': return 'from-purple-500 to-pink-500';
      case 'reunion': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: new Date(newEvent.date),
      location: newEvent.location,
      type: newEvent.type,
      attendees: [],
      treeId: '1',
      createdBy: 'user1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setEvents([event, ...events]);
    setNewEvent({ title: '', description: '', date: '', location: '', type: 'other' });
    setIsCreating(false);
  };

  const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
    const isUpcoming = event.date > new Date();
    const daysUntil = Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="card p-6 cursor-pointer group"
        onClick={() => setSelectedEvent(event)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>
              {getEventTypeIcon(event.type)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 capitalize">{event.type}</p>
            </div>
          </div>
          
          {isUpcoming && daysUntil <= 7 && (
            <div className="px-3 py-1 bg-accent-100 text-accent-800 text-xs rounded-full font-medium">
              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
            </div>
          )}
        </div>

        <p className="text-gray-600 line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{event.date.toLocaleDateString()}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          {event.location && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{event.attendees.length} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="btn-ghost text-sm">
              Maybe
            </button>
            <button className="btn-primary text-sm">
              Attending
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Family <span className="gradient-text">Events</span>
          </h1>
          <p className="text-lg text-gray-600">
            Plan, organize, and celebrate life's special moments together
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="input-field min-w-[140px]"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Events</option>
              <option value="mine">My Events</option>
            </select>

            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="input-field min-w-[120px]"
            >
              <option value="grid">Grid View</option>
              <option value="calendar">Calendar</option>
              <option value="timeline">Timeline</option>
            </select>
          </div>

          {/* Create Event Button */}
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </button>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              Start planning your family gatherings by creating your first event!
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="btn-primary"
            >
              Create Your First Event
            </button>
          </motion.div>
        )}
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsCreating(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-gray-900">Create New Event</h2>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="btn-ghost p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                      className="input-field"
                    >
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="wedding">Wedding</option>
                      <option value="reunion">Family Reunion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Give your event a memorable title..."
                      className="input-field"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Describe your event, what to expect, what to bring..."
                      rows={4}
                      className="input-field resize-none"
                    />
                  </div>

                  {/* Date and Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Where will this event take place?"
                      className="input-field"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setIsCreating(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateEvent}
                      disabled={!newEvent.title.trim() || !newEvent.date}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Event
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${getEventTypeColor(selectedEvent.type)} text-white`}>
                      {getEventTypeIcon(selectedEvent.type)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-display font-bold text-gray-900">
                        {selectedEvent.title}
                      </h1>
                      <p className="text-sm text-gray-500 capitalize">{selectedEvent.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="btn-ghost p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About this event</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedEvent.description || 'No description provided.'}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-900">
                            {selectedEvent.date.toLocaleDateString([], { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium text-gray-900">
                            {selectedEvent.date.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedEvent.location && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">{selectedEvent.location}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Attendees</p>
                          <p className="font-medium text-gray-900">{selectedEvent.attendees.length} people</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RSVP Actions */}
                  <div className="flex items-center justify-center space-x-4 p-6 bg-gray-50 rounded-2xl">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors">
                      <CheckCircle className="h-5 w-5" />
                      <span>Going</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-colors">
                      <AlertCircle className="h-5 w-5" />
                      <span>Maybe</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors">
                      <XCircle className="h-5 w-5" />
                      <span>Can't Go</span>
                    </button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="btn-ghost flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Remind Me</span>
                      </button>
                      <button className="btn-ghost flex items-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share Event</span>
                      </button>
                    </div>
                    
                    <button className="btn-primary">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCenter;
