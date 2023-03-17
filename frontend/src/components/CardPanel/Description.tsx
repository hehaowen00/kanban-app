import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Card } from "../../types/Kanban";
import ReactMarkdown from 'react-markdown';
import { AsIsRender, HrRender, LinkRender, QuoteRender } from "../../Utils/Markdown";

import { MAX_DESCRIPTION_LENGTH } from "../../types/Limits";

function DescriptionView({ description, value, setValue, updateCard }: Props) {
  const [focused, setFocused] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState({
    desc: value,
  })

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
    updateCard({ description: desc });
    setFocused(false);
    setValue(desc)
  };

  const onClick = () => {
    setFocused(true);
    setState({ desc: description })
  };

  return (
    <div className="block">
      {!focused &&
        <div
          className="bg-white mb-1 px-2 py-1 whitespace-pre-wrap markdown rounded focus:drop-shadow select-none cursor-pointer"
          onClick={onClick}
        >
          <ReactMarkdown
            children={state.desc.replaceAll('\n', '  \n')}
            components={{ a: LinkRender, h1: 'p', h2: 'p', h3: 'p', hr: HrRender, blockquote: QuoteRender, }}
          />
        </div>
      }
      {focused && <TextareaAutosize
        ref={ref}
        className="description focus:drop-shadow default font-85"
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder="Description"
        rows={3}
        spellCheck={focused}
        value={state.desc}

        // onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      />}
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
            onMouseDown={() => setFocused(false)}
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
