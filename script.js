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
  
});
