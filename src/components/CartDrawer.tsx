import React from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Trash2, ArrowRight, FileText, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onOpenRfp: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onOpenRfp
}) => {
  if (!isOpen) return null;

  const subtotalUSD = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxUSD = subtotalUSD * 0.16; // 16% IVA empresarial estándar
  const isFreeShipping = subtotalUSD >= 4000;
  const shippingUSD = subtotalUSD > 0 ? (isFreeShipping ? 0 : 150) : 0;
  const grandTotalUSD = subtotalUSD + taxUSD + shippingUSD;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#0e1524] border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1a]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              Orden de Compra Corporativa
            </h2>
            <span className="text-xs font-mono text-slate-400">
              ({items.length} {items.length === 1 ? 'partida' : 'partidas'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / Enterprise Logistics Notice */}
        <div className="bg-slate-900/90 border-b border-slate-800/80 px-5 py-2.5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isFreeShipping 
                ? '¡Flete asegurado bonificado para esta orden!' 
                : `Flete corporativo gratis a partir de ${formatPrice(4000, currency)}`}
            </span>
          </div>
          <span className="font-mono text-amber-400 text-[11px] font-semibold">
            {isFreeShipping ? 'FLETE GRATIS' : 'B2B LOGISTICS'}
          </span>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4 divide-y divide-slate-800/60">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600" />
              <h3 className="text-base font-semibold text-slate-300">
                Su orden no contiene productos
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Explore nuestro catálogo corporativo y agregue equipos o infraestructura para generar su cotización o tramitar orden de compra.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Explorar Catálogo B2B
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg bg-slate-900 border border-slate-800 shrink-0"
                />

                <div className="flex-grow space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wide block">
                        {item.product.brand} · SKU: {item.product.sku}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-1">
                        {item.product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Eliminar ítem"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-700 bg-slate-900 rounded-md text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                        aria-label="Menos"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-semibold text-slate-200 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                        aria-label="Más"
                      >
                        +
                      </button>
                    </div>

                    {/* Price with tier feedback */}
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">
                        {formatPrice(item.unitPrice, currency)} / ud
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-mono tabular-nums">
                        {formatPrice(item.totalPrice, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals & Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-[#0a0f1a] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal Partidas:</span>
                <span className="font-mono text-slate-200 tabular-nums">{formatPrice(subtotalUSD, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>IVA Estimado (16% Fiscal):</span>
                <span className="font-mono text-slate-200 tabular-nums">{formatPrice(taxUSD, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Logística Asegurada de Alta Seguridad:</span>
                <span className="font-mono text-slate-200 tabular-nums">
                  {shippingUSD === 0 ? (
                    <span className="text-emerald-400 font-semibold">GRATIS</span>
                  ) : (
                    formatPrice(shippingUSD, currency)
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Total Estimado de la Orden:</span>
                <span className="text-lg font-mono text-amber-400 tabular-nums">
                  {formatPrice(grandTotalUSD, currency)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tramitar Orden Fiscal B2B (Net 30/60)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenRfp();
                }}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Generar Proforma Oficial / Cotización RFP</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garantía de cumplimiento y facturación electrónica fiscal</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
