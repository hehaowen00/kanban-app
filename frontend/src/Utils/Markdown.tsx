export function LinkRender({ children, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export function AsIsRender({ children }) {
  return (
    <p>{children}</p>
  )
}

export function QuoteRender({ children }) {
  return (
    <>{children}</>
  )
};


export function HrRender() {
  return (
    <p>---</p>
  );
}