export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastActive: Date;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: Date;
  deathDate?: Date;
  gender: 'male' | 'female' | 'other';
  photoURL?: string;
  bio?: string;
  birthPlace?: string;
  currentLocation?: string;
  occupation?: string;
  email?: string;
  phone?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  tags: string[];
  isAlive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Relationship {
  id: string;
  person1Id: string;
  person2Id: string;
  relationshipType: 'parent-child' | 'spouse' | 'sibling' | 'partner';
  marriageDate?: Date;
  divorceDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyTree {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  members: FamilyMember[];
  relationships: Relationship[];
  settings: {
    privacy: 'public' | 'private' | 'invite-only';
    allowCollaboration: boolean;
    allowPhotoUploads: boolean;
  };
  collaborators: {
    userId: string;
    role: 'owner' | 'admin' | 'editor' | 'viewer';
    addedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Perspective {
  id: string;
  personId: string;
  targetPersonId: string;
  relationship: string;
  distance: number;
  path: string[];
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  location?: string;
  type: 'birthday' | 'anniversary' | 'wedding' | 'funeral' | 'reunion' | 'other';
  attendees: string[];
  treeId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  authorId: string;
  treeId: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  people: string[];
  date?: Date;
  location?: string;
  treeId: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface Invitation {
  id: string;
  email: string;
  treeId: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'pending' | 'accepted' | 'declined';
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'invitation' | 'event' | 'story' | 'photo' | 'relationship';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}
