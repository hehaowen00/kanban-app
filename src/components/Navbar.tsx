import React, { ReactElement } from "react";
import "./styles/Navbar.css"

function Navbar({ name } : Props): ReactElement {
  return (
    <div className="navbar">
      <div className="left">
        <span className='semi'>{name}</span>
      </div>
      <div className="center">
      </div>
      <div className="right">
        <a href='#'><span className='semi'>{"Dashboard"}</span></a>
        <a href='#'><span className='semi'>{"My Account"}</span></a>
      </div>
    </div>
  );
}

type Props = {
  name: string
};

export default Navbar;
