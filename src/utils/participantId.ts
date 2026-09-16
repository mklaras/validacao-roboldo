const DIGITS = '0123456789';

export function createParticipantId(): string {
  const values = new Uint32Array(6);
  crypto.getRandomValues(values);
  const code = Array.from(values, (value) => DIGITS[value % DIGITS.length]).join('');
  return `P-${code}`;
}
