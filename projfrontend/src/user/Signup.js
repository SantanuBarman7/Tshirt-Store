import React, {useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {signup} from '../auth/helper'
import "../styles.css"

const Signup = ()=> {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    //destructure of values in useState
    const {name,email,password,error,success}=values;

    const handleChange = name => event=> { //name changes depend on passed value from form
        setValues({...values, error: false, [name]: event.target.value}) 
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password}) //these are from destructured values  
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success: false})
            }else{
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }
        })                                 //signup from auth/index.js
        .catch(console.log("Error in signup"))
    }
    
    
    
    const signUpForm =()=>{
        return(
            <div>
            <div className='row'>
                <div className='col-4 offset-sm-4 text-left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Name</label>
                            <input className='form-control' onChange={handleChange('name')} type='text' value={name} />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input className='form-control' onChange={handleChange('email')} type='email' value={email}/>
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input className='form-control' onChange={handleChange('password')} type='password' value={password}/>
                        </div>
                        <button className='btn btn-success btn-block' onClick={onSubmit}>Signup</button>
                    </form>
                </div>
            </div>
            </div>
        )
    }

    const successMessage = () => {
        return(
        <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
        <div className='alert alert-success' style={{display: success ? "" : "none"}}>
            New Account was created successfully please{" "}
            <Link to='/signin'>Login Here</Link>
        </div>
        </div>
        </div>
        )}
       

    const errorMessage = () => {
        return(
        <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
        <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
           {error}
        </div>
        </div>
        </div>
        )}

    return(
        <Base title='Sign up Page' description='A page for user to sign up!'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {/*<p className="text-white text-center">{JSON.stringify(values)}</p>*/}
        </Base>
    )
}

export default Signup