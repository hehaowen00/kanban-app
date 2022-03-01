import { ChangeEvent, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"

function Navbar({ name } : Props): ReactElement {
  const [title, setTitle] = useState(name);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  return (
    <div className="navbar">
      <div className="left">
        <input
          className="default title-input"
          type="text"
          value={title}
          onChange={onChange}
        />
        <button className="default">Save</button>
      </div>
      <div className="center">
      </div>
      <div className="right">
        <Link to="/">
          <button className="default">Dashboard</button>
        </Link>
        <button className="default">Settings</button>
      </div>
    </div>
  );
}

type Props = {
  name: string
};

export default Navbar;
