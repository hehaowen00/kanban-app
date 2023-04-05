import { useDispatch, useSelector } from "react-redux";
import { addLabel, removeLabel } from "../../redux/Reducers/Board";
import { hideSelectLabelModal, showEditLabelModal } from "../../Redux/Reducers/UI";
import { AppState } from "../../redux/Store";
import { Label } from "../../types/Kanban";

function SelectLabelModal() {
  const dispatch = useDispatch();

  const cardId = useSelector(({ ui }: any) => {
    return ui.cardId;
  })

  const { labels, checked } = useSelector(({ board }: AppState) => {
    let cardLabels = board.cards[cardId].labels;
    let checked: Record<string, boolean> = {};
    let labels = Object.keys(board.labels).map((key: string) => {
      return board.labels[key];
    });
    labels.sort(compareLabel);
    labels.forEach((value) => {
      checked[value.id] = cardLabels.includes(value.id);
    });
    return {
      labels,
      checked,
    }
  });

  const close = () => {
    dispatch(hideSelectLabelModal());
  };

  const handleCheck = (event: any) => {
    const { name } = event.target;
    const state = !checked[name];
    if (state) {
      dispatch(addLabel({ cardId, labelId: name }));
    }
    if (!state) {
      dispatch(removeLabel({ cardId, labelId: name }));
    }
  };

  const editLabel = (id: string) => {
    return function () {
      dispatch(showEditLabelModal({ labelId: id }));
    }
  };

  return (
    <>
      <div className="card-view-cover label-cover" onClick={close}></div>
      <div className="modal-container">
        <div className="w-[22em] rounded drop-shadow modal bg-gray-100">
          <div className="flex flex-col px-1 py-2 rounded">
            <div className="rounded w-100 flex flex-col bg-gray-100">
              <div className="px-2 text-slate-700 mb-2 flex flex-row select-none">
                <p className="text-sm">Manage Labels</p>
                <button
                  className="ml-auto rounded bg-slate-300 text-slate-700 text-sm
                hover:bg-slate-700 hover:text-white"
                  onClick={close}
                >
                  Close
                </button>
              </div>
              <div className="pl-1 pr-2 text-sm">
                {labels.map((label: Label) => {
                  return (
                    <div
                      key={label.id}
                      className="flex flex-row flex-1 label-item"
                    >
                      <div className="py-1">
                        <input
                          type="checkbox"
                          name={label.id}
                          className="accent-blue-700 mr-2"
                          checked={checked[label.id]}
                          onChange={handleCheck}
                        />
                      </div>
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function compareLabel(a: Label, b: Label) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export default SelectLabelModal;
