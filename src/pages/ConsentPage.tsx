import { useState } from 'react';
import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';

export function ConsentPage({ onContinue }: { onContinue: () => void }) {
  const [accepted, setAccepted] = useState(false);
  return (
    <PageShell>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-9">
        <p className="mb-2 text-sm font-bold text-brand-600">Bem-vindo ao nosso estudo</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Olá, participante!</h1>
        <p className="mt-5 leading-relaxed text-slate-600">Você está prestes a iniciar um estudo que busca responder à seguinte pergunta:</p>
        <blockquote className="mt-3 rounded-xl border-l-4 border-brand-500 bg-brand-50 px-5 py-4 font-semibold leading-relaxed text-ink">“As expressões faciais desenvolvidas para o robô social Roboldo são corretamente reconhecidas por usuários humanos?”</blockquote>
        <p className="mt-5 leading-relaxed text-slate-600">Somos integrantes do <strong className="text-ink">Laboratório de Aprendizado em Robótica (LAR) da Universidade do Estado do Rio Grande do Norte (UERN).</strong></p>
        <div className="mt-7 grid gap-5 border-y border-slate-200 py-6 sm:grid-cols-2">
          <Info title="Dinâmica da interação">Você irá observar diferentes expressões apresentadas por um robô social e responder algumas perguntas com base no que percebeu.</Info>
          <Info title="Duração">Esta é uma atividade rápida e sua participação deverá levar aproximadamente 3 a 5 minutos.</Info>
          <Info title="Confidencialidade">Os questionários são anônimos e confidenciais. Os resultados poderão ser usados em trabalhos científicos sem identificar participantes.</Info>
          <Info title="Voluntariedade">Sua participação é voluntária e você pode desistir a qualquer momento.</Info>
        </div>
        <div className="mt-6 text-sm leading-relaxed text-slate-600">
          <h2 className="mb-2 font-bold text-ink">Contato para esclarecimentos</h2>
          <p>Artemísia Kimberlly — <a className="link" href="mailto:artemisia20261002635@alu.uern.br">artemisia20261002635@alu.uern.br</a></p>
          <p>Maria Klara — <a className="link" href="mailto:mariaklara@alu.uern.br">mariaklara@alu.uern.br</a></p>
          <p>Prof. Dr. Raul Benites Paradeda — <a className="link" href="mailto:raulparadeda@uern.br">raulparadeda@uern.br</a></p>
        </div>
        <label className="mt-7 flex cursor-pointer items-start gap-4 rounded-xl border-2 border-slate-200 p-4 transition hover:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
          <input className="mt-0.5 h-6 w-6 shrink-0 accent-brand-600" type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
          <span className="font-semibold leading-relaxed text-ink">Li as informações acima e concordo voluntariamente em participar.</span>
        </label>
        <PrimaryButton fullWidth className="mt-5" disabled={!accepted} onClick={onContinue}>Começar</PrimaryButton>
      </section>
    </PageShell>
  );
}

function Info({ title, children }: { title: string; children: string }) { return <div><h2 className="font-bold text-ink">{title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">{children}</p></div>; }
