import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ArticleForm () {
	const navigate = useNavigate()
	const params = useParams()

	const isEditing = params.id

	const [authors, setAuthors] = useState([])
	const [formInput, setFormInput] = useState({
		title: '',
		publish_date: '',
		authorId: ''
	})

	function handleInput (evt, propName) {
		const copyFormInput = {...formInput}
		copyFormInput[propName] = evt.target.value
		setFormInput(copyFormInput)
	}

	async function getAuthors () {
		const res = await axios.get('http://localhost:3000/authors')
		setAuthors(res.data)
	}

	async function getFormInput () {
		const res = await axios.get('http://localhost:3000/articles/' + params.id)
		setFormInput(res.data)
	}

	async function submitData (evt) {
		evt.preventDefault()

		if (isEditing) {
			await axios.put('http://localhost:3000/articles/' + params.id, formInput)
		} else {
			await axios.post('http://localhost:3000/articles', formInput)
		}

		navigate('/articles')
	}

	useEffect(() => {
		getAuthors()
		if (isEditing) {
			getFormInput()
		}
	}, [])

	return <>
		<div className="card shadow mb-4">
			<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
				<h6 className="m-0 font-weight-bold text-primary">Form Artikel</h6>

				<Link to="/articles">
					<button className="btn btn-secondary">
						Kembali
					</button>
				</Link>
			</div>
			<div className="card-body">
				<form className="w-50" onSubmit={submitData}>
					<div className="form-group mb-4">
						<label>Judul Artikel</label>
						<input
							type="text"
							className="form-control"
							required
							value={formInput.title}
							onChange={evt => handleInput(evt, 'title')} />
					</div>

					<div className="form-group mb-4">
						<label>Tanggal Publish</label>
						<input
							type="date"
							className="form-control"
							required
							value={formInput.publish_date}
							onChange={evt => handleInput(evt, 'publish_date')} />
					</div>

					<div className="form-group mb-4">
						<label>Penulis</label>
						<select
							className="form-control"
							required
							value={formInput.authorId}
							onChange={evt => handleInput(evt, 'authorId')} >
							<option value="" disabled></option>
							{authors.map(item =>
								<option value={item.id}>
									{item.name}
								</option>
							)}
						</select>
					</div>

					<button className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	</>
}