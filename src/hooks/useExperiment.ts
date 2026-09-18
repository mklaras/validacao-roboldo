import { useEffect, useState } from 'react';
import { SCENARIOS, type Expression, type ScenarioId } from '../config/expressions';
import { submitExperiment } from '../services/googleSheetsService';
import type { Demographics, ExperimentData, PostQuestionnaire, StoredSession } from '../types/experiment';
import { createParticipantId } from '../utils/participantId';
import { clearSession, loadSession, saveSession } from '../utils/storage';

function newSession(): StoredSession {
  return {
    step: 'scenario', currentExpressionIndex: 0,
    data: { participantId: createParticipantId(), startedAt: '', expressionTrials: [] },
  };
}

export function useExperiment() {
  const [session, setSession] = useState<StoredSession>(() => {
    const stored = loadSession();
    if (!stored) return newSession();
    // Uma atualização durante a requisição não deve deixar a interface presa.
    return stored.step === 'submitting' ? { ...stored, step: 'error' } : stored;
  });

  useEffect(() => { saveSession(session); }, [session]);

  const setStep = (step: StoredSession['step']) => setSession((current) => ({ ...current, step }));

  function selectScenario(scenario: ScenarioId) {
    setSession((current) => {
      const scenarioChanged = Boolean(
        current.data.scenario && current.data.scenario !== scenario,
      );

      return {
        ...current,
        step: 'consent',
        currentExpressionIndex: scenarioChanged ? 0 : current.currentExpressionIndex,
        data: {
          ...current.data,
          scenario,
          expressionTrials: scenarioChanged ? [] : current.data.expressionTrials,
          postQuestionnaire: scenarioChanged ? undefined : current.data.postQuestionnaire,
          finishedAt: scenarioChanged ? undefined : current.data.finishedAt,
        },
      };
    });
  }

  function acceptConsent() {
    setSession((current) => ({ ...current, step: 'demographics', data: { ...current.data, startedAt: current.data.startedAt || new Date().toISOString() } }));
  }

  function saveDemographics(demographics: Demographics) {
    setSession((current) => ({ ...current, step: 'instructions', data: { ...current.data, demographics } }));
  }

  function startExpressions() { setStep('expression'); }

  function saveExpression(selectedExpression: Expression, identificationEase: number) {
    setSession((current) => {
      const index = current.currentExpressionIndex;
      if (!current.data.scenario) return current;
      const expressions = SCENARIOS[current.data.scenario];
      const trial = { order: index + 1, displayedExpression: expressions[index], selectedExpression, identificationEase, timestamp: new Date().toISOString() };
      const trials = [...current.data.expressionTrials.filter((item) => item.order !== trial.order), trial].sort((a, b) => a.order - b.order);
      const isLast = index === expressions.length - 1;
      return { ...current, step: isLast ? 'post' : 'transition', data: { ...current.data, expressionTrials: trials } };
    });
  }

  function continueToNextExpression() {
    setSession((current) => {
      if (!current.data.scenario) return current;
      return { ...current, step: 'expression', currentExpressionIndex: Math.min(current.currentExpressionIndex + 1, SCENARIOS[current.data.scenario].length - 1) };
    });
  }

  function goBack() {
    setSession((current) => {
      switch (current.step) {
        case 'consent':
          return { ...current, step: 'scenario' };
        case 'demographics':
          return { ...current, step: 'consent' };
        case 'instructions':
          return { ...current, step: 'demographics' };
        case 'expression':
          return current.currentExpressionIndex === 0
            ? { ...current, step: 'instructions' }
            : { ...current, step: 'transition', currentExpressionIndex: current.currentExpressionIndex - 1 };
        case 'transition':
          return { ...current, step: 'expression' };
        case 'post':
          return current.data.scenario
            ? { ...current, step: 'expression', currentExpressionIndex: SCENARIOS[current.data.scenario].length - 1 }
            : current;
        default:
          return current;
      }
    });
  }

  async function finish(postQuestionnaire?: PostQuestionnaire) {
    let payload: ExperimentData;
    if (postQuestionnaire) {
      payload = { ...session.data, postQuestionnaire, finishedAt: new Date().toISOString() };
      setSession((current) => ({ ...current, step: 'submitting', data: payload }));
    } else {
      payload = session.data;
      setStep('submitting');
    }

    try {
      const result = await submitExperiment(payload);
      if (!result.success) throw new Error('Falha no envio');
      setSession((current) => ({ ...current, step: 'thanks', data: payload }));
    } catch (error) {
      console.error('Não foi possível registrar o experimento:', error);
      setSession((current) => ({ ...current, step: 'error', data: payload }));
    }
  }

  function reset() {
    clearSession();
    setSession(newSession());
  }

  return { session, selectScenario, acceptConsent, saveDemographics, startExpressions, saveExpression, continueToNextExpression, goBack, finish, reset };
}
