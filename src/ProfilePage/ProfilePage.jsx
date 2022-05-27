import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import { ThemeProvider } from "@material-ui/styles";
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from "@material-ui/lab/Skeleton";
//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import StyledDemo from './index.js';

//menu stuff
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Settings from "@material-ui/icons/Settings";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import GridOn from "@material-ui/icons/GridOn";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import MoreIcon from "@material-ui/icons/MoreVert";

//router and page imports
//import history from '../history';
import { history } from '../_helpers';

import { userActions } from '../actions/auth';
import { profileActions } from '../actions/profile';
import { followActions } from '../actions/follow';

//custom component import
import MenuButton from '../components/menuButton';
import Typography from '@material-ui/core/Typography';

//responsive UI
import Hidden from '@material-ui/core/Hidden';

//cropper tool helper inputs
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { styles2 } from './styles'
import Modal from "@material-ui/core/Modal";
import { styled } from '@material-ui/core/styles';
import isEqual from 'lodash.isequal';

//icon import
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";


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
    navBar: {
        boxShadow: 'none',
        minHeight: 5,
        height: 'auto',
        backgroundColor: fade(grey[500], 0.4),
        position: 'fixed',
    },
    menuItem: {
        boxShadow: 'none',
        height: 'auto',
        background: 'transparent',
    },
    menu: {
        boxShadow: 'none',
        //backgroundColor: fade(darkTheme.palette.common.black, 0.5),
    },
    iconButton: {

    },
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
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -12,
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
    },
    homeButton: {
        marginRight: 0,
        marginLeft: -12,
        marginTop: 0,
        width: '100%',
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
    },
    createAccountButton: {
        margin: darkTheme.spacing(0, 0, 0),
        width: 110,
    },
    searchAlign: {
        display: 'flex',
        flexDirection: 'row',
        alighnItems: 'center',
        width: '25%',
    },
    search: {
        position: 'relative',
        borderRadius: darkTheme.shape.borderRadius,
        backgroundColor: fade(darkTheme.palette.common.black, 0.5),
        '&:hover': {
            backgroundColor: fade(darkTheme.palette.common.black, 0.05),
        },
        borderBottom: '1px solid white',
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        marginRight: darkTheme.spacing(2),
        marginLeft: 0,
        width: '100%',
    },
    searchIcon: {
        padding: darkTheme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: darkTheme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${darkTheme.spacing(4)}px)`,
        transition: darkTheme.transitions.create('width'),
        width: '100%',
        [darkTheme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [darkTheme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: "flex",
        [darkTheme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    text: {
        width: 290,
        color: 'primary',
        backgroundColor: 'primary',
    },
    signInButton: {
        margin: darkTheme.spacing(3, 0, 0),
        width: 290,
    },
    input: {
        opacity: 0,
        height: 0,
        width: 0,
        margin: 0
    },
    profile: {
        marginTop: 20,
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
    avatarSm: {
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
    editButton: {
        borderRadius: 5,
        borderBottom: '1px solid white',
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
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
    modalButton: {
        width: '95%',
        minWidth: 380,
    },
    modalButtonRemove: {
        width: '95%',
        backgroundColor: blue[700],
        '&:hover': {
            backgroundColor: blue[800],
        },
        minWidth: 380,
    },
    modalButtonCancel: {
        width: '95%',
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
        minWidth: 380,
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
            viewingMyProfile: true,
            userId: this.props.userProfile.userId,
            followStatusLoaded: false,
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
        //history.push('/' + this.username + '/edit')
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

    setPopupBoolean = () => {
        if (!Boolean(this.state.anchorEl.name)) {

        }
    }

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
        console.log("testing to see if follwership start is working");
        console.log("userId:", this.props.userProfile.id)
        const dispatch = await this.props.followUser(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);

        //const dispatch2 = await this.props.getFollowingStatus(this.props.user.id, this.props.user.accessToken, this.props.userProfile.id)
        //console.log(dispatch2)
        //console.log("isFollowing from props results", this.props.follow)
        //console.log("AYYYYYY WE LOGGING SHIT YO 123")
    }

    handleUnfollow = async() => {
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
        this.setState({ showUnfollow: true })
        console.log("showUnfollow status: ", this.state.showUnfollow)
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

    //Get all of our profile props to display the user information
    getProfile = async (e) => {
     //e.preventDefault();
     //can view profiles weather logged in or not. If logged in, we got profile information
     if (this.props.loggedIn){
         const username = this.props.user.username;
         const id = this.props.user.id;
         const token = this.props.user.accessToken;
         const profile = await this.props.getInfo(username, id, token);
     }


     
     //if we are viewing another user's profile, this will get the user's profile information
     const username = this.props.username;
     console.log(username);
     const userProfile = await this.props.getUserInfo(username);
     if (userProfile){
         history.push('/' + username + '/user');
     }
     
     //if we aren viewing a user's profile, view will be of their profile
     //add code to query if we are following user here
     if (!isEqual(this.props.userProfile, this.props.profile)){
         this.setState({viewingMyProfile: false})
         const id = this.props.user.id;
         const userId = this.props.userProfile.userId;
         console.log("Following Status for ids listed below")
         console.log("id: ", id, "userId: ", userId)
         console.log("viewingMyProfile set to false")
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

    //Each time page refreshes we call this function 
    async componentDidMount() {
        this.getProfile();
        await new Promise(resolve => { setTimeout(resolve, 300); });
        this.followingStatus();
        this.myFollowCount();
        this.userFollowCount();
        this.setState({followStatusLoaded: true});
        return Promise.resolve();
    }

    componentDidUpdate() {
        console.log("component did update")
        console.log(this.props.myFollowingCount);
        if((this.props.userProfile.userId != this.state.userId) && (this.props.userProfile.userId != undefined)){
            console.log("props: ", this.props.userProfile.userId, " state: ", this.state.userId)
            console.log(this.props.userProfile.userId)
            console.log("Component did update HOOOOOORRRAAAYYYY");
        }
    }



    render() {
        const { anchorEl, messagesOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, showImageCrop, showUnfollow, viewingMyProfile } = this.state;
        const open = Boolean(anchorEl);
        const { classes } = this.props;
        const { loadingProfile } = this.props;
        const { loadingUserProfile } = this.props;
        const { loadingFollowStatus } = this.props;
        const { loadingMyFollowerCount, loadingMyFollowingCount, loadingUserFollowerCount, loadingUserFollowingCount } = this.props;



        return (

            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className={classes.grow}>
                    <AppBar position="static" className={classes.navBar}>
                        <Toolbar>
                            <div>
                                <Button className={classes.homeButton}
                                    onClick={() => history.push('/' + this.props.user.username + '/home')}
                                >
                                    <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'} />
                                </Button>
                            </div>


                            <div className={classes.grow} />

                            <section className={classes.searchAlign}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        fullWidth={true}
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </section>

                            <IconButton
                                name="messages"
                                aria-owns={messagesOpen ? 'message-alerts' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                {<MailIcon />}
                            </IconButton>
                            <Menu
                                disableScrollLock={true}
                                color="secondary"
                                id="message-alerts"
                                anchorEl={anchorEl}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={messagesOpen}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose} className={classes.menuItem}>Messages</MenuItem>
                            </Menu>

                            <IconButton
                                name="notifications"
                                aria-owns={notificationsOpen ? 'notifications-alerts' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                {<NotificationsIcon />}
                            </IconButton>
                            <Menu
                                disableScrollLock={true}
                                color="secondary"
                                id="notifications-alerts"
                                anchorEl={anchorEl}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={notificationsOpen}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose} className={classes.menuItem}>Notifications</MenuItem>
                            </Menu>

                            <IconButton
                                name="profile"
                                aria-owns={profileOpen ? 'profile-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                
                                
                                {loadingProfile && <Skeleton variant="circle" className={classes.avatarSm}/>}
                                {!loadingProfile && this.props.profile.previewImg && <img src={this.props.profile.previewImg} className={classes.avatarSm} />}
                                {!this.props.profile.previewImg && !loadingProfile && <AccountCircle className={classes.avatarSm}/>}
                                

                                    
                            </IconButton>
                            <Menu
                                disableScrollLock={true}
                                color="secondary"
                                id="profile-menu"
                                anchorEl={anchorEl}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={profileOpen}
                                onClose={this.handleClose}
                                style={{
                                    padding: 8
                                }}
                            >
                                <MenuItem onClick={this.handleViewProfile} className={classes.menuItem}>Your Profile</MenuItem>
                                <MenuItem onClick={this.handleEditProfile} className={classes.menuItem}>Edit Profile</MenuItem>
                                <MenuItem onClick={this.handleLogout} className={classes.menuItem}>Logout</MenuItem>
                            </Menu>

                        </Toolbar>
                    </AppBar>
                    <Box component="main" maxWidth={935} margin="auto" padding="60px 10px 0">
                        <Box mb="44px" className={classes.profile}>
                            <Grid container>
                                <Grid item xs={4}>


                                    {/*  <IconButton
                                        id="contained-button-file"
                                        color="inherit"
                                        className={classes.iconButtonAvatar}
                                        onClick={this.handleShow}
                                        component="span"
                                    >
                                    {<AccountCircle className={classes.iconButtonAvatar}/>}
                                </IconButton>    */}
                                {viewingMyProfile &&
                                    <Hidden smDown>
                                        <label htmlFor="contained-button-file">

                                            <IconButton
                                                id="contained-button-file"
                                                color="inherit"
                                                className={classes.iconButtonAvatar}
                                                onClick={this.handleShow}
                                                component="span"
                                            >
                                             {/* {loadingProfile && this.props.profile.previewImg ? (
                                                    <Skeleton variant="circular" className={classes.avatar}/>
                                                    ) : (
                                                        <img src={this.props.profile.previewImg} className={classes.avatar} />
                                                    )}*/}
                                               
                                              {loadingUserProfile && <Skeleton variant="circle" className={classes.avatar}/>}
                                              {!loadingUserProfile && this.props.userProfile.previewImg && <img src={this.props.userProfile.previewImg} className={classes.avatar} />}
                                             {!this.props.userProfile.previewImg && !loadingUserProfile && <AccountCircle className={classes.avatar}/>} 
                                               
                                                    
                                              


                                            </IconButton>
                                        </label>
                                    </Hidden>}

                                    {viewingMyProfile &&    
                                    <Hidden mdUp>
                                        <label htmlFor="contained-button-file">
                                            <IconButton 
                                                id="contained-button-file"
                                                color="inherit"
                                                className={classes.iconButtonAvatar}
                                                onClick={this.handleShow}
                                                component="span"
                                            >
                                                
                                                {loadingUserProfile && <Skeleton variant="circular" className={classes.avatarMd}/>}
                                                {!loadingUserProfile && this.props.userProfile.previewImg && <img src={this.props.userProfile.previewImg} className={classes.avatarMd} />}
                                                {!this.props.userProfile.previewImg && !loadingUserProfile && <AccountCircle className={classes.avatarMd}/>}
                                                
                                            </IconButton>

                                        </label>
                                    </Hidden>}
                                    {!viewingMyProfile && 
                                    <Hidden smDown>
                                        <label htmlFor="contained-button-file">

                                            <IconButton
                                                disableFocusRipple = "true"
                                                disableRipple="true"
                                                id="contained-button-file"
                                                color="inherit"
                                                className={classes.iconButtonAvatar}
                                                component="span"
                                            >
                                             {/* {loadingProfile && this.props.profile.previewImg ? (
                                                    <Skeleton variant="circular" className={classes.avatar}/>
                                                    ) : (
                                                        <img src={this.props.profile.previewImg} className={classes.avatar} />
                                                    )}*/}                                              
                                              {loadingUserProfile && <Skeleton variant="circle" className={classes.avatar}/>}
                                              {!loadingUserProfile && this.props.userProfile.previewImg && <img src={this.props.userProfile.previewImg} className={classes.avatar} />}
                                             {!this.props.userProfile.previewImg && !loadingUserProfile && <AccountCircle className={classes.avatar}/>}                                                                                                                          
                                            </IconButton>

                                        </label>
                                    </Hidden>}
                                    {!viewingMyProfile &&
                                    <Hidden mdUp>
                                        <label htmlFor="contained-button-file">
                                            <IconButton
                                                disableFocusRipple = "true"
                                                disableRipple="true"
                                                id="contained-button-file"
                                                color="inherit"
                                                className={classes.iconButtonAvatar}
                                                component="span"
                                            >                           
                                                {loadingUserProfile && <Skeleton variant="circular" className={classes.avatarMd}/>}
                                                {!loadingUserProfile && this.props.userProfile.previewImg && <img src={this.props.userProfile.previewImg} className={classes.avatarMd} />}
                                                {!this.props.userProfile.previewImg && !loadingUserProfile && <AccountCircle className={classes.avatarMd}/>}                                                
                                            </IconButton>

                                        </label>
                                    </Hidden>}



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
                                                <Button className={classes.editButton} variant="outlined" fullWidth={false} onClick={this.handleEditProfile}>
                                                    Edit Profile
                                                </Button>
                   {/*}   {!viewingMyProfile &&  <Button className={classes.editButton} variant="outlined" fullWidth={false}>
                                                    Message
                                            </Button>}     
                      {!viewingMyProfile &&  <Button className={classes.editButton} variant="contained" fullWidth={false}>
                                                    Follow
                                                </Button>}   */}              
                                                     <IconButton>
                                                         {<Settings />}
                                                     </IconButton>
                                            </Grid>}

                                            {!viewingMyProfile &&     
                                            
                                            <Grid item>
                                                <Button className={classes.editButton} variant="outlined" fullWidth={false}>
                                                    Message
                                                </Button>
                                                </Grid>}
                                            {!viewingMyProfile && !loadingFollowStatus && (this.props.follow.isFollowing == '')  && (this.state.followStatusLoaded == true) &&
                                            <Grid item>
                                                <Button className={classes.followButton} variant="contained" fullWidth={false} onClick={this.follow}>
                                                    Follow
                                                </Button>
                                            </Grid>}

                                            {!viewingMyProfile && !loadingFollowStatus && this.props.follow.isFollowing && (this.state.followStatusLoaded == true) &&
                                            <Grid item>
                                                <IconButton  variant="contained" fullWidth={false} onClick={this.handleShowUnfollow}>
                                                    {<PeopleAltIcon />}
                                                </IconButton>
                                            </Grid>}
                                            
                                        </Grid>
                                    </Box>
                                    <Box mb="20px">
                                        <Grid container spacing={2}>
                                            
                                            <Grid item>
                                                
                                                <Typography variant="subtitle1">
                                                    <b>0</b> posts
                                                </Typography>
                                            </Grid>                                        
                                            <Grid item>
                                                <Typography variant="subtitle1">
                                                    {viewingMyProfile && !loadingMyFollowerCount && (this.state.followStatusLoaded == true) && <b>{this.props.myFollowerCount.count} </b>} 
                                                    {!viewingMyProfile && !loadingUserFollowerCount  && (this.state.followStatusLoaded == true) && <b>{this.props.userFollowerCount.count} </b>}
                                                    followers
                                                </Typography>
                                            </Grid>       
                                            <Grid item>
                                                <Typography variant="subtitle1">
                                                    {viewingMyProfile && !loadingMyFollowingCount && (this.state.followStatusLoaded == true) && <b>{this.props.myFollowingCount.count} </b>} 
                                                    {!viewingMyProfile && !loadingUserFollowingCount  && (this.state.followStatusLoaded == true) && <b>{this.props.userFollowingCount.count} </b>}
                                                    following
                                                </Typography>
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
                            <Tab label={<Hidden smDown>Videos</Hidden>} icon={<VideoLibrary />} />
                            {viewingMyProfile && 
                            <Tab label={<Hidden smDown>Newsfeed</Hidden>} icon={<GridOn />} />}
                            <Tab label={<Hidden smDown>Playlists</Hidden>} icon={<FeaturedPlayList />} />
                            {viewingMyProfile && 
                            <Tab label={<Hidden smDown>Saved</Hidden>} icon={<BookmarkBorder />} />}
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

                    <Modal
                        open={show}
                        onClose={this.handleCloseModal}
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
                                    onChange={this.onFileChange}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    classes={{ root: classes.modalButton }}
                                >
                                    Upload Photo
                                </Button>
                            </label>

                            <Button
                                variant="contained"
                                color="primary"
                                classes={{ root: classes.modalButtonRemove }}
                                onClick={this.handleRemove}
                            >
                                Remove Photo
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                classes={{ root: classes.modalButtonCancel }}
                                onClick={this.handleCloseModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Modal>

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
                                    onClick={() => { this.showCroppedImage(); this.handleCloseImageModal() }}
                                    variant="contained"
                                    color="primary"
                                    classes={{ root: classes.cropButton }}
                                >
                                    Save
                                </Button>
                                <Button
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

                    <Modal
                        open={showUnfollow}
                        onClose={this.handleCloseUnfollowModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={classes.modalUpload}>
                        <Box m={1}/>
                        <img src={this.props.userProfile.previewImg} className={classes.avatarMd} />

                        <Box m={1}/>
                        <Typography variant="subtitle2"> Unfollow @{this.props.username}?</Typography>
                        <Box m={1}/>
                        
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
                    
                </div>



            </ThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { loggedIn } = state.authentication;
    const { profile, loadingProfile } = state.getProfile;
    const { userProfile, loadingUserProfile } = state.getUserProfile;
    const {follow, loadingFollowStatus } = state.getFollowStatus;
    const { myFollowerCount, loadingMyFollowerCount, myFollowerCountLoaded } = state.getMyFollowerCount;
    const { myFollowingCount, loadingMyFollowingCount, myFollowingCountLoaded } = state.getMyFollowingCount;
    const { userFollowerCount, loadingUserFollowerCount } = state.getUserFollowerCount;
    const { userFollowingCount, loadingUserFollowingCount } = state.getUserFollowingCount;
    return { loggedIn, user, users, profile, loadingProfile, userProfile, loadingUserProfile, follow, loadingFollowStatus, myFollowerCount, loadingMyFollowerCount, myFollowerCountLoaded, myFollowingCount, loadingMyFollowingCount, myFollowingCountLoaded, userFollowerCount, loadingUserFollowerCount, userFollowingCount, loadingUserFollowingCount };
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