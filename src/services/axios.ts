// Service for http requests

import axios from "axios";

interface Api {
	results: [];
}

const getArticlesFromApi = (props: string) => {
	return axios.get<Api>(props).then((res) => {
		return res;
	});
};

export default getArticlesFromApi;
