function Dropdown({ title, items, accessor, onChange }: Props) {
  let access = accessor ?? "value";

  const onSelect = (index: number) => {
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="w-100">
      <div className="dropdown br-3">
        <div className="dropdown-title">
          {title}
        </div>
        <div className="dropdown-content">
          {items.map((item: any) => (
            <div
              className="dropdown-item"
              key={item.key}
              onClick={() => onSelect(item.key)}
             >
               {item[access]}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Props = {
  title?: string,
  items: any[],
  onChange?: any,
  accessor?: string,
};

export default Dropdown;
