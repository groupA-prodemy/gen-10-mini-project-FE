import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {roleArr, usernameArr} from "../dashbord/AdminDashboard.jsx";
import prepareUpdate from "./ChangeProfile.jsx";

export default function DetailsProfile(){
    const [user, setUser] = useState([])
    const params = useParams()
    const role=roleArr;
    const uname = usernameArr;
    let a = "*******"

    async function getUsers(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/users/profile/" + params.username ,
            {method:"GET"})
        const data = await res.json();
        setUser(data.data);
    }

    function handlingButton(){
        alert("You don't have access to see this account password")
    }

    useEffect(()=>{
        getUsers()
    },[])

    return<>
        <h1>Your Profile</h1>

        <Link to={"/users/"+params.username+"/"+user.id}>Change Profile</Link>

        <br/><br/>

        <table width={"100%"} border={"1"}>
            <thead>
            <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{
                    uname[uname.length-1] === user.username ?
                        user.password
                        :
                        role[role.length-1]=== "Admin" ?
                            <button onClick={handlingButton}>
                                {a}
                            </button>

                        :
                        user.password
                    }
                </td>
                <td>{user.roleName}</td>
                </tr>
            </tbody>
        </table>

    </>
}