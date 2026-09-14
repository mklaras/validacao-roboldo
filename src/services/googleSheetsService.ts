import type { ExperimentData } from '../types/experiment';

// Substitua este mock por um POST para a URL do Google Apps Script futuramente.
export async function submitExperiment(data: ExperimentData): Promise<{ success: true }> {
  await new Promise((resolve) => window.setTimeout(resolve, 700));
  console.log('Dados do experimento:', data);
  return { success: true };
}
