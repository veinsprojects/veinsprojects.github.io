import { Project, SocialLink, PlaylistItem, Track } from './types';

export const SOCIALS: SocialLink[] = [
  { platform: 'Instagram', url: '#', display: '@yourhandle' },
  { platform: 'Twitter', url: '#', display: '@yourhandle' },
  { platform: 'Email', url: 'mailto:contact@domain.com', display: 'contact@domain.com' },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'NOCTURNAL THEORY',
    year: '2023',
    role: ['Producer', 'Mix Engineer', 'Visual Direction'],
    description: 'An exploration of urban isolation through synth-wave textures and organic percussion.',
    conceptNote: 'The album was conceived during midnight walks in Tokyo. We wanted to capture the sound of neon lights reflecting on wet pavement—cold yet vibrant. The visual language follows this duality using high-contrast monochrome photography.',
    coverImage: 'https://picsum.photos/800/800?grayscale&random=1',
    visualGallery: [
      'https://picsum.photos/600/800?grayscale&random=2',
      'https://picsum.photos/600/400?grayscale&random=3',
    ],
    tracks: [
      { id: 't1', title: 'Neon Rain', artist: 'You', duration: '3:45', genre: 'Synthwave', coverUrl: 'https://picsum.photos/100/100?random=1' },
      { id: 't2', title: 'Concrete Echo', artist: 'You', duration: '4:12', genre: 'Ambient', coverUrl: 'https://picsum.photos/100/100?random=1' },
    ]
  },
  {
    id: 'p2',
    title: 'ORGANIC MATTER',
    year: '2024',
    role: ['Composition', 'Sound Design'],
    description: 'Deconstructing acoustic instruments into electronic landscapes.',
    conceptNote: 'Breaking down the boundaries between the natural and the synthetic. What does a violin sound like when it is granularly synthesized? Visuals focus on microscopic textures of nature.',
    coverImage: 'https://picsum.photos/800/800?grayscale&random=4',
    visualGallery: [
      'https://picsum.photos/600/600?grayscale&random=5',
    ],
    tracks: [
      { id: 't3', title: 'Wood & Wire', artist: 'You', duration: '2:55', genre: 'Experimental', coverUrl: 'https://picsum.photos/100/100?random=4' },
    ]
  }
];

export const VERSATILITY_TRACKS: Track[] = [
  { id: 'v1', title: 'Summer Haze', artist: 'Client A', duration: '3:10', genre: 'R&B / Soul', coverUrl: 'https://picsum.photos/200/200?random=10' },
  { id: 'v2', title: 'Night Drive', artist: 'Client B', duration: '2:45', genre: 'Trap / Hip-Hop', coverUrl: 'https://picsum.photos/200/200?random=11' },
  { id: 'v3', title: 'Ethereal', artist: 'Film Score', duration: '1:30', genre: 'Cinematic', coverUrl: 'https://picsum.photos/200/200?random=12' },
  { id: 'v4', title: 'Club Level', artist: 'Client C', duration: '4:00', genre: 'House', coverUrl: 'https://picsum.photos/200/200?random=13' },
];

export const PLAYLISTS: PlaylistItem[] = [
  {
    id: 'pl1',
    title: 'TEXTURES & SPACE',
    embedUrl: 'https://embed.music.apple.com/us/playlist/pl.u-MDAWvpjt38370N', // Placeholder ID
    curatorNote: 'Tracks that influence my sound design choices. Spanning from Brian Eno to Burial.'
  },
  {
    id: 'pl2',
    title: 'RHYTHM STUDY',
    embedUrl: 'https://embed.music.apple.com/us/playlist/pl.u-MDAWvpjt38370N', // Placeholder ID
    curatorNote: 'Complex polyrhythms and groove pockets that I study for production techniques.'
  }
];