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

export const ArticleDataToStore = (saveData: any) => ({
	type: ARTICLE_DATA_TO_STORE,
	payload: {
		currentArticleArray: [saveData],
	},
});

// login with email and password
export const SignIn = (credentials: any) => {
	return (dispatch: any, getState: any, { getFirebase }: any) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err: any) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

// login with Google

export const loginWithGoogle = () => {
	return (dispatch: any, getState: any, { getFirebase }: any) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.SESSION)
			.then(() => {
				var provider = new firebase.auth.GoogleAuthProvider();
				firebase.auth().signInWithPopup(provider);
			})
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err: any) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

//logout
export const logOut = () => {
	return (dispatch: any, getState: any, { getFirebase }: any) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "SIGNOUT_SUCCESS" });
			});
	};
};

//user signUp
export const signUp = (newUser: any) => {
	return (
		dispatch: any,
		getState: any,
		{ getFirebase, getFirestore }: any
	) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp: any) => {
				return firestore.collection("users").doc(resp.user.uid).set({
					email: newUser.email,
					name: newUser.name,
					avatar: newUser.avatar,
				});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch((err: any) => {
				dispatch({ type: "SIGNUP_ERROR", err });
			});
	};
};
