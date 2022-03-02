import { ChangeEvent, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"

function Navbar({ name } : Props): ReactElement {
  const [title, setTitle] = useState(name);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  return (
    <div className="navbar bg-white flex flex-row flex-1 shadow z-2">
      <div className="text-left">
        <input
          className="default title-input"
          type="text"
          value={title}
          onChange={onChange}
        />
        <button className="default">Save</button>
      </div>
      <div className="text-center">
      </div>
      <div className="text-right">
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
