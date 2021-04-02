import { connect } from "react-redux";

const ShowArticle = (result: any) => {
	return <div>{result["title"]}</div>;
};

const mapStateToProps = (state: any) => {
	var result = state["ARTICLE_DATA_TO_STORE"]["currentArticleData"][0];
	if (result && result["isOpened"] == true) {
		console.log(result["title"]);
	}
	return result;
};

export default connect(mapStateToProps)(ShowArticle);
