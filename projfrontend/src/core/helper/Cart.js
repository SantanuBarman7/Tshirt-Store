import React, { useState, useEffect } from 'react'
import "../../styles.css"

import {API} from '../../backend'
import Base from '../Base'
import Card from '../card'
import { loadCart } from './carthelper'
import StripeCheckout from '../stripe'




const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect( () => {
        setProducts(loadCart())
    }, [reload])
    
    const loadAllProducts = (products) =>{
        return(
            <div>
                <h1 className='text-center'>Your Cart</h1>
                {products.map((product, index) => (
                    <Card key={index} product= {product} 
                    removeFromCart={true} 
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload} />
                    )
                )}
            </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div>
                <h1>checkout</h1>
            </div>
        )
    }



    return (
        <Base title='Your Cart' description='Check Out!'>
            <div className='row'>
                <div className='col-6'>{products.length > 0 ? loadAllProducts(products) : (<h3>Empty Card</h3>)}</div>
                <div className='col-6'>
                <StripeCheckout
                products = {products}
                setReload = {setReload}
                /></div>
            </div>
        </Base>
    )
}

export default Cart