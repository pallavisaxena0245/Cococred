import React from 'react'
import logo from './logo.png';

const Navbar = (props) => {
  return (
    <>
    <nav className="navbar" style={{ backgroundColor: '#004d00' }}>
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: 'white' }}>
            <img 
                src={logo}  // Replace this wixth your logo path or URL
                alt="Logo" 
                style={{ height: '60px', marginRight: '30px' }}  // Adjust height and spacing as needed
            />
            {props.title}
        </a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ borderColor: 'white' }}
        >
            <span className="navbar-toggler-icon" style={{ color: 'white' }}></span>
        </button>
    </nav>
</>
  )
}

export default Navbar;
