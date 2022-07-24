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

import RegisterToolbar from "../_components/RegisterToolbar";
import RegisterForm from "../_components/RegisterForm";
import RegisterToolbarMobile from "../_components/RegisterToolbarMobile";
import RegisterFormMobile from "../_components/RegisterFormMobile";

import { isMobile, browserName } from "react-device-detect";

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
      display: 'flex',
      flexDirection: 'column',
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
            {!isMobile &&
            <RegisterToolbar/>}
            {isMobile &&
            <RegisterToolbarMobile/>}

            {!isMobile &&
            <RegisterForm 
                handleSubmit={this.handleSubmit}
                username={username}
                errorsUsername={errors["username"]}
                handleChange={this.handleChange}
                usernameError={usernameError}
                email={email}
                errorsEmail={errors["email"]}
                emailError={emailError}
                password={password}
                errorsPassword={errors["password"]}
                passwordError={passwordError}
              />}
            {isMobile &&
            <RegisterFormMobile
                handleSubmit={this.handleSubmit}
                username={username}
                errorsUsername={errors["username"]}
                handleChange={this.handleChange}
                usernameError={usernameError}
                email={email}
                errorsEmail={errors["email"]}
                emailError={emailError}
                password={password}
                errorsPassword={errors["password"]}
                passwordError={passwordError}
              />}
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