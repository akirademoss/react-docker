import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import blue from '@material-ui/core/colors/blue';

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
        width: 300,
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
    modalButton: {
        width: 280,
      
        textTransform: 'none',
        fontSize: '16px',
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[800],
        },
    },
    input: {
        opacity: 0,
        height: 0,
        width: 0,
        margin: 0
    },
    modalButtonRemove: {
        width: 280,
        backgroundColor: blue[700],
        '&:hover': {
            backgroundColor: blue[800],
        },
        
        textTransform: 'none',
        fontSize: '16px',
    },
    modalButtonCancel: {
        width: 280,
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
       
        textTransform: 'none',
        fontSize: '16px',
    },
})

class ChangePicModalMobile extends React.Component {
    render() {
        const { classes, show, handleCloseModal, onFileChange, handleRemove } = this.props;
        return (

            <div>
                <Modal
                    open={show}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={classes.modalUpload}>

                        <label htmlFor="icon-button-file">
                            <input
                                accept="image/*"
                                id="icon-button-file"
                                multiple
                                type="file"
                                className={classes.input}
                                onChange={onFileChange}
                            />
                            <Button
                                disableRipple
                                variant="contained"
                                component="span"
                                classes={{ root: classes.modalButton }}
                            >
                                Upload Photo
                            </Button>
                        </label>

                        <Button
                            disableRipple
                            variant="contained"
                            color="primary"
                            classes={{ root: classes.modalButtonRemove }}
                            onClick={handleRemove}
                        >
                            Remove Photo
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

export default (withStyles(styles, { withTheme: true })(ChangePicModalMobile));;