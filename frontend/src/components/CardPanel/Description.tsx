import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Card } from "../../types/Kanban";

import { MAX_DESCRIPTION_LENGTH } from "../../types/Limits";

function DescriptionView({ description, value, setValue, updateCard }: Props) {
  const [focused, setFocused] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState({
    desc: value,
  })

  const descriptionUpdate = () => {
    let value_ = value.trim();
    updateCard({ description: value_ });
  };

  const onBlur = () => {
    descriptionUpdate();
    setFocused(false);
    ref.current?.blur();
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;
    setState({ desc: value });
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (event.key) {
      case "Escape": {
        event.preventDefault();
        setState({ desc: description });
        setFocused(false);
        ref.current?.blur();
        break;
      }
      default: {
      }
    }
  };

  const saveDesc = () => {
    let desc = state.desc.trim()
    setState({ desc });
    setValue(desc)
  };

  return (
    <div className="block">
      <TextareaAutosize
        ref={ref}
        className="description focus:drop-shadow default font-85"
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder="Description"
        rows={3}
        spellCheck={focused}
        value={state.desc}

        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      />
      {focused && (
        <div className="menu mt-5 spaced-right text-right">
          <button
            className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
            onMouseDown={saveDesc}
          >
            Save
          </button>
          <button
            className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
            onMouseDown={undefined}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

type Props = {
  description: string,
  value: string,
  setValue: (v: string) => void,
  updateCard: (payload: Partial<Card>) => void,
};

export default DescriptionView;
