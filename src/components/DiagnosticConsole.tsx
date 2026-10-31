import React, { useState } from 'react';
import { Play, Loader2, Sparkles, Cpu, Clock, Zap, HardDrive, Check, Copy, MessageSquare, ChevronRight, FileText } from 'lucide-react';
import { SampleScenario } from '../data/samples';
import { RoiBox } from './CanvasRoiAnnotator';

interface DiagnosticConsoleProps {
  currentScenario: SampleScenario;
  roi: RoiBox | null;
  selectedModel: string;
  onRunAnalysis: (prompt: string, domain: string) => Promise<void>;
  analysisResult: string | null;
  isLoading: boolean;
  metadata: any | null;
}

export function DiagnosticConsole({
  currentScenario,
  roi,
  selectedModel,
  onRunAnalysis,
  analysisResult,
  isLoading,
  metadata,
}: DiagnosticConsoleProps) {
  const [promptText, setPromptText] = useState(currentScenario.prompt);
  const [domain, setDomain] = useState<string>(currentScenario.category);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);

  // Sync default prompt when scenario changes
  React.useEffect(() => {
    setPromptText(currentScenario.prompt);
    setDomain(currentScenario.category);
  }, [currentScenario]);

  const handleExecute = () => {
    if (isLoading) return;
    onRunAnalysis(promptText, domain);
  };

  const handleCopyReport = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const domains = [
    { id: 'electronics', label: 'Hardware & PCB', icon: Cpu },
    { id: 'agritech', label: 'AgriTech Field', icon: Sparkles },
    { id: 'uicoding', label: 'Vision to Code', icon: Zap },
    { id: 'stem', label: 'STEM & Math', icon: FileText },
    { id: 'medical', label: 'BioMedical', icon: HardDrive },
    { id: 'general', label: 'General Vision', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
      {/* Console Top Bar: Domain Tabs */}
      <div className="p-3 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
        <div className="flex items-center space-x-1 overflow-x-auto py-1">
          {domains.map((item) => {
            const Icon = item.icon;
            const isSelected = domain === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setDomain(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-400">
          <span className="hidden sm:inline">Engine:</span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-indigo-300 font-semibold">
            {selectedModel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Suggested Questions / Prompts */}
      <div className="px-4 py-2 border-b border-zinc-800/50 bg-zinc-950/30 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-zinc-500 font-medium whitespace-nowrap text-[11px]">Quick Prompts:</span>
        {currentScenario.suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => setPromptText(q)}
            className="px-2.5 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] whitespace-nowrap border border-zinc-800 transition-all flex items-center gap-1"
          >
            <ChevronRight className="w-3 h-3 text-indigo-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Prompt Input & Execute Button */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/50">
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={3}
            placeholder="Describe what Gemma 4 should inspect, diagnose, calculate, or code..."
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-100 placeholder-zinc-500 font-sans focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
          />

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
              {roi ? (
                <span className="flex items-center gap-1 text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  ROI Active: &quot;{roi.label}&quot; ({roi.x}%, {roi.y}%)
                </span>
              ) : (
                <span className="text-zinc-500">Inspecting full field of view</span>
              )}
            </div>

            <button
              onClick={handleExecute}
              disabled={isLoading}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-lg ${
                isLoading
                  ? 'bg-indigo-700/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Multimodal Tokens...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Inspect with Gemma 4 Vision</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edge Telemetry HUD (Shown when results exist or while loading) */}
      {metadata?.edgeMetrics && (
        <div className="px-4 py-2.5 bg-zinc-950/90 border-b border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
            <div className="flex items-center text-zinc-400 text-[10px] gap-1">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span>Edge TTFT / Latency</span>
            </div>
            <div className="text-sm font-bold text-zinc-100 mt-0.5">
              {metadata.edgeMetrics.simulatedTtftMs}ms / {metadata.edgeMetrics.estimatedEdgeLatencyMs}ms
            </div>
          </div>

          <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
            <div className="flex items-center text-zinc-400 text-[10px] gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Throughput</span>
            </div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">
              {metadata.edgeMetrics.simulatedOnDeviceTps} tok/s
            </div>
          </div>

          <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
            <div className="flex items-center text-zinc-400 text-[10px] gap-1">
              <HardDrive className="w-3 h-3 text-sky-400" />
              <span>VRAM Footprint</span>
            </div>
            <div className="text-sm font-bold text-sky-400 mt-0.5">
              {metadata.edgeMetrics.edgeVramFootprintGB} GB (AWQ)
            </div>
          </div>

          <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
            <div className="flex items-center text-zinc-400 text-[10px] gap-1">
              <Cpu className="w-3 h-3 text-amber-400" />
              <span>Target Hardware</span>
            </div>
            <div className="text-xs font-bold text-zinc-200 mt-1 truncate">
              Jetson Orin / Mac M3
            </div>
          </div>
        </div>
      )}

      {/* Analysis Output Viewport */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[520px] font-sans text-xs leading-relaxed text-zinc-300">
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
              <Sparkles className="w-5 h-5 text-indigo-400 absolute top-3.5 left-3.5 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                Gemma 4 Multimodal Vision Projector
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Encoding visual patch tokens via SigLIP-2 & executing diagnostic reasoning...
              </p>
            </div>
          </div>
        ) : analysisResult ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Gemma 4 Multimodal Inference Complete
              </span>
              <button
                onClick={handleCopyReport}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-all"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied Report</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Markdown Report</span>
                  </>
                )}
              </button>
            </div>

            {/* Formatted Markdown Rendering */}
            <div className="prose prose-invert prose-xs max-w-none space-y-3">
              {renderMarkdown(analysisResult, copiedCode, setCopiedCode)}
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30">
            <Sparkles className="w-8 h-8 text-indigo-400/60 mb-3" />
            <p className="text-sm font-semibold text-zinc-300">
              Ready for Gemma 4 Multimodal Inspection
            </p>
            <p className="text-xs text-zinc-500 max-w-sm mt-1">
              Select any benchmark scenario on the left, draw an ROI bounding box if desired, and click &quot;Inspect with Gemma 4 Vision&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Markdown renderer helper for tables, code blocks, headers, and bullet points
function renderMarkdown(content: string, copiedCode: string | null, setCopiedCode: (c: string | null) => void) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';
  let inTable = false;
  let tableRows: string[][] = [];

  const flushCode = (key: string) => {
    const raw = codeBuffer.join('\n');
    const isCopied = copiedCode === raw;
    elements.push(
      <div key={key} className="my-3 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono">
        <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/90 border-b border-zinc-800 text-[11px] text-zinc-400">
          <span>{codeLang || 'code'}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(raw);
              setCopiedCode(raw);
              setTimeout(() => setCopiedCode(null), 2000);
            }}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{isCopied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-3 text-[11px] overflow-x-auto text-zinc-200">
          <code>{raw}</code>
        </pre>
      </div>
    );
    codeBuffer = [];
    inCodeBlock = false;
  };

  const flushTable = (key: string) => {
    if (tableRows.length === 0) return;
    const [header, ...body] = tableRows;
    elements.push(
      <div key={key} className="my-3 overflow-x-auto rounded-xl border border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-800 text-left text-xs">
          <thead className="bg-zinc-900/80 font-mono font-semibold text-zinc-300">
            <tr>
              {header.map((col, idx) => (
                <th key={idx} className="px-3 py-2 border-r border-zinc-800 last:border-0">
                  {col.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/60">
            {body.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-zinc-900/40">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-3 py-1.5 text-zinc-300 border-r border-zinc-800/40 last:border-0 font-mono text-[11px]">
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  lines.forEach((line, index) => {
    // Code block toggle
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCode(`code-${index}`);
      } else {
        if (inTable) flushTable(`table-${index}`);
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Markdown Table detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (line.includes('---')) {
        // separator line, skip
        return;
      }
      const cols = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (!inTable) {
        inTable = true;
        tableRows = [cols];
      } else {
        tableRows.push(cols);
      }
      return;
    } else if (inTable) {
      flushTable(`table-${index}`);
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-sm font-bold text-zinc-100 mt-4 mb-2 flex items-center gap-1.5 border-b border-zinc-800/60 pb-1">
          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
          {line.replace('### ', '')}
        </h3>
      );
      return;
    }

    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={index} className="text-xs font-semibold text-indigo-300 mt-3 mb-1">
          {line.replace('#### ', '')}
        </h4>
      );
      return;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={index} className="border-l-2 border-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-r text-zinc-300 my-2 text-xs">
          {line.replace('> ', '')}
        </blockquote>
      );
      return;
    }

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push(
        <li key={index} className="ml-4 list-disc text-zinc-300 text-xs my-0.5">
          {line.replace(/^[-*]\s+/, '')}
        </li>
      );
      return;
    }

    // Numbered points
    if (/^\d+\.\s+/.test(line.trim())) {
      elements.push(
        <li key={index} className="ml-4 list-decimal text-zinc-300 text-xs my-0.5">
          {line.replace(/^\d+\.\s+/, '')}
        </li>
      );
      return;
    }

    // Regular paragraphs
    if (line.trim().length > 0) {
      elements.push(
        <p key={index} className="text-zinc-300 text-xs my-1.5">
          {line}
        </p>
      );
    }
  });

  if (inCodeBlock) flushCode('final-code');
  if (inTable) flushTable('final-table');

  return elements;
}
