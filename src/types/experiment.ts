import type { Expression, ScenarioId } from '../config/expressions';

export type SocialRobotInteraction = 'Sim' | 'Não' | 'Não sei';

export interface Demographics {
  gender: string;
  age: number;
  education: string;
  previousSocialRobotInteraction: SocialRobotInteraction;
  technologyArea: boolean;
}

export interface ExpressionTrial {
  order: number;
  displayedExpression: Expression;
  selectedExpression: Expression;
  identificationEase: number;
  timestamp: string;
}

export interface PostQuestionnaire {
  overallEase: number;
  naturalness: number;
  appearanceCompatibility: number;
  godspeed: GodspeedQuestionnaire;
  comment?: string;
}

export interface GodspeedQuestionnaire {
  anthropomorphism: {
    fakeNatural: number;
    machinelikeHumanlike: number;
    unconsciousConscious: number;
    artificialLifelike: number;
    rigidFluidMovement: number;
  };
  animacy: {
    deadAlive: number;
    stagnantLively: number;
    mechanicalOrganic: number;
    artificialLifelike: number;
    inertInteractive: number;
  };
  likeability: {
    dislikeLike: number;
    unfriendlyFriendly: number;
    unkindKind: number;
    unpleasantPleasant: number;
    awfulNice: number;
  };
}

export interface ExperimentData {
  participantId: string;
  scenario: ScenarioId;
  startedAt: string;
  finishedAt?: string;
  demographics?: Demographics;
  expressionTrials: ExpressionTrial[];
  postQuestionnaire?: PostQuestionnaire;
}

export type StudyStep = 'consent' | 'demographics' | 'instructions' | 'expression' | 'transition' | 'post' | 'submitting' | 'error' | 'thanks';

export interface StoredSession {
  step: StudyStep;
  currentExpressionIndex: number;
  data: ExperimentData;
}
