import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

let responses = []
export default function AddRole() {
    let statusCheckerName = true
    const navigate = useNavigate()
    const [roles, setRoles] = useState([])
    const [formInput, setFormInput] = useState({
        roleName: ""
    })

    async function getUsers() {
        const res = await fetch("https://be-psm-mini-library-system.herokuapp.com/role/list-role",
            {method: "GET"})
        const data = await res.json();
        setRoles(data.sort((a,b)=>a.roleId-b.roleId));
    }

    function roleNameChecker(){
        for(let role of roles){
            if(role.roleName.toLowerCase()===formInput.roleName.toLowerCase()){
                alert("Failed to save data, data was exists")
                statusCheckerName = false
            }
        }
    }



    function handleInput(event, inputName) {
        const copyFormInput = {...formInput}
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const payload = JSON.stringify({
            ...formInput,
            roleId: parseInt(formInput.roleId)
        })

        roleNameChecker()
        if(statusCheckerName === false ){
            statusCheckerName = true
        }else {
            const targetUrl = "https://be-psm-mini-library-system.herokuapp.com/role/save-role"
            const method = "POST"
            const res = await fetch(targetUrl, {
                method: method,
                body: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resp = await res.json()
            responses.push(resp)
            if (responses[responses.length - 1].status === true) {
                alert
                (
                    responses[responses.length - 1].message
                    + "\n" + "role Id: " + responses[responses.length - 1].data.roleId.toString()
                    + "\n" + "role Name: " + responses[responses.length - 1].data.roleName.toString()
                )
                statusCheckerName = true
                navigate('/roles')
            } else {
                statusCheckerName = true
                if (formInput.roleName !== "") {
                    alert(responses[responses.length - 1].message)
                } else {
                    alert("Form must be filled fully")
                }
            }
        }
    }

    function back(event) {
        event.preventDefault()
        history.go(-1)
    }

    useEffect(()=>{
        getUsers()
    },[])

    return <>
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <div className={"m-0 font-weight-bold text-primary fa fa-arrow-circle-left"}
                     onClick={event => back(event)}>
                    &nbsp;
                    Back
                </div>

                <h6 className="m-0 font-weight-bold text-primary">Form Add Role</h6>

                <Link to={"/roles"}>
                    <button className="btn btn-secondary">
                        Kembali
                    </button>
                </Link>
            </div>

            <div className="card-body">

                <form className="w-50" onSubmit={event => handleSubmit(event)}>
                    <div className="form-group mb-4">
                        <label>Role Name</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.roleName}
                            onChange={event => handleInput(event, "roleName")}/>
                    </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}