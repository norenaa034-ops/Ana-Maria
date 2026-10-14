import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Plus, Trash2, ShieldCheck, Scale, Cpu, Loader2 } from 'lucide-react';

interface ProductCompareModalProps {
  isOpen: boolean;
  products: Product[];
  currency: Currency;
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  isOpen,
  products,
  currency,
  onClose,
  onRemoveProduct,
  onClearCompare,
  onAddToCart,
  onQuickView
}) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!isOpen || products.length === 0) return null;

  const handleGenerateAiComparison = async () => {
    setIsAnalyzing(true);
    setAiError(null);
    try {
      const response = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productIds: products.map((p) => p.id)
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al analizar equipos');
      }
      setAiAnalysis(data.analysis);
    } catch (err: any) {
      setAiError(err?.message || 'Error al generar dictamen con IA.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden my-8"
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Comparativa Técnica de Equipos ({products.length})
              </h3>
              <p className="text-xs text-slate-400">
                Análisis lado a lado de especificaciones, consumo eléctrico, garantías y precios por volumen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleGenerateAiComparison}
              disabled={isAnalyzing}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analizando con IA...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Dictamen Comparativo IA</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                onClearCompare();
                onClose();
              }}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
            >
              Limpiar Selección
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar comparador"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table Body */}
        <div className="p-6 max-h-[80vh] overflow-x-auto overflow-y-auto space-y-5">
          {/* AI Verdict Box if generated */}
          {aiError && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200">
              {aiError}
            </div>
          )}

          {aiAnalysis && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Cpu className="w-4 h-4" />
                <span>VEREDICTO DE INGENIERÍA GENERADO POR IA:</span>
              </div>
              <p className="text-slate-200 leading-relaxed whitespace-pre-line">{aiAnalysis}</p>
            </div>
          )}

          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 w-48 text-xs font-semibold text-slate-400 align-top bg-slate-900/40">
                  Parámetro Técnico
                </th>
                {products.map((p) => (
                  <th key={p.id} className="p-3 align-top min-w-[220px] max-w-[280px]">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                        <span className="text-amber-400 font-semibold">{p.brand}</span>
                        <button
                          onClick={() => onRemoveProduct(p.id)}
                          className="text-slate-500 hover:text-rose-400 cursor-pointer"
                          title="Quitar de comparativa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          onQuickView(p);
                        }}
                        className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer leading-snug"
                      >
                        {p.name}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">SKU: {p.sku}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {/* Base & Volume Price */}
              <tr className="bg-slate-900/20">
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Precio Unitario & Volumen
                </td>
                {products.map((p) => {
                  const bestTier = p.bulkTiers[p.bulkTiers.length - 1];
                  return (
                    <td key={p.id} className="p-3 space-y-1">
                      <div className="text-base font-bold text-white font-mono tabular-nums">
                        {formatPrice(p.basePriceUSD, currency)}
                      </div>
                      {bestTier && bestTier.discountPercent > 0 && (
                        <div className="text-[11px] text-amber-400 font-mono">
                          Volumen ({bestTier.label}): {formatPrice(bestTier.pricePerUnit, currency)} (-
                          {bestTier.discountPercent}%)
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Summary Description */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Descripción General
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-slate-300 leading-relaxed">
                    {p.shortDesc}
                  </td>
                ))}
              </tr>

              {/* Ideal For */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Aplicación Recomendada
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-amber-300/90 leading-relaxed">
                    {p.idealFor}
                  </td>
                ))}
              </tr>

              {/* Technical Specs List */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Especificaciones Principales
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 align-top">
                    <div className="space-y-2">
                      {p.specs.map((s) => (
                        <div key={s.label} className="border-b border-slate-800/60 pb-1.5 last:border-none">
                          <span className="text-[11px] text-slate-400 block">{s.label}:</span>
                          <span className="font-mono text-[11px] text-slate-100">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Physical Dimensions */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Dimensiones y Peso
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-mono text-[11px] text-slate-200">
                    {p.dimensions}
                  </td>
                ))}
              </tr>

              {/* Electrical / Power */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Energía y Consumo
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-mono text-[11px] text-slate-200">
                    {p.powerSpec}
                  </td>
                ))}
              </tr>

              {/* Reliability MTBF */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Fiabilidad MTBF & Clima
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-mono text-[11px] text-emerald-400">
                    {p.mtbfHours} · {p.operatingTemp}
                  </td>
                ))}
              </tr>

              {/* Certifications & Warranty */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">
                  Garantía & Certificaciones
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 space-y-1.5">
                    <div className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.warranty}</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-400">
                      {p.certifications.join(' · ')}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action Row */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">Acción Directa</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => onAddToCart(p, 1)}
                      className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir a Orden</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
