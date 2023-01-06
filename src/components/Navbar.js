function Navbar(props) {
    return(
        <div>
           <ul>
                <li>
                    <a href="">home</a>
                </li>
           </ul>
           <ul>
                <li>
                    <a href="">{!props.navValue ? 'about' : props.navValue}</a>
                </li>
           </ul>
           <ul>
                <li>
                    <a href="">{props.text}</a>
                </li>
           </ul>
        </div>
    )
}

export default Navbar;