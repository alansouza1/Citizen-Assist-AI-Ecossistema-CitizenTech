import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Globe2,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

export type TabId = 'overview' | 'rag' | 'boolean' | 'iot' | 'sustainability';

interface OverviewTabProps {
  onSelectTab: (tab: TabId) => void;
}

interface PillarCard {
  number: string;
  category: string;
  title: string;
  summary: string;
  metrics: string;
  targetTab: TabId;
  targetLabel: string;
}

const PILLARS: PillarCard[] = [
  {
    number: '01',
    category: 'Problema Resolvido',
    title: 'Fim da Desinformação Burocrática, Filas Evitáveis e Desperdício Energético',
    summary:
      'Milhões de cidadãos perdem horas em filas presenciais por falta de um único documento obrigatório ou informação contraditória na internet, além de enfrentarem alto custo na conta de luz residencial.',
    metrics: 'Evita deslocamentos perdidos · Triagem prévia determinística · Diagnóstico energético',
    targetTab: 'rag',
    targetLabel: 'Testar Triagem no Assistente RAG',
  },
  {
    number: '02',
    category: 'Cidadão Beneficiado',
    title: 'Inclusão da Cidade ao Campo: Documentos (CIN/RG), Direitos, Transporte e Energia',
    summary:
      'Atende desde trabalhadores urbanos e idosos até famílias de zonas rurais em busca da 2ª via da Carteira de Identidade Nacional (CIN), benefícios no CRAS, linhas de ônibus otimizadas e tarifa social/solar.',
    metrics: 'Foco em grupos prioritários (Lei 10.048/2000) · Linguagem acessível · Zero barreira técnica',
    targetTab: 'boolean',
    targetLabel: 'Simular Elegibilidade Cidadã',
  },
  {
    number: '03',
    category: 'Ecossistema Integrado',
    title: 'Cidadão + Postos Públicos (Poupatempo/CRAS) + Plataforma Digital + Totem IoT',
    summary:
      'Arquitetura omnicanal que conecta o pré-atendimento pelo celular/web ao Totem físico equipado com Raspberry Pi Pico na recepção do posto público, sincronizando senhas e alertas de acessibilidade.',
    metrics: 'Integração Web + Hardware IoT (Wokwi) · Atendimento híbrido urbano e rural',
    targetTab: 'iot',
    targetLabel: 'Abrir Painel do Totem IoT',
  },
  {
    number: '04',
    category: 'Resultados Esperados',
    title: 'Redução de até 65% em Deslocamentos Desnecessários e Privacidade LGPD Nativa',
    summary:
      'Com validação documental prévia e respostas ancoradas em leis oficiais, o cidadão só vai ao posto quando realmente necessário e com 100% dos requisitos prontos, sem coleta de dados sensíveis no chat.',
    metrics: '-65% viagens evitáveis · 98% precisão normativa · Guardrail LGPD Art. 6º ativo',
    targetTab: 'rag',
    targetLabel: 'Auditar Guardrails LGPD',
  },
  {
    number: '05',
    category: 'Engenharia de Computação',
    title: 'Motor RAG Verificável (Python OO + C O(log n)) e Lógica Booleana Otimizada',
    summary:
      'Combina busca vetorial ChromaDB, orquestração orientada a objetos em Python, indexação em árvore AVL escrita em C e circuito lógico simplificado via Mapa de Karnaugh (de 11 para 2 portas lógicas).',
    metrics: 'Busca O(log n) < 0.2ms · 81,82% de economia de portas lógicas · Zero alucinação',
    targetTab: 'boolean',
    targetLabel: 'Inspecionar Mapa de Karnaugh',
  },
  {
    number: '06',
    category: 'Sustentabilidade & Mobilidade',
    title: 'Eficiência Energética Residencial, Geração Solar e Redistribuição de Frota',
    summary:
      'Simula o impacto financeiro (R$/ano) e ambiental (kg de CO₂ evitados) da transição para eficiência + energia solar distribuída e realoca ônibus das linhas centrais desafogadas para zonas rurais e periféricas.',
    metrics: 'Economia anual em R$ · Redução de CO₂ mensurável · Menor espera no transporte público',
    targetTab: 'sustainability',
    targetLabel: 'Abrir Calculadora Sustentável',
  },
];

export const OverviewTab: React.FC<OverviewTabProps> = ({ onSelectTab }) => {
  const [journeyProfile, setJourneyProfile] = useState<'urbano' | 'rural'>('rural');

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-emerald-400">
              <span>GLOBAL SOLUTION 2026.2</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>FIAP — 1º ANO CIÊNCIA DA COMPUTAÇÃO</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-300">ECOSSISTEMA CITIZENTECH</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-50 leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Da cidade ao campo,{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                tecnologia para a vida cotidiana.
              </span>
            </h1>

            <p className="max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              O <strong className="font-semibold text-white">Citizen Assist AI</strong> integra inteligência artificial verificável (RAG), circuitos de decisão lógica otimizados, hardware IoT acessível em Raspberry Pi Pico e modelagem de eficiência energética para eliminar filas evitáveis e ampliar a cidadania.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectTab('rag')}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>Testar Assistente RAG Ao Vivo</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('boolean')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-100 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>Motor Booleano S = (A+B+C)·D</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('iot')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-100 hover:border-emerald-500/50 hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>Totem IoT (Raspberry Pi Pico)</span>
              </button>
            </div>
          </div>

          {/* Academic & Executive Summary Card */}
          <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-950/85 p-5 space-y-4">
            <div className="border-b border-slate-800/80 pb-3">
              <p className="text-xs font-medium text-slate-400">Identificação Acadêmica · Pitch 3 Min</p>
              <h2 className="mt-1 text-base font-bold text-slate-100">
                Alan Júnior Araújo de Souza
              </h2>
              <p className="mt-0.5 font-mono text-xs text-emerald-400 tabular-nums">
                RM 574112 · 1º Ano Ciência da Computação (FIAP)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
                <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">-65%</p>
                <p className="mt-0.5 text-xs text-slate-400">Deslocamentos presenciais evitáveis</p>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
                <p className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">81,82%</p>
                <p className="mt-0.5 text-xs text-slate-400">Economia de portas lógicas (11 → 2)</p>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
                <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">O(log n)</p>
                <p className="mt-0.5 text-xs text-slate-400">Indexação normativa em C (Árvore AVL)</p>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
                <p className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">100%</p>
                <p className="mt-0.5 text-xs text-slate-400">Conformidade LGPD (Zero coleta sensível)</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
              <span>Data de referência da base:</span>
              <span className="font-mono text-slate-200 tabular-nums">17/11/2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Challenge Pillars Section */}
      <section aria-labelledby="pillars-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-emerald-400">
              ESTRUTURA DO DESAFIO CITIZENTECH
            </p>
            <h2 id="pillars-heading" className="mt-1 text-2xl font-bold text-slate-100">
              Os 6 Pilares do Ecossistema Citizen Assist AI
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Clique em qualquer pilar para abrir imediatamente o simulador técnico correspondente durante a apresentação.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.number}
              className="group flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/50 p-6 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                    {pillar.number}. {pillar.category}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">GS 2026.2</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                <p className="text-xs text-cyan-300/90 font-medium">
                  {pillar.metrics}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectTab(pillar.targetTab)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{pillar.targetLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Citizen Journey Comparison (Da Cidade ao Campo) */}
      <section
        aria-labelledby="journey-heading"
        className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <p className="text-xs font-semibold tracking-wider text-cyan-400">
              JORNADA DO CIDADÃO FIM A FIM
            </p>
            <h2 id="journey-heading" className="mt-1 text-xl sm:text-2xl font-bold text-slate-100">
              Como o Ecossistema Conecta o Campo e a Cidade na Prática
            </h2>
          </div>

          {/* Interactive Segment Control */}
          <div
            role="group"
            aria-label="Selecionar perfil de jornada do cidadão"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1 self-start"
          >
            <button
              type="button"
              onClick={() => setJourneyProfile('rural')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                journeyProfile === 'rural'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Jornada Cidadão Rural (Distrito Agrícola)
            </button>
            <button
              type="button"
              onClick={() => setJourneyProfile('urbano')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                journeyProfile === 'urbano'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Jornada Cidadão Urbano (Periferia / Centro)
            </button>
          </div>
        </div>

        {journeyProfile === 'rural' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span>ETAPA 01 · NO CAMPO</span>
                <Globe2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Consulta Leve via RAG</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Morador de zona rural consulta no celular os requisitos da 2ª via da CIN e tarifa social sem gastar franquia de dados com portais pesados.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span>ETAPA 02 · VALIDAÇÃO</span>
                <FileCheck2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Filtro Booleano Preventivo</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                O motor lógico S = (A+B+C)·D alerta antes da viagem de 35 km caso falte a Certidão original (D=0), evitando uma viagem rural perdida.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>ETAPA 03 · MOBILIDADE</span>
                <Users className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Ônibus Rural Sincronizado</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Com menos filas inúteis no centro, a Linha 402 (Conexão Rural → CRAS) recebe +3 ônibus realocados, reduzindo a espera de 58 para 35 min.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>ETAPA 04 · TOTEM & ENERGIA</span>
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Atendimento Ágil + Solar</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No posto, o Totem Raspberry Pi Pico valida a prioridade em segundos e orienta sobre geração solar distribuída para a propriedade familiar.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>ETAPA 01 · NA CIDADE</span>
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Triagem com Guardrail LGPD</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trabalhador urbano ou idoso tira dúvidas sobre prioridade legal (Lei 10.048/2000) e B.O. de furto sem fornecer CPF ou laudos médicos no chat.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>ETAPA 02 · DECISÃO LÓGICA</span>
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Liberação Instantânea</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mesmo sem agendamento prévio (A=0), o motor libera o atendimento presencial se houver B.O. (B=1) ou prioridade legal (C=1) + documentos (D=1).
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span>ETAPA 03 · TOTEM IOT PICO</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Semáforo LED RGB & Áudio</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ao chegar no Poupatempo, o totem Raspberry Pi Pico exibe a lotação em tempo real via LED RGB e aciona chamada prioritária sonora/visual.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span>ETAPA 04 · EFICIÊNCIA</span>
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Economia na Conta de Luz</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enquanto aguarda, simula no painel a redução de até 70% na fatura mensal de energia combinando automação de standby e assinatura solar.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
