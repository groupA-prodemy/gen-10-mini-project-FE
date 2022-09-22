import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function RoleList(){
    const [roles, setRoles] = useState([])

    async function getUsers(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/role/list-role",
            {method:"GET"})
        const data = await res.json();
        setRoles(data);
    }

    function deleteRole (roleId) {
        axios
            .delete("https://be-library-mini-system.herokuapp.com/role/delete/"+roleId)
            .then(() => {
                getUsers()
            })
            .catch(err => {
                console.log(err)
                alert('Ada masalah saat memproses data')
            })
    }

    useEffect(()=>{
        getUsers()
    },[])

    return<>
        <h1>Daftar Role</h1>

        <Link to={"/roles/add"}>Create New Role</Link>

        <br/><br/>

        <table width={"100%"} border={"1"}>
            <thead>
                <tr>
                    <th>Role Id</th>
                    <th>Rolename</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {roles.map(role=>
                <tr key={role.roleId}>
                    <td>{role.roleId}</td>
                    <td>{role.roleName}</td>
                    <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={"/roles/" + role.roleId}>
                            <button>
                                Edit
                            </button>
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={()=>deleteRole(role.roleId)}>Delete</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                </tr>
            )}
            </tbody>
        </table>

    </>
}