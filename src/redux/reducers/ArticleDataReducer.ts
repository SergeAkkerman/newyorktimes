import { ARTICLE_DATA_TO_STORE } from "../ActionTypes";

const initialState = {
	currentArticleData: [],
};

const articleToStore = (state = initialState, action: any) => {
	switch (action.type) {
		case ARTICLE_DATA_TO_STORE: {
			const { currentArticleArray } = action.payload;
			return Object.assign({}, state, {
				currentArticleData: currentArticleArray,
			});
		}
		default:
			return state;
	}
};

export default articleToStore;
