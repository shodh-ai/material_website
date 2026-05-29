'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Menu, Pencil, Share2, GitBranch, Plus, MoreVertical, SlidersHorizontal,
  ThumbsUp, ThumbsDown, Upload, Link2, Smile, Loader2, AlertCircle, X,
  Image as ImageIcon, Brain, Cpu, FlaskConical, CheckCircle2, XCircle,
  Download, ChevronRight, Zap, Shield, Thermometer, ClipboardList
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface ThinkingSteps {
  application_type: string;
  key_constraint: string;
  operating_condition: string;
  translations: { parameter: string; value: string; reason: string }[];
}

interface Annotations {
  pore_description: string;
  solid_description: string;
  tortuosity_note: string;
  bottleneck_note: string | null;
}

interface RecipeItem { component: string; percentage: number; role: string }
interface ProcessStep { step: string; value: string; unit: string }
interface ManufacturingRecipe {
  material_composition: RecipeItem[];
  process_parameters: ProcessStep[];
}

interface ValidationMetric {
  predicted: number | string;
  target: number | string;
  pass: boolean;
  unit: string;
}
interface ValidationResults {
  charge_time: ValidationMetric;
  cycle_life: ValidationMetric;
  porosity: ValidationMetric;
  energy_density: ValidationMetric;
  temperature_note: string | null;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  content?: string;
  reasoning?: string;
  parameters?: {
    projected_cycle_life: number;
    capacity_fade_rate: number;
    target_power_demand: number;
    porosity: number;
  };
  thinking_steps?: ThinkingSteps;
  annotations?: Annotations;
  manufacturing_recipe?: ManufacturingRecipe;
  validation?: ValidationResults;
  forward_model_raw?: any;
  imageUrl?: string;
  generatedImage?: string;
  tiffUrl?: string;
  analysis?: {
    cycle_life: number;
    warnings: string[];
  };
  isLoading?: boolean;
  loadingStage?: string;
}

/* ------------------------------------------------------------------ */
/*  Animated reveal hook                                               */
/* ------------------------------------------------------------------ */
function useStaggeredReveal(items: any[], delayMs = 150) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (!items || items.length === 0) return;
    setVisibleCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= items.length) clearInterval(interval);
    }, delayMs);
    return () => clearInterval(interval);
  }, [items, delayMs]);
  return visibleCount;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ThinkingPanel({ steps }: { steps: ThinkingSteps }) {
  const visibleTranslations = useStaggeredReveal(steps.translations, 400);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
      <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
        <Brain className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">Analyzing Request</span>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start gap-3">
          <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Application Type</p>
            <p className="text-sm text-gray-200 font-medium">{steps.application_type}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Key Constraint</p>
            <p className="text-sm text-gray-200 font-medium">{steps.key_constraint}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Thermometer className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Operating Condition</p>
            <p className="text-sm text-gray-200 font-medium">{steps.operating_condition}</p>
          </div>
        </div>

        <div className="pt-3" style={{ borderTop: '1px solid rgba(59,130,246,0.1)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">Translating to Physics</p>
          <div className="space-y-2">
            {steps.translations.map((t, i) => (
              <div key={i}
                className="flex items-center gap-3 transition-all duration-500"
                style={{
                  opacity: i < visibleTranslations ? 1 : 0,
                  transform: i < visibleTranslations ? 'translateX(0)' : 'translateX(-12px)',
                }}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-mono text-emerald-300 min-w-[140px]">{t.parameter}: {t.value}</span>
                <span className="text-xs text-gray-500">{t.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnnotatedCubePanel({ imageUrl, annotations, tiffUrl }: {
  imageUrl: string; annotations: Annotations; tiffUrl?: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
      <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
        <Cpu className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Generated Microstructure (128&sup3;)</span>
      </div>
      <div className="p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Image */}
          <div className="relative flex-shrink-0">
            <img src={imageUrl} alt="3D Microstructure" className="rounded-xl max-w-sm w-full border border-white/10" />
            {tiffUrl && (
              <a href={tiffUrl} download="microstructure_128x128x128.tif"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 backdrop-blur-sm transition-colors hover:bg-emerald-500/20"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <Download className="w-3.5 h-3.5" />
                TIFF
              </a>
            )}
          </div>
          {/* Annotations */}
          <div className="flex-1 space-y-3">
            <div className="rounded-xl p-3" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(59,130,246,0.6)' }} />
                <span className="text-xs font-semibold text-blue-400 uppercase">Pore Channels</span>
              </div>
              <p className="text-sm text-gray-300">{annotations.pore_description}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(156,163,175,0.08)', border: '1px solid rgba(156,163,175,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(156,163,175,0.6)' }} />
                <span className="text-xs font-semibold text-gray-400 uppercase">Solid Network</span>
              </div>
              <p className="text-sm text-gray-300">{annotations.solid_description}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400 uppercase">Ion Transport</span>
              </div>
              <p className="text-sm text-gray-300">{annotations.tortuosity_note}</p>
            </div>
            {annotations.bottleneck_note && (
              <div className="rounded-xl p-3" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.15)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase">Bottleneck</span>
                </div>
                <p className="text-sm text-yellow-200/80">{annotations.bottleneck_note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValidationPanel({ validation, forwardRaw }: { validation: ValidationResults; forwardRaw?: any }) {
  const metrics = [
    { label: 'Charge Time', ...validation.charge_time },
    { label: 'Cycle Life', ...validation.cycle_life },
    { label: 'Porosity', ...validation.porosity },
    { label: 'Energy Density', ...validation.energy_density },
  ];
  const allPass = metrics.every(m => m.pass);
  const isReal = !!forwardRaw;

  const fwdMicro = forwardRaw?.microstructure_properties;
  const fwdPerf = forwardRaw?.performance_predictions;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(168,85,247,0.1)' }}>
        <div className="flex items-center gap-3">
          <FlaskConical className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
            {isReal ? 'Forward Model Validation' : 'Physics Validation'}
          </span>
          {isReal && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)' }}>
              Live Model
            </span>
          )}
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${allPass ? 'text-emerald-400' : 'text-yellow-400'}`}
          style={{ background: allPass ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)' }}>
          {allPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {allPass ? 'Design Meets Requirements' : 'Review Needed'}
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map(m => (
            <div key={m.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                {m.pass
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                <span className="text-xs text-gray-500">{m.label}</span>
              </div>
              <p className="text-lg font-mono font-semibold text-white">{m.predicted} <span className="text-xs text-gray-500">{m.unit}</span></p>
              <p className="text-xs text-gray-500 mt-0.5">Target: {m.target} {m.unit}</p>
            </div>
          ))}
        </div>

        {/* Extra forward model metrics */}
        {isReal && (fwdMicro || fwdPerf) && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(168,85,247,0.1)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">Forward Model - Full Predictions</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {fwdMicro && Object.entries(fwdMicro).map(([key, val]) => (
                <div key={key} className="rounded-lg px-3 py-2" style={{ background: 'rgba(59,130,246,0.06)' }}>
                  <p className="text-[10px] text-blue-400 uppercase font-semibold">{key.replace(/_/g, ' ')}</p>
                  <p className="text-sm font-mono text-gray-200 mt-0.5">{typeof val === 'number' ? (val < 0.01 ? (val as number).toExponential(2) : (val as number).toFixed(4)) : String(val)}</p>
                </div>
              ))}
              {fwdPerf && Object.entries(fwdPerf).map(([key, val]) => (
                <div key={key} className="rounded-lg px-3 py-2" style={{ background: 'rgba(16,185,129,0.06)' }}>
                  <p className="text-[10px] text-emerald-400 uppercase font-semibold">{key.replace(/_/g, ' ')}</p>
                  <p className="text-sm font-mono text-gray-200 mt-0.5">{typeof val === 'number' ? (val < 0.01 ? (val as number).toExponential(2) : (val as number).toFixed(2)) : String(val)}</p>
                </div>
              ))}
            </div>
            {forwardRaw?.status && (
              <div className={`mt-3 flex items-center gap-2 text-xs ${forwardRaw.status === 'Optimal' ? 'text-emerald-300/80' : 'text-yellow-300/80'}`}>
                {forwardRaw.status === 'Optimal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {forwardRaw.status}
              </div>
            )}
          </div>
        )}

        {validation.temperature_note && (
          <div className="mt-3 flex items-center gap-2 text-xs text-yellow-300/80">
            <Thermometer className="w-3.5 h-3.5" />
            {validation.temperature_note}
          </div>
        )}
      </div>
    </div>
  );
}

function RecipePanel({ recipe }: { recipe: ManufacturingRecipe }) {
  const downloadRecipe = () => {
    const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'manufacturing_recipe.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.15)' }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(234,179,8,0.1)' }}>
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">Manufacturing Recipe</span>
        </div>
        <button onClick={downloadRecipe}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-yellow-300 transition-colors hover:bg-yellow-500/10"
          style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)' }}>
          <Download className="w-3.5 h-3.5" />
          Download JSON
        </button>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Materials */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Material Composition</p>
            <div className="space-y-2">
              {recipe.material_composition.map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div>
                    <p className="text-sm text-gray-200 font-medium">{m.component}</p>
                    <p className="text-xs text-gray-500">{m.role}</p>
                  </div>
                  <span className="text-sm font-mono text-yellow-300 font-semibold">{m.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Process */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Process Parameters</p>
            <div className="space-y-2">
              {recipe.process_parameters.map((p, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-sm text-gray-200 font-medium">{p.step}</p>
                  <span className="text-sm font-mono text-gray-300">{p.value} <span className="text-xs text-gray-500">{p.unit}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = 'auto'; ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`; }
  }, [input]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && /image\/(tiff|png|jpeg|jpg)/.test(file.type)) {
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => { setUploadedImage(null); setImagePreview(null); };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !uploadedImage) || isGenerating) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input || 'Analyze this SEM image',
      imageUrl: imagePreview || undefined,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    const loadingId = `${Date.now()}_l`;
    setMessages(prev => [...prev, { id: loadingId, role: 'model', isLoading: true, loadingStage: 'Analyzing request...' }]);

    try {
      if (uploadedImage) {
        const fd = new FormData();
        fd.append('image', uploadedImage);
        fd.append('prompt', input);
        const res = await fetch('/api/analyze-image', { method: 'POST', body: fd });
        const data = await res.json();
        setMessages(prev => prev.filter(m => m.id !== loadingId).concat({
          id: Date.now().toString(), role: 'model', content: data.content, analysis: data.analysis,
        }));
        removeImage();
      } else {
        // Update loading stage
        setMessages(prev => prev.map(m => m.id === loadingId ? { ...m, loadingStage: 'Translating to physics...' } : m));

        const res = await fetch('/api/generate-material', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input }),
        });

        // Read NDJSON stream - chunk 1 = thinking (fast), chunk 2 = generation (slow)
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        const modelMsgId = Date.now().toString();
        let thinkingReceived = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // keep incomplete line in buffer

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const chunk = JSON.parse(line);

              if (chunk.type === 'thinking') {
                // Immediately show thinking panel + parameters
                thinkingReceived = true;
                setMessages(prev => prev.filter(m => m.id !== loadingId).concat({
                  id: modelMsgId,
                  role: 'model',
                  reasoning: chunk.reasoning,
                  parameters: chunk.parameters,
                  thinking_steps: chunk.thinking_steps,
                  annotations: chunk.annotations,
                  isLoading: true,
                  loadingStage: 'Generating 3D microstructure...',
                }));
              } else if (chunk.type === 'generation') {
                // Add image + validation + recipe + forward model to existing message
                setMessages(prev => prev.map(m =>
                  m.id === modelMsgId ? {
                    ...m,
                    generatedImage: chunk.imageUrl,
                    tiffUrl: chunk.tiffUrl,
                    validation: chunk.validation,
                    manufacturing_recipe: chunk.manufacturing_recipe,
                    forward_model_raw: chunk.forward_model_raw,
                    isLoading: false,
                    loadingStage: undefined,
                  } : m
                ));
              }
            } catch { /* skip malformed lines */ }
          }
        }

        // If stream ended without thinking chunk, show error
        if (!thinkingReceived) {
          setMessages(prev => prev.filter(m => m.id !== loadingId).concat({
            id: Date.now().toString(), role: 'model',
            content: 'Failed to get response. Please try again.',
          }));
        }
      }
    } catch {
      setMessages(prev => prev.filter(m => m.id !== loadingId).concat({
        id: Date.now().toString(), role: 'model',
        content: 'Something went wrong. Please try again.',
      }));
    } finally { setIsGenerating(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  return (
    <main className="h-screen w-full flex flex-col" style={{ background: '#1e1e2e' }}>

      {/* ============ TOP BAR ============ */}
      <header className="flex items-center justify-between px-6 h-16 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSidebar(!showSidebar)}
            className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <Menu className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="text-xl font-medium text-gray-100 select-none">
            Skanda - Material Architect
          </h1>
          <button className="p-2 rounded-md hover:bg-white/5 transition-colors">
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors"><Share2 className="w-5 h-5 text-gray-400" /></button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors"><GitBranch className="w-5 h-5 text-gray-400" /></button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors"><Plus className="w-5 h-5 text-gray-400" /></button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors"><MoreVertical className="w-5 h-5 text-gray-400" /></button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors"><SlidersHorizontal className="w-5 h-5 text-gray-400" /></button>
        </div>
      </header>

      {/* ============ MESSAGES ============ */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 pt-10 pb-6">

          {messages.length === 0 && (
            <div className="mt-20 text-center select-none">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: 'rgba(139,92,246,0.15)' }}>
                <Cpu className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-200 mb-2">Describe your battery application</h2>
              <p className="text-gray-500 text-base max-w-lg mx-auto">
                Skanda translates your requirements into physics-optimized microstructure designs with full validation and manufacturing recipes.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['I need a drone battery that charges in 10 minutes',
                  'Design a grid storage cell for 10,000 cycles',
                  'Hypercar battery with maximum power output',
                  'EV battery balanced for range and fast charging',
                ].map(suggestion => (
                  <button key={suggestion}
                    onClick={() => { setInput(suggestion); }}
                    className="px-4 py-2 rounded-xl text-sm text-gray-400 transition-all hover:text-gray-200 hover:bg-white/5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="mb-10">
              <p className="text-sm font-medium mb-3 select-none text-gray-500">
                {msg.role === 'user' ? 'You' : 'Skanda'}
              </p>

              {/* Loading spinner - only when NO thinking data yet */}
              {msg.isLoading && !msg.thinking_steps && (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  <span className="text-sm text-gray-400 animate-pulse">{msg.loadingStage || 'Processing...'}</span>
                </div>
              )}

              {/* Render panels whenever data exists (even while still loading generation) */}
              {(msg.thinking_steps || msg.content || msg.generatedImage || !msg.isLoading) && (
                <>
                  {/* User image */}
                  {msg.imageUrl && (
                    <div className="mb-4">
                      <img src={msg.imageUrl} alt="Upload" className="rounded-xl max-w-sm border border-white/10" />
                    </div>
                  )}

                  {/* Plain content (for errors or analysis) */}
                  {msg.content && (
                    <div className="text-base leading-7 text-gray-200 whitespace-pre-wrap">{msg.content}</div>
                  )}

                  {/* === PANEL 1: Thinking === */}
                  {msg.thinking_steps && (
                    <div className="mt-4">
                      <ThinkingPanel steps={msg.thinking_steps} />
                    </div>
                  )}

                  {/* === Physics Parameters (compact) === */}
                  {msg.parameters && (
                    <div className="mt-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Target Parameters</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: 'Cycle Life', value: msg.parameters.projected_cycle_life, unit: 'cycles' },
                          { label: 'Fade Rate', value: msg.parameters.capacity_fade_rate, unit: 'Ah/cycle' },
                          { label: 'Power Demand', value: msg.parameters.target_power_demand, unit: '/1.0' },
                          { label: 'Porosity', value: (msg.parameters.porosity * 100).toFixed(0), unit: '%' },
                        ].map(p => (
                          <div key={p.label}>
                            <p className="text-xs text-gray-500">{p.label}</p>
                            <p className="text-lg font-mono text-gray-100 mt-0.5">
                              {p.value}<span className="text-gray-500 text-xs ml-1">{p.unit}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* === Generating spinner (shown between thinking and image) === */}
                  {msg.isLoading && msg.thinking_steps && (
                    <div className="mt-4 flex items-center gap-3 py-4 px-5 rounded-2xl" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
                      <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                      <span className="text-sm text-purple-300 animate-pulse">{msg.loadingStage || 'Generating 3D microstructure...'}</span>
                    </div>
                  )}

                  {/* === PANEL 2: Annotated Cube === */}
                  {msg.generatedImage && msg.annotations && (
                    <div className="mt-4">
                      <AnnotatedCubePanel imageUrl={msg.generatedImage} annotations={msg.annotations} tiffUrl={msg.tiffUrl} />
                    </div>
                  )}
                  {/* Image without annotations fallback */}
                  {msg.generatedImage && !msg.annotations && (
                    <div className="mt-4">
                      <img src={msg.generatedImage} alt="Generated" className="rounded-xl max-w-lg border border-white/10" />
                    </div>
                  )}

                  {/* === PANEL 3: Validation === */}
                  {msg.validation && (
                    <div className="mt-4">
                      <ValidationPanel validation={msg.validation} forwardRaw={msg.forward_model_raw} />
                    </div>
                  )}

                  {/* === PANEL 4: Recipe === */}
                  {msg.manufacturing_recipe && (
                    <div className="mt-4">
                      <RecipePanel recipe={msg.manufacturing_recipe} />
                    </div>
                  )}

                  {/* Analysis results (image upload flow) */}
                  {msg.analysis && (
                    <div className="mt-5 space-y-3">
                      <div className="rounded-xl p-5" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Analysis</p>
                        <p className="text-base text-gray-200">
                          Predicted Cycle Life: <span className="font-mono font-semibold text-white text-lg">{msg.analysis.cycle_life}</span> cycles
                        </p>
                      </div>
                      {msg.analysis.warnings.length > 0 && (
                        <div className="rounded-xl p-5" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div>
                              {msg.analysis.warnings.map((w, i) => (
                                <p key={i} className="text-base text-yellow-200/90">{w}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.role === 'model' && !msg.isLoading && (
                    <div className="flex items-center gap-2 mt-4">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors"><ThumbsUp className="w-4 h-4 text-gray-600" /></button>
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors"><ThumbsDown className="w-4 h-4 text-gray-600" /></button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ============ INPUT BAR ============ */}
      <div className="flex-shrink-0 px-8 pb-6 pt-3">
        <div className="max-w-5xl mx-auto">

          {imagePreview && (
            <div className="mb-3 inline-flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm text-gray-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <span className="max-w-[250px] truncate">{uploadedImage?.name}</span>
              <button onClick={removeImage} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          )}

          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your battery application..."
              disabled={isGenerating}
              rows={1}
              className="w-full bg-transparent text-base text-gray-200 placeholder-gray-500 px-6 pt-5 pb-3 resize-none focus:outline-none disabled:opacity-50"
              style={{ minHeight: 52 }}
            />

            <div className="flex items-center justify-between px-5 pb-4 pt-2">
              <div className="flex items-center gap-3">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload}
                  accept=".tif,.tiff,.png,.jpg,.jpeg" className="hidden" />
                <button onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors" title="Upload SEM image">
                  <Upload className="w-4 h-4 text-gray-400" />
                </button>

                <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-400 select-none"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Diffusion + Forward Models
                </div>

                <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-400 select-none"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Link2 className="w-3.5 h-3.5 text-blue-400" />
                  HuggingFace
                </div>
              </div>

              <button
                onClick={() => handleSubmit()}
                disabled={(!input.trim() && !uploadedImage) || isGenerating}
                className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all disabled:opacity-30"
                style={{
                  background: (!input.trim() && !uploadedImage) || isGenerating
                    ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.8)',
                  color: (!input.trim() && !uploadedImage) || isGenerating ? '#6b7280' : '#fff',
                }}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Run
                    <kbd className="text-xs opacity-60 ml-1 hidden sm:inline">&#8984; &crarr;</kbd>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
