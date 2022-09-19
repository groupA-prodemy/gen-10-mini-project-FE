import {Link, Outlet} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";

export default function UserDashboard(){
    let person = []
    function preventBack() { window.history.forward(); }
    setTimeout("preventBack()", 0);
    window.onunload = function () { null };
    try {
        let message = responses[responses.length-1].message.toString().split(" ")
        let indicator = 0;
        if(message.indexOf("Visitor")>=0){
            indicator+=1;
        }
        if(indicator>0){
            person.push(responses[responses.length-1].data.name.toString())
            sessionStorage.setItem("name", person[person.length-1].toString())
        }
    }catch (error){
        person.push(sessionStorage.getItem("name"))
    }

    return<>
        <div className={"app"}>
            <nav>
                <Link to={"/book/list"}>
                    Daftar Buku
                </Link>
            </nav>

            <h3>Welcome in you Dashboard as {person[person.length-1]}</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}