import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import { ThemeProvider } from "@material-ui/styles";
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Skeleton from "@material-ui/lab/Skeleton";
//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import List from "@material-ui/core/List";

//menu stuff
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Settings from "@material-ui/icons/Settings";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
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
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from './ImgDialog'
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
    //Part of Top Nav Bar  
    grow: {
        flexGrow: 1,
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
    textButton: {
        textTransform: 'none',
        fontSize: '17px',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
    },
    text: {
        width: 290,
        color: 'primary',
        backgroundColor: 'primary',
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
    posts: {
        marginTop: 5,
    },
    linkText: {
        color: blue[700],
    },
    // styling for viewing image cropper tool
    cropContainer: {
        position: 'relative',
        width: '100%',
        minWidth: 400,
        minHeight: 400,
        background: darkTheme.palette.common.black,
        [darkTheme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        marginLeft: 16,
        width: 10,
        flex: '1',
    },
    cancelButton: {
        marginLeft: 16,
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
        width: 10,
        flex: '1',
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        [darkTheme.breakpoints.up('sm')]: {
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '2',
        alignItems: 'center',
        flexDirection: 'row',
    },
    sliderLabel: {
        marginLeft: 16,
        [darkTheme.breakpoints.down('xs')]: {

        },
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 16,
        minWidth: 100,
        [darkTheme.breakpoints.up('sm')]: {
            margin: '0 16px',
        },
    },
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
    followGrid: {
        marginBottom: 0,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 70,
    },
    followGridItem: {

    },
    modalCancel: {
        marginTop: 20,
        position: 'absolute',
        marginLeft: 305,
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
    followGrid2: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    followGridList: {
        alignItems: 'left',
        justifyContent: 'left',
        display: 'flex',
        flexDirection: 'column',
    },
    followModals: {
        [darkTheme.breakpoints.up('sm')]: {
        },
        minheight: 200,
        //minWidth: 400,
        width: 360,
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
        borderBottom: '1px solid white',
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
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
    avatarFollow: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        margin: "auto",
        width: "30px",
        height: "30px",
        borderRadius: 100
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
        await new Promise(resolve => { setTimeout(resolve, 300); });
        this.followingStatus();
        this.myFollowCount();
        this.userFollowCount();
        this.setState({ followStatusLoaded: true });
        return Promise.resolve();
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
        if (this.state.viewingMyProfile) {
            const dispatch = this.props.getFollowerInfo(this.props.user.id, this.props.user.accessToken, this.props.username);
        }
        else {
            const dispatch = this.props.getUserFollowerInfo(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        }
    }

    handleShowFollowing = () => {
        this.setState({ showFollowing: true })
        console.log("showFollowing status: ", this.state.showFollowing)
        if (this.state.viewingMyProfile) {
            const dispatch = this.props.getFollowingInfo(this.props.user.id, this.props.user.accessToken, this.props.username);
        }
        else {
            const dispatch = this.props.getUserFollowingInfo(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        }

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



        //if we are viewing another user's profile, this will get the user's profile information
        const username = this.props.username;
        console.log(username);
        const userProfile = await this.props.getUserInfo(username);
        if (userProfile) {
            history.push('/' + username + '/user');
        }

        //if we aren viewing a user's profile, view will be of their profile
        //add code to query if we are following user here
        if (!isEqual(this.props.userProfile, this.props.profile)) {
            this.setState({ viewingMyProfile: false })
            const id = this.props.user.id;
            const userId = this.props.userProfile.userId;
            console.log("Following Status for ids listed below")
            console.log("id: ", id, "userId: ", userId)
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
        const dispatch1 = await this.props.getFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.user.username);
        const dispatch2 = await this.props.getFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.user.username);
    }

    userFollowCount = async (e) => {
        const dispatch1 = await this.props.getUserFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        const dispatch2 = await this.props.getUserFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }





    render() {
        const { anchorEl, messagesOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, showImageCrop, showUnfollow, showRemove, viewingMyProfile, showFollowers, showFollowing, unfollowPreviewImg, unfollowUsername } = this.state;
        const { classes } = this.props;
        const { loadingProfile, profileLoaded } = this.props;
        const { loadingUserProfile } = this.props;
        const { loadingFollowStatus } = this.props;
        const { loadingMyFollowerCount, loadingMyFollowingCount, loadingUserFollowerCount, loadingUserFollowingCount } = this.props;
        const { loadingFollowingInfo, loadingFollowerInfo, loadingUserFollowingInfo, loadingUserFollowerInfo } = this.props;
        const { followingInfoLoaded, followerInfoLoaded, userFollowingInfoLoaded, userFollowerInfoLoaded } = this.props;

        {/*  if (loadingFollowingInfo) {
            return(
            <div>
            <LinearProgress color="inherit" />
            <p>Data is loading...</p>
            </div>
            )
        }*/}
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
                                        profile={this.props.userProfile}
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
                                            {viewingMyProfile &&
                                                <Grid item>
                                                    <Button disableRipple className={classes.editButton} variant="outlined" fullWidth={false} onClick={this.handleEditProfile}>
                                                        <b>Edit Profile</b>
                                                    </Button>
                                                    <IconButton disableRipple className={classes.iconButtonTransparent}>
                                                        {<Settings />}
                                                    </IconButton>
                                                </Grid>}
                                            {!viewingMyProfile &&
                                                <Grid item>
                                                    <Button disableRipple className={classes.editButton} variant="outlined" fullWidth={false}>
                                                        <b>Message</b>
                                                    </Button>
                                                </Grid>}
                                            {!viewingMyProfile && !loadingFollowStatus && (this.props.follow.isFollowing == '') && (this.state.followStatusLoaded == true) &&
                                                <Grid item>
                                                    <Button className={classes.followButton} variant="contained" fullWidth={false} onClick={this.follow}>
                                                        Follow
                                                </Button>
                                                </Grid>}
                                            {!viewingMyProfile && !loadingFollowStatus && this.props.follow.isFollowing && (this.state.followStatusLoaded == true) &&
                                                <Grid item>
                                                    <div className={classes.followingBoarder}>
                                                        <IconButton variant="contained" className={classes.followingButton} fullWidth={false} onClick={this.handleShowUnfollow}>
                                                            {<PeopleAltIcon />}
                                                        </IconButton>
                                                    </div>
                                                </Grid>}

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
                                                    {viewingMyProfile && !loadingMyFollowerCount && (this.state.followStatusLoaded == true) && <b>{this.props.myFollowerCount.count} </b>}
                                                    {!viewingMyProfile && !loadingUserFollowerCount && (this.state.followStatusLoaded == true) && <b>{this.props.userFollowerCount.count} </b>}
                                                    &nbsp;followers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button disableRipple variant="text" className={classes.textButton} onClick={this.handleShowFollowing}>
                                                    {viewingMyProfile && !loadingMyFollowingCount && (this.state.followStatusLoaded == true) && <b>{this.props.myFollowingCount.count} </b>}
                                                    {!viewingMyProfile && !loadingUserFollowingCount && (this.state.followStatusLoaded == true) && <b>{this.props.userFollowingCount.count} </b>}
                                                    &nbsp;following
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Typography variant="subtitle1" bold>
                                        <b>{this.props.userProfile.name}</b>
                                    </Typography>
                                    <Typography variant="subtitle1">{this.props.userProfile.bio}</Typography>
                                    <b><a className={classes.linkText} variant="subtitle1" href={"https://" + this.props.userProfile.link} target="_blank" rel="noreferrer noopener">{this.props.userProfile.link}</a></b>
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
                            {viewingMyProfile &&
                                <Tab disableRipple label={<Hidden smDown>Newsfeed</Hidden>} icon={<GridOn />} />}
                            <Tab disableRipple label={<Hidden smDown>Playlists</Hidden>} icon={<FeaturedPlayList />} />
                            {viewingMyProfile &&
                                <Tab disableRipple label={<Hidden smDown>Saved</Hidden>} icon={<BookmarkBorder />} />}
                        </Tabs>
                        <Divider style={{ background: 'grey' }} />
                        <Grid container spacing={5} className={classes.posts}>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <ChangePicModal 
                        show={show}
                        handleCloseModal={this.handleCloseModal}
                        onFileChange={this.onFileChange}
                        handleRemove={this.handleRemove}
                    />
{/** 
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
                    />*/}


                    <Modal
                        open={showImageCrop}
                        onClose={this.handleCloseImageModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes.modalUpload}>
                            <div className={classes.cropContainer}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={1 / 1}
                                    cropShape="round"
                                    onCropChange={this.setCrop}
                                    onRotationChange={this.setRotation}
                                    onCropComplete={this.onCropComplete}
                                    onZoomChange={this.setZoom}
                                />
                            </div>
                            <div className={classes.controls}>
                                <div className={classes.sliderContainer}>
                                    <Typography
                                        variant="overline"
                                        classes={{ root: classes.sliderLabel }}
                                    >
                                        Zoom
                                    </Typography>
                                    <Slider
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        classes={{ root: classes.slider }}
                                        onChange={this.setZoom}
                                    />
                                </div>
                                <div className={classes.sliderContainer}>
                                    <Typography
                                        variant="overline"
                                        classes={{ root: classes.sliderLabel }}
                                    >
                                        Rotation
                                    </Typography>
                                    <Slider
                                        value={rotation}
                                        min={0}
                                        max={360}
                                        step={1}
                                        aria-labelledby="Rotation"
                                        classes={{ root: classes.slider }}
                                        onChange={this.setRotation}
                                    />
                                </div>
                                <Button
                                    disableRipple
                                    onClick={() => { this.showCroppedImage(); this.handleCloseImageModal() }}
                                    variant="contained"
                                    color="primary"
                                    classes={{ root: classes.cropButton }}
                                >
                                    Save
                                </Button>
                                <Button
                                    disableRipple
                                    variant="contained"
                                    color="primary"
                                    classes={{ root: classes.cancelButton }}
                                    onClick={this.handleCloseImageModal}
                                >
                                    Cancel
                                </Button>
                            </div>

                        </div>
                    </Modal>
                    <ImgDialog img={this.croppedImage} onClose={this.onClose} />
                    
                   {/** */} <ImgDialog img={this.croppedImage} onClose={this.onClose} />

                    {/* UNFOLLOW MODAL */}
                    <Modal
                        open={showUnfollow}
                        onClose={this.handleCloseUnfollowModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes.modalUpload}>
                            <Box m={1} />
                            {unfollowPreviewImg && <img src={unfollowPreviewImg} className={classes.avatarMd} />}
                            {!unfollowPreviewImg && <AccountCircle className={classes.avatarMd} />}

                            <Box m={1} />
                            <Typography variant="subtitle2"> Unfollow @{unfollowUsername}?</Typography>
                            <Box m={1} />

                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                classes={{ root: classes.modalButton }}
                                onClick={this.handleUnfollow}
                            >
                                Unfollow
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                classes={{ root: classes.modalButtonCancel }}
                                onClick={this.handleCloseUnfollowModal}
                            >
                                Cancel
                        </Button>
                        </div>
                    </Modal>

                    {/* Remove Modal */}
                    <Modal
                        open={showRemove}
                        onClose={this.handleCloseRemoveModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes.modalUpload}>
                            <Box m={1} />
                            {unfollowPreviewImg && <img src={unfollowPreviewImg} className={classes.avatarMd} />}
                            {!unfollowPreviewImg && <AccountCircle className={classes.avatarMd} />}

                            <Box m={1} />
                            <Typography variant="subtitle2"> Remove @{unfollowUsername}?</Typography>
                            <Box m={1} />

                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                classes={{ root: classes.modalButton }}
                                onClick={this.handleUnfollow}
                            >
                                Remove
                            </Button>



                            <Button
                                variant="contained"
                                color="primary"
                                classes={{ root: classes.modalButtonCancel }}
                                onClick={this.handleCloseRemoveModal}
                            >
                                Cancel
                        </Button>
                        </div>
                    </Modal>
                    {/* MODAL FOR FOLLOWERS*/}
                    <Modal
                        open={showFollowers}
                        onClose={this.handleCloseFollowersModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes.followModals}>
                            <Grid container spacing={10} className={classes.followGrid}>
                                <Grid item className={classes.followGridItem}>
                                    <Typography variant="h6"> <b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Followers </b> </Typography>
                                </Grid>
                                <Grid item className={classes.modalCancel}>
                                    <IconButton variant="contained" className={classes.followingModalCancelBtn} fullWidth={false} onClick={this.handleCloseFollowersModal}>
                                        {<CloseIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <hr className={classes.hl}></hr>


                            {/* 
                        <FollowInfo followingInfo={this.props.followingInfo[0]} handleShowUnfollow={this.handleShowUnfollow} />*/}
                            <List className={classes.list}>
                                {followerInfoLoaded && !loadingFollowerInfo &&
                                    this.props.followerInfo.map((followingInfo, i) => (
                                        <div key={i}>
                                            <FollowInfo followingInfo={this.props.followerInfo[i]} handleButton={(e) => this.handleShowRemove(e, i)} handlePageChange={(e) => this.handlePageChange(e, i)} buttonText="Remove" />
                                        </div>
                                    ))}
                            </List>
                        </div>

                    </Modal>

                    {/* MODAL FOR FOLLOWING*/}
                    <Modal
                        open={showFollowing}
                        onClose={this.handleCloseFollowingModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes.followModals}>




                            <Grid container spacing={10} className={classes.followGrid}>


                                <Grid item className={classes.followGridItem}>
                                    <Typography variant="h6"> <b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Following </b> </Typography>
                                </Grid>



                                <Grid item className={classes.modalCancel}>
                                    <IconButton variant="contained" className={classes.followingModalCancelBtn} fullWidth={false} onClick={this.handleCloseFollowingModal}>
                                        {<CloseIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <hr className={classes.hl}></hr>


                            {/* 
                        <FollowInfo followingInfo={this.props.followingInfo[0]} handleShowUnfollow={this.handleShowUnfollow} />*/}
                            <List className={classes.list}>
                                {followingInfoLoaded && !loadingFollowingInfo &&
                                    this.props.followingInfo.map((followingInfo, i) => (
                                        <div key={i}>
                                            <FollowInfo followingInfo={this.props.followingInfo[i]} handleButton={(e) => this.handleShowUnfollowing(e, i)} handlePageChange={(e) => this.handlePageChange(e, i)} buttonText="Following" />
                                        </div>
                                    ))}
                            </List>
                        </div>
                    </Modal>
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