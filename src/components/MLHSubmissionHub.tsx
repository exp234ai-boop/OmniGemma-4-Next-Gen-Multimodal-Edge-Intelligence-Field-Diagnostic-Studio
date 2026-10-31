import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Copy, Check, ExternalLink, Sparkles, Download, CheckCircle2, FileText, Code2, Layers, Cpu } from 'lucide-react';
import { MLH_SUBMISSION_INFO } from '../data/mlhSubmission';

export function MLHSubmissionHub() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [descriptionTab, setDescriptionTab] = useState<'preview' | 'raw'>('preview');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const copyField = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    triggerConfetti();
    setTimeout(() => setCopiedField(null), 2500);
  };

  const copyAllSubmission = () => {
    const fullText = `### HACK DAY HALDIA '26 (MLH) SUBMISSION

PROJECT NAME:
${MLH_SUBMISSION_INFO.projectName}

TAGLINE:
${MLH_SUBMISSION_INFO.tagline}

GITHUB SOURCE CODE:
${MLH_SUBMISSION_INFO.githubRepoUrl}

LIVE DEMO LINK:
${MLH_SUBMISSION_INFO.liveDemoUrl}

TECHNOLOGIES USED:
${MLH_SUBMISSION_INFO.technologiesUsed.join(', ')}

AI YOUR PROJECT CALLS:
- Gemma
- Gemini

AI CODING TOOLS:
- Google AI Studio
- Antigravity
- Claude Code

MODELS CODING TOOLS RAN ON:
- Gemma 4 26B A4B
- Gemma 4 31B
- Gemini 3.8 Flash

PRIZE CATEGORIES:
1. Deepmind Google: Best Use of Gemma 4
2. DigitalOcean: Best Open-Source AI Project
3. Event prize: Best Base to Scaled Project Challenge

----------------------------------------------------
DESCRIPTION (MARKDOWN):
----------------------------------------------------
${MLH_SUBMISSION_INFO.fullMarkdownDescription}
`;

    navigator.clipboard.writeText(fullText);
    setCopiedField('all');
    triggerConfetti();
    setTimeout(() => setCopiedField(null), 3000);
  };

  const downloadSubmissionMarkdown = () => {
    const blob = new Blob([MLH_SUBMISSION_INFO.fullMarkdownDescription], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MLH_GEMMA4_SUBMISSION.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-zinc-900 to-emerald-950 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                Hack Day Haldia &apos;26 x GRID Community (MLH)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Prize Target: Best Use of Gemma 4
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
              DevRelay & MLH OrganizerHQ Submission Vault
            </h2>
            <p className="text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
              Every required field for your hackathon submission is pre-formatted, calibrated for maximum judging score, and ready to paste directly into your Devpost / OrganizerHQ portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copyAllSubmission}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              {copiedField === 'all' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Entire Submission Copied! 🎉</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>One-Click Copy Entire MLH Submission</span>
                </>
              )}
            </button>

            <button
              onClick={downloadSubmissionMarkdown}
              className="px-4 py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 font-medium text-xs sm:text-sm border border-zinc-700 transition-all flex items-center gap-2"
              title="Download SUBMISSION.md"
            >
              <Download className="w-4 h-4" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Prize Categories Cards */}
      <div>
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          Qualified Prize Categories (3 Targeted)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MLH_SUBMISSION_INFO.selectedPrizes.map((prize) => (
            <div
              key={prize.id}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-indigo-500/50 transition-all backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-400 font-semibold">{prize.sponsor}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                    Qualified 1st
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1.5">{prize.name}</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {prize.justification}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Category Review: Separate Panel</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Fields Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field 1: Project Name & Tagline */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              1. Project Name *
            </span>
            <button
              onClick={() => copyField(MLH_SUBMISSION_INFO.projectName, 'projectName')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1"
            >
              {copiedField === 'projectName' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'projectName' ? 'Copied' : 'Copy Name'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-sm text-zinc-100 font-semibold">
            {MLH_SUBMISSION_INFO.projectName}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              Project Tagline / Pitch
            </span>
            <button
              onClick={() => copyField(MLH_SUBMISSION_INFO.tagline, 'tagline')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1"
            >
              {copiedField === 'tagline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'tagline' ? 'Copied' : 'Copy Tagline'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300">
            {MLH_SUBMISSION_INFO.tagline}
          </div>
        </div>

        {/* Field 2: Source Code & Links */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              2. Source Code Repository (GitHub) *
            </span>
            <button
              onClick={() => copyField(MLH_SUBMISSION_INFO.githubRepoUrl, 'repo')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1"
            >
              {copiedField === 'repo' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'repo' ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-indigo-400 flex items-center justify-between">
            <span className="truncate">{MLH_SUBMISSION_INFO.githubRepoUrl}</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0 ml-2" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              Live Demo Link (Cloud Hosted App)
            </span>
            <button
              onClick={() => copyField(MLH_SUBMISSION_INFO.liveDemoUrl, 'demo')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1"
            >
              {copiedField === 'demo' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'demo' ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-emerald-400 flex items-center justify-between">
            <span className="truncate">{MLH_SUBMISSION_INFO.liveDemoUrl}</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0 ml-2" />
          </div>
        </div>

        {/* Field 3: Technologies Used */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              3. Technologies Used *
            </span>
            <button
              onClick={() => copyField(MLH_SUBMISSION_INFO.technologiesUsed.join(', '), 'tech')}
              className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1"
            >
              {copiedField === 'tech' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'tech' ? 'Copied' : 'Copy All Tech'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            {MLH_SUBMISSION_INFO.technologiesUsed.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Field 4: AI Checkboxes & Coding Tools */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-zinc-400">
            4. AI Options Checklist (Tick on MLH Portal)
          </span>

          <div className="space-y-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase">AI your project calls:</div>
              <div className="flex gap-4 mt-1 font-semibold text-zinc-200">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gemma (Primary)
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gemini (Backend API)
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Coding Agents & App Builders:</div>
              <div className="flex flex-wrap gap-3 mt-1 text-zinc-300">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Google AI Studio</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Antigravity</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Claude Code</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Models Your Coding Tools Ran On:</div>
              <div className="flex flex-wrap gap-3 mt-1 text-zinc-300">
                <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Gemma 4 26B A4B</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Gemma 4 31B</span>
                <span className="flex items-center gap-1 text-zinc-300"><CheckCircle2 className="w-3.5 h-3.5" /> Gemini 3.8 Flash</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Field 5: Description (Markdown & Preview) */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase text-zinc-300">
              5. Description (Tell us more about your project) *
            </span>
            <div className="flex rounded-lg bg-zinc-950 p-1 border border-zinc-800 text-xs">
              <button
                onClick={() => setDescriptionTab('preview')}
                className={`px-3 py-1 rounded-md transition-all ${
                  descriptionTab === 'preview' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Formatted Preview
              </button>
              <button
                onClick={() => setDescriptionTab('raw')}
                className={`px-3 py-1 rounded-md transition-all ${
                  descriptionTab === 'raw' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Raw Markdown Code
              </button>
            </div>
          </div>

          <button
            onClick={() => copyField(MLH_SUBMISSION_INFO.fullMarkdownDescription, 'desc')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            {copiedField === 'desc' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Description Markdown</span>
              </>
            )}
          </button>
        </div>

        {descriptionTab === 'raw' ? (
          <div className="relative">
            <textarea
              readOnly
              rows={18}
              value={MLH_SUBMISSION_INFO.fullMarkdownDescription}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300 leading-relaxed focus:outline-none"
            />
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 prose prose-invert prose-sm max-w-none space-y-4 text-zinc-300 text-xs leading-relaxed max-h-[500px] overflow-y-auto">
            {renderPreviewLines(MLH_SUBMISSION_INFO.fullMarkdownDescription)}
          </div>
        )}
      </div>
    </div>
  );
}

function renderPreviewLines(md: string) {
  return md.split('\n').map((line, idx) => {
    if (line.startsWith('## ')) {
      return <h2 key={idx} className="text-xl font-bold text-white border-b border-zinc-800 pb-2 mt-4">{line.replace('## ', '')}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={idx} className="text-base font-bold text-indigo-400 mt-3">{line.replace('### ', '')}</h3>;
    }
    if (line.startsWith('> ')) {
      return <blockquote key={idx} className="border-l-2 border-indigo-500 bg-indigo-500/10 px-3 py-2 text-zinc-200 my-2 rounded-r">{line.replace('> ', '')}</blockquote>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <li key={idx} className="ml-4 list-disc text-zinc-300 my-0.5">{line.replace(/^[-*]\s+/, '')}</li>;
    }
    if (/^\d+\.\s+/.test(line)) {
      return <li key={idx} className="ml-4 list-decimal text-zinc-300 my-0.5">{line.replace(/^\d+\.\s+/, '')}</li>;
    }
    if (line.trim() === '---') {
      return <hr key={idx} className="border-zinc-800 my-4" />;
    }
    if (line.trim().length > 0) {
      return <p key={idx} className="text-zinc-300 my-1">{line}</p>;
    }
    return null;
  });
}
