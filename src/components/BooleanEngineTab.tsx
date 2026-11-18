import React, { useState } from 'react';
import {
  CheckCircle2,
  Cpu,
  GitCompare,
  Info,
  ShieldCheck,
  Sliders,
  XCircle,
} from 'lucide-react';
import {
  BooleanInputs,
  evaluateAttendanceDecision,
  generateTruthTable,
} from '../utils/citizenLogic';

const TRUTH_TABLE = generateTruthTable();

interface ToggleMeta {
  key: keyof BooleanInputs;
  variable: 'A' | 'B' | 'C' | 'D';
  title: string;
  subtitle: string;
  legalNote: string;
}

const TOGGLE_CONFIGS: ToggleMeta[] = [
  {
    key: 'A',
    variable: 'A',
    title: 'Agendamento Prévio',
    subtitle: 'Protocolo digital agendado pelo app ou portal oficial',
    legalNote: 'Condição de acesso regular (Grupo OR)',
  },
  {
    key: 'B',
    variable: 'B',
    title: 'Roubo/Furto com B.O.',
    subtitle: 'Urgência comprovada mediante Boletim de Ocorrência',
    legalNote: 'Exceção de urgência sem agendamento (Grupo OR)',
  },
  {
    key: 'C',
    variable: 'C',
    title: 'Grupo Prioritário Legal',
    subtitle: 'Idosos (60+), PcD, TEA, Gestantes, Lactantes (Lei 10.048/2000)',
    legalNote: 'Garantia legal de acesso prioritário (Grupo OR)',
  },
  {
    key: 'D',
    variable: 'D',
    title: 'Documentação Básica Completa',
    subtitle: 'Certidão de Nascimento/Casamento original + CPF regularizado',
    legalNote: 'Requisito obrigatório bloqueante (Porta AND final)',
  },
];

export const BooleanEngineTab: React.FC = () => {
  const [inputs, setInputs] = useState<BooleanInputs>({
    A: true,
    B: false,
    C: false,
    D: true,
  });

  const decision = evaluateAttendanceDecision(inputs);

  const handleToggle = (key: keyof BooleanInputs) => {
    setInputs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const applyPreset = (preset: BooleanInputs) => {
    setInputs(preset);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Scenario Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <span>COMPUTER SCIENCE · ÁLGEBRA BOOLEANA & CIRCUITOS LÓGICOS</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">S = (A + B + C) · D</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-100">
            Motor de Decisão Lógica para Triagem de Atendimento Presencial
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset({ A: true, B: false, C: false, D: true })}
            className="rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/50 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Cenário 1: Agendado + Docs (Liberado)
          </button>
          <button
            type="button"
            onClick={() => applyPreset({ A: false, B: false, C: true, D: false })}
            className="rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-rose-500/50 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Cenário 2: Prioritário sem Docs (Bloqueado)
          </button>
          <button
            type="button"
            onClick={() => applyPreset({ A: false, B: true, C: false, D: true })}
            className="rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Cenário 3: B.O. Urgência + Docs (Liberado)
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left Controls & Live Output (7 cols) + Right Karnaugh & Hardware Optimization (5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: 4 Interactive Toggle Switches + Real-Time Result Banner + SVG Logic Gate Circuit */}
        <div className="lg:col-span-7 space-y-6">
          {/* 4 Interactive Toggles */}
          <section
            aria-label="Chaves de Entrada Lógica A, B, C e D"
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-400" />
                <h3 className="text-base font-bold text-slate-100">
                  Variáveis de Entrada do Cidadão (Chaves Lógicas)
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                Binário ABCD = <strong className="text-slate-100">{decision.binaryCode}</strong> (Mintermo m{decision.mintermIndex})
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TOGGLE_CONFIGS.map((item) => {
                const isOn = inputs[item.key];
                const isMandatoryDoc = item.key === 'D';
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    onClick={() => handleToggle(item.key)}
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      isOn
                        ? isMandatoryDoc
                          ? 'border-cyan-500/70 bg-cyan-950/25'
                          : 'border-emerald-500/70 bg-emerald-950/25'
                        : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 w-full">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-bold ${
                            isOn
                              ? isMandatoryDoc
                                ? 'bg-cyan-500 text-slate-950'
                                : 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.variable}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-100">{item.title}</p>
                          <p className="text-[11px] font-mono text-slate-400">{item.legalNote}</p>
                        </div>
                      </div>

                      {/* Switch Visual Pill */}
                      <div
                        className={`inline-flex items-center rounded-md px-2 py-1 font-mono text-xs font-bold tabular-nums shrink-0 ${
                          isOn
                            ? isMandatoryDoc
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.variable} = {isOn ? '1' : '0'}
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Real-Time Boolean Result Banner */}
          <section
            aria-live="polite"
            className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              decision.released
                ? 'border-emerald-500/60 bg-emerald-950/25'
                : 'border-rose-500/60 bg-rose-950/25'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                {decision.released ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="h-8 w-8 text-rose-400 shrink-0" />
                )}
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Saída do Circuito Simplificado · S = ({inputs.A ? '1' : '0'} + {inputs.B ? '1' : '0'} + {inputs.C ? '1' : '0'}) · {inputs.D ? '1' : '0'} = {decision.expressionValue}
                  </p>
                  <h3
                    className={`mt-0.5 text-lg sm:text-xl font-extrabold tracking-tight ${
                      decision.released ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {decision.statusTitle}
                  </h3>
                </div>
              </div>

              <div
                className={`self-start sm:self-center rounded-lg px-3.5 py-2 font-mono text-sm font-bold tabular-nums shrink-0 ${
                  decision.released
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-rose-500 text-slate-950'
                }`}
              >
                SAÍDA S = {decision.expressionValue}
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {decision.citizenGuidance}
            </p>

            {decision.missingRequirements.length > 0 && (
              <div className="rounded-xl border border-rose-500/30 bg-slate-950/80 p-3.5 space-y-1.5">
                <p className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  <span>Pendências identificadas para liberar o atendimento:</span>
                </p>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {decision.missingRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Interactive SVG Logic Gate Diagram (2 Gates: OR + AND) */}
          <section
            aria-label="Diagrama do Circuito Lógico Otimizado"
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Circuito Digital Otimizado (2 Portas Lógicas)</span>
              </h3>
              <span className="font-mono text-xs text-emerald-400 whitespace-nowrap shrink-0">
                Porta 1: OR (A+B+C) → Porta 2: AND (· D)
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
              <svg
                viewBox="0 0 680 210"
                className="w-full min-w-[540px] h-auto"
                role="img"
                aria-label="Diagrama esquemático da porta OR de 3 entradas A, B, C conectada à porta AND com a entrada D gerando a saída S"
              >
                {/* Input Labels A, B, C, D */}
                <g className="font-mono text-xs font-bold">
                  <rect
                    x="16"
                    y="20"
                    width="58"
                    height="26"
                    rx="5"
                    fill={inputs.A ? '#10b981' : '#1e293b'}
                  />
                  <text
                    x="45"
                    y="37"
                    textAnchor="middle"
                    fill={inputs.A ? '#020617' : '#94a3b8'}
                  >
                    A = {inputs.A ? '1' : '0'}
                  </text>

                  <rect
                    x="16"
                    y="65"
                    width="58"
                    height="26"
                    rx="5"
                    fill={inputs.B ? '#10b981' : '#1e293b'}
                  />
                  <text
                    x="45"
                    y="82"
                    textAnchor="middle"
                    fill={inputs.B ? '#020617' : '#94a3b8'}
                  >
                    B = {inputs.B ? '1' : '0'}
                  </text>

                  <rect
                    x="16"
                    y="110"
                    width="58"
                    height="26"
                    rx="5"
                    fill={inputs.C ? '#10b981' : '#1e293b'}
                  />
                  <text
                    x="45"
                    y="127"
                    textAnchor="middle"
                    fill={inputs.C ? '#020617' : '#94a3b8'}
                  >
                    C = {inputs.C ? '1' : '0'}
                  </text>

                  <rect
                    x="16"
                    y="160"
                    width="58"
                    height="26"
                    rx="5"
                    fill={inputs.D ? '#06b6d4' : '#1e293b'}
                  />
                  <text
                    x="45"
                    y="177"
                    textAnchor="middle"
                    fill={inputs.D ? '#020617' : '#94a3b8'}
                  >
                    D = {inputs.D ? '1' : '0'}
                  </text>
                </g>

                {/* Wires from A, B, C to OR Gate */}
                <path
                  d="M 74 33 L 150 33 L 150 58 L 195 58"
                  fill="none"
                  stroke={inputs.A ? '#10b981' : '#334155'}
                  strokeWidth="3"
                />
                <path
                  d="M 74 78 L 198 78"
                  fill="none"
                  stroke={inputs.B ? '#10b981' : '#334155'}
                  strokeWidth="3"
                />
                <path
                  d="M 74 123 L 150 123 L 150 98 L 195 98"
                  fill="none"
                  stroke={inputs.C ? '#10b981' : '#334155'}
                  strokeWidth="3"
                />

                {/* Gate 1: OR Gate */}
                <path
                  d="M 190 43 Q 210 78 190 113 Q 245 113 275 78 Q 245 43 190 43 Z"
                  fill="#0f172a"
                  stroke={decision.orGroupActive ? '#10b981' : '#475569'}
                  strokeWidth="3"
                />
                <text
                  x="230"
                  y="82"
                  textAnchor="middle"
                  fill="#e2e8f0"
                  className="font-mono text-[11px] font-bold"
                >
                  OR
                </text>

                {/* Wire from OR Gate to AND Gate */}
                <path
                  d="M 275 78 L 350 78 L 350 108 L 395 108"
                  fill="none"
                  stroke={decision.orGroupActive ? '#10b981' : '#334155'}
                  strokeWidth="3"
                />
                <text
                  x="332"
                  y="68"
                  textAnchor="middle"
                  fill={decision.orGroupActive ? '#34d399' : '#64748b'}
                  className="font-mono text-[11px] font-semibold"
                >
                  A+B+C = {decision.orGroupActive ? '1' : '0'}
                </text>

                {/* Wire from D to AND Gate */}
                <path
                  d="M 74 173 L 350 173 L 350 138 L 395 138"
                  fill="none"
                  stroke={inputs.D ? '#06b6d4' : '#334155'}
                  strokeWidth="3"
                />

                {/* Gate 2: AND Gate */}
                <path
                  d="M 395 90 L 435 90 A 33 33 0 0 1 435 156 L 395 156 Z"
                  fill="#0f172a"
                  stroke={decision.released ? '#10b981' : '#475569'}
                  strokeWidth="3"
                />
                <text
                  x="426"
                  y="127"
                  textAnchor="middle"
                  fill="#e2e8f0"
                  className="font-mono text-[11px] font-bold"
                >
                  AND
                </text>

                {/* Final Output Wire to S */}
                <path
                  d="M 468 123 L 545 123"
                  fill="none"
                  stroke={decision.released ? '#10b981' : '#f43f5e'}
                  strokeWidth="4"
                />

                {/* Output Node S */}
                <rect
                  x="545"
                  y="98"
                  width="118"
                  height="50"
                  rx="8"
                  fill={decision.released ? '#065f46' : '#881337'}
                  stroke={decision.released ? '#10b981' : '#f43f5e'}
                  strokeWidth="2"
                />
                <text
                  x="604"
                  y="120"
                  textAnchor="middle"
                  fill="#ffffff"
                  className="font-mono text-xs font-bold"
                >
                  SAÍDA S = {decision.expressionValue}
                </text>
                <text
                  x="604"
                  y="137"
                  textAnchor="middle"
                  fill={decision.released ? '#a7f3d0' : '#fecdd3'}
                  className="font-mono text-[10px]"
                >
                  {decision.released ? 'LIBERADO' : 'BLOQUEADO'}
                </text>
              </svg>
            </div>
          </section>
        </div>

        {/* Right Column: Karnaugh & De Morgan Optimization Card + Interactive Truth Table */}
        <div className="lg:col-span-5 space-y-6">
          {/* Comparative Hardware Optimization Card */}
          <section
            aria-label="Comparativo de Otimização via Mapa de Karnaugh e De Morgan"
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <p className="text-xs font-semibold text-emerald-400">
                  OTIMIZAÇÃO DE HARDWARE · KARNAUGH & DE MORGAN
                </p>
                <h3 className="mt-0.5 text-lg font-bold text-slate-100 flex items-center gap-2">
                  <GitCompare className="h-4 w-4 text-emerald-400" />
                  <span>Redução de 11 para 2 Portas Lógicas</span>
                </h3>
              </div>
              <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 font-mono text-sm font-bold text-emerald-300 tabular-nums">
                -81,82% Portas
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
                <p className="text-xs text-slate-400">Forma Canônica Não Otimizada (SOP)</p>
                <p className="font-mono text-2xl font-bold text-rose-400 tabular-nums">
                  {decision.hardwareMetrics.originalGates} portas
                </p>
                <p className="text-[11px] text-slate-400">
                  7 mintermos de 4 variáveis (m1, m3, m5, m7, m9, m11, m13, m15) + inversores
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/35 bg-emerald-950/20 p-3.5 space-y-1">
                <p className="text-xs text-emerald-300">Circuito Simplificado Final</p>
                <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                  {decision.hardwareMetrics.optimizedGates} portas
                </p>
                <p className="text-[11px] text-slate-300">
                  1 porta OR (A+B+C) + 1 porta AND (·D) → 81,82% de economia de silício e energia
                </p>
              </div>
            </div>

            {/* Step-by-Step Algebraic Proof */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2 font-mono text-xs">
              <p className="text-slate-400 font-sans font-semibold text-xs">
                Demonstração Algébrica (De Morgan + Mapa de Karnaugh):
              </p>
              <div className="space-y-1 text-slate-300">
                <p>1. Zeros de S ocorrem quando D=0 ou (A=0 · B=0 · C=0)</p>
                <p>2. Complemento: S&apos; = D&apos; + (A&apos; · B&apos; · C&apos;)</p>
                <p>3. Aplicando Teorema de De Morgan em S = (S&apos;)&apos;:</p>
                <p className="text-emerald-400 font-bold pt-1">
                  S = (A + B + C) · D
                </p>
              </div>
            </div>
          </section>

          {/* Interactive 16-Row Truth Table */}
          <section
            aria-label="Tabela Verdade Interativa de 16 Combinações"
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Tabela-Verdade Completa (Clique em uma linha para simular)
                </h3>
                <p className="text-xs text-slate-400">
                  Mintermo ativo destacado: m{decision.mintermIndex} ({decision.binaryCode})
                </p>
              </div>
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="max-h-[310px] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left font-mono text-xs tabular-nums">
                <thead className="sticky top-0 bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-2.5">#</th>
                    <th className="py-2 px-2">A</th>
                    <th className="py-2 px-2">B</th>
                    <th className="py-2 px-2">C</th>
                    <th className="py-2 px-2">D</th>
                    <th className="py-2 px-2">A+B+C</th>
                    <th className="py-2 px-2.5 text-right">Saída S</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {TRUTH_TABLE.map((row) => {
                    const isCurrent = row.index === decision.mintermIndex;
                    return (
                      <tr
                        key={row.index}
                        onClick={() =>
                          applyPreset({
                            A: Boolean(row.A),
                            B: Boolean(row.B),
                            C: Boolean(row.C),
                            D: Boolean(row.D),
                          })
                        }
                        className={`cursor-pointer transition-colors ${
                          isCurrent
                            ? 'bg-emerald-500/20 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <td className="py-1.5 px-2.5 text-slate-400">m{row.index}</td>
                        <td className="py-1.5 px-2">{row.A}</td>
                        <td className="py-1.5 px-2">{row.B}</td>
                        <td className="py-1.5 px-2">{row.C}</td>
                        <td className="py-1.5 px-2 text-cyan-300">{row.D}</td>
                        <td className="py-1.5 px-2">{row.orPart}</td>
                        <td
                          className={`py-1.5 px-2.5 text-right font-bold ${
                            row.S === 1 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {row.S === 1 ? '1 (LIB)' : '0 (BLOQ)'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
