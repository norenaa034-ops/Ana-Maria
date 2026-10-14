import React from 'react';
import { ArrowRight, ShieldCheck, Truck, CreditCard, Award, Cpu } from 'lucide-react';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onRequestQuote: () => void;
  onOpenAiArchitect: (tab?: 'architect' | 'chat') => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onRequestQuote,
  onOpenAiArchitect
}) => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#0c121e] border-b border-slate-800">
      {/* Subtle ambient light gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-18 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest font-mono">
              <span>Suministros Tecnológicos B2B</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Infraestructura Crítica & IA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Plataforma empresarial de comercio y equipamiento electrónico
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Adquisición directa, dimensionamiento asistido por IA, contratos por volumen y cotizaciones fiscales para centros de datos, corporativos y despliegues industriales.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Catálogo de Equipos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAiArchitect('architect')}
                className="px-5 py-3.5 text-sm font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Arquitecto de Proyectos IA</span>
              </button>

              <button
                onClick={onRequestQuote}
                className="px-5 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Cotización RFP (Net 30/60)
              </button>
            </div>

            {/* Proof Points adjacent to claim */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Despacho 24/48h</span>
                </div>
                <p className="text-slate-400 text-[11px]">Inventario verificado en bodega central</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Crédito B2B</span>
                </div>
                <p className="text-slate-400 text-[11px]">Plazos Net 30 y Net 60 con factura fiscal</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>SLA On-Site 4h</span>
                </div>
                <p className="text-slate-400 text-[11px]">Sustitución técnica en hardware crítico</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>ISO 9001 & CE</span>
                </div>
                <p className="text-slate-400 text-[11px]">Homologación y trazabilidad garantizada</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Showcase Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_enterprise_tech_1790189478014.jpg"
                alt="Showroom de tecnología corporativa y data center NEXUS"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/30 to-transparent" />
              
              {/* Bottom Overlaid Metric Label */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Infraestructura Corporativa Homologada</p>
                  <p className="text-sm font-semibold text-white">Hub de Distribución Tecnológica 2026</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-amber-400 block tabular-nums">Stock Inmediato</span>
                  <span className="text-[11px] text-slate-400">Más de 2,400 SKUs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
