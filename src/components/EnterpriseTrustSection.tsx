import React from 'react';
import { ShieldCheck, CreditCard, Truck, Users, Plus, Layers, FileText } from 'lucide-react';
import { EnterpriseBundle, Product, Currency } from '../types';
import { ENTERPRISE_BUNDLES } from '../data/products';
import { formatPrice, getTierForQuantity } from '../utils/formatters';
import { LegalTabType } from './LegalSlaModal';

interface EnterpriseTrustSectionProps {
  products: Product[];
  currency: Currency;
  onOpenRfp: () => void;
  onAddBundleToCart: (bundle: EnterpriseBundle) => void;
  onOpenLegalModal: (tab: LegalTabType) => void;
}

export const EnterpriseTrustSection: React.FC<EnterpriseTrustSectionProps> = ({
  products,
  currency,
  onOpenRfp,
  onAddBundleToCart,
  onOpenLegalModal
}) => {
  return (
    <section id="garantia-b2b" className="py-16 md:py-24 bg-[#0a0e17] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Part 1: Turnkey Enterprise Hardware Bundles */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <span>Soluciones Pre-Configuradas</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Arquitecturas Validadas</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Paquetes Llave en Mano para Proyectos Corporativos
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kits de infraestructura diseñados por nuestros arquitectos de soluciones con compatibilidad verificada y precios de contrato por volumen aplicados automáticamente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ENTERPRISE_BUNDLES.map((bundle) => {
              const bundleLines = bundle.items
                .map((item) => {
                  const prod = products.find((p) => p.id === item.productId);
                  if (!prod) return null;
                  const { unitPrice } = getTierForQuantity(
                    item.quantity,
                    prod.bulkTiers,
                    prod.basePriceUSD
                  );
                  return {
                    product: prod,
                    quantity: item.quantity,
                    regularLineTotal: prod.basePriceUSD * item.quantity,
                    tierLineTotal: unitPrice * item.quantity
                  };
                })
                .filter(Boolean) as {
                product: Product;
                quantity: number;
                regularLineTotal: number;
                tierLineTotal: number;
              }[];

              const regularTotal = bundleLines.reduce((acc, l) => acc + l.regularLineTotal, 0);
              const bundleTotal = bundleLines.reduce((acc, l) => acc + l.tierLineTotal, 0);

              return (
                <div
                  key={bundle.id}
                  className="bg-[#0f1725] border border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="text-amber-400 font-semibold">{bundle.code}</span>
                      <span className="text-emerald-400">Kit Homologado</span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {bundle.name}
                      </h3>
                      <p className="text-xs text-amber-300/90 mt-1">{bundle.targetSegment}</p>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {bundle.description}
                      </p>
                    </div>

                    {/* Included hardware list */}
                    <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/50">
                      <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Equipamiento Incluido en el Kit:</span>
                      </div>
                      <div className="divide-y divide-slate-800/70 text-xs">
                        {bundleLines.map((line) => (
                          <div
                            key={line.product.id}
                            className="px-3 py-2 flex items-center justify-between gap-2"
                          >
                            <span className="text-slate-200 truncate">
                              <strong className="text-amber-400 font-mono">{line.quantity}x</strong>{' '}
                              {line.product.name}
                            </span>
                            <span className="font-mono text-[11px] text-slate-400 shrink-0 tabular-nums">
                              {formatPrice(line.tierLineTotal, currency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-400 flex items-start gap-1.5 leading-snug">
                      <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{bundle.slaHighlight}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 block">
                          Inversión Total del Paquete:
                        </span>
                        <span className="text-lg font-bold text-white font-mono tabular-nums">
                          {formatPrice(bundleTotal, currency)}
                        </span>
                      </div>
                      {regularTotal > bundleTotal && (
                        <div className="text-right">
                          <span className="text-[11px] text-slate-500 line-through font-mono block tabular-nums">
                            {formatPrice(regularTotal, currency)}
                          </span>
                          <span className="text-[11px] text-emerald-400 font-mono">
                            Ahorro: {formatPrice(regularTotal - bundleTotal, currency)}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddBundleToCart(bundle)}
                      className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Cargar Kit Completo a la Orden B2B</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Corporate SLA, Credit & Logistics Guarantees */}
        <div className="space-y-8 pt-8 border-t border-slate-800/80">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
              <span>Servicios de Aprovisionamiento Corporativo</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>SLA 99.9%</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Diseñado para departamentos de compras, TI y operaciones críticas
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Eliminamos la fricción en la adquisición de hardware empresarial. Desde líneas de crédito rotativo hasta despliegues llave en mano con ingenieros de campo certificados.
            </p>
          </div>

          {/* 4 Architectural Columns with Interactive Policy Modal Triggers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => onOpenLegalModal('credit')}
              className="p-6 rounded-xl bg-[#0f1725] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                Crédito Rotativo Net 30/60
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asignación ágil de cupos corporativos mediante evaluación de estados financieros o certificación fiscal. Sin intereses moratorios en plazo convenido.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-mono flex items-center justify-between">
                <span>Evaluación en &lt; 24 horas</span>
                <span>Ver requisitos →</span>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onOpenLegalModal('sla')}
              className="p-6 rounded-xl bg-[#0f1725] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                Garantía On-Site con SLA 4h
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Respaldo directo de fabricante con ingenieros en sitio y stock de refacciones críticas para sustitución NBD (Next Business Day) sin tiempos muertos.
              </p>
              <div className="pt-2 text-[11px] text-emerald-400 font-mono flex items-center justify-between">
                <span>Cobertura 24/7/365</span>
                <span>Ver póliza SLA →</span>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onOpenLegalModal('terms')}
              className="p-6 rounded-xl bg-[#0f1725] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                Logística Asegurada B2B
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transporte en unidades blindadas para data centers con sensores de impacto, control de temperatura y cadena de custodia con entrega directa en muelle.
              </p>
              <div className="pt-2 text-[11px] text-blue-400 font-mono flex items-center justify-between">
                <span>100% Póliza cubierta</span>
                <span>Ver Incoterms →</span>
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => onOpenLegalModal('privacy')}
              className="p-6 rounded-xl bg-[#0f1725] border border-slate-800 space-y-3 hover:border-slate-700 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                Ejecutivo Key Account & NDA
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Un único punto de contacto técnico-comercial para gestión de compras por volumen, licitaciones privadas y protección ISO 27001.
              </p>
              <div className="pt-2 text-[11px] text-purple-400 font-mono flex items-center justify-between">
                <span>Atención prioritaria VIP</span>
                <span>Ver ISO 27001 →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banner with Consultation CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#162033] border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              ¿Requiere aprovisionar una nueva sede o licitación a medida?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Genere ahora su documento Proforma Oficial RFP con bloqueo de precios por 30 días o consulte nuestra documentación normativa B2B.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenLegalModal('sla')}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Ver Documentación SLA</span>
            </button>
            <button
              type="button"
              onClick={onOpenRfp}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Generar Cotización RFP Formal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
