import {Link, Outlet} from "react-router-dom";

export default function UserDashboard(){
    return<>
        <div className={"app"}>
            <nav>
                <Link to={"/book/list"}>
                    Daftar Buku
                </Link>
            </nav>

            <h3>Welcome in you Dashboard as Visitor</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}