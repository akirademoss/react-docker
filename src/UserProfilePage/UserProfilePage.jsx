import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';


//menu stuff
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";
import VideoLibrary from "@material-ui/icons/VideoLibrary";


//router and page imports
import { history } from '../_helpers';
import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';
import { followActions } from '../_actions/follow';

//responsive UI
import Hidden from '@material-ui/core/Hidden';

//cropper tool helper inputs
import isEqual from 'lodash.isequal';

//import custom component
import CustomToolbar from "../_components/CustomToolbar";
import ProfilePic from "../_components/ProfilePic";
import FollowModal from "../_components/FollowModal";
import DelFollowModal from "../_components/DelFollowModal";


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
});

// Profile page class
class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            messagesOpen: false,
            notificationsOpen: false,
            profileOpen: false,
            tab: 0,
            //states for profile image edit 
            imageSrc: null,
            crop: { x: 0, y: 0 },
            rotation: 0,
            zoom: 1,
            croppedAreaPixels: null,
            croppedImage: null,
            show: false,
            showImageCrop: false,
            showUnfollow: false,
            showRemove: false,
            showFollowers: false,
            showFollowing: false,
            followStatusLoaded: false,
            unfollowPreviewImg: null,
            unfollowUsername: null,
            removePreviewImg: null,
            removeUsername: null,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleTabChange = (event, value) => {
        this.setState({ tab: value });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });

        if (event.currentTarget.name == "profile") {
            this.setState({ profileOpen: true });
            console.log("profile open executed");
        }

        if (event.currentTarget.name == "notifications") {
            this.setState({ notificationsOpen: true });
            console.log("notifications open executed");
        }

        if (event.currentTarget.name == "messages") {
            this.setState({ messagesOpen: true });
            console.log("messages open executed");
        }

    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ profileOpen: false });
        this.setState({ messagesOpen: false });
        this.setState({ notificationsOpen: false });
    };

    handleEditProfile = () => {
        this.setState({ anchorEl: null });
        this.setState({ profileOpen: false });
        this.setState({ messagesOpen: false });
        this.setState({ notificationsOpen: false });
        history.push('/' + this.props.user.username + '/edit')
    };

    handleViewProfile = () => {
        this.setState({ anchorEl: null });
        this.setState({ profileOpen: false });
        this.setState({ messagesOpen: false });
        this.setState({ notificationsOpen: false });
        history.push('/' + this.props.user.username + '/profile')
    };

    handleLogout = () => {
        this.props.logout();
        this.setState({ anchorEl: null });
        this.setState({ profileOpen: false });
        this.setState({ messagesOpen: false });
        this.setState({ notificationsOpen: false });
    };

    follow = async () => {
        console.log("testing followership");
        console.log("userId:", this.props.userProfile.id)
        const dispatch = await this.props.followUser(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    handleUnfollow = async () => {
        const dispatch = await this.props.unfollow(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    handleCloseModal = () => {
        this.setState({ show: false })
    }

    onClose = () => {
        this.setState({ croppedImage: null })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleShowUnfollow = () => {
        this.setState({ unfollowPreviewImg: this.props.userProfile.previewImg })
        this.setState({ unfollowUsername: this.props.username })
        this.setState({ showUnfollow: true })
        console.log("showUnfollow status: ", this.state.showUnfollow)
    }

    handleShowFollowers = () => {
        this.setState({ showFollowers: true })
        console.log("showFollowers status: ", this.state.showFollowers)

        const dispatch = this.props.getUserFollowerInfo(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);

    }

    handleShowFollowing = () => {
        this.setState({ showFollowing: true })
        console.log("showFollowing status: ", this.state.showFollowing)
        const dispatch = this.props.getUserFollowingInfo(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    handleCloseUnfollowModal = () => {
        this.setState({ showUnfollow: false })

    }

    handleCloseRemoveModal = () => {
        this.setState({ showRemove: false })

    }

    handleCloseFollowersModal = () => {
        this.setState({ showFollowers: false })

    }

    handleCloseFollowingModal = () => {
        this.setState({ showFollowing: false })

    }

    handleFollowerPageChange = (e, i) => {
        const username = this.props.followerInfo[i].User.username;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(this.props.followerInfo[i].User.username);
        history.push('/' + username + '/user');
    };

    handlePageChange = (e, i) => {
        const username = this.props.followingInfo[i].User.username;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(this.props.followingInfo[i].User.username);
        history.push('/' + username + '/user');
    };

    handleShowUnfollowing = (e, i) => {
        console.log("testing handleShowUnfollowing")
        const username = this.props.followingInfo[i].User.username;
        const previewImg = this.props.followingInfo[i].previewImg;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(username);
        console.log(previewImg);
        console.log("showUnfollow status: ", this.state.showUnfollow)
        this.setState({ unfollowPreviewImg: previewImg })
        this.setState({ unfollowUsername: username })
        this.setState({ showUnfollow: true })
    }

    handleShowRemove = (e, i) => {
        console.log("testing handleShowRemove")
        const username = this.props.followerInfo[i].User.username;
        const previewImg = this.props.followerInfo[i].previewImg;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(username);
        console.log(previewImg);
        console.log("showRemove status: ", this.state.showRemove)
        this.setState({ removePreviewImg: previewImg })
        this.setState({ removeUsername: username })
        this.setState({ showRemove: true })
    }

    //Get all of our profile props to display the user information
    getProfile = async (e) => {
        console.log("GETTING PROFILE INFO")
        console.log("LOGGING USERNAME")

        //if we aren viewing a user's profile, view will be of their profile
        //add code to query if we are following user here
        if (isEqual(this.props.username, this.props.user.username)) {
            history.push('/error');
        }

        //console.log(this.props.match.params.username)
        console.log(this.props.username)
        if (this.props.loggedIn) {
            const username = this.props.user.username;
            const id = this.props.user.id;
            const token = this.props.user.accessToken;
            const profile = await this.props.getInfo(username, id, token);
            console.log("username 2: " + this.props.username)
        }

        //if we are viewing another user's profile, this will get the user's profile information
        const username = this.props.username;
        const userProfile = await this.props.getUserInfo(username);
    }

    followingStatus = async (e) => {
        const id = this.props.user.id;
        const userId = this.props.userProfile.userId;
        console.log("Following Status for ids listed below")
        console.log("id: ", id, "userId: ", userId)
        const dispatch2 = await this.props.getFollowingStatus(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId)

    }

    userFollowCount = async (e) => {
        const dispatch1 = await this.props.getUserFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        const dispatch2 = await this.props.getUserFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    //Each time page refreshes we call this function 
    async componentDidMount() {
        this.getProfile();
        await new Promise(resolve => { setTimeout(resolve, 100); });
        this.followingStatus();
        this.userFollowCount();
        this.setState({ followStatusLoaded: true });
        return Promise.resolve();
    }

    componentDidUpdate() {
        console.log("component did update")
    }

    render() {
        const { anchorEl, messagesOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, showImageCrop, showUnfollow, showRemove, showFollowers, showFollowing, unfollowPreviewImg, unfollowUsername, removePreviewImg, removeUsername } = this.state;
        const { classes } = this.props;
        const { loadingProfile } = this.props;
        const { loadingUserProfile } = this.props;
        const { loadingFollowStatus } = this.props;
        const { loadingUserFollowerCount, loadingUserFollowingCount } = this.props;
        const { loadingFollowingInfo, loadingFollowerInfo, loadingUserFollowingInfo, loadingUserFollowerInfo } = this.props;
        const { followingInfoLoaded, followerInfoLoaded, userFollowingInfoLoaded, userFollowerInfoLoaded } = this.props;

        return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className={classes.grow}>

                    <CustomToolbar
                        user={this.props.user}
                        profile={this.props.profile}
                        loadingProfile={loadingProfile}
                        handleMenu={this.handleMenu}
                        handleClose={this.handleClose}
                        handleViewProfile={this.handleViewProfile}
                        handleEditProfile={this.handleEditProfile}
                        handleLogout={this.handleLogout}
                        messagesOpen={messagesOpen}
                        anchorEl={anchorEl}
                        notificationsOpen={notificationsOpen}
                        profileOpen={profileOpen}
                    />

                    {/* User Profile Here */}
                    <div className={classes.profileContainer}>
                        {/* User Profile Info Here */}
                        <div className={classes.profile}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <ProfilePic
                                        profile={this.props.userProfile}
                                        loadingProfile={loadingUserProfile}
                                        viewingMyProfile={false}
                                        handleShow={this.handleShow}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <div className={classes.profileFormat}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <Typography component="h1" variant="h4">
                                                    {this.props.username}
                                                </Typography>
                                            </Grid>
                                                <Grid item>
                                                    <Button disableRipple className={classes.editButton} variant="outlined" fullWidth={false}>
                                                        <b>Message</b>
                                                    </Button>
                                                </Grid>
                                            {!loadingFollowStatus && (this.props.follow.isFollowing == '') && (this.state.followStatusLoaded == true) &&
                                                <Grid item>
                                                    <Button className={classes.followButton} variant="contained" fullWidth={false} onClick={this.follow}>
                                                        Follow
                                                </Button>
                                                </Grid>}
                                            {!loadingFollowStatus && this.props.follow.isFollowing && (this.state.followStatusLoaded == true) &&
                                                <Grid item>
                                                    <div className={classes.followingBoarder}>
                                                        <IconButton variant="contained" className={classes.followingButton} fullWidth={false} onClick={this.handleShowUnfollow}>
                                                            {<PeopleAltIcon className={classes.pplAlt}/>}
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
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={this.handleShowFollowers}>
                                                    
                                                    {!loadingUserFollowerCount && (this.state.followStatusLoaded == true) && <b>{this.props.userFollowerCount.count} </b>}
                                                    &nbsp;followers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={this.handleShowFollowing}>
                     
                                                    {!loadingUserFollowingCount && (this.state.followStatusLoaded == true) && <b>{this.props.userFollowingCount.count} </b>}
                                                    &nbsp;following
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Typography variant="subtitle1" bold>
                                        <b>{this.props.userProfile.name}</b>
                                    </Typography>
                                    <Typography variant="subtitle1">{this.props.userProfile.bio}</Typography>
                                    <b><a className={classes.linkText} variant="subtitle1" href={"https://" + this.props.userProfile.link} target="_blank" rel="noreferrer noopener">{this.props.userProfile.link}</a></b>
                                </Grid>
                            </Grid>

                        {/* Profile Posts, & Playlists here [TODO: provide functionality on backend]*/}
                        </div>
                        <Tabs
                            value={tab}
                            centered
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                        >
                            <Tab disableRipple label={<Hidden smDown>Videos</Hidden>} icon={<VideoLibrary />} />
                            <Tab disableRipple label={<Hidden smDown>Playlists</Hidden>} icon={<FeaturedPlayList />} />
                        </Tabs>
                        <Divider style={{ background: 'grey' }} />
                        {tab === 0 &&
                            <div className={classes.centerDiv}>
                                <Typography variant="h4"> No Posts Yet</Typography>
                            </div>
                        }
                        {tab === 1 &&
                            <div className={classes.centerDiv}>
                                <Typography variant="h4"> No Newsfeed Posts</Typography>
                            </div>
                        }
                        {tab === 2 &&
                            <div className={classes.centerDiv}>
                                <Typography variant="h4">No Playlists Yet</Typography>
                            </div>
                        }
                        {tab === 3 &&
                            <div className={classes.centerDiv}>
                                <Typography variant="h4">No Saved Posts Yet</Typography>
                            </div>
                        }
                    </div>

                    {/* Unfollow Modal */}
                    <DelFollowModal
                        show={showUnfollow}
                        handleCloseModal={this.handleCloseUnfollowModal}
                        previewImg={unfollowPreviewImg}
                        username={unfollowUsername}
                        handleAction={this.handleUnfollow}
                    />

                    {/* Remove Folower Modal */}
                    <DelFollowModal
                        show={showRemove}
                        handleCloseModal={this.handleCloseRemoveModal}
                        previewImg={removePreviewImg}
                        username={removeUsername}
                        handleAction={this.handleUnfollow}
                    />

                    {/*Shows Followers*/}
                    <FollowModal
                        show={showFollowers}
                        handleCloseModal={this.handleCloseFollowersModal}
                        infoLoaded={followerInfoLoaded}
                        loadingInfo={loadingFollowerInfo}
                        followInfo={this.props.followerInfo}
                        handleShow={this.handleShowRemove}
                        handlePageChange={this.handleFollowerPageChange}
                        buttonText={"Remove"}
                        followText={"Followers"}
                    />

                    {/*Shows Following*/}
                    <FollowModal
                        show={showFollowing}
                        handleCloseModal={this.handleCloseFollowingModal}
                        infoLoaded={followingInfoLoaded}
                        loadingInfo={loadingFollowingInfo}
                        followInfo={this.props.followingInfo}
                        handleShow={this.handleShowUnfollowing}
                        handlePageChange={this.handlePageChange}
                        buttonText={"Following"}
                        followText={"Following"}
                    />
                </div>
            </ThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { loggedIn } = state.authentication;
    const { profile, loadingProfile, } = state.getProfile;
    const { userProfile, loadingUserProfile } = state.getUserProfile;
    const { follow, loadingFollowStatus } = state.getFollowStatus;
    const { userFollowerCount, loadingUserFollowerCount } = state.getUserFollowerCount;
    const { userFollowingCount, loadingUserFollowingCount } = state.getUserFollowingCount;
    const { followingInfo, loadingFollowingInfo, followingInfoLoaded } = state.getFollowingInfo;
    const { followerInfo, loadingFollowerInfo, followerInfoLoaded } = state.getFollowerInfo;
    const { userFollowingInfo, loadingUserFollowingInfo, userFollowingInfoLoaded } = state.getUserFollowingInfo;
    const { userFollowerInfo, loadingUserFollowerInfo, userFollowerInfoLoaded } = state.getUserFollowerInfo;
    return {
        loggedIn, user, users, profile, loadingProfile, userProfile, loadingUserProfile,
        follow, loadingFollowStatus, userFollowerCount,
        loadingUserFollowerCount, userFollowingCount, loadingUserFollowingCount, followingInfo,
        loadingFollowingInfo, followingInfoLoaded, followerInfo, loadingFollowerInfo,
        followerInfoLoaded, userFollowingInfo, loadingUserFollowingInfo, userFollowingInfoLoaded,
        userFollowerInfo, loadingUserFollowerInfo, userFollowerInfoLoaded
    };
}

const actionCreators = {
    logout: userActions.logout,
    getInfo: profileActions.getInfo,
    getUserInfo: profileActions.getUserInfo,
    followUser: followActions.followUser,
    unfollow: followActions.unfollow,
    getFollowerCount: followActions.getFollowerCount,
    getUserFollowerCount: followActions.getUserFollowerCount,
    getFollowingCount: followActions.getFollowingCount,
    getUserFollowingCount: followActions.getUserFollowingCount,
    getFollowerInfo: followActions.getFollowerInfo,
    getUserFollowerInfo: followActions.getUserFollowerInfo,
    getFollowingInfo: followActions.getFollowingInfo,
    getUserFollowingInfo: followActions.getUserFollowingInfo,
    getFollowingStatus: followActions.getFollowingStatus,
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(UserProfilePage));