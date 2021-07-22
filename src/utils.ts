import Hasha from 'hasha';

export function StringHash(str: string) {
  return Hasha(str, {
    algorithm: 'sha1',
  });
}

export function UpperFirst(str: string) {
  const first = str.substr(0, 1);
  return `${first.toUpperCase()}${str.substr(1)}`;
}
