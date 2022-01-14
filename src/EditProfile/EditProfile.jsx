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
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SvgIcon from '@material-ui/core/SvgIcon';
import Avatar from '@material-ui/core/Avatar';

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

//menu stuff
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

//router and page imports
//import history from '../history';
import { history } from '../_helpers';

import { userActions } from '../actions/auth';
import { profileActions } from '../actions/profile';

//custom component import
import MenuButton from '../components/menuButton';


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
    }
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
  //Part of Top Nav Bar  
  navBar: {
    boxShadow: 'none',
    minHeight: 5,
    height: 'auto',
    backgroundColor: fade(grey[500], 0.4),

  },
  menuItem: {
    boxShadow: 'none',
    height: 'auto',
    background: 'transparent',
    color: darkTheme.palette.common.white,
  },
  menu: {
    boxShadow: 'none',
    //backgroundColor: fade(darkTheme.palette.common.black, 0.5),
  },
  iconButton: {

  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
    display: 'flex',
    flexDirection: 'row',
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
    //paddingLeft: '60px',
    //paddingRight: '60px',
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: darkTheme.palette.common.blue
  },
  avatarSm: {
    margin: "auto",
    width: "100px",
    height: "100px",
    backgroundColor: darkTheme.palette.common.grey,
  },
  input: {
    opacity: 0,
    height: 0,
    width: 0,
    margin: 0
  },
  link: {
    textDecoration: 'none',
    color: blue[700]
  },

});

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      msgOpen: false,
      notificationsOpen: false,
      profileOpen: false,
      isLoggedIn: false,
      submitted: false,
      name: '',
      bio: '',
      link: '',


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

  setPopupBoolean = () => {
    if (!Boolean(this.state.anchorEl.name)) {

    }
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    this.setState({ submitted: true });

    const { name, bio, link} = this.state;

    const username = this.props.user.username
    const id = this.props.user.id
    const token = this.props.user.accessToken
    if ((name || bio  || link) && username && id && token) {           
        const dispatch = await this.props.update(name, bio, link, username, id, token);
    }
    
};

  render() {
    const { anchorEl, msgOpen, notificationsOpen, profileOpen, name, bio, link } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
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
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>notifications</MenuItem>
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
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>notifications</MenuItem>
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
        </div>
        <div className={classes.formholder}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Box m={3} />
            <Grid container spacing={4} direction="row" alignItems="center" justify="center">
              <Grid item >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">

                  <Avatar
                    src="/images/example.jpg"
                    className={classes.avatarSm}
                    color="white"
                  />

                </label>
              </Grid>
              <Grid item>
                <Box m={3} />

                <Typography component="h1" variant="h4">
                  {this.props.user.username}
                </Typography>
                <Link className={classes.link}>
                  <Typography component="h1" variant="subtitle1">
                    <b>Change Profile Photo</b>
                  </Typography>
                </Link>
              </Grid>

            </Grid>


            <Box m={3} />

            <Grid container spacing={2} direction="column" alignItems="center" justify="center" className={classes.grow}>
              <Grid item>
                <Grid container spacing={2} direction="row" alignItems="top" justify="center">
                  <Grid item >
                    <Typography component="h1" variant="h6" style={{marginTop: 30}}>
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
                      //error={usernameError}
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
                    <Typography component="h1" variant="h6" style={{marginLeft: 20}}>
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
                      //error={usernameError}
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
                    <Typography component="h1" variant="h6" style={{marginTop: 60}}>
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
                          //error={usernameError}
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
            <Box m={1} />





            <Box m={4} />
          </form>
        </div>


      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  logout: userActions.logout,
  update: profileActions.update

  
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(EditProfile));