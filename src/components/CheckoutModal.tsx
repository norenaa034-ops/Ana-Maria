import React, { useState } from 'react';
import { CartItem, Currency, CompanyBillingInfo, EnterpriseOrder } from '../types';
import { formatPrice } from '../utils/formatters';
import {
  X,
  CheckCircle2,
  Building2,
  CreditCard,
  FileCheck,
  Download,
  PackageCheck,
  Tag
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onOrderCompleted: (order: EnterpriseOrder) => void;
  onClearCart: () => void;
  onOpenTrackerForOrder?: (orderNumber: string) => void;
}

const CORPORATE_CODES: Record<string, { discountRate: number; label: string }> = {
  CORPORATE5: { discountRate: 0.05, label: 'Convenio Corporativo (-5%)' },
  DATACENTER10: { discountRate: 0.1, label: 'Alianza Infraestructura (-10%)' },
  PARTNER8: { discountRate: 0.08, label: 'Canal Integrador B2B (-8%)' }
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderCompleted,
  onClearCart,
  onOpenTrackerForOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [createdOrder, setCreatedOrder] = useState<EnterpriseOrder | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CompanyBillingInfo>({
    companyName: 'TechCorp Solutions S.A.S.',
    taxId: '901.458.912-3',
    contactName: 'Ing. Carlos Mendoza',
    email: 'compras@techcorp.com',
    phone: '+57 312 889 0041',
    address: 'Av. Empresarial 100, Edificio Titanium Piso 14',
    city: 'Bogotá D.C.',
    country: 'Colombia',
    department: 'Gerencia de Tecnología e Infraestructura',
    paymentTerms: 'credit_net30',
    notes: 'Requerimos entrega con montacargas para racks en el sótano 2.'
  });

  const subtotalUSD = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountRate = appliedCode ? CORPORATE_CODES[appliedCode]?.discountRate || 0 : 0;
  const discountUSD = subtotalUSD * discountRate;
  const netSubtotalUSD = subtotalUSD - discountUSD;
  const taxUSD = netSubtotalUSD * 0.16;
  const isFreeShipping = netSubtotalUSD >= 4000;
  const shippingUSD = netSubtotalUSD > 0 ? (isFreeShipping ? 0 : 150) : 0;
  const grandTotalUSD = netSubtotalUSD + taxUSD + shippingUSD;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (CORPORATE_CODES[code]) {
      setAppliedCode(code);
      setPromoError(null);
    } else {
      setPromoError('Código no reconocido. Pruebe CORPORATE5 o DATACENTER10');
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `NX-B2B-2026-${randomSuffix}`;
    const trackingNum = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: EnterpriseOrder = {
      id: `order-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      companyInfo: formData,
      items: [...items],
      subtotalUSD,
      discountUSD,
      taxUSD,
      shippingUSD,
      totalUSD: grandTotalUSD,
      status: 'warehouse_preparation',
      trackingNumber: trackingNum,
      estimatedDelivery: '2 a 3 días hábiles',
      carrier: 'NEXUS Secure Logistics Freight'
    };

    setCreatedOrder(newOrder);
    onOrderCompleted(newOrder);
    onClearCart();
    setStep(3);
  };

  const handleDownloadOrderReceipt = () => {
    if (!createdOrder) return;
    const itemLines = createdOrder.items
      .map(
        (i, idx) =>
          `${idx + 1}. [${i.product.sku}] ${i.product.name} - Cant: ${i.quantity} x ${formatPrice(
            i.unitPrice,
            currency
          )} = ${formatPrice(i.totalPrice, currency)}`
      )
      .join('\n');

    const receipt = `====================================================================
NEXUS TECH ENTERPRISE - ORDEN DE COMPRA CORPORATIVA CONFIRMADA
====================================================================
N° DE ORDEN: ${createdOrder.orderNumber}
GUÍA LOGÍSTICA: ${createdOrder.trackingNumber}
FECHA: ${createdOrder.date}
ESTADO: En Preparación de Despacho (Bodega Central)

DATOS FISCALES DEL ADQUIRIENTE
--------------------------------------------------------------------
Razón Social: ${createdOrder.companyInfo.companyName}
Identificación Fiscal: ${createdOrder.companyInfo.taxId}
Contacto: ${createdOrder.companyInfo.contactName} (${createdOrder.companyInfo.department})
Correo: ${createdOrder.companyInfo.email} · Tel: ${createdOrder.companyInfo.phone}
Dirección de Entrega: ${createdOrder.companyInfo.address}, ${createdOrder.companyInfo.city}, ${createdOrder.companyInfo.country}

PARTIDAS ADQUIRIDAS
--------------------------------------------------------------------
${itemLines}

LIQUIDACIÓN FISCAL (${currency})
--------------------------------------------------------------------
Subtotal Partidas: ${formatPrice(createdOrder.subtotalUSD, currency)}
${
  createdOrder.discountUSD && createdOrder.discountUSD > 0
    ? `Descuento Convenio: -${formatPrice(createdOrder.discountUSD, currency)}\n`
    : ''
}IVA Fiscal (16%): ${formatPrice(createdOrder.taxUSD, currency)}
Flete Blindado: ${
      createdOrder.shippingUSD === 0
        ? 'BONIFICADO (0.00)'
        : formatPrice(createdOrder.shippingUSD, currency)
    }
TOTAL FACTURADO: ${formatPrice(createdOrder.totalUSD, currency)}
====================================================================
`;
    const blob = new Blob([receipt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Orden_${createdOrder.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <Building2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Tramitación de Orden de Compra Corporativa (B2B)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        {step < 3 && (
          <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                  step === 1 ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-white font-semibold' : 'text-slate-400'}>
                Datos Fiscales de la Empresa
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                  step === 2 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-white font-semibold' : 'text-slate-400'}>
                Términos de Pago & Aprobación
              </span>
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <p className="text-xs text-slate-400">
                Ingrese los datos fiscales y la sede de recepción. Emitiremos la factura electrónica conforme a la normativa tributaria vigente.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">
                    Razón Social o Nombre Corporativo:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    placeholder="Ej. Inversiones Globales S.A."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">
                    Identificación Fiscal (RUT / CIF / RFC / Tax ID):
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none font-mono"
                    placeholder="Ej. B-87654321 o RFC..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">
                    Nombre del Contacto / Comprador Autorizado:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">
                    Correo Corporativo para Facturación:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Teléfono / PBX Directo:</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">
                    Departamento / Centro de Costos:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-300 font-medium block">
                    Dirección de Entrega / Muelle de Carga:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">Ciudad / Municipio:</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium block">País:</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Continuar a Términos de Pago →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-200">
                  Seleccione la Modalidad de Pago Empresarial:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Option 1: Net 30 */}
                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      formData.paymentTerms === 'credit_net30'
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 font-semibold">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Crédito Fiscal Net 30 Días</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentTerms"
                        checked={formData.paymentTerms === 'credit_net30'}
                        onChange={() => setFormData({ ...formData, paymentTerms: 'credit_net30' })}
                        className="accent-amber-400"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Aprobación automática para empresas constituidas. Despacho inmediato y 30 días para pago de factura.
                    </p>
                  </label>

                  {/* Option 2: Net 60 */}
                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      formData.paymentTerms === 'credit_net60'
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 font-semibold">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Crédito Corporativo Net 60 Días</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentTerms"
                        checked={formData.paymentTerms === 'credit_net60'}
                        onChange={() => setFormData({ ...formData, paymentTerms: 'credit_net60' })}
                        className="accent-amber-400"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Sujeto a póliza de crédito o cupo empresarial asignado. Ideal para proyectos de infraestructura mayor.
                    </p>
                  </label>

                  {/* Option 3: Wire Transfer */}
                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      formData.paymentTerms === 'wire_transfer'
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 font-semibold">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <span>Transferencia SPEI / Swift Directa</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentTerms"
                        checked={formData.paymentTerms === 'wire_transfer'}
                        onChange={() => setFormData({ ...formData, paymentTerms: 'wire_transfer' })}
                        className="accent-amber-400"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Emisión de proforma bancaria con cuenta corporativa Citibank / Santander con reserva de stock por 72h.
                    </p>
                  </label>

                  {/* Option 4: Corporate Card */}
                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      formData.paymentTerms === 'corporate_card'
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 font-semibold">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Tarjeta Corporativa / Procurement</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentTerms"
                        checked={formData.paymentTerms === 'corporate_card'}
                        onChange={() =>
                          setFormData({ ...formData, paymentTerms: 'corporate_card' })
                        }
                        className="accent-amber-400"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Cargo inmediato procesado con tokenización PCI-DSS Nivel 1 para compras directas de emergencia.
                    </p>
                  </label>
                </div>
              </div>

              {/* Corporate Convenio / Partner Code */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Código de Convenio Marco o Partner B2B:</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Ej: CORPORATE5 (-5%) o DATACENTER10 (-10%)
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Ingrese código de convenio corporativo..."
                    className="flex-grow bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-lg cursor-pointer whitespace-nowrap"
                  >
                    Aplicar Convenio
                  </button>
                </div>
                {appliedCode && (
                  <p className="text-[11px] text-emerald-400 font-mono">
                    ✓ Aplicado: {CORPORATE_CODES[appliedCode].label}
                  </p>
                )}
                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
              </div>

              {/* Order summary block */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Partidas a despachar:</span>
                  <span className="font-semibold text-white">
                    {items.length} productos ({items.reduce((acc, i) => acc + i.quantity, 0)}{' '}
                    unidades)
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal Partidas:</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {formatPrice(subtotalUSD, currency)}
                  </span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento Convenio ({appliedCode}):</span>
                    <span className="font-mono tabular-nums">
                      -{formatPrice(discountUSD, currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>IVA Fiscal (16%):</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {formatPrice(taxUSD, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Entrega en:</span>
                  <span className="text-white truncate max-w-xs">
                    {formData.address}, {formData.city}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline font-bold">
                  <span className="text-slate-200">Importe Total con IVA:</span>
                  <span className="text-base font-mono text-amber-400 tabular-nums">
                    {formatPrice(grandTotalUSD, currency)}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  ← Volver a Datos Fiscales
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Confirmar & Emitir Orden de Compra Fiscal</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && createdOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white font-display">
                  ¡Orden de Compra Corporativa Emitida con Éxito!
                </h4>
                <p className="text-xs text-slate-400">
                  Hemos notificado a su Ejecutivo de Cuenta B2B y a la Bodega Central de Despacho.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md mx-auto text-left text-xs space-y-3 font-mono">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Número de Orden:</span>
                  <span className="text-amber-400 font-bold">{createdOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Guía de Rastreo B2B:</span>
                  <span className="text-white font-bold">{createdOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Modalidad de Pago:</span>
                  <span className="text-slate-200">
                    {createdOrder.companyInfo.paymentTerms === 'credit_net30' && 'Crédito Net 30'}
                    {createdOrder.companyInfo.paymentTerms === 'credit_net60' && 'Crédito Net 60'}
                    {createdOrder.companyInfo.paymentTerms === 'wire_transfer' &&
                      'Transferencia SPEI'}
                    {createdOrder.companyInfo.paymentTerms === 'corporate_card' &&
                      'Tarjeta Corporativa'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monto Facturado:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {formatPrice(createdOrder.totalUSD, currency)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadOrderReceipt}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Descargar Comprobante</span>
                </button>

                {onOpenTrackerForOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenTrackerForOrder(createdOrder.orderNumber);
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Rastrear Guía en Vivo</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  Volver al Catálogo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
