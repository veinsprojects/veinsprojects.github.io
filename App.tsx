import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDown, Sparkles, Disc, Music, Share2, Mail, ExternalLink } from 'lucide-react';
import GlobalPlayer from './components/GlobalPlayer';
import GlitchText from './components/ui/GlitchText';
import { PROJECTS, VERSATILITY_TRACKS, PLAYLISTS, SOCIALS } from './constants';
import { Track } from './types';
import { generateProjectManifesto } from './services/geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [manifestos, setManifestos] = useState<Record<string, string>>({});
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  // Play a specific track
  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    // Simple logic: just loop within the versatility tracks if that's what's playing, or projects.
    // For this demo, let's just grab a random one from constants to keep it alive.
    const allTracks = [...PROJECTS.flatMap(p => p.tracks), ...VERSATILITY_TRACKS];
    if (!currentTrack) return;
    const idx = allTracks.findIndex(t => t.id === currentTrack.id);
    const nextIdx = (idx + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
     const allTracks = [...PROJECTS.flatMap(p => p.tracks), ...VERSATILITY_TRACKS];
    if (!currentTrack) return;
    const idx = allTracks.findIndex(t => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIdx]);
    setIsPlaying(true);
  };

  const handleGenerateManifesto = async (projectId: string, title: string, mood: string) => {
    setGeneratingId(projectId);
    const text = await generateProjectManifesto(title, mood);
    setManifestos(prev => ({ ...prev, [projectId]: text }));
    setGeneratingId(null);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Reusable header class for consistency
  const headerClass = "text-8xl md:text-[10rem] font-['Six_Caps'] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-800 glitch-hover select-none";

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 relative">
      <div className="bg-noise"></div>
      
      {/* Dynamic Background Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,_#1e1b4b_0%,_#0f172a_40%,_#020617_80%)] opacity-80 pointer-events-none -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#134e4a_0%,_transparent_50%)] opacity-30 pointer-events-none -z-10"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <span className="font-['Six_Caps'] text-4xl tracking-widest cursor-pointer" onClick={() => scrollTo('home')}>VEIN</span>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-6xl md:text-8xl font-['Six_Caps'] tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 animate-in fade-in duration-300">
          <button onClick={() => scrollTo('projects')} className="hover:scale-110 transition-transform glitch-hover uppercase">Projects</button>
          <button onClick={() => scrollTo('versatility')} className="hover:scale-110 transition-transform glitch-hover uppercase">Versatility</button>
          <button onClick={() => scrollTo('inspiration')} className="hover:scale-110 transition-transform glitch-hover uppercase">Inspiration</button>
          <button onClick={() => scrollTo('contact')} className="hover:scale-110 transition-transform glitch-hover uppercase">Contact</button>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Top Zebra */}
        <div className="absolute top-0 w-full h-16 zebra-stripe opacity-20"></div>
        
        {/* Vertical Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 select-none">
           <h1 className="text-[60vh] font-['Six_Caps'] leading-none text-white blur-sm scale-y-150">VEIN</h1>
        </div>
        
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="relative group">
            {/* Main Hero Logo */}
            <h1 className="text-9xl md:text-[16rem] font-['Six_Caps'] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-800 glitch-hover">
              <GlitchText text="VEIN" />
            </h1>
            <div className="absolute -inset-4 blur-3xl bg-indigo-500/20 rounded-full -z-10 group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
          </div>
          <p className="font-['Antonio'] text-xl md:text-2xl tracking-[0.5em] text-cyan-200/60 uppercase">Sonic & Visual Architect</p>
        </div>

        <div className="absolute bottom-10 animate-bounce">
            <ArrowDown className="text-gray-500" />
        </div>
        
        {/* Bottom Zebra */}
        <div className="absolute bottom-0 w-full h-32 zebra-stripe opacity-10 gradient-mask-t"></div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Section Header */}
          <div className="text-right border-b border-white/10 pb-8 mb-20">
             <h2 className={headerClass}>
               <GlitchText text="PROJECTS" />
             </h2>
          </div>

          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`flex flex-col md:flex-row gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Visuals */}
              <div className="md:w-1/2 relative group">
                <div className="aspect-square bg-gray-900 overflow-hidden border border-white/10 relative">
                  <img src={project.visuals[0]} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:contrast-125 grayscale hover:grayscale-0" />
                  <div className="absolute inset-0 bg-indigo-900/30 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-white"></div>
                  <div className="absolute top-4 right-4 font-['Antonio'] text-xl text-white bg-black px-2 py-1">{project.year}</div>
                </div>
              </div>

              {/* Details */}
              <div className="md:w-1/2 flex flex-col justify-center space-y-8">
                <div>
                   {/* Project Title with Glitch Effect */}
                   <h3 className="text-7xl md:text-8xl font-['Six_Caps'] mb-4 uppercase text-white leading-[0.85] glitch-hover">
                      <GlitchText text={project.title} />
                   </h3>
                   <p className="text-sm text-gray-400 uppercase tracking-widest border-l-2 border-cyan-500 pl-3 font-['Antonio']">{project.mood}</p>
                </div>
                
                <p className="text-gray-300 font-light leading-relaxed max-w-md font-['Space_Grotesk'] text-lg">{project.description}</p>
                
                {/* AI Feature */}
                <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm rounded-none hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm uppercase text-cyan-400 flex items-center gap-2 font-['Antonio'] tracking-wide"><Sparkles size={14}/> Concept Expansion</span>
                        <button 
                            onClick={() => handleGenerateManifesto(project.id, project.title, project.mood)}
                            disabled={generatingId === project.id}
                            className="text-xs hover:text-white text-gray-500 underline decoration-dotted font-mono uppercase"
                        >
                            {generatingId === project.id ? "DECODING..." : "GENERATE MANIFESTO"}
                        </button>
                    </div>
                    <p className="text-sm font-mono text-gray-400 italic leading-relaxed">
                        {manifestos[project.id] || ">> Awaiting neural link connection to reveal hidden meaning..."}
                    </p>
                </div>

                <div className="space-y-4 pt-4">
                  {project.tracks.map(track => (
                    <div key={track.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 transition-colors border-b border-white/5" onClick={() => playTrack(track)}>
                      <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 flex items-center justify-center bg-gray-800 ${currentTrack?.id === track.id && isPlaying ? 'bg-cyan-500' : ''}`}>
                             {currentTrack?.id === track.id && isPlaying ? <div className="w-3 h-3 bg-white animate-pulse"></div> : <Disc size={16} />}
                         </div>
                         <span className="font-['Antonio'] text-xl uppercase group-hover:translate-x-1 transition-transform">{track.title}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Versatility Section */}
      <section id="versatility" className="py-32 bg-gradient-to-b from-black to-[#0a0a0a] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
             <h2 className={headerClass}>
                <GlitchText text="VERSATILITY" />
             </h2>
             <p className="text-gray-400 max-w-xs text-right mt-4 md:mt-0 font-['Antonio'] uppercase tracking-widest text-sm mb-4">Exploring the sonic spectrum. No boundaries, only frequencies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VERSATILITY_TRACKS.map((track) => (
              <div key={track.id} className="group relative bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors p-8 flex flex-col gap-6" onClick={() => playTrack(track)}>
                <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-0.5 rounded-full uppercase">{track.genre}</span>
                    {currentTrack?.id === track.id && isPlaying && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>}
                </div>
                <div className="mt-8">
                    <h4 className="text-5xl font-['Six_Caps'] mb-2 group-hover:text-cyan-400 transition-colors uppercase leading-none">{track.title}</h4>
                    <p className="text-sm text-gray-400 font-['Antonio'] uppercase">Production / Experiment</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <button className="mt-auto self-start flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white text-gray-500 pt-4 font-['Antonio']">
                    <Music size={14} /> Play Preview
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section (Apple Music) */}
      <section id="inspiration" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-left mb-20 border-b border-white/10 pb-4">
            <h2 className={headerClass}>
                <GlitchText text="AURAL ARCHIVE" />
            </h2>
            <p className="text-gray-400 font-light font-['Antonio'] uppercase tracking-widest mt-4">The sounds that shape the vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PLAYLISTS.map((playlist) => (
              <div key={playlist.id} className="bg-black/40 backdrop-blur-md border border-white/5 p-1 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                 <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                    <h3 className="font-['Antonio'] text-2xl uppercase tracking-wide">{playlist.title}</h3>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                 </div>
                 <div className="relative w-full h-[450px]">
                    <iframe 
                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                        frameBorder="0" 
                        height="450" 
                        style={{width: '100%', maxWidth: '100%', overflow: 'hidden', filter: 'invert(92%) hue-rotate(180deg) contrast(90%) saturate(80%)'}} 
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                        src={playlist.embedUrl}>
                    </iframe>
                    <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay pointer-events-none"></div>
                 </div>
                 <div className="p-4 text-xs text-gray-500 font-mono text-right border-t border-white/5">
                    SOURCE: APPLE MUSIC API // {playlist.description}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 bg-black relative">
        <div className="max-w-4xl mx-auto text-center space-y-16">
            <h2 className={headerClass}>
                <GlitchText text="CONNECT" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SOCIALS.map((social) => (
                    <a key={social.platform} href={social.url} className="flex items-center justify-between p-8 border border-white/10 hover:bg-white/5 hover:border-cyan-500/30 transition-all group">
                        <div className="flex items-center gap-6">
                            {social.platform === 'Email' ? <Mail size={24} className="text-gray-400 group-hover:text-cyan-400"/> : <Share2 size={24} className="text-gray-400 group-hover:text-cyan-400"/>}
                            <span className="font-['Antonio'] text-3xl uppercase tracking-wide group-hover:text-white transition-colors">{social.platform}</span>
                        </div>
                        <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </a>
                ))}
            </div>

            <footer className="pt-24 text-center text-xs text-gray-600 font-mono tracking-widest">
                <p>VEIN © {new Date().getFullYear()} // ALL RIGHTS RESERVED</p>
                <p className="mt-3 opacity-50">DESIGNED BY AI // CURATED BY HUMAN</p>
            </footer>
        </div>
      </section>

      {/* Global Player */}
      <GlobalPlayer 
        currentTrack={currentTrack} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default App;