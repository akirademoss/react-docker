import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import { history } from '../../_helpers';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import { ThemeProvider } from "@material-ui/styles";





const darkTheme = createMuiTheme({
    overrides: {
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
            main: '#000000',
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
    iconButtonTransparent: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
        width: "28px",
        
    },
    avatarSm: {
        color: darkTheme.palette.common.white,
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        width: "20px",
        height: "20px",
        borderRadius: 100,
    },
    navBar: {
        boxShadow: 'none',
        minHeight: 44,
        height: 'auto',
        backgroundColor: fade(grey[500], 0.4),
        position: 'fixed',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',

    },
    homeButton: {
        marginRight: 0,
        marginLeft: -12,
        width: '100%',
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
    },
    logo: {
        width: 75,
    },
    grow: {
        flexGrow: 1,
    },
    searchAlign: {
        display: 'flex',
        flexDirection: 'row',
        alighnItems: 'center',
        width: '100%',
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
        marginRight: darkTheme.spacing(1),
        marginLeft: -5,
        width: '100%',
        height: 30,
        fontSize: '10px',
    },
    searchIcon: {
        padding: darkTheme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -15,
    },
    inputInput: {
        padding: darkTheme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: '18px',
        width: '100%',
        fontSize: '10px',
    },
    inputRoot: {
        color: 'inherit',
    },
    iconButtonTransparent: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
    },
    signInButton: {
   
        width: 250,
        height: 10,
    },
    createAccountButton: {
      
        width: 70,
        fontSize: '10px',
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -10,
      },
    icon: {
        color: darkTheme.palette.common.white,
        fontSize: "15px",
        paddingLeft: 0,
        paddingRight: 0, 
    },
    clearIcon: {
        
        color: darkTheme.palette.common.white,
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
        width: 0,
    },
    clear: {
        fontSize: '15px',
    },
    adornment: {
        paddingLeft: 0,
        paddingRight: 0,
        width: 0,
        marginLeft: -10,
    },
})

class PublicCustomToolbarMobile extends React.Component {
    render() {
        const { classes, handleTextChange, searchText, handleTextClear, keyPress } = this.props;

        const endAdornment = () => {
            if (searchText) {
                return (
                    <InputAdornment position="end">
                        <IconButton
                            disableRipple
                            onClick={handleTextClear}
                            className={classes.clearIcon}
                            className={classes.adornment}
                        >
                            <ClearIcon className={classes.clear} />
                        </IconButton>
                    </InputAdornment>
                );
            }

            return "";

        }
        return (

            <div>
                <ThemeProvider theme={darkTheme}>
                    <Toolbar className={classes.navBar}>
                        <div>
                        <Button disableRipple className={classes.homeButton}
                            onClick={() => history.push('/')}
                        >
                            <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'} className={classes.logo}/>
                        </Button>
                        </div>
                        <section className={classes.searchAlign}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon className={classes.icon}/>
                                </div>
                                <InputBase
                                    fullWidth={true}
                                    type="text"
                                    placeholder="Search…"
                                    name="text"
                                    onChange={handleTextChange}
                                    classes={{
                                        input: classes.inputInput,
                                    }}
                                    value={searchText}
                                    endAdornment={endAdornment()}
                                    onKeyDown={keyPress}
                                />
                            </div>
                        </section>

                        <section className={classes.rightToolbar}>
                            <Button
                                disableRipple
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
                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(PublicCustomToolbarMobile));;