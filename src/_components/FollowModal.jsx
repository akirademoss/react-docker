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
import { history } from '../_helpers';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
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
    navBar: {
        boxShadow: 'none',
        minHeight: 5,
        height: 'auto',
        backgroundColor: fade(grey[500], 0.4),
        position: 'fixed',
        width: '100%'
    },
    homeButton: {
        marginRight: 0,
        marginLeft: -12,
        marginTop: 0,
        width: '100%',
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
    },
    grow: {
        flexGrow: 1,
    },
    searchAlign: {
        display: 'flex',
        flexDirection: 'row',
        alighnItems: 'center',
        width: '25%',
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
    inputInput: {
        padding: darkTheme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${darkTheme.spacing(4)}px)`,
        transition: darkTheme.transitions.create('width'),
        width: '100%',
        [darkTheme.breakpoints.up('md')]: {
            width: '20ch',
        },
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
    avatarSm: {
        color: darkTheme.palette.common.white,
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        width: "26px",
        height: "26px",
        borderRadius: 100
    },
    menuItem: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
    },
    icon: {
        color: darkTheme.palette.common.white,
    },
    skeleton: {
        //backgroundColor: '#a5a5a5',
       // animation: skeleton-animation 1s infinite linear,
        color: darkTheme.palette.common.white,
        backgroundColor: grey[700],
        width: "26px",
        height: "26px",
    },



  })

  class ChangePicModal extends React.Component {
    render() {
      const { classes } = this.props;
        return (
            
            <div>

            </div>
               );
        }
    }
    
export default (withStyles(styles, { withTheme: true })(ChangePicModal));;