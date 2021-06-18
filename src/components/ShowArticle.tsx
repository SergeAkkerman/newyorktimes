// Article page

import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styles from "../scss/components/showArticle.module.scss";
import variables from "../scss/helpers/variables.module.scss";

interface Iprops {
	history: {
		push: Function;
	};
	result: {
		media: {
			0: {
				"media-metadata": {
					2: {
						url: { [index: string]: string };
					};
				};
			};
		};
		title: string;
		abstract: string;
		url: string;
	};
	isLoggedIn: boolean;
}

interface Istate {
	articleData: {
		currentArticleData: any;
	};
	userauth: {
		signedIn: boolean;
	};
}

// receive image, title, description from Redux as props and render component
const ShowArticle = (props: Iprops) => {
	// restrict unauthorised users to see detailed description
	const { result, isLoggedIn } = props;
	return isLoggedIn === false ? (
		<Redirect to="/" />
	) : (
		<div
			className={styles.articleBlock}
			style={{
				backgroundImage:
					variables.gradient +
					", url(" +
					result["media"][0]["media-metadata"][2]["url"] +
					")",
			}}
		>
			<div className={styles.text}>
				<h1>{result["title"]}</h1>
				<h2>{result["abstract"]}</h2>
				<div className={styles.buttonsPosition}>
					<button className={styles.buttons}>
						<a href={result["url"]}>Show more...</a>
					</button>
					<button className={styles.buttons}>
						<Link to={{ pathname: "/" }}>Home</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: Istate) => {
	return {
		result: state.articleData.currentArticleData[0],
		isLoggedIn: state.userauth.signedIn,
	};
};

export default connect(mapStateToProps)(ShowArticle);
