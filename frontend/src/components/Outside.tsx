import { useEffect, useRef } from "react";

function useOutsideRef(ref: any, update: any) {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        update();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, update]);
}

function Outside({ children, update }: Props) {
  let ref = useRef<any>(null);
  useOutsideRef(ref, update);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

type Props = {
  children: any,
  update: any,
};

export default Outside;
