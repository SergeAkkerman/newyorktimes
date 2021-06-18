// Sign up page

import React from "react";
import { signUp, InewUser } from "../redux/Actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppDispatch } from "../redux/Store";

import signup from "../scss/components/signup.module.scss";

interface Props {
	signUp: Function;
	signupError: string;
	isLoggedIn: boolean;
}

interface Istate {
	userauth: {
		signupError: string;
		signedIn: boolean;
	};
}

class SignUp extends React.Component<Props> {
	state = {
		avatar:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/113px-React-icon.svg.png",
		name: "",
		email: "",
		password: "",
		fieldError: "",
	};

	// listen for events to ensure user entered all details correctly
	handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const fields = [this.state.name, this.state.email, this.state.password];
		const values = Object.values(fields);
		function tofilter(values: Object) {
			for (var value in values) {
				if (value != null || "") {
					return value;
				}
			}
		}
		const filteredState = values.filter(tofilter);

		// show error message if any fields leaved empty
		if (filteredState.length < 3) {
			this.setState({ fieldError: "Please fill in all fields!" });
		} else {
			this.props.signUp(this.state);
		}
	};

	// send data to component state
	handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const newState = {
			[event.currentTarget.id]: event.currentTarget.value,
		};
		this.setState(newState);
	};

	render() {
		const { signupError, isLoggedIn } = this.props;
		const fieldError = this.state.fieldError;
		return isLoggedIn ? (
			<Redirect to="/profile/" />
		) : (
			<div className={signup.base}>
				<div className={signup.form}>
					<form onSubmit={this.handleSubmit}>
						<div className={signup.labels}>Your name</div>
						<div>
							<input
								className={signup.fields}
								type="text"
								id="name"
								placeholder="your name"
								onChange={this.handleChange}
							></input>
						</div>
						<div className={signup.labels}>Email</div>
						<div>
							<input
								className={signup.fields}
								type="email"
								id="email"
								placeholder="example@gmail.com"
								onChange={this.handleChange}
							></input>
						</div>
						<div className={signup.labels}>Password</div>
						<div>
							<input
								className={signup.fields}
								type="password"
								id="password"
								placeholder="at least 6 characters"
								onChange={this.handleChange}
							></input>
						</div>
						<div>
							<button className={signup.button}>SignUp</button>
						</div>
					</form>
					<div className={signup.error}>
						{/*show message in case of error*/}
						{fieldError ? <a>Error: {fieldError}</a> : null}
						{signupError ? <a>Error: {signupError}</a> : null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: Istate) => {
	return {
		signupError: state.userauth.signupError,
		isLoggedIn: state.userauth.signedIn,
	};
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		signUp: (newUser: InewUser) => {
			dispatch(signUp(newUser));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
