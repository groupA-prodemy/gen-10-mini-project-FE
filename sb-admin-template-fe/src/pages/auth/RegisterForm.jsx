import {useNavigate} from "react-router-dom";
import {useState} from "react";

let responses = []

export default function RegisterForm(){
   const navigate = useNavigate()
    const [formInput, setFormInput] = useState({
        name: '',
        username: '',
        password: '',
        roleId:""
    })


    function handleInput (event, inputName) {
        const copyFormInput = {...formInput}
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function handleSubmit (event) {
        event.preventDefault()

        const payload = JSON.stringify({
            ...formInput,
            roleId: parseInt(formInput.roleId)
        })

        const targetUrl = "https://be-library-mini-system.herokuapp.com/auth/register"

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
                + "\n" + "password: " + responses[responses.length-1].data.password.toString()
                + "\n" + "role Id: " + responses[responses.length-1].data.roleId.toString()
                + "\n \n" + "Please login to Continue"
            )
            navigate('/login')
        }else {
            if(formInput.name !== "" && formInput.username !== "" && formInput.password !== "" && formInput.roleId !== ""){
                const messageArr = responses[responses.length-1].message.toString().split(" ");
                if(messageArr.indexOf("data")>=0 && messageArr.indexOf("exists")>=0){
                    alert(responses[responses.length-1].message.toString())
                }
                else {
                    alert(responses[responses.length-1].message.toString())
                }
            }
            else{
                alert("Form must be filled fully")
            }
        }
    }


    return<>
        <h1>Form Register</h1>

        <br/><br/><br/>

        <form onSubmit={event => handleSubmit(event)}>
            <label>
                Your Name <br/>
                <input
                    type={"text"}
                    value={formInput.name}
                    onChange={event => handleInput(event,"name")}
                />
            </label>

            <br/><br/>

            <label>
                Username <br/>
                <input
                    type={"text"}
                    value={formInput.username}
                    onChange={event => handleInput(event,"username")}
                />
            </label>

            <br/><br/>

            <label>
                Password <br/>
                <input
                    type={"password"}
                    value={formInput.password}
                    onChange={event => handleInput(event,"password")}
                />
            </label>

            <br/><br/>

            <label>
                Role Id <br/>
                <input
                    type={"number"}
                    value={formInput.roleId}
                    onChange={event => handleInput(event,"roleId")}
                />

            </label>

            <br/><br/>

            <button>
                Submit
            </button>
        </form>

    </>
}