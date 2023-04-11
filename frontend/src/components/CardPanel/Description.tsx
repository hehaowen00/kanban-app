import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import TextareaAutosize from "react-autosize-textarea";
import ReactMarkdown from 'react-markdown';
import { HrRender, LinkRender, QuoteRender } from "../../utils/Markdown";

import * as Types from "../../types/Kanban";
import { MAX_DESCRIPTION_LENGTH } from "../../types/Limits";

function Description({ description, updateCard }: Props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(description);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focused) {
      ref.current?.focus()
    }
  }, [focused]);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setValue(description);
      setFocused(false);
      ref.current?.blur();
    }
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  };

  const saveDesc = () => {
    let value_ = value.trim()
    updateCard({ description: value_ });
    setFocused(false);
    setValue(value_)
  };

  const onClick = () => {
    setFocused(true);
    setValue(description);
  };

  return (
    <div className="block px-1.5 mt-1.5 mb-1.5">
      {!focused && value !== "" &&
        <div
          className="bg-white mb-1 px-2 py-1 whitespace-pre-wrap markdown rounded
          focus:drop-shadow select-none cursor-pointer"
          onClick={onClick}
        >
          <ReactMarkdown
            children={value.replaceAll('\n', '  \n')}
            components={{
              a: LinkRender, h1: 'p', h2: 'p', h3: 'p',
              hr: HrRender, blockquote: QuoteRender,
            }}
          />
        </div>
      }
      {(focused || value == "") &&
        <TextareaAutosize
          ref={ref}
          className="description focus:drop-shadow default font-85"
          maxLength={MAX_DESCRIPTION_LENGTH}
          placeholder="Description"
          rows={3}
          spellCheck={focused}
          value={value}

          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
        />
      }
      {focused &&
        <div className="mt-1.5 spaced-right text-right">
          <button
            className="btn-blue"
            onMouseDown={saveDesc}
          >
            Save
          </button>
          <button
            className="btn-gray"
            onMouseDown={() => setFocused(false)}
          >
            Cancel
          </button>
        </div>
      }
    </div >
  );
}

interface Props {
  description: string,
  updateCard: (payload: Partial<Types.Card>) => void,
}

export default Description;
