import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Heart, 
  Baby, 
  GraduationCap, 
  Briefcase,
  Home,
  Star,
  Camera,
  BookOpen,
  Users,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { FamilyMember, Event, Story, Photo } from '../../types';

interface TimelineEvent {
  id: string;
  type: 'birth' | 'death' | 'marriage' | 'education' | 'career' | 'move' | 'event' | 'story' | 'photo';
  title: string;
  description?: string;
  date: Date;
  people: string[];
  location?: string;
  photoUrl?: string;
  data?: any;
}

const FamilyTimeline: React.FC = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'births' | 'marriages' | 'events' | 'stories'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'chronological' | 'generations' | 'animated'>('chronological');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);

  // Mock data
  useEffect(() => {
    const mockEvents: TimelineEvent[] = [
      {
        id: '1',
        type: 'birth',
        title: 'John Smith Born',
        description: 'Born in Springfield General Hospital',
        date: new Date('1950-01-15'),
        people: ['1'],
        location: 'Springfield, IL',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
      },
      {
        id: '2',
        type: 'birth',
        title: 'Sarah Johnson Born',
        description: 'Born at home with midwife assistance',
        date: new Date('1952-03-20'),
        people: ['2'],
        location: 'Springfield, IL'
      },
      {
        id: '3',
        type: 'marriage',
        title: 'John & Sarah Wedding',
        description: 'Married at St. Mary\'s Church in a beautiful ceremony with 150 guests',
        date: new Date('1974-06-15'),
        people: ['1', '2'],
        location: 'St. Mary\'s Church, Springfield',
        photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
      },
      {
        id: '4',
        type: 'birth',
        title: 'Michael Smith Born',
        description: 'First child of John and Sarah',
        date: new Date('1980-07-10'),
        people: ['1', '2', '3'],
        location: 'Springfield General Hospital'
      },
      {
        id: '5',
        type: 'education',
        title: 'Michael Graduates High School',
        description: 'Graduated valedictorian from Springfield High',
        date: new Date('1998-06-15'),
        people: ['3'],
        location: 'Springfield High School'
      },
      {
        id: '6',
        type: 'marriage',
        title: 'Michael & Emily Wedding',
        description: 'Beach wedding in California',
        date: new Date('2005-08-20'),
        people: ['3', '4'],
        location: 'Malibu Beach, CA',
        photoUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400'
      },
      {
        id: '7',
        type: 'birth',
        title: 'Emma Smith Born',
        description: 'Michael and Emily\'s first daughter',
        date: new Date('2010-04-15'),
        people: ['3', '4', '5'],
        location: 'San Francisco General Hospital'
      },
      {
        id: '8',
        type: 'career',
        title: 'John Retires',
        description: 'Retired after 40 years as an engineer',
        date: new Date('2015-12-31'),
        people: ['1'],
        location: 'Springfield, IL'
      },
      {
        id: '9',
        type: 'event',
        title: 'Family Reunion 2020',
        description: 'First virtual family reunion due to pandemic',
        date: new Date('2020-07-04'),
        people: ['1', '2', '3', '4', '5'],
        location: 'Virtual (Zoom)'
      }
    ];

    // Sort events by date
    const sortedEvents = mockEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    setTimelineEvents(sortedEvents);
    setFilteredEvents(sortedEvents);
  }, []);

  // Filter events
  useEffect(() => {
    let filtered = timelineEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      switch (filterBy) {
        case 'births':
          return matchesSearch && event.type === 'birth';
        case 'marriages':
          return matchesSearch && event.type === 'marriage';
        case 'events':
          return matchesSearch && (event.type === 'event' || event.type === 'career' || event.type === 'education');
        case 'stories':
          return matchesSearch && event.type === 'story';
        default:
          return matchesSearch;
      }
    });

    if (selectedDecade) {
      filtered = filtered.filter(event => {
        const eventYear = event.date.getFullYear();
        return eventYear >= selectedDecade && eventYear < selectedDecade + 10;
      });
    }

    setFilteredEvents(filtered);
  }, [timelineEvents, searchTerm, filterBy, selectedDecade]);

  // Animated timeline playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && viewMode === 'animated') {
      interval = setInterval(() => {
        setCurrentEventIndex(prev => {
          if (prev >= filteredEvents.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, viewMode, filteredEvents.length]);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'birth': return <Baby className="h-5 w-5" />;
      case 'death': return <Star className="h-5 w-5" />;
      case 'marriage': return <Heart className="h-5 w-5" />;
      case 'education': return <GraduationCap className="h-5 w-5" />;
      case 'career': return <Briefcase className="h-5 w-5" />;
      case 'move': return <Home className="h-5 w-5" />;
      case 'event': return <Calendar className="h-5 w-5" />;
      case 'story': return <BookOpen className="h-5 w-5" />;
      case 'photo': return <Camera className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'birth': return 'from-green-500 to-emerald-500';
      case 'death': return 'from-gray-500 to-slate-500';
      case 'marriage': return 'from-pink-500 to-rose-500';
      case 'education': return 'from-blue-500 to-indigo-500';
      case 'career': return 'from-purple-500 to-violet-500';
      case 'move': return 'from-orange-500 to-amber-500';
      case 'event': return 'from-cyan-500 to-teal-500';
      case 'story': return 'from-yellow-500 to-orange-500';
      case 'photo': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getDecades = () => {
    const decades = new Set<number>();
    timelineEvents.forEach(event => {
      const decade = Math.floor(event.date.getFullYear() / 10) * 10;
      decades.add(decade);
    });
    return Array.from(decades).sort();
  };

  const TimelineEventCard: React.FC<{ 
    event: TimelineEvent; 
    index: number; 
    isLeft?: boolean;
    isActive?: boolean;
  }> = ({ event, index, isLeft = false, isActive = false }) => (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ 
        opacity: isActive && viewMode === 'animated' ? 1 : viewMode !== 'animated' ? 1 : 0.3,
        x: 0,
        scale: isActive && viewMode === 'animated' ? 1.05 : 1
      }}
      transition={{ delay: index * 0.1 }}
      className={`relative ${isLeft ? 'text-right' : 'text-left'}`}
    >
      {/* Timeline connector */}
      <div className={`absolute top-6 w-4 h-4 bg-white border-4 border-primary-500 rounded-full z-10 ${
        isLeft ? '-right-2' : '-left-2'
      }`} />
      
      {/* Event card */}
      <div 
        className={`card p-6 cursor-pointer group hover:scale-105 transition-all duration-300 ${
          isActive && viewMode === 'animated' ? 'ring-2 ring-primary-500 shadow-2xl' : ''
        } ${isLeft ? 'mr-8' : 'ml-8'}`}
        onClick={() => setSelectedEvent(event)}
      >
        <div className={`flex items-start space-x-4 ${isLeft ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${getEventColor(event.type)} text-white flex-shrink-0`}>
            {getEventIcon(event.type)}
          </div>
          
          <div className={`flex-1 min-w-0 ${isLeft ? 'text-right' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {event.title}
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>
            
            <div className={`flex flex-wrap gap-2 text-xs text-gray-500 ${isLeft ? 'justify-end' : ''}`}>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{event.date.toLocaleDateString()}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{event.people.length} people</span>
              </div>
            </div>
          </div>
        </div>
        
        {event.photoUrl && (
          <div className="mt-4">
            <img
              src={event.photoUrl}
              alt={event.title}
              className="w-full h-32 object-cover rounded-xl"
            />
          </div>
        )}
      </div>
    </motion.div>
  );

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
            Family <span className="gradient-text">Timeline</span>
          </h1>
          <p className="text-lg text-gray-600">
            Journey through your family's history chronologically
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search timeline events..."
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
                <option value="births">Births</option>
                <option value="marriages">Marriages</option>
                <option value="events">Major Events</option>
                <option value="stories">Stories</option>
              </select>

              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as any)}
                className="input-field min-w-[140px]"
              >
                <option value="chronological">Chronological</option>
                <option value="generations">By Generation</option>
                <option value="animated">Animated</option>
              </select>
            </div>

            {/* Animation Controls */}
            {viewMode === 'animated' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentEventIndex(0);
                    setIsPlaying(false);
                  }}
                  className="btn-secondary"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Decade Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDecade(null)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedDecade === null
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Years
            </button>
            {getDecades().map(decade => (
              <button
                key={decade}
                onClick={() => setSelectedDecade(decade)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedDecade === decade
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {decade}s
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 h-full rounded-full" />
          
          {/* Timeline events */}
          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
                isActive={viewMode === 'animated' && index === currentEventIndex}
              />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to see family timeline events.
            </p>
          </motion.div>
        )}
      </div>

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
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${getEventColor(selectedEvent.type)} text-white`}>
                      {getEventIcon(selectedEvent.type)}
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
                    ×
                  </button>
                </div>

                {selectedEvent.photoUrl && (
                  <div className="mb-6">
                    <img
                      src={selectedEvent.photoUrl}
                      alt={selectedEvent.title}
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {selectedEvent.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedEvent.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <p className="text-sm text-gray-500">People Involved</p>
                        <p className="font-medium text-gray-900">{selectedEvent.people.length} people</p>
                      </div>
                    </div>
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

export default FamilyTimeline;
