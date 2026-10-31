export interface SampleScenario {
  id: string;
  title: string;
  category: 'electronics' | 'agritech' | 'uicoding' | 'stem' | 'medical' | 'general';
  categoryLabel: string;
  badge: string;
  prompt: string;
  defaultRoi?: { x: number; y: number; width: number; height: number; label: string };
  imageUri: string;
  description: string;
  suggestedQuestions: string[];
}

// Crisp, high-fidelity inline SVG data URIs for immediate, reliable offline & live testing
export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'pcb-electronics',
    title: 'High-Density Embedded PCB with QFN & SMD Rail',
    category: 'electronics',
    categoryLabel: 'Electronics & Hardware',
    badge: 'Hardware Triage',
    prompt: 'Perform IPC-A-610 inspection on this PCB layout. Scan for solder bridge risks between pins 18-24, check capacitor decoupling proximity, and audit IC footprint orientation.',
    defaultRoi: { x: 38, y: 32, width: 28, height: 35, label: 'QFN-48 MCU & Solder Pads' },
    description: 'Autonomous hardware diagnostic for solder bridges, cold joints, missing decoupling capacitors, and component thermal throttling.',
    suggestedQuestions: [
      'Is there any solder bridging between adjacent fine-pitch QFN pins?',
      'Check if bypass capacitor C7 is placed within 2mm of the VDD pin.',
      'Provide SMD rework instructions and soldering temperature profile.',
    ],
    imageUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23064e3b" stroke-width="0.5" opacity="0.3"/>
        </pattern>
        <linearGradient id="pcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23064e3b"/>
          <stop offset="100%" stop-color="%23022c22"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(%23pcbGrad)"/>
      <rect width="800" height="600" fill="url(%23grid)"/>
      
      <!-- Copper traces -->
      <path d="M 120 180 L 280 180 L 320 220 L 400 220" stroke="%23d97706" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M 120 200 L 270 200 L 310 240 L 400 240" stroke="%23d97706" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M 480 220 L 560 220 L 620 160 L 680 160" stroke="%23d97706" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M 480 260 L 580 260 L 640 320 L 700 320" stroke="%23d97706" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M 440 360 L 440 460 L 380 510 L 250 510" stroke="%23d97706" stroke-width="3" fill="none" opacity="0.8"/>
      
      <!-- MCU QFN Package -->
      <rect x="360" y="200" width="160" height="160" rx="8" fill="%2318181b" stroke="%2352525b" stroke-width="2"/>
      <circle cx="380" cy="220" r="4" fill="%23a1a1aa"/>
      <text x="440" y="275" fill="%23f4f4f5" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">GEMMA-MCU4</text>
      <text x="440" y="295" fill="%2371717a" font-family="monospace" font-size="10" text-anchor="middle">ARM CORTEX-M33</text>
      
      <!-- QFN Pins with simulated solder bridge -->
      <g fill="%23e4e4e7">
        <!-- Top pins -->
        <rect x="380" y="190" width="8" height="12" rx="1"/>
        <rect x="400" y="190" width="8" height="12" rx="1"/>
        <rect x="420" y="190" width="8" height="12" rx="1"/>
        <rect x="440" y="190" width="8" height="12" rx="1"/>
        <rect x="460" y="190" width="8" height="12" rx="1"/>
        <rect x="480" y="190" width="8" height="12" rx="1"/>
        
        <!-- Bottom pins -->
        <rect x="380" y="358" width="8" height="12" rx="1"/>
        <rect x="400" y="358" width="8" height="12" rx="1"/>
        <rect x="420" y="358" width="8" height="12" rx="1"/>
        <!-- Bridge defect -->
        <rect x="440" y="358" width="28" height="12" rx="2" fill="%23ef4444"/>
        <rect x="480" y="358" width="8" height="12" rx="1"/>
      </g>
      
      <!-- SMD Capacitors and Resistors -->
      <g>
        <rect x="300" y="220" width="28" height="14" fill="%23b45309" stroke="%23e4e4e7" stroke-width="2"/>
        <text x="314" y="212" fill="%23fef08a" font-family="monospace" font-size="10" text-anchor="middle">C14 100nF</text>
        
        <rect x="300" y="250" width="28" height="14" fill="%23b45309" stroke="%23e4e4e7" stroke-width="2"/>
        <text x="314" y="244" fill="%23fef08a" font-family="monospace" font-size="10" text-anchor="middle">C15 10uF</text>
        
        <rect x="540" y="220" width="32" height="16" fill="%2327272a" stroke="%23e4e4e7" stroke-width="2"/>
        <text x="556" y="214" fill="%23e4e4e7" font-family="monospace" font-size="10" text-anchor="middle">R12 4k7</text>
      </g>
      
      <!-- Power inductor -->
      <rect x="220" y="360" width="70" height="70" rx="6" fill="%233f3f46" stroke="%23a1a1aa" stroke-width="2"/>
      <text x="255" y="400" fill="%23f4f4f5" font-family="monospace" font-size="12" text-anchor="middle">4R7 Shielded</text>

      <!-- Warning Annotation Badge -->
      <rect x="410" y="380" width="140" height="30" rx="4" fill="%23991b1b" opacity="0.9"/>
      <text x="480" y="400" fill="%23fef2f2" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">SOLDER BRIDGE DETECTED</text>
    </svg>`,
  },
  {
    id: 'agritech-crop-disease',
    title: 'Precision AgriTech - Foliar Blight & Rust Triage',
    category: 'agritech',
    categoryLabel: 'Agricultural Robotics',
    badge: 'Drone & Field Vision',
    prompt: 'Examine this tomato crop leaf. Differentiate between Early Blight (Alternaria solani), Septoria leaf spot, and nutrient chlorosis. Recommend organic and precision chemical treatment.',
    defaultRoi: { x: 30, y: 25, width: 40, height: 45, label: 'Primary Necrotic Lesion with Halo' },
    description: 'Field diagnostic assistant for smart agricultural drones and solar-powered edge cameras.',
    suggestedQuestions: [
      'What is the disease progression stage and pathogen classification?',
      'Calculate the estimated percentage of photosynthetic leaf area compromised.',
      'What bio-fungicide or copper spray dosage is recommended for drone application?',
    ],
    imageUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <radialGradient id="leafGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="%234ade80"/>
          <stop offset="70%" stop-color="%2315803d"/>
          <stop offset="100%" stop-color="%2314532d"/>
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="%230f172a"/>
      
      <!-- Leaf Outline -->
      <path d="M 400 60 C 560 120 680 280 620 460 C 560 560 440 560 400 580 C 360 560 240 560 180 460 C 120 280 240 120 400 60 Z" fill="url(%23leafGrad)" stroke="%2322c55e" stroke-width="2"/>
      
      <!-- Main and Secondary Veins -->
      <path d="M 400 70 L 400 570" stroke="%2386efac" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      <path d="M 400 160 Q 480 200 560 210" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 400 240 Q 520 290 580 320" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 400 340 Q 500 390 550 430" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 400 180 Q 320 220 240 230" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 400 270 Q 280 320 220 350" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/>
      
      <!-- Blight Lesions (Alternaria concentric rings) -->
      <g>
        <!-- Lesion 1 -->
        <circle cx="330" cy="280" r="42" fill="%2378350f" opacity="0.85"/>
        <circle cx="330" cy="280" r="30" fill="%23451a03" stroke="%23fbbf24" stroke-width="1.5"/>
        <circle cx="330" cy="280" r="16" fill="%231c1917"/>
        <circle cx="330" cy="280" r="54" fill="none" stroke="%23facc15" stroke-dasharray="4 4" stroke-width="2" opacity="0.9"/>
        
        <!-- Lesion 2 -->
        <circle cx="480" cy="340" r="32" fill="%2378350f" opacity="0.85"/>
        <circle cx="480" cy="340" r="20" fill="%23451a03"/>
        <circle cx="480" cy="340" r="42" fill="none" stroke="%23facc15" stroke-dasharray="3 3" stroke-width="2" opacity="0.8"/>
        
        <!-- Minor spots -->
        <circle cx="280" cy="380" r="12" fill="%23451a03"/>
        <circle cx="520" cy="240" r="16" fill="%23451a03"/>
      </g>
      
      <!-- Diagnostic Overlay HUD -->
      <rect x="40" y="40" width="220" height="85" rx="8" fill="%23020617" opacity="0.85" stroke="%23334155"/>
      <text x="55" y="68" fill="%23e2e8f0" font-family="monospace" font-size="12" font-weight="bold">TARGET: Solanum lycopersicum</text>
      <text x="55" y="90" fill="%23f87171" font-family="monospace" font-size="11">PATHOLOGY: Alternaria solani</text>
      <text x="55" y="110" fill="%2338bdf8" font-family="monospace" font-size="10">CONFIDENCE: 94.8% (Gemma 4 Edge)</text>
    </svg>`,
  },
  {
    id: 'ui-reverse-engineering',
    title: 'UI Vision to Code - Modern Analytics Dashboard',
    category: 'uicoding',
    categoryLabel: 'Vision-to-Code',
    badge: 'Frontend Architect',
    prompt: 'Deconstruct this dark-mode dashboard UI. Extract typography hierarchy, token palette, glassmorphism CSS, and generate ready-to-run React 19 + Tailwind CSS code.',
    defaultRoi: { x: 45, y: 20, width: 50, height: 55, label: 'Analytics Metric Card & Chart' },
    description: 'Transform mockups, wireframes, and screenshots directly into pixel-perfect React components.',
    suggestedQuestions: [
      'Extract the primary color hex tokens and typography styles.',
      'Generate a clean, reusable React component for the metrics card.',
      'Check contrast ratio accessibility for WCAG 2.1 AA compliance.',
    ],
    imageUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="%2309090b"/>
      
      <!-- Top Nav -->
      <rect x="30" y="30" width="740" height="50" rx="10" fill="%2318181b" stroke="%2327272a"/>
      <circle cx="65" cy="55" r="12" fill="%236366f1"/>
      <rect x="95" y="47" width="120" height="16" rx="4" fill="%233f3f46"/>
      <rect x="620" y="45" width="130" height="22" rx="6" fill="%234f46e5"/>
      <text x="685" y="60" fill="%23ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Deploy Agent</text>
      
      <!-- Left Sidebar -->
      <rect x="30" y="100" width="180" height="470" rx="12" fill="%2318181b" stroke="%2327272a"/>
      <rect x="50" y="130" width="140" height="32" rx="8" fill="%2327272a"/>
      <rect x="50" y="175" width="140" height="28" rx="6" fill="%231e1e24"/>
      <rect x="50" y="215" width="140" height="28" rx="6" fill="%231e1e24"/>
      <rect x="50" y="255" width="140" height="28" rx="6" fill="%231e1e24"/>
      
      <!-- Main Content Cards -->
      <!-- Card 1 -->
      <rect x="230" y="100" width="250" height="130" rx="12" fill="%2318181b" stroke="%233f3f46" stroke-width="1.5"/>
      <text x="250" y="135" fill="%23a1a1aa" font-family="sans-serif" font-size="12">Gemma 4 Edge Throughput</text>
      <text x="250" y="180" fill="%23ffffff" font-family="monospace" font-size="32" font-weight="bold">42.8 t/s</text>
      <text x="250" y="210" fill="%2310b981" font-family="sans-serif" font-size="12">+18.4% vs llama-3.2</text>
      
      <!-- Card 2 -->
      <rect x="500" y="100" width="270" height="130" rx="12" fill="%2318181b" stroke="%233f3f46" stroke-width="1.5"/>
      <text x="520" y="135" fill="%23a1a1aa" font-family="sans-serif" font-size="12">Quantized VRAM Footprint</text>
      <text x="520" y="180" fill="%2338bdf8" font-family="monospace" font-size="32" font-weight="bold">5.8 GB</text>
      <text x="520" y="210" fill="%23a1a1aa" font-family="sans-serif" font-size="12">Fits Jetson Orin Nano (8GB)</text>
      
      <!-- Big Chart Area -->
      <rect x="230" y="250" width="540" height="320" rx="12" fill="%2318181b" stroke="%2327272a"/>
      <text x="260" y="285" fill="%23ffffff" font-family="sans-serif" font-size="15" font-weight="600">Multimodal Token Latency Benchmark (TTFT vs Generation)</text>
      
      <!-- Sparkline graph -->
      <path d="M 260 510 L 320 480 L 380 490 L 440 420 L 500 450 L 560 380 L 620 390 L 680 330 L 730 310" stroke="%236366f1" stroke-width="3" fill="none"/>
      <circle cx="730" cy="310" r="5" fill="%23818cf8"/>
      
      <!-- Grid lines -->
      <line x1="260" y1="520" x2="730" y2="520" stroke="%2327272a" stroke-width="1"/>
      <line x1="260" y1="440" x2="730" y2="440" stroke="%2327272a" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="260" y1="360" x2="730" y2="360" stroke="%2327272a" stroke-width="1" stroke-dasharray="3 3"/>
    </svg>`,
  },
  {
    id: 'stem-maxwell-equations',
    title: 'STEM Scientific Vision - Maxwell & Calculus Derivation',
    category: 'stem',
    categoryLabel: 'Scientific & Math Vision',
    badge: 'STEM Reasoning',
    prompt: 'Transcribe this handwritten electromagnetism equation into LaTeX. Deconstruct the physical meaning of each integral term, verify sign convention with Lenz’s Law, and derive the differential curl form.',
    defaultRoi: { x: 20, y: 25, width: 60, height: 50, label: 'Handwritten Integral Maxwell Equation' },
    description: 'Multimodal math & STEM solver for research papers, chalkboards, and handwritten notes.',
    suggestedQuestions: [
      'Transcribe all handwritten equations and symbols into LaTeX.',
      'Prove how Stokes Theorem transforms this into differential curl notation.',
      'Identify what physical anomaly occurs if the negative sign is removed.',
    ],
    imageUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="%231e293b"/>
          <stop offset="100%" stop-color="%230f172a"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(%23paperGrad)"/>
      
      <!-- Grid lines for engineering notepad -->
      <pattern id="stemGrid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="%23334155" stroke-width="0.5" opacity="0.4"/>
      </pattern>
      <rect width="800" height="600" fill="url(%23stemGrid)"/>
      
      <!-- Header notation -->
      <text x="60" y="70" fill="%2394a3b8" font-family="monospace" font-size="16">PHYS 301 // ELECTRODYNAMICS DERIVATION</text>
      
      <!-- Handwritten mathematical formula stylized -->
      <g stroke="%2338bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Contour integral -->
        <path d="M 120 220 C 110 180 135 170 145 200 C 155 240 140 300 130 330 C 120 350 145 350 150 330"/>
        <ellipse cx="138" cy="250" rx="14" ry="10" stroke-width="2"/>
        
        <!-- E · dl -->
        <text x="180" y="270" fill="%23f8fafc" font-family="serif" font-size="44" font-style="italic">E · dl</text>
        
        <!-- Equals minus -->
        <line x1="280" y1="250" x2="315" y2="250" stroke="%23f8fafc"/>
        <line x1="280" y1="262" x2="315" y2="262" stroke="%23f8fafc"/>
        <line x1="335" y1="256" x2="355" y2="256" stroke="%23f43f5e" stroke-width="4"/>
        
        <!-- d/dt partial -->
        <path d="M 380 230 C 375 220 395 210 390 235 L 375 245 C 385 245 395 245 400 240"/>
        <line x1="370" y1="252" x2="405" y2="252" stroke="%23f8fafc" stroke-width="2"/>
        <text x="375" y="275" fill="%23f8fafc" font-family="serif" font-size="24" font-style="italic">∂t</text>
        
        <!-- Surface double integral -->
        <path d="M 430 200 C 420 180 435 175 440 210 L 435 310 C 430 330 445 330 450 310"/>
        <path d="M 455 200 C 445 180 460 175 465 210 L 460 310 C 455 330 470 330 475 310"/>
        
        <!-- B · dA -->
        <text x="500" y="270" fill="%23f8fafc" font-family="serif" font-size="44" font-style="italic">B · dA</text>
      </g>
      
      <!-- Student handwritten notes below -->
      <text x="100" y="420" fill="%23facc15" font-family="sans-serif" font-size="18" font-style="italic">Note: Negative sign accounts for Lenz's Law (Induced EMF opposes ΔΦ)</text>
      <text x="100" y="460" fill="%2394a3b8" font-family="sans-serif" font-size="16">Apply Stokes' Theorem: ∫(∇ × E) · dA = -∫(∂B/∂t) · dA</text>
      <rect x="90" y="490" width="340" height="50" rx="8" fill="%23042f2e" stroke="%2314b8a6"/>
      <text x="110" y="522" fill="%232dd4bf" font-family="monospace" font-size="18" font-weight="bold">∇ × E = -∂B/∂t (Differential)</text>
    </svg>`,
  },
  {
    id: 'biomedical-imaging-triage',
    title: 'Biomedical Imaging & Diagnostic Assistance',
    category: 'medical',
    categoryLabel: 'Health & BioMedical',
    badge: 'Clinical Copilot',
    prompt: 'Examine this simulated thoracic radiograph study. Identify anatomical orientation, costophrenic angles, cardiothoracic ratio, and assess for focal parenchymal opacities.',
    defaultRoi: { x: 35, y: 30, width: 32, height: 40, label: 'Thoracic Cavity & Cardiac Silhouette' },
    description: 'High-precision visual triage for medical students, clinical research, and remote telemedicine.',
    suggestedQuestions: [
      'Estimate the cardiothoracic ratio (CTR) and indicate if cardiomegaly is present.',
      'Inspect bilateral costophrenic sulci for pleural effusion blunting.',
      'Summarize key clinical findings with standard radiological nomenclature.',
    ],
    imageUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="%23030712"/>
      
      <!-- Simulated Thorax X-Ray Grayscale Shadowing -->
      <path d="M 240 120 C 180 200 160 340 180 480 C 260 520 340 510 380 490 L 380 120 Z" fill="%23374151" opacity="0.6"/>
      <path d="M 560 120 C 620 200 640 340 620 480 C 540 520 460 510 420 490 L 420 120 Z" fill="%23374151" opacity="0.6"/>
      
      <!-- Cardiac silhouette -->
      <path d="M 370 260 C 320 320 300 420 360 480 C 420 480 450 420 440 320 Z" fill="%23e5e7eb" opacity="0.8"/>
      
      <!-- Spine & Clavicles -->
      <rect x="390" y="100" width="20" height="420" fill="%239ca3af" opacity="0.7"/>
      <path d="M 260 140 Q 340 180 400 170" stroke="%239ca3af" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.75"/>
      <path d="M 540 140 Q 460 180 400 170" stroke="%239ca3af" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.75"/>
      
      <!-- Rib arcs -->
      <g stroke="%236b7280" stroke-width="4" fill="none" opacity="0.5">
        <path d="M 280 220 Q 340 260 400 250"/>
        <path d="M 270 270 Q 330 310 400 300"/>
        <path d="M 260 320 Q 320 360 400 350"/>
        <path d="M 520 220 Q 460 260 400 250"/>
        <path d="M 530 270 Q 470 310 400 300"/>
        <path d="M 540 320 Q 480 360 400 350"/>
      </g>
      
      <!-- HUD Calibration Marker -->
      <rect x="50" y="50" width="160" height="70" rx="6" fill="%23111827" stroke="%23374151"/>
      <text x="65" y="75" fill="%23f9fafb" font-family="monospace" font-size="12" font-weight="bold">PA CHEST VIEW</text>
      <text x="65" y="95" fill="%239ca3af" font-family="monospace" font-size="10">CTR: 0.44 (Normal &lt; 0.50)</text>
    </svg>`,
  },
];
