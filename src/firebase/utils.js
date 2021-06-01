import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({ prompt: 'select_account' })

// called after user is authenticated --> checks if new user or existing user --> if new user, then stored in database
export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return
  const { uid } = userAuth

  const userRef = firestore.doc(`users/${uid}`)
  console.log({ userRef })

  const snapshot = await userRef.get()
  console.log({ snapshot })
  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const timestamp = new Date()
    const userRoles = ['user']
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData
      })
    } catch (err) {
      console.log(err)
    }
  }
  console.log(userRef)
  return userRef
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}