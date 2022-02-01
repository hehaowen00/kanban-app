import React, { ReactElement } from "react";
import "./styles/Navbar.css"

function Navbar({ name } : Props): ReactElement {
  return (
    <div className="navbar">
      <div className="left">
        <input className="title-input" value={name} />
        <button>Save</button>
      </div>
      <div className="center">
      </div>
      <div className="right">
        <button>Dashboard</button>
      </div>
    </div>
  );
}

type Props = {
  name: string
};

export default Navbar;
