import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function DetailsProfile(){
    const [user, setUser] = useState([])
    const params = useParams()

    async function getUsers(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/users/profile/" + params.username ,
            {method:"GET"})
        const data = await res.json();
        setUser(data.data);
    }

    useEffect(()=>{
        getUsers()
    },[])

    return<>
        <h1>Your Profile</h1>

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
                <td>{user.password}</td>
                <td>{user.roleName}</td>
                </tr>
            </tbody>
        </table>

    </>
}