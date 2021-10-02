import React, { useState, useContext } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import TextField from '@material-ui/core/TextField'
import draftToMarkdown from 'draftjs-to-markdown'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { makeStyles } from '@material-ui/core/styles'

import imageIcon from './Text-editor/icons/attachment.svg'
import bold from './Text-editor/icons/bold.svg'
import italic from './Text-editor/icons/italic.svg'
import justify from './Text-editor/icons/justify.svg'
import left from './Text-editor/icons/left.svg'
import link from './Text-editor/icons/link.svg'
import middle from './Text-editor/icons/middle.svg'
import monospace from './Text-editor/icons/monospace.svg'
import ol from './Text-editor/icons/ol.svg'
import right from './Text-editor/icons/right.svg'
import smiley from './Text-editor/icons/smiley.svg'
import strikethrough from './Text-editor/icons/strikethrough.svg'
import subscript from './Text-editor/icons/subscript.svg'
import superscript from './Text-editor/icons/superscript.svg'
import ul from './Text-editor/icons/ul.svg'
import underline from './Text-editor/icons/underline.svg'
import indent from './Text-editor/icons/indent.svg'
import outdent from './Text-editor/icons/outdent.svg'


import ErrorDialog from './CreateNoticeDialogs/ErrorDialog'
import { MentionAdder, ToggleToolbar } from './Text-editor/Text_editor_features'
import { UserInfoContext } from '../../../App'
import { UserContext } from '../../../Data-fetcing'
import '../noticeBoardComponent/Text-editor/Text-editor.css'
import './CreateNotice.css'

import { DataContext } from '../../../App'
import Subscription from '../EmailSubscribe/Subscription'



const useStyles = makeStyles(theme => ({
  headerText: {
    flexGrow: 1,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '30px'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  page: {
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      padding: '30px 20px 0px 20px'
    }
  },
  form: {
    margin: theme.spacing(1)
  },
  formControl: {
    width: '100%'
  },
  button: {
    color: 'white'
  },
  recipient: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  buttonSubmit: {
    color: 'white'
  }
}))

const initialValues = {
  title: '',
  recipient: '',
  message: ''
}

const maxChars = 1000

function CreateNotice() {
  const userData = useContext(UserInfoContext)
  const classes = useStyles()
  const { push } = useHistory()
  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),

  )





  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false)
  }

  if (userData === null) {
    push('/login')
  }



  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    setErrorMessage('')
    document.getElementById('messageError').innerHTML = ''
  }

  // Read Organization ID
  const _globalData = useContext(DataContext)
  const org_id = _globalData.Organizations[0]
  const should_send = true

  //CREATE NOTICE API CALL STARTS
  const api = axios.create({
    baseURL: 'https://noticeboard.zuri.chat/api/v1'
  })

  const onSubmitHandler = async values => {
    if (isChecked) {
      fetch(
        `https://noticeboard.zuri.chat/api/v1/sendemail?sendemail=${should_send}&org=${org_id}`
      )
    }

    if (isChecked) {
      fetch(
        `http://127.0.0.1:8000/api/v1/email-notification?org=6145b49e285e4a18402073bc&user=61545a1da999ef8386e80adc&send=1`
      )
    }

    values.message = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    )
    const request = {
      title: values.title,
      message: values.message,
      author_name: userData?.first_name || 'null',
      author_username: userData?.user_name || 'null',
      author_img_url: userData?.image_url || 'null'
    }

    if (values.title === '' || setEditorState === '') {
      return (
        setErrorMessage('Field cannot be empty'),
        setErrorTitle('Field cannot be empty')
      )
    }

    try {
      const res = await api.post(
        `/organisation/${userData?.currentWorkspace}/create`,
        request
      )
      //Return input field to blank
      values.title = ''
      setEditorState('')
      return push('/home')
    } catch (err) {
      // console.log(err)
      setOpenErrorDialog(true)
    }
  }

  const _handleBeforeInput = input => {
    const inputLength = editorState.getCurrentContent().getPlainText().length
    if (input && inputLength >= maxChars) {
      return 'handled'
    }
  }

  //validation for pasted text

  //N.B: Comment: Untested codes. It throws a reference error that makes this page blank!!!

  // handlePastedText = (pastedText) => {
  //   const inputLength = editorState.getCurrentContent().getPlainText().length;
  //   if (inputLength + pastedText.length >= maxChars) {
  //     return "handled";
  //   }
  // };

async function uploadImageCallBack2(file) {
  return new Promise(
    (resolve, reject) => {
		var data = new FormData()
		data.append('FILES', [file])
		try {
			let res = fetch(`https://noticeboard.zuri.chat/api/v1/organisation/${org_id}/attachfile`, {
				method: 'POST',
				body: data
		  	})
			console.log(res)
		} catch (err) {
			console.log(error)
			reject(error);
		}
		
    //   const xhr = new XMLHttpRequest();
	//   console.log("this woeked");
    //   xhr.open('POST', `https://noticeboard.zuri.chat/api/v1/organisation/${org_id}/attachfile`);
    // //   xhr.setRequestHeader('Authorization', 'Client-ID 713b516012986a5');
    //   const data = new FormData();
    //   data.append('FILES', [file]);
    //   xhr.send(data);
    //   xhr.addEventListener('load', () => {
    //     const response = JSON.parse(xhr.responseText);
    //     console.log(response)
    //     resolve(response);
    //   });
    //   xhr.addEventListener('error', () => {
    //     const error = JSON.parse(xhr.responseText);
    //     console.log(error)
    //     reject(error);
    //   });
    }
  );
}

async function uploadImageCallBack(file) {
	var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TXpJd05UVTNNWHhIZDNkQlIwUlplRTVVYUdsYVJGRjVUVEpGZUZwVVVUVlpha1pzVGxSRk1rNVhVVE5PUVQwOWZDYmxOT0ZUR2RvbnEydVJWcXFzZlpQaEVua1NzR3U3RGNfYUh1NW0xSUo3IiwiZW1haWwiOiJwYXBham9uYXR1czEwQHp1cmkuY2hhdCIsImlkIjoiNjE1OGJkNDIzYTFlNDliMWU1MTY1ZDc0Iiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6Nzk0MDQwNDY2MywiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.K7e45i25eJdsz-ObIUh6cQnYi0NffmS4Bv1jdds_s-k");

var formdata = new FormData();
formdata.append("file", file);

var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	body: formdata,
	redirect: 'follow'
  };
  
  fetch(`https://noticeboard.zuri.chat/api/v1/organisation/${org_id}/attachfile`, requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
}

  return (
    <div className='dashboard-container'>
      <Box className={classes.page}>
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={classes.header}>
                <Box className={classes.headerText}>Create Notice</Box>
                <Box
                  display='flex'
                  margin='0 auto'
                  flexDirection='column'
                  width='fit-content'
                  justifyContent='center'
                >
                  <Hidden mdDown>
                    <Button
                      type='submit'
                      variant='contained'
                      className={classes.button}
                      color='primary'
                      disableRipple
                    >
                      {isSubmitting ? (
                        <CircularProgress className={classes.buttonSubmit} />
                      ) : (
                        'Publish Notice'
                      )}
                    </Button>
                    <br />
                    <p>
                      <input
                        type='checkbox'
                        checked={isChecked}
                        onChange={e =>
                          setIsChecked(prevIsChecked => !prevIsChecked)
                        }
                      />
                      &nbsp; Notify Members Via Email
                    </p>
                  </Hidden>
                </Box>
              </Box>
              <Box className={classes.recipient}>
                <Box
                  width='100%'
                  pt='30px'
                  display='flex'
                  flexDirection='column'
                  className={classes.form}
                >
                  <Box pb='10px'>
                    <Box fontWeight='fontWeightBold'>Title/Subject:</Box>
                  </Box>
                  <TextField
                    id='title'
                    name='title'
                    value={values.title}
                    onChange={e => {
                      handleChange(e)
                      setErrorTitle('')
                    }}
                    onBlur={handleBlur}
                    placeholder='Enter the subject of your notice'
                    type='text'
                    variant='outlined'
                    inputProps={{
                      minLength: 5,
                      maxLength: 30
                    }}
                  // helperText="You can type 30 characters or less"
                  />
                  <p id='titleError' style={{ color: 'red', fontSize: '14px' }}>
                    {errorTitle}
                  </p>
                </Box>
              </Box>
              <Box pt='30px' pb='50px'>
                <Box pb='10px'>
                  <Box fontWeight='fontWeightBold'>Message:</Box>
                </Box>
                <Editor
                  placeholder='Enter the content of your notice(Max 1000)'
                  wrapperClassName='text-editor'
                  editorClassName='textarea'
                  toolbarClassName='toolbarClass'
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  handleBeforeInput={_handleBeforeInput}
                  // handlePastedText={handlePastedText}
                  toolbarCustomButtons={[<MentionAdder />, <ToggleToolbar />]}
                  toolbar={{
                    options: [
                      'fontSize',
                      'inline',
                      'list',
                      'textAlign',
                      'link',
                      'image',
                      'emoji'
                    ],
                    inline: {
                      className: 'rdw-invisible',
                      visible: true,
                      inDropdown: false,
                      bold: { visible: true, icon: bold, },
                      italic: { visible: true, icon: italic, },
                      underline: { visible: true, icon: underline, },
                      strikethrough: { visible: true, icon: strikethrough, },
                      monospace: { visible: true, icon: monospace, },
                      subscript: { visible: true, icon: subscript, },
                      superscript: { visible: true, icon: superscript, }
                    },
                    fontSize: {
                      className: 'rdw-invisible'
                    },

                    link: {
                      className: 'rdw-invisible',
                      options: ['link'],
					  visible: true,
					inDropdown: false,
					link: { visible: true, icon: link, },
					unlink: { visible: true, icon: link, }
                    },
                    textAlign: {
                      className: 'rdw-invisible',
                      visible: true,
                      inDropdown: false,
                      left: { visible: true, icon: left, },
                      center: { visible: true, icon: middle, },
                      right: { visible: true, icon: right, },
                      justify: { visible: true, icon: justify, }
                    },
                    list: {
                      className: 'rdw-invisible',
                      visible: true,
                      inDropdown: false,
                      unordered: { visible: true, icon: ul, },
                      ordered: { visible: true, icon: ol, },
                      indent: { visible: true, icon: indent, },
                      outdent: { visible: true, icon: outdent, }
                    },
                    emoji: {
                      icon: smiley,

                    },
                    image: {
                      icon: imageIcon,
                      uploadEnabled: true,
                      urlEnabled: true,
					  fileupload: true,
					  uploadCallback: uploadImageCallBack, 
					  alt: { present: true, mandatory: false },

                      inputAccept:
                        'image/gif,image/jpeg,image/jpg,image/png,image/svg'
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
                      {
                        text: 'GRAPEFRUIT',
                        value: 'grapefruit',
                        url: 'grapefruit'
                      },
                      { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' }
                    ]
                  }}
                />
                <p id='messageError' style={{ color: 'red', fontSize: '14px' }}>
                  {errorMessage}
                </p>
              </Box>
              <Hidden lgUp>
                <Box
                  pt='20px'
                  pb='30px'
                  display='flex'
                  margin='0 auto'
                  flexDirection='column'
                  width='fit-content'
                  justifyContent='center'
                >
                  <Button
                    type='submit'
                    variant='contained'
                    className={classes.button}
                    color='primary'
                    disableRipple
                  >
                    {isSubmitting ? (
                      <CircularProgress className={classes.buttonSubmit} />
                    ) : (
                      'Publish Notice'
                    )}
                  </Button>
                  <br />
                  <p>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={e =>
                        setIsChecked(prevIsChecked => !prevIsChecked)
                      }
                    />
                    &nbsp; Notify Members Via Email
                  </p>
                </Box>
              </Hidden>
            </form>
          )}
        </Formik>
      </Box>
      <ErrorDialog
        open={openErrorDialog}
        handleClose={handleCloseErrorDialog}
      />
      <Subscription />
    </div>
  )
}

export default CreateNotice
