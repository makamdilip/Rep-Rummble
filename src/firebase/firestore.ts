import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore'
import firebaseApp from './config'

const db = getFirestore(firebaseApp)

export async function createUserProfile(uid: string, data: Record<string, unknown>) {
  const ref = doc(db, 'users', uid)
  await setDoc(ref, data, { merge: true })
  return ref
}

export async function getUserProfile(uid: string) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export { db, collection, addDoc }
