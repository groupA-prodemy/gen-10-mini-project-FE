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
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Your Profile</h6>

                <Link to={"/users/"+params.username+"/"+user.id}>
                    <button className="btn btn-primary">
                        Change Profile
                    </button>
                </Link>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Role</th>
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={handlingButton}>
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
            </div>
        </div>
    </>
}