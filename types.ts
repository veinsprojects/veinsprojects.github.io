export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string; // Display string like "3:45"
  audioUrl: string; // URL to mp3
  coverUrl: string;
  genre: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  role: string[];
  visuals: string[];
  tracks: Track[];
  mood: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Playlist {
  id: string;
  title: string;
  embedUrl: string; // Apple Music embed URL
  description: string;
}