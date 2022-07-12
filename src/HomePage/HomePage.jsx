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
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

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
  clearIcon: {
    color: darkTheme.palette.common.white,
    background: 'transparent',
    "&:hover": {
        background: 'transparent',
        backgroundColor: 'transparent',
        cursor: 'default',
    },
  },
  clear: {
    fontSize: '18px',
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextClear = () => {
    this.setState({ text: "" });
  }

  handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {

    const { classes } = this.props;

    const endAdornment = () => {
      if (this.state.text) {
        return (
          <InputAdornment position="end">
            <IconButton 
              disableRipple
              onClick={this.handleTextClear}
              className={classes.clearIcon}
            >
              <ClearIcon className={classes.clear} />
            </IconButton>
          </InputAdornment>
        );
      }

      return "";
     
    }
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.background}>

          <Toolbar className={classes.navBar}>
            <div className={classes.homeButton}>
              <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'} />
            </div>
            <section className={classes.searchAlign}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  fullWidth={true}
                  type="text"
                  placeholder="Search…"
                  name="text"
                  onChange={this.handleTextChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={this.state.text}
                  endAdornment={endAdornment()}
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
          </Toolbar>
          <div className={classes.centerDivCol}>
            <div className={classes.centerDiv}>
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
  //getUsers: userActions.getAll,
  //deleteUser: userActions.delete
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles, { withTheme: true })(HomePage));