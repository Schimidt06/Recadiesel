
import React, { useState, useRef, useCallback } from 'react';
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
  CheckCircle
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
      <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-zinc-100 rounded-lg shadow-[2px_2px_0px_rgba(161,42,46,1)] md:shadow-[3px_3px_0px_rgba(161,42,46,1)]">
        <Gauge className="text-[#A12A2E] w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-white uppercase italic">
        RECA<span className="text-[#A12A2E] not-italic">DIESEL</span>
      </span>
      <span className="text-[7px] md:text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500">Premium Repair</span>
    </div>
  </div>
);

const ServiceModal: React.FC<{ service: any | null; onClose: () => void; onContact: (s: string) => void }> = ({ service, onClose, onContact }) => {
  if (!service) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-zinc-800 rounded-3xl md:rounded-[2.5rem] overflow-hidden animate-flip-in shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 bg-zinc-900 rounded-full z-20 cursor-pointer hover:bg-red-600 transition-colors shadow-xl text-white">
          <X size={18} />
        </button>
        
        <div className="p-8 md:p-12 space-y-8 md:space-y-10">
          <div>
            <div className="inline-block p-3 md:p-4 bg-[#A12A2E]/10 rounded-xl md:rounded-2xl text-[#A12A2E] mb-4 md:mb-6">
              {service.icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              {service.title}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-[#A12A2E] pl-4 md:pl-6">
              "{service.fullDescription}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {service.items.map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-zinc-300 bg-zinc-900/50 p-3 md:p-4 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#A12A2E] shrink-0" /> {item}
              </div>
            ))}
          </div>

          <button onClick={() => onContact(service.title)} className="w-full bg-[#A12A2E] hover:bg-red-700 text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 md:gap-4 cursor-pointer shadow-xl active:scale-95">
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
        <div className="absolute top-4 right-4 md:top-6 md:right-8 bg-zinc-950/80 px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black text-white z-20 border border-white/10 uppercase tracking-[0.2em] backdrop-blur-md">PERFEIÇÃO</div>
      </div>
      <div className="absolute inset-0 z-10 border-r-2 border-[#A12A2E] shadow-[5px_0_15px_rgba(0,0,0,0.4)] overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <div className="absolute inset-0" style={{ width: `${100 / (sliderPos / 100)}%`, height: '100%' }}>
          <img src={mustangImg} alt="Antes" className="w-full h-full object-cover grayscale-[0.4] brightness-[0.7] contrast-[0.95]" />
          <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply" />
        </div>
        <div className="absolute top-4 left-4 md:top-6 md:left-8 bg-[#A12A2E] px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black text-white z-20 uppercase tracking-[0.2em] shadow-xl">PASSADO</div>
      </div>
      <div className="absolute top-0 bottom-0 z-20 w-0 pointer-events-none" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#A12A2E] rounded-full shadow-2xl flex items-center justify-center border-2 md:border-4 border-zinc-950 transition-transform group-hover:scale-110">
          <MoveHorizontal className="text-white w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ service: any; index: number; onOpen: (s: any) => void }> = ({ service, index, onOpen }) => (
  <div 
    onClick={() => onOpen(service)}
    className="group relative flex flex-col justify-between min-h-[360px] md:h-[420px] rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900/30 border border-zinc-800/50 p-6 md:p-10 cursor-pointer transition-all duration-300 hover:border-[#A12A2E] hover:bg-zinc-900/60 hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] md:active:scale-100"
  >
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-start">
        <div className="p-3 md:p-4 bg-zinc-950 rounded-xl md:rounded-2xl text-[#A12A2E] border border-zinc-800/50 group-hover:bg-[#A12A2E] group-hover:text-white transition-colors duration-300">
          {service.icon}
        </div>
        <span className="font-display text-3xl md:text-4xl font-black text-white/5 uppercase italic group-hover:text-[#A12A2E]/20 transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-2 md:mb-3 leading-tight group-hover:text-[#A12A2E] transition-colors">
          {service.title}
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed mb-4 md:mb-6">
          {service.description}
        </p>

        <ul className="space-y-2">
          {service.items.slice(0, 3).map((item: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2 text-[10px] md:text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-wider">
              <CheckCircle2 size={10} className="text-[#A12A2E]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white pt-4 md:pt-6 border-t border-zinc-800 group-hover:border-[#A12A2E]/30 transition-colors mt-4">
      Mais Detalhes <ArrowUpRight size={12} className="text-[#A12A2E]" />
    </div>
  </div>
);

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({ nome: '', celular: '', modelo: '', ano: '', servico: 'Funilaria e Pintura', descricao: '' });
  const WHATSAPP_NUMBER = '5514996551728';
  const GOOGLE_MAPS_URL = 'https://www.google.com/maps/dir//Av.+Caetano+Perlati,+693+-+Vila+Nossa+Sra.+de+Fatima,+Ja%C3%BA+-+SP,+17210-441/@-22.2858167,-48.560611,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94b8bcb8432a674d:0xc9e4695e20d20739!2m2!1d-48.560611!2d-22.2858167';

  const services = [
    { id: 'lataria', title: 'Reparos de Lataria', description: 'Recuperação estrutural técnica e alinhamento de precisão.', fullDescription: 'Utilizamos tecnologia de ponta para restaurar a integridade física do seu veículo, garantindo segurança e o alinhamento original de fábrica.', icon: <Layers size={24} />, items: ['Recuperação Monobloco', 'Alinhamento Técnico', 'Troca de Painéis', 'Solda MIG Especializada'] },
    { id: 'martelinho', title: 'Martelinho de Ouro', description: 'A arte artesanal de remover amassados sem pintura.', fullDescription: 'Remoção de pequenas mossas e amassados de granizo ou batidas leves mantendo 100% da originalidade da pintura.', icon: <Sparkles size={24} />, items: ['Danos de Granizo', 'Batidas de Porta', 'Preservação de Pintura', 'Acabamento Fino'] },
    { id: 'pintura', title: 'Pintura Premium', description: 'Acabamento de alto brilho em cabine climatizada.', fullDescription: 'Processo rigoroso de pintura com laboratório próprio de cores e secagem em cabine pressurizada para evitar impurezas.', icon: <Palette size={24} />, items: ['Colorimetria Digital', 'Verniz High Solid', 'Cabine Pressurizada', 'Padrão OEM'] },
    { id: 'estrutural', title: 'Recuperação Técnica', description: 'Correções complexas em chassis e longarinas.', fullDescription: 'Intervenções profundas para veículos com danos estruturais severos, devolvendo a geometria correta do veículo.', icon: <Settings size={24} />, items: ['Gabarito de Chassi', 'Estirador Hidráulico', 'Reforço Estrutural', 'Laudo Técnico'] },
    { id: 'colisao', title: 'Sinistro / Seguro', description: 'Assessoria completa para reparos via seguradoras.', fullDescription: 'Facilitamos todo o trâmite com a sua seguradora, priorizando a qualidade e a agilidade na entrega do seu veículo.', icon: <Siren size={24} />, items: ['Credenciamento Total', 'Gestão de Peças', 'Relatórios p/ Seguros', 'Agilidade Prioritária'] }
  ];

  const processSteps = [
    { title: 'Diagnóstico', icon: <Search size={20} />, text: 'Avaliação técnica detalhada do dano e estrutura.' },
    { title: 'Preparação', icon: <Settings size={20} />, text: 'Proteção total e preparação minuciosa da superfície.' },
    { title: 'Execução', icon: <Palette size={20} />, text: 'Aplicação técnica com precisão milimétrica.' },
    { title: 'Finalização', icon: <CheckCircle size={20} />, text: 'Polimento premium e controle de qualidade final.' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de um orçamento:\n\n👤 Nome: ${formData.nome}\n📱 Celular: ${formData.celular}\n🚗 Veículo: ${formData.modelo} (${formData.ano})\n🛠️ Serviço: ${formData.servico}\n📝 Descrição: ${formData.descricao}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 selection:bg-[#A12A2E] overflow-x-hidden">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 px-4 md:px-6 transition-all duration-300 bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4 md:gap-10">
            <a href="#servicos" onClick={(e) => {e.preventDefault(); scrollToId('servicos');}} className="hidden sm:block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#A12A2E] transition-colors cursor-pointer">Serviços</a>
            <a href="#contato" onClick={(e) => {e.preventDefault(); scrollToId('contato');}} className="relative group overflow-hidden bg-[#A12A2E] text-white px-5 py-2 md:px-8 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(161,42,46,0.3)] active:scale-95 cursor-pointer">
              <span className="relative z-10">Orçamento</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </a>
          </div>
        </div>
      </nav>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} onContact={(t) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de um orçamento para: ${t}`)} />

      {/* Hero */}
      <section id="inicio" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 px-6 md:px-12">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/70 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] md:leading-[0.85] uppercase italic tracking-tighter text-white">
              RESTAURANDO <br />
              <span className="text-[#A12A2E] not-italic">O PADRÃO</span> <br />
              DE FÁBRICA.
            </h1>
            <p className="text-base md:text-xl text-zinc-400 font-light border-l-2 md:border-l-4 border-[#A12A2E] pl-4 md:pl-8 max-w-xl leading-relaxed italic">
              Excelência técnica em funilaria e pintura premium em Jaú-SP. Compromisso com a perfeição em cada detalhe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => scrollToId('contato')} className="bg-[#A12A2E] hover:bg-red-700 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-3">Solicitar Orçamento <ArrowRight size={20} /></button>
              <button onClick={() => scrollToId('servicos')} className="bg-zinc-900/50 border border-zinc-800 px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:bg-zinc-800 transition-all cursor-pointer backdrop-blur-sm">Conhecer Serviços</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Marks */}
      <div className="py-12 bg-zinc-950/50 border-y border-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 mb-8">Nossos Insumos de Alta Performance</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
             <span className="font-display text-2xl md:text-4xl font-bold">3M</span>
             <span className="font-display text-2xl md:text-4xl font-bold italic">GLASURIT</span>
             <span className="font-display text-2xl md:text-4xl font-bold">PPG</span>
             <span className="font-display text-2xl md:text-4xl font-bold italic">NORTON</span>
             <span className="font-display text-2xl md:text-4xl font-bold">WANDA</span>
          </div>
        </div>
      </div>

      {/* Before/After Slider */}
      <section className="py-16 md:py-24 bg-[#0c0c0e] px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <Star className="text-[#A12A2E] fill-[#A12A2E]" size={14} />
                <h2 className="text-[#A12A2E] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">A Arte do Reencontro</h2>
              </div>
              <h3 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none">SEU CARRO <br /><span className="text-[#A12A2E]">COMO NOVO</span></h3>
              <p className="text-zinc-100 text-lg md:text-xl leading-relaxed font-semibold italic border-l-0 lg:border-l-4 border-[#A12A2E] lg:pl-6 py-2">
                Fala a verdade: você ainda se lembra daquela sensação de tirar seu carro zero?
              </p>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-light">
                Esqueça o amassado ou a batida. Na Recadiesel, resgatamos a dignidade da sua máquina. Deslize e veja a transformação.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <BeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-zinc-950/30 px-6 md:px-12">
        <div className="container mx-auto">
          <h3 className="text-center text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-16">NOSSO <span className="text-[#A12A2E]">PROCESSO</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative group p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#A12A2E] transition-all">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-zinc-950 rounded-full border border-zinc-800 flex items-center justify-center font-display font-black text-xl text-[#A12A2E] group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <div className="mb-6 text-[#A12A2E]">{step.icon}</div>
                <h4 className="text-xl font-display font-black uppercase italic mb-3">{step.title}</h4>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 md:py-32 px-6 md:px-12 scroll-mt-20 md:scroll-mt-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12 md:mb-20 space-y-3 md:space-y-4">
            <h2 className="text-[#A12A2E] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-xs">Especialidades</h2>
            <h3 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-2 md:mb-4">SOLUÇÕES <span className="text-[#A12A2E]">TÉCNICAS</span></h3>
            <div className="w-16 md:w-24 h-1 bg-[#A12A2E]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, idx) => <ServiceCard key={s.id} service={s} index={idx} onOpen={setSelectedService} />)}
          </div>
        </div>
      </section>

      {/* Showroom Gallery */}
      <section className="py-24 px-6 md:px-12 bg-[#0c0c0e]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="aspect-[4/5] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group cursor-crosshair">
                <img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Job 1" />
             </div>
             <div className="aspect-[4/5] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group cursor-crosshair translate-y-8">
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Job 2" />
             </div>
             <div className="aspect-[4/5] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group cursor-crosshair">
                <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Job 3" />
             </div>
             <div className="aspect-[4/5] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group cursor-crosshair translate-y-8">
                <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Job 4" />
             </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="localizacao" className="py-16 md:py-24 bg-[#0c0c0e] px-4 md:px-12 border-t border-zinc-900/40 scroll-mt-20 md:scroll-mt-24">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 gap-6 text-center md:text-left">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-[#A12A2E] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">Visite nossa Oficina</h2>
              <h3 className="text-3xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none">ESTAMOS <br className="hidden md:block" /><span className="text-[#A12A2E]">PERTINHO</span> DE VOCÊ</h3>
            </div>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 border border-zinc-800 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A12A2E] hover:border-[#A12A2E] transition-all flex items-center gap-3 shadow-xl active:scale-95 group">
              Abrir no Google Maps <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl md:rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl group">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.846513360492!2d-48.563185924705575!3d-22.285811779698966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8bcb8432a674d%3A0xc9e4695e20d20739!2sAv.%20Caetano%20Perlati%2C%20693%20-%20Vila%20Nossa%20Sra.%20de%20Fatima%2C%20Ja%C3%BA%20-%20SP%2C%2017210-441!5e0!3m2!1spt-BR!2sbr!4v1710123456789!5m2!1spt-BR!2sbr&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-20|visibility:on" className="w-full h-full border-0 grayscale invert brightness-90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
             <div className="absolute inset-0 pointer-events-none border-4 md:border-[12px] border-zinc-950/20" />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="py-20 md:py-32 bg-[#0a0a0c] px-6 md:px-12 scroll-mt-20 md:scroll-mt-24">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-10 text-center lg:text-left">
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-tight">ORÇAMENTO <br className="md:hidden" /><span className="text-[#A12A2E]">EXPRESS</span></h3>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-light italic border-l-2 border-[#A12A2E] pl-4 md:pl-6">
                "Não é apenas lataria, é a alma do seu veículo de volta à vida."
              </p>
              <div className="space-y-4 md:space-y-6 pt-4 text-left inline-block lg:block">
                <div className="flex items-center gap-4 md:gap-6"><div className="p-3 md:p-4 bg-zinc-900 rounded-xl"><MapPin className="text-[#A12A2E]" size={20} /></div><p className="text-sm md:text-lg font-bold text-white">Av. Caetano Perlati, 693 - Jaú/SP</p></div>
                <div className="flex items-center gap-4 md:gap-6"><div className="p-3 md:p-4 bg-zinc-900 rounded-xl"><Phone className="text-[#A12A2E]" size={20} /></div><p className="text-sm md:text-lg font-bold text-white">(14) 99655-1728</p></div>
              </div>
            </div>
            <div className="glass-card p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-zinc-800/40 shadow-2xl relative">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#A12A2E]/10 rounded-full blur-3xl" />
              <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                <input required placeholder="Nome Completo" className="w-full bg-zinc-900/30 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base" onChange={e => setFormData({...formData, nome: e.target.value})} />
                <input required placeholder="Celular / WhatsApp" type="tel" className="w-full bg-zinc-900/30 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base" onChange={e => setFormData({...formData, celular: e.target.value})} />
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <input required placeholder="Veículo" className="w-full bg-zinc-900/30 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base" onChange={e => setFormData({...formData, modelo: e.target.value})} />
                  <input required placeholder="Ano" className="w-full bg-zinc-900/30 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all text-sm md:text-base" onChange={e => setFormData({...formData, ano: e.target.value})} />
                </div>
                <textarea required rows={3} placeholder="Descrição rápida do reparo necessário..." className="w-full bg-zinc-900/30 border-b border-zinc-800 py-3 md:py-4 px-2 focus:outline-none focus:border-[#A12A2E] text-white transition-all resize-none text-sm md:text-base" onChange={e => setFormData({...formData, descricao: e.target.value})} />
                <button type="submit" className="w-full bg-[#A12A2E] hover:bg-red-700 text-white py-4 md:py-5 rounded-xl font-black uppercase tracking-widest transition-all cursor-pointer shadow-xl active:scale-95 text-xs md:text-sm">Enviar Dados via WhatsApp</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-[#0c0c0e] border-t border-zinc-900/50 text-center px-6 flex flex-col items-center">
        <Logo className="justify-center mb-6 md:mb-8" />
        
        <div className="flex gap-6 mb-8 text-zinc-500">
           <a href="#" className="hover:text-[#A12A2E] transition-colors"><Instagram size={24} /></a>
           <a href="#" className="hover:text-[#A12A2E] transition-colors"><Facebook size={24} /></a>
        </div>

        <div className="mb-8 md:mb-10 w-full max-w-xs md:max-w-none">
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300 w-full">
            <div className="flex items-center justify-center gap-2 font-bold text-xs md:text-sm tracking-tighter uppercase italic text-center">
              <MapPin size={16} className="text-[#A12A2E] shrink-0" />
              Av. Caetano Perlati, 693 - Jaú/SP
            </div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#A12A2E] flex items-center gap-1 group-hover:gap-3 transition-all">
              Ver Rota no Google Maps <ArrowRight size={10} />
            </span>
          </a>
        </div>

        <p className="text-zinc-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">© 2024 Recadiesel Premium Repair | Jaú - SP</p>
      </footer>

      {/* FAB WhatsApp */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-green-600 text-white p-4 md:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all" aria-label="Contato via WhatsApp">
        <MessageSquare size={24} className="md:w-7 md:h-7" />
      </a>
    </div>
  );
};

export default App;
