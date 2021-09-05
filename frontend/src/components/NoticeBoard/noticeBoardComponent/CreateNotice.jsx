import React, { useState, useRef } from 'react';
import './CreateNotice.css';
import { Button } from '@material-ui/core';
import TextEditor from './Text-editor/Rich-text';
import NewNotice from './New_Notice/new_notice'

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
          <NewNotice />
      </form>

      <div className="TextEditor-wrapper">
        <TextEditor />
      </div>
      
    </div>
  )
}

export default CreateNotice;