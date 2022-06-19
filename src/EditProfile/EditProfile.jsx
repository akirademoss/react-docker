import React from 'react';
import { connect } from 'react-redux';

//MUI component imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
import CustomToolbar from "../_components/CustomToolbar";
import ProfilePic from "../_components/ProfilePic";
import ChangePicModal from "../_components/ChangePicModal";
import UploadPicModal from "../_components/UploadPicModal";

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
    width: 350,
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
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        </div>

        <div className={classes.formholder}>
          <Box m={4} />
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Box m={3} />
            <Grid container spacing={4} direction="row" alignItems="center" justify="center">
              <Grid item >
                <ProfilePic
                  profile={this.props.profile}
                  loadingProfile={loadingProfile}
                  viewingMyProfile={true}
                  handleShow={this.handleShow}
                />
              </Grid>
              <Grid item>
                <Box m={3} />
                <Typography component="h1" variant="h4">
                  {this.props.user.username}
                </Typography>
                <a className={classes.link} onClick={this.handleShow}>
                  <Typography component="h1" variant="subtitle1">
                    <b>Change Profile Photo</b>
                  </Typography>
                </a>
              </Grid>
            </Grid>

            <Box m={3} />

            <Grid container spacing={2} direction="column" alignItems="center" justify="center" className={classes.grow}>
              <Grid item>
                <Grid container spacing={2} direction="row" alignItems="top" justify="center">
                  <Grid item >
                    <Typography component="h1" variant="h6" style={{ marginTop: 30 }}>
                      <b>Name</b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="normal"
                      id="name"
                      name="name"
                      type="name"
                      value={name}
                      autoComplete="name"
                      autoFocus
                      className={classes.text}
                      onChange={this.handleChange}
                      FormHelperTextProps={{
                        className: classes.text
                      }}
                    />
                    <Grid item>
                      <Typography component="h1" variant="caption" className={classes.text} color="secondary">
                        Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                  <Grid item >
                    <Typography component="h1" variant="h6" style={{ marginLeft: 20 }}>
                      <b>Bio </b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="normal"
                      id="bio"
                      name="bio"
                      type="bio"
                      value={bio}
                      autoComplete="bio"
                      autoFocus
                      multiline
                      rows={4}
                      className={classes.text}
                      onChange={this.handleChange}
                      FormHelperTextProps={{
                        className: classes.text
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                  <Grid item >
                    <Typography component="h1" variant="h6" style={{ marginTop: 60 }}>
                      <b>Link</b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                      <Grid item>
                        <Typography component="h1" variant="subtitle2" className={classes.text} color="secondary">
                          <b>Personal Information</b>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography component="h1" variant="caption" className={classes.text} color="secondary">
                          Add a link to your personal or professional website
                    </Typography>
                      </Grid>
                      <Grid item >
                        <TextField
                          color="primary"
                          variant="outlined"
                          margin="normal"
                          id="link"
                          name="link"
                          type="link"
                          value={link}
                          autoComplete="link"
                          autoFocus
                          className={classes.text}
                          onChange={this.handleChange}
                          FormHelperTextProps={{
                            className: classes.text
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                >
                  Submit
            </Button>
              </Grid>
            </Grid>
            <Box m={4} />
          </form>

          <Box m={2} />
          <Typography variant="body2" color="secondary" align="center">
            Copyright © Too Legit To Submit, Inc 2022
          </Typography>

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
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(EditProfile));