import React, { ReactElement, useEffect, useState } from "react";
import CustomTextArea from "./custom/CustomTextArea";
import { connect } from "react-redux";

import "./styles/CardView.css";
import "./styles/Elements.css";
import { Card } from "../types/Kanban";

const MAX_TITLE_LENGTH = 512;
const MAX_DESCRIPTION_LENGTH = 1024;

function KanbanCardView({ card, listId, visible, cancelCard, newCard }: Props): ReactElement {
  var cardId: string | null = null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([{user: "testing", text: "comment text"}]);

  if (cardId !== null) {
    setTitle(card.title);
    setDescription(card.description);
    cardId = card.id; 
  }

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

  console.log(comments);

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

    newCard(cardId, listId, contents);
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
        {comments.map((comment: any) => 
          <div className="comment">
          <div>{comment.user}</div>
          <div className="ml-5">{comment.text}</div>
          </div>
        )}
      </div>
      <div className="textarea-100">
        <CustomTextArea
          className="comment-input"
          placeholder="Comment"
          count={512}
          value=""
        />
      </div>
      <div className="toolbar">
        <button className="ml-5" onClick={addComment}>Add Comment</button>
        <button className="ml-5">Cancel</button>
      </div>
      <div className="toolbar" style={{marginTop: "5px"}}>
        <button className="ml-5" onClick={saveChanges}>Save Card</button>
        <button className="ml-5" onClick={cancelCard}>Cancel</button>
      </div>
    </div>
  );
}

type Props = {
  listId: string,
  visible: boolean,
  cancelCard: any,
  newCard: any,
  card: Card,
};

const mapStateToProps = (state: any, props: any) => {
  const { cardId, listId, visible } = state.card;

  let card = null;

  if (cardId !== null) {
    card = state.board.cards[cardId];
  }

  return {
    listId,
    card,
    visible,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    newCard: async (cardId: string, listId: string, contents: any)  => {
      await dispatch({type: "AddCard", cardId, listId, contents });
      await dispatch({type: "CancelCard" });
    },
    cancelCard: () => dispatch({type: "CancelCard"})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanCardView);
