import { collections } from '@keys/firebase';
import { Firebase } from '@utils/firebase'

const firebase = new Firebase();
const db = firebase.firestore();

export const getWeb3User = (walletAddress) => {
  if (!walletAddress) return;
  return db.collection(collections.wallets).doc(walletAddress).get();
}

export const addNewDevice = (walletAddresID, body) => {
  if (!walletAddresID) {
    throw new Error("Can't be empty wallet address")
  }
  if (!body) {
    throw new Error("Can't be empty body data")
  }
  return db.collection(collections.wallets).doc(walletAddresID).set(body);
}