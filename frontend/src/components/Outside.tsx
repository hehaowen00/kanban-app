import { useEffect, useRef } from "react";


function useOutsideRef(ref: any, update: any) {
  useEffect(() => {
    const handleClick = (event: any) => {
      const { current }= ref;
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
  let ref = useRef<any>(null);
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

type Props = {
  children: any,
  update: any,
  className?: any,
  style?: any,
  onMouseDown?: any,
  onClick?: any,
};

export default Outside;
