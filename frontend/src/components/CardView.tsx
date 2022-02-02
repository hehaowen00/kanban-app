import React, { ReactElement, useEffect, useState } from "react";
import CustomTextArea from "./custom/CustomTextArea";
import { connect } from "react-redux";

import "./styles/CardView.css";
import "./styles/Elements.css";
import { Card } from "../types/Kanban";

const MAX_TITLE_LENGTH = 512;
const MAX_DESCRIPTION_LENGTH = 1024;

function KanbanCardView({ visible }: Props): ReactElement {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([{user: "testing", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}]);

  const onTitleChange = (event: any) => {
    if (event.target.value.length > MAX_TITLE_LENGTH) {
      return;
    }
    setTitle(event.target.value);
  };

  const onTitlePaste = (event: any) => {
    const append = event.clipboardData.getData("text");
    setTitle(title + append);
  };

  const onDescriptionChange = (event: any) => {
    if (event.target.value.length > MAX_DESCRIPTION_LENGTH || event.target.value.length > description.length) {
      return;
    }
    setDescription(event.target.value);
  };

  const onDescriptionPaste = (event: any) => {
    const append = event.clipboardData.getData("text");
    setDescription(description + append);
  };

  const addComment = () => {
    setComments([...comments, {user: "testing", text: "comment text"}]);
  };

  const saveChanges = () => {
    const contents = Object.assign({}, {
      title,
      description,
      attachments: [],
      checklists: [],
      comments: [],
      dueDate: "",
      labels: [],
    });
  };

  return (
    <div
      className="list card-view"
      style={{ display: visible ? "block" : "none" }}
    >
      <CustomTextArea 
        className="card-title"
        placeholder="Title"
        count={MAX_TITLE_LENGTH}
        onChange={onTitleChange}
        onPaste={onTitlePaste}
        value={title}
      />
      <br/>
      <p></p>
      <div className="card-view-body">
        <CustomTextArea
          className="description"
          placeholder="Description"
          count={MAX_DESCRIPTION_LENGTH}
          onChange={onDescriptionChange}
          onPaste={onDescriptionPaste}
          value={description}
        />
      </div>
      <div className="toolbar text-left mr-5">
        <button className="mr-5">Add Attachment</button>
        <button className="mr-5">Add Checklist</button>
        <button className="mr-5">Add Due Date</button>
        <button className="mr-5">Add Label</button>
      </div>
      <div className="comments" style={{border: "1px solid black",}}>
      Labels: 
      </div>
      <div className="comments" style={{border: "1px solid black"}}>
        <div style={{display: "flex", flex: 1, flexDirection: "column" }}>
          <input type="file" />
          <div style={{display: "flex", flex: 1, flexDirection: "row-reverse" }}>
          <button>Cancel</button>
          <button>Add Attachment</button>
          </div>
        </div>
      </div>
      <div className="comments" style={{border: "1px solid black"}}>
        <div style={{display: "flex", flex: 1, flexDirection: "column" }}>
          <CustomTextArea
            className="comment-input"
            placeholder="New Checklist"
            count={32}
            value=""
            style={{marginTop: "0"}}
          />
          <div style={{display: "flex", flex: 1, flexDirection: "row-reverse" }}>
          <button>Cancel</button>
          <button>Add Checklist</button>
          </div>
        </div>
      </div>
      <div className="comments" style={{border: "1px solid black",}}>
          <CustomTextArea
            className="comment-input"
            placeholder="New Checklist"
            count={32}
            value="Checklist"
            style={{marginTop: "0"}}
          />
        <div><input type="checkbox" /> Label</div>
        <div><input type="checkbox" /> Label</div>
        <div><input type="checkbox" /> Label</div>
        <div><input type="checkbox" /> Label</div>
        <div><input type="checkbox" /> Label</div>
        <input type="text" /><button>Add Item</button>
      </div>
      <div className="comments">
        <span>Comments</span>
        <p></p>
        {comments.map((comment: any, index: number) => 
          <div key={index} className="comment">
            <div style={{border: "1px solid black", padding: "4px"}}>User: {comment.user}</div>
            <CustomTextArea
              className="comment-input"
              placeholder=""
              count={512}
              value={comment.text}
            />
          </div>
        )}
      </div>
      <div className="textarea-100">
        <CustomTextArea
          className="comment-input"
          placeholder="New Comment"
          count={512}
          value=""
        />
      </div>
      <div className="toolbar">
        <button className="ml-5" onClick={addComment}>Add Comment</button>
        <button className="ml-5">Cancel</button>
      </div>
      <div className="toolbar" style={{marginTop: "5px"}}>
        <button className="ml-5" >Save Card</button>
        <button className="ml-5" >Delete Card</button>
        <button className="ml-5" >Cancel</button>
      </div>
    </div>
  );
}

type Props = {
  visible: boolean,
};

export default KanbanCardView;
