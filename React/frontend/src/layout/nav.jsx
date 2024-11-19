import { NavLink } from "react-router-dom";

function Nav(){
    return(
        <nav class="main-nav">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/pessoa">Pessoas</NavLink></li>
        </ul>
    </nav>
    );
}
export default Nav;
