import { Link } from "react-router-dom";

function Navbar(props) {
    return(
        <nav>
            <Link to={"/"}>home</Link> | <Link to={"/login"}>login</Link>
        </nav>
    )
}

export default Navbar;