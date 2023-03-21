import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddLabel, NewLabel, RemoveLabel } from "../../redux/Creators";
import { AppState } from "../../redux/Store";
import LabelModal from "../Labels/LabelModal";

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
