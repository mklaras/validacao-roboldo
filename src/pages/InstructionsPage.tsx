import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';

export function InstructionsPage({ onContinue }: { onContinue: () => void }) {
  return <PageShell><ProgressBar value={25} /><section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-card sm:p-10"><p className="text-sm font-bold text-brand-600">Antes de começar</p><h1 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold leading-tight text-ink">Agora vamos conhecer as expressões do Roboldo</h1><div className="mx-auto mt-6 max-w-xl space-y-3 leading-relaxed text-slate-600"><p>O Roboldo apresentará 8 expressões, uma de cada vez.</p><p>Observe atentamente o rosto do robô e indique qual expressão você acredita que ele está demonstrando.</p></div><div className="mx-auto mt-7 max-w-lg rounded-2xl border-2 border-brand-100 bg-brand-50 px-5 py-5 text-xl font-extrabold text-brand-700">Observe o Roboldo antes de responder.</div><p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-500">Não se preocupe em acertar ou errar. Queremos saber como você interpreta cada expressão.</p><PrimaryButton fullWidth className="mt-8" onClick={onContinue}>Estou pronto</PrimaryButton></section></PageShell>;
}
