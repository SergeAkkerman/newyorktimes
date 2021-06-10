import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { ArticleDataToStore } from "../redux/Actions";
import ShowArticle from "./ShowArticle";
import styles from "../scss/components/articlesList.module.scss";

interface Props {
	ArticleDataToStore: typeof ArticleDataToStore;
}

interface State {
	allArticles: object;
	article: object;
	path: string;
}

interface Api {
	results: object;
}

interface Article {
	media: any;
	title: string;
	id: string;
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
		};
	}
	getArticlesFromApi() {
		axios
			.get<Api>(
				"https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=mN6Xg33Uh049lVc0uwErmOgdhb4TYBt4"
			)
			.then((res) => {
				const dataResults = res.data.results;
				this.setState({ allArticles: dataResults });
			});
	}

	articlePropsToAction() {
		this.props.ArticleDataToStore(this.state.article);
		console.log(this.state);
	}

	userRedirect() {
		const { history } = this.props;
		const url = this.state.path;
		if (history) history.push("/post/" + url);
	}

	listArticles() {
		const articlesArray = this.state.allArticles as Array<any>;
		return (
			<div className={styles.content}>
				{articlesArray.map(
					(article: Article) =>
						article.media[0] && (
							<div
								onClick={() => {
									this.setState({
										article: article,
										path: article.id,
									});
								}}
								className={styles.block}
								style={{
									backgroundImage:
										"url(" +
										article.media[0]["media-metadata"][1][
											"url"
										] +
										")",
								}}
							>
								<a
									onClick={() => {
										//save article data when user clicks on title
										this.setState({
											article: article,
											path: article.id,
										});
									}}
									className={styles.textAlign}
								>
									{article.title}
								</a>
							</div>
						)
				)}
			</div>
		);
	}

	componentDidMount() {
		this.getArticlesFromApi();
	}

	componentDidUpdate(_prevProps: any, prevState: any) {
		if (prevState.article != this.state.article) {
			this.articlePropsToAction();
			this.userRedirect();
		}
	}

	render() {
		return <div>{this.listArticles()}</div>;
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		ArticleDataToStore: (articleData: any) =>
			dispatch(ArticleDataToStore(articleData)),
	};
};
export default connect(null, mapDispatchToProps)(withRouter(Articleslist));
