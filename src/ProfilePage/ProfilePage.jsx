import React from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";


//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

//router and page imports
import { history } from '../_helpers';
import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';
import { followActions } from '../_actions/follow';

//cropper tool helper inputs
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import isEqual from 'lodash.isequal';

//import custom component
import CustomToolbar from "../_components/desktop/CustomToolbar";
import CustomToolbarMobile from "../_components/mobile/CustomToolbarMobile";
import Profile from "../_components/desktop/Profile";
import ProfileTabs from "../_components/desktop/ProfileTabs";
import ProfileMobile from "../_components/mobile/ProfileMobile";
import ProfileTabsMobile from "../_components/mobile/ProfileTabsMobile";
import ChangePicModal from "../_components/desktop/ChangePicModal";
import ChangePicModalMobile from "../_components/mobile/ChangePicModalMobile";
import UploadPicModal from "../_components/desktop/UploadPicModal";
import UploadPicModalMobile from "../_components/mobile/UploadPicModalMobile";
import FollowModal from "../_components/desktop/FollowModal";
import FollowModalMobile from "../_components/mobile/FollowModalMobile";
import DelFollowModal from "../_components/desktop/DelFollowModal";
import DelFollowModalMobile from "../_components/mobile/DelFollowModalMobile";
import SearchResultModal from "../_components/SearchResultModal";



//debounce import
import debounce from 'lodash.debounce';
import { isMobile, browserName } from "react-device-detect";

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
            showResult: false,
            showImageCrop: false,
            showUnfollow: false,
            showRemove: false,
            showFollowers: false,
            showFollowing: false,
            viewingMyProfile: true,
            followStatusLoaded: false,
            unfollowPreviewImg: null,
            unfollowId: null,
            unfollowUsername: null,
            removePreviewImg: null,
            removeId: null,
            removeUsername: null,
            text: '',
            searchResults: {},
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.throttleHandleChange = debounce(this.throttleHandleChange.bind(this), 1200);
    }


    handleTextClear =  async (e) =>{
        this.setState({ text: "" });
        const dispatch = await this.props.userSearch(e.target.value)
    }



    handleTextChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if(value.length > 2){
            this.throttleHandleChange(value)
        }
    };

    throttleHandleChange = async (value) => {
        console.log("ENTERING THROTTLE FUNCTION")
        const dispatch = await this.props.userSearch(value);

        console.log(this.props.searchResults)
        setTimeout(() => console.log(this.props.searchResults), 100)  
    }

    keyPress = async (e) => {
        if (e.keyCode == 13) {
            console.log(e.target.value)
            const dispatch = await this.props.userSearch(e.target.value)
            this.setState({ showResult: true });
        }
    }

    handleCloseSearchResult = () => {
        this.setState({ showResult: false });
    }

    //Each time page refreshes we call this function 
    async componentDidMount() {
        this.getProfile();
        this.myFollowCount();
    }

    componentDidUpdate(nextProps, prevProps) {
        console.log("component did update")
        console.log(nextProps)       
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

    handleUnfollow = async () => {
        const dispatch = await this.props.unfollow(this.props.user.id, this.props.user.accessToken, this.state.unfollowId, this.props.username);
    }

    handleRemoveFollower = async () => {
        const dispatch = await this.props.removeFollower(this.props.user.id, this.props.user.accessToken, this.state.removeId, this.props.username);
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
        const username = this.props.followerInfo[i].username;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(this.props.followerInfo[i].username);
        history.push('/' + username + '/user');
    };

    handlePageChange = (e, i) => {
        const username = this.props.followingInfo[i].username;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(this.props.followingInfo[i].username);
        history.push('/' + username + '/user');
    };

    handleShowUnfollowing = (e, i) => {
        console.log("testing handleShowUnfollowing")
        const username = this.props.followingInfo[i].username;
        const previewImg = this.props.followingInfo[i].previewImg;
        const id = this.props.followingInfo[i].id;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(username);
        console.log(previewImg);
        console.log("showUnfollow status: ", this.state.showUnfollow)
        this.setState({ unfollowPreviewImg: previewImg })
        this.setState({ unfollowUsername: username })
        this.setState({ showUnfollow: true })
        this.setState({ unfollowId: id })
    }

    handleShowRemove = (e, i) => {
        console.log("testing handleShowRemove")
        const username = this.props.followerInfo[i].username;
        const previewImg = this.props.followerInfo[i].previewImg;
        const id = this.props.followerInfo[i].id
        e.persist();
        console.log(e);
        console.log(i);
        console.log(username);
        console.log(previewImg);
        console.log("showRemove status: ", this.state.showRemove)
        this.setState({ removeId: id })
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
        else {
            history.replace('/error');
        }

        // provide error messaging for URL browsing
        if (!isEqual(this.props.username, this.props.user.username)) {
            history.replace('/' + this.props.username + '/user');
        }
    }

    myFollowCount = async (e) => {
        if (this.props.loggedIn) {
            const dispatch1 = await this.props.getFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.user.username);
            const dispatch2 = await this.props.getFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.user.username);
        }
    }

    render() {
        const { anchorEl, messagesOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, showImageCrop, showUnfollow, showRemove, viewingMyProfile, showFollowers, showFollowing, unfollowPreviewImg, unfollowUsername, removePreviewImg, removeUsername} = this.state;
        const { classes, loadingProfile } = this.props;
        const { loadingMyFollowerCount, loadingMyFollowingCount, myFollowerCountLoaded, myFollowingCountLoaded } = this.props;
        const { loadingFollowingInfo, loadingFollowerInfo } = this.props;
        const { followingInfoLoaded, followerInfoLoaded } = this.props;


        return (

            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className={classes.grow}>
                    {!isMobile &&
                        <CustomToolbar
                            searchResults={this.props.searchResults}
                            loadingSearchResults={this.props.loadingSearchResults}
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
                            handleTextChange={this.handleTextChange}
                            searchText={this.state.text}
                            handleTextClear={this.handleTextClear}
                            keyPress={this.keyPress}
                        />}
                    {isMobile &&
                        <CustomToolbarMobile
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
                            handleTextChange={this.handleTextChange}
                            searchText={this.state.text}
                            handleTextClear={this.handleTextClear}
                            keyPress={this.keyPress}
                        />}


                    {!isMobile &&
                    <Profile
                        profile={this.props.profile}
                        loadingProfile={loadingProfile}
                        viewingMyProfile={viewingMyProfile}
                        handleShow={this.handleShow}
                        username={this.props.username}
                        handleEditProfile={this.handleEditProfile}
                        handleShowFollowers={this.handleShowFollowers}
                        loadingMyFollowerCount={loadingMyFollowerCount}
                        myFollowerCount={this.props.myFollowerCount.count}
                        handleShowFollowing={this.handleShowFollowing}
                        loadingMyFollowingCount={loadingMyFollowingCount}
                        myFollowingCount={this.props.myFollowingCount.count}
                        name={this.props.profile.name}
                        bio={this.props.profile.bio}
                        link={this.props.profile.link}
                        tab={tab}
                        handleTabChange={this.handleTabChange}
                    />}

                    {isMobile &&
                    <ProfileMobile
                        profile={this.props.profile}
                        loadingProfile={loadingProfile}
                        viewingMyProfile={viewingMyProfile}
                        handleShow={this.handleShow}
                        username={this.props.username}
                        handleEditProfile={this.handleEditProfile}
                        handleShowFollowers={this.handleShowFollowers}
                        loadingMyFollowerCount={loadingMyFollowerCount}
                        myFollowerCount={this.props.myFollowerCount.count}
                        handleShowFollowing={this.handleShowFollowing}
                        loadingMyFollowingCount={loadingMyFollowingCount}
                        myFollowingCount={this.props.myFollowingCount.count}
                        name={this.props.profile.name}
                        bio={this.props.profile.bio}
                        link={this.props.profile.link}
                        tab={tab}
                        handleTabChange={this.handleTabChange}
                    />}
                     
                     {!isMobile &&
                     <ProfileTabs
                        tab={tab}
                        handleTabChange={this.handleTabChange}
                     />}

                    {isMobile &&
                     <ProfileTabsMobile
                        tab={tab}
                        handleTabChange={this.handleTabChange}
                     />}

                    {!isMobile &&
                    <ChangePicModal
                        show={show}
                        handleCloseModal={this.handleCloseModal}
                        onFileChange={this.onFileChange}
                        handleRemove={this.handleRemove}
                    />}

                    {isMobile &&
                    <ChangePicModalMobile
                        show={show}
                        handleCloseModal={this.handleCloseModal}
                        onFileChange={this.onFileChange}
                        handleRemove={this.handleRemove}
                    />}

                    {!isMobile &&
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
                    />}
                    {isMobile &&
                    <UploadPicModalMobile
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
                    />}

                    {/*Shows Followers*/}
                    {!isMobile &&
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
                        followCount={this.props.myFollowerCount.count}
                    />}

                    {isMobile &&
                    <FollowModalMobile
                        show={showFollowers}
                        handleCloseModal={this.handleCloseFollowersModal}
                        infoLoaded={followerInfoLoaded}
                        loadingInfo={loadingFollowerInfo}
                        followInfo={this.props.followerInfo}
                        handleShow={this.handleShowRemove}
                        handlePageChange={this.handleFollowerPageChange}
                        buttonText={"Remove"}
                        followText={"Followers"}
                        followCount={this.props.myFollowerCount.count}
                    />}

                    {/*Shows Following*/}
                    {!isMobile &&
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
                        followCount={this.props.myFollowingCount.count}
                    />}

                    {isMobile &&
                    <FollowModalMobile
                        show={showFollowing}
                        handleCloseModal={this.handleCloseFollowingModal}
                        infoLoaded={followingInfoLoaded}
                        loadingInfo={loadingFollowingInfo}
                        followInfo={this.props.followingInfo}
                        handleShow={this.handleShowUnfollowing}
                        handlePageChange={this.handlePageChange}
                        buttonText={"Following"}
                        followText={"Following"}
                        followCount={this.props.myFollowingCount.count}
                    />}

                    {/* Unfollow Modal */}
                    {!isMobile &&
                    <DelFollowModal
                        show={showUnfollow}
                        handleCloseModal={this.handleCloseUnfollowModal}
                        previewImg={unfollowPreviewImg}
                        username={unfollowUsername}
                        handleAction={this.handleUnfollow}
                        text={"Unfollow"}
                    />}
                    
                    {isMobile &&
                    <DelFollowModalMobile
                        show={showUnfollow}
                        handleCloseModal={this.handleCloseUnfollowModal}
                        previewImg={unfollowPreviewImg}
                        username={unfollowUsername}
                        handleAction={this.handleUnfollow}
                        text={"Unfollow"}
                    />}

                    {/* Remove Folower Modal */}
                    {!isMobile &&
                    <DelFollowModal
                        show={showRemove}
                        handleCloseModal={this.handleCloseRemoveModal}
                        previewImg={removePreviewImg}
                        username={removeUsername}
                        handleAction={this.handleRemoveFollower}
                        text={"Remove"}
                    />}

                    {isMobile &&
                    <DelFollowModalMobile
                        show={showRemove}
                        handleCloseModal={this.handleCloseRemoveModal}
                        previewImg={removePreviewImg}
                        username={removeUsername}
                        handleAction={this.handleRemoveFollower}
                        text={"Remove"}
                    />}
                </div>
            </ThemeProvider>
        );
    }
}

ProfilePage.defaultProps= {
    searchResults: []
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { searchResults, loadingSearchResults } = state.getSearchResults;
    const { loggedIn } = state.authentication;
    const { profile, loadingProfile } = state.getProfile;
    const { userProfile } = state.getUserProfile;
    const { follow, loadingFollowStatus } = state.getFollowStatus;
    const { myFollowerCount, loadingMyFollowerCount, myFollowerCountLoaded } = state.getMyFollowerCount;
    const { myFollowingCount, loadingMyFollowingCount, myFollowingCountLoaded } = state.getMyFollowingCount;
    const { followingInfo, loadingFollowingInfo, followingInfoLoaded } = state.getFollowingInfo;
    const { followerInfo, loadingFollowerInfo, followerInfoLoaded } = state.getFollowerInfo;
    return {
        loggedIn, user, users, profile, loadingProfile, userProfile, follow,
        loadingFollowStatus, myFollowerCount, loadingMyFollowerCount,
        myFollowingCount, loadingMyFollowingCount, followingInfo,
        loadingFollowingInfo, followingInfoLoaded, followerInfo,
        loadingFollowerInfo, followerInfoLoaded, myFollowerCountLoaded,
        myFollowingCountLoaded, searchResults, loadingSearchResults
    };
}

const actionCreators = {
    logout: userActions.logout,
    getInfo: profileActions.getInfo,
    getUserInfo: profileActions.getUserInfo,
    uploadAvatar: profileActions.uploadAvatar,
    removeAvatar: profileActions.removeAvatar,
    unfollow: followActions.unfollow,
    removeFollower: followActions.removeFollower,
    getFollowerCount: followActions.getFollowerCount,
    getFollowingCount: followActions.getFollowingCount,
    getFollowerInfo: followActions.getFollowerInfo,
    getFollowingInfo: followActions.getFollowingInfo,
    userSearch: userActions.userSearch,
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(ProfilePage));