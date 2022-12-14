import {Link, Outlet, useNavigate} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";

export default function UserDashboard(){
    let person = []
    let username = [];
    let userIdArr = [];
    let responsesLogout = [];
    const navigate = useNavigate();

    try {
        let message = responses[responses.length-1].message.toString().split(" ")
        let indicator = 0;
        if(message.indexOf("Visitor")>=0){
            indicator+=1;
        }
        if(indicator>0){
            person.push(responses[responses.length-1].data.name.toString())
            username.push(responses[responses.length-1].data.username.toString())
            userIdArr.push(responses[responses.length-1].data.userId.toString())
            sessionStorage.setItem("name", person[person.length-1].toString())
            sessionStorage.setItem("uname", username[person.length-1].toString())
            sessionStorage.setItem("uId", userIdArr[userIdArr.length-1].toString())
        }
    }catch (error){
        person.push(sessionStorage.getItem("name"))
        username.push(sessionStorage.getItem("uname"))
        userIdArr.push(sessionStorage.getItem("uId"))
    }

    async function logout(event){
        event.preventDefault()

        const targetUrl = "https://be-library-mini-system.herokuapp.com/auth/logout/"+userIdArr[userIdArr.length-1]

        const method = "POST"

        await fetch(targetUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((re)=>re.json()).then((d)=>responsesLogout.push(d))

        if (responsesLogout[responsesLogout.length-1].status.toString() === "true"){
            alert
            (
                responsesLogout[responsesLogout.length-1].message.toString()
            )

            setTimeout(()=>{navigate("/")}, 5000, navigate("/end") )
        }else {
            responsesLogout[responsesLogout.length-1].message.toString()
        }
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
                &nbsp; &nbsp;
                <button onClick={(event)=>logout(event)}>Logout</button>

            </nav>

            <h3>Welcome in your Dashboard as Visitor, Hai {person[person.length-1]}</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}