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

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

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
      borderRadius: darkTheme.shape.borderRadius ,
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
      fullWidth: 'true',
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
  
  });

class HomePrivate extends React.Component {
  constructor(props) {
    super(props);
      
    this.state = {
    anchorEl: null,
    msgOpen: false,
    notificationsOpen: false,
    profileOpen: false,
    isLoggedIn: false

  };

  this.handleLogout = this.handleLogout.bind(this);

}

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
    
    if(event.currentTarget.name == "profile"){
      this.setState({profileOpen: true});
      console.log("profile open executed");
    }

    if(event.currentTarget.name == "notifications"){
      this.setState({notificationsOpen: true});
      console.log("notifications open executed");
    }

    if(event.currentTarget.name == "messages"){
      this.setState({messagesOpen: true});
      console.log("messages open executed");
    }

  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({profileOpen: false});
    this.setState({messagesOpen: false});
    this.setState({notificationsOpen: false});
  };

  handleEditProfile = () => {
    this.setState({ anchorEl: null });
    this.setState({profileOpen: false});
    this.setState({messagesOpen: false});
    this.setState({notificationsOpen: false});
    history.push('/' + this.props.user.username + '/edit')
  };

  handleViewProfile = () => {
    this.setState({ anchorEl: null });
    this.setState({profileOpen: false});
    this.setState({messagesOpen: false});
    this.setState({notificationsOpen: false});
    history.push('/' + this.props.user.username + '/profile')
  };

  handleLogout = () => {
    this.props.logout();
    this.setState({ anchorEl: null });
    this.setState({profileOpen: false});
    this.setState({messagesOpen: false});
    this.setState({notificationsOpen: false});
  };

  setPopupBoolean = () => {
    if(!Boolean(this.state.anchorEl.name)){

    }
  }

    render() {
        const { auth, anchorEl, msgOpen, notificationsOpen, profileOpen } = this.state;
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
                  onClick={() => history.push('/home')}
                  >
                    <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'}/>
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
  logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, {withTheme: true})(HomePrivate));