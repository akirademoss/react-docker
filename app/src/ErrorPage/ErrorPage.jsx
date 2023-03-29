import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import { ThemeProvider } from "@material-ui/styles";
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

//router and page imports
//import history from '../history';
import { history } from '../_helpers';

import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';
import CustomToolbar from "../_components/desktop/CustomToolbar";


// CSS styling
const darkTheme = createMuiTheme({
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
  background: {
    background: `url('${process.env.PUBLIC_URL}/static/images/cool-rotations-darkened2.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    backgroundAttachment: 'fixed',
  },
  navBar: {
    boxShadow: 'none',
    minHeight: 5,
    height: 'auto',
    backgroundColor: fade(grey[500], 0.4),
    position: 'fixed',
    width: '100%',
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
  },
  createAccountButton: {
    margin: darkTheme.spacing(0, 0, 0),
    width: 110,
  },
  searchAlign: {
    display: 'flex',
    flexDirection: 'row',
    alighnItems: 'center',
    width: '50%',
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
  signInButton: {
    margin: darkTheme.spacing(3, 0, 0),
    width: 290,
  },
  centerDiv: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
  },
  centerDivCol: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    height: '70%',
  },
  paper: {
    marginTop: 250,
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    width: '30%',
    borderRadius: darkTheme.shape.borderRadius,
    backgroundColor: fade(darkTheme.palette.common.black, 0.6),
  },
  gridContainer: {
    marginBottom: 0,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    color: grey[500],
  },

});

class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          anchorEl: null,
          messagesOpen: false,
          notificationsOpen: false,
          profileOpen: false,
          isLoggedIn: false,
          profile: { name: '', bio: '', link: '', previewImg: '' },
    
        };
    
        this.handleLogout = this.handleLogout.bind(this);
    
      }
    
      handleChange = (event, checked) => {
        this.setState({ auth: checked });
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
    
      //get the user information
      getProfile = async (e) => {
        //e.preventDefault();
        if(this.props.loggedIn){
        const username = this.props.user.username;
        const id = this.props.user.id;
        const token = this.props.user.accessToken;
        this.profile = await this.props.getInfo(username, id, token);
        this.setState({ profile: this.props.profile })
        }
      }
    
      componentDidMount() {
        this.getProfile();
      }

  render() {
    const { auth, anchorEl, messagesOpen, notificationsOpen, profileOpen } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    const { loadingProfile } = this.props;
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

       
        <div className={classes.background}>
        {this.props.loggedIn && 
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
            />}

          {!this.props.loggedIn && 
          <Toolbar className={classes.navBar}>
            <div>
            <Button disableRipple className={classes.homeButton}
                            onClick={() => history.push('/home')}
                        >
              <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'} />
              </Button>
            </div>
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
            <section className={classes.rightToolbar}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                onClick={() => history.push('/login')}
                className={classes.createAccountButton}
              >
                Sign In
                    </Button>
            </section>
          </Toolbar>}

          <div className={classes.centerDivCol}>
            <div className={classes.centerDiv}>
              <div className={classes.paper}>
                <Grid container spacing={2} className={classes.gridContainer}>
                  <Grid item>
                    <Typography component="h1" variant="h4" align="center" >
                      <b>Ooooops! The URL you entered does not exist or cannot be accessed without valid credentials.</b>
                    </Typography>
                  </Grid>
                  <Grid item className={classes.centerDiv}>
                    <Typography component="h1" variant="h6" align="center" className={classes.text}>
                      <b>Try navigating to your profile or searching for users in the search bar.</b>
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div> 




      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { profile, loadingProfile } = state.getProfile;
  const { loggedIn } = state.authentication;
  return { loggedIn, user, users, profile, loadingProfile  };
}

const actionCreators = {
    logout: userActions.logout,
    getInfo: profileActions.getInfo
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(ErrorPage));