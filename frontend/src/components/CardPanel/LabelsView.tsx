import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddLabel, NewLabel, RemoveLabel } from "../../redux/Creators";
import { AppState } from "../../redux/Store";

import "../../Styles/Labels.css";

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

  const [newLabel, setNewLabel] = useState('');

  const handleKey = (e: any) => {
    const key = e.key;
    console.log('key', key)
    if (key === "Enter") {
      dispatch(NewLabel(newLabel))
      setNewLabel('')
    }
  }

  return (
    <div className={`labels ${selectLabels ? "show" : ""} br-3 spaced`}>
      {!selectLabels && (
        assigned.map((id: string) => (
          <div
            key={id}
            className="label-badge font-80 px-2 py-[2px] rounded drop-shadow bg-purple-500 bg-white inline-block no-select"
            onClick={() => removeLabel(id)}
          >
            {labelsObj[id].name}
          </div>
        ))
      )}
      {selectLabels && (
        <>
          <div className="font-85 font-600 flex flex-row w-100">
            <div className="labels-header inline-block no-select">
              Labels
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
          <input type="text"
            className="flex-1 bg-white drop-shadow px-2 py-1 mb-1 rounded w-full"
            style={{
              border: 'none',
            }}
            maxLength={48}
            placeholder="Add Label"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={handleKey}
          />
          <div className="labels-body flex flex-col relative w-100">
            {labelsArr.map((label: any) => (
              <div key={label.key} className="flex flex-col">
                <div className="card-label-item rounded bg-gray-100">
                  <div className="px-2 label-description font-85 no-select bg-white">
                    {label.name}
                  </div>
                  <input
                    type="checkbox"
                    className="label-select check accent-blue-700"
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
