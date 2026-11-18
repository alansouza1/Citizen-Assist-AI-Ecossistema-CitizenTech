import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpenCheck,
  Code2,
  Database,
  FileText,
  Lock,
  RotateCcw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import {
  RAG_PRESETS,
  RagPresetResponse,
  resolveCustomRagQuery,
} from '../utils/citizenLogic';

interface ChatEntry {
  entryId: string;
  timestamp: string;
  response: RagPresetResponse;
}

export const RagAssistantTab: React.FC = () => {
  const [history, setHistory] = useState<ChatEntry[]>([
    {
      entryId: 'init-cin',
      timestamp: '14:00:12',
      response: RAG_PRESETS.cin_2via,
    },
  ]);
  const [activePresetId, setActivePresetId] = useState<RagPresetResponse['id']>('cin_2via');
  const [customInput, setCustomInput] = useState('');
  const [inspectorTab, setInspectorTab] = useState<'trace' | 'python' | 'c_avl'>('trace');

  const currentResponse =
    history.length > 0 ? history[history.length - 1].response : RAG_PRESETS[activePresetId];

  const [queryCount, setQueryCount] = useState<number>(1);

  const handleSelectPreset = (id: RagPresetResponse['id']) => {
    setActivePresetId(id);
    const preset = RAG_PRESETS[id];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setQueryCount((c) => c + 1);
    setHistory([
      {
        entryId: `${id}-${Date.now()}`,
        timestamp: timeStr,
        response: preset,
      },
    ]);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const resolved = resolveCustomRagQuery(customInput);
    setActivePresetId(resolved.id);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setQueryCount((c) => c + 1);
    setHistory([
      {
        entryId: `custom-${Date.now()}`,
        timestamp: timeStr,
        response: resolved,
      },
    ]);
    setCustomInput('');
  };

  const handleResetChat = () => {
    setActivePresetId('cin_2via');
    setQueryCount(1);
    setHistory([
      {
        entryId: 'reset-cin',
        timestamp: '14:00:12',
        response: RAG_PRESETS.cin_2via,
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>MOTOR DE IA RESPONSÁVEL & VERIFICÁVEL</span>
            <span aria-hidden="true">·</span>
            <span>LANGCHAIN + CHROMADB + PYTHON OO + C O(log n)</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-100">
            Simulador Citizen Assist AI com Citação Normativa e Guardrail LGPD
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2 text-xs text-emerald-300 flex items-center gap-2 whitespace-nowrap shrink-0">
            <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Zero Coleta de CPF/RG (LGPD Art. 6º)</span>
          </div>
          <button
            type="button"
            onClick={handleResetChat}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reiniciar Sessão ({queryCount})</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Left Chat Simulator (7 cols) + Right Technical Inspector (5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Chat Simulator */}
        <section
          aria-label="Simulador de Chat do Citizen Assist AI"
          className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden"
        >
          {/* 3 Live Pitch Preset Buttons Bar */}
          <div className="border-b border-slate-800 bg-slate-950/80 p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-300">
                Perguntas Rápidas Pré-Configuradas (Clique ao vivo durante o Pitch):
              </span>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums whitespace-nowrap shrink-0">
                Data da Consulta: 17/11/2026
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleSelectPreset('cin_2via')}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all cursor-pointer ${
                  activePresetId === 'cin_2via'
                    ? 'border-emerald-500 bg-emerald-500/15 text-slate-100'
                    : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  CENÁRIO 01 · DOCUMENTOS
                </span>
                <span className="mt-1 text-xs font-semibold leading-snug">
                  Quais documentos preciso para a 2ª via da CIN?
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('prioridade_legal')}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all cursor-pointer ${
                  activePresetId === 'prioridade_legal'
                    ? 'border-cyan-500 bg-cyan-500/15 text-slate-100'
                    : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="text-[11px] font-mono font-semibold text-cyan-400">
                  CENÁRIO 02 · LGPD & DIREITOS
                </span>
                <span className="mt-1 text-xs font-semibold leading-snug">
                  Tenho direito a atendimento prioritário?
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('fora_escopo')}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all cursor-pointer ${
                  activePresetId === 'fora_escopo'
                    ? 'border-amber-500 bg-amber-500/15 text-slate-100'
                    : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="text-[11px] font-mono font-semibold text-amber-400">
                  CENÁRIO 03 · ANTI-INJECTION
                </span>
                <span className="mt-1 text-xs font-semibold leading-snug">
                  Pergunta fora de escopo / contradição documental
                </span>
              </button>
            </div>
          </div>

          {/* Active Conversation Feed */}
          <div className="p-5 space-y-5">
            {history.map((item) => {
              const res = item.response;
              const isOutScope = res.guardrailStatus === 'BLOQUEIO_ESCOPO_INJECTION';
              return (
                <div key={item.entryId} className="space-y-3">
                  {/* Citizen Question Bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-xl rounded-xl rounded-tr-xs bg-slate-800 px-4 py-3 text-sm text-slate-100 border border-slate-700">
                      <div className="flex items-center justify-between gap-4 text-[11px] text-slate-400 mb-1">
                        <span>Cidadão (Sessão Anônima)</span>
                        <span className="font-mono tabular-nums">{item.timestamp}</span>
                      </div>
                      <p className="font-medium">{res.question}</p>
                    </div>
                  </div>

                  {/* Assistant Verified Response Card */}
                  <div
                    className={`rounded-xl border p-5 space-y-4 ${
                      isOutScope
                        ? 'border-amber-500/40 bg-amber-950/15'
                        : 'border-emerald-500/35 bg-slate-950/85'
                    }`}
                  >
                    {/* Response Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 pb-3">
                      <div className="flex items-center gap-2">
                        {isOutScope ? (
                          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
                        ) : (
                          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-slate-100">
                          Citizen Assist AI · Resposta Auditada
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums">
                        <span className="text-slate-400">
                          Consulta: <strong className="text-slate-200">{res.consultationDate}</strong>
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span
                          className={
                            isOutScope
                              ? 'text-amber-300 font-semibold'
                              : 'text-emerald-400 font-semibold'
                          }
                        >
                          Confiança RAG: {res.confidencePercent}%
                        </span>
                      </div>
                    </div>

                    {/* LGPD / Security Status Banner */}
                    <div
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                        isOutScope
                          ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                      }`}
                    >
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      <span>{res.lgpdBadgeText}</span>
                    </div>

                    {/* Main Response Body */}
                    <div className="space-y-2 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {res.answerMarkdown.split('**').map((part, idx) =>
                        idx % 2 === 1 ? (
                          <strong key={idx} className="font-semibold text-white">
                            {part}
                          </strong>
                        ) : (
                          <React.Fragment key={idx}>{part}</React.Fragment>
                        )
                      )}
                    </div>

                    {/* Official Legal Sources Box */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                        <BookOpenCheck className="h-3.5 w-3.5" />
                        <span>Fontes Oficiais Verificadas (Citação Obrigatória RAG):</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {res.sources.map((src, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono text-emerald-400 tabular-nums">[{i + 1}]</span>
                            <span>{src}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Official Disclaimer */}
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{res.disclaimer}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Query Form */}
          <form
            onSubmit={handleCustomSubmit}
            className="border-t border-slate-800 bg-slate-950 p-3.5 flex items-center gap-2"
          >
            <label htmlFor="rag-custom-input" className="sr-only">
              Digite uma dúvida sobre documentos, prioridade ou teste um prompt fora de escopo
            </label>
            <input
              id="rag-custom-input"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ou digite uma pergunta ao vivo (ex: 'Segunda via RG', 'Idoso tem prioridade?', 'Ações da bolsa')..."
              className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Consultar RAG</span>
            </button>
          </form>
        </section>

        {/* Right Column: Technical Architecture & Code Inspector (Python + C + ChromaDB) */}
        <aside
          aria-label="Indicadores Técnicos do Motor RAG"
          className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-5"
        >
          <div className="border-b border-slate-800 pb-3.5">
            <p className="text-xs font-semibold text-cyan-400">
              ARQUITETURA INTERDISCIPLINAR · IA + PYTHON + C
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-100">
              Painel de Telemetria do Motor RAG
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Inspecione em tempo real como as três camadas computacionais processaram a consulta selecionada.
            </p>
          </div>

          {/* 3 Architectural Layer Indicators */}
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5" />
                  1. Motor RAG (LangChain + ChromaDB)
                </span>
                <span className="font-mono text-slate-400 tabular-nums">Vector Top-K</span>
              </div>
              <p className="font-mono text-xs text-slate-200">
                {currentResponse.technicalTrace.chromaVectorScore}
              </p>
              <p className="text-[11px] text-slate-400">
                Recuperação semântica restrita a decretos e leis federais homologadas, bloqueando geração livre sem âncora documental.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5" />
                  2. Cérebro Orientado a Objetos em Python
                </span>
                <span className="font-mono text-slate-400">Python 3.12 OO</span>
              </div>
              <p className="font-mono text-xs text-slate-200 break-all">
                {currentResponse.technicalTrace.pythonBrainClass}
              </p>
              <p className="text-[11px] text-slate-400">
                Encapsulamento, herança e polimorfismo para higienização de PII (LGPD) e validação contra Prompt Injection antes da síntese.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" />
                  3. Base Indexada em C (Estruturas de Dados)
                </span>
                <span className="font-mono text-emerald-300 tabular-nums">
                  {currentResponse.technicalTrace.cComplexity}
                </span>
              </div>
              <p className="font-mono text-xs text-slate-200">
                {currentResponse.technicalTrace.cIndexLookup}
              </p>
              <p className="text-[11px] text-slate-400">
                Árvore binária balanceada (AVL) escrita em C para busca rápida de metadados de leis e verificação de revogação normativa.
              </p>
            </div>
          </div>

          {/* Code & Trace Switcher */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
              <button
                type="button"
                onClick={() => setInspectorTab('trace')}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  inspectorTab === 'trace'
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Log de Execução
              </button>
              <button
                type="button"
                onClick={() => setInspectorTab('python')}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  inspectorTab === 'python'
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cérebro Python OO
              </button>
              <button
                type="button"
                onClick={() => setInspectorTab('c_avl')}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  inspectorTab === 'c_avl'
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Índice C O(log n)
              </button>
            </div>

            {inspectorTab === 'trace' && (
              <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto">
{`[RAG_PIPELINE] Data de Referência: ${currentResponse.consultationDate}
[LGPD_SHIELD] PII Regex Scan: 0 CPF/RG detectados -> PASS
[C_AVL_INDEX] ${currentResponse.technicalTrace.cIndexLookup}
[C_AVL_METRICS] Nós visitados: ${currentResponse.technicalTrace.nodesScanned} | Complexidade: O(log n)
[CHROMADB_VEC] ${currentResponse.technicalTrace.chromaVectorScore}
[GUARDRAIL] Status: ${currentResponse.guardrailStatus}
[CONFIDENCE] Score Final Auditado: ${currentResponse.confidencePercent}%`}
              </pre>
            )}

            {inspectorTab === 'python' && (
              <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] leading-relaxed text-cyan-200 overflow-x-auto">
{`class CitizenAssistantService:
    def __init__(self, vector_store: Chroma, c_index: CAvlBridge):
        self.vector_store = vector_store
        self.c_index = c_index
        self.guardrail = LGPDPrivacyGuardrail()

    def answer_citizen(self, query: str) -> VerifiedResponse:
        clean_q = self.guardrail.redact_pii(query)
        if self.guardrail.detect_injection(clean_q):
            return VerifiedResponse.safe_abstain("BLOQUEIO_ESCOPO")
        docs = self.vector_store.similarity_search_with_score(clean_q, k=3)
        return self.synthesize_with_citations(docs, date="17/11/2026")`}
              </pre>
            )}

            {inspectorTab === 'c_avl' && (
              <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] leading-relaxed text-emerald-200 overflow-x-auto">
{`typedef struct LawNode {
    uint32_t law_code;        // Ex: 14534 (Lei 14.534/2023)
    char     citation[64];    // Fonte oficial homologada
    uint8_t  height;          // Fator de balanceamento AVL
    struct LawNode *left, *right;
} LawNode;

LawNode* avl_search(LawNode* root, uint32_t key) {
    if (!root || root->law_code == key) return root;
    return (key < root->law_code)
        ? avl_search(root->left, key)   // O(log n)
        : avl_search(root->right, key);
}`}
              </pre>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
