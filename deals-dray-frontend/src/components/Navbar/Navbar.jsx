import { Link } from "react-router-dom";
import { Fragment } from "react";
import "./Navbar.css";

export const Navbar = ({ route, username, onLogout }) => {
    return (
        <header className="heading d-flex grow-shrink-basis align-center">
            <div className="heading-title-icon d-flex grow-shrink-basis align-center">
                <img className="icon mr-1" src="/xto10x-2.png" alt="lightbulb"/>
                <h1 className="heading-title">
                    <Link to="/" className="link">
                        {route === "dashboard" || route === "login" ? "Quiz App" : "xto10x"}
                    </Link>
                </h1>
            </div>
            <nav className="navigation">
                <ul className="list-non-bullet">
                    {route !== "login" && username && ( 
                        <Fragment>
                            <li className="list-item-inline">
                                <Link to="/employeeList" className="link">Employee List</Link>
                            </li>
                            <li className="list-item-inline">
                                <Link to="/employee" className="link">Employee Create</Link>
                            </li>
                            <li className="list-item-inline">
                                <Link to="/organization" className="link">Organisation structure</Link>
                            </li>
                        </Fragment>
                    )}
                    
                    {username && (
                        <li className="list-item-inline">
                            <Fragment>
                                <span className="link-cursor">{username}</span>
                                <button className="link-cursor logout-button" onClick={onLogout}>Logout</button>
                            </Fragment>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};
