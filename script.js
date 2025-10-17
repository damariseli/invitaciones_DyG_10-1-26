document.getElementById("rsvpForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const restriccion = document.getElementById("restriccion").value.trim();
  const asistencia = document.getElementById("asistencia").value;

  if (!nombre || !apellido || !asistencia) {
    alert("Por favor, completá todos los campos obligatorios.");
    return;
  }

  const mensaje = `
    ¡Gracias, ${nombre} ${apellido}!
    Tu respuesta ha sido registrada.
    ${asistencia === "Sí" ? "¡Nos alegra que vengas! 💕" : "Lamentamos que no puedas venir 😢"}
    ${restriccion ? `\nRestricción alimentaria: ${restriccion}` : ""}
  `;

  document.getElementById("mensaje").innerText = mensaje;
  document.getElementById("rsvpForm").reset();

  // countdown.js

// CONFIGURACIÓN: modificar esta fecha según el evento
const EVENT_DATE = new Date('2025-11-15T18:00:00-03:00');

// Elementos del contador
const cdEls = {
  d: document.getElementById('cd-d'),
  h: document.getElementById('cd-h'),
  m: document.getElementById('cd-m'),
  s: document.getElementById('cd-s')
};

function pad(n) {
  return String(n).padStart(2, '0');
}

// Actualización cada segundo
setInterval(() => {
  const now = new Date();
  const diff = Math.max(0, EVENT_DATE - now);

  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / (3600 * 24));
  const h = Math.floor((s % (3600 * 24)) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;

  cdEls.d.textContent = pad(d);
  cdEls.h.textContent = pad(h);
  cdEls.m.textContent = pad(m);
  cdEls.s.textContent = pad(ss);
}, 1000);

// ==============================
// DESCARGA .ICS (Agregar al calendario)
// ==============================

function formatICSDate(d) {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mi = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

function escapeICS(s) {
  return String(s).replace(/[\n,;]/g, ' ');
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2) + Date.now();
}

// Configuración del evento
const CONFIG = {
  novios: 'D&G',
  lugar: 'Salón La Toscana',
  direccion: 'Av. San Martín 1234',
  ciudadPais: 'Mendoza, Argentina'
};

document.getElementById('btn-ical').addEventListener('click', () => {
  const dtStart = formatICSDate(EVENT_DATE);
  const dtEnd = formatICSDate(new Date(EVENT_DATE.getTime() + 4 * 3600 * 1000)); // +4hs aprox

  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Casamiento//ES\nBEGIN:VEVENT\nUID:${cryptoRandom()}\nDTSTAMP:${formatICSDate(new Date())}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nSUMMARY:Casamiento ${CONFIG.novios}\nLOCATION:${escapeICS(CONFIG.lugar)} - ${escapeICS(CONFIG.direccion)} - ${escapeICS(CONFIG.ciudadPais)}\nDESCRIPTION:Casamiento ${CONFIG.novios}\nEND:VEVENT\nEND:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'casamiento.ics';
  a.click();
  URL.revokeObjectURL(url);
  
});
