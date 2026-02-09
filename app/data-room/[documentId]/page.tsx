"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Share2, Clock, Eye, FileText, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { genesisProtocolDoc } from "../content/gtm-content";
import { skandaArchitectureDoc } from "../content/architecture-content";

const pdfMap: Record<string, string> = {
  "genesis-protocol": "/pdf/The Genesis Protocol 2 (1).pdf",
  "skanda-architecture": "/pdf/Architecture- The 10M Synthetic _Physics Brain.pdf",
};

const documentContent: Record<string, any> = {
  "genesis-protocol": genesisProtocolDoc,
  "skanda-architecture": skandaArchitectureDoc,
};

/* ─── Inline text transforms (bold, italic) ─── */
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-gray-500 italic">$1</em>');
}

/* ─── Markdown-to-HTML renderer with table support ─── */
function renderDocumentContent(markdown: string): string {
  // ── 1. Extract and render tables first (replace with placeholders) ──
  const tables: string[] = [];
  let html = markdown.replace(
    /(?:^|\n)(\|[^\n]+\|\n\|[\s\-:|]+\|\n(?:\|[^\n]+\|\n?)+)/gm,
    (match) => {
      const rows = match.trim().split('\n').filter(r => r.trim());
      if (rows.length < 2) return match;
      const sepRow = rows[1];
      if (!/^\|[\s\-:|]+\|$/.test(sepRow.trim())) return match;

      const headers = rows[0].split('|').slice(1, -1).map(c => c.trim());
      const bodyRows = rows.slice(2);

      let table = '<div class="overflow-x-auto my-8 rounded-xl border border-gray-200">';
      table += '<table class="w-full text-sm">';
      table += '<thead><tr>';
      headers.forEach(h => {
        table += `<th class="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b border-gray-200">${renderInline(h)}</th>`;
      });
      table += '</tr></thead><tbody>';
      bodyRows.forEach((row, i) => {
        const cells = row.split('|').slice(1, -1).map(c => c.trim());
        table += `<tr class="${i % 2 === 1 ? 'bg-gray-50/40' : ''} border-b border-gray-100 last:border-0">`;
        cells.forEach(cell => {
          table += `<td class="px-5 py-3 text-gray-700 leading-relaxed">${renderInline(cell)}</td>`;
        });
        table += '</tr>';
      });
      table += '</tbody></table></div>';

      const idx = tables.length;
      tables.push(table);
      return `\n%%TABLE_${idx}%%\n`;
    }
  );

  // ── 2. Process markdown ──
  html = html
    // Horizontal rules (section dividers)
    .replace(/^---$/gm, '<div class="my-12 flex items-center gap-4"><div class="flex-1 border-t border-gray-200"></div><div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div><div class="flex-1 border-t border-gray-200"></div></div>')
    // Blockquotes
    .replace(/^>\s+(.+)/gm, '<div class="border-l-4 border-gray-300 pl-5 py-3 my-6 bg-gray-50 rounded-r-lg"><p class="text-gray-600 italic text-base leading-relaxed">$1</p></div>')
    // Headings
    .replace(/####\s+(.+)/g, '<h4 class="text-sm font-bold text-gray-500 mt-8 mb-3 tracking-widest uppercase">$1</h4>')
    .replace(/###\s+(.+)/g, '<h3 class="text-xl font-bold text-gray-900 mt-10 mb-4">$1</h3>')
    .replace(/##\s+(.+)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-5 pb-3 border-b border-gray-100">$1</h2>')
    .replace(/#\s+(.+)/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="text-gray-500 italic">$1</em>')
    // Numbered lists
    .replace(/^(\d+)\. (.+)/gm, '<div class="flex gap-3 mb-2.5 ml-2"><span class="text-gray-400 font-mono text-sm mt-0.5 shrink-0">$1.</span><span class="text-gray-700 leading-relaxed">$2</span></div>')
    // Bullet lists
    .replace(/^\* (.+)/gm, '<div class="flex gap-3 mb-2.5 ml-2"><span class="text-gray-400 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span><span class="text-gray-700 leading-relaxed">$1</span></div>')
    // Double newlines → paragraph breaks
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
    // Catch remaining lines
    .replace(/^(?!<[h|d|p|b|s|%])/gm, '<p class="text-gray-700 leading-relaxed mb-4">');

  // ── 3. Restore tables ──
  tables.forEach((table, i) => {
    html = html.replace(`%%TABLE_${i}%%`, table);
  });

  return html;
}

function downloadMarkdown(content: string, title: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-")}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function DocumentPage() {
  const params = useParams();
  const documentId = params?.documentId as string;
  const doc = documentContent[documentId];
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowDownloadMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!doc) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Document Not Found</h1>
          <Link href="/data-room" className="text-[#48cae4] hover:underline">
            Return to Data Room
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/data-room" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Data Room</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      downloadMarkdown(doc.content, doc.title);
                      setShowDownloadMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <FileText className="w-4 h-4 text-white/50" />
                    <div>
                      <p className="text-sm text-white">Markdown (.md)</p>
                      <p className="text-xs text-white/40">Raw document</p>
                    </div>
                  </button>
                  {pdfMap[documentId] && (
                    <a
                      href={pdfMap[documentId]}
                      download
                      onClick={() => setShowDownloadMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-t border-white/5"
                    >
                      <Download className="w-4 h-4 text-white/50" />
                      <div>
                        <p className="text-sm text-white">PDF Document</p>
                        <p className="text-xs text-white/40">Formatted version</p>
                      </div>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Title Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-6 pt-12 pb-8"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-16 text-center">
          <div 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
            style={{ 
              backgroundColor: `${doc.color}15`,
              color: doc.color,
              border: `1px solid ${doc.color}30`
            }}
          >
            {doc.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{doc.title}</h1>
          <p className="text-xl text-gray-500 mb-8">{doc.subtitle}</p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {doc.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Confidential
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 tracking-widest uppercase">Shodh AI — Investor Data Room</p>
          </div>
        </div>
      </motion.div>

      {/* Document Content (continuous document style) */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-14 lg:p-16">
            <div 
              className="max-w-none"
              dangerouslySetInnerHTML={{ __html: renderDocumentContent(doc.content) }}
            />
            <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-300 tracking-wider uppercase">Shodh AI — Confidential</p>
              <p className="text-xs text-gray-300">Investor Data Room</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
