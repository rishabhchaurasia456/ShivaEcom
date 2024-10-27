import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/admin/dashboard">Shiva mega mart</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/admin/dashboard">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/mylisting">My Listing</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#">My orders</Link>
                                    </li>
                                </ul>
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default AdminNav