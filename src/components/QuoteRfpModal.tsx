import React, { useState } from 'react';
import { CartItem, Currency, Product, CompanyBillingInfo } from '../types';
import { formatPrice, getTierForQuantity } from '../utils/formatters';
import { X, FileText, Printer, Building2, ShieldCheck, Download, ArrowRight } from 'lucide-react';

interface QuoteRfpModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  singleItemQuote?: { product: Product; quantity: number } | null;
  onConvertQuoteToOrder?: (quoteItems: CartItem[]) => void;
}

export const QuoteRfpModal: React.FC<QuoteRfpModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  singleItemQuote,
  onConvertQuoteToOrder
}) => {
  if (!isOpen) return null;

  // Calculate proper bulk tier price when a single item quote is requested
  const quoteItems: CartItem[] = singleItemQuote
    ? (() => {
        const { unitPrice } = getTierForQuantity(
          singleItemQuote.quantity,
          singleItemQuote.product.bulkTiers,
          singleItemQuote.product.basePriceUSD
        );
        return [
          {
            product: singleItemQuote.product,
            quantity: singleItemQuote.quantity,
            unitPrice,
            totalPrice: unitPrice * singleItemQuote.quantity
          }
        ];
      })()
    : items;

  const [companyInfo, setCompanyInfo] = useState<CompanyBillingInfo>({
    companyName: 'Grupo Corporativo Andino S.A.',
    taxId: '900.812.345-1',
    contactName: 'Ing. Rodrigo Santamaría',
    email: 'adquisiciones@grupoandino.com',
    phone: '+57 1 744 9020',
    address: 'Carrera 7 # 116-50 Piso 9',
    city: 'Bogotá',
    country: 'Colombia',
    department: 'Dirección de Infraestructura y Redes',
    paymentTerms: 'credit_net30',
    notes: 'Cotización requerida para licitación privada Q4 2026.'
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [printFeedback, setPrintFeedback] = useState(false);
  const [quoteNumber] = useState(
    () => `RFP-COT-2026-${Math.floor(1000 + Math.random() * 9000)}`
  );

  const subtotalUSD = quoteItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const regularSubtotalUSD = quoteItems.reduce(
    (acc, item) => acc + item.product.basePriceUSD * item.quantity,
    0
  );
  const volumeSavingsUSD = Math.max(0, regularSubtotalUSD - subtotalUSD);
  const taxUSD = subtotalUSD * 0.16;
  const shippingUSD = subtotalUSD > 0 ? (subtotalUSD >= 4000 ? 0 : 150) : 0;
  const grandTotalUSD = subtotalUSD + taxUSD + shippingUSD;

  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    setPrintFeedback(true);
    setTimeout(() => {
      window.print();
      setPrintFeedback(false);
    }, 300);
  };

  const handleDownloadQuoteTxt = () => {
    const lines = quoteItems
      .map(
        (item, idx) =>
          `${idx + 1}. [${item.product.sku}] ${item.product.name}\n   Cantidad: ${
            item.quantity
          } ud x ${formatPrice(item.unitPrice, currency)} = ${formatPrice(
            item.totalPrice,
            currency
          )}\n   Garantía: ${item.product.warranty}`
      )
      .join('\n\n');

    const doc = `====================================================================
NEXUS TECH ENTERPRISE - COTIZACIÓN PROFORMA OFICIAL B2B
====================================================================
N° COTIZACIÓN: ${quoteNumber}
FECHA DE EMISIÓN: ${new Date().toLocaleDateString('es-ES')}
VÁLIDA HASTA: ${validUntil}
MONEDA: ${currency}

ENTIDAD SOLICITANTE
--------------------------------------------------------------------
Razón Social: ${companyInfo.companyName}
Identificación Fiscal: ${companyInfo.taxId}
Responsable: ${companyInfo.contactName} (${companyInfo.department})
Correo: ${companyInfo.email} · Teléfono: ${companyInfo.phone}
Dirección: ${companyInfo.address}, ${companyInfo.city} (${companyInfo.country})
Notas: ${companyInfo.notes || 'N/A'}

DETALLE DE EQUIPAMIENTO COTIZADO
--------------------------------------------------------------------
${lines}

RESUMEN FINANCIERO
--------------------------------------------------------------------
Subtotal Neto B2B: ${formatPrice(subtotalUSD, currency)}
${volumeSavingsUSD > 0 ? `Ahorro por Escala de Volumen: -${formatPrice(volumeSavingsUSD, currency)}\n` : ''}IVA Fiscal (16%): ${formatPrice(taxUSD, currency)}
Logística Asegurada: ${shippingUSD === 0 ? 'BONIFICADO (0.00)' : formatPrice(shippingUSD, currency)}
TOTAL PROFORMA: ${formatPrice(grandTotalUSD, currency)}
====================================================================
Condiciones: Crédito Fiscal Net 30/60 sujeto a convenio · Precios garantizados por 30 días.
`;
    const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quoteNumber}.txt`;
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
        className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Generador Formal de Cotización RFP & Proforma Fiscal
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {isGenerated && (
              <>
                <button
                  onClick={handleDownloadQuoteTxt}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Descargar .TXT</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>{printFeedback ? 'Preparando...' : 'Imprimir / PDF'}</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[82vh] overflow-y-auto">
          {!isGenerated ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsGenerated(true);
              }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  Genere una cotización formal B2B con membrete corporativo, bloqueo de precios garantizado por 30 días, condiciones de pago Net 30/60 y soporte SLA on-site para presentar ante el comité de compras de su organización.
                </p>
              </div>

              {/* Items in quote */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-200">
                  Equipamiento Incluido ({quoteItems.length}{' '}
                  {quoteItems.length === 1 ? 'partida' : 'partidas'}):
                </h4>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 text-xs">
                  {quoteItems.length === 0 ? (
                    <div className="p-4 text-center text-slate-500">
                      No hay artículos seleccionados. Agregue productos desde el catálogo para cotizar.
                    </div>
                  ) : (
                    quoteItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3.5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-semibold text-white">{item.product.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            SKU: {item.product.sku} · Garantía: {item.product.warranty.split('por')[0]}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono text-white font-bold tabular-nums">
                            {formatPrice(item.totalPrice, currency)}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                            {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'} ×{' '}
                            {formatPrice(item.unitPrice, currency)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Form Data */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-200">
                  Datos de la Entidad Solicitante:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Razón Social:</label>
                    <input
                      type="text"
                      required
                      value={companyInfo.companyName}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, companyName: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">
                      Identificación Fiscal (RUT/CIF/RFC):
                    </label>
                    <input
                      type="text"
                      required
                      value={companyInfo.taxId}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, taxId: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">
                      Responsable de Adquisiciones:
                    </label>
                    <input
                      type="text"
                      required
                      value={companyInfo.contactName}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, contactName: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">
                      Correo Electrónico Oficial:
                    </label>
                    <input
                      type="email"
                      required
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-slate-300 font-medium">
                      Observaciones de Licitación o Proyecto:
                    </label>
                    <input
                      type="text"
                      value={companyInfo.notes || ''}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-between items-center gap-3 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  Total estimado con IVA:{' '}
                  <span className="font-bold text-amber-400 font-mono tabular-nums text-sm">
                    {formatPrice(grandTotalUSD, currency)}
                  </span>
                  {volumeSavingsUSD > 0 && (
                    <span className="ml-2 text-emerald-400 font-mono">
                      (Ahorro B2B: {formatPrice(volumeSavingsUSD, currency)})
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={quoteItems.length === 0}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generar Proforma Oficial B2B</span>
                </button>
              </div>
            </form>
          ) : (
            /* Official Generated Document View (Print Friendly) */
            <div className="bg-slate-950 text-slate-100 p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6 print:border-none print:p-0 print:text-black">
              {/* Proforma Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold font-display tracking-tight text-white">
                    NEXUS Tech Enterprise
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Plataforma de Suministros Tecnológicos & Infraestructura Crítica B2B
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Tax ID: NEX-880914-B2B · ISO 9001:2015 Certificado
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono text-xs space-y-1">
                  <div className="text-amber-400 font-bold text-sm">{quoteNumber}</div>
                  <div className="text-slate-400">
                    Fecha de Emisión: {new Date().toLocaleDateString('es-ES')}
                  </div>
                  <div className="text-emerald-400">Válida hasta: {validUntil}</div>
                </div>
              </div>

              {/* Recipient & Supplier Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    CLIENTE ADJUDICATARIO:
                  </span>
                  <p className="font-bold text-white text-sm">{companyInfo.companyName}</p>
                  <p className="text-slate-300 font-mono">Identificación: {companyInfo.taxId}</p>
                  <p className="text-slate-300">Contacto: {companyInfo.contactName}</p>
                  <p className="text-slate-300">E-mail: {companyInfo.email}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    CONDICIONES COMERCIALES:
                  </span>
                  <p className="text-slate-300">
                    <strong className="text-white">Término de Pago:</strong> Crédito Fiscal Net 30 Días
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">Modalidad de Despacho:</strong> Flete Terrestre Asegurado
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">SLA Cobertura:</strong> On-Site 4 Horas con reemplazo NBD
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">Moneda de Facturación:</strong> {currency}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Descripción del Equipo</th>
                      <th className="p-3 text-center">Cant.</th>
                      <th className="p-3 text-right">Precio Unitario</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {quoteItems.map((item) => (
                      <tr key={item.product.id} className="hover:bg-slate-900/30">
                        <td className="p-3 text-amber-400">{item.product.sku}</td>
                        <td className="p-3 font-sans">
                          <p className="font-semibold text-white">{item.product.name}</p>
                          <p className="text-[11px] text-slate-400">{item.product.warranty}</p>
                        </td>
                        <td className="p-3 text-center text-white tabular-nums">{item.quantity}</td>
                        <td className="p-3 text-right text-slate-300 tabular-nums">
                          {formatPrice(item.unitPrice, currency)}
                        </td>
                        <td className="p-3 text-right text-white font-bold tabular-nums">
                          {formatPrice(item.totalPrice, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Block */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 space-y-1 max-w-sm">
                  <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Compromiso de Precios y Disponibilidad</span>
                  </p>
                  <p className="text-[11px]">
                    Los precios indicados en esta cotización están garantizados y bloqueados por 30 días naturales.
                  </p>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal Neto:</span>
                    <span className="text-slate-200 tabular-nums">
                      {formatPrice(subtotalUSD, currency)}
                    </span>
                  </div>
                  {volumeSavingsUSD > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Descuento Volumen B2B:</span>
                      <span className="tabular-nums">
                        -{formatPrice(volumeSavingsUSD, currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>IVA (16%):</span>
                    <span className="text-slate-200 tabular-nums">
                      {formatPrice(taxUSD, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Logística Especializada:</span>
                    <span className="text-slate-200 tabular-nums">
                      {shippingUSD === 0
                        ? 'BONIFICADO (0.00)'
                        : formatPrice(shippingUSD, currency)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
                    <span>Total Proforma:</span>
                    <span className="text-amber-400 text-base tabular-nums">
                      {formatPrice(grandTotalUSD, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 flex flex-wrap justify-between items-center gap-3 print:hidden border-t border-slate-800">
                <button
                  onClick={() => setIsGenerated(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  ← Editar Datos del Cliente
                </button>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadQuoteTxt}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Descargar Archivo</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Imprimir / PDF</span>
                  </button>
                  {onConvertQuoteToOrder && (
                    <button
                      onClick={() => {
                        onConvertQuoteToOrder(quoteItems);
                      }}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Tramitar Orden Ahora</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
