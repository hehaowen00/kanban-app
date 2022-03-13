import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Card } from "../../types/Kanban";

import { MAX_DESCRIPTION_LENGTH } from "../../types/Limits";

function DescriptionView({ description, value, setValue, updateCard }: Props) {
  const [focused, setFocused] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

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
    setValue(value);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (event.key) {
      case "Escape": {
        event.preventDefault();
        setValue(description);
        setFocused(false);
        ref.current?.blur();
        break;
      }
      default: {
      }
    }
  };

  return (
    <div className="block">
      <TextareaAutosize
        ref={ref}
        className="description shadow default font-85"
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder="Description"
        rows={3}
        spellCheck={focused}
        value={value}

        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      />
      {focused && (
        <div className="menu mt-5 spaced-right text-right">
          <button
            className="default shadow"
            onMouseDown={undefined}
          >
            Save
          </button>
          <button
            className="default shadow"
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
