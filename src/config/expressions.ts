export const EXPRESSION_OPTIONS = [
  'confuso',
  'raiva',
  'alegre',
  'surpreso',
  'medo',
  'triste',
  'neutro',
] as const;

//mudar isso aqui. Adicionar um botão para escolhermos os cenários manualmente. Retirar esse

export type Expression = (typeof EXPRESSION_OPTIONS)[number];
export type ScenarioId = 'cenario1' | 'cenario2';

export const SCENARIO_1: readonly Expression[] = [...EXPRESSION_OPTIONS];
export const SCENARIO_2: readonly Expression[] = [...SCENARIO_1].reverse();

export const SCENARIOS: Record<ScenarioId, readonly Expression[]> = {
  cenario1: SCENARIO_1,
  cenario2: SCENARIO_2,
};

export const EXPRESSION_LABELS: Record<Expression, string> = {
  confuso: 'Confuso',
  raiva: 'Raiva',
  alegre: 'Alegre',
  surpreso: 'Surpreso',
  triste: 'Triste',
  medo: 'Medo',
  neutro: 'Neutro',
};

export function selectRandomScenario(): ScenarioId {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  return randomValue[0] % 2 === 0 ? 'cenario1' : 'cenario2';
}
