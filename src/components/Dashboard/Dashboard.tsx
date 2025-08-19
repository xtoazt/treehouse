import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  Users, 
  Calendar, 
  BookOpen, 
  Camera, 
  Plus,
  TrendingUp,
  Heart,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import { FamilyTree, Event, Story, Photo } from '../../types';

const Dashboard: React.FC = () => {
  const [recentTrees, setRecentTrees] = useState<FamilyTree[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [recentPhotos, setRecentPhotos] = useState<Photo[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    setRecentTrees([
      {
        id: '1',
        name: 'Smith Family Tree',
        description: 'Our family history from 1800s to present',
        members: [],
        relationships: [],
        settings: { privacy: 'private', allowCollaboration: true, allowPhotoUploads: true },
        collaborators: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      },
      {
        id: '2',
        name: 'Johnson Family',
        description: 'Extended family connections',
        members: [],
        relationships: [],
        settings: { privacy: 'invite-only', allowCollaboration: true, allowPhotoUploads: true },
        collaborators: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      }
    ]);

    setUpcomingEvents([
      {
        id: '1',
        title: 'Grandma\'s 80th Birthday',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: 'birthday',
        attendees: [],
        treeId: '1',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Family Reunion 2024',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        type: 'reunion',
        attendees: [],
        treeId: '1',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }, []);

  const stats = [
    { label: 'Family Trees', value: '3', icon: TreePine, color: 'text-primary-600' },
    { label: 'Family Members', value: '127', icon: Users, color: 'text-secondary-600' },
    { label: 'Upcoming Events', value: '5', icon: Calendar, color: 'text-accent-600' },
    { label: 'Family Stories', value: '23', icon: BookOpen, color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Welcome back, <span className="gradient-text">Family!</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover, connect, and preserve your family's story together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="card p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Family Trees & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Family Trees */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900">Your Family Trees</h2>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Tree</span>
                </button>
              </div>

              <div className="space-y-4">
                {recentTrees.map((tree) => (
                  <div key={tree.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                        <TreePine className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{tree.name}</h3>
                        <p className="text-sm text-gray-600">{tree.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        {tree.settings.privacy}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New family member added</p>
                    <p className="text-sm text-gray-600">Sarah Johnson was added to Smith Family Tree</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Photo uploaded</p>
                    <p className="text-sm text-gray-600">Family vacation photo from 1985</p>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Story shared</p>
                    <p className="text-sm text-gray-600">"How Grandpa met Grandma" story published</p>
                  </div>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Events & Quick Actions */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900">Upcoming Events</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Event</span>
                </button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gradient-to-r from-accent-50 to-orange-50 rounded-xl border border-accent-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-4 w-4 text-accent-600" />
                          <span className="text-sm text-gray-600">
                            {event.date.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'birthday' ? 'bg-pink-100 text-pink-800' :
                        event.type === 'reunion' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-3">
                  <Users className="h-5 w-5" />
                  <span>Add Family Member</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center justify-center space-x-3">
                  <Camera className="h-5 w-5" />
                  <span>Upload Photos</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center justify-center space-x-3">
                  <BookOpen className="h-5 w-5" />
                  <span>Write Story</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center justify-center space-x-3">
                  <Calendar className="h-5 w-5" />
                  <span>Plan Event</span>
                </button>
              </div>
            </motion.div>

            {/* Family Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card p-6"
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Family Insights</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">Tree Growth</span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">+12%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary-50 to-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-secondary-600" />
                    <span className="text-sm font-medium text-gray-900">Connections</span>
                  </div>
                  <span className="text-lg font-bold text-secondary-600">89</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent-50 to-orange-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent-600" />
                    <span className="text-sm font-medium text-gray-900">Memories</span>
                  </div>
                  <span className="text-lg font-bold text-accent-600">156</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
