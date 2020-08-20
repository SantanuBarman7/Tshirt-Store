import React, { useState, useEffect } from 'react'
import ImageHelper from '../admin/helper/imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/carthelper';


    const Card = ({product, addtoCart = true , removeFromCart =false, 
    setReload = f => f/*same as function(f){return f}*/,
    reload = undefined }) => {
      

      const [redirect, setRedirect] = useState(false)
      const [count, setCount] = useState(product.count)

      const cartitle = product ? product.name : "Product Image"
      const cardescription = product ? product.description : "Product description"
      const cartprice = product ? product.price : "Price"


      const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
      }


      const getARedirect = (redirect) => {
        if(redirect){
          return <Redirect to='/cart' />
        }
      }
        
        const showAddToCart = (addtoCart) => {
            return (
                addtoCart && (
                    <button className='btn btn-dark btn-sm px-4'
                    onClick={addToCart}
                    className="btn btn-block btn-dark mt-2 mb-2 text-white font-weight-bold"
                  >
                    Add to Cart
                  </button>
                )
            )
        }

        const showRemoveFromCart = (removeFromCart) => {
            return(
                removeFromCart && (
                    <button className='btn btn-dark btn-sm px-4'
                    onClick={()=>{
                      removeItemFromCart(product._id)
                      setReload(!reload)
                    }}
                    className="btn btn-block btn-dark mt-2 mb-2 text-white font-weight-bold"
                  >
                    Remove from cart
                  </button>
                )
            )
        }
        
        return (
          <div className="card text-white text-center bg-info border border-success mb-4" >
            <div className="card-header lead">{cartitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
                <ImageHelper product={product} />
              <p className="lead bg-dark font-weight-bold text-wrap">
                {cardescription}
              </p>
        <p className="btn btn-danger rounded  btn-sm px-4">$ {cartprice}</p>
              <div className="row">
                <div className="col-12">
                {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                 {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };

export default Card