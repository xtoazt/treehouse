import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share2,
  Eye,
  Clock,
  User,
  Tag,
  Edit3,
  Trash2,
  X,
  Save,
  Image,
  Video,
  Mic,
  Calendar,
  Users
} from 'lucide-react';
import { Story, FamilyMember } from '../../types';

const StoryHub: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'popular' | 'mine'>('all');
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    isPublic: true
  });

  // Mock data
  useEffect(() => {
    const mockStories: Story[] = [
      {
        id: '1',
        title: 'How Grandpa and Grandma Met',
        content: `It was a crisp autumn day in 1952 when my grandfather first laid eyes on the woman who would become his lifelong companion. He was working at the local diner, and she walked in with her friends after a movie. 

        "She ordered a chocolate milkshake and apple pie," he would tell us years later, his eyes twinkling with the same mischief we knew so well. "And I knew right then that I had to know her name."

        What followed was a courtship that lasted two years, filled with letters, long walks in Central Park, and shared dreams of building a family together. Their love story became the foundation of our entire family tree.

        Grandma always said that love isn't just about finding the right person, but being the right person for someone else. Their 65-year marriage was a testament to that philosophy.`,
        authorId: 'user1',
        treeId: '1',
        tags: ['love', 'grandparents', 'history', 'romance'],
        isPublic: true,
        createdAt: new Date('2023-10-15'),
        updatedAt: new Date('2023-10-15')
      },
      {
        id: '2',
        title: 'The Great Family Recipe Adventure',
        content: `Every family has that one recipe that gets passed down through generations. Ours was Aunt Maria's famous lasagna. The problem? She never wrote it down.

        When Aunt Maria passed away in 2019, we realized we had a crisis on our hands. Thanksgiving was approaching, and nobody knew how to make her legendary lasagna. That's when my cousin Sarah had a brilliant idea.

        "Let's recreate it together," she suggested. "We'll invite everyone who remembers eating it, and we'll figure it out as a family."

        What followed was the most chaotic, flour-covered, laughter-filled weekend our family had experienced in years. It took us three attempts, countless phone calls to relatives, and a lot of taste-testing, but we finally cracked the code.

        Now we have the recipe, but more importantly, we have the memory of discovering it together.`,
        authorId: 'user2',
        treeId: '1',
        tags: ['recipes', 'family traditions', 'cooking', 'memories'],
        isPublic: true,
        createdAt: new Date('2023-09-22'),
        updatedAt: new Date('2023-09-22')
      },
      {
        id: '3',
        title: 'Dad\'s Secret Talent',
        content: `For forty years, we thought we knew everything about our father. He was a accountant, loved baseball, and made terrible dad jokes. What we didn't know was that he had been writing poetry in secret.

        We discovered his hidden talent when we were helping him move to a smaller apartment. In the back of his closet, we found a box containing hundreds of handwritten poems. Beautiful, touching verses about love, family, loss, and hope.

        When we asked him about it, he blushed like a teenager. "It's just something I do when I can't sleep," he said. But as we read through them, we realized we were holding decades of our family's emotional history, captured in his gentle words.

        Now, every family gathering ends with Dad sharing one of his poems. It's become our new favorite tradition.`,
        authorId: 'user3',
        treeId: '1',
        tags: ['poetry', 'hidden talents', 'family secrets', 'traditions'],
        isPublic: true,
        createdAt: new Date('2023-08-10'),
        updatedAt: new Date('2023-08-10')
      }
    ];
    setStories(mockStories);
  }, []);

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    switch (filterBy) {
      case 'recent':
        return matchesSearch && new Date(story.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;
      case 'popular':
        return matchesSearch; // Add popularity logic
      case 'mine':
        return matchesSearch && story.authorId === 'user1'; // Current user
      default:
        return matchesSearch;
    }
  });

  const handleSaveStory = () => {
    if (!newStory.title.trim() || !newStory.content.trim()) return;

    const story: Story = {
      id: Date.now().toString(),
      title: newStory.title,
      content: newStory.content,
      authorId: 'user1',
      treeId: '1',
      tags: newStory.tags,
      isPublic: newStory.isPublic,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setStories([story, ...stories]);
    setNewStory({ title: '', content: '', tags: [], isPublic: true });
    setIsWriting(false);
  };

  const StoryCard: React.FC<{ story: Story; index: number }> = ({ story, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 cursor-pointer group"
      onClick={() => setSelectedStory(story)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {story.title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4">
            {story.content}
          </p>
        </div>
        <div className="ml-4">
          <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{story.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Author</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>124 views</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageCircle className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {story.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {story.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
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
            Family <span className="gradient-text">Stories</span>
          </h1>
          <p className="text-lg text-gray-600">
            Share and preserve your family's most precious memories and stories
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
              placeholder="Search stories by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="input-field min-w-[140px]"
          >
            <option value="all">All Stories</option>
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="mine">My Stories</option>
          </select>

          {/* Write Story Button */}
          <button
            onClick={() => setIsWriting(true)}
            className="btn-primary flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            <span>Write Story</span>
          </button>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600 mb-6">
              Start preserving your family's history by sharing your first story!
            </p>
            <button
              onClick={() => setIsWriting(true)}
              className="btn-primary"
            >
              Write Your First Story
            </button>
          </motion.div>
        )}
      </div>

      {/* Write Story Modal */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsWriting(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-gray-900">Write Your Story</h2>
                  <button
                    onClick={() => setIsWriting(false)}
                    className="btn-ghost p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Story Title
                    </label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      placeholder="Give your story a memorable title..."
                      className="input-field"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Story
                    </label>
                    <textarea
                      value={newStory.content}
                      onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                      placeholder="Share your family story, memory, or experience..."
                      rows={12}
                      className="input-field resize-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="family, memories, traditions, recipes..."
                      onChange={(e) => setNewStory({ 
                        ...newStory, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                      })}
                      className="input-field"
                    />
                  </div>

                  {/* Privacy */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newStory.isPublic}
                      onChange={(e) => setNewStory({ ...newStory, isPublic: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublic" className="text-sm text-gray-700">
                      Make this story visible to all family members
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setIsWriting(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveStory}
                      disabled={!newStory.title.trim() || !newStory.content.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Publish Story
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Reader Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                      {selectedStory.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedStory.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Family Author</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="btn-ghost p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                  {selectedStory.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {selectedStory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedStory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 btn-ghost">
                      <Heart className="h-5 w-5" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 btn-ghost">
                      <MessageCircle className="h-5 w-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 btn-ghost">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    124 views • 12 likes
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

export default StoryHub;
