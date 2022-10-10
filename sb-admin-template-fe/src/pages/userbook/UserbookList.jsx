import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function UserBookList() {
    const [userBooks, setUserBooks] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredUserbooks, setFilteredUserbooks] = useState([])
    const [searchKeywordDebounced] = useDebounce(searchKeyword, 500)

    async function getUserBookList() {
        const keyword = searchKeyword.length > 0 ? "&q=" + searchKeyword : ""
        try {
            const res = await axios.get(
                "https://be-psm-mini-library-system.herokuapp.com/userbook/list-userbook" + keyword,
            );

            // console.log(res.data);
            setUserBooks(res.data.sort((a, b) => a.userbookId - b.userbookId));
        } catch (err) {
            alert("There's Something Wrong When Catch The Data")
        }
    }

    function deleteUserBook(userbookId) {
        for (let x = 0; x < userBooks.length; x++) {
            if (userBooks[x].userbookId === userbookId) {
                if (userBooks[x].returnDate === null) {
                    alert("Delete failed!!!\nThis book still borrowed yet")
                } else {
                    axios
                        .delete(
                            "https://be-psm-mini-library-system.herokuapp.com/userbook/delete/" + userbookId
                        )
                        .then(() => {
                            getUserBookList();
                        })
                        .catch((err) => {
                            alert("Delete Failed!!! Data Not Found")
                        });
                }
            }
        }
    }

    useEffect(() => {
        getUserBookList();
    }, [searchKeywordDebounced]);

    useEffect(() => {
        if (searchKeyword.length > 0) {
            const filterResult = userBooks.filter((userbook) => {
                const a = userbook.bookTitle
                    .toLowerCase()
                    .include(searchKeyword.toLocaleLowerCase())
                return a
            })
            setFilteredUserbooks(filterResult)
        } else {
            setFilteredUserbooks(userBooks)
        }
    }, [searchKeyword, userBooks])

    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                        User Book List
                    </h6>

                    <form className="d-none d-sm-inline-block form-inline navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control bg-md-white-auth-end border-0 small"
                                placeholder="find userbooks"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={searchKeyword}
                                onChange={(event) => setSearchKeyword(event.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {getUserData().rolename !== "Admin" ?
                    <></> :
                    <Link to="/userbook/form">
                        <button className="btn btn-primary">Add User Book</button>
                    </Link>
                    }
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="datapenggunabuku"
                            width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th>Book Title</th>
                                    <th>Username</th>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>Return Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUserbooks.map((userBooks, index) => (
                                    <tr>
                                        <td key={userBooks.userbookId} scope="row">
                                            {index + 1}
                                        </td>
                                        <td>{userBooks.bookTitle}</td>
                                        <td>{userBooks.userName}</td>
                                        <td>{userBooks.startDate}</td>
                                        <td>{userBooks.dueDate}</td>
                                        <td>{userBooks.returnDate}</td>
                                        <td>
                                            <Link to=
                                                {"/userbook/form/" + userBooks.userbookId}>
                                                <button className="btn btn-primary"> Edit</button>
                                            </Link>{" "}
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteUserBook(userBooks.userbookId)}>
                                                {" "}
                                                Delete{" "}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}