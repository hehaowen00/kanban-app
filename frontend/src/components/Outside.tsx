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
          return;
        }
        if (node.parentNode !== null) {
          node = node.parentNode;
        } else {
          return;
        }
        if (node && current.contains(node)) {
          return;
        }
      }

      if (!current.contains(node)) {
        update();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, update]);
}

function Outside({ children, className, style, update }: Props) {
  let ref = useRef<any>(null);
  useOutsideRef(ref, update);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

type Props = {
  children: any,
  update: any,
  className?: any,
  style?: any,
};

export default Outside;
