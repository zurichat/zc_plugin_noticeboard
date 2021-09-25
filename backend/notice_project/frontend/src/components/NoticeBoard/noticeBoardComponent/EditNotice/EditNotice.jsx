import React, { useState,useEffect } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


import draftToMarkdown from "draftjs-to-markdown";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";


import axios from "axios";
import { useFormik } from "formik";

import imageIcon from "../Text-editor/icons/attachment.svg";
import ErrorDialog from "../CreateNoticeDialogs/ErrorDialog";
import SuccessDialog from "../CreateNoticeDialogs/SuccessDialog";


import {
    MentionAdder,
    ToggleToolbar,
} from "../Text-editor/Text_editor_features";
import "../../noticeBoardComponent/Text-editor/Text-editor.css";


import '../EditNotice/editNotice.css';

import {useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    headerText: {
        flexGrow: 1,
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "30px",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "flex-start",
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

const maxChars = 1000;

const EditNotice = () => {
    let {currentNoticeID} = useParams();
    const classes = useStyles();
    const [currentMessage, setCurrentMessage] = useState({});
    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const [editorState, setEditorState] = useState( () => {
        EditorState.createEmpty();
    }         
    );
    
    async function getAllNotices() {
        try {
          let response = await axios.get("https://noticeboard.zuri.chat/api/v1/notices");
          let result = await response.data;
          const currentNoticeElement = result.data.find(element => {
            return element._id == currentNoticeID;
        })
         setCurrentMessage(currentNoticeElement);
        }
        catch (err) {
          console.log(err);
        }
    }
    
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

    const onSubmitHandler = async (values,noticeID) => {
        
        if (values.title === '' || setEditorState === '') {
            return (
              setErrorMessage('Field cannot be empty'),
              setErrorTitle('Field cannot be empty')
            )
        }
        try{
            formik.values.message = draftToMarkdown(
                convertToRaw(editorState.getCurrentContent())
            );
            await axios.put(`https://noticeboard.zuri.chat/api/v1/notices/${noticeID}/edit`,{title: formik.values.title, message : formik.values.message});
            return setOpenSuccessDialog(true);
        }
        catch(err){
           setOpenErrorDialog(true);
        }
    }

    const _handleBeforeInput = (input) => {
        const inputLength = editorState.getCurrentContent().getPlainText().length;
        if (input && inputLength >= maxChars) {
            return "handled";
        }
    };

    useEffect(() => {
        getAllNotices();     
   
    }, [])
      

    const formik = useFormik({
        initialValues: {
            title: "",
            message: "",
        },
        onSubmit: (values,actions) => {
            onSubmitHandler(values,currentNoticeID);
            actions.resetForm({
                title : "",
                message: "",
            })
        },
    });
    
    return (
        <div className="edit__dashboard-container">
            <Box className={classes.page}>
                <form onSubmit={formik.handleSubmit}>
                    <Box className={classes.header}>
                        <Box className={classes.headerText}>Edit Notice</Box>
                        <Box>
                            {/* <Hidden mdDown> */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.button}
                                    color="primary"
                                    disableRipple
                                >
                                    Save Notice
                                </Button>
                            {/* </Hidden> */}
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
                                value= {formik.values.title}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setErrorTitle("");
                                }}
                                onBlur={formik.handleBlur}
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
                </form>
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
};

export default EditNotice;
