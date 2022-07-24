import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { history } from '../_helpers';
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
    navBar: {
        background: 'transparent',
        boxShadow: 'none',
        minHeight: 5,
        position: 'static',
        width: '100%',
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -12,
    },
    homeButton: {
        marginLeft: -12,
        marginTop: 0,
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
    },
    logo: {
        margin: "auto",
        width: "130px",
    },
    createAccountButton: {
        margin: darkTheme.spacing(0, 0, 0),
        width: 170,
        color: darkTheme.palette.secondary,
        width: "80px",
        fontSize: '10px',
        marginRight: 10,
    },
})

class RegisterToolbarMobile extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <ThemeProvider theme={darkTheme}>
                    <Toolbar className={classes.navBar}>
                        <Button disableRipple className={classes.homeButton}
                            onClick={() => history.push('/')}
                        >
                            <img src={process.env.PUBLIC_URL + '/static/images/logox7-400.png'} className={classes.logo}/>
                        </Button>
                        <section className={classes.rightToolbar}>
                            <Button
                                disableRipple
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

                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(RegisterToolbarMobile));;