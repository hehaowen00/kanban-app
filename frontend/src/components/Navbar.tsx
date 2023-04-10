import { ChangeEvent, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSettings } from "../redux/Reducers/UI";
import "../styles/Navbar.css"
import { MAX_BOARD_TITLE_LENGTH } from "../types/Limits";

function Navbar({ name }: Props): ReactElement {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(name);

  const toggleMenu = () => {
    dispatch(toggleSettings());
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [focus, setFocus] = useState(false);

  return (
    <div className="navbar bg-gray-100 flex flex-row flex-1 shadow z-2">
      <div className="flex-1 text-left">
        <input
          className="rounded border-none py-1 title-input bg-gray-100
          focus:bg-white px-2 focus:ring-inset focus:ring-blue-600 focus:ring-2"
          type="text"
          value={title}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          maxLength={MAX_BOARD_TITLE_LENGTH}
        />
        {focus &&
          <>
            <button
              className="btn-blue"
            >
              Save
            </button>
            <button
              className="btn-gray"
            >
              Cancel
            </button>
          </>}
      </div>
      <div className="text-right flex-1">
        <button
          className="ml-auto btn-gray"
          onClick={toggleMenu}
        >
          Settings
        </button>
      </div>
    </div>
  );
}

interface Props {
  name: string
}

export default Navbar;
