import { collections } from '@keys/firebase';
import { Firebase } from '@utils/firebase'

const firebase = new Firebase();
const db = firebase.firestore();

export const getIPTable = (walletAddress) => {
  if (!walletAddress) return;
  return db.collection(collections.wallets).doc(walletAddress).get();
}