import React from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//router and page imports
import { history } from '../_helpers';
import { userActions } from '../_actions/auth';
import { profileActions } from '../_actions/profile';
import CustomToolbar from "../_components/desktop/CustomToolbar";
import CustomToolbarMobile from "../_components/mobile/CustomToolbarMobile";

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
  grow: {
    flexGrow: 1,
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
    marginTop: 200,
    minWidth: 150,
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    width: '30%',
    borderRadius: darkTheme.shape.borderRadius,
    backgroundColor: fade(darkTheme.palette.common.black, 0.6),
  },
  paper2: {
    marginTop: 130,
    minWidth: 150,
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

class HomePrivate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      messagesOpen: false,
      notificationsOpen: false,
      profileOpen: false,
      isLoggedIn: false,
      profile: { name: '', bio: '', link: '', previewImg: '' },
      text: '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.throttleHandleChange = debounce(this.throttleHandleChange.bind(this), 300);

  }

  handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.throttleHandleChange(value)
  };

  throttleHandleChange = async (value) =>{
    console.log("ENTERING THROTTLE FUNCTION")
    const dispatch = await this.props.userSearch(value);
  }

  keyPress = async (e) => {
    if(e.keyCode==13){
        console.log(e.target.value)
        const dispatch = await this.props.userSearch(e.target.value)
        this.setState({ showResult:true });
    }
  }

  handleTextClear = () => {
    this.setState({ text: "" });
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
    const { auth, anchorEl, messagesOpen, notificationsOpen, profileOpen } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    const { loadingProfile } = this.props;
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.background}>
          <div className={classes.grow}>
            {!isMobile &&
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
            
            <div className={classes.centerDivCol}>
              <div className={classes.centerDiv}>
                {!isMobile &&
                <div className={classes.paper}>
                  <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item>
                      <Typography component="h1" variant="h4" align="center" >
                        <b>Video Platform Coming Soon!</b>
                      </Typography>
                    </Grid>
                    <Grid item className={classes.centerDiv}>
                      <Typography component="h1" variant="h6" align="center" className={classes.text}>
                        <b>Create an Account, Update your Profile, and Find Friends!</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>}
                {isMobile &&
                <div className={classes.paper2}>
                  <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item>
                      <Typography component="h1" variant="h4" align="center" >
                        <b>Video Platform Coming Soon!</b>
                      </Typography>
                    </Grid>
                    <Grid item className={classes.centerDiv}>
                      <Typography component="h1" variant="h6" align="center" className={classes.text}>
                        <b>Create an Account, Update your Profile, and Find Friends!</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>}
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
  return { user, users, profile, loadingProfile };
}

const actionCreators = {
  logout: userActions.logout,
  getInfo: profileActions.getInfo,
  userSearch: userActions.userSearch,
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(HomePrivate));