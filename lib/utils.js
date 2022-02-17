import { createHash } from 'node:crypto';

function calcHash(type, id) {
  if (!type || !id) throw new Error('Invalid params');
  return createHash('sha256').update(`${type}:${id}`).digest('hex');
}

