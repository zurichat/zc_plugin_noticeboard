import React, { useState, useRef } from 'react';
import './CreateNotice.css';
import bold_icon from '../../../assets/bold.svg';
import code_icon from '../../../assets/code.svg';
import italic_icon from '../../../assets/italic.svg';
import link_icon from '../../../assets/link.svg';
import line_through_icon from '../../../assets/line-through.svg';
import bullet_list_icon from '../../../assets/bullet-list.svg';
import text_transform_icon from '../../../assets/text-transform.svg';
import at_icon from '../../../assets/at.svg';
import emoji_icon from '../../../assets/emoji.svg';
import file_link_icon from '../../../assets/file-link.svg';
import number_list_icon from '../../../assets/number-list.svg';
import cancel_icon from '../../../assets/cancel.svg';
import { Button } from '@material-ui/core'

function CreateNotice() {
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [activeOption, setActiveOption] = useState('');
  const noticeContentRef = useRef();

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
        <span>
          <label>Message:</label>
          <textarea
            className="editable"
            placeholder="Enter the content of your notice" 
            ref={noticeContentRef}
            value={noticeContent}
            onInput={e => setNoticeContent(e.target.value)}>
          </textarea>
        </span>
      </form>
      <div className="settings-container">
        <div className="text-formaters">
          <div>
            <img src={bold_icon} alt="bold" />
            <img src={italic_icon} alt="italic" />
            <img src={line_through_icon} alt="unknown" />
            <img src={code_icon} alt="code" />
            <img src={link_icon} alt="link" />
            <img src={bullet_list_icon} alt="bulle list" />
            <img src={number_list_icon} alt="number list" />
          </div>
        </div>
        <div className="content-formaters">
          <span className={activeOption === 'text-transform' ? 'active' : ''}
            onClick={() => setActiveOption('text-transform')}>
            <img src={text_transform_icon} alt="text-transform" />
          </span>
          <span onClick={() => {
            !noticeContent.includes('@') && setNoticeContent('@' + noticeContent)
          }}><img src={at_icon} alt="at" /></span>
          <span className={activeOption === 'emoji' ? 'active' : ''}
            onClick={() => setActiveOption('emoji')}><img src={emoji_icon} alt="emoji" /></span>
          <span className={activeOption === 'pin' ? 'active' : ''} 
            onClick={() => setActiveOption('pin')}><img src={file_link_icon} alt="pin" /></span>
          <div className="text-formaters-sm" 
            style={{display: `${activeOption === 'text-transform' ? 'flex' : 'none'}`}}>
            <p className="toggler" onClick={() => setActiveOption('')}><img src={cancel_icon} /></p>
            <img src={bold_icon} alt="bold" />
            <img src={italic_icon} alt="italic" />
            <img src={line_through_icon} alt="unknown" />
            <img src={code_icon} alt="code" />
            <img src={link_icon} alt="link" />
            <img src={bullet_list_icon} alt="bullet list" />
            <img src={number_list_icon} alt="number list" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNotice;