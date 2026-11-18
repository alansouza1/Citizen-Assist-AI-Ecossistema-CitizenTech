import React, { useState } from 'react';
import {
  Bus,
  Leaf,
  Sun,
  TrendingDown,
  Trees,
  Zap,
} from 'lucide-react';
import {
  calculateEnergySavings,
  calculateFleetMobility,
} from '../utils/citizenLogic';

export const SustainabilityMobilityTab: React.FC = () => {
  const [monthlyKwh, setMonthlyKwh] = useState<number>(260);
  const [tariffBrl, setTariffBrl] = useState<number>(0.92);
  const [solarAdoptionPercent, setSolarAdoptionPercent] = useState<number>(65);
  const [smartEfficiencyActive, setSmartEfficiencyActive] = useState<boolean>(true);
  const [triageReductionPercent, setTriageReductionPercent] = useState<number>(65);

  const energy = calculateEnergySavings({
    monthlyKwh,
    tariffBrl,
    solarAdoptionPercent,
    smartEfficiencyActive,
  });

  const mobility = calculateFleetMobility(triageReductionPercent);

  const applyHouseholdPreset = (kwh: number, solar: number, efficiency: boolean) => {
    setMonthlyKwh(kwh);
    setSolarAdoptionPercent(solar);
    setSmartEfficiencyActive(efficiency);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>TRANSIÇÃO ENERGÉTICA & MODELAGEM DE MOBILIDADE</span>
            <span aria-hidden="true">·</span>
            <span>IMPACTO ECONÔMICO E DESCARBONIZAÇÃO</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-100">
            Simulador de Eficiência Energética Residencial & Frota Inteligente
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyHouseholdPreset(160, 55, true)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Perfil 1: Urbano Compacto (160 kWh)
          </button>
          <button
            type="button"
            onClick={() => applyHouseholdPreset(260, 65, true)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Perfil 2: Residência Familiar (260 kWh)
          </button>
          <button
            type="button"
            onClick={() => applyHouseholdPreset(420, 75, true)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Perfil 3: Propriedade Rural (420 kWh)
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Left Energy Calculator (7 cols) + Right Bus Fleet Redistribution (5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Residential Energy Calculator */}
        <section
          aria-label="Calculadora Interativa de Consumo Energético Residencial"
          className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <p className="text-xs font-semibold text-emerald-400">
                CALCULADORA CIDADÃ DE ENERGIA
              </p>
              <h3 className="mt-0.5 text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sun className="h-5 w-5 text-amber-400" />
                <span>Convencional vs. Eficiência + Energia Solar Distribuída</span>
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-400 tabular-nums">
              -{energy.savingsPercent}% na Fatura
            </span>
          </div>

          {/* Sliders & Controls */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Monthly kWh Slider */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="kwh-slider" className="font-semibold text-slate-200">
                  Consumo Mensal Residencial:
                </label>
                <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                  {monthlyKwh} kWh/mês
                </span>
              </div>
              <input
                id="kwh-slider"
                type="range"
                min={60}
                max={650}
                step={10}
                value={monthlyKwh}
                onChange={(e) => setMonthlyKwh(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500 tabular-nums">
                <span>60 kWh</span>
                <span>350 kWh</span>
                <span>650 kWh</span>
              </div>
            </div>

            {/* Solar Adoption Slider */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="solar-slider" className="font-semibold text-slate-200">
                  Cobertura Solar Distribuída:
                </label>
                <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                  {solarAdoptionPercent}%
                </span>
              </div>
              <input
                id="solar-slider"
                type="range"
                min={20}
                max={85}
                step={5}
                value={solarAdoptionPercent}
                onChange={(e) => setSolarAdoptionPercent(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500 tabular-nums">
                <span>20%</span>
                <span>55%</span>
                <span>85% (Geração Compartilhada)</span>
              </div>
            </div>

            {/* Tariff Input */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="tariff-slider" className="font-semibold text-slate-200">
                  Tarifa Média com Impostos:
                </label>
                <span className="font-mono text-sm font-bold text-cyan-400 tabular-nums">
                  R$ {tariffBrl.toFixed(2)} / kWh
                </span>
              </div>
              <input
                id="tariff-slider"
                type="range"
                min={0.65}
                max={1.35}
                step={0.05}
                value={tariffBrl}
                onChange={(e) => setTariffBrl(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500 tabular-nums">
                <span>R$ 0,65</span>
                <span>R$ 0,92</span>
                <span>R$ 1,35</span>
              </div>
            </div>

            {/* Smart Efficiency Toggle */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Eficiência Energética Doméstica
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Substituição LED + Corte de Standby IoT (-18% kWh)
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={smartEfficiencyActive}
                  onClick={() => setSmartEfficiencyActive((prev) => !prev)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                    smartEfficiencyActive
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {smartEfficiencyActive ? 'ATIVO (-18%)' : 'INATIVO'}
                </button>
              </div>
              <p className="text-[11px] text-emerald-400/90 mt-2">
                Consumo líquido cobrado na rede: <strong className="font-mono">{energy.optimizedMonthlyKwh} kWh/mês</strong>
              </p>
            </div>
          </div>

          {/* Primary KPI Output Cards (Economia Anual R$ & Redução de CO2) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/25 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <span className="font-semibold">Economia Anual Estimada</span>
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <p
                data-testid="annual-savings-brl"
                className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums"
              >
                R$ {energy.annualSavingsBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-slate-300">
                Redução de {energy.savingsPercent}% no orçamento familiar anual
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/25 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-cyan-300">
                <span className="font-semibold">Emissões de CO₂ Evitadas</span>
                <Leaf className="h-4 w-4 text-cyan-400" />
              </div>
              <p
                data-testid="annual-co2-avoided"
                className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400 tabular-nums"
              >
                {energy.annualCo2AvoidedKg.toLocaleString('pt-BR')} kg
              </p>
              <p className="text-[11px] text-slate-300">
                kg de CO₂/ano não emitidos por despacho térmico
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold">Compensação Florestal</span>
                <Trees className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-100 tabular-nums">
                +{energy.equivalentTreesPlanted} árv.
              </p>
              <p className="text-[11px] text-slate-400">
                Equivalente em árvores adultas absorvendo carbono/ano
              </p>
            </div>
          </div>

          {/* Visual Bar Comparison: Cenário Convencional vs. Eficiência + Solar */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-300">
              Comparativo Direto de Custo Anual (12 Meses):
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  1. Cenário Convencional (Sem Eficiência / Sem Solar)
                </span>
                <span className="font-mono font-bold text-rose-400 tabular-nums">
                  R$ {energy.conventionalAnnualBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / ano (R$ {energy.conventionalMonthlyBrl.toFixed(2)}/mês)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full w-full rounded-full bg-rose-500/80" />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-medium">
                  2. Cenário CitizenTech (Eficiência Doméstica + Solar Distribuída)
                </span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums">
                  R$ {energy.optimizedAnnualBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / ano (R$ {energy.optimizedMonthlyBrl.toFixed(2)}/mês)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-200"
                  style={{
                    width: `${Math.max(8, 100 - energy.savingsPercent)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Urban & Rural Bus Fleet Intelligent Redistribution */}
        <aside
          aria-label="Modelagem de Redistribuição Inteligente da Frota de Ônibus"
          className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 space-y-5"
        >
          <div className="border-b border-slate-800 pb-4">
            <p className="text-xs font-semibold text-cyan-400">
              MODELAGEM DE MOBILIDADE URBANA E RURAL
            </p>
            <h3 className="mt-0.5 text-lg font-bold text-slate-100 flex items-center gap-2">
              <Bus className="h-5 w-5 text-cyan-400" />
              <span>Redistribuição Inteligente da Frota de Ônibus</span>
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Com a redução de deslocamentos presenciais inúteis via triagem digital, os ônibus ociosos do eixo central são realocados para atender zonas rurais e periféricas.
            </p>
          </div>

          {/* Triage Impact Slider */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="triage-slider" className="font-semibold text-slate-200">
                Taxa de Triagem Digital Preventiva (RAG + Boole):
              </label>
              <span className="font-mono text-sm font-bold text-cyan-400 tabular-nums">
                -{triageReductionPercent}% viagens perdidas
              </span>
            </div>
            <input
              id="triage-slider"
              type="range"
              min={30}
              max={75}
              step={5}
              value={triageReductionPercent}
              onChange={(e) => setTriageReductionPercent(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Fleet Mobility KPI Strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
              <p className="text-xs text-slate-400">Tempo Médio de Deslocamento</p>
              <div className="mt-1 flex items-baseline gap-2 font-mono tabular-nums">
                <span className="text-sm line-through text-slate-500">
                  {mobility.avgTravelTimeBeforeMin}m
                </span>
                <span className="text-2xl font-extrabold text-cyan-400">
                  {mobility.avgTravelTimeAfterMin} min
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                <span>-{mobility.travelTimeReductionPercent}% tempo até o Poupatempo/CRAS</span>
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
              <p className="text-xs text-slate-400">Deslocamentos Evitados/Dia</p>
              <p className="mt-1 font-mono text-2xl font-extrabold text-emerald-400 tabular-nums">
                {mobility.avoidedDailyTrips.toLocaleString('pt-BR')}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Cidadãos atendidos remotamente ou sem fila perdida
              </p>
            </div>
          </div>

          {/* Corridors Breakdown */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-300">
              Impacto por Corredor de Transporte (Antes vs. Depois da Realocação):
            </p>

            {mobility.corridors.map((corridor) => (
              <div
                key={corridor.id}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                      {corridor.zoneType}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100">
                      {corridor.corridorName}
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 font-bold tabular-nums shrink-0">
                    {corridor.beforeWaitMin}m → {corridor.afterWaitMin}m
                  </span>
                </div>

                {/* Progress Bar of Wait Time Reduction */}
                <div className="space-y-1">
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-200"
                      style={{
                        width: `${Math.round(
                          (corridor.afterWaitMin / corridor.beforeWaitMin) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 tabular-nums">
                    <span>
                      Frota: {corridor.busesAllocatedBefore} → {corridor.busesAllocatedAfter} veículos
                    </span>
                    <span>
                      {corridor.dailyCitizensImpacted.toLocaleString('pt-BR')} passageiros/dia
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
