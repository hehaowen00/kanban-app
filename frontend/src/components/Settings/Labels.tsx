import { useDispatch } from "react-redux";

import { showEditLabelModal, showLabelModal } from "../../redux/Reducers/UI";
import * as Types from "../../types/Kanban";

function Labels({ labels }: Props) {
  const dispatch = useDispatch();
  let xs: any[] = [];

  for (const id in labels) {
    xs.push({ ...labels[id], id });
  }

  xs = xs.sort((a: any, b: any) => a.name > b.name ? 1 : -1);

  const addLabel = () => {
    dispatch(showLabelModal());
  };

  const editLabel = (id: string) => {
    return function () {
      dispatch(showEditLabelModal({ labelId: id }));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="font-90 m-0">
        <div className="labels-title inline-block no-select">
          Labels
        </div>
        <button
          className="default shadow-5 f-right"
          onClick={addLabel}
        >
          Add Label
        </button>
      </div>
      <div className="br-3">
        <div className="block mt-1 relative">
          {xs.map((label: Types.Label) => (
            <div
              key={label.id}
              className="flex flex-row flex-1 label-item"
            >
              <div
                className="flex-1 text-white font-80 px-2 py-1 rounded select-none hover:cursor-pointer drop-shadow"
                onClick={editLabel(label.id)}
                style={{
                  backgroundColor: label.color,
                }}
              >
                {label.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  labels: Record<string, Types.Label>,
}

export default Labels;
