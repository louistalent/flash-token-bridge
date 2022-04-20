/* import React from 'react'; */
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Layout = (props: any) => {
    const G = useSelector((state: BridgeTypes) => state);
    const L = G.L;

    return (<>
        <header>
            <Link className="title flex middle" to="/">
                <img src="/flash-logo.png" style={{ width: 32, height: 'auto' }} alt="logo" />
                <span className="h3">{L['chain']}</span>
                <span className="badge">{L['bridge']}</span>
            </Link>
        </header>
        <main>
            {props.children}
        </main>


    </>);
}

export default Layout;