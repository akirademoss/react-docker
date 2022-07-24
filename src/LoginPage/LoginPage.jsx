//Basic imports
import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { userActions } from '../_actions/auth';

//import CustomLogo from '/static/images/logox7-400.png';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';

//styles and color imports
import { withStyles, createStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';


import LoginToolbar from "../_components/LoginToolbar";
import LoginForm from "../_components/LoginForm";
import LoginToolbarMobile from "../_components/LoginToolbarMobile";
import LoginFormMobile from "../_components/LoginFormMobile";

import { isMobile, browserName } from "react-device-detect";

{/* CSS / styling */}
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

  
  const styles = darkTheme => ({
    multilineColor:{
        color:'red'
    },
    background: {
      background: `url('${process.env.PUBLIC_URL}/static/images/cool-rotations-darkened2.png')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100%',
      width: '100%',
      minHeight: '100vh',
      backgroundAttachment: 'fixed',
      //minWidth: '580px'
    },
    layout: {
      display: 'flex',
      flexDirection: 'column',
    }, 
  });

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            errors: {username: '', password: ''},
            usernameError: false,
            passwordError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        let errors = {};

        this.setState({ submitted: true });

        //reset states
        this.setState({usernameError : false});
        this.setState({passwordError : false});
        errors["password"] = '';
        errors["username"] = '';
        this.setState({
          errors: errors
        });
        
        const { username, password } = this.state;
        if (username && password) {           
            const dispatch = await this.props.login(username, password);
        }
        if (!username) {

            errors["username"] = "Please enter a valid username.";
            this.setState({usernameError: true})
        }
        if (!password){
            errors["password"] = "Your password must contain between 6 and 50 characters.";
            this.setState({passwordError: true})
        }

        this.setState({
            errors: errors
          });

        
    }

    //handleAuth()

    render() {
        const { classes } = this.props;
        const { loggingIn } = this.props;
        const { username, password, submitted, errors, usernameError, passwordError } = this.state;
        return (
            <div className={classes.background}>
            <div className={classes.layout}>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />
              {!isMobile &&
              <LoginToolbar/>}
              {isMobile &&
              <LoginToolbarMobile/>}

              {!isMobile &&
              <LoginForm 
                handleSubmit={this.handleSubmit}
                username={username}
                errorsUsername={errors["username"]}
                handleChange={this.handleChange}
                usernameError={usernameError}
                password={password}
                errorsPassword={errors["password"]}
                passwordError={passwordError}
                loggingIn={loggingIn}
              />}
              {isMobile &&
              <LoginFormMobile 
                handleSubmit={this.handleSubmit}
                username={username}
                errorsUsername={errors["username"]}
                handleChange={this.handleChange}
                usernameError={usernameError}
                password={password}
                errorsPassword={errors["password"]}
                passwordError={passwordError}
                loggingIn={loggingIn}
              />}
              
            </ThemeProvider>
            </div> 
            </div>
        );
    }
}
// <button className="btn btn-primary">Login</button>
function mapStateToProps(state) {
    //console.log(state);
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

/*
<Alert severity="error" 
color="warning"
variant="filled" 
className={classes.text}
>
Sorry, we can't find an account with this username. Please try again.
</Alert>*/

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles, {withTheme: true})(LoginPage));
