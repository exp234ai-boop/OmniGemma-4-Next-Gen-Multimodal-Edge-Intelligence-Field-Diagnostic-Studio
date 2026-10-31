import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, ShieldCheck, Download, Code2, Server, Zap } from 'lucide-react';

export function DeploymentHarnessView() {
  const [activeHarness, setActiveHarness] = useState<'ollama' | 'vllm' | 'transformers' | 'llamacpp' | 'genai'>('ollama');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const harnesses = {
    ollama: {
      title: 'Ollama Edge CLI & Local Server',
      desc: 'One-command offline deployment for macOS, Linux, and Windows with local GPU acceleration.',
      shell: `# Pull and launch Gemma 4 26B Multimodal locally
ollama run gemma4:26b-vision

# Test multimodal vision inference with image path
curl http://localhost:11434/api/generate -d '{
  "model": "gemma4:26b-vision",
  "prompt": "Inspect this PCB for solder bridges and cold joints",
  "images": ["base64_encoded_image_string_here"]
}'`,
    },
    vllm: {
      title: 'vLLM High-Throughput Production Server',
      desc: 'High-throughput, continuous-batching server for enterprise edge clusters & private cloud.',
      shell: `# Install vLLM with vision support
pip install vllm>=0.8.0

# Start OpenAI-compatible vLLM server with 4-bit AWQ quantization
python3 -m vllm.entrypoints.openai.api_server \\
  --model google/gemma-4-26b-it \\
  --quantization awq \\
  --dtype half \\
  --gpu-memory-utilization 0.90 \\
  --max-model-len 8192 \\
  --port 8000`,
    },
    transformers: {
      title: 'Hugging Face Transformers (Python)',
      desc: 'Official native PyTorch pipeline using Gemma 4 multi-resolution vision processor.',
      shell: `import torch
from PIL import Image
from transformers import AutoProcessor, AutoModelForImageTextToText

# Load quantized Gemma 4 model and SigLIP-2 processor
model_id = "google/gemma-4-26b-it"
processor = AutoProcessor.from_pretrained(model_id)
model = AutoModelForImageTextToText.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="auto"
)

# Prepare visual input & prompt
image = Image.open("pcb_inspection.jpg")
messages = [
    {
        "role": "user",
        "content": [
            {"type": "image"},
            {"type": "text", "text": "Locate all IC components and verify solder fillet integrity."}
        ]
    }
]

inputs = processor.apply_chat_template(
    messages,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt"
).to(model.device)

# Generate diagnostic reasoning
with torch.no_grad():
    outputs = model.generate(**inputs, max_new_tokens=512)
    response = processor.decode(outputs[0], skip_special_tokens=True)
    print(response)`,
    },
    llamacpp: {
      title: 'llama.cpp GGUF Edge Quantization',
      desc: 'C/C++ native runtime for Raspberry Pi 5, Apple Metal, and CPU-only IoT gateways.',
      shell: `# Compile llama.cpp with Apple Metal / CUDA support
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && make -j LLAMA_METAL=1

# Run Gemma 4 multimodal model with mmproj vision adapter
./llama-cli \\
  -m models/gemma-4-26b-Q4_K_M.gguf \\
  --mmproj models/gemma-4-siglip2-vision.gguf \\
  --image ./field_crop_lesion.jpg \\
  -p "Identify crop pathology and dosage recommendations." \\
  -c 4096 \\
  -ngl 99`,
    },
    genai: {
      title: 'Google GenAI SDK (Node.js / TypeScript)',
      desc: 'Direct server-side Google GenAI SDK integration with Gemini API.',
      shell: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

async function analyzeMultimodalVision(imageBase64: string, prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64
          }
        },
        { text: prompt }
      ]
    },
    config: {
      systemInstruction: "You are Google DeepMind Gemma 4 Multimodal Diagnostic Engine."
    }
  });

  return response.text;
}`,
    },
  };

  const current = harnesses[activeHarness];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Gemma 4 Open-Weights Deployment Harness
          </h2>
        </div>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
          Zero-lock-in reproduction pipelines. Copy and run Gemma 4 multimodal models on your own servers, local machines, or edge devices.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
        <button
          onClick={() => setActiveHarness('ollama')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeHarness === 'ollama' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ollama CLI</span>
        </button>

        <button
          onClick={() => setActiveHarness('vllm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeHarness === 'vllm' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>vLLM Server</span>
        </button>

        <button
          onClick={() => setActiveHarness('transformers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeHarness === 'transformers' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Hugging Face (Python)</span>
        </button>

        <button
          onClick={() => setActiveHarness('llamacpp')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeHarness === 'llamacpp' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Download className="w-3.5 h-3.5 text-sky-400" />
          <span>llama.cpp (GGUF)</span>
        </button>

        <button
          onClick={() => setActiveHarness('genai')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeHarness === 'genai' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>Google GenAI SDK</span>
        </button>
      </div>

      {/* Code Snippet Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 bg-zinc-900/90 border-b border-zinc-800">
          <div>
            <div className="text-sm font-semibold text-white">{current.title}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{current.desc}</div>
          </div>

          <button
            onClick={() => copyToClipboard(current.shell, activeHarness)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow transition-all"
          >
            {copiedSnippet === activeHarness ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied Code</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-5 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed">
          <code>{current.shell}</code>
        </pre>
      </div>
    </div>
  );
}
