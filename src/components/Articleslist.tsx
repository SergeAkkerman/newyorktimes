import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import { ArticleDataToStore } from "../redux/Actions";
import ShowArticle from "../ShowArticle";

interface Props {
	ArticleDataToStore: typeof ArticleDataToStore;
}

interface State {
	articles: object;
}

interface Apis {
	results: object;
}

interface Article {
	media: any;
	title: string;
	id: number;
}

class Articleslist extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			articles: [],
		};
		this.getArticlesFromApi = this.getArticlesFromApi.bind(this);
		this.listArticles = this.listArticles.bind(this);
		this.articlePropsToAction = this.articlePropsToAction.bind(this);
		this.listArticlesReturn = this.listArticlesReturn.bind(this);
	}

	getArticlesFromApi() {
		axios
			.get<Apis>(
				"https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=mN6Xg33Uh049lVc0uwErmOgdhb4TYBt4"
			)
			.then((res) => {
				const dataResults = res.data.results;
				this.setState({ articles: dataResults });
			});
	}

	articlePropsToAction(articleData: any) {
		return () => {
			articleData.isOpened = true;
			this.props.ArticleDataToStore(articleData);
		};
	}

	listArticles() {
		const articlesArray = this.state.articles as Array<any>;
		return articlesArray.map((article: Article) =>
			article.media[0] ? (
				<div
					className="ArticleDiv"
					style={{
						backgroundImage:
							"url(" +
							article.media[0]["media-metadata"][2]["url"] +
							")",
					}}
					key={article.title}
				>
					<div className="textAlign">
						<a onClick={this.articlePropsToAction(article)}>
							<Link to={{ pathname: "/post/" + article.id }}>
								{article.title}
							</Link>
						</a>
					</div>
				</div>
			) : (
				console.log("error")
			)
		);
	}

	listArticlesReturn() {
		return <div>{this.listArticles()}</div>;
	}

	componentDidMount() {
		this.getArticlesFromApi();
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={this.listArticlesReturn} />
					<Route path="/post/" component={ShowArticle} />
				</Switch>
			</div>
		);
	}
}

export default connect(null, { ArticleDataToStore })(Articleslist);
