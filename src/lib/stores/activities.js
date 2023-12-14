import firestore from "fire-stream/firestore";
import noop from "$lib/utils/noop";
import auth from "$lib/stores/auth";

export function createActivity(data = {}) {
  data = {
    type: 'activity',
    name: "Activity",
    date: new Date().toISOString(),
    progress: 0,
    status: "ACTIVE",
    owner: [auth.get().id],
    ...data,
  };
  return firestore(`/activity`).push(data);
}

export function getActivity(owner, type) {
  if(!owner) {
    return noop;
  }

  let url = `activity`;

  let where = [
    ['owner', 'array-contains', owner]
  ];
  if(type) {
    where.push(['type', '==', type]);
  }

  return firestore({url, where});
}


