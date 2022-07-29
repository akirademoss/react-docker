import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import CloseIcon from '@material-ui/icons/Close';

import FollowInfoMobile from "./FollowInfoMobile";


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
    followGrid: {
        marginBottom: 0,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 70,
    },
    modalCancel: {
        marginTop: 20,
        position: 'absolute',
        marginLeft: 250,

    },
    followingModalCancelBtn: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },

    },
    followModals: {
        [darkTheme.breakpoints.up('sm')]: {
        },
        minheight: 200,
        //minWidth: 400,
        width: 300,
        position: 'absolute',
        backgroundColor: grey[700],
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: darkTheme.shadows[5],
        padding: darkTheme.spacing(1),
        "&:focus": {
            outline: "none"
        },
        borderRadius: darkTheme.shape.borderRadius,
        justifyContent: 'center',
    },
    hl: {
        height: 1,
        width: '104%',
        marginRight: 0,
        transform: 'translate(-2%, 0%)',
        color: grey[700],
    },
    list: {
        maxHeight: 300,
        overflow: 'auto'
    },
    skeleton: {
        //backgroundColor: '#a5a5a5',
        // animation: skeleton-animation 1s infinite linear,
        color: darkTheme.palette.common.white,
        backgroundColor: grey[700],
        width: "26px",
        height: "26px",
    },
    centerDiv: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        flexGrow: 1,
        width: 280,
    },
    header: {
        alignText: 'center',
    },
    centerDiv2: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: '0px',
        marginBottom: '15px',
    },
})

class FollowModalMobile extends React.Component {
    render() {
        const { classes, show, handleCloseModal, infoLoaded, loadingInfo, followInfo, handleShow, 
            handlePageChange, followText, buttonText, followCount } = this.props;
        return (

            <div>
                <Modal
                    open={show}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={classes.followModals}>




                        <Grid container spacing={10} className={classes.followGrid}>


                            <Grid item>
                                <div className={classes.centerDiv}>
                                <Typography variant="h6" className={classes.header}> <b> {followText} </b> </Typography>
                                </div>
                            </Grid>



                            <Grid item className={classes.modalCancel}>
                                <IconButton disableRipple variant="contained" className={classes.followingModalCancelBtn} fullWidth={false} onClick={handleCloseModal}>
                                    {<CloseIcon />}
                                </IconButton>
                            </Grid>
                        </Grid>
                        <hr className={classes.hl}></hr>
                        <List className={classes.list}>
                            {infoLoaded && !loadingInfo &&
                                followInfo.map((followingInfo, i) => (
                                    <div key={i}>
                                        <FollowInfoMobile followingInfo={followInfo[i]} handleButton={(e) => handleShow(e, i)} handlePageChange={(e) => handlePageChange(e, i)} buttonText={buttonText} loadingInfo={loadingInfo} />
                                    </div>
                                ))}
                        </List>
                        {followCount == 0 && followText == "Following" &&
                        <div className={classes.centerDiv2}>
                                <Typography variant="h7"> Not Following Yet</Typography>
                        </div>}
                        {followCount == 0 && followText == "Followers" &&
                        <div className={classes.centerDiv2}>
                                <Typography variant="h7"> No Followers Yet</Typography>
                        </div>}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(FollowModalMobile));;