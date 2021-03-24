import { connect } from "react-redux";

const TestArticle = ({ result }: any) => {
	return <div>{result}</div>;
};

const mapStateToProps = (state: any) => {
	var result = Object.keys(state).map((key) => {
		return state[key]["currentArticleData"].toString();
	});
	var result2 = Object.keys(state).map((key) => {
		const mappedState = state[key]["currentArticleData"].flatMap(
			(data: any) => {
				//const brr = data[0]["asset_id"];
				//data[0].filter((f: any) => brr.includes(f));
				return data[0];
			}
		);
		return mappedState;
	});
	console.log(result2);

	return { result };
};

export default connect(mapStateToProps)(TestArticle);
