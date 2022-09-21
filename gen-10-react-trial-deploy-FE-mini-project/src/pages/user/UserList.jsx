import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function UserList(){
    const [users, setUsers] = useState([])

    async function getUsers(){
        const res = await fetch("https://be-library-mini-system.herokuapp.com/users/list-user",
            {method:"GET"})
        const data = await res.json();
        setUsers(data);
    }

    function deleteProduct (userId) {
        axios
            .delete("https://be-library-mini-system.herokuapp.com/users/delete/"+userId)
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
        <h1>Daftar User</h1>

        <br/><br/>

        <table width={"100%"} border={"1"}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Rolename</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
            {users.map(user=>
                <tr key={user.userId}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.roleName}</td>
                    <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={"/users/" + user.username}>
                            <button>
                                view
                            </button>
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={()=>deleteProduct(user.userId)}>Delete</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                </tr>
            )}
            </tbody>
        </table>

    </>
}