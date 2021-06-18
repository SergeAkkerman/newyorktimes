//check if user is logged in once the application starts

import fire from "../config/firebase";
import { useDispatch } from "react-redux";

const UserAuth = () => {
	const dispatch = useDispatch();
	fire.auth().onAuthStateChanged((user) => {
		user
			? dispatch({ type: "LOGIN_SUCCESS" })
			: dispatch({ type: "SIGNOUT_SUCCESS" });
	});
};

export default UserAuth;
