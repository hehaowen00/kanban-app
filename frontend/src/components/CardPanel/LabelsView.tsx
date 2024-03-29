import { useDispatch, useSelector } from "react-redux";

import { showSelectLabelModal } from "../../redux/Reducers/UI";
import { AppState } from "../../redux/Store";

import "../../styles/Labels.css";

function Labels({ assigned }: Props) {
  const dispatch = useDispatch();
  const labelsObj = useSelector(({ board }: AppState) => board.labels);

  const manageLabels = () => {
    dispatch(showSelectLabelModal());
  };

  return (
    <div className="labels br-3 spaced mt-1 mb-1.5 px-1.5">
      <div className="w-full flex flex-row">
        <div className="flex-1 py-1 select-none">Labels</div>
        <button
          className="text-slate-700 float-right mr-1 bg-slate-200 rounded
          hover:bg-slate-700 hover:text-white py-1 px-2"
          onClick={manageLabels}
        >
          Manage
        </button>
      </div>
      <div className="w-full flex flex-wrap">
        {
          assigned.map((id: string) => (
            <div
              key={id}
              className="px-2 py-1 mt-[2px] mr-1 rounded drop-shadow
            text-white inline-block no-select mr-1 break-all text-xs"
              style={{
                backgroundColor: labelsObj[id].color,
              }}
            >
              {labelsObj[id].name}
            </div>
          ))
        }
      </div>
    </div>
  );
}

interface Props {
  cardId: string,
  assigned: string[],
}

export default Labels;
