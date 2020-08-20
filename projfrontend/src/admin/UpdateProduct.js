import React, { useState , useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getCategories, getProduct, updateProduct } from './helper/adminapicall'
import {isAuthenticated} from '../auth/helper/index'



const UpdateProduct = ({match}) => {

  const {user,token} = isAuthenticated()

    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock: "",
        photo: "",
        category: "",
        categories: [],
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    })
    

    const {name, description, price, stock, category, categories, loading, error, createdProduct, getaRedirect, formData} = values

    const preload = productId => {
      getProduct(productId).then(data => {
        if (data.error){
          setValues({...values, error: data.error})
        }else{
          setValues({
              ...values,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category._id,
              stock: data.stock,
              formData: new FormData(),
          })
          preloadCategories();
        }
      })
    }

    const preloadCategories = () =>{
      getCategories().then(data=>{
        if(data.error){
          setValues({...values, error: data.error})
        }else{
          setValues({
            categories: data, formData: new FormData()
          })
        }
      })
    }
    
    useEffect(() => {
      preload(match.params.productId);
    }, []);

    const onSubmit = (event) => {
      event.preventDefault()
      setValues({...values, error: "", loading: true})
      
      updateProduct(match.params.productId ,user._id, token, formData).then(data=>{
        if(data.error){
          setValues({...values, error: data.error})
        }else{
          setValues({
            ...values,
            name:"",
            description:"",
            price:"",
            stock:"",
            photo:"",
            loading:false,
            createdProduct: data.name
          })
        }
      })
    }

    const successMessage = () => (
      <div className='alert alert-success mt-3'
        style={{display:createdProduct? "" : "none" }}>
          <h4>{createdProduct} updated successfully</h4>
      </div>
    )

    const errorMessage = () => {
      if (error) {
        return (
          <div className='alert alert-success mt-3'
          style={{display:createdProduct? "" : "none" }}>
            <h4>Falied to create {createdProduct}</h4>
          </div>
          )
        }
      }
    
    const handleChange = name => event => {
      const value = name === 'photo' ? event.target.files[0] : event.target.value
      formData.set(name,value)
      setValues({...values, [name]: value})
    }

    const createProductForm = () => (
            <form className='form'>
                <div className="form-group mt-3">
                  <label className="btn btn-block btn-success">
                  <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="image of product"
                  />
                  </label>
                </div>
              <div className="form-group">
                <input
                  onChange={handleChange("name")}
                  name="photo"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                />
              </div>
              <div className="form-group">
                <textarea
                  onChange={handleChange("description")}
                  name="photo"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange("price")}
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                />
              </div>
              <div className="form-group">
                <select
                  onChange={handleChange("category")}
                  className="form-control"
                  placeholder="Category"
                >
                <option>Select</option>
                {categories &&
                  categories.map((cate, index) => (
                  <option key={index} value={cate._id}>{cate.name}</option>
                  ))
                }
                </select>
              </div>
                <div className="form-group">
                <input
                  onChange={handleChange("stock")}
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={stock}
                />
                </div>
            <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
                Update Product
            </button>
            </form>
      );



    return(
        <Base title='Add a Product here' description='Welcome to product creation section'
        className='container bg-info p-4'>
            <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-4'>Admin Home</Link>
            <div className='row bg-dark text-white rounded'>
                <div className='col-md-8 offset-md-2 mb-2'>
                  {successMessage()}
                  {errorMessage()}
                  {createProductForm()} 
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct