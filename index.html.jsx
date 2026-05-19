import { useState, useEffect } from "react";

// ─── BRAND TOKENS (matched to nextvialabs.com) ──────────────────
const T = {
  navy:    "#0A1628",
  navy2:   "#0E1E38",
  navy3:   "#142848",
  navy4:   "#1A3258",
  gold:    "#C8A84B",
  gold2:   "#DFC06A",
  gold3:   "#EDD48A",
  white:   "#FFFFFF",
  off:     "#F0F4FA",
  muted:   "#6B87AA",
  text:    "#B8CCDF",
  border:  "rgba(200,168,75,0.15)",
  borderH: "rgba(200,168,75,0.50)",
  red:     "#B03020",
  orange:  "#C07828",
  blue:    "#2060A0",
  green:   "#186840",
};

const PCOL = { A: T.red, B: T.orange, C: T.blue, D: T.green };
const STORAGE_KEY = "nvl_v4";
const PIN = "1234";

// ─── VERTICAL IMAGES (Unsplash — free to use) ───────────────────
const VIMG = {
  BAR:  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80&fit=crop",
  SAL:  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&fit=crop",
  THAI: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80&fit=crop",
  FOOD: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&q=80&fit=crop",
  TINT: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
};

// ─── LANGUAGE STRINGS ────────────────────────────────────────────
const LANG = {
  es: {
    tag: "Diagnóstico Operacional", ver: "v4.0",
    newSession: "Nueva sesión",
    clientName: "Nombre del cliente", clientPh: "Ej. Juan Pérez",
    bizName: "Nombre del negocio",   bizPh: "Ej. Barbería El Barrio",
    vertical: "Selecciona tu industria",
    date: "Fecha",
    startBtn: "Iniciar diagnóstico →",
    fillAll: "Completa todos los campos.",
    expressTitle: "Diagnóstico Express",
    of7: "de 7", of12: "de 12", weight: "Peso",
    calcExpress: "Ver mi restricción principal",
    constraintLabel: "Lo que frena tu negocio hoy",
    alsoDetected: "También detectamos:",
    fullDiag: "Continuar al diagnóstico completo →",
    back: "← Volver",
    calcDiag: "Calcular diagnóstico",
    restart: "Reiniciar sesión",
    confirmRestart: "¿Reiniciar sesión?", confirmNew: "¿Nueva sesión?",
    scoreTitle: "Puntuación operativa",
    points: "Puntos", maximum: "Máximo", pct: "Nivel",
    blockingTitle: "Restricción principal",
    primaryC: "Lo que frena el negocio",
    toolLabel: "Herramienta recomendada",
    nextStepsTitle: "Próximos pasos",
    step2: "Agendar sesión de implementación con NextVia Labs.",
    step3: "Medir impacto en 30 días con métricas acordadas.",
    download: "Descargar reporte",
    newBtn: "Nueva sesión",
    printNote: "Abre el archivo HTML en tu navegador e imprime como PDF.",
    agendaCrit: "Agenda crítica",
    consultOnly: "Vista consultor",
    internalFocus: "Enfoque interno",
    planRef: "Referencia de Planes",
    savedSession: "Sesión guardada",
    continueBtn: "Continuar", discard: "Descartar",
    consultAccess: "Acceso Consultor",
    enter: "Entrar", cancel: "Cancelar", pinWrong: "PIN incorrecto",
    s1: "Etapa 1: Orden", s2: "Etapa 2: Estabilidad",
    s3: "Etapa 3: Sistema", s4: "Etapa 4: Escala",
    pnA: "Plan A — Caos Operativo", pnB: "Plan B — Inestable",
    pnC: "Plan C — Funcional",     pnD: "Plan D — Estable",
    pfA: "Agenda · Confirmaciones · No-show",
    pfB: "Recurrencia · Paquetes · Reagendado",
    pfC: "Delegación · SOP · Scripts",
    pfD: "Contratación · Calidad",
    scaleOpts: ["Nunca","A veces","Frecuente","Siempre"],
    expressQs: [
      "Existe un sistema o agenda donde se registra todo el trabajo",
      "Las citas o trabajos se confirman con reglas claras",
      "Alguien más puede gestionar mensajes o coordinación",
      "Las operaciones paran si el dueño no está presente",
      "El ingreso mensual es predecible antes de que termine el mes",
      "Los clientes regresan con una frecuencia reconocible",
      "Existen reglas claras para crecer sin perder calidad",
    ],
    operativeScore: "Puntuación operativa",
    question: "Pregunta",
    reportTitle: "Reporte de Diagnóstico Operacional",
    reportSubA: "Restricción principal identificada",
    reportSubB: "Herramienta recomendada",
    reportNext: "Próximos pasos recomendados",
    reportStep2: "Agendar sesión de implementación con NextVia Labs para estructurar el plan de acción de 14 días.",
    reportStep3: "Medir impacto en 30 días usando las métricas acordadas en la sesión.",
    reportServices: "Servicios habilitados",
    reportGenerated: "Generado el",
  },
  en: {
    tag: "Operational Diagnostic", ver: "v4.0",
    newSession: "New session",
    clientName: "Client name", clientPh: "e.g. John Smith",
    bizName: "Business name", bizPh: "e.g. Main Street Barbershop",
    vertical: "Select your industry",
    date: "Date",
    startBtn: "Start diagnostic →",
    fillAll: "Please fill in all fields.",
    expressTitle: "Express Diagnostic",
    of7: "of 7", of12: "of 12", weight: "Weight",
    calcExpress: "Show my primary constraint",
    constraintLabel: "What is holding your business back",
    alsoDetected: "Also detected:",
    fullDiag: "Continue to full diagnostic →",
    back: "← Back",
    calcDiag: "Calculate diagnostic",
    restart: "Restart session",
    confirmRestart: "Restart session?", confirmNew: "New session?",
    scoreTitle: "Operative score",
    points: "Points", maximum: "Maximum", pct: "Level",
    blockingTitle: "Primary constraint",
    primaryC: "What is blocking the business",
    toolLabel: "Recommended tool",
    nextStepsTitle: "Next steps",
    step2: "Schedule an implementation session with NextVia Labs.",
    step3: "Measure impact in 30 days with agreed metrics.",
    download: "Download report",
    newBtn: "New session",
    printNote: "Open the HTML file in your browser and print as PDF.",
    agendaCrit: "Critical scheduling gap",
    consultOnly: "Consultant view",
    internalFocus: "Internal focus",
    planRef: "Plan Reference",
    savedSession: "Saved session found",
    continueBtn: "Continue", discard: "Discard",
    consultAccess: "Consultant Access",
    enter: "Enter", cancel: "Cancel", pinWrong: "Incorrect PIN",
    s1: "Stage 1: Order", s2: "Stage 2: Stability",
    s3: "Stage 3: System", s4: "Stage 4: Scale",
    pnA: "Plan A — Operational Chaos", pnB: "Plan B — Unstable",
    pnC: "Plan C — Functional",        pnD: "Plan D — Stable",
    pfA: "Schedule · Confirmations · No-show policy",
    pfB: "Recurrence · Packages · Rebooking",
    pfC: "Delegation · SOP · Scripts",
    pfD: "Hiring · Quality rules",
    scaleOpts: ["Never","Sometimes","Often","Always"],
    expressQs: [
      "There is a clear system where all work is recorded",
      "Appointments or jobs are confirmed using clear rules",
      "Someone else can manage messages or coordination",
      "Daily operations stop when the owner is absent",
      "Monthly income is predictable before the month ends",
      "Clients return at a recognizable, consistent frequency",
      "There are clear rules for growing without losing quality",
    ],
    operativeScore: "Operative score",
    question: "Question",
    reportTitle: "Operational Diagnostic Report",
    reportSubA: "Primary constraint identified",
    reportSubB: "Recommended tool",
    reportNext: "Recommended next steps",
    reportStep2: "Schedule an implementation session with NextVia Labs to build the 14-day action plan.",
    reportStep3: "Measure impact in 30 days using the metrics agreed in the session.",
    reportServices: "Enabled services",
    reportGenerated: "Generated on",
  }
};

// ─── VERTICALS ───────────────────────────────────────────────────
const V = {
  BAR: {
    es: { name: "Barbería", label: "Barbería" },
    en: { name: "Barbershop", label: "Barbershop" },
    agendaQ: 1,
    qs: {
      es: [
        { t: "Respondes mensajes de clientes el mismo día", w: 2 },
        { t: "Tienes agenda digital activa y actualizada", w: 3 },
        { t: "Confirmas citas el día anterior", w: 2 },
        { t: "Reagendas a cada cliente antes de que se vaya", w: 3 },
        { t: "Tienes política clara para no-shows", w: 2 },
        { t: "Usas recordatorios automáticos antes de cada cita", w: 3 },
        { t: "Tienes clientes recurrentes cada 2–4 semanas", w: 3 },
        { t: "Tu agenda se llena sin depender de promociones", w: 2 },
        { t: "Trabajas más horas de las que quisieras", w: 2 },
        { t: "Alguien más puede manejar la agenda si tú no estás", w: 3 },
        { t: "Tu ingreso mensual es predecible con una semana de anticipación", w: 3 },
        { t: "Tienes reglas claras para contratar o abrir otra silla", w: 4 },
      ],
      en: [
        { t: "You respond to client messages the same day", w: 2 },
        { t: "You have an active, updated digital schedule", w: 3 },
        { t: "You confirm appointments the day before", w: 2 },
        { t: "You rebook every client before they leave", w: 3 },
        { t: "You have a clear no-show policy", w: 2 },
        { t: "You use automatic reminders before each appointment", w: 3 },
        { t: "You have recurring clients who return every 2–4 weeks", w: 3 },
        { t: "Your schedule fills without constant promotions", w: 2 },
        { t: "You work more hours per week than you want", w: 2 },
        { t: "Someone else can manage the schedule if you are away", w: 3 },
        { t: "Your monthly income is predictable one week in advance", w: 3 },
        { t: "You have clear rules for hiring or opening another chair", w: 4 },
      ]
    },
    c: {
      es: {
        A: { l: "Sin control de agenda", a: "Crea una agenda digital esta semana. Sin eso, nada más funciona.", t: "Square Appointments o Fresha" },
        B: { l: "Clientes sin frecuencia de retorno", a: "Necesitas rebooking sistemático. Cada cliente sale con su próxima cita.", t: "WhatsApp + registro de clientes" },
        C: { l: "El negocio depende solo de ti", a: "Documenta el flujo de citas. Un empleado debe poder operar sin ti.", t: "SOP de agenda + Quick Replies" },
        D: { l: "Sin reglas para crecer", a: "Tienes operación estable. El siguiente paso es contratar o subir precios.", t: "Sistema de contratación" }
      },
      en: {
        A: { l: "No scheduling control", a: "Create a digital schedule this week. Nothing else works without it.", t: "Square Appointments or Fresha" },
        B: { l: "Clients do not return consistently", a: "You need systematic rebooking. Every client leaves with their next appointment.", t: "WhatsApp + client log" },
        C: { l: "Business depends entirely on you", a: "Document your appointment flow. An employee must be able to operate without you.", t: "Scheduling SOP + Quick Replies" },
        D: { l: "No rules for growth", a: "You have a stable operation. Next step is hiring or raising prices.", t: "Hiring system" }
      }
    }
  },
  SAL: {
    es: { name: "Salón de Cabello", label: "Salón" },
    en: { name: "Hair Salon", label: "Hair Salon" },
    agendaQ: 1,
    qs: {
      es: [
        { t: "Respondes solicitudes de cita el mismo día", w: 2 },
        { t: "Tienes agenda digital con horarios claros por estilista", w: 3 },
        { t: "Confirmas todas las citas el día anterior", w: 2 },
        { t: "Reagendas a cada cliente antes de que salga del salón", w: 3 },
        { t: "Tienes política activa para no-shows y cancelaciones tardías", w: 2 },
        { t: "Usas recordatorios automáticos para reducir ausencias", w: 3 },
        { t: "Tienes clientes recurrentes con visitas mensuales o más frecuentes", w: 3 },
        { t: "Controlas el ingreso por estilista por día", w: 3 },
        { t: "El salón opera con orden cuando el dueño no está", w: 2 },
        { t: "Alguien más puede manejar citas y mensajes si es necesario", w: 3 },
        { t: "Tu ingreso mensual es predecible antes de que termine la semana", w: 3 },
        { t: "Tienes reglas claras para contratar estilistas o abrir otra sede", w: 4 },
      ],
      en: [
        { t: "You respond to appointment requests the same day", w: 2 },
        { t: "You have a digital schedule with clear slots per stylist", w: 3 },
        { t: "You confirm all appointments the day before", w: 2 },
        { t: "You rebook every client before they leave the salon", w: 3 },
        { t: "You have an active no-show and late cancellation policy", w: 2 },
        { t: "You use automatic reminders to reduce no-shows", w: 3 },
        { t: "You have recurring clients visiting monthly or more often", w: 3 },
        { t: "You track revenue per stylist per day", w: 3 },
        { t: "The salon runs in order when the owner is not present", w: 2 },
        { t: "Someone else can handle appointments and messages if needed", w: 3 },
        { t: "Your monthly income is predictable before the week ends", w: 3 },
        { t: "You have clear rules for hiring stylists or opening another location", w: 4 },
      ]
    },
    c: {
      es: {
        A: { l: "Sin agenda estructurada por estilista", a: "Cada estilista necesita su propia agenda digital. El caos de horarios destruye ingresos.", t: "GlossGenius o Vagaro" },
        B: { l: "Sobreagendamiento o sillas vacías alternadas", a: "Necesitas reglas de distribución de citas. Llena huecos antes de abrir nuevos.", t: "CRM simple + sistema de turnos" },
        C: { l: "El salón depende del dueño para funcionar", a: "Documenta los procesos. Un estilista debe poder operar sin supervisión constante.", t: "Manual operativo + checklist diario" },
        D: { l: "Sin modelo para segunda sede", a: "Tienes el sistema. Necesitas estandarizarlo antes de replicarlo.", t: "SOP completo + acuerdo de expansión" }
      },
      en: {
        A: { l: "No structured schedule per stylist", a: "Each stylist needs their own digital schedule. Scheduling chaos destroys revenue.", t: "GlossGenius or Vagaro" },
        B: { l: "Overbooking and empty chairs alternating", a: "You need appointment distribution rules. Fill gaps before opening new slots.", t: "Simple CRM + shift system" },
        C: { l: "Salon depends on owner to function", a: "Document your processes. A stylist must be able to operate without constant supervision.", t: "Operations manual + daily checklist" },
        D: { l: "No model for a second location", a: "You have the system. Standardize it before replicating.", t: "Full SOP + expansion agreement" }
      }
    }
  },
  THAI: {
    es: { name: "Masajes Tailandeses", label: "Masajes" },
    en: { name: "Thai Massage", label: "Thai Massage" },
    agendaQ: 1,
    qs: {
      es: [
        { t: "Respondes mensajes nuevos en menos de 30 minutos", w: 2 },
        { t: "Tienes proceso claro y digital para agendar sesiones", w: 3 },
        { t: "Confirmas todas las citas el día anterior sin falta", w: 2 },
        { t: "Reagendas a cada cliente antes de terminar su sesión", w: 3 },
        { t: "Tu agenda prioriza clientes de dolor crónico", w: 2 },
        { t: "Usas recordatorios automáticos para todas las citas", w: 3 },
        { t: "Tienes clientes recurrentes con sesiones mensuales o más frecuentes", w: 3 },
        { t: "Controlas cuántas sesiones puedes hacer al día sin agotarte", w: 2 },
        { t: "Trabajas más horas físicas de las que tu cuerpo tolera", w: 2 },
        { t: "Alguien más puede responder mensajes y agendar por ti", w: 3 },
        { t: "Tu ingreso mensual es predecible con una semana de anticipación", w: 3 },
        { t: "Tienes reglas claras para contratar otro terapeuta o escalar", w: 4 },
      ],
      en: [
        { t: "You respond to new messages in under 30 minutes", w: 2 },
        { t: "You have a clear digital process for scheduling sessions", w: 3 },
        { t: "You confirm every appointment the day before without fail", w: 2 },
        { t: "You rebook every client before their session ends", w: 3 },
        { t: "Your schedule prioritizes chronic pain clients", w: 2 },
        { t: "You use automatic reminders for all appointments", w: 3 },
        { t: "You have recurring clients with monthly or more frequent sessions", w: 3 },
        { t: "You track how many sessions per day you can handle without burnout", w: 2 },
        { t: "You work more physical hours than your body tolerates well", w: 2 },
        { t: "Someone else can respond to messages and schedule for you", w: 3 },
        { t: "Your monthly income is predictable one week in advance", w: 3 },
        { t: "You have clear rules for hiring another therapist or scaling", w: 4 },
      ]
    },
    c: {
      es: {
        A: { l: "Sin sistema de citas estructurado", a: "Implementa agenda digital con confirmación automática esta semana.", t: "Acuity Scheduling o MindBody" },
        B: { l: "Clientes sin frecuencia de retorno", a: "Cada sesión termina con la próxima agendada. Sin excepción.", t: "CRM simple + WhatsApp" },
        C: { l: "Agotamiento físico del terapeuta", a: "Necesitas límites de sesiones diarias y alguien que maneje mensajes.", t: "Reglas de capacidad + asistente de mensajes" },
        D: { l: "Sin proceso para contratar otro terapeuta", a: "Tienes demanda. Te falta el proceso documentado para agregar capacidad.", t: "SOP de entrenamiento + contrato" }
      },
      en: {
        A: { l: "No structured appointment system", a: "Implement a digital schedule with automatic confirmation this week.", t: "Acuity Scheduling or MindBody" },
        B: { l: "Clients without consistent return frequency", a: "Every session must end with the next one booked. No exceptions.", t: "Simple CRM + WhatsApp" },
        C: { l: "Therapist physical burnout", a: "You need daily session limits and someone to handle messages.", t: "Capacity rules + message assistant" },
        D: { l: "No process for hiring another therapist", a: "You have the demand. You need documented process to add capacity.", t: "Training SOP + contract" }
      }
    }
  },
  FOOD: {
    es: { name: "Food Truck", label: "Food Truck" },
    en: { name: "Food Truck", label: "Food Truck" },
    agendaQ: 1,
    qs: {
      es: [
        { t: "Tienes ubicaciones y horarios fijos publicados con anticipación", w: 3 },
        { t: "Publicas tu ubicación del día antes de arrancar operaciones", w: 2 },
        { t: "Controlas el tiempo promedio de preparación por pedido", w: 3 },
        { t: "Controlas el inventario antes de cada turno de operación", w: 3 },
        { t: "Los precios son claros, visibles y no se negocian en caja", w: 2 },
        { t: "Repites ubicaciones y eventos que ya han sido rentables", w: 3 },
        { t: "Las esperas largas en cola no te han costado ventas visibles", w: 2 },
        { t: "No dependes de descuentos para generar ventas", w: 2 },
        { t: "Tu menú permite velocidad de servicio constante", w: 3 },
        { t: "Alguien más puede operar el truck sin que tú estés presente", w: 3 },
        { t: "Tu ingreso semanal es predecible antes de salir a operar", w: 3 },
        { t: "Tienes reglas claras para agregar un segundo truck o ubicación", w: 4 },
      ],
      en: [
        { t: "You have fixed locations and hours published in advance", w: 3 },
        { t: "You post your daily location before starting operations", w: 2 },
        { t: "You track average preparation time per order", w: 3 },
        { t: "You check inventory before each operating shift", w: 3 },
        { t: "Prices are clear, visible, and not negotiated at the window", w: 2 },
        { t: "You repeat locations and events that have already been profitable", w: 3 },
        { t: "Long lines have not cost you visible sales", w: 2 },
        { t: "You do not rely on discounts to generate sales", w: 2 },
        { t: "Your menu allows for consistent service speed", w: 3 },
        { t: "Someone else can operate the truck without you present", w: 3 },
        { t: "Your weekly income is predictable before you go out to operate", w: 3 },
        { t: "You have clear rules for adding a second truck or location", w: 4 },
      ]
    },
    c: {
      es: {
        A: { l: "Sin ubicación ni horario predecible", a: "Define 3 ubicaciones fijas y publica el horario semanal. Sin eso no hay clientela recurrente.", t: "Google Maps + Instagram Stories" },
        B: { l: "Ingresos impredecibles semana a semana", a: "Necesitas eventos recurrentes y al menos un cliente corporativo fijo.", t: "Calendario de eventos + Square" },
        C: { l: "El truck para sin el dueño", a: "Documenta el proceso de preparación. Un empleado debe poder operar sin ti.", t: "SOP de cocina + checklist de turno" },
        D: { l: "Sin modelo para segundo truck", a: "El sistema actual no escala. Estandariza antes de crecer.", t: "Manual de operación completo" }
      },
      en: {
        A: { l: "No predictable location or schedule", a: "Define 3 fixed locations and publish the weekly schedule. Without that there is no recurring clientele.", t: "Google Maps + Instagram Stories" },
        B: { l: "Unpredictable week-to-week income", a: "You need recurring events and at least one fixed corporate client.", t: "Event calendar + Square" },
        C: { l: "Truck stops without the owner", a: "Document your prep process. An employee must be able to operate without you.", t: "Kitchen SOP + shift checklist" },
        D: { l: "No model for a second truck", a: "Your current system does not scale. Standardize before growing.", t: "Full operations manual" }
      }
    }
  },
  TINT: {
    es: { name: "Auto Detailing & Tinting", label: "Detailing / Tinting" },
    en: { name: "Auto Detailing & Tinting", label: "Detailing / Tinting" },
    agendaQ: 1,
    qs: {
      es: [
        { t: "Respondes cotizaciones y solicitudes el mismo día", w: 3 },
        { t: "Tienes precios definidos por tipo de vehículo y servicio", w: 3 },
        { t: "Explicas tipos de servicio y garantías a cada cliente", w: 2 },
        { t: "Controlas el tiempo promedio por tipo de trabajo", w: 3 },
        { t: "Rechazas o cotizas apropiadamente trabajos no rentables", w: 3 },
        { t: "Confirmas todos los trabajos antes de preparar materiales", w: 2 },
        { t: "Tienes clientes que regresan o te refieren regularmente", w: 3 },
        { t: "No dependes de descuentos para llenar tu agenda", w: 2 },
        { t: "Rara vez rehaces trabajos por errores o malentendidos", w: 3 },
        { t: "Alguien más puede instalar o asistir si tú no estás", w: 3 },
        { t: "Tu ingreso mensual es predecible antes de que termine el mes", w: 3 },
        { t: "Tienes reglas claras para contratar instaladores o escalar", w: 4 },
      ],
      en: [
        { t: "You respond to quotes and requests the same day", w: 3 },
        { t: "You have set prices per vehicle type and service", w: 3 },
        { t: "You explain service types and warranties to every client", w: 2 },
        { t: "You track average time per job type", w: 3 },
        { t: "You decline or properly quote jobs that are not profitable", w: 3 },
        { t: "You confirm all jobs before preparing materials", w: 2 },
        { t: "You have clients who return or refer others regularly", w: 3 },
        { t: "You do not rely on discounts to fill your schedule", w: 2 },
        { t: "You rarely redo work due to errors or misunderstandings", w: 3 },
        { t: "Someone else can install or assist if you are not available", w: 3 },
        { t: "Your monthly income is predictable before the month ends", w: 3 },
        { t: "You have clear rules for hiring installers or scaling operations", w: 4 },
      ]
    },
    c: {
      es: {
        A: { l: "Sin precios definidos por servicio", a: "Define precios por tipo de vehículo hoy. Cotizar en el momento destruye margen.", t: "Menú de precios físico y digital" },
        B: { l: "Clientes de una sola visita", a: "Necesitas programa de referidos activo. Un cliente satisfecho vale tres.", t: "Script de referidos + registro de clientes" },
        C: { l: "Solo tú puedes hacer el trabajo", a: "Si no puedes enseñar el proceso, el negocio no crece. Documenta cada instalación.", t: "SOP de instalación + entrenamiento" },
        D: { l: "Sin reglas para contratar instaladores", a: "Tienes la demanda. Te falta el proceso para agregar instaladores con calidad constante.", t: "Contrato de trabajo + manual técnico" }
      },
      en: {
        A: { l: "No defined pricing by service", a: "Set prices per vehicle type today. Quoting on the spot destroys margin.", t: "Physical and digital price menu" },
        B: { l: "Single-visit clients only", a: "You need an active referral program. One satisfied client is worth three.", t: "Referral script + client log" },
        C: { l: "Only you can do the work", a: "If you cannot teach the process, the business cannot grow. Document every installation.", t: "Installation SOP + training" },
        D: { l: "No rules for hiring installers", a: "You have the demand. You need process to add installers with consistent quality.", t: "Work contract + technical manual" }
      }
    }
  }
};

const getPlans = (L) => ({
  A: { allowed:["Diagnóstico + Plan de Acción"], blocked:["Automatización","CRM","Implementación","Escala"], cl:L.s1, n:L.pnA, f:L.pfA },
  B: { allowed:["Diagnóstico","Automatización","CRM"], blocked:["Escala","Contratación"], cl:L.s2, n:L.pnB, f:L.pfB },
  C: { allowed:["Diagnóstico","Automatización","CRM","Implementación"], blocked:["Escala"], cl:L.s3, n:L.pnC, f:L.pfC },
  D: { allowed:["Todas las ofertas"], blocked:[], cl:L.s4, n:L.pnD, f:L.pfD },
});

const sv = (d) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch(_){} };
const ld = ()  => { try { const d=localStorage.getItem(STORAGE_KEY); return d?JSON.parse(d):null; } catch(_){return null;} };
const cl = ()  => { try { localStorage.removeItem(STORAGE_KEY); } catch(_){} };

const scoreExpress = (a, L) => {
  if (Object.keys(a).length!==7) return null;
  let pc=null;
  if (a[0]<2) pc = L.scaleOpts[0]==="Never"?"Lack of operational control":"Falta de control operativo";
  else if (a[2]<1||a[3]===3) pc = L.scaleOpts[0]==="Never"?"Owner dependency":"Dependencia del dueño";
  else if (a[4]<2) pc = L.scaleOpts[0]==="Never"?"Unpredictable income":"Ingresos impredecibles";
  const sc=[];
  if (a[5]<2) sc.push(L.scaleOpts[0]==="Never"?"Low client recurrence":"Baja recurrencia de clientes");
  if (a[6]<2&&sc.length<2) sc.push(L.scaleOpts[0]==="Never"?"No growth rules":"Sin reglas de crecimiento");
  let hp="A";
  if (pc&&(pc.includes("depend")||pc.includes("Depend")||pc.includes("income")||pc.includes("predic"))) hp="B";
  else if (!pc) hp="C";
  return { pc:pc||(L.scaleOpts[0]==="Never"?"No clear constraint detected":"Sin restricción clara detectada"), sc, hp };
};

const scoreDiag = (a, vid) => {
  const qs = V[vid].qs.es;
  if (Object.keys(a).length!==12) return null;
  let s=0, m=0;
  qs.forEach((q,i)=>{ s+=(a[i]||0)*q.w; m+=3*q.w; });
  const p=Math.round((s/m)*100);
  let pl="A";
  if(p>35) pl="B"; if(p>65) pl="C"; if(p>85) pl="D";
  let forced=false;
  if((a[V[vid].agendaQ-1]||0)<2){pl="A";forced=true;}
  return {s,m,p,pl,forced};
};

const buildReport = (client, dr, lang) => {
  const L=LANG[lang], vd=V[client.vertical];
  const vc=vd.c[lang][dr.pl];
  const plans=getPlans(L), plan=plans[dr.pl];
  const col=PCOL[dr.pl], vname=vd[lang].name;
  const img=VIMG[client.vertical];
  const dateStr=new Date(client.date).toLocaleDateString(lang==="es"?"es-US":"en-US",{year:"numeric",month:"long",day:"numeric"});
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${L.reportTitle} — ${client.businessName}</title><style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#f4f2ee;font-family:'Source Sans 3',sans-serif;color:#1a1a2e}.page{max-width:780px;margin:0 auto;background:#fff;box-shadow:0 4px 60px rgba(0,0,0,.12)}.hero{position:relative;height:260px;overflow:hidden}.hero img{width:100%;height:100%;object-fit:cover;filter:brightness(.35)}.hero-over{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,.92) 0%,rgba(10,22,40,.6) 100%)}.hero-content{position:absolute;inset:0;padding:2.5rem 3rem;display:flex;flex-direction:column;justify-content:space-between}.logo-w{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#C8A84B;letter-spacing:.08em}.logo-sub{font-size:10px;color:#6B87AA;letter-spacing:.2em;text-transform:uppercase;margin-top:2px}.client-w{}.client-name{font-family:'Playfair Display',serif;font-size:34px;font-weight:600;color:#fff;line-height:1.2}.client-biz{font-size:14px;color:#B8CCDF;margin-top:.3rem}.tags{display:flex;gap:.6rem;margin-top:.9rem}.tag{display:inline-block;padding:.22rem .75rem;border-radius:3px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;border:1px solid}.tag-g{background:rgba(200,168,75,.15);color:#C8A84B;border-color:rgba(200,168,75,.35)}.tag-m{background:rgba(255,255,255,.05);color:#6B87AA;border-color:rgba(255,255,255,.12)}.body{padding:2.5rem 3rem}.sec-lbl{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#C8A84B;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid #e8e4dc}.score-wrap{background:#0A1628;border-radius:10px;padding:1.75rem 2rem;margin-bottom:2rem;display:grid;grid-template-columns:auto 1fr;gap:2rem;align-items:center}.score-big{font-family:'Playfair Display',serif;font-size:80px;font-weight:700;color:#C8A84B;line-height:1}.score-lbl{font-size:10px;color:#6B87AA;letter-spacing:.14em;text-transform:uppercase;margin-top:.25rem}.bar-bg{height:4px;background:#1A3258;border-radius:2px;margin:.65rem 0 .85rem}.bar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#C8A84B,#EDD48A)}.plan-chip{display:inline-block;padding:.28rem .9rem;border-radius:3px;font-size:11px;font-weight:600;letter-spacing:.05em}.cblock{border-left:4px solid ${col};padding:1.25rem 1.5rem;background:#faf8f4;border-radius:0 8px 8px 0;margin-bottom:2rem}.c-micro{font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:#aaa;margin-bottom:.4rem}.c-head{font-family:'Playfair Display',serif;font-size:26px;font-weight:600;color:#0A1628;line-height:1.3;margin-bottom:.6rem}.c-body{font-size:14px;color:#333;line-height:1.65;margin-bottom:.5rem}.c-tool{font-size:12px;color:#aaa}.c-tool b{color:#C8A84B;font-weight:500}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem}.stat{background:#faf8f4;border-radius:8px;padding:1rem 1.25rem}.stat-l{font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#aaa;margin-bottom:.3rem}.stat-v{font-family:'Playfair Display',serif;font-size:24px;font-weight:600;color:#0A1628}.pills{margin-bottom:2rem}.pill{display:inline-block;padding:.2rem .6rem;border-radius:3px;font-size:10px;margin:.18rem .12rem 0 0}.pill-ok{background:rgba(24,104,64,.1);color:#186840;border:1px solid rgba(24,104,64,.25)}.pill-no{background:rgba(176,48,32,.08);color:#B03020;border:1px solid rgba(176,48,32,.2)}.steps{background:#0A1628;border-radius:10px;padding:1.75rem 2rem;margin-bottom:2rem}.step{display:flex;gap:1rem;margin-bottom:1rem;align-items:flex-start}.step:last-child{margin-bottom:0}.step-n{width:26px;height:26px;border-radius:50%;background:#C8A84B;color:#0A1628;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}.step-t{font-size:13px;color:#B8CCDF;line-height:1.65}.footer{background:#0A1628;padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center}.f-logo{font-family:'Playfair Display',serif;font-size:18px;font-weight:600;color:#C8A84B}.f-tag{font-size:10px;color:#6B87AA;margin-top:2px;letter-spacing:.04em}.f-r{font-size:10px;color:#6B87AA;text-align:right;line-height:1.8}@media print{body{background:#fff}.page{max-width:100%;box-shadow:none}}</style></head><body><div class="page"><div class="hero"><img src="${img}" alt="${vname}"><div class="hero-over"></div><div class="hero-content"><div><div class="logo-w">NextVia Labs</div><div class="logo-sub">${L.reportTitle} · ${vname}</div></div><div class="client-w"><div class="client-name">${client.clientName}</div><div class="client-biz">${client.businessName}</div><div class="tags"><span class="tag tag-g">${vname}</span><span class="tag tag-m">${dateStr}</span><span class="tag tag-g" style="background:${col}1A;color:${col};border-color:${col}40">${plan.cl}</span></div></div></div></div><div class="body"><p class="sec-lbl">${L.scoreTitle}</p><div class="score-wrap"><div><div class="score-big">${dr.p}%</div><div class="score-lbl">${L.operativeScore}</div></div><div><div class="bar-bg"><div class="bar-fill" style="width:${dr.p}%"></div></div><span class="plan-chip" style="background:${col}1A;color:${col};border:1px solid ${col}40">${plan.cl}</span>${dr.forced?`<span style="font-size:11px;color:#C07828;margin-left:.75rem">⚠ ${L.agendaCrit}</span>`:""}</div></div><p class="sec-lbl">${L.blockingTitle}</p><div class="cblock"><div class="c-micro">${L.reportSubA} · ${vname}</div><div class="c-head">${vc.l}</div><div class="c-body">${vc.a}</div><div class="c-tool">${L.reportSubB}: <b>${vc.t}</b></div></div><div class="stats"><div class="stat"><div class="stat-l">${L.points}</div><div class="stat-v">${dr.s}</div></div><div class="stat"><div class="stat-l">${L.maximum}</div><div class="stat-v">${dr.m}</div></div><div class="stat"><div class="stat-l">${L.pct}</div><div class="stat-v">${dr.p}%</div></div></div><p class="sec-lbl">${L.reportServices}</p><div class="pills">${plan.allowed.map(o=>`<span class="pill pill-ok">✓ ${o}</span>`).join("")}${plan.blocked.map(o=>`<span class="pill pill-no">✗ ${o}</span>`).join("")}</div><p class="sec-lbl">${L.reportNext}</p><div class="steps"><div class="step"><div class="step-n">1</div><div class="step-t">${vc.a}</div></div><div class="step"><div class="step-n">2</div><div class="step-t">${L.reportStep2}</div></div><div class="step"><div class="step-n">3</div><div class="step-t">${L.reportStep3}</div></div></div></div><div class="footer"><div><div class="f-logo">NextVia Labs</div><div class="f-tag">We find the break. We fix it. We stay until it holds.</div></div><div class="f-r">Charlotte, NC · nextvia.com<br>${L.reportGenerated} ${dateStr}</div></div></div></body></html>`;
};

// ─── CSS ─────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:${T.navy};color:${T.text};font-family:'Source Sans 3',sans-serif;font-size:14px}
.wrap{min-height:100vh;max-width:640px;margin:0 auto}

/* HEADER */
.hband{background:${T.navy2};border-bottom:1px solid ${T.border};padding:.85rem 1.5rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;backdrop-filter:blur(8px)}
.logo-name{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:${T.gold2};letter-spacing:.04em}
.logo-tag{font-size:9px;color:${T.muted};letter-spacing:.16em;text-transform:uppercase;margin-top:1px}
.hright{display:flex;gap:.4rem;align-items:center}
.lang-btn{background:none;border:1px solid ${T.border};color:${T.muted};height:28px;padding:0 .6rem;border-radius:4px;cursor:pointer;font-size:10px;font-weight:600;letter-spacing:.08em;transition:all .18s;font-family:'Source Sans 3',sans-serif}
.lang-btn:hover,.lang-btn.on{border-color:${T.borderH};color:${T.gold};background:rgba(200,168,75,.08)}
.lock-btn{background:none;border:1px solid ${T.border};color:${T.muted};width:28px;height:28px;border-radius:4px;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;transition:all .18s}
.lock-btn.on{border-color:${T.borderH};color:${T.gold}}
.gbar{height:2px;background:linear-gradient(90deg,${T.gold} 0%,${T.gold2} 55%,transparent 100%)}

/* BODY */
.body{padding:1.5rem 1.4rem}
.prog{display:flex;gap:3px;margin-bottom:1.75rem}
.ps{flex:1;height:2px;border-radius:1px;background:${T.navy4};transition:background .4s}
.ps.on{background:${T.gold}}

/* SECTION LABEL */
.sh{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${T.gold};margin-bottom:1rem;display:flex;align-items:center;gap:.6rem}
.sh::after{content:'';flex:1;height:1px;background:${T.border}}

/* FIELDS */
.fl{margin-bottom:.9rem}
.flbl{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${T.muted};margin-bottom:.3rem}
.inp{width:100%;background:${T.navy3};border:1px solid rgba(200,168,75,.13);border-radius:5px;padding:.58rem .85rem;color:${T.off};font-size:13px;outline:none;transition:border .2s;caret-color:${T.gold2};font-family:'Source Sans 3',sans-serif}
.inp:focus{border-color:${T.borderH}}

/* VERTICAL GRID */
.vgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:.45rem;margin-bottom:1rem}
.vcard{position:relative;border-radius:7px;overflow:hidden;cursor:pointer;aspect-ratio:4/5;border:2px solid transparent;transition:all .22s}
.vcard:hover{border-color:rgba(200,168,75,.4)}
.vcard.sel{border-color:${T.gold}}
.vcard-img{width:100%;height:100%;object-fit:cover;filter:brightness(.45);transition:filter .22s}
.vcard:hover .vcard-img,.vcard.sel .vcard-img{filter:brightness(.55)}
.vcard-over{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:.5rem .4rem;background:linear-gradient(to top,rgba(10,22,40,.85) 0%,transparent 60%)}
.vcard-lbl{font-size:9px;font-weight:600;color:${T.off};letter-spacing:.05em;line-height:1.25;text-align:center}
.vcard.sel .vcard-lbl{color:${T.gold3}}
.vcard-check{position:absolute;top:5px;right:5px;width:16px;height:16px;border-radius:50%;background:${T.gold};display:none;align-items:center;justify-content:center}
.vcard.sel .vcard-check{display:flex}

/* BUTTONS */
.btn-gold{width:100%;background:${T.gold};color:${T.navy};border:none;border-radius:5px;padding:.72rem 1rem;font-size:13px;font-weight:600;letter-spacing:.04em;cursor:pointer;transition:background .18s;font-family:'Source Sans 3',sans-serif}
.btn-gold:hover{background:${T.gold2}}
.btn-ghost{background:none;border:1px solid ${T.border};color:${T.muted};border-radius:5px;padding:.58rem 1rem;font-size:12px;cursor:pointer;transition:all .18s;font-family:'Source Sans 3',sans-serif;width:100%;margin-top:.5rem}
.btn-ghost:hover{border-color:${T.borderH};color:${T.text}}

/* QUESTION CARD */
.qc{background:${T.navy2};border:1px solid rgba(200,168,75,.1);border-radius:7px;padding:.95rem 1rem;margin-bottom:.6rem;transition:border-color .18s}
.qc.done{border-color:rgba(200,168,75,.28)}
.qmeta{font-size:9px;color:${T.muted};letter-spacing:.1em;text-transform:uppercase;margin-bottom:.35rem}
.qt{font-size:13px;color:${T.text};line-height:1.5;margin-bottom:.75rem}
.opts{display:grid;grid-template-columns:repeat(2,1fr);gap:.3rem}
.opt{display:flex;align-items:center;gap:.4rem;background:${T.navy3};border:1px solid rgba(200,168,75,.1);border-radius:4px;padding:.4rem .6rem;cursor:pointer;font-size:11px;color:${T.muted};transition:all .14s;user-select:none}
.opt.sel{background:rgba(200,168,75,.09);border-color:${T.gold};color:${T.gold3}}
.opt input{accent-color:${T.gold};width:11px;height:11px;flex-shrink:0}

/* NAV */
.nr{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.3rem}
.back{background:none;border:none;color:${T.muted};font-size:12px;cursor:pointer;padding:0;font-family:'Source Sans 3',sans-serif}
.back:hover{color:${T.gold}}
.cnt{font-size:11px;color:${T.muted}}

/* EXPRESS RESULT */
.er-box{background:${T.navy2};border:1px solid ${T.borderH};border-radius:8px;padding:1.3rem 1.5rem;margin-top:1.1rem}
.er-micro{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${T.gold};margin-bottom:.45rem}
.er-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:${T.off};line-height:1.3;margin-bottom:.65rem}
.er-sub{font-size:12px;color:${T.muted};margin-bottom:1rem;line-height:1.5}

/* SCORE */
.srow{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-bottom:.8rem}
.sc{background:${T.navy2};border:1px solid ${T.border};border-radius:7px;padding:.75rem 1rem}
.slbl{font-size:9px;color:${T.muted};text-transform:uppercase;letter-spacing:.1em;margin-bottom:.25rem}
.sval{font-family:'Playfair Display',serif;font-size:26px;font-weight:600;color:${T.gold2}}
.mtr{height:3px;background:${T.navy4};border-radius:1.5px;margin:.35rem 0 .9rem}
.mfill{height:100%;border-radius:1.5px;background:linear-gradient(90deg,${T.gold},${T.gold2});transition:width 1s ease}

/* CONSTRAINT BOX */
.cbox{border-radius:0 7px 7px 0;padding:.95rem 1.1rem;margin-bottom:1rem}
.c-sub{font-size:9px;color:${T.muted};text-transform:uppercase;letter-spacing:.1em;margin-bottom:.35rem}
.c-title{font-family:'Playfair Display',serif;font-size:21px;font-weight:600;color:${T.off};line-height:1.3;margin-bottom:.55rem}
.c-action{font-size:13px;color:${T.text};line-height:1.6;margin-bottom:.4rem}
.c-tool{font-size:11px;color:${T.muted}}
.c-tool span{color:${T.gold2}}

/* STEPS */
.stepsblock{background:${T.navy2};border-radius:7px;padding:.95rem 1rem;margin-bottom:1.3rem}
.stp{display:flex;gap:.8rem;margin-bottom:.75rem;align-items:flex-start}
.stp:last-child{margin-bottom:0}
.snum{width:20px;height:20px;border-radius:50%;background:${T.gold};color:${T.navy};font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.stxt{font-size:13px;color:${T.text};line-height:1.5}

/* PILLS */
.pill{display:inline-block;padding:.18rem .5rem;border-radius:3px;font-size:10px;margin:.16rem .1rem 0 0}
.pill-ok{background:rgba(24,104,64,.14);color:#2a9d5a;border:1px solid rgba(24,104,64,.28)}
.pill-no{background:rgba(176,48,32,.1);color:#e06050;border:1px solid rgba(176,48,32,.22)}

/* CONSULTANT */
.cpanel{background:rgba(200,168,75,.05);border:1px solid ${T.borderH};border-radius:7px;padding:.95rem;margin-bottom:1.3rem}
.ctag{font-size:9px;color:${T.gold};letter-spacing:.16em;text-transform:uppercase;font-weight:600}
.pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:.45rem;margin-top:.7rem}
.pcard{background:${T.navy};border:1px solid ${T.border};border-radius:5px;padding:.55rem .75rem}

/* MODAL */
.mbg{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:50}
.modal{background:${T.navy2};border:1px solid ${T.borderH};border-radius:10px;padding:1.65rem;width:88%;max-width:300px}
.pin-inp{width:100%;background:${T.navy3};border:1px solid ${T.border};border-radius:5px;padding:.65rem;color:${T.off};font-size:26px;text-align:center;letter-spacing:.5em;outline:none;margin-bottom:.9rem;font-family:'Source Sans 3',sans-serif}
.pin-inp:focus{border-color:${T.borderH}}
.frow{display:flex;gap:.5rem}

/* RESTORE */
.restore{background:rgba(200,168,75,.07);border:1px solid ${T.borderH};border-radius:6px;padding:.65rem 1rem;margin-bottom:1.1rem;display:flex;justify-content:space-between;align-items:center}
.rtxt{font-size:12px;color:${T.gold2}}
.rbtns{display:flex;gap:.4rem}
.rbtn{background:${T.gold};color:${T.navy};border:none;border-radius:3px;padding:.28rem .65rem;font-size:11px;font-weight:600;cursor:pointer;font-family:'Source Sans 3',sans-serif}
.rbtn.g{background:none;border:1px solid ${T.border};color:${T.muted}}
`;

// ─── APP ─────────────────────────────────────────────────────────
export default function App() {
  const [lang,  setLang]  = useState("es");
  const [stage, setStage] = useState("setup");
  const [cli,   setCli]   = useState({ clientName:"", businessName:"", vertical:"", date:new Date().toISOString().split("T")[0] });
  const [expA,  setExpA]  = useState({});
  const [expR,  setExpR]  = useState(null);
  const [dA,    setDA]    = useState({});
  const [dR,    setDR]    = useState(null);
  const [con,   setCon]   = useState(false);
  const [pin,   setPin]   = useState("");
  const [showP, setShowP] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [hasSave, setHasSave] = useState(false);

  const L = LANG[lang];
  const plans = getPlans(L);

  useEffect(() => { const s=ld(); if(s&&s.stage&&s.stage!=="setup") setHasSave(true); }, []);
  useEffect(() => {
    if(!cli.clientName&&stage==="setup") return;
    sv({ stage, lang, cli, expA, expR, dA, dR });
  }, [stage, lang, cli, expA, expR, dA, dR]);

  const restore = () => {
    const s=ld(); if(!s) return;
    if(s.lang) setLang(s.lang);
    if(s.stage) setStage(s.stage);
    if(s.cli) setCli(s.cli);
    if(s.expA) setExpA(s.expA);
    if(s.expR) setExpR(s.expR);
    if(s.dA) setDA(s.dA);
    if(s.dR) setDR(s.dR);
    setHasSave(false);
  };

  const reset = () => {
    cl(); setStage("setup");
    setCli({ clientName:"", businessName:"", vertical:"", date:new Date().toISOString().split("T")[0] });
    setExpA({}); setExpR(null); setDA({}); setDR(null); setHasSave(false);
  };

  const doExpress = () => { const r=scoreExpress(expA,L); if(!r){alert(L.fillAll);return;} setExpR(r); };
  const doDiag = () => { const r=scoreDiag(dA,cli.vertical); if(!r){alert(L.fillAll);return;} setDR(r); setStage("results"); };

  const download = () => {
    if(!dR) return;
    const html=buildReport(cli,dR,lang);
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download=`NVL_${cli.businessName.replace(/\s+/g,"_")}_${cli.date}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const tryPin = () => { if(pin===PIN){setCon(true);setShowP(false);setPin("");} else{alert(L.pinWrong);setPin("");} };

  const progIdx = {setup:-1,express:0,diagnostic:1,results:2}[stage]??-1;
  const vd = cli.vertical ? V[cli.vertical] : null;
  const vc = dR&&cli.vertical ? V[cli.vertical].c[lang][dR.pl] : null;
  const planDef = dR ? plans[dR.pl] : null;
  const pcol = dR ? PCOL[dR.pl] : T.gold;
  const qs = vd ? vd.qs[lang] : [];

  return (
    <div className="wrap">
      <style>{css}</style>

      {/* HEADER */}
      <div className="hband">
        <div>
          <div className="logo-name">NextVia Labs</div>
          <div className="logo-tag">{L.tag} · {L.ver}</div>
        </div>
        <div className="hright">
          <button className={`lang-btn${lang==="es"?" on":""}`} onClick={()=>setLang("es")}>ES</button>
          <button className={`lang-btn${lang==="en"?" on":""}`} onClick={()=>setLang("en")}>EN</button>
          <button className={`lock-btn${con?" on":""}`} onClick={()=>con?setCon(false):setShowP(true)}>
            {con?"🔓":"🔒"}
          </button>
        </div>
      </div>
      <div className="gbar"/>

      {/* PIN */}
      {showP && (
        <div className="mbg">
          <div className="modal">
            <p style={{fontSize:"13px",fontWeight:600,color:T.gold2,marginBottom:"1rem",fontFamily:"'Playfair Display',serif"}}>{L.consultAccess}</p>
            <input className="pin-inp" type="password" maxLength={4} placeholder="••••" value={pin} autoFocus
              onChange={e=>setPin(e.target.value)} onKeyPress={e=>e.key==="Enter"&&tryPin()}/>
            <div className="frow">
              <button className="btn-gold" style={{flex:1}} onClick={tryPin}>{L.enter}</button>
              <button className="btn-ghost" style={{margin:0,width:"auto"}} onClick={()=>{setShowP(false);setPin("");}}>{L.cancel}</button>
            </div>
          </div>
        </div>
      )}

      <div className="body">
        {/* RESTORE */}
        {hasSave && (
          <div className="restore">
            <span className="rtxt">{L.savedSession}</span>
            <div className="rbtns">
              <button className="rbtn" onClick={restore}>{L.continueBtn}</button>
              <button className="rbtn g" onClick={()=>{cl();setHasSave(false);}}>{L.discard}</button>
            </div>
          </div>
        )}

        {/* CONSULTANT */}
        {con && (
          <div className="cpanel">
            <div style={{display:"flex",justifyContent:"space-between",cursor:"pointer"}} onClick={()=>setShowRef(!showRef)}>
              <span className="ctag">{L.planRef}</span>
              <span style={{color:T.gold,fontSize:"12px"}}>{showRef?"▲":"▼"}</span>
            </div>
            {showRef && (
              <div className="pgrid">
                {Object.entries(plans).map(([k,p])=>(
                  <div key={k} className="pcard" style={{borderLeft:`2px solid ${PCOL[k]}`}}>
                    <p style={{fontSize:"11px",fontWeight:600,color:PCOL[k],marginBottom:".18rem"}}>{p.n}</p>
                    <p style={{fontSize:"9px",color:T.muted,marginBottom:".3rem"}}>{p.f}</p>
                    <p style={{fontSize:"9px",color:"#2a9d5a"}}>✓ {p.allowed.join(" · ")}</p>
                    {p.blocked.length>0&&<p style={{fontSize:"9px",color:"#e06050"}}>✗ {p.blocked.join(" · ")}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROGRESS */}
        {stage!=="setup" && (
          <div className="prog">{[0,1,2].map(i=><div key={i} className={`ps${progIdx>=i?" on":""}`}/>)}</div>
        )}

        {/* ── SETUP ── */}
        {stage==="setup" && (
          <div>
            <p className="sh">{L.newSession}</p>
            <div className="fl">
              <p className="flbl">{L.clientName}</p>
              <input className="inp" placeholder={L.clientPh} value={cli.clientName} onChange={e=>setCli({...cli,clientName:e.target.value})}/>
            </div>
            <div className="fl">
              <p className="flbl">{L.bizName}</p>
              <input className="inp" placeholder={L.bizPh} value={cli.businessName} onChange={e=>setCli({...cli,businessName:e.target.value})}/>
            </div>
            <div className="fl">
              <p className="flbl">{L.vertical}</p>
              <div className="vgrid">
                {Object.entries(V).map(([k,v])=>(
                  <div key={k} className={`vcard${cli.vertical===k?" sel":""}`} onClick={()=>setCli({...cli,vertical:k})}>
                    <img className="vcard-img" src={VIMG[k]} alt={v[lang].name} loading="lazy"/>
                    <div className="vcard-over">
                      <div className="vcard-lbl">{v[lang].label}</div>
                    </div>
                    <div className="vcard-check">
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#0A1628" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fl">
              <p className="flbl">{L.date}</p>
              <input className="inp" type="date" value={cli.date} onChange={e=>setCli({...cli,date:e.target.value})}/>
            </div>
            <button className="btn-gold" onClick={()=>cli.clientName&&cli.businessName&&cli.vertical?setStage("express"):alert(L.fillAll)}>
              {L.startBtn}
            </button>
          </div>
        )}

        {/* ── EXPRESS ── */}
        {stage==="express" && (
          <div>
            <div className="nr">
              <button className="back" onClick={()=>setStage("setup")}>{L.back}</button>
              <span className="cnt">{Object.keys(expA).length} / 7 {L.of7}</span>
            </div>
            <p className="sh">{L.expressTitle}</p>
            {L.expressQs.map((q,i)=>(
              <div key={i} className={`qc${expA[i]!==undefined?" done":""}`}>
                <p className="qmeta">{L.question} {i+1} {L.of7}</p>
                <p className="qt">{q}</p>
                <div className="opts">
                  {L.scaleOpts.map((o,v)=>(
                    <label key={o} className={`opt${expA[i]===v?" sel":""}`}>
                      <input type="radio" name={`e${i}`} checked={expA[i]===v} onChange={()=>setExpA({...expA,[i]:v})}/>
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn-gold" style={{marginTop:".25rem"}} onClick={doExpress}>{L.calcExpress}</button>

            {expR && (
              <>
                <div className="er-box">
                  <div className="er-micro">{L.constraintLabel}</div>
                  <div className="er-title">{expR.pc}</div>
                  <div className="er-sub">{expR.sc.length>0?`${L.alsoDetected} ${expR.sc.join(" · ")}`:""}</div>
                  <button className="btn-gold" onClick={()=>setStage("diagnostic")}>{L.fullDiag}</button>
                </div>
                {con && (
                  <div className="cpanel" style={{marginTop:"1rem"}}>
                    <p className="ctag" style={{marginBottom:".5rem"}}>{L.consultOnly}</p>
                    <p style={{fontSize:"12px",color:T.text}}><span style={{color:T.muted}}>{L.internalFocus}: </span><span style={{color:PCOL[expR.hp],fontWeight:600}}>Plan {expR.hp}</span></p>
                  </div>
                )}
              </>
            )}
            <button className="btn-ghost" onClick={()=>window.confirm(L.confirmRestart)&&reset()}>{L.restart}</button>
          </div>
        )}

        {/* ── DIAGNOSTIC ── */}
        {stage==="diagnostic" && vd && (
          <div>
            <div className="nr">
              <button className="back" onClick={()=>setStage("express")}>{L.back}</button>
              <span className="cnt">{Object.keys(dA).length} / 12 {L.of12}</span>
            </div>
            <p className="sh">{vd[lang].name} — 12 {lang==="es"?"preguntas":"questions"}</p>
            {qs.map((q,i)=>(
              <div key={i} className={`qc${dA[i]!==undefined?" done":""}`}>
                <p className="qmeta">{L.question} {i+1} · {L.weight} {q.w}</p>
                <p className="qt">{q.t}</p>
                <div className="opts">
                  {L.scaleOpts.map((o,v)=>(
                    <label key={o} className={`opt${dA[i]===v?" sel":""}`}>
                      <input type="radio" name={`d${i}`} checked={dA[i]===v} onChange={()=>setDA({...dA,[i]:v})}/>
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn-gold" style={{marginTop:".25rem"}} onClick={doDiag}>{L.calcDiag}</button>
            <button className="btn-ghost" onClick={()=>window.confirm(L.confirmRestart)&&reset()}>{L.restart}</button>
          </div>
        )}

        {/* ── RESULTS ── */}
        {stage==="results" && dR && vc && planDef && vd && (
          <div>
            {/* Vertical hero image */}
            <div style={{borderRadius:"8px",overflow:"hidden",marginBottom:"1.25rem",position:"relative",height:140}}>
              <img src={VIMG[cli.vertical]} alt={vd[lang].name} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.35)"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(10,22,40,.9) 0%,rgba(10,22,40,.5) 100%)",padding:"1.1rem 1.3rem",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:600,color:T.gold2}}>{cli.businessName}</p>
                <p style={{fontSize:"11px",color:T.muted,marginTop:".15rem"}}>{vd[lang].name} · {cli.date}</p>
              </div>
            </div>

            <p className="sh">{L.scoreTitle}</p>
            <div className="srow">
              <div className="sc"><p className="slbl">{L.points}</p><p className="sval">{dR.s}</p></div>
              <div className="sc"><p className="slbl">{L.maximum}</p><p className="sval">{dR.m}</p></div>
              <div className="sc"><p className="slbl">{L.pct}</p><p className="sval">{dR.p}%</p></div>
            </div>
            <div className="mtr"><div className="mfill" style={{width:`${dR.p}%`}}/></div>
            <div style={{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:"1.4rem"}}>
              <span style={{display:"inline-block",padding:".26rem .8rem",borderRadius:"3px",fontSize:"11px",fontWeight:600,letterSpacing:".04em",background:`${pcol}18`,color:pcol,border:`1px solid ${pcol}35`}}>
                {con?planDef.n:planDef.cl}
              </span>
              {dR.forced&&<span style={{fontSize:"11px",color:T.orange}}>⚠ {L.agendaCrit}</span>}
            </div>

            <p className="sh">{L.blockingTitle}</p>
            <div className="cbox" style={{background:T.navy2,borderLeft:`3px solid ${pcol}`}}>
              <p className="c-sub">{L.primaryC} · {vd[lang].name}</p>
              <p className="c-title">{vc.l}</p>
              <p className="c-action">{vc.a}</p>
              <p className="c-tool">{L.toolLabel}: <span>{vc.t}</span></p>
            </div>

            {con && (
              <div className="cpanel">
                <p className="ctag" style={{marginBottom:".6rem"}}>{L.consultOnly}</p>
                <p style={{fontSize:"11px",color:T.muted,marginBottom:".28rem"}}>{L.internalFocus}</p>
                <p style={{fontSize:"12px",color:T.text,marginBottom:".6rem"}}>{planDef.f}</p>
                <div>
                  {planDef.allowed.map((o,i)=><span key={i} className="pill pill-ok">✓ {o}</span>)}
                  {planDef.blocked.map((o,i)=><span key={i} className="pill pill-no">✗ {o}</span>)}
                </div>
              </div>
            )}

            <p className="sh" style={{marginTop:"1rem"}}>{L.nextStepsTitle}</p>
            <div className="stepsblock">
              {[vc.a, L.step2, L.step3].map((s,i)=>(
                <div key={i} className="stp">
                  <div className="snum">{i+1}</div>
                  <p className="stxt">{s}</p>
                </div>
              ))}
            </div>

            <div className="frow">
              <button className="btn-gold" style={{flex:1}} onClick={download}>{L.download}</button>
              <button className="btn-ghost" style={{margin:0,width:"auto",padding:".58rem 1rem"}} onClick={()=>window.confirm(L.confirmNew)&&reset()}>{L.newBtn}</button>
            </div>
            <p style={{fontSize:"10px",color:T.muted,textAlign:"center",marginTop:".6rem"}}>{L.printNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
