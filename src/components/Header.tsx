import { Link } from "react-router-dom";
import header from "../scss/components/header.module.scss";

function Header() {
	return (
		<div className={header.textStyle}>
			<Link to="/">
				<img
					src="https://i.ibb.co/6Y5KQyz/new-york-times-logo.png"
					alt="logo"
				></img>
			</Link>
			<Link to="/login/">Login - - - - - -</Link>
			<Link to="/signup/">SignUP - - - - - -</Link>
			<Link to="/profile/">Profile</Link>
		</div>
	);
}

export default Header;
