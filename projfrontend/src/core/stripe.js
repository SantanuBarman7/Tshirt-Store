import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import { Link } from 'react-router-dom'
import StripeCheckoutbutton from 'react-stripe-checkout'
import { API } from '../backend'
import { createOrder } from './helper/orderhelper'


const StripeCheckout = ({products , setReload =f => f, reload = undefined }) => {


    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })


    const token =isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._Id

    const getFinalPrice = () => {
        let amount = 0
        products.map ( p=> {
            amount = amount + p.price
        })
        return amount
    }

    const makePament = token => {
        const body = {
            token,
            products,
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            setReload(!reload)
            cartEmpty()
            loadCart()
            //call further methods
            const {status} = response
            console.log("STATUS:", response);
        })
        .catch(error => console.log(error))
    }


    const showStripeButton  = () => {
        return isAuthenticated() ? (
            <StripeCheckoutbutton stripeKey="pk_test_51HCPRjLlmOhjHTc8QOIGInb6lfMA9mSVQwiH53Ht0xYKqaru6oYoaKS2BmwKF97hN043bQgVnrT7jAg0sxyOswKg00DB7CtR1V" 
            token={makePament}
            amount={getFinalPrice() * 100}
            name="BUY"
            shippingAddress
            billingAddress
            >
            <button className='btn btn-success text-white m-5'>pay with stripe</button>
            </StripeCheckoutbutton>
        ) : (
            <Link  to='/signin'>
                <button className='btn btn-warning'>Signin</button>
            </Link>
        )
    }
    

    

    return(
        <div>
            <h3 className='text-white text-center p-4'>stripe Checkout: {getFinalPrice()}
            <div className = 'text-center'>{showStripeButton()}</div>
            </h3>
        </div>
    )
}

export default StripeCheckout

