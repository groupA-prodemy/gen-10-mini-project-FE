import { Link } from 'react-router-dom'

const menuList = [
    {
        title: 'Artikel',
        icon: 'fa-file-alt',
        link: '/articles'
    },
    {
        title: 'Penulis',
        icon: 'fa-user-edit',
        link: '/authors'
    },
]

export default function Sidebar () {
	return <>
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-book"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Perpus</div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}

            {menuList.map(menu =>
                <li className="nav-item">
                    <Link className="nav-link" to={menu.link}>
                        <i className={"fas fa-fw " + menu.icon}></i>
                        &nbsp;
                        <span>{menu.title}</span>
                    </Link>
                </li>
            )}


            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
	</>
}