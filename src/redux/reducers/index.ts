// root reducer

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import articleData from "./ArticleDataReducer";
import userAuth from "./UserAuthReducer";

const rootReducer = combineReducers({
	articleData: articleData,
	userauth: userAuth,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
