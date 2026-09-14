import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';

export function SubmissionStatusPage({ error, onRetry }: { error?: boolean; onRetry: () => void }) {
  return <PageShell><section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card sm:p-12">{error ? <><h1 className="text-3xl font-extrabold text-ink">Não foi possível registrar as respostas.</h1><p className="mt-3 text-lg text-slate-600">Por favor, chame um dos pesquisadores.</p><PrimaryButton className="mt-8" onClick={onRetry}>Tentar novamente</PrimaryButton></> : <div role="status"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" /><h1 className="mt-7 text-2xl font-extrabold text-ink">Registrando suas respostas...</h1><p className="mt-2 text-slate-500">Aguarde só um instante.</p></div>}</section></PageShell>;
}
