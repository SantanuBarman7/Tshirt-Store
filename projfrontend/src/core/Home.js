import React, { useState, useEffect } from 'react'
import "../styles.css"

import {API} from '../backend'
import Base from './Base'
import Card from './card'
import { getProducts } from './helper/coreapicalls'



export default function Home() {
    //console.log("API IS", API)

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts()
        .then(data=> {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        loadAllProduct()
    }, [])


    return (
        <Base title='Variance Ts' description='Style is Yours but Products Ours!'>
            <h1 className='text-white text-center'>All Tshirts</h1>
            <div className='row text-center'>
                <div className='row'>
                    {products.map((product, index) => {
                        return(
                            <div className='col-4 mb-4'>
                                <Card product = {product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}