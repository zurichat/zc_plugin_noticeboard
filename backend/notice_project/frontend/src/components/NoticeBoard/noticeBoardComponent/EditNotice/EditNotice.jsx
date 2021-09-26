import React, { useState, useEffect, useContext } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


import draftToMarkdown from "draftjs-to-markdown";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { useFormik } from "formik";

import imageIcon from "../Text-editor/icons/attachment.svg";
import ErrorDialog from "../CreateNoticeDialogs/ErrorDialog";
import SuccessDialog from "../CreateNoticeDialogs/SuccessDialog";
import { DataContext } from "../../../../App";


import {
    MentionAdder,
    ToggleToolbar,
} from "../Text-editor/Text_editor_features";
import "../../noticeBoardComponent/Text-editor/Text-editor.css";

import logo from "../../../../assets/svg/logo.svg";

import '../EditNotice/editNotice.css';
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../../../Data-fetcing";

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
    const history = useHistory();
    let { currentNoticeID } = useParams();
    const classes = useStyles();
    const [oldTitle, setOldTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(false)
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty();
    }
    );

    const _globalData = useContext(DataContext);
    const org_id = _globalData.Organizations[0];
    const {selectedNotice} = useContext(UserContext);

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
    const orgId = "614679ee1a5607b13c00bcb7";
    const onSubmitHandler = async ( values, noticeID) => {

        if (formik.values.title === '') {
            return (
                setErrorMessage('Field cannot be empty'),
                setErrorTitle('Field cannot be empty')
            )
        }
        setLoading(true)
        try {
            formik.values.message = draftToMarkdown(
                convertToRaw(editorState.getCurrentContent())
            );
             const formValues = {
                 title: values.title,
                message: values.message 
                }

               
            fetch(`https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices/${selectedNotice._id}/edit`, {
                headers: { 'Content-Type': 'application/json'},
                method: 'PUT',
                 body: JSON.stringify(formValues)
             }).then((res) => {
                 
                if (res.status >= 200 && res.status <= 299){
                  
                   setTimeout(() => {
                        
                        history.push("/noticeboard/admin-notice");
                       }, 2000);
                      setLoading(false)

            }
                 
             })
             setType(true);
             setOpenSuccessDialog(true);
        }
        catch (err) {
            setOpenErrorDialog(true);
        }
    }

    const _handleBeforeInput = (input) => {
        const inputLength = editorState.getCurrentContent().getPlainText().length;
        if (input && inputLength >= maxChars) {
            return "handled";
        }
    };

    useEffect( () => {
    setLoading(false);
    setOldTitle(selectedNotice.title);
     const contentState = ContentState.createFromText(selectedNotice?.message);
     console.log(contentState, "contetn");
    setEditorState(EditorState.createWithContent(contentState));
    }, [])


    const formik = useFormik({
        initialValues: {
            title: "",
        },
        onSubmit: (values, actions) => {
            onSubmitHandler(values, currentNoticeID);
            actions.resetForm({
                title: "",
            })
        },
    });

    if (loading) {
        return (
            <div className="preloader">
                <img className="logo" src={logo} alt="logo" />
                <h1 className="isLoading">Loading...</h1>
                <i className="fas fa-spinner fa-spin"></i>
            </div>
        )
    }

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
                                value={formik.values.title || oldTitle }
                                onChange={formik.handleChange}
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
                type={type}
            />
        </div>
    );
};

export default EditNotice;
