function AddAttachment({}) {
  return (
    <div className="comments" style={{border: "1px solid black"}}>
      <div style={{display: "flex", flex: 1, flexDirection: "column" }}>
        <input type="file" />
        <div style={{display: "flex", flex: 1, flexDirection: "row-reverse" }}>
        <button>Cancel</button>
        <button>Add Attachment</button>
        </div>
      </div>
    </div>
  );
}

export default AddAttachment;
