import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Heart, 
  ArrowRight, 
  Search, 
  Filter,
  Eye,
  Share2,
  Download,
  RotateCcw
} from 'lucide-react';
import { FamilyMember, Perspective } from '../../types';

const PerspectivesView: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<FamilyMember | null>(null);
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockMembers: FamilyMember[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        gender: 'male',
        isAlive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1',
        tags: []
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Smith',
        gender: 'female',
        isAlive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1',
        tags: []
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Johnson',
        gender: 'male',
        isAlive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1',
        tags: []
      }
    ];

    setSelectedPerson(mockMembers[0]);

    // Generate perspectives
    const mockPerspectives: Perspective[] = [
      {
        id: '1',
        personId: '1',
        targetPersonId: '2',
        relationship: 'Spouse',
        distance: 1,
        path: ['1', '2']
      },
      {
        id: '2',
        personId: '1',
        targetPersonId: '3',
        relationship: 'Brother-in-law',
        distance: 2,
        path: ['1', '2', '3']
      },
      {
        id: '3',
        personId: '2',
        targetPersonId: '1',
        relationship: 'Spouse',
        distance: 1,
        path: ['2', '1']
      },
      {
        id: '4',
        personId: '3',
        targetPersonId: '1',
        relationship: 'Brother-in-law',
        distance: 2,
        path: ['3', '2', '1']
      }
    ];

    setPerspectives(mockPerspectives);
  }, []);

  const getRelationshipColor = (distance: number) => {
    switch (distance) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    if (relationship.includes('Spouse')) return <Heart className="h-4 w-4" />;
    if (relationship.includes('Parent') || relationship.includes('Child')) return <Users className="h-4 w-4" />;
    return <Users className="h-4 w-4" />;
  };

  const filteredPerspectives = perspectives.filter(perspective => {
    const matchesFilter = filter === 'all' || 
      (filter === 'close' && perspective.distance <= 2) ||
      (filter === 'distant' && perspective.distance > 2);
    
    const matchesSearch = perspective.relationship.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Family <span className="gradient-text">Perspectives</span>
          </h1>
          <p className="text-lg text-gray-600">
            See your family relationships from different viewpoints and discover connections you never knew existed.
          </p>
        </motion.div>

        {/* Person Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Choose Your Perspective
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                {selectedPerson?.firstName?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedPerson?.firstName} {selectedPerson?.lastName}
                </p>
                <p className="text-sm text-gray-600">Your perspective</p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary-600" />
              <span className="text-gray-700">Viewing relationships from this person's perspective</span>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search relationships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Relationships</option>
            <option value="close">Close Family (≤2 steps)</option>
            <option value="distant">Distant Family (>2 steps)</option>
          </select>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </motion.div>

        {/* Perspectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPerspectives.map((perspective, index) => (
              <motion.div
                key={perspective.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:scale-105 transition-transform cursor-pointer group"
              >
                {/* Relationship Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getRelationshipColor(perspective.distance)}`}>
                      {getRelationshipIcon(perspective.relationship)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{perspective.relationship}</h3>
                      <p className="text-sm text-gray-600">
                        {perspective.distance} step{perspective.distance !== 1 ? 's' : ''} away
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(perspective.distance)}`}>
                    {perspective.distance}
                  </div>
                </div>

                {/* Connection Path */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Connection path:</p>
                  <div className="flex items-center space-x-2">
                    {perspective.path.map((personId, pathIndex) => (
                      <React.Fragment key={personId}>
                        <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {personId}
                        </div>
                        {pathIndex < perspective.path.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View Details
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPerspectives.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No relationships found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria to find family connections.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Filters</span>
            </button>
          </motion.div>
        )}

        {/* Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 mt-8"
        >
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Relationship Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Direct Family</h3>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-600">Spouses, parents, children</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Extended Family</h3>
              <p className="text-2xl font-bold text-blue-600">34</p>
              <p className="text-sm text-gray-600">Siblings, in-laws, cousins</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Distant Relatives</h3>
              <p className="text-2xl font-bold text-purple-600">67</p>
              <p className="text-sm text-gray-600">3+ steps away</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerspectivesView;
