import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {roleArrSideBar, usernameArrSideBar} from "../../partials/Sidebar.jsx";

let firstName;
let userArr = [];
let midName;
let additionalName;
export default function DetailsProfile() {
    const [user, setUser] = useState([])
    const params = useParams()
    const role = roleArrSideBar;
    const uname = usernameArrSideBar;
    let a = "*******"

    async function getUsers() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/users/profile/" + params.username,
            {method: "GET"})
        const data = await res.json();
        const userArrLocal = data.data.name.split(" ")
        for (let x = 0; x < userArrLocal.length; x++) {
            x > 1 ?
                userArr[x] = userArrLocal[x].substring(0, 1)
                :
                userArr[x] = userArrLocal[x];
        }

        firstName = userArr[0]
        midName = userArr[1]
        let triggerArr = []
        for (let x = 0; x < userArrLocal.length; x++) {
            let processNameFront = firstName + " " + midName
            let trigger = data.data.name.replace(processNameFront, "")
            if (x > 1) {
                trigger = trigger.replace(userArrLocal[x], userArr[x])
                trigger.search(userArr[x]) !== -1 ?
                    triggerArr.push(userArr[x])
                    :
                    " "
            } else {
                trigger = trigger
            }
            additionalName = [...triggerArr]
        }
        setUser(data.data);
    }

    function handlingButton() {
        alert("You don't have access to see this account password")
    }

    function back(event) {
        event.preventDefault()
        history.go(-1)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <>
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <div className={"m-0 font-weight-bold text-primary fa fa-arrow-circle-left"}
                     onClick={event => back(event)}>
                    &nbsp;
                    Back
                </div>
                <h6 className="m-0 font-weight-bold text-primary">
                    {
                        uname[uname.length - 1] === user.username ?
                            "Your Profile"
                            :
                            "Profile"
                    }
                </h6>
                <Link to={"/users/" + params.username + "/" + user.id}>
                    <button className="btn btn-primary">
                        Change Profile
                    </button>
                </Link>
            </div>
            <div className="card-body text-center">
                <div className="container profile-page-profile-detail">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-12">
                            <div className="card-profile-detail profile-header-profile-detail">
                                <div className="body-profile-detail">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="profile-image-profile-detail float-md-right"><img
                                                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png"
                                                alt=""/></div>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-12">
                                            <h4 className="m-t-0 m-b-0" key={user.id}>
                                                <strong>
                                                    {firstName}
                                                </strong>
                                                &nbsp;
                                                {midName}
                                                &nbsp;
                                                {additionalName}
                                            </h4>
                                            <h5>{"( ID : " + user.id + " )"}</h5>
                                            <span className="job_post">{user.roleName}</span>
                                            <p>PSM Mini Library</p>
                                            <div
                                                className={"card-button-profile card-button-outline-primary-profile"}>
                                                <h5profile className={"fa fa-user-circle"}>
                                                    &nbsp;
                                                    {user.username}
                                                </h5profile>
                                            </div>
                                            <br/>
                                            <div
                                                className={"card-button-profile card-button-outline-primary-profile"}>
                                                <h5profile className={"fa fa-key"}>
                                                    &nbsp;
                                                    {
                                                        uname[uname.length - 1] === user.username ?
                                                            user.password
                                                            :
                                                            role[role.length - 1] === "Admin" ?
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={handlingButton}>
                                                                    {a}
                                                                </button>
                                                                :
                                                                user.password
                                                    }
                                                </h5profile>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}