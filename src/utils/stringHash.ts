import Hasha from 'hasha';

export function StringHash(text: string) {
  return Hasha(text, {
    algorithm: 'sha1',
  });
}
