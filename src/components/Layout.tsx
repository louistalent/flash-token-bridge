/* import React from 'react'; */
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Layout = (props: any) => {
    const G = useSelector((state: BridgeTypes) => state);
    const L = G.L;

    return (<>
        <header>
            <Link className="title justify" to="/">
                <div>
                    <img src="/flash-logo.png" style={{ width: 50, height: 'auto' }} alt="logo" />
                </div>
                <div className="dis-f">
                    <span className="h3" style={{ marginTop: '-7px' }}>{L['chain']}</span>
                </div>
                {/* <span className="badge">{L['bridge']}</span> */}
            </Link>
        </header>
        <main>
            {props.children}
        </main>


    </>);
}

export default Layout;