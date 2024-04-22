import { Fragment } from "react";
import "./Dashboard.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";


const Dashboard = ({ username, onLogout }) => {
  console.log("username:",username);
  if(!username){
    return <Navigate to="/"/>
  }
    return(
        <Fragment>
        <Navbar route="/dashboard" username={username} onLogout={onLogout}/>
        
        <div className="container">
      <h2>Dashboard</h2>
      <p className="welcome-message">Welcome Admin Panel</p>
    </div>
    </Fragment>
    )
}

export default Dashboard;