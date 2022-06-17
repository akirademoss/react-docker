import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Skeleton from "@material-ui/lab/Skeleton";
import Hidden from '@material-ui/core/Hidden';


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
    iconButtonAvatar: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
        height: '100%',
        width: '100%'
    },
    avatar: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        margin: "auto",
        width: "150px",
        height: "150px",
        borderRadius: 100,
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
    skeleton: {
        color: darkTheme.palette.common.white,
        backgroundColor: grey[700],
        width: "150px",
        height: "150px",
    },
    skeletonMd: {
        color: darkTheme.palette.common.white,
        backgroundColor: grey[700],
        width: "100px",
        height: "100px",
    },
})

class ProfilePic extends React.Component {
    render() {
        const { classes, profile, loadingProfile, viewingMyProfile, handleShow } = this.props;
        return (

            <div>
                <Hidden smDown>
                    <label htmlFor="contained-button-file">

                        <IconButton
                            disableRipple
                            id="contained-button-file"
                            color="inherit"
                            className={classes.iconButtonAvatar}
                            onClick={viewingMyProfile ? handleShow : undefined}
                            component="span"
                        >

                            {loadingProfile && <Skeleton variant="circle" animation="wave" className={classes.skeleton} />}
                            {!loadingProfile && profile.previewImg && <img src={profile.previewImg} className={classes.avatar} />}
                            {!profile.previewImg && !loadingProfile && <AccountCircle className={classes.avatar} />}

                        </IconButton>
                    </label>
                </Hidden>


                <Hidden mdUp>
                    <label htmlFor="contained-button-file">
                        <IconButton
                            disableRipple
                            id="contained-button-file"
                            color="inherit"
                            className={classes.iconButtonAvatar}
                            onClick={viewingMyProfile ? handleShow : undefined}
                            component="span"
                        >
                            {loadingProfile && <Skeleton variant="circle" animation="wave" className={classes.skeletonMd} />}
                            {!loadingProfile && profile.previewImg && <img src={profile.previewImg} className={classes.avatarMd} />}
                            {!profile.previewImg && !loadingProfile && <AccountCircle className={classes.avatarMd} />}
                        </IconButton>
                    </label>
                </Hidden>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(ProfilePic));;