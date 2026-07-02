import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Server, 
  Database, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Cpu, 
  FileText, 
  Sparkles, 
  Filter, 
  ArrowUpRight, 
  Send,
  Linkedin,
  Github,
  Search,
  MessageSquare,
  Check,
  Building
} from 'lucide-react';
import { 
  experiences, 
  skills, 
  interactiveScenarios, 
  Experience, 
  Skill, 
  InteractiveScenario 
} from './data';
// @ts-ignore
import avatarUrl from './assets/images/fatima_avatar_hijab_real_1783028569938.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'frameworks' | 'databases' | 'cloud' | 'testing'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<string>('sc-1');
  const [searchQuery, setSearchQuery] = useState('');
  
  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'languages':
        return <Code2 className="w-4 h-4" />;
      case 'frameworks':
        return <Cpu className="w-4 h-4" />;
      case 'databases':
        return <Database className="w-4 h-4" />;
      case 'cloud':
        return <Server className="w-4 h-4" />;
      case 'testing':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };
  
  // Accordion state for timeline jobs. UHG-2 is open by default, others can be toggled.
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({
    'uhg-2': true,
    'uhg-1': false,
    'citi': false,
    'charter': false,
    'infoplus': false
  });

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [localMessages, setLocalMessages] = useState<Array<typeof formData & { date: string }>>([]);

  // Load local messages on mount
  useEffect(() => {
    const saved = localStorage.getItem('fatima_portfolio_messages');
    if (saved) {
      try {
        setLocalMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved messages', e);
      }
    }
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormStatus('sending');
    
    // Simulate API delay
    setTimeout(() => {
      const newMessage = {
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      const updated = [newMessage, ...localMessages];
      setLocalMessages(updated);
      localStorage.setItem('fatima_portfolio_messages', JSON.stringify(updated));
      
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success state after a while
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  const toggleJob = (id: string) => {
    setExpandedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectSkillFromBadge = (skillName: string) => {
    setSelectedSkill(skillName === selectedSkill ? null : skillName);
    // Auto scroll to timeline with highlighted skill
    const timelineSec = document.getElementById('experience');
    if (timelineSec) {
      timelineSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter skills based on tab and search
  const filteredSkills = skills.filter(skill => {
    const matchesTab = activeTab === 'all' || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate a beautiful standalone HTML file content for download
  const downloadHtmlResume = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fatima Ali - Portfolio & Resume</title>
  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
          },
          colors: {
            editorial: {
              bg: '#F9F7F2',
              card: '#F1EEE7',
              text: '#1A1A1A',
            }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #F9F7F2;
      color: #1A1A1A;
    }
    h1, h2, h3, .font-serif {
      font-family: 'Cormorant Garamond', Georgia, serif;
    }
    @media print {
      body {
        background-color: white !important;
        color: #1A1A1A !important;
      }
      .no-print {
        display: none !important;
      }
      .print-card {
        border: 1px solid rgba(0,0,0,0.1) !important;
        box-shadow: none !important;
        background: white !important;
        page-break-inside: avoid;
        border-radius: 0px !important;
      }
      .page-break {
        page-break-before: always;
      }
    }
  </style>
</head>
<body class="bg-editorial-bg text-editorial-text antialiased min-h-screen">

  <!-- Floating Header (Interactive but will print nicely) -->
  <header class="bg-editorial-bg/90 backdrop-blur-md border-b border-black/10 sticky top-0 z-50 no-print">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-8 h-8 border border-black flex items-center justify-center text-editorial-text font-serif font-semibold text-sm bg-editorial-card">F</span>
        <span class="font-bold text-editorial-text tracking-[0.2em] uppercase text-xs">Fatima Ali</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="#about" class="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 hover:text-black transition-colors">About</a>
        <a href="#skills" class="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 hover:text-black transition-colors">Skills</a>
        <a href="#experience" class="text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 hover:text-black transition-colors">Experience</a>
        <button onclick="window.print()" class="bg-black hover:bg-neutral-800 text-editorial-bg text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-none border border-black transition-all">
          Print
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
    
    <!-- Hero / Header Section -->
    <section id="about" class="bg-editorial-card rounded-none p-6 sm:p-10 border border-black/10 shadow-none relative overflow-hidden print-card">
      <div class="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full blur-3xl -z-10"></div>
      
      <div class="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start text-center md:text-left">
        <!-- Avatar Initial Badge -->
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-none bg-black text-editorial-bg flex items-center justify-center text-3xl font-serif font-normal border border-black/10 shrink-0">
          FA
        </div>
        
        <div class="space-y-4 flex-1">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F9F7F2] border border-black/10 text-editorial-text text-[9px] uppercase tracking-[0.2em] font-bold mb-2">
              Senior Software Engineer
            </div>
            <h1 class="text-3xl sm:text-4xl font-normal text-editorial-text tracking-tight font-serif">Fatima Ali</h1>
            <p class="text-base sm:text-lg text-black/60 font-serif italic mt-0.5">Enterprise Back-End & Integration Engineer</p>
          </div>
          
          <div class="h-px w-24 bg-black/30 my-4"></div>
          
          <p class="text-black/80 text-sm sm:text-base max-w-2xl leading-relaxed">
            Proven ability to work independently in troubleshooting, designing, developing, and deploying solutions. Ability to collaborate well with others in SIT, QA, and PROD environments to solve problems and actively incorporate input from various sources.
          </p>
          
          <!-- Contact Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[10px] font-mono tracking-wider uppercase text-black/70 border-t border-black/5 pt-4">
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span class="text-black font-bold">✉</span>
              <a href="mailto:contact@fatima-ali.dev" class="hover:text-black transition-colors font-medium">contact@fatima-ali.dev</a>
            </div>
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span class="text-black font-bold">🔗</span>
              <a href="https://github.com/fatima-ali" target="_blank" rel="noopener noreferrer" class="hover:text-black transition-colors font-medium">github.com/fatima-ali</a>
            </div>
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span class="text-black font-bold">💼</span>
              <a href="https://linkedin.com/in/fatima-ali" target="_blank" rel="noopener noreferrer" class="hover:text-black transition-colors font-medium">linkedin.com/in/fatima-ali</a>
            </div>
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span class="text-black font-bold">📍</span>
              <span>Silverwood, OR (Open to Remote)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="bg-white rounded-none p-6 sm:p-8 border border-black/10 shadow-none print-card">
      <h2 class="text-xl font-normal text-editorial-text border-b border-black/10 pb-3 mb-6 flex items-center gap-2 font-serif italic">
        Technical Expertise
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-[10px] font-bold text-black/40 uppercase tracking-[0.25em] mb-3">Languages & Core</h3>
          <div class="flex flex-wrap gap-x-3 gap-y-1.5">
            ${skills.filter(s => s.category === 'languages').map(s => `<span class="text-editorial-text text-[10px] font-mono whitespace-nowrap mr-2">• ${s.name}</span>`).join('')}
          </div>
        </div>
        <div>
          <h3 class="text-[10px] font-bold text-black/40 uppercase tracking-[0.25em] mb-3">Frameworks & Server</h3>
          <div class="flex flex-wrap gap-x-3 gap-y-1.5">
            ${skills.filter(s => s.category === 'frameworks').map(s => `<span class="text-editorial-text text-[10px] font-mono whitespace-nowrap mr-2">• ${s.name}</span>`).join('')}
          </div>
        </div>
        <div>
          <h3 class="text-[10px] font-bold text-black/40 uppercase tracking-[0.25em] mb-3">Cloud, Database & QA</h3>
          <div class="flex flex-wrap gap-x-3 gap-y-1.5">
            ${skills.filter(s => ['databases', 'cloud', 'testing'].includes(s.category)).map(s => `<span class="text-editorial-text text-[10px] font-mono whitespace-nowrap mr-2">• ${s.name}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Professional Experience Section -->
    <section id="experience" class="space-y-6">
      <h2 class="text-xl font-normal text-editorial-text flex items-center gap-2 font-serif italic">
        Professional Experience
      </h2>
      
      <div class="space-y-6">
        ${experiences.map(exp => `
          <div class="bg-white rounded-none p-6 border border-black/10 shadow-none relative print-card">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/15 pb-3 mb-4">
              <div>
                <h3 class="text-lg font-bold font-serif text-editorial-text">${exp.role}</h3>
                <p class="text-xs font-mono uppercase tracking-wider text-black/60 mt-0.5">
                  🏢 ${exp.company}
                </p>
              </div>
              <div class="text-left sm:text-right">
                <span class="inline-block px-2.5 py-0.5 border border-black/20 bg-editorial-card text-editorial-text text-[10px] font-mono uppercase tracking-wider">${exp.period}</span>
                ${exp.location ? `<p class="text-[10px] font-mono text-black/40 uppercase mt-1">📍 ${exp.location}</p>` : ''}
              </div>
            </div>
            
            <p class="text-xs text-black/75 font-sans italic mb-4 leading-relaxed bg-[#F1EEE7]/40 p-3 border-l-2 border-black/30">
              ${exp.summary}
            </p>
            
            <ul class="space-y-2.5 text-black/85 text-sm list-disc pl-4 leading-relaxed mb-4">
              ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
            
            <div class="flex flex-wrap gap-1 pt-3 border-t border-black/5">
              ${exp.tech.map(t => `<span class="text-[9px] font-semibold font-mono px-2 py-0.5 rounded-none bg-[#F9F7F2] text-black/70 border border-black/5">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Ongoing Studies Section -->
    <section id="studies" class="bg-white rounded-none p-6 sm:p-8 border border-black/10 shadow-none print-card space-y-4 mt-6">
      <h2 class="text-xl font-normal text-editorial-text border-b border-black/10 pb-3 mb-4 flex items-center gap-2 font-serif italic">
        🎓 Currently Studying
      </h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-bold font-serif text-editorial-text">Pursuing Agentic AI Architect Course</h3>
          <p class="text-xs text-black/60 font-mono uppercase mt-0.5">Ongoing Professional Development</p>
        </div>
        <div class="border-t border-black/5 pt-3 mt-2">
          <p class="text-sm text-black/80 leading-relaxed mb-3">
            <strong>Hunarmand</strong> — Connects premium households and modern corporate offices in Pakistan with master-verified hunarmands (skilled trade professionals).
          </p>
          <div class="flex flex-col sm:flex-row gap-4 items-start">
            <div class="flex-1 space-y-2">
              <a href="https://emimo56.github.io/Hunarmand/" target="_blank" rel="noopener noreferrer" class="text-xs text-black font-semibold font-mono hover:underline inline-flex items-center gap-1">
                🔗 Visit Hunarmand Platform (emimo56.github.io/Hunarmand)
              </a>
            </div>
            <div class="w-full sm:w-48 max-h-32 overflow-hidden border border-black/15 bg-[#F1EEE7]/10 p-1">
              <img src="https://raw.githubusercontent.com/Emimo56/Hunarmand/refs/heads/main/hunarmand.jpg" alt="Hunarmand Platform Preview" class="w-full h-auto object-cover grayscale" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer class="bg-black text-white/50 py-12 border-t border-white/10 text-center text-[10px] uppercase tracking-wider font-mono no-print mt-20">
    <div class="max-w-4xl mx-auto px-4">
      <p class="font-serif text-white text-xs lowercase italic">Fatima Ali</p>
      <p class="text-white/40 mt-1">Silverwood, OR • contact@fatima-ali.dev</p>
      <p class="mt-4 text-white/20">Generated using Fatima's Editorial Portfolio Portfolio.</p>
    </div>
  </footer>

</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fatima_ali_resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text selection:bg-black/10 flex flex-col antialiased font-sans">
      {/* Top Banner indicating status */}
      <div className="bg-editorial-text text-editorial-bg py-2.5 px-4 text-center text-[10px] uppercase tracking-[0.2em] font-bold relative z-50 flex items-center justify-center gap-2 overflow-hidden border-b border-black/15">
        <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse shrink-0" />
        <span>Open to Remote Backend Software Engineering roles & Collaborations • Silverwood, OR</span>
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-editorial-bg/95 backdrop-blur-md border-b border-black/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 border border-black flex items-center justify-center text-editorial-text font-serif text-lg font-normal bg-editorial-card">
              FA
            </div>
            <div className="leading-none">
              <span className="font-bold text-editorial-text tracking-[0.15em] uppercase text-xs block">Fatima Ali</span>
              <span className="text-[9px] text-black/50 font-mono uppercase mt-0.5 block">Software Engineer</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.2em] uppercase font-bold text-black/60">
            <button onClick={() => scrollTo('about')} className="hover:text-black cursor-pointer transition-colors">About</button>
            <button onClick={() => scrollTo('playground')} className="hover:text-black cursor-pointer transition-colors">Solutions</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-black cursor-pointer transition-colors">Expertise</button>
            <button onClick={() => scrollTo('experience')} className="hover:text-black cursor-pointer transition-colors">Experience</button>
            <button onClick={() => scrollTo('studies')} className="hover:text-black cursor-pointer transition-colors">Studies</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-black cursor-pointer transition-colors">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 border-r border-black/10 pr-3 mr-1">
              <a href="https://github.com/fatima-ali" target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors" title="GitHub Profile">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/fatima-ali" target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors" title="LinkedIn Profile">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:contact@fatima-ali.dev" className="text-black/60 hover:text-black transition-colors" title="Send Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <button 
              onClick={downloadHtmlResume}
              className="bg-black hover:bg-neutral-800 text-editorial-bg text-[10px] uppercase tracking-[0.15em] font-bold px-4 py-2 rounded-none transition-all flex items-center gap-1.5 shadow-none border border-black cursor-pointer"
              title="Downloads a self-contained, print-perfect HTML copy of Fatima's resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative pt-10 pb-16 md:py-20 overflow-hidden bg-[#F9F7F2] border-b border-black/10">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Title and Bio */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-editorial-card border border-black/10 text-editorial-text text-[9px] uppercase tracking-[0.2em] font-bold">
                <Sparkles className="w-3 h-3 text-black" />
                Available for New Challenges
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-editorial-text tracking-tight font-serif leading-[1.05]">
                  Hi, I'm <span className="font-serif italic font-light block sm:inline">Fatima Ali</span>
                </h1>
                <h2 className="text-lg sm:text-xl font-semibold tracking-[0.05em] uppercase text-black/70">
                  Senior Backend Software Engineer
                </h2>
              </div>
              
              <div className="h-px w-24 bg-black/40 my-6 mx-auto lg:mx-0" />

              <p className="text-black/80 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                I engineer resilient, highly-scalable backend microservices and API configurations. 
                With deep expertise in <strong className="font-semibold">Java, Kotlin, Spring Boot, MongoDB, and Apache Kafka</strong>, 
                I focus on robust integration architectures, legacy migrations, and solving business-critical bottlenecks.
              </p>

              {/* Core quick contact info */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-[11px] font-mono tracking-wider uppercase text-black/60 pt-2">
                <div className="flex items-center gap-1.5 bg-[#F1EEE7]/50 px-3 py-1.5 border border-black/5">
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <a href="mailto:contact@fatima-ali.dev" className="hover:text-black transition-colors font-medium">contact@fatima-ali.dev</a>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F1EEE7]/50 px-3 py-1.5 border border-black/5">
                  <Github className="w-3.5 h-3.5 text-black" />
                  <a href="https://github.com/fatima-ali" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-medium">github.com/fatima-ali</a>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F1EEE7]/50 px-3 py-1.5 border border-black/5">
                  <Linkedin className="w-3.5 h-3.5 text-black" />
                  <a href="https://linkedin.com/in/fatima-ali" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-medium">linkedin.com/in/fatima-ali</a>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F1EEE7]/50 px-3 py-1.5 border border-black/5">
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>Silverwood, OR (Open to Remote)</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="bg-black hover:bg-neutral-800 text-white font-bold tracking-[0.15em] uppercase text-xs px-6 py-3 rounded-none transition-all flex items-center gap-2 border border-black cursor-pointer shadow-none"
                >
                  <Send className="w-4 h-4" />
                  Get In Touch
                </button>
                <button 
                  onClick={() => scrollTo('playground')}
                  className="bg-transparent border border-black/25 hover:border-black hover:bg-black/5 text-editorial-text font-bold tracking-[0.15em] uppercase text-xs px-6 py-3 rounded-none transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-black" />
                  Explore Solutions
                </button>
              </div>
            </div>

            {/* Hero Right: Avatar/Profile Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                {/* Visual accent blocks - editorial minimalist */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border border-black/10 bg-[#F1EEE7] -z-10" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border border-black/5 bg-[#EAE6DD] -z-10" />

                <div className="relative bg-white p-3 rounded-none border border-black/10 overflow-hidden w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group shadow-none">
                  <img 
                    src={avatarUrl} 
                    alt="Fatima Ali Profile" 
                    className="w-full h-full object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Tech Tag */}
                  <div className="absolute bottom-6 left-6 right-6 bg-black text-white py-2 px-4 rounded-none border border-white/10 flex items-center justify-between text-[10px] tracking-wider font-mono uppercase">
                    <div>
                      <p className="font-bold tracking-wide">6+ Yrs Exp</p>
                      <p className="text-[9px] text-white/60">Java & Spring Boot</p>
                    </div>
                    <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Core Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 border-t border-black/10 pt-10">
            <div className="bg-[#F1EEE7]/40 p-5 border border-black/5 text-center transition-all hover:bg-white hover:border-black/10 rounded-none">
              <span className="block text-2xl sm:text-3xl font-normal font-serif italic text-black">6+</span>
              <span className="text-[9px] text-black/50 uppercase tracking-[0.2em] font-bold block mt-1">Years Experience</span>
            </div>
            <div className="bg-[#F1EEE7]/40 p-5 border border-black/5 text-center transition-all hover:bg-white hover:border-black/10 rounded-none">
              <span className="block text-2xl sm:text-3xl font-normal font-serif italic text-black">4+</span>
              <span className="text-[9px] text-black/50 uppercase tracking-[0.2em] font-bold block mt-1">Enterprise Systems</span>
            </div>
            <div className="bg-[#F1EEE7]/40 p-5 border border-black/5 text-center transition-all hover:bg-white hover:border-black/10 rounded-none">
              <span className="block text-2xl sm:text-3xl font-normal font-serif italic text-black">100%</span>
              <span className="text-[9px] text-black/50 uppercase tracking-[0.2em] font-bold block mt-1">Self-Driven Ownership</span>
            </div>
            <div className="bg-[#F1EEE7]/40 p-5 border border-black/5 text-center transition-all hover:bg-white hover:border-black/10 rounded-none">
              <span className="block text-2xl sm:text-3xl font-normal font-serif italic text-black">25+</span>
              <span className="text-[9px] text-black/50 uppercase tracking-[0.2em] font-bold block mt-1">APIs Integrated</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Solutions Playground Section */}
      <section id="playground" className="py-16 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 text-editorial-bg text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-none">
              Interactive Case Playground
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif italic tracking-tight text-white">
              Complex Architecture Solutions
            </h2>
            <p className="text-white/60 text-sm">
              Explore concrete examples of challenging production bottlenecks Fatima solved, detailing the core architectures implemented.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Scenarios List Tabs */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-2">Select a Case Study</p>
              {interactiveScenarios.map((sc) => {
                const isActive = activeScenario === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenario(sc.id)}
                    className={`w-full text-left p-4 rounded-none border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isActive 
                        ? 'bg-[#F1EEE7] border-white text-black font-semibold' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className={`text-[8px] uppercase tracking-[0.2em] font-mono ${isActive ? 'text-black/60' : 'text-white/40'}`}>
                        Case Study 0{sc.id.split('-')[1]}
                      </p>
                      <h3 className="text-xs uppercase tracking-wider font-semibold">{sc.title}</h3>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'translate-x-0.5 -translate-y-0.5 text-black' : 'text-white/40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Scenario Detail Window */}
            <div className="lg:col-span-7 bg-[#121212] rounded-none border border-white/10 p-6 sm:p-8 space-y-6 relative overflow-hidden min-h-[350px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              
              <AnimatePresence mode="wait">
                {interactiveScenarios.filter(sc => sc.id === activeScenario).map((sc) => (
                  <motion.div
                    key={sc.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] bg-white/10 text-white px-2.5 py-1 rounded-none border border-white/10">
                        Problem Scenario
                      </span>
                      <h3 className="text-xl font-normal text-white tracking-tight font-serif mt-3">{sc.title}</h3>
                      <p className="text-white/90 text-sm mt-3 leading-relaxed italic border-l border-white/20 bg-white/5 py-3 pl-4 rounded-none font-serif">
                        "{sc.problem}"
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] bg-[#4ADE80]/10 text-[#4ADE80] px-2.5 py-1 rounded-none border border-[#4ADE80]/15">
                        Fatima's Implemented Solution
                      </span>
                      <p className="text-white/80 text-sm mt-3 leading-relaxed font-sans">
                        {sc.solution}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.25em]">Solution Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {sc.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            onClick={() => selectSkillFromBadge(tech)}
                            className="text-[9px] font-mono bg-white/5 text-white/90 border border-white/10 px-2 py-0.5 rounded-none hover:border-white cursor-pointer transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        onClick={() => {
                          scrollTo('experience');
                          // Expand the specific job
                          setExpandedJobs(prev => ({ ...prev, [sc.roleLink]: true }));
                        }}
                        className="text-xs text-white/70 hover:text-white font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer group"
                      >
                        <span>View complete project timeline details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Categorized Skills Section */}
      <section id="skills" className="py-16 bg-[#F9F7F2] border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F1EEE7] border border-black/10 text-editorial-text text-[9px] uppercase tracking-[0.2em] font-bold">
              <Filter className="w-3 h-3 text-black" />
              Categorized Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif italic text-editorial-text tracking-tight">
              Technical Expertise & Frameworks
            </h2>
            <p className="text-black/60 text-sm">
              Filter by specific tech stacks, or click on any skill badge to highlight corresponding timeline roles below.
            </p>
          </div>

          {/* Search and Category Tab Filters */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-4">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-1">
                {(['all', 'languages', 'frameworks', 'databases', 'cloud', 'testing'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveTab(cat);
                      setSelectedSkill(null); // Clear selected single skill
                    }}
                    className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer border border-transparent rounded-none ${
                      activeTab === cat 
                        ? 'bg-black text-white border-black' 
                        : 'text-black/60 hover:bg-black/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Simple search bar */}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-black/40" />
                <input
                  type="text"
                  placeholder="Search skills (e.g. Kafka)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs border border-black/10 focus:outline-none focus:ring-1 focus:ring-black w-full rounded-none bg-[#F1EEE7]/30 text-editorial-text"
                />
              </div>
            </div>

            {/* Skills grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => selectSkillFromBadge(skill.name)}
                      className={`py-2 px-3 transition-all cursor-pointer relative group flex items-center justify-between rounded-none border-b border-black/10 hover:bg-black/5 ${
                        isSelected 
                          ? 'bg-black/5 font-semibold border-b-black' 
                          : 'bg-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 transition-colors ${isSelected ? 'text-black' : 'text-black/50 group-hover:text-black'}`}>
                          {getSkillIcon(skill.category)}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs tracking-tight truncate ${isSelected ? 'text-black font-bold' : 'text-black/85'}`}>
                            {skill.name}
                          </p>
                          <p className="text-[7.5px] font-mono text-black/40 uppercase tracking-[0.15em]">
                            {skill.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-1.5 py-0.5 font-mono uppercase tracking-wider text-[8px] border ${
                          skill.level === 'Expert' 
                            ? 'bg-black text-white border-black'
                            : skill.level === 'Advanced'
                            ? 'bg-black/5 text-black/70 border-black/10'
                            : 'bg-white text-black/50 border-black/10'
                        }`}>
                          {skill.level}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredSkills.length === 0 && (
              <div className="text-center py-12 bg-[#F1EEE7]/20 border border-dashed border-black/10 rounded-none">
                <p className="text-sm text-black/50">No skills match your search query.</p>
                <button onClick={() => { setSearchQuery(''); setActiveTab('all'); }} className="text-xs text-black font-bold mt-2 hover:underline uppercase tracking-wider">Clear Filters</button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Detailed Experience Timeline */}
      <section id="experience" className="py-16 bg-[#F1EEE7]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1 bg-[#F1EEE7] border border-black/10 text-black text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-none">
              <Briefcase className="w-3.5 h-3.5" />
              Career Timeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif italic text-slate-900">
              Professional Milestones
            </h2>
            <p className="text-black/60 text-sm">
              Detailed tracking of Fatima Ali's engineering journey. Toggle to collapse or expand bullets. 
              {selectedSkill && (
                <span className="block mt-2 font-bold text-black border-b border-black inline-block pb-0.5 font-serif font-normal italic">
                  Highlighting roles utilizing: "{selectedSkill}"
                </span>
              )}
            </p>
          </div>

          {/* Timeline Node Chain */}
          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l border-black/10 space-y-8">
            {experiences.map((exp, idx) => {
              const isHighlighted = selectedSkill ? exp.tech.includes(selectedSkill) : false;
              const isOpen = expandedJobs[exp.id];
              const isRecent = idx === 0;

              return (
                <div 
                  key={exp.id} 
                  className={`relative transition-all duration-300 ${
                    isHighlighted ? 'ring-1 ring-black ring-offset-4 rounded-none bg-[#F1EEE7]/40 p-3 sm:p-4' : ''
                  }`}
                >
                  {/* Marker Dot */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isHighlighted 
                      ? 'bg-black border-white ring-4 ring-black/20' 
                      : isRecent 
                      ? 'bg-black border-white' 
                      : 'bg-white border-black/30'
                  }`} />

                  {/* Job Card */}
                  <div className="bg-white rounded-none border border-black/10 shadow-none overflow-hidden hover:border-black/20 transition-all">
                    
                    {/* Card Header clickable to toggle */}
                    <div 
                      onClick={() => toggleJob(exp.id)}
                      className="p-5 sm:p-6 cursor-pointer hover:bg-[#F1EEE7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors select-none"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-black font-serif tracking-tight leading-none">{exp.role}</h3>
                          {isRecent && (
                            <span className="bg-black text-white border-none px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-none">
                              Latest Role
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-black/60 text-sm font-semibold">
                          <Building className="w-4 h-4 text-black/40 shrink-0" />
                          <span>{exp.company}</span>
                        </div>
                        <p className="text-xs text-black/75 font-sans leading-relaxed pt-1.5 border-t border-black/5 mt-2 italic">
                          {exp.summary}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center shrink-0">
                        <span className="inline-block px-3 py-1 rounded-none bg-[#F1EEE7] border border-black/5 text-black text-[10px] font-mono uppercase tracking-wider">
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="text-black/40 text-[10px] font-mono uppercase mt-1">
                            📍 {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expandable Bullet Lists */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-black/5 bg-[#F1EEE7]/10"
                        >
                          <div className="p-5 sm:p-6 space-y-4">
                            <ul className="space-y-3 list-disc pl-4 text-sm text-black/80 leading-relaxed">
                              {exp.highlights.map((bullet, bIdx) => (
                                <li key={bIdx}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Card Footer containing technology badges */}
                    <div className="px-5 py-4 bg-[#F1EEE7]/10 border-t border-black/5 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex flex-wrap gap-1.5 max-w-[85%]">
                        {exp.tech.map((t) => {
                          const isMatch = selectedSkill === t;
                          return (
                            <span
                              key={t}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectSkillFromBadge(t);
                              }}
                              className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-none border transition-colors cursor-pointer ${
                                isMatch
                                  ? 'bg-black text-white border-black'
                                  : 'bg-white text-black/70 border-black/10 hover:border-black hover:text-black'
                              }`}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>

                      <button 
                        onClick={() => toggleJob(exp.id)}
                        className="p-1.5 rounded-none hover:bg-black/5 text-black/40 hover:text-black cursor-pointer transition-colors"
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Ongoing Studies & Projects Section */}
      <section id="studies" className="py-16 bg-[#F9F7F2] border-t border-black/10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F1EEE7] border border-black/10 text-editorial-text text-[9px] uppercase tracking-[0.2em] font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-black" />
              Ongoing Studies & Ventures
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif italic text-slate-900">
              Currently Studying
            </h2>
            <p className="text-black/60 text-sm">
              Pushing boundaries in state-of-the-art AI systems and community-first platforms.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-none border border-black/10 p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1EEE7]/30 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-start border-b border-black/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Pursuing Agentic AI Architect Course</h3>
                <p className="text-xs font-mono uppercase text-black/50 mt-1">Advanced AI & Large Language Model Architectures</p>
              </div>
              <span className="self-start px-2.5 py-1 bg-black text-white text-[9px] font-mono uppercase tracking-widest">
                Active Study
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-black/80">Key Project: Hunarmand</h4>
                <p className="text-black/75 text-sm leading-relaxed max-w-3xl">
                  Created <strong>Hunarmand</strong> — an innovative ecosystem that connects premium households and modern corporate offices in Pakistan with master-verified <em>hunarmands</em> (exceptionally skilled localized trade professionals, artisans, and technicians) for reliable, premium, and dignified engagements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-center">
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs text-black/60 font-serif italic leading-relaxed">
                    Designed to bridge the gap between premium consumer demands and skilled labor markets in Pakistan, ensuring absolute safety, strict background verification, and fair, standardized pricing matrices.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] font-mono bg-[#F1EEE7] border border-black/5 text-black/80 px-2 py-0.5">Agentic AI Workflows</span>
                    <span className="text-[9px] font-mono bg-[#F1EEE7] border border-black/5 text-black/80 px-2 py-0.5">Verification Engine</span>
                    <span className="text-[9px] font-mono bg-[#F1EEE7] border border-black/5 text-black/80 px-2 py-0.5">Community Impact</span>
                  </div>

                  <div>
                    <a 
                      href="https://emimo56.github.io/Hunarmand/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-bold tracking-[0.1em] uppercase py-2.5 px-5 rounded-none text-[9px] cursor-pointer transition-colors border border-black"
                    >
                      <span>Visit Live Hunarmand Platform</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative bg-[#F9F7F2] p-2 border border-black/10 overflow-hidden group shadow-none">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src="https://raw.githubusercontent.com/Emimo56/Hunarmand/refs/heads/main/hunarmand.jpg" 
                      alt="Hunarmand App Preview" 
                      className="w-full h-auto max-h-56 object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Contact & Inquiry Module */}
      <section id="contact" className="py-16 bg-white border-t border-black/10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact left info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-1 bg-[#F1EEE7] border border-black/10 text-editorial-text text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-none">
                  <Mail className="w-3.5 h-3.5" />
                  Connect With Fatima
                </div>
                <h2 className="text-3xl sm:text-4xl font-normal font-serif italic text-slate-900">
                  Let's Discuss Opportunities
                </h2>
                <p className="text-black/70 text-sm leading-relaxed">
                  I am open to Java, Kotlin, and Spring Boot backend software development positions. 
                  Reach out directly or send an inquiry, and I'll get back to you promptly.
                </p>
              </div>

              {/* Direct Card info */}
              <div className="bg-[#F1EEE7]/40 rounded-none border border-black/10 p-6 space-y-4 shadow-none">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center border border-black/10 text-black">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-black/40 font-bold uppercase tracking-[0.2em]">Email Address</p>
                    <a href="mailto:contact@fatima-ali.dev" className="text-sm font-semibold text-black hover:underline transition-colors">contact@fatima-ali.dev</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center border border-black/10 text-black">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-black/40 font-bold uppercase tracking-[0.2em]">Geographic Location</p>
                    <p className="text-sm font-semibold text-black">Silverwood, OR (Open to Remote)</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={downloadHtmlResume}
                    className="w-full text-center bg-black hover:bg-neutral-800 text-white font-bold tracking-[0.1em] uppercase py-3 px-4 rounded-none text-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-none border border-black"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Download Standalone HTML
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form right */}
            <div className="lg:col-span-7 bg-[#F1EEE7]/20 rounded-none border border-black/10 p-6 sm:p-8 relative">
              
              <h3 className="text-lg font-normal font-serif italic text-slate-900 mb-6 flex items-center gap-1.5">
                <MessageSquare className="w-5 h-5 text-black" />
                Send a Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-black/70 uppercase tracking-[0.25em]">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-none border border-black/10 bg-[#F9F7F2]/40 focus:outline-none focus:ring-1 focus:ring-black text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-black/70 uppercase tracking-[0.25em]">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-none border border-black/10 bg-[#F9F7F2]/40 focus:outline-none focus:ring-1 focus:ring-black text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/70 uppercase tracking-[0.25em]">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Opportunity / Question"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-none border border-black/10 bg-[#F9F7F2]/40 focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/70 uppercase tracking-[0.25em]">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-none border border-black/10 bg-[#F9F7F2]/40 focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3.5 px-6 rounded-none font-bold text-xs tracking-[0.1em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer text-white border border-black ${
                      formStatus === 'sending' 
                        ? 'bg-neutral-800/80 cursor-wait' 
                        : 'bg-black hover:bg-neutral-900 shadow-none'
                    }`}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending message securely...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Secure Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success Notification overlay */}
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-black/95 backdrop-blur-sm rounded-none flex flex-col items-center justify-center text-center p-6 space-y-3 z-10"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-normal font-serif text-white">Inquiry Received Successfully</h3>
                    <p className="text-white/70 text-sm max-w-sm">
                      Thank you for your message! Fatima will review it shortly. A copy has been saved locally.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Local Inbox Log (Persisted via localStorage) */}
          {localMessages.length > 0 && (
            <div className="mt-12 pt-10 border-t border-black/10 space-y-4">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/50">
                Your Sent Inquiries ({localMessages.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localMessages.map((msg, i) => (
                  <div key={i} className="bg-[#F1EEE7]/30 p-4 rounded-none border border-black/10 space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between text-black/40">
                      <span className="font-mono font-medium">{msg.date}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    </div>
                    <div>
                      <p className="font-bold text-black">{msg.subject || 'No Subject'}</p>
                      <p className="text-black/50 mt-1">To: Fatima Ali</p>
                    </div>
                    <p className="text-black/80 leading-relaxed italic border-l border-black/20 pl-2 mt-2 font-serif">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('fatima_portfolio_messages');
                  setLocalMessages([]);
                }}
                className="text-[10px] text-black/50 hover:text-black font-mono uppercase tracking-wider hover:underline cursor-pointer"
              >
                Clear Messages History
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/50 py-12 border-t border-white/10 text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 border border-white flex items-center justify-center text-white font-serif text-xs bg-white/5">FA</span>
              <div>
                <p className="font-bold text-white leading-none font-serif">Fatima Ali</p>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mt-1">Enterprise Backend Engineer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/fatima-ali" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/fatima-ali" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@fatima-ali.dev" className="text-white/50 hover:text-white transition-colors" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-mono text-center md:text-right">
              &copy; {new Date().getFullYear()} Fatima Ali • Custom Web Architecture Portfolio • All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
