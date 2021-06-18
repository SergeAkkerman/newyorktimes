// Action creators

import { AppDispatch } from "./Store";

import {
	articleDataInterface,
	userLoginErrror,
	userLoginSuccess,
	userSignoutSuccess,
	userSignupSuccess,
	userSignupError,
	ARTICLE_DATA_TO_STORE,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	SIGNOUT_SUCCESS,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
} from "./ActionTypes";

export interface Icredentials {
	email: string;
	password: string;
}

export interface InewUser {
	avatar: string;
	email: string;
	fieldError: string;
	name: string;
	password: string;
}

export interface Iactions {
	type: string;
	err: Error;
}

interface Iresp {
	user: {
		uid: string;
	};
}

// save selected article to Redux store
export const ArticleDataToStore = (saveData: any) => {
	return {
		type: ARTICLE_DATA_TO_STORE,
		payload: {
			currentArticleArray: [saveData],
		},
	};
};

// login with email and password
export const SignIn = (credentials: Icredentials) => {
	return (
		dispatch: AppDispatch,
		getState: Function,
		{ getFirebase }: any
	) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				firebase
					.auth()
					.signInWithEmailAndPassword(
						credentials.email,
						credentials.password
					)
					.then(() => {
						dispatch({ type: "LOGIN_SUCCESS" });
					})
					.catch((err: Error) => {
						dispatch({ type: "LOGIN_ERROR", err });
					});
			});
	};
};

// login with Google
export const loginWithGoogle = () => {
	return (
		dispatch: AppDispatch,
		getState: Function,
		{ getFirebase }: any
	) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				var provider = new firebase.auth.GoogleAuthProvider();
				return firebase.auth().signInWithPopup(provider);
			})
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err: Error) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

// logout
export const logOut = () => {
	return (
		dispatch: AppDispatch,
		getState: Function,
		{ getFirebase }: any
	) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "SIGNOUT_SUCCESS" });
			});
	};
};

// signUp
export const signUp = (newUser: InewUser) => {
	return (
		dispatch: AppDispatch,
		getState: Function,
		{ getFirebase, getFirestore }: any
	) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp: Iresp) => {
				console.log(resp);
				return firestore.collection("users").doc(resp.user.uid).set({
					email: newUser.email,
					name: newUser.name,
					avatar: newUser.avatar,
				});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch((err: Error) => {
				dispatch({ type: "SIGNUP_ERROR", err });
			});
	};
};
