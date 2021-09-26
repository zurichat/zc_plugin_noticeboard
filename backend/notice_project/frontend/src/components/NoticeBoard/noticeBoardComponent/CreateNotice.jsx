import React, { useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import draftToMarkdown from "draftjs-to-markdown";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { Formik } from "formik";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { makeStyles } from "@material-ui/core/styles";

import imageIcon from "./Text-editor/icons/attachment.svg";
import ErrorDialog from "./CreateNoticeDialogs/ErrorDialog";
import SuccessDialog from "./CreateNoticeDialogs/SuccessDialog";
import {
  MentionAdder,
  ToggleToolbar,
} from "./Text-editor/Text_editor_features";
import "../noticeBoardComponent/Text-editor/Text-editor.css";
import "./CreateNotice.css";

import { DataContext } from "../../../App";

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
  buttonSubmit: {
    color: "white",
  },
}));

const initialValues = {
  title: "",
  recipient: "",
  message: "",
};

const maxChars = 1000;

function CreateNotice() {
  const classes = useStyles();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setErrorMessage("");
    document.getElementById("messageError").innerHTML = "";
  };

  // Read Organization ID
  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  //CREATE NOTICE API CALL STARTS
  const api = axios.create({
    baseURL: "https://noticeboard.zuri.chat/api/v1",
  });

  const onSubmitHandler = async (values) => {
      if (isChecked){
        fetch('https://noticeboard.zuri.chat/api/v1/sendemail?sendemail=True&org=6145b49e285e4a18402073bc');
      }
    
    values.message = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    const request = {
      title: values.title,
      message: values.message,
    };
    if (values.title === "" || setEditorState === "") {
      return (
        setErrorMessage("Field cannot be empty"),
        setErrorTitle("Field cannot be empty")
      );
    }

    try {
      const res = await api.post(
        `organisation​/614679ee1a5607b13c00bcb7/create`,
        request
      );
      //Return input field to blank
      values.title = "";
      setEditorState("");

      return setOpenSuccessDialog(true);
    } catch (err) {
      // console.log(err)
      setOpenErrorDialog(true);
    }
  };

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
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={classes.header}>
                <Box className={classes.headerText}>Create Notice</Box>
                <Box
                  display="flex"
                  margin="0 auto"
                  flexDirection="column"
                  width="fit-content"
                  justifyContent="center"
                >
                  <Hidden mdDown>
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.button}
                      color="primary"
                      disableRipple
                    >
                      {isSubmitting ? (
                        <CircularProgress className={classes.buttonSubmit} />
                      ) : (
                        "Publish Notice"
                      )}
                    </Button>
                    <br />
                    <p>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setIsChecked((prevIsChecked) => !prevIsChecked)
                        }
                      />
                      &nbsp; Notify Members Via Email
                    </p>
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
                    onChange={(e) => {
                      handleChange(e);
                      setErrorTitle("");
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter the subject of your notice"
                    type="text"
                    variant="outlined"
                    inputProps={{
                      minLength: 5,
                      maxLength: 30,
                    }}
                    // helperText="You can type 30 characters or less"
                  />
                  <p id="titleError" style={{ color: "red", fontSize: "14px" }}>
                    {errorTitle}
                  </p>
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
                <p id="messageError" style={{ color: "red", fontSize: "14px" }}>
                  {errorMessage}
                </p>
              </Box>
              <Hidden lgUp>
                <Box
                  pt="20px"
                  pb="30px"
                  display="flex"
                  margin="0 auto"
                  flexDirection="column"
                  width="fit-content"
                  justifyContent="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    disableRipple
                  >
                    {isSubmitting ? (
                      <CircularProgress className={classes.buttonSubmit} />
                    ) : (
                      "Publish Notice"
                    )}
                  </Button>
                  <br />
                  <p>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        setIsChecked((prevIsChecked) => !prevIsChecked)
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
      <SuccessDialog
        open={openSuccessDialog}
        handleClose={handleCloseSuccessDialog}
      />
    </div>
  );
}

export default CreateNotice;
