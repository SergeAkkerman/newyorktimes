// Save info about user authorisation in Redux

import { LOGIN_ERROR } from "../ActionTypes";
import { LOGIN_SUCCESS } from "../ActionTypes";
import { SIGNOUT_SUCCESS } from "../ActionTypes";
import { SIGNUP_SUCCESS } from "../ActionTypes";
import { SIGNUP_ERROR } from "../ActionTypes";
import { Iactions } from "../Actions";

interface loginState {
	authError: string | null;
	signedIn: boolean | null;
	signupError: string | null;
}

const initialState: loginState = {
	authError: "",
	signedIn: null,
	signupError: "",
};

const loginReducer = (state = initialState, action: Iactions): loginState => {
	switch (action.type) {
		case "LOGIN_ERROR":
			return { ...state, authError: action.err.message, signedIn: false };
		case "LOGIN_SUCCESS":
			return { ...state, authError: "", signedIn: true };
		case "SIGNOUT_SUCCESS":
			return { ...state, signedIn: false };
		case "SIGNUP_SUCCESS":
			return {
				...state,
				authError: "",
				signedIn: true,
			};
		case "SIGNUP_ERROR":
			return {
				authError: action.err.message,
				signupError: action.err.message,
				signedIn: false,
			};
		default:
			return state;
	}
};

export default loginReducer;
