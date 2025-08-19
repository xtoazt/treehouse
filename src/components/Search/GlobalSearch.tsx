import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  User, 
  Calendar, 
  Camera, 
  BookOpen, 
  Clock, 
  MapPin,
  Filter,
  ArrowRight,
  Zap,
  History,
  TrendingUp
} from 'lucide-react';
import { FamilyMember, Event, Story, Photo } from '../../types';

interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'story' | 'photo' | 'location';
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  date?: Date;
  location?: string;
  relevanceScore: number;
  matchedTerms: string[];
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'people' | 'events' | 'stories' | 'photos'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for search
  const mockData = {
    people: [
      { id: '1', firstName: 'John', lastName: 'Smith', birthDate: new Date('1950-01-15'), location: 'Springfield, IL' },
      { id: '2', firstName: 'Sarah', lastName: 'Johnson', birthDate: new Date('1952-03-20'), location: 'Springfield, IL' },
      { id: '3', firstName: 'Michael', lastName: 'Smith', birthDate: new Date('1980-07-10'), location: 'San Francisco, CA' },
    ],
    events: [
      { id: '1', title: 'Grandma\'s 85th Birthday', date: new Date('2024-02-15'), location: 'Family Home' },
      { id: '2', title: 'Family Reunion 2024', date: new Date('2024-07-20'), location: 'Riverside Park' },
    ],
    stories: [
      { id: '1', title: 'How Grandpa and Grandma Met', content: 'A beautiful love story from 1952...', tags: ['love', 'history'] },
      { id: '2', title: 'The Great Recipe Adventure', content: 'Our quest to recreate Aunt Maria\'s lasagna...', tags: ['recipes', 'family'] },
    ],
    photos: [
      { id: '1', caption: 'Family vacation at the beach', location: 'Malibu Beach, CA', date: new Date('2023-07-15') },
      { id: '2', caption: 'Wedding day memories', location: 'Central Park, NY', date: new Date('2005-06-12') },
    ]
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('treehouse-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      const searchResults: SearchResult[] = [];
      const searchTerms = query.toLowerCase().split(' ');

      // Search people
      if (selectedFilter === 'all' || selectedFilter === 'people') {
        mockData.people.forEach(person => {
          const searchableText = `${person.firstName} ${person.lastName} ${person.location}`.toLowerCase();
          const matchedTerms: string[] = [];
          let relevanceScore = 0;

          searchTerms.forEach(term => {
            if (searchableText.includes(term)) {
              matchedTerms.push(term);
              relevanceScore += term.length;
            }
          });

          if (matchedTerms.length > 0) {
            searchResults.push({
              id: person.id,
              type: 'person',
              title: `${person.firstName} ${person.lastName}`,
              subtitle: `Born ${person.birthDate.getFullYear()}`,
              description: person.location,
              relevanceScore,
              matchedTerms
            });
          }
        });
      }

      // Search events
      if (selectedFilter === 'all' || selectedFilter === 'events') {
        mockData.events.forEach(event => {
          const searchableText = `${event.title} ${event.location}`.toLowerCase();
          const matchedTerms: string[] = [];
          let relevanceScore = 0;

          searchTerms.forEach(term => {
            if (searchableText.includes(term)) {
              matchedTerms.push(term);
              relevanceScore += term.length;
            }
          });

          if (matchedTerms.length > 0) {
            searchResults.push({
              id: event.id,
              type: 'event',
              title: event.title,
              subtitle: event.date.toLocaleDateString(),
              description: event.location,
              date: event.date,
              location: event.location,
              relevanceScore,
              matchedTerms
            });
          }
        });
      }

      // Search stories
      if (selectedFilter === 'all' || selectedFilter === 'stories') {
        mockData.stories.forEach(story => {
          const searchableText = `${story.title} ${story.content} ${story.tags.join(' ')}`.toLowerCase();
          const matchedTerms: string[] = [];
          let relevanceScore = 0;

          searchTerms.forEach(term => {
            if (searchableText.includes(term)) {
              matchedTerms.push(term);
              relevanceScore += term.length;
            }
          });

          if (matchedTerms.length > 0) {
            searchResults.push({
              id: story.id,
              type: 'story',
              title: story.title,
              description: story.content.substring(0, 100) + '...',
              relevanceScore,
              matchedTerms
            });
          }
        });
      }

      // Search photos
      if (selectedFilter === 'all' || selectedFilter === 'photos') {
        mockData.photos.forEach(photo => {
          const searchableText = `${photo.caption} ${photo.location}`.toLowerCase();
          const matchedTerms: string[] = [];
          let relevanceScore = 0;

          searchTerms.forEach(term => {
            if (searchableText.includes(term)) {
              matchedTerms.push(term);
              relevanceScore += term.length;
            }
          });

          if (matchedTerms.length > 0) {
            searchResults.push({
              id: photo.id,
              type: 'photo',
              title: photo.caption,
              subtitle: photo.date?.toLocaleDateString(),
              description: photo.location,
              date: photo.date,
              location: photo.location,
              relevanceScore,
              matchedTerms
            });
          }
        });
      }

      // Sort by relevance score
      searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
      
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, selectedFilter]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('treehouse-recent-searches', JSON.stringify(newRecentSearches));
    
    setQuery(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the result
    console.log('Navigate to:', result);
    onClose();
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'person': return <User className="h-5 w-5" />;
      case 'event': return <Calendar className="h-5 w-5" />;
      case 'story': return <BookOpen className="h-5 w-5" />;
      case 'photo': return <Camera className="h-5 w-5" />;
      case 'location': return <MapPin className="h-5 w-5" />;
      default: return <Search className="h-5 w-5" />;
    }
  };

  const getResultColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'person': return 'from-blue-500 to-indigo-500';
      case 'event': return 'from-purple-500 to-pink-500';
      case 'story': return 'from-yellow-500 to-orange-500';
      case 'photo': return 'from-green-500 to-teal-500';
      case 'location': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const highlightMatch = (text: string, matchedTerms: string[]) => {
    if (!matchedTerms.length) return text;
    
    let highlightedText = text;
    matchedTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search family members, events, stories, photos..."
                  className="w-full pl-14 pr-12 py-4 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-2 mt-4">
                {[
                  { key: 'all', label: 'All', icon: Search },
                  { key: 'people', label: 'People', icon: User },
                  { key: 'events', label: 'Events', icon: Calendar },
                  { key: 'stories', label: 'Stories', icon: BookOpen },
                  { key: 'photos', label: 'Photos', icon: Camera }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedFilter === filter.key
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <filter.icon className="h-4 w-4" />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        index === selectedIndex ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className={`p-3 rounded-2xl bg-gradient-to-r ${getResultColor(result.type)} text-white`}>
                        {getResultIcon(result.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {highlightMatch(result.title, result.matchedTerms)}
                        </h3>
                        {result.subtitle && (
                          <p className="text-sm text-gray-500">
                            {highlightMatch(result.subtitle, result.matchedTerms)}
                          </p>
                        )}
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {highlightMatch(result.description, result.matchedTerms)}
                          </p>
                        )}
                      </div>
                      
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try searching with different keywords or check your spelling.
                  </p>
                </div>
              ) : (
                <div className="py-6 px-6">
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Find birthdays', query: 'birthday', icon: Calendar },
                        { label: 'Search photos', query: 'photos', icon: Camera },
                        { label: 'Family stories', query: 'story', icon: BookOpen },
                        { label: 'Recent events', query: 'events', icon: Clock }
                      ].map((action) => (
                        <button
                          key={action.label}
                          onClick={() => handleSearch(action.query)}
                          className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                        >
                          <action.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                {results.length > 0 && (
                  <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
