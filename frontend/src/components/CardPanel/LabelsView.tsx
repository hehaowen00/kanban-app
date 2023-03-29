import { useDispatch, useSelector } from "react-redux";
import { removeLabel } from "../../redux/Reducers/Board";
import { AppState } from "../../redux/Store";

import "../../styles/Labels.css";

function LabelsView({ cardId, assigned }: Props) {
  const dispatch = useDispatch();
  const labelsObj = useSelector(({ board }: AppState) => board.labels);

  const unselectLabel = (id: string) => {
    dispatch(removeLabel({ cardId, labelId: id }));
  };

  return (
    <div className="labels br-3 spaced">
      <div className="w-full flex flex-row mb-1">
        <div className="flex-1 py-1">Labels</div>
        <button
          className="text-slate-700 font-80 float-right mr-1 bg-slate-200 rounded
          hover:bg-slate-700 hover:text-white py-1 px-2"
        >
          Select
        </button>
      </div>
      <div className="w-full flex flex-wrap">
        {
          assigned.map((id: string) => (
            <div
              key={id}
              className="px-2 py-1 mt-[2px] mr-1 font-75 rounded drop-shadow
            text-white inline-block no-select mr-1 break-all"
              style={{
                backgroundColor: labelsObj[id].color,
              }}
              onClick={() => unselectLabel(id)}
            >
              {labelsObj[id].name}
            </div>
          ))
        }
      </div>
    </div>
  );
}

type Props = {
  cardId: string,
  assigned: string[],
};

export default LabelsView;
