import {Link, Outlet} from "react-router-dom";

export default function App(){
    return<>
        <div className={"app"}>
            <nav>
                <Link to={"/users"}>
                    Daftar Pengguna
                </Link>
                &nbsp; | &nbsp;
                <Link to={"/register"}>
                    Register
                </Link>
            </nav>

            <br/>

            <Outlet/>

        </div>
    </>
}