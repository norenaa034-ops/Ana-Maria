import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import {
  Plus,
  Check,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Truck,
  Package,
  Scale,
  Cpu
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  viewMode?: 'grid' | 'list';
  forceExpandInfo?: boolean;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  viewMode = 'grid',
  forceExpandInfo = false,
  isCompared = false,
  onToggleCompare,
  onQuickView,
  onAddToCart
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [localExpanded, setLocalExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isExpanded = forceExpandInfo || localExpanded || viewMode === 'list';

  // Calculate active unit price based on selectedQty
  const activeTier =
    [...product.bulkTiers]
      .sort((a, b) => b.minQty - a.minQty)
      .find((t) => selectedQty >= t.minQty) || product.bulkTiers[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const displayedSpecs = isExpanded ? product.specs : product.specs.slice(0, 4);

  if (viewMode === 'list') {
    return (
      <article className="bg-[#101726] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Image & Quick Metadata */}
          <div className="lg:col-span-4 bg-[#0a0f19] border-b lg:border-b-0 lg:border-r border-slate-800 p-5 flex flex-col justify-between gap-4">
            <div
              onClick={() => onQuickView(product)}
              className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer group"
            >
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-center">
                  <Cpu className="w-10 h-10 text-amber-400/70 mb-2" />
                  <span className="text-xs font-medium text-slate-300">{product.name}</span>
                </div>
              )}
            </div>

            {/* Physical, Thermal & Electrical Info Box */}
            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[11px]">Dimensiones y Peso:</span>
                <span className="font-mono text-[11px] text-slate-200">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Especificación Eléctrica:</span>
                <span className="font-mono text-[11px] text-slate-200">{product.powerSpec}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Fiabilidad & Rango Térmico:</span>
                <span className="font-mono text-[11px] text-emerald-400">
                  {product.mtbfHours} · {product.operatingTemp}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Sistema / Compatibilidad:</span>
                <span className="text-[11px] text-slate-200">{product.operatingSystemOrFirmware}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Certificaciones Homologadas:</span>
                <span className="font-mono text-[11px] text-amber-300/90">
                  {product.certifications.join(' · ')}
                </span>
              </div>
            </div>

            {/* Package contents */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Package className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Contenido del Empaque Corporativo:</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                {product.boxContents.map((item, idx) => (
                  <li key={idx} className="leading-snug text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center & Right Column: Full Technical Information & Purchase */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-amber-400 font-semibold">{product.brand}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-mono">SKU: {product.sku}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{product.categoryLabel}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-mono text-amber-300 tabular-nums">
                    ★ {product.rating.toFixed(1)} ({product.reviewCount} evaluaciones TI)
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-emerald-400">
                    {product.inStock ? `${product.stockCount} unidades en bodega` : 'Bajo pedido'}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300">Despacho {product.leadTimeDays}d hábiles</span>
                </div>
              </div>

              {/* Title & Full Description */}
              <div>
                <h3
                  onClick={() => onQuickView(product)}
                  className="text-lg sm:text-xl font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {product.fullDesc}
                </p>
              </div>

              {/* Ideal Use Case */}
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/90 text-xs">
                <span className="font-semibold text-amber-400">Aplicaciones Recomendadas: </span>
                <span className="text-slate-200">{product.idealFor}</span>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-2">
                  Características Destacadas de Ingeniería:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.highlights.map((hl, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60"
                    >
                      <span className="text-amber-400 font-mono font-bold">0{index + 1}.</span>
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Technical Specifications Table */}
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-2">
                  Tabla de Especificaciones Técnicas:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-800 rounded-lg overflow-hidden divide-y md:divide-y-0 md:gap-px bg-slate-800">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="bg-[#0d1422] p-2.5 flex flex-col gap-0.5 text-xs">
                      <span className="text-slate-400 text-[11px] font-medium">{spec.label}</span>
                      <span className="text-slate-100 font-mono text-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Pricing Tiers & Action Controls */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4">
              {/* Volume Pricing Tiers */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium block">
                  Escala de Precios por Volumen Corporativo (Automático):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {product.bulkTiers.map((tier) => {
                    const isCurrent = activeTier.label === tier.label;
                    return (
                      <button
                        key={tier.label}
                        type="button"
                        onClick={() => setSelectedQty(tier.minQty)}
                        className={`px-3 py-1.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/10 border-amber-500/50 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-[10px] text-slate-400">{tier.label}</span>
                        <span className="font-mono text-xs font-bold text-slate-100 tabular-nums">
                          {formatPrice(tier.pricePerUnit, currency)}
                        </span>
                        {tier.discountPercent > 0 && (
                          <span className="ml-1.5 text-[10px] font-mono text-emerald-400">
                            (-{tier.discountPercent}%)
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {onToggleCompare && (
                  <button
                    type="button"
                    onClick={() => onToggleCompare(product)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                      isCompared
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onQuickView(product)}
                  className="px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ficha PDF / Modal</span>
                </button>

                <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    className="px-2.5 py-2 text-slate-400 hover:text-white cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="px-2.5 font-mono text-slate-100 tabular-nums font-semibold">
                    {selectedQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedQty(selectedQty + 1)}
                    className="px-2.5 py-2 text-slate-400 hover:text-white cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Agregado a Orden</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir ({formatPrice(activeTier.pricePerUnit * selectedQty, currency)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Detailed Grid Card View
  return (
    <article className="group relative flex flex-col bg-[#101726] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-200">
      {/* Product Image Area */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/3] w-full bg-[#0a0f19] overflow-hidden flex items-center justify-center border-b border-slate-800/80 cursor-pointer"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-center">
            <Cpu className="w-10 h-10 text-amber-400/70 mb-2" />
            <span className="text-xs font-medium text-slate-300">{product.name}</span>
          </div>
        )}

        {/* Scrim at bottom of image for quick stock & category info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 py-2.5 flex items-center justify-between text-[11px]">
          <span className="text-slate-200 font-medium">{product.categoryLabel}</span>
          <span className="text-emerald-400 font-mono tabular-nums">
            {product.inStock ? `${product.stockCount} en stock` : 'Bajo pedido'}
          </span>
        </div>
      </div>

      {/* Card Body & Comprehensive Product Information */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-3">
          {/* Unboxed Metadata with typographic separators */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-amber-400 font-semibold">{product.brand}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-[11px]">{product.sku}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-[11px] text-amber-300 tabular-nums">
                ★ {product.rating.toFixed(1)}
              </span>
            </div>
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(product);
                }}
                className={`text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isCompared ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Comparar especificaciones técnicas"
              >
                <Scale className="w-3 h-3" />
                <span>{isCompared ? 'Comparando ✓' : 'Comparar'}</span>
              </button>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Detailed Description */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {isExpanded ? product.fullDesc : product.shortDesc}
          </p>

          {/* Recommended Application / Ideal For */}
          <div className="text-[11px] text-slate-300 bg-slate-900/70 border border-slate-800/90 rounded-lg p-2.5 leading-relaxed">
            <span className="text-amber-400 font-semibold">Uso recomendado: </span>
            <span>{product.idealFor}</span>
          </div>

          {/* Visible Technical Specifications Block directly on the Card */}
          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/40">
            <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-200">Especificaciones Técnicas</span>
              <span className="font-mono text-slate-400">{product.specs.length} parámetros</span>
            </div>
            <div className="divide-y divide-slate-800/70 text-xs">
              {displayedSpecs.map((spec) => (
                <div key={spec.label} className="px-3 py-1.5 flex flex-col gap-0.5">
                  <span className="text-[11px] text-slate-400">{spec.label}:</span>
                  <span className="text-slate-100 font-mono text-[11px] leading-snug">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expanded Extra Information (Highlights, Dimensions, Power, MTBF, Box Contents, Certifications) */}
          {isExpanded && (
            <div className="space-y-3 pt-1 animate-in fade-in duration-150">
              {/* Highlights */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-200 block">
                  Puntos Clave del Equipo:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                  {product.highlights.map((hl, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dimensions, Power, MTBF & OS */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5 text-[11px]">
                <div>
                  <span className="text-slate-400">Dimensiones y Peso: </span>
                  <span className="text-slate-200 font-mono">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-400">Energía y Consumo: </span>
                  <span className="text-slate-200 font-mono">{product.powerSpec}</span>
                </div>
                <div>
                  <span className="text-slate-400">Fiabilidad MTBF / Temp: </span>
                  <span className="text-emerald-400 font-mono">
                    {product.mtbfHours} ({product.operatingTemp})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Sistema / Firmware: </span>
                  <span className="text-slate-200">{product.operatingSystemOrFirmware}</span>
                </div>
                <div>
                  <span className="text-slate-400">Certificaciones: </span>
                  <span className="text-amber-300 font-mono">
                    {product.certifications.join(' · ')}
                  </span>
                </div>
              </div>

              {/* Box Contents */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-200 block">
                  Contenido de la Caja:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                  {product.boxContents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Toggle Expand Inline Info & Open Modal Buttons */}
          <div className="flex items-center justify-between gap-2 pt-1">
            {!forceExpandInfo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocalExpanded(!localExpanded);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                {localExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Contraer detalles</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Ver toda la información (+{product.specs.length - 4} specs)</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 ml-auto cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Ficha Técnica Completa</span>
            </button>
          </div>
        </div>

        {/* Footer: Warranty, Volume Pricing & Add to Cart */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          {/* Warranty & Delivery SLA */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{product.warranty.split('por')[0]}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-300 shrink-0 font-mono">
              <Truck className="w-3 h-3 text-amber-400" />
              <span>{product.leadTimeDays}d hábiles</span>
            </span>
          </div>

          {/* Volume Tier Selector Mini Table */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {product.bulkTiers.map((tier) => {
              const isSelectedTier = activeTier.label === tier.label;
              return (
                <button
                  key={tier.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQty(tier.minQty);
                  }}
                  className={`p-1.5 rounded border text-[10px] transition-colors cursor-pointer ${
                    isSelectedTier
                      ? 'bg-amber-500/15 border-amber-500/50 text-white'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block truncate text-[10px] text-slate-400">{tier.label}</span>
                  <span className="font-mono font-bold text-xs text-slate-100 tabular-nums block">
                    {formatPrice(tier.pricePerUnit, currency)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Price & Add to Order Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg text-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQty(Math.max(1, selectedQty - 1));
                }}
                className="px-2.5 py-2 text-slate-400 hover:text-white rounded-l cursor-pointer"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="px-2.5 font-mono text-slate-200 tabular-nums font-semibold">
                {selectedQty}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQty(selectedQty + 1);
                }}
                className="px-2.5 py-2 text-slate-400 hover:text-white rounded-r cursor-pointer"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={justAdded}
              className={`flex-grow flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Agregado a Orden</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>
                    Añadir ({formatPrice(activeTier.pricePerUnit * selectedQty, currency)})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
