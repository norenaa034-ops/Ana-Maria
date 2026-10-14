import React from 'react';
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
  LayoutGrid,
  List,
  FileText,
  Globe,
  RotateCcw
} from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/products';

export type PriceRangeFilter = 'todos' | 'under_2000' | '2000_4000' | 'over_4000';

interface ProductFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  availableBrands: string[];
  priceRange: PriceRangeFilter;
  onSelectPriceRange: (range: PriceRangeFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onlyInStock: boolean;
  onToggleInStock: () => void;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'discount' | 'rating';
  onSelectSort: (sort: 'featured' | 'price_asc' | 'price_desc' | 'discount' | 'rating') => void;
  totalResults: number;
  viewMode: 'grid' | 'list';
  onSelectViewMode: (mode: 'grid' | 'list') => void;
  expandAllSpecs: boolean;
  onToggleExpandAllSpecs: () => void;
  currency: Currency;
  onSelectCurrency: (c: Currency) => void;
  onResetFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  availableBrands,
  priceRange,
  onSelectPriceRange,
  searchQuery,
  onSearchChange,
  onlyInStock,
  onToggleInStock,
  sortBy,
  onSelectSort,
  totalResults,
  viewMode,
  onSelectViewMode,
  expandAllSpecs,
  onToggleExpandAllSpecs,
  currency,
  onSelectCurrency,
  onResetFilters
}) => {
  const categories = [
    { id: 'todos', label: 'Todos los Equipos' },
    { id: 'computo', label: 'Cómputo & Data Center' },
    { id: 'redes', label: 'Redes & Conectividad' },
    { id: 'audiovisual', label: 'Audiovisual & Salas' },
    { id: 'seguridad', label: 'Seguridad & Biometría' },
    { id: 'energia', label: 'UPS & Energía' },
    { id: 'perifericos', label: 'Estaciones & Monitores' }
  ];

  const currencies: Currency[] = ['USD', 'EUR', 'MXN', 'COP'];

  const hasActiveFilters =
    selectedCategory !== 'todos' ||
    selectedBrand !== 'todas' ||
    priceRange !== 'todos' ||
    onlyInStock ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-4 mb-8">
      {/* Category Segmented Tabs & View Switcher Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* View Mode & Expand Technical Info Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {viewMode === 'grid' && (
            <button
              type="button"
              onClick={onToggleExpandAllSpecs}
              className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                expandAllSpecs
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {expandAllSpecs ? 'Información Completa Activa ✓' : 'Desplegar Toda la Info Técnica'}
              </span>
            </button>
          )}

          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => onSelectViewMode('grid')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cuadrícula</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectViewMode('list')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'list'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Ficha Técnica Completa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Search Input, Brand Filter, Price Range, In-Stock, Currency, Sort */}
      <div className="bg-[#0f1725] border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 text-xs">
        {/* Search Field */}
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filtrar por nombre, procesador, SKU, puertos o especificación..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
          />
        </div>

        {/* Filters Right Zone */}
        <div className="flex flex-wrap items-center gap-2 justify-between xl:justify-end">
          {/* Brand Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <span className="text-slate-400">Marca:</span>
            <select
              value={selectedBrand}
              onChange={(e) => onSelectBrand(e.target.value)}
              className="bg-transparent text-slate-200 border-none focus:outline-none cursor-pointer text-xs pr-1"
              aria-label="Filtrar por marca"
            >
              <option value="todas" className="bg-slate-900 text-slate-200">
                Todas las Marcas
              </option>
              {availableBrands.map((b) => (
                <option key={b} value={b} className="bg-slate-900 text-slate-200">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <span className="text-slate-400">Rango:</span>
            <select
              value={priceRange}
              onChange={(e) => onSelectPriceRange(e.target.value as PriceRangeFilter)}
              className="bg-transparent text-slate-200 border-none focus:outline-none cursor-pointer text-xs pr-1"
              aria-label="Filtrar por rango de precio"
            >
              <option value="todos" className="bg-slate-900 text-slate-200">
                Todos los Precios
              </option>
              <option value="under_2000" className="bg-slate-900 text-slate-200">
                Hasta $2,000 USD
              </option>
              <option value="2000_4000" className="bg-slate-900 text-slate-200">
                $2,000 – $4,000 USD
              </option>
              <option value="over_4000" className="bg-slate-900 text-slate-200">
                Más de $4,000 USD
              </option>
            </select>
          </div>

          {/* In Stock Toggle */}
          <button
            onClick={onToggleInStock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              onlyInStock
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${onlyInStock ? 'text-emerald-400' : 'text-slate-500'}`}
            />
            <span>En Stock</span>
          </button>

          {/* Currency Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as Currency)}
              className="bg-transparent text-slate-200 border-none focus:outline-none cursor-pointer text-xs pr-1 font-mono"
              aria-label="Seleccionar Moneda"
            >
              {currencies.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-200">
                  {CURRENCY_RATES[c].label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as any)}
              className="bg-transparent text-slate-200 border-none focus:outline-none cursor-pointer text-xs pr-1"
              aria-label="Ordenar productos"
            >
              <option value="featured" className="bg-slate-900 text-slate-200">
                Recomendados B2B
              </option>
              <option value="discount" className="bg-slate-900 text-slate-200">
                Mayor Descuento Volumen
              </option>
              <option value="rating" className="bg-slate-900 text-slate-200">
                Mejor Calificación Técnica
              </option>
              <option value="price_asc" className="bg-slate-900 text-slate-200">
                Precio: Menor a Mayor
              </option>
              <option value="price_desc" className="bg-slate-900 text-slate-200">
                Precio: Mayor a Menor
              </option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
              title="Restablecer todos los filtros"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          )}

          {/* Results count in tabular numbers */}
          <span className="text-slate-400 font-mono text-[11px] tabular-nums whitespace-nowrap hidden sm:inline">
            {totalResults} {totalResults === 1 ? 'equipo' : 'equipos'}
          </span>
        </div>
      </div>
    </div>
  );
};
