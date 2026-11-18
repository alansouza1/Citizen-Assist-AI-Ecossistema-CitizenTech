/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { OverviewTab, TabId } from './components/OverviewTab';
import { RagAssistantTab } from './components/RagAssistantTab';
import { BooleanEngineTab } from './components/BooleanEngineTab';
import { IotQueueTab } from './components/IotQueueTab';
import { SustainabilityMobilityTab } from './components/SustainabilityMobilityTab';

interface NavTabItem {
  id: TabId;
  label: string;
  pitchWindow: string;
  pitchCue: string;
}

const NAV_TABS: NavTabItem[] = [
  {
    id: 'overview',
    label: 'Visão Geral & Desafio',
    pitchWindow: '0:00 – 0:35',
    pitchCue:
      'Apresente o problema das filas evitáveis, o slogan "Da cidade ao campo" e os 6 pilares do Ecossistema CitizenTech.',
  },
  {
    id: 'rag',
    label: 'Assistente & RAG Verificável',
    pitchWindow: '0:35 – 1:20',
    pitchCue:
      'Clique nas 3 perguntas rápidas para demonstrar a citação da Lei 14.534/2023, o Guardrail LGPD e o bloqueio de Prompt Injection.',
  },
  {
    id: 'boolean',
    label: 'Motor de Decisão Lógica',
    pitchWindow: '1:20 – 1:55',
    pitchCue:
      'Alterne as chaves A, B, C e D para mostrar S = (A + B + C) · D em tempo real e a economia de 81,82% em portas lógicas (11 → 2).',
  },
  {
    id: 'iot',
    label: 'Fila Virtual IoT & Acessibilidade',
    pitchWindow: '1:55 – 2:30',
    pitchCue:
      'Acione "+ Entrada Cidadão" e "Chamada Prioritária" para demonstrar o Totem Raspberry Pi Pico (Wokwi), LED RGB e alerta acessível.',
  },
  {
    id: 'sustainability',
    label: 'Sustentabilidade & Mobilidade',
    pitchWindow: '2:30 – 3:00',
    pitchCue:
      'Mostre a economia anual em R$ e CO₂ na calculadora solar e a realocação de ônibus para conectar o campo e a periferia.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [pitchSecondsLeft, setPitchSecondsLeft] = useState<number>(180);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setPitchSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const togglePresentationMode = async () => {
    const nextState = !presentationMode;
    setPresentationMode(nextState);
    try {
      if (nextState && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (!nextState && document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // In iframe environments where requestFullscreen may be restricted, visual presentation mode still hides extra bars cleanly
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const activeTabMeta = NAV_TABS.find((t) => t.id === activeTab) || NAV_TABS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar Contract: 3 Zones (Brand Wordmark — 5 Navigation Tabs — 1 Primary Action Button) */}
      <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
            className="text-base sm:text-lg font-extrabold tracking-tight text-slate-50 whitespace-nowrap shrink-0"
          >
            Citizen Assist AI
          </a>

          {/* Zone 2: 5 Interactive Navigation Tabs */}
          <nav
            aria-label="Navegação Principal do Ecossistema CitizenTech"
            className="hidden xl:flex items-center gap-5 text-xs font-semibold"
          >
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Button ("Modo Apresentação (Tela Cheia)") */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={togglePresentationMode}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                presentationMode
                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {presentationMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Sair do Modo Apresentação</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Modo Apresentação (Tela Cheia)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Responsive Horizontal Tab Strip for smaller viewports (<1280px) */}
        <div className="xl:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 py-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Extra Pitch Teleprompter & Academic Context Bar — Hidden automatically in Presentation Mode */}
      {!presentationMode && (
        <div
          data-testid="pitch-helper-bar"
          className="border-b border-slate-800/80 bg-slate-900/70 px-4 py-2.5 sm:px-6"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-slate-300">
              <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                [ROTEIRO PITCH {activeTabMeta.pitchWindow}]
              </span>
              <span>{activeTabMeta.pitchCue}</span>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                Cronômetro 3 Min:{' '}
                <strong className="text-cyan-300">{formatTimer(pitchSecondsLeft)}</strong>
              </span>
              <button
                type="button"
                onClick={() => setTimerRunning((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-700 cursor-pointer whitespace-nowrap"
              >
                {timerRunning ? (
                  <>
                    <Pause className="h-3 w-3 text-amber-400" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 text-emerald-400" />
                    <span>Iniciar Pitch</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setPitchSecondsLeft(180);
                }}
                aria-label="Reiniciar cronômetro de 3 minutos"
                className="inline-flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {activeTab === 'overview' && <OverviewTab onSelectTab={setActiveTab} />}
        {activeTab === 'rag' && <RagAssistantTab />}
        {activeTab === 'boolean' && <BooleanEngineTab />}
        {activeTab === 'iot' && <IotQueueTab />}
        {activeTab === 'sustainability' && <SustainabilityMobilityTab />}
      </main>

      {/* Footer — Hidden in Presentation Mode so recording has zero distractions */}
      {!presentationMode && (
        <footer className="border-t border-slate-900 bg-slate-950 px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-200">
                Citizen Assist AI — Ecossistema CitizenTech
              </span>
              <span aria-hidden="true">·</span>
              <span>Global Solution 2026.2 — FIAP (1º Ano Ciência da Computação)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums text-slate-300">
              <span>Aluno: Alan Júnior Araújo de Souza</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">RM 574112</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
