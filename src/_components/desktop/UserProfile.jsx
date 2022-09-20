import React from 'react';

import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

//menu stuff
import Settings from "@material-ui/icons/Settings";

//component import
import ProfilePic from "../ProfilePic";

// CSS styling
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
        MuiButton: {
            label: {
                color: 'white',
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
    grow: {
        flexGrow: 1,
    },
    profileContainer: {
        maxWidth: 935,
        margin: "auto",
        padding: "60px 10px 0",
    },
    profile: {
        marginTop: 20,
        minWidth: 430,
        marginBottom: "44px",
    },
    editButton: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        borderRadius: 5,
        borderBottom: '1px solid white',
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        textTransform: 'none',
    },
    followButton: {
        backgroundColor: blue[700],
        color: darkTheme.palette.common.white,
        '&:hover': {
            backgroundColor: blue[800],
        },
    },
    followingButton: {
        textTransform: 'none',
        borderRadius: 5,
        fontSize: '11px',
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
    },
    pplAlt: {
        fontSize: '20px',
    },
    followingBoarder: {
        borderBottom: '1px solid white',
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        textTransform: 'none',
        borderRadius: 5,
        fontSize: '11px',
        maxHeight: 38,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    iconButtonTransparent: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
    },
    textButton: {
        textTransform: 'none',
        fontSize: '17px',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
    },
    linkText: {
        color: blue[700],
    },
    centerDiv: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: '50px',
    },
    profileFormat: {
        marginBottom: '20px',
    }
})

class UserProfile extends React.Component {
    render() {
        const { classes, userProfile, loadingUserProfile, handleShow, username,
            loadingFollowStatus, isFollowing, followStatusLoaded, follow, handleShowUnfollow, 
            handleShowFollowers, loadingUserFollowerCount, userFollowerCount, handleShowFollowing, 
            loadingUserFollowingCount, userFollowingCount, name, bio, link, } = this.props;

        return (
            <div>
                <ThemeProvider theme={darkTheme}>
                    {/* User Profile Here */}
                    {(followStatusLoaded == true) &&
                    <div className={classes.profileContainer}>
                        {/* User Profile Info Here */}
                        <div className={classes.profile}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <ProfilePic
                                        profile={userProfile}
                                        loadingProfile={loadingUserProfile}
                                        viewingMyProfile={false}
                                        handleShow={handleShow}
                                        grey={false}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <div className={classes.profileFormat}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <Typography component="h1" variant="h4">
                                                    {username}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple className={classes.editButton} variant="outlined" fullWidth={false}>
                                                    <b>Message</b>
                                                </Button>
                                            </Grid>
                                            {!loadingFollowStatus && (isFollowing == 'False') && (followStatusLoaded == true) &&
                                                <Grid item>
                                                    <Button className={classes.followButton} variant="contained" fullWidth={false} onClick={follow}>
                                                        Follow
                                                </Button>
                                                </Grid>}
                                            {!loadingFollowStatus && (isFollowing == 'True') && (followStatusLoaded == true) &&
                                                <Grid item>
                                                    <div className={classes.followingBoarder}>
                                                        <IconButton variant="contained" className={classes.followingButton} fullWidth={false} onClick={handleShowUnfollow}>
                                                            {<PeopleAltIcon className={classes.pplAlt} />}
                                                        </IconButton>
                                                    </div>
                                                </Grid>}

                                        </Grid>
                                    </div>
                                    <div className={classes.profileFormat}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} >
                                                    <b>0</b>
                                                    &nbsp;posts
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={handleShowFollowers}>

                                                    {!loadingUserFollowerCount && (followStatusLoaded == true) && <b>{userFollowerCount} </b>}
                                                    &nbsp;followers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={handleShowFollowing}>

                                                    {!loadingUserFollowingCount && (followStatusLoaded == true) && <b>{userFollowingCount} </b>}
                                                    &nbsp;following
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Typography variant="subtitle1" bold>
                                        <b>{name}</b>
                                    </Typography>
                                    <Typography variant="subtitle1">{bio}</Typography>
                                    <b><a className={classes.linkText} variant="subtitle1" href={"https://" + link} target="_blank" rel="noreferrer noopener">{link}</a></b>
                                </Grid>
                            </Grid>
                        </div>
                    </div>}
                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(UserProfile));;