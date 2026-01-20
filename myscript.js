
AFRAME.registerComponent('modify-materials', {
  init: function () {
    // Wait for model to load.
    this.el.addEventListener('model-loaded', () => {
      // Grab the mesh / scene.
      const obj = this.el.getObject3D('mesh');
      // Speichere Referenzen auf Tisch- und Tischplatten-Materialien
      const tischMaterialien = [];
      const textureLoader = new THREE.TextureLoader();
      obj.traverse(node => {
        if (node.material) {
          if (node.name.includes('Tisch') || node.name.includes('Tischplatte')) {
            node.material.color.set(0x8B4513); // Holzbraun für Tisch und Tischplatte
            tischMaterialien.push(node.material);
          } else if (node.name.includes('Hauswand')) {
            // Textur für Hauswand setzen und Farbe auf Weiß, damit Textur nicht verfärbt wird
            node.material.color.set(0xFFFFFF);
            textureLoader.load('blank-concrete-white-wall-texture-background.jpg', (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(64, 64); // Passe die Werte ggf. an
              node.material.map = texture;
              node.material.needsUpdate = true;
            });
          } else if (node.name.includes('Teppich')) {
            node.material.color.set(0x228B22); // Dunkelgrün für Teppich
          } else if (node.name.includes('Gardinenstange')) {
            node.material.color.set(0x000000); // Schwarz für Gardinenstange
          } else if (node.name.includes('Gardine')) {
            node.material.color.set(0xADD8E6); // Hellblau für Gardinen
          } else if (node.name.includes('Hausboden')) {
            // Textur für Hausboden setzen und Farbe auf Weiß, damit Textur nicht verfärbt wird
            node.material.color.set(0xFFFFFF);
            textureLoader.load('wood-1853403_1920.jpg', (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(2, 2); // Passe die Werte ggf. an
              node.material.map = texture;
              node.material.needsUpdate = true;
            });
          } else {
            node.material.color.set(0x808080); // Grau für andere Teile
          }
        }
      });
    });
  }
});

// Code für das segmentierte Schneeflocken-Bild
const snowflake = document.querySelector('#snowflake');
if (snowflake) {
  snowflake.addEventListener('loaded', () => {
    const mesh = snowflake.getObject3D('mesh');
    const textureLoader = new THREE.TextureLoader();

    // Erstelle Info-Text mit Farbverlauf und Umrandung
    const infoTextPlane = document.querySelector('#info-text');
    if (infoTextPlane) {
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 512;
      textCanvas.height = 256;
      const textCtx = textCanvas.getContext('2d');
      
      // Hintergrund transparent
      textCtx.clearRect(0, 0, 512, 256);
      
      // Schriftart
      textCtx.font = 'bold 36px Arial';
      textCtx.textAlign = 'left';
      textCtx.textBaseline = 'top';
      
      // Farbverlauf für Text (Lila zu Gelb)
      const textGradient = textCtx.createLinearGradient(0, 0, 512, 0);
      textGradient.addColorStop(0, '#9933ff'); // Lila
      textGradient.addColorStop(1, '#ffff00'); // Gelb
      
      // Dünne Umrandung (Stroke)
      textCtx.strokeStyle = '#222222';
      textCtx.lineWidth = 2;
      textCtx.strokeText('T zum Zeichnen', 20, 40);
      textCtx.strokeText('R zum Neustart', 20, 120);
      
      // Farbverlauf-Füllung
      textCtx.fillStyle = textGradient;
      textCtx.fillText('T zum Zeichnen', 20, 40);
      textCtx.fillText('R zum Neustart', 20, 120);
      
      // Erstelle Textur und wende sie auf die Plane an
      const textTexture = new THREE.CanvasTexture(textCanvas);
      infoTextPlane.addEventListener('loaded', () => {
        const textMesh = infoTextPlane.getObject3D('mesh');
        if (textMesh) {
          textMesh.material = new THREE.MeshBasicMaterial({
            map: textTexture,
            transparent: true,
            side: THREE.DoubleSide
          });
        }
      });
    }

    textureLoader.load('wp3597484-black-screen-wallpapers.jpg', (texture) => {
      // Setze Gruppen für die 4096 Segmente (64x64)
      const groups = [];
      for (let i = 0; i < 4096; i++) {
        groups.push({ start: i * 6, count: 6, materialIndex: i });
      }
      mesh.geometry.groups = groups;

      // Erstelle 4096 Materialien mit Opazität
      const materials = [];
      for (let i = 0; i < 4096; i++) {
        materials.push(new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1 }));
      }
      const gespeichertesFeld = materials;
      mesh.material = materials;

      // Speichere das aktuell angestrahlte Segment
      let currentSegmentIndex = null;

      // Shutter-Soundeffekt (ohne Überlagerung)
      const shutterSound = new Audio('Sound.mp3');
      shutterSound.volume = 0.5;
      shutterSound.playbackRate = 4.0; // Doppelte Geschwindigkeit
      let soundPlaying = false;
      shutterSound.addEventListener('ended', () => { soundPlaying = false; });
      
      function playShutterSound() {
        if (!soundPlaying) {
          shutterSound.currentTime = 0;
          shutterSound.play();
          soundPlaying = true;
        }
      }

      // Segmentanzahl pro Achse (64x64 = 4096)
      const segmentsX = snowflake.getAttribute('segments-width');
      const segmentsY = snowflake.getAttribute('segments-height');

      // Plane-Größe aus HTML (width/height = 0.5)
      const planeWidth = 0.5;
      const planeHeight = 0.5;

      // Erstelle eine Canvas-Textur mit Lila-Gelb-Farbverlauf für den Ring
      const gradientCanvas = document.createElement('canvas');
      gradientCanvas.width = snowflake.getAttribute('segments-width');
      gradientCanvas.height = snowflake.getAttribute('segments-height');
      const ctx = gradientCanvas.getContext('2d');
      
      // Radialer Farbverlauf von Lila (innen) nach Gelb (außen)
      const gradient = ctx.createRadialGradient(32, 32, 16, 32, 32, 32);
      gradient.addColorStop(0, '#9933ff'); // Lila innen
      gradient.addColorStop(1, '#ffff00'); // Gelb außen
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      
      const gradientTexture = new THREE.CanvasTexture(gradientCanvas);

      // Erstelle den Indikator-Ring mit Farbverlauf
      const indicatorGeometry = new THREE.RingGeometry(0.006, 0.012, 32);
      const indicatorMaterial = new THREE.MeshBasicMaterial({ 
        map: gradientTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
      indicator.rotation.x = 0; // Parallel zur Plane
      indicator.visible = false;

      // Erstelle die Umrandung (dünner Ring außen)
      const outlineGeometry = new THREE.RingGeometry(0.012, 0.014, 32);
      const outlineMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x222222, // Dunkle Umrandung
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
      outline.rotation.x = 0;
      outline.visible = false;

      // Gruppe für Indikator + Umrandung
      const indicatorGroup = new THREE.Group();
      indicatorGroup.add(outline);
      indicatorGroup.add(indicator);
      snowflake.object3D.add(indicatorGroup);

      // Hilfsfunktion: 3D-Punkt auf 2D-Bildschirm projizieren
      function projectToScreen(point3D, camera, canvas) {
        const vector = point3D.clone();
        vector.project(camera);
        return new THREE.Vector2(
          (vector.x + 1) / 2 * canvas.width,
          (-vector.y + 1) / 2 * canvas.height
        );
      }

      // Mousemove-Event für Segment-Erkennung
      window.addEventListener('mousemove', (event) => {
        const canvas = snowflake.sceneEl.renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        const camera = snowflake.sceneEl.camera;

        // Cursor-Position in Bildschirmkoordinaten (relativ zum Canvas)
        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;

        // Aktualisiere die Weltmatrix
        snowflake.object3D.updateMatrixWorld(true);

        // Hole die Weltposition der Plane
        const planePos = new THREE.Vector3();
        snowflake.object3D.getWorldPosition(planePos);
        const planeQuat = new THREE.Quaternion();
        snowflake.object3D.getWorldQuaternion(planeQuat);
        const planeScale = new THREE.Vector3();
        snowflake.object3D.getWorldScale(planeScale);

        // Berechne die 4 Eckpunkte der Plane in Weltkoordinaten (mit Skalierung)
        const halfW = (planeWidth / 2) * planeScale.x;
        const halfH = (planeHeight / 2) * planeScale.y;
        
        // Lokale Eckpunkte (bereits skaliert)
        const corners = [
          new THREE.Vector3(-halfW, -halfH + 0.2, 0), // unten links
          new THREE.Vector3(halfW, -halfH + 0.2, 0),  // unten rechts
          new THREE.Vector3(halfW, halfH, 0),   // oben rechts
          new THREE.Vector3(-halfW, halfH, 0)   // oben links
        ];

        // Transformiere Eckpunkte in Weltkoordinaten (Rotation + Position)
        const worldCorners = corners.map(c => {
          const wc = c.clone().applyQuaternion(planeQuat).add(planePos);
          return wc;
        });

        // Projiziere Eckpunkte auf den Bildschirm
        const screenCorners = worldCorners.map(wc => projectToScreen(wc, camera, canvas));

        // Berechne die Position des Cursors relativ zur projizierten Plane
        const topLeft = screenCorners[3];
        const topRight = screenCorners[2];
        const bottomLeft = screenCorners[0];
        const bottomRight = screenCorners[1];

        // Berechne die Breite und Höhe der projizierten Plane auf dem Bildschirm
        const projectedWidth = ((topRight.x - topLeft.x) + (bottomRight.x - bottomLeft.x)) / 2;
        const projectedHeight = ((bottomLeft.y - topLeft.y) + (bottomRight.y - topRight.y)) / 2;

        // Skalierungsfaktor basierend auf Plane-Größe
        const scaleX = projectedWidth / planeWidth;
        const scaleY = projectedHeight / planeHeight;

        // X: Wie weit ist der Cursor horizontal zwischen links und rechts?
        const leftEdgeX = (topLeft.x + bottomLeft.x) / 2;
        const rightEdgeX = (topRight.x + bottomRight.x) / 2;
        const u = (cursorX - leftEdgeX) / (rightEdgeX - leftEdgeX);

        // Y: Wie weit ist der Cursor vertikal zwischen oben und unten?
        const topEdgeY = (topLeft.y + topRight.y) / 2;
        const bottomEdgeY = (bottomLeft.y + bottomRight.y) / 2;
        const v = (cursorY - topEdgeY) / (bottomEdgeY - topEdgeY);

        // Berechne Segment-Index mit Skalierung
        const segX = Math.floor(u * segmentsX);
        const segY = Math.floor(v * segmentsY);

        // Clamp auf gültige Werte
        if (u >= 0 && u <= 1 && v >= 0 && v <= 1) {
          const clampedSegX = Math.max(0, Math.min(segmentsX - 1, segX));
          const clampedSegY = Math.max(0, Math.min(segmentsY - 1, segY));
          const segmentIndex = clampedSegY * segmentsX + clampedSegX;

          // Positioniere den Indikator-Kreis auf der Plane (lokale Koordinaten)
          const localX = (u - 0.5) * planeWidth;
          const localY = (0.5 - v) * planeHeight;
          indicatorGroup.position.set(localX, localY, 0.001); // Leicht über der Plane
          indicator.visible = true;
          outline.visible = true;

          if (segmentIndex !== currentSegmentIndex) {
            currentSegmentIndex = segmentIndex;
            console.log('Maus über Segment:', segmentIndex, '(X:', clampedSegX, 'Y:', clampedSegY, ')');
          }
        } else {
          currentSegmentIndex = null;
          indicator.visible = false; // Verstecke Indikator wenn außerhalb der Plane
          outline.visible = false; // Verstecke Umrandung wenn außerhalb der Plane
        }
      });

      // Wenn "t" gedrückt wird, mache das aktuelle Segment unsichtbar
      document.addEventListener('keydown', (event) => {
        if (event.key === 't' && currentSegmentIndex !== null) {
          mesh.material[currentSegmentIndex].opacity = 0;
          mesh.material[currentSegmentIndex].transparent = true;
          playShutterSound();
          console.log('Segment', currentSegmentIndex, 'unsichtbar gemacht');
        }
      });

      // Klick-Handler hinzufügen (ersetzt durch Tasten-Event)
      document.addEventListener('keydown', (event) => {
        if (event.key === 'i') {
          console.log('Key "i" pressed');
          // Setze alle Materialien auf unsichtbar
          mesh.material.forEach((mat) => {
            mat.opacity = 0;
          });
          playShutterSound();
          console.log('All materials set to opacity 0');
        }
      });
      // Reset-Event
      document.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
          console.log('Key "r" pressed');
          // Resette das Bild auf komplett sichtbar 
          mesh.material.forEach((mat) => {
            mat.opacity = 1;
          });
          playShutterSound();
          console.log('All materials set to opacity 1');
        }
      });
    });
  });
}