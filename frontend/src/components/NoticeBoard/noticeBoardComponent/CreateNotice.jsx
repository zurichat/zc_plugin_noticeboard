import React, { useState, useRef } from 'react';
import './CreateNotice.css';
import { Button } from '@material-ui/core';
import TextEditor from './Text-editor/Rich-text';
<<<<<<< HEAD
import NewNotice from './New_Notice/new_notice'
=======
>>>>>>> b5139bfd04cf0466dc4225ba6b3cfbc4b21a097c

function CreateNotice() {
  const [setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  // const [noticeContent, setNoticeContent] = useState('');
  // const [activeOption, setActiveOption] = useState('');
  // const noticeContentRef = useRef();

  function handleSubmit() {
    // handle notice submission
  }

  return (
    <div className="dashboard-container">
      <header>
        <h3 className="heading">Create New Notice</h3>
        <Button onClick={handleSubmit}>Publish Notice</Button>
      </header>

      <form>
<<<<<<< HEAD
          <NewNotice />
=======
        <div>
          <span className="input-group">
            <label>Title/Subject:</label>
            <input type="text" placeholder="Enter the subject of your notice"
              onChange={e => setTitle(e.target.value)} />
          </span>
          <span className="input-group">
            <label>To:</label>
            <select value={recipient} onChange={e => setRecipient(e.target.value)}>
              <option>Mark</option>
              <option>Steve</option>
              <option>James</option>
            </select>
          </span>
        </div>
>>>>>>> b5139bfd04cf0466dc4225ba6b3cfbc4b21a097c
      </form>

      <div className="TextEditor-wrapper">
        <TextEditor />
      </div>
      
    </div>
  )
}

export default CreateNotice;