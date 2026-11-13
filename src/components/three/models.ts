import * as THREE from 'three';
import {
  createCautionTexture,
  createWetFloorTexture,
  createRosterDashboardTexture,
  createTurnstileTopTexture,
  createWasherDisplayTexture,
  createPressureGaugeTexture,
} from './proceduralAssets';

// Shared PBR Material Presets
function getCommonMaterials(isSoftwareGl: boolean) {
  return {
    stainlessSteel: new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.92,
      roughness: 0.18,
    }),
    darkSteel: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.35,
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.98,
      roughness: 0.08,
    }),
    safetyTeal: new THREE.MeshPhysicalMaterial({
      color: 0x0284c7, // Industrial Cyan/Teal
      metalness: 0.45,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
    }),
    safetyYellow: new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.4,
      metalness: 0.2,
    }),
    navyUniform: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.1,
    }),
    tealUniform: new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.75,
      metalness: 0.1,
    }),
    hiVisOrange: new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.2,
      roughness: 0.6,
      metalness: 0.1,
    }),
    skinTone: new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.7,
      metalness: 0.05,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.1,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 0.92,
      ior: 1.5,
      thickness: 0.6,
      clearcoat: 1.0,
    }),
    glowingCyan: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    }),
    glowingGreen: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.2,
      roughness: 0.3,
      metalness: 0.8,
    }),
    crispLinen: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.85,
      metalness: 0.05,
    }),
    blueLinen: new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      roughness: 0.85,
      metalness: 0.05,
    }),
  };
}

/**
 * Procedural Human Silhouette Figure Generator
 * Assembles a stylized human personnel character in realistic work gear.
 */
export function createHumanPersonnelFigure(
  materials: ReturnType<typeof getCommonMaterials>,
  options: {
    uniformType: 'supervisor' | 'technician' | 'housekeeper' | 'security';
    accessory?: 'tablet' | 'tool' | 'mop' | 'radio';
    scale?: number;
  }
): THREE.Group {
  const group = new THREE.Group();
  const s = options.scale || 1.0;

  // 1. Boots
  const bootGeo = new THREE.BoxGeometry(0.18 * s, 0.12 * s, 0.28 * s);
  const bootMat = materials.darkSteel;
  const leftBoot = new THREE.Mesh(bootGeo, bootMat);
  leftBoot.position.set(-0.16 * s, 0.06 * s, 0.04 * s);
  const rightBoot = new THREE.Mesh(bootGeo, bootMat);
  rightBoot.position.set(0.16 * s, 0.06 * s, 0.04 * s);
  group.add(leftBoot, rightBoot);

  // 2. Legs / Trousers
  let trouserMat = materials.navyUniform;
  if (options.uniformType === 'technician') trouserMat = materials.darkSteel;
  if (options.uniformType === 'housekeeper') trouserMat = materials.tealUniform;

  const legGeo = new THREE.CylinderGeometry(0.09 * s, 0.08 * s, 0.72 * s, 12);
  const leftLeg = new THREE.Mesh(legGeo, trouserMat);
  leftLeg.position.set(-0.16 * s, 0.45 * s, 0);
  const rightLeg = new THREE.Mesh(legGeo, trouserMat);
  rightLeg.position.set(0.16 * s, 0.45 * s, 0);
  group.add(leftLeg, rightLeg);

  // 3. Torso / Uniform Shirt or Jacket
  let shirtMat = materials.navyUniform;
  if (options.uniformType === 'housekeeper') shirtMat = materials.tealUniform;
  if (options.uniformType === 'security') shirtMat = materials.navyUniform;

  const torsoGeo = new THREE.BoxGeometry(0.44 * s, 0.65 * s, 0.26 * s);
  const torso = new THREE.Mesh(torsoGeo, shirtMat);
  torso.position.set(0, 1.05 * s, 0);
  group.add(torso);

  // Hi-Vis Vest for Technician / Supervisor
  if (options.uniformType === 'technician' || options.uniformType === 'supervisor') {
    const vestGeo = new THREE.BoxGeometry(0.46 * s, 0.55 * s, 0.28 * s);
    const vest = new THREE.Mesh(vestGeo, materials.hiVisOrange);
    vest.position.set(0, 1.06 * s, 0);
    group.add(vest);

    // Silver reflective stripes
    const stripeGeo = new THREE.BoxGeometry(0.47 * s, 0.06 * s, 0.29 * s);
    const stripe = new THREE.Mesh(stripeGeo, materials.chrome);
    stripe.position.set(0, 1.02 * s, 0);
    group.add(stripe);
  }

  // Brass Epaulettes and Badge for Security
  if (options.uniformType === 'security') {
    const badgeGeo = new THREE.BoxGeometry(0.08 * s, 0.1 * s, 0.03 * s);
    const badge = new THREE.Mesh(badgeGeo, materials.chrome);
    badge.position.set(-0.12 * s, 1.2 * s, 0.14 * s);
    group.add(badge);

    const epauletteGeo = new THREE.BoxGeometry(0.12 * s, 0.03 * s, 0.15 * s);
    const epauletteL = new THREE.Mesh(epauletteGeo, materials.safetyYellow);
    epauletteL.position.set(-0.24 * s, 1.34 * s, 0);
    const epauletteR = new THREE.Mesh(epauletteGeo, materials.safetyYellow);
    epauletteR.position.set(0.24 * s, 1.34 * s, 0);
    group.add(epauletteL, epauletteR);
  }

  // 4. Arms & Hands
  const armGeo = new THREE.CylinderGeometry(0.07 * s, 0.06 * s, 0.58 * s, 10);
  const leftArm = new THREE.Mesh(armGeo, shirtMat);
  leftArm.position.set(-0.28 * s, 1.02 * s, 0);
  const rightArm = new THREE.Mesh(armGeo, shirtMat);
  rightArm.position.set(0.28 * s, 1.02 * s, 0);
  group.add(leftArm, rightArm);

  const handGeo = new THREE.SphereGeometry(0.06 * s, 8, 8);
  const leftHand = new THREE.Mesh(handGeo, materials.skinTone);
  leftHand.position.set(-0.28 * s, 0.7 * s, 0);
  const rightHand = new THREE.Mesh(handGeo, materials.skinTone);
  rightHand.position.set(0.28 * s, 0.7 * s, 0.06 * s);
  group.add(leftHand, rightHand);

  // 5. Head & Neck
  const neckGeo = new THREE.CylinderGeometry(0.08 * s, 0.08 * s, 0.12 * s, 8);
  const neck = new THREE.Mesh(neckGeo, materials.skinTone);
  neck.position.set(0, 1.42 * s, 0);
  group.add(neck);

  const headGeo = new THREE.SphereGeometry(0.15 * s, 16, 16);
  const head = new THREE.Mesh(headGeo, materials.skinTone);
  head.position.set(0, 1.55 * s, 0);
  group.add(head);

  // 6. Headgear (Hard Hat / Security Cap)
  if (options.uniformType === 'technician' || options.uniformType === 'supervisor') {
    const helmetGeo = new THREE.SphereGeometry(0.18 * s, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const helmet = new THREE.Mesh(
      helmetGeo,
      options.uniformType === 'supervisor' ? materials.safetyYellow : materials.crispLinen
    );
    helmet.position.set(0, 1.56 * s, 0);
    const brimGeo = new THREE.CylinderGeometry(0.22 * s, 0.22 * s, 0.03 * s, 16);
    const brim = new THREE.Mesh(
      brimGeo,
      options.uniformType === 'supervisor' ? materials.safetyYellow : materials.crispLinen
    );
    brim.position.set(0, 1.56 * s, 0.04 * s);
    group.add(helmet, brim);
  } else if (options.uniformType === 'security') {
    // Security peak cap
    const capCrownGeo = new THREE.CylinderGeometry(0.19 * s, 0.17 * s, 0.09 * s, 16);
    const capCrown = new THREE.Mesh(capCrownGeo, materials.navyUniform);
    capCrown.position.set(0, 1.63 * s, 0);
    const capBrimGeo = new THREE.CylinderGeometry(0.21 * s, 0.21 * s, 0.02 * s, 16, 1, false, 0, Math.PI);
    const capBrim = new THREE.Mesh(capBrimGeo, materials.darkSteel);
    capBrim.position.set(0, 1.6 * s, 0.08 * s);
    group.add(capCrown, capBrim);
  }

  // 7. Accessories
  if (options.accessory === 'tablet') {
    const tabletGeo = new THREE.BoxGeometry(0.28 * s, 0.03 * s, 0.2 * s);
    const tablet = new THREE.Mesh(tabletGeo, materials.glowingCyan);
    tablet.position.set(0.15 * s, 0.88 * s, 0.22 * s);
    tablet.rotation.x = Math.PI / 4;
    group.add(tablet);
  } else if (options.accessory === 'mop') {
    const mopPoleGeo = new THREE.CylinderGeometry(0.02 * s, 0.02 * s, 1.8 * s, 8);
    const mopPole = new THREE.Mesh(mopPoleGeo, materials.stainlessSteel);
    mopPole.position.set(0.32 * s, 0.9 * s, 0.15 * s);
    mopPole.rotation.z = -0.15;
    const mopHeadGeo = new THREE.BoxGeometry(0.26 * s, 0.08 * s, 0.12 * s);
    const mopHead = new THREE.Mesh(mopHeadGeo, materials.crispLinen);
    mopHead.position.set(0.45 * s, 0.04 * s, 0.15 * s);
    group.add(mopPole, mopHead);
  } else if (options.accessory === 'radio') {
    const radioGeo = new THREE.BoxGeometry(0.06 * s, 0.12 * s, 0.04 * s);
    const radio = new THREE.Mesh(radioGeo, materials.darkSteel);
    radio.position.set(0.22 * s, 0.95 * s, 0.12 * s);
    group.add(radio);
  }

  return group;
}

// =========================================================================
// STATION 0: HERO - UNIFIED WORKFORCE & FACILITY COMMAND HUB
// =========================================================================
export function createHeroWorkforceHub(isSoftwareGl: boolean) {
  const materials = getCommonMaterials(isSoftwareGl);
  const heroGroup = new THREE.Group();
  heroGroup.position.set(0, -1.5, -4.0);

  // 1. Stepped Compact Architectural Granite Base
  const plinthGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.35, 32);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    metalness: 0.8,
    roughness: 0.35,
  });
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = 0.175;
  heroGroup.add(plinth);

  // Outer Brushed Steel Trim Ring
  const trimGeo = new THREE.TorusGeometry(2.35, 0.06, 16, 64);
  const trim = new THREE.Mesh(trimGeo, materials.stainlessSteel);
  trim.rotation.x = Math.PI / 2;
  trim.position.y = 0.35;
  heroGroup.add(trim);

  // 2. Central Human Workforce Monument: 3 Stylized Personnel back-to-back
  const monumentGroup = new THREE.Group();
  monumentGroup.position.y = 0.35;

  const supervisorFig = createHumanPersonnelFigure(materials, {
    uniformType: 'supervisor',
    accessory: 'tablet',
    scale: 1.05,
  });
  supervisorFig.position.set(0, 0, 0.5);

  const securityFig = createHumanPersonnelFigure(materials, {
    uniformType: 'security',
    accessory: 'radio',
    scale: 1.05,
  });
  securityFig.position.set(0.44, 0, -0.3);
  securityFig.rotation.y = (Math.PI * 2) / 3;

  const housekeeperFig = createHumanPersonnelFigure(materials, {
    uniformType: 'housekeeper',
    accessory: 'mop',
    scale: 1.05,
  });
  housekeeperFig.position.set(-0.44, 0, -0.3);
  housekeeperFig.rotation.y = -(Math.PI * 2) / 3;

  monumentGroup.add(supervisorFig, securityFig, housekeeperFig);
  heroGroup.add(monumentGroup);

  // 3. Central Overhead MCS Facility Shield & Energy Ring
  const shieldMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.4,
    metalness: 0.8,
    roughness: 0.15,
    clearcoat: 1.0,
  });
  const shieldGeo = new THREE.OctahedronGeometry(0.55, 1);
  const shield = new THREE.Mesh(shieldGeo, shieldMat);
  shield.position.y = 2.6;
  heroGroup.add(shield);

  // 4. Orbiting Service Pillars (4 Representative 3D Service Emblems)
  const orbitGroup = new THREE.Group();
  orbitGroup.position.y = 1.8;

  // Orbit 1: Housekeeping Rotary Scrubber Disc
  const discGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
  const discMesh = new THREE.Mesh(discGeo, materials.safetyTeal);
  discMesh.position.set(2.0, 0, 0);
  orbitGroup.add(discMesh);

  // Orbit 2: Manpower Industrial Crate
  const crateGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
  const crateMesh = new THREE.Mesh(crateGeo, materials.safetyYellow);
  crateMesh.position.set(0, 0, 2.0);
  orbitGroup.add(crateMesh);

  // Orbit 3: Security Armor Badge
  const secBadgeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 6);
  const secBadgeMesh = new THREE.Mesh(secBadgeGeo, materials.chrome);
  secBadgeMesh.position.set(-2.0, 0, 0);
  orbitGroup.add(secBadgeMesh);

  // Orbit 4: Commercial Laundry Drum
  const lndMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.32, 16), materials.stainlessSteel);
  lndMesh.position.set(0, 0, -2.0);
  orbitGroup.add(lndMesh);

  heroGroup.add(orbitGroup);

  // Orbital Titanium Ring
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.03, 16, 64), materials.chrome);
  ring1.position.y = 1.8;
  ring1.rotation.x = Math.PI / 2;
  heroGroup.add(ring1);

  return {
    group: heroGroup,
    animate: (delta: number, time: number) => {
      shield.rotation.y += delta * 0.6;
      shield.position.y = 2.6 + Math.sin(time * 1.5) * 0.06;
      orbitGroup.rotation.y += delta * 0.4;
      discMesh.rotation.y += delta * 2.0;
      crateMesh.rotation.x += delta * 0.8;
      crateMesh.rotation.y += delta * 1.0;
      secBadgeMesh.rotation.z += delta * 1.2;
      lndMesh.rotation.x += delta * 1.5;
    },
  };
}

// =========================================================================
// STATION 1: HOUSEKEEPING - INDUSTRIAL FLOOR AUTO-SCRUBBER MACHINE
// =========================================================================
export function createIndustrialScrubber(isSoftwareGl: boolean) {
  const materials = getCommonMaterials(isSoftwareGl);
  const hkGroup = new THREE.Group();
  hkGroup.position.set(6.2, 0, -6);

  // 1. Industrial Scrubber Machine Assembly
  const scrubber = new THREE.Group();
  scrubber.position.set(0, 0.2, 0);
  scrubber.rotation.y = -0.35; // 3/4 aesthetic presentation angle to camera

  // A. Main Tank Chassis (Safety Teal / Blue molded body)
  const tankGeo = new THREE.BoxGeometry(1.6, 1.1, 1.2);
  const tank = new THREE.Mesh(tankGeo, materials.safetyTeal);
  tank.position.set(0, 0.75, 0);
  scrubber.add(tank);

  // Top Recovery Tank Lid & Solution Fill Cap
  const lidGeo = new THREE.CylinderGeometry(0.3, 0.32, 0.1, 16);
  const lid = new THREE.Mesh(lidGeo, materials.darkSteel);
  lid.position.set(0.35, 1.35, 0);
  scrubber.add(lid);

  // B. Operator Steering Handle & Instrument Console
  const handleGeo = new THREE.TorusGeometry(0.45, 0.05, 12, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, materials.darkSteel);
  handle.rotation.z = Math.PI;
  handle.position.set(-0.85, 1.3, 0);
  scrubber.add(handle);

  const consolePanelGeo = new THREE.BoxGeometry(0.2, 0.35, 0.5);
  const consolePanel = new THREE.Mesh(consolePanelGeo, materials.darkSteel);
  consolePanel.position.set(-0.75, 1.15, 0);
  scrubber.add(consolePanel);

  // C. Front Brush Cowling (Cast Aluminum Brush Deck)
  const deckGeo = new THREE.CylinderGeometry(0.75, 0.82, 0.25, 24);
  const deck = new THREE.Mesh(deckGeo, materials.stainlessSteel);
  deck.position.set(0.9, 0.18, 0);
  scrubber.add(deck);

  // Dual Rotary Scrubbing Disc Brushes (Floor Level)
  const brushGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.08, 16);
  const brushMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.9,
    metalness: 0.1,
  });
  const brush1 = new THREE.Mesh(brushGeo, brushMat);
  brush1.position.set(0.9, 0.05, -0.32);
  const brush2 = new THREE.Mesh(brushGeo, brushMat);
  brush2.position.set(0.9, 0.05, 0.32);
  scrubber.add(brush1, brush2);

  // D. Rear Parabolic Squeegee Vacuum Blade Assembly
  const squeegeeArcGeo = new THREE.TorusGeometry(0.85, 0.06, 8, 24, Math.PI * 0.6);
  const squeegeeBlade = new THREE.Mesh(squeegeeArcGeo, materials.safetyYellow);
  squeegeeBlade.rotation.x = Math.PI / 2;
  squeegeeBlade.rotation.z = Math.PI * 0.7;
  squeegeeBlade.position.set(-0.95, 0.08, 0);
  scrubber.add(squeegeeBlade);

  // Flexible Vacuum Hose (Ribbed black tube running up to tank)
  const hoseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.95, 0.12, 0),
    new THREE.Vector3(-0.8, 0.5, 0.1),
    new THREE.Vector3(-0.6, 0.85, 0.05),
  ]);
  const hoseGeo = new THREE.TubeGeometry(hoseCurve, 16, 0.06, 8, false);
  const hose = new THREE.Mesh(hoseGeo, materials.darkSteel);
  scrubber.add(hose);

  // E. Drive Traction Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.14, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
  const wheelLeft = new THREE.Mesh(wheelGeo, wheelMat);
  wheelLeft.rotation.x = Math.PI / 2;
  wheelLeft.position.set(-0.25, 0.3, -0.65);
  const wheelRight = new THREE.Mesh(wheelGeo, wheelMat);
  wheelRight.rotation.x = Math.PI / 2;
  wheelRight.position.set(-0.25, 0.3, 0.65);
  scrubber.add(wheelLeft, wheelRight);

  hkGroup.add(scrubber);

  // 2. Yellow Foldable "CAUTION WET FLOOR" Safety Sign (Positioned in view right next to machine)
  const signTex = createWetFloorTexture();
  const signMat = new THREE.MeshStandardMaterial({
    map: signTex,
    roughness: 0.3,
    metalness: 0.1,
  });
  const signPlaneGeo = new THREE.PlaneGeometry(0.48, 0.75);
  const signFront = new THREE.Mesh(signPlaneGeo, signMat);
  signFront.position.set(1.3, 0.4, 0.8);
  signFront.rotation.y = -Math.PI / 5;
  signFront.rotation.x = 0.12;

  const signBack = new THREE.Mesh(signPlaneGeo, signMat);
  signBack.position.set(1.3, 0.4, 0.8);
  signBack.rotation.y = (Math.PI * 4) / 5;
  signBack.rotation.x = 0.12;
  hkGroup.add(signFront, signBack);

  // 3. Realistic Wet Glossy Clean Floor Sheen Disc
  const sheenGeo = new THREE.CircleGeometry(2.0, 32);
  const sheenMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    roughness: 0.05,
    metalness: 0.2,
    transmission: isSoftwareGl ? 0 : 0.8,
    transparent: true,
    opacity: isSoftwareGl ? 0.3 : 0.55,
    clearcoat: 1.0,
  });
  const sheenDisc = new THREE.Mesh(sheenGeo, sheenMat);
  sheenDisc.rotation.x = -Math.PI / 2;
  sheenDisc.position.set(0.3, 0.02, 0);
  hkGroup.add(sheenDisc);

  // Micro Water Droplets / Polish Sparkles
  const dropletCount = isSoftwareGl ? 6 : 12;
  const droplets: THREE.Mesh[] = [];
  const dropletMat = materials.glowingCyan;
  for (let d = 0; d < dropletCount; d++) {
    const dMesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), dropletMat);
    const angle = (d / dropletCount) * Math.PI * 2;
    const r = 1.0 + (d % 3) * 0.25;
    dMesh.position.set(0.5 + Math.cos(angle) * r, 0.1 + (d % 2) * 0.12, Math.sin(angle) * r);
    hkGroup.add(dMesh);
    droplets.push(dMesh);
  }

  return {
    group: hkGroup,
    animate: (delta: number, time: number) => {
      // Rotate scrubbing brushes at high cleaning speed
      brush1.rotation.y += delta * 6.0;
      brush2.rotation.y -= delta * 6.0;

      // Subtle motor hum & steering sway
      scrubber.rotation.y = -0.35 + Math.sin(time * 0.8) * 0.05;
      scrubber.position.y = 0.2 + Math.sin(time * 4) * 0.005;

      // Rotate wheels subtly
      wheelLeft.rotation.z += delta * 0.5;
      wheelRight.rotation.z += delta * 0.5;

      // Water droplets orbital pulse
      for (let i = 0; i < droplets.length; i++) {
        droplets[i].position.y = 0.1 + Math.sin(time * 3 + i) * 0.05;
      }
    },
  };
}

// =========================================================================
// STATION 2: MANPOWER - WORKFORCE DEPLOYMENT & PERSONNEL ROSTER TREE
// =========================================================================
export function createManpowerRosterTree(isSoftwareGl: boolean) {
  const materials = getCommonMaterials(isSoftwareGl);
  const mpGroup = new THREE.Group();
  mpGroup.position.set(-6.2, 0, -14);

  // 1. Biometric Deployment Command Plinth
  const plinthGeo = new THREE.CylinderGeometry(2.3, 2.6, 0.3, 32);
  const plinth = new THREE.Mesh(plinthGeo, materials.darkSteel);
  plinth.position.y = 0.15;
  mpGroup.add(plinth);

  // Caution Hazard Outer Perimeter Edge
  const cautionTex = createCautionTexture();
  cautionTex.repeat.set(6, 1);
  const cautionBorderGeo = new THREE.CylinderGeometry(2.62, 2.62, 0.14, 32, 1, true);
  const cautionMat = new THREE.MeshStandardMaterial({
    map: cautionTex,
    roughness: 0.4,
  });
  const cautionBorder = new THREE.Mesh(cautionBorderGeo, cautionMat);
  cautionBorder.position.y = 0.22;
  mpGroup.add(cautionBorder);

  // 2. Central HR Biometric Roster Kiosk
  const kioskGroup = new THREE.Group();
  kioskGroup.position.set(0, 0.3, 0);

  const kioskPillarGeo = new THREE.BoxGeometry(0.42, 2.1, 0.25);
  const kioskPillar = new THREE.Mesh(kioskPillarGeo, materials.darkSteel);
  kioskPillar.position.y = 1.05;
  kioskGroup.add(kioskPillar);

  // Angled Digital Roster Screen
  const rosterTex = createRosterDashboardTexture();
  const screenMat = new THREE.MeshStandardMaterial({
    map: rosterTex,
    roughness: 0.2,
    metalness: 0.1,
    emissive: 0x0284c7,
    emissiveIntensity: 0.25,
  });
  const screenGeo = new THREE.PlaneGeometry(1.4, 0.75);
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.85, 0.2);
  screen.rotation.x = -0.18;
  kioskGroup.add(screen);

  // Biometric Fingerprint/Card Scanner Beacon
  const scannerGeo = new THREE.BoxGeometry(0.28, 0.08, 0.22);
  const scanner = new THREE.Mesh(scannerGeo, materials.glowingGreen);
  scanner.position.set(0, 1.35, 0.2);
  kioskGroup.add(scanner);

  mpGroup.add(kioskGroup);

  // 3. Multi-Role Workforce Team (3 Stylized On-Duty Personnel)
  // Figure A: Lead Shift Supervisor (Hard Hat, Clipboard, overseeing)
  const supervisor = createHumanPersonnelFigure(materials, {
    uniformType: 'supervisor',
    accessory: 'tablet',
    scale: 0.95,
  });
  supervisor.position.set(-1.0, 0.3, 0.6);
  supervisor.rotation.y = 0.4;
  mpGroup.add(supervisor);

  // Figure B: Skilled Industrial Technician (Hi-vis vest, tools)
  const tech = createHumanPersonnelFigure(materials, {
    uniformType: 'technician',
    accessory: 'tool',
    scale: 0.95,
  });
  tech.position.set(1.0, 0.3, 0.6);
  tech.rotation.y = -0.4;
  mpGroup.add(tech);

  // Figure C: Logistics & Warehouse Handler (Moving an industrial pallet crate)
  const warehouseWorker = createHumanPersonnelFigure(materials, {
    uniformType: 'technician',
    accessory: 'tool',
    scale: 0.92,
  });
  warehouseWorker.position.set(0, 0.3, -1.1);
  warehouseWorker.rotation.y = Math.PI;
  mpGroup.add(warehouseWorker);

  // Industrial Logistics Pallet Crate next to warehouse worker
  const crateGeo = new THREE.BoxGeometry(0.65, 0.55, 0.65);
  const crateMesh = new THREE.Mesh(crateGeo, materials.safetyYellow);
  crateMesh.position.set(0, 0.55, -0.55);
  mpGroup.add(crateMesh);

  // 4. Shift Allocation Data Streams (Curved Glowing Conduit Arcs)
  const arcCurves = [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.0, 0),
      new THREE.Vector3(-0.5, 1.6, 0.4),
      new THREE.Vector3(-1.0, 1.2, 0.6),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.0, 0),
      new THREE.Vector3(0.5, 1.6, 0.4),
      new THREE.Vector3(1.0, 1.2, 0.6),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.0, 0),
      new THREE.Vector3(0, 1.6, -0.6),
      new THREE.Vector3(0, 1.2, -1.1),
    ]),
  ];

  const arcMeshes: THREE.Mesh[] = [];
  arcCurves.forEach((curve) => {
    const tubeGeo = new THREE.TubeGeometry(curve, 18, 0.025, 8, false);
    const tube = new THREE.Mesh(tubeGeo, materials.glowingCyan);
    mpGroup.add(tube);
    arcMeshes.push(tube);
  });

  return {
    group: mpGroup,
    animate: (delta: number, time: number) => {
      // Data pulse in arc conduits
      for (let i = 0; i < arcMeshes.length; i++) {
        const mat = arcMeshes[i].material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.4 + Math.sin(time * 3 + i) * 0.3;
      }
      // Biometric scanner breathing light
      const scanMat = scanner.material as THREE.MeshStandardMaterial;
      scanMat.emissiveIntensity = 0.5 + Math.sin(time * 4) * 0.35;
    },
  };
}

// =========================================================================
// STATION 3: SECURITY - ACCESS CONTROL TURNSTILE & CCTV SPEED DOME
// =========================================================================
export function createSecurityTurnstileStation(isSoftwareGl: boolean) {
  const materials = getCommonMaterials(isSoftwareGl);
  const secGroup = new THREE.Group();
  secGroup.position.set(6.2, 0, -22);

  // 1. Granite Security Checkpoint Platform
  const platformGeo = new THREE.BoxGeometry(3.4, 0.25, 2.8);
  const platform = new THREE.Mesh(platformGeo, materials.darkSteel);
  platform.position.y = 0.125;
  secGroup.add(platform);

  // 2. Twin Optical Speed Gates / Turnstiles
  const turnstileTex = createTurnstileTopTexture();
  const topMat = new THREE.MeshStandardMaterial({
    map: turnstileTex,
    roughness: 0.15,
    metalness: 0.2,
  });

  const gateGroup = new THREE.Group();
  gateGroup.position.y = 0.25;

  // Left Cabinet Pedestal
  const pedestalGeo = new THREE.BoxGeometry(0.38, 1.15, 1.6);
  const leftPedestal = new THREE.Mesh(pedestalGeo, materials.stainlessSteel);
  leftPedestal.position.set(-0.75, 0.575, 0);

  const leftTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 1.62), topMat);
  leftTop.position.set(-0.75, 1.18, 0);
  gateGroup.add(leftPedestal, leftTop);

  // Right Cabinet Pedestal
  const rightPedestal = new THREE.Mesh(pedestalGeo, materials.stainlessSteel);
  rightPedestal.position.set(0.75, 0.575, 0);

  const rightTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 1.62), topMat);
  rightTop.position.set(0.75, 1.18, 0);
  gateGroup.add(rightPedestal, rightTop);

  // Dual Tempered Glass Swing Barrier Wings (Open & Close smoothly)
  const barrierWingGeo = new THREE.BoxGeometry(0.7, 0.9, 0.035);
  const barrierWingMat = materials.glass;

  const leftWingPivot = new THREE.Group();
  leftWingPivot.position.set(-0.55, 0.65, 0);
  const leftWing = new THREE.Mesh(barrierWingGeo, barrierWingMat);
  leftWing.position.set(0.35, 0, 0);
  leftWingPivot.add(leftWing);
  gateGroup.add(leftWingPivot);

  const rightWingPivot = new THREE.Group();
  rightWingPivot.position.set(0.55, 0.65, 0);
  const rightWing = new THREE.Mesh(barrierWingGeo, barrierWingMat);
  rightWing.position.set(-0.35, 0, 0);
  rightWingPivot.add(rightWing);
  gateGroup.add(rightWingPivot);

  secGroup.add(gateGroup);

  // 3. Uniformed Security Guard Officer Sentry
  const securityGuard = createHumanPersonnelFigure(materials, {
    uniformType: 'security',
    accessory: 'radio',
    scale: 1.0,
  });
  securityGuard.position.set(1.25, 0.25, -0.3);
  securityGuard.rotation.y = -0.5;
  secGroup.add(securityGuard);

  // 4. Overhead PTZ Security Dome Camera on Architectural Gantry Boom
  const boomPostGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.9, 12);
  const boomPost = new THREE.Mesh(boomPostGeo, materials.stainlessSteel);
  boomPost.position.set(-1.2, 1.45, -0.9);
  secGroup.add(boomPost);

  const boomArmGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.3, 12);
  const boomArm = new THREE.Mesh(boomArmGeo, materials.stainlessSteel);
  boomArm.rotation.z = Math.PI / 2;
  boomArm.position.set(-0.6, 2.85, -0.9);
  secGroup.add(boomArm);

  // PTZ Camera Head
  const ptzHead = new THREE.Group();
  ptzHead.position.set(0, 2.75, -0.9);

  const cameraBodyGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.18, 16);
  const cameraBody = new THREE.Mesh(cameraBodyGeo, materials.darkSteel);
  ptzHead.add(cameraBody);

  const domeGeo = new THREE.SphereGeometry(0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const domeMesh = new THREE.Mesh(domeGeo, materials.glass);
  domeMesh.rotation.x = Math.PI;
  domeMesh.position.y = -0.09;
  ptzHead.add(domeMesh);

  // Laser Clearance Sweep Cone
  const laserConeGeo = new THREE.ConeGeometry(1.4, 2.6, 16, 1, true);
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const laserCone = new THREE.Mesh(laserConeGeo, laserMat);
  laserCone.position.y = -1.3;
  ptzHead.add(laserCone);

  secGroup.add(ptzHead);

  return {
    group: secGroup,
    animate: (_delta: number, time: number) => {
      // Authentic Access Control Swing Gate Cycle (Open for authorized passage, then close)
      const gateCycle = Math.sin(time * 1.4);
      const openAngle = gateCycle > 0.2 ? Math.min(Math.PI / 2.2, (gateCycle - 0.2) * 2.0) : 0;
      leftWingPivot.rotation.y = openAngle;
      rightWingPivot.rotation.y = -openAngle;

      // PTZ Camera Surveillance Pan & Tilt
      ptzHead.rotation.y = Math.sin(time * 0.7) * 0.6;
      ptzHead.rotation.x = 0.2 + Math.sin(time * 0.5) * 0.1;
    },
  };
}

// =========================================================================
// STATION 4: COMMERCIAL LAUNDRY - INDUSTRIAL WASHER-EXTRACTOR & LINEN TROLLEY
// =========================================================================
export function createCommercialLaundryUnit(isSoftwareGl: boolean) {
  const materials = getCommonMaterials(isSoftwareGl);
  const lndGroup = new THREE.Group();
  lndGroup.position.set(-6.2, 0, -30);

  // 1. Concrete Vibration Damper Foundation
  const basePlinthGeo = new THREE.BoxGeometry(3.2, 0.25, 2.6);
  const basePlinth = new THREE.Mesh(basePlinthGeo, materials.darkSteel);
  basePlinth.position.y = 0.125;
  lndGroup.add(basePlinth);

  // 2. Heavy Industrial 50kg Washer-Extractor Machine
  const washer = new THREE.Group();
  washer.position.set(-0.35, 0.25, 0);
  washer.rotation.y = 0.35; // Angled beauty presentation

  // Main Stainless Steel Cabinet Housing
  const cabinetGeo = new THREE.BoxGeometry(1.8, 2.0, 1.6);
  const cabinet = new THREE.Mesh(cabinetGeo, materials.stainlessSteel);
  cabinet.position.y = 1.0;
  washer.add(cabinet);

  // Front Porthole Door Bezel (Chrome Ring)
  const bezelGeo = new THREE.TorusGeometry(0.65, 0.07, 16, 48);
  const bezel = new THREE.Mesh(bezelGeo, materials.chrome);
  bezel.position.set(0, 1.0, 0.82);
  washer.add(bezel);

  // Porthole Door Handle Lever
  const latchGeo = new THREE.BoxGeometry(0.1, 0.3, 0.07);
  const latch = new THREE.Mesh(latchGeo, materials.chrome);
  latch.position.set(0.68, 1.0, 0.86);
  washer.add(latch);

  // Heavy-duty Hinge Block
  const hingeGeo = new THREE.BoxGeometry(0.1, 0.35, 0.08);
  const hinge = new THREE.Mesh(hingeGeo, materials.darkSteel);
  hinge.position.set(-0.68, 1.0, 0.84);
  washer.add(hinge);

  // Circular Transparent Safety Door Glass
  const glassGeo = new THREE.CircleGeometry(0.6, 32);
  const doorGlass = new THREE.Mesh(glassGeo, materials.glass);
  doorGlass.position.set(0, 1.0, 0.83);
  washer.add(doorGlass);

  // Internal Perforated Stainless Drum that Spins Inside
  const drumGroup = new THREE.Group();
  drumGroup.position.set(0, 1.0, 0.18);

  const drumCylinderGeo = new THREE.CylinderGeometry(0.56, 0.56, 1.0, 24, 1, true);
  const drumMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.9,
    roughness: 0.2,
    wireframe: true,
  });
  const drumCylinder = new THREE.Mesh(drumCylinderGeo, drumMat);
  drumCylinder.rotation.x = Math.PI / 2;
  drumGroup.add(drumCylinder);

  // Tumbling Folded Linens inside the drum
  const linenCount = 6;
  const tumblingLinens: THREE.Mesh[] = [];
  for (let l = 0; l < linenCount; l++) {
    const lMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.1, 0.22),
      l % 2 === 0 ? materials.crispLinen : materials.blueLinen
    );
    const angle = (l / linenCount) * Math.PI * 2;
    lMesh.position.set(Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, (l - linenCount / 2) * 0.09);
    drumGroup.add(lMesh);
    tumblingLinens.push(lMesh);
  }
  washer.add(drumGroup);

  // Digital PLC Touchscreen Console
  const washerTex = createWasherDisplayTexture();
  const washerScreenMat = new THREE.MeshStandardMaterial({
    map: washerTex,
    roughness: 0.2,
    metalness: 0.1,
    emissive: 0x0284c7,
    emissiveIntensity: 0.3,
  });
  const washerScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.58), washerScreenMat);
  washerScreen.position.set(0.48, 1.62, 0.82);
  washer.add(washerScreen);

  // Top Water/Steam Utility Pipes with Pressure Gauge
  const pipeMat = materials.stainlessSteel;
  const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.7, 12), pipeMat);
  pipe1.position.set(-0.35, 2.15, 0);
  const pipe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.7, 12), pipeMat);
  pipe2.position.set(0.35, 2.15, 0);
  washer.add(pipe1, pipe2);

  const gaugeTex = createPressureGaugeTexture();
  const gaugeMat = new THREE.MeshStandardMaterial({ map: gaugeTex, roughness: 0.2 });
  const gauge = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), gaugeMat);
  gauge.position.set(0, 2.05, 0.35);
  washer.add(gauge);

  lndGroup.add(washer);

  // 3. Mobile Laundry Trolley / Hamper Cart
  const trolley = new THREE.Group();
  trolley.position.set(1.15, 0.25, 0.25);

  // Blue Vinyl Hamper Tub
  const tubGeo = new THREE.BoxGeometry(0.8, 0.75, 0.65);
  const tubMat = materials.safetyTeal;
  const tub = new THREE.Mesh(tubGeo, tubMat);
  tub.position.y = 0.5;
  trolley.add(tub);

  // Cart Tubular Steel Frame
  const frameGeo = new THREE.BoxGeometry(0.84, 0.05, 0.68);
  const frame = new THREE.Mesh(frameGeo, materials.chrome);
  frame.position.y = 0.12;
  trolley.add(frame);

  // 4 Caster Wheels
  const casterGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 12);
  const casterMat = materials.darkSteel;
  for (let c = 0; c < 4; c++) {
    const caster = new THREE.Mesh(casterGeo, casterMat);
    caster.rotation.z = Math.PI / 2;
    caster.position.set(
      c % 2 === 0 ? 0.34 : -0.34,
      0.07,
      c < 2 ? 0.24 : -0.24
    );
    trolley.add(caster);
  }

  // Stacks of Fresh Folded White Linens inside cart
  for (let s = 0; s < 3; s++) {
    const stack = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.1, 0.45), materials.crispLinen);
    stack.position.set(0, 0.68 + s * 0.1, 0);
    trolley.add(stack);
  }

  lndGroup.add(trolley);

  return {
    group: lndGroup,
    animate: (delta: number, _time: number) => {
      // Rapid spinning of the industrial wash drum
      drumGroup.rotation.z += delta * 4.5;

      // Tumbling linens inside drum
      for (let l = 0; l < tumblingLinens.length; l++) {
        tumblingLinens[l].rotation.z += delta * 5.0;
      }
    },
  };
}

// =========================================================================
// STATION 5: NEXUS / ESTIMATOR - INTEGRATED CORPORATE FACILITY CAMPUS
// =========================================================================
export function createFacilityOverviewCampus(isSoftwareGl: boolean) {
  const materials = getCommonMaterials(isSoftwareGl);
  const campusGroup = new THREE.Group();
  campusGroup.position.set(0, 0, -38);

  // 1. Campus Foundation Plaza
  const plazaGeo = new THREE.CylinderGeometry(4.8, 5.2, 0.4, 32);
  const plaza = new THREE.Mesh(plazaGeo, materials.darkSteel);
  plaza.position.y = 0.2;
  campusGroup.add(plaza);

  // 2. Modern Glass Tower Modules (Commercial Complex Managed by MCS)
  const towerGeo1 = new THREE.BoxGeometry(1.6, 3.8, 1.4);
  const towerMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    metalness: 0.85,
    roughness: 0.15,
    transmission: isSoftwareGl ? 0 : 0.85,
    transparent: true,
    opacity: isSoftwareGl ? 0.45 : 0.9,
    clearcoat: 1.0,
  });
  const tower1 = new THREE.Mesh(towerGeo1, towerMat);
  tower1.position.set(-1.2, 2.3, -0.6);
  campusGroup.add(tower1);

  const towerGeo2 = new THREE.BoxGeometry(1.4, 2.8, 1.2);
  const tower2 = new THREE.Mesh(towerGeo2, towerMat);
  tower2.position.set(1.1, 1.8, -0.4);
  campusGroup.add(tower2);

  // 3. Central Holographic Staffing Command Beacon
  const beaconCoreGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
  const beaconCore = new THREE.Mesh(beaconCoreGeo, materials.glowingCyan);
  beaconCore.position.set(0, 0.55, 0.9);
  campusGroup.add(beaconCore);

  const ringGeo = new THREE.TorusGeometry(2.4, 0.05, 16, 64);
  const ring = new THREE.Mesh(ringGeo, materials.chrome);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.2;
  campusGroup.add(ring);

  // 4 Service Satellites orbiting the facility
  const serviceSatGroup = new THREE.Group();
  serviceSatGroup.position.set(0, 1.2, 0);
  const satMat = materials.glowingCyan;
  for (let s = 0; s < 4; s++) {
    const sat = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), satMat);
    const angle = (s / 4) * Math.PI * 2;
    sat.position.set(Math.cos(angle) * 2.4, 0, Math.sin(angle) * 2.4);
    serviceSatGroup.add(sat);
  }
  campusGroup.add(serviceSatGroup);

  return {
    group: campusGroup,
    animate: (delta: number, _time: number) => {
      serviceSatGroup.rotation.y += delta * 0.5;
      ring.rotation.z += delta * 0.2;
    },
  };
}
