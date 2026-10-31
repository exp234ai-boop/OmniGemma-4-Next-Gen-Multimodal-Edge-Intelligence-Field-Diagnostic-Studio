/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CanvasRoiAnnotator, RoiBox } from './components/CanvasRoiAnnotator';
import { DiagnosticConsole } from './components/DiagnosticConsole';
import { BenchmarkView } from './components/BenchmarkView';
import { DeploymentHarnessView } from './components/DeploymentHarnessView';
import { MLHSubmissionHub } from './components/MLHSubmissionHub';
import { SAMPLE_SCENARIOS, SampleScenario } from './data/samples';
import { Award, Sparkles, Cpu, Layers, ExternalLink, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'benchmarks' | 'deployment' | 'submission'>('studio');
  const [selectedModel, setSelectedModel] = useState<string>('gemma-4-26b-a4b');
  const [currentScenario, setCurrentScenario] = useState<SampleScenario>(SAMPLE_SCENARIOS[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [roi, setRoi] = useState<RoiBox | null>(SAMPLE_SCENARIOS[0].defaultRoi || null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<any | null>(null);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Trigger analysis via Express / Gemini server endpoint
  const handleRunAnalysis = async (prompt: string, domain: string) => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const activeImage = customImage || currentScenario.imageUri;
      const res = await fetch('/api/gemma/multimodal-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: activeImage,
          prompt,
          domain,
          roi,
          modelVariant: selectedModel,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.analysis);
        setMetadata(data.metadata);
      } else {
        setAnalysisResult(`### Analysis Error\n\n${data.error || 'Failed to complete analysis.'}`);
      }
    } catch (err: any) {
      console.error('Inference error:', err);
      setAnalysisResult(`### Connection Issue\n\nCould not reach server endpoint: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenQuickCopy = () => {
    setActiveTab('submission');
    setQuickToast('Navigated to Hackathon Submission Hub!');
    setTimeout(() => setQuickToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Toast Notification */}
      {quickToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-indigo-400/40 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{quickToast}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        onOpenQuickCopy={handleOpenQuickCopy}
      />

      {/* Sub-header Banner */}
      <div className="border-b border-zinc-800/60 bg-gradient-to-r from-indigo-950/30 via-zinc-950 to-emerald-950/20 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-zinc-400">Gemma 4 Multimodal Projector Active:</span>
            <span className="font-mono font-semibold text-emerald-400">SigLIP-2 400M + GQA 128K</span>
          </div>

          <div className="flex items-center space-x-3 text-zinc-400">
            <span className="hidden sm:inline">Hack Day Haldia &apos;26 MLH Project</span>
            <span className="text-zinc-600">|</span>
            <button
              onClick={() => setActiveTab('submission')}
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Copy DevRelay / OrganizerHQ Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
            {/* Left Column: Visual Canvas & ROI Annotator (7 cols) */}
            <div className="lg:col-span-7 h-full flex flex-col">
              <CanvasRoiAnnotator
                currentScenario={currentScenario}
                onSelectScenario={(s) => {
                  setCurrentScenario(s);
                  setAnalysisResult(null);
                  setMetadata(null);
                }}
                customImage={customImage}
                setCustomImage={setCustomImage}
                roi={roi}
                setRoi={setRoi}
              />
            </div>

            {/* Right Column: Diagnostic & Reasoning Console (5 cols) */}
            <div className="lg:col-span-5 h-full flex flex-col">
              <DiagnosticConsole
                currentScenario={currentScenario}
                roi={roi}
                selectedModel={selectedModel}
                onRunAnalysis={handleRunAnalysis}
                analysisResult={analysisResult}
                isLoading={isLoading}
                metadata={metadata}
              />
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && <BenchmarkView />}

        {activeTab === 'deployment' && <DeploymentHarnessView />}

        {activeTab === 'submission' && <MLHSubmissionHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/90 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
              <span>OmniGemma 4</span>
              <span className="text-zinc-600">/</span>
              <span>Google DeepMind Gemma 4 Open-Weights Challenge</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('submission')}
              className="hover:text-amber-400 transition-colors"
            >
              MLH Submission
            </button>
            <button
              onClick={() => setActiveTab('benchmarks')}
              className="hover:text-zinc-300 transition-colors"
            >
              Edge Benchmarks
            </button>
            <button
              onClick={() => setActiveTab('deployment')}
              className="hover:text-zinc-300 transition-colors"
            >
              Harness Code
            </button>
            <a
              href="https://github.com/exp234ai/omnigemma4-multimodal-studio"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
