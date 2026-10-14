import React, { useState } from 'react';
import { Product, Currency, CartItem } from '../types';
import { formatPrice, getTierForQuantity } from '../utils/formatters';
import {
  X,
  Cpu,
  Send,
  Plus,
  FileText,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare
} from 'lucide-react';

interface RecommendedItem {
  productId: string;
  quantity: number;
  technicalReason: string;
}

interface ArchitectProposal {
  projectTitle: string;
  executiveSummary: string;
  recommendedItems: RecommendedItem[];
  powerAndSpaceAnalysis: string;
  implementationRoadmap: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AiSolutionsArchitectModalProps {
  isOpen: boolean;
  initialTab?: 'architect' | 'chat';
  products: Product[];
  currency: Currency;
  onClose: () => void;
  onAddItemsToCart: (items: { product: Product; quantity: number }[]) => void;
  onGenerateRfpFromAi: (items: CartItem[]) => void;
  onQuickViewProduct: (product: Product) => void;
}

export const AiSolutionsArchitectModal: React.FC<AiSolutionsArchitectModalProps> = ({
  isOpen,
  initialTab = 'architect',
  products,
  currency,
  onClose,
  onAddItemsToCart,
  onGenerateRfpFromAi,
  onQuickViewProduct
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'architect' | 'chat'>(initialTab);

  // Architect State
  const [requirement, setRequirement] = useState(
    'Necesitamos modernizar nuestro centro de datos para soportar 180 usuarios en virtualización, almacenamiento compartido seguro contra ransomware, conmutación de red de 10GbE y respaldo eléctrico UPS.'
  );
  const [companySize, setCompanySize] = useState('150 - 250 empleados');
  const [budgetUSD, setBudgetUSD] = useState('$25,000 - $35,000 USD');
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);
  const [proposal, setProposal] = useState<ArchitectProposal | null>(null);

  // Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Bienvenido al servicio de Ingeniería de Preventa IA de NEXUS Tech Enterprise. Puedo ayudarle a comparar especificaciones técnicas, dimensionar servidores, calcular autonomía de UPS o recomendar el equipamiento exacto para su empresa. ¿Qué proyecto está planificando?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const presetScenarios = [
    {
      label: 'Data Center Alta Disponibilidad',
      req: 'Requerimos un clúster de virtualización de alta disponibilidad con servidores Xeon, almacenamiento SAN/NAS All-Flash para copias inmutables, switch 10GbE y respaldo UPS de 15kVA con PDU monitoreado.',
      size: '200 - 500 empleados',
      budget: '$30,000 USD'
    },
    {
      label: 'Salas de Junta Directiva Híbridas 4K',
      req: 'Equipamiento para 3 salas de consejo directivo con videoconferencia 4K asistida por IA, pantallas interactivas táctiles de 86 pulgadas y cobertura Wi-Fi 7 de alta densidad.',
      size: '100 - 300 empleados',
      budget: '$22,000 USD'
    },
    {
      label: 'Seguridad Perimetral & Biometría',
      req: 'Sistema de vigilancia perimetral para planta industrial con cámaras PTZ láser de largo alcance y control de acceso biométrico facial 3D en 6 puertas críticas alimentados por switch PoE++.',
      size: 'Planta Industrial (350 personas)',
      budget: '$18,000 USD'
    },
    {
      label: 'Renovación Flota Directiva & Trading',
      req: 'Renovación tecnológica para 8 directivos e ingenieros senior con Ultrabooks de fibra de carbono 5G, estaciones de trabajo motorizadas Dual-5K y monitores curvos de 49 pulgadas con KVM.',
      size: '50 - 150 empleados',
      budget: '$28,000 USD'
    }
  ];

  const handleGenerateArchitecture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirement.trim()) return;

    setIsGeneratingProposal(true);
    setProposalError(null);

    try {
      const response = await fetch('/api/ai/architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirement,
          companySize,
          budgetUSD
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al generar propuesta con IA');
      }

      setProposal(data);
    } catch (err: any) {
      setProposalError(
        err?.message || 'No fue posible conectar con el motor de IA en este momento.'
      );
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const handleSendChat = async (customQuestion?: string) => {
    const textToSend = (customQuestion ?? chatInput).trim();
    if (!textToSend || isSendingChat) return;

    const updatedHistory: ChatMessage[] = [
      ...chatHistory,
      { role: 'user', content: textToSend }
    ];
    setChatHistory(updatedHistory);
    if (!customQuestion) setChatInput('');
    setIsSendingChat(true);
    setChatError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: updatedHistory
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al consultar al asistente IA');
      }

      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply }
      ]);
    } catch (err: any) {
      setChatError(err?.message || 'Error al procesar la consulta con IA.');
    } finally {
      setIsSendingChat(false);
    }
  };

  // Resolve recommended items with real catalog products and volume tier pricing
  const resolvedItems = proposal
    ? proposal.recommendedItems
        .map((rec) => {
          const prod =
            products.find((p) => p.id === rec.productId) ||
            products.find((p) => p.sku.toLowerCase() === rec.productId.toLowerCase());
          if (!prod) return null;
          const qty = Math.max(1, rec.quantity || 1);
          const { unitPrice, discount } = getTierForQuantity(
            qty,
            prod.bulkTiers,
            prod.basePriceUSD
          );
          return {
            product: prod,
            quantity: qty,
            unitPrice,
            totalPrice: unitPrice * qty,
            discount,
            technicalReason: rec.technicalReason
          };
        })
        .filter(Boolean) as {
        product: Product;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        discount: number;
        technicalReason: string;
      }[]
    : [];

  const totalProposalUSD = resolvedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden my-8"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Arquitecto de Soluciones & Consultor de Ingeniería IA
              </h3>
              <p className="text-xs text-slate-400">
                Dimensionamiento automático de hardware corporativo, cálculo de BOM y soporte técnico en tiempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar asistente IA"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="px-6 pt-3 bg-[#0b111e] border-b border-slate-800 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('architect')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'architect'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dimensionador de Proyectos & BOM con IA</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'chat'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultor de Ingeniería en Vivo (Chat B2B)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {activeTab === 'architect' ? (
            <div className="space-y-6">
              {/* Preset Scenarios */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Plantillas Rápidas de Proyecto Empresarial (clic para autocompletar):
                </span>
                <div className="flex flex-wrap gap-2">
                  {presetScenarios.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setRequirement(preset.req);
                        setCompanySize(preset.size);
                        setBudgetUSD(preset.budget);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:border-amber-400/50 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleGenerateArchitecture}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4 text-xs"
              >
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-200 block">
                    Describa las necesidades tecnológicas o el proyecto de su empresa:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    placeholder="Ej: Necesitamos equipar un centro de datos para 200 empleados con virtualización, almacenamiento redundante y 4 salas de videoconferencia..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">
                      Escala / N° de Usuarios o Sedes:
                    </label>
                    <input
                      type="text"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium block">
                      Presupuesto Estimado de Referencia:
                    </label>
                    <input
                      type="text"
                      value={budgetUSD}
                      onChange={(e) => setBudgetUSD(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGeneratingProposal}
                    className="py-2.5 px-5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    {isGeneratingProposal ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Diseñando Arquitectura...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        <span>Generar Arquitectura con IA</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {proposalError && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{proposalError}</span>
                </div>
              )}

              {/* AI Proposal Output */}
              {proposal && (
                <div className="space-y-5 border border-amber-500/30 rounded-xl p-5 bg-[#0a101d] animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 block">
                        PROPUESTA DE INGENIERÍA GENERADA POR IA
                      </span>
                      <h4 className="text-lg font-bold text-white font-display">
                        {proposal.projectTitle}
                      </h4>
                    </div>
                    <div className="text-left sm:text-right font-mono">
                      <span className="text-[11px] text-slate-400 block">
                        Inversión Total Estimada (con Descuento B2B):
                      </span>
                      <span className="text-xl font-extrabold text-amber-400 tabular-nums">
                        {formatPrice(totalProposalUSD, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <h5 className="font-semibold text-white">Justificación de Arquitectura:</h5>
                    <p className="whitespace-pre-line">{proposal.executiveSummary}</p>
                  </div>

                  {/* Recommended Bill of Materials Table */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-white">
                      Listado de Equipamiento Recomendado (Bill of Materials):
                    </h5>
                    <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 text-xs">
                      {resolvedItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-800/30"
                        >
                          <div className="space-y-1 max-w-2xl">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-amber-400">
                                {item.quantity}x
                              </span>
                              <button
                                type="button"
                                onClick={() => onQuickViewProduct(item.product)}
                                className="font-semibold text-white hover:text-amber-400 text-left cursor-pointer"
                              >
                                {item.product.name}
                              </button>
                              <span className="font-mono text-[11px] text-slate-400">
                                ({item.product.sku})
                              </span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              {item.technicalReason}
                            </p>
                          </div>

                          <div className="text-left md:text-right shrink-0 font-mono">
                            <div className="text-sm font-bold text-white tabular-nums">
                              {formatPrice(item.totalPrice, currency)}
                            </div>
                            <div className="text-[11px] text-slate-400 tabular-nums">
                              {formatPrice(item.unitPrice, currency)} / ud{' '}
                              {item.discount > 0 && (
                                <span className="text-emerald-400">(-{item.discount}%)</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Power, Space & Implementation Roadmap */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                      <span className="font-semibold text-amber-400 block">
                        Cálculo Eléctrico, Térmico y Espacio de Rack:
                      </span>
                      <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                        {proposal.powerAndSpaceAnalysis}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                      <span className="font-semibold text-emerald-400 block">
                        Hoja de Ruta de Implementación Sugerida:
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {proposal.implementationRoadmap.map((step, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons to Load BOM into Cart or RFP */}
                  {resolvedItems.length > 0 && (
                    <div className="pt-4 border-t border-slate-800 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const cartItems: CartItem[] = resolvedItems.map((r) => ({
                            product: r.product,
                            quantity: r.quantity,
                            unitPrice: r.unitPrice,
                            totalPrice: r.totalPrice
                          }));
                          onGenerateRfpFromAi(cartItems);
                        }}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span>Generar Cotización RFP de esta Propuesta</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onAddItemsToCart(
                            resolvedItems.map((r) => ({
                              product: r.product,
                              quantity: r.quantity
                            }))
                          );
                          onClose();
                        }}
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Cargar Equipos Recomendados a la Orden B2B</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Tab 2: Live Technical Engineering Chat */
            <div className="flex flex-col h-[60vh]">
              {/* Quick Technical Questions */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-400">Consultas frecuentes:</span>
                {[
                  '¿Qué servidor recomiendas para VMware y bases de datos?',
                  '¿Cuánta autonomía tiene el UPS de 15kVA a media carga?',
                  '¿Diferencia entre la estación Dual-5K y el monitor 49" KVM?',
                  '¿Cómo funciona el crédito fiscal Net 30?'
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendChat(q)}
                    disabled={isSendingChat}
                    className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Messages Container */}
              <div className="flex-grow overflow-y-auto p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl rounded-xl p-3.5 leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-amber-400 text-slate-950 font-medium'
                          : 'bg-slate-900 border border-slate-800 text-slate-200'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <span className="text-[10px] font-mono text-amber-400 font-semibold block mb-1">
                          INGENIERO PREVENTA IA · NEXUS TECH
                        </span>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isSendingChat && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Analizando especificaciones del catálogo...</span>
                    </div>
                  </div>
                )}
                {chatError && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs">
                    {chatError}
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat();
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escriba su consulta técnica sobre servidores, redes, UPS, precios o garantías..."
                  className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSendingChat || !chatInput.trim()}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Consultar IA</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
