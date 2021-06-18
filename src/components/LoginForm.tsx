// Login page

import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { AppDispatch } from "../redux/Store";

import { SignIn } from "../redux/Actions";
import { loginWithGoogle, Icredentials } from "../redux/Actions";
import login from "../scss/components/login.module.scss";

interface Props {
	SignIn: Function;
	authError: string;
	loginWithGoogle: Function;
	isLoggedIn: boolean;
}

interface State {
	email: string;
	password: string;
}

interface Istate {
	userauth: {
		authError: string;
		signedIn: boolean;
	};
}

class loginForm extends React.Component<Props, State> {
	state = {
		email: "",
		password: "",
	};

	// listen for events. Save entered data into the state, and on submit send as props to action creator
	handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		this.props.SignIn(this.state);
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newState = { [e.target.id]: e.target.value } as Pick<
			State,
			keyof State
		>;
		this.setState(newState);
	};

	loginWithGoogle = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		this.props.loginWithGoogle();
	};

	// show login form or redirect user to profile page in case logged in
	render() {
		const { authError, isLoggedIn } = this.props;
		return (
			<div className={login.base}>
				{isLoggedIn === true ? (
					<Redirect to="/profile/" />
				) : (
					<div className={login.form}>
						<form onSubmit={this.handleSubmit}>
							<div className={login.labels}>Email</div>
							<div>
								<input
									className={login.fields}
									type="email"
									id="email"
									placeholder="examle@gmail.com"
									onChange={this.handleChange}
									name="email"
								></input>
							</div>
							<div className={login.labels}>Password</div>
							<div>
								<input
									className={login.fields}
									type="password"
									id="password"
									placeholder="at least 6 characters"
									onChange={this.handleChange}
								></input>
							</div>
							{authError ? (
								<a className={login.error}>
									Error: {authError}
								</a>
							) : null}
							<div>
								<button className={login.buttons}>Login</button>
								<button className={login.buttons}>
									<Link to="/signup/">Sign Up</Link>
								</button>
							</div>
						</form>
						<button
							className={login.googleLogin}
							onClick={this.loginWithGoogle}
						>
							Login with Google
						</button>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: Istate) => {
	return {
		authError: state.userauth.authError,
		isLoggedIn: state.userauth.signedIn,
	};
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		SignIn: (credentials: Icredentials) => dispatch(SignIn(credentials)),
		loginWithGoogle: () => dispatch(loginWithGoogle()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);
