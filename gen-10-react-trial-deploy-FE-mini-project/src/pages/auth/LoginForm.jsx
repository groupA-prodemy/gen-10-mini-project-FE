import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function LoginForm() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

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

        const targetUrl = "https://app-perpus-psql.herokuapp.com/auth/login"

        const method = "POST"

        await fetch(targetUrl, {
            method: method,
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let indicator = 0;
        for (let j in users){
            if(users[j].username === formInput.username){
                if(users[j].password === formInput.password)  {
                    alert("Login Succeeded")
                    if(users[j].roleName === "Visitor"){
                        navigate("/user/dashboard")
                    }

                    break;
                }
                else {
                    alert("Wrong Password!!!")
                    break;
                }
            }else{
                indicator+=1;
            }
        }
        console.log(indicator)
        if(indicator === users.length){
            alert("Your account wasn't exists")
        }

    }

    async function getListUser() {
        const res = await axios.get('https://app-perpus-psql.herokuapp.com/users/list-user')
        setUsers(res.data)
    }

    useEffect(() => {
        getListUser()
    }, [])


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

            <Link to={"/register"}>
                <button>Register</button>
            </Link>

        </form>

    </>
}