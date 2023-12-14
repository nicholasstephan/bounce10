import auth from '$lib/stores/auth';
import firestore from 'fire-stream/firestore';

export function getMyChildren() {
  let userId = auth.get()?.id;

  if(!userId) {
    return;
  }

  return firestore({
    url: `children`,
    where: [
      ['parents', 'array-contains', userId],
    ]
  });
}