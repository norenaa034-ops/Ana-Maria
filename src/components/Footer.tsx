import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { LegalTabType } from './LegalSlaModal';

interface FooterProps {
  onOpenRfp: () => void;
  onOpenTracker: () => void;
  onSelectCategory: (category: string) => void;
  onOpenLegalModal: (tab: LegalTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRfp,
  onOpenTracker,
  onSelectCategory,
  onOpenLegalModal
}) => {
  return (
    <footer className="bg-[#080c14] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#inicio"
              className="text-xl font-bold tracking-tight text-white font-display inline-block"
            >
              NEXUS Tech Enterprise
            </a>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Plataforma de comercio electrónico corporativo para la adquisición y aprovisionamiento de infraestructura de centros de datos, redes de alta capacidad y tecnología empresarial.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Centro Corporativo Internacional, Torre Tecnológica Piso 18</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-slate-300">+57 1 8000 920 400 (Línea B2B 24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-300">ventas.corporativas@nexus-enterprise.com</span>
              </div>
            </div>
          </div>

          {/* Column: Catálogo */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">Categorías de Hardware</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('computo')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Servidores, SAN & Data Center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('redes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Switches 10G & Wi-Fi 7
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('audiovisual')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Salas de Juntas & Pizarras 86"
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('seguridad')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Cámaras PTZ & Biometría 3D
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('energia')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Sistemas UPS 15kVA & PDUs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('perifericos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Estaciones 5K & Monitores 49"
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Soluciones B2B */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">Servicios Corporativos</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenRfp}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Solicitud de Cotización (RFP)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Rastreo de Guías Blindadas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('credit')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Líneas de Crédito Net 30/60
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('sla')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Pólizas SLA On-Site 4 Horas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Homologación Fiscal & Incoterms
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Certificaciones y Cumplimiento */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">Cumplimiento & Normativas</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ISO 9001:2015 Certificado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ISO 27001 Seguridad de Datos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cumplimiento NDAA & CE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Facturación Electrónica DIAN/SAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright and Working Legal Action Buttons */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} NEXUS Enterprise Solutions S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Términos Comerciales de Venta
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Política de Privacidad y Tratamiento de Datos
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenLegalModal('sla')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Garantías y SLA
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
