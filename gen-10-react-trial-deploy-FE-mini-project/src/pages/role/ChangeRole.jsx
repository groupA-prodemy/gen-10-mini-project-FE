import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {roleArr, usernameArr} from "../dashbord/AdminDashboard.jsx";

let responses = []
let roleArray= []
export default function ChangeRole(){
    const navigate = useNavigate()
    const [formInput, setFormInput] = useState({
        roleName:""
    })
    const [roleList, setRoleList] = useState([])
    const params = useParams();

    function handleInput (event, inputName) {
        const copyFormInput = {...formInput}
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function getRoleList(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/role/list-role" ,
            {method:"GET"})
        const data = await res.json();
        setRoleList(data);
    }

    function getRoleById(){
        for(let roles of roleList){
            if(roles.roleId.toString() === params.roleId.toString()){
                return roles.roleName;
            }
        }
    }

    function prepareUpdate(roleArray){
        const fillForm = {...roleArray}
        fillForm["roleName"]=getRoleById()
        setFormInput(fillForm)
    }

    async function handleSubmit (event) {
        event.preventDefault()

        const payload = JSON.stringify({
            ...formInput,
            roleId: parseInt(formInput.roleId)
        })

        const targetUrl = "https://be-library-mini-system.herokuapp.com/role/update/" + params.roleId;

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
            navigate('/roles')
        }else {
            if(formInput.roleName !== ""){
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
        getRoleList()
    },[])


    return<>
        <h1>Form Change Role</h1>

        <br/><br/><br/>

        <button onClick={()=>prepareUpdate(roleArray)}>Isi data</button>

        <br/><br/><br/>

        <form onSubmit={event => handleSubmit(event)}>
            <label>
                Role Name <br/>
                <input
                    type={"text"}
                    value={formInput.roleName}
                    onChange={event => handleInput(event,"roleName")}
                />
            </label>

            <br/><br/>

            <button>
                Submit
            </button>
        </form>

    </>
}