import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';

export function TransitionPage({ completed, total, onContinue }: { completed: number; total: number; onContinue: () => void }) {
  return (
    <PageShell>
      <ProgressBar value={25 + (completed / total) * 55} label="Progresso das expressões" />
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50" aria-hidden="true">
          <span className="block h-3 w-3 rounded-full bg-brand-600 shadow-[20px_0_0_#1671c5,-20px_0_0_#1671c5]" />
        </div>
        <h1 className="mt-7 text-3xl font-extrabold text-ink">Aguarde um momento</h1>
        <p className="mt-3 text-lg font-semibold text-slate-700">Estamos preparando a próxima expressão do Roboldo.</p>
        <p className="mt-3 text-sm text-slate-500">Aguarde a orientação do pesquisador para continuar.</p>
        <PrimaryButton fullWidth className="mt-8" onClick={onContinue}>Continuar</PrimaryButton>
      </section>
    </PageShell>
  );
}
