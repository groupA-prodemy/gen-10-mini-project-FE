import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

let responParams = [];

export default function BookForm() {
  const navigate = useNavigate();
  const params = useParams();

  const isEditting = params.bookId;

  const [books, setBooks] = useState([]);
  const [formInput, setFormInput] = useState({
    bookTitle: "",
    authorId: "",
    categoryId: "",
    publisherId: "",
    bookYear: "",
    bookStatus: "",
  });

  function handleInput(event, inputName) {
    const copyFormInput = { ...formInput }
    copyFormInput[inputName] = event.target.value
    setFormInput(copyFormInput)
  }

  async function getBooks() {
    const res = await axios.get(
      "https://be-library-mini-system.herokuapp.com/book/books"
    );
    
    setBooks(res.data);
  }

  async function getFormInput() {
    const res = await axios.get(
      "https://be-library-mini-system.herokuapp.com/book/" +
      params.bookId
    );

    console.log(res.data)
    setFormInput(res.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = JSON.stringify({
      ...formInput,
      bookStatus: Boolean(formInput.bookStatus)
  })
  const targetUrl = "https://be-libray-mini-system.herokuapp.com/book/add-book"
  const method = "POST"
  await fetch(targetUrl, {
      method: method,
      body: payload,
      headers: {
          'Content-Type': 'application/json'
      }
  })
  
    // if (isEditting) {
    //   await axios.put(
    //     "https://be-libray-mini-system.herokuapp.com/book/update/" +
    //     params.bookId,
    //     formInput
    //   );
    // } else {
    //   await axios.post(
    //     "https://be-library-mini-system.herokuapp.com/book/add-book",
    //     formInput

    //   );
    // }

    navigate("/book/list");
  }

  useEffect(() => {
    getBooks();
    if (isEditting) {
      getFormInput();
    }
  }, []);

  return <>

    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Form Buku</h6>
        <Link to="/book/list">
          <button className="btn btn-secondary">Kembali</button>
        </Link>
      </div>

      <div>
        <div className="card-body">
          <form onSubmit={(event) => handleSubmit(event)}>

            <div className="mb-3">
              <label className="form-label">Judul Buku</label>
              <input
                className="form-control"
                type="text"
                value={formInput.bookTitle}
                onChange={(event) => handleInput(event, "bookTitle")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kategori ID</label>
              <input
                className="form-control"
                type="text"
                value={formInput.categoryId}
                onChange={(event) => handleInput(event, "categoryId")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author ID</label>
              <input
                className="form-control"
                type="text"
                value={formInput.authorId}
                onChange={(event) => handleInput(event, "authorId")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Publisher ID</label>
              <input
                className="form-control"
                type="text"
                value={formInput.publisherId}
                onChange={(event) => handleInput(event, "publisherId")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tahun Terbit</label>
              <input
                className="form-control"
                type="text"
                value={formInput.bookYear}
                onChange={(event) => handleInput(event, "bookYear")}
              />
            </div>

              <label className="form-label">Book Status : </label>
              <select onChange={(event) => handleInput(event,"bookStatus")}>
              <option value={true}>Tersedia</option>
              <option value={false}>Tidak Tersedia</option>
              </select>

            <div>
            <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </>
}