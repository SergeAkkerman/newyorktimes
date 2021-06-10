import fire from "../config/firebase";

interface Header {}

export default function UserAuthStateChanged() {
	fire.auth().onAuthStateChanged((user) => {
		let loggedIn = {};
		if (user) {
			// User is signed in.
			loggedIn = true;
		} else {
			loggedIn = false;
		}
		console.log("Logged in: ", loggedIn);
	});
}
