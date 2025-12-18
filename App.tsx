import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Wrench, 
  Palette, 
  ShieldCheck, 
  Zap, 
  Siren, 
  Settings, 
  Sparkles, 
  Layers, 
  MessageSquare, 
  MapPin, 
  Phone, 
  CheckCircle2,
  X,
  ArrowRight,
  MoveHorizontal,
  Gauge,
  ArrowUpRight,
  Star,
  ExternalLink,
  Instagram,
  Facebook,
  Search,
  CheckCircle,
  Award,
  Clock,
  ChevronDown,
  Car,
  Plus,
  Maximize2
} from 'lucide-react';

// --- Helper Functions ---
const scrollToId = (id: string) => {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Logo = ({ className = "" }: { className?: string }) => (
  <div 
    onClick={() => scrollToId('inicio')}
    className={`group flex items-center gap-2 md:gap-3 select-none cursor-pointer ${className}`}
  >
    <div className="relative">
      <div className="relative flex items-center justify-center w-7 h-7 md:w-10 md:h-10 bg-zinc-100 rounded-lg shadow-[2px_2px_0px_rgba(161,42,46,1)]">
        <Gauge className="text-[#A12A2E] w-4 h-4 md:w-6 md:h-6" strokeWidth={2.5} />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-black text-base md:text-2xl tracking-tighter text-white uppercase italic">
        RECA<span className="text-[#A12A2E] not-italic">DIESEL</span>
      </span>
      <span className="text-[6px] md:text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500">Premium Repair</span>
    </div>
  </div>
);

const ShopStatusBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const day = currentTime.getDay(); 
    const hours = currentTime.getHours();
    
    const openWeekday = day >= 1 && day <= 5 && hours >= 8 && hours < 18;
    const openSaturday = day === 6 && hours >= 8 && hours < 12;
    
    setIsOpen(openWeekday || openSaturday);
    return () => clearInterval(timer);
  }, [currentTime]);

  return (
    <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 px-2 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-md self-start">
      <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full animate-pulse ${isOpen ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'}`} />
      <span className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.15em] text-zinc-400">
        {isOpen ? 'Estamos Atendendo' : 'Fechado Agora'}
      </span>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON'
      );
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-[9999]">
      <div 
        className={`fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 border border-[#A12A2E]/50 rounded-full transition-transform duration-150 ease-out flex items-center justify-center ${isPointer ? 'scale-150 bg-[#A12A2E]/20 border-white' : 'scale-100'}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      >
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" />
      </div>
      <div 
        className="fixed top-0 left-0 w-[500px] h-[500px] -ml-[250px] -mt-[250px] opacity-10 pointer-events-none mix-blend-screen"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`
        }}
      />
    </div>
  );
};

const ServiceModal: React.FC<{ service: any | null; onClose: () => void; onContact: (s: string) => void }> = ({ service, onClose, onContact }) => {
  if (!service) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-zinc-800 rounded-3xl overflow-hidden animate-flip-in shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-900 rounded-full z-20 hover:bg-red-600 transition-colors shadow-xl text-white">
          <X size={18} />
        </button>
        
        <div className="p-6 md:p-12 space-y-8">
          <div>
            <div className="inline-block p-3 bg-[#A12A2E]/10 rounded-xl text-[#A12A2E] mb-4">
              {service.icon}
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              {service.title}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-[#A12A2E] pl-4">
              "{service.fullDescription}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {service.items.map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-zinc-300 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-[#A12A2E] shrink-0" /> {item}
              </div>
            ))}
          </div>

          <button onClick={() => onContact(service.title)} className="w-full bg-[#A12A2E] hover:bg-red-700 text-white py-4 md:py-6 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95">
            <MessageSquare size={18} /> Orçamento via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const mustangImg = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200";

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      className="relative w-full aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-zinc-800/50 cursor-none select-none shadow-2xl group bg-zinc-900"
    >
      <div className="absolute inset-0">
        <img src={mustangImg} alt="Depois" className="w-full h-full object-cover brightness-105 contrast-110" />
      </div>
      <div className="absolute inset-0 z-10 border-r-2 border-[#A12A2E] shadow-[5px_0_15px_rgba(0,0,0,0.4)] overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <div className="absolute inset-0" style={{ width: `${100 / (sliderPos / 100)}%`, height: '100%' }}>
          <img src={mustangImg} alt="Antes" className="w-full h-full object-cover grayscale-[0.4] brightness-[0.7] contrast-[0.95]" />
          <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply" />
        </div>
      </div>
      <div className="absolute top-0 bottom-0 z-20 w-0 pointer-events-none" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-[#A12A2E] rounded-full shadow-2xl flex items-center justify-center border-2 border-zinc-950 transition-transform group-hover:scale-110">
          <MoveHorizontal className="text-white w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  );
};

const Showroom360 = () => {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots = [
    { id: 1, x: 25, y: 65, title: "VERNIZ ESPELHADO", desc: "Aplicação de verniz de alto sólido." },
    { id: 2, x: 70, y: 45, title: "VINCOS PRESERVADOS", desc: "Recuperação artesanal de fábrica." },
    { id: 3, x: 50, y: 75, title: "ZERO IMPUREZAS", desc: "Processo em cabine pressurizada." },
  ];

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0c] px-4 md:px-12 overflow-hidden border-y border-zinc-900">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <div className="flex items-center gap-2 mb-3">
            <Maximize2 className="text-[#A12A2E] w-4 h-4" />
            <span className="text-[#A12A2E] font-black uppercase tracking-[0.3em] text-[10px]">Experiência Imersiva</span>
          </div>
          <h3 className="text-3xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none">
            VITRINE <span className="text-[#A12A2E]">360° SPOTLIGHT</span>
          </h3>
          <p className="text-zinc-500 text-xs md:text-lg max-w-2xl mt-4 font-light italic px-4">Arraste para revelar a perfeição sob a luz técnica.</p>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          className="relative aspect-video rounded-[1.5rem] md:rounded-[4rem] overflow-hidden bg-black cursor-crosshair group shadow-2xl border border-zinc-800/50"
        >
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
            alt="Showroom"
          />

          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,255,255,0.12) 0%, transparent 40%)`
            }}
          />
          
          <div 
            className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              clipPath: `circle(22% at ${spotlightPos.x}% ${spotlightPos.y}%)`
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover scale-[1.02]"
              alt="Highlight"
            />
          </div>

          {hotspots.map((hs) => (
            <div 
              key={hs.id}
              className="absolute z-20"
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
            >
              <button className="relative w-6 h-6 md:w-10 md:h-10 bg-[#A12A2E] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-125 transition-all border-2 border-white/20">
                <Plus size={14} className={activeHotspot === hs.id ? 'rotate-45' : ''} />
              </button>
              {activeHotspot === hs.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 md:w-48 bg-zinc-950 border border-zinc-800 p-2 md:p-3 rounded-xl">
                  <h4 className="text-[#A12A2E] font-display font-black text-[10px] md:text-sm uppercase mb-1">{hs.title}</h4>
                  <p className="text-[8px] md:text-[10px] text-zinc-500 leading-tight uppercase tracking-wider">{hs.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: any; index: number; onOpen: (s: any) => void }> = ({ service, index, onOpen }) => (
  <div 
    onClick={() => onOpen(service)}
    className="group relative flex flex-col justify-between min-h-[320px] md:h-[420px] rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900/30 border border-zinc-800/50 p-6 md:p-10 cursor-pointer transition-all hover:border-[#A12A2E] hover:bg-zinc-900/60 active:scale-[0.98] md:active:scale-100"
  >
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-zinc-950 rounded-xl text-[#A12A2E] group-hover:bg-[#A12A2E] group-hover:text-white transition-colors">
          {service.icon}
        </div>
        <span className="font-display text-2xl md:text-4xl font-black text-white/5 uppercase italic">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-[#A12A2E] transition-colors">
          {service.title}
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed mb-4">
          {service.description}
        </p>

        <ul className="space-y-2">
          {service.items.slice(0, 3).map((item: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2 text-[10px] md:text-[11px] font-medium text-zinc-500 uppercase">
              <CheckCircle2 size={10} className="text-[#A12A2E]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white pt-6 border-t border-zinc-800/50 mt-4">
      Detalhes <ArrowUpRight size={12} className="text-[#A12A2E]" />
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none"
      >
        <span className={`text-xs md:text-lg font-bold uppercase tracking-tight transition-colors ${isOpen ? 'text-[#A12A2E]' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown size={16} className={`text-[#A12A2E] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-zinc-400 text-[10px] md:text-base leading-relaxed font-light italic pl-4 border-l border-[#A12A2E]/30">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- FAQ Content ---
const faqs = [
  { q: "Trabalham com seguradoras?", a: "Sim, atendemos todas as principais seguradoras do mercado com assessoria completa no processo de sinistro." },
  { q: "Quanto tempo leva um reparo?", a: "O prazo varia conforme a complexidade. Reparos de martelinho podem ser feitos no mesmo dia, enquanto funilaria e pintura levam de 3 a 7 dias úteis." },
  { q: "A pintura tem garantia?", a: "Sim, utilizamos materiais de padrão original (Glasurit/PPG) e oferecemos garantia de excelência no acabamento e fidelidade de cor." },
  { q: "Fazem orçamento por foto?", a: "Sim, você pode enviar fotos via WhatsApp para uma estimativa inicial, embora a avaliação presencial seja fundamental para o orçamento final." }
];

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [damageParts, setDamageParts] = useState<string[]>([]);
  const [formData, setFormData] = useState({ nome: '', celular: '', modelo: '', ano: '', servico: 'Funilaria e Pintura', descricao: '' });
  
  const WHATSAPP_NUMBER = '5514996551728';
  const GOOGLE_MAPS_URL = 'https://www.google.com/maps/dir//Av.+Caetano+Perlati,+693+-+Vila+Nossa+Sra.+de+Fatima,+Ja%C3%BA+-+SP,+17210-441/@-22.2858167,-48.560611,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94b8bcb8432a674d:0xc9e4695e20d20739!2m2!1d-48.560611!2d-22.2858167';

  const services = [
    { id: 'lataria', title: 'Reparos de Lataria', description: 'Recuperação estrutural técnica e alinhamento.', fullDescription: 'Restauração da integridade física do veículo.', icon: <Layers size={24} />, items: ['Recuperação Monobloco', 'Alinhamento Técnico', 'Troca de Painéis', 'Solda MIG'] },
    { id: 'martelinho', title: 'Martelinho de Ouro', description: 'Remoção de amassados preservando a pintura.', fullDescription: 'Remoção de pequenas mossas artesanalmente.', icon: <Sparkles size={24} />, items: ['Danos de Granizo', 'Batidas de Porta', 'Preservação de Pintura', 'Acabamento Fino'] },
    { id: 'pintura', title: 'Pintura Premium', description: 'Acabamento de alto brilho em cabine.', fullDescription: 'Processo rigoroso de pintura técnica.', icon: <Palette size={24} />, items: ['Colorimetria Digital', 'Verniz High Solid', 'Cabine Pressurizada', 'Padrão OEM'] },
    { id: 'estrutural', title: 'Recuperação Técnica', description: 'Correções complexas em chassis.', fullDescription: 'Intervenções profundas para geometria correta.', icon: <Settings size={24} />, items: ['Gabarito de Chassi', 'Estirador Hidráulico', 'Reforço Estrutural', 'Laudo Técnico'] },
    { id: 'colisao', title: 'Sinistro / Seguro', description: 'Assessoria completa via seguradoras.', fullDescription: 'Gestão total do processo de sinistro.', icon: <Siren size={24} />, items: ['Credenciamento Total', 'Gestão de Peças', 'Relatórios', 'Prioridade'] }
  ];

  const carParts = [
    { label: 'Frente', icon: <Car size={18} /> },
    { label: 'Traseira', icon: <Car size={18} className="-scale-x-100" /> }, 
    { label: 'Lateral', icon: <MoveHorizontal size={18} /> },
    { label: 'Teto', icon: <ArrowUpRight size={18} /> },
    { label: 'Parachoque', icon: <Wrench size={18} /> }
  ];

  const togglePart = (label: string) => {
    setDamageParts(prev => 
      prev.includes(label) 
        ? prev.filter(p => p !== label) 
        : [...prev, label]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const partsText = damageParts.length > 0 ? `📍 Partes: ${damageParts.join(', ')}\n` : '';
    const message = `Olá! Orçamento Recadiesel:\n👤 Nome: ${formData.nome}\n📱 Cel: ${formData.celular}\n🚗 Veículo: ${formData.modelo}\n${partsText}🛠️ Serviço: ${formData.servico}\n📝 Descrição: ${formData.descricao}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 selection:bg-[#A12A2E] overflow-x-hidden cursor-none">
      <CustomCursor />
      
      <nav className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 md:px-6 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col gap-1 md:gap-2">
            <Logo />
            <ShopStatusBadge />
          </div>
          <div className="flex items-center gap-4 md:gap-10">
            <a href="#servicos" onClick={(e) => {e.preventDefault(); scrollToId('servicos');}} className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#A12A2E] transition-colors cursor-pointer">Serviços</a>
            <a href="#contato" onClick={(e) => {e.preventDefault(); scrollToId('contato');}} className="bg-[#A12A2E] text-white px-4 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-700 shadow-xl transition-all cursor-pointer whitespace-nowrap">Orçamento</a>
          </div>
        </div>
      </nav>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} onContact={(t) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Orçamento para: ${t}`)} />

      {/* Hero */}
      <section id="inicio" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 px-4 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/80 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A12A2E]/10 border border-[#A12A2E]/20 text-[#A12A2E] text-[8px] md:text-[10px] font-black uppercase tracking-widest">
              <Zap size={12} className="md:w-[14px]" /> Atendimento em Jaú-SP
            </div>
            {/* Reduzido de text-4xl sm:text-7xl md:text-8xl lg:text-9xl para os tamanhos abaixo para evitar cortes */}
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.2] uppercase italic tracking-tighter text-white">
              <span className="reflection-text">RESTAURANDO</span> <br />
              <div className="my-2 md:my-3">
                <span className="reflection-text-red not-italic">O PADRÃO</span>
              </div>
              <span className="reflection-text">DE FÁBRICA.</span>
            </h1>
            <p className="text-sm md:text-xl text-zinc-400 font-light border-l-2 md:border-l-4 border-[#A12A2E] pl-4 md:pl-8 max-w-xl italic leading-relaxed">
              Excelência técnica em funilaria e pintura premium para quem busca perfeição industrial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button onClick={() => scrollToId('contato')} className="group bg-[#A12A2E] hover:bg-red-700 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer">
                Orçamento Rápido <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollToId('servicos')} className="bg-zinc-900/50 border border-zinc-800 px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:bg-zinc-800 transition-all cursor-pointer">Ver Serviços</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <div className="py-8 md:py-12 bg-zinc-950/50 border-y border-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-20 grayscale italic font-display text-lg md:text-4xl font-bold uppercase tracking-widest">
             <span>3M</span> <span>GLASURIT</span> <span>PPG</span> <span>NORTON</span> <span>WANDA</span>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <section className="py-16 md:py-24 px-4 md:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h3 className="text-3xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none">SEU CARRO <br /><span className="text-[#A12A2E]">COMO NOVO</span></h3>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-light italic border-l-2 border-[#A12A2E] pl-4">Esqueça o amassado. Resgatamos a originalidade com técnica industrial.</p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <BeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Spotlight */}
      <Showroom360 />

      {/* Services Grid */}
      <section id="servicos" className="py-20 md:py-32 px-4 md:px-12 scroll-mt-24">
        <div className="container mx-auto">
          <h3 className="text-center text-3xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-12 md:mb-20">ESPECIALIDADES <span className="text-[#A12A2E]">PREMIUM</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {services.map((s, idx) => <ServiceCard key={s.id} service={s} index={idx} onOpen={setSelectedService} />)}
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="py-16 md:py-24 px-4 md:px-12 bg-zinc-950/40">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-8">Onde está o <span className="text-[#A12A2E]">Dano?</span></h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
            {carParts.map((part) => (
              <button 
                key={part.label}
                onClick={() => togglePart(part.label)}
                className={`flex flex-col items-center gap-2 md:gap-3 px-4 py-6 md:px-6 md:py-8 rounded-xl md:rounded-2xl border transition-all min-w-[100px] md:min-w-[150px] active:scale-95 ${
                  damageParts.includes(part.label) 
                  ? 'bg-[#A12A2E] border-[#A12A2E] text-white shadow-xl' 
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                {part.icon}
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{part.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="localizacao" className="py-16 md:py-24 bg-[#0c0c0e] px-4 md:px-12 border-t border-zinc-900/40 scroll-mt-24">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6 text-center md:text-left">
            <h3 className="text-3xl md:text-6xl font-display font-black uppercase italic tracking-tighter">ESTAMOS EM <span className="text-[#A12A2E]">JAÚ/SP</span></h3>
            <a href={GOOGLE_MAPS_URL} target="_blank" className="bg-zinc-900 border border-zinc-800 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A12A2E] hover:border-[#A12A2E] transition-all flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Google Maps <ExternalLink size={14} />
            </a>
          </div>
          <div className="h-[300px] md:h-[500px] rounded-2xl md:rounded-[3rem] overflow-hidden border border-zinc-800 grayscale invert opacity-60 hover:opacity-100 transition-opacity">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.846513360492!2d-48.563185924705575!3d-22.285811779698966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8bcb8432a674d%3A0xc9e4695e20d20739!2sAv.%20Caetano%20Perlati%2C%20693%20-%20Vila%20Nossa%20Sra.%20de%20Fatima%2C%20Ja%C3%BA%20-%20SP%2C%2017210-441!5e0!3m2!1spt-BR!2sbr!4v1710123456789!5m2!1spt-BR!2sbr" className="w-full h-full border-0"></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="py-20 md:py-32 bg-[#0a0a0c] px-4 md:px-12 scroll-mt-24">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="space-y-10 md:space-y-12">
            <h3 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-tight text-center lg:text-left">VAMOS <br /><span className="text-[#A12A2E]">RESTAURAR?</span></h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
            </div>
            <div className="space-y-6 pt-10 border-t border-zinc-800 text-center lg:text-left">
               <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6"><MapPin className="text-[#A12A2E] w-5 h-5" /> <span className="font-bold text-sm md:text-lg">Av. Caetano Perlati, 693 - Jaú/SP</span></div>
               <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6"><Phone className="text-[#A12A2E] w-5 h-5" /> <span className="font-bold text-sm md:text-lg">(14) 99655-1728</span></div>
            </div>
          </div>
          <div className="glass-card p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-zinc-800 shadow-2xl">
            <h4 className="text-xl md:text-2xl font-display font-black uppercase italic mb-6 md:mb-8 text-center lg:text-left">Entrar em Contato</h4>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
              <input required placeholder="Seu Nome" className="w-full bg-zinc-900 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base cursor-none" onChange={e => setFormData({...formData, nome: e.target.value})} />
              <input required placeholder="WhatsApp" type="tel" className="w-full bg-zinc-900 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base cursor-none" onChange={e => setFormData({...formData, celular: e.target.value})} />
              <input required placeholder="Modelo do Veículo" className="w-full bg-zinc-900 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base cursor-none" onChange={e => setFormData({...formData, modelo: e.target.value})} />
              <textarea required rows={3} placeholder="Descrição rápida..." className="w-full bg-zinc-900 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all resize-none text-sm md:text-base cursor-none" onChange={e => setFormData({...formData, descricao: e.target.value})} />
              <button type="submit" className="w-full bg-[#A12A2E] hover:bg-red-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest transition-all cursor-none active:scale-95 text-xs md:text-sm">Enviar WhatsApp</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-[#0c0c0e] border-t border-zinc-900/50 text-center px-4">
        <Logo className="justify-center mb-6 md:mb-8" />
        <p className="text-zinc-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] px-4 leading-relaxed">© 2024 Recadiesel Premium Repair | Jaú - SP</p>
      </footer>

      {/* FAB Mobile Friendly */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-green-600 text-white p-4 md:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all cursor-none" aria-label="WhatsApp">
        <MessageSquare size={24} className="md:w-7 md:h-7" />
      </a>
    </div>
  );
};

export default App;