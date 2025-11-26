import { Project, SocialLink, Playlist, Track } from './types';

export const SOCIALS: SocialLink[] = [
  { platform: 'Instagram', url: '#', label: '@vein.visuals' },
  { platform: 'Twitter', url: '#', label: '@vein_sound' },
  { platform: 'Email', url: 'mailto:contact@vein.art', label: 'contact@vein.art' },
  { platform: 'SoundCloud', url: '#', label: 'soundcloud.com/vein' },
];

// Placeholder tracks - in a real app, use real MP3 URLs
const MOCK_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; 

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'CHROME HEARTS',
    year: '2023',
    mood: 'Cold, Metallic, Industrial',
    description: 'An exploration of metallic textures in sound. The visual identity reflects the cold, unyielding nature of the modern digital landscape.',
    role: ['Production', 'Mixing', 'Visual Direction'],
    visuals: ['https://picsum.photos/800/800?grayscale', 'https://picsum.photos/800/801?grayscale'],
    tracks: [
      { id: 't1', title: 'Steel Lung', artist: 'VEIN', duration: '3:12', audioUrl: MOCK_AUDIO, coverUrl: 'https://picsum.photos/200/200?random=1', genre: 'Industrial' },
      { id: 't2', title: 'Liquid Metal', artist: 'VEIN', duration: '2:45', audioUrl: MOCK_AUDIO, coverUrl: 'https://picsum.photos/200/200?random=2', genre: 'Glitch' },
    ]
  },
  {
    id: 'p2',
    title: 'NEON DREAM',
    year: '2024',
    mood: 'Ethereal, Hazy, Dreamcore',
    description: 'A dive into the subconscious. Heavily layered pads and distorted vocals create a sense of nostalgia for a memory that never existed.',
    role: ['Composition', 'Mastering'],
    visuals: ['https://picsum.photos/800/600?blur=2', 'https://picsum.photos/800/601?blur=2'],
    tracks: [
      { id: 't3', title: 'Sleep Paralysis', artist: 'VEIN', duration: '4:20', audioUrl: MOCK_AUDIO, coverUrl: 'https://picsum.photos/200/200?random=3', genre: 'Ambient' },
    ]
  }
];

export const VERSATILITY_TRACKS: Track[] = [
  { id: 'v1', title: 'Cyber Jazz Experiment', artist: 'VEIN', duration: '2:10', audioUrl: MOCK_AUDIO, coverUrl: 'https://picsum.photos/200/200?random=4', genre: 'Jazz Fusion' },
  { id: 'v2', title: 'Hard Techno Draft', artist: 'VEIN', duration: '5:00', audioUrl: MOCK_AUDIO, coverUrl: 'https://picsum.photos/200/200?random=5', genre: 'Techno' },
  { id: 'v3', title: 'Acoustic Riffs', artist: 'VEIN', duration: '1:45', audioUrl: MOCK_AUDIO, coverUrl: 'https://picsum.photos/200/200?random=6', genre: 'Indie' },
];

export const PLAYLISTS: Playlist[] = [
  {
    id: 'pl1',
    title: 'Inspiration: 001',
    description: 'Textures that define the current era.',
    // Using a sample embed URL structure. Real Apple Music embeds look different.
    embedUrl: 'https://embed.music.apple.com/us/playlist/pl.u-pMylDqaTYvK?theme=dark' 
  },
  {
    id: 'pl2',
    title: 'Night Drive',
    description: 'For the empty highways.',
    embedUrl: 'https://embed.music.apple.com/us/playlist/pl.u-GgA5eRlfo65?theme=dark'
  }
];