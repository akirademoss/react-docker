import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from "@material-ui/core/Modal";



const darkTheme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                margin: 10,
                borderBottom: '1px solid grey',
                borderTop: '1px solid grey',
                borderLeft: '1px solid grey',
                borderRight: '1px solid grey',
                borderColor: fade('#ffffff', 0.5),
            }
        },
    },
    palette: {
        type: 'dark',
        primary: {
            main: red[700],
        },
        secondary: {
            main: '#000000',
        },
        background: {
            paper: fade('#000000', 0.5),
            default: '#000000',
        }
    },
    typography: {
        fontFamily: [
            'sans-serif',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    button: {
        textTransform: 'none',
    },
    MuiAppBar: {
        color: 'secondary',
    }
});


const styles = darkTheme => ({
    modalUpload: {
        [darkTheme.breakpoints.up('sm')]: {
        },
        minheight: 200,
        minWidth: 400,
        position: 'absolute',
        backgroundColor: grey[700],
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: darkTheme.shadows[5],
        padding: darkTheme.spacing(1),
        "&:focus": {
            outline: "none"
        },
        borderRadius: darkTheme.shape.borderRadius,
    },
    avatarMd: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        margin: "auto",
        width: "100px",
        height: "100px",
        borderRadius: 100
    },
    modalButton: {
        width: '95%',
        minWidth: 380,
        textTransform: 'none',
        fontSize: '16px',
    },
    modalButtonCancel: {
        width: '95%',
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
        minWidth: 380,
        textTransform: 'none',
        fontSize: '16px',
    },
})

class DelFollowModal extends React.Component {
    render() {
        const { classes, show, handleCloseModal, previewImg, username, handleAction, text } = this.props;
        return (

            <div>
                <Modal
                    open={show}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={classes.modalUpload}>
                        <Box m={1} />
                        {previewImg && <img src={previewImg} className={classes.avatarMd} />}
                        {!previewImg && <AccountCircle className={classes.avatarMd} />}

                        <Box m={1} />
                        <Typography variant="subtitle2"> {text} @{username}?</Typography>
                        <Box m={1} />

                        <Button
                            disableRipple
                            variant="contained"
                            color="primary"
                            component="span"
                            classes={{ root: classes.modalButton }}
                            onClick={handleAction}
                        >
                            {text}
                            </Button>
                        <Button
                            disableRipple
                            variant="contained"
                            color="primary"
                            classes={{ root: classes.modalButtonCancel }}
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(DelFollowModal));;