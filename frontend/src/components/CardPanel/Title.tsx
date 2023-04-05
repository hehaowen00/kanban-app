import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

import { Card } from "../../types/Kanban";
import { MAX_CARD_TITLE_LENGTH } from "../../types/Limits";

function TitleView({ title, updateCard, deleteCard }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(title);

  const titleUpdate = () => {
    let value_ = value.trim();
    if (value_.length > 0) {
      value_ = value_.replaceAll('\n', ' ');
      value_ = value_.substring(0, MAX_CARD_TITLE_LENGTH);

      setValue(value_);
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
    if (event.key === "Enter") {
      event.preventDefault();
      titleUpdate();
      ref.current?.blur();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setValue(title);
      ref.current?.blur();
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
        maxLength={MAX_CARD_TITLE_LENGTH}
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
            className="text-slate-700 px-3 py-1 bg-slate-300 rounded
             hover:bg-slate-700 hover:text-white"
            onMouseDown={onMouseDown}
          >
            Delete Card
          </button>
        </div>
      )}
    </div>
  );
}

interface Props {
  title: string,
  updateCard: (partial: Partial<Card>) => void,
  deleteCard: () => void,
}

export default TitleView;
