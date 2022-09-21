import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export let responses = [];

export default function LoginForm() {
    const navigate = useNavigate()
    let msg = ""

    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
    })

    function handleInput(event, inputName) {
        const copyFormInput = {...formInput}
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const payload = JSON.stringify({
            ...formInput
        })

        const targetUrl = "https://be-library-mini-system.herokuapp.com/auth/login"

        const method = "POST"

        await fetch(targetUrl, {
            method: method,
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((re)=>re.json()).then((d)=>responses.push(d))

        if (responses[responses.length-1].status.toString() === "true"){
            alert
            (
                responses[responses.length-1].message.toString()
                + "\n" + "name: " + responses[responses.length-1].data.name.toString()
                + "\n" + "username: " + responses[responses.length-1].data.username.toString()
                + "\n" + "role: " + responses[responses.length-1].data.roleName.toString()
            )
            if(responses[responses.length-1].data.roleName.toString() === "Visitor"){
                navigate("/user/dashboard")
            }
            if(responses[responses.length-1].data.roleName.toString() === "Admin"){
                navigate("/admin/dashboard")
            }
        }else {
            if(formInput.username!=="" && formInput.password!==""){
                const messageArr = responses[responses.length-1].message.toString().split(" ");
                if(messageArr.indexOf("Wrong")>=0){
                    alert(responses[responses.length-1].message.toString())
                    msg = responses[responses.length-1].message.toString();
                }
                else{
                    alert(responses[responses.length-1].message.toString())
                }
            }
            else{
                alert("Form must be filled fully")
            }
        }
    }

    let msgArr=msg.split(" ")

    return <>
        <h1>Form Login</h1>

        <br/><br/><br/>

        <form onSubmit={event => handleSubmit(event)}>
            <label>
                Username <br/>
                <input
                    type={"text"}
                    value={formInput.username}
                    onChange={event => handleInput(event, "username")}
                />
            </label>

            <br/><br/>

            <label>
                Password <br/>
                <input
                    type={"password"}
                    value={formInput.password}
                    onChange={event => handleInput(event, "password")}
                />
            </label>

            <br/><br/>

            <button>
                Login
            </button>

            &nbsp; &nbsp;

            <button>Register</button>

        </form>

    </>
}