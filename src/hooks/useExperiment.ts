import { useEffect, useState } from 'react';
import { EXPRESSIONS, type Expression } from '../config/expressions';
import { submitExperiment } from '../services/googleSheetsService';
import type { Demographics, ExperimentData, PostQuestionnaire, StoredSession } from '../types/experiment';
import { createParticipantId } from '../utils/participantId';
import { clearSession, loadSession, saveSession } from '../utils/storage';

function newSession(): StoredSession {
  return {
    step: 'consent', currentExpressionIndex: 0,
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
      const trial = { order: index + 1, displayedExpression: EXPRESSIONS[index], selectedExpression, identificationEase, timestamp: new Date().toISOString() };
      const trials = [...current.data.expressionTrials.filter((item) => item.order !== trial.order), trial].sort((a, b) => a.order - b.order);
      const isLast = index === EXPRESSIONS.length - 1;
      return { ...current, step: isLast ? 'post' : 'transition', data: { ...current.data, expressionTrials: trials } };
    });
  }

  function continueToNextExpression() {
    setSession((current) => ({ ...current, step: 'expression', currentExpressionIndex: Math.min(current.currentExpressionIndex + 1, EXPRESSIONS.length - 1) }));
  }

  function goBack() {
    setSession((current) => {
      switch (current.step) {
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
          return { ...current, step: 'expression', currentExpressionIndex: EXPRESSIONS.length - 1 };
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

  return { session, acceptConsent, saveDemographics, startExpressions, saveExpression, continueToNextExpression, goBack, finish, reset };
}
