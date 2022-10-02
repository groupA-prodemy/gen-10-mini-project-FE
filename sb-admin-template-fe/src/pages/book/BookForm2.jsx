import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function BookForm2() {
    const navigate = useNavigate()
    const params = useParams()

    const isEditting = params.bookId

    const [authors, setAuthors] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [formInput, setFormInput] = useState({
        bookTitle: "",
        bookYear: "",
    });

    function handleInput(event, inputName) {
        const copyFormInput = { ...formInput }
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const payload = JSON.stringify({
            ...formInput,
            bookStatus: Boolean(formInput.bookId),
            atuhorId: parseInt(formInput.atuhorId),
            categoryId: parseInt(formInput.categoryId),
            publisherId: parseInt(formInput.publisherId)
        })

        const targetUrl = isEditting
            ? "https://be-library-mini-system.herokuapp.com/book/update/" + params.bookId
            : "https://be-library-mini-system.herokuapp.com/book/add-book"
        const method = isEditting ? "PUT" : "POST"

        await fetch(targetUrl, {
            method: method,
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate("/books")
    }

    async function getBookDetail() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/book/" + params.bookId)
        const data = await res.json()
        setFormInput(data)
    }

    async function getBookList() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/book/books",
            { method: "GET" })
        const data = await res.json();
        setBook(data);
    }

    async function getCategoryList() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/category/list",
            { method: "GET" })
        const data = await res.json();
        setCategorys(data);
    }
    async function getAuthorList() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/author/all",
            { method: "GET" })
        const data = await res.json();
        setAuthors(data);
    }
    async function getPublisherList() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/publisher/list",
            { method: "GET" })
        const data = await res.json();
        setPublishers(data);
    }

    useEffect(() => {
        if (isEditting) {
            get
        }
    })
}