const CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function createParticipantId(): string {
  const values = new Uint32Array(6);
  crypto.getRandomValues(values);
  const code = Array.from(values, (value) => CHARACTERS[value % CHARACTERS.length]).join('');
  return `P-${code}`;
}
