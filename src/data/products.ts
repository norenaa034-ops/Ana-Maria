import { Product, EnterpriseBundle } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-server-x900',
    name: 'Servidor Rackmount NEXUS Blade X900 Enterprise 2U',
    sku: 'NX-SRV-9020-2U',
    category: 'computo',
    categoryLabel: 'Cómputo & Data Center',
    brand: 'NEXUS ProSys',
    shortDesc: 'Servidor bi-procesador escalable con soporte para cargas de IA intensiva, virtualización masiva y almacenamiento NVMe hot-swap de ultra baja latencia.',
    fullDesc: 'Diseñado para infraestructuras corporativas críticas y centros de datos empresariales de alta densidad. Equipado con arquitectura de doble socket Intel Xeon Scalable de 5ª Generación, 256GB de memoria ECC DDR5 (expandible hasta 4TB en 32 ranuras DIMM), 8 bahías NVMe PCIe 5.0 hot-swap y controladora RAID por hardware redundante con caché protegida por supercondensador.',
    highlights: [
      'Doble procesador Intel Xeon Gold con 64 núcleos físicos y 128 hilos para virtualización intensiva',
      'Buses PCIe Gen 5.0 con soporte para hasta 2 aceleradoras GPU de perfil completo',
      'Administración remota fuera de banda (Out-of-Band) mediante BMC IPMI 2.0 y Redfish API',
      'Fuentes de alimentación redundantes 1+1 Hot-Plug con certificación 80 Plus Titanium (96% eficiencia)'
    ],
    idealFor: 'Virtualización VMware/Proxmox, Bases de Datos Transaccionales (SAP HANA, Oracle, SQL), Nube Privada e Inferencia de IA.',
    dimensions: '87.5 mm (Alto 2U) × 434 mm (Ancho) × 735 mm (Profundidad) · Peso neto: 26.4 kg',
    powerSpec: 'Doble fuente 1400W AC (100–240V 50/60Hz) · Consumo típico: 480W – 920W bajo carga',
    operatingSystemOrFirmware: 'Compatible con RHEL 9, Ubuntu Server LTS, Windows Server 2025, VMware ESXi 8.0',
    originCountry: 'Ensamblaje y validación térmica en Austin, TX (EE. UU.)',
    mtbfHours: '350,000 horas MTBF (Disponibilidad 99.999%)',
    operatingTemp: '10°C a 35°C (Operación continua ASHRAE A2)',
    rating: 4.9,
    reviewCount: 47,
    reviews: [
      {
        id: 'rev-1',
        author: 'Ing. Roberto Valdés',
        role: 'Director de Infraestructura TI',
        company: 'Grupo Financiero Atlántico',
        rating: 5,
        date: 'Agosto 2026',
        comment: 'Desplegamos 12 nodos en nuestro clúster VMware principal. El rendimiento de las unidades NVMe U.3 redujo la latencia de nuestras bases de datos Oracle en un 64%.',
        verifiedDeployment: 'Compra verificada: 12 unidades (Contrato B2B)'
      },
      {
        id: 'rev-2',
        author: 'Dra. Camila Restrepo',
        role: 'VP de Operaciones Cloud',
        company: 'MedTech Cloud Latam',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'La consola BMC sobre HTML5 facilitó el aprovisionamiento remoto sin necesidad de personal en el data center. Excelente eficiencia térmica.',
        verifiedDeployment: 'Compra verificada: 4 unidades'
      }
    ],
    boxContents: [
      'Chasis Servidor 2U NEXUS Blade X900 preconfigurado',
      'Kit de rieles telescópicos sin herramientas (Tool-less Rack Rails)',
      'Brazo organizador de cables (CMA) articulado',
      '2x Cables de poder C13 a C14 para PDU de rack (2.5m)',
      'Bisel frontal metálico con cerradura de seguridad física y filtro antipolvo'
    ],
    basePriceUSD: 5850,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 5850, label: '1 a 2 unidades', discountPercent: 0 },
      { minQty: 3, pricePerUnit: 5490, label: '3 a 9 unidades', discountPercent: 6 },
      { minQty: 10, pricePerUnit: 4990, label: '10+ unidades (Contrato B2B)', discountPercent: 15 }
    ],
    inStock: true,
    stockCount: 18,
    leadTimeDays: 2,
    image: '/src/assets/images/product_server_infrastructure_1790189492513.jpg',
    specs: [
      { label: 'Procesador', value: '2x Intel Xeon Gold 6530 (64 núcleos combinados @ 3.8GHz Turbo, 320MB Caché)' },
      { label: 'Memoria RAM', value: '256GB (8x32GB) DDR5-5600MHz Registered ECC (32 slots, máx. 4TB)' },
      { label: 'Almacenamiento', value: '4x 1.92TB NVMe U.3 Enterprise SSD Hot-Plug (Expandible a 24 bahías)' },
      { label: 'Controladora RAID', value: 'Hardware RAID 0/1/5/6/10/50/60 con 8GB NV Cache Flash-Backed' },
      { label: 'Red & Puertos', value: 'Dual 25GbE SFP28 OCP 3.0 + Quad 1GbE RJ45 Base-T + 1x Puerto Gestión IPMI' },
      { label: 'Expansión PCIe', value: '6 ranuras PCIe 5.0 x16 de altura completa para tarjetas de red o GPU' },
      { label: 'Alimentación', value: 'Fuentes redundantes duales 1400W 80 Plus Titanium Hot-Swap' },
      { label: 'Gestión Remota', value: 'Módulo BMC IPMI 2.0 dedicado con consola KVM sobre HTML5 y telemetría térmica' }
    ],
    certifications: ['ISO 9001', 'CE', 'RoHS', 'Energy Star 3.0', 'UL Enterprise', 'FCC Clase A'],
    warranty: 'Garantía On-Site 4 Horas SLA 24/7 por 3 Años con retención de discos defectuosos',
    featured: true
  },
  {
    id: 'prod-nas-flasharray',
    name: 'Cabina de Almacenamiento Unificado SAN/NAS FlashArray 12-Bay 100GbE',
    sku: 'NX-STR-SAN-12F',
    category: 'computo',
    categoryLabel: 'Cómputo & Data Center',
    brand: 'NEXUS ProSys',
    shortDesc: 'Sistema de almacenamiento empresarial All-Flash e híbrido de 12 bahías con doble controladora activa, 96TB brutos incluidos y enlaces de 25G/100GbE.',
    fullDesc: 'Diseñado para consolidación de almacenamiento corporativo, respaldos inmutables contra ransomware y clústeres de edición de video o virtualización. Equipa 12 bahías LFF/SFF intercambiables en caliente con 96TB preinstalados, deduplicación y compresión en línea por hardware sin penalización de latencia, e instantáneas (Snapshots) inmutables programadas.',
    highlights: [
      'Capacidad empresarial de 96TB preinstalados (expandible hasta 1.1 PB mediante gabinetes de expansión SAS-4)',
      'Deduplicación y compresión de datos en línea con ratio promedio de reducción 3.5:1 en entornos de virtualización',
      'Protección nativa Anti-Ransomware mediante Snapshots inmutables WORM (Write Once, Read Many)',
      'Conectividad de ultra velocidad con 2 puertos 100GbE QSFP28 + 4 puertos 25GbE SFP28 (iSCSI, NVMe-oF, NFSv4.1, SMB3)'
    ],
    idealFor: 'Almacenamiento Compartido SAN/NAS, Repositorio Veeam Backup Inmutable, Bases de Datos y Postproducción 8K.',
    dimensions: '88.0 mm (Alto 2U) × 447 mm (Ancho) × 685 mm (Profundidad) · Peso neto: 23.8 kg',
    powerSpec: 'Fuentes redundantes 2x 850W Platinum Hot-Swap (100–240V AC) · Consumo en operación: 310W',
    operatingSystemOrFirmware: 'DataCore ZFS Enterprise OS con replicación síncrona/asíncrona e integración Active Directory / LDAP',
    originCountry: 'Ensamblaje en San José, CA (EE. UU.)',
    mtbfHours: '400,000 horas MTBF',
    operatingTemp: '5°C a 40°C (Humedad 10% a 85% sin condensación)',
    rating: 4.9,
    reviewCount: 31,
    reviews: [
      {
        id: 'rev-nas-1',
        author: 'Ing. Mauricio Gaitán',
        role: 'Gerente de Continuidad Operativa',
        company: 'Aseguradora Nacional S.A.',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Lo implementamos como repositorio primario para Veeam con copias inmutables. Alcanza velocidades sostenidas de transferencia superiores a 6.8 GB/s por fibra.',
        verifiedDeployment: 'Compra verificada: 3 cabinas para replicación multi-sitio'
      }
    ],
    boxContents: [
      'Cabina SAN/NAS NEXUS FlashArray 12-Bay 2U con 96TB Enterprise preinstalados',
      '2x Módulos de caché NVMe M.2 de 1.6TB para aceleración de lectura/escritura',
      'Kit de rieles deslizantes de montaje en rack de 19 pulgadas',
      '2x Cables DAC SFP28 de 25GbE (3 metros) + 2x Cables de alimentación C13/C14',
      'Licencia perpetua de replicación remota, Snapshots inmutables y soporte iSCSI/Fibre Channel'
    ],
    basePriceUSD: 4680,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 4680, label: '1 unidad', discountPercent: 0 },
      { minQty: 2, pricePerUnit: 4350, label: '2 a 4 cabinas (Cluster HA)', discountPercent: 7 },
      { minQty: 5, pricePerUnit: 3980, label: '5+ unidades Data Center', discountPercent: 15 }
    ],
    inStock: true,
    stockCount: 14,
    leadTimeDays: 2,
    image: '/src/assets/images/product_nas_storage_1790785291720.jpg',
    specs: [
      { label: 'Capacidad Incluida', value: '96TB Brutos (12x 8TB Enterprise SAS4/NVMe Mix) + 3.2TB Caché lectura/escritura NVMe' },
      { label: 'Procesador de Almacenamiento', value: 'Intel Xeon D-2796NT 20-Core @ 3.1GHz con motor de cifrado AES-NI por hardware' },
      { label: 'Memoria del Sistema', value: '128GB DDR4 ECC Registered (Expandible a 512GB)' },
      { label: 'Puertos de Red de Datos', value: '2x 100GbE QSFP28 + 4x 25GbE SFP28 + 2x 10GbE RJ45 Base-T' },
      { label: 'Protocolos Soportados', value: 'iSCSI, NVMe-oF (RDMA RoCEv2), Fibre Channel Ready, SMB 3.1.1, NFS v3/v4.1, S3 Object Storage' },
      { label: 'Rendimiento IOPS', value: 'Hasta 920,000 IOPS en lectura aleatoria 4K / 12.4 GB/s de ancho de banda secuencial' },
      { label: 'Protección de Datos', value: 'RAID Z1/Z2/Z3, RAID 10/50/60, Snapshots inmutables cada 5 minutos y auto-reparación de bloques' }
    ],
    certifications: ['VMware Ready Storage', 'Citrix Ready', 'Veeam Ready Repository', 'CE', 'FCC Class A', 'UL'],
    warranty: 'Garantía Empresarial On-Site 5 Años con envío anticipado de discos de reemplazo',
    featured: true
  },
  {
    id: 'prod-workstation-apex',
    name: 'Estación de Trabajo Ejecutiva Apex Studio Ultra Dual-5K',
    sku: 'NX-WRK-STU-88',
    category: 'perifericos',
    categoryLabel: 'Estaciones de Trabajo & Pantallas',
    brand: 'Apex Architectural',
    shortDesc: 'Solución integral de puesto ejecutivo y técnico con doble pantalla 5K calibrada de fábrica, base motorizada antifatiga y hub Thunderbolt 4 de 140W.',
    fullDesc: 'El conjunto definitivo para dirección de ingeniería, arquitectura de software, diseño CAD y trading financiero en tiempo real. Integra estructura de acero al carbono templado con elevación silenciosa electromecánica, sistema de gestión oculta de cableado estructurado, dos paneles Nano-IPS de 32" resolución 5K (99% DCI-P3, Delta E < 1.2) y base de carga inductiva Qi2 dual de 30W.',
    highlights: [
      'Doble monitor de 32 pulgadas 5K (5120×2880) en brazo neumático de aluminio aeroespacial',
      'Docking Station Thunderbolt 4 integrado en el chasis con entrega de energía de 140W por un solo cable',
      'Doble motor brushless ultra silencioso (<38 dB) con sensor giroscópico anticolisión',
      'Bandeja técnica inferior con PDU de 8 tomas protegidas contra sobretensiones transitorias'
    ],
    idealFor: 'Puestos de Dirección Ejecutiva, Desarrollo de Software, Ingeniería CAD/BIM, Finanzas y Centros de Monitoreo.',
    dimensions: '1800 mm (Largo) × 850 mm (Profundidad) × 620–1280 mm (Altura regulable) · Peso: 64.0 kg',
    powerSpec: 'Entrada única 110–240V AC con supresor de picos de 3200 Joules · Consumo máx: 340W',
    operatingSystemOrFirmware: 'Plug & Play con macOS, Windows 11 Pro y distribuciones Linux vía Thunderbolt 4 / USB4',
    originCountry: 'Diseño industrial alemán · Fabricación certificada en Múnich / Monterrey',
    mtbfHours: '120,000 horas de retroiluminación LED / 50,000 ciclos de elevación',
    operatingTemp: '10°C a 35°C',
    rating: 4.9,
    reviewCount: 62,
    reviews: [
      {
        id: 'rev-wrk-1',
        author: 'Arq. Fernando Montoya',
        role: 'Socio Director de Diseño',
        company: 'Montoya & Asociados BIM Studio',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Adquirimos 15 estaciones para nuestro equipo de modelado BIM y Presidencia. La fidelidad de color de los paneles 5K y el orden absoluto del cableado transformaron nuestra oficina.',
        verifiedDeployment: 'Compra verificada: 15 estaciones'
      }
    ],
    boxContents: [
      '2x Monitores Profesionales 32" 5K Nano-IPS con reporte de calibración individual',
      'Brazo articulado doble de aluminio anodizado con canales internos de cableado',
      'Superficie ejecutiva en nogal americano macizo con módulo Qi2 integrado',
      'Estructura motorizada de doble columna y panel táctil OLED de memoria de altura',
      'Hub Thunderbolt 4 integrado + 2x Cables Thunderbolt 4 trenzados de 1.5m'
    ],
    basePriceUSD: 3420,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 3420, label: '1 a 4 unidades', discountPercent: 0 },
      { minQty: 5, pricePerUnit: 3180, label: '5 a 14 unidades', discountPercent: 7 },
      { minQty: 15, pricePerUnit: 2890, label: '15+ puestos corporativos', discountPercent: 15 }
    ],
    inStock: true,
    stockCount: 34,
    leadTimeDays: 3,
    image: '/src/assets/images/product_executive_workspace_1790189507082.jpg',
    specs: [
      { label: 'Monitores Incluidos', value: '2x 32" Nano-IPS 5K (5120x2880) 600 nits HDR10, Contraste 2000:1 IPS Black' },
      { label: 'Precisión de Color', value: '99% DCI-P3, 100% sRGB, Calibración de fábrica individual Delta E < 1.2' },
      { label: 'Conectividad Central', value: 'Hub Thunderbolt 4 (40Gbps) con 3x TB4, 4x USB-A 10Gbps, RJ45 2.5GbE y lector SD UHS-II' },
      { label: 'Entrega de Potencia', value: 'USB-C Power Delivery 3.1 de 140W para carga directa de portátiles y workstations' },
      { label: 'Estructura Escritorio', value: 'Tablero de nogal macizo de 32mm tratado al aceite y chasis de aluminio anodizado' },
      { label: 'Mecanismo Altura', value: 'Doble motor sincrónico de 160kg de capacidad con 4 memorias programables' },
      { label: 'Alimentación Interna', value: 'Distribuidor interno de energía PDU con filtro supresor de ruido EMI/RFI' }
    ],
    certifications: ['BIFMA X5.5', 'CE', 'TÜV Rheinland Low Blue Light', 'Energy Star', 'FSC Certified Wood'],
    warranty: 'Garantía Integral de Pantallas, Electrónica y Motorización por 5 Años On-Site',
    featured: true
  },
  {
    id: 'prod-monitor-proview-49',
    name: 'Monitor Curvo Ultrawide 49" 5K2K KVM Thunderbolt 4 ProView',
    sku: 'NX-MON-UW49-5K',
    category: 'perifericos',
    categoryLabel: 'Estaciones de Trabajo & Pantallas',
    brand: 'Apex Architectural',
    shortDesc: 'Monitor profesional super-ultrawide de 49 pulgadas (5120×1440) IPS Black a 120Hz con switch KVM por hardware, RJ45 2.5GbE y webcam 4K retráctil.',
    fullDesc: 'Equivalente a dos pantallas QHD de 27 pulgadas sin marcos intermedios. Diseñado para analistas financieros, centros de operaciones de red (NOC), programadores e ingenieros de datos. Incorpora conmutador KVM inteligente para controlar dos computadores con un mismo teclado y ratón en modo Picture-by-Picture (PbP), más cámara Windows Hello 4K oculta.',
    highlights: [
      'Panel curvo 32:9 de 49" con tecnología IPS Black (contraste 2000:1) y tasa de refresco fluida de 120Hz',
      'Conmutador Smart KVM integrado y función Picture-by-Picture para visualizar 2 fuentes simultáneamente',
      'Docking station incorporado con puerto RJ45 2.5 Gigabit Ethernet y carga USB-C de 96W',
      'Cámara web 4K Sony STARVIS retráctil tipo pop-up con micrófonos con cancelación de ruido e infrarrojos'
    ],
    idealFor: 'Banca de Inversión y Trading, Centros de Control (NOC/SOC), Ingeniería de Software y Multitarea Ejecutiva.',
    dimensions: '1215 × 370–520 × 260 mm (con base ergonómica) · Peso neto: 15.2 kg',
    powerSpec: 'Fuente interna 100–240V AC 50/60Hz · Consumo típico: 68W (Modo Eco: 45W)',
    operatingSystemOrFirmware: 'Compatible con Windows, macOS y Linux · Soporte de gestión remota DDC/CI para TI',
    originCountry: 'Fabricación de panel en Seúl (Corea del Sur)',
    mtbfHours: '100,000 horas MTBF (Garantía Cero Píxeles Brillantes)',
    operatingTemp: '0°C a 40°C',
    rating: 4.8,
    reviewCount: 39,
    reviews: [
      {
        id: 'rev-mon-1',
        author: 'Lic. Esteban Morales',
        role: 'Head of Quantitative Trading',
        company: 'Valora Capital Markets',
        rating: 5,
        date: 'Agosto 2026',
        comment: 'Reemplazamos configuraciones de 3 monitores por un solo ProView de 49" en toda nuestra mesa de dinero. Menos cables, cero biseles en medio y el KVM funciona al instante.',
        verifiedDeployment: 'Compra verificada: 24 monitores'
      }
    ],
    boxContents: [
      'Monitor Curvo 49" 5K2K Apex ProView con cámara 4K retráctil integrada',
      'Base ergonómica de aluminio fundido (ajuste de altura 150mm, giro e inclinación)',
      'Cable Thunderbolt 4 / USB-C de 1.8m + Cable DisplayPort 1.4 + Cable HDMI 2.1',
      'Certificado de calibración de color individual de fábrica (sRGB / DCI-P3)'
    ],
    basePriceUSD: 1490,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 1490, label: '1 a 4 monitores', discountPercent: 0 },
      { minQty: 5, pricePerUnit: 1360, label: '5 a 14 monitores', discountPercent: 9 },
      { minQty: 15, pricePerUnit: 1220, label: '15+ despliegue corporativo', discountPercent: 18 }
    ],
    inStock: true,
    stockCount: 52,
    leadTimeDays: 1,
    image: '/src/assets/images/product_executive_workspace_1790189507082.jpg',
    specs: [
      { label: 'Tamaño y Resolución', value: '49.0" Curvo (3800R) Dual-QHD 5120 × 1440 (Relación 32:9, 109 PPI)' },
      { label: 'Tecnología de Panel', value: 'IPS Black a 120Hz, Contraste estático 2000:1, Brillo 450 nits HDR400' },
      { label: 'Puertos de Video y Datos', value: '2x Thunderbolt 4 (96W PD), 2x HDMI 2.1, 1x DisplayPort 1.4, 4x USB-A 3.2, 1x USB-C 15W' },
      { label: 'Red Cableada', value: 'Puerto RJ-45 2.5GbE integrado con soporte PXE Boot, Wake-on-LAN y MAC Address Pass-Through' },
      { label: 'Cámara y Audio', value: 'Webcam 4K HDR retráctil con Windows Hello IR + Altavoces estéreo 2x 10W integrados' },
      { label: 'Montaje VESA', value: 'Compatible VESA 100 × 100 mm con liberación rápida sin tornillos' }
    ],
    certifications: ['TÜV Eye Comfort 5-Star', 'Energy Star 8.0', 'EPEAT Gold', 'TCO Certified Edge'],
    warranty: 'Garantía de Reemplazo Avanzado por 3 Años con cobertura Cero Píxeles Defectuosos',
    featured: false
  },
  {
    id: 'prod-conf-omnipresence',
    name: 'Sistema de Videoconferencia 4K AI OmniPresence V3',
    sku: 'NX-AV-CONF-4K3',
    category: 'audiovisual',
    categoryLabel: 'Audiovisual & Salas de Juntas',
    brand: 'OmniPresence Tech',
    shortDesc: 'Barra de video inteligente con doble cámara 4K óptica, encuadre de participantes por IA y matriz acústica de 12 micrófonos Beamforming.',
    fullDesc: 'Equipamiento de nivel corporativo para salas de consejo, aulas híbridas y salas de juntas medianas y grandes (hasta 24 participantes). Integra óptica teleobjetivo y gran angular coordinadas por procesador neuronal dedicado para conmutación cinemática automática de orador, cancelación de ruido por aprendizaje profundo (filtra tecleo y aire acondicionado) y consola táctil de 10.1" PoE.',
    highlights: [
      'Sistema de cámara dual 4K60fps: lente panorámico de 120° + lente PTZ teleobjetivo con zoom híbrido 15x',
      'Encuadre inteligente Multi-Stream que muestra individualmente a los asistentes en la sala y la vista general',
      'Matriz de 12 micrófonos MEMS con captación nítida a 8.5 metros y supresión de eco full-duplex',
      'Despliegue nativo sin PC (Appliance Mode) para Microsoft Teams Rooms y Zoom Rooms'
    ],
    idealFor: 'Salas de Consejo Directivo, Salas de Juntas de 8 a 24 personas, Auditorios Corporativos y Aulas Ejecutivas.',
    dimensions: 'Barra: 780 × 115 × 120 mm (4.8 kg) · Consola táctil: 245 × 164 × 82 mm (1.1 kg)',
    powerSpec: 'Barra: 100–240V AC (65W máx.) · Consola de mesa: Alimentación vía PoE (802.3af)',
    operatingSystemOrFirmware: 'CollabOS Enterprise endurecido con actualizaciones OTA firmadas criptográficamente',
    originCountry: 'Ingeniería electroacústica en Oslo (Noruega) · Ensamblaje en Taiwán',
    mtbfHours: '180,000 horas MTBF',
    operatingTemp: '0°C a 40°C',
    rating: 4.9,
    reviewCount: 53,
    reviews: [
      {
        id: 'rev-av-1',
        author: 'Ing. Patricia Solís',
        role: 'Líder de Comunicaciones Unificadas',
        company: 'Consorcio Energético del Pacífico',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Instalamos 9 sistemas en nuestras sedes regionales. El seguimiento de orador con doble lente hace que las reuniones de junta directiva se sientan presenciales.',
        verifiedDeployment: 'Compra verificada: 9 salas completas'
      }
    ],
    boxContents: [
      'Barra de videoconferencia integrada OmniPresence V3 4K Dual-Lens',
      'Consola táctil de control de sala de 10.1" antirreflejos con sensor de presencia PIR',
      'Soporte de montaje mural articulado y adaptador VESA para doble televisor',
      '2x Micrófonos de expansión de sobremesa con botón físico de mute y cableado PoE Cat6a (10m)',
      'Fuente de alimentación industrial e inyector PoE Gigabit'
    ],
    basePriceUSD: 2890,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 2890, label: '1 a 2 salas', discountPercent: 0 },
      { minQty: 3, pricePerUnit: 2650, label: '3 a 7 salas', discountPercent: 8 },
      { minQty: 8, pricePerUnit: 2380, label: '8+ despliegues globales', discountPercent: 17 }
    ],
    inStock: true,
    stockCount: 22,
    leadTimeDays: 1,
    image: '/src/assets/images/product_conference_system_1790189517832.jpg',
    specs: [
      { label: 'Cámara Panorámica', value: 'Sensor 4K Ultra-HD 20MP con lente de cristal Zeiss campo visual 120° sin distorsión' },
      { label: 'Cámara Teleobjetivo', value: 'Zoom óptico 5x + digital 3x (15x total) asistido por sensor de 48MP y cardán silencioso' },
      { label: 'Matriz Micrófonos', value: '12 micrófonos MEMS omnidireccionales (alcance 8.5m + 2 micrófonos de expansión incluidos)' },
      { label: 'Sistema de Altavoces', value: 'Doble woofer de 70mm + doble tweeter con suspensión antirresonancia (92 dB SPL)' },
      { label: 'Salidas y Entradas Video', value: '2x Salidas HDMI 2.1 4K60 (Doble pantalla) + 1x Entrada HDMI Ingesta 4K + USB-C DisplayPort' },
      { label: 'Controlador de Mesa', value: 'Pantalla táctil IPS 10.1" PoE con certificación nativa Teams / Zoom / Webex / Google Meet' },
      { label: 'Seguridad y Privacidad', value: 'Obturador electromecánico motorizado automático + Cifrado AES-256 bit por hardware' }
    ],
    certifications: ['Zoom Rooms Certified', 'Microsoft Teams Certified', 'Cisco Webex Compatible', 'CE', 'FCC'],
    warranty: 'Reemplazo Anticipado Avanzado al Siguiente Día Laboral (NBD) por 3 Años',
    featured: true
  },
  {
    id: 'prod-board-proboard-86',
    name: 'Pantalla Interactiva Táctil Corporativa 86" 4K ProBoard Max + OPS PC',
    sku: 'NX-AV-BRD-86K',
    category: 'audiovisual',
    categoryLabel: 'Audiovisual & Salas de Juntas',
    brand: 'OmniPresence Tech',
    shortDesc: 'Pizarra colaborativa 4K UHD de 86 pulgadas con cristal antirreflejo Zero-Bonding, módulo PC Intel Core i7 OPS integrado y soporte móvil motorizado.',
    fullDesc: 'Diseñada para salas de planeación estratégica, centros de ingeniería ágil y salas de capacitación corporativa. Ofrece escritura ultra precisa con latencia inferior a 1.5 ms, reconocimiento simultáneo de 40 puntos táctiles, proyección inalámbrica AirPlay/Miracast/Chromecast para hasta 9 dispositivos en pantalla dividida y módulo computador OPS Windows 11 Pro acoplado.',
    highlights: [
      'Panel comercial de 86" 4K UHD diseñado para operación continua 24/7 con cristal templado Mohs 7 antirreflejo',
      'Incluye módulo computador OPS acoplado (Intel Core i7, 32GB RAM, 1TB SSD, Windows 11 Pro) sin cables externos',
      'Incluye soporte rodante de aluminio anodizado con ajuste eléctrico de altura para fácil traslado entre salas',
      'Transmisión inalámbrica bidireccional (Touchback) desde portátiles Windows y Mac con dongle USB-C incluido'
    ],
    idealFor: 'Salas de Estrategia, War Rooms de Ingeniería, Centros de Capacitación, Universidades Corporativas y Showrooms.',
    dimensions: '1957 × 1160 × 86 mm (Pantalla) · Peso con soporte móvil industrial: 92.0 kg',
    powerSpec: '100–240V AC 50/60Hz · Consumo nominal: 285W',
    operatingSystemOrFirmware: 'Sistema Dual: Android 13 Enterprise Embebido + Módulo PC OPS Windows 11 Pro integrado',
    originCountry: 'Ensamblaje en planta certificada ISO 9001',
    mtbfHours: '100,000 horas de vida útil del panel comercial 24/7',
    operatingTemp: '0°C a 40°C',
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      {
        id: 'rev-brd-1',
        author: 'Ing. Daniel Ospina',
        role: 'Director de Transformación Digital',
        company: 'Constructora Continental',
        rating: 5,
        date: 'Agosto 2026',
        comment: 'Revisamos planos de AutoCAD y Revit directamente sobre la pantalla de 86 pulgadas en las reuniones de obra. La precisión de los lápices magnéticos es inmediata.',
        verifiedDeployment: 'Compra verificada: 4 pantallas con soporte móvil'
      }
    ],
    boxContents: [
      'Pantalla Interactiva 86" 4K UHD OmniPresence ProBoard Max',
      'Módulo PC OPS Intel Core i7 / 32GB RAM / 1TB NVMe preinstalado en ranura lateral',
      'Soporte móvil de piso en aluminio anodizado con ruedas de bloqueo industrial y bandeja',
      '2x Lápices ópticos activos de doble punta magnéticos + 2x Dongles USB-C de transmisión inalámbrica 4K'
    ],
    basePriceUSD: 4290,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 4290, label: '1 a 2 unidades', discountPercent: 0 },
      { minQty: 3, pricePerUnit: 3950, label: '3 a 5 unidades', discountPercent: 8 },
      { minQty: 6, pricePerUnit: 3590, label: '6+ campus corporativo', discountPercent: 16 }
    ],
    inStock: true,
    stockCount: 15,
    leadTimeDays: 3,
    image: '/src/assets/images/product_interactive_display_1790785300845.jpg',
    specs: [
      { label: 'Panel y Superficie', value: '86" D-LED 4K UHD (3840×2160) @ 60Hz, 450 nits, Cristal Zero-Parallax de 4mm Mohs 7' },
      { label: 'Tecnología Táctil', value: 'Infrarrojos de alta precisión + EMR activo, 40 puntos táctiles, tiempo de respuesta 1.5 ms' },
      { label: 'Módulo PC OPS Incluido', value: 'Intel Core i7-13700E, 32GB DDR5, 1TB NVMe SSD, Wi-Fi 6E, Windows 11 Pro IoT Enterprise' },
      { label: 'Audio Integrado', value: 'Barra de sonido frontal 2.1 (2x 20W + Subwoofer 20W) + 8 micrófonos de arreglo lineal' },
      { label: 'Conectividad Frontal/Lateral', value: '3x USB-C (100W PD + Touch + Video), 4x HDMI 2.0 In, 1x HDMI Out, 1x DisplayPort, Dual RJ45' },
      { label: 'Colaboración Inalámbrica', value: 'Hasta 9 pantallas simultáneas vía AirPlay, Miracast, Chromecast o Dongle USB-C sin instalar software' }
    ],
    certifications: ['CE', 'FCC Class B', 'RoHS', 'Energy Star 8.0', 'ISO 9001'],
    warranty: 'Garantía On-Site de 3 Años con instalación y puesta en marcha incluida',
    featured: false
  },
  {
    id: 'prod-laptop-quantum-x14',
    name: 'Ultrabook Corporativo Quantum Carbon X14 Gen 4',
    sku: 'NX-PC-QNTM-14G4',
    category: 'computo',
    categoryLabel: 'Cómputo & Data Center',
    brand: 'Quantum Hardware',
    shortDesc: 'Portátil empresarial ultraligero de 980g en fibra de carbono y aleación de magnesio con procesador Intel Core Ultra 7 vPro, NPU de IA y módem 5G.',
    fullDesc: 'La estación móvil predilecta para cuadros directivos, consultores senior, auditores y equipos de ingeniería en campo. Construida bajo estándares de resistencia militar MIL-STD-810H, incorpora lector biométrico de huella Match-on-Chip FIPS 140-3, cámara IR con detección de presencia, pantalla OLED antideslumbrante 2.8K a 120Hz y batería de silicio-carbono para hasta 18 horas de autonomía.',
    highlights: [
      'Chasis monocasco de fibra de carbono aeroespacial trenzada de solo 980 gramos y 14.9 mm de grosor',
      'Plataforma Intel vPro Enterprise con gestión remota de flota fuera de banda y chip dTPM 2.0',
      'Conectividad total en movilidad: Wi-Fi 7 Tri-Banda + Módem 5G Sub-6GHz con eSIM corporativa y Nano-SIM',
      'Teclado retroiluminado resistente a derrames de líquidos (hasta 350 ml) con teclas de acceso rápido a conferencias'
    ],
    idealFor: 'Ejecutivos en Movilidad, Consultoría Corporativa, Equipos Comerciales, Desarrolladores y Despliegue de Flotas TI.',
    dimensions: '312.4 × 221.2 × 14.9 mm · Peso ultraligero: 0.98 kg (2.16 lbs)',
    powerSpec: 'Batería de polímero de litio de 64Wh · Cargador compacto GaN USB-C de 65W (0 a 80% en 38 min)',
    operatingSystemOrFirmware: 'Windows 11 Pro 64-bit Corporativo preinstalado (Imagen limpia sin bloatware, soporte Autopilot)',
    originCountry: 'Ingeniería en Tokio / Ensamblaje en planta certificada ISO 14001',
    mtbfHours: '150,000 horas MTBF (Certificación Militar MIL-STD-810H)',
    operatingTemp: '5°C a 38°C (Almacenamiento -20°C a 60°C)',
    rating: 4.9,
    reviewCount: 84,
    reviews: [
      {
        id: 'rev-lap-1',
        author: 'Ing. Laura Méndez',
        role: 'Gerente de Soporte & End-User Computing',
        company: 'Consultores Globales Latam',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Estandarizamos nuestra flota de socios y gerentes con 45 unidades Quantum X14. Vinieron pre-registradas en nuestro tenant de Microsoft Intune listas para usar desde el primer encendido.',
        verifiedDeployment: 'Compra verificada: 45 unidades (Flota Corporativa)'
      }
    ],
    boxContents: [
      'Ultrabook Corporativo Quantum Carbon X14 Gen 4',
      'Adaptador de corriente ultracompacto GaN de 65W USB-C con cable trenzado de 2m',
      'Adaptador corporativo USB-C a RJ45 Gigabit Ethernet + VGA/HDMI para proyectores legados',
      'Funda ejecutiva magnética con recubrimiento repelente al agua',
      'Certificado de aprovisionamiento Zero-Touch para Microsoft Intune / Autopilot'
    ],
    basePriceUSD: 2199,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 2199, label: '1 a 4 unidades', discountPercent: 0 },
      { minQty: 5, pricePerUnit: 1999, label: '5 a 19 unidades', discountPercent: 9 },
      { minQty: 20, pricePerUnit: 1790, label: '20+ flota corporativa', discountPercent: 18 }
    ],
    inStock: true,
    stockCount: 65,
    leadTimeDays: 1,
    image: '/src/assets/images/product_enterprise_laptop_1790189532932.jpg',
    specs: [
      { label: 'Procesador', value: 'Intel Core Ultra 7 165H vPro Enterprise (16 núcleos / 22 hilos @ 5.0GHz + NPU IA dedicada)' },
      { label: 'Memoria RAM', value: '32GB LPDDR5X-7467MHz Dual-Channel de ultra-baja latencia' },
      { label: 'Almacenamiento', value: '1TB SSD M.2 2280 PCIe Gen4 x4 NVMe Opal 2.0 con auto-encriptación por hardware (SED)' },
      { label: 'Pantalla', value: '14.0" 2.8K (2880x1800) OLED Antirreflejo 120Hz, 500 nits, 100% DCI-P3, Eyesafe Certified' },
      { label: 'Puertos Físicos', value: '2x Thunderbolt 4 (USB4 40Gbps), 2x USB-A 3.2 Gen1, 1x HDMI 2.1, 1x Ranura Nano-SIM, Audio 3.5mm' },
      { label: 'Conectividad Inalámbrica', value: 'Intel Wi-Fi 7 BE200 (802.11be) + Bluetooth 5.4 + Módem 5G WWAN (eSIM + Nano-SIM)' },
      { label: 'Seguridad Biométrica', value: 'Cámara FHD + IR Windows Hello con obturador físico + Lector de huella en botón de encendido + Lector SmartCard' }
    ],
    certifications: ['MIL-STD-810H (12 pruebas militares)', 'Intel vPro Enterprise', 'EPEAT Gold', 'Energy Star 8.0', 'TCO Certified Gen 9'],
    warranty: 'Garantía Premier Support Global On-Site 3 Años con cobertura contra daños accidentales y batería sellada',
    featured: true
  },
  {
    id: 'prod-cam-sentinel-ptz',
    name: 'Cámara PTZ Perimetral IA Sentinel 4K Industrial',
    sku: 'NX-SEC-SNT-4K',
    category: 'seguridad',
    categoryLabel: 'Seguridad Electrónica & IoT',
    brand: 'Sentinel Defense',
    shortDesc: 'Cámara motorizada domo para plantas industriales, puertos y sedes corporativas con zoom óptico 40x, sensor Sony Starlight e iluminación láser IR de 300m.',
    fullDesc: 'Cámara de videovigilancia crítica de máxima especificación perimetral. Incorpora analítica de video en el borde (Edge AI) con clasificación de vehículos, lectura de placas (LPR/ANPR) y detección de intrusión humana, seguimiento automático inteligente (Auto-Tracking 3.0), limpiaparabrisas motorizado con sensor de lluvia, carcasa de aluminio fundido antivandálica IK10 y protección climática IP67.',
    highlights: [
      'Lente teleobjetivo estabilizado ópticamente (OIS) con Zoom Óptico real de 40x y visión nocturna láser a 300 metros',
      'Procesador NPU integrado para analítica perimetral sin depender de servidores externos (cruces de línea, merodeo, EPP)',
      'Operación garantizada en climas extremos desde -40°C hasta +65°C con calefactor y desempañador automáticos',
      'Cumplimiento estricto NDAA y flujo de video encriptado TLS 1.3 / SRTP compatible con Milestone, Genetec y ONVIF'
    ],
    idealFor: 'Plantas Industriales, Parques Logísticos, Subestaciones Eléctricas, Campus Universitarios y Perímetros Corporativos.',
    dimensions: 'Ø 267 mm (Diámetro) × 410 mm (Altura domo) · Peso con soporte mural: 7.8 kg',
    powerSpec: 'Hi-PoE 802.3bt (60W) o 24V AC ±25% · Consumo: 22W nominal / 48W con IR láser y calefactor activos',
    operatingSystemOrFirmware: 'SentinelOS Linux Embebido con firma segura, soporte SNMP v3 y perfiles ONVIF S, G, T y M',
    originCountry: 'Fabricación certificada NDAA en Corea del Sur',
    mtbfHours: '200,000 horas MTBF (Motores paso a paso sin escobillas)',
    operatingTemp: '-40°C a +65°C (Certificación climática extrema IP67 / NEMA 4X)',
    rating: 4.9,
    reviewCount: 41,
    reviews: [
      {
        id: 'rev-sec-1',
        author: 'Cap. Andrés Villamizar',
        role: 'Director de Seguridad Física y Patrimonial',
        company: 'Terminal Portuaria del Caribe',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Resistieron ambiente salino y tormentas costeras sin la menor corrosión. El zoom óptico 40x permite leer números de contenedores y placas a más de 250 metros de noche.',
        verifiedDeployment: 'Compra verificada: 18 domos PTZ'
      }
    ],
    boxContents: [
      'Domo PTZ Industrial Sentinel 4K 40x con limpiaparabrisas integrado',
      'Brazo de montaje en pared de aluminio fundido con caja de conexiones estanca IP67',
      'Inyector industrial Hi-PoE 802.3bt de 60W con protección contra descargas atmosféricas (6kV)',
      'Kit de prensaestopas impermeables para cableado de red y fibra',
      'Licencia perpetua integrada para analítica perimetral IA y lectura LPR'
    ],
    basePriceUSD: 1780,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 1780, label: '1 a 3 unidades', discountPercent: 0 },
      { minQty: 4, pricePerUnit: 1590, label: '4 a 11 unidades', discountPercent: 10 },
      { minQty: 12, pricePerUnit: 1390, label: '12+ unidades para campus', discountPercent: 22 }
    ],
    inStock: true,
    stockCount: 42,
    leadTimeDays: 2,
    image: '/src/assets/images/product_security_camera_1790189543252.jpg',
    specs: [
      { label: 'Sensor Óptico', value: 'Sony STARVIS 2 CMOS Progresivo 1/1.8" 8MP (3840×2160) @ 60fps con WDR real de 140dB' },
      { label: 'Lente y Zoom', value: 'Distancia focal 5.6mm a 223mm (Zoom Óptico 40x + Zoom Digital 16x) con estabilización OIS' },
      { label: 'Iluminación Nocturna', value: 'Matriz láser IR adaptativa al ángulo de zoom con alcance efectivo de 300 metros (0.0005 Lux)' },
      { label: 'Movimiento PTZ', value: 'Giro horizontal 360° continuo (0.1° a 300°/s), inclinación -20° a +90° con 300 presets' },
      { label: 'Analítica IA en el Borde', value: 'Clasificación humano/vehículo, lectura de matrículas (ANPR), detección de casco/chaleco y auto-tracking' },
      { label: 'Almacenamiento Local', value: 'Doble ranura MicroSDXC Industrial hasta 1TB (2x 512GB) con grabación redundante ante corte de red' },
      { label: 'Protección Ambiental', value: 'IP67 (inmersión/polvo), IK10 (impacto vandálico 20 Joules) y NEMA 4X anticorrosión salina' }
    ],
    certifications: ['ONVIF Perfil S/G/T/M', 'NDAA Section 889 Compliant', 'IP67', 'IK10 Antivandálica', 'NEMA 4X', 'UL'],
    warranty: 'Garantía de Fábrica Empresarial por 5 Años con soporte directo de ingeniería de seguridad',
    featured: true
  },
  {
    id: 'prod-biometric-biogate',
    name: 'Terminal Biométrico Facial & Control de Acceso RFID BioGate X5',
    sku: 'NX-SEC-BIO-X5',
    category: 'seguridad',
    categoryLabel: 'Seguridad Electrónica & IoT',
    brand: 'Sentinel Defense',
    shortDesc: 'Controlador de acceso biométrico multimodal (Rostro 3D Anti-Spoofing, Huella, Tarjeta HID/Mifare y QR) con PoE, relé de esclusas y pantalla IPS de 7".',
    fullDesc: 'Diseñado para el control de acceso de alta seguridad en centros de datos, laboratorios, torniquetes de edificios corporativos y plantas industriales. Utiliza doble cámara infrarroja y luz visible con detección de vivacidad 3D (impide suplantación con fotos o videos), lectura de credenciales móviles NFC/BLE, tarjetas cifradas Mifare DESFire EV3 y sensor de huella capacitivo.',
    highlights: [
      'Reconocimiento facial 3D en menos de 0.2 segundos con capacidad para hasta 50,000 rostros registrados',
      'Lector multimodal cuádruple: Rostro 3D + Huella Dactilar + Tarjeta RFID Dual (125kHz / 13.56MHz) + Código QR para visitantes',
      'Interfaz directa para electroimanes, cantoneras, torniquetes, sensores de puerta y alarma contra coacción (Wiegand / OSDP v2)',
      'Videoportero SIP integrado para comunicación directa con recepción o consola de seguridad desde la puerta'
    ],
    idealFor: 'Esclusas de Data Center, Recepción de Edificios Corporativos, Torniquetes de Acceso y Control de Asistencia de Personal.',
    dimensions: '218 × 106 × 24 mm · Chasis de titanio cepillado y cristal Gorilla Glass · Peso: 0.95 kg',
    powerSpec: 'Alimentación PoE+ (802.3at) capaz de alimentar también la cerradura magnética (12V DC 1A Out) · Consumo: 14W',
    operatingSystemOrFirmware: 'BioGate SecureOS con API REST/Webhook para integración con SAP SuccessFactors, Workday y sistemas de RR.HH.',
    originCountry: 'Fabricación en Corea del Sur',
    mtbfHours: '220,000 horas MTBF',
    operatingTemp: '-30°C a +60°C (Clasificación exterior IP66)',
    rating: 4.8,
    reviewCount: 36,
    reviews: [
      {
        id: 'rev-bio-1',
        author: 'Ing. Felipe Castañeda',
        role: 'Jefe de Seguridad Informática y Física',
        company: 'DataCenter Colocation Andina',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Instalado en todas las esclusas biométricas de nuestras salas blancas. El protocolo OSDP v2 encriptado y la validación de doble factor (Rostro + Tarjeta DESFire) cumplen con nuestra auditoría PCI-DSS.',
        verifiedDeployment: 'Compra verificada: 16 terminales BioGate X5'
      }
    ],
    boxContents: [
      'Terminal Biométrico Multimodal Sentinel BioGate X5',
      'Soporte metálico de pared y adaptador para montaje en torniquete',
      'Unidad de relé de seguridad externa (SRU) por RS-485 cifrado para evitar puenteo exterior',
      '10x Tarjetas maestras inteligentes Mifare DESFire EV3 de alta seguridad',
      'Licencia de software de gestión de accesos, visitantes y asistencia para hasta 50 puertas'
    ],
    basePriceUSD: 940,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 940, label: '1 a 3 terminales', discountPercent: 0 },
      { minQty: 4, pricePerUnit: 840, label: '4 a 9 terminales', discountPercent: 11 },
      { minQty: 10, pricePerUnit: 740, label: '10+ edificio completo', discountPercent: 21 }
    ],
    inStock: true,
    stockCount: 58,
    leadTimeDays: 1,
    image: '/src/assets/images/product_biometric_terminal_1790785311677.jpg',
    specs: [
      { label: 'Capacidad de Usuarios', value: '50,000 rostros 3D, 100,000 tarjetas RFID/NFC, 50,000 huellas y 1,000,000 de registros offline' },
      { label: 'Cámara y Pantalla', value: 'Doble lente 2MP WDR (RGB + IR) con algoritmo Anti-Spoofing + Pantalla táctil IPS 7" 600 nits' },
      { label: 'Lectores de Tarjeta', value: 'Dual-Band 13.56MHz (Mifare DESFire EV1/EV2/EV3, NFC) + 125kHz EM/HID Prox + BLE Mobile Credential' },
      { label: 'Interfaces de Control', value: 'OSDP v2 Secure Channel, Wiegand 26/34/66-bit, 2x Relés de cerradura, Entrada Rex, Sensor de puerta, Tamper' },
      { label: 'Red y Audio', value: 'Ethernet Gigabit PoE+, Wi-Fi 6 opcional, Intercomunicador VoIP SIP v2 bidireccional integrado' },
      { label: 'Grado de Protección', value: 'IP66 (resistente a intemperie y polvo) e IK09 (resistente a impactos)' }
    ],
    certifications: ['CE', 'FCC', 'UL 294 Access Control', 'IP66', 'ISO/IEC 30107-3 Biometric Anti-Spoofing'],
    warranty: 'Garantía Empresarial de 3 Años con reemplazo avanzado',
    featured: false
  },
  {
    id: 'prod-switch-catalyst',
    name: 'Switch Gestionable 48 Puertos PoE++ 10GbE Catalyst Pro',
    sku: 'NX-NET-CAT-48P',
    category: 'redes',
    categoryLabel: 'Redes, Conectividad & Fibra',
    brand: 'NEXUS Network Systems',
    shortDesc: 'Switch core/distribución de Capa 3 con 48 puertos Multi-Gigabit PoE++ (hasta 90W por puerto), 4 uplinks QSFP28 de 100G y apilamiento físico.',
    fullDesc: 'El núcleo de conmutación de alto rendimiento para campus corporativos, hospitales y despliegues Wi-Fi 7 de alta densidad. Cuenta con capacidad de conmutación de 1.28 Tbps sin bloqueo (Non-Blocking), soporte completo de enrutamiento dinámico OSPFv3, BGP y VXLAN, fuentes de alimentación y ventiladores redundantes Hot-Swap y presupuesto PoE total de 1440W.',
    highlights: [
      '48 puertos RJ45 Multi-Gigabit (1G/2.5G/5G/10G) con entrega PoE++ 802.3bt de hasta 90W por puerto',
      '4 puertos Uplink de fibra óptica QSFP28 de 100Gbps / 40Gbps para enlace troncal al Data Center',
      'Apilamiento físico dedicado (StackWise) de hasta 8 unidades con ancho de banda de pila de 480 Gbps',
      'Continuidad operativa con Perpetual PoE (mantiene encendidos APs y cámaras incluso durante reinicios de firmware)'
    ],
    idealFor: 'Núcleo de Red Corporativa (Core/Distribution), Alimentación de Puntos Wi-Fi 7, Cámaras PTZ y Telefonía IP Masiva.',
    dimensions: '44.2 mm (Alto 1U) × 442 mm (Ancho 19" Rack) × 420 mm (Profundidad) · Peso: 6.9 kg',
    powerSpec: '2x Fuentes modulares Hot-Swap de 1100W AC · Presupuesto PoE disponible: hasta 1440W continuos',
    operatingSystemOrFirmware: 'NEXUS NX-OS Enterprise L3 (CLI estándar industrial, interfaz Web GUI, NETCONF/YANG y controlador Cloud)',
    originCountry: 'Diseño en San José, CA · Fabricación en planta certificada TAA',
    mtbfHours: '380,000 horas MTBF',
    operatingTemp: '-5°C a +50°C',
    rating: 4.9,
    reviewCount: 44,
    reviews: [
      {
        id: 'rev-sw-1',
        author: 'Ing. Gustavo Herrera',
        role: 'Arquitecto Senior de Redes',
        company: 'Telecomunicaciones del Sur',
        rating: 5,
        date: 'Agosto 2026',
        comment: 'Apilamos 6 switches Catalyst Pro mediante cables de 480Gbps para alimentar 180 APs Wi-Fi 7 y cámaras PoE++. Cero cuellos de botella en los puertos Multi-Gigabit.',
        verifiedDeployment: 'Compra verificada: 6 switches Core/Access'
      }
    ],
    boxContents: [
      'Switch NEXUS Catalyst Pro 48P Multi-Gigabit L3',
      '2x Fuentes de alimentación modulares de 1100W preinstaladas (Redundancia activa)',
      '3x Módulos de ventilación inteligentes Hot-Swap',
      'Cable de apilamiento de alta velocidad (Stacking Cable) de 1 metro + Cable de consola USB-C a RJ45',
      'Kit de montaje en bastidor de 4 postes (19" EIA estándar)'
    ],
    basePriceUSD: 4120,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 4120, label: '1 a 2 switches', discountPercent: 0 },
      { minQty: 3, pricePerUnit: 3790, label: '3 a 7 switches', discountPercent: 8 },
      { minQty: 8, pricePerUnit: 3450, label: '8+ infraestructura troncal', discountPercent: 16 }
    ],
    inStock: true,
    stockCount: 29,
    leadTimeDays: 1,
    image: '/src/assets/images/product_server_infrastructure_1790189492513.jpg',
    specs: [
      { label: 'Puertos de Acceso', value: '48x 100M / 1G / 2.5G / 5G / 10GBASE-T RJ-45 con PoE++ IEEE 802.3bt (hasta 90W/puerto)' },
      { label: 'Puertos Troncal Fibra', value: '4x 100G QSFP28 (retrocompatibles con 40G QSFP+ y 4x25G SFP28 mediante cable breakout)' },
      { label: 'Capacidad de Conmutación', value: '1.28 Tbps Full-Duplex sin bloqueo / Tasa de reenvío de paquetes: 952.38 Mpps' },
      { label: 'Presupuesto PoE Total', value: '1440W constantes con gestión dinámica de prioridad por puerto y Perpetual PoE' },
      { label: 'Protocolos Capa 3', value: 'Enrutamiento IPv4/IPv6 estático, RIPv2, OSPF, OSPFv3, BGP4, VRRP, VRF-Lite, PIM-SM/DM' },
      { label: 'Seguridad de Red', value: 'Autenticación IEEE 802.1X, MACsec-256 en todos los puertos, DHCP Snooping, Dynamic ARP Inspection' },
      { label: 'Memoria y Tablas', value: 'CPU Quad-Core ARM 2.2GHz, 8GB RAM ECC, Tabla MAC de 64,000 direcciones, 32,000 rutas IPv4' }
    ],
    certifications: ['CE', 'FCC Class A', 'UL 62368-1', 'IEEE 802.3bt', 'TAA Compliant', 'IPv6 Ready Logo'],
    warranty: 'Garantía Limitada de por Vida (Lifetime Warranty) con reemplazo avanzado de hardware en 24h',
    featured: false
  },
  {
    id: 'prod-wifi7-access-point',
    name: 'Punto de Acceso Wi-Fi 7 Tri-Band Enterprise Mesh 9.3Gbps',
    sku: 'NX-WLAN-W7-PRO',
    category: 'redes',
    categoryLabel: 'Redes, Conectividad & Fibra',
    brand: 'NEXUS Network Systems',
    shortDesc: 'Punto de acceso corporativo para alta densidad con radios de 2.4GHz, 5GHz y 6GHz concurrentes, operación Multi-Link (MLO) y puerto Uplink 10GbE PoE+.',
    fullDesc: 'Diseñado para soportar hasta 1,024 dispositivos activos concurrentes por unidad en auditorios, plantas de manufactura automatizada, hoteles y oficinas corporativas abiertas. Incorpora tecnología Wi-Fi 7 (802.11be) con canales ultra-anchos de 320MHz, modulación 4096-QAM, un cuarto radio dedicado al escaneo continuo de seguridad RF (WIDS/WIPS) y baliza Bluetooth 5.4 para geolocalización en interiores.',
    highlights: [
      'Velocidad agregada real de 9.3 Gbps en tres bandas simultáneas (6 GHz + 5 GHz + 2.4 GHz) con Multi-Link Operation',
      'Cuarto radio dedicado 24/7 a análisis espectral de interferencias y detección de puntos de acceso intrusos (Rogue AP)',
      'Puerto Ethernet Multi-Gigabit de 10Gbps con entrada PoE+ más puerto secundario de 2.5Gbps para redundancia',
      'Gestión unificada sin costo de licencias recurrentes mediante controlador local o consola en la nube'
    ],
    idealFor: 'Oficinas Corporativas de Alta Densidad, Auditorios, Almacenes con Terminales RF, Hospitales y Campus Educativos.',
    dimensions: '220 × 220 × 46 mm · Peso con soporte metálico: 1.15 kg',
    powerSpec: 'Alimentación vía PoE+ (IEEE 802.3at / 802.3bt) o DC 12V · Consumo máximo a plena carga: 24.5W',
    operatingSystemOrFirmware: 'NEXUS AirOS 7 con Roaming Rápido 802.11k/v/r, Airtime Fairness y segmentación dinámica de VLANs',
    originCountry: 'Diseño RF en Hsinchu / Taiwán',
    mtbfHours: '450,000 horas MTBF',
    operatingTemp: '0°C a 50°C (Certificación UL 2043 Plenum para techos falsos)',
    rating: 4.8,
    reviewCount: 67,
    reviews: [
      {
        id: 'rev-ap-1',
        author: 'Ing. Javier Pardo',
        role: 'Coordinador de Conectividad',
        company: 'Universidad Tecnológica Metropolitana',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'Cubrimos el edificio de posgrados y el auditorio central con 25 unidades. Soporta más de 400 portátiles conectados en simultáneo haciendo videollamadas sin pérdida de paquetes.',
        verifiedDeployment: 'Compra verificada: 25 APs (Campus Pack)'
      }
    ],
    boxContents: [
      'Punto de Acceso Wi-Fi 7 Tri-Banda NEXUS W7-PRO',
      'Placa de montaje universal de acero para techo falso (perfil T de 15/16" y 9/16") y pared sólida',
      'Tornillería de seguridad Torx antirrobo con llave de instalación',
      'Guía de planificación de celdas RF y código QR de adopción instantánea en controlador'
    ],
    basePriceUSD: 890,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 890, label: '1 a 4 APs', discountPercent: 0 },
      { minQty: 5, pricePerUnit: 790, label: '5 a 19 APs', discountPercent: 11 },
      { minQty: 20, pricePerUnit: 699, label: '20+ campus pack', discountPercent: 21 }
    ],
    inStock: true,
    stockCount: 88,
    leadTimeDays: 1,
    image: '/src/assets/images/hero_enterprise_tech_1790189478014.jpg',
    specs: [
      { label: 'Estándar Inalámbrico', value: 'IEEE 802.11be (Wi-Fi 7) Tri-Banda concurrente 2.4GHz (2x2), 5GHz (4x4) y 6GHz (4x4) MU-MIMO' },
      { label: 'Rendimiento por Banda', value: '6GHz: 5764 Mbps + 5GHz: 2882 Mbps + 2.4GHz: 688 Mbps (9.33 Gbps combinados)' },
      { label: 'Tecnologías Wi-Fi 7', value: 'Canales de 320 MHz, 4K-QAM, Multi-Link Operation (MLO), Multi-RU y Preamble Puncturing' },
      { label: 'Interfaces Cableadas', value: '1x Puerto Uplink 10G/5G/2.5G/1G RJ45 PoE+ + 1x Puerto 2.5GbE secundario para puente o redundancia' },
      { label: 'Capacidad de Clientes', value: 'Hasta 1,024 clientes asociados concurrentes y hasta 24 SSIDs independientes con VLAN tagging' },
      { label: 'Seguridad Inalámbrica', value: 'WPA3-Enterprise 192-bit, RADIUS dinámico, Portal Cautivo Corporativo, Firewall L7 DPI integrado' },
      { label: 'Radios Auxiliares IoT', value: 'Radio escáner RF dedicado 24/7 + Bluetooth Low Energy (BLE 5.4) y Zigbee/Matter listos' }
    ],
    certifications: ['Wi-Fi CERTIFIED 7', 'WPA3 Enterprise', 'FCC Parte 15E (6GHz)', 'CE', 'UL 2043 Plenum Rated'],
    warranty: 'Garantía Empresarial de Reemplazo Rápido por 5 Años',
    featured: false
  },
  {
    id: 'prod-ups-powershield',
    name: 'Sistema UPS Modular Online Doble Conversión 15kVA PowerShield',
    sku: 'NX-PWR-UPS-15K',
    category: 'energia',
    categoryLabel: 'Respaldo de Energía & UPS Industrial',
    brand: 'PowerShield Industrial',
    shortDesc: 'SAI/UPS de topología online doble conversión pura con factor de potencia 1.0 (15kW reales), baterías hot-swap y tarjeta de red SNMP Gigabit.',
    fullDesc: 'Protección eléctrica de grado industrial, médico y de centros de datos para cuartos de servidores, equipos de diagnóstico y nodos de telecomunicaciones. Ofrece tiempo de transferencia de 0 milisegundos ante cortes o microcortes, regulación estricta de voltaje y frecuencia (±1%), bypass de mantenimiento manual sin interrupción y software de apagado ordenado automático para hipervisores.',
    highlights: [
      'Factor de potencia unitario (15 kVA = 15 kW reales) con distorsión armónica THDi < 2%',
      'Tiempo de transferencia de 0 ms con onda senoidal pura regenerada continuamente',
      'Módulos de batería intercambiables en caliente (Hot-Swappable) desde el panel frontal sin apagar la carga',
      'Tarjeta de red SNMP v3 / Modbus TCP preinstalada con sensores ambientales de temperatura y humedad'
    ],
    idealFor: 'Racks de Servidores, Cuartos de Telecomunicaciones (MDF/IDF), Equipos Médicos, Laboratorios y Líneas de Control PLC.',
    dimensions: '261 mm (Alto 6U Rack/Torre convertible) × 440 mm (Ancho) × 680 mm (Profundidad) · Peso: 84.5 kg',
    powerSpec: 'Entrada/Salida configurable Trifásica (208V/220V) o Monofásica (220V/230V/240V) · Eficiencia 96.2% Online',
    operatingSystemOrFirmware: 'PowerShield NetGuard con clientes de apagado automático para VMware ESXi, Hyper-V, Proxmox y Linux',
    originCountry: 'Ingeniería de potencia en Milán (Italia)',
    mtbfHours: '300,000 horas MTBF',
    operatingTemp: '0°C a 40°C',
    rating: 4.9,
    reviewCount: 29,
    reviews: [
      {
        id: 'rev-ups-1',
        author: 'Ing. Héctor Domínguez',
        role: 'Jefe de Mantenimiento Electromecánico',
        company: 'Clínica Internacional Santa María',
        rating: 5,
        date: 'Agosto 2026',
        comment: 'Respalda nuestro centro de imágenes diagnósticas y el cuarto principal de servidores. Durante dos conmutaciones de planta eléctrica de emergencia el tiempo de transferencia fue 0ms exactos.',
        verifiedDeployment: 'Compra verificada: 2 unidades en paralelo redundante'
      }
    ],
    boxContents: [
      'Unidad de potencia UPS Online 15kVA/15kW Rack/Torre convertible (6U)',
      'Módulos internos de batería de alta densidad VRLA AGM de larga vida útil (10 años de diseño)',
      'Tarjeta de gestión de red Gigabit SNMPv3 / Web HTTPS / Modbus preinstalada',
      'Sonda ambiental externa de temperatura y humedad relativa para rack (cable 3m)',
      'Kit de rieles reforzados de acero para bastidor de 4 postes + Pedestales para instalación en formato torre'
    ],
    basePriceUSD: 5190,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 5190, label: '1 unidad', discountPercent: 0 },
      { minQty: 2, pricePerUnit: 4890, label: '2 a 4 unidades', discountPercent: 6 },
      { minQty: 5, pricePerUnit: 4490, label: '5+ despliegue de sucursales', discountPercent: 13 }
    ],
    inStock: true,
    stockCount: 12,
    leadTimeDays: 4,
    image: '/src/assets/images/product_power_pdu_ups_1790785322808.jpg',
    specs: [
      { label: 'Capacidad Nominal', value: '15,000 VA / 15,000 Watts reales (Factor de Potencia de Salida = 1.0)' },
      { label: 'Topología Eléctrica', value: 'Doble conversión en línea (Online VFI-SS-111) con IGBT de 3 niveles y tiempo de transferencia 0 ms' },
      { label: 'Autonomía de Batería', value: '18 minutos al 100% de carga (15kW) / 42 minutos al 50% de carga (7.5kW) · Expandible hasta 4 horas' },
      { label: 'Configuración de Fases', value: 'Entrada Trifásica o Monofásica (160V–280V) / Salida configurable 208V / 220V / 230V / 240V ±1%' },
      { label: 'Bypass de Mantenimiento', value: 'Interruptor rotativo mecánico Make-Before-Break integrado + Bypass estático electrónico automático' },
      { label: 'Comunicaciones y Control', value: 'Puerto Gigabit Ethernet SNMPv3/HTTP, RS-232, USB, Modbus RS-485, Puerto EPO (Apagado de Emergencia)' },
      { label: 'Pantalla de Diagnóstico', value: 'Panel LCD táctil a color de 4.3" orientable (giro 90°) con diagramas de flujo eléctrico en vivo' }
    ],
    certifications: ['IEC/EN 62040-1', 'IEC/EN 62040-2 Clase C2', 'IEC/EN 62040-3', 'CE', 'UL 1778', 'ISO 14001'],
    warranty: 'Garantía On-Site de 3 Años incluyendo electrónica y módulos de batería con sustitución preventiva',
    featured: false
  },
  {
    id: 'prod-pdu-smartgrid-32a',
    name: 'PDU Inteligente Switched & Metered 24 Tomas Rack + Módulo ATS',
    sku: 'NX-PWR-PDU-24S',
    category: 'energia',
    categoryLabel: 'Respaldo de Energía & UPS Industrial',
    brand: 'PowerShield Industrial',
    shortDesc: 'Distribuidor de energía inteligente para rack con medición de consumo por toma individual, conmutación remota (Switched) y transferencia automática ATS.',
    fullDesc: 'Permite a los administradores de centros de datos medir el consumo eléctrico con precisión grado facturación (±1%) en cada toma individual, reiniciar remotamente servidores o switches bloqueados mediante encendido/apagado de puerto por red, y mantener alimentados equipos de fuente única gracias a su módulo de transferencia automática (ATS) de doble entrada (Fuente A + Fuente B).',
    highlights: [
      'Control remoto individual por toma (On/Off/Reboot secuenciado) para evitar picos de corriente en arranque de racks',
      'Doble cable de entrada con Transferencia Automática (ATS) en < 8 ms entre línea comercial/UPS A y línea UPS B',
      'Medición de precisión ±1% de kWh, Voltaje, Amperaje y Factor de Potencia por cada una de las 24 tomas',
      'Sistema mecánico de retención de cables (IEC Grip) que evita desconexiones accidentales por vibración en el rack'
    ],
    idealFor: 'Gabinetes de Servidores en Colocation, Nodos de Telecomunicaciones Remotos y Racks de Alta Densidad.',
    dimensions: '88.0 mm (2U) o Montaje Vertical 0U × 440 mm × 220 mm · Peso: 6.4 kg',
    powerSpec: 'Doble entrada 208–240V AC 32A (Capacidad de distribución hasta 7.4 kW monofásico / 11 kW trifásico)',
    operatingSystemOrFirmware: 'Interfaz Web HTTPS, SNMP v1/v2c/v3, RESTful API, Redfish y conexión en cascada de hasta 16 PDUs',
    originCountry: 'Ingeniería en Milán (Italia)',
    mtbfHours: '420,000 horas MTBF (Relés biestables de bajo consumo)',
    operatingTemp: '0°C a 60°C (Certificado para pasillos calientes de Data Center)',
    rating: 4.9,
    reviewCount: 33,
    reviews: [
      {
        id: 'rev-pdu-1',
        author: 'Ing. Óscar Benítez',
        role: 'Data Center Facilities Manager',
        company: 'HostCloud Latam',
        rating: 5,
        date: 'Septiembre 2026',
        comment: 'La función de reinicio remoto por toma individual nos ahorró decenas de visitas técnicas nocturnas a nodos remotos, y el ATS integrado protege nuestros switches de fuente simple.',
        verifiedDeployment: 'Compra verificada: 14 unidades para Racks de Producción'
      }
    ],
    boxContents: [
      'Unidad PDU Inteligente Switched + ATS PowerShield de 24 tomas (18x C13 + 6x C19)',
      'Sonda digital combinada de temperatura y humedad con base magnética para puerta de rack',
      'Herrajes para montaje horizontal (Rack 19") y botones para montaje vertical sin herramientas (0U)',
      'Kit de 24 clips retenedores de seguridad para conectores C13/C19'
    ],
    basePriceUSD: 1180,
    bulkTiers: [
      { minQty: 1, pricePerUnit: 1180, label: '1 a 3 PDUs', discountPercent: 0 },
      { minQty: 4, pricePerUnit: 1050, label: '4 a 9 PDUs', discountPercent: 11 },
      { minQty: 10, pricePerUnit: 930, label: '10+ sala de servidores', discountPercent: 21 }
    ],
    inStock: true,
    stockCount: 38,
    leadTimeDays: 1,
    image: '/src/assets/images/product_power_pdu_ups_1790785322808.jpg',
    specs: [
      { label: 'Tomas de Salida', value: '18x IEC C13 (10A) + 6x IEC C19 (16A) con bloqueo mecánico anti-desconexión y LED por toma' },
      { label: 'Entradas Redundantes ATS', value: '2x Entradas independientes IEC C20 / L6-30P con conmutación automática en < 8 milisegundos' },
      { label: 'Funciones de Control', value: 'Switched & Outlet-Metered: Encendido, apagado, reinicio y retardo secuencial por cada toma' },
      { label: 'Precisión de Telemetría', value: 'Grado facturación ANSI C12.20 (±1%) en kWh, W, VA, V, A y Factor de Potencia' },
      { label: 'Conectividad y Cascada', value: 'Dual Gigabit Ethernet (Red + Daisy-Chain hasta 16 PDUs bajo una sola dirección IP)' },
      { label: 'Temperatura de Trabajo', value: 'Diseñado para operación continua hasta 60°C en pasillo caliente de rack' }
    ],
    certifications: ['UL 62368-1', 'CE', 'FCC Class A', 'ANSI C12.20 Metering Grade', 'RoHS'],
    warranty: 'Garantía Empresarial de 5 Años con reemplazo directo',
    featured: false
  }
];

export const ENTERPRISE_BUNDLES: EnterpriseBundle[] = [
  {
    id: 'bundle-datacenter-ha',
    name: 'Paquete Data Center Alta Disponibilidad & Almacenamiento',
    code: 'KIT-DC-HA2026',
    targetSegment: 'Centros de Datos, Bancos y Nube Privada',
    description: 'Solución llave en mano de cómputo virtualizado, cabina SAN All-Flash de 96TB, conmutación 10GbE/100GbE y respaldo eléctrico online de 15kW.',
    items: [
      { productId: 'prod-server-x900', quantity: 2 },
      { productId: 'prod-nas-flasharray', quantity: 1 },
      { productId: 'prod-switch-catalyst', quantity: 1 },
      { productId: 'prod-ups-powershield', quantity: 1 }
    ],
    extraDiscountPercent: 12,
    slaHighlight: 'Incluye ingeniería de montaje en rack, cableado estructurado y SLA On-Site 4h 24/7'
  },
  {
    id: 'bundle-boardroom-4k',
    name: 'Paquete Sala de Consejo & Colaboración Híbrida 4K',
    code: 'KIT-AV-BOARD4K',
    targetSegment: 'Salas de Junta Directiva y Auditorios Corporativos',
    description: 'Equipamiento integral de sala ejecutiva con barra de videoconferencia IA de doble lente, pizarra interactiva táctil de 86" con PC OPS y conectividad Wi-Fi 7.',
    items: [
      { productId: 'prod-conf-omnipresence', quantity: 1 },
      { productId: 'prod-board-proboard-86', quantity: 1 },
      { productId: 'prod-wifi7-access-point', quantity: 2 }
    ],
    extraDiscountPercent: 10,
    slaHighlight: 'Certificación Microsoft Teams Rooms / Zoom Rooms lista para usar en 1 día'
  },
  {
    id: 'bundle-executive-fleet',
    name: 'Paquete Despliegue Ejecutivo & Ingeniería (5 Puestos Completos)',
    code: 'KIT-WRK-EXEC5',
    targetSegment: 'Gerencia Técnica, Finanzas y Consultoría',
    description: 'Dotación para 5 líderes de área incluyendo Ultrabooks de fibra de carbono con 5G y monitores curvos super-ultrawide de 49" con KVM y cámara 4K.',
    items: [
      { productId: 'prod-laptop-quantum-x14', quantity: 5 },
      { productId: 'prod-monitor-proview-49', quantity: 5 }
    ],
    extraDiscountPercent: 14,
    slaHighlight: 'Aprovisionamiento Zero-Touch Windows Autopilot y seguro contra accidentes 3 años'
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  MXN: { symbol: '$', rate: 18.2, label: 'MXN ($)' },
  COP: { symbol: '$', rate: 4150, label: 'COP ($)' }
};
