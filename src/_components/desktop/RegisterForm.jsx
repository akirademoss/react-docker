import React from "react";
import { Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InstaIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import SvgIcon from '@material-ui/core/SvgIcon';
import orange from '@material-ui/core/colors/orange';

import { ThemeProvider } from "@material-ui/styles";

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
        },
        MuiInputBase: {

            endAdornment: {
                color: '#ffffff',

            },
            primary: '#000000',
            adornedEnd: {
                color: '#ffffff',
            },
        }
    },
    palette: {
        type: 'dark',
        primary: {
            main: red[700],
        },
        secondary: {
            main: red[700],
        },
        error: {
            main: orange[400],
        },
        background: {
            paper: fade('#000000', 0.5),
            default: '#000000',
        },
        neutral: {
            main: '#ffffff',
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
    multilineColor: {
        color: 'red'
    },
    //Form Elements
    form: {
        width: 450, // Fix IE 11 issue.
        height: '100%',
        marginTop: darkTheme.spacing(3),
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
        margin: darkTheme.spacing(3, 0, 0),
        width: 290,
        color: darkTheme.palette.secondary,
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        alighnItems: 'center',
    },
    divider: {
        marginTop: darkTheme.spacing(0),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    border: {
        borderBottom: '2px solid gray',
        width: '100%',
        marginRight: 20,
        marginLeft: 20,
    },
    content: {
        paddingTop: darkTheme.spacing(0.5),
        paddingBottom: darkTheme.spacing(0.5),
        paddingRight: darkTheme.spacing(3),
        paddingLeft: darkTheme.spacing(3),
        fontWeight: 500,
        fontSize: 22,
        color: "lightgray",
    },
    instaButton: {
        margin: darkTheme.spacing(0, 0, 0),
        width: 290,
        textTransform: 'none',
        flexShrink: 'auto',
    },
    fbButton: {
        margin: darkTheme.spacing(3, 0, 0),
        width: 290,
        textTransform: 'none',
        flexShrink: 'auto',
    },
    layout: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
})

class RegisterForm extends React.Component {
    render() {
        const { classes, handleChange, handleSubmit, username, errorsUsername, usernameError, email, errorsEmail, emailError, password, errorsPassword, passwordError, loggingIn } = this.props;

        return (
            <div className={classes.layout}>
                <ThemeProvider theme={darkTheme}>
                <form className={classes.form} onSubmit={handleSubmit}>
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
            helperText={errorsUsername}
            autoFocus
            className={classes.text}
            onChange={handleChange}
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
            helperText={errorsEmail}
            autoFocus
            className={classes.text}
            onChange={handleChange}
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
            helperText={errorsPassword}
            autoFocus
            className={classes.text}
            onChange={handleChange}
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
        );
    }
}

export default (withStyles(styles, { withTheme: true })(RegisterForm));;