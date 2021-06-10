import React, { Component } from "react";
import { signUp } from "../redux/Actions";
import { connect } from "react-redux";

import styles from "../scss/components/loginSignup.module.scss";

interface Props {
	signUp: any;
	authError: string;
}

class SignUp extends React.Component<Props> {
	state = {
		avatar:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/113px-React-icon.svg.png",
		name: "",
		email: "",
		password: "",
	};

	handleSubmit = (e: any) => {
		e.preventDefault();
		this.props.signUp(this.state);
	};

	handleChange = (e: any) => {
		const newState = { [e.target.id]: e.target.value };
		this.setState(newState);
	};

	render() {
		const { authError } = this.props;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						id="name"
						placeholder="your name"
						onChange={this.handleChange}
					></input>
					<br />
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
					<button>SignUp</button>
				</form>
				<div>
					{authError ? (
						<a className={styles.text}>Error: {authError}</a>
					) : null}
				</div>
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
		signUp: (newUser: any) => {
			dispatch(signUp(newUser));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
