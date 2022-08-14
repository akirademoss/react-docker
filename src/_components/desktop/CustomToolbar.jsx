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
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

const filterOptions = createFilterOptions({
    stringify: ({ name, username }) => `${name} ${username}`
});

const array = [];

async function handlePageChange(username){
    history.push('/' + username + '/user');
} 


class CustomToolbar extends React.Component {
    handlePageChange = async (e) => 
    {
       // history.push('/' + username + '/user');
    }
    render() {
        const { classes, user, profile, loadingProfile, handleMenu, handleClose, handleViewProfile,
            handleEditProfile, handleLogout, messagesOpen, anchorEl, notificationsOpen, profileOpen,
            handleTextChange, searchText, handleTextClear, keyPress, searchResults, loadingSearchResults } = this.props;

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
                                        loading={!(searchResults.length == 0)}
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