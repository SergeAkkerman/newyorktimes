import { ARTICLE_DATA_TO_STORE, articleDataInterface } from "./ActionTypes";

export const ArticleDataToStore = (saveData: any): articleDataInterface => ({
	type: ARTICLE_DATA_TO_STORE,
	payload: {
		currentArticleArray: [saveData],
	},
});
