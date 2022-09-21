import {Link, Outlet} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";

export default function UserDashboard(){
    let person = []
    let username = [];

    try {
        let message = responses[responses.length-1].message.toString().split(" ")
        let indicator = 0;
        if(message.indexOf("Visitor")>=0){
            indicator+=1;
        }
        if(indicator>0){
            person.push(responses[responses.length-1].data.name.toString())
            username.push(responses[responses.length-1].data.username.toString())
            sessionStorage.setItem("name", person[person.length-1].toString())
            sessionStorage.setItem("uname", username[person.length-1].toString())
        }
    }catch (error){
        person.push(sessionStorage.getItem("name"))
        username.push(sessionStorage.getItem("uname"))
    }

    return<>
        <div className={"app"}>
            <nav>
                <Link to={"/book/list"}>
                    Daftar Buku
                </Link>
                &nbsp; &nbsp;
                <Link to={"/users/"+username[username.length-1]}>
                    Profile
                </Link>

            </nav>

            <h3>Welcome in you Dashboard as {person[person.length-1]}</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}