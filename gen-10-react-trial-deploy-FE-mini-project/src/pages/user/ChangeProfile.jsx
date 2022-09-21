import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {roleArr, usernameArr} from "../dashbord/AdminDashboard.jsx";

let responses = []
export default function ChangeProfile(){
    const navigate = useNavigate()
    const [formInput, setFormInput] = useState({
        name: '',
        username: '',
        password: '',
        roleId:""
    })
    const [user, setUser] = useState([])
    const [roleList, setRoleList] = useState([])
    const params = useParams();

    const role=roleArr;
    const uname = usernameArr;


    function handleInput (event, inputName) {
        const copyFormInput = {...formInput}
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function getUsers(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/users/profile/" + params.username ,
            {method:"GET"})
        const data = await res.json();
        setUser(data.data);
    }

    async function getRoleList(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/role/list-role" ,
            {method:"GET"})
        const data = await res.json();
        setRoleList(data);
    }

    function getRoleById(){
        for(let roles of roleList){
            if(roles.roleName === user.roleName){
                return roles.roleId;
            }
        }
    }

    function prepareUpdate(user){
        const fillForm = {...user}
        fillForm["roleId"] = getRoleById()
        setFormInput(fillForm)
    }

    async function handleSubmit (event) {
        event.preventDefault()

        const payload = JSON.stringify({
            ...formInput,
            roleId: parseInt(formInput.roleId)
        })

        const targetUrl = "https://be-library-mini-system.herokuapp.com/users/update/" + params.userId;

        const method = "PUT"

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
            )
            navigate('/users/'+responses[responses.length-1].data.username.toString())
        }else {
            if(formInput.name !== "" && formInput.username !== "" && formInput.password !== "" && formInput.roleId !== ""){
                const messageArr = responses[responses.length-1].message.toString().split(" ");
                if(messageArr.indexOf("Id")>=0 && messageArr.indexOf("found")>=0){
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

    useEffect(()=>{
        getUsers()
    },[])

    useEffect(()=>{
        getRoleList()
    },[])


    return<>
        <h1>Form Change Profile</h1>

        <br/><br/><br/>

        <button onClick={()=>prepareUpdate(user)}>Isi data</button>

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
                {
                    uname[uname.length-1] === user.username ?
                        <input
                            type={"password"}
                            value={formInput.password}
                            onChange={event => handleInput(event,"password")}
                        />
                        :
                        role[role.length-1]=== "Admin" ?
                            <input
                                type={"password"}
                                value={formInput.password}
                                onChange={event => handleInput(event,"password")}
                                disabled
                            />

                            :
                            <input
                                type={"password"}
                                value={formInput.password}
                                onChange={event => handleInput(event,"password")}
                            />
                }
            </label>

            <br/><br/>

            <label>
                Role Id <br/>

                {
                    role[role.length-1]=== "Admin" ?
                        <input
                            type={"number"}
                            value={formInput.roleId}
                            onChange={event => handleInput(event,"roleId")}
                        />

                        :
                        <input
                            type={"number"}
                            value={formInput.roleId}
                            onChange={event => handleInput(event,"roleId")}
                            disabled
                        />
                }


            </label>

            <br/><br/>

            <button>
                Submit
            </button>
        </form>

    </>
}