import React from "react";
import axios from "axios";

const api = axios.create({
	baseURL:
		"https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=mN6Xg33Uh049lVc0uwErmOgdhb4TYBt4",
});

interface Props {}
interface State {}
interface Apis {
	baseURL: string;
}

class Articleslist<Props, State> extends React.Component {
	state = {
		articles: [],
	};

	constructor(props: Props) {
		super(props);
		this.getArticlesFromApi = this.getArticlesFromApi.bind(this);
	}

	getArticlesFromApi() {
		api.get<Apis>().then((res) => {
			this.setState({ articles: res.data.results });
		});
	}

	componentDidMount() {}

	render() {
		return <div></div>;
	}
}

export default Articleslist;
