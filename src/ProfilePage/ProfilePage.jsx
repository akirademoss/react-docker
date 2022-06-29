import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import List from "@material-ui/core/List";

//menu stuff
import AccountCircle from "@material-ui/icons/AccountCircle";
import Settings from "@material-ui/icons/Settings";
import GridOn from "@material-ui/icons/GridOn";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";
import VideoLibrary from "@material-ui/icons/VideoLibrary";


//router and page imports
//import history from '../history';
import { history } from '../_helpers';

import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';
import { followActions } from '../_actions/follow';

//custom component import
import Typography from '@material-ui/core/Typography';

//responsive UI
import Hidden from '@material-ui/core/Hidden';

//cropper tool helper inputs
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import Modal from "@material-ui/core/Modal";
import { styled } from '@material-ui/core/styles';
import isEqual from 'lodash.isequal';

//icon import
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CloseIcon from '@material-ui/icons/Close';

//import custom component
import FollowInfo from "../_components/FollowInfo";
import CustomToolbar from "../_components/CustomToolbar";
import ProfilePic from "../_components/ProfilePic";
import ChangePicModal from "../_components/ChangePicModal";
import UploadPicModal from "../_components/UploadPicModal";
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
    profile: {
        marginTop: 20,
        minWidth: 430,
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
    }
});

const Input = styled('input')({
    display: 'none',
});

//Profile image edit rotation helpers
const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

// Profile page class
class ProfilePage extends React.Component {
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
            viewingMyProfile: true,
            followStatusLoaded: false,
            unfollowPreviewImg: null,
            unfollowUsername: null,
            removePreviewImg: null,
            removeUsername: null,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    //Each time page refreshes we call this function 
    async componentDidMount() {
        this.getProfile();
        this.myFollowCount();
    }

    componentDidUpdate() {
        console.log("component did update")
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

    //Events for profile image functionality
    setCrop = crop => {
        this.setState({ crop });
    }

    setRotation = (e, rotation) => {
        console.log(rotation)
        this.setState({ rotation: rotation });
    }

    setZoom = (e, zoom) => {
        this.setState({ zoom: zoom });
    }
    //when image is added 
    onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await readFile(file);

            // apply rotation if needed
            const orientation = await getOrientation(file);
            const rotation = ORIENTATION_TO_ANGLE[orientation];
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
            }

            this.setState({ imageSrc: imageDataUrl });
            this.setState({ showImageCrop: true })
            this.setState({ show: false })
            console.log(this.state.imageSrc)

        }
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        this.setState({ croppedAreaPixels: croppedAreaPixels })
        console.log(croppedArea, croppedAreaPixels)
        console.log("(oncropcomplete) croppedAreaPixels: ", croppedAreaPixels)
    }

    //save the new image to database
    showCroppedImage = async () => {
        console.log("(showCroppedImage) croppedAreaPixels: ", this.state.croppedAreaPixels)
        try {
            const croppedImage = await getCroppedImg(
                this.state.imageSrc,
                this.state.croppedAreaPixels,
                this.state.rotation
            )
            console.log('donee', { croppedImage });
            this.setState({ croppedImage: croppedImage });
            console.log(this.state.croppedImage)

            if (croppedImage) {
                const dispatch = await this.props.uploadAvatar(this.props.user.id, this.props.user.username, this.props.user.accessToken, croppedImage);
            }
        } catch (e) {
            console.error(e)
        }

    }

    follow = async () => {
        console.log("testing followership");
        console.log("userId:", this.props.userProfile.id)
        const dispatch = await this.props.followUser(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    handleUnfollow = async () => {
        const dispatch = await this.props.unfollow(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    handleRemove = async () => {
        const dispatch = await this.props.removeAvatar(this.props.user.id, this.props.user.username, this.props.user.accessToken)
        this.setState({ show: false })
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
        const dispatch = this.props.getFollowerInfo(this.props.user.id, this.props.user.accessToken, this.props.username);
    }

    handleShowFollowing = () => {
        this.setState({ showFollowing: true })
        console.log("showFollowing status: ", this.state.showFollowing)
        const dispatch = this.props.getFollowingInfo(this.props.user.id, this.props.user.accessToken, this.props.username);
    }

    handleShowImageCrop = () => {
        this.setState({ showImageCrop: true })
    }

    handleCloseImageModal = () => {
        this.setState({ showImageCrop: false })

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

        if (this.props.loggedIn) {
            const username = this.props.user.username;
            const id = this.props.user.id;
            const token = this.props.user.accessToken;
            const profile = await this.props.getInfo(username, id, token);
        }
        else{
           history.replace('/error');
        }

        // provide error messaging for URL browsing
        if (!isEqual(this.props.username, this.props.user.username)) {
            history.push('/error');
        }
    }

    followingStatus = async (e) => {
        const id = this.props.user.id;
        const userId = this.props.userProfile.userId;
        console.log("Following Status for ids listed below")
        console.log("id: ", id, "userId: ", userId)
        const dispatch2 = await this.props.getFollowingStatus(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId)

    }

    myFollowCount = async (e) => {
        if(this.props.loggedIn){
        const dispatch1 = await this.props.getFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.user.username);
        const dispatch2 = await this.props.getFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.user.username);
        }
    }

    userFollowCount = async (e) => {
        const dispatch1 = await this.props.getUserFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        const dispatch2 = await this.props.getUserFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }





    render() {
        const { anchorEl, messagesOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, showImageCrop, showUnfollow, showRemove, viewingMyProfile, showFollowers, showFollowing, unfollowPreviewImg, unfollowUsername, removePreviewImg, removeUsername } = this.state;
        const { classes } = this.props;
        const { loadingProfile, profileLoaded } = this.props;
        const { loadingUserProfile } = this.props;
        const { loadingFollowStatus } = this.props;
        const { loadingMyFollowerCount, loadingMyFollowingCount, loadingUserFollowerCount, loadingUserFollowingCount } = this.props;
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

                    <Box component="main" maxWidth={935} margin="auto" padding="60px 10px 0">
                        <Box mb="44px" className={classes.profile}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <ProfilePic
                                        profile={this.props.profile}
                                        loadingProfile={loadingUserProfile}
                                        viewingMyProfile={viewingMyProfile}
                                        handleShow={this.handleShow}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Box clone mb="20px">
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <Typography component="h1" variant="h4">
                                                    {this.props.username}
                                                </Typography>
                                            </Grid>
                                                <Grid item>
                                                    <Button disableRipple className={classes.editButton} variant="outlined" fullWidth={false} onClick={this.handleEditProfile}>
                                                        <b>Edit Profile</b>
                                                    </Button>
                                                    <IconButton disableRipple className={classes.iconButtonTransparent}>
                                                        {<Settings />}
                                                    </IconButton>
                                                </Grid>
                                        </Grid>
                                    </Box>
                                    <Box mb="20px">
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} >
                                                    <b>0</b>
                                                    &nbsp;posts
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={this.handleShowFollowers}>
                                                    {!loadingMyFollowerCount && <b>{this.props.myFollowerCount.count} </b>}
                                                    &nbsp;followers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={this.handleShowFollowing}>
                                                    {!loadingMyFollowingCount && <b>{this.props.myFollowingCount.count} </b>}
                                                    &nbsp;following
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Typography variant="subtitle1" bold>
                                        <b>{this.props.profile.name}</b>
                                    </Typography>
                                    <Typography variant="subtitle1">{this.props.profile.bio}</Typography>
                                    <b><a className={classes.linkText} variant="subtitle1" href={"https://" + this.props.profile.link} target="_blank" rel="noreferrer noopener">{this.props.profile.link}</a></b>
                                </Grid>
                            </Grid>
                        </Box>
                        <Tabs
                            value={tab}
                            centered
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                        >
                            <Tab disableRipple label={<Hidden smDown>Videos</Hidden>} icon={<VideoLibrary />} />
                            <Tab disableRipple label={<Hidden smDown>Newsfeed</Hidden>} icon={<GridOn />} />
                            <Tab disableRipple label={<Hidden smDown>Playlists</Hidden>} icon={<FeaturedPlayList />} />
                            <Tab disableRipple label={<Hidden smDown>Saved</Hidden>} icon={<BookmarkBorder />} />
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
                    </Box>

                    <ChangePicModal
                        show={show}
                        handleCloseModal={this.handleCloseModal}
                        onFileChange={this.onFileChange}
                        handleRemove={this.handleRemove}
                    />

                    <UploadPicModal
                        showImageCrop={showImageCrop}
                        handleCloseImageModal={this.handleCloseImageModal}
                        imageSrc={imageSrc}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        setCrop={this.setCrop}
                        setRotation={this.setRotation}
                        onCropComplete={this.onCropComplete}
                        setZoom={this.setZoom}
                        showCroppedImage={this.showCroppedImage}
                        handleCloseImageModal={this.handleCloseImageModal}
                    />

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
    const { profile, loadingProfile, profileLoaded } = state.getProfile;
    const { userProfile, loadingUserProfile } = state.getUserProfile;
    const { follow, loadingFollowStatus } = state.getFollowStatus;
    const { myFollowerCount, loadingMyFollowerCount, myFollowerCountLoaded } = state.getMyFollowerCount;
    const { myFollowingCount, loadingMyFollowingCount, myFollowingCountLoaded } = state.getMyFollowingCount;
    const { userFollowerCount, loadingUserFollowerCount } = state.getUserFollowerCount;
    const { userFollowingCount, loadingUserFollowingCount } = state.getUserFollowingCount;
    const { followingInfo, loadingFollowingInfo, followingInfoLoaded } = state.getFollowingInfo;
    const { followerInfo, loadingFollowerInfo, followerInfoLoaded } = state.getFollowerInfo;
    const { userFollowingInfo, loadingUserFollowingInfo, userFollowingInfoLoaded } = state.getUserFollowingInfo;
    const { userFollowerInfo, loadingUserFollowerInfo, userFollowerInfoLoaded } = state.getUserFollowerInfo;
    return {
        loggedIn, user, users, profile, loadingProfile, userProfile, loadingUserProfile,
        follow, loadingFollowStatus, myFollowerCount, loadingMyFollowerCount, myFollowerCountLoaded,
        myFollowingCount, loadingMyFollowingCount, myFollowingCountLoaded, userFollowerCount,
        loadingUserFollowerCount, userFollowingCount, loadingUserFollowingCount, followingInfo,
        loadingFollowingInfo, followingInfoLoaded, followerInfo, loadingFollowerInfo,
        followerInfoLoaded, userFollowingInfo, loadingUserFollowingInfo, userFollowingInfoLoaded,
        userFollowerInfo, loadingUserFollowerInfo, userFollowerInfoLoaded, profileLoaded
    };
}

const actionCreators = {
    logout: userActions.logout,
    getInfo: profileActions.getInfo,
    getUserInfo: profileActions.getUserInfo,
    uploadAvatar: profileActions.uploadAvatar,
    removeAvatar: profileActions.removeAvatar,
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

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(ProfilePage));