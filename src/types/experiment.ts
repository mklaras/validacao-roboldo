import type { Expression } from '../config/expressions';

export interface Demographics {
  gender: string;
  age: number;
  education: string;
  previousSocialRobotInteraction: boolean;
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
  comment?: string;
}

export interface ExperimentData {
  participantId: string;
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
