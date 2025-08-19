import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share2,
  Download,
  Trash2,
  Tag,
  Calendar,
  MapPin,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Photo, FamilyMember } from '../../types';

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'favorites' | 'people'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'timeline'>('grid');

  // Mock data
  useEffect(() => {
    const mockPhotos: Photo[] = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1511895426328-dc8714efa8b6?w=800',
        caption: 'Family vacation at the beach - Summer 2023',
        people: ['1', '2', '3'],
        date: new Date('2023-07-15'),
        location: 'Malibu Beach, CA',
        treeId: '1',
        uploadedBy: 'user1',
        createdAt: new Date('2023-07-16')
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
        caption: 'Grandpa\'s 80th birthday celebration',
        people: ['1', '2', '4', '5'],
        date: new Date('2023-05-20'),
        location: 'Family Home, NY',
        treeId: '1',
        uploadedBy: 'user2',
        createdAt: new Date('2023-05-21')
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800',
        caption: 'Wedding day memories',
        people: ['3', '4'],
        date: new Date('2005-06-12'),
        location: 'Central Park, NY',
        treeId: '1',
        uploadedBy: 'user3',
        createdAt: new Date('2023-03-10')
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
        caption: 'First day of school',
        people: ['5'],
        date: new Date('2023-09-05'),
        location: 'Elementary School',
        treeId: '1',
        uploadedBy: 'user1',
        createdAt: new Date('2023-09-05')
      }
    ];
    setPhotos(mockPhotos);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      // Handle file upload logic here
      console.log('Files dropped:', acceptedFiles);
      setIsUploadOpen(false);
    }
  });

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filterBy) {
      case 'recent':
        return matchesSearch && new Date(photo.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;
      case 'favorites':
        return matchesSearch; // Add favorites logic
      case 'people':
        return matchesSearch && photo.people.length > 0;
      default:
        return matchesSearch;
    }
  });

  const PhotoCard: React.FC<{ photo: Photo; index: number }> = ({ photo, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl cursor-pointer floating-element"
      onClick={() => setSelectedPhoto(photo)}
    >
      <div className="aspect-square relative">
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Heart className="h-4 w-4 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="h-4 w-4 text-white" />
          </button>
        </div>
        
        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{photo.caption}</h3>
          <div className="flex items-center space-x-3 text-xs opacity-90">
            {photo.date && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{photo.date.toLocaleDateString()}</span>
              </div>
            )}
            {photo.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{photo.location}</span>
              </div>
            )}
          </div>
          {photo.people.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              <Users className="h-3 w-3" />
              <span className="text-xs">{photo.people.length} people tagged</span>
            </div>
          )}
        </div>
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
            Family <span className="gradient-text">Photo Gallery</span>
          </h1>
          <p className="text-lg text-gray-600">
            Preserve and share your precious family memories
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
              placeholder="Search photos by caption, location..."
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
              className="input-field min-w-[120px]"
            >
              <option value="all">All Photos</option>
              <option value="recent">Recent</option>
              <option value="favorites">Favorites</option>
              <option value="people">With People</option>
            </select>

            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="input-field min-w-[120px]"
            >
              <option value="grid">Grid View</option>
              <option value="masonry">Masonry</option>
              <option value="timeline">Timeline</option>
            </select>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="btn-primary flex items-center space-x-2 whitespace-nowrap"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Photos</span>
          </button>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
            viewMode === 'masonry' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
            'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {filteredPhotos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
            <p className="text-gray-600 mb-6">
              Start building your family photo collection by uploading some memories!
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="btn-primary"
            >
              Upload Your First Photo
            </button>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsUploadOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-elevated max-w-lg w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900">Upload Photos</h2>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="btn-ghost p-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-colors ${
                  isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isDragActive ? 'Drop photos here' : 'Upload family photos'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop photos here, or click to select files
                </p>
                <button className="btn-secondary">
                  Choose Files
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
                <p>• Maximum file size: 10MB per photo</p>
                <p>• You can upload multiple photos at once</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="max-w-4xl max-h-full p-4 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Photo Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white rounded-b-2xl">
                  <h3 className="text-xl font-semibold mb-2">{selectedPhoto.caption}</h3>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    {selectedPhoto.date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedPhoto.date.toLocaleDateString()}</span>
                      </div>
                    )}
                    {selectedPhoto.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedPhoto.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{selectedPhoto.people.length} people</span>
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

export default PhotoGallery;
