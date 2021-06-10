import { LOGIN_ERROR } from "../ActionTypes";
import { LOGIN_SUCCESS } from "../ActionTypes";
import { SIGNOUT_SUCCESS } from "../ActionTypes";
import { SIGNUP_SUCCESS } from "../ActionTypes";
import { SIGNUP_ERROR } from "../ActionTypes";

const initialState = {
	authError: null,
};

const loginReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case "LOGIN_ERROR":
			return { ...state, authError: action.err.message };
		case "LOGIN_SUCCESS":
			return { ...state, authError: null };
		case "SIGNOUT_SUCCESS":
			console.log("Signout success");
			return state;
		case "SIGNUP_SUCCESS":
			console.log("signup success");
			return {
				...state,
				authError: null,
			};
		case "SIGNUP_ERROR":
			console.log("signup error");
			return {
				authError: action.err.message,
			};
		default:
			return state;
	}
};

export default loginReducer;
