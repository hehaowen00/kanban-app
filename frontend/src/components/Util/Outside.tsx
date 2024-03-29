import { RefObject, useEffect, useRef } from "react";


function useOutsideRef(ref: RefObject<HTMLDivElement>, update: () => void) {
  useEffect(() => {
    const handleClick = (event: any) => {
      const { current } = ref;
      let node = event.target;

      if (!current || !node || node === current) {
        return;
      }

      if (node.contains(current)) {
        update();
        return;
      }

      while (node && !current.contains(node)) {
        if (node.parentNode === current) {
          update();
          return;
        }
        if (node.parentNode !== null) {
          node = node.parentNode;
        } else {
          return;
        }
        if (node && node.contains(current)) {
          update();
          return;
        }
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, update]);
}

function Outside({ children, className, style, update, onMouseDown, onClick }: Props) {
  let ref = useRef<HTMLDivElement>(null);
  useOutsideRef(ref, update);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface Props {
  children: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
  update: () => void,
  onMouseDown?: () => void,
  onClick?: () => void,
}

export default Outside;
