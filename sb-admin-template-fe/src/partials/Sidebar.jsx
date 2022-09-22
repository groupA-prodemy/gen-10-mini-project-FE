import {Link, useNavigate} from 'react-router-dom'
import { responses } from "../pages/auth/LoginForm.jsx";

let personArr = []
let usernameArr = []
let userIdArr = []
let roleArr = []
let responsesLogout = []

try {
    let message = responses[responses.length-1].message.toString().split(" ")
    let indicator = 0;
    if(message.indexOf("Admin")>=0){
        indicator+=1;
    }
    if(indicator>0){
        personArr.push(responses[responses.length-1].data.name.toString())
        usernameArr.push(responses[responses.length-1].data.username.toString())
        roleArr.push(responses[responses.length-1].data.roleName.toString())
        userIdArr.push(responses[responses.length-1].data.userId.toString())
        sessionStorage.setItem("name", personArr[personArr.length-1].toString())
        sessionStorage.setItem("uname", usernameArr[usernameArr.length-1].toString())
        sessionStorage.setItem("role", roleArr[roleArr.length-1].toString())
        sessionStorage.setItem("uId", userIdArr[userIdArr.length-1].toString())
    }
}catch (error){
    personArr.push(sessionStorage.getItem("name"))
    usernameArr.push(sessionStorage.getItem("uname"))
    roleArr.push(sessionStorage.getItem("role"))
    userIdArr.push(sessionStorage.getItem("uId"))
}

const menuList = [
    {
        title: 'Dashboard',
        icon: 'fa-file-alt',
        link: "/admin/dashboard"
    },
    {
        title: 'Author List',
        icon: 'fa-user-edit',
        link: ''
    },
    {
        title: 'Book List',
        icon: 'fa-user-edit',
        link: '/book/list'
    },
    {
        title: 'Category List',
        icon: 'fa-user-edit',
        link: ''
    },
    {
        title: 'Publisher List',
        icon: 'fa-user-edit',
        link: ''
    },
    {
        title: 'User List',
        icon: 'fa-user-edit',
        link: "/users"
    },
    {
        title: 'Role List',
        icon: 'fa-user-edit',
        link: "/roles"
    },
    {
        title: 'User Book List',
        icon: 'fa-user-edit',
        link: ''
    },
    {
        title: 'Form Register',
        icon: 'fa-user-edit',
        link: '/register'
    },
    {
        title: 'Profile',
        icon: 'fa-user-edit',
        link: "/users/"+usernameArr[usernameArr.length-1]
    },
]

export default function Sidebar () {

    const navigate = useNavigate()

    const menuLogOut=[
        {
            title: 'Log Out',
            icon: 'fa-user-edit',
        },
    ]

    async function logout(event){
        event.preventDefault();

        const targetUrl = "https://be-library-mini-system.herokuapp.com/auth/logout/"+userIdArr[userIdArr.length-1]

        const method = "POST"

        await fetch(targetUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((re)=>re.json()).then((d)=>responsesLogout.push(d))

        if (responsesLogout[responsesLogout.length-1].status.toString() === "true"){
            alert
            (
                responsesLogout[responsesLogout.length-1].message.toString()
            )
            setTimeout(()=>{navigate("/")}, 5000, navigate("/end") )
        }else {
            responsesLogout[responsesLogout.length-1].message.toString()
        }
    }



	return <>
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-book"></i>
                </div>
                <div className="sidebar-brand-text mx-3">PSM Mini Library</div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}

            {
                roleArr[roleArr.length-1]=== "Admin" ?
                    <>
                        {
                            menuList.map(menu =>
                            <li className="nav-item">
                                <Link className="nav-link" to={menu.link}>
                                    <i className={"fas fa-fw " + menu.icon}></i>
                                    &nbsp;
                                    <span>{menu.title}</span>
                                </Link>
                            </li>
                        )}
                        {
                            menuLogOut.map(logOut =>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={(event)=>logout(event)}>
                                        <i className={"fas fa-fw " + logOut.icon}></i>
                                        &nbsp;
                                        <span>{logOut.title}</span>
                                    </Link>
                                </li>
                            )
                        }

                    </>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/user/dashboard"}>
                                <i className={"fas fa-fw " + menuList[0].icon}></i>
                                &nbsp;
                                <span>{menuList[0].title}</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={menuList[2].link}>
                                <i className={"fas fa-fw " + menuList[2].icon}></i>
                                &nbsp;
                                <span>{menuList[2].title}</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={menuList[6].link}>
                                <i className={"fas fa-fw " + menuList[6].icon}></i>
                                &nbsp;
                                <span>{menuList[6].title}</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={(event)=>logout(event)}>
                                <i className={"fas fa-fw " + menuLogOut[0].icon}></i>
                                &nbsp;
                                <span>{menuLogOut[0].title}</span>
                            </Link>
                        </li>
                    </>

            }

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
	</>
}