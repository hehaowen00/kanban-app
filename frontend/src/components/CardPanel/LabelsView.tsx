import { useDispatch, useSelector } from "react-redux";
import { AddLabel, RemoveLabel } from "../../redux/Creators";
import { AppState } from "../../redux/Store";

import "../styles/Labels.css";

function LabelsView({ cardId, assigned, selectLabels, close }: Props) {
  const dispatch = useDispatch();

  const toggleLabel = (labelId: string) => () => {
    if (assigned.includes(labelId)) {
      dispatch(RemoveLabel(cardId, labelId));
    } else {
      dispatch(AddLabel(cardId, labelId));
    }
  };

  const labelsObj = useSelector(({ board }: AppState) => board.labels);

  let labelsArr = [];

  for (const key in labelsObj) {
    labelsArr.push({ key, name: labelsObj[key].name });
  }

  labelsArr = labelsArr.sort((a: any, b: any) => {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });

  const removeLabel = (id: string) => {
    dispatch(RemoveLabel(cardId, id));
  };

  return (
    <div className={`labels ${selectLabels ? "show" : ""} br-default bg-white br-3 spaced shadow-5`}>
      {!selectLabels && (
        assigned.map((id: string) => (
          <div
            key={id}
            className="label-badge font-75 font-600 inline-block no-select"
            onClick={() => removeLabel(id)}
          >
            {labelsObj[id].name}
          </div>
        ))
      )}
      {selectLabels && (
        <>
          <div className="font-85 font-600 flex flex-row w-100" >
            <div className="labels-header inline-block no-select">
              Select Labels
            </div>
            <div className="inline-block ml-auto">
              <button
                className="default labels-cancel"
                onClick={close}
              >
                Close
              </button>
            </div>
          </div>
          <div className="labels-body flex flex-col relative w-100">
          {labelsArr.map((label: any) => (
            <div key={label.key} className="flex flex-col">
            <div className="card-label-item br-3">
              <div className="label-description font-85 no-select">
                {label.name}
              </div>
              <input
                type="checkbox"
                className="label-select check"
                onClick={toggleLabel(label.key)}
                checked={assigned.includes(label.key)}
              />
            </div>
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  );
}

type Props = {
  cardId: string,
  assigned: any[],
  selectLabels: boolean,
  close: any,
};

export default LabelsView;
