import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { SignIn } from "../redux/Actions";
import { loginWithGoogle } from "../redux/Actions";
import styles from "../scss/components/loginSignup.module.scss";

interface Props {
	SignIn: any;
	authError: any;
	loginWithGoogle: any;
}

class loginForm extends React.Component<Props> {
	state = {
		email: "",
		password: "",
	};

	handleSubmit = (e: any) => {
		e.preventDefault();
		this.props.SignIn(this.state);
	};

	loginWithGoogle = (e: any) => {
		e.preventDefault();
		this.props.loginWithGoogle();
	};

	handleChange = (e: any) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	render() {
		const { authError } = this.props;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						id="email"
						placeholder="your email"
						onChange={this.handleChange}
					></input>
					<br />
					<input
						type="password"
						id="password"
						placeholder="password"
						onChange={this.handleChange}
					></input>
					<br />
					{authError ? (
						<a className={styles.text}>Error: {authError}</a>
					) : null}
					<br />
					<button className={styles.buttons}>Login</button>
					<button>
						<Link to="/signup/" className={styles.buttons}>
							sign Up
						</Link>
					</button>
				</form>
				<br />
				<br />
				<button onClick={this.loginWithGoogle}>
					Login with Google
				</button>
				<br />
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		authError: state.userauth.authError,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		SignIn: (credentials: any) => dispatch(SignIn(credentials)),
		loginWithGoogle: () => dispatch(loginWithGoogle()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);
