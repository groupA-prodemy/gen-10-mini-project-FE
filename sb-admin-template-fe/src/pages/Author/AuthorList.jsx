import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner"

export default function AuthorList() {
	const [dataList, setDataList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getDataList () {
		try {
			setIsLoading(true)
			const res = await axios.get('http://localhost:3000/authors?_embed=articles')
			setDataList(res.data)
		} catch (err) {
			alert('Terjadi kesalahan')
		} finally {
			setIsLoading(false)
		}
	}

	async function deleteData (id) {
		await axios.delete('http://localhost:3000/authors/' + id)
		getDataList()
	}

	useEffect(() => {
		getDataList()
	}, [])

	return <>
		<div className="card shadow mb-4">
			<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
				<h6 className="m-0 font-weight-bold text-primary">Daftar Penulis</h6>

				<Link to="/authors/form">
					<button className="btn btn-primary">
						Tambah Data
					</button>
				</Link>
			</div>
			<div className="card-body">
				{isLoading

				? <div className="d-flex justify-content-center">
					<Spinner />
				</div>

				: <table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nama Penulis</th>
							<th scope="col">Daftar Artikel</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{dataList.map((item, index) =>
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{item.name}</td>
								<td>
									<ul>
										{item.articles.map(article =>
											<li>
												{article.title}
											</li>
										)}
									</ul>
								</td>
								<td>
									<Link to={'/authors/form/' + item.id}>
										<button className="btn btn-primary">Edit</button>
									</Link>
									&nbsp;&nbsp;

									<button
										className="btn btn-danger"
										onClick={() => deleteData(item.id)}>
										Hapus
									</button>
								</td>
							</tr>
						)}
					</tbody>
				</table>}
			</div>
		</div>
	</>
}