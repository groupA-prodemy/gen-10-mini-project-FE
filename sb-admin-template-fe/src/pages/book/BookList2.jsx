import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function BookList2() {
    const [books, setBooks] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredBooks, setFilteredBooks] = useState([])
    const [searchKeywordDebounced] = useDebounce(searchKeyword, 500)

    async function getBookList() {
        const keyword = searchKeyword.length > 0 ? "&q=" + searchKeyword : "";
        try {
            const res = await axios.get(
                "https://be-psm-mini-library-system.herokuapp.com/book/books" + keyword,
            );
            setBooks(data.sort((a, b) => a.bookId - b.bookId));
        } catch (err) {
            alert("There's Something Wrong When Catch The Data")
        }
    }

    function getUserData() {
        const savedDataUser = localStorage.getItem("user")
        if (savedDataUser) {
            return JSON.parse(savedDataUser)
        } else {
            return {}
        }
    }

    function deleteBook(id) {
        axios
            .delete(
                "https://be-psm-mini-library-system.herokuapp.com/book/delete/" + id
            )
            .then(() => {
                getBookList();
            })
            .catch(() => {
                alert(
                    "Delete Failed!!! This Data Was Referenced In UserbookList, Delete Them Before Delete This"
                )
            });
    }

    useEffect(() => {
        getBookList()
    }, [searchKeywordDebounced]);

    useEffect(() => {
        if (searchKeyword.length > 0) {
            const filterResult = books.filter((book) => {
                const a = book.bookTitle
                    .toLowerCase()
                    .include(searchKeyword.toLocaleLowerCase())
                return a
            })
            setFilteredBooks(filterResult)
        } else {
            setFilteredBooks(books)
        }
    }, [searchKeyword, books])

    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Book List
                    </h6>

                    <form className="d-none d-sm-inline-block form-inline navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control bg-md-white-auth-end border-0 small"
                                placeholder="find books"
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

                    <Link to="/book/form">
                        <button className="btn btn-primary">Add Book</button>
                    </Link>

                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="databuku"
                            width="100%"
                            cellSpacing="0">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th>Book's Title</th>
                                    <th>Book's Category</th>
                                    <th>Relese Date</th>
                                    <th>Book's Author</th>
                                    <th>Book's Publisher</th>
                                    <th>Book' Status</th>
                                    {getUserData().roleName !== "Admin" ?
                                        <></> :
                                        <th>Action</th>
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((books, index) => (
                                    <tr>
                                        <td key={books.bookId} scope="row">{index + 1}</td>
                                        <td>{books.bookTitle}</td>
                                        <td>{books.categoryName}</td>
                                        <td>{books.bookYear}</td>
                                        <td>{books.authorName}</td>
                                        <td>{books.publisherName}</td>
                                        <td>{books.bookStatus === true ? "Tersedia" : "Dipinjam"}</td>
                                        {getUserData().roleName !== "Admin" ?
                                            <></> :
                                            <td>
                                                <Link to=
                                                    {"/book/form/" + books.bookId}>
                                                    <button className="btn btn-primary"> Edit </button>
                                                </Link>{" "}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteBook(books.bookId)}

                                                >
                                                    {" "}
                                                    Delete{" "}
                                                </button>
                                            </td>
                                        }

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