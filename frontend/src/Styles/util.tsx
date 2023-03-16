import { CSSProperties } from "react";

export const lockYAxis = (draggableStyle: CSSProperties) => {
  const { transform } = draggableStyle;

  let style  = {
    ...draggableStyle
  };

  if (transform) {
      let start = transform.indexOf(',') + 1;
      let end = transform.indexOf(')');

      let y = transform.substring(start, end);
      style.transform = `translate(0, ${y})`;
  }

  return style;
}

