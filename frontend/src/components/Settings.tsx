import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";

import TextareaAutosize from "react-autosize-textarea/lib";

import Labels from "./Labels";

import { Label } from "../types/Kanban";
import "./styles/Settings.css";

function Settings({ labels }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="settings bg-grey flex flex-col">
      <Labels labels={labels} />
    </div>
  );
}

type Props = {
  labels: Record<string, Label>,
};

export default Settings;
