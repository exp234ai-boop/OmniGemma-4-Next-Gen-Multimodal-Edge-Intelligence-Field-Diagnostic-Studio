import React, { useRef, useState, useEffect } from 'react';
import { Crosshair, Upload, Camera, RotateCcw, BoxSelect, Tag, ZoomIn, CheckCircle2 } from 'lucide-react';
import { SAMPLE_SCENARIOS, SampleScenario } from '../data/samples';

export interface RoiBox {
  x: number; // percentage 0-100
  y: number;
  width: number;
  height: number;
  label: string;
}

interface CanvasRoiAnnotatorProps {
  currentScenario: SampleScenario;
  onSelectScenario: (scenario: SampleScenario) => void;
  customImage: string | null;
  setCustomImage: (img: string | null) => void;
  roi: RoiBox | null;
  setRoi: (roi: RoiBox | null) => void;
}

export function CanvasRoiAnnotator({
  currentScenario,
  onSelectScenario,
  customImage,
  setCustomImage,
  roi,
  setRoi,
}: CanvasRoiAnnotatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [tempBox, setTempBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [roiLabel, setRoiLabel] = useState(roi?.label || 'Target Feature');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync ROI label when changed externally
  useEffect(() => {
    if (roi) {
      setRoiLabel(roi.label);
    }
  }, [roi]);

  const activeImageSrc = customImage || currentScenario.imageUri;

  // Handle Mouse Down to start drawing ROI box
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCameraActive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    setStartPoint({ x, y });
    setTempBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPoint || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const currentX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const currentY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    const x = Math.min(startPoint.x, currentX);
    const y = Math.min(startPoint.y, currentY);
    const width = Math.abs(currentX - startPoint.x);
    const height = Math.abs(currentY - startPoint.y);

    setTempBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !tempBox) return;
    setIsDrawing(false);

    if (tempBox.width > 3 && tempBox.height > 3) {
      setRoi({
        x: Math.round(tempBox.x * 10) / 10,
        y: Math.round(tempBox.y * 10) / 10,
        width: Math.round(tempBox.width * 10) / 10,
        height: Math.round(tempBox.height * 10) / 10,
        label: roiLabel || 'Inspection Target',
      });
    }
    setTempBox(null);
    setStartPoint(null);
  };

  // Upload custom file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setRoi(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Webcam capture
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access denied or unavailable:', err);
      setIsCameraActive(false);
      alert('Camera access unavailable in current browser environment. You can upload an image instead.');
    }
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg', 0.9);
      setCustomImage(dataUri);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const activeBox = tempBox || (roi ? { x: roi.x, y: roi.y, width: roi.width, height: roi.height } : null);

  return (
    <div className="flex flex-col h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
      {/* Scenario Selector Header */}
      <div className="p-3 border-b border-zinc-800/80 bg-zinc-950/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <BoxSelect className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Multimodal Visual Target
          </span>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto max-w-full py-1">
          {SAMPLE_SCENARIOS.map((scenario) => {
            const isSelected = !customImage && currentScenario.id === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setCustomImage(null);
                  onSelectScenario(scenario);
                  if (scenario.defaultRoi) {
                    setRoi(scenario.defaultRoi);
                  } else {
                    setRoi(null);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                <span>{scenario.badge}</span>
                {isSelected && <CheckCircle2 className="w-3 h-3 text-indigo-200" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visual Viewport with interactive bounding box canvas */}
      <div className="relative flex-1 min-h-[360px] max-h-[500px] w-full bg-black/80 flex items-center justify-center overflow-hidden select-none">
        {isCameraActive ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
            <video ref={videoRef} autoPlay playsInline className="max-h-[420px] max-w-full rounded-lg" />
            <div className="absolute bottom-4 flex gap-3">
              <button
                onClick={captureCameraFrame}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg shadow-lg flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" /> Snap Photo
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="relative w-full h-full flex items-center justify-center cursor-crosshair group"
          >
            {/* Visual Image Render */}
            <img
              src={activeImageSrc}
              alt="Inspection Target"
              className="max-h-full max-w-full object-contain pointer-events-none"
            />

            {/* Crosshair guide overlay */}
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 pointer-events-none flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-indigo-400" />
              <span>Click & Drag to draw ROI Bounding Box</span>
            </div>

            {/* Active Bounding Box Highlight */}
            {activeBox && (
              <div
                style={{
                  left: `${activeBox.x}%`,
                  top: `${activeBox.y}%`,
                  width: `${activeBox.width}%`,
                  height: `${activeBox.height}%`,
                }}
                className="absolute border-2 border-indigo-400 bg-indigo-500/15 pointer-events-none rounded shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all"
              >
                <div className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-mono font-bold whitespace-nowrap flex items-center gap-1 shadow">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{roiLabel || 'ROI Target'}</span>
                  <span className="opacity-70 text-[9px]">
                    ({Math.round(activeBox.width)}% × {Math.round(activeBox.height)}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls & Region of Interest Toolbar */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/80 flex flex-wrap items-center justify-between gap-2">
        {/* ROI Status & Label Editor */}
        <div className="flex items-center space-x-2">
          {roi ? (
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-zinc-400 font-medium">ROI Active:</span>
              <input
                type="text"
                value={roiLabel}
                onChange={(e) => {
                  setRoiLabel(e.target.value);
                  if (roi) {
                    setRoi({ ...roi, label: e.target.value });
                  }
                }}
                placeholder="Target Label..."
                className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 font-mono w-40 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => setRoi(null)}
                className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs"
                title="Clear Region of Interest"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-xs text-zinc-500 italic">
              Full scene inspection (No ROI box drawn)
            </span>
          )}
        </div>

        {/* Action Buttons: Upload, Camera, Reset */}
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all"
            title="Upload custom image file"
          >
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={isCameraActive ? stopCamera : startCamera}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all"
            title="Live camera capture"
          >
            <Camera className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isCameraActive ? 'Stop' : 'Camera'}</span>
          </button>

          {customImage && (
            <button
              onClick={() => {
                setCustomImage(null);
                setRoi(currentScenario.defaultRoi || null);
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-700 text-amber-400 text-xs font-medium"
              title="Reset to benchmark samples"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Sample</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
