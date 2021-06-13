import Hasha from 'hasha';

export function Hash(text: string) {
  return Hasha(text, {
    algorithm: 'sha1',
  });
}
