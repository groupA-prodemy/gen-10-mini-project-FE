import {Link, Outlet} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";
export let personArr = []
export let usernameArr = []
export let roleArr = []
export default function AdminDashboard(){

    try {
        let message = responses[responses.length-1].message.toString().split(" ")
        let indicator = 0;
        if(message.indexOf("Admin")>=0){
            indicator+=1;
        }
        if(indicator>0){
            personArr.push(responses[responses.length-1].data.name.toString())
            usernameArr.push(responses[responses.length-1].data.username.toString())
            roleArr.push(responses[responses.length-1].data.roleName.toString())
            sessionStorage.setItem("name", personArr[personArr.length-1].toString())
            sessionStorage.setItem("uname", usernameArr[usernameArr.length-1].toString())
            sessionStorage.setItem("role", roleArr[roleArr.length-1].toString())
        }
    }catch (error){
        personArr.push(sessionStorage.getItem("name"))
        usernameArr.push(sessionStorage.getItem("uname"))
        roleArr.push(sessionStorage.getItem("role"))
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
                &nbsp; &nbsp;
                <Link to={"/users/"+usernameArr[usernameArr.length-1]}>
                    Profile
                </Link>
            </nav>

            <h3>Welcome in you Dashboard as Admin, Hai {personArr[personArr.length-1]}</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}