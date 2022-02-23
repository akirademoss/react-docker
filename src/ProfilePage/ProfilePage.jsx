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
        margin: "auto",
        width: "150px",
        height: "150px",
        backgroundColor: darkTheme.palette.common.white,
    },
    avatarSm: {
        margin: "auto",
        width: "100px",
        height: "100px",
        backgroundColor: darkTheme.palette.common.white,
    },
    editButton: {
        borderBottom: '1px solid white',
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
    },
    posts: {
        marginTop: 5,
    },
    // styling for viewing image cropper tool
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        background: darkTheme.palette.common.black,
        [darkTheme.breakpoints.up('sm')]: {
          height: 400,
        },
      },
      cropButton: {
        marginLeft: 310,
        width: 10,
      },
      cancelButton: {
        marginLeft: 16,
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
        width: 10,
      },
      controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [darkTheme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          alignItems: 'center',
        },
      },
      sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
      },
      sliderLabel: {
        [darkTheme.breakpoints.down('xs')]: {
          minWidth: 65,
        },
      },
      slider: {
        padding: '22px 0px',
        marginLeft: 16,
        [darkTheme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          alignItems: 'center',
          margin: '0 16px',
          minWidth: 100,
        },
      },
      modalUpload: {
        [darkTheme.breakpoints.up('sm')]: {
            minheight: 200,
            minWidth: 400,
          },
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
      }
});

const Input = styled('input')({
    display: 'none',
  });

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

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            msgOpen: false,
            notificationsOpen: false,
            profileOpen: false,
            profile: {name: '', bio: '', link: ''},
            tab: 0, 
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

    setCrop = crop => {
        this.setState({crop});
    }

    setRotation = (e, rotation) => {
        this.setState({rotation: rotation});
    }

    setZoom = (e, zoom) => {
        this.setState({zoom: zoom});
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

        this.setState({imageSrc: imageDataUrl});
        this.setState({showImageCrop: true})
        this.setState({show: false})
        console.log(this.state.imageSrc)
      }
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({croppedAreaPixels :croppedArea})
        console.log(croppedArea, croppedAreaPixels)
      }
    
    showCroppedImage = async () => {
        try {
          const croppedImage = await getCroppedImg(
            this.state.imageSrc,
            this.state.croppedAreaPixels,
            this.state.rotation
          )
          console.log('donee', {croppedImage })
          this.setState({croppedImage: this.state.croppedImage})
        } catch (e) {
          console.error(e)
        }
      }
    
      onClose = () => {
        this.setState({croppedImage: null})
      }

    handleCloseModal = () => {
        this.setState({show: false})
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleShowImageCrop = () => {
        this.setState({showImageCrop: true})
    }

    handleCloseImageModal = () => {
        this.setState({showImageCrop: false})
    }

    getProfile = async (e) => {
        //e.preventDefault();
        const username = this.props.user.username;
        const id = this.props.user.id;
        const token = this.props.user.accessToken;
        const page = '/profile';
        this.profile = await this.props.getInfo(username, id, token, '/profile'); 
        this.setState({profile: this.props.profile})
     }

    componentDidMount(){
        this.getProfile();
        
    }

    render() {
        const { auth, anchorEl, msgOpen, notificationsOpen, profileOpen, tab, imageSrc, crop, rotation, zoom, show, profile, showImageCrop } = this.state;
        const open = Boolean(anchorEl);
        const { classes } = this.props;
        const {loadingProfile} = this.props;
        


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
                                name="notifications"
                                aria-owns={msgOpen ? 'message-alerts' : null}
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
                                open={msgOpen}
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
                                {<AccountCircle className={classes.iconButton} />}
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

                                    
                                    <IconButton
                                        id="contained-button-file"
                                        color="inherit"
                                        className={classes.iconButtonAvatar}
                                        onClick={this.handleShow}
                                        component="span"
                                    >
                                    {<AccountCircle className={classes.iconButtonAvatar}/>}
                                    </IconButton>    

                                    
                                </Grid>
                                <Grid item xs={8}>
                                    <Box clone mb="20px">
                                        <Grid container alignItems="center" spacing={4}>
                                            <Grid item>
                                                <Typography component="h1" variant="h4">
                                                    {this.props.user.username}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button className={classes.editButton} variant="outlined" fullWidth={false} onClick={this.handleEditProfile}>
                                                    Edit Profile
                                            </Button>
                                                <IconButton onClick={this.handleShowImageCrop}>
                                                    {<Settings />}
                                                </IconButton>
                                            </Grid>
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
                                                    <b>0</b> followers
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1">
                                                    <b>0</b> following
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Typography variant="subtitle1" bold>
                                        <b>{this.props.profile.name}</b>
                                    </Typography>
                            <Typography variant="subtitle1">{this.props.profile.bio}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        
                        <Tabs
                            value={tab}
                            centered
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                        >
                            <Tab label={<Hidden smDown>Videos</Hidden>} icon={<VideoLibrary/>} />
                            <Tab label={<Hidden smDown>Newsfeed</Hidden>} icon={<GridOn/>} />
                            <Tab label={<Hidden smDown>Playlists</Hidden>} icon={<FeaturedPlayList/>} />
                            <Tab label={<Hidden smDown>Saved</Hidden>} icon={<BookmarkBorder/>} />
                        </Tabs>
                        <Divider style={{ background: 'grey' }}/>
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
              aspect={1/1}
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
          <ImgDialog img={this.croppedImage} onClose={this.onClose} />          
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
    const { profile, loadingProfile } = state.getProfile;
    return { user, users, profile, loadingProfile};
}

const actionCreators = {
    logout: userActions.logout,
    getInfo: profileActions.getInfo
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(ProfilePage));