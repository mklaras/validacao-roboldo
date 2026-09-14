import { useState } from 'react';
import { EXPRESSION_LABELS, EXPRESSIONS, type Expression } from '../config/expressions';
import { ExpressionOption } from '../components/ExpressionOption';
import { LikertScale } from '../components/LikertScale';
import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';

export function ExpressionPage({ index, onContinue }: { index: number; onContinue: (expression: Expression, ease: number) => void }) {
  const [selected, setSelected] = useState<Expression>(); const [ease, setEase] = useState<number>();
  const number = index + 1; const isLast = number === EXPRESSIONS.length;
  return <PageShell width="max-w-5xl"><ProgressBar value={25 + (number / EXPRESSIONS.length) * 55} label="Progresso das expressões" /><div className="mb-4 mt-5 flex items-end justify-between"><div><p className="text-sm font-bold text-brand-600">Avaliação</p><h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Expressão {number} de {EXPRESSIONS.length}</h1></div></div><section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-7"><div className="text-center"><h2 className="text-2xl font-extrabold text-ink">Observe o Roboldo</h2><p className="mt-1 text-sm text-slate-600 sm:text-base">Observe a expressão apresentada pelo robô antes de responder.</p></div><fieldset className="mt-5"><legend className="w-full text-center text-base font-bold text-ink sm:text-lg">Qual expressão você acredita que o robô está demonstrando?</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{EXPRESSIONS.map((expression) => <ExpressionOption key={expression} name="expression" value={expression} label={EXPRESSION_LABELS[expression]} checked={selected === expression} onChange={(value) => setSelected(value as Expression)} />)}</div></fieldset><fieldset className="mx-auto mt-6 max-w-3xl border-t border-slate-200 pt-5"><legend className="w-full pt-4 text-center text-base font-bold text-ink sm:text-lg">Quão fácil foi identificar essa expressão?</legend><div className="mt-3"><LikertScale name="ease" value={ease} onChange={setEase} lowLabel="Muito difícil" middleLabel="Nem difícil nem fácil" highLabel="Muito fácil" /></div></fieldset><PrimaryButton fullWidth className="mt-6" disabled={!selected || !ease} onClick={() => selected && ease && onContinue(selected, ease)}>{isLast ? 'Finalizar esta etapa' : 'Próxima expressão'}</PrimaryButton></section></PageShell>;
}
