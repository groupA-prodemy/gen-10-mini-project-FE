import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AuthorForm () {
	const navigate = useNavigate()
	const params = useParams()

	const isEditing = params.id

	const [authors, setAuthors] = useState([])
	const [formInput, setFormInput] = useState({
		name: ''
	})

	function handleInput (evt, propName) {
		const copyFormInput = {...formInput}
		copyFormInput[propName] = evt.target.value
		setFormInput(copyFormInput)
	}

	async function getFormInput () {
		const res = await axios.get('http://localhost:3000/authors/' + params.id)
		setFormInput(res.data)
	}

	async function submitData (evt) {
		evt.preventDefault()

		if (isEditing) {
			await axios.put('http://localhost:3000/authors/' + params.id, formInput)
		} else {
			await axios.post('http://localhost:3000/authors', formInput)
		}

		navigate('/authors')
	}

	useEffect(() => {
		if (isEditing) {
			getFormInput()
		}
	}, [])

	return <>
		<div className="card shadow mb-4">
			<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
				<h6 className="m-0 font-weight-bold text-primary">Form Penulis</h6>

				<Link to="/authors">
					<button className="btn btn-secondary">
						Kembali
					</button>
				</Link>
			</div>
			<div className="card-body">
				<form className="w-50" onSubmit={submitData}>
					<div className="form-group mb-4">
						<label>Nama Penulis</label>
						<input
							type="text"
							className="form-control"
							required
							value={formInput.name}
							onChange={evt => handleInput(evt, 'name')} />
					</div>

					<button className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	</>
}