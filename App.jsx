import { useState, useEffect } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────
const T = {
  en: {
    appTitle: "LEADER STANDARD WORK", appSub: "TIME DIAGNOSTIC · WORK LEVEL ANALYSIS",
    loggingFor: "LOGGING FOR:",
    tabs: { log:"LOG TASKS", lsw:"MY LSW", required:"REQUIRED", watch:"CRITICAL WATCH", guide:"GUIDE", analyze:"ANALYZE", action:"ACTION PLAN" },
    addTask:"Log a task as", addTaskHint:"Press Enter — opens immediately for details",
    logInstructions: "WHAT TO LOG",
    logHints: {
      "Team Member": ["Tasks your TL asked you to do outside your normal job","Times you had to wait — for parts, equipment, instructions","Quality issues you found or were asked to fix","Anything that slowed your work down"],
      "Team Leader": ["Every time you stepped in to fix something instead of coaching","Meetings, reports, or data you pulled yourself","Any time you covered a team member's role","Firefighting — what broke, what you did, how long it took","Coaching interactions — structured or reactive"],
      "Supervisor": ["Every gemba walk — how long, what you observed","Meetings you attended — were you the right person there?","Problems TLs brought you — did you solve them or coach?","Reports or data you built or pulled yourself","Firefighting you got pulled into","Time spent on admin vs. floor vs. developing people"],
      "Manager": ["Meetings — should a supervisor own these?","Problems you solved that supervisors should own","Time verifying results vs. verifying standard work execution","Coaching supervisors vs. doing their work","Strategic work vs. operational firefighting"]
    },
    noTasks:"START LOGGING YOUR DAY", noTasksSub:"Every task — planned or reactive. Be specific and honest.",
    taskCount:"TASKS LOGGED", logged:"LOGGED", firefighting:"FIREFIGHTING", wrongLevel:"WRONG LEVEL",
    description:"Task Description", category:"Category", timeSpent:"Time (min)", timeBin:"When in shift?",
    whoInvolved:"Who was involved?", isFF:"Is this firefighting?",
    ffCause:"Root Cause", ffNote:"What happened + countermeasure idea...",
    disposition:"Disposition", pushTo:"Push to which level?",
    pushNote:"What must happen for them to own it?", eliminateNote:"Why does it exist? Who stops it?",
    notes:"Notes / Concerns", remove:"Remove", yes:"Yes", no:"No", selectCat:"Select...", selectLevel:"Select level...",
    consultantPrompts:"LEAN CONSULTANT PROMPTS", wrongWork:"DOESN'T BELONG HERE",
    reflectionLabel:"Your reflection:", reflectionPH:"Honest answer — not the job description, but how you actually spent your last 5 days...",
    actionPlan:"ACTION PLAN", pushDown:"PUSH DOWN", eliminate:"ELIMINATE",
    ffAnalysis:"FIREFIGHTING ANALYSIS", maintain:"MAINTAIN — YOUR REAL JOB",
    maintainSub:"Right-level work. Build these into your standard work.",
    keyQuestion:"KEY QUESTION:", keyQuestionText:"Same fires keep happening? The system is broken — not the people. What standard or process must change?",
    exportLSW:"Export LSW", noActionYet:"Log tasks and assign dispositions to see your action plan.",
    delegateTo:"→ Delegate to:", timeCat:"TIME BY CATEGORY", crossLevel:"ALL LEVELS",
    tasks:"tasks", noTasksLogged:"No tasks — tap to add", toPushDown:"to push down",
    requiredTitle:"REQUIRED ACTIVITIES", requiredSub:"Non-negotiables. These build your standard work schedule and layered audit.",
    addRequired:"Add required activity...",
    freqOpts:["Each Shift","Daily","2x Daily","3x Daily","Weekly","Monthly","As Needed"],
    weekdays:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    timeOfDay:"Time of Day", duration:"Duration (min)", standard:"Standard / What good looks like",
    dayOfWeek:"Day of Week", dayOfMonth:"Day of Month",
    auditTier:"Verification — who confirms this was done?",
    auditTierHint:"This becomes your layered audit. Who checks one level up?",
    owner:"Owner", addActivity:"Add", editActivity:"Edit", saveActivity:"Save",
    loadTemplate:"Load Supervisor Template", templateLoaded:"Template loaded",
    watchTitle:"CRITICAL WATCH", watchSub:"What you monitor for Safety, Quality, Delivery, Cost. Drives your layered audit.",
    addWatch:"Add watch item...", watchCat:"Category",
    watchCats:["Safety","Quality","Delivery","Cost"],
    timesPerDay:"Times per day", checkBy:"Checked by (select all levels)",
    threshold:"Alert threshold / condition", thresholdPH:"e.g. Scrap > 2%, Near miss logged, OTD < 95%",
    auditNote:"Action if threshold breached", auditNotePH:"e.g. Stop line, call quality, escalate...",
    layeredAuditSeed:"LAYERED AUDIT STRUCTURE", layeredAuditDesc:"Who checks what, and when — built from your required activities and watch items:",
    addWatchItem:"Add Watch Item", saving:"Saved", noWatchYet:"No watch items. Add above to build your layered audit.",
    lswTitle:"MY LEADER STANDARD WORK", lswSub:"Required activities + Maintain tasks assembled by shift position. Layered audit verification shown.",
    noLSW:"Add Required Activities and classify tasks as Maintain to build your LSW schedule.",
    lswLayeredAudit:"LAYERED AUDIT CHECKS",
    aiCoach:"AI COACH", aiCoachBtn:"Analyze with Lean Coach", aiThinking:"Analyzing...", aiError:"Unable to connect.",
    timeBins:["Start of Shift","Morning","Mid-Shift","End of Shift","Weekly","Monthly"],
    freq:"Frequency",
  },
  es: {
    appTitle:"TRABAJO ESTÁNDAR DEL LÍDER", appSub:"DIAGNÓSTICO DE TIEMPO · ANÁLISIS DE NIVEL",
    loggingFor:"REGISTRANDO PARA:",
    tabs:{ log:"TAREAS", lsw:"MI TSL", required:"REQUERIDAS", watch:"VIGILANCIA", guide:"GUÍA", analyze:"ANALIZAR", action:"PLAN ACCIÓN" },
    addTask:"Registra una tarea como", addTaskHint:"Presiona Enter — abre inmediatamente",
    logInstructions:"QUÉ REGISTRAR",
    logHints:{
      "Team Member":["Tareas que tu TL te pidió fuera de tu trabajo normal","Veces que tuviste que esperar — partes, equipo, instrucciones","Problemas de calidad que encontraste o te pidieron resolver","Cualquier cosa que frenó tu trabajo"],
      "Team Leader":["Cada vez que interviniste para arreglar algo en lugar de entrenar","Reuniones, reportes o datos que tú mismo extrajiste","Cuando cubriste el rol de un miembro del equipo","Apagando fuegos — qué se rompió, qué hiciste, cuánto tardó","Interacciones de coaching — estructuradas o reactivas"],
      "Supervisor":["Cada gemba walk — duración, qué observaste","Reuniones a las que asististe — ¿eras la persona correcta?","Problemas que los TLs te trajeron — ¿los resolviste o entrenaste?","Reportes o datos que tú construiste o extrajiste","Apagado de fuegos en que te involucraste","Tiempo en admin vs. piso vs. desarrollar personas"],
      "Manager":["Reuniones — ¿debería un supervisor dirigirlas?","Problemas que resolviste que supervisores deberían resolver","Tiempo verificando resultados vs. ejecución de trabajo estándar","Entrenar supervisores vs. hacer su trabajo","Trabajo estratégico vs. apagando fuegos operativos"]
    },
    noTasks:"COMIENZA A REGISTRAR", noTasksSub:"Cada tarea — planificada o reactiva. Sé específico.",
    taskCount:"TAREAS REGISTRADAS", logged:"REGISTRADO", firefighting:"APAGANDO FUEGOS", wrongLevel:"NIVEL INCORRECTO",
    description:"Descripción", category:"Categoría", timeSpent:"Tiempo (min)", timeBin:"¿Cuándo en el turno?",
    whoInvolved:"¿Quién estuvo involucrado?", isFF:"¿Es apagando fuegos?",
    ffCause:"Causa Raíz", ffNote:"¿Qué pasó + idea de contramedida?",
    disposition:"Disposición", pushTo:"¿Delegar a qué nivel?",
    pushNote:"¿Qué debe pasar para que lo asuman?", eliminateNote:"¿Por qué existe? ¿Quién lo detiene?",
    notes:"Notas / Preocupaciones", remove:"Eliminar", yes:"Sí", no:"No", selectCat:"Seleccionar...", selectLevel:"Seleccionar nivel...",
    consultantPrompts:"PREGUNTAS DEL CONSULTOR LEAN", wrongWork:"NO PERTENECE AQUÍ",
    reflectionLabel:"Tu reflexión:", reflectionPH:"Respuesta honesta — no la descripción del puesto, sino cómo realmente pasaste los últimos 5 días...",
    actionPlan:"PLAN DE ACCIÓN", pushDown:"DELEGAR ABAJO", eliminate:"ELIMINAR",
    ffAnalysis:"ANÁLISIS APAGADO FUEGOS", maintain:"MANTENER — TU TRABAJO REAL",
    maintainSub:"Trabajo del nivel correcto. Inclúyelo en tu trabajo estándar.",
    keyQuestion:"PREGUNTA CLAVE:", keyQuestionText:"¿Los mismos problemas siguen? El sistema está roto — no las personas. ¿Qué estándar debe cambiar?",
    exportLSW:"Exportar TSL", noActionYet:"Registra tareas y asigna disposiciones para ver tu plan.",
    delegateTo:"→ Delegar a:", timeCat:"TIEMPO POR CATEGORÍA", crossLevel:"TODOS LOS NIVELES",
    tasks:"tareas", noTasksLogged:"Sin tareas — toca para agregar", toPushDown:"para delegar",
    requiredTitle:"ACTIVIDADES REQUERIDAS", requiredSub:"No negociables. Construyen tu horario estándar y auditoría por capas.",
    addRequired:"Agregar actividad requerida...",
    freqOpts:["Cada Turno","Diario","2x al Día","3x al Día","Semanal","Mensual","Según sea necesario"],
    weekdays:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    timeOfDay:"Hora del día", duration:"Duración (min)", standard:"Estándar / Cómo se ve bien",
    dayOfWeek:"Día de la semana", dayOfMonth:"Día del mes",
    auditTier:"Verificación — ¿quién confirma que se hizo?",
    auditTierHint:"Esto se convierte en tu auditoría por capas. ¿Quién revisa un nivel arriba?",
    owner:"Responsable", addActivity:"Agregar", editActivity:"Editar", saveActivity:"Guardar",
    loadTemplate:"Cargar Plantilla de Supervisor", templateLoaded:"Plantilla cargada",
    watchTitle:"VIGILANCIA CRÍTICA", watchSub:"Qué monitoreas para Seguridad, Calidad, Entrega, Costo.",
    addWatch:"Agregar elemento...", watchCat:"Categoría",
    watchCats:["Seguridad","Calidad","Entrega","Costo"],
    timesPerDay:"Veces por día", checkBy:"Verificado por",
    threshold:"Umbral / condición de alerta", thresholdPH:"ej. Desperdicio > 2%, OTD < 95%",
    auditNote:"Acción si se supera umbral", auditNotePH:"ej. Detener línea, llamar a calidad...",
    layeredAuditSeed:"ESTRUCTURA DE AUDITORÍA POR CAPAS", layeredAuditDesc:"Quién verifica qué y cuándo:",
    addWatchItem:"Agregar Elemento", saving:"Guardado", noWatchYet:"Sin elementos. Agrega arriba.",
    lswTitle:"MI TRABAJO ESTÁNDAR DE LÍDER", lswSub:"Actividades requeridas + tareas a Mantener por posición en turno.",
    noLSW:"Completa Actividades Requeridas y clasifica tareas como Mantener para construir tu TSL.",
    lswLayeredAudit:"VERIFICACIÓN DE AUDITORÍA POR CAPAS",
    aiCoach:"COACH IA", aiCoachBtn:"Analizar con Coach Lean", aiThinking:"Analizando...", aiError:"No se pudo conectar.",
    timeBins:["Inicio de Turno","Mañana","Medio Turno","Fin de Turno","Semanal","Mensual"],
    freq:"Frecuencia",
  }
};

const LEVELS = ["Team Member","Team Leader","Supervisor","Manager"];
const LL = { "Team Member":{en:"Team Member",es:"Miembro"}, "Team Leader":{en:"Team Leader",es:"Líder Equipo"}, "Supervisor":{en:"Supervisor",es:"Supervisor"}, "Manager":{en:"Manager",es:"Gerente"} };
const LC = { "Team Member":"#22c55e", "Team Leader":"#3b82f6", "Supervisor":"#a855f7", "Manager":"#f97316" };

const DISPOSITIONS = {
  MAINTAIN:     {en:"Maintain",    es:"Mantener",      color:"#16a34a",bg:"#052e16",icon:"✓"},
  PUSH_DOWN:    {en:"Push Down",   es:"Delegar Abajo", color:"#d97706",bg:"#1c1003",icon:"↓"},
  ELIMINATE:    {en:"Eliminate",   es:"Eliminar",      color:"#dc2626",bg:"#1c0202",icon:"✕"},
  FIREFIGHTING: {en:"Firefighting",es:"Apagar Fuegos", color:"#ea580c",bg:"#1c0a02",icon:"🔥"},
  ESCALATE:     {en:"Escalate",    es:"Escalar",       color:"#7c3aed",bg:"#120a1c",icon:"↑"},
};

const CATS = {
  en:["Quality Response","Production / Output","People / Coaching","Meetings","Data / Reporting","Equipment / Maintenance","Scheduling","Communication","Safety","Continuous Improvement","Administrative","Other"],
  es:["Respuesta Calidad","Producción","Personas / Coaching","Reuniones","Datos / Reportes","Equipo / Mantenimiento","Programación","Comunicación","Seguridad","Mejora Continua","Administrativo","Otro"]
};
const FF_CAUSES = {
  en:["No standard exists","Standard not followed","Training gap","Equipment failure","Material shortage","Planning/scheduling failure","Communication breakdown","Recurring — systemic","One-time anomaly"],
  es:["No existe estándar","Estándar no seguido","Brecha de entrenamiento","Falla de equipo","Escasez de material","Falla de planificación","Falla de comunicación","Recurrente — sistémico","Anomalía única"]
};
const GUIDE_QS = {
  "Team Leader":{en:["When a problem hits your line, do you fix it yourself or coach your team member to fix it?","Are there tasks you do today that a trained team member could own?","When you're in a meeting, who is watching your process?","How much of your shift is planned vs. reactive?","When did you last give structured feedback against a standard?"],es:["Cuando hay un problema, ¿lo resuelves tú o entrenas al miembro del equipo?","¿Hay tareas que un miembro entrenado podría hacer?","Cuando estás en reunión, ¿quién observa el proceso?","¿Cuánto de tu turno está planificado vs. reactivo?","¿Cuándo diste retroalimentación estructurada contra un estándar?"]},
  "Supervisor":{en:["In your last gemba walk, were you observing/coaching TLs — or fixing problems yourself?","Who owns your visual board data? If it's you, why?","Can you tell if your area is on-standard without walking the floor?","What % of your day is your standard work vs. firefighting?","When a TL brings a problem, do you solve it or coach them?","When did you last audit a TL's behavior — not their results?"],es:["En tu último gemba walk, ¿observabas/entrenabas TLs o resolvías problemas?","¿Quién es dueño de los datos del tablero?","¿Puedes saber si tu área está al estándar sin caminar el piso?","¿Qué % de tu día es trabajo estándar vs. apagando fuegos?","Cuando un TL trae un problema, ¿lo resuelves o lo entrenas?","¿Cuándo auditaste el comportamiento de un TL — no sus resultados?"]},
  "Manager":{en:["How do you verify supervisors execute standard work — not just hit numbers?","Are you in meetings your supervisors should own?","When did you last develop a supervisor's capability vs. solve their problem?","What's your process to identify a supervisor working below level?","Do you have a layered audit — and are you the one closing it?"],es:["¿Cómo verificas que supervisores ejecutan trabajo estándar?","¿Estás en reuniones que tus supervisores deberían dirigir?","¿Cuándo desarrollaste la capacidad de un supervisor vs. resolviste su problema?","¿Cuál es tu proceso para detectar un supervisor trabajando por debajo de su nivel?","¿Tienes auditoría por capas — y eres tú quien la cierra?"]},
  "Team Member":{en:["Do you know the standard for your job — and does it match what you actually do?","When something goes wrong, do you have a clear way to signal your team leader?","What slows you down most each shift?","Do you understand how your work connects to quality and delivery?"],es:["¿Conoces el estándar para tu trabajo — y coincide con lo que haces?","Cuando algo sale mal, ¿tienes forma clara de señalizar al líder?","¿Qué te frena más en cada turno?","¿Entiendes cómo tu trabajo conecta con calidad y entrega?"]}
};
const WRONG_LEVEL = {
  "Team Leader":{en:["Running product to catch up","Pulling production reports","Handling HR directly","Making scheduling decisions","Attending management meetings"],es:["Correr producto para alcanzar ritmo","Extraer reportes de producción","Manejar RRHH directamente","Decisiones de programación","Asistir a reuniones gerenciales"]},
  "Supervisor":{en:["Updating visual boards themselves","Fixing equipment hands-on","Doing TL coaching with team members","Building their own reports","Covering open headcount on line"],es:["Actualizar tableros ellos mismos","Reparar equipos manualmente","Hacer coaching de TL con miembros","Construir sus propios reportes","Cubrir plazas en la línea"]},
  "Manager":{en:["Attending Tier 1 floor meetings","Solving supervisor-level problems","Daily scheduling decisions","Building metrics reports","Handling individual team member issues"],es:["Asistir a reuniones Tier 1","Resolver problemas de supervisor","Decisiones diarias de programación","Construir reportes de métricas","Manejar problemas individuales de miembros"]},
  "Team Member":{en:["Work requiring leader authority","Tasks without proper training"],es:["Trabajo que requiere autoridad de líder","Tareas sin entrenamiento apropiado"]}
};

const WATCH_COLORS = {Safety:"#ef4444",Seguridad:"#ef4444",Quality:"#f59e0b",Calidad:"#f59e0b",Delivery:"#3b82f6",Entrega:"#3b82f6",Cost:"#22c55e",Costo:"#22c55e"};

// ─── PRE-CANNED SUPERVISOR TEMPLATE (from uploaded form) ───────
const SUPERVISOR_TEMPLATE_EN = [
  // Morning
  {id:"t1",text:"Lead morning meeting — review KPIs",freq:"Each Shift",timeOfDay:"Shift Start",duration:"15",owner:"Supervisor",standard:"Back-orders and truck returns are identified and team is aware of goals",auditTier:["Manager"],timeBin:"Start of Shift"},
  {id:"t2",text:"Startup Readiness communicated to teams — People, Equipment, Parts",freq:"Each Shift",timeOfDay:"Shift Start",duration:"10",owner:"Supervisor",standard:"All 3 elements (People / Equipment / Parts) confirmed before production starts",auditTier:["Manager"],timeBin:"Start of Shift"},
  {id:"t3",text:"Spin Report reviewed and communicated",freq:"Each Shift",timeOfDay:"Shift Start",duration:"10",owner:"Supervisor",standard:"Spin report reviewed, action owners identified, team notified",auditTier:["Manager"],timeBin:"Start of Shift"},
  // During Day
  {id:"t4",text:"Critical to Quality Checks completed — Pre-Break, Pre/Post Lunch",freq:"3x Daily",timeOfDay:"",duration:"10",owner:"Supervisor",standard:"CTQ checks completed at each interval per standard. Findings documented.",auditTier:["Manager"],timeBin:"Morning"},
  {id:"t5",text:"Standard Work Audit completed and actions documented",freq:"Daily",timeOfDay:"",duration:"20",owner:"Supervisor",standard:"At least 1 TL audited per shift. Non-conformances documented with owner and due date.",auditTier:["Manager"],timeBin:"Morning"},
  {id:"t6",text:"Problem Solving time slot used for daily problem solving",freq:"Daily",timeOfDay:"",duration:"30",owner:"Supervisor",standard:"Structured problem solving session held — not firefighting. A3 or 5-why in use.",auditTier:["Manager"],timeBin:"Mid-Shift"},
  {id:"t7",text:"Time Cards updated",freq:"Daily",timeOfDay:"",duration:"10",owner:"Supervisor",standard:"All time cards current and accurate",auditTier:[],timeBin:"Mid-Shift"},
  {id:"t8",text:"Attendance Actions conducted as needed",freq:"As Needed",timeOfDay:"",duration:"",owner:"Supervisor",standard:"Policy followed, documented, HR notified if required",auditTier:["Manager"],timeBin:"Mid-Shift"},
  {id:"t9",text:"Back Orders and Truck Returns reviewed and progressing",freq:"Daily",timeOfDay:"",duration:"10",owner:"Supervisor",standard:"All back orders have action owner and target date. No aging > standard.",auditTier:["Manager"],timeBin:"Mid-Shift"},
  {id:"t10",text:"KPI Board Actions up to date — action owner, due date, no late items",freq:"Daily",timeOfDay:"",duration:"10",owner:"Supervisor",standard:"All actions have owner and due date. Nothing past due without escalation.",auditTier:["Manager"],timeBin:"Mid-Shift"},
  {id:"t11",text:"Safety Audit completed and follow-up done with Committee Person",freq:"Daily",timeOfDay:"",duration:"15",owner:"Supervisor",standard:"Safety audit checklist completed. All findings have corrective action assigned.",auditTier:["Manager"],timeBin:"Mid-Shift"},
  {id:"t12",text:"Jeff Circle (Ohno Circle) — structured observation completed for each TL",freq:"Weekly",dayOfWeek:"Friday",timeOfDay:"",duration:"60",owner:"Supervisor",standard:"Supervisor stands in circle and observes TL executing standard work. Observations documented — what was followed, what wasn't, what coaching is needed. No intervention during observation.",auditTier:["Manager"],timeBin:"Weekly"},
  // End of Shift
  {id:"t13",text:"Red Tag Racks — everything labeled and marked",freq:"Each Shift",timeOfDay:"End of Shift",duration:"10",owner:"Supervisor",standard:"All red tag items identified, labeled, segregated. Nothing unlabeled.",auditTier:["Manager"],timeBin:"End of Shift"},
  {id:"t14",text:"Frame/Sash Remakes entered in remake tracker (QR Code)",freq:"Each Shift",timeOfDay:"End of Shift",duration:"10",owner:"Supervisor",standard:"All remakes logged before shift end. No untracked remakes.",auditTier:["Manager"],timeBin:"End of Shift"},
  {id:"t15",text:"KPI Board updated with daily info",freq:"Each Shift",timeOfDay:"End of Shift",duration:"10",owner:"Supervisor",standard:"All KPIs updated with actuals. Trends visible.",auditTier:["Manager"],timeBin:"End of Shift"},
  {id:"t16",text:"Back Orders reviewed — all actioned",freq:"Each Shift",timeOfDay:"End of Shift",duration:"10",owner:"Supervisor",standard:"All back orders reviewed. Action owners confirmed. Nothing un-actioned.",auditTier:["Manager"],timeBin:"End of Shift"},
  {id:"t17",text:"Hourly HPR Miss updates completed in Dashboard — 'Red Hours'",freq:"Each Shift",timeOfDay:"End of Shift",duration:"10",owner:"Supervisor",standard:"All red hours documented with reason code and corrective note in dashboard.",auditTier:["Manager"],timeBin:"End of Shift"},
];

const SUPERVISOR_TEMPLATE_ES = SUPERVISOR_TEMPLATE_EN.map(t=>({...t,
  text: {
    "t1":"Dirigir reunión matutina — revisar KPIs","t2":"Comunicar Preparación de Arranque — Personas, Equipo, Partes",
    "t3":"Reporte Spin revisado y comunicado","t4":"Verificaciones Críticas de Calidad — Pre-Descanso, Pre/Post Almuerzo",
    "t5":"Auditoría de Trabajo Estándar completada y acciones documentadas",
    "t6":"Espacio de Resolución de Problemas utilizado para resolución diaria",
    "t7":"Tarjetas de Tiempo actualizadas","t8":"Acciones de Asistencia realizadas según necesidad",
    "t9":"Órdenes Pendientes y Devoluciones de Camión revisadas y progresando",
    "t10":"Acciones del Tablero KPI al día — dueño, fecha límite, sin atrasados",
    "t11":"Auditoría de Seguridad completada y seguimiento con Persona del Comité",
    "t12":"Jeff Circle (Círculo Ohno) — observación estructurada completada para cada TL","t13":"Racks de Etiqueta Roja — todo etiquetado y marcado",
    "t14":"Retrabajos de Marco/Sash ingresados en rastreador (Código QR)",
    "t15":"Tablero KPI actualizado con información diaria","t16":"Órdenes Pendientes revisadas — todas accionadas",
    "t17":"Actualizaciones horarias HPR Miss completadas en Dashboard — 'Horas Rojas'"
  }[t.id]||t.text
}));

const uid = () => Math.random().toString(36).slice(2,9);

// ─── AI COACH ─────────────────────────────────────────────────
async function getAICoaching(context, lang) {
  const sys = lang==="es"
    ? "Eres un consultor Lean con cinturón negro Six Sigma. Das retroalimentación directa y práctica a líderes de manufactura. Señala trabajo en nivel incorrecto, patrones de apagado de fuegos, y haz preguntas de sondeo. Máximo 4 oraciones."
    : "You are a senior Lean consultant and Six Sigma Black Belt coaching manufacturing leaders. Give direct, practical feedback. Call out wrong-level work, firefighting patterns, ask one probing follow-up question. Max 4 sentences.";
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[{role:"user",content:context}]})});
    const d = await r.json(); return d.content?.[0]?.text||"";
  } catch(e) { return ""; }
}

// ─── EXPORT ──────────────────────────────────────────────────
const buildExport = (tasks,required,watchItems,reflections,level,lang,t) => {
  const ll = l=>LL[l]?.[lang]||l;
  const lines=[`${"=".repeat(52)}`,`${t.appTitle}`,`${ll(level)} — ${new Date().toLocaleDateString(lang==="es"?"es-MX":"en-US")}`,`${"=".repeat(52)}`,""];
  if(required.length){
    lines.push(`── ${t.requiredTitle} ──`);
    required.forEach(r=>{
      let freq=r.freq||(lang==="es"?"—":"—");
      if(r.freq==="Weekly"||r.freq==="Semanal") freq+=` (${r.dayOfWeek||"?"})`;
      if(r.freq==="Monthly"||r.freq==="Mensual") freq+=` (Day ${r.dayOfMonth||"?"})`;
      lines.push(`  [${freq}] ${r.timeOfDay||""} ${r.text} (${r.duration||"?"}min) — ${r.owner||"—"}`);
      if(r.standard) lines.push(`     ✓ Standard: ${r.standard}`);
      if(r.auditTier?.length) lines.push(`     🏗 Verified by: ${r.auditTier.join(", ")}`);
    });
    lines.push("");
  }
  const maintain=tasks.filter(x=>x.disposition==="MAINTAIN");
  const push=tasks.filter(x=>x.disposition==="PUSH_DOWN");
  const elim=tasks.filter(x=>x.disposition==="ELIMINATE");
  const ff=tasks.filter(x=>x.isFirefighting);
  if(maintain.length){lines.push(`── ${t.maintain} ──`);maintain.forEach(x=>lines.push(`  ✓ ${x.description} (${x.minutes||0}min)`));lines.push("");}
  if(push.length){lines.push(`── ${t.pushDown} ──`);push.forEach(x=>{lines.push(`  ↓ ${x.description}`);if(x.pushToLevel)lines.push(`     ${t.delegateTo} ${ll(x.pushToLevel)}`);if(x.pushNote)lines.push(`     ${x.pushNote}`);});lines.push("");}
  if(elim.length){lines.push(`── ${t.eliminate} ──`);elim.forEach(x=>{lines.push(`  ✕ ${x.description}`);if(x.eliminateNote)lines.push(`     ${x.eliminateNote}`);});lines.push("");}
  if(ff.length){lines.push(`── ${t.ffAnalysis} ──`);ff.forEach(x=>{lines.push(`  🔥 ${x.description} (${x.minutes||0}min)`);if(x.firefightingCause)lines.push(`     Cause: ${x.firefightingCause}`);if(x.firefightingNote)lines.push(`     ${x.firefightingNote}`);});lines.push("");}
  if(watchItems.length){lines.push(`── ${t.watchTitle} ──`);watchItems.forEach(w=>{lines.push(`  [${w.cat}] ${w.text}`);if(w.threshold)lines.push(`     Alert: ${w.threshold}`);if(w.checkBy?.length)lines.push(`     Check: ${w.checkBy.join(", ")}`);if(w.timesPerDay)lines.push(`     ${w.timesPerDay}x/day`);if(w.auditNote)lines.push(`     Action: ${w.auditNote}`);});lines.push("");}
  return lines.join("\n");
};
const dlText=(c,n)=>{const a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([c],{type:"text/plain"})),download:n});a.click();URL.revokeObjectURL(a.href);};

// ─── STYLES ──────────────────────────────────────────────────
const S={
  label:{display:"block",fontSize:10,letterSpacing:1.5,color:"#94a3b8",marginBottom:5,fontWeight:700},
  input:{width:"100%",background:"#111827",border:"1px solid #374151",color:"#f9fafb",borderRadius:6,padding:"8px 10px",fontSize:13,fontFamily:"inherit",outline:"none"},
  pill:{background:"transparent",border:"1px solid #374151",color:"#94a3b8",borderRadius:20,padding:"5px 12px",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:700},
  card:{background:"#0f172a",border:"1px solid #1f2937",borderRadius:10,marginBottom:10},
  ab:{background:"#0a0f1a",border:"1px solid",borderRadius:10,padding:16,marginBottom:14},
};

// ─── TASK CARD ────────────────────────────────────────────────
function TaskCard({task,onUpdate,onDelete,level,lang,t,autoOpen}){
  const [open,setOpen]=useState(!!autoOpen);
  const [aiResp,setAiResp]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const d=task.disposition?DISPOSITIONS[task.disposition]:null;
  const accent=LC[level];
  const timeBins=T[lang].timeBins;

  const runAI=async()=>{
    setAiLoad(true);setAiResp("");
    const ctx=`Leader level: ${LL[level]?.en}. Task: "${task.description}". Category: ${task.category||"none"}. Time: ${task.minutes||"?"}min. Firefighting?: ${task.isFirefighting?"Yes":"No"}. ${task.firefightingCause?`Root cause: ${task.firefightingCause}.`:""} Disposition: ${task.disposition?DISPOSITIONS[task.disposition]?.en:"unclassified"}. ${task.notes?`Notes: ${task.notes}`:""}.`;
    const r=await getAICoaching(ctx,lang);
    setAiResp(r||t.aiError);setAiLoad(false);
  };

  return(
    <div style={{...S.card,border:`1px solid ${d?d.color+"55":"#1f2937"}`,transition:"border-color 0.3s"}}>
      <div style={{padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}} onClick={()=>setOpen(!open)}>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
            <span style={{fontSize:13,color:"#f9fafb",fontWeight:500}}>{task.description||<em style={{color:"#4b5563"}}>...</em>}</span>
            {task.isFirefighting&&<span style={{fontSize:10,background:"#7c2d1222",color:"#f97316",border:"1px solid #f9731644",padding:"1px 7px",borderRadius:3,fontWeight:700}}>🔥</span>}
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {task.category&&<span style={{fontSize:11,color:"#6b7280"}}>{task.category}</span>}
            {task.minutes>0&&<span style={{fontSize:11,color:"#6b7280"}}>· {task.minutes}min</span>}
            {task.timeBin&&<span style={{fontSize:11,color:"#6b7280"}}>· {task.timeBin}</span>}
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {d&&<span style={{background:d.bg,color:d.color,border:`1px solid ${d.color}88`,padding:"3px 9px",borderRadius:4,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{d.icon} {d[lang]}</span>}
          <span style={{color:"#4b5563",fontSize:11}}>{open?"▲":"▼"}</span>
        </div>
      </div>
      {open&&(
        <div style={{padding:"0 16px 16px",borderTop:"1px solid #1f2937"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginTop:14}}>
            <div style={{gridColumn:"1/-1"}}>
              <label style={S.label}>{t.description}</label>
              <input style={S.input} value={task.description} onChange={e=>onUpdate({...task,description:e.target.value})}/>
            </div>
            <div>
              <label style={S.label}>{t.category}</label>
              <select style={S.input} value={task.category} onChange={e=>onUpdate({...task,category:e.target.value})}>
                <option value="">{t.selectCat}</option>
                {CATS[lang].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>{t.timeSpent}</label>
              <input style={S.input} type="number" value={task.minutes||""} onChange={e=>onUpdate({...task,minutes:parseInt(e.target.value)||0})} placeholder="0"/>
            </div>
            <div>
              <label style={S.label}>{t.timeBin}</label>
              <select style={S.input} value={task.timeBin||""} onChange={e=>onUpdate({...task,timeBin:e.target.value})}>
                <option value="">{t.selectCat}</option>
                {timeBins.map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>{t.whoInvolved}</label>
              <input style={S.input} value={task.owner||""} onChange={e=>onUpdate({...task,owner:e.target.value})}/>
            </div>
          </div>
          <div style={{marginTop:12}}>
            <label style={S.label}>{t.isFF}</label>
            <div style={{display:"flex",gap:8}}>
              {[t.yes,t.no].map((v,i)=>(
                <button key={v} onClick={()=>onUpdate({...task,isFirefighting:i===0})}
                  style={{...S.pill,...(task.isFirefighting===(i===0)?{background:"#7c2d1266",color:"#f97316",borderColor:"#f97316"}:{})}}>{v}</button>
              ))}
            </div>
          </div>
          {task.isFirefighting&&(
            <div style={{marginTop:12,background:"#1c0a0288",border:"1px solid #f9731644",borderRadius:8,padding:14}}>
              <label style={{...S.label,color:"#f97316"}}>🔥 {t.ffCause}</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>
                {FF_CAUSES[lang].map(c=>(
                  <button key={c} onClick={()=>onUpdate({...task,firefightingCause:c})}
                    style={{...S.pill,fontSize:10,...(task.firefightingCause===c?{background:"#7c2d1266",color:"#f97316",borderColor:"#f97316"}:{})}}>{c}</button>
                ))}
              </div>
              <textarea style={{...S.input,marginTop:10,height:56,resize:"vertical"}} value={task.firefightingNote||""} onChange={e=>onUpdate({...task,firefightingNote:e.target.value})} placeholder={t.ffNote}/>
            </div>
          )}
          <div style={{marginTop:12}}>
            <label style={S.label}>{t.disposition}</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {Object.entries(DISPOSITIONS).map(([k,d])=>(
                <button key={k} onClick={()=>onUpdate({...task,disposition:k})}
                  style={{...S.pill,...(task.disposition===k?{background:d.bg,color:d.color,borderColor:d.color}:{})}}>{d.icon} {d[lang]}</button>
              ))}
            </div>
            {task.disposition==="PUSH_DOWN"&&(
              <div style={{marginTop:10,background:"#1c100288",border:"1px solid #d9770644",borderRadius:6,padding:12}}>
                <label style={{...S.label,color:"#d97706"}}>{t.pushTo}</label>
                <select style={S.input} value={task.pushToLevel||""} onChange={e=>onUpdate({...task,pushToLevel:e.target.value})}>
                  <option value="">{t.selectLevel}</option>
                  {LEVELS.map(l=><option key={l} value={l}>{LL[l][lang]}</option>)}
                </select>
                <textarea style={{...S.input,marginTop:8,height:50,resize:"vertical"}} value={task.pushNote||""} onChange={e=>onUpdate({...task,pushNote:e.target.value})} placeholder={t.pushNote}/>
              </div>
            )}
            {task.disposition==="ELIMINATE"&&(
              <textarea style={{...S.input,marginTop:8,height:50,resize:"vertical"}} value={task.eliminateNote||""} onChange={e=>onUpdate({...task,eliminateNote:e.target.value})} placeholder={t.eliminateNote}/>
            )}
          </div>
          <div style={{marginTop:12}}>
            <label style={S.label}>{t.notes}</label>
            <textarea style={{...S.input,height:54,resize:"vertical"}} value={task.notes||""} onChange={e=>onUpdate({...task,notes:e.target.value})}/>
          </div>
          <div style={{marginTop:14,background:"#0a0f1a",border:`1px solid ${accent}44`,borderRadius:8,padding:12}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:aiResp?8:0}}>
              <span style={{fontSize:10,letterSpacing:2,color:accent,fontWeight:700}}>✦ {t.aiCoach}</span>
              <button onClick={runAI} disabled={aiLoad} style={{background:accent+"22",border:`1px solid ${accent}66`,color:accent,borderRadius:6,padding:"5px 12px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",opacity:aiLoad?0.6:1}}>
                {aiLoad?t.aiThinking:t.aiCoachBtn}
              </button>
            </div>
            {aiResp&&<p style={{fontSize:12,color:"#cbd5e1",lineHeight:1.7,marginTop:8,borderTop:`1px solid ${accent}33`,paddingTop:8}}>{aiResp}</p>}
          </div>
          <button onClick={onDelete} style={{marginTop:10,background:"transparent",border:"1px solid #dc262644",color:"#dc2626",borderRadius:6,padding:"5px 12px",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{t.remove}</button>
        </div>
      )}
    </div>
  );
}

// ─── REQUIRED CARD ────────────────────────────────────────────
function RequiredCard({item,onUpdate,onDelete,lang,t,accent}){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState({...item,auditTier:item.auditTier||[]});
  const save=()=>{onUpdate(draft);setEditing(false);};
  const toggleAudit=l=>setDraft(p=>({...p,auditTier:p.auditTier.includes(l)?p.auditTier.filter(x=>x!==l):[...p.auditTier,l]}));

  const freqLabel=()=>{
    let f=item.freq||"";
    if((f==="Weekly"||f==="Semanal")&&item.dayOfWeek) f+=` · ${item.dayOfWeek}`;
    if((f==="Monthly"||f==="Mensual")&&item.dayOfMonth) f+=` · Day ${item.dayOfMonth}`;
    return f;
  };

  if(!editing) return(
    <div style={{...S.card,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
      <div style={{flex:1}}>
        <div style={{fontSize:13,color:"#f9fafb",fontWeight:500,marginBottom:5}}>{item.text}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:item.standard?4:0}}>
          {item.freq&&<span style={{fontSize:10,background:accent+"22",color:accent,border:`1px solid ${accent}44`,padding:"2px 8px",borderRadius:3}}>{freqLabel()}</span>}
          {item.timeOfDay&&<span style={{fontSize:11,color:"#6b7280"}}>⏰ {item.timeOfDay}</span>}
          {item.duration&&<span style={{fontSize:11,color:"#6b7280"}}>· {item.duration}min</span>}
          {item.owner&&<span style={{fontSize:11,color:"#6b7280"}}>· {item.owner}</span>}
          {item.auditTier?.length>0&&<span style={{fontSize:10,color:"#a855f7",background:"#a855f722",border:"1px solid #a855f744",padding:"2px 8px",borderRadius:3}}>🏗 {item.auditTier.join(", ")}</span>}
        </div>
        {item.standard&&<div style={{fontSize:11,color:"#475569",fontStyle:"italic"}}>→ {item.standard}</div>}
      </div>
      <div style={{display:"flex",gap:6,flexShrink:0}}>
        <button onClick={()=>setEditing(true)} style={{...S.pill,fontSize:10,padding:"4px 10px"}}>{t.editActivity}</button>
        <button onClick={onDelete} style={{background:"transparent",border:"none",color:"#4b5563",cursor:"pointer",fontSize:16}}>✕</button>
      </div>
    </div>
  );

  const isWeekly=(draft.freq==="Weekly"||draft.freq==="Semanal");
  const isMonthly=(draft.freq==="Monthly"||draft.freq==="Mensual");

  return(
    <div style={{...S.card,padding:16,border:`1px solid ${accent}55`}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
        <div style={{gridColumn:"1/-1"}}>
          <label style={S.label}>{t.description}</label>
          <input style={S.input} value={draft.text} onChange={e=>setDraft(p=>({...p,text:e.target.value}))}/>
        </div>
        <div>
          <label style={S.label}>{t.freq}</label>
          <select style={S.input} value={draft.freq||""} onChange={e=>setDraft(p=>({...p,freq:e.target.value}))}>
            <option value="">{t.selectCat}</option>
            {t.freqOpts.map(f=><option key={f}>{f}</option>)}
          </select>
        </div>
        {isWeekly&&(
          <div>
            <label style={S.label}>{t.dayOfWeek}</label>
            <select style={S.input} value={draft.dayOfWeek||""} onChange={e=>setDraft(p=>({...p,dayOfWeek:e.target.value}))}>
              <option value="">{t.selectCat}</option>
              {t.weekdays.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
        )}
        {isMonthly&&(
          <div>
            <label style={S.label}>{t.dayOfMonth}</label>
            <input style={S.input} type="number" min={1} max={31} value={draft.dayOfMonth||""} onChange={e=>setDraft(p=>({...p,dayOfMonth:e.target.value}))} placeholder="1–31"/>
          </div>
        )}
        <div>
          <label style={S.label}>{t.timeOfDay}</label>
          <input style={S.input} value={draft.timeOfDay||""} onChange={e=>setDraft(p=>({...p,timeOfDay:e.target.value}))} placeholder="06:30"/>
        </div>
        <div>
          <label style={S.label}>{t.duration}</label>
          <input style={S.input} type="number" value={draft.duration||""} onChange={e=>setDraft(p=>({...p,duration:e.target.value}))}/>
        </div>
        <div>
          <label style={S.label}>{t.owner}</label>
          <input style={S.input} value={draft.owner||""} onChange={e=>setDraft(p=>({...p,owner:e.target.value}))}/>
        </div>
        <div style={{gridColumn:"1/-1"}}>
          <label style={S.label}>{t.standard}</label>
          <textarea style={{...S.input,height:54,resize:"vertical"}} value={draft.standard||""} onChange={e=>setDraft(p=>({...p,standard:e.target.value}))} placeholder={lang==="es"?"¿Cómo se ve bien hecho?":"What does good look like?"}/>
        </div>
        <div style={{gridColumn:"1/-1"}}>
          <label style={S.label}>{t.auditTier} <span style={{color:"#4b5563",fontWeight:400,letterSpacing:0}}>— {t.auditTierHint}</span></label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
            {LEVELS.map(l=>(
              <button key={l} onClick={()=>toggleAudit(l)}
                style={{...S.pill,fontSize:10,...(draft.auditTier.includes(l)?{background:LC[l]+"33",color:LC[l],borderColor:LC[l]}:{})}}>{LL[l][lang]}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button onClick={save} style={{background:accent,border:"none",color:"#000",borderRadius:6,padding:"7px 16px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>{t.saveActivity}</button>
        <button onClick={()=>setEditing(false)} style={{...S.pill}}>{lang==="es"?"Cancelar":"Cancel"}</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App(){
  const [lang,setLang]=useState("en");
  const t=T[lang];
  const [activeLevel,setActiveLevel]=useState("Supervisor");
  const [activeTab,setActiveTab]=useState("log");
  const [tasksByLevel,setTasksByLevel]=useState({"Team Member":[],"Team Leader":[],"Supervisor":[],"Manager":[]});
  const [requiredByLevel,setRequiredByLevel]=useState({"Team Member":[],"Team Leader":[],"Supervisor":[],"Manager":[]});
  const [watchByLevel,setWatchByLevel]=useState({"Team Member":[],"Team Leader":[],"Supervisor":[],"Manager":[]});
  const [reflections,setReflections]=useState({});
  const [newDesc,setNewDesc]=useState("");
  const [newTaskId,setNewTaskId]=useState(null);
  const [newReq,setNewReq]=useState({text:"",freq:"",timeOfDay:"",duration:"",owner:"",standard:"",dayOfWeek:"",dayOfMonth:"",auditTier:[]});
  const [newWatch,setNewWatch]=useState({text:"",cat:"",threshold:"",checkBy:[],timesPerDay:1,auditNote:""});
  const [expandedWatch,setExpandedWatch]=useState(null);
  const [notification,setNotification]=useState(null);
  const [guideAI,setGuideAI]=useState({});
  const [guideAILoad,setGuideAILoad]=useState({});
  const [showLogHints,setShowLogHints]=useState(false);
  const [newReqFreq,setNewReqFreq]=useState("");

  const notify=msg=>{setNotification(msg);setTimeout(()=>setNotification(null),2500);};
  const accent=LC[activeLevel];

  // Auto-load supervisor template when Supervisor selected and required is empty
  useEffect(()=>{
    if(activeLevel==="Supervisor"&&(requiredByLevel["Supervisor"]||[]).length===0){
      const tpl=(lang==="es"?SUPERVISOR_TEMPLATE_ES:SUPERVISOR_TEMPLATE_EN).map(x=>({...x,id:uid()}));
      setRequiredByLevel(p=>({...p,"Supervisor":tpl}));
    }
  },[activeLevel]);
  const tasks=tasksByLevel[activeLevel]||[];
  const setTasks=fn=>setTasksByLevel(p=>({...p,[activeLevel]:typeof fn==="function"?fn(p[activeLevel]):fn}));
  const required=requiredByLevel[activeLevel]||[];
  const setRequired=fn=>setRequiredByLevel(p=>({...p,[activeLevel]:typeof fn==="function"?fn(p[activeLevel]):fn}));
  const watchItems=watchByLevel[activeLevel]||[];
  const setWatch=fn=>setWatchByLevel(p=>({...p,[activeLevel]:typeof fn==="function"?fn(p[activeLevel]):fn}));

  const addTask=()=>{
    if(!newDesc.trim())return;
    const id=uid();
    setTasks(p=>[...p,{id,description:newDesc,category:"",minutes:0,isFirefighting:false,disposition:null,notes:"",owner:"",timeBin:""}]);
    setNewTaskId(id);setNewDesc("");
  };

  const addRequired=()=>{
    if(!newReq.text.trim())return;
    setRequired(p=>[...p,{id:uid(),...newReq,auditTier:newReq.auditTier||[]}]);
    setNewReq({text:"",freq:"",timeOfDay:"",duration:"",owner:"",standard:"",dayOfWeek:"",dayOfMonth:"",auditTier:[]});
    setNewReqFreq("");notify(t.saving);
  };

  const loadTemplate=()=>{
    const tpl=(lang==="es"?SUPERVISOR_TEMPLATE_ES:SUPERVISOR_TEMPLATE_EN).map(x=>({...x,id:uid()}));
    setRequired(tpl);notify(t.templateLoaded);
  };

  const addWatch=()=>{
    if(!newWatch.text.trim())return;
    setWatch(p=>[...p,{id:uid(),...newWatch}]);
    setNewWatch({text:"",cat:"",threshold:"",checkBy:[],timesPerDay:1,auditNote:""});
    notify(t.saving);
  };

  const toggleCheckBy=l=>setNewWatch(p=>({...p,checkBy:p.checkBy.includes(l)?p.checkBy.filter(x=>x!==l):[...p.checkBy,l]}));
  const toggleWatchCheckBy=(id,l)=>setWatch(p=>p.map(w=>w.id===id?{...w,checkBy:w.checkBy?.includes(l)?w.checkBy.filter(x=>x!==l):[...(w.checkBy||[]),l]}:w));
  const toggleAuditNew=l=>setNewReq(p=>({...p,auditTier:p.auditTier?.includes(l)?p.auditTier.filter(x=>x!==l):[...(p.auditTier||[]),l]}));

  const totalMins=tasks.reduce((s,x)=>s+(x.minutes||0),0);
  const ffMins=tasks.filter(x=>x.isFirefighting).reduce((s,x)=>s+(x.minutes||0),0);
  const wrongMins=tasks.filter(x=>x.disposition==="PUSH_DOWN").reduce((s,x)=>s+(x.minutes||0),0);

  const handleExport=()=>{
    const c=buildExport(tasks,required,watchItems,reflections,activeLevel,lang,t);
    dlText(c,`LSW_${LL[activeLevel][lang].replace(/\s/g,"_")}_${new Date().toISOString().slice(0,10)}.txt`);
    notify(t.saving);
  };

  const runGuideAI=async(level,qIdx,question,reflection)=>{
    const key=`${level}_${qIdx}`;
    setGuideAILoad(p=>({...p,[key]:true}));setGuideAI(p=>({...p,[key]:""}));
    const ctx=`Leader level: ${LL[level]?.en}. Coach question: "${question}". Leader's reflection: "${reflection||"(no response)"}". Analyze — wrong-level work? Unsystematic firefighting? Good practice? One probing follow-up.`;
    const r=await getAICoaching(ctx,lang);
    setGuideAI(p=>({...p,[key]:r||t.aiError}));setGuideAILoad(p=>({...p,[key]:false}));
  };

  const tabBtn=id=>({padding:"8px 12px",borderRadius:"6px 6px 0 0",cursor:"pointer",fontSize:10,fontWeight:700,letterSpacing:1,border:"none",fontFamily:"inherit",background:activeTab===id?"#0f172a":"transparent",color:activeTab===id?accent:"#4b5563",borderBottom:activeTab===id?`2px solid ${accent}`:"2px solid transparent"});

  // ── LSW Schedule builder ─────────────────────────────────────
  const buildLSW=()=>{
    const bins=t.timeBins;
    return bins.map(bin=>{
      const reqItems=required.filter(r=>{
        const f=r.freq||"";
        if(bin===bins[5]) return f==="Monthly"||f==="Mensual";
        if(bin===bins[4]) return f==="Weekly"||f==="Semanal";
        if(bin===bins[0]) return r.timeBin===bins[0]||(f.includes("Shift")||f.includes("Turno"))&&r.timeBin!==bins[3];
        return r.timeBin===bin;
      });
      const taskItems=tasks.filter(x=>x.disposition==="MAINTAIN"&&x.timeBin===bin);
      const auditItems=required.filter(r=>r.auditTier?.length>0&&(r.timeBin===bin||(bin===bins[4]&&(r.freq==="Weekly"||r.freq==="Semanal"))));
      return{bin,reqItems,taskItems,auditItems};
    });
  };

  const isWeeklyNew=(newReqFreq==="Weekly"||newReqFreq==="Semanal");
  const isMonthlyNew=(newReqFreq==="Monthly"||newReqFreq==="Mensual");

  return(
    <div style={{minHeight:"100vh",background:"#060b12",fontFamily:"'DM Mono','Courier New',monospace",color:"#e2e8f0"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Barlow+Condensed:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input:focus,select:focus,textarea:focus{outline:none;border-color:#3b82f6!important}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1f2937}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp 0.25s ease}
        @keyframes sIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}
        .notif{animation:sIn 0.3s ease}
      `}</style>

      {notification&&<div className="notif" style={{position:"fixed",top:14,right:14,background:"#16a34a",color:"#fff",padding:"9px 16px",borderRadius:8,fontSize:12,fontWeight:700,zIndex:999,letterSpacing:1}}>✓ {notification}</div>}

      {/* HEADER */}
      <div style={{background:"#080e18",borderBottom:"1px solid #0f1925",padding:"12px 16px"}}>
        <div style={{maxWidth:880,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,letterSpacing:2,color:"#f9fafb"}}>{t.appTitle}</div>
            <div style={{fontSize:9,letterSpacing:3,color:"#374151",marginTop:1}}>{t.appSub}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",background:"#111827",border:"1px solid #1f2937",borderRadius:20,overflow:"hidden"}}>
              {["en","es"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{padding:"6px 14px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:700,background:lang===l?accent:"transparent",color:lang===l?"#000":"#6b7280",transition:"all 0.2s"}}>{l.toUpperCase()}</button>
              ))}
            </div>
            {totalMins>0&&(
              <div style={{display:"flex",gap:6}}>
                <StatBadge val={`${totalMins}m`} label={t.logged} color="#6b7280"/>
                {ffMins>0&&<StatBadge val={`${Math.round((ffMins/totalMins)*100)}%`} label={t.firefighting} color="#f97316"/>}
                {wrongMins>0&&<StatBadge val={`${Math.round((wrongMins/totalMins)*100)}%`} label={t.wrongLevel} color="#d97706"/>}
              </div>
            )}
            <button onClick={handleExport} style={{background:accent+"22",border:`1px solid ${accent}66`,color:accent,borderRadius:6,padding:"7px 14px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",letterSpacing:1}}>↓ {t.exportLSW}</button>
          </div>
        </div>
      </div>

      {/* LEVEL */}
      <div style={{background:"#080e18",borderBottom:"1px solid #0f1925",padding:"10px 16px"}}>
        <div style={{maxWidth:880,margin:"0 auto",display:"flex",gap:6,alignItems:"center",overflowX:"auto",paddingBottom:2}}>
          <span style={{fontSize:9,color:"#374151",letterSpacing:2,marginRight:4}}>{t.loggingFor}</span>
          {LEVELS.map(l=>(
            <button key={l} onClick={()=>setActiveLevel(l)} style={{padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:10,fontWeight:700,letterSpacing:1,border:`1px solid ${activeLevel===l?LC[l]:"#1f2937"}`,background:activeLevel===l?LC[l]+"22":"transparent",color:activeLevel===l?LC[l]:"#4b5563",fontFamily:"inherit",transition:"all 0.2s"}}>
              {LL[l][lang].toUpperCase()}
              {tasksByLevel[l].length>0&&<span style={{marginLeft:5,background:LC[l]+"33",color:LC[l],borderRadius:10,padding:"1px 5px",fontSize:9}}>{tasksByLevel[l].length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{background:"#060b12",borderBottom:"1px solid #0f1925",padding:"0 16px",overflowX:"auto"}}>
        <div style={{maxWidth:880,margin:"0 auto",display:"flex",gap:2,minWidth:"max-content"}}>
          {Object.entries(t.tabs).map(([id,label])=>(
            <button key={id} style={tabBtn(id)} onClick={()=>setActiveTab(id)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"18px 16px",maxWidth:880,margin:"0 auto"}}>

        {/* ── LOG TASKS ── */}
        {activeTab==="log"&&(
          <div className="fade">
            {/* Instructions */}
            <div style={{background:"#0a0f1a",border:`1px solid ${accent}44`,borderRadius:10,marginBottom:16,overflow:"hidden"}}>
              <button onClick={()=>setShowLogHints(!showLogHints)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"transparent",border:"none",cursor:"pointer",color:accent,fontFamily:"inherit"}}>
                <span style={{fontSize:10,letterSpacing:2,fontWeight:700}}>? {t.logInstructions} — {LL[activeLevel][lang].toUpperCase()}</span>
                <span style={{fontSize:11}}>{showLogHints?"▲":"▼"}</span>
              </button>
              {showLogHints&&(
                <div style={{padding:"0 16px 16px",borderTop:`1px solid ${accent}22`}}>
                  {(t.logHints[activeLevel]||[]).map((h,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginTop:8}}>
                      <span style={{color:accent,flexShrink:0,marginTop:1}}>·</span>
                      <span style={{fontSize:12,color:"#94a3b8",lineHeight:1.6}}>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{display:"flex",gap:10,marginBottom:20}}>
              <input style={{...S.input,flex:1,fontSize:13}} value={newDesc}
                onChange={e=>setNewDesc(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addTask()}
                placeholder={`${t.addTask} ${LL[activeLevel][lang]}? ${t.addTaskHint}`}/>
              <button onClick={addTask} style={{background:newDesc.trim()?accent:"#1f2937",border:"none",color:newDesc.trim()?"#000":"#374151",borderRadius:6,padding:"0 18px",cursor:"pointer",fontSize:20,fontWeight:900,fontFamily:"inherit",minWidth:48}}>✓</button>
            </div>

            {tasks.length===0?(
              <div style={{textAlign:"center",padding:"50px 0",color:"#1f2937"}}>
                <div style={{fontSize:36,marginBottom:10}}>📋</div>
                <div style={{fontFamily:"'Barlow Condensed'",fontSize:20,letterSpacing:2,color:"#374151"}}>{t.noTasks}</div>
                <div style={{fontSize:11,marginTop:6,color:"#1f2937"}}>{t.noTasksSub}</div>
              </div>
            ):(
              <>
                <div style={{fontSize:10,color:"#4b5563",letterSpacing:1,marginBottom:10}}>{tasks.length} {t.taskCount}</div>
                {tasks.map(task=>(
                  <div key={task.id} className="fade">
                    <TaskCard task={task} onUpdate={u=>setTasks(p=>p.map(x=>x.id===u.id?u:x))} onDelete={()=>setTasks(p=>p.filter(x=>x.id!==task.id))} level={activeLevel} lang={lang} t={t} autoOpen={task.id===newTaskId}/>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ── MY LSW ── */}
        {activeTab==="lsw"&&(
          <div className="fade">
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:800,letterSpacing:2,color:accent,marginBottom:4}}>{t.lswTitle}</div>
              <div style={{fontSize:11,color:"#6b7280"}}>{t.lswSub}</div>
            </div>
            {(required.length===0&&tasks.filter(x=>x.disposition==="MAINTAIN").length===0)?(
              <div style={{textAlign:"center",color:"#374151",padding:40,fontSize:12}}>{t.noLSW}</div>
            ):(
              <>
                {buildLSW().map(({bin,reqItems,taskItems,auditItems})=>{
                  if(!reqItems.length&&!taskItems.length) return null;
                  return(
                    <div key={bin} style={{marginBottom:20}}>
                      <div style={{fontSize:10,letterSpacing:2,color:accent,fontWeight:700,marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${accent}33`}}>{bin.toUpperCase()}</div>
                      {reqItems.map(r=>{
                        let freqBadge=r.freq||"";
                        if((r.freq==="Weekly"||r.freq==="Semanal")&&r.dayOfWeek) freqBadge+=` · ${r.dayOfWeek}`;
                        if((r.freq==="Monthly"||r.freq==="Mensual")&&r.dayOfMonth) freqBadge+=` · Day ${r.dayOfMonth}`;
                        return(
                          <div key={r.id} style={{display:"flex",gap:10,padding:"11px 14px",background:"#0f172a",border:`1px solid ${accent}33`,borderRadius:8,marginBottom:6,alignItems:"flex-start"}}>
                            <div style={{minWidth:48,textAlign:"center",background:accent+"22",borderRadius:6,padding:"4px 6px",flexShrink:0}}>
                              <div style={{fontSize:10,color:accent,fontWeight:700}}>{r.timeOfDay||"—"}</div>
                              {r.duration&&<div style={{fontSize:9,color:"#6b7280"}}>{r.duration}m</div>}
                            </div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:13,color:"#f9fafb",fontWeight:500,marginBottom:3}}>{r.text}</div>
                              {r.standard&&<div style={{fontSize:11,color:"#6b7280",fontStyle:"italic",marginBottom:3}}>→ {r.standard}</div>}
                              {r.auditTier?.length>0&&(
                                <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:3}}>
                                  <span style={{fontSize:9,color:"#a855f7",letterSpacing:1,marginRight:2}}>🏗 VERIFY:</span>
                                  {r.auditTier.map(l=>(
                                    <span key={l} style={{fontSize:9,background:LC[l]+"33",color:LC[l],border:`1px solid ${LC[l]}44`,padding:"1px 6px",borderRadius:3}}>{LL[l][lang]}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end",flexShrink:0}}>
                              <span style={{fontSize:9,background:accent+"22",color:accent,border:`1px solid ${accent}44`,padding:"2px 7px",borderRadius:3,whiteSpace:"nowrap"}}>{freqBadge}</span>
                              <div style={{width:22,height:22,border:"2px solid #374151",borderRadius:4,background:"#0a0f1a"}}/>
                            </div>
                          </div>
                        );
                      })}
                      {taskItems.map(x=>(
                        <div key={x.id} style={{display:"flex",gap:10,padding:"10px 14px",background:"#052e1622",border:"1px solid #16a34a33",borderRadius:8,marginBottom:6,alignItems:"center"}}>
                          <span style={{color:"#16a34a",fontSize:14,flexShrink:0}}>✓</span>
                          <div style={{flex:1}}>
                            <div style={{fontSize:13,color:"#f9fafb"}}>{x.description}</div>
                            {x.category&&<div style={{fontSize:11,color:"#6b7280",marginTop:1}}>{x.category}{x.minutes?` · ${x.minutes}min`:""}</div>}
                          </div>
                          <div style={{width:22,height:22,border:"2px solid #374151",borderRadius:4,background:"#0a0f1a",flexShrink:0}}/>
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Layered Audit Summary in LSW */}
                {required.some(r=>r.auditTier?.length>0)&&(
                  <div style={{marginTop:8,background:"#0a0f1a",border:"1px solid #a855f744",borderRadius:12,padding:18}}>
                    <div style={{fontSize:10,letterSpacing:2,color:"#a855f7",fontWeight:700,marginBottom:4}}>🏗 {t.lswLayeredAudit}</div>
                    <div style={{fontSize:11,color:"#6b7280",marginBottom:14}}>{t.layeredAuditDesc}</div>
                    {LEVELS.slice().reverse().map(level=>{
                      const assigned=required.filter(r=>r.auditTier?.includes(level));
                      if(!assigned.length) return null;
                      return(
                        <div key={level} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                          <div style={{minWidth:80,fontSize:9,color:LC[level],fontWeight:700,letterSpacing:1,background:LC[level]+"22",border:`1px solid ${LC[level]}44`,borderRadius:4,padding:"3px 8px",textAlign:"center",flexShrink:0}}>{LL[level][lang].toUpperCase()}</div>
                          <div style={{flex:1}}>
                            {assigned.map(r=>{
                              let fb=r.freq||"";
                              if((r.freq==="Weekly"||r.freq==="Semanal")&&r.dayOfWeek) fb+=` · ${r.dayOfWeek}`;
                              if((r.freq==="Monthly"||r.freq==="Mensual")&&r.dayOfMonth) fb+=` · Day ${r.dayOfMonth}`;
                              return(
                                <div key={r.id} style={{display:"flex",gap:6,alignItems:"center",marginBottom:4}}>
                                  <div style={{width:5,height:5,borderRadius:"50%",background:LC[level],flexShrink:0}}/>
                                  <span style={{fontSize:12,color:"#94a3b8"}}>{r.text}</span>
                                  {fb&&<span style={{fontSize:9,color:"#4b5563"}}>· {fb}</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── REQUIRED ACTIVITIES ── */}
        {activeTab==="required"&&(
          <div className="fade">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:8}}>
              <p style={{fontSize:12,color:"#6b7280",lineHeight:1.7,flex:1}}>{t.requiredSub}</p>
              {activeLevel==="Supervisor"&&(
                <button onClick={loadTemplate} style={{background:"#a855f722",border:"1px solid #a855f744",color:"#a855f7",borderRadius:6,padding:"8px 14px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  ⚡ {t.loadTemplate}
                </button>
              )}
            </div>

            {/* Add Form */}
            <div style={{background:"#0f172a",border:`1px solid ${accent}44`,borderRadius:10,padding:16,marginBottom:20}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,marginBottom:12}}>
                <input style={S.input} value={newReq.text} onChange={e=>setNewReq(p=>({...p,text:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&addRequired()} placeholder={t.addRequired}/>
                <button onClick={addRequired} style={{background:accent,border:"none",color:"#000",borderRadius:6,padding:"0 16px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",whiteSpace:"nowrap"}}>{t.addActivity}</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10}}>
                <div>
                  <label style={S.label}>{t.freq}</label>
                  <select style={S.input} value={newReqFreq}
                    onChange={e=>{setNewReqFreq(e.target.value);setNewReq(p=>({...p,freq:e.target.value}))}}>
                    <option value="">{t.selectCat}</option>
                    {t.freqOpts.map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
                {isWeeklyNew&&(
                  <div>
                    <label style={S.label}>{t.dayOfWeek}</label>
                    <select style={S.input} value={newReq.dayOfWeek} onChange={e=>setNewReq(p=>({...p,dayOfWeek:e.target.value}))}>
                      <option value="">{t.selectCat}</option>
                      {t.weekdays.map(d=><option key={d}>{d}</option>)}
                    </select>
                  </div>
                )}
                {isMonthlyNew&&(
                  <div>
                    <label style={S.label}>{t.dayOfMonth}</label>
                    <input style={S.input} type="number" min={1} max={31} value={newReq.dayOfMonth} onChange={e=>setNewReq(p=>({...p,dayOfMonth:e.target.value}))} placeholder="1–31"/>
                  </div>
                )}
                <div>
                  <label style={S.label}>{t.timeOfDay}</label>
                  <input style={S.input} value={newReq.timeOfDay} onChange={e=>setNewReq(p=>({...p,timeOfDay:e.target.value}))} placeholder="06:30"/>
                </div>
                <div>
                  <label style={S.label}>{t.duration}</label>
                  <input style={S.input} type="number" value={newReq.duration} onChange={e=>setNewReq(p=>({...p,duration:e.target.value}))}/>
                </div>
                <div>
                  <label style={S.label}>{t.owner}</label>
                  <input style={S.input} value={newReq.owner} onChange={e=>setNewReq(p=>({...p,owner:e.target.value}))} placeholder={LL[activeLevel][lang]}/>
                </div>
                <div style={{gridColumn:"1/-1"}}>
                  <label style={S.label}>{t.standard}</label>
                  <input style={S.input} value={newReq.standard} onChange={e=>setNewReq(p=>({...p,standard:e.target.value}))} placeholder={lang==="es"?"¿Cómo se ve bien hecho?":"What does good look like?"}/>
                </div>
                <div style={{gridColumn:"1/-1"}}>
                  <label style={S.label}>{t.auditTier} <span style={{color:"#4b5563",fontWeight:400,letterSpacing:0}}>— {t.auditTierHint}</span></label>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
                    {LEVELS.map(l=>(
                      <button key={l} onClick={()=>toggleAuditNew(l)}
                        style={{...S.pill,fontSize:10,...(newReq.auditTier?.includes(l)?{background:LC[l]+"33",color:LC[l],borderColor:LC[l]}:{})}}>{LL[l][lang]}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {required.length===0?(
              <div style={{textAlign:"center",color:"#374151",padding:30,fontSize:12}}>
                {lang==="es"?"Agrega tu primera actividad o carga la plantilla.":"Add your first activity or load the template."}
                {activeLevel==="Supervisor"&&<div style={{marginTop:10}}><button onClick={loadTemplate} style={{background:accent+"22",border:`1px solid ${accent}66`,color:accent,borderRadius:6,padding:"8px 16px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit"}}>⚡ {t.loadTemplate}</button></div>}
              </div>
            ):(
              required.map(r=>(
                <RequiredCard key={r.id} item={r} lang={lang} t={t} accent={accent}
                  onUpdate={u=>setRequired(p=>p.map(x=>x.id===u.id?u:x))}
                  onDelete={()=>setRequired(p=>p.filter(x=>x.id!==r.id))}/>
              ))
            )}
          </div>
        )}

        {/* ── CRITICAL WATCH ── */}
        {activeTab==="watch"&&(
          <div className="fade">
            <p style={{fontSize:12,color:"#6b7280",marginBottom:16,lineHeight:1.7}}>{t.watchSub}</p>
            <div style={{background:"#0f172a",border:"1px solid #1f2937",borderRadius:10,padding:16,marginBottom:20}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,marginBottom:12}}>
                <input style={S.input} value={newWatch.text} onChange={e=>setNewWatch(p=>({...p,text:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addWatch()} placeholder={t.addWatch}/>
                <button onClick={addWatch} style={{background:accent,border:"none",color:"#000",borderRadius:6,padding:"0 14px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",whiteSpace:"nowrap"}}>{t.addWatchItem}</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10}}>
                <div>
                  <label style={S.label}>{t.watchCat}</label>
                  <select style={S.input} value={newWatch.cat} onChange={e=>setNewWatch(p=>({...p,cat:e.target.value}))}>
                    <option value="">{t.selectCat}</option>
                    {t.watchCats.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>{t.timesPerDay}</label>
                  <input style={S.input} type="number" min={1} value={newWatch.timesPerDay} onChange={e=>setNewWatch(p=>({...p,timesPerDay:parseInt(e.target.value)||1}))}/>
                </div>
                <div>
                  <label style={S.label}>{t.threshold}</label>
                  <input style={S.input} value={newWatch.threshold} onChange={e=>setNewWatch(p=>({...p,threshold:e.target.value}))} placeholder={t.thresholdPH}/>
                </div>
                <div style={{gridColumn:"1/-1"}}>
                  <label style={S.label}>{t.checkBy}</label>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
                    {LEVELS.map(l=>(
                      <button key={l} onClick={()=>toggleCheckBy(l)}
                        style={{...S.pill,fontSize:10,...(newWatch.checkBy.includes(l)?{background:LC[l]+"33",color:LC[l],borderColor:LC[l]}:{})}}>{LL[l][lang]}</button>
                    ))}
                  </div>
                </div>
                <div style={{gridColumn:"1/-1"}}>
                  <label style={S.label}>{t.auditNote}</label>
                  <input style={S.input} value={newWatch.auditNote} onChange={e=>setNewWatch(p=>({...p,auditNote:e.target.value}))} placeholder={t.auditNotePH}/>
                </div>
              </div>
            </div>

            {watchItems.length===0?(
              <div style={{textAlign:"center",color:"#374151",padding:30,fontSize:12}}>{t.noWatchYet}</div>
            ):(
              <>
                {t.watchCats.map(cat=>{
                  const items=watchItems.filter(w=>w.cat===cat);
                  if(!items.length) return null;
                  const wc=WATCH_COLORS[cat]||"#6b7280";
                  return(
                    <div key={cat} style={{marginBottom:18}}>
                      <div style={{fontSize:10,letterSpacing:2,color:wc,fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:8,height:8,borderRadius:"50%",background:wc}}/>{cat.toUpperCase()} ({items.length})
                      </div>
                      {items.map(w=>(
                        <div key={w.id} style={{...S.card,border:`1px solid ${wc}44`,marginBottom:8}}>
                          <div style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>setExpandedWatch(expandedWatch===w.id?null:w.id)}>
                            <div>
                              <div style={{fontSize:13,color:"#f9fafb"}}>{w.text}</div>
                              <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}>
                                {w.threshold&&<span style={{fontSize:11,color:wc}}>⚡ {w.threshold}</span>}
                                {w.timesPerDay>0&&<span style={{fontSize:10,color:"#6b7280"}}>· {w.timesPerDay}x/day</span>}
                                {w.checkBy?.length>0&&<span style={{fontSize:10,color:"#a855f7"}}>· {w.checkBy.map(l=>LL[l][lang]).join(", ")}</span>}
                              </div>
                            </div>
                            <span style={{color:"#4b5563",fontSize:11}}>{expandedWatch===w.id?"▲":"▼"}</span>
                          </div>
                          {expandedWatch===w.id&&(
                            <div style={{padding:"0 16px 14px",borderTop:"1px solid #1f2937"}}>
                              <div style={{marginTop:10}}>
                                <label style={S.label}>{t.checkBy}</label>
                                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
                                  {LEVELS.map(l=>(
                                    <button key={l} onClick={()=>toggleWatchCheckBy(w.id,l)}
                                      style={{...S.pill,fontSize:10,...(w.checkBy?.includes(l)?{background:LC[l]+"33",color:LC[l],borderColor:LC[l]}:{})}}>{LL[l][lang]}</button>
                                  ))}
                                </div>
                              </div>
                              <div style={{marginTop:10}}>
                                <label style={S.label}>{t.timesPerDay}</label>
                                <input style={{...S.input,width:80}} type="number" min={1} value={w.timesPerDay||1}
                                  onChange={e=>setWatch(p=>p.map(x=>x.id===w.id?{...x,timesPerDay:parseInt(e.target.value)||1}:x))}/>
                              </div>
                              {w.auditNote&&<div style={{fontSize:12,color:"#94a3b8",marginTop:8}}><span style={{color:"#6b7280"}}>{t.auditNote}:</span> {w.auditNote}</div>}
                              <button onClick={()=>setWatch(p=>p.filter(x=>x.id!==w.id))} style={{marginTop:10,background:"transparent",border:"1px solid #dc262644",color:"#dc2626",borderRadius:6,padding:"5px 12px",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{t.remove}</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
                {watchItems.some(w=>w.checkBy?.length>0)&&(
                  <div style={{marginTop:20,background:"#0a0f1a",border:`1px solid ${accent}44`,borderRadius:12,padding:18}}>
                    <div style={{fontSize:10,letterSpacing:2,color:accent,fontWeight:700,marginBottom:4}}>🏗 {t.layeredAuditSeed}</div>
                    <div style={{fontSize:11,color:"#6b7280",marginBottom:14}}>{t.layeredAuditDesc}</div>
                    {LEVELS.slice().reverse().map(level=>{
                      const assigned=watchItems.filter(w=>w.checkBy?.includes(level));
                      if(!assigned.length) return null;
                      return(
                        <div key={level} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                          <div style={{minWidth:80,fontSize:9,color:LC[level],fontWeight:700,letterSpacing:1,background:LC[level]+"22",border:`1px solid ${LC[level]}44`,borderRadius:4,padding:"3px 8px",textAlign:"center",flexShrink:0}}>{LL[level][lang].toUpperCase()}</div>
                          <div style={{flex:1}}>
                            {assigned.map(w=>(
                              <div key={w.id} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                                <div style={{width:5,height:5,borderRadius:"50%",background:WATCH_COLORS[w.cat]||"#6b7280",flexShrink:0}}/>
                                <span style={{fontSize:12,color:"#94a3b8"}}>{w.text}</span>
                                {w.timesPerDay>0&&<span style={{fontSize:10,color:"#4b5563"}}>· {w.timesPerDay}x/day</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── GUIDE ── */}
        {activeTab==="guide"&&(
          <div className="fade">
            <div style={{background:"#0a1020",border:"1px solid #1f2937",borderRadius:10,padding:14,marginBottom:20}}>
              <p style={{fontSize:12,color:"#6b7280",lineHeight:1.7}}>{lang==="en"?"Gemba questions. Answer as how you actually spent your last 5 days — not your job description. The gap between those two things is the work.":"Preguntas de gemba. Responde como realmente pasaste tus últimos 5 días — no tu descripción del puesto. La brecha entre ambos es el trabajo."}</p>
            </div>
            {(GUIDE_QS[activeLevel]?.[lang]||[]).map((q,i)=>{
              const key=`${activeLevel}_${i}`;
              return(
                <div key={i} style={{background:"#0f172a",border:"1px solid #1f2937",borderRadius:10,padding:16,marginBottom:10}}>
                  <div style={{display:"flex",gap:10,marginBottom:12}}>
                    <span style={{color:accent,fontSize:16,marginTop:1,flexShrink:0}}>→</span>
                    <p style={{fontSize:13,color:"#e2e8f0",lineHeight:1.6}}>{q}</p>
                  </div>
                  <label style={S.label}>{t.reflectionLabel}</label>
                  <textarea style={{...S.input,height:70,resize:"vertical"}} value={reflections[key]||""} onChange={e=>setReflections(p=>({...p,[key]:e.target.value}))} placeholder={t.reflectionPH}/>
                  <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
                    <button onClick={()=>runGuideAI(activeLevel,i,q,reflections[key])} disabled={guideAILoad[key]}
                      style={{background:accent+"22",border:`1px solid ${accent}66`,color:accent,borderRadius:6,padding:"5px 12px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",opacity:guideAILoad[key]?0.6:1}}>
                      ✦ {guideAILoad[key]?t.aiThinking:t.aiCoachBtn}
                    </button>
                  </div>
                  {guideAI[key]&&(
                    <div style={{marginTop:10,background:"#0a0f1a",border:`1px solid ${accent}44`,borderRadius:8,padding:12}}>
                      <div style={{fontSize:9,letterSpacing:2,color:accent,fontWeight:700,marginBottom:6}}>✦ {t.aiCoach}</div>
                      <p style={{fontSize:12,color:"#cbd5e1",lineHeight:1.7}}>{guideAI[key]}</p>
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{background:"#1c020244",border:"1px solid #dc262633",borderRadius:10,padding:16,marginTop:20}}>
              <h3 style={{fontSize:10,letterSpacing:2,color:"#dc2626",marginBottom:12,fontWeight:700}}>⚠ {t.wrongWork}</h3>
              {(WRONG_LEVEL[activeLevel]?.[lang]||[]).map((w,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:7}}><span style={{color:"#dc2626",flexShrink:0}}>✕</span><span style={{fontSize:12,color:"#9ca3af"}}>{w}</span></div>
              ))}
            </div>
          </div>
        )}

        {/* ── ANALYZE ── */}
        {activeTab==="analyze"&&(
          <div className="fade">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:8,marginBottom:24}}>
              {Object.entries(DISPOSITIONS).map(([k,d])=>{
                const mins=tasks.filter(x=>x.disposition===k).reduce((s,x)=>s+(x.minutes||0),0);
                return(<div key={k} style={{background:d.bg,border:`1px solid ${d.color}55`,borderRadius:8,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:16}}>{d.icon}</div>
                  <div style={{fontSize:9,color:d.color,fontWeight:700,letterSpacing:0.5,margin:"4px 0"}}>{d[lang]}</div>
                  <div style={{fontSize:18,fontWeight:700,color:"#f9fafb"}}>{mins}m</div>
                  <div style={{fontSize:10,color:"#6b7280"}}>{totalMins?Math.round((mins/totalMins)*100):0}%</div>
                </div>);
              })}
            </div>
            {totalMins>0&&(
              <>
                <h2 style={{fontSize:10,letterSpacing:2,color:"#6b7280",marginBottom:14,fontWeight:700}}>{t.timeCat}</h2>
                {CATS[lang].map((cat,i)=>{
                  const m=tasks.filter(x=>x.category===CATS.en[i]||x.category===cat).reduce((s,x)=>s+(x.minutes||0),0);
                  if(!m) return null;
                  const pct=Math.round((m/totalMins)*100);
                  return(<div key={cat} style={{marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#94a3b8",marginBottom:4}}><span>{cat}</span><span style={{color:"#6b7280"}}>{m}m · {pct}%</span></div>
                    <div style={{height:5,background:"#1f2937",borderRadius:3}}><div style={{width:`${pct}%`,height:"100%",background:accent,borderRadius:3,transition:"width 0.4s"}}/></div>
                  </div>);
                })}
              </>
            )}
            <h2 style={{fontSize:10,letterSpacing:2,color:"#6b7280",marginBottom:14,fontWeight:700,marginTop:24}}>{t.crossLevel}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
              {LEVELS.map(l=>{
                const lt=tasksByLevel[l]||[]; const lm=lt.reduce((s,x)=>s+(x.minutes||0),0);
                const lff=lt.filter(x=>x.isFirefighting).reduce((s,x)=>s+(x.minutes||0),0);
                return(<div key={l} onClick={()=>{setActiveLevel(l);setActiveTab("log");}} style={{background:"#0f172a",border:`1px solid ${lt.length>0?LC[l]+"55":"#1f2937"}`,borderRadius:10,padding:14,cursor:"pointer"}}>
                  <div style={{fontFamily:"'Barlow Condensed'",fontSize:14,fontWeight:800,letterSpacing:2,color:LC[l],marginBottom:6}}>{LL[l][lang].toUpperCase()}</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>{lt.length} {t.tasks} · {lm}m</div>
                  {lff>0&&lm>0&&<div style={{fontSize:11,color:"#f97316",marginTop:4}}>🔥 {Math.round((lff/lm)*100)}%</div>}
                  {lt.filter(x=>x.disposition==="PUSH_DOWN").length>0&&<div style={{fontSize:11,color:"#d97706",marginTop:2}}>↓ {lt.filter(x=>x.disposition==="PUSH_DOWN").length} {t.toPushDown}</div>}
                  {lt.length===0&&<div style={{fontSize:10,color:"#374151",marginTop:4}}>{t.noTasksLogged}</div>}
                </div>);
              })}
            </div>
          </div>
        )}

        {/* ── ACTION PLAN ── */}
        {activeTab==="action"&&(
          <div className="fade">
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:18}}>
              <button onClick={handleExport} style={{background:accent+"22",border:`1px solid ${accent}66`,color:accent,borderRadius:6,padding:"8px 16px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",letterSpacing:1}}>↓ {t.exportLSW}</button>
            </div>
            {tasks.filter(x=>x.disposition).length===0?(
              <p style={{fontSize:13,color:"#4b5563"}}>{t.noActionYet}</p>
            ):(
              ["MAINTAIN","PUSH_DOWN","ELIMINATE","FIREFIGHTING","ESCALATE"].map(key=>{
                const d=DISPOSITIONS[key];
                const group=key==="FIREFIGHTING"?tasks.filter(x=>x.isFirefighting):tasks.filter(x=>x.disposition===key);
                if(!group.length) return null;
                return(
                  <div key={key} style={{...S.ab,borderColor:d.color+"55"}}>
                    <h3 style={{fontSize:10,letterSpacing:2,color:d.color,fontWeight:700,marginBottom:12}}>
                      {d.icon} {key==="MAINTAIN"?t.maintain:key==="PUSH_DOWN"?t.pushDown:key==="ELIMINATE"?t.eliminate:key==="FIREFIGHTING"?t.ffAnalysis:"ESCALATE"} ({group.length})
                    </h3>
                    {key==="MAINTAIN"&&<p style={{fontSize:11,color:"#6b7280",marginBottom:10}}>{t.maintainSub}</p>}
                    {key==="FIREFIGHTING"&&(
                      <div style={{background:"#1c0a0244",border:"1px solid #f9731633",borderRadius:8,padding:12,marginBottom:12}}>
                        <div style={{fontSize:10,color:"#f97316",fontWeight:700}}>{t.keyQuestion}</div>
                        <p style={{fontSize:12,color:"#9ca3af",marginTop:4,lineHeight:1.6}}>{t.keyQuestionText}</p>
                        {Object.entries(group.reduce((a,x)=>{const c=x.firefightingCause||"?";(a[c]=a[c]||[]).push(x);return a;},{})).map(([cause,items])=>(
                          <div key={cause} style={{marginTop:10}}>
                            <div style={{fontSize:11,color:"#f97316",fontWeight:700}}>{cause} ({items.length})</div>
                            {items.map(x=><div key={x.id} style={{fontSize:12,color:"#94a3b8",marginLeft:10,marginTop:3}}>· {x.description}</div>)}
                          </div>
                        ))}
                      </div>
                    )}
                    {group.map(task=>(
                      <div key={task.id} style={{borderBottom:"1px solid #0f1925",paddingBottom:9,marginBottom:9}}>
                        <div style={{fontSize:13,color:"#f9fafb"}}>{task.description}{task.minutes?<span style={{color:"#4b5563",fontSize:11}}> ({task.minutes}m)</span>:""}</div>
                        {task.pushToLevel&&<div style={{fontSize:11,color:"#d97706",marginTop:3}}>{t.delegateTo} {LL[task.pushToLevel]?.[lang]||task.pushToLevel}</div>}
                        {task.pushNote&&<div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{task.pushNote}</div>}
                        {task.eliminateNote&&<div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{task.eliminateNote}</div>}
                        {task.notes&&<div style={{fontSize:11,color:"#6b7280",marginTop:2,fontStyle:"italic"}}>{task.notes}</div>}
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatBadge({val,label,color}){
  return(
    <div style={{background:color+"15",border:`1px solid ${color}44`,borderRadius:8,padding:"6px 10px",textAlign:"center"}}>
      <div style={{fontSize:14,fontWeight:700,color,lineHeight:1}}>{val}</div>
      <div style={{fontSize:8,color,opacity:0.7,letterSpacing:1,marginTop:2}}>{label}</div>
    </div>
  );
}
