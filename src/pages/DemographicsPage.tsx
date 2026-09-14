import { useState } from 'react';
import { ExpressionOption } from '../components/ExpressionOption';
import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import type { Demographics } from '../types/experiment';

const GENDERS = ['Masculino', 'Feminino', 'Transgênero', 'Outro', 'Prefiro não informar'];
const EDUCATION = ['Fundamental completo', 'Ensino Médio completo', 'Superior incompleto', 'Superior completo', 'Mestrado incompleto', 'Mestrado completo', 'Doutorado incompleto', 'Doutorado completo', 'Prefiro não informar'];

export function DemographicsPage({ initial, onContinue }: { initial?: Demographics; onContinue: (data: Demographics) => void }) {
  const [gender, setGender] = useState(initial?.gender ?? '');
  const [age, setAge] = useState(initial?.age ? String(initial.age) : '');
  const [education, setEducation] = useState(initial?.education ?? '');
  const [robot, setRobot] = useState<boolean | undefined>(initial?.previousSocialRobotInteraction);
  const [technology, setTechnology] = useState<boolean | undefined>(initial?.technologyArea);
  const [attempted, setAttempted] = useState(false);
  const ageNumber = Number(age); const validAge = Number.isInteger(ageNumber) && ageNumber >= 5 && ageNumber <= 120;
  const valid = Boolean(gender && validAge && education && robot !== undefined && technology !== undefined);
  function submit() { setAttempted(true); if (valid) onContinue({ gender, age: ageNumber, education, previousSocialRobotInteraction: robot!, technologyArea: technology! }); }
  return (
    <PageShell width="max-w-4xl">
      <ProgressBar value={15} />
      <div className="mb-7 mt-6"><p className="text-sm font-bold text-brand-600">Etapa 1 de 3</p><h1 className="mt-1 text-3xl font-extrabold text-ink">Sobre você</h1><p className="mt-2 text-slate-600">Antes de começarmos, gostaríamos de conhecer um pouco sobre você.</p></div>
      <div className="space-y-5">
        <QuestionCard title="Qual é o seu gênero?"><OptionGrid items={GENDERS} name="gender" value={gender} setValue={setGender} /></QuestionCard>
        <QuestionCard title="Qual é a sua idade?"><label className="sr-only" htmlFor="age">Idade</label><input id="age" inputMode="numeric" type="number" min="5" max="120" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} className="min-h-14 w-full max-w-xs rounded-xl border-2 border-slate-200 px-4 text-lg font-semibold outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100" placeholder="Digite sua idade" />{attempted && age && !validAge && <p className="mt-2 text-sm font-medium text-amber-700">Informe uma idade válida entre 5 e 120 anos.</p>}</QuestionCard>
        <QuestionCard title="Qual é a sua escolaridade?"><OptionGrid items={EDUCATION} name="education" value={education} setValue={setEducation} /></QuestionCard>
        <QuestionCard title="Você já interagiu com robôs sociais?" description="Um robô social é uma máquina autônoma ou semi-autônoma projetada para interagir, se comunicar e conviver com seres humanos, utilizando comportamentos e normas sociais."><BooleanOptions name="robot" value={robot} setValue={setRobot} /></QuestionCard>
        <QuestionCard title="Você trabalha ou estuda na área de tecnologia?"><BooleanOptions name="technology" value={technology} setValue={setTechnology} /></QuestionCard>
      </div>
      {attempted && !valid && <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">Preencha as perguntas acima para continuar.</p>}
      <PrimaryButton fullWidth className="mt-5" onClick={submit}>Continuar</PrimaryButton>
    </PageShell>
  );
}

function OptionGrid({ items, name, value, setValue }: { items: string[]; name: string; value: string; setValue: (v: string) => void }) { return <div className="grid gap-2 sm:grid-cols-2">{items.map((item) => <ExpressionOption key={item} name={name} value={item} label={item} checked={value === item} onChange={setValue} />)}</div>; }
function BooleanOptions({ name, value, setValue }: { name: string; value?: boolean; setValue: (v: boolean) => void }) { return <div className="grid grid-cols-2 gap-3">{[['Sim', true], ['Não', false]].map(([label, item]) => <ExpressionOption key={label as string} name={name} value={String(item)} label={label as string} checked={value === item} onChange={() => setValue(item as boolean)} />)}</div>; }
