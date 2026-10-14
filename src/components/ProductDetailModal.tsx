import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice, getTierForQuantity } from '../utils/formatters';
import {
  X,
  ShieldCheck,
  Download,
  Plus,
  Check,
  Truck,
  CheckCircle2,
  Package,
  Cpu,
  Building2,
  Loader2,
  Send
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onRequestQuoteWithItem: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onRequestQuoteWithItem
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'overview' | 'package' | 'reviews' | 'ai'>('specs');
  const [imgError, setImgError] = useState(false);

  // AI Product Insight State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const { unitPrice, tierLabel } = getTierForQuantity(
    quantity,
    product.bulkTiers,
    product.basePriceUSD
  );
  const lineTotal = unitPrice * quantity;
  const regularTotal = product.basePriceUSD * quantity;
  const savings = regularTotal - lineTotal;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleRunProductAi = async (customQuery?: string) => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('/api/ai/product-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          customQuestion: customQuery ?? aiQuestion
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al analizar producto con IA');
      }
      setAiInsight(data.insight);
    } catch (err: any) {
      setAiError(err?.message || 'Error al conectar con el motor de IA.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleDownloadDataSheet = () => {
    const specLines = product.specs.map((s) => `- ${s.label}: ${s.value}`).join('\n');
    const highlightLines = product.highlights.map((h, i) => `  0${i + 1}. ${h}`).join('\n');
    const boxLines = product.boxContents.map((b) => `  * ${b}`).join('\n');
    const tierLines = product.bulkTiers
      .map(
        (t) =>
          `  * ${t.label}: ${formatPrice(t.pricePerUnit, currency)} (${
            t.discountPercent > 0 ? `-${t.discountPercent}% OFF` : 'Precio Base'
          })`
      )
      .join('\n');

    const content = `====================================================================
NEXUS TECH ENTERPRISE - FICHA TÉCNICA DE EQUIPO HOMOLOGADO
====================================================================
PRODUCTO: ${product.name}
MARCA: ${product.brand}
SKU / PART NUMBER: ${product.sku}
CATEGORÍA: ${product.categoryLabel}
CALIFICACIÓN TÉCNICA: ${product.rating.toFixed(1)} / 5.0 (${product.reviewCount} evaluaciones corporativas)
DISPONIBILIDAD: ${product.inStock ? `${product.stockCount} unidades en bodega` : 'Bajo pedido'} (Despacho en ${product.leadTimeDays} días hábiles)

1. DESCRIPCIÓN GENERAL
--------------------------------------------------------------------
${product.fullDesc}

USO RECOMENDADO:
${product.idealFor}

2. CARACTERÍSTICAS DESTACADAS DE INGENIERÍA
--------------------------------------------------------------------
${highlightLines}

3. TABLA DE ESPECIFICACIONES TÉCNICAS
--------------------------------------------------------------------
${specLines}
- Dimensiones y Peso: ${product.dimensions}
- Especificación Eléctrica: ${product.powerSpec}
- Fiabilidad MTBF: ${product.mtbfHours}
- Rango Térmico de Operación: ${product.operatingTemp}
- Sistema / Compatibilidad: ${product.operatingSystemOrFirmware}
- Origen y Manufactura: ${product.originCountry}

4. CONTENIDO DEL EMPAQUE CORPORATIVO
--------------------------------------------------------------------
${boxLines}

5. CERTIFICACIONES Y GARANTÍA SLA
--------------------------------------------------------------------
Certificaciones: ${product.certifications.join(' · ')}
Garantía: ${product.warranty}

6. ESCALA DE PRECIOS CORPORATIVOS (${currency})
--------------------------------------------------------------------
${tierLines}
====================================================================
Generado por Plataforma Corporativa NEXUS Tech Enterprise
`;

    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Ficha_Tecnica_${product.sku}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error downloading datasheet', e);
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-bold">{product.brand}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SKU: {product.sku}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-300 tabular-nums">
              ★ {product.rating.toFixed(1)} ({product.reviewCount} despliegues verificados)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[82vh] overflow-y-auto">
          {/* Left Column: Media, Physical Specs & Datasheet Download */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-center">
                  <Cpu className="w-12 h-12 text-amber-400/70 mb-2" />
                  <span className="text-xs font-medium text-slate-300">{product.name}</span>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded text-xs text-emerald-400 font-mono border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {product.inStock ? `${product.stockCount} Unidades Disponibles` : 'Bajo Pedido'}
                </span>
              </div>
            </div>

            {/* Summary Card of Physical & Electrical Info */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs">
              <h4 className="font-semibold text-slate-200 border-b border-slate-800 pb-1.5">
                Datos Físicos, Eléctricos y Homologación
              </h4>
              <div>
                <span className="text-slate-400 block text-[11px]">Dimensiones y Peso Neto:</span>
                <span className="text-slate-200 font-mono text-[11px]">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Alimentación y Consumo:</span>
                <span className="text-slate-200 font-mono text-[11px]">{product.powerSpec}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Fiabilidad & Rango Térmico:</span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  {product.mtbfHours} · {product.operatingTemp}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Sistema Operativo / Firmware:</span>
                <span className="text-slate-200 text-[11px]">
                  {product.operatingSystemOrFirmware}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Origen y Manufactura:</span>
                <span className="text-slate-200 text-[11px]">{product.originCountry}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Certificaciones Internacionales:</span>
                <span className="text-amber-300 font-mono text-[11px]">
                  {product.certifications.join(' · ')}
                </span>
              </div>
            </div>

            {/* Datasheet Download Action */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-200">Ficha Técnica Oficial Completa</p>
                <p className="text-slate-400 text-[11px]">
                  Especificaciones, MTBF, número de parte y precios B2B
                </p>
              </div>
              <button
                onClick={handleDownloadDataSheet}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap font-medium"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{downloadSuccess ? 'Ficha Descargada ✓' : 'Descargar Ficha'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Information Tabs, Volume Pricing & Purchase */}
          <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {product.fullDesc}
                </p>
              </div>

              {/* Ideal Use Case Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                <span className="font-semibold text-amber-400">Uso Empresarial Recomendado: </span>
                <span className="text-slate-200">{product.idealFor}</span>
              </div>

              {/* Interactive Section Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'specs'
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Especificaciones ({product.specs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Puntos Clave
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('package')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'package'
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Empaque ({product.boxContents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Casos B2B ({product.reviews.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('ai');
                    if (!aiInsight && !isAiLoading) {
                      handleRunProductAi('');
                    }
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                    activeTab === 'ai'
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-amber-400 hover:text-amber-300'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Análisis IA</span>
                </button>
              </div>

              {/* Tab 1: Complete Technical Specifications */}
              {activeTab === 'specs' && (
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden text-xs bg-slate-900/40">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-1 sm:grid-cols-3 p-2.5 gap-1 hover:bg-slate-800/40"
                    >
                      <span className="text-slate-400 font-medium">{spec.label}</span>
                      <span className="sm:col-span-2 text-slate-100 font-mono">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Highlights & Engineering Details */}
              {activeTab === 'overview' && (
                <div className="space-y-2.5 border border-slate-800 rounded-xl p-4 bg-slate-900/40">
                  <h4 className="text-xs font-semibold text-slate-200">
                    Ventajas Competitivas y Arquitectura del Producto:
                  </h4>
                  <div className="space-y-2">
                    {product.highlights.map((hl, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs"
                      >
                        <span className="font-mono font-bold text-amber-400">0{index + 1}.</span>
                        <span className="text-slate-200 leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Box Contents & SLA Warranty */}
              {activeTab === 'package' && (
                <div className="space-y-3 border border-slate-800 rounded-xl p-4 bg-slate-900/40 text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold">
                    <Package className="w-4 h-4 text-amber-400" />
                    <span>Elementos Incluidos en el Empaque de Fábrica:</span>
                  </div>
                  <ul className="space-y-2 text-slate-300 list-disc list-inside pl-1">
                    {product.boxContents.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-800 text-slate-300 space-y-1">
                    <p className="font-semibold text-emerald-400">Cobertura de Garantía Corporativa:</p>
                    <p>{product.warranty}</p>
                  </div>
                </div>
              )}

              {/* Tab 4: Verified Corporate Reviews & Deployments */}
              {activeTab === 'reviews' && (
                <div className="space-y-3 border border-slate-800 rounded-xl p-4 bg-slate-900/40 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-semibold text-slate-200">
                      Despliegues Corporativos Verificados
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      ★ {product.rating.toFixed(1)} / 5.0 ({product.reviewCount} clientes B2B)
                    </span>
                  </div>
                  <div className="space-y-3">
                    {product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-bold text-white">{rev.author}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-slate-300">
                              {rev.role}, {rev.company}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-emerald-400">
                            {rev.verifiedDeployment}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Implementado en {rev.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: AI Engineering & ROI Analysis for this SKU */}
              {activeTab === 'ai' && (
                <div className="space-y-3 border border-amber-500/30 rounded-xl p-4 bg-[#0a101d] text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold">
                      <Cpu className="w-4 h-4" />
                      <span>Dictamen de Ingeniería IA para {quantity} unidad(es)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRunProductAi('')}
                      disabled={isAiLoading}
                      className="text-[11px] text-slate-300 hover:text-amber-400 font-mono cursor-pointer"
                    >
                      Actualizar análisis
                    </button>
                  </div>

                  {isAiLoading && (
                    <div className="py-6 flex items-center justify-center gap-2 text-slate-300">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Calculando dimensionamiento, consumo y sinergias con IA...</span>
                    </div>
                  )}

                  {aiError && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-200">
                      {aiError}
                    </div>
                  )}

                  {!isAiLoading && aiInsight && (
                    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                      {aiInsight}
                    </div>
                  )}

                  {/* Custom Question about this Product */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (aiQuestion.trim()) handleRunProductAi(aiQuestion);
                    }}
                    className="pt-2 flex gap-2"
                  >
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Pregunte a la IA sobre compatibilidad, consumo o uso de este equipo..."
                      className="flex-grow bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isAiLoading || !aiQuestion.trim()}
                      className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Preguntar</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Volume Discount Tiers Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    Escala de Precios Corporativos B2B (clic para seleccionar volumen):
                  </span>
                  <span className="text-amber-400 text-[11px] font-mono">
                    Descuentos automáticos
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {product.bulkTiers.map((tier) => {
                    const isCurrentTier = tierLabel === tier.label;
                    return (
                      <button
                        type="button"
                        key={tier.label}
                        onClick={() => setQuantity(tier.minQty)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer ${
                          isCurrentTier
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-[10px] text-slate-400 mb-0.5">{tier.label}</p>
                        <p className="font-mono text-sm tabular-nums text-white">
                          {formatPrice(tier.pricePerUnit, currency)}
                        </p>
                        {tier.discountPercent > 0 && (
                          <p className="text-[10px] text-emerald-400">
                            -{tier.discountPercent}% OFF
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Contiguous Purchase Section */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              {/* Warranty and Lead time notice */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{product.warranty}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-300 font-mono">
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Despacho en {product.leadTimeDays} días hábiles</span>
                </span>
              </div>

              {/* Quantity selector & Live Price Calculation */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Cantidad requerida:</span>
                    <div className="flex items-center border border-slate-700 bg-slate-800 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-1 text-slate-300 hover:text-white cursor-pointer"
                        aria-label="Restar unidad"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-14 text-center font-mono font-bold bg-transparent text-white focus:outline-none tabular-nums"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1 text-slate-300 hover:text-white cursor-pointer"
                        aria-label="Sumar unidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-400 font-mono">
                    Nivel activo: {tierLabel}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Proforma:</p>
                  <p className="text-xl font-extrabold text-white font-mono tabular-nums">
                    {formatPrice(lineTotal, currency)}
                  </p>
                  {savings > 0 && (
                    <p className="text-[11px] text-emerald-400 font-mono tabular-nums">
                      Ahorro B2B: {formatPrice(savings, currency)}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onRequestQuoteWithItem(product, quantity);
                    onClose();
                  }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Solicitar Cotización RFP Formal
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={addedSuccess}
                  className={`px-4 py-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm whitespace-nowrap ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado Exitosamente</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Añadir a Orden ({quantity})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
