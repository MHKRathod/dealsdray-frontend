import { Fragment } from "react";
import { AuthSignUp } from "../../components/Auth/signUp";
import { Navbar } from "../../components/Navbar/Navbar";

const SignUp = () => {
    return(
        <Fragment>
        <Navbar route="/signup"/>e
        <AuthSignUp/>
        </Fragment>
    )
}
export default SignUp;