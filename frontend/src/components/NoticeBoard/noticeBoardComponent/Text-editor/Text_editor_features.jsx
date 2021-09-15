import React, { Component } from 'react'
import './Text_editor_features.css'
import PropTypes from 'prop-types'
import { EditorState, Modifier } from 'draft-js'
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import mentionIcon from './icons/mentionAdder.svg'

// this adds @ to the text for easy menton function
class MentionAdder extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
  }

  addMention = () => {
    const { editorState, onChange } = this.props
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '@',
      editorState.getCurrentInlineStyle()
    )
    onChange(EditorState.push(editorState, contentState, 'insert-characters'))
  }

  render () {
    return (
      <div onClick={this.addMention} className='rightIcons'>
        {<img src={mentionIcon} alt='attachment icon' />}
      </div>
    )
  }
}

// This toogles the visiblity of the tool components on the left

class ToggleToolbar extends Component {
  ToggleToolbar = () => {
    const tabs = document.querySelectorAll('.rdw-invisible')
    const ToggleToolbarBtn = document.querySelector('.ToggleToolbar-btn')

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('rdw-visible')
    }

    ToggleToolbarBtn.classList.toggle('ToggleToolbar-btn-active')
  }

  render () {
    return (
      <div
        onClick={this.ToggleToolbar}
        className='rightIcons ToggleToolbar-btn'
      >
        Aa
      </div>
    )
  }
}

export { ToggleToolbar, MentionAdder }
