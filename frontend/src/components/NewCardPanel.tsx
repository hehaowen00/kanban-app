import { ReactElement, KeyboardEvent, useEffect, useState, Key } from "react";
import CustomTextArea from "./custom/CustomTextArea";
import { useDispatch, useSelector } from "react-redux";

import "./styles/CardView.css";
import "./styles/Elements.css";

const MAX_TITLE_LENGTH = 1024;
const MAX_DESCRIPTION_LENGTH = 2048;
const MAX_COMMENT_LENGTH = 1024;

function defaultCard(id: any, cardObject: any) {
  if (id === null) {
    return {
      title: "",
      description: "",
      comments: [] as any,
    };
  }
  return cardObject;
}

function NewCardPanel() {
  const dispatch = useDispatch();

  const cardView = useSelector((state: any) => { return { ...state.cardView } });
  const { inputs, currentCardId, currentListId, isNewCard, visible } = cardView;
  const { comment } = inputs;

  const cardObject = defaultCard(null, null);

  const [tempCard, setTempCard] = useState({ ...cardObject });
  const { title, description, comments } = tempCard;

  const updateCard = (patch: any) => {
    dispatch({type: "UpdateCardState", patch });
  }

  const closeCardView = () => {
    dispatch({ type: "CloseCardView" });
  }

  const updateInput = (field: string, value: any) => {
    dispatch({ type: "UpdateInput", field, value });
  }

  const onTitleBlur = () => {
    if (currentCardId !== undefined && title.trim() !== "") {
      saveCard(currentCardId, { title: title.trim() })
    }
  };

  const onTitleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let title_ = title.trim();

      if (currentCardId !== null && title_ !== "") {
        saveCard(currentCardId, { title: title_ })
      }
    }
  }

  const saveCard = (cardId: string, patch: any) => {
    if (patch.title === undefined || patch.title !== "") {
      dispatch({ type: "UpdateCard", cardId, patch })
    }
    if (currentCardId === null) {
      dispatch({ type: "NewCard", listId: currentListId, card: tempCard });
    }
  }

  const onTitleChange = (event: any) => {
    setTempCard({ ...tempCard, title: event.target.value });
  };

  const onTitlePaste = (event: any) => {
    const append = event.clipboardData.getData("text");
    setTempCard({ ...tempCard, title: title + append });
  };

  const onDescriptionChange = (event: any) => {
    updateCard({ description: event.target.value })
  };

  const onDescriptionPaste = (event: any) => {
    const append = event.clipboardData.getData("text");
    updateCard({ description: description + append })
  };

  const updateComment = (event: any) => {
    updateInput("comment", event.target.value);
  }

  const pasteComment = (event: any) => {
    const append = event.clipboardData.getData("text");
    updateInput("comment", comment + append);
  }

  const addComment = () => {
    if (comment !== "") {
      updateCard({
        comments: [...comments, { user: "test", text: comment }],
      });
      updateInput("comment", "");
    }
  };

  const [descSpellCheck, setDescSpellCheck] = useState(false);

  const save = () => {
    saveCard(currentCardId, tempCard);
  };

  const titleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  const descKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  const submitComment = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  }

  return (
    <div
      className="list card-view"
      style={{ display: visible ? "block" : "none" }}
    >
      <CustomTextArea 
        className="card-title"
        placeholder="Title"
        onKeyPress={onTitleKeyPress}
        onBlur={onTitleBlur}
        count={MAX_TITLE_LENGTH}
        onChange={onTitleChange}
        onPaste={onTitlePaste}
        spellCheck={descSpellCheck}
        value={title}
        required
      />
      <div className="card-view-body">
        <CustomTextArea
          className="description"
          placeholder="Description"
          onKeyPress={descKeyDown}
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
            count={MAX_COMMENT_LENGTH}
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
      <div className="comments" style={{ display: isNewCard ? "block" : "block" }}>
        <span><b>Comments</b></span>
        <div className="comment-view">
          {comments.map((comment: any, index: number) => 
            <div key={index} className="comment">
              <div className="header">User: {comment.user}</div>
              <div className="body">
              {comment.text}
              </div>
            </div>
          )}
        </div>
        <div className="textarea-100">
          <CustomTextArea
            className="comment-input"
            placeholder="New Comment"
            onKeyDown={submitComment}
            onChange={updateComment}
            onPaste={pasteComment}
            count={512}
            value={comment}
          />
        </div>
        <div className="toolbar">
          <button className="ml-5" onClick={addComment}>Add Comment</button>
          <button className="ml-5">Cancel</button>
        </div>
      </div>
      <div className="toolbar" style={{marginTop: "5px"}}>
        <button className="ml-5" onClick={save}>Save Card</button>
        <button className="ml-5" >Delete Card</button>
        <button className="ml-5" onClick={closeCardView}>Cancel</button>
      </div>
    </div>
  );
}

export default NewCardPanel;
