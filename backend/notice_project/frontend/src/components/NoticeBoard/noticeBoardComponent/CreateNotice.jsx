import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import imageIcon from "./Text-editor/icons/attachment.svg";
import "./CreateNotice.css";
import "../noticeBoardComponent/Text-editor/Text-editor.css";
import {
  MentionAdder,
  ToggleToolbar,
} from "./Text-editor/Text_editor_features";

const useStyles = makeStyles((theme) => ({
  headerText: {
    flexGrow: 1,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "30px",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      fontSize: "30px",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  page: {
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      padding: "30px 20px 0px 20px",
    },
  },
  form: {
    margin: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  button: {
    color: "white",
  },
  recipient: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const initialValues = {
  title: "",
  recipient: "",
  message: "",
};

function CreateNotice() {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  //CREATE NOTICE API CALL STARTS
  const api = axios.create({
    baseURL: "https://noticeboard.zuri.chat/api/v1",
  });

  const history = useHistory();

  const onSubmitHandler = async (values) => {
    values.message = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const request = {
      title: values.title,
      message: values.message,
    };

    try {
      const res = await api.post("/create", request);
      //Return input field to blank
      values.title = "";
      setEditorState("");
      //routes to the admin view notice page
      history.push({
        pathname: "/noticeboard/admin-notice",
      });
      return console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  //CREATE NOTICE API CALL ENDS

  const maxChars = 1000;
  const _handleBeforeInput = (input) => {
    const inputLength = editorState.getCurrentContent().getPlainText().length;
    if (input && inputLength >= maxChars) {
      return "handled";
    }
  };
  //validation for pasted text

  //N.B: Comment: Untested codes. It throws a reference error that makes this page blank!!!

  // handlePastedText = (pastedText) => {
  //   const inputLength = editorState.getCurrentContent().getPlainText().length;
  //   if (inputLength + pastedText.length >= maxChars) {
  //     return "handled";
  //   }
  // };

  return (
    <div className="dashboard-container">
      <Box className={classes.page}>
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
          {({ handleChange, handleSubmit, handleBlur, values }) => (
            <form onSubmit={handleSubmit}>
              <Box className={classes.header}>
                <Box className={classes.headerText}>Create Notice</Box>
                <Box>
                  <Hidden mdDown>
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.button}
                      color="primary"
                      disableRipple
                    >
                      Publish Notice
                    </Button>
                  </Hidden>
                </Box>
              </Box>
              <Box className={classes.recipient}>
                <Box
                  width="100%"
                  pt="30px"
                  display="flex"
                  flexDirection="column"
                  className={classes.form}
                >
                  <Box pb="10px">
                    <Box fontWeight="fontWeightBold">Title/Subject:</Box>
                  </Box>
                  <TextField
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter the subject of your notice"
                    type="text"
                    variant="outlined"
                    inputProps={{
                      maxLength: 30,
                    }}
                    helperText="You can type 30 characters or less"
                  />
                </Box>
              </Box>
              <Box pt="30px" pb="50px">
                <Box pb="10px">
                  <Box fontWeight="fontWeightBold">Message:</Box>
                </Box>
                <Editor
                  placeholder="Enter the content of your notice(Max 1000)"
                  wrapperClassName="text-editor"
                  editorClassName="textarea"
                  toolbarClassName="toolbarClass"
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  handleBeforeInput={_handleBeforeInput}
                  // handlePastedText={handlePastedText}
                  toolbarCustomButtons={[<MentionAdder />, <ToggleToolbar />]}
                  toolbar={{
                    options: [
                      "fontSize",
                      "inline",
                      "list",
                      "textAlign",
                      "link",
                      "image",
                      "emoji",
                    ],
                    inline: {
                      options: ["bold", "italic", "underline", "strikethrough"],
                      className: "rdw-invisible",
                    },
                    fontSize: {
                      className: "rdw-invisible",
                    },
                    link: {
                      className: "rdw-invisible",
                      options: ["link"],
                    },
                    textAlign: {
                      className: "rdw-invisible",
                    },
                    list: {
                      className: "rdw-invisible",
                      options: ["unordered", "ordered"],
                    },
                    emoji: {},
                    image: {
                      icon: imageIcon,
                      uploadEnabled: true,
                      urlEnabled: true,
                      // uploadCallback: this.uploadImageCallback,
                      inputAccept:
                        "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    },
                  }}
                  mention={{
                    separator: " ",
                    trigger: "@",
                    suggestions: [
                      { text: "APPLE", value: "apple", url: "apple" },
                      { text: "BANANA", value: "banana", url: "banana" },
                      { text: "CHERRY", value: "cherry", url: "cherry" },
                      { text: "DURIAN", value: "durian", url: "durian" },
                      { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                      { text: "FIG", value: "fig", url: "fig" },
                      {
                        text: "GRAPEFRUIT",
                        value: "grapefruit",
                        url: "grapefruit",
                      },
                      { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
                    ],
                  }}
                />
              </Box>
              <Hidden lgUp>
                <Box pt="20px" pb="30px" display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    disableRipple
                  >
                    Publish Notice
                  </Button>
                </Box>
              </Hidden>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default CreateNotice;
