import {useEffect, useState} from "react";

export default function UserList(){
    const [users, setUsers] = useState([])

    async function getUsers(){
        const res = await fetch("https://app-perpus-psql.herokuapp.com/users/list-user",
            {method:"GET"})
        const data = await res.json();
        setUsers(data);
    }

    useEffect(()=>{
        getUsers()
    },[])

    return<>
        <h1>Daftar User</h1>

        <br/><br/>

        <table width={"100%"} border={"1"}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Rolename</th>
                </tr>
            </thead>
            <tbody>
            {users.map(user=>
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.roleName}</td>
                </tr>
            )}
            </tbody>
        </table>

    </>
}