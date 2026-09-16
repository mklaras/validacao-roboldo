import { useEffect } from 'react';
import { Header } from './components/Header';
import { useExperiment } from './hooks/useExperiment';
import { ConsentPage } from './pages/ConsentPage';
import { DemographicsPage } from './pages/DemographicsPage';
import { ExpressionPage } from './pages/ExpressionPage';
import { InstructionsPage } from './pages/InstructionsPage';
import { PostQuestionnairePage } from './pages/PostQuestionnairePage';
import { SubmissionStatusPage } from './pages/SubmissionStatusPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { TransitionPage } from './pages/TransitionPage';

export default function App() {
  const experiment = useExperiment();
  const { session } = experiment;
  const canGoBack = ['demographics', 'instructions', 'expression', 'transition', 'post'].includes(session.step);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [session.step, session.currentExpressionIndex]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fc] text-ink">
      <Header onBack={canGoBack ? experiment.goBack : undefined} />
      {session.step === 'consent' && <ConsentPage onContinue={experiment.acceptConsent} />}
      {session.step === 'demographics' && <DemographicsPage initial={session.data.demographics} onContinue={experiment.saveDemographics} />}
      {session.step === 'instructions' && <InstructionsPage onContinue={experiment.startExpressions} />}
      {session.step === 'expression' && <ExpressionPage key={session.currentExpressionIndex} index={session.currentExpressionIndex} initial={session.data.expressionTrials.find((trial) => trial.order === session.currentExpressionIndex + 1)} onContinue={experiment.saveExpression} />}
      {session.step === 'transition' && <TransitionPage completed={session.data.expressionTrials.length} onContinue={experiment.continueToNextExpression} />}
      {session.step === 'post' && <PostQuestionnairePage initial={session.data.postQuestionnaire} onFinish={experiment.finish} />}
      {session.step === 'submitting' && <SubmissionStatusPage onRetry={() => experiment.finish()} />}
      {session.step === 'error' && <SubmissionStatusPage error onRetry={() => experiment.finish()} />}
      {session.step === 'thanks' && <ThankYouPage onReset={experiment.reset} />}
      <footer className="px-5 py-5 text-center text-xs text-slate-400">Pesquisa acadêmica • LAR/UERN</footer>
    </div>
  );
}
