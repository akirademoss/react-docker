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
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import { ThemeProvider } from "@material-ui/styles";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const darkTheme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                margin: 5,
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
    navBar: {
        boxShadow: 'none',
        minHeight: 5,
        height: 'auto',
        backgroundColor: fade(grey[500], 0.4),
        position: 'fixed',
        width: '100%',

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
    logo: {
        margin: "auto",
        width: "170px",
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
        width: '100%',
        minWidth: 120,
        marginLeft: -10
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
        padding: darkTheme.spacing(1, 0, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${darkTheme.spacing(4)}px)`,
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
    clearIcon: {

        color: darkTheme.palette.common.white,
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
        marginRight: -30,
        paddingLeft: 0,
        paddingRight: 0,


    },
    clear: {
        fontSize: '18px',
    },
    iconButtonAvatar: {
        background: 'transparent',
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'default',
        },
        height: "48px",
    },
    avatarFollow: {
        background: 'transparent',
        "&:hover": {
            background: 'transparent',
        },
        margin: "auto",
        width: "32px",
        height: "32px",
        borderRadius: 100,
    },
    followGrid: {
        alignItems: 'center',
        display: 'inline-flex',
        flexDirection: 'row',
        width: '100%',
    },
    followGridList: {
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    link: {
        color: darkTheme.palette.common.white,
        fontSize: '13px',
        "&:hover": {
            cursor: 'default',
        },
    },
    toolbarContainer: {

    }
})

const filterOptions = createFilterOptions({
    stringify: ({ name, username }) => `${name} ${username}`
});

async function handlePageChange(username){
    history.push('/' + username + '/user');
} 


class CustomToolbar extends React.Component {
    render() {
        const { classes, user, profile, loadingProfile, handleMenu, handleClose, handleViewProfile,
            handleEditProfile, handleLogout, messagesOpen, anchorEl, notificationsOpen, profileOpen,
            handleTextChange, searchText, handleTextClear, keyPress, searchResults, loadingSearchResults, pendingReq } = this.props;

        const endAdornment = () => {
            if (searchText) {
                return (
                    <InputAdornment position="end">
                        <IconButton
                            disableRipple
                            onClick={handleTextClear}
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

            <div className={classes.toolbarContainer}>
                <ThemeProvider theme={darkTheme}>
                    <Toolbar className={classes.navBar}>
                        <div>
                            <Button disableRipple className={classes.homeButton}
                                onClick={() => history.push('/' + user.username + '/home')}
                            >
                                <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'} className={classes.logo} />
                            </Button>
                        </div>

                        <div className={classes.grow} />

                        <section className={classes.searchAlign}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon className={classes.icon} />
                                </div>

                                
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={searchResults}
                                        filterOptions={filterOptions}
                                        getOptionLabel={({ username, name, previewImg }) => {
                                            return `${username} ${name} ${previewImg}`;
                                        }}
                                        filterSelectedOptions
                                        renderOption={({ username, name, previewImg }) => {
                                            return (
                                                <div>
                                                    <Grid container spacing={0} className={classes.followGrid}>
                                                        <Grid item>
                                                            <IconButton
                                                                disableRipple
                                                                color="inherit"
                                                                className={classes.iconButtonAvatar}
                                                            //onClick={handlePageChange}
                                                            >
                                                                {loadingSearchResults && !previewImg && <Skeleton variant="circle" animation="wave" className={classes.skeleton} />}
                                                                {!loadingSearchResults && previewImg && <img src={previewImg} className={classes.avatarFollow} />}
                                                                {!loadingSearchResults && !previewImg && <AccountCircle className={classes.avatarFollow} />}
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container className={classes.followGridList}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" className={classes.link}><b>{username}</b> </Typography>
                                                                </Grid>
                                                                {{name} && <Grid item>
                                                                    <Typography variant="subtitle2" className={classes.link}>{name}</Typography>
                                                                </Grid>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            );
                                        }}
                                        fullWidth={true}
                                        inputValue={searchText}
                                        open={searchText.length > 2}
                                        onInputChange={(e, value) => handleTextChange}
                                        onChange={(event, value) => history.push('/' + value.username + '/user')}
                                        forcePopupIcon={false}
                                        loading={loadingSearchResults || pendingReq}
                                        className={classes.autocomplete}
                                        renderInput={(params) => {
                                            const { InputLabelProps, InputProps, ...rest } = params;
                                            return <InputBase {...params.InputProps} {...rest} fullWidth={true} type="text" placeholder="Search…" name="text" onChange={handleTextChange} classes={{ input: classes.inputInput }} value={searchText} endAdornment={endAdornment()} onKeyDown={keyPress} />
                                        }}
                                    />

                            </div>
                        </section>

                        <IconButton
                            disableRipple
                            name="messages"
                            className={classes.iconButtonTransparent}
                            aria-owns={messagesOpen ? 'message-alerts' : null}
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {<MailIcon className={classes.avatarSm} />}
                        </IconButton>

                        <Menu
                            disableScrollLock={true}
                            color="secondary"
                            id="message-alerts"
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={messagesOpen}
                            onClose={handleClose}
                        >
                            <MenuItem disableRipple onClick={handleClose} className={classes.menuItem}>Messages</MenuItem>
                        </Menu>

                        <IconButton
                            disableRipple
                            className={classes.iconButtonTransparent}
                            name="notifications"
                            aria-owns={notificationsOpen ? 'notifications-alerts' : null}
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {<NotificationsIcon className={classes.avatarSm} />}
                        </IconButton>
                        <Menu
                            disableScrollLock={true}
                            color="secondary"
                            id="notifications-alerts"
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={notificationsOpen}
                            onClose={handleClose}
                        >
                            <MenuItem disableRipple onClick={handleClose} className={classes.menuItem}>Notifications</MenuItem>
                        </Menu>

                        <IconButton
                            disableRipple
                            className={classes.iconButtonTransparent}
                            name="profile"
                            aria-owns={profileOpen ? 'profile-menu' : null}
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >

                            {loadingProfile && !profile.previewImg && <Skeleton variant="circle" animation="wave" className={classes.skeleton} />}
                            {!loadingProfile && profile.previewImg && <img src={profile.previewImg} className={classes.avatarSm} />}
                            {!profile.previewImg && !loadingProfile && <AccountCircle className={classes.avatarSm} />}

                        </IconButton>
                        <Menu
                            disableScrollLock={true}
                            color="secondary"
                            id="profile-menu"
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={profileOpen}
                            onClose={handleClose}
                            style={{
                                padding: 8
                            }}
                        >
                            <MenuItem disableRipple onClick={handleViewProfile} className={classes.menuItem}>Your Profile</MenuItem>
                            <MenuItem disableRipple onClick={handleEditProfile} className={classes.menuItem}>Edit Profile</MenuItem>
                            <MenuItem disableRipple onClick={handleLogout} className={classes.menuItem}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(CustomToolbar));;