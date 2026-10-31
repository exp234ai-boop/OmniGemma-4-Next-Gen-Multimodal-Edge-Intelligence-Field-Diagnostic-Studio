import React, { useState } from 'react';
import { Layers, Cpu, Zap, HardDrive, BarChart3, CheckCircle, ShieldCheck, Activity, Gauge } from 'lucide-react';

export function BenchmarkView() {
  const [selectedDevice, setSelectedDevice] = useState<'jetson' | 'mac' | 'rpi' | 'rtx'>('jetson');
  const [tokenLength, setTokenLength] = useState<number>(512);

  const devices = {
    jetson: {
      name: 'NVIDIA Jetson Orin Nano',
      vram: '8 GB Shared Unified LPDDR5',
      edgeFit: 'Optimal with Gemma 4 (26B A4B Quantized - 5.8GB)',
      tps: 38.5,
      powerWatt: 15,
      badge: 'Edge Robotics / Embedded',
    },
    mac: {
      name: 'Apple MacBook Air / Pro (M2/M3)',
      vram: '16 GB Unified Memory (100GB/s)',
      edgeFit: 'Runs Gemma 4 26B & 31B at native speed with Metal',
      tps: 46.2,
      powerWatt: 22,
      badge: 'Local Developer Workstation',
    },
    rpi: {
      name: 'Raspberry Pi 5 (8GB)',
      vram: '8 GB LPDDR4X',
      edgeFit: 'Requires 4-bit CPU quantization or Gemma 2 9B',
      tps: 11.4,
      powerWatt: 10,
      badge: 'Low-Power IoT Gateway',
    },
    rtx: {
      name: 'NVIDIA RTX 4090 (24GB)',
      vram: '24 GB GDDR6X (1008 GB/s)',
      edgeFit: 'Full unquantized Gemma 4 31B with FP16 KV-Cache',
      tps: 84.0,
      powerWatt: 320,
      badge: 'High-Density Edge Server',
    },
  };

  const currentDev = devices[selectedDevice];
  const estimatedTimeSec = Math.round((tokenLength / currentDev.tps) * 10) / 10;
  const estimatedJoules = Math.round(estimatedTimeSec * currentDev.powerWatt * 10) / 10;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Title Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Gemma 4 Open-Weights Architecture
            </span>
            <span className="text-xs text-zinc-400 font-mono">128K Multimodal Context</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Edge-to-Cloud Hardware & Latency Benchmarks
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Empirical performance matrix comparing Gemma 4 multimodal models on real-world edge hardware platforms against frontier cloud endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center">
            <div className="text-[10px] uppercase font-mono text-zinc-500">AWQ 4-Bit VRAM</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">5.8 GB</div>
          </div>
          <div className="px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center">
            <div className="text-[10px] uppercase font-mono text-zinc-500">Tokens / Sec</div>
            <div className="text-lg font-bold text-indigo-400 font-mono">~42.8</div>
          </div>
        </div>
      </div>

      {/* Model Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Model 1: Gemma 4 26B A4B */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-zinc-900/60 border-2 border-indigo-500/40 relative shadow-xl">
          <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider shadow">
            Recommended Edge
          </div>
          <div className="text-xs font-mono text-indigo-400 font-semibold">GOOGLE DEEPMIND</div>
          <h3 className="text-lg font-bold text-white mt-1">Gemma 4 26B (A4B)</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Optimized 4-bit activation & weight quantization for edge devices.
          </p>

          <div className="mt-4 space-y-2 font-mono text-xs border-t border-zinc-800/80 pt-3">
            <div className="flex justify-between">
              <span className="text-zinc-500">Params:</span>
              <span className="text-zinc-200">26 Billion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Vision:</span>
              <span className="text-zinc-200">SigLIP-2 Multi-Res</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">VRAM Req:</span>
              <span className="text-emerald-400 font-bold">5.8 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Throughput:</span>
              <span className="text-zinc-200">38-44 tok/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">License:</span>
              <span className="text-zinc-200">Gemma Open Terms</span>
            </div>
          </div>
        </div>

        {/* Model 2: Gemma 4 31B Full */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 relative">
          <div className="text-xs font-mono text-zinc-500 font-semibold">GOOGLE DEEPMIND</div>
          <h3 className="text-lg font-bold text-white mt-1">Gemma 4 31B Full</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Full-capacity multimodal reasoning with dense GQA transformer layers.
          </p>

          <div className="mt-4 space-y-2 font-mono text-xs border-t border-zinc-800/80 pt-3">
            <div className="flex justify-between">
              <span className="text-zinc-500">Params:</span>
              <span className="text-zinc-200">31 Billion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Vision:</span>
              <span className="text-zinc-200">SigLIP-2 400M Projector</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">VRAM Req:</span>
              <span className="text-amber-400">7.2 GB (4-bit)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Throughput:</span>
              <span className="text-zinc-200">32-38 tok/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">License:</span>
              <span className="text-zinc-200">Gemma Open Terms</span>
            </div>
          </div>
        </div>

        {/* Model 3: Gemma 2 9B IT */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 opacity-80">
          <div className="text-xs font-mono text-zinc-500">PREDECESSOR BASELINE</div>
          <h3 className="text-lg font-bold text-zinc-200 mt-1">Gemma 2 9B IT</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Compact text-only generation model requiring external ViT pipeline.
          </p>

          <div className="mt-4 space-y-2 font-mono text-xs border-t border-zinc-800/80 pt-3">
            <div className="flex justify-between">
              <span className="text-zinc-500">Params:</span>
              <span className="text-zinc-200">9.2 Billion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Vision:</span>
              <span className="text-zinc-500">External Adapter Only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">VRAM Req:</span>
              <span className="text-zinc-300">3.1 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Throughput:</span>
              <span className="text-zinc-200">54-62 tok/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Context:</span>
              <span className="text-zinc-200">8K tokens</span>
            </div>
          </div>
        </div>

        {/* Model 4: Gemini 3.8 Flash Cloud */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 relative">
          <div className="text-xs font-mono text-emerald-400 font-semibold">CLOUD API REFERENCE</div>
          <h3 className="text-lg font-bold text-white mt-1">Gemini 3.8 Flash</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Hyperscale Cloud MoE cluster with 1M tokens multimodal window.
          </p>

          <div className="mt-4 space-y-2 font-mono text-xs border-t border-zinc-800/80 pt-3">
            <div className="flex justify-between">
              <span className="text-zinc-500">Hosting:</span>
              <span className="text-indigo-400">Cloud TPU Cluster</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Vision:</span>
              <span className="text-zinc-200">Native Multimodal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">VRAM Req:</span>
              <span className="text-zinc-400">Zero (Cloud API)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Throughput:</span>
              <span className="text-emerald-400 font-bold">95+ tok/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Context:</span>
              <span className="text-emerald-400">1 Million tokens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Edge Hardware Simulator */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center space-x-2 mb-4">
          <Gauge className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            Interactive Hardware Deployment Simulator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hardware Selector */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-zinc-300">Select Target Hardware Platform:</label>
            <div className="space-y-2">
              {(Object.keys(devices) as Array<keyof typeof devices>).map((key) => {
                const dev = devices[key];
                const isSelected = selectedDevice === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-zinc-800 border-indigo-500 text-white shadow-md'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{dev.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-indigo-400">
                        {dev.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1">{dev.vram}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Token Generation Slider */}
          <div className="space-y-4">
            <label className="text-xs font-medium text-zinc-300">
              Inspection Diagnostic Context Length:
            </label>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Output Tokens:</span>
                <span className="text-indigo-400 font-bold">{tokenLength} tokens</span>
              </div>
              <input
                type="range"
                min={128}
                max={2048}
                step={64}
                value={tokenLength}
                onChange={(e) => setTokenLength(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>128 (Quick Triage)</span>
                <span>1024 (Full Audit)</span>
                <span>2048 (Deep Code)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Gemma 4 Edge Compatibility</span>
              </div>
              <p className="text-[11px] text-zinc-400">{currentDev.edgeFit}</p>
            </div>
          </div>

          {/* Real-time Hardware Telemetry Output */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
                Simulated Edge Telemetry
              </div>
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Sustained TPS:</span>
                  <span className="text-emerald-400 font-bold">{currentDev.tps} tokens/s</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Diagnostic Latency:</span>
                  <span className="text-white font-bold">{estimatedTimeSec} seconds</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Energy Consumption:</span>
                  <span className="text-amber-400 font-bold">{estimatedJoules} Joules</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-zinc-400">Thermal Profile:</span>
                  <span className="text-zinc-200">
                    {currentDev.powerWatt < 25 ? 'Passive / Low Temp' : 'Active Cooling'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-zinc-900 text-[11px] text-zinc-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gemma 4 enables 100% offline edge privacy with zero remote server calls.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
