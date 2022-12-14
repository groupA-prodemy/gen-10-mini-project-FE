import {Link, Outlet, useNavigate} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";
export let personArr = []
export let usernameArr = []
export let roleArr = []
export default function AdminDashboard(){
    let userIdArr = []
    let responsesLogout = []
    const navigate = useNavigate()

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
            userIdArr.push(responses[responses.length-1].data.userId.toString())
            sessionStorage.setItem("name", personArr[personArr.length-1].toString())
            sessionStorage.setItem("uname", usernameArr[usernameArr.length-1].toString())
            sessionStorage.setItem("role", roleArr[roleArr.length-1].toString())
            sessionStorage.setItem("uId", userIdArr[userIdArr.length-1].toString())
        }
    }catch (error){
        personArr.push(sessionStorage.getItem("name"))
        usernameArr.push(sessionStorage.getItem("uname"))
        roleArr.push(sessionStorage.getItem("role"))
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
                <Link to={"/register"}>
                    Form Register
                </Link>
                &nbsp; &nbsp;
                <Link to={"/users"}>
                    Daftar Pengguna
                </Link>
                &nbsp; &nbsp;
                <Link to={"/roles"}>
                    Daftar Role
                </Link>
                &nbsp; &nbsp;
                <Link to={"/users/"+usernameArr[usernameArr.length-1]}>
                    Profile
                </Link>
                &nbsp; &nbsp;
                <button onClick={(event)=>logout(event)}>Logout</button>
            </nav>

            <h3>Welcome in you Dashboard as Admin, Hai {personArr[personArr.length-1]}</h3>

            <br/>

            <Outlet/>

        </div>
    </>
}