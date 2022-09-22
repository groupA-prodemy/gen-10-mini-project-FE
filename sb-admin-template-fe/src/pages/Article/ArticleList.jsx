import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner"

export default function ArticleList() {
	const [dataList, setDataList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getDataList () {
		try {
			setIsLoading(true)
			const res = await axios.get('http://localhost:3000/articles?_expand=author')
			setDataList(res.data)
		} catch (err) {
			alert('Terjadi kesalahan')
		} finally {
			setIsLoading(false)
		}
	}

	async function deleteData (id) {
		await axios.delete('http://localhost:3000/articles/' + id)
		getDataList()
	}

	useEffect(() => {
		getDataList()
	}, [])

	return <>
		<div className="card shadow mb-4">
			<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
				<h6 className="m-0 font-weight-bold text-primary">Daftar Artikel</h6>

				<Link to="/articles/form">
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
							<th scope="col">Judul</th>
							<th scope="col">Tanggal Publish</th>
							<th scope="col">Penulis</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{dataList.map((item, index) =>
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{item.title}</td>
								<td>{item.publish_date}</td>
								<td>{item.author.name}</td>
								<td>
									<Link to={'/articles/form/' + item.id}>
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