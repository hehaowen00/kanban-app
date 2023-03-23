import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddLabel, NewLabel, RemoveLabel } from "../../redux/Creators";
import { AppState } from "../../redux/Store";
import LabelModal from "../Labels/AddLabelModal";

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
    // console.log('key', key)
    if (key === "Enter") {
      dispatch(NewLabel(newLabel, cardId))
      setNewLabel('')
    }
  };

  return (
    <div className="labels br-3 spaced">
      <div className="w-full flex flex-row">
        <div className="flex-1">Labels</div>
        <button
          className="text-slate-700 float-right mr-1 bg-slate-200 rounded hover:bg-slate-700 hover:text-white"
        >
          ...
        </button>
      </div>
      <div className="w-full flex flex-wrap">
        {!selectLabels && (
          assigned.map((id: string) => (
            <div
              key={id}
              className="px-2 py-1 mb-1 font-80 rounded drop-shadow
            bg-purple-500 text-white inline-block no-select mr-1 break-all"
              style={{
                backgroundColor: "",
              }}
            // onClick={() => removeLabel(id)}
            >
              {labelsObj[id].name}
            </div>
          ))
        )}
      </div>
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
