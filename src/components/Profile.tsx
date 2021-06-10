import { connect } from "react-redux";

import { logOut } from "../redux/Actions";

const Profile = (props: any) => {
	const {
		nameFirebase,
		photoFirebase,
		nameFirestore,
		photoFirestore,
		logOut,
	} = props;
	const name = nameFirebase ? nameFirebase : nameFirestore;
	const photo = photoFirebase ? photoFirebase : photoFirestore;
	return (
		<div>
			<img src={photo}></img>
			<br />
			{name}
			<br />
			<button onClick={logOut}>Log out</button>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		nameFirebase: state.firebase.auth.displayName,
		photoFirebase: state.firebase.auth.photoURL,
		nameFirestore: state.firebase.profile.name,
		photoFirestore: state.firebase.profile.avatar,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		logOut: () => dispatch(logOut()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
