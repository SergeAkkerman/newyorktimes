import { Route, Switch } from "react-router-dom";

import ShowArticle from "./ShowArticle";
import Articleslist from "./Articleslist";
import signUp from "./SignUpForm";
import LoginForm from "./LoginForm";
import Profile from "./Profile";

const AllRoutes = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Articleslist} />
				<Route path="/post/" component={ShowArticle} />
				<Route path="/signup/" component={signUp} />
				<Route path="/login/" component={LoginForm} />
				<Route path="/profile/" component={Profile} />
			</Switch>
		</div>
	);
};

export default AllRoutes;
