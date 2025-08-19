import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import PerspectivesView from './components/FamilyTree/PerspectivesView';
import FamilyTreeVisualizer from './components/FamilyTree/FamilyTreeVisualizer';
import PhotoGallery from './components/Photos/PhotoGallery';
import StoryHub from './components/Stories/StoryHub';
import EventCenter from './components/Events/EventCenter';
import FamilyTimeline from './components/Timeline/FamilyTimeline';
import './index.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

// Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl font-display font-bold text-gray-900 mb-6">
              Welcome to <span className="gradient-text">Treehouse</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover, connect, and preserve your family's story together. 
              The most beautiful and collaborative family tree platform ever created.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Powerful Features for Your Family
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to build and share your family history
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Interactive Family Tree',
                description: 'Beautiful, drag-and-drop family tree visualization with real-time collaboration.',
                icon: '🌳',
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Family Perspectives',
                description: 'See relationships from different viewpoints and discover hidden connections.',
                icon: '👁️',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Collaborative Editing',
                description: 'Invite family members to contribute and build your tree together.',
                icon: '🤝',
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Photo & Story Sharing',
                description: 'Upload photos and share family stories to preserve memories.',
                icon: '📸',
                color: 'from-orange-500 to-red-500'
              },
              {
                title: 'Event Planning',
                description: 'Plan family reunions, birthdays, and special occasions together.',
                icon: '🎉',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                title: 'Privacy Controls',
                description: 'Full control over who can see and edit your family information.',
                icon: '🔒',
                color: 'from-gray-500 to-slate-500'
              }
            ].map((feature, index) => (
              <div key={index} className="card p-6 hover:scale-105 transition-transform">
                <div className={`h-12 w-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="App">
        {currentUser && <Header />}
        <Routes>
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <LoginForm />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perspectives" 
            element={
              <ProtectedRoute>
                <PerspectivesView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tree" 
            element={
              <ProtectedRoute>
                <FamilyTreeVisualizer />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/photos" 
            element={
              <ProtectedRoute>
                <PhotoGallery />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/stories" 
            element={
              <ProtectedRoute>
                <StoryHub />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <EventCenter />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timeline" 
            element={
              <ProtectedRoute>
                <FamilyTimeline />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
