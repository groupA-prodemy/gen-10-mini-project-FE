import {Link, Outlet} from "react-router-dom";

export default function EndPage(){
    return<>
        <div className={"app"}>
            <h1>Thanks for Visit</h1>
            <Outlet/>
        </div>
    </>
}