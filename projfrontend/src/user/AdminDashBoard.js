import React from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from 'react-router-dom'


const AdminDashboard = () => {

    const {user : {name,email,role}
} = isAuthenticated()

const adminLeftSide = () =>{
    return  (
        <div className="card mb-3">
            <h6 className="card-header bg-dark text-white">Admin Navigation</h6>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/catagory" className="nav-link text-success">Create Categories</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/category" className="nav-link text-success">Manage Categories</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/create/product" className="nav-link text-success">Create Products</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/manage/orders" className="nav-link text-success">Manage Orders</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                </li>
            </ul>
        </div>
    )
}

const adminRightSide = () => {
    return ( <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <span className="badge badge-success mr-2">Name:</span> {name}
            </li>
            <li className="list-group-item">
                <span className="badge badge-success mr-2">Email:</span> {email}
            </li>
            <li className="list-group-item">
                <span className="badge badge-danger mr-2">Admin area</span>
            </li>
        </ul>
    </div>
    )
}


    return (
        <Base title="Welcome to admin area" description="Manage all your products here"
        className="container bg-success" >
            <div className="row px-1 py-2">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
    )
}

export default AdminDashboard