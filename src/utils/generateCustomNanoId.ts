import { customAlphabet } from 'nanoid';
export function generateCustomNanoId() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const nanoid = customAlphabet(alphabet, 8);
  return nanoid();
}
