import React from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

//router and page imports
import { history } from '../_helpers';
import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';
import { followActions } from '../_actions/follow';

//cropper tool helper inputs
import isEqual from 'lodash.isequal';

//import custom component
import CustomToolbar from "../_components/desktop/CustomToolbar";
import CustomToolbarMobile from "../_components/mobile/CustomToolbarMobile";
import UserProfile from "../_components/desktop/UserProfile";
import UserProfileTabs from "../_components/desktop/UserProfileTabs";
import UserProfileMobile from "../_components/mobile/UserProfileMobile";
import UserProfileTabsMobile from "../_components/mobile/UserProfileTabsMobile";
import UserFollowModal from "../_components/desktop/UserFollowModal";
import UserFollowModalMobile from "../_components/mobile/UserFollowModalMobile";
import DelFollowModal from "../_components/desktop/DelFollowModal";
import DelFollowModalMobile from "../_components/mobile/DelFollowModalMobile";
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
            showUnfollowList: false,
            showFollowers: false,
            showFollowing: false,
            followStatusLoaded: false,
            unfollowPreviewImg: null,
            unfollowId: null,
            unfollowUsername: null,
            text: '',
            pendingReq: true,
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.throttleHandleChange = debounce(this.throttleHandleChange.bind(this), 300);
    }

    handleTextClear = () => {
        this.setState({ text: "" });
    }

    handleTextChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ pendingReq: true });
        if(value.length > 2){
            this.throttleHandleChange(value)
        }
    };

    throttleHandleChange = async (value) => {
        console.log("ENTERING THROTTLE FUNCTION")
        const dispatch = await this.props.userSearch(value);
        this.setState({ pendingReq: false });
        console.log(this.props.searchResults)
        setTimeout(() => console.log(this.props.searchResults), 50) 
    }

    keyPress = async (e) => {
        if (e.keyCode == 13) {
            console.log(e.target.value)
            const dispatch = await this.props.userSearch(e.target.value)
            this.setState({ showResult: true });
        }
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

    handleUnfollowList = async () => {
        const dispatch = await this.props.unfollow(this.props.user.id, this.props.user.accessToken, this.state.unfollowId, this.props.username);
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

    handleShowUnfollowList = () => {
        this.setState({ unfollowPreviewImg: this.props.userProfile.previewImg })
        this.setState({ unfollowUsername: this.props.username })
        this.setState({ showUnfollowList: true })
        console.log("showUnfollowList status: ", this.state.showUnfollowList)
    }

    handleShowFollowers = () => {
        const dispatch = this.props.getUserFollowerInfo(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        const dispatch2 = this.props.getFollowingStatusEUM(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.user.username)
        this.setState({ showFollowers: true })
        console.log("showFollowers status: ", this.state.showFollowers)
    }

    handleShowFollowing = () => {
        const dispatch = this.props.getUserFollowingInfo(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        const dispatch2 = this.props.getFollowingStatusIUM(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.user.username)
        this.setState({ showFollowing: true })
        console.log("showFollowing status: ", this.state.showFollowing)
    }

    handleCloseUnfollowModal = () => {
        this.setState({ showUnfollow: false })

    }

    handleCloseUnfollowListModal = () => {
        this.setState({ showUnfollowList: false })

    }

    handleCloseFollowersModal = () => {
        this.setState({ showFollowers: false })

    }

    handleCloseFollowingModal = () => {
        this.setState({ showFollowing: false })

    }

    handleFollowerPageChange = (e, i) => {
        const username = this.props.userFollowerInfo[i].username;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(this.props.userFollowerInfo[i].username);
        history.push('/' + username + '/user');
    };

    handlePageChange = (e, i) => {
        const username = this.props.userFollowingInfo[i].username;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(this.props.userFollowingInfo[i].username);
        history.push('/' + username + '/user');
    };

    handleShowFollowingList = (e, i) => {
        console.log("testing handleShowFollowingList")
        const username = this.props.userFollowingInfo[i].username;
        const previewImg = this.props.userFollowingInfo[i].previewImg;
        const id = this.props.userFollowingInfo[i].id;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(username);
        console.log(previewImg);
        console.log("showUnfollow status: ", this.state.showUnfollowList)
        this.setState({ unfollowPreviewImg: previewImg })
        this.setState({ unfollowUsername: username })
        this.setState({ showUnfollowList: true })
        this.setState({ unfollowId: id })
    }

    handleShowFollowersList = (e, i) => {
        console.log("testing handleShowFollowersList")
        const username = this.props.userFollowerInfo[i].username;
        const previewImg = this.props.userFollowerInfo[i].previewImg;
        const id = this.props.userFollowerInfo[i].id;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(username);
        console.log(previewImg);
        console.log("showUnfollow status: ", this.state.showUnfollowList)
        this.setState({ unfollowPreviewImg: previewImg })
        this.setState({ unfollowUsername: username })
        this.setState({ showUnfollowList: true })
        this.setState({ unfollowId: id })
    }

    handleFollowFollower = (e, i) => {
        const id = this.props.userFollowerInfo[i].id;
        e.persist();
        console.log(e);
        console.log(i);
        console.log(id)
        const dispatch = this.props.followUser(this.props.user.id, this.props.user.accessToken, id, this.props.username);
    }

    handleFollowFollowing = (e, i) => {
        const id = this.props.userFollowingInfo[i].id;
        e.persist();
        console.log(e);
        console.log(i);
        const dispatch = this.props.followUser(this.props.user.id, this.props.user.accessToken, id, this.props.username);
    }

    //Get all of our profile props to display the user information
    getProfile = async (e) => {
        console.log("GETTING PROFILE INFO")
        console.log("LOGGING USERNAME")

        //if we aren viewing a user's profile, view will be of their profile
        //add code to query if we are following user here
        if (isEqual(this.props.username, this.props.user.username)) {
            history.replace('/' + this.props.username + '/profile')
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
        console.log("GETTING FOLLOW STATUS")
        //const userDetails = await this.props.getUserDetails(this.props.username)
        const id = this.props.user.id;
        const userId = this.props.userProfile.userId;
        console.log("Following Status for ids listed below")
        console.log("id: ", id, "userId: ", userId)
        const dispatch2 = await this.props.getFollowingStatus(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId)

    }

    userFollowingStatus = async (e, i) => {
        const dispatch = await this.props.getFollowingStatus(this.props.user.id, this.props.user.accessToken, this.props.userFollowingInfo[i].username)
    }

    userFollowCount = async (e) => {
        const dispatch1 = await this.props.getUserFollowerCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
        const dispatch2 = await this.props.getUserFollowingCount(this.props.user.id, this.props.user.accessToken, this.props.userProfile.userId, this.props.username);
    }

    //Each time page refreshes we call this function 
    async componentDidMount() {

        this.getProfile();
        if (isMobile) {
            await new Promise(resolve => { setTimeout(resolve, 3000); });
        }
        else {
            await new Promise(resolve => { setTimeout(resolve, 200); });
        }
        this.followingStatus();
        this.userFollowCount();
        //note: this is here to reduce glitchiness
        this.setState({ followStatusLoaded: true });
        return Promise.resolve();
    }

    componentDidUpdate() {
        // console.log("component did update")
    }

    render() {
        const { anchorEl, messagesOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, showImageCrop, showUnfollow, showUnfollowList, showFollowers, showFollowing, unfollowPreviewImg, unfollowUsername, pendingReq } = this.state;
        const { classes } = this.props;
        const { loadingProfile } = this.props;
        const { loadingUserProfile } = this.props;
        const { loadingFollowStatus, followStatusLoaded } = this.props;
        const { loadingUserFollowerCount, loadingUserFollowingCount } = this.props;
        const { loadingFollowingInfo, loadingFollowerInfo, loadingUserFollowingInfo, loadingUserFollowerInfo } = this.props;
        const { followingInfoLoaded, followerInfoLoaded, userFollowingInfoLoaded, userFollowerInfoLoaded } = this.props;
        const { loadingFollowingStatusEUM, followingStatusEUMLoaded } = this.props;
        const { loadingFollowingStatusIUM, followingStatusIUMLoaded } = this.props;

        return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className={classes.grow}>
                    {!isMobile &&
                        <CustomToolbar
                            pendingReq={pendingReq}
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
                            pendingReq={pendingReq}
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

                    {!isMobile && this.props.follow != undefined && 
                    <UserProfile
                        userProfile={this.props.userProfile}
                        loadingUserProfile={loadingUserProfile}
                        handleShow={this.handleShow}
                        username={this.props.username}
                        loadingFollowStatus={loadingFollowStatus}
                        isFollowing={this.props.follow.isFollowing}
                        followStatusLoaded={this.state.followStatusLoaded}
                        follow={this.follow}
                        handleShowUnfollow={this.handleShowUnfollow}
                        handleShowFollowers={this.handleShowFollowers}
                        loadingUserFollowerCount={loadingUserFollowerCount}
                        userFollowerCount={this.props.userFollowerCount.count}
                        handleShowFollowing={this.handleShowFollowing}
                        loadingUserFollowingCount={loadingUserFollowingCount}
                        userFollowingCount={this.props.userFollowingCount.count}
                        name={this.props.userProfile.name}
                        bio={this.props.userProfile.bio}
                        link={this.props.userProfile.link}
                    />}

                    {isMobile && this.props.follow != undefined && 
                    <UserProfileMobile
                        userProfile={this.props.userProfile}
                        loadingUserProfile={loadingUserProfile}
                        handleShow={this.handleShow}
                        username={this.props.username}
                        loadingFollowStatus={loadingFollowStatus}
                        isFollowing={this.props.follow.isFollowing}
                        followStatusLoaded={this.state.followStatusLoaded}
                        follow={this.follow}
                        handleShowUnfollow={this.handleShowUnfollow}
                        handleShowFollowers={this.handleShowFollowers}
                        loadingUserFollowerCount={loadingUserFollowerCount}
                        userFollowerCount={this.props.userFollowerCount.count}
                        handleShowFollowing={this.handleShowFollowing}
                        loadingUserFollowingCount={loadingUserFollowingCount}
                        userFollowingCount={this.props.userFollowingCount.count}
                        name={this.props.userProfile.name}
                        bio={this.props.userProfile.bio}
                        link={this.props.userProfile.link}
                    />}
                     
                     {!isMobile && this.props.follow != undefined && 
                     <UserProfileTabs
                        tab={tab}
                        handleTabChange={this.handleTabChange}
                        followStatusLoaded={this.state.followStatusLoaded}
                     />}

                    {isMobile && this.props.follow != undefined && 
                     <UserProfileTabsMobile
                        tab={tab}
                        handleTabChange={this.handleTabChange}
                        followStatusLoaded={this.state.followStatusLoaded}
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

                    {/* Unfollow from List Modal */}
                    {!isMobile &&
                    <DelFollowModal
                        show={showUnfollowList}
                        handleCloseModal={this.handleCloseUnfollowListModal}
                        previewImg={unfollowPreviewImg}
                        username={unfollowUsername}
                        handleAction={this.handleUnfollowList}
                        text={"Unfollow"}
                    />}

                    {isMobile &&
                    <DelFollowModalMobile
                        show={showUnfollowList}
                        handleCloseModal={this.handleCloseUnfollowListModal}
                        previewImg={unfollowPreviewImg}
                        username={unfollowUsername}
                        handleAction={this.handleUnfollowList}
                        text={"Unfollow"}
                    />}

                    {/*Shows Followers*/}
                    {!isMobile &&
                    <UserFollowModal
                        show={showFollowers}
                        handleCloseModal={this.handleCloseFollowersModal}
                        infoLoaded={userFollowerInfoLoaded}
                        loadingInfo={loadingUserFollowerInfo}
                        followingStatusLoaded={followingStatusEUMLoaded}
                        loadingFollowingStatus={loadingFollowingStatusEUM}
                        followInfo={this.props.userFollowerInfo}
                        followingStatus={this.props.followingStatusEUM}
                        handleShow={this.handleShowFollowersList}
                        handlePageChange={this.handleFollowerPageChange}
                        buttonText={"Remove"}
                        followText={"Followers"}
                        handleFollow={this.handleFollowFollower}
                        myUsername={this.props.user.username}
                        followCount={this.props.userFollowerCount.count}
                    />}

                    {isMobile &&
                    <UserFollowModalMobile
                        show={showFollowers}
                        handleCloseModal={this.handleCloseFollowersModal}
                        infoLoaded={userFollowerInfoLoaded}
                        loadingInfo={loadingUserFollowerInfo}
                        followingStatusLoaded={followingStatusEUMLoaded}
                        loadingFollowingStatus={loadingFollowingStatusEUM}
                        followInfo={this.props.userFollowerInfo}
                        followingStatus={this.props.followingStatusEUM}
                        handleShow={this.handleShowFollowersList}
                        handlePageChange={this.handleFollowerPageChange}
                        buttonText={"Remove"}
                        followText={"Followers"}
                        handleFollow={this.handleFollowFollower}
                        myUsername={this.props.user.username}
                        followCount={this.props.userFollowerCount.count}
                    />}

                    {/*Shows Following*/}
                    {!isMobile &&
                    <UserFollowModal
                        show={showFollowing}
                        handleCloseModal={this.handleCloseFollowingModal}
                        infoLoaded={userFollowingInfoLoaded}
                        loadingInfo={loadingUserFollowingInfo}
                        followingStatusLoaded={followingStatusIUMLoaded}
                        loadingFollowingStatus={loadingFollowingStatusIUM}
                        followInfo={this.props.userFollowingInfo}
                        followingStatus={this.props.followingStatusIUM}
                        handleShow={this.handleShowFollowingList}
                        handlePageChange={this.handlePageChange}
                        buttonText={"Following"}
                        followText={"Following"}
                        handleFollow={this.handleFollowFollowing}
                        myUsername={this.props.user.username}
                        followCount={this.props.userFollowingCount.count}
                    />}

                    {isMobile &&
                    <UserFollowModalMobile
                        show={showFollowing}
                        handleCloseModal={this.handleCloseFollowingModal}
                        infoLoaded={userFollowingInfoLoaded}
                        loadingInfo={loadingUserFollowingInfo}
                        followingStatusLoaded={followingStatusIUMLoaded}
                        loadingFollowingStatus={loadingFollowingStatusIUM}
                        followInfo={this.props.userFollowingInfo}
                        followingStatus={this.props.followingStatusIUM}
                        handleShow={this.handleShowFollowingList}
                        handlePageChange={this.handlePageChange}
                        buttonText={"Following"}
                        followText={"Following"}
                        handleFollow={this.handleFollowFollowing}
                        myUsername={this.props.user.username}
                        followCount={this.props.userFollowingCount.count}
                    />}
                </div>
            </ThemeProvider>
        );
    }
}

UserProfilePage.defaultProps= {
    searchResults: []
  }

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { searchResults, loadingSearchResults } = state.getSearchResults;
    const { loggedIn } = state.authentication;
    const { profile, loadingProfile, } = state.getProfile;
    const { userDetails, loadingUserDetails } = state.getUserDetails;
    const { userProfile, loadingUserProfile } = state.getUserProfile;
    const { follow, loadingFollowStatus, followStatusLoaded } = state.getFollowStatus;
    const { userFollowerCount, loadingUserFollowerCount } = state.getUserFollowerCount;
    const { userFollowingCount, loadingUserFollowingCount } = state.getUserFollowingCount;
    const { followingInfo, loadingFollowingInfo, followingInfoLoaded } = state.getFollowingInfo;
    const { followerInfo, loadingFollowerInfo, followerInfoLoaded } = state.getFollowerInfo;
    const { userFollowingInfo, loadingUserFollowingInfo, userFollowingInfoLoaded } = state.getUserFollowingInfo;
    const { userFollowerInfo, loadingUserFollowerInfo, userFollowerInfoLoaded } = state.getUserFollowerInfo;
    const { followingStatusEUM, loadingFollowingStatusEUM, followingStatusEUMLoaded } = state.getFollowingStatusEUM;
    const { followingStatusIUM, loadingFollowingStatusIUM, followingStatusIUMLoaded } = state.getFollowingStatusIUM;
    return {
        loggedIn, user, users, profile, loadingProfile, userProfile, loadingUserProfile,
        follow, loadingFollowStatus, followStatusLoaded, userFollowerCount, userDetails, loadingUserDetails,
        loadingUserFollowerCount, userFollowingCount, loadingUserFollowingCount, followingInfo,
        loadingFollowingInfo, followingInfoLoaded, followerInfo, loadingFollowerInfo,
        followerInfoLoaded, userFollowingInfo, loadingUserFollowingInfo, userFollowingInfoLoaded,
        userFollowerInfo, loadingUserFollowerInfo, userFollowerInfoLoaded, followingStatusEUM,
        loadingFollowingStatusEUM, followingStatusEUMLoaded, followingStatusIUM, loadingFollowingStatusIUM,
        followingStatusIUMLoaded, searchResults, loadingSearchResults
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
    getUserDetails: userActions.getUserDetails,
    getFollowingStatusEUM: followActions.getFollowingStatusEUM,
    getFollowingStatusIUM: followActions.getFollowingStatusIUM,
    userSearch: userActions.userSearch,
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(UserProfilePage));