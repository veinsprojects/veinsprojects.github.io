import React, { useState, useEffect } from 'react';
import { PROJECTS, SOCIALS, VERSATILITY_TRACKS, PLAYLISTS } from './constants';
import { Track, Project } from './types';
import { StickyPlayer } from './components/StickyPlayer';
import { ArrowDown, Play, ExternalLink, Sparkles } from 'lucide-react';
import { generateCreativeConcept } from './services/geminiService';

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedConcepts, setGeneratedConcepts] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleGenerateConcept = async (project: Project) => {
    if (generatedConcepts[project.id]) return; // Already generated
    
    setIsGenerating(project.id);
    const concept = await generateCreativeConcept(project.title, project.description);
    setGeneratedConcepts(prev => ({ ...prev, [project.id]: concept }));
    setIsGenerating(null);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 selection:bg-white selection:text-black">
      
      {/* Background Gradient / Smudge Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Deep Blue Base */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-black"></div>
         {/* Spotlight / Smudge effect - Top Right */}
         <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
         {/* Spotlight / Smudge effect - Center Left */}
         <div className="absolute top-[40%] left-[-20%] w-[60vw] h-[60vw] bg-slate-800/20 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
         {/* White Fog / Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-gradient-to-b from-white/5 to-transparent blur-[80px]"></div>
         {/* Film Grain Texture Overlay */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-transparent mix-blend-difference text-white">
        <div className="text-xl font-black tracking-tighter">VEIN'S PROJECT</div>
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-medium opacity-70">
          <a href="#projects" className="hover:text-white hover:opacity-100 transition-all">Projects</a>
          <a href="#versatility" className="hover:text-white hover:opacity-100 transition-all">Versatility</a>
          <a href="#inspiration" className="hover:text-white hover:opacity-100 transition-all">Inspiration</a>
          <a href="#contact" className="hover:text-white hover:opacity-100 transition-all">Contact</a>
        </div>
        <div className="md:hidden">
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden z-10">
        <div className="z-10 text-center space-y-12">
          <h2 className="text-xs md:text-sm tracking-[0.5em] uppercase text-slate-400 font-medium animate-pulse">Sonic Identity & Visual Art</h2>
          
          {/* Main Title with "Sonder" Distortion Effect */}
          <div className="relative">
             <h1 className="distorted-text text-[15vh] md:text-[25vh] font-serif font-normal text-white leading-none mix-blend-overlay opacity-90">
               vein
             </h1>
             {/* Clean Overlay for readability slightly offset */}
             <h1 className="absolute inset-0 text-[15vh] md:text-[25vh] font-serif font-normal text-white leading-none opacity-40 blur-[1px]">
               vein
             </h1>
          </div>
          
          <p className="text-slate-500 font-serif italic text-lg tracking-wider">The protagonist of our own life.</p>
        </div>

        <div className="absolute bottom-12 animate-bounce opacity-50">
          <a href="#projects" className="text-white hover:text-slate-300 transition-colors">
            <ArrowDown size={32} strokeWidth={1} />
          </a>
        </div>
      </header>

      {/* Part 1: Personal Projects (Albums) */}
      <section id="projects" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto space-y-40">
        <div className="border-b border-white/10 pb-6 mb-16 flex justify-between items-end">
           <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">01 — Selected Works</h3>
        </div>

        {PROJECTS.map((project, index) => (
          <div key={project.id} className={`flex flex-col md:flex-row gap-12 md:gap-32 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            {/* Visual Side */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="relative group overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-color"></div>
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full aspect-square object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-110 transition-all duration-700 ease-in-out" 
                />
                {/* Visual Gallery Preview */}
                <div className="absolute -bottom-4 -right-4 flex gap-2 z-20">
                   {project.visualGallery.map((url, i) => (
                     <div key={i} className="w-16 h-16 bg-black border border-white/10 p-0.5 shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                       <img src={url} className="w-full h-full object-cover grayscale opacity-80" />
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 space-y-10 sticky top-32">
              <div>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-mono mb-4 uppercase tracking-wider">
                   <span>{project.year}</span>
                   <span className="w-4 h-px bg-slate-700"></span>
                   <span>{project.role.join(' / ')}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white drop-shadow-lg">{project.title}</h2>
                <div className="w-12 h-px bg-white mb-8"></div>
                <p className="text-slate-300 leading-relaxed font-serif text-xl italic opacity-90">{project.description}</p>
              </div>

              {/* Concept / AI Section */}
              <div className="bg-white/5 backdrop-blur-md p-8 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-slate-700 group-hover:bg-white transition-colors duration-500"></div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Concept Note</h4>
                  <button 
                    onClick={() => handleGenerateConcept(project)}
                    disabled={!!generatedConcepts[project.id] || isGenerating === project.id}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <Sparkles size={14} />
                    {isGenerating === project.id ? 'Thinking...' : (generatedConcepts[project.id] ? 'AI Generated' : 'Expand')}
                  </button>
                </div>
                <p className="text-sm text-slate-400 leading-7 font-light">
                  {generatedConcepts[project.id] || project.conceptNote}
                </p>
              </div>

              {/* Tracklist */}
              <div className="space-y-1">
                {project.tracks.map((track) => (
                  <div 
                    key={track.id} 
                    className="group flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 hover:pl-4 transition-all duration-300 cursor-pointer"
                    onClick={() => handlePlayTrack(track)}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-6 flex justify-center text-slate-600 group-hover:text-white transition-colors">
                         {currentTrack?.id === track.id && isPlaying ? (
                           <div className="flex gap-0.5 h-3 items-end">
                             <div className="w-0.5 bg-white animate-[bounce_1s_infinite] h-full"></div>
                             <div className="w-0.5 bg-white animate-[bounce_1.2s_infinite] h-2/3"></div>
                             <div className="w-0.5 bg-white animate-[bounce_0.8s_infinite] h-full"></div>
                           </div>
                         ) : (
                           <span className="text-xs font-mono group-hover:text-white">0{track.id.slice(-1)}</span>
                         )}
                      </div>
                      <span className={`text-sm font-medium tracking-wide ${currentTrack?.id === track.id ? 'text-white font-bold' : 'text-slate-400 group-hover:text-white'}`}>
                        {track.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 font-mono group-hover:text-slate-400">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Part 3: Versatility (Genre Grid) */}
      <section id="versatility" className="relative z-10 py-32 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-6">
             <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">02 — Production Range</h3>
             <p className="text-sm text-slate-400 max-w-md text-right hidden md:block mt-4 md:mt-0">
               Demonstrating sonic flexibility. From high-energy rhythms to ethereal soundscapes.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {VERSATILITY_TRACKS.map((track) => (
              <div 
                key={track.id}
                onClick={() => handlePlayTrack(track)} 
                className="group relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden cursor-pointer"
              >
                <img 
                  src={track.coverUrl} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-0 left-0 p-6 w-full h-full flex flex-col justify-between">
                   <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-xs font-mono bg-white text-black px-2 py-1">{track.duration}</span>
                      <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)] transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <Play size={16} fill="black" className="ml-0.5" />
                      </button>
                   </div>
                   
                   <div className="bg-black/80 backdrop-blur-md p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out border-t border-white/10">
                      <h4 className="text-lg font-bold uppercase tracking-tight text-white">{track.genre}</h4>
                      <p className="text-xs text-slate-400 font-serif italic mt-1">{track.title}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 4: Inspiration (Apple Music) */}
      <section id="inspiration" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-6 mb-16">
           <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">03 — Source Material</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="group space-y-6">
               <div className="w-full aspect-[16/9] bg-[#050505] overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5">
                 {/* 
                    Note: Actual Apple Music Embed. 
                    Using iframe sandbox for security. 
                 */}
                 <iframe 
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                    frameBorder="0" 
                    height="450" 
                    style={{width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent'}} 
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                    src={playlist.embedUrl}
                    className="w-full h-full filter grayscale contrast-125 brightness-75 opacity-70 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-700"
                  >
                  </iframe>
                  {/* Vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_50%,black_100%)]"></div>
               </div>
               <div className="flex justify-between items-start border-l-2 border-slate-800 pl-4 group-hover:border-white transition-colors duration-300">
                 <div>
                   <h4 className="text-2xl font-serif italic text-white">{playlist.title}</h4>
                   <p className="text-sm text-slate-500 mt-2 max-w-xs leading-relaxed">{playlist.curatorNote}</p>
                 </div>
                 <ExternalLink size={20} className="text-slate-600 group-hover:text-white transition-colors" />
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2: Contact (Minimal Footer) */}
      <footer id="contact" className="relative z-10 py-32 px-6 bg-black text-white border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 text-white/90">
                LET'S<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600">CREATE.</span>
              </h2>
              <div className="space-y-4">
                {SOCIALS.map((social) => (
                   <a 
                     key={social.platform} 
                     href={social.url} 
                     className="block text-xl md:text-2xl font-medium border-b border-white/10 pb-2 hover:border-white hover:text-white transition-all uppercase tracking-wide group text-slate-400"
                   >
                     {social.platform} <span className="text-slate-600 text-sm ml-2 normal-case group-hover:text-white/50 transition-colors">{social.display}</span>
                   </a>
                ))}
              </div>
            </div>
            
            <div className="text-xs font-mono text-slate-600 text-right space-y-1">
              <p>© {new Date().getFullYear()} VEIN'S PROJECT</p>
              <p>LOS ANGELES / TOKYO</p>
              <p className="pt-4 text-white/20">POWERED BY GEMINI</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Player */}
      <StickyPlayer 
        currentTrack={currentTrack} 
        isPlaying={isPlaying} 
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => console.log('Next track')}
        onPrev={() => console.log('Prev track')}
      />
      
      {/* Scroll Progress Indicator */}
      <div className="fixed right-0 top-0 bottom-0 w-1.5 z-50 flex flex-col justify-center pointer-events-none">
         <div className="h-32 w-0.5 bg-white/5 mx-auto rounded-full overflow-hidden">
            {/* Mock Scroll Indicator */}
            <div className="h-1/3 bg-white w-full animate-pulse shadow-[0_0_10px_white]"></div>
         </div>
      </div>
    </div>
  );
};

export default App;