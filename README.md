# Citizen Assist AI — Ecossistema CitizenTech

> **Da cidade ao campo, tecnologia para a vida cotidiana.**

Aplicação web interativa em Português (Brasil) desenvolvida como demonstração visual para o Pitch de 3 minutos da **Global Solution 2026.2 (FIAP — 1º Ano de Ciência da Computação)**.

- **Aluno:** Alan Júnior Araújo de Souza
- **RM:** 574112
- **Curso:** Ciência da Computação — 1º Ano (FIAP)
- **Evento:** Global Solution 2026.2

---

## Visão Geral do Projeto

O **Citizen Assist AI** integra inteligência artificial verificável (RAG), lógica booleana otimizada, hardware IoT acessível em Raspberry Pi Pico e modelagem de eficiência energética e mobilidade urbana/rural para combater três dores cotidianas do cidadão:

1. **Desinformação burocrática e filas presenciais evitáveis** em postos de atendimento público (Poupatempo / CRAS).
2. **Exclusão de cidadãos urbanos e rurais** por barreiras de linguagem, acessibilidade e deslocamento.
3. **Desperdício energético doméstico** e ineficiência na alocação de transporte público.

A aplicação funciona **100% no frontend**, com simulações determinísticas e zero dependência de chaves de API externas — garantindo estabilidade total durante apresentações ao vivo.

---

## Funcionalidades e Estrutura das 5 Abas

O cabeçalho fixo oferece navegação entre os 5 módulos do ecossistema, além do botão **Modo Apresentação (Tela Cheia)** e um **roteiro com cronômetro regressivo de 3 minutos** (ocultados automaticamente no modo apresentação):

### 1. Visão Geral & Desafio (`src/components/OverviewTab.tsx`)
- **Hero Section** com o slogan *"Da cidade ao campo, tecnologia para a vida cotidiana"* e atalhos diretos para os simuladores.
- **6 Pilares do Desafio CitizenTech**: Problema Resolvido, Cidadão Beneficiado, Ecossistema Integrado, Resultados Esperados, Engenharia de Computação e Sustentabilidade & Mobilidade.
- **Jornada do Cidadão Fim a Fim**: comparador interativo entre **Cidadão Rural (Distrito Agrícola)** e **Cidadão Urbano (Periferia / Centro)**.

### 2. Assistente & RAG Verificável (`src/components/RagAssistantTab.tsx`)
- Simulador de chat com **3 cenários pré-configurados** para demonstração ao vivo (além de campo para consulta personalizada):
  1. **2ª via da CIN**: cita a **Lei Federal nº 14.534/2023** e o **Decreto Federal nº 10.977/2022**, data de consulta (`17/11/2026`), nível de confiança (`98%`) e aviso legal de que não substitui canais oficiais.
  2. **Atendimento Prioritário**: cita a **Lei nº 10.048/2000**, **Lei nº 13.146/2015** e **Lei nº 14.626/2023** com **Guardrail LGPD Ativo** (*nenhum dado pessoal sensível ou laudo médico coletado*).
  3. **Fora de Escopo / Prompt Injection**: demonstra abstenção segura (*"Não sei / Fora do escopo verificável"*) e bloqueio contra tentativas de burlar requisitos legais.
- **Painel de Telemetria Técnica** detalhando as 3 camadas:
  - Motor RAG (**LangChain + ChromaDB**)
  - Cérebro Orientado a Objetos em **Python**
  - Base Indexada em **C** com Árvore AVL $O(\log n)$

### 3. Motor de Decisão Lógica (`src/components/BooleanEngineTab.tsx`)
- Simulador interativo com **4 chaves lógicas**:
  - `A`: Agendamento Prévio
  - `B`: Roubo/Furto com B.O.
  - `C`: Grupo Prioritário Legal
  - `D`: Documentação Básica Completa
- Avaliação em tempo real da expressão booleana simplificada:
  $$S = (A + B + C) \cdot D$$
- Exibição dinâmica de status (**ATENDIMENTO PRESENCIAL LIBERADO** ou **ATENDIMENTO BLOQUEADO — REGULARIZAR REQUISITOS**) com orientação ao cidadão.
- Diagrama esquemático SVG em tempo real das **2 portas lógicas** (`OR` + `AND`), **Tabela-Verdade clicável de 16 linhas** e card comparativo da otimização via **Mapa de Karnaugh e Teorema de De Morgan** (**redução de 11 para 2 portas lógicas — economia de 81,82% de hardware**).

### 4. Fila Virtual IoT & Acessibilidade (`src/components/IotQueueTab.tsx`)
- Dashboard simulando o Totem físico com **Raspberry Pi Pico (RP2040 / Wokwi)** e display **OLED SSD1306 I2C**:
  - Contadores de **Pessoas na Fila**, **Tempo Estimado de Espera (min)** e **Última Senha Chamada**.
  - Acionadores físicos GPIO: **+ Entrada Cidadão**, **- Saída Guichê**, **Chamada Prioritária**, **Simular Lotação (>12)** e **Reiniciar Fila**.
  - **Semáforo LED RGB**: Verde (*Fluxo Livre*, 0–5), Amarelo (*Atenção*, 6–12) e Vermelho (*Lotado*, >12).
  - **Alerta Multimodal de Acessibilidade** com síntese sonora via Web Audio API (Buzzer PWM simulado) e destaque visual de alto contraste.

### 5. Sustentabilidade & Mobilidade (`src/components/SustainabilityMobilityTab.tsx`)
- **Calculadora Interativa de Consumo Energético Residencial** (`kWh/mês`, tarifa média em R$/kWh, cobertura solar distribuída e toggle de eficiência doméstica de -18%) comparando cenário convencional vs. eficiência + energia solar, exibindo **economia anual em R$**, **redução de CO₂ (kg/ano)** e equivalente em árvores plantadas.
- **Modelagem de Mobilidade Urbana e Rural**: simula a **redistribuição inteligente da frota de ônibus** a partir da redução de deslocamentos presenciais evitáveis, exibindo o impacto nos corredores rurais, periféricos e centrais.

---

## Roteiro Sugerido para o Pitch de 3 Minutos

| Tempo | Aba | Foco da Demonstração |
| :--- | :--- | :--- |
| `0:00 – 0:35` | **Visão Geral & Desafio** | Problema das filas evitáveis, slogan *"Da cidade ao campo"* e os 6 pilares do ecossistema. |
| `0:35 – 1:20` | **Assistente & RAG Verificável** | Clique nos 3 cenários para mostrar citação legal, Guardrail LGPD e proteção contra Prompt Injection. |
| `1:20 – 1:55` | **Motor de Decisão Lógica** | Alternância das chaves `A`, `B`, `C` e `D`, expressão $S = (A+B+C)\cdot D$ e economia de 81,82% (11 → 2 portas). |
| `1:55 – 2:30` | **Fila Virtual IoT & Acessibilidade** | Acionamento de entrada/saída e *Chamada Prioritária* com LED RGB, OLED e alerta acessível. |
| `2:30 – 3:00` | **Sustentabilidade & Mobilidade** | Economia anual em R$ e CO₂ na calculadora solar e realocação da frota para zonas rurais e periféricas. |

---

## Stack Tecnológica

- **Frontend:** React 19, TypeScript, Vite 8
- **Estilização:** Tailwind CSS v4 (`@tailwindcss/vite`), tipografia *Plus Jakarta Sans* e *JetBrains Mono* (`tabular-nums`)
- **Ícones:** Lucide React
- **Testes Unitários:** Runner nativo do Node.js (`node:test` + `node:assert/strict`) executado via `tsx`

---

## Estrutura de Pastas

```text
.
├── index.html                                  # Entry point HTML, meta tags e Google Fonts
├── metadata.json                               # Metadados da aplicação
├── package.json                                # Scripts e dependências
├── vite.config.ts                              # Configuração do Vite + Tailwind CSS v4
└── src/
    ├── App.tsx                                 # Navegação superior, Modo Apresentação e cronômetro do Pitch
    ├── index.css                               # Configuração global Tailwind CSS e variáveis de fonte
    ├── main.tsx                                # Bootstrap React
    ├── components/
    │   ├── OverviewTab.tsx                     # Aba 1: Visão Geral & Desafio
    │   ├── RagAssistantTab.tsx                 # Aba 2: Assistente & RAG Verificável
    │   ├── BooleanEngineTab.tsx                # Aba 3: Motor de Decisão Lógica
    │   ├── IotQueueTab.tsx                     # Aba 4: Fila Virtual IoT & Acessibilidade
    │   └── SustainabilityMobilityTab.tsx       # Aba 5: Sustentabilidade & Mobilidade
    └── utils/
        ├── citizenLogic.ts                     # Lógica pura (Álgebra Booleana, Fila IoT, Energia/Frota e RAG)
        └── citizenLogic.test.ts                # Testes unitários da lógica de domínio
```

---

## Como Executar Localmente

### Pré-requisitos
- **Node.js** (v20 ou superior recomendado)
- **npm**

### Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento (porta 3000)
npm run dev
```

Acesse `http://localhost:3000` no navegador.

### Scripts Disponíveis

```bash
# Verificação de tipos TypeScript
npm run lint

# Build de produção
npm run build

# Visualizar build de produção localmente
npm run preview

# Executar testes unitários da lógica de domínio
npx tsx --test src/utils/citizenLogic.test.ts
```
