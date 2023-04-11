import Labels from "./Labels";

import * as Types from "../../types/Kanban";

import "../../styles/Settings.css";

function Settings({ labels }: Props) {
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
  labels: Record<string, Types.Label>,
}

export default Settings;
