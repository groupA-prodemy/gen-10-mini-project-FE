import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookList2() {
    const [books, setBooks] = useState([]);

    async function getBookList() {
        try {
            const res = await axios.get(
                "https://be-library-mini-system.herokuapp.com/book/books"
            );
            console.log(res.data);
            setBooks(res.data);
        } catch (err) {
            alert("Terjadi Kesalahan")
        }
    }

    function deleteBook(id) {
        axios
            .delete(
                "https://be-library-mini-system.herokuapp.com/book/delete/" + id
            )
            .then(() => {
                getBookList();
            })
            .catch((err) => {
                console.log(err);
                alert("Ada Error")
            });
    }

    useEffect(() => {
        getBookList();
    }, []);

    return (
        <>
            <div class="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        List Buku
                    </h6>
                    <Link to="/book/form">
                        <button className="btn btn-primary">Tambah Buku</button>
                    </Link>
                </div>

                <div class="card-body">
                    <div class="table-responsive">
                        <table
                            class="table table-bordered"
                            id="databuku"
                            width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th>Judul Buku</th>
                                    <th>Kategori</th>
                                    <th>Tahun Terbit</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                    <th>Status Buku</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((books, index) => (
                                    <tr>
                                        <td key={books.bookId} scope="row">{index + 1}</td>
                                        <td>{books.bookTitle}</td>
                                        <td>{books.categoryName}</td>
                                        <td>{books.bookYear}</td>
                                        <td>{books.authorName}</td>
                                        <td>{books.publisherName}</td>
                                        <td>{books.bookStatus === true ? "Tersedia" : "Dipinjam"}</td>
                                        <td>
                                            <Link to=
                                                // {/* <Link to={"/book/form/" + books.bookId}> */}
                                                {"/book/form/" + JSON.stringify(books)}>
                                                <button className="btn btn-primary"> Edit </button>
                                            </Link>{" "}
                                            <button
                                                onClick={() => deleteBook(books.bookId)}
                                                className="btn btn-danger"
                                            >
                                                {" "}
                                                Hapus{" "}
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