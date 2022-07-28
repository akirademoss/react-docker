import React from 'react';

import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
        marginBottom: '44px'
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
    profileFormat: {
        marginBottom: '20px',
    }
})

class Profile extends React.Component {
    render() {
        const { classes, profile, loadingProfile, viewingMyProfile, handleShow, username,
            handleEditProfile, handleShowFollowers, loadingMyFollowerCount,
            myFollowerCount, handleShowFollowing, loadingMyFollowingCount,
            myFollowingCount, name, bio, link, tab, handleTabChange } = this.props;

        return (
            <div>
                <ThemeProvider theme={darkTheme}>
                    {/* Profile Here */}
                    <div className={classes.profileContainer}>
                        {/* Profile Info Here */}
                        <div mb="44px" className={classes.profile}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <ProfilePic
                                        profile={profile}
                                        loadingProfile={loadingProfile}
                                        viewingMyProfile={viewingMyProfile}
                                        handleShow={handleShow}
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
                                                <Button disableRipple className={classes.editButton} variant="outlined" fullWidth={false} onClick={handleEditProfile}>
                                                    <b>Edit Profile</b>
                                                </Button>
                                                <IconButton disableRipple className={classes.iconButtonTransparent}>
                                                    {<Settings />}
                                                </IconButton>
                                            </Grid>
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
                                                    {!loadingMyFollowerCount && <b>{myFollowerCount} </b>}
                                                    &nbsp;followers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={handleShowFollowing}>
                                                    {!loadingMyFollowingCount && <b>{myFollowingCount} </b>}
                                                    &nbsp;following
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Typography variant="subtitle1" bold> <b>{name}</b></Typography>
                                    <Typography variant="subtitle1">{bio}</Typography>
                                    <b><a className={classes.linkText} variant="subtitle1" href={"https://" + link} target="_blank" rel="noreferrer noopener">{link}</a></b>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(Profile));;