import React from 'react';
import { Cpu, Sparkles, Layers, Award, Terminal, Copy, Check, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'benchmarks' | 'deployment' | 'submission';
  setActiveTab: (tab: 'studio' | 'benchmarks' | 'deployment' | 'submission') => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  onOpenQuickCopy?: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  onOpenQuickCopy,
}: HeaderProps) {
  const [copiedQuick, setCopiedQuick] = React.useState(false);

  const handleQuickCopy = () => {
    if (onOpenQuickCopy) {
      onOpenQuickCopy();
    }
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="flex items-center justify-center w-full h-full bg-zinc-950 rounded-[11px]">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  OmniGemma<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">4</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Multimodal Open-Weights
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Edge Diagnostic Copilot & MLH Submission Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio & Vision</span>
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'benchmarks'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Edge Benchmarks</span>
            </button>

            <button
              onClick={() => setActiveTab('deployment')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'deployment'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Deploy Harness</span>
            </button>

            <button
              onClick={() => setActiveTab('submission')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'submission'
                  ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-amber-300 hover:text-amber-100 hover:bg-amber-950/40 border border-amber-500/30'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-semibold">MLH Submission</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>
          </nav>

          {/* Model Selector & Quick Copy Action */}
          <div className="flex items-center space-x-2">
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
              <span className="text-zinc-500 font-mono">Engine:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-zinc-200 font-mono text-xs focus:outline-none cursor-pointer"
              >
                <option value="gemma-4-26b-a4b">Gemma 4 26B (A4B Quant)</option>
                <option value="gemma-4-31b">Gemma 4 31B Full</option>
                <option value="gemini-3.8-flash">Gemini 3.8 Flash Cloud</option>
              </select>
            </div>

            <button
              onClick={handleQuickCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-all"
              title="Copy submission text ready for MLH OrganizerHQ / DevRelay"
            >
              {copiedQuick ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Hack Submission</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
