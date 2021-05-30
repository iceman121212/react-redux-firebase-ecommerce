import { auth, GoogleProvider, handleUserProfile } from "../../firebase/utils";
import userTypes from "./user.types";

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS
})

export const signInUser = ({ email, password }) => {
  return async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => {
  return async dispatch => {
    if (password !== confirmPassword) {
      const err = ['Passwords do not match']
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err
      })
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await handleUserProfile(user, { displayName })
      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const resetPassword = ({ email }) => {
  return async dispatch => {
    const config = {
      url: 'http://localhost:3000/login'
    }
    try {
      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          })
        })
        .catch(() => {
          console.log('catch reached')
          const err = ['Email not found. Please try again']
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: err,
          })
          console.log(err);
        })
    } catch (err) {
      console.log(err)
    }
  }
}

export const signInWithGoogle = () => {
  return async dispatch => {
    try {
      await auth.signInWithPopup(GoogleProvider)
        .then(() => {
          dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
          })
        })
    } catch (err) {
      console.log(err)
    }
  }
}

