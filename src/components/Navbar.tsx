import React, { useState } from 'react';
import { ShoppingBag, FileText, PackageCheck, Menu, X, Cpu } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenRfp: () => void;
  onOpenTracker: () => void;
  onOpenAiArchitect: (tab?: 'architect' | 'chat') => void;
  currentCurrency: Currency;
  onSelectCurrency: (c: Currency) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToCategory?: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenRfp,
  onOpenTracker,
  onOpenAiArchitect,
  onNavigateToCategory
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Main Top Bar (Strict 3-Zone Contract: Brand - 5 Nav Links - 2 Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="text-xl font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0"
        >
          NEXUS Tech
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#catalogo"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
            onClick={() => onNavigateToCategory && onNavigateToCategory('todos')}
          >
            Catálogo
          </a>
          <a
            href="#catalogo"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
            onClick={() => onNavigateToCategory && onNavigateToCategory('computo')}
          >
            Servidores
          </a>
          <button
            type="button"
            onClick={() => onOpenAiArchitect('architect')}
            className="text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer text-left font-semibold"
          >
            Arquitecto IA
          </button>
          <a
            href="#garantia-b2b"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Acuerdos SLA
          </a>
          <button
            type="button"
            onClick={onOpenTracker}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer text-left"
          >
            Rastreo B2B
          </button>
        </nav>

        {/* Zone 3: 2 Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenRfp}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Cotización RFP</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            aria-label="Ver carrito corporativo"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orden B2B ({cartCount})</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg cursor-pointer"
            aria-label="Menú de navegación"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f18] border-b border-slate-800 px-6 py-4 space-y-3">
          <a
            href="#catalogo"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigateToCategory && onNavigateToCategory('todos');
            }}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Catálogo Corporativo Completo
          </a>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAiArchitect('architect');
            }}
            className="flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            <Cpu className="w-4 h-4" />
            <span>Arquitecto de Soluciones & Consultor IA</span>
          </button>
          <a
            href="#catalogo"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigateToCategory && onNavigateToCategory('computo');
            }}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Servidores & Data Center
          </a>
          <a
            href="#garantia-b2b"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Líneas de Crédito & Cobertura SLA
          </a>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-400"
            >
              <PackageCheck className="w-4 h-4 text-amber-400" />
              <span>Rastrear Despacho B2B</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenRfp();
              }}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-400"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Solicitar Cotización Formal (RFP)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
