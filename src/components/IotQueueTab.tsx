import React, { useState } from 'react';
import {
  Accessibility,
  BellRing,
  Cpu,
  MinusCircle,
  PlusCircle,
  Radio,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  applyQueueAction,
  calculateQueueMetrics,
  QueueState,
} from '../utils/citizenLogic';

interface QueueLogItem {
  id: string;
  time: string;
  ticket: string;
  event: string;
  isPriority: boolean;
}

export const IotQueueTab: React.FC = () => {
  const [queueState, setQueueState] = useState<QueueState>({
    peopleInQueue: 4,
    priorityCount: 1,
    servedToday: 142,
    lastTicketCode: 'N-048',
    lastActionLabel: 'Totem IoT inicializado — Monitoramento de fila em tempo real',
    priorityAlertActive: false,
  });

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [logs, setLogs] = useState<QueueLogItem[]>([
    {
      id: 'init-1',
      time: '14:02:10',
      ticket: 'N-048',
      event: 'Entrada Cidadão registrada via sensor óptico GP14',
      isPriority: false,
    },
    {
      id: 'init-2',
      time: '14:01:05',
      ticket: 'P-011',
      event: 'Atendimento Prioritário concluído no Guichê 01',
      isPriority: true,
    },
  ]);

  const metrics = calculateQueueMetrics(queueState);

  const playAccessibilityBeep = (freq: number, isPriority: boolean) => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = isPriority ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (isPriority) {
        osc.frequency.setValueAtTime(freq * 1.25, ctx.currentTime + 0.14);
      }
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.34);
    } catch {
      // Ignore audio context autoplay restrictions silently
    }
  };

  const handleAction = (
    action: 'ADD_CITIZEN' | 'SERVE_DESK' | 'PRIORITY_CALL' | 'RESET'
  ) => {
    const next = applyQueueAction(queueState, action);
    setQueueState(next);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const isPriority = action === 'PRIORITY_CALL';
    playAccessibilityBeep(isPriority ? 880 : 528, isPriority);

    setLogs((prev) => [
      {
        id: `${action}-${Date.now()}`,
        time: timeStr,
        ticket: next.lastTicketCode,
        event: next.lastActionLabel,
        isPriority,
      },
      ...prev.slice(0, 6),
    ]);
  };

  const handleSimulateCrowd = () => {
    const crowdedState: QueueState = {
      ...queueState,
      peopleInQueue: 15,
      priorityCount: 3,
      lastTicketCode: 'N-063',
      lastActionLabel: 'Alerta de pico: 15 cidadãos na fila — LED Vermelho acionado no Totem',
      priorityAlertActive: false,
    };
    setQueueState(crowdedState);
    playAccessibilityBeep(440, false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>COMPUTER ORGANIZATION & ARCHITECTURE (COA)</span>
            <span aria-hidden="true">·</span>
            <span>RASPBERRY PI PICO (RP2040 / WOKWI)</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-100">
            Totem IoT de Fila Virtual, Semáforo LED RGB e Acessibilidade Audiovisual
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setAudioEnabled((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {audioEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Buzzer Sonoro: Ativo</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-slate-400" />
                <span>Buzzer Sonoro: Mudo</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSimulateCrowd}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-xs font-medium text-rose-200 hover:bg-rose-950/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Radio className="h-3.5 w-3.5 text-rose-400" />
            <span>Simular Lotação (&gt;12)</span>
          </button>

          <button
            type="button"
            onClick={() => handleAction('RESET')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reiniciar Fila</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout: Left Totem Controls & Metrics (7 cols) + Right Wokwi Raspberry Pi Pico Hardware Panel (5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Big Counters + Action Buttons + RGB Status + Accessibility Banner */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary Counters Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
              <p className="text-xs font-semibold text-slate-400">Pessoas na Fila</p>
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="queue-count"
                  className="font-mono text-4xl sm:text-5xl font-extrabold text-slate-50 tabular-nums"
                >
                  {queueState.peopleInQueue}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({queueState.priorityCount} prioritários)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Capacidade nominal do salão: 20 lugares
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
              <p className="text-xs font-semibold text-slate-400">
                Tempo Estimado de Espera (min)
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="wait-minutes"
                  className="font-mono text-4xl sm:text-5xl font-extrabold text-cyan-400 tabular-nums"
                >
                  {metrics.estimatedWaitMinutes}
                </span>
                <span className="text-sm font-semibold text-cyan-300">min</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Média de 3,5 min/atendimento com triagem prévia
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
              <p className="text-xs font-semibold text-slate-400">Última Senha Chamada</p>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400 tabular-nums">
                  {queueState.lastTicketCode}
                </span>
                <span className="font-mono text-xs text-slate-400 tabular-nums">
                  Hoje: {queueState.servedToday}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Sincronizado com painel OLED SSD1306
              </p>
            </div>
          </div>

          {/* 3 Primary Interactive Buttons Required by Prompt */}
          <section
            aria-label="Controles de Simulação do Totem IoT"
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-100">
                Acionadores Físicos do Totem (Botões GPIO)
              </h3>
              <span className="font-mono text-xs text-slate-400 whitespace-nowrap shrink-0">
                Debounce via interrupção: 50ms
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleAction('ADD_CITIZEN')}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <PlusCircle className="h-4 w-4 shrink-0" />
                <span>+ Entrada Cidadão</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('SERVE_DESK')}
                className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/50 bg-cyan-950/40 px-4 py-3.5 text-sm font-bold text-cyan-200 hover:bg-cyan-900/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <MinusCircle className="h-4 w-4 shrink-0" />
                <span>- Saída Guichê</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('PRIORITY_CALL')}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/60 bg-amber-500/20 px-4 py-3.5 text-sm font-bold text-amber-200 hover:bg-amber-500/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Accessibility className="h-4 w-4 shrink-0" />
                <span>Chamada Prioritária</span>
              </button>
            </div>
          </section>

          {/* Visual RGB LED Status Indicator + Accessibility Alert */}
          <section
            aria-label="Indicador Visual de LED RGB e Acessibilidade"
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  INDICADOR VISUAL DE LED RGB (SEMÁFORO DE LOTAÇÃO)
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-100">
                  {metrics.ledLabel}
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {metrics.picoGpioPin}
              </span>
            </div>

            {/* 3-State RGB Visual Bar */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  metrics.ledState === 'VERDE'
                    ? 'border-emerald-500 bg-emerald-500/20 text-slate-100'
                    : 'border-slate-800 bg-slate-950/60 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span>LED VERDE (0–5)</span>
                  <span>{metrics.ledState === 'VERDE' ? 'ATIVO' : 'OFF'}</span>
                </div>
                <p className="mt-1 text-xs font-semibold">Verde: Fluxo Livre</p>
              </div>

              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  metrics.ledState === 'AMARELO'
                    ? 'border-amber-500 bg-amber-500/20 text-slate-100'
                    : 'border-slate-800 bg-slate-950/60 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span>LED AMARELO (6–12)</span>
                  <span>{metrics.ledState === 'AMARELO' ? 'ATIVO' : 'OFF'}</span>
                </div>
                <p className="mt-1 text-xs font-semibold">Amarelo: Atenção</p>
              </div>

              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  metrics.ledState === 'VERMELHO'
                    ? 'border-rose-500 bg-rose-500/20 text-slate-100'
                    : 'border-slate-800 bg-slate-950/60 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span>LED VERMELHO (&gt;12)</span>
                  <span>{metrics.ledState === 'VERMELHO' ? 'ATIVO' : 'OFF'}</span>
                </div>
                <p className="mt-1 text-xs font-semibold">Vermelho: Lotado</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">{metrics.ledDescription}</p>

            {/* Accessibility Visual / Audio Alert Box */}
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl border p-4 flex items-start gap-3 transition-colors ${
                queueState.priorityAlertActive
                  ? 'border-amber-400 bg-amber-500/20 text-amber-100'
                  : 'border-slate-800 bg-slate-950/80 text-slate-300'
              }`}
            >
              <BellRing
                className={`h-5 w-5 shrink-0 mt-0.5 ${
                  queueState.priorityAlertActive ? 'text-amber-300' : 'text-cyan-400'
                }`}
              />
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-100">
                  {queueState.priorityAlertActive
                    ? `ALERTA DE ACESSIBILIDADE ATIVO — CHAMADA PRIORITÁRIA ${queueState.lastTicketCode} (Buzzer PWM ${metrics.audioFrequencyHz} Hz + Flash Alto Contraste)`
                    : 'Módulo de Acessibilidade Multimodal Pronto (Auditivo + Visual Alto Contraste + Braille no Totem)'}
                </p>
                <p className="text-slate-300">{queueState.lastActionLabel}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Simulated Wokwi Raspberry Pi Pico Hardware & Event Telemetry */}
        <aside
          aria-label="Simulador de Hardware Raspberry Pi Pico Wokwi"
          className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <p className="text-xs font-semibold text-cyan-400">
                HARDWARE EMBARCADO · WOKWI SIMULATOR
              </p>
              <h3 className="mt-0.5 text-lg font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-emerald-400" />
                <span>Raspberry Pi Pico + OLED I2C</span>
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-400 tabular-nums">
              RP2040 @ 133MHz
            </span>
          </div>

          {/* Interactive Wokwi Hardware Board Visualization */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-4">
            {/* Simulated SSD1306 OLED Display (128x64) */}
            <div className="rounded-lg border-2 border-slate-700 bg-[#050b14] p-3.5 font-mono text-xs shadow-inner space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-cyan-400 border-b border-cyan-900/60 pb-1">
                <span>SSD1306 I2C (0x3C)</span>
                <span>CITIZEN ASSIST TOTEM</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <p className="text-[10px] text-slate-400">SENHA ATUAL:</p>
                  <p className="text-lg font-bold text-emerald-400 tabular-nums">
                    {queueState.lastTicketCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">FILA / ESPERA:</p>
                  <p className="text-sm font-bold text-cyan-300 tabular-nums">
                    {queueState.peopleInQueue} pess. / {metrics.estimatedWaitMinutes}m
                  </p>
                </div>
              </div>
              <div className="pt-1 text-[11px] text-amber-300 truncate">
                STATUS: {metrics.ledLabel.toUpperCase()}
              </div>
            </div>

            {/* Simulated Pico Board & RGB Dome */}
            <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-800/90 bg-slate-900/70 p-3.5">
              <div className="space-y-1 font-mono text-[11px] text-slate-300">
                <p className="font-bold text-emerald-400">Pinout Ativo RP2040:</p>
                <p>• GP4/GP5: Barramento I2C0 (Display OLED)</p>
                <p>• GP11/12/13: LED RGB Cátodo Comum</p>
                <p>• GP14/15/16: Botões Entrada / Saída / Prioridade</p>
                <p>• GP18: Buzzer Piezoelétrico PWM ({metrics.audioFrequencyHz}Hz)</p>
              </div>

              {/* Glowing RGB LED Hardware Dome */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div
                  className={`h-14 w-14 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                    metrics.ledState === 'VERDE'
                      ? 'border-emerald-300 bg-emerald-500 text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.65)]'
                      : metrics.ledState === 'AMARELO'
                      ? 'border-amber-200 bg-amber-400 text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.65)]'
                      : 'border-rose-200 bg-rose-500 text-white shadow-[0_0_24px_rgba(244,63,94,0.75)]'
                  }`}
                >
                  {metrics.ledState}
                </div>
                <span className="font-mono text-[10px] text-slate-400">LED RGB</span>
              </div>
            </div>
          </div>

          {/* Real-Time Serial Monitor Log */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Serial Monitor (UART0 · 115200 baud)
              </span>
              <span className="font-mono text-slate-400 tabular-nums">
                Ocupação: {metrics.occupancyPercent}%
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2 max-h-[190px] overflow-y-auto font-mono text-[11px]">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`border-b border-slate-900 pb-1.5 last:border-none last:pb-0 ${
                    log.isPriority ? 'text-amber-300' : 'text-slate-300'
                  }`}
                >
                  <span className="text-slate-500 tabular-nums">[{log.time}]</span>{' '}
                  <span className="font-bold text-emerald-400">[{log.ticket}]</span>{' '}
                  <span>{log.event}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
