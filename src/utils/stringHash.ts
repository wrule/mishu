import Hasha from 'hasha';

export function StringHash(str: string) {
  return Hasha(str, {
    algorithm: 'sha1',
  });
}
