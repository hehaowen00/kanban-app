import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwitterPicker } from 'react-color';

import { newLabel } from "../../redux/Reducers/Board";
import { hideLabelModal } from "../../redux/Reducers/UI";
import { AppState } from "../../redux/Store";

import { MAX_LABEL_TITLE_LENGTH } from "../../types/Limits";

function LabelModal() {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  const { cardId } = useSelector(({ ui }: AppState) => {
    return ui;
  });

  const [state, setState] = useState({
    label: "",
    color: {},
    exists: false,
    empty: false,
  });

  const swatches = ["#dc2626", "#2563eb"];

  const close = () => {
    dispatch(hideLabelModal());
  };

  const onChange = (e: any) => {
    setState({ ...state, label: e.target.value });
  };

  const onColorChange = (color: any, event: any) => {
    setState({ ...state, color, });
  };

  const addLabel = () => {
    const name = state.label.trim();
    if (name !== "") {
      dispatch(newLabel({ cardId, name, color: state.color.hex }));
      dispatch(hideLabelModal());
    } else {
      setState({ ...state, empty: true });
    }
  };

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
                  required
                />
              </div>
              <div className="mt-1 rounded flex px-2 py-1">
                <TwitterPicker
                  name="color"
                  width='100%'
                  triangle='hide'
                  color={state.color}
                  colors={swatches}
                  onChangeComplete={onColorChange}
                />
              </div>
              {state.exists &&
                <div
                  className="text-center text-xs border border-red-600
               border-solid bg-white text-red-600 mx-2 my-1 px-2 py-1 rounded
               select-none"
                >
                  A label with that name already exists
                </div>
              }
              {state.empty &&
                <div
                  className="text-center text-xs border border-red-600
               border-solid bg-white text-red-600 mx-2 my-1 px-2 py-1 rounded
                select-none hidden"
                >
                  Label name cannot be empty
                </div>
              }
              <div className="flex flex-row-reverse px-2 py-1">
                <button
                  className="bg-slate-300 text-slate-700
                   hover:bg-slate-700 hover:text-white px-2 py-1 rounded"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600
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
