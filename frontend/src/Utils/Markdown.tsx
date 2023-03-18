export function LinkRender({ children, href }: any) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export function AsIsRender({ children }: any) {
  return (
    <p>{children}</p>
  )
}

export function QuoteRender({ children }: any) {
  return (
    <>{children}</>
  )
};


export function HrRender() {
  return (
    <p>---</p>
  );
}