import { ARTICLE_DATA_TO_STORE } from "../ActionTypes";

const initialState = {
	currentArticleData: [],
	articleIds: [],
};

const articleToStore = (state = initialState, action: any) => {
	switch (action.type) {
		case ARTICLE_DATA_TO_STORE: {
			const { currentArticleArray } = action.payload;
			return {
				...state,
				currentArticleData: [
					...state.currentArticleData,
					currentArticleArray,
				],
				articleIds: [...state.articleIds, currentArticleArray[0]["id"]],
			};
		}
		default:
			return state;
	}
};

export default articleToStore;
