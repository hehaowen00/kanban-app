import { useEffect, useState } from "react";

function ColorPicker({ colors, defaultValue, value, onChange }: Props) {
  value = value?.toUpperCase();
  defaultValue = defaultValue?.toUpperCase();
  defaultValue = defaultValue ?? "#0ea5e9".toUpperCase();

  const [state, setState] = useState({
    color: value ? value : defaultValue,
    input: stripHashTag(value ? value : defaultValue),
  });

  useEffect(() => {
    if (onChange) {
      onChange(state.color);
    }
  }, []);

  colors = colors ?? ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
    "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
    "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
    "#ec4899", "#f43f5e", "#000000"];

  const onColorChange = (color: string) => {
    let icolor = stripHashTag(color).toUpperCase();
    setState({ ...state, color, input: icolor });

    if (onChange) {
      onChange(color);
    }
  };

  const updateInput = (event: any) => {
    let value = event.target.value.toUpperCase();
    let payload = { ...state, input: value };
    if ((/[0-9A-F]{6}$/i.test(value))) {
      payload.color = "#" + value;
    }
    setState(payload);
  };

  const onPaste = (event: any) => {
    let value = event.target.value.toUpperCase();
    value = stripHashTag(value).slice(0, 6);
    let payload = { ...state, input: value };
    if ((/[0-9A-F]{6}$/i.test(value))) {
      //TODO: setState({  })
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded px-2 py-2 drop-shadow">
      <div
        className="flex-1 px-2 py-1 rounded text-white drop-shadow
        text-center text-sm"
        style={{
          backgroundColor: state.color,
        }}
      >
        {state.color && state.color.toUpperCase()}
      </div>
      <div
        className="flex-1 grid mt-2 flex-wrap"
        style={{
          gridTemplateColumns: "repeat(auto-fill, 30px)",
          gridGap: "0.4rem",
          justifyContent: "space-between",
        }}
      >
        {colors.map((color: string) => (
          <div
            key={color}
            className="h-[30px] w-[30px] rounded cursor-pointer"
            style={{
              backgroundColor: color,
            }}
            onClick={() => onColorChange(color)}
          >
          </div>
        ))}
      </div>
      <div className="relative flex mt-2 rounded-md shadow-sm flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">#</span>
        </div>
        <input
          type="text"
          className="flex-1 rounded-md border-0 py-1 pl-7 pr-14 text-gray-900
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
          focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          maxLength={6}
          onChange={updateInput}
          value={state.input}
        />
      </div>
    </div>
  );
}

function stripHashTag(input: string): string {
  if (input.startsWith("#")) {
    return input.slice(1);
  }
  return input;
}

interface Props {
  colors?: string[],
  defaultValue?: string,
  value?: string,
  onChange?: (color: string) => void,
}

export default ColorPicker;
