function Header(props) {
    return (
        <div>
           <h1>ini bagian header</h1>
           <p>nama saya adalah: {props.name}</p>
        </div>
    );
}

export default Header;