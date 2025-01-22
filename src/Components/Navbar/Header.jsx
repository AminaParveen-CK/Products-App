import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Samplecontext } from '../../App';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import logo from '../../images/logo.png'
import './header.css'

// Header component to display navbar with logo,links and a search bar
const Header = () => {

  const {setsearchItem} = useContext(Samplecontext); //access global state using context 

  // handle changes in search input and stores the input data to searchItem
  const searching = (e)=>{
    e.preventDefault()
    setsearchItem(e?.target?.value);
  }
 
  return (
        <Navbar expand="lg" className="header  ">
          <Container>

            {/* Logo section */}
            <Navbar.Brand  className='logo'>
               <img src={logo} width="100" height="100" alt="" />
               <span>Products</span>
            </Navbar.Brand>

            {/* Toggle button for smaller screens */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              {/* Navigation links */}
              <Nav className="me-auto">
                <Link to={'/'} className='nav-links'> 
                 <Nav.Link >Home</Nav.Link>
                </Link>
                <Link to={'/categories'} className='nav-links'>
                 <Nav.Link href="#link">Categories</Nav.Link>
                </Link>
              </Nav>

              {/* Search bar */}
              <div className='search-container'>
               <FaSearch className='search-icon'/>
               <Form>
                <Form.Control
                 type="text"
                 placeholder="Search products"
                 className="search-control mr-sm-2"
                 name='search'
                 onChange={searching}
                />
               </Form>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  )
}

export default Header