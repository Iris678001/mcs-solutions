import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  createHeroWorkforceHub,
  createIndustrialScrubber,
  createManpowerRosterTree,
  createSecurityTurnstileStation,
  createCommercialLaundryUnit,
  createFacilityOverviewCampus,
} from './three/models';

interface ThreeCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeServiceIndex: number;
  className?: string;
}

// Pre-allocated math variables for 0-GC loop
const _vec3 = new THREE.Vector3();
const _camTarget = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();
const _currentLook = new THREE.Vector3(0, 0, 0);

// Waypoint definition along scroll trajectory
interface Waypoint {
  t: number; // scroll progress point
  cam: THREE.Vector3;
  look: THREE.Vector3;
}

const WAYPOINTS: Waypoint[] = [
  { t: 0.00, cam: new THREE.Vector3(0, 1.4, 7.0), look: new THREE.Vector3(0, -0.4, -4.0) },        // Hero (model centered at 0, -1.5, -4.0)
  { t: 0.20, cam: new THREE.Vector3(0, 2.0, -2.5), look: new THREE.Vector3(4.2, 1.1, -6) },       // Housekeeping (scrubber at 4.2, -6)
  { t: 0.40, cam: new THREE.Vector3(0, 2.2, -10.5), look: new THREE.Vector3(-3.8, 1.2, -14) },   // Manpower (roster tree at -3.8, -14)
  { t: 0.60, cam: new THREE.Vector3(0, 2.0, -18.5), look: new THREE.Vector3(4.2, 1.1, -22) },     // Security (turnstiles at 4.2, -22)
  { t: 0.80, cam: new THREE.Vector3(0, 2.2, -26.5), look: new THREE.Vector3(-3.8, 1.3, -30) },   // Laundry (extractor at -3.8, -30)
  { t: 1.00, cam: new THREE.Vector3(0, 6.0, -30.0), look: new THREE.Vector3(0, 0.5, -38) },       // Overview / Campus at (0, -38)
];

function getInterpolatedCam(progress: number): { pos: THREE.Vector3; look: THREE.Vector3 } {
  const p = Math.max(0, Math.min(1, progress));
  let i = 0;
  while (i < WAYPOINTS.length - 1 && WAYPOINTS[i + 1].t < p) {
    i++;
  }
  if (i >= WAYPOINTS.length - 1) {
    return {
      pos: WAYPOINTS[WAYPOINTS.length - 1].cam.clone(),
      look: WAYPOINTS[WAYPOINTS.length - 1].look.clone(),
    };
  }
  const w1 = WAYPOINTS[i];
  const w2 = WAYPOINTS[i + 1];
  const alpha = (p - w1.t) / (w2.t - w1.t);
  // Smooth cubic ease
  const ease = alpha * alpha * (3 - 2 * alpha);

  const pos = new THREE.Vector3().lerpVectors(w1.cam, w2.cam, ease);
  const look = new THREE.Vector3().lerpVectors(w1.look, w2.look, ease);
  return { pos, look };
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  scrollProgress,
  activeServiceIndex,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Store mutable state in refs to prevent WebGL teardown
  const stateRef = useRef({
    scrollProgress: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    isOrbitMode: false,
    orbit: { rotX: 0, rotY: 0, isDragging: false, startX: 0, startY: 0 },
    activeServiceIndex: 0,
  });

  // Keep stateRef in sync with props
  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
    stateRef.current.activeServiceIndex = activeServiceIndex;
  }, [scrollProgress, activeServiceIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL detection
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Slate-950
    scene.fog = new THREE.FogExp2(0x020617, 0.026);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      120
    );
    camera.position.set(0, 3.2, 9.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Environment Map (PMREMGenerator + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key Light, Cool Hemisphere Fill, Ambient Fill & Accents)
    const ambLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.5);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    dirLight.position.set(12, 18, 14);
    if (!isSoftwareGl) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.normalBias = 0.02;
    }
    scene.add(dirLight);

    const accentLight1 = new THREE.PointLight(0x06b6d4, 4.0, 45);
    accentLight1.position.set(4, 6, -5);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x3b82f6, 4.0, 50);
    accentLight2.position.set(-4, 6, -20);
    scene.add(accentLight2);

    // 5. Floor Grid with Depth
    const gridHelper = new THREE.GridHelper(130, 65, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Soft Contact Shadow Plane underneath main zones
    const contactPlaneGeo = new THREE.PlaneGeometry(150, 150);
    const contactPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x010409,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const contactPlane = new THREE.Mesh(contactPlaneGeo, contactPlaneMat);
    contactPlane.rotation.x = -Math.PI / 2;
    contactPlane.position.y = -0.08;
    scene.add(contactPlane);

    // -------------------------------------------------------------
    // BUILD AUTHENTIC 3D HOUSEKEEPING & HR WORKFORCE SCENE
    // -------------------------------------------------------------
    const heroModel = createHeroWorkforceHub(isSoftwareGl);
    const hkModel = createIndustrialScrubber(isSoftwareGl);
    const mpModel = createManpowerRosterTree(isSoftwareGl);
    const secModel = createSecurityTurnstileStation(isSoftwareGl);
    const lndModel = createCommercialLaundryUnit(isSoftwareGl);
    const campusModel = createFacilityOverviewCampus(isSoftwareGl);

    scene.add(
      heroModel.group,
      hkModel.group,
      mpModel.group,
      secModel.group,
      lndModel.group,
      campusModel.group
    );

    // -------------------------------------------------------------
    // PARTICLES (Atmospheric Floating Clean Air / Dust Sparkles)
    // -------------------------------------------------------------
    const particleCount = isSoftwareGl ? 120 : 360;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = Math.random() * 12;
      particlePositions[i * 3 + 2] = -Math.random() * 45;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isSoftwareGl ? 0.08 : 0.06,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // INTERACTION LISTENERS (Mouse, Touch, Orbit)
    // -------------------------------------------------------------
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouse.targetX = x;
      stateRef.current.mouse.targetY = y;

      if (stateRef.current.isOrbitMode && stateRef.current.orbit.isDragging) {
        const deltaX = e.clientX - stateRef.current.orbit.startX;
        const deltaY = e.clientY - stateRef.current.orbit.startY;
        stateRef.current.orbit.rotY += deltaX * 0.005;
        stateRef.current.orbit.rotX += deltaY * 0.005;
        stateRef.current.orbit.startX = e.clientX;
        stateRef.current.orbit.startY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (stateRef.current.isOrbitMode) {
        stateRef.current.orbit.isDragging = true;
        stateRef.current.orbit.startX = e.clientX;
        stateRef.current.orbit.startY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      stateRef.current.orbit.isDragging = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // ANIMATION & RENDER LOOP (with software WebGL pacing)
    // -------------------------------------------------------------
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      const m = stateRef.current.mouse;
      m.x = THREE.MathUtils.damp(m.x, m.targetX, 4, delta);
      m.y = THREE.MathUtils.damp(m.y, m.targetY, 4, delta);

      // 1. Calculate Target Camera Position from Scroll Progress
      const curProgress = stateRef.current.scrollProgress;
      const interp = getInterpolatedCam(curProgress);

      if (stateRef.current.isOrbitMode) {
        // Orbit mode around current station target
        const orbitRadius = 7.5;
        const oRotX = stateRef.current.orbit.rotX;
        const oRotY = stateRef.current.orbit.rotY;
        _camTarget.set(
          interp.look.x + Math.sin(oRotY) * Math.cos(oRotX) * orbitRadius,
          interp.look.y + Math.sin(oRotX) * orbitRadius + 1.5,
          interp.look.z + Math.cos(oRotY) * Math.cos(oRotX) * orbitRadius
        );
        _lookTarget.copy(interp.look);
      } else {
        // Scroll follow mode with subtle mouse parallax
        _camTarget.copy(interp.pos);
        _camTarget.x += m.x * 0.8;
        _camTarget.y += m.y * 0.5;

        _lookTarget.copy(interp.look);
        _lookTarget.x += m.x * 0.3;
        _lookTarget.y += m.y * 0.2;
      }

      // Smooth camera interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _camTarget.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _camTarget.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _camTarget.z, 3.5, delta);

      _currentLook.x = THREE.MathUtils.damp(_currentLook.x, _lookTarget.x, 3.5, delta);
      _currentLook.y = THREE.MathUtils.damp(_currentLook.y, _lookTarget.y, 3.5, delta);
      _currentLook.z = THREE.MathUtils.damp(_currentLook.z, _lookTarget.z, 3.5, delta);
      camera.lookAt(_currentLook);

      // 2. Animate Authentic Housekeeping & HR 3D Models
      heroModel.animate(delta, time);
      hkModel.animate(delta, time);
      mpModel.animate(delta, time);
      secModel.animate(delta, time);
      lndModel.animate(delta, time);
      campusModel.animate(delta, time);

      // Particle gentle drift
      particles.rotation.y = time * 0.02;

      // 3. Render frame
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Launch loop
    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
        data-testid="three-canvas-container"
      />

      {/* Subtle Spatial Vignette Gradient to anchor text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-radial-[at_center] from-transparent via-slate-950/40 to-slate-950/80" />
    </div>
  );
};
