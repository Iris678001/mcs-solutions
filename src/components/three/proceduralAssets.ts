import * as THREE from 'three';

/**
 * Procedural Canvas Texture Generator for MCS 3D Facility & HR Scene
 * Generates crisp, zero-dependency textures in memory for PBR materials.
 */

// Helper to configure procedural canvas textures
function finalizeTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 1. Caution Hazard Stripes (Yellow & Black diagonal warning pattern)
 */
export function createCautionTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#eab308'; // Amber-500
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#0f172a'; // Slate-900
  const stripeWidth = 32;
  for (let x = -256; x < 512; x += stripeWidth * 2) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + stripeWidth, 0);
    ctx.lineTo(x + stripeWidth - 256, 256);
    ctx.lineTo(x - 256, 256);
    ctx.closePath();
    ctx.fill();
  }

  return finalizeTexture(canvas);
}

/**
 * 2. Caution Wet Floor Sign Face
 */
export function createWetFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Bright Safety Yellow Background
  ctx.fillStyle = '#facc15';
  ctx.fillRect(0, 0, 256, 256);

  // Border
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 12;
  ctx.strokeRect(10, 10, 236, 236);

  // Slipping Person Icon Silhouette
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  // Head
  ctx.arc(128, 65, 14, 0, Math.PI * 2);
  ctx.fill();

  // Torso & angled limbs
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(128, 80);
  ctx.lineTo(120, 125);
  ctx.lineTo(95, 145);
  ctx.moveTo(120, 125);
  ctx.lineTo(150, 150);
  // Arms
  ctx.moveTo(128, 95);
  ctx.lineTo(95, 85);
  ctx.moveTo(128, 95);
  ctx.lineTo(160, 105);
  ctx.stroke();

  // Text: CAUTION WET FLOOR
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CAUTION', 128, 195);
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText('WET FLOOR', 128, 225);

  return finalizeTexture(canvas);
}

/**
 * 3. Human Resources & Shift Deployment Dashboard Console
 */
export function createRosterDashboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Dark slate command screen background
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, 512, 256);

  // Top header bar
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(0, 0, 512, 40);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('MCS LIVE WORKFORCE DEPLOYMENT', 16, 26);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '13px monospace';
  ctx.fillText('STATUS: 100% STATUTORY COMPLIANT · PF / ESI ACTIVE', 16, 68);

  // Stats boxes
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(16, 85, 145, 70);
  ctx.fillRect(180, 85, 145, 70);
  ctx.fillRect(345, 85, 145, 70);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(16, 85, 145, 70);
  ctx.strokeRect(180, 85, 145, 70);
  ctx.strokeRect(345, 85, 145, 70);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '11px sans-serif';
  ctx.fillText('ACTIVE CREW', 26, 105);
  ctx.fillText('SHIFT FILL', 190, 105);
  ctx.fillText('POLICE VETTED', 355, 105);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('6,450+', 26, 138);
  ctx.fillText('99.8%', 190, 138);
  ctx.fillText('100%', 355, 138);

  // Bottom live log stream
  ctx.fillStyle = '#22c55e';
  ctx.font = '12px monospace';
  ctx.fillText('● SHIFT A: 1,450 HOUSEKEEPERS ON DUTY', 16, 185);
  ctx.fillText('● SHIFT A: 1,800 SECURITY SENTRIES CHECKED IN', 16, 210);
  ctx.fillText('● REPLACEMENT SLA: 2-HR STANDBY READY', 16, 235);

  return finalizeTexture(canvas);
}

/**
 * 4. Optical Turnstile RFID Scanner Top Screen
 */
export function createTurnstileTopTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Smoked black tempered glass
  ctx.fillStyle = '#0a0f1d';
  ctx.fillRect(0, 0, 256, 256);

  // Cyan RFID concentric contactless tap rings
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(128, 110, 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(128, 110, 32, 0, Math.PI * 2);
  ctx.stroke();

  // Contactless waves icon
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(128, 110, 16, -Math.PI / 4, Math.PI / 4);
  ctx.stroke();

  // Directional Access Arrow (Green)
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.moveTo(128, 180);
  ctx.lineTo(155, 215);
  ctx.lineTo(138, 215);
  ctx.lineTo(138, 240);
  ctx.lineTo(118, 240);
  ctx.lineTo(118, 215);
  ctx.lineTo(101, 215);
  ctx.closePath();
  ctx.fill();

  return finalizeTexture(canvas);
}

/**
 * 5. Commercial Laundry Industrial PLC Washer Display
 */
export function createWasherDisplayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Industrial control terminal panel
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, 0, 256, 36);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('MCS EXTRACTOR 50KG', 12, 24);

  // Status & Temperature
  ctx.fillStyle = '#38bdf8';
  ctx.font = '12px monospace';
  ctx.fillText('CYCLE: HOSPITAL THERMAL', 12, 60);

  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('65°C · SANITIZE', 12, 100);

  // Spin speed and timer
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px monospace';
  ctx.fillText('DRUM RPM: 1,150 RPM', 12, 135);
  ctx.fillText('STAGE: EXTRACT / DRAIN', 12, 160);
  ctx.fillText('TIME REMAIN: 08:24 MIN', 12, 185);

  // Progress Bar
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(12, 205, 232, 18);
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(12, 205, 175, 18);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('75% COMPLETED', 75, 219);

  return finalizeTexture(canvas);
}

/**
 * 6. Circular Industrial Pressure / Temperature Gauge
 */
export function createPressureGaugeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // White gauge face with chrome ring
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Green safe zone arc
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(64, 64, 48, Math.PI * 0.8, Math.PI * 1.8);
  ctx.stroke();

  // Red danger zone arc
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(64, 64, 48, Math.PI * 1.8, Math.PI * 2.2);
  ctx.stroke();

  // Needle pointing into green
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(64, 64);
  ctx.lineTo(82, 38);
  ctx.stroke();

  // Needle center pin
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(64, 64, 6, 0, Math.PI * 2);
  ctx.fill();

  return finalizeTexture(canvas);
}
