export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  audioUrl?: string; // In real app, this is the mp3/stream url
  coverUrl: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  role: string[];
  description: string;
  conceptNote: string;
  coverImage: string;
  visualGallery: string[];
  tracks: Track[];
}

export interface SocialLink {
  platform: string;
  url: string;
  display: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  embedUrl: string; // Apple Music embed URL
  curatorNote: string;
}