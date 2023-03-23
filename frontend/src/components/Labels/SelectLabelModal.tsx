import { useDispatch } from "react-redux";

function SelectLabelModal() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="card-view-cover label-cover" onClick={close}></div>
      <div className="modal-container">
        <div className="w-[24rem] rounded drop-shadow modal">
        </div>
      </div>
    </>
  );
}

export default SelectLabelModal;