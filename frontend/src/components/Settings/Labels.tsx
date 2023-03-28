import { useDispatch } from "react-redux";
import { Label } from "../../Types/Kanban";
import { ShowLabelModal } from "../../redux/Creators";

function Labels({ labels }: Props) {
  const dispatch = useDispatch();
  let xs: any[] = [];

  for (const id in labels) {
    xs.push({ id, ...labels[id] });
  }

  xs = xs.sort((a: any, b: any) => a.name > b.name ? 1 : -1);

  const addLabel = () => {
    dispatch(ShowLabelModal(null));
  };

  return (
    <div className="flex flex-col">
      <div className="font-90 m-0">
        <div className="labels-title inline-block no-select">
          Labels
        </div>
        <button
          className="default font-80 shadow-5 f-right"
          onClick={addLabel}
        >
          Add Label
        </button>
      </div>
      <div className="br-3">
        <div className="block mt-5 relative">
          {xs.map(({ id, name }: any) => (
            <div
              key={id}
              className="label-item mt-5 pad-5 br-default bg-white no-select
               br-3 flex flex-col font-85 shadow-5"
            >
              <span className="font-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Props = {
  labels: Record<string, Label>,
};

export default Labels;
