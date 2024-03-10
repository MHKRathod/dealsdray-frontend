import { Fragment } from "react";
import "./Dashboard.css";
import { Navbar } from "../../components/Navbar/Navbar";


const Dashboard = () => {
    return(
        <Fragment>
        <Navbar route="/home"/>
        <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome to the Dashboard</p>
    </div>
    </Fragment>
    )
}

export default Dashboard;