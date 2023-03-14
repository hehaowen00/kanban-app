import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

import { Card } from "../../types/Kanban";
import { MAX_TITLE_LENGTH } from "../../types/Limits";

function TitleView({ title, value, setValue, updateCard, deleteCard }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  const titleUpdate = () => {
    let value_ = value.trim();
    if (value_.length > 0) {
      updateCard({ title: value_ });
    } else {
      setValue(title);
    }
  };

  const onBlur = () => {
    titleUpdate();
    setFocused(false);
    ref.current?.blur();
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;
    setValue(value);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (event.key) {
      case "Enter": {
        event.preventDefault();
        titleUpdate();
        ref.current?.blur();
        break;
      }
      case "Escape": {
        event.preventDefault();
        setValue(title);
        ref.current?.blur();
        break;
      }
      default: {
      }
    }
  };

  const onMouseDown = () => {
    deleteCard();
  };

  return (
    <div className="block">
      <TextareaAutosize
        ref={ref}
        className="default font-90 font-500 focus:drop-shadow"
        maxLength={MAX_TITLE_LENGTH}
        placeholder="Title"
        spellCheck={focused}
        value={value}

        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {focused && (
        <div className="menu mt-5 text-right">
          <button
            className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
            onMouseDown={onMouseDown}
          >
            Delete Card
          </button>
        </div>
      )}
    </div>
  );
}

type Props = {
  title: string,
  value: string,
  setValue: (value: string) => void,
  updateCard: (partial: Partial<Card>) => void,
  deleteCard: () => void,
};

export default TitleView;
