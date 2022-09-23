import {Outlet} from "react-router-dom";

export default function EndPage(){
    let count = 5;
    setInterval(function() {
        count--;
        if(count > 0) {
            document.getElementById("time").innerHTML = count;
        }
    }, 1000);

    return<>
        <div className={"app"}>
            <h1>Thanks for Visit</h1>
            <button className={"btn btn-facebook"} id={"time"}>{count}</button>
            <Outlet/>
        </div>
    </>
}