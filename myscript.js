document.addEventListener("DOMContentLoaded", () => {
  const marker = document.getElementById("hiroMarker");
  const container = document.getElementById("snowContainer");

  // Wenn Marker erkannt: Schnee einblenden
  marker.addEventListener("markerFound", () => {
    spawnSnow();
    container.setAttribute("visible", true);
  });

  function spawnSnow() {
    container.innerHTML = ""; // reset

    for (let i = 0; i < 300; i++) {
      let snow = document.createElement("a-image");

      // Bereich um den Marker (sichtbar!)
      let x = (Math.random() * 4) - 2;   
      let y = Math.random() * 3 + 1;   
      let z = (Math.random() * 4) - 2; 

      snow.setAttribute("src", "./22-snowflake-png-image.png");
      snow.setAttribute("width", "0.15");
      snow.setAttribute("height", "0.15");
      snow.setAttribute("position", x + " " + y + " " + z);

      // Fallanimation
      snow.setAttribute("animation", `property: position; to: ${x} -1 ${z}; dur: ${2000 + Math.random() * 2000}; easing: linear; loop: true;`);

      // leichtes Rotieren
      snow.setAttribute("animation__rot",`property: rotation; to: 0 360 0; dur: ${2000 + Math.random() * 2000}; loop: true; easing: linear;`);

      container.appendChild(snow);
    }
  }
});