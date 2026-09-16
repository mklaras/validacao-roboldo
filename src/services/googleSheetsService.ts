import type { ExperimentData } from '../types/experiment';

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxHXUXY0WwH-3TP0xYCDkWZaeCzAUu23hXykzmNbDp4qxtIkOoOVGYAQa2JaQoTZG8ywA/exec';

interface SubmissionResult {
  success: boolean;
  duplicate?: boolean;
  error?: string;
}

export async function submitExperiment(
  data: ExperimentData,
): Promise<{ success: true }> {
  console.log('Dados do experimento:', data);

  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      // text/plain evita uma requisição OPTIONS (preflight) no Apps Script.
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`O servidor respondeu com o status ${response.status}.`);
  }

  let result: SubmissionResult;

  try {
    result = (await response.json()) as SubmissionResult;
  } catch {
    throw new Error(
      'O Apps Script não retornou JSON. Verifique as permissões da implantação.',
    );
  }

  if (!result.success) {
    throw new Error(result.error || 'O Apps Script não confirmou o envio.');
  }

  return { success: true };
}
