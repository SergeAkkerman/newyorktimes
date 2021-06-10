export const ARTICLE_DATA_TO_STORE = "ARTICLE_DATA_TO_STORE";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export interface articleDataInterface {
	type: typeof ARTICLE_DATA_TO_STORE;
	payload: object;
}

export interface userLoginErrror {
	type: typeof LOGIN_ERROR;
	payload: object;
}

export interface userLoginSuccess {
	type: typeof LOGIN_SUCCESS;
	payload: object;
}

export interface userSignoutSuccess {
	type: typeof SIGNOUT_SUCCESS;
	payload: object;
}

export interface userSignupSuccess {
	type: typeof SIGNUP_SUCCESS;
	payload: object;
}

export interface userSignupError {
	type: typeof SIGNUP_ERROR;
	payload: object;
}
