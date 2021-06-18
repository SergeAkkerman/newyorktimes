// List of top articles using nyt API

import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import ReactModal from "react-modal";

import { ArticleDataToStore } from "../redux/Actions";
import styles from "../scss/components/articlesList.module.scss";
import popup from "../scss/components/popup.module.scss";
import { AppDispatch } from "../redux/Store";
import apiRequest from "../services/axios";

const apiKey =
	"https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=mN6Xg33Uh049lVc0uwErmOgdhb4TYBt4";

interface Props {
	ArticleDataToStore: typeof ArticleDataToStore;
	isLoggedIn: boolean;
}

interface State {
	allArticles: object;
	article: object;
	path: string;
	modalOpened: boolean;
}

interface Article {
	media: Array<any>;
	title: string;
	id: string;
}

interface Istate {
	userauth: {
		signedIn: boolean;
	};
}

class Articleslist extends React.Component<
	RouteComponentProps<{}> & Props,
	State
> {
	constructor(props: RouteComponentProps<{}> & Props) {
		super(props);
		this.state = {
			allArticles: [],
			article: [],
			path: "",
			modalOpened: false,
		};
	}

	// in componentDidMount() we fetch data and save it to the state. listArticles() component receive that data and renders complete list.
	listArticles() {
		const articlesArray = this.state.allArticles as Array<any>;
		return (
			<div className={styles.content}>
				{articlesArray.map(
					(article: Article) =>
						article.media[0] && (
							<div
								key={article.id}
								className={styles.block}
								onClick={(event) => {
									this.handleEvent(event, article);
								}}
								onAuxClick={(event) => {
									this.handleEvent(event, article);
								}}
								onMouseOver={(event) => {
									this.handleEvent(event, article);
								}}
								style={{
									backgroundImage:
										"url(" +
										article.media[0]["media-metadata"][1][
											"url"
										] +
										")",
								}}
							>
								<a className={styles.textAlign}>
									{article.title}
								</a>
							</div>
						)
				)}
			</div>
		);
	}

	//listen for handle changes. When mouse is over article, we just just write current article into the local state.
	//When user clicks left or medium mouse button, we check if he is logged in, and redirect him.

	handleEvent(event: React.MouseEvent<HTMLElement>, article: Article) {
		const { isLoggedIn } = this.props;
		const url = this.state.path;
		if (event.type === "mouseover") {
			this.setState({
				article: article,
				path: article.id,
			});
		} else if (event.type === "click") {
			if (isLoggedIn) {
				this.articlePropsToAction();
				this.props.history.push("/post/" + url);
			} else {
				this.setState({ modalOpened: true });
			}
			//open new tab when user clicks medium button
		} else if (event.type === "auxclick") {
			if (isLoggedIn) {
				this.articlePropsToAction();
				window.open("/post/" + url, "_blank");
			} else {
				this.setState({ modalOpened: true });
			}
		}
	}

	//send props to action creator
	articlePropsToAction() {
		this.props.ArticleDataToStore(this.state.article);
	}

	// modal window that is showed when user is not logged in
	loginModal() {
		ReactModal.setAppElement("div");
		return this.state.modalOpened ? (
			<ReactModal
				className={popup.window}
				isOpen={this.state.modalOpened}
				onRequestClose={() => {
					this.setState({ modalOpened: false });
				}}
			>
				<div className={popup.overlay}>
					<div className={popup.content}>
						<h2>Log in for a detailed view of articles</h2>
						<button className={popup.buttons}>
							<Link to="/login/" style={{ color: "black" }}>
								Log in
							</Link>
						</button>
						<button
							className={popup.buttons}
							onClick={() => {
								this.setState({ modalOpened: false });
							}}
						>
							Close
						</button>
						<button className={popup.buttons}>
							<Link to="/signup/" style={{ color: "black" }}>
								Sign Up
							</Link>
						</button>
					</div>
				</div>
			</ReactModal>
		) : null;
	}

	componentDidMount() {
		// fetch data using external functional component
		apiRequest(apiKey).then((res) => {
			this.setState({ allArticles: res.data.results.slice(0, 8) });
		});
	}

	render() {
		return (
			<div>
				{this.listArticles()}
				{this.loginModal()}
			</div>
		);
	}
}

// get info about if user is logged in or not
const mapStateToProps = (state: Istate) => {
	return {
		isLoggedIn: state.userauth.signedIn,
	};
};

//dispatch action with article data in props
const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		ArticleDataToStore: (articleData: Article) =>
			dispatch(ArticleDataToStore(articleData)),
	};
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Articleslist));

export default connector;
