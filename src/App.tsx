/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Currency, EnterpriseOrder, EnterpriseBundle } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { getTierForQuantity } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductFilters, PriceRangeFilter } from './components/ProductFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuoteRfpModal } from './components/QuoteRfpModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { EnterpriseTrustSection } from './components/EnterpriseTrustSection';
import { LegalSlaModal, LegalTabType } from './components/LegalSlaModal';
import { AiSolutionsArchitectModal } from './components/AiSolutionsArchitectModal';
import { Footer } from './components/Footer';
import { ShieldCheck, Building, Layers, CheckCircle, Scale, X, Cpu, MessageSquare } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'nexus_enterprise_cart_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'nexus_enterprise_orders_v1';

export default function App() {
  // Products and Filtering State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedBrand, setSelectedBrand] = useState<string>('todas');
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'discount' | 'rating'>('featured');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Product Information Display Modes
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandAllSpecs, setExpandAllSpecs] = useState<boolean>(false);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Modals and Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isRfpOpen, setIsRfpOpen] = useState<boolean>(false);
  const [singleItemQuote, setSingleItemQuote] = useState<{ product: Product; quantity: number } | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [trackerOrderNumber, setTrackerOrderNumber] = useState<string | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType>('sla');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiModalTab, setAiModalTab] = useState<'architect' | 'chat'>('architect');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.brand)));
    return brands.sort();
  }, [products]);

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from storage', e);
    }
    return [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 3,
        unitPrice: 5490,
        totalPrice: 16470
      },
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 5,
        unitPrice: 1999,
        totalPrice: 9995
      }
    ];
  });

  // Recent Orders State with LocalStorage Persistence
  const [recentOrders, setRecentOrders] = useState<EnterpriseOrder[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from storage', e);
    }
    return [];
  });

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Save orders
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(recentOrders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  }, [recentOrders]);

  // Cart operations
  const handleAddToCart = (product: Product, quantityToAdd: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantityToAdd;
        const { unitPrice } = getTierForQuantity(newQty, product.bulkTiers, product.basePriceUSD);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          unitPrice,
          totalPrice: unitPrice * newQty
        };
        return updated;
      } else {
        const { unitPrice } = getTierForQuantity(quantityToAdd, product.bulkTiers, product.basePriceUSD);
        return [
          ...prevCart,
          {
            product,
            quantity: quantityToAdd,
            unitPrice,
            totalPrice: unitPrice * quantityToAdd
          }
        ];
      }
    });

    setToastMessage(`✓ Se agregaron ${quantityToAdd}x ${product.name} a la orden`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddMultipleItemsToCart = (itemsToAdd: { product: Product; quantity: number }[]) => {
    setCart((prevCart) => {
      let updated = [...prevCart];
      itemsToAdd.forEach(({ product, quantity }) => {
        const existingIndex = updated.findIndex((c) => c.product.id === product.id);
        if (existingIndex > -1) {
          const newQty = updated[existingIndex].quantity + quantity;
          const { unitPrice } = getTierForQuantity(newQty, product.bulkTiers, product.basePriceUSD);
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
            unitPrice,
            totalPrice: unitPrice * newQty
          };
        } else {
          const { unitPrice } = getTierForQuantity(quantity, product.bulkTiers, product.basePriceUSD);
          updated.push({
            product,
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity
          });
        }
      });
      return updated;
    });

    setToastMessage(`✓ Se cargaron ${itemsToAdd.length} líneas recomendadas por IA a la Orden B2B`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
  };

  const handleGenerateRfpFromAi = (aiCartItems: CartItem[]) => {
    setCart(aiCartItems);
    setSingleItemQuote(null);
    setIsAiModalOpen(false);
    setIsRfpOpen(true);
  };

  const handleAddBundleToCart = (bundle: EnterpriseBundle) => {
    setCart((prevCart) => {
      let updated = [...prevCart];
      bundle.items.forEach((bItem) => {
        const prod = products.find((p) => p.id === bItem.productId);
        if (!prod) return;
        const existingIndex = updated.findIndex((c) => c.product.id === prod.id);
        if (existingIndex > -1) {
          const newQty = updated[existingIndex].quantity + bItem.quantity;
          const { unitPrice } = getTierForQuantity(newQty, prod.bulkTiers, prod.basePriceUSD);
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
            unitPrice,
            totalPrice: unitPrice * newQty
          };
        } else {
          const { unitPrice } = getTierForQuantity(bItem.quantity, prod.bulkTiers, prod.basePriceUSD);
          updated.push({
            product: prod,
            quantity: bItem.quantity,
            unitPrice,
            totalPrice: unitPrice * bItem.quantity
          });
        }
      });
      return updated;
    });

    setToastMessage(`✓ Paquete ${bundle.code} cargado en su Orden de Compra B2B`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          const { unitPrice } = getTierForQuantity(
            newQuantity,
            item.product.bulkTiers,
            item.product.basePriceUSD
          );
          return {
            ...item,
            quantity: newQuantity,
            unitPrice,
            totalPrice: unitPrice * newQuantity
          };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderCompleted = (newOrder: EnterpriseOrder) => {
    setRecentOrders((prev) => [newOrder, ...prev]);
    setToastMessage(`✓ Orden ${newOrder.orderNumber} confirmada y registrada en seguimiento`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRequestQuoteWithItem = (product: Product, quantity: number) => {
    setSingleItemQuote({ product, quantity });
    setIsRfpOpen(true);
  };

  const handleConvertQuoteToOrder = (quoteItems: CartItem[]) => {
    if (singleItemQuote) {
      handleAddToCart(singleItemQuote.product, singleItemQuote.quantity);
      setSingleItemQuote(null);
    } else if (cart.length === 0 && quoteItems.length > 0) {
      setCart(quoteItems);
    }
    setIsRfpOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        setToastMessage('Puede comparar hasta 4 equipos simultáneamente');
        setTimeout(() => setToastMessage(null), 3000);
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleOpenLegalModal = (tab: LegalTabType) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleOpenAiArchitect = (tab: 'architect' | 'chat' = 'architect') => {
    setAiModalTab(tab);
    setIsAiModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSelectedBrand('todas');
    setPriceRange('todos');
    setSearchQuery('');
    setOnlyInStock(false);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'todos' && p.category !== selectedCategory) {
          return false;
        }
        if (selectedBrand !== 'todas' && p.brand !== selectedBrand) {
          return false;
        }
        if (priceRange === 'under_2000' && p.basePriceUSD > 2000) {
          return false;
        }
        if (priceRange === '2000_4000' && (p.basePriceUSD < 2000 || p.basePriceUSD > 4000)) {
          return false;
        }
        if (priceRange === 'over_4000' && p.basePriceUSD <= 4000) {
          return false;
        }
        if (onlyInStock && !p.inStock) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc =
            p.shortDesc.toLowerCase().includes(q) || p.fullDesc.toLowerCase().includes(q);
          const matchIdeal = p.idealFor.toLowerCase().includes(q);
          const matchHighlights = p.highlights.some((h) => h.toLowerCase().includes(q));
          const matchSpecs = p.specs.some(
            (s) => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)
          );
          return (
            matchName ||
            matchSku ||
            matchBrand ||
            matchDesc ||
            matchIdeal ||
            matchHighlights ||
            matchSpecs
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.basePriceUSD - b.basePriceUSD;
        if (sortBy === 'price_desc') return b.basePriceUSD - a.basePriceUSD;
        if (sortBy === 'rating') return b.rating - a.rating || b.reviewCount - a.reviewCount;
        if (sortBy === 'discount') {
          const maxDiscB = Math.max(...b.bulkTiers.map((t) => t.discountPercent), 0);
          const maxDiscA = Math.max(...a.bulkTiers.map((t) => t.discountPercent), 0);
          return maxDiscB - maxDiscA;
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBrand, priceRange, searchQuery, onlyInStock, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Keyboard escape handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsRfpOpen(false);
        setIsTrackerOpen(false);
        setIsCompareModalOpen(false);
        setIsLegalModalOpen(false);
        setIsAiModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Floating AI Engineering Assistant Trigger Button */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          type="button"
          onClick={() => handleOpenAiArchitect('architect')}
          className="px-4 py-3 rounded-xl bg-[#0d1424]/95 hover:bg-slate-900 border border-amber-400/50 shadow-2xl flex items-center gap-2.5 text-xs font-semibold text-white cursor-pointer transition-all group"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-mono text-amber-400 leading-none">
              INGENIERÍA PREVENTA
            </span>
            <span className="group-hover:text-amber-300 transition-colors">
              Arquitecto & Consultor IA
            </span>
          </div>
        </button>
      </div>

      {/* Floating Comparison Bar when products are selected */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0d1424]/95 backdrop-blur-md border border-amber-500/50 rounded-xl px-4 py-3 shadow-2xl flex flex-wrap items-center gap-4 max-w-2xl w-[92%]">
          <div className="flex items-center gap-2 text-xs">
            <Scale className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">
              Comparador Técnico ({comparedProducts.length}/4):
            </span>
            <span className="text-slate-300 hidden sm:inline truncate max-w-xs">
              {comparedProducts.map((p) => p.sku).join(' · ')}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => setComparedProducts([])}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              title="Limpiar comparador"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg cursor-pointer whitespace-nowrap"
            >
              Ver Tabla & Dictamen IA
            </button>
          </div>
        </div>
      )}

      {/* Navigation Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRfp={() => {
          setSingleItemQuote(null);
          setIsRfpOpen(true);
        }}
        onOpenTracker={() => {
          setTrackerOrderNumber(null);
          setIsTrackerOpen(true);
        }}
        onOpenAiArchitect={handleOpenAiArchitect}
        currentCurrency={currency}
        onSelectCurrency={setCurrency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToCategory={(cat) => {
          setSelectedCategory(cat);
          const target = document.getElementById('catalogo');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero Section */}
      <HeroBanner
        onExploreCatalog={() => {
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onRequestQuote={() => {
          setSingleItemQuote(null);
          setIsRfpOpen(true);
        }}
        onOpenAiArchitect={handleOpenAiArchitect}
      />

      {/* Main E-Commerce Catalog Section */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 w-full flex-grow">
        {/* AI Solutions Architect Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#131d33] to-[#0f172a] border border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>MOTOR DE INGENIERÍA E INFRAESTRUCTURA CON INTELIGENCIA ARTIFICIAL</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              ¿No sabe qué servidores, switches o respaldo eléctrico necesita su proyecto?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Describa su requerimiento empresarial o consulte en vivo a nuestro ingeniero de preventa IA: generamos automáticamente la lista de materiales (BOM), cálculo térmico/eléctrico y cotización con descuentos por volumen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenAiArchitect('chat')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Consultor Técnico IA (Chat)</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenAiArchitect('architect')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Cpu className="w-4 h-4" />
              <span>Dimensionar Proyecto con IA</span>
            </button>
          </div>
        </div>

        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1">
              <span>Inventario Homologado B2B</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Fichas Técnicas Completas</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Catálogo de Equipos & Especificaciones de Hardware
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => handleOpenLegalModal('sla')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de Fábrica Directa (SLA 4h)</span>
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => handleOpenLegalModal('credit')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Building className="w-4 h-4 text-amber-400" />
              <span>Factura Fiscal Net 30/60</span>
            </button>
          </div>
        </div>

        {/* Filter, View Mode & Search Bar */}
        <ProductFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          availableBrands={availableBrands}
          priceRange={priceRange}
          onSelectPriceRange={setPriceRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onlyInStock={onlyInStock}
          onToggleInStock={() => setOnlyInStock(!onlyInStock)}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          totalResults={filteredProducts.length}
          viewMode={viewMode}
          onSelectViewMode={setViewMode}
          expandAllSpecs={expandAllSpecs}
          onToggleExpandAllSpecs={() => setExpandAllSpecs(!expandAllSpecs)}
          currency={currency}
          onSelectCurrency={setCurrency}
          onResetFilters={handleResetFilters}
        />

        {/* Product Grid or Full Technical Datasheet List */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 px-4 text-center rounded-2xl bg-[#0f1725] border border-slate-800 space-y-3">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-200">
              No se encontraron equipos bajo los criterios seleccionados
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Intente ajustar el término de búsqueda o restablecer los filtros para visualizar todo el inventario disponible.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'list'
                ? 'space-y-6'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                viewMode={viewMode}
                forceExpandInfo={expandAllSpecs}
                isCompared={comparedProducts.some((p) => p.id === product.id)}
                onToggleCompare={handleToggleCompare}
                onQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Enterprise Bundles, Trust, SLA & Credit Section */}
      <EnterpriseTrustSection
        products={products}
        currency={currency}
        onOpenRfp={() => {
          setSingleItemQuote(null);
          setIsRfpOpen(true);
        }}
        onAddBundleToCart={handleAddBundleToCart}
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Footer */}
      <Footer
        onOpenRfp={() => {
          setSingleItemQuote(null);
          setIsRfpOpen(true);
        }}
        onOpenTracker={() => {
          setTrackerOrderNumber(null);
          setIsTrackerOpen(true);
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Product Technical Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          currency={currency}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onRequestQuoteWithItem={handleRequestQuoteWithItem}
        />
      )}

      {/* Side-by-Side Technical Comparison Modal */}
      <ProductCompareModal
        isOpen={isCompareModalOpen}
        products={comparedProducts}
        currency={currency}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveProduct={(id) =>
          setComparedProducts((prev) => prev.filter((p) => p.id !== id))
        }
        onClearCompare={() => setComparedProducts([])}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
      />

      {/* AI Solutions Architect & Engineering Consultant Modal */}
      <AiSolutionsArchitectModal
        isOpen={isAiModalOpen}
        initialTab={aiModalTab}
        products={products}
        currency={currency}
        onClose={() => setIsAiModalOpen(false)}
        onAddItemsToCart={handleAddMultipleItemsToCart}
        onGenerateRfpFromAi={handleGenerateRfpFromAi}
        onQuickViewProduct={(p) => {
          setIsAiModalOpen(false);
          setQuickViewProduct(p);
        }}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        onOpenRfp={() => {
          setSingleItemQuote(null);
          setIsRfpOpen(true);
        }}
      />

      {/* B2B Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onOrderCompleted={handleOrderCompleted}
        onClearCart={handleClearCart}
        onOpenTrackerForOrder={(orderNum) => {
          setTrackerOrderNumber(orderNum);
          setIsTrackerOpen(true);
        }}
      />

      {/* Formal RFP / Proforma Quote Modal */}
      <QuoteRfpModal
        isOpen={isRfpOpen}
        onClose={() => {
          setIsRfpOpen(false);
          setSingleItemQuote(null);
        }}
        items={cart}
        currency={currency}
        singleItemQuote={singleItemQuote}
        onConvertQuoteToOrder={handleConvertQuoteToOrder}
      />

      {/* B2B Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        recentOrders={recentOrders}
        currency={currency}
        initialOrderNumber={trackerOrderNumber}
      />

      {/* Legal, SLA & Credit Documentation Modal */}
      <LegalSlaModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </div>
  );
}
