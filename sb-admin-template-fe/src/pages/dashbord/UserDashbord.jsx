import {Link, Outlet, useNavigate} from "react-router-dom";
import {responses} from "../auth/LoginForm.jsx";

export let person = []
export let username = [];
export let roleArr = []
export default function UserDashboard() {
    let userIdArr = [];
    let responsesLogout = [];
    const navigate = useNavigate();

    try {
        let message = responses[responses.length - 1].message.toString().split(" ")
        let indicator = 0;
        if (message.indexOf("Admin") <= 0) {
            indicator += 1;
        }
        if (indicator > 0) {
            person.push(responses[responses.length - 1].data.name.toString())
            username.push(responses[responses.length - 1].data.username.toString())
            userIdArr.push(responses[responses.length - 1].data.userId.toString())
            roleArr.push(responses[responses.length - 1].data.roleName.toString())
            localStorage.setItem("name", person[person.length - 1].toString())
            localStorage.setItem("uname", username[person.length - 1].toString())
            localStorage.setItem("uId", userIdArr[userIdArr.length - 1].toString())
            localStorage.setItem("role", roleArr[roleArr.length - 1].toString())
        }
    } catch (error) {
        person.push(localStorage.getItem("name"))
        username.push(localStorage.getItem("uname"))
        userIdArr.push(localStorage.getItem("uId"))
        roleArr.push(localStorage.getItem("role"))
    }

    async function logout(event) {

        const targetUrl = "https://be-psm-mini-library-system.herokuapp.com/auth/logout/" + userIdArr[userIdArr.length - 1]
        const method = "POST"
        await fetch(targetUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((re) => re.json()).then((d) => responsesLogout.push(d))
        if (responsesLogout[responsesLogout.length - 1].status.toString() === "true") {
            alert
            (
                responsesLogout[responsesLogout.length - 1].message.toString()
            )

            setTimeout(() => {
                navigate("/")
                location.reload()
            }, 3000, navigate("/end"))
        } else {
            responsesLogout[responsesLogout.length - 1].message.toString()
        }
    }

    return <>
        <div className={"app"}>
            <nav>
                <Link to={"/book/list"}>
                    Book List
                </Link>
                &nbsp; &nbsp;
                <Link to={"/users/" + username[username.length - 1]}>
                    Profile
                </Link>
                &nbsp; &nbsp;
                <button className={"btn btn-danger"} onClick={(event) => {
                    localStorage.clear()
                    logout(event).then(r => r)
                }}
                >
                    Logout
                </button>
            </nav>
            <h3>
                Welcome in your Dashboard as {roleArr[roleArr.length - 1]}, Hai {person[person.length - 1]}
            </h3>
            <br/>
            <Outlet/>
        </div>
    </>
}