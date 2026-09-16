import { useState } from 'react';
import { LikertScale } from '../components/LikertScale';
import { PageShell } from '../components/PageShell';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { SemanticDifferentialItem } from '../components/SemanticDifferentialItem';
import type { GodspeedQuestionnaire, PostQuestionnaire } from '../types/experiment';

type GodspeedItemKey =
  | 'anthropomorphismFakeNatural'
  | 'anthropomorphismMachinelikeHumanlike'
  | 'anthropomorphismUnconsciousConscious'
  | 'anthropomorphismArtificialLifelike'
  | 'anthropomorphismRigidFluidMovement'
  | 'animacyDeadAlive'
  | 'animacyStagnantLively'
  | 'animacyMechanicalOrganic'
  | 'animacyArtificialLifelike'
  | 'animacyInertInteractive'
  | 'likeabilityDislikeLike'
  | 'likeabilityUnfriendlyFriendly'
  | 'likeabilityUnkindKind'
  | 'likeabilityUnpleasantPleasant'
  | 'likeabilityAwfulNice';

interface GodspeedItem {
  key: GodspeedItemKey;
  lowLabel: string;
  highLabel: string;
}

interface GodspeedSection {
  title: string;
  description: string;
  items: GodspeedItem[];
}

const GODSPEED_SECTIONS: GodspeedSection[] = [
  {
    title: 'Antropomorfismo',
    description: 'Avalie sua impressão sobre as características humanas do Roboldo.',
    items: [
      { key: 'anthropomorphismFakeNatural', lowLabel: 'Falso', highLabel: 'Natural' },
      { key: 'anthropomorphismMachinelikeHumanlike', lowLabel: 'Com aspecto mecânico', highLabel: 'Com aspecto humano' },
      { key: 'anthropomorphismUnconsciousConscious', lowLabel: 'Inconsciente', highLabel: 'Consciente' },
      { key: 'anthropomorphismArtificialLifelike', lowLabel: 'Artificial', highLabel: 'Realista' },
      { key: 'anthropomorphismRigidFluidMovement', lowLabel: 'Move-se com rigidez', highLabel: 'Move-se com fluidez' },
    ],
  },
  {
    title: 'Expressão de vida (animacidade)',
    description: 'Avalie sua impressão sobre a expressão de vida do Roboldo.',
    items: [
      { key: 'animacyDeadAlive', lowLabel: 'Morto', highLabel: 'Com vida' },
      { key: 'animacyStagnantLively', lowLabel: 'Parado', highLabel: 'Enérgico' },
      { key: 'animacyMechanicalOrganic', lowLabel: 'Mecânico', highLabel: 'Orgânico' },
      { key: 'animacyArtificialLifelike', lowLabel: 'Artificial', highLabel: 'Realista' },
      { key: 'animacyInertInteractive', lowLabel: 'Estático', highLabel: 'Interativo' },
    ],
  },
  {
    title: 'Simpatia',
    description: 'Avalie sua impressão sobre a simpatia do Roboldo.',
    items: [
      { key: 'likeabilityDislikeLike', lowLabel: 'Não gosto', highLabel: 'Gosto' },
      { key: 'likeabilityUnfriendlyFriendly', lowLabel: 'Hostil', highLabel: 'Amigável' },
      { key: 'likeabilityUnkindKind', lowLabel: 'Antipático', highLabel: 'Gentil' },
      { key: 'likeabilityUnpleasantPleasant', lowLabel: 'Desagradável', highLabel: 'Agradável' },
      { key: 'likeabilityAwfulNice', lowLabel: 'Horrível', highLabel: 'Simpático' },
    ],
  },
];

export function PostQuestionnairePage({
  initial,
  onFinish,
}: {
  initial?: PostQuestionnaire;
  onFinish: (data: PostQuestionnaire) => void;
}) {
  const [overallEase, setOverallEase] = useState(initial?.overallEase);
  const [naturalness, setNaturalness] = useState(initial?.naturalness);
  const [appearanceCompatibility, setCompatibility] = useState(
    initial?.appearanceCompatibility,
  );
  const [godspeedAnswers, setGodspeedAnswers] = useState<
    Partial<Record<GodspeedItemKey, number>>
  >(() => flattenGodspeed(initial?.godspeed));
  const [comment, setComment] = useState(initial?.comment ?? '');
  const [attempted, setAttempted] = useState(false);

  const godspeedComplete = GODSPEED_SECTIONS.every((section) =>
    section.items.every((item) => godspeedAnswers[item.key] !== undefined),
  );
  const valid = Boolean(
    overallEase &&
      naturalness &&
      appearanceCompatibility &&
      godspeedComplete,
  );

  function setGodspeedAnswer(key: GodspeedItemKey, value: number) {
    setGodspeedAnswers((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    setAttempted(true);
    if (!valid) return;

    onFinish({
      overallEase: overallEase!,
      naturalness: naturalness!,
      appearanceCompatibility: appearanceCompatibility!,
      godspeed: buildGodspeed(godspeedAnswers),
      comment: comment.trim(),
    });
  }

  return (
    <PageShell width="max-w-5xl">
      <ProgressBar value={90} />
      <div className="mb-7 mt-6">
        <p className="text-sm font-bold text-brand-600">Última etapa</p>
        <h1 className="mt-1 text-3xl font-extrabold text-ink">Para finalizar...</h1>
        <p className="mt-2 text-slate-600">
          Pensando em todas as expressões que você acabou de observar, responda às perguntas abaixo.
        </p>
      </div>

      <div className="space-y-5">
        <QuestionCard title="De modo geral, foi fácil compreender as expressões faciais do robô?">
          <LikertScale name="overallEase" value={overallEase} onChange={setOverallEase} lowLabel="Muito difícil" highLabel="Muito fácil" />
        </QuestionCard>
        <QuestionCard title="De modo geral, quão naturais pareceram as expressões faciais do robô?">
          <LikertScale name="naturalness" value={naturalness} onChange={setNaturalness} lowLabel="Nada naturais" highLabel="Muito naturais" />
        </QuestionCard>
        <QuestionCard title="De modo geral, você considera que as expressões faciais combinam com a aparência do robô?">
          <LikertScale name="compatibility" value={appearanceCompatibility} onChange={setCompatibility} lowLabel="Não combinam" highLabel="Combinam muito" />
        </QuestionCard>

        <section className="rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
          <h2 className="text-xl font-extrabold text-ink">Questionário Godspeed</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Para cada par de palavras, selecione o número que melhor representa sua impressão sobre o Roboldo. O número 1 corresponde ao termo da esquerda e o número 5 ao termo da direita.
          </p>
        </section>

        {GODSPEED_SECTIONS.map((section) => (
          <QuestionCard key={section.title} title={section.title} description={section.description}>
            {section.items.map((item) => (
              <SemanticDifferentialItem
                key={item.key}
                name={item.key}
                lowLabel={item.lowLabel}
                highLabel={item.highLabel}
                value={godspeedAnswers[item.key]}
                onChange={(value) => setGodspeedAnswer(item.key, value)}
              />
            ))}
          </QuestionCard>
        ))}

        <QuestionCard title="Se desejar, deixe algum comentário ou sugestão sobre as expressões faciais do Roboldo.">
          <label className="sr-only" htmlFor="comment">Comentário opcional</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={1000}
            rows={4}
            className="w-full resize-y rounded-xl border-2 border-slate-200 p-4 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
            placeholder="Comentário opcional"
          />
        </QuestionCard>
      </div>

      {attempted && !valid && (
        <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">
          Responda a todas as escalas para continuar.
        </p>
      )}
      <PrimaryButton fullWidth className="mt-5" onClick={submit}>
        Finalizar participação
      </PrimaryButton>
    </PageShell>
  );
}

function flattenGodspeed(
  godspeed?: GodspeedQuestionnaire,
): Partial<Record<GodspeedItemKey, number>> {
  if (!godspeed) return {};

  return {
    anthropomorphismFakeNatural: godspeed.anthropomorphism.fakeNatural,
    anthropomorphismMachinelikeHumanlike: godspeed.anthropomorphism.machinelikeHumanlike,
    anthropomorphismUnconsciousConscious: godspeed.anthropomorphism.unconsciousConscious,
    anthropomorphismArtificialLifelike: godspeed.anthropomorphism.artificialLifelike,
    anthropomorphismRigidFluidMovement: godspeed.anthropomorphism.rigidFluidMovement,
    animacyDeadAlive: godspeed.animacy.deadAlive,
    animacyStagnantLively: godspeed.animacy.stagnantLively,
    animacyMechanicalOrganic: godspeed.animacy.mechanicalOrganic,
    animacyArtificialLifelike: godspeed.animacy.artificialLifelike,
    animacyInertInteractive: godspeed.animacy.inertInteractive,
    likeabilityDislikeLike: godspeed.likeability.dislikeLike,
    likeabilityUnfriendlyFriendly: godspeed.likeability.unfriendlyFriendly,
    likeabilityUnkindKind: godspeed.likeability.unkindKind,
    likeabilityUnpleasantPleasant: godspeed.likeability.unpleasantPleasant,
    likeabilityAwfulNice: godspeed.likeability.awfulNice,
  };
}

function buildGodspeed(
  answers: Partial<Record<GodspeedItemKey, number>>,
): GodspeedQuestionnaire {
  return {
    anthropomorphism: {
      fakeNatural: answers.anthropomorphismFakeNatural!,
      machinelikeHumanlike: answers.anthropomorphismMachinelikeHumanlike!,
      unconsciousConscious: answers.anthropomorphismUnconsciousConscious!,
      artificialLifelike: answers.anthropomorphismArtificialLifelike!,
      rigidFluidMovement: answers.anthropomorphismRigidFluidMovement!,
    },
    animacy: {
      deadAlive: answers.animacyDeadAlive!,
      stagnantLively: answers.animacyStagnantLively!,
      mechanicalOrganic: answers.animacyMechanicalOrganic!,
      artificialLifelike: answers.animacyArtificialLifelike!,
      inertInteractive: answers.animacyInertInteractive!,
    },
    likeability: {
      dislikeLike: answers.likeabilityDislikeLike!,
      unfriendlyFriendly: answers.likeabilityUnfriendlyFriendly!,
      unkindKind: answers.likeabilityUnkindKind!,
      unpleasantPleasant: answers.likeabilityUnpleasantPleasant!,
      awfulNice: answers.likeabilityAwfulNice!,
    },
  };
}
