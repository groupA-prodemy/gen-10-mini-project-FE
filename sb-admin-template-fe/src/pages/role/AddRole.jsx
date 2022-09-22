import {useNavigate} from "react-router-dom";
import {useState} from "react";

let responses = []

export default function AddRole(){
   const navigate = useNavigate()
    const [formInput, setFormInput] = useState({
        roleName:""
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

        const targetUrl = "https://be-library-mini-system.herokuapp.com/role/save-role"

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
                + "\n" + "role Id: " + responses[responses.length-1].data.roleId.toString()
                + "\n" + "role Name: " + responses[responses.length-1].data.roleName.toString()
            )
            navigate('/roles')
        }else {
            if(formInput.roleName !== ""){
                alert(responses[responses.length-1].message.toString())
            }
            else{
                alert("Form must be filled fully")
            }
        }
    }


    return<>
        <h1>Form Add Role</h1>

        <br/><br/><br/>

        <form onSubmit={event => handleSubmit(event)}>

            <label>
                Role Namee <br/>
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