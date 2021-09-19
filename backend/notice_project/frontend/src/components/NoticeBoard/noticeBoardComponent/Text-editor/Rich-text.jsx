import React, { Component } from 'react';
import "./Text-editor.css";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import imageIcon from "./icons/attachment.svg";
import {MentionAdder, ToggleToolbar} from "./Text_editor_features"


// This is the editor Component class
class TextEditor extends Component {
  constructor(props){
      super(props)
      this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onEditorStateChange =(editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    

    return (
      <div className="text-editor-wrapper">
        <label>Message:</label>

        <Editor
          placeholder= "Enter the content of your notice"
          wrapperClassName="text-editor"
          editorClassName="textarea"
          toolbarClassName="toolbarClass"
          onEditorStateChange={this.onEditorStateChange}
          toolbarCustomButtons={[<MentionAdder />, <ToggleToolbar />]}
          

          toolbar={{
            options: ['fontSize', 'inline', 'list', 'textAlign', 'link', 'image', 'emoji'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
              className: "rdw-invisible"
            },
            fontSize: {
              className: "rdw-invisible"
            },
            link: {
              className: "rdw-invisible",
              options: ['link'],
            },
            textAlign: {
              className: "rdw-invisible",
            },
            list: {
              className: "rdw-invisible",
              options: ['unordered', 'ordered']
            },
            emoji: {
              
            },
            image: {
              icon: imageIcon,
              uploadEnabled: true,
              urlEnabled: true,
              uploadCallback: this.uploadImageCallback,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            }
          }}

          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}

        />
      </div>
    );
  }
}

// && draftToMarkdown(convertToRaw(editorState.getCurrentContent())) saving for later

export default TextEditor;