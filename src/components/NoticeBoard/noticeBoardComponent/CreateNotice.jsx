import React from "react";
import "./CreateNotice.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import TextEditor from "./Text-editor/Rich-text";
import NewNotice from "./New_Notice/new_notice";

function CreateNotice() {
  // const [title, setTitle] = useState('');
  // const [recipient, setRecipient] = useState('');
  // const [noticeContent, setNoticeContent] = useState('');
  // const [activeOption, setActiveOption] = useState('');
  // const noticeContentRef = useRef();

  return (
    <div className="dashboard-container">
      <header>
        <h3 className="heading">Create New Notice</h3>
        <Link to="/admin-notice">
          <Button variant="contained">Publish Notice</Button>
        </Link>
      </header>

      <form>
        <NewNotice />
      </form>

      <div className="TextEditor-wrapper">
        <TextEditor />
      </div>

      <div className="publish-notice-button">
        <Link to="/admin-notice">
          <Button variant="contained">Publish Notice</Button>
        </Link>
      </div>
    </div>
  );
}

export default CreateNotice;
