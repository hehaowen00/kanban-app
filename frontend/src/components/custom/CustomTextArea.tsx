import { ChangeEvent, ClipboardEvent, forwardRef } from "react";
import TextareaAutosize from 'react-autosize-textarea';

const CustomTextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { onChange, onPaste, count, value } = props;

  const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (value.length > count || onPaste === undefined) {
      return;
    }

    const diff = count - value.length;
    const text = event.clipboardData.getData("text");

    if (diff > 0 && onPaste !== undefined) {
      const substr = text.substring(0, diff);

      let data = new DataTransfer();
      data.setData("text/plain", substr);

      event.clipboardData = data;
      onPaste(event);

      if (ref !== null) {
        if ('current' in ref) {
          const evt = new Event("input", { bubbles: true });
          ref.current?.dispatchEvent(evt);
        }
      }
    }
  };

  const handleUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange === undefined) {
      return;
    }

    event.preventDefault();

    const value = event.target.value;

    if (value.length > count || onChange === undefined) {
      event.target.value = value.substring(0, count);
    }

    onChange(event);
  };

  return (
    <TextareaAutosize
      ref={ref}
      {...props}
      maxLength={count}
      onKeyDown={e => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onChange={handleUpdate}
      onPaste={handlePaste}
    />
  );
});

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className: string;
  count: number;
  value: string;
};

export default CustomTextArea;
