import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link as HyperLink} from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
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
import orange from '@material-ui/core/colors/orange';

//pages imports
import { history } from '../_helpers';
import { userActions } from '../_actions/auth';

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
      error: {
        main: orange[400],
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
      height: '100%',
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
      height: '100%',
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: fade(darkTheme.palette.common.black, 0.85),
      alignItems: 'center',
    },
    text: {
      width: 290,
      marginLeft: 0 
    },
    link: {
        textDecoration: 'none',
        color: fade(darkTheme.palette.common.white, 0.85)
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

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                errors: {username: '', password: '', email: ''},
                usernameError: false,
                passwordError: false,
                emailError: false,
                submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({

                [name]: value
            
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let errors = {};

        this.setState({ submitted: true });

        //reset states
        this.setState({usernameError : false});
        this.setState({passwordError : false});
        this.setState({emailError : false});
        errors["password"] = '';
        errors["username"] = '';
        errors["email"] = '';
        this.setState({
          errors: errors
        });

        const { username, email, password } = this.state;
        if (username && email && password) {
            this.props.register(email, username, password);
        }
        if (!username) {

            errors["username"] = "Please enter a valid username.";
            this.setState({usernameError: true})
        }
        if (!password){
            errors["password"] = "Your password must contain between 6 and 50 characters.";
            this.setState({passwordError: true})
        }
        if (!email){
            errors["email"] = "Please enter a valid email address.";
            this.setState({emailError: true})
        }

        this.setState({
            errors: errors
          });

    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, username, email, password, errors, usernameError, passwordError, emailError } = this.state;
        const { classes } = this.props;
        return (
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
                      onClick={() => history.push('/login')}
                    >
                      Sign In
                    </Button>
                </section>
              </Toolbar>
            </AppBar>  

      <form className={classes.form} onSubmit={this.handleSubmit}>
	  {/* Basic Sign In Components */}
          <Box m={3}/>
          <Typography component="h1" variant="h4" align="center">
            Create Account
          </Typography>
          {/* Custom spacing */}
          <Box m={1}/>
          <TextField
            color="primary"
            variant="filled"
            margin="normal"
            id="username"
            label="Username"
            name="username"
            type="username"
            value={username}
            autoComplete="username"
            helperText={errors["username"]}
            autoFocus
            className={classes.text}
            onChange={this.handleChange}
            error={usernameError}
            FormHelperTextProps={{
                className: classes.text
            }}
          />
          <TextField
            color="primary"
            variant="filled"
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            helperText={errors["email"]}
            autoFocus
            className={classes.text}
            onChange={this.handleChange}
            error={emailError}
            FormHelperTextProps={{
                className: classes.text
            }}
          />
          <TextField
            color="primary"
            variant="filled"
            margin="normal"
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            helperText={errors["password"]}
            autoFocus
            className={classes.text}
            onChange={this.handleChange}
            error={passwordError}
            FormHelperTextProps={{
                className: classes.text
            }}
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

          <Box m={2}/>
	  {/* In-line text divider*/}
          <div className={classes.divider}>
            <div className={classes.border} style={{marginLeft: 30}}/>
              <Typography component="h1" variant="body1" align="center" >{"OR"}</Typography>
            <div className={classes.border} style={{marginRight: 30}}/>
          </div>
          <Box m={2}/>

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
        <Box m={3}/>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link to="/#" color="inherit" href="https://material-ui.com/" className={classes.link}>
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

function mapStateToProps(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles, {withTheme: true})(RegisterPage));