import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../scss/components/showArticle.module.scss";
import variables from "../scss/helpers/variables.module.scss";

const ShowArticle = (result: any) => {
	return (
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

const mapStateToProps = (state: any) => {
	var result = state.articleData.currentArticleData[0];
	return result;
};

export default connect(mapStateToProps)(ShowArticle);
