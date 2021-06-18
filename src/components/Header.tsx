//Header that shows main banner, user logo or "login" button, and dropdown menu

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import header from "../scss/components/header.module.scss";
import { connect } from "react-redux";
import menu from "../images/burger_menu.png";
import { logOut } from "../redux/Actions";
import login from "../images/login.png";
import { AppDispatch } from "../redux/Store";

interface Iprops {
	icon: string;
	children: Object;
}

interface Istate {
	userauth: {
		signedIn: boolean;
	};
	firebase: {
		profile: {
			avatar?: string;
		};
		auth: {
			photoURL?: string;
		};
	};
}

const Banner = () => {
	return (
		<Link to="/">
			<img
				className={header.banner}
				src="https://i.ibb.co/6Y5KQyz/new-york-times-logo.png"
				alt="logo"
			></img>
		</Link>
	);
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		logOut: () => dispatch(logOut()),
	};
};

const mapStateToProps = (state: Istate) => {
	return {
		isLoggedIn: state.userauth.signedIn,
		photoFirestore: state.firebase.profile.avatar,
		photoFirebase: state.firebase.auth.photoURL,
	};
};

// "switch" between dropdown menu and login button
const Menu = connect(
	mapStateToProps,
	mapDispatchToProps
)((props: any) => {
	const { photoFirebase, photoFirestore, isLoggedIn, logOut } = props;
	const photo = photoFirebase ? photoFirebase : photoFirestore;
	return isLoggedIn ? (
		<Dropdown icon={photo}>
			<ul>
				<li>
					<Link to="/profile/">Profile</Link>
				</li>
				<li>
					<Link to="/" onClick={logOut}>
						Logout
					</Link>
				</li>
			</ul>
		</Dropdown>
	) : (
		<Link to="/login/">
			<img src={login} alt="Login" className={header.loginButton} />
		</Link>
	);
});

// check user screen resolution. We show different logo for big and small screens
const Dropdown = (props: Iprops) => {
	const [isNarrowScreen, setIsNarrowScreen] = useState(false);
	useEffect(() => {
		const mediaWatcher = window.matchMedia("(max-width: 850px)");
		setIsNarrowScreen(mediaWatcher.matches);

		function updateIsNarrowScreen(e: MediaQueryListEvent) {
			console.log(e);
			setIsNarrowScreen(e.matches);
		}

		if (mediaWatcher.addEventListener) {
			mediaWatcher.addEventListener("change", updateIsNarrowScreen);
			return function cleanup() {
				mediaWatcher.removeEventListener(
					"change",
					updateIsNarrowScreen
				);
			};
		} else {
			mediaWatcher.addListener(updateIsNarrowScreen);
			return function cleanup() {
				mediaWatcher.removeListener(updateIsNarrowScreen);
			};
		}
	}, []);

	// open and close dropdown
	const [open, setOpen] = useState(false);
	return (
		<div
			className={header.dropdownMenu}
			onClick={() => {
				setOpen(!open);
			}}
		>
			{isNarrowScreen ? (
				<img alt="" src={menu} className={header.photo}></img>
			) : (
				<img alt="" src={props.icon} className={header.photo}></img>
			)}

			{open && props.children}
		</div>
	);
};

function Header() {
	return (
		<div className={header.mainContainer}>
			<Banner />
			<Menu />
		</div>
	);
}

export default Header;
