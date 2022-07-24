import React from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";
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

import PublicCustomToolbar from "../_components/PublicCustomToolbar";
import PublicCustomToolbarMobile from "../_components/PublicCustomToolbarMobile";

//debounce import
import debounce from 'lodash.debounce';
import { isMobile, browserName } from "react-device-detect";


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

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.throttleHandleChange = debounce(this.throttleHandleChange.bind(this), 300);
  }

  handleTextClear = () => {
    this.setState({ text: "" });
  }

  handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.throttleHandleChange(value)
  }

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

  componentDidMount() {
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {

    const { classes } = this.props;
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.background}>
          <div className={classes.grow}>

            {!isMobile &&
              <PublicCustomToolbar
                handleTextChange={this.handleTextChange}
                searchText={this.state.text}
                handleTextClear={this.handleTextClear}
                keyPress={this.keyPress}
              />}

            {isMobile &&
              <PublicCustomToolbarMobile
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
  return { user, users };
}

const actionCreators = {
  userSearch: userActions.userSearch,
  //getUsers: userActions.getAll,
  //deleteUser: userActions.delete
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(HomePage));