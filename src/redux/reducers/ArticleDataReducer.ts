// Save image, title, description etc of showed article to Store

import { ARTICLE_DATA_TO_STORE } from "../ActionTypes";

interface Iaction {
	payload: {
		currentArticleArray: Array<any>;
	};
	type: string;
}

const initialState = {
	currentArticleData: [],
};

const articleToStore = (state = initialState, action: Iaction) => {
	switch (action.type) {
		case ARTICLE_DATA_TO_STORE: {
			const { currentArticleArray } = action.payload;
			return { ...state, currentArticleData: currentArticleArray };
		}
		default:
			return state;
	}
};

export default articleToStore;
