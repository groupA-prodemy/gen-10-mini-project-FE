import {Outlet} from "react-router-dom";

export default function EndPage() {
    let count = 5;
    setInterval(function () {
        count--;
        if (count > 0) {
            document.getElementById("time").innerHTML = count;
        }
    }, 1000);

    return <>
        <div className="container-auth bg-light-auth">
            <div className="row text-center">
                <div className="col-md-2 col-12"/>
                <div className="col-md-8 col-12">
                    <div className="wrapper-auth bordered-auth bg-md-white-auth d-flex-auth flex-column align-items-between">
                        <div className="form">
                            <div className="h4 font-weight-bold text-center mb-4">Bye-bye</div>
                            <div className={"card-header-end"}>
                                <div className="text-center">
                                    <div className={"app"} id={"home"}>
                                        <h1>Thanks for Visit</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={"card-body-end"}>
                                <div className="text-center">
                                    <button className={"btn btn-facebook"} id={"time"}>{count}</button>
                                </div>
                            </div>
                            <Outlet/>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-12"/>
            </div>
        </div>
    </>
}