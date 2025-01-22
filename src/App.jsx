import { createContext, useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './Components/Details/Details';
import Categories from './Components/Categories/Categories';
import axios from 'axios'

const Samplecontext = createContext(); //create context for sharing global states accross components

// App component is the main component of the react app provides with routing and context passing 
function App() {

  // states to manage global data
  const [allProducts, setallProducts] = useState([]);
  const [searchItem, setsearchItem] = useState('');
  const [idofProduct, setidofProduct] = useState('');
  const [searchFilter, setsearchFilter] = useState([]);
  const [showBackbtn, setshowBackbtn] = useState(false);

  // Api fetching using axios while loading this page
      useEffect(() => {
          axios.get('https://dummyjson.com/products').then((response)=>{
          setallProducts(response?.data?.products);
          setsearchFilter(response?.data?.products)
          
          })
      }, []);

  return (
  <div className="App">

    {/* pass global states using contextprovider */}
     <Samplecontext.Provider 
        value={{
          allProducts,
          setallProducts,
          searchItem,
          setsearchItem,
          idofProduct,
          setidofProduct,
          searchFilter,
          setsearchFilter,
          showBackbtn,
          setshowBackbtn
        }}
      >

      {/* Route to different components using react router dom */}
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/categories' element={<Categories/>}/>
       </Routes>
      </BrowserRouter>

    </Samplecontext.Provider>
  </div>
  );
}

export default App;
export {Samplecontext}
