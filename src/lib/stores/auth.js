import { writable } from 'svelte/store';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import firestore from 'fire-stream/firestore';

let user = null;
let subscribers = [];
let resolvers = [];
let unsubscribe;

function emit() {
  subscribers.forEach(subscriber => subscriber(user));
  if(user) {
    for(let resolver of resolvers) {
      resolver(user);
    }
    resolvers = [];
  }
}

export const isLoggedIn = writable(undefined);

export function setUser(id) {
  if(unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  if(id) {
    unsubscribe = firestore(`users/${id}`).subscribe(value => {
      if(value == null) {
        user = false;
        isLoggedIn.set(false);
        return;
      }
      user = {id, ...value};
      isLoggedIn.set(true);
      emit();
    });
  } 
  else {
    user = false;
    isLoggedIn.set(false);
    emit();
  }
}

let watchUser = () => {
  watchUser = () => null;
  onAuthStateChanged(getAuth(), data => {
    setUser(data?.uid);
  });
};

export default {
  subscribe(callback) {
    watchUser();
    subscribers.push(callback);
    if(user !== null) {
      callback(user);
    }
    return () => subscribers = subscribers.filter(cb => cb != callback);
  },
  set() {
    console.warn('You cannot set the user through $auth. Use `firestore` instead.');
  },
  get() {
    return user;
  },
  then(callback) {
    if(user) {
      callback(user);
    }
    else {
      resolvers.push(callback);
    }
  }
};

export function login(email, password) {
  user = null;
  watchUser();
  if(email && password) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }
}

export async function register(email, password, data) {
  let auth = await createUserWithEmailAndPassword(getAuth(), email, password);
  firestore(`users/${auth.user.uid}`).overwrite({
    email,
    permissions: {
      manageChildren: true,
    },
    ...data
  });
}

export function logout() {
  return signOut(getAuth());
}

