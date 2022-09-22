import {Link, Outlet} from "react-router-dom";

export default function Home(){
    return<>
        <div className={"app"}>
            <h1>Welcome in PSM Mini Library System Management</h1>
            <Link to={"/register"}>
                <button>Register</button>
            </Link>

            &nbsp; &nbsp;

            <Link to={"/login"}>
                <button>Login</button>
            </Link>

            <Outlet/>
        </div>
    </>
}