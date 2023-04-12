import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_LABEL_TITLE_LENGTH } from "../../types/Limits";

import ColorPicker from "../Util/ColorPicker";

import { deleteLabel, updateLabel } from "../../redux/Reducers/Board";
import { closeEditLabelModal, hideLabelModal } from "../../redux/Reducers/UI";
import { AppState } from "../../redux/Store";

function EditLabelModal() {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  let label = useSelector(({ board, ui }: AppState) => {
    return board.labels[ui.editLabel];
  });

  const [state, setState] = useState({
    id: label.id,
    label: label.name,
    color: label.color,
    exists: false,
    error: "",
  });
  const [showDelete, setShowDelete] = useState(false);

  const close = () => {
    dispatch(closeEditLabelModal());
  };

  const onChange = (e: any) => {
    setState({ ...state, label: e.target.value });
  };

  const onColorChange = (color: string) => {
    setState({ ...state, color });
  };

  const onClick = () => {
    const id = label.id;
    dispatch(closeEditLabelModal());
    dispatch(deleteLabel({ id }));
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
          <div className="flex flex-row -100 px-2 py-1 rounded">
            <div className="card-label-item rounded flex flex-col py-1 bg-gray-100">
              <div className="flex flex-row px-2 py-1 text-sm ml-auto mr-auto select-none">
                <p>Edit Label</p>
              </div>
              <div className="flex flex-row px-2">
                <div className="flex flex-1 flex-col">
                  <input type="text"
                    ref={inputRef}
                    className={`flex-1 text-sm bg-white px-2 py-1 rounded ${showDelete ? "drop-shadow" : ""}`}
                    style={{
                      border: 'none',
                    }}
                    maxLength={MAX_LABEL_TITLE_LENGTH}
                    placeholder="Edit Label"
                    name="label"
                    onChange={onChange}
                    onFocus={() => setShowDelete(true)}
                    onBlur={() => setShowDelete(false)}
                    value={state.label}
                    required
                  />
                  {showDelete &&
                    <div className="mt-2 spaced-right text-right">
                      <button
                        className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
                        onMouseDown={onClick}
                      >
                        Delete Label
                      </button>
                    </div>
                  }
                </div>
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
                  className="btn-gray"
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
