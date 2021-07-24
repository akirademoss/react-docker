//Basic imports
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


//toolbarstuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InstaIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import SvgIcon from '@material-ui/core/SvgIcon';
import { ThemeProvider } from "@material-ui/styles";
import BottomNavigation from '@material-ui/core/BottomNavigation';

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

//pages imports
import { history } from '../_helpers';

//redux imports
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

//import for actions
import { userActions } from "../actions/auth";

// CSS styling 
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: red[700],
      main: '#ffffff',
    },
    secondary: {
      main: red[700],
    },
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
});

const styles = theme => ({
  background: {
    background: `url('${process.env.PUBLIC_URL}/static/images/cool-rotations-darkened2.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: 1068,
    width: '100%',
    minHeight: '100vh',
    backgroundAttachment: 'fixed',
  },
  layout: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }, 
  //Part of Top Nav Bar  
  navBar: {
    background: 'transparent', 
    boxShadow: 'none',
    minHeight: 5,
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  homeButton: {
    marginRight: 0,
    marginLeft: -12,
    marginTop: 0,
    width: 400, 
    background: 'transparent',
    "&:hover": {
      background: 'transparent', 
    }
  },
  createAccountButton: {
    margin: theme.spacing(0, 0, 0),
    width: 170,
  }, 
//Form Elements
  form: {
    width: 450, // Fix IE 11 issue.
    height: 700,
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: fade(darkTheme.palette.common.black, 0.85),
    alignItems: 'center',
  },
  text: {
    width: 290,
  },
  signInButton: {
    margin: theme.spacing(3, 0, 0),
    width: 290,
  },
  icon: {
    display: 'flex', 
    flexDirection: 'row', 
    alighnItems: 'center',
  },
  divider: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width:  '100%',
    height: '100%',
  },
  border: {
    borderBottom: '2px solid gray',
    width: '100%',
    marginRight: 20,
    marginLeft: 20,
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    fontWeight: 500,
    fontSize: 22,
    color: "lightgray",
  },  
  instaButton: {
    margin: theme.spacing(0, 0, 0),
    width: 290,
    textTransform: 'none',
    flexShrink: 'auto',
  }, 
  fbButton: {
    margin: theme.spacing(3, 0, 0),
    width: 290,
    textTransform: 'none',
    flexShrink: 'auto',
  },
//Bottom Nav Bar
  bottomNavBar: {
    boxShadow: 'none',
    background: 'transparent',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    //backgroundColor: fade(darkTheme.palette.secondary.main, 0.85),
  },
});
/*
// Components 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Too Legit To Submit, Inc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function NavBar(){
  const classes = useStyles();
  return(
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <Button className={classes.homeButton}
         onClick={() => history.push('/')}
        >
          <img src={process.env.PUBLIC_URL + '/static/images/logox7-400.png'}/>
        </Button>
        <section className={classes.rightToolbar}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.createAccountButton}
              onClick={() => history.push('/SignIn')}
            >
              Sign In
            </Button>
        </section>
      </Toolbar>
    </AppBar>  
  );
}

const Divider = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.divider}>
      <div className={classes.border} style={{marginLeft: 30}}/>
      <span className={classes.content}>{children}</span>
      <div className={classes.border} style={{marginRight: 30}}/>
    </div>
  );
};

function CreateAccountForm(){
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        username:username,
        email:email,
        password:password,
        loggedIn: false,
      })
    );
  dispatch(userActions.register(email, username, password));
  };


  return(
  <div>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
	  // Basic Sign In Components 
          <Box m={3}/>
          <Typography component="h1" variant="h4" align="center">
            Create Account
          </Typography>
          // Custom spacing 
          <Box m={1}/>
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            type="username"
            value={username}
            autoComplete="username"
            autoFocus
            className={classes.text}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            autoFocus
            className={classes.text}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            required
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            autoFocus
            className={classes.text}
            onChange={(e) => setPassword(e.target.value)}
          />
          // Custom spacing 
          <Box m={1}/>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.signInButton}
            >
              Sign Up
            </Button>

	  // In-line text divider
          <div className={classes.divider}>
            <div className={classes.border} style={{marginLeft: 30}}/>
              <Typography component="h1" variant="body1" align="center" >{"OR"}</Typography>
            <div className={classes.border} style={{marginRight: 30}}/>
          </div>
          
	  // OpenID Connect Login Instagram 
          <Button
            type="submit"
            variant="contained"
            className={classes.instaButton}
          >
            <Grid container  direction="row" alignItems="center" justify="center">
              <Grid item xs={2}>
                <SvgIcon  className={classes.icon}>
                  <InstaIcon/>
                </SvgIcon>
              </Grid>
              <Grid item2="true">
                {"Log in with Instagram"}
              </Grid>
            </Grid>
          </Button>
          
          // OpenID Connect Login Facebook 
          <Button
            type="submit"
            variant="contained"
            className={classes.fbButton}
          >
            <Grid container  direction="row" alignItems="center" justify="center">
              <Grid item xs={2}>
                <SvgIcon className={classes.icon}>
                  <FacebookIcon/>
                </SvgIcon>
              </Grid>
              <Grid item2="true">
                {"Log in with Facebook"}
              </Grid>
            </Grid>
          </Button>
          // Custom spacing 
          <Box m={4}/>
          <BottomNavigation position="fixed" className={classes.bottomNavBar}>
            <Copyright />
          </BottomNavigation>   
        </form>
        <Box m={4}/>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Too Legit To Submit, Inc
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography> 

      </div>
  );
}

// Implementation 

export default function SignInUser() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <div>
            <NavBar />
          </div> 
          <div className={classes.layout}>
            <CreateAccountForm />         
          </div>
        </ThemeProvider>
    </div>
  );
}*/

class CreateAccount extends React.Component {
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.background}>
      <div className={classes.layout}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Button className={classes.homeButton}
           onClick={() => history.push('/')}
          >
            <img src={process.env.PUBLIC_URL + '/static/images/logox7-400.png'}/>
          </Button>
          <section className={classes.rightToolbar}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.createAccountButton}
                onClick={() => history.push('/SignIn')}
              >
                Sign In
              </Button>
          </section>
        </Toolbar>
      </AppBar>  

      <form className={classes.form} noValidate>
	  {/* Basic Sign In Components */}
          <Box m={3}/>
          <Typography component="h1" variant="h4" align="center">
            Create Account
          </Typography>
          {/* Custom spacing */}
          <Box m={1}/>
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            type="username"
            //value={username}
            autoComplete="username"
            autoFocus
            className={classes.text}
            //onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            type="email"
            //value={email}
            autoComplete="email"
            autoFocus
            className={classes.text}
            //onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            margin="normal"
            required
            id="password"
            label="Password"
            name="password"
            type="password"
            //value={password}
            autoComplete="current-password"
            autoFocus
            className={classes.text}
            //onChange={(e) => setPassword(e.target.value)}
          />
          {/* Custom spacing */}
          <Box m={1}/>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.signInButton}
            >
              Sign Up
            </Button>

	  {/* In-line text divider*/}
          <div className={classes.divider}>
            <div className={classes.border} style={{marginLeft: 30}}/>
              <Typography component="h1" variant="body1" align="center" >{"OR"}</Typography>
            <div className={classes.border} style={{marginRight: 30}}/>
          </div>
          
	  {/* OpenID Connect Login Instagram */}
          <Button
            type="submit"
            variant="contained"
            className={classes.instaButton}
          >
            <Grid container  direction="row" alignItems="center" justify="center">
              <Grid item xs={2}>
                <SvgIcon  className={classes.icon}>
                  <InstaIcon/>
                </SvgIcon>
              </Grid>
              <Grid item2="true">
                {"Log in with Instagram"}
              </Grid>
            </Grid>
          </Button>
          
          {/* OpenID Connect Login Facebook */}
          <Button
            type="submit"
            variant="contained"
            className={classes.fbButton}
          >
            <Grid container  direction="row" alignItems="center" justify="center">
              <Grid item xs={2}>
                <SvgIcon className={classes.icon}>
                  <FacebookIcon/>
                </SvgIcon>
              </Grid>
              <Grid item2="true">
                {"Log in with Facebook"}
              </Grid>
            </Grid>
          </Button>
          {/* Custom spacing */}
          <Box m={4}/>
        </form>
        <Box m={4}/>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Too Legit To Submit, Inc
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </ThemeProvider>
    </div>
    </div>

    );
  }
}

export default withStyles(styles, {withTheme: true})(CreateAccount);