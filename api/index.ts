import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_PRODUCTS } from '../src/data/products.ts';


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// Build a concise catalog context string with full technical specs and bulk pricing
const CATALOG_CONTEXT = INITIAL_PRODUCTS.map((p) => {
  const specsStr = p.specs.map((s) => `${s.label}: ${s.value}`).join(' | ');
  const tiersStr = p.bulkTiers
    .map((t) => `${t.label}: $${t.pricePerUnit} USD (-${t.discountPercent}%)`)
    .join(', ');
  return `- ID: "${p.id}" | SKU: "${p.sku}" | Nombre: "${p.name}" | Categoría: ${p.categoryLabel} | Marca: ${p.brand}
  Precio Base: $${p.basePriceUSD} USD | Escalas Volumen: [${tiersStr}] | Stock: ${p.stockCount} uds
  Uso Ideal: ${p.idealFor}
  Dimensiones: ${p.dimensions} | Energía: ${p.powerSpec} | Fiabilidad: ${p.mtbfHours}
  Especificaciones: ${specsStr}
  Garantía: ${p.warranty}`;
}).join('\n\n');

const app = express();

  app.use(express.json({ limit: '2mb' }));

  // 1. Endpoint: AI Infrastructure Architect & BOM Generator
  app.post('/api/ai/architect', async (req, res) => {
    try {
      const { requirement, budgetUSD, companySize } = req.body;
      if (!requirement || typeof requirement !== 'string') {
        res.status(400).json({ error: 'Por favor describa el requerimiento técnico o proyecto.' });
        return;
      }

      const prompt = `Requerimiento del cliente corporativo: "${requirement}"
Tamaño de empresa / usuarios: "${companySize || 'No especificado'}"
Presupuesto estimado de referencia (USD): "${budgetUSD || 'Abierto a recomendación óptima'}"

Catálogo oficial disponible (usa ÚNICAMENTE los productId exactos de esta lista):
${CATALOG_CONTEXT}

Diseña una propuesta de arquitectura de hardware empresarial a medida seleccionando los equipos y cantidades óptimas de nuestro catálogo.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Eres el Arquitecto Principal de Soluciones TI e Infraestructura de NEXUS Tech Enterprise. Analizas requerimientos corporativos y diseñas propuestas de equipamiento exactas usando exclusivamente productos reales del catálogo proporcionado. Responde siempre en español profesional y técnico.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              projectTitle: {
                type: Type.STRING,
                description: 'Título ejecutivo de la arquitectura propuesta'
              },
              executiveSummary: {
                type: Type.STRING,
                description: 'Resumen técnico y justificación de la arquitectura (2 a 3 párrafos breves)'
              },
              recommendedItems: {
                type: Type.ARRAY,
                description: 'Lista de productos del catálogo recomendados con cantidades',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productId: {
                      type: Type.STRING,
                      description: 'El ID exacto del producto del catálogo (ej. prod-server-x900)'
                    },
                    quantity: {
                      type: Type.INTEGER,
                      description: 'Cantidad recomendada de unidades'
                    },
                    technicalReason: {
                      type: Type.STRING,
                      description: 'Justificación técnica de por qué se incluye este equipo y esta cantidad'
                    }
                  },
                  required: ['productId', 'quantity', 'technicalReason']
                }
              },
              powerAndSpaceAnalysis: {
                type: Type.STRING,
                description: 'Estimación de espacio en rack (U), consumo eléctrico en Watts/kVA y conectividad'
              },
              implementationRoadmap: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 pasos clave para el despliegue y puesta en marcha'
              }
            },
            required: [
              'projectTitle',
              'executiveSummary',
              'recommendedItems',
              'powerAndSpaceAnalysis',
              'implementationRoadmap'
            ]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('No se recibió respuesta del modelo de IA.');
      }

      const parsed = JSON.parse(text.trim());
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/ai/architect:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Error al generar la arquitectura con IA. Intente nuevamente en unos segundos.'
      });
    }
  });

  // 2. Endpoint: Technical Advisor Chat B2B
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Mensaje requerido.' });
        return;
      }

      const historyText = Array.isArray(history)
        ? history
            .slice(-6)
            .map((h: any) => `${h.role === 'user' ? 'Cliente' : 'Ingeniero IA'}: ${h.content}`)
            .join('\n')
        : '';

      const prompt = `${historyText ? `Historial reciente:\n${historyText}\n\n` : ''}Consulta actual del cliente: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: `Eres el Ingeniero Consultor Senior de Preventa B2B de NEXUS Tech Enterprise.
Responde consultas sobre especificaciones técnicas, compatibilidad, dimensionamiento, precios por volumen, garantías SLA (On-Site 4h / NBD), crédito fiscal Net 30/60 y envíos.
Sé claro, estructurado, preciso con los datos técnicos (procesadores, memoria, puertos, consumo, precios y descuentos por volumen) y menciona los SKUs exactos cuando recomiendes productos.

Catálogo completo de NEXUS Tech Enterprise:
${CATALOG_CONTEXT}`
        }
      });

      res.json({
        reply: response.text || 'No pude procesar la consulta en este momento.'
      });
    } catch (error: any) {
      console.error('Error in /api/ai/chat:', error);
      res.status(500).json({
        error: error?.message || 'Error al consultar al asistente técnico de IA.'
      });
    }
  });

  // 3. Endpoint: AI Technical Comparison Verdict
  app.post('/api/ai/compare', async (req, res) => {
    try {
      const { productIds } = req.body;
      if (!Array.isArray(productIds) || productIds.length === 0) {
        res.status(400).json({ error: 'Seleccione al menos un producto para analizar.' });
        return;
      }

      const selected = INITIAL_PRODUCTS.filter((p) => productIds.includes(p.id));
      const details = selected
        .map(
          (p) =>
            `Producto: ${p.name} (SKU: ${p.sku}) - Precio Base: $${p.basePriceUSD} USD - Uso: ${p.idealFor} - Specs: ${p.specs
              .map((s) => `${s.label}: ${s.value}`)
              .join('; ')}`
        )
        .join('\n\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analiza y compara técnicamente los siguientes equipos seleccionados por un comprador corporativo:\n\n${details}\n\nProporciona un dictamen ejecutivo claro: diferencias clave de rendimiento/propósito, retorno de inversión (ROI/TCO) por volumen y cuál elegir según el escenario empresarial (máximo 180 palabras).`,
        config: {
          systemInstruction:
            'Eres un Director de Ingeniería de Hardware Corporativo. Emitirás un dictamen comparativo directo, objetivo y altamente técnico en español.'
        }
      });

      res.json({
        analysis: response.text || 'Análisis no disponible.'
      });
    } catch (error: any) {
      console.error('Error in /api/ai/compare:', error);
      res.status(500).json({
        error: error?.message || 'Error al generar el dictamen comparativo con IA.'
      });
    }
  });

  // 4. Endpoint: AI Single-Product Workload & ROI Insight
  app.post('/api/ai/product-insight', async (req, res) => {
    try {
      const { productId, quantity, customQuestion } = req.body;
      const product = INITIAL_PRODUCTS.find((p) => p.id === productId);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado.' });
        return;
      }

      const specsStr = product.specs.map((s) => `${s.label}: ${s.value}`).join(' | ');
      const prompt = `Equipo: ${product.name} (SKU: ${product.sku}, Marca: ${product.brand})
Cantidad a adquirir: ${quantity || 1} unidades
Especificaciones: ${specsStr}
Consumo / Energía: ${product.powerSpec}
Fiabilidad: ${product.mtbfHours}
Uso recomendado: ${product.idealFor}
${customQuestion ? `Pregunta específica del cliente: "${customQuestion}"` : 'Genera un dictamen ejecutivo de rendimiento, dimensionamiento energético/térmico para la cantidad indicada, equipos complementarios sugeridos de nuestro catálogo y retorno de inversión B2B.'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: `Eres el Especialista de Ingeniería de Producto de NEXUS Tech Enterprise. Responde en español técnico y ejecutivo en máximo 160 palabras, estructurado con viñetas claras.
Contexto del catálogo para sugerir sinergias:
${CATALOG_CONTEXT}`
        }
      });

      res.json({
        insight: response.text || 'Dictamen técnico no disponible.'
      });
    } catch (error: any) {
      console.error('Error in /api/ai/product-insight:', error);
      res.status(500).json({
        error: error?.message || 'Error al generar el análisis de producto con IA.'
      });
    }
  });


export default app;
