import React from 'react'
import logo from './logo.png';
import WalletButton from './WalletButton';

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
        <WalletButton/>
            <span className="navbar-toggler-icon" style={{ color: 'white' }}></span>
    </nav>
</>
  )
}

export default Navbar;
