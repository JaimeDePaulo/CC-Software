/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Code, 
  Monitor, 
  Cpu, 
  Wrench, 
  Network, 
  Server, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Menu,
  X,
  Layers,
  Database,
  Terminal,
  Activity,
  HardDrive,
  Settings
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.15)"; // Slightly increased for slower speed
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#22c55e"; // brand-accent (green)
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(draw, 80);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20 opacity-30 pointer-events-none"
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#servicos" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "nav-blur py-4" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center font-bold text-slate-950 text-xl group-hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-all">
            CC
          </div>
          <span className="logo-text text-2xl text-white group-hover:text-brand-accent transition-colors">
            CC <span className="text-brand-accent">Software</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium opacity-80 uppercase tracking-widest text-white hover:text-brand-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-brand-accent"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, items, isSoftware, onClick }: { icon: any, title: string, items: string[], isSoftware: boolean, onClick?: () => void }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`p-8 rounded-2xl card-immersive group cursor-pointer ${onClick ? "" : "pointer-events-none"}`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-slate-900 border border-brand-accent/30 group-hover:border-brand-accent transition-colors`}>
        <Icon size={32} className="text-brand-accent" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-slate-400 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${isSoftware ? "bg-blue-500" : "bg-brand-accent"}`} />
            {item}
          </li>
        ))}
      </ul>
      <button className={`mt-8 flex items-center gap-2 text-sm font-medium transition-colors ${
        isSoftware ? "text-blue-400 hover:text-blue-300" : "text-brand-accent hover:text-brand-accent/80"
      }`}>
        Saber mais <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};

const ServiceDetailsOverlay = ({ isOpen, onClose, service }: { isOpen: boolean, onClose: () => void, service: any }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          <motion.div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[40px] p-8 md:p-16 relative z-10 overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
            >
              <Settings className="rotate-45" size={32} />
            </button>

            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-2xl bg-brand-accent flex items-center justify-center text-slate-950">
                <service.icon size={40} />
              </div>
              <div>
                <span className="text-brand-accent font-bold text-sm uppercase tracking-widest">{service.category}</span>
                <h2 className="text-4xl font-bold">{service.title}</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Visão Geral</h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Principais Áreas</h3>
                  {service.details.map((detail: string, idx: number) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                      <p className="text-slate-300 text-sm">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-3xl p-8 border border-white/5 h-fit">
                <h3 className="text-xl font-bold mb-6 text-white text-center underline underline-offset-8 decoration-brand-accent">Inovação CC-Software</h3>
                <div className="space-y-6 mb-10">
                  {service.points.map((point: any, idx: number) => (
                    <div key={idx} className="flex border-b border-white/5 pb-4 last:border-0 last:pb-0 gap-4">
                      <div className="text-brand-accent">
                        <Activity size={20} />
                      </div>
                      <p className="text-xs text-slate-400 italic">"{point}"</p>
                    </div>
                  ))}
                </div>
                
                <ContactSelector title="Solicitar este Serviço:" serviceName={service.title} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DirectorCard = ({ name, role, photo, whatsapp, education }: { name: string, role: string, photo: string, whatsapp: string, education: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-immersive p-6 rounded-3xl flex flex-col items-center text-center group"
    >
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors shadow-xl">
        <img src={photo} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <h4 className="text-xl font-bold mb-1">{name}</h4>
      <p className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-4">{role}</p>
      <p className="text-slate-400 text-sm mb-6 max-w-xs">{education}</p>
      
      <a 
        href={`https://wa.me/${whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 border border-white/10 hover:border-brand-accent hover:bg-brand-accent hover:text-slate-950 transition-all text-xs font-bold"
      >
        WhatsApp: {whatsapp}
      </a>
    </motion.div>
  );
};

const managers = [
  {
    name: "Alberto Macaia",
    role: "Director Geral",
    photo: "https://lh3.googleusercontent.com/d/11-4V6S5R9CNWrB8qvpUk2HSIgp3ZCPBM",
    whatsapp: "+33 7 53 37 47 96"
  },
  {
    name: "Jaime de Paulo",
    role: "Director Executivo",
    photo: "https://lh3.googleusercontent.com/d/1jv7HMLwlLgbGJl_cvficJuJHG-AHATO9",
    whatsapp: "+244 939785068"
  }
];

const ContactSelector = ({ title = "Falar com um Gestor:", serviceName = "" }: { title?: string, serviceName?: string }) => {
  return (
    <div className="space-y-4">
      <p className="text-white font-bold text-sm uppercase tracking-widest text-center decoration-brand-accent underline underline-offset-4 mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {managers.map((manager, idx) => (
          <a
            key={idx}
            href={`https://wa.me/${manager.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(`Olá ${manager.name}, gostaria de solicitar informações sobre o serviço ${serviceName ? `de ${serviceName}` : 'da CC-Software'}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-brand-accent transition-all group"
          >
            <img src={manager.photo} alt={manager.name} className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-brand-accent" referrerPolicy="no-referrer" />
            <div className="text-left">
              <p className="text-white text-xs font-bold">{manager.name}</p>
              <p className="text-brand-accent text-[10px] uppercase font-bold tracking-tighter">{manager.role}</p>
            </div>
            <div className="ml-auto text-[#25D366]">
              <Activity size={16} className="animate-pulse" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [selectedService, setSelectedService] = useState<any>(null);

  const servicesData = {
    web: {
      category: "Software",
      title: "Desenvolvimento Web",
      icon: Terminal,
      description: "Construímos pontes digitais entre o seu negócio e os seus clientes. Nossas aplicações web são focadas em performance, escalabilidade e uma UX imbatível.",
      details: [
        "Aplicações SPA (Single Page Applications) ultra-rápidas.",
        "Integração contínua com serviços de Cloud Architecture.",
        "Design Responsivo adaptado a qualquer dispositivo.",
        "Segurança de dados com protocolos de criptografia de ponta."
      ],
      points: [
          "Código limpo seguindo as diretrizes SOLID.",
          "Foco em métricas reais de conversão.",
          "Suporte 24/7 para sistemas críticos."
      ]
    },
    automation: {
      category: "Software",
      title: "Sistemas & Automação",
      icon: Database,
      description: "Transformamos o caos operacional em fluidez digital. Automatizamos processos repetitivos para que a sua equipa possa focar no que realmente importa.",
      details: [
        "Sistemas ERP customizados para o mercado angolano.",
        "Pipelines de dados inteligentes e dashboards em tempo real.",
        "Integração de APIs de terceiros (Pagamentos, Logística).",
        "Bots de IA para atendimento e triagem de clientes."
      ],
      points: [
          "Redução de custos operacionais em até 40%.",
          "Eliminação total de erros manuais em inventários.",
          "Sincronização multiplataforma instantânea."
      ]
    },
    maint: {
      category: "Hardware",
      title: "Manutenção Hardware",
      icon: Settings,
      description: "O pulsar físico da sua tecnologia merece cuidado de engenharia. Revitalizamos e otimizamos o seu parque de hardware para máxima longevidade.",
      details: [
        "Manutenção preditiva em servidores e estações de trabalho.",
        "Reparação eletrónica a nível de componente (Micro-soldadura).",
        "Upgrades estratégicos para prolongar a vida útil do equipamento.",
        "Gestão técnica de ativos e inventário tecnológico."
      ],
      points: [
          "Peças originais com garantia certificada.",
          "Tempo de resposta recorde para paragens críticas.",
          "Relatórios técnicos detalhados pós-intervenção."
      ]
    },
    infra: {
      category: "Hardware",
      title: "Redes & Infraestrutura",
      icon: Network,
      description: "Desenhamos as autoestradas por onde viajam os seus dados. Criamos redes robustas, seguras e prontas para o crescimento do seu negócio.",
      details: [
        "Implementação de Redes Estruturadas (Fiber, Cat6).",
        "Configuração avançada de Servidores Locais e Híbridos.",
        "Soluções de WI-FI empresarial de alta densidade.",
        "Firewalls e sistemas físicos de segurança de perímetro."
      ],
      points: [
          "Redundância total para garantir zero downtime.",
          "Monitorização remota 24 horas por dia.",
          "Escalabilidade modular sem troca de arquitetura."
      ]
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-slate-950">
      <MatrixBackground />
      <div className="bg-immersive-glow" />
      <Navbar />

      <ServiceDetailsOverlay 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService}
      />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">
          <div className="border border-brand-secondary/40 p-12 md:p-24 rounded-sm relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-accent text-sm font-medium mb-8"
            >
              <Activity size={14} className="animate-pulse" />
              Líderes em Inovação Tecnológica
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 flex items-center justify-center gap-6"
            >
              <span>CC</span>
              <span className="w-12 h-4 md:w-20 md:h-6 bg-brand-accent inline-block rounded-sm" />
              <span>Software</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl opacity-80 font-light tracking-wide max-w-2xl mx-auto mb-12"
            >
              “O seu conforto é a nossa maior satisfação.”
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="#servicos" className="px-10 py-4 bg-brand-accent text-slate-950 font-bold rounded-3xl hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] transition-all">
                Explorar Serviços
              </a>
              <a href="#contacto" className="px-10 py-4 border border-brand-secondary/20 bg-brand-dark/40 text-white font-bold rounded-3xl transition-all tracking-tight hover:border-brand-secondary">
                Contactar Equipa
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-brand-accent font-bold text-sm uppercase tracking-widest mb-4 block">Especialidades</span>
              <h2 className="text-4xl md:text-5xl font-bold">Soluções Adaptadas ao Futuro</h2>
            </div>
            <p className="opacity-60 max-w-sm mb-2 font-light">
              Cobrimos todas as dimensões do seu ecossistema tecnológico, do código bruto à infraestrutura física.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Software Group */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              <ServiceCard 
                icon={Terminal}
                title="Desenvolvimento Web"
                items={["Aplicações Modernas", "Sistemas Cloud", "E-commerce"]}
                isSoftware={true}
                onClick={() => setSelectedService(servicesData.web)}
              />
              <ServiceCard 
                icon={Database}
                title="Sistemas & Automação"
                items={["ERP Customizados", "APIs Escaláveis", "Automação de Processos"]}
                isSoftware={true}
                onClick={() => setSelectedService(servicesData.automation)}
              />
            </div>
            {/* Hardware Group */}
            <div className="grid gap-8">
              <ServiceCard 
                icon={Settings}
                title="Manutenção Hardware"
                items={["Reparação Avançada", "Upgrade de Sistemas", "Diagnóstico Preciso"]}
                isSoftware={false}
                onClick={() => setSelectedService(servicesData.maint)}
              />
              <ServiceCard 
                icon={Network}
                title="Redes & Infra"
                items={["Instalação de Redes", "Segurança de Dados", "Servidores Locais"]}
                isSoftware={false}
                onClick={() => setSelectedService(servicesData.infra)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl" />
              <img 
                src="https://lh3.googleusercontent.com/d/1aELkO6XUdcaB7t32iCWwrNQ1zuQlrgEi" 
                alt="Sobre nós" 
                className="rounded-3xl relative z-10 border border-white/10 transition-all duration-700 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-accent font-bold text-sm uppercase tracking-widest mb-4 block">A Nossa História</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Excelência em cada bit e componente.</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Na CC - Software, acreditamos que a tecnologia deve ser um facilitador de sonhos e negócios. Combinamos décadas de experiência em Engenharia de Software com perícia técnica em Hardware.
              </p>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Trabalhamos com marcas líderes e startups inovadoras para garantir que cada solução seja robusta, segura e orientada a resultados.
              </p>
              
              <div className="grid grid-cols-2 gap-8 font-bold">
                <div>
                  <span className="text-3xl block mb-2">15+</span>
                  <span className="text-slate-500 text-sm uppercase tracking-tighter">Anos de Experiência</span>
                </div>
                <div>
                  <span className="text-3xl block mb-2">500+</span>
                  <span className="text-slate-500 text-sm uppercase tracking-tighter">Projetos Entregues</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Leadership Team */}
          <div className="pt-20 border-t border-white/5">
            <div className="text-center mb-12">
              <span className="text-brand-accent font-bold text-sm uppercase tracking-widest mb-4 block">Liderança</span>
              <h3 className="text-3xl md:text-4xl font-bold">Nossa Directoria</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <DirectorCard 
                name="Alberto Macaia"
                role="Director Geral"
                photo="https://lh3.googleusercontent.com/d/11-4V6S5R9CNWrB8qvpUk2HSIgp3ZCPBM"
                whatsapp="+33 7 53 37 47 96"
                education="Formado em Eng. Informática pelo Instituto Superior Politécnico Privado"
              />
              <DirectorCard 
                name="Jaime de Paulo"
                role="Director Executivo"
                photo="https://lh3.googleusercontent.com/d/1jv7HMLwlLgbGJl_cvficJuJHG-AHATO9"
                whatsapp="+244 939785068"
                education="Formado em Eng. Informática pelo Instituto Politécnico da Huila"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="card-immersive rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Vamos construir algo <span className="text-brand-accent">incrível</span>?</h2>
                <p className="text-slate-400 text-lg mb-12">Estamos prontos para ouvir o seu desafio. Deixe-nos uma mensagem ou visite o nosso escritório.</p>
                
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-brand-accent" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">E-mail</p>
                      <p className="opacity-60 font-light">cc.saftware@gmail.org</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-brand-accent" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">Telefone</p>
                      <p className="opacity-60 font-light">+33 7 53 37 47 96</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-brand-accent" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">Escritório</p>
                      <p className="opacity-60 font-light">Huila-Lubango-Angola</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-4">Nome</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-accent transition-colors outline-none" placeholder="João Silva" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-4">Email</label>
                    <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-accent transition-colors outline-none" placeholder="cc.saftware@gmail.org" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-4">Mensagem</label>
                  <textarea rows={4} className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-accent transition-colors outline-none resize-none" placeholder="Como podemos ajudar?" />
                </div>
                
                <div className="pt-4 border-t border-white/5">
                  <ContactSelector title="Iniciar conversa agora:" />
                </div>

                <div className="text-center">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">— OU USE O FORMULÁRIO —</span>
                </div>

                <button className="w-full bg-slate-900 border border-white/10 text-white font-bold py-6 rounded-2xl hover:border-brand-accent transition-all uppercase tracking-tighter">
                  Enviar Mensagem via Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center font-bold text-slate-950 text-sm">
              CC
            </div>
            <span className="font-bold tracking-tight text-white underline underline-offset-4 decoration-brand-accent">Software</span>
          </div>
          
          <p className="text-slate-500 text-sm">© 2024 CC - Software. Todos os direitos reservados.</p>
          
          <div className="flex gap-6">
            {["LinkedIn", "Instagram", "GitHub"].map(link => (
              <a key={link} href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{link}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/33753374796"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] z-50 group transition-all"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          fill="white"
          className="group-hover:rotate-12 transition-transform"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
