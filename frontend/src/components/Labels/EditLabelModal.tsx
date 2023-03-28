import { useEffect, useRef, useState } from "react";
import { TwitterPicker } from 'react-color';
import { useDispatch, useSelector } from "react-redux";
import { NewLabel } from "../../redux/Creators";
import { MAX_LABEL_TITLE_LENGTH } from "../../Types/Limits";

function LabelModal() {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  const cardId = useSelector(({ ui }: any) => {
    return ui.cardId;
  });

  const [state, setState] = useState({
    label: "",
    color: "",
  });

  const onChange = (e: any) => {
    setState({ ...state, label: e.target.value });
  };

  const close = () => {
    dispatch({ type: "HideLabelModal" });
  };

  const addLabel = () => {
    dispatch(NewLabel(state.label, cardId));
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <>
      <div className="card-view-cover label-cover" onClick={close}></div>
      <div className="modal-container">
        <div className="w-[24rem] rounded drop-shadow modal">
          <div className="flex flex-col px-2 py-1 rounded">
            <div className="card-label-item rounded flex flex-col py-1 bg-gray-100">
              <div className="flex flex-row px-2 py-1">
                <input type="text"
                  ref={inputRef}
                  className="flex-1 bg-white px-2 py-1 rounded w-full drop-shadow mr-1"
                  style={{
                    border: 'none',
                  }}
                  maxLength={MAX_LABEL_TITLE_LENGTH}
                  placeholder="New Label"
                  name="label"
                  onChange={onChange}
                  value={state.label}
                />
                {/* <button className="bg-none hover:bg-slate-700 hover:text-white rounded">Close</button> */}
              </div>
              <div className="mt-1 rounded flex px-2 py-1">
                <TwitterPicker
                  width='100%'
                  triangle='hide'
                />
              </div>
              <div className="flex flex-row-reverse mt-1 px-2 py-1">
                <button
                  className="border border-solid border-blue-600 text-blue-700
                   bg-none hover:bg-blue-700 hover:text-white px-2 py-1 rounded"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  className="border border-solid border-blue-600 bg-blue-600
                   hover:bg-blue-700 text-white px-2 py-1 mr-1 rounded"
                  onClick={addLabel}
                >
                  Add Label
                </button>
              </div>
            </div>
          </div>
        </div></div>
    </>
  );
}

export default LabelModal;
