import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import  {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'
import {updateCategory, getCategory} from './helper/adminapicall'

const UpdateCategory = ({match}) => {

    const [values, setValues] = useState({
        name: "",
        formdata: ""
    })
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {name, formData} = values

    const {user, token} = isAuthenticated()

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
           //console.log(data)
          if (data.error){
            setError(true)
          }else{
                setError('')
                setValues({...values, name: data.name, formdata: new FormData()})
          }
        })
      }
      
      useEffect(() => {
        preload(match.params.categoryId);
      }, []);




    const goBack = () => {
        return(
            <div className='mt-5'>
                <Link className='btn btn-sm btn-info mb-3' to='/admin/dashboard'>Admin Home</Link>
            </div>
        )
    }

    const handleChange = event => {
        const value = event.target.value
        //formData.set(name,value)
        setValues({...values, name: value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setError('')
        setSuccess(false)

        //backend req 
        updateCategory(match.params.categoryId, user._id, token, {name}, formData)
        .then(data => {
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
                setValues({
                    ...values,
                    name: "",
                    updatedProduct: data.name
                })
            }
        })
    }

    const successMessage = () => {
        if (success) {
        return <h4 className='text-success'>Updated category successfully</h4>
        }
    }

    const warningMessage = () => {
        if (error) {
            return <h4 className='text-success'>Failed to update category</h4>
        }
    }

    const myCategoryForm = () =>(
        <form>
            <div className='form-group'>
                <p className='lead'>Enter the category</p>
                <input className='form-control my-3' autoFocus required type='text'
                 onChange={handleChange} value={name} />
                <button className='btn btn-outline-info' onClick={onSubmit} >update category</button>
            </div>
        </form>
    )



    return (
        <Base title="Create category here" description='Add new Category for Tshirt'
        className='container bg-info p-4'>
            <div className='row bg-white rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory