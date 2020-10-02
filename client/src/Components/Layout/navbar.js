import React, { Fragment } from 'react';
import logo from "../../assets/logo.png"

const Navbar=()=>{
    return(
      <div>
    <nav className="black" style={{padding:"0 3%", paddingTop:"1%",height:"2%"}}>
    <div className="navcontent">
      <a href="#" className=""><img style={{height:"50px"}}src={logo}/></a>
    </div>
  </nav>
 </div>
    
    )
}
export default Navbar;