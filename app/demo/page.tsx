'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Menu, Pencil, Share2, GitBranch, Plus, MoreVertical, SlidersHorizontal,
  ThumbsUp, ThumbsDown, Upload, Link2, Smile, Loader2, AlertCircle, X, Image as ImageIcon
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  reasoning?: string;
  parameters?: {
    target_cycle_life: number;
    target_capacity_fade_rate: number;
    target_power_demand: number;
  };
  imageUrl?: string;
  generatedImage?: string;
  analysis?: {
    cycle_life: number;
    warnings: string[];
  };
  isLoading?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Tokens counter (cosmetic, like AI Studio)                          */
/* ------------------------------------------------------------------ */
function countTokens(msgs: Message[]): number {
  return msgs.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
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

  // Auto-resize textarea
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

    const loadingMsg: Message = { id: `${Date.now()}_l`, role: 'model', content: '', isLoading: true };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      if (uploadedImage) {
        const fd = new FormData();
        fd.append('image', uploadedImage);
        fd.append('prompt', input);
        const res = await fetch('/api/analyze-image', { method: 'POST', body: fd });
        const data = await res.json();
        setMessages(prev => prev.filter(m => !m.isLoading).concat({
          id: Date.now().toString(), role: 'model', content: data.content, analysis: data.analysis,
        }));
        removeImage();
      } else {
        const res = await fetch('/api/generate-material', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input }),
        });
        const data = await res.json();
        setMessages(prev => prev.filter(m => !m.isLoading).concat({
          id: Date.now().toString(), role: 'model', content: data.content,
          reasoning: data.reasoning, parameters: data.parameters, generatedImage: data.imageUrl,
        }));
      }
    } catch {
      setMessages(prev => prev.filter(m => !m.isLoading).concat({
        id: Date.now().toString(), role: 'model',
        content: 'Something went wrong. Please try again.',
      }));
    } finally { setIsGenerating(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const tokenCount = countTokens(messages);

  return (
    <main className="h-screen w-full flex flex-col" style={{ background: '#1e1e2e' }}>

      {/* ============ TOP BAR ============ */}
      <header className="flex items-center justify-between px-6 h-16 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Left */}
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSidebar(!showSidebar)}
            className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <Menu className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="text-xl font-medium text-gray-100 select-none">
            Skanda &mdash; Material Architect
          </h1>
          <button className="p-2 rounded-md hover:bg-white/5 transition-colors">
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>
          <span className="text-sm text-gray-500 ml-1 tabular-nums">{tokenCount} tokens</span>
        </div>
        {/* Right */}
        <div className="flex items-center gap-1.5">
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <Share2 className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <GitBranch className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <Plus className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </header>

      {/* ============ MESSAGES ============ */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 pt-10 pb-6">

          {messages.length === 0 && (
            <p className="text-gray-500 text-lg mt-24 text-center select-none">
              Start a conversation with Skanda. Describe your battery application or upload an SEM image.
            </p>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="mb-10">
              {/* Role label */}
              <p className="text-sm font-medium mb-3 select-none"
                style={{ color: msg.role === 'user' ? '#9ca3af' : '#9ca3af' }}>
                {msg.role === 'user' ? 'User' : 'Model'}
              </p>

              {/* Loading state */}
              {msg.isLoading ? (
                <div className="flex items-center gap-3 py-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse [animation-delay:150ms]" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse [animation-delay:300ms]" />
                </div>
              ) : (
                <>
                  {/* Uploaded image thumbnail */}
                  {msg.imageUrl && (
                    <div className="mb-4">
                      <img src={msg.imageUrl} alt="SEM upload"
                        className="rounded-xl max-w-sm border border-white/10" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="text-lg leading-8 text-gray-200 whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {/* Reasoning card */}
                  {msg.reasoning && (
                    <div className="mt-5 rounded-xl p-5"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">Reasoning</p>
                      <p className="text-base text-gray-300 leading-7">{msg.reasoning}</p>
                    </div>
                  )}

                  {/* Physics parameters */}
                  {msg.parameters && (
                    <div className="mt-4 rounded-xl p-5"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-4">Physics Parameters</p>
                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { label: 'Cycle Life', value: msg.parameters.target_cycle_life, unit: 'cycles' },
                          { label: 'Fade Rate', value: msg.parameters.target_capacity_fade_rate, unit: 'Ah/cycle' },
                          { label: 'Power Demand', value: msg.parameters.target_power_demand, unit: '' },
                        ].map(p => (
                          <div key={p.label}>
                            <p className="text-xs text-gray-500">{p.label}</p>
                            <p className="text-base font-mono text-gray-100 mt-1">
                              {p.value} <span className="text-gray-500 text-xs">{p.unit}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generated image */}
                  {msg.generatedImage && (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">Generated Microstructure</p>
                      <img src={msg.generatedImage} alt="Generated"
                        className="rounded-xl max-w-lg border border-white/10" />
                    </div>
                  )}

                  {/* Analysis results */}
                  {msg.analysis && (
                    <div className="mt-5 space-y-3">
                      <div className="rounded-xl p-5"
                        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Analysis</p>
                        <p className="text-base text-gray-200">
                          Predicted Cycle Life: <span className="font-mono font-semibold text-white text-lg">{msg.analysis.cycle_life}</span> cycles
                        </p>
                      </div>
                      {msg.analysis.warnings.length > 0 && (
                        <div className="rounded-xl p-5"
                          style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
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

                  {/* Thumbs up / down — only on model messages */}
                  {msg.role === 'model' && !msg.isLoading && (
                    <div className="flex items-center gap-2 mt-4">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ThumbsUp className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ThumbsDown className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Disclaimer (shown after first model response) */}
          {messages.some(m => m.role === 'model' && !m.isLoading) && (
            <div className="flex items-center gap-2.5 text-gray-500 text-sm mt-3 mb-6 select-none">
              <AlertCircle className="w-4 h-4" />
              <span>Skanda AI models may make mistakes, so double-check outputs.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ============ INPUT BAR ============ */}
      <div className="flex-shrink-0 px-8 pb-6 pt-3">
        <div className="max-w-4xl mx-auto">

          {/* Image preview chip */}
          {imagePreview && (
            <div className="mb-3 inline-flex items-center gap-2.5 rounded-xl px-4 py-2 text-base text-gray-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <span className="max-w-[250px] truncate">{uploadedImage?.name}</span>
              <button onClick={removeImage} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}

          {/* Textarea container */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Start typing a prompt, use option + enter to append"
              disabled={isGenerating}
              rows={1}
              className="w-full bg-transparent text-lg text-gray-200 placeholder-gray-500 px-6 pt-5 pb-3 resize-none focus:outline-none disabled:opacity-50"
              style={{ minHeight: 56 }}
            />

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between px-5 pb-4 pt-2">
              {/* Left chips */}
              <div className="flex items-center gap-3">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload}
                  accept=".tif,.tiff,.png,.jpg,.jpeg" className="hidden" />
                <button onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-full hover:bg-white/5 transition-colors" title="Upload SEM image">
                  <Upload className="w-5 h-5 text-gray-400" />
                </button>

                <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-300 select-none cursor-default"
                  style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Inverse Diffusion Model
                </div>

                <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-300 select-none cursor-default"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                  <Link2 className="w-4 h-4 text-blue-400" />
                  HuggingFace
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <button className="p-2.5 rounded-full hover:bg-white/5 transition-colors">
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  onClick={() => handleSubmit()}
                  disabled={(!input.trim() && !uploadedImage) || isGenerating}
                  className="flex items-center gap-2 rounded-full px-5 py-2 text-base font-medium transition-all disabled:opacity-30"
                  style={{
                    background: (!input.trim() && !uploadedImage) || isGenerating
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(139,92,246,0.8)',
                    color: (!input.trim() && !uploadedImage) || isGenerating ? '#6b7280' : '#fff',
                  }}
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
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
      </div>
    </main>
  );
}
