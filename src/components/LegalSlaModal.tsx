import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, CreditCard, Lock } from 'lucide-react';

export type LegalTabType = 'terms' | 'privacy' | 'sla' | 'credit';

interface LegalSlaModalProps {
  isOpen: boolean;
  initialTab?: LegalTabType;
  onClose: () => void;
}

export const LegalSlaModal: React.FC<LegalSlaModalProps> = ({
  isOpen,
  initialTab = 'sla',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Centro de Documentación Normativa, Garantías SLA & Cumplimiento B2B
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar documentación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 bg-[#0b111e] border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sla')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sla'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Garantías & Póliza SLA 4h</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('credit')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'credit'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Crédito Net 30/60 & Facturación</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Términos Comerciales B2B</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacidad & ISO 27001</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 text-xs text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto">
          {activeTab === 'sla' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">
                Acuerdo de Nivel de Servicio (SLA) y Garantía Directa de Fábrica
              </h4>
              <p>
                Todo el equipamiento electrónico comercializado por <strong>NEXUS Tech Enterprise</strong> cuenta con trazabilidad de número de serie directa del fabricante y cobertura para infraestructura de misión crítica:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-semibold block">
                    01. Respuesta en Sitio en 4 Horas (24/7/365)
                  </span>
                  <p className="text-slate-400">
                    Para servidores Rackmount, cabinas SAN/NAS y sistemas UPS de 15kVA, un ingeniero certificado acude a su centro de datos con refacciones originales en menos de 4 horas desde el reporte.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-semibold block">
                    02. Reemplazo Anticipado NBD (Next Business Day)
                  </span>
                  <p className="text-slate-400">
                    En switches de red, puntos de acceso Wi-Fi 7, sistemas de videoconferencia y monitores, despachamos una unidad nueva de reemplazo antes de retirar la unidad en revisión.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-semibold block">
                    03. Retención de Medios de Almacenamiento
                  </span>
                  <p className="text-slate-400">
                    Por cumplimiento de seguridad de datos bancarios y corporativos, ante el fallo de una unidad SSD/NVMe su organización conserva el disco defectuoso para destrucción física interna sin perder la garantía.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-semibold block">
                    04. Garantía DOA (Dead on Arrival) 30 Días
                  </span>
                  <p className="text-slate-400">
                    Cualquier equipo que presente anomalías dentro de los primeros 30 días calendario posteriores al acta de entrega se sustituye por una unidad nueva sellada sin costo logístico.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credit' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">
                Política de Crédito Corporativo Net 30 / Net 60 y Facturación Fiscal
              </h4>
              <p>
                Facilitamos el flujo de caja de departamentos de TI, constructoras, universidades y entidades financieras mediante líneas de crédito directo sin intermediación bancaria:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  <strong>Facturación Electrónica Homologada:</strong> Emisión automática de factura electrónica XML/PDF validada ante la autoridad tributaria (DIAN / SAT / AEAT / SII) con desglose de IVA e identificadores de orden de compra (PO Number).
                </li>
                <li>
                  <strong>Plazo Net 30 Días:</strong> Disponible de forma inmediata para órdenes corporativas identificadas con RUT/RFC/CIF empresarial activo, sin recargos financieros.
                </li>
                <li>
                  <strong>Plazo Net 60 Días:</strong> Habilitado para contratos marco de aprovisionamiento o proyectos superiores a $15,000 USD previa validación de cupo de crédito en menos de 24 horas.
                </li>
                <li>
                  <strong>Bloqueo Cambiario en Cotizaciones RFP:</strong> Toda proforma formal emitida en nuestra plataforma garantiza el precio y la disponibilidad del inventario en bodega durante 30 días naturales.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">
                Términos Comerciales de Venta y Logística B2B
              </h4>
              <p>
                Las presentes condiciones regulan el suministro de hardware, licenciamiento embebido y equipamiento electrónico a través de NEXUS Tech Enterprise:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  <strong>Condiciones de Entrega (Incoterms DDP Sede Cliente):</strong> Todas las órdenes incluyen seguro de tránsito a todo riesgo del 100% del valor facturado hasta la firma del acta de recepción en el muelle o recepción del cliente.
                </li>
                <li>
                  <strong>Flete Bonificado:</strong> Las órdenes cuyo subtotal supere los $4,000 USD (o su equivalente en moneda local) cuentan con transporte especializado blindado bonificado al 100%.
                </li>
                <li>
                  <strong>Homologación y Certificación de Origen:</strong> Todos los equipos se entregan nuevos, en empaque original sellado de fábrica, con certificados de conformidad CE, FCC, UL y cumplimiento NDAA cuando aplique.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">
                Seguridad de la Información ISO 27001 y Protección de Datos Corporativos
              </h4>
              <p>
                NEXUS Tech Enterprise opera bajo controles auditados ISO/IEC 27001:2022 para proteger la confidencialidad de la arquitectura tecnológica y los datos fiscales de nuestros clientes:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  <strong>Confidencialidad de Topologías y Licitaciones:</strong> Los listados de equipamiento (BOM), direcciones de centros de datos y cotizaciones RFP se procesan bajo estricto acuerdo de confidencialidad (NDA implícito).
                </li>
                <li>
                  <strong>Aprovisionamiento Zero-Touch Seguro:</strong> Los identificadores de hardware (Hardware Hashes) para registro en Microsoft Intune / Windows Autopilot o Apple Business Manager se transmiten mediante canales cifrados TLS 1.3.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#090e1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
