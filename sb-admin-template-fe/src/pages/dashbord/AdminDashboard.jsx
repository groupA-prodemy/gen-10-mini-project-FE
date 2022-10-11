import {Link, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function AdminDashboard() {
    const [statusUserById, setStatusUserById] = useState()
    const navigate =  useNavigate()

    function getUserData() {
        const savedDataUser = localStorage.getItem("user")
        if (savedDataUser) {
            return JSON.parse(savedDataUser)
        } else {
            return {}
        }
    }

    async function getUsersById() {
        try {

            const res = await fetch("https://be-psm-mini-library-system.herokuapp.com/users/profile/byid/"+getUserData().userId,
                {method: "GET"})
            const data = await res.json();
            setStatusUserById(data.status)
        }catch (err){
            console.log(err)
            alert("There's something wrong. please try again")
        }
    }

    function userDeleteScenario(){
        if(statusUserById === true){
            console.log("ya data masuk")
        }else{
            localStorage.clear()
            navigate("/home")
        }
    }

    useEffect(()=>{
        getUsersById()
    },[])

    return <>
        <div className={"app"}>
            <h3>
                Welcome in you Dashboard as {getUserData().roleName}, Hai {getUserData().name}
            </h3>
            <br/>
            <Outlet/>
        </div>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/register"}>
                                        Form Register
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-list-alt fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/userbook/list"}>
                                        User Book List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-user-edit fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/book/list"}>
                                        Book List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-book fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/users"}>
                                        User List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/category/list"}>
                                        Category List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-folder fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/author"}>
                                        Author
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-tag fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/publisher"}>
                                        Publisher
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-id-card fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link onClick={()=>userDeleteScenario()} to={"/roles"}>
                                        Role List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-mars-double fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}