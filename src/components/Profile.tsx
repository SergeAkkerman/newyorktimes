// User profile page

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import profile from "../scss/components/profile.module.scss";

import { logOut } from "../redux/Actions";
import { AppDispatch } from "../redux/Store";

interface Iprops {
	nameFirebase: string;
	photoFirebase: string;
	nameFirestore: string;
	photoFirestore: string;
	logOut: (event: React.MouseEvent<HTMLAnchorElement>) => void;
	isLoggedIn: boolean;
}

interface Istate {
	firebase: {
		auth: {
			displayName: string;
			photoURL: string;
		};
		profile: {
			name: string;
			avatar: string;
		};
	};
	userauth: {
		signedIn: boolean;
	};
}

// show info about user login and photo from Redux Firebase and Firestore.
const Profile = (props: Iprops) => {
	const {
		nameFirebase,
		photoFirebase,
		nameFirestore,
		photoFirestore,
		logOut,
		isLoggedIn,
	} = props;
	const name = nameFirebase ? nameFirebase : nameFirestore;
	const photo = photoFirebase ? photoFirebase : photoFirestore;
	return isLoggedIn === false ? (
		<Redirect to="/" />
	) : (
		<div className={profile.main}>
			<h2>Hello, {name}!</h2>
			<h3> This is your personal page.</h3>
			<p>
				You can visit <Link to="/">main page</Link> or{" "}
				<a href="/" onClick={logOut}>
					log out
				</a>
			</p>
			<br />
			<img alt="" className={profile.photo} src={photo}></img>
			<br />
		</div>
	);
};

// Retrieve info from both Firebase and Firestore. Users registered by "login/password" are stored in Firestore.
//But in case of Google authorisation we have to look at Firebase state.
const mapStateToProps = (state: Istate) => {
	return {
		nameFirebase: state.firebase.auth.displayName,
		photoFirebase: state.firebase.auth.photoURL,
		nameFirestore: state.firebase.profile.name,
		photoFirestore: state.firebase.profile.avatar,
		isLoggedIn: state.userauth.signedIn,
	};
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		logOut: () => dispatch(logOut()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
