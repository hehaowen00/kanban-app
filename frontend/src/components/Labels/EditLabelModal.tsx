import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_LABEL_TITLE_LENGTH } from "../../types/Limits";

import ColorPicker from "../util/ColorPicker";

import { closeEditLabelModal, hideLabelModal } from "../../redux/Reducers/UI";
import { AppState } from "../../redux/Store";
import { updateLabel } from "../../redux/Reducers/Board";

function EditLabelModal() {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  const label = useSelector(({ board, ui }: AppState) => {
    return board.labels[ui.editLabel];
  });

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  const [state, setState] = useState({
    label: label.name,
    color: label.color,
    exists: false,
    error: "",
  });

  const close = () => {
    dispatch(closeEditLabelModal());
  };

  const onChange = (e: any) => {
    setState({ ...state, label: e.target.value });
  };

  const onColorChange = (color: string) => {
    setState({ ...state, color });
  };

  const saveChanges = () => {
    const name = state.label.trim();
    if (name === "") {
      setState({ ...state, error: "Label name cannot be empty" });
      return;
    }
    if (!state.color) {
      setState({ ...state, error: "Color is not set" });
      return;
    }
    dispatch(updateLabel({
      id: label.id, label: {
        name: state.label,
        color: state.color,
      }
    }));
    dispatch(hideLabelModal());
  };

  return (
    <>
      <div className="card-view-cover label-cover" onClick={close}></div>
      <div className="modal-container">
        <div className="w-[25em] rounded drop-shadow modal">
          <div className="flex flex-col px-2 py-1 rounded">
            <div className="card-label-item rounded flex flex-col py-1 bg-gray-100">
              <div className="flex flex-row px-2 py-1 text-sm ml-auto mr-auto select-none">
                <p>Edit Existing Label</p>
              </div>
              <div className="flex flex-row px-2 py-1">
                <input type="text"
                  ref={inputRef}
                  className="flex-1 text-sm bg-white px-2 py-1 rounded w-full drop-shadow"
                  style={{
                    border: 'none',
                  }}
                  maxLength={MAX_LABEL_TITLE_LENGTH}
                  placeholder="Edit Label"
                  name="label"
                  onChange={onChange}
                  value={state.label}
                  required
                />
              </div>
              <div className="flex flex-1 px-2 py-1">
                <ColorPicker value={state.color} onChange={onColorChange} />
              </div>
              {state.error !== "" &&
                <div
                  className="text-center text-xs border border-red-600
              border-solid bg-white text-red-600 mx-2 my-1 px-2 py-1 rounded
              select-none"
                >
                  {state.error}
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
                  onClick={saveChanges}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditLabelModal;
