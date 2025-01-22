import React, { useContext, useEffect, useState } from 'react'
import './products.css'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Rating from '@mui/material/Rating';
import { Samplecontext } from '../../App';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import furnitureimg from '../../images/furniture.jpg'
import cosmeticsimg from '../../images/cosmetics.jpg'
import perfumeimg from '../../images/perfumes.jpeg'
import groceriesimg from '../../images/groceries.jpg'
import Button from 'react-bootstrap/Button';

const Products = () => {
 
  // Destructuring context values
  const {
    allProducts,
    searchItem,
    idofProduct,
    setidofProduct,
    setsearchFilter,
    showBackbtn,
    setshowBackbtn
  } = useContext(Samplecontext);

  //local state for sorting 
  const [sortOrder, setSortOrder] = useState('none'); 

  // local state for filtering out category
  const [Categories, setCategories] = useState([
      {title:'beauty',imageurl:cosmeticsimg},
      {title:'fragrances',imageurl:perfumeimg},
      {title:'furniture',imageurl:furnitureimg},
      {title:'groceries',imageurl:groceriesimg}
  ]);
  
  // State to store products filtered by search or category initialized with allProducts.this is used to avoid rerendering issue when updating allProducts in search and filter criterias
  const [filteredProduct, setfilteredProduct] = useState(allProducts);

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 8;  //number of products shown per page

  {/* ======Search Functionality====== */}
  useEffect(() => {
    setshowBackbtn(false); //to hide back button while loading products component

    //if there is no search input show all products
    if(searchItem?.length === 0){
      setsearchFilter(allProducts);
      setfilteredProduct(allProducts);
    }

    //else filter products based on search term
    else if(searchItem?.length > 0){
      const result = allProducts?.filter(
        (item)=>
          item?.title?.toLowerCase().includes(searchItem?.toLowerCase()) ||
          item?.brand?.toLowerCase().includes(searchItem?.toLowerCase())    
        );
       setsearchFilter(result);
       setfilteredProduct(result);
    }
  }, [searchItem,allProducts]) //Reruns on changes in searchItem or allProducts

  {/* ======Category Selection====== */}
  const selectCategory = (cat)=>{
    setshowBackbtn(true); //show back button when category is selected
    const filtered = allProducts?.filter(product=>product?.category=== cat)
    setfilteredProduct(filtered);
  }
  
  // Reset to allProducts when back button is clicked
  const resetProducts = () => {
    setfilteredProduct(allProducts); // Reset to all products
  };

  {/* ======Sort-Products====== */}
  const sortProducts = (order) => {
    const sortedProducts = [...allProducts]?.sort((a, b) => {
      if (order === 'lowToHigh') {
        return a?.price - b?.price;
      } else if (order === 'highToLow') {
        return b?.price - a?.price;
      }
      return 0;
    });
    setfilteredProduct(sortedProducts);
  };

  {/* ======Sort-Order Selection====== */}
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order); 
    sortProducts(order); 
  };

  {/* ======Pass Id for Details page====== */}
  const getId = (id)=>{
    setidofProduct(id);
    console.log(idofProduct);  
  }

  {/* ======Pagination Functionality====== */}
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProduct?.slice(startIndex, endIndex);
 
  return (

    <div className='products-page-container'>

      {/* ======Display-Categories====== */}
      <div className="category-container">
        <h2>Select a Category</h2>
        <hr className='m-4'/>
        <div className='categories row'>
          {Categories.map((item,key)=>{
           return(
            <Card 
               key={item.id}
               className='categories-card' 
               style={{ width: '18rem' }}
               onClick={()=>selectCategory(item.title)}
             >
              <Card.Img 
                 className='categories-card-img' 
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
      </div>

      <h2 onClick={resetProducts}> Products List</h2>

      {/* ======Sort-Select====== */}
      <Form inline className='sort-select'>
        <Form.Select 
          as="select" 
          value={sortOrder} 
          onChange={handleSortChange} 
          className='select-control' 
          style={{textAlign:'center',fontWeight:'bold'}}
        >
           <option value="none">Sort by price  </option>
           <option value="lowToHigh">Low to High</option>
           <option value="highToLow">High to Low</option>
        </Form.Select>
      </Form>

     {/* ======Display-Products====== */}
     <div className='products-page row'>
      {paginatedProducts?.map((item,key)=>{
        return(
         <Card 
           className='product-cards' 
           style={{ width: '20rem' }} 
           onClick={()=>getId(item.id)} 
           key={item.id}
         >
           <Link to={'/details'} className='card-link'>
             <div className='product-img-section'>
              <Card.Img className='product-img' variant="top" src={item?.images[0]} />
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

     {/* ====== Back to All Products Button ====== */}
     {showBackbtn === true ? <Button className='back-btn' onClick={resetProducts}>Back to All Products</Button> : ''}

     {/* ====== Pagination Controls ====== */}
     <div className='pagination'>
       <Pagination 
         count={Math.ceil(filteredProduct?.length / itemsPerPage)} 
         page={currentPage} 
         onChange={handlePageChange}  
       />
     </div>
    </div>
  )
}

export default Products