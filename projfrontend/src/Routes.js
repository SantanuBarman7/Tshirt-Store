import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from "./auth/helper/PrivateRoutes"
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategory from './admin/ManageCategory'
import AddProduct from './admin/AddProduct'
import ManageProduct from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/helper/Cart'



const Routes=() => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/cart' exact component={Cart} />
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard} ></PrivateRoute>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} ></AdminRoute>
                <AdminRoute path='/admin/create/catagory' exact component={AddCategory} ></AdminRoute>
                <AdminRoute path='/admin/category' exact component={ManageCategory} ></AdminRoute>
                <AdminRoute path='/admin/create/product' exact component={AddProduct}></AdminRoute>
                <AdminRoute path='/admin/products' exact component={ManageProduct}></AdminRoute>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}></AdminRoute>
                <AdminRoute path='/admin/category/update/:categoryId' exact component={UpdateCategory}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes