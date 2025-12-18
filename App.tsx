
import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Car, 
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
  Clock, 
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Navigation,
  PhoneCall,
  Shield,
  Gauge,
  ExternalLink
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: React.ReactNode;
  items: string[];
  image: string;
}

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`group flex items-center gap-3 select-none ${className}`}>
    <div className="relative">
      <div className="relative flex items-center justify-center w-11 h-11 bg-zinc-100 rounded-xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-[4px_4px_0px_rgba(161,42,46,1)]">
        <Gauge className="text-[#A12A2E] w-7 h-7" strokeWidth={2.5} />
        <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-1 rounded-md border border-zinc-800 shadow-xl group-hover:scale-110 transition-transform">
          <Wrench className="w-3 h-3 text-[#A12A2E]" />
        </div>
      </div>
    </div>
    
    <div className="flex flex-col leading-none">
      <div className="flex items-baseline">
        <span className="font-display font-black text-2xl md:text-3xl tracking-tighter text-white uppercase italic">
          RECA<span className="text-[#A12A2E] not-italic">DIESEL</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[2px] w-6 bg-[#A12A2E]"></div>
        <span className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.25em] text-zinc-400">
          Premium Repair
        </span>
      </div>
    </div>
  </div>
);

/**
 * ServiceCard com Efeito Parallax 3D Multicamadas e Iluminação Dinâmica
 */
const ServiceCard: React.FC<{ service: Service; onOpen: (s: Service) => void }> = ({ service, onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Sensibilidade controlada para profundidade pronunciada sem tontura
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10; 
    const rotateY = (centerX - x) / 10;
    
    setRotate({ x: rotateX, y: rotateY });
    
    // Posição da iluminação (follow cursor)
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    setLightPos({ x: lightX, y: lightY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: '1500px',
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovering ? 1.03 : 1})`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d'
      }}
      className="group relative glass-card p-8 rounded-3xl border border-zinc-800 flex flex-col h-full overflow-hidden cursor-default transition-all duration-300 hover:shadow-[0_40px_80px_-15px_rgba(161,42,46,0.25)] hover:border-[#A12A2E]/50"
    >
      {/* Luz Reativa (Glow de Superfície) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(161,42,46,0.25) 0%, transparent 60%)`
        }}
      />

      {/* Camada superior flutuante (Ícone) */}
      <div 
        className="mb-8 p-4 bg-[#A12A2E]/10 rounded-2xl w-fit text-[#A12A2E] shadow-xl border border-[#A12A2E]/10"
        style={{ 
          transform: isHovering ? `translateZ(80px)` : `translateZ(0px)`,
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        {service.icon}
      </div>
      
      {/* Título flutuante */}
      <h3 
        className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-wide uppercase italic text-white drop-shadow-2xl"
        style={{ 
          transform: isHovering ? `translateZ(60px)` : `translateZ(0px)`,
          transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        {service.title}
      </h3>
      
      {/* Conteúdo com profundidade intermediária */}
      <div 
        className="flex-grow"
        style={{ 
          transform: isHovering ? `translateZ(40px)` : `translateZ(0px)`,
          transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <p className="text-zinc-400 text-sm md:text-base mb-6 font-light leading-relaxed">
          {service.description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {service.items.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
              <CheckCircle2 className="w-5 h-5 text-[#A12A2E] mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botão na camada de topo */}
      <button 
        onClick={() => onOpen(service)}
        style={{ 
          transform: isHovering ? `translateZ(100px)` : `translateZ(0px)`,
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
        className="mt-auto w-full py-4 bg-zinc-800 hover:bg-[#A12A2E] text-white rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-2xl border border-zinc-700/50"
      >
        Saber mais <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const ServiceModal: React.FC<{ service: Service | null; onClose: () => void; onContact: (s: string) => void }> = ({ service, onClose, onContact }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal com a animação Flip-In definida no HTML */}
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-flip-in">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-zinc-800 hover:bg-[#A12A2E] rounded-full transition-colors z-20 shadow-xl"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="h-56 md:h-72 relative overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <div className="mb-4 p-4 bg-[#A12A2E] rounded-2xl w-fit text-white shadow-2xl">
              {service.icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic tracking-tighter drop-shadow-2xl">{service.title}</h2>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-8">
          <div className="space-y-4">
            <h4 className="text-[#A12A2E] font-bold uppercase tracking-widest text-xs flex items-center gap-3">
              <span className="w-12 h-[1px] bg-[#A12A2E]"></span> Expertise Técnica
            </h4>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg font-light italic">
              "{service.fullDescription}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm md:text-base text-zinc-400 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-800/50 hover:border-[#A12A2E]/40 transition-all">
                <CheckCircle2 className="w-5 h-5 text-[#A12A2E] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onContact(service.title)}
              className="flex-1 bg-[#A12A2E] hover:bg-[#8B2428] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(161,42,46,0.35)] hover:scale-[1.02] active:scale-95"
            >
              <MessageSquare className="w-6 h-6" /> Orçamento via WhatsApp
            </button>
            <button 
              onClick={onClose}
              className="px-10 py-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-2xl font-bold transition-all active:scale-95"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-xl py-4 shadow-2xl border-b border-zinc-800' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo />

        <div className="hidden lg:flex items-center gap-10">
          <a href="#inicio" className="text-sm font-semibold hover:text-[#A12A2E] transition-colors uppercase tracking-widest">Início</a>
          <a href="#servicos" className="text-sm font-semibold hover:text-[#A12A2E] transition-colors uppercase tracking-widest">Serviços</a>
          <a href="#seguradoras" className="text-sm font-semibold hover:text-[#A12A2E] transition-colors uppercase tracking-widest">Seguros</a>
          <a href="#contato" className="bg-[#A12A2E] hover:bg-[#8B2428] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all transform hover:scale-110 shadow-[0_0_20px_rgba(161,42,46,0.4)]">
            Solicitar Orçamento
          </a>
        </div>

        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 py-10 px-8 space-y-6 shadow-2xl animate-in slide-in-from-top duration-500">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="block text-2xl font-display font-bold py-3 uppercase italic">Início</a>
          <a href="#servicos" onClick={() => setIsOpen(false)} className="block text-2xl font-display font-bold py-3 uppercase italic">Serviços</a>
          <a href="#seguradoras" onClick={() => setIsOpen(false)} className="block text-2xl font-display font-bold py-3 uppercase italic">Seguradoras</a>
          <a href="#contato" onClick={() => setIsOpen(false)} className="block bg-[#A12A2E] text-white p-5 rounded-2xl text-center font-black uppercase tracking-widest text-lg">Orçamento Agora</a>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    anoModelo: '',
    servico: 'Funilaria e Pintura',
    descricao: ''
  });

  const WHATSAPP_NUMBER = '5514996551728';
  const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Av.+Caetano+Perlati,+693+-+Jardim+Estadio,+Ja%C3%BA+-+SP";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactWhatsApp = (serviceTitle: string) => {
    const message = `Olá Recadiesel! Vi o serviço de *${serviceTitle}* no site e gostaria de solicitar um orçamento para o meu veículo.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá Recadiesel! Gostaria de um orçamento rápido:
*Nome:* ${formData.nome}
*Celular:* ${formData.celular}
*Veículo:* ${formData.anoModelo}
*Serviço:* ${formData.servico}
*O que ocorreu:* ${formData.descricao}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const services: Service[] = [
    {
      id: 'lataria',
      title: 'Reparos de Lataria',
      description: 'Recuperamos a estrutura e o acabamento original com precisão milimétrica.',
      fullDescription: 'Especialistas em recuperação de metais. Utilizamos equipamentos de tração e gabaritos originais para assegurar que cada milímetro da carroceria retorne ao seu estado de fábrica, preservando as zonas de deformação programada e a segurança estrutural.',
      icon: <Layers className="w-10 h-10" />,
      items: ['Amassados leves a graves', 'Recuperação de peças originais', 'Alinhamento de carroceria', 'Substituição técnica'],
      image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'martelinho',
      title: 'Martelinho de Ouro',
      description: 'Solução artesanal para pequenos danos, mantendo a pintura intocada.',
      fullDescription: 'A arte da funilaria a frio. Ideal para amassados onde a tinta não sofreu fissuras. Nossa técnica artesanal permite remover danos causados por granizo ou batidas de porta sem a necessidade de lixamento ou repintura, valorizando o veículo.',
      icon: <Sparkles className="w-10 h-10" />,
      items: ['Danos causados por granizo', 'Batidas de porta em estacionamento', 'Preservação do valor venal', 'Rapidez na entrega'],
      image: 'https://images.unsplash.com/photo-1590496793907-39b722bb3a1f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pintura',
      title: 'Pintura Automotiva',
      description: 'Acabamento profissional de alto brilho com cabine de secagem controlada.',
      fullDescription: 'Utilizamos sistema de pintura base água eco-friendly e laboratório de tintas próprio. Nossa cabine de pintura de última geração com pressão positiva garante um ambiente livre de poeira para um acabamento liso, brilhante e sem imperfeições.',
      icon: <Palette className="w-10 h-10" />,
      items: ['Acerto de cor computadorizado', 'Cabine de pintura técnica', 'Verniz de alta resistência', 'Padrão original de fábrica'],
      image: 'https://images.unsplash.com/photo-1621905252507-b352220264b3?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'estrutural',
      title: 'Recuperação Estrutural',
      description: 'Reparos técnicos de alta complexidade em chassis e longarinas.',
      fullDescription: 'Segurança em primeiro lugar. Em colisões severas, utilizamos a mesa alinhadora e sistemas de medição a laser para garantir que o monobloco do veículo esteja perfeitamente alinhado, garantindo a estabilidade e dirigibilidade original.',
      icon: <Settings className="w-10 h-10" />,
      items: ['Correção de longarinas', 'Alinhamento em mesa técnica', 'Soldas especiais MIG/MAG', 'Certificação de segurança'],
      image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'colisao',
      title: 'Serviços Pós-Colisão',
      description: 'Atendimento integral e suporte técnico após acidentes e sinistros.',
      fullDescription: 'Simplificamos o processo após um acidente. Oferecemos desde o guincho até a perícia técnica. Trabalhamos em conjunto com reguladores de seguros para garantir que todos os danos, inclusive os ocultos, sejam devidamente reparados.',
      icon: <Siren className="w-10 h-10" />,
      items: ['Avaliação técnica profunda', 'Suporte perante seguradoras', 'Logística de peças rápida', 'Transparência total'],
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'estetica',
      title: 'Estética Automotiva',
      description: 'Proteção extrema e polimento técnico para brilho duradouro.',
      fullDescription: 'Cuidado premium com o acabamento. Realizamos polimento técnico em múltiplos estágios para remover micro-riscos e vitrificação de pintura com nanotecnologia, criando uma camada de proteção hidrofóbica e brilho profundo.',
      icon: <Zap className="w-10 h-10" />,
      items: ['Polimento técnico 3M', 'Vitrificação Ceramic Coating', 'Espelhamento de pintura', 'Higienização de interiores'],
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'plastico',
        title: 'Reparos em Plástico',
        description: 'Recuperação técnica de para-choques e peças em fibra.',
        fullDescription: 'Evite a troca desnecessária de peças originais. Utilizamos solda plástica de alta fusão e reforços de polímeros para recuperar rachaduras e quebras em componentes plásticos, garantindo resistência e acabamento invisível.',
        icon: <Wrench className="w-10 h-10" />,
        items: ['Solda plástica térmica', 'Recuperação de para-choques', 'Reparos em fibra de vidro', 'Texturização original'],
        image: 'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'especiais',
        title: 'Projetos Especiais',
        description: 'Cuidado personalizado para restaurações e customizações.',
        fullDescription: 'Para quem ama seu carro. Realizamos restaurações parciais, tratamento anticorrosivo rigoroso em chassis e aplicações de pinturas especiais. Cada projeto é tratado como uma obra de arte única por nossos mestres funileiros.',
        icon: <Car className="w-10 h-10" />,
        items: ['Correção de ferrugem técnica', 'Tratamento anticorrosivo', 'Personalização de cores', 'Restauração de clássicos'],
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-[#A12A2E] selection:text-white">
      <Navbar />

      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
        onContact={handleContactWhatsApp}
      />

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-24 overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
            alt="Oficina de Luxo" 
            className="w-full h-full object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 max-w-3xl">
            <div className="inline-flex items-center gap-3 bg-[#A12A2E]/10 border border-[#A12A2E]/20 px-6 py-2 rounded-full">
              <span className="w-3 h-3 bg-[#A12A2E] rounded-full animate-pulse" />
              <span className="text-xs font-black text-[#A12A2E] uppercase tracking-[0.3em]">Referência em Jaú e Região</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black leading-[0.95] tracking-tighter uppercase italic drop-shadow-2xl">
              RESTAURANDO <br />
              <span className="text-[#A12A2E] not-italic">PERFEIÇÃO</span> <br />
              TÉCNICA.
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-xl border-l-4 border-[#A12A2E] pl-6">
              Mestres em funilaria pesada e estética de alto padrão. Onde a tecnologia automotiva encontra o cuidado artesanal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#contato" className="bg-[#A12A2E] hover:bg-[#8B2428] text-white px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-[0_15px_30px_rgba(161,42,46,0.4)] flex items-center justify-center gap-3">
                Solicitar Orçamento <ArrowRight className="w-6 h-6" />
              </a>
              <a href="#servicos" className="bg-zinc-800/50 backdrop-blur-md hover:bg-zinc-700 border border-zinc-700 px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3">
                Nossas Soluções
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-zinc-800/40">
                <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-display font-black italic text-white">+25 anos</p>
                    <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Experiência</p>
                </div>
                <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-display font-black italic text-white">12k+</p>
                    <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Reparos</p>
                </div>
                <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-display font-black italic text-[#A12A2E]">100%</p>
                    <p className="text-xs text-zinc-500 uppercase font-black tracking-widest">Garantia</p>
                </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative group">
            <div className="absolute -inset-10 bg-[#A12A2E]/20 rounded-full blur-[120px] group-hover:bg-[#A12A2E]/30 transition-all duration-700" />
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-zinc-800 rotate-2 group-hover:rotate-0 transition-all duration-1000">
               <img 
                 src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800" 
                 alt="Carro Esportivo de Luxo" 
                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden px-6">
        <div className="absolute inset-0 checkered-bg opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#A12A2E]/5 rounded-full blur-[150px] -z-10" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-6">
              <h2 className="text-[#A12A2E] font-black uppercase tracking-[0.4em] text-sm flex items-center gap-4">
                <span className="w-16 h-[2px] bg-[#A12A2E]"></span> Performance Extrema
              </h2>
              <p className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[1] uppercase italic tracking-tighter">
                SOLUÇÕES DE <br />
                <span className="text-[#A12A2E] not-italic">ALTA PRECISÃO</span>
              </p>
            </div>
            <p className="text-zinc-500 max-w-md text-base md:text-lg border-l-2 border-zinc-800 pl-8 font-light italic leading-relaxed">
              Equipamentos de nível mundial e técnicos certificados pelas principais montadoras para garantir que seu carro receba o melhor tratamento possível.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} onOpen={setSelectedService} />
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section id="seguradoras" className="py-24 md:py-40 bg-zinc-900/40 px-6 relative">
        <div className="container mx-auto">
          <div className="glass-card rounded-[3rem] p-8 md:p-20 border-l-[12px] border-l-[#A12A2E] flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#A12A2E]/5 to-transparent pointer-events-none" />
            
            <div className="flex-1 space-y-10">
              <div className="bg-[#A12A2E]/10 p-5 rounded-2xl w-fit shadow-[0_10px_30px_rgba(161,42,46,0.15)]">
                <ShieldCheck className="w-12 h-12 text-[#A12A2E]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase italic leading-[1]">
                CREDENCIADOS PELAS <br />
                <span className="text-[#A12A2E] not-italic underline decoration-4 underline-offset-8">PRINCIPAIS SEGURADORAS</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
                Agilidade na regulação do sinistro e foco na originalidade. Cuidamos de toda a parte burocrática junto à sua seguradora para que você se preocupe apenas em voltar a dirigir.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Regulação técnica expressa',
                  'Vistorias periciais por imagem',
                  'Fidelidade total às peças originais',
                  'Desconto em franquias selecionadas',
                  'Certificado de garantia Recadiesel',
                  'Atendimento prioritário ao segurado'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-300">
                    <CheckCircle2 className="w-6 h-6 text-[#A12A2E] shrink-0" />
                    <span className="text-base md:text-lg font-semibold tracking-wide uppercase italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-2/5 w-full bg-zinc-950/80 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-zinc-800 space-y-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
               <div className="flex items-center justify-between">
                 <h4 className="text-2xl font-black flex items-center gap-4 uppercase font-display italic text-white">
                   <Clock className="text-[#A12A2E] w-8 h-8" /> Suporte 24h
                 </h4>
                 <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Online</div>
               </div>
               <p className="text-base text-zinc-400 font-light leading-relaxed">Sinistrado? Não perca tempo. Fale agora com nossa central de atendimento especializada em seguros e receba o suporte necessário.</p>
               <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="w-full py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(34,197,94,0.3)] hover:scale-105">
                 Falar com Especialista <MessageSquare className="w-6 h-6" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contato" className="py-24 md:py-40 bg-zinc-950 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-[#A12A2E] font-black uppercase tracking-[0.4em] text-sm">Visite Nossa Unidade</h2>
                <h3 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter italic leading-[1]">JAÚ <br /><span className="text-[#A12A2E] not-italic">SÃO PAULO</span></h3>
                <p className="text-zinc-400 text-lg font-light max-w-lg leading-relaxed border-l-2 border-zinc-800 pl-8">Localizada estrategicamente para atender toda a região central do estado com rapidez e eficiência técnica.</p>
              </div>

              {/* Map Iframe */}
              <div className="relative group rounded-[2.5rem] overflow-hidden border border-zinc-800 h-[400px] md:h-[500px] w-full shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.423927233816!2d-48.5447781!3d-22.280922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8ac3e70669719%3A0xc665768e7f101235!2sAv.%20Caetano%20Perlati%2C%20693%20-%20Jardim%20Estadio%2C%20Ja%C3%BA%20-%20SP%2C%2017203-370!5e0!3m2!1spt-BR!2sbr!4v1740600000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  title="Recadiesel Location"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a 
                    href={MAPS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#A12A2E] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-4 shadow-2xl uppercase tracking-widest"
                  >
                    <Navigation className="w-6 h-6" /> Abrir no Google Maps
                  </a>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-12 pt-10">
                <div className="flex items-start gap-6">
                  <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-xl group-hover:scale-110 transition-transform">
                    <MapPin className="text-[#A12A2E] w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="text-xl font-black uppercase font-display italic text-white mb-2">Endereço</h5>
                    <p className="text-zinc-400 text-base leading-relaxed font-light">Av. Caetano Perlati, 693<br />Jardim Estadio, Jaú - SP<br />CEP 17203-370</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-xl">
                    <Phone className="text-[#A12A2E] w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="text-xl font-black uppercase font-display italic text-white mb-2">Atendimento</h5>
                    <div className="text-zinc-400 text-base space-y-3 pt-1">
                      <p className="flex items-center gap-3 font-semibold">
                        <PhoneCall className="w-4 h-4 text-[#A12A2E]" />
                        <span>(14) 3625-1273</span>
                      </p>
                      <p className="flex items-center gap-3 font-black text-[#A12A2E]">
                        <MessageSquare className="w-4 h-4" />
                        <span>(14) 99655-1728</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="glass-card p-10 md:p-16 rounded-[3rem] relative overflow-hidden border border-zinc-800 shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#A12A2E]" />
                <div className="mb-12">
                  <h4 className="text-3xl md:text-4xl font-display font-black mb-4 uppercase tracking-tight text-white italic leading-tight">SOLICITAR <br /><span className="text-[#A12A2E] not-italic">AVALIAÇÃO TÉCNICA</span></h4>
                  <p className="text-base text-zinc-500 font-light leading-relaxed">Envie os detalhes do seu veículo e receba um pré-orçamento detalhado diretamente no seu WhatsApp em instantes.</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">Seu Nome</label>
                      <input 
                        required 
                        type="text" 
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome Completo" 
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#A12A2E] transition-all text-white placeholder:text-zinc-700 font-medium" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">WhatsApp</label>
                      <input 
                        required 
                        type="tel" 
                        name="celular"
                        value={formData.celular}
                        onChange={handleInputChange}
                        placeholder="(14) 99999-9999" 
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#A12A2E] transition-all text-white placeholder:text-zinc-700 font-medium" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">Veículo e Ano</label>
                    <input 
                      required 
                      type="text" 
                      name="anoModelo"
                      value={formData.anoModelo}
                      onChange={handleInputChange}
                      placeholder="Ex: Audi A3 2022 Branco" 
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#A12A2E] transition-all text-white placeholder:text-zinc-700 font-medium" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">Tipo de Serviço</label>
                    <div className="relative">
                      <select 
                        name="servico"
                        value={formData.servico}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#A12A2E] transition-all text-white appearance-none font-medium"
                      >
                        <option>Funilaria e Pintura</option>
                        <option>Martelinho de Ouro</option>
                        <option>Reparo de Para-choque</option>
                        <option>Estética / Polimento</option>
                        <option>Sinistro / Seguro</option>
                        <option>Restauração / Especial</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">Descreva o Dano</label>
                    <textarea 
                      required 
                      rows={4} 
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      placeholder="Conte-nos o que aconteceu com o seu veículo..." 
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#A12A2E] transition-all text-white placeholder:text-zinc-700 resize-none font-medium leading-relaxed"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-6 bg-[#A12A2E] hover:bg-[#8B2428] text-white rounded-2xl font-black text-xl transition-all shadow-[0_20px_40px_rgba(161,42,46,0.35)] flex items-center justify-center gap-4 uppercase tracking-widest group">
                    Enviar para Consultor <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="text-[10px] text-zinc-700 text-center uppercase font-black tracking-[0.4em] mt-6 italic">
                    Avaliação rápida via WhatsApp
                  </p>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 pt-32 pb-16 border-t border-zinc-900 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <Logo />
              <p className="text-zinc-500 max-w-md text-lg leading-relaxed font-light italic">
                "Não apenas consertamos carros, restauramos a confiança e a satisfação de dirigir um veículo impecável. Compromisso Recadiesel com a excelência desde 1999."
              </p>
              <div className="flex gap-6">
                {[
                  { icon: <MessageSquare />, link: `https://wa.me/${WHATSAPP_NUMBER}` },
                  { icon: <ShieldCheck />, link: "#seguradoras" },
                  { icon: <Navigation />, link: MAPS_URL }
                ].map((social, idx) => (
                  <a key={idx} href={social.link} target="_blank" className="bg-zinc-900 p-4 rounded-xl hover:bg-[#A12A2E] transition-all border border-zinc-800 text-zinc-400 hover:text-white hover:-translate-y-2 shadow-xl">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h5 className="font-black text-xl font-display uppercase italic text-white tracking-widest">Acesso Rápido</h5>
              <ul className="space-y-4 text-zinc-500 text-base font-bold uppercase italic tracking-widest">
                <li><a href="#inicio" className="hover:text-[#A12A2E] transition-all flex items-center gap-3 group"><span className="w-0 group-hover:w-4 h-[2px] bg-[#A12A2E] transition-all"></span> Home</a></li>
                <li><a href="#servicos" className="hover:text-[#A12A2E] transition-all flex items-center gap-3 group"><span className="w-0 group-hover:w-4 h-[2px] bg-[#A12A2E] transition-all"></span> Serviços</a></li>
                <li><a href="#seguradoras" className="hover:text-[#A12A2E] transition-all flex items-center gap-3 group"><span className="w-0 group-hover:w-4 h-[2px] bg-[#A12A2E] transition-all"></span> Seguros</a></li>
                <li><a href="#contato" className="hover:text-[#A12A2E] transition-all flex items-center gap-3 group"><span className="w-0 group-hover:w-4 h-[2px] bg-[#A12A2E] transition-all"></span> Contato</a></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h5 className="font-black text-xl font-display uppercase italic text-white tracking-widest">Horários</h5>
              <div className="space-y-3 text-zinc-500 text-base font-medium">
                <p className="flex justify-between items-center"><span className="text-zinc-400 font-black">Seg - Sex:</span> <span>08h às 18h</span></p>
                <p className="flex justify-between items-center"><span className="text-zinc-400 font-black">Sábado:</span> <span>08h às 12h</span></p>
                <div className="h-[1px] bg-zinc-800 w-full my-4"></div>
                <p className="text-[#A12A2E] font-black uppercase tracking-widest text-xs">Suporte 24h via WhatsApp</p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs text-zinc-700 font-black uppercase tracking-[0.3em]">© 2024 Recadiesel Funilaria e Pintura Jaú - SP. Todos os direitos reservados.</p>
            <div className="flex gap-10 text-[10px] text-zinc-700 uppercase font-black tracking-[0.5em]">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        className="fixed bottom-8 right-8 z-[60] bg-green-500 text-white p-5 md:p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(34,197,94,0.5)] hover:shadow-[0_25px_60px_rgba(34,197,94,0.7)] hover:scale-110 active:scale-95 transition-all flex items-center gap-5 group"
      >
        <div className="hidden md:flex flex-col items-end border-r border-white/20 pr-5">
          <span className="font-black text-sm uppercase tracking-widest mb-0.5">Orçamento Rápido</span>
          <span className="text-[10px] opacity-90 font-black">(14) 99655-1728</span>
        </div>
        <div className="relative">
          <MessageSquare className="w-8 h-8 md:w-10 md:h-10 fill-white/10" />
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      </a>
    </div>
  );
};

export default App;
