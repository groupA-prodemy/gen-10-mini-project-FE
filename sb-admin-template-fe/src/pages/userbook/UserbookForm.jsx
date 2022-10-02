import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserBookForm() {
  const navigate = useNavigate();
  const params = useParams();

  const isEditting = params.userBookId;

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [formInput, setFormInput] = useState({
    startDate: "",
    dueDate: "",
    returnDate: ""
  })

  function handleInput(event, propName) {
    const copyFormInput = { ...formInput };
    copyFormInput[propName] = event.target.value;
    setFormInput
  }

  async function getBooks() {
    const res = await axios.get(
      "https://be-library-mini-system.herokuapp.com/book/books"
    );
    setPublishers(res.data);
  }

  async function getUsers() {
    const res = await axios.get(
      "https://be-library-mini-system.herokuapp.com/users/list-user"
    );
    setPublishers(res.data);
  }

  async function getUserBooks() {
    const res = await fetch("https://be-library-mini-system.herokuapp.com/book/books",
      { method: "GET" })
    const data = await res.json();
    setUserBooks(data);
  }

  async function getFormInput() {
    setFormInput(JSON.parse(params.userBookId))
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isEditting) {
      await axios.put(
        "https://be-library-mini-system.herokuapp.com/userbook/update/" +
        params.userBookId,
        formInput
      );
    } else {
      await axios.post(
        "https://be-library-mini-system.herokuapp.com/userbook/add-userbook",
        formInput
      );
    }
    navigate("/userbook/list");
  }

  useEffect(() => {
    getBooks()
    getUsers()
    getUserBooks()

    if (isEditting) {
      getFormInput()
    }
  }, [])

  return <>
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Form Pengguna Buku</h6>
        <Link to="/userbook/list">
          <button className="btn btn-secondary">Kembali</button>
        </Link>
      </div>

      <div>
        <div className="card-body">
          <form onSubmit={(event) => handleSubmit(event)}>

            <div className="mb-3">
              <label className="form-label">Judul Buku</label>
              <select
                className="form-control"
                value={formInput.bookId}
                onChange={(event) => handleInput(event, "bookId")}
              >
                {books.map(book =>
                  <option
                    value={book.bookId}>
                    {book.bookTitle}
                  </option>
                )}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">username Pengguna</label>
              <select
                className="form-control"
                value={formInput.userId}
                onChange={(event) => handleInput(event, "userId")}
              >
                {users.map(user =>
                  <option
                    value={user.userId}>
                    {user.userName}
                  </option>
                )}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Tanggal Peminjaman</label>
              <input
                className="form-control"
                type="date"
                value={formInput.startDate}
                onChange={(event) => handleInput(event, "startDate")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Batas Peminjaman</label>
              <input
                className="form-control"
                type="date"
                value={formInput.dueDate}
                onChange={(event) => handleInput(event, "dueDate")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tanggal Pengembalian</label>
              <input
                className="form-control"
                type="date"
                value={formInput.returnDate}
                onChange={(event) => handleInput(event, "returnDate")}
              />
            </div>

            <br /> <br />

            <div>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}