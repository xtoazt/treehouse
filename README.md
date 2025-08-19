# 🌳 Treehouse - Family Tree Collaboration Platform

A stunning, modern family tree website that allows families to discover, connect, and preserve their stories together. Built with React, TypeScript, Firebase, and beautiful UI design.

## ✨ Features

### 🌟 Core Features
- **Interactive Family Tree Visualization** - Beautiful, drag-and-drop family tree with real-time collaboration
- **Family Perspectives** - See relationships from different viewpoints and discover hidden connections
- **Collaborative Editing** - Invite family members to contribute and build your tree together
- **Photo Gallery** - Upload, organize, and share family photos with advanced tagging
- **Story Hub** - Write and share family stories with rich text editing
- **Event Management** - Plan family reunions, birthdays, and special occasions with RSVP
- **Timeline View** - Interactive chronological timeline of family history
- **Global Search** - Advanced search across all family data with keyboard shortcuts
- **Notifications** - Comprehensive notification system for family updates
- **Privacy Controls** - Full control over who can see and edit your family information

### 🎨 Design Features
- **Modern UI/UX** - Stunning, responsive design with smooth animations
- **Glass Morphism** - Beautiful glass effects and modern styling
- **Gradient Design** - Eye-catching gradients and color schemes
- **Mobile Responsive** - Works perfectly on all devices
- **Dark/Light Mode Ready** - Built with theming support

### 🔧 Technical Features
- **TypeScript** - Full type safety and better development experience
- **Firebase Integration** - Real-time database, authentication, and storage
- **React Router** - Client-side routing with protected routes
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **React Flow** - Interactive node-based family tree visualization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/treehouse.git
   cd treehouse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage
   - Copy your Firebase config

4. **Configure Firebase**
   - Open `src/firebase/config.ts`
   - Replace the placeholder config with your Firebase project credentials:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
treehouse/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── LoginForm.tsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── FamilyTree/
│   │   │   ├── FamilyTreeVisualizer.tsx
│   │   │   └── PerspectivesView.tsx
│   │   └── Layout/
│   │       └── Header.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── firebase/
│   │   └── config.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Key Components

### Family Perspectives
The unique "Perspectives" feature allows users to see family relationships from different viewpoints:
- Choose any family member as the perspective point
- View all relationships from that person's point of view
- Discover hidden connections and distant relatives
- Filter by relationship distance and type

### Interactive Family Tree
- Drag-and-drop family member nodes
- Real-time collaboration with multiple users
- Multiple view modes (Tree, Timeline, Network)
- Beautiful visual design with gender-specific colors
- Mini-map for navigation

### Photo Gallery
- Upload multiple photos with drag-and-drop
- Advanced photo tagging and organization
- Family member association
- Search photos by caption, location, or people
- Beautiful masonry and grid layouts

### Story Hub
- Rich text editor for writing family stories
- Tag system for easy organization
- Public/private story settings
- Story search and filtering
- Beautiful reading experience

### Event Management
- Create and manage family events
- RSVP system with attendance tracking
- Event reminders and notifications
- Multiple event types (birthdays, reunions, etc.)
- Calendar integration

### Timeline View
- Chronological family history visualization
- Interactive timeline with filtering
- Animated playback mode
- Decade-based navigation
- Event details with rich media

### Global Search
- Search across all family data
- Keyboard shortcuts (⌘K or Ctrl+K)
- Real-time search suggestions
- Recent searches and quick actions
- Advanced filtering by content type

### Notification System
- Real-time family updates
- Customizable notification preferences
- Mark as read/unread functionality
- Bulk notification management
- Activity feed integration

### Dashboard
- Overview of all family trees
- Recent activity feed
- Upcoming events
- Quick actions for common tasks
- Family insights and statistics

## 🔐 Authentication & Security

- Firebase Authentication with email/password
- Protected routes for authenticated users
- User profile management
- Role-based access control for family trees
- Privacy settings for each family tree

## 🎨 Styling & Design

The application uses a modern design system with:
- **Tailwind CSS** for utility-first styling
- **Custom color palette** with primary, secondary, and accent colors
- **Glass morphism effects** for modern UI elements
- **Gradient backgrounds** and text effects
- **Smooth animations** with Framer Motion
- **Responsive design** for all screen sizes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Flow](https://reactflow.dev/) - Node-based visualization
- [Lucide React](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us at support@treehouse.com
- Check our documentation at docs.treehouse.com

---

Made with ❤️ for families everywhere
