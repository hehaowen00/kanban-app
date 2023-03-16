import { ChangeEvent, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"

function Navbar({ name }: Props): ReactElement {
  const [title, setTitle] = useState(name);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch({ type: "ShowMenu" });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const [focus, setFocus] = useState(false);

  return (
    <div className="navbar bg-gray-100 flex flex-row flex-1 shadow z-2">
      <div className="flex-1 text-left">
        <input
          className="rounded border-none py-1 title-input bg-gray-100 focus:bg-white focus:px-2 focus:outline focus:outline-sky-600"
          type="text"
          value={title}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {focus &&
          <>
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white rounded px-2 py-1"
            >
              Save
            </button>
            <button
              className="text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </button>
          </>}
      </div>
      <div className="text-right flex-1">
        <button className="ml-auto font-semibold px-3 py-1 bg-grey-100 hover:bg-slate-600
         rounded hover:text-white" onClick={toggleMenu}>Settings</button>
      </div>
    </div>
  );
}

type Props = {
  name: string
};

export default Navbar;
