import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { Label } from "../types/Kanban";
import { NewLabel } from "../redux/Creators";
import { useDispatch } from "react-redux";

function Labels({ labels }: Props) {
  const dispatch = useDispatch();
  let xs: any[] = [];

  for (const id in labels) {
    xs.push({ id, ...labels[id] });
  }

  xs = xs.sort((a: any, b: any) => a.name > b.name ? 1 : -1);

  const [newLabel, setNewLabel] = useState(false);
  const [state, setState] = useState({
    name: "",
  });

  const addLabel = () => {
    const { name } = state;
    dispatch(NewLabel(name));
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState({ 
      ...state,
      [name]: value,
    });
  };

  const onClick = () => {
    addLabel();
    setNewLabel(false);
    setState({ name: "" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addLabel();
      setState({ name: "" });
    }
    if (event.key === "Escape") {
      setNewLabel(false);
    }
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (newLabel) {
      inputRef.current?.focus();
    }
  }, [newLabel]);

  return (
    <div className="flex flex-col">
      <div className="font-90 font-600 m-0">
        <div className="labels-title inline-block no-select">Labels</div>
        <button
          className="default font-80 shadow-5 f-right"
          onClick={() => setNewLabel(true)}
        >
          Add Label
        </button>
      </div>
      <div className="br-3">
        <div className="block mt-5 relative">
          {xs.map(({ id, name }: any) => (
            <div
              key={id}
              className="label-item mt-5 pad-5 br-default bg-white no-select br-3 flex flex-col font-85 shadow-5"
            >
              <span className="font-600">{name}</span>
            </div>
          ))}
          {newLabel && (
            <div className="br-default br-3 bg-white pad-5 mb-0 mt-5 shadow-5">
              <TextareaAutosize
                ref={inputRef}
                name="name"
                className="default font-80 font-600 pad-5"
                placeholder="New Label"
                maxLength={64}
                value={state.name}

                onChange={onChange}
                onKeyDown={onKeyDown}
              />
              <div className="mt-5 spaced-right text-right">
                <button
                  className="default"
                  onMouseDown={onClick}
                >
                  Save
                </button>
                <button
                  className="default"
                  onClick={() => setNewLabel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type Props = {
  labels: Record<string, Label>,
};

export default Labels;
