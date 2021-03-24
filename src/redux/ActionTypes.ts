export const ARTICLE_DATA_TO_STORE = "ARTICLE_DATA_TO_STORE";
export interface articleDataInterface {
	type: typeof ARTICLE_DATA_TO_STORE;
	payload: object;
}
