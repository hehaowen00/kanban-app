import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Card } from "../../types/Kanban";
import ReactMarkdown from 'react-markdown';
import { AsIsRender, HrRender, LinkRender, QuoteRender } from "../../Utils/Markdown";

import { MAX_DESCRIPTION_LENGTH } from "../../types/Limits";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/Store";

function DescriptionView({ cardId, updateCard }: Props) {
  const description = useSelector(({ board }: AppState) => {
    return board.cards[cardId].description;
  });

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(description);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focused) {
      ref.current?.focus()
    }
  }, [focused]);

  // const descriptionUpdate = () => {
  //   let value_ = value.trim();
  //   updateCard({ description: value_ });
  // };

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

  const saveDesc = () => {
    let value_ = value.trim()
    updateCard({ description: value_ });
    setFocused(false);
    setValue(value_)
  };

  const onClick = () => {
    setFocused(true);
    // setState({ desc: description })
    setValue(description);
  };

  return (
    <div className="block">
      {!focused && value !== "" &&
        < div
          className="bg-white mb-1 px-2 py-1 whitespace-pre-wrap markdown rounded focus:drop-shadow select-none cursor-pointer"
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

          // onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
        />
      }
      {focused &&
        <div className="menu mt-5 spaced-right text-right">
          <button
            className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
            onMouseDown={saveDesc}
          >
            Save
          </button>
          <button
            className="text-slate-700 px-3 py-1 bg-slate-300 rounded
             hover:bg-slate-700 hover:text-white"
            onMouseDown={() => setFocused(false)}
          >
            Cancel
          </button>
        </div>
      }
    </div >
  );
}

type Props = {
  cardId: string,
  updateCard: (payload: Partial<Card>) => void,
};

export default DescriptionView;
