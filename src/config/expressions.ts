export const EXPRESSIONS = [
  'confuso',
  'raiva',
  'alegre',
  'distraido',
  'surpreso',
  'medo',
  'triste',
  'neutro',
] as const;

export type Expression = (typeof EXPRESSIONS)[number];

export const EXPRESSION_LABELS: Record<Expression, string> = {
  confuso: 'Confuso', raiva: 'Raiva', alegre: 'Alegre', distraido: 'Distraído',
  surpreso: 'Surpreso', medo: 'Medo', triste: 'Triste', neutro: 'Neutro',
};
