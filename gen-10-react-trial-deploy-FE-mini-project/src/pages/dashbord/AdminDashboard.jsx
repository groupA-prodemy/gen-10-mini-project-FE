import {Link, Outlet} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";
export default function AdminDashboard(){
    let personArr = []
    function preventBack() { window.history.forward(); }
    setTimeout("preventBack()", 0);
    window.onunload = function () { null };
    try {
        let message = responses[responses.length-1].message.toString().split(" ")
        let indicator = 0;
        if(message.indexOf("Admin")>=0){
            indicator+=1;
        }
        if(indicator>0){
            personArr.push(responses[responses.length-1].data.name.toString())
            sessionStorage.setItem("name", personArr[personArr.length-1].toString())
        }
    }catch (error){
        personArr.push(sessionStorage.getItem("name"))
    }

    return<>
        <div className={"app"}>
            <nav>
                <Link to={"/book/list"}>
                    Daftar Buku
                </Link>
                &nbsp; &nbsp;
                <Link to={"/register"}>
                    Form Register
                </Link>
                &nbsp; &nbsp;
                <Link to={"/users"}>
                    Daftar Pengguna
                </Link>
            </nav>

            <h3>Welcome in you Dashboard as Admin, Hai {personArr[personArr.length-1]}</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}