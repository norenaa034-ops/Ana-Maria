import React, { useState, useEffect } from 'react';
import { EnterpriseOrder, Currency } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/formatters';
import { X, Search, PackageCheck, ShieldCheck, Truck } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: EnterpriseOrder[];
  currency: Currency;
  initialOrderNumber?: string | null;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  currency,
  initialOrderNumber
}) => {
  if (!isOpen) return null;

  const defaultDemoOrder: EnterpriseOrder = {
    id: 'demo-order-1',
    orderNumber: 'NX-B2B-2026-8941',
    date: '22 de Septiembre, 2026',
    companyInfo: {
      companyName: 'Banco Metropolitano & Finanzas Corp.',
      taxId: '800.194.202-0',
      contactName: 'Dra. Elena Valenzuela (CTO)',
      email: 'adquisiciones@bancometropolitano.com',
      phone: '+57 1 890 4400',
      address: 'Calle 100 # 8A-49 Torre Financiera, Piso 22',
      city: 'Bogotá',
      country: 'Colombia',
      department: 'Centro de Datos Principal',
      paymentTerms: 'credit_net30'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 3,
        unitPrice: 5490,
        totalPrice: 16470
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        unitPrice: 4680,
        totalPrice: 4680
      }
    ],
    subtotalUSD: 21150,
    taxUSD: 3384,
    shippingUSD: 0,
    totalUSD: 24534,
    status: 'in_transit',
    trackingNumber: 'TRK-99214482',
    estimatedDelivery: 'Mañana, antes de las 14:00 hrs',
    carrier: 'NEXUS Secure Armored Freight & Logistics'
  };

  const allAvailableOrders = [...recentOrders, defaultDemoOrder];

  const [searchCode, setSearchCode] = useState(
    initialOrderNumber || allAvailableOrders[0].orderNumber
  );
  const [selectedOrder, setSelectedOrder] = useState<EnterpriseOrder>(() => {
    if (initialOrderNumber) {
      const match = allAvailableOrders.find(
        (o) => o.orderNumber.toUpperCase() === initialOrderNumber.toUpperCase()
      );
      if (match) return match;
    }
    return allAvailableOrders[0];
  });

  useEffect(() => {
    if (initialOrderNumber) {
      const match = allAvailableOrders.find(
        (o) => o.orderNumber.toUpperCase() === initialOrderNumber.toUpperCase()
      );
      if (match) {
        setSelectedOrder(match);
        setSearchCode(match.orderNumber);
      }
    }
  }, [initialOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    const found = allAvailableOrders.find(
      (o) => o.orderNumber.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      setSelectedOrder({
        ...defaultDemoOrder,
        orderNumber: query || 'NX-B2B-2026-8941'
      });
    }
  };

  const statusOrder: EnterpriseOrder['status'][] = [
    'credit_review',
    'warehouse_preparation',
    'in_transit',
    'delivered'
  ];
  const currentStageIdx = statusOrder.indexOf(selectedOrder.status);

  const handleSimulateNextStage = () => {
    const nextIdx = (currentStageIdx + 1) % statusOrder.length;
    setSelectedOrder({
      ...selectedOrder,
      status: statusOrder[nextIdx]
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Seguimiento Logístico & Trazabilidad de Envíos B2B
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar rastreo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/60">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Ingrese número de orden (ej: NX-B2B-2026-8941) o guía..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Consultar Guía
            </button>
          </form>

          {/* Quick select previous orders */}
          <div className="flex items-center gap-2 mt-3 text-xs overflow-x-auto pb-1">
            <span className="text-slate-400 text-[11px] whitespace-nowrap">
              Órdenes registradas:
            </span>
            {allAvailableOrders.map((ord) => (
              <button
                key={ord.orderNumber}
                type="button"
                onClick={() => {
                  setSelectedOrder(ord);
                  setSearchCode(ord.orderNumber);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors whitespace-nowrap ${
                  selectedOrder.orderNumber === ord.orderNumber
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {ord.orderNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Order Header Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">N° Orden de Compra:</span>
              <span className="font-bold text-amber-400 text-sm">{selectedOrder.orderNumber}</span>
              <span className="text-slate-500 text-[11px] block">{selectedOrder.date}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Guía de Despacho Blindado:</span>
              <span className="font-bold text-white text-sm">{selectedOrder.trackingNumber}</span>
              <span className="text-slate-400 text-[11px] block">{selectedOrder.carrier}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Importe & Entrega:</span>
              <span className="font-bold text-emerald-400 text-sm tabular-nums">
                {formatPrice(selectedOrder.totalUSD, currency)}
              </span>
              <span className="text-slate-300 text-[11px] block">
                {selectedOrder.status === 'delivered'
                  ? 'Entregado en muelle'
                  : selectedOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-200">
                Estado de la Ruta Logística:
              </h4>
              <button
                type="button"
                onClick={handleSimulateNextStage}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-[11px] text-amber-400 font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Simular Avance de Etapa</span>
              </button>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {/* Stage 1 */}
              <div className="relative flex items-start gap-3">
                <span
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ring-4 ring-[#0d1424] ${
                    currentStageIdx > 0
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-400 text-slate-950 font-bold'
                  }`}
                >
                  {currentStageIdx > 0 ? '✓' : '1'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      Validación Fiscal & Aprobación de Crédito Corporativo
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {currentStageIdx > 0 ? 'Completado' : 'En curso'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Razón Social{' '}
                    <strong className="text-slate-300">
                      {selectedOrder.companyInfo.companyName}
                    </strong>{' '}
                    ({selectedOrder.companyInfo.taxId}) validada y factura electrónica emitida.
                  </p>
                </div>
              </div>

              {/* Stage 2 */}
              <div
                className={`relative flex items-start gap-3 ${
                  currentStageIdx < 1 ? 'opacity-55' : ''
                }`}
              >
                <span
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ring-4 ring-[#0d1424] ${
                    currentStageIdx > 1
                      ? 'bg-emerald-600 text-white'
                      : currentStageIdx === 1
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStageIdx > 1 ? '✓' : '2'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      Control de Calidad, Serializado y Embalaje Anti-Estático
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {currentStageIdx > 1
                        ? 'Completado'
                        : currentStageIdx === 1
                        ? 'En Bodega Central'
                        : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hardware verificado contra checklist ISO 9001. Precintos criptográficos numerados instalados en gabinete de transporte.
                  </p>
                </div>
              </div>

              {/* Stage 3 */}
              <div
                className={`relative flex items-start gap-3 ${
                  currentStageIdx < 2 ? 'opacity-55' : ''
                }`}
              >
                <span
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ring-4 ring-[#0d1424] ${
                    currentStageIdx > 2
                      ? 'bg-emerald-600 text-white'
                      : currentStageIdx === 2
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStageIdx > 2 ? '✓' : '3'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      En Tránsito con Monitoreo GPS y Telemetría
                    </span>
                    <span className="text-[10px] text-amber-300 font-mono">
                      {currentStageIdx > 2
                        ? 'Completado'
                        : currentStageIdx === 2
                        ? 'En Ruta Activa'
                        : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Unidad de transporte especializada hacia muelle de descarga en:{' '}
                    <span className="text-white font-medium">
                      {selectedOrder.companyInfo.address}, {selectedOrder.companyInfo.city}
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Stage 4 */}
              <div
                className={`relative flex items-start gap-3 ${
                  currentStageIdx < 3 ? 'opacity-55' : ''
                }`}
              >
                <span
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ring-4 ring-[#0d1424] ${
                    currentStageIdx === 3
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStageIdx === 3 ? '✓' : '4'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">
                      Entrega en Muelle & Firma de Acta de Recepción Técnica
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {currentStageIdx === 3 ? 'Entregado y Firmado' : 'Programado'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Recepción a cargo de{' '}
                    <strong className="text-slate-300">
                      {selectedOrder.companyInfo.contactName}
                    </strong>{' '}
                    con activación de póliza SLA On-Site 4h.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items in Shipment */}
          {selectedOrder.items && selectedOrder.items.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-200">
                Detalle de Equipos en este Embarque ({selectedOrder.items.length} partidas):
              </h4>
              <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 text-xs">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-white">{item.product.name}</p>
                      <p className="text-[11px] font-mono text-slate-400">
                        SKU: {item.product.sku} · Cantidad: {item.quantity} ud.
                      </p>
                    </div>
                    <span className="font-mono text-slate-200 font-semibold tabular-nums">
                      {formatPrice(item.totalPrice, currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLA & Security Box */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Protocolo de Custodia Asegurada B2B</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Todos los embarques de infraestructura tecnológica cuentan con póliza de seguro a todo riesgo contra robo, golpe y daños electromagnéticos hasta el punto de entrega físico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
