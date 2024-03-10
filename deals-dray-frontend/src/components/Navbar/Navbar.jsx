import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Fragment } from "react";  

export const Navbar = ({route}) => {
    return (
        <header className="heading d-flex grow-shrink-basis align-center">
        <div className="heading-title-icon d-flex grow-shrink-basis align-center">
            <img className="icon mr-1" src="/assets/image.png" alt="lightbul"/>
            <h1 className="heading-title">
                {
                    route === "home" || route === "login" ? <Link to="/" className="link" >quiz app</Link> : "Deals Dray"
                }    
            </h1>
        </div>
        <nav className="navigation">
            <ul className="list-non-bullet">
                {
                    route === "home" && (
                        <li className="list-item-inline">
                        <Link to="/" className="link cursor">Home</Link>
                    </li>
                    
                    )
                }
                {
                    route === "result" && (
                        <Fragment>
                                <li className="list-item-inline">
                                    <Link to="/" className="link cursor" >Home</Link>
                                </li>
                                <li className="list-item-inline">
                                    <span className="link cursor" >Logout</span>
                                </li>
                        </Fragment>
                    )
                }
            </ul>
        </nav>
    </header>
    )
}