import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card';
import './categories.css'
import furnitureimg from '../../images/furniture.jpg'
import cosmeticsimg from '../../images/cosmetics.jpg'
import perfumeimg from '../../images/perfumes.jpeg'
import groceriesimg from '../../images/groceries.jpg'
import { Samplecontext } from '../../App';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

// A seperate categories component to filter products based on categoris page
const Categories = () => {

  const {allProducts,setidofProduct} = useContext(Samplecontext);

  const [Categories, setCategories] = useState([
    {title:'beauty',imageurl:cosmeticsimg},
    {title:'fragrances',imageurl:perfumeimg},
    {title:'furniture',imageurl:furnitureimg},
    {title:'groceries',imageurl:groceriesimg}
  ])

  const [filteredProduct, setfilteredProduct] = useState();

  // Filter products based on selected category
  const selectCategory = (cat)=>{
    setfilteredProduct(allProducts?.filter(product=>product?.category=== cat))
  }

  // update id of the selected product to productsId
  const getId = (id)=>{
  setidofProduct(id);
  }

 return (
  <div className='category-page-container'>
    <h2 className='m-2'>Select a Category</h2>

    {/* -------categories card--------*/}
    <div className='categories-page row'>
      {Categories.map((item,key)=>{
        return(
          <Card 
            key={item.id}
            className='categories-card p-0 m-1' 
            style={{ width: '18rem' }} 
            onClick={()=>selectCategory(item.title)}
           >
           <Card.Img 
             variant="top" 
             src={item?.imageurl} 
             style={{height:'70%',width:'100%'}}
            />
           <Card.Body>
            <Card.Title>{item?.title}</Card.Title>
           </Card.Body>
          </Card>
        )
      })}
    </div>

{/* -------Display filtered Products--------*/}
    <div className='products-page row'>
     {filteredProduct?.map((item)=>{
       return(
        <Card 
          className='product-cards' 
          style={{ width: '20rem' }} 
          onClick={()=>getId(item.id)}
        >
          <Link to={'/details'} className='card-link'>
            <div className='product-img-section'>
             <Card.Img variant="top" className='product-img' src={item?.images[0]} height={'70%'}/>
            </div>
            <Card.Body>
             <Card.Title>{item?.title}</Card.Title>
             <Card.Text>$ {item?.price}</Card.Text>
             <Rating name="half-rating-read" defaultValue={item?.rating} precision={0.5} readOnly />
            </Card.Body>
          </Link>
        </Card>
       )
      })}
     </div>
  </div>
  )
}

export default Categories