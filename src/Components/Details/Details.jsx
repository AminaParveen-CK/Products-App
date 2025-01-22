import React, { useContext, useEffect, useState } from 'react'
import { Samplecontext } from '../../App';
import './details.css'
import Rating from '@mui/material/Rating';

// Details Component to display detailed information about selected product

const Details = () => {

  const {allProducts,idofProduct} = useContext(Samplecontext); //access global state using context 
  const [productDetails, setproductDetails] = useState({}); //state to store details of currently selected product

// Filter product based on product id and store to productdetails
  useEffect(() => {

    const filteredProduct = allProducts?.filter((product)=>product?.id === idofProduct)?.[0];
    setproductDetails(filteredProduct)
   
  }, [idofProduct,allProducts])
  console.log(productDetails);
  
  return (
     <div className="detail-page row">

        {/* product image section */}
        <div className="details-img col-lg-6 col-md-6 col-sm-6 col-12">
          <img src={productDetails?.images?.[0]} alt="" />
        </div>

        {/* product information section */}
        <div className="details col-lg-6 col-md-6 col-sm-6 col-12" >
          <h3>{productDetails?.title}</h3>
          <hr />
          <h5>{productDetails?.brand}</h5>
          <h4>$ {productDetails?.price}</h4>
          <p>{productDetails?.description}</p>
          <h3>{productDetails?.discountPercentage} % Discount</h3>
          <Rating name="half-rating-read" value={Number(productDetails?.rating)} precision={0.5} readOnly />
          <h6>{productDetails?.stock} Left</h6>
          <p>{productDetails?.warrantyInformation}</p>
          <h6>{productDetails?.shippingInformation}</h6>
          <p>{productDetails?.returnPolicy}</p>
        </div>
     </div>

  )
}

export default Details