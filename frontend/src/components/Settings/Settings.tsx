import { useDispatch } from "react-redux";
import Labels from "./Labels";

import { Label } from "../../types/Kanban";
import "../../styles/Settings.css";
import { useSelector } from "react-redux";

function Settings({ labels }: Props) {
  const dispatch = useDispatch();

  const { board } = useSelector((e: any) => e);

  return (
    <div className="settings bg-grey flex flex-col drop-shadow rounded mr-3 text-sm">
      <div className="">
        Visibility
        <button className="default shadow-5 f-right">
          Set Public
        </button>
        <button className="default shadow-5 f-right">
          Set Private
        </button>
      </div>
      <Labels labels={labels} />
      <div className="">
        Members
        <button className="default shadow-5 f-right">
          Invite
        </button>
      </div>
    </div>
  );
}

interface Props {
  labels: Record<string, Label>,
}

export default Settings;
