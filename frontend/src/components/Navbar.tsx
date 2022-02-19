import { ReactElement, useState } from "react";
import "./styles/Navbar.css"

function Navbar({ name } : Props): ReactElement {
  const [name_, setName_] = useState(name);

  const onChange = () => {
  }

  return (
    <div className="navbar">
      <div className="left">
        <input className="default title-input" type="text" value={name_} />
        <button className="default">Save</button>
      </div>
      <div className="center">
      </div>
      <div className="right">
        <button className="default">Dashboard</button>
      </div>
    </div>
  );
}

type Props = {
  name: string
};

export default Navbar;
