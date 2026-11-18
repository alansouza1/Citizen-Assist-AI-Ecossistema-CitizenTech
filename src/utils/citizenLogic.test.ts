import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateAttendanceDecision,
  generateTruthTable,
  calculateQueueMetrics,
  applyQueueAction,
  calculateEnergySavings,
  calculateFleetMobility,
  resolveCustomRagQuery,
  RAG_PRESETS,
} from './citizenLogic';

test('Boolean Decision Engine: S = (A + B + C) . D evaluates accurately across key combinations', () => {
  // Blocked when D = false even if A, B, C are true
  const blockedNoDocs = evaluateAttendanceDecision({ A: true, B: true, C: true, D: false });
  assert.equal(blockedNoDocs.released, false);
  assert.equal(blockedNoDocs.expressionValue, 0);
  assert.equal(blockedNoDocs.statusTitle, 'ATENDIMENTO BLOQUEADO — REGULARIZAR REQUISITOS');

  // Blocked when D = true but A = B = C = false
  const blockedNoAccess = evaluateAttendanceDecision({ A: false, B: false, C: false, D: true });
  assert.equal(blockedNoAccess.released, false);
  assert.equal(blockedNoAccess.expressionValue, 0);

  // Released when at least one of A, B, C is true AND D is true
  const releasedPriority = evaluateAttendanceDecision({ A: false, B: false, C: true, D: true });
  assert.equal(releasedPriority.released, true);
  assert.equal(releasedPriority.expressionValue, 1);
  assert.equal(releasedPriority.statusTitle, 'ATENDIMENTO PRESENCIAL LIBERADO');
  assert.equal(releasedPriority.hardwareMetrics.reductionPercent, 81.82);
});

test('Truth table generates all 16 rows with 7 positive outputs and 9 zero outputs', () => {
  const table = generateTruthTable();
  assert.equal(table.length, 16);
  const ones = table.filter((r) => r.S === 1);
  // (A + B + C) has 7 truthy combinations out of 8, multiplied by D=1 gives 7 ones
  assert.equal(ones.length, 7);
});

test('IoT Queue transitions LED states and handles citizen entry, desk exit, and priority alerts', () => {
  let state = {
    peopleInQueue: 4,
    priorityCount: 1,
    servedToday: 142,
    lastTicketCode: 'N-048',
    lastActionLabel: 'Inicial',
    priorityAlertActive: false,
  };

  let metrics = calculateQueueMetrics(state);
  assert.equal(metrics.ledState, 'VERDE');

  state = applyQueueAction(state, 'PRIORITY_CALL');
  assert.equal(state.peopleInQueue, 5);
  assert.equal(state.priorityAlertActive, true);

  // Increase to 7 people -> AMARELO
  state = applyQueueAction(state, 'ADD_CITIZEN');
  state = applyQueueAction(state, 'ADD_CITIZEN');
  metrics = calculateQueueMetrics(state);
  assert.equal(metrics.ledState, 'AMARELO');

  // Serve desk reduces queue
  state = applyQueueAction(state, 'SERVE_DESK');
  assert.equal(state.peopleInQueue, 6);
  assert.equal(state.servedToday, 143);
});

test('Energy & Mobility calculator returns positive annual BRL savings and CO2 reduction', () => {
  const energy = calculateEnergySavings({
    monthlyKwh: 280,
    tariffBrl: 0.92,
    solarAdoptionPercent: 65,
    smartEfficiencyActive: true,
  });
  assert.ok(energy.annualSavingsBrl > 1000);
  assert.ok(energy.annualCo2AvoidedKg > 100);
  assert.ok(energy.savingsPercent > 50);

  const mobility = calculateFleetMobility(65);
  assert.equal(mobility.corridors.length, 3);
  assert.ok(mobility.avgTravelTimeAfterMin < mobility.avgTravelTimeBeforeMin);
});

test('RAG presets and custom query resolver return verifiable legal citations and LGPD guardrails', () => {
  assert.equal(RAG_PRESETS.cin_2via.consultationDate, '17/11/2026');
  assert.equal(RAG_PRESETS.cin_2via.confidencePercent, 98);
  assert.ok(RAG_PRESETS.cin_2via.sources[0].includes('14.534/2023'));

  const customOut = resolveCustomRagQuery('Como investir na bolsa de valores?');
  assert.equal(customOut.guardrailStatus, 'BLOQUEIO_ESCOPO_INJECTION');
});
