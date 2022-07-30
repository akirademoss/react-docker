import React from 'react';
import { connect } from 'react-redux';

//MUI component imports
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

//router and action imports
import { history } from '../_helpers';
import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';

//cropper tool helper inputs
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from '../ProfilePage/canvasUtils'

//custom component imports
import CustomToolbar from "../_components/desktop/CustomToolbar";
import CustomToolbarMobile from "../_components/mobile/CustomToolbarMobile";
import ChangePicModal from "../_components/desktop/ChangePicModal";
import ChangePicModalMobile from "../_components/mobile/ChangePicModalMobile";
import UploadPicModal from "../_components/desktop/UploadPicModal";
import UploadPicModalMobile from "../_components/mobile/UploadPicModalMobile";
import EditProfileForm from "../_components/desktop/EditProfileForm";
import EditProfileFormMobile from "../_components/mobile/EditProfileFormMobile";

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
    // type: 'dark',
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[500],
      light: grey[500],
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
  text: {
    width: 300,
    color: 'primary',
    backgroundColor: 'primary',
  },
  submitButton: {
    margin: darkTheme.spacing(3, 0, 0),
    width: 260,
  },
  formholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    height: '100%',
    marginTop: darkTheme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: darkTheme.palette.common.white,
    alignItems: 'center',
    borderBottom: '1px solid grey',
    borderTop: '1px solid grey',
    borderLeft: '1px solid grey',
    borderRight: '1px solid grey',
  },
  link: {
    textDecoration: 'none',
    color: blue[700]
  },
});

//Image edit rotation helper
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

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      messagesOpen: false,
      notificationsOpen: false,
      profileOpen: false,
      isLoggedIn: false,
      submitted: false,
      name: this.props.profile.name,
      bio: this.props.profile.bio,
      link: this.props.profile.link,
      profile: { name: '', bio: '', link: '', previewImg: '' },
      //states for profile image edit 
      imageSrc: null,
      crop: { x: 0, y: 0 },
      rotation: 0,
      zoom: 1,
      croppedAreaPixels: null,
      croppedImage: null,
      show: false,
      showImageCrop: false,
      text: '',
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.throttleHandleChange = debounce(this.throttleHandleChange.bind(this), 300);
  }

  handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.throttleHandleChange(value)
  };

  throttleHandleChange = async (value) => {
    console.log("ENTERING THROTTLE FUNCTION")
    const dispatch = await this.props.userSearch(value);
  }

  keyPress = async (e) => {
    if (e.keyCode == 13) {
      console.log(e.target.value)
      const dispatch = await this.props.userSearch(e.target.value)
      this.setState({ showResult: true });
    }
  }
  handleTextClear = () => {
    this.setState({ text: "" });
  }

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

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ submitted: true });

    const { name, bio, link } = this.state;
    console.log(link)
    console.log("testing")
    const username = this.props.user.username
    const id = this.props.user.id
    const token = this.props.user.accessToken
    if ((name || bio || link) && username && id && token) {
      const dispatch = await this.props.update(name, bio, link, username, id, token);
    }

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

  handleShowImageCrop = () => {
    this.setState({ showImageCrop: true })
  }

  handleCloseImageModal = () => {
    this.setState({ showImageCrop: false })

  }

  //get the user information
  getProfile = async (e) => {
    //e.preventDefault();
    const username = this.props.user.username;
    const id = this.props.user.id;
    const token = this.props.user.accessToken;
    this.profile = await this.props.getInfo(username, id, token);
    this.setState({ profile: this.props.profile })
  }

  componentDidMount() {
    this.getProfile();
  }

  render() {
    const { anchorEl, messagesOpen, notificationsOpen, profileOpen, name, bio, link, imageSrc, crop, rotation, zoom, show, profile, showImageCrop } = this.state;
    const { classes } = this.props;
    const { loadingProfile } = this.props;
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        {!isMobile &&
          <div>
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
              searchText={this.state.text}
              handleTextClear={this.handleTextClear}
              handleTextChange={this.handleTextChange}
              keyPress={this.keyPress}
            />

            <EditProfileForm
              handleSubmit={this.handleSubmit}
              profile={this.props.profile}
              loadingProfile={loadingProfile}
              handleShow={this.handleShow}
              username={this.props.user.username}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              name={name}
              bio={bio}
              link={link}
            />

            <div className={classes.formholder}>
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
            </div>
          </div>}

        {isMobile &&
          <div>
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
            />
            <EditProfileFormMobile
              handleSubmit={this.handleSubmit}
              profile={this.props.profile}
              loadingProfile={loadingProfile}
              handleShow={this.handleShow}
              username={this.props.user.username}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              name={name}
              bio={bio}
              link={link}
            />

            <div className={classes.formholder}>
              <ChangePicModalMobile
                show={show}
                handleCloseModal={this.handleCloseModal}
                onFileChange={this.onFileChange}
                handleRemove={this.handleRemove}
              />

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
              />
            </div>
          </div>}
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { profile, loadingProfile } = state.getProfile;
  return { user, users, profile, loadingProfile };
}

const actionCreators = {
  logout: userActions.logout,
  update: profileActions.update,
  getInfo: profileActions.getInfo,
  uploadAvatar: profileActions.uploadAvatar,
  removeAvatar: profileActions.removeAvatar,
  userSearch: userActions.userSearch,
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(EditProfile));